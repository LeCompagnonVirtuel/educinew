'use client';

import { useState, useEffect, useCallback } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbTransport } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useRealtimeSubscription } from '@/hooks/useRealtime';
import { cn } from '@/lib/utils';
import SmartPhoneInput from '@/components/ui/SmartPhoneInput';
import dynamic from 'next/dynamic';
import {
  Bus, MapPin, Navigation, Clock, Users, Plus, X,
  AlertTriangle, Phone, Fuel, CheckCircle, MapPinned,
  Route, Bell, Eye, Edit, Trash2, RefreshCw, UserCheck,
  Activity, TrendingUp, BarChart3,
} from 'lucide-react';

const TransportMap = dynamic(() => import('@/components/map/TransportMap'), { ssr: false });

interface Bus {
  id: string;
  plateNumber: string;
  driverName: string;
  driverId?: string;
  route: string;
  capacity: number;
  isActive: boolean;
  vehicleModel?: string;
  vehicleYear?: number;
  vehicleColor?: string;
  studentCount?: number;
  currentLat?: number;
  currentLng?: number;
}

interface Trip {
  id: string;
  busId: string;
  driverId: string;
  tripType: string;
  status: string;
  startedAt?: string;
  completedAt?: string;
  totalStudents: number;
  studentsPickedUp: number;
  bus?: { plateNumber: string; driverName: string };
  driver?: { name: string };
}

