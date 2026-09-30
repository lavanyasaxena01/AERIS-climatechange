import React, { useState, useEffect } from 'react';
import { CLIMATE_REGIONS } from './data/regionsData';
import { RegionData } from './types/climate';
import { TopNavigation, NavTab } from './components/layout/TopNavigation';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { InteractiveMap } from './components/dashboard/InteractiveMap';
import { ChangeDetectionView } from './components/change/ChangeDetectionView';
import { FloodIntelligenceView } from './components/flood/FloodIntelligenceView';
import { VegetationView } from './components/vegetation/VegetationView';
import { WaterView } from './components/water/WaterView';
import { ClimateRiskView } from './components/risk/ClimateRiskView';
import { AIAnalystView } from './components/ai/AIAnalystView';
import { ReportView } from './components/reports/ReportView';
import { MarketImpactView } from './components/impact/MarketImpactView';
import { PresentationMode } from './components/presentation/PresentationMode';
import { ProcessingTimeline } from './components/common/ProcessingTimeline';
import { Globe2, Satellite, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  const [regions, setRegions] = useState<RegionData[]>(CLIMATE_REGIONS);
  const [selectedRegion, setSelectedRegion] = useState<RegionData>(CLIMATE_REGIONS[0]);
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [presentationOpen, setPresentationOpen] = useState(false);

  // Attempt to fetch regions from backend if available
  useEffect(() => {
    fetch('/api/regions')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Failed to load regions from API');
      })
      .then((data: RegionData[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setRegions(data);
          const current = data.find((r) => r.id === selectedRegion.id) || data[0];
          setSelectedRegion(current);
        }
      })
      .catch((err) => {
        console.warn('Using client-side fallback regions:', err);
      });
  }, []);

  const handleTriggerAnalysis = () => {
    setShowProcessingModal(true);
    setIsAnalyzing(true);
  };

  const handleProcessingComplete = () => {
    setShowProcessingModal(false);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-[#050807] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Presentation Mode Full-Screen Overlay */}
      {presentationOpen && (
        <PresentationMode
          region={selectedRegion}
          onExit={() => setPresentationOpen(false)}
        />
      )}

      {/* AI Processing Modal Overlay */}
      {showProcessingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl">
            <ProcessingTimeline
              durationMs={2500}
              onComplete={handleProcessingComplete}
            />
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <TopNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        regions={regions}
        selectedRegion={selectedRegion}
        onSelectRegion={setSelectedRegion}
        onTriggerPresentation={() => setPresentationOpen(true)}
        isAnalyzing={isAnalyzing}
        onTriggerAnalysis={handleTriggerAnalysis}
      />

      {/* Sub-header Data Banner: Sensor Telemetry & Demo Notice */}
      <div className="bg-[#07130e] border-b border-emerald-950/70 px-4 lg:px-6 py-1.5 text-[11px] font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ORBITAL INGESTION ACTIVE
            </span>
            <span className="text-slate-600">·</span>
            <span>AOI: {selectedRegion.name}</span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span className="hidden sm:inline">COORDINATES: {selectedRegion.center[0]}°N, {selectedRegion.center[1]}°E</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/50">
              DEMO DATASET ACTIVE
            </span>
            <span className="text-slate-500">Sen1Floods11 Ground Truth</span>
          </div>
        </div>
      </div>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-6 py-6">
        {activeTab === 'overview' && (
          <OverviewDashboard
            region={selectedRegion}
            onNavigateTab={setActiveTab}
            onSelectRegion={setSelectedRegion}
            allRegions={regions}
          />
        )}

        {activeTab === 'monitor' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-emerald-950/60">
              <div>
                <h1 className="text-2xl font-extrabold text-white tracking-tight">
                  Geospatial Earth Observation Monitor
                </h1>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  High-resolution satellite basemap with toggleable multi-sensor anomaly layers.
                </p>
              </div>
            </div>
            <InteractiveMap
              region={selectedRegion}
              className="h-[650px]"
              onSelectRegion={setSelectedRegion}
            />
          </div>
        )}

        {activeTab === 'change' && (
          <ChangeDetectionView region={selectedRegion} />
        )}

        {activeTab === 'flood' && (
          <FloodIntelligenceView region={selectedRegion} />
        )}

        {activeTab === 'vegetation' && (
          <VegetationView region={selectedRegion} />
        )}

        {activeTab === 'water' && (
          <WaterView region={selectedRegion} />
        )}

        {activeTab === 'risk' && (
          <ClimateRiskView region={selectedRegion} />
        )}

        {activeTab === 'analyst' && (
          <AIAnalystView region={selectedRegion} />
        )}

        {activeTab === 'reports' && (
          <ReportView region={selectedRegion} />
        )}

        {activeTab === 'impact' && (
          <MarketImpactView />
        )}
      </main>

      {/* Clean Scientific Footer */}
      <footer className="border-t border-emerald-950/60 bg-[#040906] px-4 lg:px-6 py-4 mt-8 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">AERIS CLIMATE</span>
            <span>·</span>
            <span>Adaptive Earth Observation Reasoning &amp; Intelligence System</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Sensors: Sentinel-1 SAR &amp; Sentinel-2 MSI</span>
            <span>·</span>
            <span className="text-emerald-400">Model: OpticalSARChangeNet v2</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
