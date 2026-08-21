'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icons
const createIcon = (color: string, icon: string) => L.divIcon({
  className: 'custom-marker',
  html: `<div style="background:${color};width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 10px rgba(0,0,0,0.3);border:3px solid white;">
    <span style="font-size:16px;">${icon}</span>
  </div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

const schoolIcon = createIcon('#3525cd', '🏫');
const busIcon = createIcon('#F59E0B', '🚌');
const stopIcon = createIcon('#22C55E', '🚏');
const parentIcon = createIcon('#EC4899', '📍');

interface MapMarker {
  id: string;
  type: 'school' | 'bus' | 'stop' | 'parent';
  lat: number;
  lng: number;
  name: string;
  info?: string;
  route?: string;
  driver?: string;
  eta?: string;
}

interface TransportMapProps {
  markers?: MapMarker[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  showRoutes?: boolean;
  routes?: { points: [number, number][]; color: string; name: string }[];
  onMarkerClick?: (marker: MapMarker) => void;
}

export default function TransportMap({
  markers = [],
  center = [5.3600, -4.0083], // Abidjan
  zoom = 13,
  height = '500px',
  showRoutes = false,
  routes = [],
  onMarkerClick,
}: TransportMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const routesRef = useRef<L.Polyline[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const icons: Record<string, L.DivIcon> = {
      school: schoolIcon,
      bus: busIcon,
      stop: stopIcon,
      parent: parentIcon,
    };

    markers.forEach(marker => {
      const m = L.marker([marker.lat, marker.lng], { icon: icons[marker.type] || schoolIcon })
        .addTo(map);

      const popupContent = `
        <div style="min-width:200px;font-family:Inter,sans-serif;">
          <h3 style="font-weight:700;font-size:14px;margin:0 0 4px;color:#191c1d;">${marker.name}</h3>
          ${marker.info ? `<p style="font-size:12px;color:#464555;margin:0 0 4px;">${marker.info}</p>` : ''}
          ${marker.route ? `<p style="font-size:11px;color:#3525cd;font-weight:600;margin:0 0 2px;">🚌 Route: ${marker.route}</p>` : ''}
          ${marker.driver ? `<p style="font-size:11px;color:#464555;margin:0 0 2px;">👤 ${marker.driver}</p>` : ''}
          ${marker.eta ? `<p style="font-size:11px;color:#22C55E;font-weight:600;margin:0;">⏱️ ETA: ${marker.eta}</p>` : ''}
        </div>
      `;

      m.bindPopup(popupContent);

      if (onMarkerClick) {
        m.on('click', () => onMarkerClick(marker));
      }

      markersRef.current.push(m);
    });

    // Fit bounds if multiple markers
    if (markers.length > 1) {
      const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng] as [number, number]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [markers]);

  // Update routes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    routesRef.current.forEach(r => r.remove());
    routesRef.current = [];

    if (showRoutes) {
      routes.forEach(route => {
        const polyline = L.polyline(route.points, {
          color: route.color,
          weight: 4,
          opacity: 0.8,
          dashArray: '10, 5',
        }).addTo(map);

        polyline.bindPopup(`<b>${route.name}</b>`);
        routesRef.current.push(polyline);
      });
    }
  }, [routes, showRoutes]);

  return (
    <div
      ref={mapRef}
      style={{ height, width: '100%', borderRadius: '16px', zIndex: 1 }}
      className="shadow-lg"
    />
  );
}
