import React from 'react';
import { Undo2, Redo2, Eraser, Sparkles, RotateCcw, PenTool } from 'lucide-react';
import { soundEngine } from '../services/soundService';
import { hapticEngine } from '../services/hapticService';

interface ToolbarProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  activeTool: 'brush' | 'eraser';
  onToggleEraser: () => void;
  onHint: () => void;
  onReset: () => void;
  showMarkerPen: boolean;
  onToggleMarkerPen: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  activeTool,
  onToggleEraser,
  onHint,
  onReset,
  showMarkerPen,
  onToggleMarkerPen,
}) => {
  const triggerButton = (action: () => void) => {
    soundEngine.playUiClick();
    hapticEngine.lightTap();
    action();
  };

  return (
    <div className="flex items-center justify-between gap-1.5 px-3 py-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 mx-3 mb-2">
      <div className="flex items-center gap-1">
        {/* Undo */}
        <button
          onClick={() => triggerButton(onUndo)}
          disabled={!canUndo}
          title="Undo"
          className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
            canUndo
              ? 'text-slate-700 hover:bg-slate-100 active:scale-90'
              : 'text-slate-300 cursor-not-allowed'
          }`}
        >
          <Undo2 className="w-5 h-5" />
        </button>

        {/* Redo */}
        <button
          onClick={() => triggerButton(onRedo)}
          disabled={!canRedo}
          title="Redo"
          className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
            canRedo
              ? 'text-slate-700 hover:bg-slate-100 active:scale-90'
              : 'text-slate-300 cursor-not-allowed'
          }`}
        >
          <Redo2 className="w-5 h-5" />
        </button>

        {/* Eraser */}
        <button
          onClick={() => triggerButton(onToggleEraser)}
          title="Eraser"
          className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
            activeTool === 'eraser'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-200 scale-105'
              : 'text-slate-700 hover:bg-slate-100 active:scale-90'
          }`}
        >
          <Eraser className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-1">
        {/* Pen Toggle */}
        <button
          onClick={() => triggerButton(onToggleMarkerPen)}
          title="Toggle 3D Marker Pen"
          className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
            showMarkerPen
              ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
              : 'text-slate-400 hover:bg-slate-100'
          }`}
        >
          <PenTool className="w-5 h-5" />
        </button>

        {/* Hint */}
        <button
          onClick={() => triggerButton(onHint)}
          title="Hint - Highlight uncolored region"
          className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-bold rounded-xl shadow-md shadow-amber-200 hover:brightness-105 active:scale-95 transition-all text-xs"
        >
          <Sparkles className="w-4 h-4 fill-white" />
          <span>HINT</span>
        </button>

        {/* Reset */}
        <button
          onClick={() => triggerButton(onReset)}
          title="Reset Coloring"
          className="p-2.5 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 active:scale-90 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
