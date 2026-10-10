import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, ArrowRight, Eye, Home, Sparkles } from 'lucide-react';
import { LevelData } from '../types/game';
import { soundEngine } from '../services/soundService';
import { hapticEngine } from '../services/hapticService';

interface CompletionModalProps {
  level: LevelData;
  starsEarned: number;
  onNextLevel: () => void;
  onViewPicture: () => void;
  onHome: () => void;
  hasNextLevel: boolean;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  level,
  starsEarned,
  onNextLevel,
  onViewPicture,
  onHome,
  hasNextLevel,
}) => {
  useEffect(() => {
    // Sound and vibration
    soundEngine.playLevelVictory();
    hapticEngine.levelCompleted();

    // Multistage celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6B8B', '#4ECDC4', '#FFE66D', '#845EC2', '#FF9671'],
    });

    const timer = setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD166', '#06D6A0', '#118AB2', '#EF476F'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD166', '#06D6A0', '#118AB2', '#EF476F'],
      });
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border-4 border-amber-300 text-center relative overflow-hidden">
        {/* Glow Background Gradient */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-br from-amber-200 via-pink-200 to-rose-200 rounded-full blur-2xl opacity-60 pointer-events-none" />

        {/* Level Emoji Badge */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-200 shadow-lg flex items-center justify-center text-4xl mb-3 border-4 border-white animate-bounce">
          {level.emoji}
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>100% COMPLETED</span>
        </div>

        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
          Picture Complete!
        </h2>
        <p className="text-slate-500 text-sm font-semibold mb-4">
          {level.title}
        </p>

        {/* 3 Stars Award Animation */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map((starIdx) => (
            <div
              key={starIdx}
              className={`transform transition-all duration-300 ${
                starIdx <= starsEarned
                  ? 'scale-110 text-amber-400 drop-shadow-md'
                  : 'text-slate-200'
              }`}
            >
              <Star
                className="w-10 h-10"
                fill={starIdx <= starsEarned ? '#FBBF24' : '#E2E8F0'}
                strokeWidth={1.5}
              />
            </div>
          ))}
        </div>

        <p className="text-sm font-bold text-amber-600 mb-6 bg-amber-50 py-1.5 px-3 rounded-xl border border-amber-200/50">
          Super Relaxing & Beautiful! ✨
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          {hasNextLevel && (
            <button
              onClick={() => {
                soundEngine.playUiClick();
                onNextLevel();
              }}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-200 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 text-base"
            >
              <span>NEXT LEVEL</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                soundEngine.playUiClick();
                onViewPicture();
              }}
              className="py-3 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-1.5 text-xs"
            >
              <Eye className="w-4 h-4 text-slate-500" />
              <span>View Art</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playUiClick();
                onHome();
              }}
              className="py-3 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-1.5 text-xs"
            >
              <Home className="w-4 h-4 text-slate-500" />
              <span>Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
