import React, { useState } from 'react';
import { RegionData } from '../../types/climate';
import { GlassCard } from '../common/GlassCard';
import { ClimateRiskBadge } from '../common/ClimateRiskBadge';
import {
  FileText,
  Download,
  Printer,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  Calendar,
  Layers,
  MapPin,
} from 'lucide-react';

interface ReportViewProps {
  region: RegionData;
}

export const ReportView: React.FC<ReportViewProps> = ({ region }) => {
  const [isExporting, setIsExporting] = useState(false);

  const reportId = `AERIS-REP-${region.id.toUpperCase()}-2024`;
  const generationTimestamp = new Date().toUTCString();

  const handleDownloadJSON = () => {
    const reportData = {
      reportId,
      generationTimestamp,
      region: {
        id: region.id,
        name: region.name,
        country: region.country,
        biome: region.biome,
        center: region.center,
      },
      sensorPlatforms: region.sensorPlatforms,
      temporalBaseline: region.baselineDate,
      eventObservation: region.eventDate,
      biophysicalMetrics: region.metrics,
      riskBreakdown: region.riskBreakdown,
      aiScientificExplanation: region.aiExplanation,
      adaptationActionPlan: region.adaptationActions,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Toolbar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-emerald-950/60 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>OFFICIAL CLIMATE INTELLIGENCE DOSSIER</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">UN SDG & Sendai Framework Compatible</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Climate Impact Assessment Report
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Formal synthesized intelligence dossier for government agencies, emergency managers, and climate insurance underwriters.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleDownloadJSON}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/40 text-xs font-mono text-slate-200 hover:text-white transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-xs font-mono font-semibold text-black transition-colors cursor-pointer shadow-sm shadow-emerald-500/20"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Main Printable Document Sheet */}
      <div className="bg-[#07130d] border border-emerald-950/90 rounded-2xl p-6 lg:p-10 space-y-8 max-w-4xl mx-auto shadow-2xl print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-950 pb-6 print:border-slate-300">
          <div>
            <div className="text-xs font-mono font-bold text-emerald-400 print:text-emerald-700 tracking-wider">
              AERIS CLIMATE OBSERVATION DOSSIER
            </div>
            <h2 className="text-2xl font-bold text-white print:text-black mt-1">
              {region.name}
            </h2>
            <div className="text-xs text-slate-400 print:text-slate-600 mt-1">
              {region.biome} · {region.country}
            </div>
          </div>

          <div className="text-left sm:text-right font-mono text-xs text-slate-400 print:text-slate-600 space-y-1">
            <div><span className="text-slate-500">DOSSIER ID:</span> {reportId}</div>
            <div><span className="text-slate-500">TIMESTAMP:</span> {generationTimestamp}</div>
            <div><span className="text-slate-500">CONFIDENCE:</span> {Math.round(region.metrics.confidence * 100)}%</div>
          </div>
        </div>

        {/* Executive Summary & Hazard Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#091811] border border-emerald-950/80 print:bg-slate-50 print:border-slate-200">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              CLIMATE RISK LEVEL
            </div>
            <div className="mt-2">
              <ClimateRiskBadge level={region.metrics.riskLevel} score={region.metrics.riskScore} size="lg" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#091811] border border-emerald-950/80 print:bg-slate-50 print:border-slate-200">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              PRIMARY HAZARD REGIME
            </div>
            <div className="text-lg font-bold text-white print:text-black mt-1 font-mono">
              {region.primaryHazard.toUpperCase()}
            </div>
            <div className="text-[11px] text-slate-400 print:text-slate-600 mt-1">
              {region.metrics.changedAreaKm2} km² affected ({region.metrics.changedPercentage}%)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#091811] border border-emerald-950/80 print:bg-slate-50 print:border-slate-200">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              SATELLITE INGESTION STACK
            </div>
            <div className="text-xs text-white print:text-black mt-1.5 space-y-1 font-mono">
              {region.sensorPlatforms.map((s, i) => (
                <div key={i} className="truncate">· {s}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Quantitative Biophysical Indicators Table */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-bold text-slate-300 print:text-slate-800 uppercase tracking-wider">
            1.0 EMPIRICAL BIOPHYSICAL OBSERVATIONS
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left border border-emerald-950 print:border-slate-300">
              <thead className="bg-[#050e09] text-slate-400 print:bg-slate-100 print:text-slate-700">
                <tr>
                  <th className="p-2.5">Indicator</th>
                  <th className="p-2.5">Baseline</th>
                  <th className="p-2.5">Event Observation</th>
                  <th className="p-2.5">Net Delta</th>
                  <th className="p-2.5">Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-950/60 print:divide-slate-200">
                <tr>
                  <td className="p-2.5 text-slate-300 print:text-black font-semibold">Flood Inundation Extent</td>
                  <td className="p-2.5 text-slate-400">Baseline channel</td>
                  <td className="p-2.5 text-cyan-400 font-bold">{region.metrics.floodAreaKm2.toLocaleString()} km²</td>
                  <td className="p-2.5 text-cyan-400">+{region.metrics.floodPercentage}% AOI</td>
                  <td className="p-2.5 text-rose-400 font-bold">Severe Inundation</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-slate-300 print:text-black font-semibold">Vegetation Canopy (NDVI)</td>
                  <td className="p-2.5 text-slate-400">{region.metrics.ndviBefore}</td>
                  <td className="p-2.5 text-slate-200">{region.metrics.ndviAfter}</td>
                  <td className="p-2.5 text-rose-400 font-bold">{region.metrics.ndviChangePercent}%</td>
                  <td className="p-2.5 text-rose-400">Biomass Asphyxiation</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-slate-300 print:text-black font-semibold">Water Index (NDWI)</td>
                  <td className="p-2.5 text-slate-400">{region.metrics.ndwiBefore}</td>
                  <td className="p-2.5 text-slate-200">{region.metrics.ndwiAfter}</td>
                  <td className="p-2.5 text-blue-400 font-bold">+{region.metrics.ndwiChangePercent}%</td>
                  <td className="p-2.5 text-blue-400">Extreme Surge</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-slate-300 print:text-black font-semibold">Demographic Exposure</td>
                  <td className="p-2.5 text-slate-400">0</td>
                  <td className="p-2.5 text-white print:text-black font-bold">{region.metrics.populationExposed.toLocaleString()}</td>
                  <td className="p-2.5 text-amber-400">Marooned residents</td>
                  <td className="p-2.5 text-amber-400">Priority Evacuation</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-slate-300 print:text-black font-semibold">Agricultural Submergence</td>
                  <td className="p-2.5 text-slate-400">Productive harvest</td>
                  <td className="p-2.5 text-white print:text-black font-bold">{region.metrics.croplandImpactedHa.toLocaleString()} ha</td>
                  <td className="p-2.5 text-rose-400">Crop loss</td>
                  <td className="p-2.5 text-rose-400">Critical Food Security Risk</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Scientific Synthesis */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-bold text-slate-300 print:text-slate-800 uppercase tracking-wider">
            2.0 AI-GENERATED MULTIMODAL SYNTHESIS
          </div>
          <div className="p-4 rounded-xl bg-[#091811] border border-emerald-950 print:bg-slate-50 print:border-slate-200 text-xs font-sans leading-relaxed text-slate-200 print:text-slate-800">
            {region.aiExplanation}
          </div>
        </div>

        {/* Actionable Climate Adaptation Protocols */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-bold text-slate-300 print:text-slate-800 uppercase tracking-wider">
            3.0 OPERATIONAL CLIMATE ACTION PROTOCOLS
          </div>
          <div className="space-y-2">
            {region.adaptationActions.map((action, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 text-xs font-sans text-slate-300 print:text-slate-800"
              >
                <span className="font-mono text-emerald-400 print:text-emerald-700 font-bold shrink-0">
                  [3.{i + 1}]
                </span>
                <span>{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Document Footer Signoff */}
        <div className="pt-6 border-t border-emerald-950 print:border-slate-300 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500">
          <div>AERIS CLIMATE v2.4 · SEN1FLOODS11 BENCHMARK ACCREDITED</div>
          <div>STRICTLY GROUNDED SATELLITE INTELLIGENCE</div>
        </div>
      </div>
    </div>
  );
};
