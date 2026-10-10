import React from 'react';

interface MarkerPenProps {
  color: string;
  position: { x: number; y: number } | null;
  isDrawing: boolean;
  visible?: boolean;
}

/**
 * 3D Realistic Marker Pen
 * 
 * 100% ABSOLUTE PRECISION ALIGNMENT:
 * 1. The outer <g> performs translate(position.x, position.y) with ZERO CSS transition,
 *    guaranteeing 0ms motion lag: the position is glued to the touch coordinates in real time.
 * 2. The inner <g> performs rotate(angle) around (0, 0).
 * 3. The sharp chisel nib vertex and ink contact dot are located precisely at (0, 0).
 *    Because (0, 0) is the center of rotation, rotation NEVER moves the nib tip.
 * 4. Therefore, the nib tip touches EXACTLY at (position.x, position.y) with 100% accuracy.
 */
export const MarkerPen: React.FC<MarkerPenProps> = ({
  color,
  position,
  isDrawing,
  visible = true,
}) => {
  if (!visible || !position) return null;

  return (
    <svg
      className="pointer-events-none fixed inset-0 w-full h-full z-50 select-none overflow-visible"
      style={{ pointerEvents: 'none' }}
    >
      <defs>
        {/* Cylindrical Barrel 3D Gradient */}
        <linearGradient id="markerBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.36" />
          <stop offset="25%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="65%" stopColor={color} />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.38" />
        </linearGradient>

        {/* Ergonomic Collar Grip Gradient */}
        <linearGradient id="markerGripGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#607D8B" />
          <stop offset="30%" stopColor="#ECEFF1" />
          <stop offset="75%" stopColor="#90A4AE" />
          <stop offset="100%" stopColor="#455A64" />
        </linearGradient>

        {/* Chisel Nib 3D Felt Gradient */}
        <linearGradient id="markerTipGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.28" />
          <stop offset="40%" stopColor={color} />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.32" />
        </linearGradient>

        {/* Soft Drop Shadow for Realistic Depth */}
        <filter id="markerShadow" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="10" dy="14" stdDeviation="6" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Outer Group: Instantaneous translation (ZERO lag behind finger) */}
      <g transform={`translate(${position.x}, ${position.y})`}>
        {/* Inner Group: Rotates around (0, 0) naturally at 22°-27° */}
        <g
          transform={`rotate(${isDrawing ? 22 : 27})`}
          style={{
            transition: 'transform 0.06s ease-out',
          }}
        >
          {/* Pen Body with Realistic 3D Shadow */}
          <g filter="url(#markerShadow)">
            {/* 1. Main Cylindrical Marker Barrel */}
            <path
              d="M -13 -52 L 13 -52 L 12 -162 L -12 -162 Z"
              fill={color}
            />
            <path
              d="M -13 -52 L 13 -52 L 12 -162 L -12 -162 Z"
              fill="url(#markerBodyGrad)"
            />

            {/* 2. Top Dome Cap */}
            <path
              d="M -12 -162 C -12 -178 12 -178 12 -162 Z"
              fill={color}
              filter="brightness(0.85)"
            />
            <path
              d="M -8 -164 C -8 -174 8 -174 8 -164 Z"
              fill="rgba(255, 255, 255, 0.4)"
            />

            {/* 3. Collar Grip Section */}
            <path
              d="M -10 -26 L 10 -26 L 13 -52 L -13 -52 Z"
              fill="url(#markerGripGrad)"
            />
            {/* Grip Texture Ribs */}
            <line x1="-11" y1="-34" x2="11" y2="-34" stroke="rgba(0,0,0,0.22)" strokeWidth="1.5" />
            <line x1="-12" y1="-40" x2="12" y2="-40" stroke="rgba(0,0,0,0.22)" strokeWidth="1.5" />
            <line x1="-12" y1="-46" x2="12" y2="-46" stroke="rgba(0,0,0,0.22)" strokeWidth="1.5" />

            {/* 4. Chisel Felt Nib - VERTEX IS PRECISELY AT (0, 0) */}
            <path
              d="M -8 -26 L 8 -26 L 4 -2 L 0 0 L -5 -6 Z"
              fill={color}
            />
            <path
              d="M -8 -26 L 8 -26 L 4 -2 L 0 0 L -5 -6 Z"
              fill="url(#markerTipGrad)"
            />

            {/* Chisel Nib Sharp Edge Highlight */}
            <path
              d="M -2 -22 L 1 -22 L -1 -3 L -2 -3 Z"
              fill="rgba(255, 255, 255, 0.65)"
            />
          </g>

          {/* 5. Contact Ink Dot directly at (0, 0) */}
          {isDrawing && (
            <circle cx="0" cy="0" r="10" fill={color} opacity="0.35" />
          )}
          <circle
            cx="0"
            cy="0"
            r={isDrawing ? 4.5 : 2.5}
            fill={color}
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
        </g>
      </g>
    </svg>
  );
};
