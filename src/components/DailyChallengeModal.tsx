import React from 'react';
import { Calendar, Sparkles, X, Play, CheckCircle2 } from 'lucide-react';
import { LevelData } from '../types/game';
import { soundEngine } from '../services/soundService';

interface DailyChallengeModalProps {
  dailyLevel: LevelData;
  isCompletedToday: boolean;
  onPlayDaily: () => void;
  onClose: () => void;
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  dailyLevel,
  isCompletedToday,
  onPlayDaily,
  onClose,
}) => {
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-slate-100 text-center relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playUiClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 active:scale-90 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 shadow-md flex items-center justify-center text-3xl mb-3 text-white">
          <Calendar className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>DAILY ART QUEST</span>
        </div>

        <h3 className="text-xl font-black text-slate-800">
          Daily Coloring
        </h3>
        <p className="text-xs font-semibold text-slate-400 mb-4">
          {todayFormatted}
        </p>

        {/* Picture Card Preview */}
        <div className="bg-gradient-to-b from-amber-50 to-orange-50/50 rounded-2xl p-4 border border-amber-100 mb-5 text-center">
          <div className="text-5xl mb-2 animate-bounce">{dailyLevel.emoji}</div>
          <div className="font-bold text-slate-800 text-base">{dailyLevel.title}</div>
          <div className="text-xs text-slate-500">{dailyLevel.characterPrompt}</div>
        </div>

        {isCompletedToday ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-sm bg-emerald-50 py-2.5 px-4 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Completed for Today!</span>
            </div>
            <button
              onClick={() => {
                soundEngine.playUiClick();
                onPlayDaily();
              }}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl active:scale-95 transition-all text-xs"
            >
              Color Again (Free Play)
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              soundEngine.playUiClick();
              onPlayDaily();
            }}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold rounded-2xl shadow-lg shadow-orange-200 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>START DAILY COLORING</span>
          </button>
        )}
      </div>
    </div>
  );
};
