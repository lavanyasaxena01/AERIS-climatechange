import React, { useState } from 'react';
import { RegionData } from '../../types/climate';
import { GlassCard } from '../common/GlassCard';
import { MetricCard } from '../common/MetricCard';
import { getAssetUrl, logImageError } from '../../lib/assetUrl';
import {
  Trees,
  TrendingDown,
  Layers,
  Leaf,
  Activity,
  AlertOctagon,
  CheckCircle2,
  Info,
  AlertTriangle,
  Loader2,
} from 'lucide-react';

interface VegetationViewProps {
  region: RegionData;
}

export const VegetationView: React.FC<VegetationViewProps> = ({ region }) => {
  const [selectedDisplay, setSelectedDisplay] = useState<'ndvi' | 'loss' | 'optical'>('ndvi');
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const resolvedUrl = getAssetUrl(region.opticalAfterUrl);

  // NDVI interpretation status
  let healthCategory: 'Stable' | 'Improving' | 'Declining' | 'Severe decline' = 'Stable';
  if (region.metrics.ndviChangePercent < -25) {
    healthCategory = 'Severe decline';
  } else if (region.metrics.ndviChangePercent < -10) {
    healthCategory = 'Declining';
  } else if (region.metrics.ndviChangePercent > 5) {
    healthCategory = 'Improving';
  }

  // Simulated temporal trajectory points
  const timeSeries = [
    { date: 'T-12 Mo', ndvi: region.metrics.ndviBefore + 0.05 },
    { date: 'T-6 Mo', ndvi: region.metrics.ndviBefore + 0.02 },
    { date: 'T-3 Mo', ndvi: region.metrics.ndviBefore },
    { date: 'Baseline', ndvi: region.metrics.ndviBefore },
    { date: 'Event Peak', ndvi: region.metrics.ndviAfter - 0.04 },
    { date: 'Current', ndvi: region.metrics.ndviAfter },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-emerald-950/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <Trees className="w-3.5 h-3.5" />
            <span>SPECTRAL VEGETATION INTELLIGENCE</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">Sentinel-2 Red Edge & NIR BOA Reflectance</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Vegetation Health & Forest Canopy Monitoring
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Normalized Difference Vegetation Index (NDVI) computes chlorophyll absorption and mesophyll cellular structure to quantify canopy degradation and biomass perturbation.
          </p>
        </div>

        {/* Display Selector */}
        <div className="flex items-center gap-1 bg-[#09150f] p-1 rounded-lg border border-emerald-900/60 text-xs font-mono">
          <button
            onClick={() => setSelectedDisplay('ndvi')}
            className={`px-3 py-1.5 rounded transition-colors ${
              selectedDisplay === 'ndvi'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            NDVI Index Map
          </button>
          <button
            onClick={() => setSelectedDisplay('loss')}
            className={`px-3 py-1.5 rounded transition-colors ${
              selectedDisplay === 'loss'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Canopy Loss Mask
          </button>
          <button
            onClick={() => setSelectedDisplay('optical')}
            className={`px-3 py-1.5 rounded transition-colors ${
              selectedDisplay === 'optical'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Optical Reflectance
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <MetricCard
          label="MEAN NDVI (BEFORE)"
          value={region.metrics.ndviBefore.toFixed(2)}
          subtext="Healthy Vegetative Canopy"
        />
        <MetricCard
          label="MEAN NDVI (AFTER)"
          value={region.metrics.ndviAfter.toFixed(2)}
          subtext="Post-Event Stressed State"
          highlight
        />
        <MetricCard
          label="NDVI CHANGE"
          value={region.metrics.ndviChangePercent}
          unit="%"
          delta={{ value: healthCategory, isNegativeBad: true }}
          subtext="Canopy Biomass Delta"
        />
        <MetricCard
          label="ESTIMATED LOSS"
          value={Math.round((region.metrics.changedAreaKm2 * 100) * 0.45).toLocaleString()}
          unit="HA"
          subtext="Degraded Vegetative Area"
        />
      </div>

      {/* NDVI Map Viewer & Scientific Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Simulated NDVI Spectral Raster Canvas */}
        <div className="lg:col-span-8 space-y-3">
          <div className="relative rounded-xl overflow-hidden border border-emerald-950/80 bg-[#06100b] h-[440px]">
            {imgError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#07130e]">
                <AlertTriangle className="w-8 h-8 text-rose-400 mb-2" />
                <div className="text-xs font-mono font-bold text-white uppercase">Vegetation Tile Unavailable</div>
                <div className="text-[11px] font-mono text-slate-400 mt-1 max-w-sm truncate">{resolvedUrl}</div>
                <button
                  onClick={() => { setImgError(false); setImgLoaded(false); }}
                  className="mt-3 px-3 py-1 bg-emerald-900/60 hover:bg-emerald-800/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono rounded cursor-pointer"
                >
                  Retry Loading
                </button>
              </div>
            ) : (
              <img
                src={resolvedUrl}
                alt="Vegetation Satellite Imagery"
                className="w-full h-full object-cover transition-opacity duration-300"
                style={{ opacity: imgLoaded ? 1 : 0 }}
                onLoad={() => setImgLoaded(true)}
                onError={(e) => {
                  setImgError(true);
                  logImageError('VegetationView', resolvedUrl, e);
                }}
              />
            )}

            {!imgLoaded && !imgError && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#050b08]/80 text-emerald-400 font-mono text-xs gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>CALCULATING CHLOROPHYLL SPECTRAL RESPONSE...</span>
              </div>
            )}

            {/* NDVI Synthetic False-Color Shader Overlay */}
            {selectedDisplay === 'ndvi' && !imgError && (
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/60 via-amber-900/40 to-rose-900/50 mix-blend-color pointer-events-none" />
            )}
            {selectedDisplay === 'loss' && !imgError && (
              <div className="absolute inset-0 bg-rose-600/30 mix-blend-multiply pointer-events-none" />
            )}

            {/* Scientific NDVI Ramp Legend */}
            <div className="absolute bottom-3 left-3 right-3 z-10 bg-[#08130e]/95 backdrop-blur-md border border-emerald-900/60 rounded-lg p-3 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-300 mb-1.5 text-[11px]">
                <span className="text-rose-400">&lt; 0.10 Water / Bare Soil</span>
                <span className="text-amber-400">0.20 - 0.40 Sparse / Stressed</span>
                <span className="text-emerald-400">0.50 - 0.70 Dense Green Canopy</span>
                <span className="text-cyan-400">&gt; 0.80 Peak Rainforest</span>
              </div>
              <div className="h-2 rounded-full w-full bg-gradient-to-r from-rose-700 via-amber-500 to-emerald-500" />
            </div>
          </div>
        </div>

        {/* Right: Temporal Trend & Index Formula */}
        <div className="lg:col-span-4 space-y-4">
          <GlassCard className="space-y-3.5">
            <div className="text-xs font-mono font-bold text-slate-200 border-b border-emerald-950/70 pb-3">
              NDVI FORMULATION & SPECTRAL BANDS
            </div>

            <div className="p-3 rounded-lg bg-[#040906] border border-emerald-950/80 text-center font-mono text-xs">
              <div className="text-emerald-400 font-bold text-sm tracking-wider">
                NDVI = (NIR - RED) / (NIR + RED)
              </div>
              <div className="text-slate-400 text-[11px] mt-1">
                Sentinel-2: Band 8 (842 nm) & Band 4 (665 nm)
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-400">
              <div className="flex justify-between">
                <span>Vegetation Health Index:</span>
                <span className="text-rose-400 font-bold">{healthCategory.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span>Coherence With Precipitation:</span>
                <span className="text-white">R² = 0.88</span>
              </div>
              <div className="flex justify-between">
                <span>Canopy Height Impact:</span>
                <span className="text-amber-400">-3.2m Estimated Mean</span>
              </div>
            </div>
          </GlassCard>

          {/* Time Series Trend Card */}
          <GlassCard className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-200 border-b border-emerald-950/70 pb-2">
              <span>TEMPORAL TRAJECTORY</span>
              <span className="text-rose-400">{region.metrics.ndviChangePercent}% NET</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {timeSeries.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">{item.date}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-[#040a07] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${Math.max(0, Math.min(100, item.ndvi * 100))}%` }}
                      />
                    </div>
                    <span className="text-white text-[11px] tabular-nums font-bold w-10 text-right">
                      {item.ndvi.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
