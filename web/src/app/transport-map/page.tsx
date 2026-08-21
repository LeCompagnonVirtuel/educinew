'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import RoleLayout from '@/components/layout/RoleLayout';
import NominatimSearch from '@/components/map/NominatimSearch';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { sbTransport } from '@/lib/api';
import {
  Bus, MapPin, Navigation, Clock, Users, Route, Filter,
  ChevronRight, AlertTriangle, CheckCircle, Phone, Eye, Loader2,
} from 'lucide-react';

const TransportMap = dynamic(() => import('@/components/map/TransportMap'), { ssr: false });

interface BusData {
  id: string;
  plateNumber: string;
  driver: string;
  route: string;
  lat: number;
  lng: number;
  students: number;
  status: 'active' | 'idle' | 'offline';
  eta: string;
  stops: { name: string; lat: number; lng: number }[];
}

export default function TransportMapPage() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const [selectedBus, setSelectedBus] = useState<BusData | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showRoutes, setShowRoutes] = useState(true);
  const [buses, setBuses] = useState<BusData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const schoolLocation = { lat: 5.3600, lng: -4.0083, name: 'École' };

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await sbTransport.list(user?.schoolId);
        const mapped: BusData[] = (data || []).map((b: any) => ({
          id: b.id,
          plateNumber: b.plateNumber || b.plate_number || 'N/A',
          driver: b.driverName || b.driver_name || 'N/A',
          route: b.route || 'Non défini',
          lat: b.latitude || schoolLocation.lat + (Math.random() - 0.5) * 0.05,
          lng: b.longitude || schoolLocation.lng + (Math.random() - 0.5) * 0.05,
          students: b.studentCount || 0,
          status: b.isActive ? 'active' : 'offline',
          eta: '--',
          stops: [
            { name: 'Arrêt', lat: b.latitude || schoolLocation.lat + 0.01, lng: b.longitude || schoolLocation.lng + 0.01 },
            { name: 'École', lat: schoolLocation.lat, lng: schoolLocation.lng },
          ],
        }));
        setBuses(mapped);
      } catch (e: any) {
        setError(e.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user?.schoolId]);

  const filteredBuses = filterStatus === 'all' ? buses : buses.filter(b => b.status === filterStatus);

  const markers = [
    { id: 'school', type: 'school' as const, lat: schoolLocation.lat, lng: schoolLocation.lng, name: schoolLocation.name },
    ...filteredBuses.map(b => ({
      id: b.id, type: 'bus' as const, lat: b.lat, lng: b.lng,
      name: b.plateNumber, info: b.route, route: b.route, driver: b.driver, eta: b.eta,
    })),
    ...filteredBuses.flatMap(b => b.stops.slice(0, -1).map((s, i) => ({
      id: `${b.id}-stop-${i}`, type: 'stop' as const, lat: s.lat, lng: s.lng,
      name: s.name, info: `Bus ${b.plateNumber}`,
    }))),
  ];

  const routeColors = ['#3525cd', '#F59E0B', '#22C55E', '#EC4899'];
  const routesData = filteredBuses.map((b, i) => ({
    points: b.stops.map(s => [s.lat, s.lng] as [number, number]),
    color: routeColors[i % routeColors.length],
    name: b.route,
  }));

  const handleSearchSelect = (result: { name: string; lat: number; lng: number }) => {};

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: lang === 'fr' ? 'Transport' : 'Transport' }, { label: lang === 'fr' ? 'Carte' : 'Map' }]}>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-80 space-y-4">
          <NominatimSearch
            placeholder={lang === 'fr' ? 'Rechercher une adresse...' : 'Search address...'}
            onSelect={handleSearchSelect}
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Bus size={16} className="text-[#3525cd]" />
                <span className="text-xs font-bold text-[#464555]">{lang === 'fr' ? 'Bus actifs' : 'Active'}</span>
              </div>
              <p className="text-xl font-bold text-[#191c1d]">{buses.filter(b => b.status === 'active').length}</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Users size={16} className="text-[#22C55E]" />
                <span className="text-xs font-bold text-[#464555]">{lang === 'fr' ? 'Élèves' : 'Students'}</span>
              </div>
              <p className="text-xl font-bold text-[#191c1d]">{buses.reduce((a, b) => a + b.students, 0)}</p>
            </div>
          </div>

          <div className="flex gap-2">
            {['all', 'active', 'idle', 'offline'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors ${
                  filterStatus === status ? 'bg-[#3525cd] text-white' : 'bg-white text-[#464555] border border-slate-200'
                }`}
              >
                {status === 'all' ? (lang === 'fr' ? 'Tous' : 'All') :
                 status === 'active' ? (lang === 'fr' ? 'Actifs' : 'Active') :
                 status === 'idle' ? (lang === 'fr' ? 'À l\'arrêt' : 'Idle') :
                 (lang === 'fr' ? 'Hors ligne' : 'Offline')}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm">
            <span className="text-sm font-semibold text-[#191c1d]">{lang === 'fr' ? 'Afficher itinéraires' : 'Show routes'}</span>
            <button
              onClick={() => setShowRoutes(!showRoutes)}
              className={`w-10 h-5 rounded-full transition-colors ${showRoutes ? 'bg-[#3525cd]' : 'bg-slate-200'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${showRoutes ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#464555] uppercase tracking-wider">
              {lang === 'fr' ? 'Flotte de bus' : 'Bus Fleet'}
            </h3>
            {loading ? (
              <div className="text-center py-8"><Loader2 size={24} className="animate-spin mx-auto text-slate-400" /></div>
            ) : filteredBuses.map(bus => (
              <button
                key={bus.id}
                onClick={() => setSelectedBus(bus)}
                className={`w-full bg-white rounded-xl p-3 shadow-sm text-left hover:shadow-md transition-shadow ${
                  selectedBus?.id === bus.id ? 'ring-2 ring-[#3525cd]' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      bus.status === 'active' ? 'bg-green-500 animate-pulse' :
                      bus.status === 'idle' ? 'bg-amber-500' : 'bg-slate-300'
                    }`} />
                    <span className="text-sm font-bold text-[#191c1d]">{bus.plateNumber}</span>
                  </div>
                  {bus.status === 'active' && (
                    <span className="text-xs font-bold text-[#3525cd] bg-[#e2dfff] px-2 py-0.5 rounded-full">
                      {bus.eta}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#464555] mb-1">{bus.route}</p>
                <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                  <span className="flex items-center gap-1"><Users size={12} /> {bus.students}</span>
                  <span className="flex items-center gap-1"><Navigation size={12} /> {bus.driver}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <TransportMap
            markers={markers}
            center={[schoolLocation.lat, schoolLocation.lng]}
            zoom={13}
            height="calc(100vh - 200px)"
            showRoutes={showRoutes}
            routes={routesData}
            onMarkerClick={(marker) => {
              if (marker.type === 'bus') {
                const bus = buses.find(b => b.id === marker.id);
                if (bus) setSelectedBus(bus);
              }
            }}
          />
        </div>
      </div>
    </RoleLayout>
  );
}
