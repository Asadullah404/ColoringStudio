import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  Sparkles, 
  Eye, 
  CheckCircle2, 
  AlertCircle,
  Volume2, 
  VolumeX, 
  Layers
} from 'lucide-react';

import { LevelData, PlayerProgress, GameSettings } from './types/game';
import { LEVELS, CHAPTERS } from './data/levels';
import { 
  loadLocalProgress, 
  saveLocalProgress, 
  loadLocalSettings, 
  saveLocalSettings,
  syncProgressToFirebase,
  loadProgressFromFirebase 
} from './services/storageService';
import { soundEngine } from './services/soundService';
import { hapticEngine } from './services/hapticService';
import { auth, onAuthStateChanged, User } from './firebase';

import { HomeScreen } from './components/HomeScreen';
import { CanvasArea, isColorMatch } from './components/CanvasArea';
import { ColorPalette } from './components/ColorPalette';
import { Toolbar } from './components/Toolbar';
import { MarkerPen } from './components/MarkerPen';
import { CompletionModal } from './components/CompletionModal';
import { SettingsModal } from './components/SettingsModal';
import { DailyChallengeModal } from './components/DailyChallengeModal';
import { TargetPreviewModal } from './components/TargetPreviewModal';

interface HistoryStep {
  colors: Record<string, string>;
  coverages: Record<string, number>;
}

