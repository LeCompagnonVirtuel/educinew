'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import RoleLayout from '@/components/layout/RoleLayout';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { useRealtimeSubscription } from '@/hooks/useRealtime';
import { getSupabase } from '@/lib/api/shared';
import { Bus, Clock, MapPin, Bell, Phone, Navigation, Users, CheckCircle, Loader2 } from 'lucide-react';

const TransportMap = dynamic(() => import('@/components/map/TransportMap'), { ssr: false });

interface ChildBusData {
  childName: string;
  childClass: string;
  busId: string;
  plateNumber: string;
  driverName: string;
  driverPhone: string;
  route: string;
  isActive: boolean;
  stopName: string;
  stopLat: number;
  stopLng: number;
  busLat: number;
  busLng: number;
  busSpeed: number;
  tripStatus: string;
  studentsOnBoard: number;
  totalStudents: number;
}

export default function ParentTransportPage() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [busData, setBusData] = useState<ChildBusData | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  const fr = lang === 'fr';

  const loadData = useCallback(async () => {
    if (!user?.id) return;
    const supabase = getSupabase();

    try {
      // Find student linked to this parent
      const { data: student } = await supabase
        .from('students')
        .select('id, user:users!students_user_id_fkey(name), class:classes(name)')
        .eq('parent_id', user.id)
        .limit(1)
        .single();

      if (!student) {
        setLoading(false);
        return;
      }

      // Find bus assignment for this student
      const { data: assignment } = await supabase
        .from('bus_students')
        .select('bus_id, stop_name, stop_latitude, stop_longitude')
        .eq('student_id', student.id)
        .eq('is_active', true)
        .single();

      if (!assignment) {
        setLoading(false);
        return;
      }

      // Get bus info
      const { data: bus } = await supabase
        .from('buses')
        .select('id, plate_number, driver_name, route, is_active, driver:users!buses_driver_id_fkey(phone)')
        .eq('id', assignment.bus_id)
        .single();

      if (!bus) {
        setLoading(false);
        return;
      }

      // Get latest GPS position
      const { data: gps } = await supabase
        .from('bus_tracking')
        .select('latitude, longitude, speed_kmh')
        .eq('bus_id', assignment.bus_id)
        .order('timestamp', { ascending: false })
        .limit(1)
        .single();

      // Get active trip
      const { data: trip } = await supabase
        .from('trips')
        .select('status, students_picked_up, total_students')
        .eq('bus_id', assignment.bus_id)
        .eq('status', 'IN_PROGRESS')
        .limit(1)
        .single();

      // Get transport notifications
      const { data: notifs } = await supabase
        .from('notifications')
        .select('id, title, body, is_read, created_at')
        .eq('user_id', user.id)
        .eq('type', 'TRANSPORT')
        .order('created_at', { ascending: false })
        .limit(10);

      setBusData({
        childName: (student as any)?.user?.name || fr ? 'Mon enfant' : 'My child',
        childClass: (student as any)?.class?.name || '',
        busId: bus.id,
        plateNumber: bus.plate_number || '—',
        driverName: bus.driver_name || '—',
        driverPhone: (bus as any)?.driver?.phone || '',
        route: bus.route || '—',
        isActive: bus.is_active,
        stopName: assignment.stop_name || '',
        stopLat: assignment.stop_latitude || 5.35,
        stopLng: assignment.stop_longitude || -4.01,
        busLat: gps?.latitude || 5.36,
        busLng: gps?.longitude || -4.0083,
        busSpeed: gps?.speed_kmh || 0,
        tripStatus: trip?.status || 'SCHEDULED',
        studentsOnBoard: trip?.students_picked_up || 0,
        totalStudents: trip?.total_students || 0,
      });

      setNotifications((notifs || []).map((n: any) => ({
        id: n.id,
        text: n.body || n.title,
        time: new Date(n.created_at).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }),
        read: n.is_read,
      })));
    } catch (err) {
      console.error('[ParentTransport] Load error:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.id, fr]);

  useEffect(() => { loadData(); }, [loadData]);

  // Realtime GPS updates
  useRealtimeSubscription([
    { table: 'bus_tracking', event: 'INSERT', onData: (payload: any) => {
      if (busData && payload.new?.bus_id === busData.busId) {
        setBusData(prev => prev ? {
          ...prev,
          busLat: payload.new.latitude,
          busLng: payload.new.longitude,
          busSpeed: payload.new.speed_kmh || 0,
        } : prev);
      }
    }},
    { table: 'trips', event: 'UPDATE', onData: () => { loadData(); }},
  ]);

  // Auto-refresh every 30s
  useEffect(() => {
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [loadData]);

  if (loading) {
    return (
      <RoleLayout role="parent">
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 size={32} className="animate-spin text-indigo-600" />
        </div>
      </RoleLayout>
    );
  }

  if (!busData) {
    return (
      <RoleLayout role="parent">
        <div className="text-center py-16">
          <Bus size={48} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">{fr ? 'Aucun transport assigné' : 'No transport assigned'}</h2>
          <p className="text-slate-500">{fr ? 'Votre enfant n\'est pas encore assigné à un bus scolaire.' : 'Your child is not yet assigned to a school bus.'}</p>
        </div>
      </RoleLayout>
    );
  }

  const markers = [
    { id: 'bus', type: 'bus' as const, lat: busData.busLat, lng: busData.busLng, name: busData.plateNumber, info: busData.route, driver: busData.driverName, eta: busData.tripStatus === 'IN_PROGRESS' ? `${busData.studentsOnBoard}/${busData.totalStudents}` : fr ? 'À l\'arrêt' : 'Stopped' },
    { id: 'stop', type: 'stop' as const, lat: busData.stopLat, lng: busData.stopLng, name: busData.stopName || (fr ? 'Arrêt' : 'Stop') },
  ];

  return (
    <RoleLayout role="parent">
      <div className="space-y-6">
        {/* Child Info Card */}
        <div className="bg-gradient-to-r from-[#3525cd] to-[#4f46e5] rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">{busData.childName}</h2>
              <p className="text-indigo-200 text-sm">{busData.childClass}</p>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <span className="text-sm font-bold">
                {busData.tripStatus === 'IN_PROGRESS' ? fr ? 'En route' : 'On route' : fr ? 'À l\'arrêt' : 'Stopped'}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
              <Bus size={16} />
              <span className="text-sm font-semibold">{busData.plateNumber}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
              <Navigation size={16} />
              <span className="text-sm font-semibold">{busData.driverName}</span>
            </div>
            {busData.driverPhone && (
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                <Phone size={16} />
                <span className="text-sm font-semibold">{busData.driverPhone}</span>
              </div>
            )}
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
              <Users size={16} />
              <span className="text-sm font-semibold">{busData.studentsOnBoard}/{busData.totalStudents}</span>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-[#191c1d] flex items-center gap-2">
              <MapPin size={18} className="text-[#3525cd]" />
              {fr ? 'Suivi en temps réel' : 'Real-time tracking'}
            </h3>
            <div className="flex items-center gap-2">
              {busData.tripStatus === 'IN_PROGRESS' ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold text-green-600">{fr ? 'En direct' : 'Live'}</span>
                </>
              ) : (
                <span className="text-xs font-bold text-slate-400">{fr ? 'Hors ligne' : 'Offline'}</span>
              )}
            </div>
          </div>
          <TransportMap
            markers={markers}
            center={[busData.busLat, busData.busLng]}
            zoom={15}
            height="400px"
          />
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-[#191c1d] flex items-center gap-2 mb-4">
            <Bell size={18} className="text-[#3525cd]" />
            {fr ? 'Notifications transport' : 'Transport notifications'}
          </h3>
          {notifications.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">{fr ? 'Aucune notification' : 'No notifications'}</p>
          ) : (
            <div className="space-y-3">
              {notifications.map(notif => (
                <div key={notif.id} className={`flex items-start gap-3 p-3 rounded-xl ${notif.read ? 'bg-slate-50' : 'bg-blue-50'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${notif.read ? 'bg-slate-200' : 'bg-blue-100'}`}>
                    <Bus size={16} className={notif.read ? 'text-slate-500' : 'text-blue-600'} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${notif.read ? 'text-[#464555]' : 'text-[#191c1d] font-medium'}`}>{notif.text}</p>
                    <p className="text-xs text-[#6B7280] mt-1">{notif.time}</p>
                  </div>
                  {!notif.read && <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Route Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-[#191c1d] mb-3">{fr ? 'Itinéraire du bus' : 'Bus route'}</h3>
          <p className="text-sm text-slate-500 mb-4">{busData.route}</p>
          {busData.stopName && (
            <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <MapPin size={16} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-indigo-900">{fr ? 'Votre arrêt' : 'Your stop'}</p>
                <p className="text-xs text-indigo-600">{busData.stopName}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </RoleLayout>
  );
}
