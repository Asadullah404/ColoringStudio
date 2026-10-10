import React, { useRef, useState, useCallback, useEffect } from 'react';
import { LevelData } from '../types/game';
import { soundEngine } from '../services/soundService';
import { hapticEngine } from '../services/hapticService';
import { ZoomIn, ZoomOut, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';

export function isColorMatch(c1?: string, c2?: string): boolean {
  if (!c1 || !c2) return false;
  const n1 = c1.trim().toLowerCase().replace('#', '');
  const n2 = c2.trim().toLowerCase().replace('#', '');
  if (n1 === n2) return true;
  if (n1.length === 3 && n1.split('').map((c) => c + c).join('') === n2) return true;
  if (n2.length === 3 && n2.split('').map((c) => c + c).join('') === n1) return true;
  return false;
}

interface StrokeRecord {
  d: string;
  color: string;
}

interface CanvasAreaProps {
  level: LevelData;
  regionColors: Record<string, string>;
  regionCoverages: Record<string, number>;
  selectedColor: string;
  activeTool: 'brush' | 'eraser';
  highlightedRegionId: string | null;
  isGhostGuideActive?: boolean;
  onUpdateRegionProgress: (regionId: string, color: string, coverage: number) => void;
  onPointerMove?: (point: { x: number; y: number } | null, isDown: boolean) => void;
  onSelectColor?: (color: string) => void;
}

export const CanvasArea: React.FC<CanvasAreaProps> = ({
  level,
  regionColors,
  regionCoverages,
  selectedColor,
  activeTool,
  highlightedRegionId,
  isGhostGuideActive = false,
  onUpdateRegionProgress,
  onPointerMove,
  onSelectColor,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const isDrawingRef = useRef(false);
  const [activeTouchingRegion, setActiveTouchingRegion] = useState<string | null>(null);

  // Store visible marker strokes (lines) drawn by user inside each region
  const [regionStrokes, setRegionStrokes] = useState<Record<string, StrokeRecord[]>>({});
  const activeStrokePointsRef = useRef<{ x: number; y: number }[]>([]);
  const currentRegionIdRef = useRef<string | null>(null);
  const lastCoverageUpdateRef = useRef<number>(0);
  const touchStartRef = useRef<{ x: number; y: number; dist?: number }>({ x: 0, y: 0 });

  // Reset internal strokes when changing levels
  useEffect(() => {
    setRegionStrokes({});
    activeStrokePointsRef.current = [];
    currentRegionIdRef.current = null;
    lastCoverageUpdateRef.current = 0;
    isDrawingRef.current = false;
  }, [level.id]);

  // Convert client viewport X/Y into SVG viewBox (0 0 400 400) coordinates
  const getSvgCoordinates = useCallback((clientX: number, clientY: number): { x: number; y: number } => {
    if (!svgRef.current) return { x: 200, y: 200 };
    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(400, ((clientX - rect.left) / rect.width) * 400));
    const y = Math.max(0, Math.min(400, ((clientY - rect.top) / rect.height) * 400));
    return { x, y };
  }, []);

  // Helper to build smooth SVG path from stroke points
  const pointsToPathD = (points: { x: number; y: number }[]): string => {
    if (points.length === 0) return '';
    if (points.length === 1) {
      return `M ${points[0].x} ${points[0].y} L ${points[0].x + 0.1} ${points[0].y + 0.1}`;
    }
    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 1; i < points.length; i++) {
      const p1 = points[i - 1];
      const p2 = points[i];
      const midX = ((p1.x + p2.x) / 2).toFixed(1);
      const midY = ((p1.y + p2.y) / 2).toFixed(1);
      d += ` Q ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}, ${midX} ${midY}`;
    }
    const last = points[points.length - 1];
    d += ` L ${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
    return d;
  };

  // Add or update active stroke inside region
  const appendActiveStroke = useCallback((regionId: string, color: string, isNewStroke: boolean) => {
    const pts = activeStrokePointsRef.current;
    if (pts.length === 0) return;
    const pathD = pointsToPathD(pts);

    setRegionStrokes((prev) => {
      const currentList = prev[regionId] ? [...prev[regionId]] : [];
      if (isNewStroke || currentList.length === 0) {
        currentList.push({ d: pathD, color });
      } else {
        // Update the last in-progress stroke
        currentList[currentList.length - 1] = { d: pathD, color };
      }
      return {
        ...prev,
        [regionId]: currentList,
      };
    });
  }, []);

  // Core progressive coloring handler
  const handleColorStroke = useCallback(
    (regionId: string, clientX: number, clientY: number, isInitialTap = false) => {
      const currentCov = regionCoverages[regionId] || 0;
      const currentColor = regionColors[regionId];
      const colorToApply = activeTool === 'eraser' ? '#FFFFFF' : selectedColor;
      const svgCoords = getSvgCoordinates(clientX, clientY);

      setActiveTouchingRegion(regionId);

      // Handle Eraser Tool
      if (activeTool === 'eraser') {
        if (currentCov > 0) {
          const newCov = Math.max(0, currentCov - (isInitialTap ? 30 : 15));
          soundEngine.playMarkerStrokeThrottled(80);
          hapticEngine.lightTap();
          if (newCov === 0) {
            setRegionStrokes((prev) => ({ ...prev, [regionId]: [] }));
          }
          onUpdateRegionProgress(regionId, newCov === 0 ? '#FFFFFF' : currentColor, newCov);
        }
        return;
      }

      // If already at 100% solid fill with identical color, play soft squeak
      if (currentCov >= 100 && isColorMatch(currentColor, colorToApply)) {
        soundEngine.playMarkerStrokeThrottled(100);
        return;
      }

      // INITIAL TOUCH DOWN
      if (isInitialTap) {
        currentRegionIdRef.current = regionId;
        activeStrokePointsRef.current = [svgCoords];
        appendActiveStroke(regionId, colorToApply, true);

        // A single tap only gives a tiny marker dot (4% coverage), NOT filling the segment!
        let baseCov = currentCov;
        if (currentColor && !isColorMatch(currentColor, colorToApply) && currentCov >= 100) {
          // If replacing a previously completed solid fill with a new color, start fresh coloring
          baseCov = 10;
          setRegionStrokes((prev) => ({ ...prev, [regionId]: [] }));
        }

        const nextCov = Math.min(100, baseCov + 4);
        lastCoverageUpdateRef.current = nextCov;
        onUpdateRegionProgress(regionId, colorToApply, nextCov);
        soundEngine.playMarkerStrokeThrottled(60);
        hapticEngine.lightTap();
        return;
      }

      // CONTINUOUS MOVEMENT / SCRIBBLING
      const pts = activeStrokePointsRef.current;
      const lastPt = pts[pts.length - 1];
      const dist = lastPt ? Math.hypot(svgCoords.x - lastPt.x, svgCoords.y - lastPt.y) : 10;

      // Add points when moving at least 5 SVG units
      if (dist >= 5) {
        pts.push(svgCoords);
        appendActiveStroke(regionId, colorToApply, false);

        // Increase coverage based on distance scribbled inside the segment
        // ~15-20 movements across the shape fills it to 100%
        const covIncrement = Math.max(2, Math.min(6, Math.round(dist * 0.35)));
        const nextCov = Math.min(100, currentCov + covIncrement);

        if (nextCov !== currentCov) {
          onUpdateRegionProgress(regionId, colorToApply, nextCov);
          soundEngine.playMarkerStrokeThrottled(55);
          hapticEngine.lightTap();

          // On reaching 100% coverage: lines snap into solid color!
          if (nextCov >= 100 && currentCov < 100) {
            const regionObj = level.regions.find((r) => r.id === regionId);
            const matchesTarget = regionObj ? isColorMatch(colorToApply, regionObj.targetColor) : false;

            if (matchesTarget) {
              soundEngine.playRegionComplete();
              hapticEngine.regionFilled();
            } else {
              soundEngine.playColorPop(1.1);
              hapticEngine.lightTap();
            }
          }
        }
      }
    },
    [regionCoverages, regionColors, selectedColor, activeTool, level.regions, getSvgCoordinates, appendActiveStroke, onUpdateRegionProgress]
  );

  // Pointer Down
  const handlePointerDown = (e: React.PointerEvent) => {
    isDrawingRef.current = true;
    setIsDrawing(true);
    touchStartRef.current = { x: e.clientX, y: e.clientY };
    onPointerMove?.({ x: e.clientX, y: e.clientY }, true);

    const element = document.elementFromPoint(e.clientX, e.clientY);
    const regionId = element?.getAttribute('data-region-id');
    if (regionId) {
      handleColorStroke(regionId, e.clientX, e.clientY, true);
    }
  };

  // Pointer Move
  const handlePointerMove = (e: React.PointerEvent) => {
    const isDown = isDrawingRef.current || e.buttons === 1;
    // Keep marker tip locked at pointer position in real-time
    onPointerMove?.({ x: e.clientX, y: e.clientY }, isDown);

    if (isDown) {
      const element = document.elementFromPoint(e.clientX, e.clientY);
      const regionId = element?.getAttribute('data-region-id');

      if (regionId) {
        // If switched regions while dragging, initialize new stroke in new region
        if (currentRegionIdRef.current !== regionId) {
          currentRegionIdRef.current = regionId;
          const svgCoords = getSvgCoordinates(e.clientX, e.clientY);
          activeStrokePointsRef.current = [svgCoords];
          appendActiveStroke(regionId, activeTool === 'eraser' ? '#FFFFFF' : selectedColor, true);
        }
        handleColorStroke(regionId, e.clientX, e.clientY, false);
      }
    }
  };

  // Pointer Up
  const handlePointerUp = (e?: React.SyntheticEvent) => {
    isDrawingRef.current = false;
    setIsDrawing(false);
    setActiveTouchingRegion(null);
    activeStrokePointsRef.current = [];
    currentRegionIdRef.current = null;
    if (e && 'clientX' in e) {
      const mouseOrPointer = e as React.PointerEvent;
      onPointerMove?.({ x: mouseOrPointer.clientX, y: mouseOrPointer.clientY }, false);
    } else {
      onPointerMove?.(null, false);
    }
  };

  // Zoom controls
  const zoomIn = () => setScale((s) => Math.min(s + 0.3, 2.5));
  const zoomOut = () => setScale((s) => Math.max(s - 0.3, 0.8));
  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Multi-touch pinch zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      touchStartRef.current = { x: 0, y: 0, dist };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartRef.current.dist) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const diff = dist - touchStartRef.current.dist;
      setScale((s) => Math.min(Math.max(s + diff * 0.005, 0.8), 2.5));
      touchStartRef.current.dist = dist;
    }
  };

  const activeRegion = level.regions.find((r) => r.id === activeTouchingRegion);
  const activeCov = activeTouchingRegion ? regionCoverages[activeTouchingRegion] || 0 : 0;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handlePointerUp}
      className="relative flex-1 w-full flex items-center justify-center p-3 select-none overflow-hidden touch-none"
    >
      {/* Zoom / Reset floating pill */}
      <div className="absolute top-2 right-3 z-30 flex items-center gap-1.5 bg-white/85 backdrop-blur-md p-1 rounded-full shadow-sm border border-slate-200/80">
        <button
          onClick={zoomIn}
          title="Zoom In"
          className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 active:scale-90 transition-transform"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={zoomOut}
          title="Zoom Out"
          className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 active:scale-90 transition-transform"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        {scale !== 1 && (
          <button
            onClick={resetZoom}
            title="Reset Zoom"
            className="p-1.5 rounded-full hover:bg-slate-100 text-indigo-600 active:scale-90 transition-transform"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Floating active segment progress indicator pill */}
      {isDrawing && activeRegion && activeCov < 100 && (
        <div className="absolute top-3 left-4 z-30 pointer-events-none bg-slate-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-2xl shadow-lg border border-white/20 flex items-center gap-2 animate-pop-in">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-300">
              Scribble lines to fill: {activeRegion.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-amber-300">{activeCov}%</span>
              <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-75"
                  style={{ width: `${activeCov}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Drawing Card / Canvas */}
      <div
        className="relative w-full max-w-[390px] aspect-square bg-white rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-slate-100 p-2 flex items-center justify-center select-none"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          touchAction: 'none',
        }}
      >
        <svg
          ref={svgRef}
          viewBox={level.viewBox || '0 0 400 400'}
          className="w-full h-full filter drop-shadow-sm select-none"
          style={{ shapeRendering: 'geometricPrecision' }}
        >
          <defs>
            {/* Filter for glowing hint highlight */}
            <filter id="hintGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#F59E0B" floodOpacity="0.9" />
            </filter>

            {/* CLIP PATHS FOR EVERY REGION: Ensures marker lines never bleed outside outlines */}
            {level.regions.map((region) => (
              <clipPath key={`clip-${region.id}`} id={`clip-${region.id}`}>
                <path d={region.path} />
              </clipPath>
            ))}
          </defs>

          {/* Clean White Paper Background */}
          <rect width="400" height="400" fill="#FFFFFF" rx="20" />

          {/* LAYER 1: Interactive Coloring Regions */}
          <g id="coloring-regions">
            {level.regions.map((region) => {
              const userColor = regionColors[region.id];
              const cov = regionCoverages[region.id] || 0;
              const isHighlighted = highlightedRegionId === region.id;
              const strokes = regionStrokes[region.id] || [];

              return (
                <g key={region.id}>
                  {/* 1A: Base background / Ghost Guide */}
                  <path
                    d={region.path}
                    fill={
                      isGhostGuideActive && region.targetColor
                        ? region.targetColor
                        : '#FFFFFF'
                    }
                    fillOpacity={isGhostGuideActive && cov === 0 ? 0.35 : 1}
                    className="select-none"
                  />

                  {/* 1B: Visible Marker Lines / Strokes (drawn by the player, clipped inside region!) */}
                  {/* Notice: NO uniform tint! The player sees only their real marker stroke lines! */}
                  {cov < 100 && strokes.length > 0 && (
                    <g clipPath={`url(#clip-${region.id})`}>
                      {strokes.map((stk, sIdx) => (
                        <path
                          key={`stroke-${region.id}-${sIdx}`}
                          d={stk.d}
                          stroke={stk.color}
                          strokeWidth={28}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                          opacity={0.92}
                        />
                      ))}
                    </g>
                  )}

                  {/* 1C: Solid Color Fill (Smoothly activated when coverage reaches 100%!) */}
                  {userColor && cov >= 100 && (
                    <path
                      d={region.path}
                      fill={userColor}
                      className="transition-[fill] duration-200"
                    />
                  )}

                  {/* 1D: Interactive Touch Hitbox Path */}
                  <path
                    data-region-id={region.id}
                    d={region.path}
                    fill="transparent"
                    stroke={isHighlighted ? '#F59E0B' : 'transparent'}
                    strokeWidth={isHighlighted ? 6 : 1}
                    strokeDasharray={isHighlighted ? '8 4' : undefined}
                    className="cursor-pointer active:brightness-95"
                    style={{
                      filter: isHighlighted ? 'url(#hintGlow)' : undefined,
                    }}
                  />
                </g>
              );
            })}
          </g>

          {/* LAYER 2: Crisp Thick Black Outlines (rendered on top so outlines are NEVER obscured) */}
          <g id="black-outlines" className="pointer-events-none select-none">
            {level.regions.map((region) => (
              <path
                key={`outline-${region.id}`}
                d={region.path}
                fill="none"
                stroke="#18181B"
                strokeWidth={level.outlineStrokeWidth || 6}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pointerEvents: 'none' }}
              />
            ))}
          </g>

          {/* LAYER 3: Target Match Status Hints on 100% Filled Segments that DON'T match target */}
          <g id="region-status-indicators" className="pointer-events-none select-none">
            {level.regions.map((region) => {
              const cov = regionCoverages[region.id] || 0;
              const userColor = regionColors[region.id];
              if (cov < 100 || !userColor || !region.targetColor) return null;

              const isMatch = isColorMatch(userColor, region.targetColor);
              // If fully colored but wrong color, show target indicator icon
              if (!isMatch) {
                return (
                  <g key={`mismatch-${region.id}`} className="animate-bounce">
                    <circle cx="200" cy="200" r="0" />
                  </g>
                );
              }
              return null;
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};
