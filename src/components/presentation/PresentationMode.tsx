import React, { useState } from 'react';
import { RegionData } from '../../types/climate';
import { ClimateRiskBadge } from '../common/ClimateRiskBadge';
import { getAssetUrl, logImageError } from '../../lib/assetUrl';
import {
  Globe2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Cpu,
  Waves,
  ShieldAlert,
  ArrowRight,
  Play,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from 'lucide-react';

interface PresentationModeProps {
  region: RegionData;
  onExit: () => void;
}

const SLIDES = [
  {
    step: 1,
    title: 'Earth Observation Ingestion',
    subtitle: 'High-Cadence Multimodal Ingestion',
    tag: 'SATELLITE SENSING',
  },
  {
    step: 2,
    title: 'Multimodal Change Detection',
    subtitle: 'Optical + SAR Sub-Pixel Co-Registration',
    tag: 'DEEP FEATURE FUSION',
  },
  {
    step: 3,
    title: 'Quantifying Compound Impact',
    subtitle: 'Deriving Inundation & NDVI Biomass Decline',
    tag: 'BIOPHYSICAL INDICES',
  },
  {
    step: 4,
    title: 'Transparent Climate Risk Modeling',
    subtitle: 'Deterministic Multi-Criteria Scoring (0-100)',
    tag: 'MCDA RISK ENGINE',
  },
  {
    step: 5,
    title: 'Actionable Early Warning & Intelligence',
    subtitle: 'Grounded Gemini AI Adaptation Directives',
    tag: 'CLIMATE ACTION',
  },
];

export const PresentationMode: React.FC<PresentationModeProps> = ({ region, onExit }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = SLIDES[currentSlide];

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onExit();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#040806] text-white flex flex-col justify-between p-6 lg:p-12 overflow-hidden animate-fade-in">
      {/* Top Presentation Bar */}
      <div className="flex items-center justify-between border-b border-emerald-950 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
            <Globe2 className="w-4 h-4 animate-spin" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-wider font-mono text-white flex items-center gap-2">
              AERIS CLIMATE <span className="text-emerald-400">PITCH DECK</span>
            </div>
            <div className="text-xs text-slate-400 font-sans">
              From Satellite Data to Climate Action
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-xs font-mono text-emerald-400">
            SLIDE {currentSlide + 1} / {SLIDES.length}
          </div>
          <button
            onClick={onExit}
            className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Exit Presentation Mode"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div className="flex-1 flex items-center justify-center py-6">
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-block text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800/50">
              STEP 0{slide.step} · {slide.tag}
            </div>

            <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {slide.title}
            </h2>
            <p className="text-emerald-400/90 font-mono text-xs">
              {slide.subtitle}
            </p>

            {/* Slide-Specific Narrative */}
            {currentSlide === 0 && (
              <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
                <p>
                  AERIS ingests dual-sensor Sentinel constellations over <span className="text-white font-semibold">{region.name}</span>. Optical multispectral reflectance provides 10-meter resolution color vegetation channels, while C-Band SAR radar pierces through clouds and monsoon storms.
                </p>
                <div className="p-3 rounded-lg bg-[#07150e] border border-emerald-950 font-mono text-[11px] text-slate-400">
                  Acquisition: {region.lastObserved} · Sensor Platforms: {region.sensorPlatforms.join(', ')}
                </div>
              </div>
            )}

            {currentSlide === 1 && (
              <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
                <p>
                  Using <span className="text-white font-semibold">OpticalSARChangeNet</span>, AERIS co-registers pre-event baseline orbits against the post-disaster overpass to isolate true biophysical changes from false cloud shadows.
                </p>
                <div className="p-3 rounded-lg bg-[#07150e] border border-emerald-950 font-mono text-xs text-amber-300">
                  Changed Area Detected: {region.metrics.changedAreaKm2} km² ({region.metrics.changedPercentage}% of AOI)
                </div>
              </div>
            )}

            {currentSlide === 2 && (
              <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
                <p>
                  Raw changes are transformed into grounded indicators:
                </p>
                <ul className="space-y-1.5 font-mono text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Inundation Extent: <strong>{region.metrics.floodAreaKm2} km²</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>Canopy NDVI Loss: <strong>{region.metrics.ndviChangePercent}%</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Population Exposed: <strong>{region.metrics.populationExposed.toLocaleString()}</strong></span>
                  </li>
                </ul>
              </div>
            )}

            {currentSlide === 3 && (
              <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
                <p>
                  AERIS replaces opaque black-box AI with an auditable mathematical risk engine. Weights are calibrated against IPCC standards to provide immediate credibility to emergency authorities and insurers.
                </p>
                <div className="flex items-center gap-3">
                  <ClimateRiskBadge level={region.metrics.riskLevel} score={region.metrics.riskScore} size="lg" />
                </div>
              </div>
            )}

            {currentSlide === 4 && (
              <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
                <p>
                  Grounded LLM reasoning interprets quantitative anomalies to deliver prioritized adaptation actions:
                </p>
                <div className="space-y-1.5 font-mono text-[11px] text-emerald-300">
                  {region.adaptationActions.slice(0, 3).map((act, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Visual Stage */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-emerald-900/60 bg-[#07130d] h-[360px] lg:h-[440px] shadow-2xl">
              <img
                key={currentSlide}
                src={getAssetUrl(
                  currentSlide === 0
                    ? region.opticalBeforeUrl
                    : currentSlide === 1
                    ? region.sarUrl
                    : region.opticalAfterUrl
                )}
                alt="Presentation Slide Imagery"
                className="w-full h-full object-cover transition-opacity duration-300"
                onError={(e) => {
                  logImageError(
                    'PresentationMode',
                    getAssetUrl(
                      currentSlide === 0
                        ? region.opticalBeforeUrl
                        : currentSlide === 1
                        ? region.sarUrl
                        : region.opticalAfterUrl
                    ),
                    e
                  );
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040806] via-transparent to-transparent opacity-80 pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-300 bg-[#050e09]/90 backdrop-blur-md p-3 rounded-lg border border-emerald-950">
                <span>{region.name}</span>
                <span className="text-emerald-400 font-bold">{region.primaryHazard} Hazard</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Slide Controls */}
      <div className="flex items-center justify-between border-t border-emerald-950 pt-4">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/40 text-xs font-mono text-slate-300 disabled:opacity-30 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                i === currentSlide ? 'bg-emerald-400 w-6' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-black font-semibold text-xs font-mono cursor-pointer shadow-md shadow-emerald-500/20"
        >
          <span>{currentSlide === SLIDES.length - 1 ? 'Finish Presentation' : 'Next Step'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
