import React, { useState } from 'react';
import { RegionData } from '../../types/climate';
import { GlassCard } from '../common/GlassCard';
import { MetricCard } from '../common/MetricCard';
import { ClimateRiskBadge } from '../common/ClimateRiskBadge';
import {
  Waves,
  Radio,
  Users,
  Wheat,
  ShieldAlert,
  Sparkles,
  Layers,
  ArrowUpRight,
  Droplets,
  AlertTriangle,
} from 'lucide-react';

interface FloodIntelligenceViewProps {
  region: RegionData;
}

export const FloodIntelligenceView: React.FC<FloodIntelligenceViewProps> = ({ region }) => {
  const [activeViewMode, setActiveViewMode] = useState<'sar' | 'optical' | 'mask'>('sar');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-emerald-950/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Waves className="w-3.5 h-3.5" />
            <span>PRIMARY CLIMATE WORKFLOW</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">Sen1Floods11 Validated Inundation Segmenter</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Flood Inundation & Hazard Intelligence
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Synthetic Aperture Radar (SAR) penetrates cloud cover and heavy rain storms to delineate standing water surfaces, estimate depth thresholds, and quantify demographic exposure.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ClimateRiskBadge level={region.metrics.riskLevel} score={region.metrics.riskScore} size="md" />
        </div>
      </div>

      {/* Primary KPI Grid (4 headline indicators as requested in brief) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <MetricCard
          label="FLOOD EXTENT"
          value={region.metrics.floodAreaKm2.toLocaleString()}
          unit="KM²"
          subtext="Surface Water Delineated"
          highlight
        />
        <MetricCard
          label="AREA AFFECTED"
          value={region.metrics.floodPercentage}
          unit="%"
          delta={{ value: `of ${region.metrics.totalAreaKm2.toLocaleString()} km²`, isNegativeBad: true }}
          subtext="Submerged Proportion"
        />
        <MetricCard
          label="RISK SEVERITY"
          value={region.metrics.riskScore}
          unit="/100"
          subtext={region.metrics.riskLevel}
          highlight={region.metrics.riskScore >= 70}
        />
        <MetricCard
          label="SENSOR CONFIDENCE"
          value={Math.round(region.metrics.confidence * 100)}
          unit="%"
          subtext="Radar Backscatter SNR"
        />
      </div>

      {/* Secondary Impact Metrics (Population, Cropland, Infrastructure) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <GlassCard className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-rose-950/70 border border-rose-600/40 flex items-center justify-center text-rose-400 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              POPULATION EXPOSED
            </div>
            <div className="text-xl font-mono font-bold text-white tabular-nums">
              {region.metrics.populationExposed.toLocaleString()}
            </div>
            <div className="text-[11px] text-rose-400 font-mono mt-0.5">
              High vulnerability union councils
            </div>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-950/70 border border-amber-600/40 flex items-center justify-center text-amber-400 shrink-0">
            <Wheat className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              CROPLAND SUBMERGED
            </div>
            <div className="text-xl font-mono font-bold text-white tabular-nums">
              {region.metrics.croplandImpactedHa.toLocaleString()} ha
            </div>
            <div className="text-[11px] text-amber-400 font-mono mt-0.5">
              Agricultural harvest damage
            </div>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-cyan-950/70 border border-cyan-600/40 flex items-center justify-center text-cyan-400 shrink-0">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              SENSOR PENETRATION
            </div>
            <div className="text-xl font-mono font-bold text-white tabular-nums">
              100% C-BAND
            </div>
            <div className="text-[11px] text-cyan-400 font-mono mt-0.5">
              Zero cloud occlusion degradation
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Main Dual Imagery & Raster Flood Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 space-y-3">
          <div className="relative rounded-xl overflow-hidden border border-emerald-950/80 bg-[#06100b] h-[440px]">
            {activeViewMode === 'sar' && (
              <img
                src={region.sarUrl}
                alt="Sentinel-1 SAR Radar Imagery"
                className="w-full h-full object-cover"
              />
            )}
            {activeViewMode === 'optical' && (
              <img
                src={region.opticalAfterUrl}
                alt="Sentinel-2 Optical Post-Flood"
                className="w-full h-full object-cover"
              />
            )}
            {activeViewMode === 'mask' && (
              <div className="relative w-full h-full">
                <img
                  src={region.opticalAfterUrl}
                  alt="Flood Mask Overlay"
                  className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-cyan-500/35 mix-blend-color-dodge pointer-events-none" />
              </div>
            )}

            {/* View Mode Switcher Header Overlay */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-[#08130e]/95 backdrop-blur-md border border-emerald-900/60 rounded-lg p-1 text-xs font-mono">
              <button
                onClick={() => setActiveViewMode('sar')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeViewMode === 'sar'
                    ? 'bg-cyan-500/25 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sentinel-1 SAR (Radar)
              </button>
              <button
                onClick={() => setActiveViewMode('optical')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeViewMode === 'optical'
                    ? 'bg-cyan-500/25 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sentinel-2 Optical (MSI)
              </button>
              <button
                onClick={() => setActiveViewMode('mask')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeViewMode === 'mask'
                    ? 'bg-cyan-500/25 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Inundation Segmentation Mask
              </button>
            </div>

            {/* Bottom Inundation Legend */}
            <div className="absolute bottom-3 left-3 z-10 bg-[#08130e]/90 backdrop-blur-md border border-emerald-900/60 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-300 flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-cyan-400" />
                <span>Permanent & Flash Water Body (&gt; 0.8m)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-amber-400" />
                <span>Shallow Waterlogging (&lt; 0.4m)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI Flood Impact Narrative & Adaptation Steps */}
        <div className="lg:col-span-4 space-y-4">
          <GlassCard glow className="space-y-3.5">
            <div className="flex items-center gap-2 border-b border-emerald-950/70 pb-3">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-bold tracking-wider text-slate-200">
                AI FLOOD IMPACT EXPLANATION
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Satellite observations indicate significant surface-water expansion across the alluvial plains of {region.name}. Radar backscatter thresholding (VV polarization &lt; -16.2 dB) identifies {region.metrics.floodAreaKm2.toLocaleString()} km² of deep standing water, isolating access corridors and causing acute water-logging across {region.metrics.croplandImpactedHa.toLocaleString()} hectares of standing crops.
            </p>

            <div className="space-y-2 pt-2 border-t border-emerald-950/70">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Emergency Adaptation Actions:
              </div>
              {region.adaptationActions.map((action, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{action}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="space-y-2.5">
            <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              RADAR ACQUISITION PARAMETERS
            </div>
            <div className="space-y-1.5 text-xs font-mono text-slate-400">
              <div className="flex justify-between">
                <span>Satellite:</span>
                <span className="text-white">Sentinel-1A (C-Band 5.405 GHz)</span>
              </div>
              <div className="flex justify-between">
                <span>Polarization:</span>
                <span className="text-cyan-400">Dual VV + VH Co-polar</span>
              </div>
              <div className="flex justify-between">
                <span>Swath Mode:</span>
                <span className="text-white">Interferometric Wide (IW)</span>
              </div>
              <div className="flex justify-between">
                <span>Orbit Pass:</span>
                <span className="text-white">Descending Orbit #142</span>
              </div>
              <div className="flex justify-between">
                <span>Validation Benchmark:</span>
                <span className="text-emerald-400">Sen1Floods11 Ground Truth</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
