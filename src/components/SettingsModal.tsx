import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Music, 
  Smartphone, 
  Cloud, 
  RotateCcw, 
  Info, 
  PenTool, 
  LogOut,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { GameSettings } from '../types/game';
import { soundEngine } from '../services/soundService';
import { hapticEngine } from '../services/hapticService';
import { auth, signInWithPopup, googleProvider, signOut, User } from '../firebase';

interface SettingsModalProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onResetProgress: () => void;
  onClose: () => void;
  currentUser: User | null;
  onSyncTrigger: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onResetProgress,
  onClose,
  currentUser,
  onSyncTrigger,
}) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  const toggleSound = () => {
    const val = !settings.soundEffects;
    onUpdateSettings({ soundEffects: val });
    soundEngine.setSoundEnabled(val);
    if (val) soundEngine.playUiClick();
  };

  const toggleMusic = () => {
    const val = !settings.ambientMusic;
    onUpdateSettings({ ambientMusic: val });
    soundEngine.setMusicEnabled(val);
  };

  const toggleHaptics = () => {
    const val = !settings.hapticFeedback;
    onUpdateSettings({ hapticFeedback: val });
    hapticEngine.setEnabled(val);
    if (val) hapticEngine.lightTap();
  };

  const toggleMarker = () => {
    onUpdateSettings({ showMarkerPen: !settings.showMarkerPen });
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await signInWithPopup(auth, googleProvider);
      setSyncStatusMsg('Signed in! Cloud sync active.');
      onSyncTrigger();
    } catch (e: unknown) {
      console.error('Sign-in error:', e);
      setSyncStatusMsg('Sign in canceled or unavailable.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setSyncStatusMsg('Signed out.');
    } catch (e) {
      console.error('Sign-out error:', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
      <div className="bg-white rounded-3xl w-full max-w-sm max-h-[90vh] overflow-y-auto no-scrollbar p-6 shadow-2xl border border-slate-100 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-800">Settings</h2>
          </div>
          <button
            onClick={() => {
              soundEngine.playUiClick();
              onClose();
            }}
            className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 active:scale-90 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Audio & Haptic Toggles */}
        <div className="flex flex-col gap-2.5 mb-6">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              {settings.soundEffects ? (
                <Volume2 className="w-5 h-5 text-indigo-500" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-400" />
              )}
              <span className="font-bold text-sm text-slate-700">Sound Effects (ASMR)</span>
            </div>
            <button
              onClick={toggleSound}
              className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-200 ${
                settings.soundEffects ? 'bg-indigo-500 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform" />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              <Music className={`w-5 h-5 ${settings.ambientMusic ? 'text-indigo-500' : 'text-slate-400'}`} />
              <span className="font-bold text-sm text-slate-700">Calming Zen Music</span>
            </div>
            <button
              onClick={toggleMusic}
              className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-200 ${
                settings.ambientMusic ? 'bg-indigo-500 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform" />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              <Smartphone className={`w-5 h-5 ${settings.hapticFeedback ? 'text-indigo-500' : 'text-slate-400'}`} />
              <span className="font-bold text-sm text-slate-700">Haptic Vibration</span>
            </div>
            <button
              onClick={toggleHaptics}
              className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-200 ${
                settings.hapticFeedback ? 'bg-indigo-500 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform" />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              <PenTool className={`w-5 h-5 ${settings.showMarkerPen ? 'text-indigo-500' : 'text-slate-400'}`} />
              <span className="font-bold text-sm text-slate-700">3D Marker Touch Effect</span>
            </div>
            <button
              onClick={toggleMarker}
              className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-200 ${
                settings.showMarkerPen ? 'bg-indigo-500 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform" />
            </button>
          </div>
        </div>

        {/* Google Cloud & Firebase Section */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-blue-50/70 border border-indigo-100 mb-5">
          <div className="flex items-center gap-2 mb-2">
            <Cloud className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-800">Firebase Cloud Save</h3>
          </div>
          <p className="text-xs text-slate-600 mb-3">
            Keep your stars, coloring progress, and unlocked pictures safely backed up to Google Firebase Firestore.
          </p>

          {currentUser ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between bg-white/80 p-2.5 rounded-xl border border-indigo-100">
                <div className="truncate mr-2">
                  <div className="text-xs font-bold text-slate-800 truncate">{currentUser.displayName || 'Google User'}</div>
                  <div className="text-[10px] text-slate-500 truncate">{currentUser.email}</div>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Synced</span>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-slate-600 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 active:scale-95 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-200 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Cloud className="w-4 h-4" />
              <span>{isSigningIn ? 'Connecting...' : 'Sign in with Google to Sync'}</span>
            </button>
          )}

          {syncStatusMsg && (
            <div className="text-[11px] font-medium text-indigo-700 mt-2 text-center">
              {syncStatusMsg}
            </div>
          )}
        </div>

        {/* Reset Progress Section */}
        <div className="mb-5">
          {showConfirmReset ? (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-center animate-pop-in">
              <p className="text-xs font-bold text-rose-700 mb-2">
                Are you sure? This resets all colored regions & starts back at Level 1.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onResetProgress();
                    setShowConfirmReset(false);
                    soundEngine.playUiClick();
                  }}
                  className="flex-1 py-2 bg-rose-600 text-white font-bold text-xs rounded-xl hover:bg-rose-700 active:scale-95 transition-all"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="flex-1 py-2 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-300 active:scale-95 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirmReset(true)}
              className="w-full flex items-center justify-center gap-2 p-3 text-xs font-bold text-rose-600 bg-rose-50/70 hover:bg-rose-100/70 rounded-2xl border border-rose-100 active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Progress</span>
            </button>
          )}
        </div>

        {/* About & Version */}
        <div className="pt-3 border-t border-slate-100 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-bold mb-1">
            <Info className="w-3.5 h-3.5" />
            <span>ColorZen ASMR v1.0.0</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Original Relaxing Art & ASMR Mobile Game
          </p>
          <div className="text-[10px] text-slate-400 mt-1">
            All original vector artwork. Offline-ready & cloud enabled.
          </div>
        </div>
      </div>
    </div>
  );
};
