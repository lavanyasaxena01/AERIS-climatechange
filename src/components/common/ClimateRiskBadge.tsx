import React from 'react';
import { RiskLevel } from '../../types/climate';
import { AlertTriangle, AlertOctagon, CheckCircle2, AlertCircle } from 'lucide-react';

interface ClimateRiskBadgeProps {
  level: RiskLevel;
  score?: number;
  showScore?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ClimateRiskBadge: React.FC<ClimateRiskBadgeProps> = ({
  level,
  score,
  showScore = true,
  size = 'md',
}) => {
  const getDetails = () => {
    switch (level) {
      case 'CRITICAL':
        return {
          bg: 'bg-rose-950/60',
          border: 'border-rose-700/60',
          text: 'text-rose-300',
          glow: 'shadow-rose-950/50',
          dot: 'bg-rose-500',
          icon: AlertOctagon,
          label: 'CRITICAL RISK',
        };
      case 'HIGH':
        return {
          bg: 'bg-amber-950/60',
          border: 'border-amber-700/60',
          text: 'text-amber-300',
          glow: 'shadow-amber-950/50',
          dot: 'bg-amber-500',
          icon: AlertTriangle,
          label: 'HIGH RISK',
        };
      case 'MODERATE':
        return {
          bg: 'bg-yellow-950/60',
          border: 'border-yellow-700/60',
          text: 'text-yellow-300',
          glow: 'shadow-yellow-950/50',
          dot: 'bg-yellow-500',
          icon: AlertCircle,
          label: 'MODERATE RISK',
        };
      case 'LOW':
      default:
        return {
          bg: 'bg-emerald-950/60',
          border: 'border-emerald-700/60',
          text: 'text-emerald-300',
          glow: 'shadow-emerald-950/50',
          dot: 'bg-emerald-500',
          icon: CheckCircle2,
          label: 'LOW RISK',
        };
    }
  };

  const details = getDetails();
  const Icon = details.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1.5',
    md: 'px-2.5 py-1 text-xs gap-2',
    lg: 'px-3.5 py-1.5 text-sm gap-2.5',
  }[size];

  return (
    <div
      className={`inline-flex items-center rounded-lg border font-mono font-medium shadow-sm ${details.bg} ${details.border} ${details.text} ${details.glow} ${sizeClasses}`}
    >
      <span className={`w-2 h-2 rounded-full ${details.dot} animate-pulse shrink-0`} />
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{details.label}</span>
      {showScore && score !== undefined && (
        <span className="opacity-90 pl-1 border-l border-current/30 tabular-nums">
          {score}/100
        </span>
      )}
    </div>
  );
};