export default function TransportPage() {
  const { user } = useAuth();
  const [buses, setBuses] = useState<Bus[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'fleet' | 'tracking' | 'trips'>('fleet');
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [drivers, setDrivers] = useState<any[]>([]);
  const [busPositions, setBusPositions] = useState<Map<string, { lat: number; lng: number; speed?: number }>>(new Map());

  const [form, setForm] = useState({
    plateNumber: '', driverName: '', driverId: '', route: '', capacity: '40',
    vehicleModel: '', vehicleYear: '', vehicleColor: '',
  });

  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);
  const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ─── Realtime subscription ──────────────────────────────────
  useRealtimeSubscription([
    { table: 'bus_tracking', event: 'INSERT', onData: (payload: any) => {
      const p = payload.new;
      if (p?.bus_id && p?.latitude) {
        setBusPositions(prev => new Map(prev).set(p.bus_id, { lat: p.latitude, lng: p.longitude, speed: p.speed_kmh }));
      }
    }},
    { table: 'trips', event: '*', onData: () => { loadTrips(); }},
  ]);

  // ─── Load Data ──────────────────────────────────────────────
  const loadBuses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await sbTransport.list(user?.schoolId);
      setBuses(data || []);
    } catch (e) {
      setError('Erreur lors du chargement des bus');
    } finally {
      setLoading(false);
    }
  }, [user?.schoolId]);

  const loadTrips = useCallback(async () => {
    try {
      const data = await sbTransport.getTodayTrips();
      setTrips(data || []);
    } catch {}
  }, []);

  const loadDrivers = useCallback(async () => {
    try {
      const data = await sbTransport.getDrivers(user?.schoolId);
      setDrivers(data || []);
    } catch {}
  }, [user?.schoolId]);

  useEffect(() => { loadBuses(); loadTrips(); loadDrivers(); }, [loadBuses, loadTrips, loadDrivers]);

  // ─── Load bus positions ─────────────────────────────────────
  useEffect(() => {
    const loadPositions = async () => {
      for (const bus of buses.filter(b => b.isActive)) {
        try {
          const pos = await sbTransport.getLatestPosition(bus.id);
          if (pos) {
            setBusPositions(prev => new Map(prev).set(bus.id, { lat: pos.latitude, lng: pos.longitude, speed: pos.speedKmh }));
          }
        } catch {}
      }
    };
    if (buses.length > 0) loadPositions();
  }, [buses]);

  // ─── Computed ───────────────────────────────────────────────
  const activeBuses = buses.filter(b => b.isActive);
  const inactiveBuses = buses.filter(b => !b.isActive);
  const activeTrips = trips.filter(t => t.status === 'IN_PROGRESS');
  const completedTrips = trips.filter(t => t.status === 'COMPLETED');

  // ─── Handlers ───────────────────────────────────────────────
  const handleCreate = async () => {
    if (!form.plateNumber.trim() || !form.driverName.trim()) {
      setError('Plaque et chauffeur obligatoires.');
      return;
    }
    setCreating(true);
    setError('');
    try {
      await sbTransport.create({
        plateNumber: form.plateNumber.trim(),
        driverName: form.driverName.trim(),
        driverId: form.driverId || null,
        route: form.route.trim(),
        capacity: parseInt(form.capacity) || 40,
        vehicleModel: form.vehicleModel.trim() || null,
        vehicleYear: form.vehicleYear ? parseInt(form.vehicleYear) : null,
        vehicleColor: form.vehicleColor.trim() || null,
      });
      setShowCreate(false);
      setForm({ plateNumber: '', driverName: '', driverId: '', route: '', capacity: '40', vehicleModel: '', vehicleYear: '', vehicleColor: '' });
      loadBuses();
      showToast('Véhicule ajouté avec succès');
    } catch (err: any) {
      setError(err.message || 'Erreur');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (busId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce bus?')) return;
    try {
      await sbTransport.remove(busId);
      loadBuses();
      showToast('Véhicule supprimé');
    } catch { showToast('Erreur lors de la suppression', 'error'); }
  };

  // ─── Map markers ────────────────────────────────────────────
  const mapMarkers = buses.flatMap(bus => {
    const pos = busPositions.get(bus.id);
    if (!pos) return [];
    return [{
      id: bus.id,
      type: 'bus' as const,
      lat: pos.lat,
      lng: pos.lng,
      name: bus.plateNumber,
      info: `${bus.driverName} · ${bus.route || 'Sans itinéraire'}`,
      route: bus.route,
      driver: bus.driverName,
    }];
  });

  return (
    <RoleLayout role="admin">
      {toast && (
        <div className={cn('fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold',
          toast.type === 'success' ? 'bg-emerald-500 text-white' : toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white')}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transport scolaire</h1>
          <p className="text-slate-500 mt-1">Gestion des bus, suivi GPS et trajets</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 rounded-xl p-1">
            <button onClick={() => setViewMode('fleet')} className={cn('px-4 py-2 rounded-lg text-sm font-medium', viewMode === 'fleet' ? 'bg-white shadow text-indigo-600' : 'text-slate-600')}>
              <Bus size={16} className="inline mr-1" />Flotte
            </button>
            <button onClick={() => setViewMode('tracking')} className={cn('px-4 py-2 rounded-lg text-sm font-medium', viewMode === 'tracking' ? 'bg-white shadow text-indigo-600' : 'text-slate-600')}>
              <Navigation size={16} className="inline mr-1" />Suivi
            </button>
            <button onClick={() => setViewMode('trips')} className={cn('px-4 py-2 rounded-lg text-sm font-medium', viewMode === 'trips' ? 'bg-white shadow text-indigo-600' : 'text-slate-600')}>
              <Activity size={16} className="inline mr-1" />Trajets
            </button>
          </div>
          {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
            <button onClick={() => setShowCreate(true)} className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-indigo-700">
              <Plus size={16} />Ajouter bus
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <StatCard icon={<Bus size={20} className="text-indigo-600" />} label="Bus actifs" value={`${activeBuses.length}/${buses.length}`} bg="bg-indigo-50" />
        <StatCard icon={<Users size={20} className="text-emerald-600" />} label="Élèves transportés" value={String(buses.reduce((a, b) => a + (b.studentCount || 0), 0))} bg="bg-emerald-50" />
        <StatCard icon={<Navigation size={20} className="text-amber-600" />} label="Trajets en cours" value={String(activeTrips.length)} bg="bg-amber-50" />
        <StatCard icon={<CheckCircle size={20} className="text-blue-600" />} label="Trajets terminés" value={String(completedTrips.length)} bg="bg-blue-50" />
        <StatCard icon={<AlertTriangle size={20} className="text-red-600" />} label="En maintenance" value={String(inactiveBuses.length)} bg="bg-red-50" />
      </div>

      {/* ═══ FLEET VIEW ═══ */}
      {viewMode === 'fleet' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading ? (
            <div className="col-span-full text-center py-12 text-slate-400">Chargement...</div>
          ) : buses.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-slate-200">
              <Bus size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">Aucun bus enregistré</p>
              <p className="text-xs text-slate-400 mt-1">Ajoutez un véhicule pour commencer</p>
            </div>
          ) : (
            buses.map(bus => {
              const hasGps = busPositions.has(bus.id);
              return (
                <div key={bus.id} onClick={() => { setSelectedBus(bus); setShowDetail(true); }}
                  className="bg-white rounded-xl p-4 border border-slate-100 hover:border-indigo-200 cursor-pointer transition-all hover:shadow-md">
                  <div className="flex justify-between items-start mb-3">
                    <div className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg">
                      {bus.plateNumber}
                    </div>
                    <div className="flex items-center gap-2">
                      {hasGps && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="GPS actif" />}
                      <div className={cn('flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium', bus.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>
                        <span className={cn('w-1.5 h-1.5 rounded-full', bus.isActive ? 'bg-emerald-500' : 'bg-amber-500')} />
                        {bus.isActive ? 'Actif' : 'Inactif'}
                      </div>
                    </div>
                  </div>
                  <p className="font-bold text-slate-900 mb-1">{bus.driverName || 'Chauffeur non assigné'}</p>
                  <p className="text-sm text-slate-500 mb-2">{bus.route || 'Itinéraire non défini'}</p>
                  {bus.vehicleModel && <p className="text-xs text-slate-400 mb-2">{bus.vehicleModel} {bus.vehicleYear || ''}</p>}
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-50">
                    <span className="flex items-center gap-1"><Users size={12} />{bus.studentCount || 0}/{bus.capacity} places</span>
                    {hasGps && <span className="text-emerald-500 font-medium">GPS OK</span>}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ═══ TRACKING VIEW ═══ */}
      {viewMode === 'tracking' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <TransportMap
              markers={mapMarkers}
              height="600px"
              zoom={13}
            />
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Bus size={16} className="text-indigo-600" />
                Bus en service ({activeBuses.length})
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {activeBuses.map(bus => {
                  const hasGps = busPositions.has(bus.id);
                  return (
                    <div key={bus.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer" onClick={() => setSelectedBus(bus)}>
                      <div className="flex items-center gap-2">
                        <div className={cn('w-2.5 h-2.5 rounded-full', hasGps ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300')} />
                        <div>
                          <p className="text-sm font-medium">{bus.plateNumber}</p>
                          <p className="text-xs text-slate-400">{bus.driverName}</p>
                        </div>
                      </div>
                      <Eye size={14} className="text-slate-400" />
                    </div>
                  );
                })}
                {activeBuses.length === 0 && <p className="text-xs text-slate-400 text-center py-4">Aucun bus en service</p>}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Activity size={16} className="text-amber-600" />
                Trajets en cours ({activeTrips.length})
              </h3>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {activeTrips.map(trip => (
                  <div key={trip.id} className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
                    <p className="text-sm font-medium text-emerald-800">{trip.bus?.plateNumber || 'Bus'}</p>
                    <p className="text-xs text-emerald-600">{trip.driver?.name || 'Conducteur'} · {trip.tripType === 'MORNING' ? 'Matin' : 'Soir'}</p>
                    <p className="text-xs text-emerald-500 mt-1">{trip.studentsPickedUp}/{trip.totalStudents} élèves à bord</p>
                  </div>
                ))}
                {activeTrips.length === 0 && <p className="text-xs text-slate-400 text-center py-4">Aucun trajet en cours</p>}
              </div>
            </div>

            <div className="bg-indigo-50 rounded-xl p-4">
              <h3 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                <Bell size={16} />Alertes
              </h3>
              <div className="space-y-2">
                {inactiveBuses.length > 0 && (
                  <div className="bg-white p-2 rounded-lg text-xs">
                    <p className="font-medium text-amber-700">{inactiveBuses.length} bus en maintenance</p>
                  </div>
                )}
                {activeBuses.length === 0 && (
                  <div className="bg-white p-2 rounded-lg text-xs">
                    <p className="font-medium text-red-700">Aucun bus en service</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ TRIPS VIEW ═══ */}
      {viewMode === 'trips' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-800">Trajets du jour ({trips.length})</h3>
            </div>
            {trips.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Activity size={40} className="mx-auto mb-3 opacity-50" />
                <p>Aucun trajet aujourd'hui</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {trips.map(trip => (
                  <div key={trip.id} className="px-6 py-4 flex items-center gap-4">
                    <div className={cn('w-10 h-10 rounded-full flex items-center justify-center',
                      trip.status === 'IN_PROGRESS' ? 'bg-emerald-100' : trip.status === 'COMPLETED' ? 'bg-slate-100' : 'bg-red-100')}>
                      {trip.status === 'IN_PROGRESS' ? <Navigation size={18} className="text-emerald-600" /> :
                       trip.status === 'COMPLETED' ? <CheckCircle size={18} className="text-slate-500" /> :
                       <X size={18} className="text-red-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{trip.bus?.plateNumber || 'Bus'} — {trip.driver?.name || 'Conducteur'}</p>
                      <p className="text-sm text-slate-500">
                        {trip.tripType === 'MORNING' ? 'Tournée matin' : trip.tripType === 'AFTERNOON' ? 'Tournée soir' : 'Tournée spéciale'}
                        {trip.startedAt && ` · Départ ${new Date(trip.startedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`}
                        {trip.completedAt && ` · Arrivée ${new Date(trip.completedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={cn('px-3 py-1 rounded-full text-xs font-semibold',
                        trip.status === 'IN_PROGRESS' ? 'bg-emerald-100 text-emerald-700' :
                        trip.status === 'COMPLETED' ? 'bg-slate-100 text-slate-600' : 'bg-red-100 text-red-600')}>
                        {trip.status === 'IN_PROGRESS' ? 'En cours' : trip.status === 'COMPLETED' ? 'Terminé' : 'Annulé'}
                      </span>
                      <p className="text-xs text-slate-400 mt-1">{trip.studentsPickedUp}/{trip.totalStudents} élèves</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ CREATE MODAL ═══ */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowCreate(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Ajouter un véhicule</h3>
              <button onClick={() => setShowCreate(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-4">{error}</div>}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Plaque *</label>
                  <input value={form.plateNumber} onChange={e => setForm({ ...form, plateNumber: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm" placeholder="AB-123-CD" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Capacité</label>
                  <input type="number" value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Chauffeur *</label>
                {drivers.length > 0 ? (
                  <select value={form.driverId} onChange={e => {
                    const d = drivers.find((d: any) => d.id === e.target.value);
                    setForm({ ...form, driverId: e.target.value, driverName: d?.name || '' });
                  }} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm">
                    <option value="">Sélectionner un chauffeur</option>
                    {drivers.map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                ) : (
                  <input value={form.driverName} onChange={e => setForm({ ...form, driverName: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm" placeholder="Nom du chauffeur" />
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Itinéraire</label>
                <input value={form.route} onChange={e => setForm({ ...form, route: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm" placeholder="Cocody - École" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Marque</label>
                  <input value={form.vehicleModel} onChange={e => setForm({ ...form, vehicleModel: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm" placeholder="Toyota" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Année</label>
                  <input type="number" value={form.vehicleYear} onChange={e => setForm({ ...form, vehicleYear: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm" placeholder="2024" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Couleur</label>
                  <input value={form.vehicleColor} onChange={e => setForm({ ...form, vehicleColor: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm" placeholder="Jaune" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowCreate(false)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">Annuler</button>
              <button onClick={handleCreate} disabled={creating} className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50">
                {creating ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ DETAIL MODAL ═══ */}
      {showDetail && selectedBus && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowDetail(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">{selectedBus.plateNumber}</h3>
              <button onClick={() => setShowDetail(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <DetailRow icon={<UserCheck size={18} className="text-indigo-600" />} label="Chauffeur" value={selectedBus.driverName || 'Non assigné'} />
              <DetailRow icon={<Route size={18} className="text-emerald-600" />} label="Itinéraire" value={selectedBus.route || 'Non défini'} />
              <DetailRow icon={<Users size={18} className="text-blue-600" />} label="Capacité" value={`${selectedBus.studentCount || 0}/${selectedBus.capacity} places`} />
              {selectedBus.vehicleModel && <DetailRow icon={<Bus size={18} className="text-amber-600" />} label="Véhicule" value={`${selectedBus.vehicleModel} ${selectedBus.vehicleYear || ''} ${selectedBus.vehicleColor || ''}`} />}
              <DetailRow icon={<MapPin size={18} className="text-purple-600" />} label="GPS" value={busPositions.has(selectedBus.id) ? 'Actif' : 'Inactif'} />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowDetail(false); }} className="flex-1 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg text-sm">
                Fermer
              </button>
              <button onClick={() => handleDelete(selectedBus.id)} className="flex-1 py-2 bg-red-100 text-red-700 font-medium rounded-lg text-sm">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}

function StatCard({ icon, label, value, bg }: { icon: React.ReactNode; label: string; value: string; bg: string }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>{icon}</div>
        <div>
          <p className="text-xs text-slate-500">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">{icon}</div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
