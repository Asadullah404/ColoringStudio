import React, { useState } from 'react';
import { 
  Play, 
  Star, 
  Lock, 
  CheckCircle2, 
  Calendar, 
  Settings, 
  Sparkles, 
  Volume2, 
  VolumeX,
  Palette,
  Eye,
  Check
} from 'lucide-react';
import { LevelData, PlayerProgress, GameSettings } from '../types/game';
import { CHAPTERS } from '../data/levels';
import { soundEngine } from '../services/soundService';
import { hapticEngine } from '../services/hapticService';

interface HomeScreenProps {
  levels: LevelData[];
  dailyLevel: LevelData;
  progress: PlayerProgress;
  settings: GameSettings;
  onSelectLevel: (levelId: string) => void;
  onOpenDaily: () => void;
  onOpenSettings: () => void;
  onToggleSound: () => void;
  onPreviewTargetLevel?: (level: LevelData) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  levels,
  dailyLevel,
  progress,
  settings,
  onSelectLevel,
  onOpenDaily,
  onOpenSettings,
  onToggleSound,
  onPreviewTargetLevel,
}) => {
  const [activeChapterId, setActiveChapterId] = useState<number>(
    progress.currentChapterId || 1
  );
  // Toggle between 'target' (final goal image) and 'progress' (current coloring state)
  const [previewMode, setPreviewMode] = useState<'target' | 'progress'>('target');

  // Filter levels for the active chapter
  const chapterLevels = levels.filter((lvl) => lvl.chapterId === activeChapterId);

  // Find continue level: highest unlocked incomplete level, or last played
  const continueLevelId =
    progress.lastPlayedLevelId && progress.unlockedLevels.includes(progress.lastPlayedLevelId)
      ? progress.lastPlayedLevelId
      : progress.unlockedLevels[progress.unlockedLevels.length - 1] || 'ch1_lvl1';

  const continueLevel = levels.find((l) => l.id === continueLevelId) || levels[0];

  const isDailyCompleted = progress.dailyCompletedDates.includes(
    new Date().toISOString().slice(0, 10)
  );

  const activeChapter = CHAPTERS.find((c) => c.id === activeChapterId) || CHAPTERS[0];

  const completedInChapter = chapterLevels.filter((l) =>
    progress.completedLevels.includes(l.id)
  ).length;

  return (
    <div className="w-full h-full max-w-md mx-auto flex flex-col bg-slate-50 text-slate-800 select-none overflow-y-auto no-scrollbar pb-10">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-20 bg-slate-50/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200/60">
        {/* App Logo & Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-300 shadow-md flex items-center justify-center text-white font-black text-xl border-2 border-white">
            <Palette className="w-5 h-5 text-white drop-shadow-sm" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight leading-none text-slate-900">
              ColorZen <span className="text-rose-500 font-extrabold text-xs uppercase px-1.5 py-0.5 bg-rose-100 rounded-md ml-1">ASMR</span>
            </h1>
            <p className="text-[11px] font-bold text-slate-400 leading-tight">
              Chapters: Shapes • Fruits • Cozy
            </p>
          </div>
        </div>

        {/* Stars Badge & Settings Button */}
        <div className="flex items-center gap-2">
          {/* Total Stars Pill */}
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-full shadow-sm">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400 animate-pulse-glow" />
            <span className="text-xs font-black text-amber-700">
              {progress.totalStars}
            </span>
          </div>

          {/* Quick Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              soundEngine.playUiClick();
            }}
            title="Toggle Sound"
            className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 active:scale-90 transition-all shadow-sm"
          >
            {settings.soundEffects ? (
              <Volume2 className="w-4 h-4 text-indigo-500" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Settings Button */}
          <button
            onClick={() => {
              soundEngine.playUiClick();
              onOpenSettings();
            }}
            title="Settings"
            className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 active:scale-90 transition-all shadow-sm"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-3 flex flex-col gap-4">
        {/* CONTINUE / HERO PLAY CARD */}
        <section
          onClick={() => {
            soundEngine.playUiClick();
            hapticEngine.lightTap();
            onSelectLevel(continueLevel.id);
          }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5 text-white shadow-xl shadow-indigo-200/50 cursor-pointer active:scale-[0.98] transition-all group"
        >
          {/* Decorative background shapes */}
          <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-7xl select-none transform group-hover:scale-110 transition-transform duration-300">
            {continueLevel.emoji}
          </div>

          <div className="relative z-10 max-w-[65%]">
            <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Ch {continueLevel.chapterId} • Lvl {continueLevel.levelNumber}</span>
            </span>
            <h2 className="text-xl font-black leading-tight mb-1 drop-shadow-sm">
              {continueLevel.title}
            </h2>
            <p className="text-xs text-white/80 font-medium mb-3">
              {continueLevel.characterPrompt}
            </p>

            <button className="flex items-center gap-2 bg-white text-indigo-600 font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow-md group-hover:bg-amber-300 group-hover:text-amber-950 transition-colors">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>COLOR NOW</span>
            </button>
          </div>
        </section>

        {/* DAILY COLORING BANNER */}
        <section
          onClick={() => {
            soundEngine.playUiClick();
            onOpenDaily();
          }}
          className="flex items-center justify-between p-4 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 shadow-sm cursor-pointer hover:border-amber-300 active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-2xl shadow-sm">
              {dailyLevel.emoji}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black uppercase text-amber-600 tracking-wider">
                  Daily Challenge
                </span>
                <span className="text-[10px] bg-amber-200/70 text-amber-800 font-bold px-1.5 rounded-md">
                  NEW
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-800">
                {dailyLevel.title}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {isDailyCompleted ? 'Completed today! Tap to replay' : 'Earn bonus stars every day'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {isDailyCompleted ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center shadow-md">
                <Play className="w-4 h-4 fill-white ml-0.5" />
              </div>
            )}
          </div>
        </section>

        {/* CHAPTER SELECTOR TABS */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">
              Select Chapter
            </h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
              {completedInChapter}/{chapterLevels.length} Completed
            </span>
          </div>

          {/* 3 Large Chapter Tabs */}
          <div className="grid grid-cols-3 gap-2">
            {CHAPTERS.map((chap) => {
              const isSelected = activeChapterId === chap.id;
              return (
                <button
                  key={chap.id}
                  onClick={() => {
                    soundEngine.playUiClick();
                    hapticEngine.lightTap();
                    setActiveChapterId(chap.id);
                  }}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? 'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 scale-[1.02]'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200/90'
                  }`}
                >
                  <span className="text-2xl mb-1">{chap.emoji}</span>
                  <span className="text-xs font-black truncate w-full text-center">
                    {chap.badge}
                  </span>
                  <span
                    className={`text-[9px] font-semibold truncate ${
                      isSelected ? 'text-indigo-100' : 'text-slate-400'
                    }`}
                  >
                    Ch {chap.id}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* CHAPTER INFO & PREVIEW TOGGLE BAR */}
        <section className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="text-sm font-black text-slate-800">
              {activeChapter.title}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              {activeChapter.subtitle}
            </div>
          </div>

          {/* Toggle Button: "Show Target Art" vs "My Coloring" */}
          <button
            onClick={() => {
              soundEngine.playUiClick();
              setPreviewMode((m) => (m === 'target' ? 'progress' : 'target'));
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
              previewMode === 'target'
                ? 'bg-amber-50 border-amber-300 text-amber-800 shadow-xs'
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-amber-600" />
            <span>{previewMode === 'target' ? 'Goal Art' : 'My Canvas'}</span>
          </button>
        </section>

        {/* LEVEL SELECTION GRID */}
        <section className="flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-3">
            {chapterLevels.map((level) => {
              // Backward compatibility: check if unlocked
              const isUnlocked =
                progress.unlockedLevels.includes(level.id) ||
                (level.id === 'ch1_lvl1' && progress.unlockedLevels.includes('level_1')) ||
                level.levelNumber === 1; // 1st level of each chapter is playable
              const isCompleted = progress.completedLevels.includes(level.id);

              return (
                <div
                  key={level.id}
                  onClick={() => {
                    if (isUnlocked) {
                      soundEngine.playUiClick();
                      hapticEngine.lightTap();
                      onSelectLevel(level.id);
                    } else {
                      soundEngine.playUiClick();
                    }
                  }}
                  className={`relative flex flex-col items-center justify-between p-3.5 rounded-3xl border transition-all duration-200 ${
                    isUnlocked
                      ? 'bg-white border-slate-200/90 shadow-sm hover:shadow-md cursor-pointer active:scale-95'
                      : 'bg-slate-100/70 border-slate-200/50 opacity-60 cursor-not-allowed'
                  }`}
                >
                  {/* Top card info: Level # & Status */}
                  <div className="w-full flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                      #{level.levelNumber}
                    </span>

                    {isCompleted ? (
                      <div className="flex items-center text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                      </div>
                    ) : isUnlocked ? (
                      <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">
                        PLAY
                      </span>
                    ) : (
                      <div className="p-1 rounded-full bg-slate-200 text-slate-500">
                        <Lock className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  {/* Artwork Preview: Renders either the Target Goal Artwork or user's coloring */}
                  <div className="w-24 h-24 my-1 flex items-center justify-center relative">
                    <svg
                      viewBox={level.viewBox || '0 0 400 400'}
                      className="w-full h-full filter drop-shadow-sm"
                    >
                      {level.regions.map((reg) => {
                        const savedColor = progress.levelColors[level.id]?.[reg.id];
                        // If previewMode is 'target', show the final target colors so user knows what to make!
                        const fill =
                          previewMode === 'target' || isCompleted
                            ? reg.targetColor || '#FF6B8B'
                            : savedColor || '#FFFFFF';

                        return (
                          <path
                            key={reg.id}
                            d={reg.path}
                            fill={fill}
                            stroke="#27272A"
                            strokeWidth="8"
                            strokeLinejoin="round"
                          />
                        );
                      })}
                    </svg>

                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[1px] rounded-2xl flex items-center justify-center">
                        <Lock className="w-6 h-6 text-white drop-shadow" />
                      </div>
                    )}
                  </div>

                  {/* Preview Goal Badge */}
                  {previewMode === 'target' && (
                    <div className="mt-1 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200/70 text-[9px] font-bold text-amber-700 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Final Target Art</span>
                    </div>
                  )}

                  {/* Card Title & Emoji */}
                  <div className="w-full text-center mt-1.5">
                    <div className="text-xs font-black text-slate-800 truncate">
                      {level.emoji} {level.title}
                    </div>
                    <div className="text-[10px] font-semibold text-slate-400 truncate">
                      {level.characterPrompt}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};
