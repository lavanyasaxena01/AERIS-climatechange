import React, { useState } from 'react';
import { RegionData } from '../../types/climate';
import { GlassCard } from '../common/GlassCard';
import { MetricCard } from '../common/MetricCard';
import { getAssetUrl, logImageError } from '../../lib/assetUrl';
import {
  Droplets,
  Activity,
  Layers,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Info,
  AlertTriangle,
  Loader2,
} from 'lucide-react';

interface WaterViewProps {
  region: RegionData;
}

export const WaterView: React.FC<WaterViewProps> = ({ region }) => {
  const isExpansion = region.metrics.ndwiChangePercent > 0;
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const resolvedUrl = getAssetUrl(region.opticalAfterUrl);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-emerald-950/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
            <Droplets className="w-3.5 h-3.5" />
            <span>HYDROLOGICAL REMOTE SENSING</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">McFeeters Normalized Difference Water Index</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Water-Body Dynamics & Inundation Anomaly
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            NDWI delineates open-water features by enhancing green light reflectance and suppressing near-infrared absorption, tracking retention basin capacity and drought contraction.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <MetricCard
          label="MEAN NDWI (BASELINE)"
          value={region.metrics.ndwiBefore.toFixed(2)}
          subtext="Dry Season Normal"
        />
        <MetricCard
          label="MEAN NDWI (CURRENT)"
          value={region.metrics.ndwiAfter.toFixed(2)}
          subtext="Observation Footprint"
          highlight
        />
        <MetricCard
          label="WATER CHANGE"
          value={region.metrics.ndwiChangePercent > 0 ? `+${region.metrics.ndwiChangePercent}` : region.metrics.ndwiChangePercent}
          unit="%"
          delta={{
            value: isExpansion ? 'Surge / Flood Pulse' : 'Recession / Drought Deficit',
            isNegativeBad: !isExpansion,
          }}
          subtext="Surface Dynamics"
        />
        <MetricCard
          label="SURFACE WATER EXTENT"
          value={region.metrics.floodAreaKm2.toLocaleString()}
          unit="KM²"
          subtext="Delineated Open Water"
        />
      </div>

      {/* Main Imagery & Analysis Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 space-y-3">
          <div className="relative rounded-xl overflow-hidden border border-emerald-950/80 bg-[#06100b] h-[440px]">
            {imgError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#07130e]">
                <AlertTriangle className="w-8 h-8 text-blue-400 mb-2" />
                <div className="text-xs font-mono font-bold text-white uppercase">Hydrological Tile Unavailable</div>
                <div className="text-[11px] font-mono text-slate-400 mt-1 max-w-sm truncate">{resolvedUrl}</div>
                <button
                  onClick={() => { setImgError(false); setImgLoaded(false); }}
                  className="mt-3 px-3 py-1 bg-blue-900/60 hover:bg-blue-800/60 border border-blue-500/40 text-blue-300 text-xs font-mono rounded cursor-pointer"
                >
                  Retry Loading
                </button>
              </div>
            ) : (
              <img
                src={resolvedUrl}
                alt="Hydrological Satellite View"
                className="w-full h-full object-cover transition-opacity duration-300"
                style={{ opacity: imgLoaded ? 1 : 0 }}
                onLoad={() => setImgLoaded(true)}
                onError={(e) => {
                  setImgError(true);
                  logImageError('WaterView', resolvedUrl, e);
                }}
              />
            )}

            {!imgLoaded && !imgError && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#050b08]/80 text-blue-400 font-mono text-xs gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>MEASURING NEAR-INFRARED ABSORPTION COEFFICIENTS...</span>
              </div>
            )}

            {/* NDWI Water Shading Mask */}
            {!imgError && <div className="absolute inset-0 bg-blue-600/30 mix-blend-color pointer-events-none" />}

            <div className="absolute bottom-3 left-3 z-10 bg-[#08130e]/95 backdrop-blur-md border border-emerald-900/60 rounded-lg p-3 text-xs font-mono">
              <div className="text-slate-200 font-bold mb-1">NDWI THRESHOLD CRITERIA</div>
              <div className="text-slate-400 text-[11px]">
                Values &gt; 0.0 indicate high probability open-water bodies (lakes, rivers, flooded basins).
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <GlassCard className="space-y-3.5">
            <div className="text-xs font-mono font-bold text-slate-200 border-b border-emerald-950/70 pb-3">
              NDWI MATHEMATICAL FORMULATION
            </div>

            <div className="p-3 rounded-lg bg-[#040906] border border-emerald-950/80 text-center font-mono text-xs">
              <div className="text-blue-400 font-bold text-sm tracking-wider">
                NDWI = (GREEN - NIR) / (GREEN + NIR)
              </div>
              <div className="text-slate-400 text-[11px] mt-1">
                Sentinel-2: Band 3 (560 nm) & Band 8 (842 nm)
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-400">
              <div className="flex justify-between">
                <span>Hydrological Regime:</span>
                <span className="text-white font-bold">
                  {isExpansion ? 'Alluvial Overflow' : 'Recession Desiccation'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Turbidity Index:</span>
                <span className="text-amber-400">Elevated Sediment Runoff</span>
              </div>
              <div className="flex justify-between">
                <span>Aquifer Recharge Potential:</span>
                <span className="text-emerald-400">High Infiltration Rate</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="space-y-2.5">
            <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              CLIMATE ACTION IMPLICATIONS
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Rapid NDWI shifts indicate acute disruption of the regional hydrological equilibrium. Sustained standing water risks secondary waterborne vector emergence, requiring rapid drainage channel clearance and polder sluice management.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
