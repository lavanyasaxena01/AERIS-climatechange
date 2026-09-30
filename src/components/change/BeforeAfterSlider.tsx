import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sliders, Sparkles, Layers, Eye, RefreshCw, AlertTriangle, Satellite, Loader2 } from 'lucide-react';
import { getAssetUrl, logImageError } from '../../lib/assetUrl';

interface BeforeAfterSliderProps {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
  changedAreaKm2?: number;
  changedPercent?: number;
  confidence?: number;
  changeMaskUrl?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeUrl,
  afterUrl,
  beforeLabel = 'BASELINE (BEFORE)',
  afterLabel = 'ANOMALY (AFTER)',
  changedAreaKm2,
  changedPercent,
  confidence,
  changeMaskUrl,
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showDifferenceOverlay, setShowDifferenceOverlay] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const [beforeLoaded, setBeforeLoaded] = useState<boolean>(false);
  const [afterLoaded, setAfterLoaded] = useState<boolean>(false);
  const [beforeError, setBeforeError] = useState<boolean>(false);
  const [afterError, setAfterError] = useState<boolean>(false);
  const [reloadKey, setReloadKey] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const resolvedBeforeUrl = getAssetUrl(beforeUrl);
  const resolvedAfterUrl = getAssetUrl(afterUrl);
  const resolvedMaskUrl = changeMaskUrl ? getAssetUrl(changeMaskUrl) : null;

  // Track container width for exact pixel alignment of clipped overlay image
  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Reset loading & error flags when URLs or reloadKey change
  useEffect(() => {
    setBeforeLoaded(false);
    setAfterLoaded(false);
    setBeforeError(false);
    setAfterError(false);
  }, [beforeUrl, afterUrl, reloadKey]);

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

  const handleRetry = () => {
    setReloadKey((prev) => prev + 1);
  };

  const isLoading = (!beforeLoaded || !afterLoaded) && !beforeError && !afterError;

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
          {(beforeError || afterError) && (
            <button
              onClick={handleRetry}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Fetch</span>
            </button>
          )}

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
        className="relative w-full h-[400px] lg:h-[480px] overflow-hidden cursor-ew-resize bg-[#040806]"
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#050b08]/80 backdrop-blur-xs text-emerald-400 font-mono text-xs gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>ACQUIRING SATELLITE TILES &amp; CO-REGISTERING ORBITS...</span>
            </div>
          </div>
        )}

        {/* Error Fallback Banner if images fail */}
        {(beforeError || afterError) && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-[#07130e]/95 backdrop-blur-md">
            <div className="w-12 h-12 rounded-xl bg-rose-950/60 border border-rose-700/50 flex items-center justify-center text-rose-400 mb-3 shadow-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
              Satellite Imagery Tile Acquisition Stalled
            </h4>
            <p className="text-xs text-slate-400 mt-1.5 max-w-md font-sans">
              Could not resolve one or more raster streams over HTTP. Verified local assets are available via fallback pipeline.
            </p>
            <div className="mt-3 p-2 rounded bg-black/60 border border-emerald-950 font-mono text-[11px] text-slate-400 max-w-lg truncate">
              {beforeError && <div>Before URL: {resolvedBeforeUrl}</div>}
              {afterError && <div>After URL: {resolvedAfterUrl}</div>}
            </div>
            <button
              onClick={handleRetry}
              className="mt-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Satellite Retrieval</span>
            </button>
          </div>
        )}

        {/* Underneath layer: After Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            key={`after-${reloadKey}`}
            src={reloadKey ? `${resolvedAfterUrl}?t=${reloadKey}` : resolvedAfterUrl}
            alt="After satellite observation"
            className="w-full h-full object-cover transition-opacity duration-300"
            style={{ opacity: afterLoaded ? 1 : 0 }}
            onLoad={() => setAfterLoaded(true)}
            onError={(e) => {
              setAfterError(true);
              logImageError('BeforeAfterSlider (After Image)', resolvedAfterUrl, e);
            }}
          />

          {/* Difference Mask Overlay */}
          {showDifferenceOverlay && (
            resolvedMaskUrl ? (
              <img
                src={resolvedMaskUrl}
                alt="Change probability mask"
                className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-70 pointer-events-none"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/30 via-rose-500/25 to-transparent mix-blend-screen pointer-events-none" />
            )
          )}

          <div className="absolute bottom-4 right-4 bg-[#06100b]/90 backdrop-blur-md border border-emerald-900/60 rounded px-2.5 py-1 text-xs font-mono text-emerald-300 z-10 shadow-md">
            {afterLabel}
          </div>
        </div>

        {/* Top clipped layer: Before Image */}
        <div
          className="absolute inset-0 h-full overflow-hidden z-10"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            key={`before-${reloadKey}`}
            src={reloadKey ? `${resolvedBeforeUrl}?t=${reloadKey}` : resolvedBeforeUrl}
            alt="Before satellite observation"
            className="absolute inset-0 h-full object-cover max-w-none transition-opacity duration-300"
            style={{
              width: containerWidth > 0 ? `${containerWidth}px` : '100vw',
              opacity: beforeLoaded ? 1 : 0,
            }}
            onLoad={() => setBeforeLoaded(true)}
            onError={(e) => {
              setBeforeError(true);
              logImageError('BeforeAfterSlider (Before Image)', resolvedBeforeUrl, e);
            }}
          />
          <div className="absolute bottom-4 left-4 bg-[#06100b]/90 backdrop-blur-md border border-emerald-900/60 rounded px-2.5 py-1 text-xs font-mono text-slate-300 z-10 shadow-md">
            {beforeLabel}
          </div>
        </div>

        {/* Draggable Vertical Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-emerald-400 cursor-ew-resize z-20 shadow-lg shadow-emerald-400/50"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#08150f] border-2 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-xl cursor-ew-resize">
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
