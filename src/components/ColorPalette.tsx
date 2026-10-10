import React, { useRef } from 'react';
import { Palette, Check, Star } from 'lucide-react';
import { soundEngine } from '../services/soundService';
import { hapticEngine } from '../services/hapticService';
import { isColorMatch } from './CanvasArea';

interface ColorPaletteProps {
  colors: string[];
  selectedColor: string;
  neededTargetColors?: string[];
  onSelectColor: (color: string) => void;
  activeTool: 'brush' | 'eraser';
  onSwitchToBrush: () => void;
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({
  colors,
  selectedColor,
  neededTargetColors = [],
  onSelectColor,
  activeTool,
  onSwitchToBrush,
}) => {
  const customColorInputRef = useRef<HTMLInputElement>(null);

  const handlePickColor = (color: string) => {
    soundEngine.playUiClick();
    hapticEngine.lightTap();
    onSelectColor(color);
    if (activeTool === 'eraser') {
      onSwitchToBrush();
    }
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    handlePickColor(val);
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)] border-t border-slate-100 px-4 py-3 pb-6 select-none">
      {/* Palette Title / Indicator */}
      <div className="flex items-center justify-between mb-2.5 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">Color Palette</span>
          <div
            className="w-4 h-4 rounded-full border border-black/15 shadow-sm transition-colors duration-200"
            style={{ backgroundColor: activeTool === 'eraser' ? '#FFFFFF' : selectedColor }}
          />
        </div>
        <button
          onClick={() => customColorInputRef.current?.click()}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 active:scale-95 px-2.5 py-1 rounded-full transition-all"
        >
          <Palette className="w-3.5 h-3.5 text-indigo-500" />
          <span>More Colors</span>
          <input
            ref={customColorInputRef}
            type="color"
            value={selectedColor}
            onChange={handleCustomColorChange}
            className="opacity-0 w-0 h-0 absolute pointer-events-none"
          />
        </button>
      </div>

      {/* Horizontal Scrollable Palette Row */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1 px-1">
        {colors.map((color, index) => {
          const isSelected = activeTool === 'brush' && isColorMatch(selectedColor, color);
          const isNeededTarget = neededTargetColors.some((tc) => isColorMatch(tc, color));
          const isLight = color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#f9f871' || color.toLowerCase() === '#f1faee' || color.toLowerCase() === '#ffd166';

          return (
            <button
              key={`${color}-${index}`}
              onClick={() => handlePickColor(color)}
              aria-label={`Color ${color}`}
              className={`relative flex-shrink-0 rounded-full transition-all duration-200 active:scale-90 flex items-center justify-center ${
                isSelected
                  ? 'w-12 h-12 -translate-y-1 shadow-lg ring-4 ring-offset-2 ring-indigo-400 scale-110'
                  : 'w-10 h-10 hover:scale-105 shadow-md border-2 border-white'
              }`}
              style={{
                backgroundColor: color,
                boxShadow: isSelected
                  ? `0 10px 20px -3px ${color}66, 0 4px 6px -4px ${color}40`
                  : undefined,
              }}
            >
              {isSelected && (
                <Check
                  className={`w-5 h-5 drop-shadow-sm ${isLight ? 'text-slate-800' : 'text-white'}`}
                  strokeWidth={3}
                />
              )}

              {/* Target Goal indicator dot badge */}
              {isNeededTarget && !isSelected && (
                <span
                  title="Target Goal Color"
                  className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center shadow-xs border border-white text-[8px]"
                >
                  <Star className="w-2 h-2 fill-slate-900 stroke-none" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
