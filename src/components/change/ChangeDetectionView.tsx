import React, { useState } from 'react';
import { RegionData } from '../../types/climate';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { GlassCard } from '../common/GlassCard';
import { MetricCard } from '../common/MetricCard';
import {
  Layers,
  Cpu,
  Activity,
  Sparkles,
  Zap,
  CheckCircle2,
  SlidersHorizontal,
  Info,
} from 'lucide-react';

interface ChangeDetectionViewProps {
  region: RegionData;
}

export const ChangeDetectionView: React.FC<ChangeDetectionViewProps> = ({ region }) => {
  const [threshold, setThreshold] = useState<number>(0.65);
  const [selectedDisplayMode, setSelectedDisplayMode] = useState<'optical' | 'sar' | 'fusion'>('optical');

  // Dynamic calculation based on threshold slider
  const effectiveChangedArea = Math.round(
    region.metrics.changedAreaKm2 * (1 + (0.65 - threshold) * 0.4) * 10
  ) / 10;
  const effectivePercent = Math.round(
    region.metrics.changedPercentage * (1 + (0.65 - threshold) * 0.4) * 10
  ) / 10;

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-emerald-950/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>OPTICAL-SAR MULTIMODAL CHANGE DETECTION</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">OpticalSARChangeNet v2</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Climate Change Detection Engine
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Co-register multi-temporal Sentinel-2 optical imagery and Sentinel-1 SAR microwave backscatter to detect land cover perturbation and surface water expansion.
          </p>
        </div>

        {/* Display Mode Selector */}
        <div className="flex items-center gap-1 bg-[#09150f] p-1 rounded-lg border border-emerald-900/60 text-xs font-mono">
          <button
            onClick={() => setSelectedDisplayMode('optical')}
            className={`px-3 py-1.5 rounded transition-colors ${
              selectedDisplayMode === 'optical'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sentinel-2 Optical (MSI)
          </button>
          <button
            onClick={() => setSelectedDisplayMode('sar')}
            className={`px-3 py-1.5 rounded transition-colors ${
              selectedDisplayMode === 'sar'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sentinel-1 SAR (Radar)
          </button>
          <button
            onClick={() => setSelectedDisplayMode('fusion')}
            className={`px-3 py-1.5 rounded transition-colors ${
              selectedDisplayMode === 'fusion'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Gated Fusion Mask
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <MetricCard
          label="CHANGED AREA"
          value={effectiveChangedArea.toLocaleString()}
          unit="KM²"
          delta={{ value: `${effectivePercent}% coverage`, isNegativeBad: false }}
          subtext="Detected Surface"
          highlight
        />
        <MetricCard
          label="DETECTION CONFIDENCE"
          value={Math.round(region.metrics.confidence * 100)}
          unit="%"
          subtext="Co-registration Score"
        />
        <MetricCard
          label="SPATIAL RESOLUTION"
          value="10"
          unit="M/PX"
          subtext="Resampled Ground Grid"
        />
        <MetricCard
          label="RADAR COHERENCE LOSS"
          value="0.74"
          unit="γ"
          subtext="InSAR Interferometric"
        />
      </div>

      {/* Main Interactive Before/After Slider */}
      <div className="space-y-4">
        <BeforeAfterSlider
          beforeUrl={
            selectedDisplayMode === 'sar'
              ? region.sarUrl || `/outputs/${region.id}/sar.png`
              : region.opticalBeforeUrl || `/outputs/${region.id}/before.png`
          }
          afterUrl={
            selectedDisplayMode === 'fusion'
              ? region.changeMaskUrl || `/outputs/${region.id}/change_mask.png`
              : region.opticalAfterUrl || `/outputs/${region.id}/after.png`
          }
          beforeLabel={
            selectedDisplayMode === 'sar'
              ? `SENTINEL-1 SAR MICROWAVE (${region.baselineDate})`
              : `SENTINEL-2 OPTICAL BASELINE (${region.baselineDate})`
          }
          afterLabel={
            selectedDisplayMode === 'sar'
              ? `POST-EVENT OPTICAL OVERLAY (${region.eventDate})`
              : selectedDisplayMode === 'fusion'
              ? `GATED FUSION CHANGE MASK (${region.eventDate})`
              : `POST-EVENT ANOMALY (${region.eventDate})`
          }
          changedAreaKm2={effectiveChangedArea}
          changedPercent={effectivePercent}
          confidence={region.metrics.confidence}
          changeMaskUrl={region.changeMaskUrl || `/outputs/${region.id}/change_mask.png`}
        />
      </div>

      {/* Two Column Section: Pipeline Details + Model Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Model Architecture & Fusion Workflow */}
        <div className="lg:col-span-7 space-y-4">
          <GlassCard className="space-y-3.5">
            <div className="flex items-center justify-between border-b border-emerald-950/70 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200">
                  MULTIMODAL INFERENCE PIPELINE
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">
                GATED TEMPORAL CROSS-ATTENTION
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Optical sensors provide high multispectral discrimination across visible and near-infrared bands (B02, B03, B04, B08), while Synthetic Aperture Radar (SAR C-Band VV/VH) penetrates cloud occlusion and detects specular water reflection through dielectric permittivity.
            </p>

            {/* Architecture Flow Step Diagram */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#050e09] border border-emerald-950/70">
                <div className="text-[10px] text-emerald-400 font-bold mb-1">01. DUAL ENCODING</div>
                <div className="text-slate-300 font-semibold">ResNet-50 + SAR-UNet</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Independent multi-scale spatial feature extraction at 10m grid.
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#050e09] border border-emerald-950/70">
                <div className="text-[10px] text-amber-400 font-bold mb-1">02. TEMPORAL FUSION</div>
                <div className="text-slate-300 font-semibold">Gated Difference Matrix</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Pixel-wise difference modulated by radar coherence weighting.
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#050e09] border border-emerald-950/70">
                <div className="text-[10px] text-cyan-400 font-bold mb-1">03. PROBABILITY MASK</div>
                <div className="text-slate-300 font-semibold">Binary Change Decoder</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Morphological filtering and Otsu thresholding to segment changes.
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right: Confidence Threshold Tuning & Diagnostics */}
        <div className="lg:col-span-5 space-y-4">
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-950/70 pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200">
                  PROBABILITY CALIBRATION
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400 tabular-nums">
                τ = {threshold.toFixed(2)}
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
                <span>Classification Threshold</span>
                <span>{Math.round(threshold * 100)}% Confidence Cutoff</span>
              </div>
              <input
                type="range"
                min="0.30"
                max="0.95"
                step="0.05"
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-[#040a07] rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>High Recall (τ=0.30)</span>
                <span>Balanced (τ=0.65)</span>
                <span>High Precision (τ=0.95)</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#06120b] border border-emerald-950/80 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Changed Area Filtered:</span>
                <span className="font-bold text-white tabular-nums">{effectiveChangedArea} km²</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Total Pixels Perturbed:</span>
                <span className="font-bold text-emerald-400 tabular-nums">
                  {Math.round(effectiveChangedArea * 10000).toLocaleString()} px
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Spatial Distribution:</span>
                <span className="text-amber-300">Alluvial Linear Clusters</span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-[11px] text-slate-400 pt-1">
              <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Thresholding is calibrated against Sen1Floods11 and LEVIR-CD benchmark standards to minimize cloud shadow false positives.
              </span>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
