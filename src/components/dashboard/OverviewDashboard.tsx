import React from 'react';
import { RegionData, RiskLevel } from '../../types/climate';
import { MetricCard } from '../common/MetricCard';
import { ClimateRiskBadge } from '../common/ClimateRiskBadge';
import { GlassCard } from '../common/GlassCard';
import { InteractiveMap } from './InteractiveMap';
import {
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Activity,
  Trees,
  Waves,
  MapPin,
  Calendar,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { NavTab } from '../layout/TopNavigation';

interface OverviewDashboardProps {
  region: RegionData;
  onNavigateTab: (tab: NavTab) => void;
  onSelectRegion: (region: RegionData) => void;
  allRegions: RegionData[];
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  region,
  onNavigateTab,
  onSelectRegion,
  allRegions,
}) => {
  return (
    <div className="space-y-6">
      {/* Hero Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-emerald-950/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>EARTH OBSERVATION INTELLIGENCE PLATFORM</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">DEMO MODE ACTIVE</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Climate Intelligence Overview
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl text-balance">
            Monitor environmental change, compound hydrological shocks, and ecosystem stress derived from multimodal Sentinel-1 SAR and Sentinel-2 optical satellites.
          </p>
        </div>

        {/* Region Quick Switcher & Observation metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="bg-[#09150f] border border-emerald-900/60 rounded-lg px-3 py-1.5 text-slate-300 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>OBSERVED: {region.lastObserved.split(' ')[0]}</span>
          </div>
          <ClimateRiskBadge level={region.metrics.riskLevel} score={region.metrics.riskScore} size="md" />
        </div>
      </div>

      {/* KPI Stat Cards Grid (6 cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <MetricCard
          label="TOTAL AREA"
          value={region.metrics.totalAreaKm2.toLocaleString()}
          unit="KM²"
          subtext="Sensor Footprint"
        />
        <MetricCard
          label="CHANGE DETECTED"
          value={region.metrics.changedPercentage}
          unit="%"
          delta={{ value: `+${region.metrics.changedAreaKm2} km²`, isNegativeBad: false }}
          subtext="Surface Variance"
          highlight={region.metrics.changedPercentage > 20}
        />
        <MetricCard
          label="VEGETATION Δ"
          value={region.metrics.ndviChangePercent}
          unit="%"
          delta={{ value: `${region.metrics.ndviBefore} → ${region.metrics.ndviAfter}`, isNegativeBad: true }}
          subtext="Mean NDVI Loss"
        />
        <MetricCard
          label="FLOOD IMPACT"
          value={region.metrics.floodAreaKm2.toLocaleString()}
          unit="KM²"
          delta={{ value: `${region.metrics.floodPercentage}% of AOI`, isNegativeBad: true }}
          subtext="Inundated Surface"
          highlight={region.metrics.floodAreaKm2 > 100}
        />
        <MetricCard
          label="CLIMATE RISK"
          value={region.metrics.riskScore}
          unit="/100"
          subtext={region.metrics.riskLevel}
          highlight={region.metrics.riskScore >= 70}
        />
        <MetricCard
          label="AI CONFIDENCE"
          value={Math.round(region.metrics.confidence * 100)}
          unit="%"
          subtext="Optical + SAR Fusion"
        />
      </div>

      {/* Main Grid: Interactive Map (flex-1) + Region Intelligence Panel (w-80 / w-96) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Large Interactive Map Stage */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <InteractiveMap region={region} onSelectRegion={onSelectRegion} />

          {/* Quick Sub-navigation Action Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={() => onNavigateTab('change')}
              className="flex items-center justify-between p-3 rounded-lg bg-[#08130e]/80 hover:bg-[#0d1d15] border border-emerald-950/70 hover:border-emerald-600/40 text-left transition-all cursor-pointer group"
            >
              <div>
                <div className="text-[11px] font-mono text-slate-400">MODULE 01</div>
                <div className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300">
                  Change Detection
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-500/60 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onNavigateTab('flood')}
              className="flex items-center justify-between p-3 rounded-lg bg-[#08130e]/80 hover:bg-[#0d1d15] border border-emerald-950/70 hover:border-emerald-600/40 text-left transition-all cursor-pointer group"
            >
              <div>
                <div className="text-[11px] font-mono text-slate-400">MODULE 02</div>
                <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">
                  Flood Intelligence
                </div>
              </div>
              <Waves className="w-4 h-4 text-cyan-500/60 group-hover:text-cyan-400" />
            </button>

            <button
              onClick={() => onNavigateTab('vegetation')}
              className="flex items-center justify-between p-3 rounded-lg bg-[#08130e]/80 hover:bg-[#0d1d15] border border-emerald-950/70 hover:border-emerald-600/40 text-left transition-all cursor-pointer group"
            >
              <div>
                <div className="text-[11px] font-mono text-slate-400">MODULE 03</div>
                <div className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300">
                  Vegetation NDVI
                </div>
              </div>
              <Trees className="w-4 h-4 text-emerald-500/60 group-hover:text-emerald-400" />
            </button>

            <button
              onClick={() => onNavigateTab('risk')}
              className="flex items-center justify-between p-3 rounded-lg bg-[#08130e]/80 hover:bg-[#0d1d15] border border-emerald-950/70 hover:border-emerald-600/40 text-left transition-all cursor-pointer group"
            >
              <div>
                <div className="text-[11px] font-mono text-slate-400">MODULE 04</div>
                <div className="text-xs font-semibold text-slate-200 group-hover:text-amber-300">
                  Risk Engine
                </div>
              </div>
              <ShieldAlert className="w-4 h-4 text-amber-500/60 group-hover:text-amber-400" />
            </button>
          </div>
        </div>

        {/* Right: Region Intelligence Panel */}
        <div className="lg:col-span-4 space-y-4">
          <GlassCard glow className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-950/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                  Region Intelligence
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                ACTIVE AOI
              </span>
            </div>

            <div>
              <h2 className="text-base font-bold text-white leading-snug">
                {region.name}
              </h2>
              <div className="text-xs text-slate-400 mt-1">
                {region.biome} · {region.country}
              </div>
            </div>

            {/* Biophysical Indicator Summary Bars */}
            <div className="space-y-2.5 pt-2 font-mono text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">FLOOD SEVERITY (35%)</span>
                  <span className="text-cyan-400 font-bold">{region.riskBreakdown.floodSeverity}/100</span>
                </div>
                <div className="w-full bg-[#040906] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${region.riskBreakdown.floodSeverity}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">VEGETATION DECLINE (25%)</span>
                  <span className="text-rose-400 font-bold">{region.riskBreakdown.vegetationDecline}/100</span>
                </div>
                <div className="w-full bg-[#040906] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-rose-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${region.riskBreakdown.vegetationDecline}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">WATER ANOMALY (15%)</span>
                  <span className="text-blue-400 font-bold">{region.riskBreakdown.waterAnomaly}/100</span>
                </div>
                <div className="w-full bg-[#040906] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${region.riskBreakdown.waterAnomaly}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">LAND-USE DYNAMICS (15%)</span>
                  <span className="text-amber-400 font-bold">{region.riskBreakdown.landUseChange}/100</span>
                </div>
                <div className="w-full bg-[#040906] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${region.riskBreakdown.landUseChange}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Social Impact Estimates */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-950/70 text-xs font-mono">
              <div className="p-2 rounded bg-[#050e09] border border-emerald-950/60">
                <div className="text-[10px] text-slate-500">POPULATION AT RISK</div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {region.metrics.populationExposed.toLocaleString()}
                </div>
              </div>
              <div className="p-2 rounded bg-[#050e09] border border-emerald-950/60">
                <div className="text-[10px] text-slate-500">CROPLAND AFFECTED</div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {region.metrics.croplandImpactedHa.toLocaleString()} ha
                </div>
              </div>
            </div>

            {/* Sensor Stack Metadata */}
            <div className="pt-2 border-t border-emerald-950/70 text-[11px] font-mono text-slate-400">
              <div className="text-slate-500 text-[10px] mb-1 uppercase tracking-wider">
                Multi-Sensor Ingestion Stack
              </div>
              <div className="space-y-1">
                {region.sensorPlatforms.map((plat) => (
                  <div key={plat} className="flex items-center gap-1.5 text-slate-300 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{plat}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Quick AI Climate Insight Card */}
          <GlassCard className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>GROUNDED AI REASONING</span>
              </div>
              <button
                onClick={() => onNavigateTab('analyst')}
                className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
              >
                Open Analyst →
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-4">
              {region.aiExplanation}
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
