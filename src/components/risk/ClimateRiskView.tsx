import React, { useState } from 'react';
import { RegionData, RiskLevel } from '../../types/climate';
import { GlassCard } from '../common/GlassCard';
import { MetricCard } from '../common/MetricCard';
import { ClimateRiskBadge } from '../common/ClimateRiskBadge';
import { calculateClimateRisk, DEFAULT_RISK_WEIGHTS } from '../../lib/riskEngine';
import {
  ShieldAlert,
  Sliders,
  Scale,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

interface ClimateRiskViewProps {
  region: RegionData;
}

export const ClimateRiskView: React.FC<ClimateRiskViewProps> = ({ region }) => {
  // Local state for simulator
  const [factors, setFactors] = useState({
    floodSeverity: region.riskBreakdown.floodSeverity,
    vegetationDecline: region.riskBreakdown.vegetationDecline,
    waterAnomaly: region.riskBreakdown.waterAnomaly,
    landUseChange: region.riskBreakdown.landUseChange,
    historicalTrend: region.riskBreakdown.historicalTrend,
  });

  const [weights, setWeights] = useState(DEFAULT_RISK_WEIGHTS);

  // Compute live transparent risk score
  const computed = calculateClimateRisk(factors, weights);

  const resetToRegionDefaults = () => {
    setFactors({
      floodSeverity: region.riskBreakdown.floodSeverity,
      vegetationDecline: region.riskBreakdown.vegetationDecline,
      waterAnomaly: region.riskBreakdown.waterAnomaly,
      landUseChange: region.riskBreakdown.landUseChange,
      historicalTrend: region.riskBreakdown.historicalTrend,
    });
    setWeights(DEFAULT_RISK_WEIGHTS);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-emerald-950/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
            <Scale className="w-3.5 h-3.5" />
            <span>TRANSPARENT SCIENTIFIC SCORING</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">Rule-Based Multi-Criteria Decision Analysis (MCDA)</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Climate Risk & Vulnerability Engine
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            A deterministic, fully auditable climate risk scoring algorithm. Every percentage point is traceable to calibrated biophysical sensor indicators.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToRegionDefaults}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/40 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
            <span>Reset to Observed Data</span>
          </button>
          <ClimateRiskBadge level={computed.level} score={computed.score} size="lg" />
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <MetricCard
          label="CLIMATE RISK SCORE"
          value={computed.score}
          unit="/100"
          subtext={computed.level}
          highlight
        />
        <MetricCard
          label="FLOOD SEVERITY COMPONENT"
          value={computed.contributions.floodSeverity.contribution}
          unit="PTS"
          delta={{ value: `Weight: ${computed.contributions.floodSeverity.weight}%` }}
          subtext="35% Baseline Model Weight"
        />
        <MetricCard
          label="VEGETATION COMPONENT"
          value={computed.contributions.vegetationDecline.contribution}
          unit="PTS"
          delta={{ value: `Weight: ${computed.contributions.vegetationDecline.weight}%` }}
          subtext="25% Baseline Model Weight"
        />
        <MetricCard
          label="ANOMALY INDEX"
          value={(computed.contributions.waterAnomaly.contribution + computed.contributions.landUseChange.contribution).toFixed(1)}
          unit="PTS"
          subtext="Water + Land Change"
        />
      </div>

      {/* Main Grid: Transparent Factor Breakdown + Interactive Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Factor Breakdown (as specified in prompt: Contributing factors with bars) */}
        <div className="lg:col-span-6 space-y-4">
          <GlassCard glow className="space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-950/70 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                  Transparent Factor Attribution
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400">
                AUDITABLE FORMULA
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#040906] border border-emerald-950/80 font-mono text-xs text-slate-300">
              <div className="text-emerald-400 font-semibold mb-1">
                RiskScore = ∑ (Weight_i × Factor_i)
              </div>
              <div className="text-[11px] text-slate-400">
                = (0.35 × {factors.floodSeverity}) + (0.25 × {factors.vegetationDecline}) + (0.15 × {factors.waterAnomaly}) + (0.15 × {factors.landUseChange}) + (0.10 × {factors.historicalTrend})
              </div>
              <div className="text-xs text-white font-bold mt-1.5 pt-1.5 border-t border-emerald-950">
                Calculated Aggregate: {computed.score}/100 ({computed.level})
              </div>
            </div>

            {/* Visual Contribution Bars */}
            <div className="space-y-3 font-mono text-xs pt-1">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Flood Severity (35% weight)</span>
                  <span className="text-cyan-400 font-bold tabular-nums">
                    +{computed.contributions.floodSeverity.contribution} pts ({factors.floodSeverity}/100)
                  </span>
                </div>
                <div className="w-full bg-[#040a07] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${factors.floodSeverity}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Vegetation Decline (25% weight)</span>
                  <span className="text-rose-400 font-bold tabular-nums">
                    +{computed.contributions.vegetationDecline.contribution} pts ({factors.vegetationDecline}/100)
                  </span>
                </div>
                <div className="w-full bg-[#040a07] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-rose-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${factors.vegetationDecline}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Water Anomaly (15% weight)</span>
                  <span className="text-blue-400 font-bold tabular-nums">
                    +{computed.contributions.waterAnomaly.contribution} pts ({factors.waterAnomaly}/100)
                  </span>
                </div>
                <div className="w-full bg-[#040a07] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${factors.waterAnomaly}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Land-Use Perturbation (15% weight)</span>
                  <span className="text-amber-400 font-bold tabular-nums">
                    +{computed.contributions.landUseChange.contribution} pts ({factors.landUseChange}/100)
                  </span>
                </div>
                <div className="w-full bg-[#040a07] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${factors.landUseChange}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Historical Recurrence (10% weight)</span>
                  <span className="text-emerald-400 font-bold tabular-nums">
                    +{computed.contributions.historicalTrend.contribution} pts ({factors.historicalTrend}/100)
                  </span>
                </div>
                <div className="w-full bg-[#040a07] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${factors.historicalTrend}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#06120b] border border-emerald-950/70 text-xs font-sans text-slate-300 leading-relaxed">
              <span className="font-semibold text-emerald-400 font-mono">ASSESSMENT NARRATIVE: </span>
              {computed.narrative}
            </div>
          </GlassCard>
        </div>

        {/* Right: Interactive Sensitivity Simulator */}
        <div className="lg:col-span-6 space-y-4">
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-950/70 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                  Interactive Sensitivity Simulator
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                DRAG TO TEST STRESS THRESHOLDS
              </span>
            </div>

            <div className="space-y-3.5 font-mono text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Simulated Flood Inundation Severity</span>
                  <span className="text-cyan-400 font-bold">{factors.floodSeverity}/100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={factors.floodSeverity}
                  onChange={(e) =>
                    setFactors({ ...factors, floodSeverity: parseInt(e.target.value, 10) })
                  }
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-[#040a07] rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Simulated Vegetation / Canopy Deficit</span>
                  <span className="text-rose-400 font-bold">{factors.vegetationDecline}/100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={factors.vegetationDecline}
                  onChange={(e) =>
                    setFactors({ ...factors, vegetationDecline: parseInt(e.target.value, 10) })
                  }
                  className="w-full accent-rose-400 cursor-pointer h-1.5 bg-[#040a07] rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Simulated Hydrological Water Anomaly</span>
                  <span className="text-blue-400 font-bold">{factors.waterAnomaly}/100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={factors.waterAnomaly}
                  onChange={(e) =>
                    setFactors({ ...factors, waterAnomaly: parseInt(e.target.value, 10) })
                  }
                  className="w-full accent-blue-400 cursor-pointer h-1.5 bg-[#040a07] rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Simulated Land-Use / Road Disruption</span>
                  <span className="text-amber-400 font-bold">{factors.landUseChange}/100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={factors.landUseChange}
                  onChange={(e) =>
                    setFactors({ ...factors, landUseChange: parseInt(e.target.value, 10) })
                  }
                  className="w-full accent-amber-400 cursor-pointer h-1.5 bg-[#040a07] rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Historical Event Recurrence Multiplier</span>
                  <span className="text-emerald-400 font-bold">{factors.historicalTrend}/100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={factors.historicalTrend}
                  onChange={(e) =>
                    setFactors({ ...factors, historicalTrend: parseInt(e.target.value, 10) })
                  }
                  className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-[#040a07] rounded-lg"
                />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#040a07] border border-emerald-950 text-xs font-mono text-slate-400 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Risk thresholds: &lt;35 = LOW, 35-54 = MODERATE, 55-74 = HIGH, ≥75 = CRITICAL. Weights conform to IPCC AR6 compound disaster framework.
              </span>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
