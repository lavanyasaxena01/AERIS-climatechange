import React, { useState, useRef, useCallback } from 'react';
import { Sliders, Sparkles, Layers, Eye } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
  changedAreaKm2?: number;
  changedPercent?: number;
  confidence?: number;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeUrl,
  afterUrl,
  beforeLabel = 'BASELINE (BEFORE)',
  afterLabel = 'ANOMALY (AFTER)',
  changedAreaKm2,
  changedPercent,
  confidence,
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showDifferenceOverlay, setShowDifferenceOverlay] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-emerald-950/80 bg-[#06100b] select-none">
      {/* Top Banner Toolbar */}
      <div className="px-4 py-2.5 bg-[#08130e]/95 border-b border-emerald-950/70 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-200 font-semibold tracking-wide">
            TEMPORAL CO-REGISTERED COMPARISON SLIDER
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDifferenceOverlay(!showDifferenceOverlay)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
              showDifferenceOverlay
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-emerald-950/50 text-slate-300 hover:text-white border border-emerald-900/40'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showDifferenceOverlay ? 'Heatmap: ACTIVE' : 'Toggle Difference Mask'}</span>
          </button>
        </div>
      </div>

      {/* Main Slider Canvas Frame */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[400px] lg:h-[480px] overflow-hidden cursor-ew-resize"
      >
        {/* Underneath layer: After Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={afterUrl}
            alt="After satellite observation"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          {showDifferenceOverlay && (
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/25 via-rose-500/25 to-transparent mix-blend-screen pointer-events-none" />
          )}
          <div className="absolute bottom-4 right-4 bg-[#06100b]/90 backdrop-blur-md border border-emerald-900/60 rounded px-2.5 py-1 text-xs font-mono text-emerald-300">
            {afterLabel}
          </div>
        </div>

        {/* Top clipped layer: Before Image */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeUrl}
            alt="Before satellite observation"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current?.clientWidth || '100%' }}
          />
          <div className="absolute bottom-4 left-4 bg-[#06100b]/90 backdrop-blur-md border border-emerald-900/60 rounded px-2.5 py-1 text-xs font-mono text-slate-300">
            {beforeLabel}
          </div>
        </div>

        {/* Draggable Vertical Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-emerald-400 cursor-ew-resize z-20 shadow-lg shadow-emerald-400/50"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#08150f] border-2 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-xl">
            <Sliders className="w-3.5 h-3.5 rotate-90" />
          </div>
        </div>
      </div>

      {/* Footer Metrics Ribbon */}
      {(changedAreaKm2 !== undefined || changedPercent !== undefined) && (
        <div className="px-4 py-2.5 bg-[#08130e]/95 border-t border-emerald-950/70 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-4 text-slate-300">
            {changedAreaKm2 !== undefined && (
              <div>
                <span className="text-slate-500">CHANGED AREA: </span>
                <span className="text-white font-bold tabular-nums">
                  {changedAreaKm2.toLocaleString()} km²
                </span>
              </div>
            )}
            {changedPercent !== undefined && (
              <div>
                <span className="text-slate-500">COVERAGE Δ: </span>
                <span className="text-amber-400 font-bold tabular-nums">
                  {changedPercent}%
                </span>
              </div>
            )}
            {confidence !== undefined && (
              <div>
                <span className="text-slate-500">CONFIDENCE: </span>
                <span className="text-emerald-400 font-bold tabular-nums">
                  {Math.round(confidence * 100)}%
                </span>
              </div>
            )}
          </div>

          <div className="text-slate-500 text-[11px]">
            Drag slider left/right or click to inspect surface variance
          </div>
        </div>
      )}
    </div>
  );
};
