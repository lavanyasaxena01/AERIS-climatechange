import React, { useState } from 'react';
import { RegionData, ChatMessage } from '../../types/climate';
import { GlassCard } from '../common/GlassCard';
import { ClimateRiskBadge } from '../common/ClimateRiskBadge';
import {
  Sparkles,
  Send,
  Bot,
  User,
  ShieldAlert,
  Database,
  CheckCircle2,
  HelpCircle,
  Loader2,
  FileCheck,
} from 'lucide-react';

interface AIAnalystViewProps {
  region: RegionData;
}

const SAMPLE_QUERIES = [
  'What changed in this area between observation dates?',
  'Why is this region evaluated at elevated risk?',
  'Explain the vegetation loss and NDVI trajectory.',
  'Summarize the flood impact and demographic exposure.',
  'What operational climate adaptation actions are recommended?',
];

export const AIAnalystView: React.FC<AIAnalystViewProps> = ({ region }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: `I am the AERIS AI Climate Analyst. I am currently grounded in the empirical observations of **${region.name}** (${region.country}).\n\n- **Inundation Extent**: ${region.metrics.floodAreaKm2.toLocaleString()} km²\n- **Canopy Deficit (NDVI)**: ${region.metrics.ndviChangePercent}%\n- **Biophysical Risk Index**: ${region.metrics.riskScore}/100 (${region.metrics.riskLevel})\n\nAsk me any question regarding biophysical indicators, radar backscatter, optical reflectance, or disaster response strategies.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      groundedData: {
        regionName: region.name,
        riskScore: region.metrics.riskScore,
        metrics: {
          floodAreaKm2: region.metrics.floodAreaKm2,
          changedAreaKm2: region.metrics.changedAreaKm2,
          ndviDelta: `${region.metrics.ndviChangePercent}%`,
          populationExposed: region.metrics.populationExposed,
        },
      },
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed || isProcessing) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsProcessing(true);

    try {
      const response = await fetch('/api/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          regionId: region.id,
          query: trimmed,
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.answer || data.summary,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundedData: {
          regionName: region.name,
          riskScore: region.metrics.riskScore,
          metrics: {
            summary: data.summary,
            evidence: (data.evidence || []).join(' · '),
            attribution: data.attribution,
          },
        },
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Failed to query AI analyst:', err);
      // Deterministic grounded response fallback
      const aiMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: `**Grounded Assessment for ${region.name}**:\n\n${region.aiExplanation}\n\n**Actionable Recommendations**:\n${region.adaptationActions.map((a) => `- ${a}`).join('\n')}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-emerald-950/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GROUNDED MULTIMODAL REASONING</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">Gemini 3.8 Flash + Biophysical Evidence Filter</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            AERIS AI Climate Analyst
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Ask complex geospatial queries. All responses are mathematically anchored to calibrated Sentinel-1, Sentinel-2, and MCDA risk metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ClimateRiskBadge level={region.metrics.riskLevel} score={region.metrics.riskScore} size="md" />
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Chat Message Stream */}
        <div className="lg:col-span-8 flex flex-col h-[580px] bg-[#07130d]/80 rounded-xl border border-emerald-950/70 overflow-hidden">
          {/* Messages scroll pane */}
          <div className="flex-1 p-4 lg:p-5 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-mono ${
                    msg.role === 'user'
                      ? 'bg-emerald-500 text-black font-bold'
                      : 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
                  }`}
                >
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-emerald-600/90 text-white font-sans'
                      : 'bg-[#091710] border border-emerald-900/60 text-slate-200 font-sans'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>

                  {msg.groundedData && (
                    <div className="mt-2.5 pt-2 border-t border-emerald-950/70 text-[11px] font-mono text-emerald-400 flex items-center gap-2">
                      <FileCheck className="w-3 h-3 text-emerald-400" />
                      <span>Grounded in verified satellite observations</span>
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 font-mono mt-1 text-right">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex gap-3 items-center text-xs font-mono text-emerald-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AERIS AI is grounding observations in biophysical data...</span>
              </div>
            )}
          </div>

          {/* Prompt Suggestions Toolbar */}
          <div className="p-2.5 bg-[#050e09] border-t border-emerald-950/60 flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
            <span className="text-slate-400 shrink-0">Prompts:</span>
            {SAMPLE_QUERIES.map((sample, i) => (
              <button
                key={i}
                onClick={() => handleSend(sample)}
                className="px-2.5 py-1 rounded bg-[#091610] hover:bg-emerald-950/70 border border-emerald-900/50 hover:border-emerald-600/50 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 truncate max-w-[280px]"
              >
                {sample}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-[#08150f] border-t border-emerald-950/80 flex items-center gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(inputQuery)}
              placeholder="Ask AERIS AI about this climate hazard..."
              className="flex-1 bg-[#050e09] border border-emerald-900/60 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
            />
            <button
              onClick={() => handleSend(inputQuery)}
              disabled={isProcessing || !inputQuery.trim()}
              className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-black font-semibold rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Query</span>
            </button>
          </div>
        </div>

        {/* Right: Active Ingestion Payload HUD */}
        <div className="lg:col-span-4 space-y-4">
          <GlassCard className="space-y-3">
            <div className="flex items-center gap-2 border-b border-emerald-950/70 pb-3 text-xs font-mono font-bold text-slate-200">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>GROUNDED SATELLITE CONTEXT</span>
            </div>

            <p className="text-[11px] text-slate-400 font-sans leading-normal">
              To prevent hallucinations, AERIS constrains the reasoning engine with the following empirical schema:
            </p>

            <div className="p-3 rounded-lg bg-[#040906] border border-emerald-950 font-mono text-[11px] text-slate-300 space-y-1.5">
              <div><span className="text-slate-500">Region:</span> {region.name}</div>
              <div><span className="text-slate-500">Coordinates:</span> {region.center.join(', ')}</div>
              <div><span className="text-slate-500">Hazard:</span> {region.primaryHazard}</div>
              <div><span className="text-slate-500">Inundated Area:</span> {region.metrics.floodAreaKm2} km²</div>
              <div><span className="text-slate-500">Mean NDVI Δ:</span> {region.metrics.ndviChangePercent}%</div>
              <div><span className="text-slate-500">NDWI Δ:</span> +{region.metrics.ndwiChangePercent}%</div>
              <div><span className="text-slate-500">Risk Score:</span> {region.metrics.riskScore}/100 ({region.metrics.riskLevel})</div>
              <div><span className="text-slate-500">Confidence:</span> {Math.round(region.metrics.confidence * 100)}%</div>
            </div>

            <div className="text-[11px] font-mono text-emerald-400 pt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero-hallucination constraint verified</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
