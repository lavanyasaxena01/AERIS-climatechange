import React, { useEffect, useState } from 'react';
import { Database, Eye, Cpu, Calculator, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProcessingTimelineProps {
  onComplete?: () => void;
  durationMs?: number;
}

const STEPS = [
  { id: 'ingest', label: 'INGESTING SATELLITE DATA', desc: 'Acquiring Sentinel-1 SAR & Sentinel-2 MSI level-2A granules', icon: Database },
  { id: 'coregister', label: 'ANALYZING IMAGERY', desc: 'Spatial sub-pixel co-registration & atmospheric correction', icon: Eye },
  { id: 'detect', label: 'DETECTING CHANGE', desc: 'Multimodal feature fusion via OpticalSARChangeNet', icon: Cpu },
  { id: 'impact', label: 'CALCULATING IMPACT', desc: 'Deriving biophysical indices: NDVI, NDWI & inundation mask', icon: Calculator },
  { id: 'insight', label: 'GENERATING INSIGHT', desc: 'Gemini reasoning grounding biophysical metrics into action', icon: Sparkles },
];

export const ProcessingTimeline: React.FC<ProcessingTimelineProps> = ({
  onComplete,
  durationMs = 2800,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const onCompleteRef = React.useRef(onComplete);

  React.useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const stepDuration = durationMs / STEPS.length;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < STEPS.length) {
        setCurrentStepIndex(step);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onCompleteRef.current?.();
        }, 200);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [durationMs]);

  return (
    <div className="bg-[#07120c]/95 border border-emerald-900/60 rounded-xl p-5 max-w-xl mx-auto shadow-2xl shadow-emerald-950/80">
      <div className="flex items-center justify-between border-b border-emerald-950/70 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono font-bold tracking-wider text-emerald-300">
            AERIS ORCHESTRATION PIPELINE
          </span>
        </div>
        <span className="text-xs font-mono text-slate-400">
          STEP {currentStepIndex + 1} OF {STEPS.length}
        </span>
      </div>

      <div className="space-y-3">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const isPending = idx > currentStepIndex;

          return (
            <div
              key={step.id}
              className={`flex items-start gap-3.5 p-2.5 rounded-lg transition-all ${
                isCurrent
                  ? 'bg-emerald-950/40 border border-emerald-500/40 shadow-xs'
                  : isDone
                  ? 'opacity-85'
                  : 'opacity-40'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Icon
                    className={`w-4 h-4 ${
                      isCurrent ? 'text-emerald-300 animate-pulse' : 'text-slate-500'
                    }`}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-mono font-semibold tracking-wide ${
                      isCurrent ? 'text-emerald-300' : isDone ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {step.label}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] font-mono text-emerald-400 animate-pulse">
                      PROCESSING...
                    </span>
                  )}
                  {isDone && (
                    <span className="text-[10px] font-mono text-emerald-500">
                      RESOLVED
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 font-sans leading-tight">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
