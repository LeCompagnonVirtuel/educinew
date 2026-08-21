'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { useLanguage } from '@/hooks/useLanguage';
import { getSupabase } from '@/lib/api/shared';
import {
  Bus, Navigation, Users, Route, MapPin, Bell,
  AlertTriangle, Loader2,
} from 'lucide-react';

export default function DriverDashboardPage() {
  const { user } = useAuth();
  const { school } = useSchool();
  const { lang } = useLanguage();
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user?.schoolId) { setLoading(false); return; }
      try {
        const supabase = getSupabase();
        const { data } = await supabase
          .from('buses')
          .select('id, route, plate_number, capacity, is_active, driver_name')
          .eq('school_id', user!.schoolId)
          .eq('is_active', true)
          .order('created_at', { ascending: false });
        setRoutes(data || []);
      } catch (err) {
      }
      setLoading(false);
    }
    load();
  }, [user?.schoolId]);

  const completedRoutes = routes.filter(r => !r.is_active).length;
  const inProgressRoutes = routes.filter(r => r.is_active).length;
  const totalStudents = routes.reduce((sum, r) => sum + (r.capacity || 0), 0);

  return (
    <RoleLayout role="chauffeur">
      {loading ? (
        <div className="text-center py-12"><Loader2 size={32} className="animate-spin mx-auto text-slate-400" /></div>
      ) : (
        <>
          <div className="mb-8">
            <span className="text-xs font-bold text-[var(--color-primary,#4F46E5)] uppercase tracking-widest">{lang === 'fr' ? 'Chauffeur' : 'Driver'}</span>
            <h1 className="text-3xl font-bold text-[#111827] mt-1">
              {lang === 'fr' ? 'Bonjour' : 'Hello'}, {user?.name?.split(' ')[0] || 'Chauffeur'}
            </h1>
            <p className="text-[#6B7280] mt-1">
              {school?.name || 'EduCI'}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { title: lang === 'fr' ? 'Trajets' : 'Routes', value: String(routes.length), icon: Route, color: 'bg-emerald-50 text-emerald-600' },
              { title: lang === 'fr' ? 'Terminés' : 'Completed', value: String(completedRoutes), icon: Bus, color: 'bg-blue-50 text-blue-600' },
              { title: lang === 'fr' ? 'En cours' : 'In Progress', value: String(inProgressRoutes), icon: Navigation, color: 'bg-amber-50 text-amber-600' },
              { title: lang === 'fr' ? 'Élèves' : 'Students', value: String(totalStudents), icon: Users, color: 'bg-purple-50 text-purple-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl shadow-[0_4px_6px_rgba(0,0,0,0.04)]">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color} mb-3`}>
                  <stat.icon size={20} />
                </div>
                <p className="text-xs text-[#6B7280]">{stat.title}</p>
                <p className="text-2xl font-bold text-[#111827]">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Routes */}
          <div className="bg-white rounded-2xl shadow-[0_4px_6px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="p-6 border-b border-[#c7c4d8]/10">
              <h3 className="font-bold text-[#111827]">{lang === 'fr' ? 'Trajets' : 'Routes'}</h3>
            </div>
            {routes.length > 0 ? (
              <div className="divide-y divide-[#c7c4d8]/10">
                {routes.map((route) => (
                  <div key={route.id} className="p-5 flex items-center justify-between hover:bg-[#f8f9fa] cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50">
                        <Bus size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#111827]">{route.route || route.plate_number || 'Bus'}</p>
                        <p className="text-xs text-[#6B7280]">{route.capacity || 0} places • {route.driver_name || 'Non assigné'}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                      Actif
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-sm">{lang === 'fr' ? 'Aucun trajet configuré' : 'No routes configured'}</div>
            )}
          </div>
        </>
      )}
    </RoleLayout>
  );
}