export default function App() {
  // Navigation state: 'home' | 'game'
  const [currentView, setCurrentView] = useState<'home' | 'game'>('home');
  const [activeLevelId, setActiveLevelId] = useState<string>(() => {
    const saved = loadLocalProgress();
    if (saved.lastPlayedLevelId && LEVELS.some((l) => l.id === saved.lastPlayedLevelId)) {
      return saved.lastPlayedLevelId;
    }
    return 'ch1_lvl1';
  });

  // Player progress & settings
  const [progress, setProgress] = useState<PlayerProgress>(loadLocalProgress());
  const [settings, setSettings] = useState<GameSettings>(loadLocalSettings());
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDailyOpen, setIsDailyOpen] = useState(false);
  const [isCompletionOpen, setIsCompletionOpen] = useState(false);
  const [isTargetPreviewOpen, setIsTargetPreviewOpen] = useState(false);
  const [previewModalLevel, setPreviewModalLevel] = useState<LevelData | null>(null);
  const [isGhostGuideActive, setIsGhostGuideActive] = useState(false);
  const [hintMessage, setHintMessage] = useState<string | null>(null);

  // In-Game state
  const activeLevel = LEVELS.find((l) => l.id === activeLevelId) || LEVELS[0];
  const [regionColors, setRegionColors] = useState<Record<string, string>>({});
  const [regionCoverages, setRegionCoverages] = useState<Record<string, number>>({});
  const [history, setHistory] = useState<HistoryStep[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Palette & Tool state
  const [selectedColor, setSelectedColor] = useState<string>(activeLevel.palette[0] || '#FF6B8B');
  const [activeTool, setActiveTool] = useState<'brush' | 'eraser'>('brush');
  const [highlightedRegionId, setHighlightedRegionId] = useState<string | null>(null);

  // 3D Marker Pen pointer tracking
  const [penPosition, setPenPosition] = useState<{ x: number; y: number } | null>(null);
  const [isPenDrawing, setIsPenDrawing] = useState(false);

  // Initialize Firebase Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const cloudProgress = await loadProgressFromFirebase();
        if (cloudProgress) {
          setProgress(cloudProgress);
        }
      }
    });

    // Initialize sound settings
    soundEngine.setSoundEnabled(settings.soundEffects);
    soundEngine.setMusicEnabled(settings.ambientMusic);
    hapticEngine.setEnabled(settings.hapticFeedback);

    return () => unsubscribe();
  }, []);

  // Save progress changes locally and to cloud
  const updateProgress = useCallback((updater: (prev: PlayerProgress) => PlayerProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      saveLocalProgress(next);
      if (currentUser) {
        syncProgressToFirebase(next).catch(console.error);
      }
      return next;
    });
  }, [currentUser]);

  // Load level coloring and progressive coverage when activeLevelId changes
  useEffect(() => {
    const savedColors = progress.levelColors[activeLevelId] || {};
    const savedCoverage = progress.levelCoverage?.[activeLevelId] || {};
    const isAlreadyCompleted = progress.completedLevels.includes(activeLevelId);

    const initialCoverage: Record<string, number> = {};
    activeLevel.regions.forEach((r) => {
      if (isAlreadyCompleted) {
        initialCoverage[r.id] = 100;
      } else {
        initialCoverage[r.id] = savedCoverage[r.id] !== undefined ? savedCoverage[r.id] : (savedColors[r.id] ? 100 : 0);
      }
    });

    setRegionColors(savedColors);
    setRegionCoverages(initialCoverage);
    setHistory([{ colors: savedColors, coverages: initialCoverage }]);
    setHistoryIndex(0);
    setSelectedColor(activeLevel.palette[0] || '#FF6B8B');
    setActiveTool('brush');
    setHighlightedRegionId(null);
    setIsCompletionOpen(false);
    setHintMessage(null);
  }, [activeLevelId]);

  // Handle progressive stroke update
  const handleUpdateRegionProgress = (regionId: string, color: string, coverage: number) => {
    const newColors = { ...regionColors, [regionId]: color };
    const newCoverages = { ...regionCoverages, [regionId]: coverage };

    setRegionColors(newColors);
    setRegionCoverages(newCoverages);

    // Save to history for undo/redo
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ colors: newColors, coverages: newCoverages });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    // Persist to progress state
    updateProgress((prev) => ({
      ...prev,
      lastPlayedLevelId: activeLevelId,
      currentChapterId: activeLevel.chapterId,
      levelColors: {
        ...prev.levelColors,
        [activeLevelId]: newColors,
      },
      levelCoverage: {
        ...(prev.levelCoverage || {}),
        [activeLevelId]: newCoverages,
      },
    }));

    // Clear highlight if colored
    if (highlightedRegionId === regionId && coverage > 0) {
      setHighlightedRegionId(null);
    }

    // Check if whole picture meets the strict PASS criteria!
    checkLevelPass(newColors, newCoverages);
  };

  // STRICT LEVEL PASS CHECK:
  // "ONLY LEVEL WILL PASS IF THE COLOR USER ADD IS MATCHED WITH THE TARGET"
  // "USER HAVE TO FILL THE ENTIRE SEGMENT TO FILL THE COLOR"
  const checkLevelPass = (currentColors: Record<string, string>, currentCoverages: Record<string, number>) => {
    const totalRegions = activeLevel.regions.length;

    // Check how many regions are 100% filled AND match their required targetColor
    const passedRegions = activeLevel.regions.filter((r) => {
      const cov = currentCoverages[r.id] || 0;
      const col = currentColors[r.id];
      return cov >= 100 && isColorMatch(col, r.targetColor);
    });

    // Check how many regions have 100% coverage
    const fullCoveredCount = activeLevel.regions.filter((r) => (currentCoverages[r.id] || 0) >= 100).length;

    // If all regions are fully covered but some don't match, show guidance
    if (fullCoveredCount >= totalRegions && passedRegions.length < totalRegions) {
      const mismatchedCount = totalRegions - passedRegions.length;
      setHintMessage(`⚠️ ${mismatchedCount} color${mismatchedCount > 1 ? 's' : ''} do not match the target! Check Goal View to pass.`);
      return;
    }

    // ALL REGIONS 100% COVERED AND 100% MATCH TARGET: PASS!
    if (passedRegions.length >= totalRegions) {
      setHintMessage(null);
      const alreadyCompleted = progress.completedLevels.includes(activeLevelId);

      if (!alreadyCompleted) {
        // Award 3 stars and unlock next level!
        const currentLevelIndex = LEVELS.findIndex((l) => l.id === activeLevelId);
        const nextLevel = LEVELS[currentLevelIndex + 1];

        const isDaily = activeLevel.category === 'daily';
        const todayStr = new Date().toISOString().slice(0, 10);

        updateProgress((prev) => {
          const newCompleted = Array.from(new Set([...prev.completedLevels, activeLevelId]));
          const newUnlocked = nextLevel && !isDaily
            ? Array.from(new Set([...prev.unlockedLevels, nextLevel.id]))
            : prev.unlockedLevels;

          const newDailyDates = isDaily && !prev.dailyCompletedDates.includes(todayStr)
            ? [...prev.dailyCompletedDates, todayStr]
            : prev.dailyCompletedDates;

          return {
            ...prev,
            totalStars: prev.totalStars + 3,
            completedLevels: newCompleted,
            unlockedLevels: newUnlocked,
            dailyCompletedDates: newDailyDates,
          };
        });
      }

      // Show completion celebration
      setTimeout(() => {
        setIsCompletionOpen(true);
      }, 350);
    }
  };

  // Undo / Redo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevStep = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setRegionColors(prevStep.colors);
      setRegionCoverages(prevStep.coverages);
      updateProgress((prev) => ({
        ...prev,
        levelColors: {
          ...prev.levelColors,
          [activeLevelId]: prevStep.colors,
        },
        levelCoverage: {
          ...(prev.levelCoverage || {}),
          [activeLevelId]: prevStep.coverages,
        },
      }));
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextStep = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setRegionColors(nextStep.colors);
      setRegionCoverages(nextStep.coverages);
      updateProgress((prev) => ({
        ...prev,
        levelColors: {
          ...prev.levelColors,
          [activeLevelId]: nextStep.colors,
        },
        levelCoverage: {
          ...(prev.levelCoverage || {}),
          [activeLevelId]: nextStep.coverages,
        },
      }));
    }
  };

  // Reset coloring for active level
  const handleResetLevel = () => {
    if (window.confirm('Reset this coloring page back to blank?')) {
      const emptyColors: Record<string, string> = {};
      const emptyCoverages: Record<string, number> = {};
      setRegionColors(emptyColors);
      setRegionCoverages(emptyCoverages);
      setHistory([{ colors: emptyColors, coverages: emptyCoverages }]);
      setHistoryIndex(0);
      setHintMessage(null);
      updateProgress((prev) => ({
        ...prev,
        levelColors: {
          ...prev.levelColors,
          [activeLevelId]: emptyColors,
        },
        levelCoverage: {
          ...(prev.levelCoverage || {}),
          [activeLevelId]: emptyCoverages,
        },
      }));
      soundEngine.playUiClick();
    }
  };

  // Smart Hint: finds first region not matching target, equips its color, and highlights it
  const handleHint = () => {
    soundEngine.playHintTwinkle();
    hapticEngine.lightTap();

    // Find a region that is either uncolored or colored with the wrong color
    const unpassed = activeLevel.regions.find((r) => {
      const cov = regionCoverages[r.id] || 0;
      const col = regionColors[r.id];
      return cov < 100 || !isColorMatch(col, r.targetColor);
    });

    if (unpassed) {
      setHighlightedRegionId(unpassed.id);
      if (unpassed.targetColor) {
        setSelectedColor(unpassed.targetColor);
        setActiveTool('brush');
        setHintMessage(`Target color equipped! Rub & fill ${unpassed.name} 🎯`);
      }
      setTimeout(() => {
        setHighlightedRegionId(null);
      }, 4500);
    } else {
      setHintMessage('All regions match their target colors! Amazing work! ✨');
    }
  };

  // Next level navigation
  const handleNextLevel = () => {
    setIsCompletionOpen(false);
    const currentIndex = LEVELS.findIndex((l) => l.id === activeLevelId);
    if (currentIndex < LEVELS.length - 1) {
      const nextLevel = LEVELS[currentIndex + 1];
      setActiveLevelId(nextLevel.id);
    } else {
      setCurrentView('home');
    }
  };

  // Calculate passed regions (must be 100% filled and match targetColor)
  const totalRegions = activeLevel.regions.length;
  const passedRegionsCount = activeLevel.regions.filter((r) => {
    const cov = regionCoverages[r.id] || 0;
    const col = regionColors[r.id];
    return cov >= 100 && isColorMatch(col, r.targetColor);
  }).length;
  const passPercent = Math.round((passedRegionsCount / totalRegions) * 100);

  const dailyLevel = LEVELS.find((l) => l.id === 'daily_level') || LEVELS[LEVELS.length - 1];

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-slate-200 p-0 sm:p-4 select-none font-sans">
      {/* Mobile Device Frame Container */}
      <div className="relative w-full sm:max-w-[420px] h-[100dvh] sm:h-[860px] sm:max-h-[92vh] bg-white sm:rounded-[44px] shadow-2xl overflow-hidden flex flex-col border sm:border-slate-300">
        
        {/* VIEW 1: HOME SCREEN */}
        {currentView === 'home' && (
          <HomeScreen
            levels={LEVELS.filter((l) => l.category !== 'daily')}
            dailyLevel={dailyLevel}
            progress={progress}
            settings={settings}
            onSelectLevel={(id) => {
              setActiveLevelId(id);
              setCurrentView('game');
            }}
            onOpenDaily={() => setIsDailyOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onToggleSound={() => {
              const val = !settings.soundEffects;
              setSettings((s) => ({ ...s, soundEffects: val }));
              saveLocalSettings({ ...settings, soundEffects: val });
              soundEngine.setSoundEnabled(val);
            }}
            onPreviewTargetLevel={(lvl) => {
              setPreviewModalLevel(lvl);
              setIsTargetPreviewOpen(true);
            }}
          />
        )}

        {/* VIEW 2: GAMEPLAY COLORING VIEW */}
        {currentView === 'game' && (
          <div className="relative flex-1 w-full h-full flex flex-col bg-slate-50 justify-between select-none">
            {/* GAME TOP BAR */}
            <div className="w-full bg-white/95 backdrop-blur-md px-3 py-2 flex items-center justify-between border-b border-slate-100 shadow-sm z-20">
              {/* Left Section: Back Button & Level Badge */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    soundEngine.playUiClick();
                    setCurrentView('home');
                  }}
                  className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-90 transition-all shadow-sm"
                  title="Back to Chapters"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                </button>

                <div className="flex flex-col">
                  <span className="text-[9px] font-black tracking-wider text-slate-400 uppercase leading-none">
                    Ch {activeLevel.chapterId} • Lvl {activeLevel.levelNumber}
                  </span>
                  <span className="text-xs font-black text-slate-800 leading-tight truncate max-w-[85px]">
                    {activeLevel.title}
                  </span>
                </div>
              </div>

              {/* Center Info: Cute Character Reaction Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-slate-100 to-indigo-50/70 border border-slate-200/60 rounded-full shadow-inner">
                <span className="text-sm">{activeLevel.emoji}</span>
                <span className="text-xs font-black text-slate-800">
                  {activeLevel.characterPrompt}
                </span>
              </div>

              {/* Right Section: Target Goal Preview Button & Progress */}
              <div className="flex items-center gap-2">
                {/* Target Goal Artwork Thumbnail Widget */}
                <button
                  onClick={() => {
                    soundEngine.playUiClick();
                    hapticEngine.lightTap();
                    setPreviewModalLevel(activeLevel);
                    setIsTargetPreviewOpen(true);
                  }}
                  className="relative group p-1 bg-amber-50 hover:bg-amber-100 active:scale-95 border-2 border-amber-300 rounded-2xl shadow-xs transition-all flex items-center gap-1"
                  title="View Target Picture"
                >
                  <div className="w-8 h-8 rounded-xl overflow-hidden bg-white flex items-center justify-center p-0.5 shadow-inner">
                    <svg
                      viewBox={activeLevel.viewBox || '0 0 400 400'}
                      className="w-full h-full"
                    >
                      {activeLevel.regions.map((reg) => (
                        <path
                          key={reg.id}
                          d={reg.path}
                          fill={reg.targetColor || '#FF6B8B'}
                          stroke="#18181B"
                          strokeWidth="8"
                        />
                      ))}
                    </svg>
                  </div>
                  <div className="pr-1 text-left hidden xs:flex flex-col">
                    <span className="text-[8px] font-black uppercase text-amber-700 leading-none">
                      GOAL
                    </span>
                    <span className="text-[10px] font-black text-amber-900 leading-none">
                      VIEW
                    </span>
                  </div>
                </button>

                {/* Progress Percentage Badge (Strict: Only counts target-matched regions) */}
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-xs font-black text-slate-800">
                    <span title="Passed matched regions">{passedRegionsCount}/{totalRegions}</span>
                    {passPercent === 100 && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    )}
                  </div>
                  <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-400 transition-all duration-300"
                      style={{ width: `${passPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* In-game floating hint banner */}
            {hintMessage && (
              <div className="mx-3 mt-1.5 px-3 py-1.5 bg-amber-50 border border-amber-300 rounded-2xl text-[11px] font-bold text-amber-900 flex items-center justify-between shadow-xs animate-pop-in z-20">
                <div 
                  onClick={handleHint}
                  className="flex items-center gap-1.5 truncate mr-2 cursor-pointer hover:underline"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <span className="truncate">{hintMessage}</span>
                  <span className="text-[10px] bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded-md font-extrabold flex-shrink-0">
                    Fix
                  </span>
                </div>
                <button
                  onClick={() => setHintMessage(null)}
                  className="text-xs font-black text-amber-600 hover:text-amber-800 p-1"
                >
                  ✕
                </button>
              </div>
            )}

            {/* COLORING CANVAS (Progressive segment rubbing & fill) */}
            <CanvasArea
              level={activeLevel}
              regionColors={regionColors}
              regionCoverages={regionCoverages}
              selectedColor={selectedColor}
              activeTool={activeTool}
              highlightedRegionId={highlightedRegionId}
              isGhostGuideActive={isGhostGuideActive}
              onUpdateRegionProgress={handleUpdateRegionProgress}
              onPointerMove={(pos, isDown) => {
                if (pos) {
                  setPenPosition(pos);
                }
                setIsPenDrawing(isDown);
              }}
              onSelectColor={(col) => setSelectedColor(col)}
            />

            {/* TOOLBAR (Undo, Redo, Eraser, Hint, Reset, Pen Toggle) */}
            <Toolbar
              canUndo={historyIndex > 0}
              canRedo={historyIndex < history.length - 1}
              onUndo={handleUndo}
              onRedo={handleRedo}
              activeTool={activeTool}
              onToggleEraser={() => {
                setActiveTool((curr) => (curr === 'eraser' ? 'brush' : 'eraser'));
              }}
              onHint={handleHint}
              onReset={handleResetLevel}
              showMarkerPen={settings.showMarkerPen}
              onToggleMarkerPen={() => {
                const val = !settings.showMarkerPen;
                setSettings((s) => ({ ...s, showMarkerPen: val }));
                saveLocalSettings({ ...settings, showMarkerPen: val });
              }}
            />

            {/* BOTTOM COLOR PALETTE */}
            <ColorPalette
              colors={activeLevel.palette}
              selectedColor={selectedColor}
              neededTargetColors={activeLevel.regions
                .map((r) => r.targetColor)
                .filter(Boolean) as string[]}
              onSelectColor={(col) => setSelectedColor(col)}
              activeTool={activeTool}
              onSwitchToBrush={() => setActiveTool('brush')}
            />

            {/* 3D FLOATING MARKER PEN (Point is exact with touch coordinate!) */}
            {settings.showMarkerPen && (
              <MarkerPen
                color={activeTool === 'eraser' ? '#FFFFFF' : selectedColor}
                position={penPosition}
                isDrawing={isPenDrawing}
              />
            )}
          </div>
        )}

        {/* MODAL: LEVEL COMPLETE */}
        {isCompletionOpen && (
          <CompletionModal
            level={activeLevel}
            starsEarned={3}
            onNextLevel={handleNextLevel}
            onViewPicture={() => setIsCompletionOpen(false)}
            onHome={() => {
              setIsCompletionOpen(false);
              setCurrentView('home');
            }}
            hasNextLevel={LEVELS.findIndex((l) => l.id === activeLevelId) < LEVELS.length - 1}
          />
        )}

        {/* MODAL: TARGET GOAL PREVIEW (Shows user what final image looks like!) */}
        {isTargetPreviewOpen && (
          <TargetPreviewModal
            level={previewModalLevel || activeLevel}
            onClose={() => setIsTargetPreviewOpen(false)}
            isGhostGuideActive={isGhostGuideActive}
            onToggleGhostGuide={() => setIsGhostGuideActive((g) => !g)}
            onSelectPaletteColor={(col) => {
              setSelectedColor(col);
              setActiveTool('brush');
            }}
          />
        )}

        {/* MODAL: DAILY CHALLENGE */}
        {isDailyOpen && (
          <DailyChallengeModal
            dailyLevel={dailyLevel}
            isCompletedToday={progress.dailyCompletedDates.includes(
              new Date().toISOString().slice(0, 10)
            )}
            onPlayDaily={() => {
              setIsDailyOpen(false);
              setActiveLevelId(dailyLevel.id);
              setCurrentView('game');
            }}
            onClose={() => setIsDailyOpen(false)}
          />
        )}

        {/* MODAL: SETTINGS */}
        {isSettingsOpen && (
          <SettingsModal
            settings={settings}
            onUpdateSettings={(newVals) => {
              const updated = { ...settings, ...newVals };
              setSettings(updated);
              saveLocalSettings(updated);
            }}
            onResetProgress={() => {
              localStorage.clear();
              window.location.reload();
            }}
            onClose={() => setIsSettingsOpen(false)}
            currentUser={currentUser}
            onSyncTrigger={async () => {
              const cloud = await loadProgressFromFirebase();
              if (cloud) setProgress(cloud);
            }}
          />
        )}
      </div>
    </div>
  );
}
