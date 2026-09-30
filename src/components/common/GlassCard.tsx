import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', glow = false }) => {
  return (
    <div
      className={`relative bg-[#08130e]/85 backdrop-blur-md rounded-xl border border-emerald-950/70 p-4 lg:p-5 transition-all duration-200 ${
        glow ? 'shadow-lg shadow-emerald-950/40 border-emerald-700/40' : 'hover:border-emerald-800/40'
      } ${className}`}
    >
      {children}
    </div>
  );
};
