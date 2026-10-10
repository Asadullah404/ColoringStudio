import React from 'react';
import { X, Sparkles, Eye, Check, Palette } from 'lucide-react';
import { LevelData } from '../types/game';
import { soundEngine } from '../services/soundService';

interface TargetPreviewModalProps {
  level: LevelData;
  onClose: () => void;
  isGhostGuideActive: boolean;
  onToggleGhostGuide: () => void;
  onSelectPaletteColor?: (color: string) => void;
}

export const TargetPreviewModal: React.FC<TargetPreviewModalProps> = ({
  level,
  onClose,
  isGhostGuideActive,
  onToggleGhostGuide,
  onSelectPaletteColor,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in select-none">
      <div className="bg-white rounded-3xl w-full max-w-sm max-h-[92vh] overflow-y-auto no-scrollbar p-5 shadow-2xl border border-slate-100 relative text-center">
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playUiClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 active:scale-90 transition-all z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>FINAL COLOR GOAL</span>
        </div>

        <h3 className="text-xl font-black text-slate-800">
          Target Artwork Preview
        </h3>
        <p className="text-xs font-semibold text-slate-400 mb-3">
          This is what {level.title} looks like when finished!
        </p>

        {/* Finished Artwork Card */}
        <div className="relative w-full aspect-square max-w-[280px] mx-auto bg-gradient-to-b from-slate-50 to-amber-50/30 rounded-3xl p-3 border-2 border-amber-200/80 shadow-inner flex items-center justify-center mb-4">
          <svg
            viewBox={level.viewBox || '0 0 400 400'}
            className="w-full h-full filter drop-shadow-md"
          >
            {/* Background */}
            <rect width="400" height="400" fill="#FFFFFF" rx="20" />

            {/* Regions filled with their intended target colors */}
            {level.regions.map((reg) => (
              <path
                key={reg.id}
                d={reg.path}
                fill={reg.targetColor || '#FF6B8B'}
                stroke="#18181B"
                strokeWidth={level.outlineStrokeWidth || 6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </svg>

          <div className="absolute bottom-2 right-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-400" />
            <span>Target Goal</span>
          </div>
        </div>

        {/* Recommended Colors Palette breakdown */}
        <div className="mb-4 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Colors in this Picture
            </span>
            <span className="text-[11px] text-indigo-500 font-bold">Tap to equip</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {level.regions.map((reg, idx) => {
              const col = reg.targetColor || '#FF6B8B';
              return (
                <button
                  key={`${reg.id}-${idx}`}
                  onClick={() => {
                    soundEngine.playUiClick();
                    onSelectPaletteColor?.(col);
                    onClose();
                  }}
                  title={`Equip ${reg.name} color (${col})`}
                  className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-white shadow-sm flex items-center justify-center active:scale-90 transition-transform"
                  style={{ backgroundColor: col }}
                />
              );
            })}
          </div>
        </div>

        {/* Ghost Guide Toggle Button */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              soundEngine.playUiClick();
              onToggleGhostGuide();
            }}
            className={`w-full py-3 px-4 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all ${
              isGhostGuideActive
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-200'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>
              {isGhostGuideActive ? 'Ghost Guide: ON (Canvas Overlay)' : 'Turn On Ghost Guide on Canvas'}
            </span>
          </button>

          <button
            onClick={() => {
              soundEngine.playUiClick();
              onClose();
            }}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-xs rounded-2xl shadow-md shadow-indigo-200 transition-all"
          >
            Got it, Let's Color! 🎨
          </button>
        </div>
      </div>
    </div>
  );
};
