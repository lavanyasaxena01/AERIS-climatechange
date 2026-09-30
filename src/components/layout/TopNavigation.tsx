import React from 'react';
import { Satellite, Globe2, Sparkles, Play, ShieldAlert, FileText, BarChart3, Layers, Compass } from 'lucide-react';
import { RegionData } from '../../types/climate';

export type NavTab =
  | 'overview'
  | 'monitor'
  | 'change'
  | 'flood'
  | 'vegetation'
  | 'water'
  | 'risk'
  | 'analyst'
  | 'reports'
  | 'impact';

interface TopNavigationProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  regions: RegionData[];
  selectedRegion: RegionData;
  onSelectRegion: (region: RegionData) => void;
  onTriggerPresentation: () => void;
  isAnalyzing: boolean;
  onTriggerAnalysis: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeTab,
  setActiveTab,
  regions,
  selectedRegion,
  onSelectRegion,
  onTriggerPresentation,
  isAnalyzing,
  onTriggerAnalysis,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#050807]/90 backdrop-blur-md border-b border-emerald-950/60 px-4 lg:px-6 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark + minimal logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-sm shadow-emerald-950">
            <Globe2 className="w-4 h-4 animate-pulse text-emerald-400" />
          </div>
          <button
            onClick={() => setActiveTab('overview')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5 font-mono">
              AERIS<span className="text-emerald-400">CLIMATE</span>
            </span>
          </button>
        </div>

        {/* Zone 2: Clean text navigation links / segmented controls */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#09140e]/90 p-1 rounded-lg border border-emerald-900/40 text-xs font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold shadow-xs border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('monitor')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'monitor'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold shadow-xs border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Earth Monitor
          </button>
          <button
            onClick={() => setActiveTab('change')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'change'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold shadow-xs border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Change Detection
          </button>
          <button
            onClick={() => setActiveTab('flood')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'flood'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold shadow-xs border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Flood Intel
          </button>
          <button
            onClick={() => setActiveTab('vegetation')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'vegetation'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold shadow-xs border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Vegetation
          </button>
          <button
            onClick={() => setActiveTab('risk')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'risk'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold shadow-xs border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Risk Engine
          </button>
          <button
            onClick={() => setActiveTab('analyst')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'analyst'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold shadow-xs border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            AI Analyst
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'reports'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold shadow-xs border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Reports
          </button>
          <button
            onClick={() => setActiveTab('impact')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'impact'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold shadow-xs border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Impact & SDGs
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions + Region selector */}
        <div className="flex items-center gap-2.5">
          {/* Region Selector */}
          <div className="flex items-center gap-1.5 bg-[#08130e] border border-emerald-900/50 rounded-lg px-2.5 py-1 text-xs">
            <Compass className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <select
              value={selectedRegion.id}
              onChange={(e) => {
                const found = regions.find((r) => r.id === e.target.value);
                if (found) onSelectRegion(found);
              }}
              className="bg-transparent text-slate-200 text-xs font-mono focus:outline-none cursor-pointer max-w-[170px] truncate"
            >
              {regions.map((r) => (
                <option key={r.id} value={r.id} className="bg-[#0b1611] text-slate-200">
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quick AI Run / Ingestion button */}
          <button
            onClick={onTriggerAnalysis}
            disabled={isAnalyzing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all shadow-sm shadow-emerald-500/20 disabled:opacity-60 cursor-pointer whitespace-nowrap"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Analyzing...' : 'Run Pipeline'}</span>
          </button>

          {/* Presentation Mode Button */}
          <button
            onClick={onTriggerPresentation}
            title="Launch Hackathon Presentation Mode"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pitch Mode</span>
          </button>
        </div>
      </div>
    </header>
  );
};
