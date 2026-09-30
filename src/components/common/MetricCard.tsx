import React from 'react';
import { GlassCard } from './GlassCard';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  delta?: {
    value: string;
    isNegativeBad?: boolean;
    isPositiveGood?: boolean;
  };
  subtext?: string;
  highlight?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  delta,
  subtext,
  highlight = false,
}) => {
  return (
    <GlassCard glow={highlight} className="flex flex-col justify-between">
      <div>
        <div className="text-xs uppercase tracking-wider text-slate-400 font-mono font-medium mb-1.5 truncate">
          {label}
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl lg:text-3xl font-mono font-bold text-white tabular-nums tracking-tight">
            {value}
          </span>
          {unit && (
            <span className="text-xs font-mono uppercase text-emerald-400/90 font-medium">
              {unit}
            </span>
          )}
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-emerald-950/50 flex items-center justify-between text-xs font-mono">
        {delta ? (
          <span
            className={
              delta.value.startsWith('+')
                ? delta.isPositiveGood
                  ? 'text-emerald-400'
                  : 'text-amber-400'
                : delta.isNegativeBad
                ? 'text-rose-400'
                : 'text-emerald-400'
            }
          >
            {delta.value}
          </span>
        ) : (
          <span className="text-slate-500">Nominal Baseline</span>
        )}
        {subtext && <span className="text-slate-400 truncate max-w-[130px]">{subtext}</span>}
      </div>
    </GlassCard>
  );
};
