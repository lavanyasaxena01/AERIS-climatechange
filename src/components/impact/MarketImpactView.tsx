import React from 'react';
import { GlassCard } from '../common/GlassCard';
import {
  Globe2,
  Cpu,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Droplets,
  Building2,
  Leaf,
  Target,
  Users,
  Compass,
  CheckCircle2,
} from 'lucide-react';

export const MarketImpactView: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="border-b border-emerald-950/60 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
          <Globe2 className="w-3.5 h-3.5" />
          <span>GLOBAL VALUE PROPOSITION & CLIMATE ACTION ALIGNMENT</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          Why AERIS Climate?
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Transforming petabytes of raw Earth observation pixels into timely, explainable, and decision-ready climate intelligence.
        </p>
      </div>

      {/* The Core Story Flow Visual: Satellite Data -> AI Analysis -> Climate Intelligence -> Decision Support -> Climate Action */}
      <div className="p-6 rounded-2xl bg-[#07130d] border border-emerald-950/90 shadow-xl space-y-4">
        <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
          THE END-TO-END TRANSFORMATION PIPELINE
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2 font-mono text-xs">
          <div className="p-4 rounded-xl bg-[#091811] border border-emerald-900/60 flex flex-col justify-between">
            <div>
              <div className="text-[10px] text-slate-500 font-bold">01. OBSERVATION</div>
              <div className="text-sm font-bold text-white mt-1">Satellite Data</div>
              <p className="text-[11px] text-slate-400 font-sans mt-1">
                Sentinel-1 SAR + Sentinel-2 MSI multispectral acquisitions.
              </p>
            </div>
            <div className="text-[10px] text-emerald-400 mt-3 pt-2 border-t border-emerald-950">
              Raw Orbits &amp; Bands
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#091811] border border-emerald-900/60 flex flex-col justify-between">
            <div>
              <div className="text-[10px] text-slate-500 font-bold">02. FUSION</div>
              <div className="text-sm font-bold text-white mt-1">AI Analysis</div>
              <p className="text-[11px] text-slate-400 font-sans mt-1">
                OpticalSARChangeNet sub-pixel co-registration &amp; deep feature extraction.
              </p>
            </div>
            <div className="text-[10px] text-emerald-400 mt-3 pt-2 border-t border-emerald-950">
              Biophysical Indices
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#091811] border border-emerald-900/60 flex flex-col justify-between">
            <div>
              <div className="text-[10px] text-slate-500 font-bold">03. QUANTIFICATION</div>
              <div className="text-sm font-bold text-white mt-1">Climate Intelligence</div>
              <p className="text-[11px] text-slate-400 font-sans mt-1">
                Inundation extent, NDVI loss, NDWI anomaly &amp; population exposure.
              </p>
            </div>
            <div className="text-[10px] text-emerald-400 mt-3 pt-2 border-t border-emerald-950">
              Audited Risk Engine
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#091811] border border-emerald-900/60 flex flex-col justify-between">
            <div>
              <div className="text-[10px] text-slate-500 font-bold">04. REASONING</div>
              <div className="text-sm font-bold text-white mt-1">Decision Support</div>
              <p className="text-[11px] text-slate-400 font-sans mt-1">
                Gemini 3.8 grounded explanations with explicit evidence attribution.
              </p>
            </div>
            <div className="text-[10px] text-emerald-400 mt-3 pt-2 border-t border-emerald-950">
              Zero Hallucinations
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col justify-between shadow-lg shadow-emerald-950/40">
            <div>
              <div className="text-[10px] text-emerald-400 font-bold">05. IMPACT</div>
              <div className="text-sm font-bold text-white mt-1">Climate Action</div>
              <p className="text-[11px] text-slate-300 font-sans mt-1">
                Early warning alerts, drainage routing, and food security resilience.
              </p>
            </div>
            <div className="text-[10px] text-emerald-300 font-bold mt-3 pt-2 border-t border-emerald-800">
              Direct Field Impact
            </div>
          </div>
        </div>
      </div>

      {/* Target User Personas & Use Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="space-y-2">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            Disaster Management
          </div>
          <h3 className="text-sm font-bold text-white">Emergency Response Agencies</h3>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Real-time flood extent extraction within hours of satellite overpass, directing rescue boats to marooned populations and verifying critical bridge access.
          </p>
        </GlassCard>

        <GlassCard className="space-y-2">
          <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            Conservation &amp; Forestry
          </div>
          <h3 className="text-sm font-bold text-white">Environmental Authorities</h3>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Autonomous detection of illegal logging fronts and selective canopy thinning before large-scale clearing corridors expand into protected reserves.
          </p>
        </GlassCard>

        <GlassCard className="space-y-2">
          <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            Agriculture &amp; Food
          </div>
          <h3 className="text-sm font-bold text-white">Parametric Crop Insurance</h3>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Auditable, tamper-proof vegetation stress and inundation index triggers for rapid smallholder insurance payouts without lengthy field claims inspections.
          </p>
        </GlassCard>

        <GlassCard className="space-y-2">
          <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
            Infrastructure &amp; Cities
          </div>
          <h3 className="text-sm font-bold text-white">Urban Planners &amp; Utilities</h3>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Long-term hydrological anomaly tracking, identifying urban flood corridors and guiding sponge city retention investments.
          </p>
        </GlassCard>
      </div>

      {/* Potential SDG Alignment Section */}
      <div className="p-6 rounded-2xl bg-[#081510] border border-emerald-950 space-y-4">
        <div className="flex items-center justify-between border-b border-emerald-950 pb-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
              United Nations Sustainable Development Goals (SDG) Alignment
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            FRAMEWORK 2030
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 font-mono text-xs">
          <div className="p-4 rounded-xl bg-[#050e09] border border-emerald-950/80">
            <div className="text-blue-400 font-bold text-sm">SDG 6</div>
            <div className="text-white font-semibold mt-1">Clean Water &amp; Sanitation</div>
            <p className="text-[11px] text-slate-400 font-sans mt-2">
              Monitoring freshwater retention basins, lake desiccation, and flood runoff contamination vectors.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#050e09] border border-emerald-950/80">
            <div className="text-amber-400 font-bold text-sm">SDG 11</div>
            <div className="text-white font-semibold mt-1">Sustainable Cities</div>
            <p className="text-[11px] text-slate-400 font-sans mt-2">
              Strengthening urban resilience against extreme weather disasters and reducing disaster casualties.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#050e09] border border-emerald-950/80">
            <div className="text-emerald-400 font-bold text-sm">SDG 13</div>
            <div className="text-white font-semibold mt-1">Climate Action</div>
            <p className="text-[11px] text-slate-400 font-sans mt-2">
              Integrating Earth observation early warnings into national disaster reduction strategies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#050e09] border border-emerald-950/80">
            <div className="text-rose-400 font-bold text-sm">SDG 15</div>
            <div className="text-white font-semibold mt-1">Life on Land</div>
            <p className="text-[11px] text-slate-400 font-sans mt-2">
              Halting deforestation, restoring degraded peatlands, and protecting critical terrestrial biodiversity.
            </p>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 font-mono pt-2 text-right">
          *Potential impact metrics are illustrative based on global Sentinel mission coverage capabilities.
        </div>
      </div>
    </div>
  );
};
