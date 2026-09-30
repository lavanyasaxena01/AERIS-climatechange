import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { RegionData } from '../../types/climate';
import { Layers, Crosshair, ZoomIn, ZoomOut, Maximize2, ShieldAlert } from 'lucide-react';
import { ClimateRiskBadge } from '../common/ClimateRiskBadge';

interface InteractiveMapProps {
  region: RegionData;
  onSelectRegion?: (region: RegionData) => void;
  className?: string;
  initialLayers?: {
    satellite?: boolean;
    change?: boolean;
    flood?: boolean;
    vegetation?: boolean;
    water?: boolean;
    risk?: boolean;
  };
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  region,
  className = '',
  initialLayers = {
    satellite: true,
    change: true,
    flood: true,
    vegetation: false,
    water: false,
    risk: true,
  },
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polygonLayerRef = useRef<L.Polygon | null>(null);
  const overlayGroupRef = useRef<L.LayerGroup | null>(null);

  const [activeLayers, setActiveLayers] = useState({
    satellite: initialLayers.satellite ?? true,
    change: initialLayers.change ?? true,
    flood: initialLayers.flood ?? true,
    vegetation: initialLayers.vegetation ?? false,
    water: initialLayers.water ?? false,
    risk: initialLayers.risk ?? true,
  });

  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [currentZoom, setCurrentZoom] = useState<number>(region.zoom);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: region.center,
      zoom: region.zoom,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Basemaps: Esri World Imagery (Satellite) & Carto Dark Matter
    const satelliteLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 18,
        attribution: 'Esri, Maxar, Earthstar Geographics',
      }
    );

    const darkLayer = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 19,
        subdomains: 'abcd',
        attribution: 'CartoDB',
      }
    );

    if (activeLayers.satellite) {
      satelliteLayer.addTo(map);
    } else {
      darkLayer.addTo(map);
    }

    const overlayGroup = L.layerGroup().addTo(map);
    overlayGroupRef.current = overlayGroup;

    // Mouse coordinates tracking
    map.on('mousemove', (e) => {
      setCursorCoords({
        lat: Math.round(e.latlng.lat * 10000) / 10000,
        lng: Math.round(e.latlng.lng * 10000) / 10000,
      });
    });

    map.on('zoomend', () => {
      setCurrentZoom(map.getZoom());
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update center, bounds & layers when region or activeLayers changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.setView(region.center, region.zoom);

    // Clear previous overlays
    if (overlayGroupRef.current) {
      overlayGroupRef.current.clearLayers();
    }

    // 1. AOI Region Polygon (Hairline emerald boundary)
    if (polygonLayerRef.current) {
      polygonLayerRef.current.remove();
    }

    const aoiPolygon = L.polygon(region.coordinatesPolygon, {
      color: '#10b981',
      weight: 1.5,
      opacity: 0.9,
      fillColor: '#059669',
      fillOpacity: 0.08,
      dashArray: '4, 4',
    }).addTo(map);

    polygonLayerRef.current = aoiPolygon;

    aoiPolygon.bindPopup(`
      <div style="font-family: var(--font-sans); color: #f1f5f9; padding: 6px; font-size: 12px; min-width: 200px;">
        <div style="font-weight: 700; color: #34d399; font-size: 13px; margin-bottom: 4px;">${region.name}</div>
        <div style="color: #94a3b8; font-size: 11px; margin-bottom: 8px;">${region.biome}</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-family: var(--font-mono); font-size: 11px;">
          <div><span style="color: #64748b;">Area:</span> ${region.metrics.totalAreaKm2.toLocaleString()} km²</div>
          <div><span style="color: #64748b;">Risk:</span> ${region.metrics.riskScore}/100</div>
          <div><span style="color: #64748b;">Flood:</span> ${region.metrics.floodAreaKm2.toLocaleString()} km²</div>
          <div><span style="color: #64748b;">NDVI Δ:</span> ${region.metrics.ndviChangePercent}%</div>
        </div>
      </div>
    `);

    // 2. Synthetic Geospatial Inundation & Change Overlays
    const [cLat, cLng] = region.center;

    if (activeLayers.flood && region.metrics.floodAreaKm2 > 50) {
      // Flood Inundation Mask polygon
      const floodCluster = L.circle([cLat + 0.08, cLng + 0.05], {
        radius: 14000,
        color: '#06b6d4',
        weight: 1.5,
        fillColor: '#0891b2',
        fillOpacity: 0.45,
      });
      floodCluster.bindTooltip(`Flood Inundation: ${region.metrics.floodAreaKm2} km²`, {
        className: 'bg-slate-900 text-cyan-300 font-mono text-xs border border-cyan-800',
      });
      overlayGroupRef.current?.addLayer(floodCluster);
    }

    if (activeLayers.change) {
      // Change Detection Hotspot polygon
      const changeCluster = L.circle([cLat - 0.06, cLng - 0.04], {
        radius: 11000,
        color: '#f59e0b',
        weight: 1.5,
        fillColor: '#d97706',
        fillOpacity: 0.35,
      });
      changeCluster.bindTooltip(`Change Zone: ${region.metrics.changedAreaKm2} km²`, {
        className: 'bg-slate-900 text-amber-300 font-mono text-xs border border-amber-800',
      });
      overlayGroupRef.current?.addLayer(changeCluster);
    }

    if (activeLayers.vegetation) {
      // NDVI Vegetation Decline zone
      const vegCluster = L.circle([cLat + 0.12, cLng - 0.08], {
        radius: 9500,
        color: '#ef4444',
        weight: 1.5,
        fillColor: '#b91c1c',
        fillOpacity: 0.4,
      });
      vegCluster.bindTooltip(`Canopy Degradation: ${region.metrics.ndviChangePercent}% NDVI`, {
        className: 'bg-slate-900 text-rose-300 font-mono text-xs border border-rose-800',
      });
      overlayGroupRef.current?.addLayer(vegCluster);
    }

    if (activeLayers.water) {
      // NDWI Water anomaly
      const waterCluster = L.circle([cLat - 0.11, cLng + 0.09], {
        radius: 8000,
        color: '#3b82f6',
        weight: 1.5,
        fillColor: '#1d4ed8',
        fillOpacity: 0.4,
      });
      waterCluster.bindTooltip(`Hydrological Shift: ${region.metrics.ndwiChangePercent}% NDWI`, {
        className: 'bg-slate-900 text-blue-300 font-mono text-xs border border-blue-800',
      });
      overlayGroupRef.current?.addLayer(waterCluster);
    }

    if (activeLayers.risk) {
      // Climate Risk buffer ring
      const riskRing = L.circle(region.center, {
        radius: 18000,
        color: region.metrics.riskScore >= 75 ? '#f43f5e' : '#f59e0b',
        weight: 1.5,
        dashArray: '6, 6',
        fillColor: region.metrics.riskScore >= 75 ? '#e11d48' : '#d97706',
        fillOpacity: 0.12,
      });
      overlayGroupRef.current?.addLayer(riskRing);
    }
  }, [region, activeLayers]);

  const toggleLayer = (layer: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleReset = () => mapInstanceRef.current?.setView(region.center, region.zoom);

  return (
    <div className={`relative w-full h-[520px] rounded-xl overflow-hidden border border-emerald-950/70 bg-[#050807] ${className}`}>
      {/* Leaflet DOM container */}
      <div ref={mapContainerRef} className="w-full h-full z-0 cursor-crosshair" />

      {/* Top HUD: Region metadata & live telemetry */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2 pointer-events-none">
        <div className="bg-[#06100b]/90 backdrop-blur-md border border-emerald-900/60 rounded-lg px-3 py-1.5 pointer-events-auto flex items-center gap-2.5 shadow-md">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-white tracking-wide">
            {region.name}
          </span>
          <span className="text-xs font-mono text-slate-400 border-l border-emerald-950 pl-2">
            {region.country}
          </span>
        </div>

        <ClimateRiskBadge level={region.metrics.riskLevel} score={region.metrics.riskScore} size="sm" />
      </div>

      {/* Layer Controls Palette (Floating Glass Panel) */}
      <div className="absolute top-3 right-3 z-10 bg-[#06100b]/95 backdrop-blur-md border border-emerald-900/60 rounded-lg p-2.5 shadow-xl text-xs font-mono">
        <div className="flex items-center gap-1.5 text-slate-300 font-semibold mb-2 pb-1.5 border-b border-emerald-950/80">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          <span>GEOSPATIAL LAYERS</span>
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer hover:text-emerald-300 transition-colors text-slate-300">
            <input
              type="checkbox"
              checked={activeLayers.satellite}
              onChange={() => toggleLayer('satellite')}
              className="accent-emerald-500 rounded cursor-pointer"
            />
            <span>Satellite Basemap</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amber-300 transition-colors text-slate-300">
            <input
              type="checkbox"
              checked={activeLayers.change}
              onChange={() => toggleLayer('change')}
              className="accent-amber-500 rounded cursor-pointer"
            />
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              Change Mask
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-cyan-300 transition-colors text-slate-300">
            <input
              type="checkbox"
              checked={activeLayers.flood}
              onChange={() => toggleLayer('flood')}
              className="accent-cyan-500 rounded cursor-pointer"
            />
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" />
              Flood Inundation
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-rose-300 transition-colors text-slate-300">
            <input
              type="checkbox"
              checked={activeLayers.vegetation}
              onChange={() => toggleLayer('vegetation')}
              className="accent-rose-500 rounded cursor-pointer"
            />
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
              NDVI Loss
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-blue-300 transition-colors text-slate-300">
            <input
              type="checkbox"
              checked={activeLayers.water}
              onChange={() => toggleLayer('water')}
              className="accent-blue-500 rounded cursor-pointer"
            />
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              NDWI Anomaly
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-emerald-300 transition-colors text-slate-300">
            <input
              type="checkbox"
              checked={activeLayers.risk}
              onChange={() => toggleLayer('risk')}
              className="accent-emerald-500 rounded cursor-pointer"
            />
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Climate Risk Ring
            </span>
          </label>
        </div>
      </div>

      {/* Bottom Telemetry HUD */}
      <div className="absolute bottom-3 left-3 z-10 bg-[#06100b]/90 backdrop-blur-md border border-emerald-900/60 rounded-lg px-3 py-1.5 text-[11px] font-mono text-slate-400 flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Crosshair className="w-3 h-3 text-emerald-400" />
          <span>
            {cursorCoords
              ? `${cursorCoords.lat > 0 ? '+' : ''}${cursorCoords.lat}°, ${cursorCoords.lng > 0 ? '+' : ''}${cursorCoords.lng}°`
              : `${region.center[0]}°, ${region.center[1]}°`}
          </span>
        </div>
        <span className="text-slate-600">·</span>
        <span>ZOOM: {currentZoom}x</span>
        <span className="text-slate-600">·</span>
        <span>RES: 10m/px</span>
        <span className="text-slate-600">·</span>
        <span className="text-emerald-400 font-medium">EPSG:4326</span>
      </div>

      {/* Zoom / Map Controls */}
      <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 bg-[#06100b]/90 backdrop-blur-md border border-emerald-900/60 rounded-lg p-1">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-emerald-950/60 rounded transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-emerald-950/60 rounded transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          title="Reset to AOI"
          className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-emerald-950/60 rounded transition-colors"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
