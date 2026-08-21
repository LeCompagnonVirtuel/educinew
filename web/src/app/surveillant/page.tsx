'use client';

import React, { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { useRealtimeSubscription } from '@/hooks/useRealtime';
import { sbSurveillance } from '@/lib/api/domains/surveillance.service';
import { sbStaffAttendance } from '@/lib/api/domains/staff-attendance.service';
import { sbVisitors } from '@/lib/api/domains/visitors.service';
import {
  LayoutDashboard, ClipboardCheck, Users, QrCode, MapPin,
  Clock, UserCheck, UserX, AlertTriangle, Loader2, Bell, MessageSquare,
} from 'lucide-react';

export default function SurveillantDashboard() {
  const { user } = useAuth();
  const { school } = useSchool();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [myRecord, setMyRecord] = useState<any>(null);
  const [activeVisitors, setActiveVisitors] = useState<any[]>([]);
  const [recentScans, setRecentScans] = useState<any[]>([]);

  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    try {
      const [todayStats, myToday, visitors] = await Promise.all([
        sbSurveillance.getTodayStats(),
        sbStaffAttendance.getMyTodayRecord(),
        sbVisitors.getActive(),
      ]);
      setStats(todayStats);
      setMyRecord(myToday);
      setActiveVisitors(visitors);
    } catch (err) {
      // Error handled by catch block
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  useRealtimeSubscription([
    { table: 'staff_attendance', event: '*', onData: () => loadData() },
    { table: 'visitors', event: '*', onData: () => loadData() },
    { table: 'attendance', event: 'INSERT', onData: () => loadData() },
  ]);

  const handleMyCheckIn = async () => {
    try {
      await sbStaffAttendance.checkIn(myRecord?.staff_id || '', 'MANUAL');
      loadData();
    } catch (err: any) {
      showToast(err.message);
    }
  };

  const handleMyCheckOut = async () => {
    try {
      await sbStaffAttendance.checkOut(myRecord?.staff_id || '');
      loadData();
    } catch (err: any) {
      showToast(err.message);
    }
  };

  if (loading) {
    return (
      <RoleLayout role="surveillant" breadcrumbs={[{ label: 'Tableau de bord' }]}>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </RoleLayout>
    );
  }

  return (
    <RoleLayout role="surveillant" breadcrumbs={[{ label: 'Tableau de bord' }]}>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {toast.msg}
        </div>
      )}

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-on-surface">Tableau de bord Surveillant</h1>
            <p className="text-on-surface-variant">
              {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-on-surface-variant">Bienvenue</p>
            <p className="font-semibold text-on-surface">{user?.name}</p>
          </div>
        </div>

        {/* My Attendance Card */}
        <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                myRecord?.status === 'PRESENT' ? 'bg-green-100 text-green-600' :
                myRecord?.status === 'LATE' ? 'bg-orange-100 text-orange-600' :
                'bg-red-100 text-red-600'
              }`}>
                <UserCheck size={24} />
              </div>
              <div>
                <p className="text-sm text-on-surface-variant">Mon pointage aujourd'hui</p>
                <p className="text-lg font-bold text-on-surface">
                  {myRecord?.status === 'PRESENT' ? 'Présent' :
                   myRecord?.status === 'LATE' ? 'En retard' :
                   myRecord?.status === 'DEPARTED' ? 'Service terminé' :
                   'Non pointé'}
                </p>
                {myRecord?.check_in_time && (
                  <p className="text-xs text-on-surface-variant">
                    Arrivée: {new Date(myRecord.check_in_time).toLocaleTimeString('fr-FR')}
                    {myRecord?.check_out_time && ` — Départ: ${new Date(myRecord.check_out_time).toLocaleTimeString('fr-FR')}`}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {!myRecord?.check_in_time ? (
                <button onClick={handleMyCheckIn}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                  Pointer mon arrivée
                </button>
              ) : !myRecord?.check_out_time ? (
                <button onClick={handleMyCheckOut}
                  className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors text-sm font-medium">
                  Pointer mon départ
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={<Users size={20} />} label="Élèves présents"
            value={stats?.students?.present || 0} total={stats?.students?.total || 0}
            color="bg-blue-100 text-blue-600" />
          <StatCard icon={<ClipboardCheck size={20} />} label="Personnel présent"
            value={stats?.staff?.present || 0} total={stats?.staff?.total || 0}
            color="bg-green-100 text-green-600" />
          <StatCard icon={<UserX size={20} />} label="Absents"
            value={(stats?.students?.absent || 0) + (stats?.staff?.absent || 0)}
            color="bg-red-100 text-red-600" />
          <StatCard icon={<Users size={20} />} label="Visiteurs actifs"
            value={stats?.visitors?.inside || 0}
            color="bg-purple-100 text-purple-600" />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <QuickAction icon={<QrCode size={24} />} label="Scanner QR Élève"
            href="/surveillant/pointage-eleves" color="bg-blue-500" />
          <QuickAction icon={<ClipboardCheck size={24} />} label="Pointage Personnel"
            href="/staff-checkin" color="bg-green-500" />
          <QuickAction icon={<Users size={24} />} label="Visiteurs"
            href="/surveillant/visiteurs" color="bg-purple-500" />
        </div>

        {/* Active Visitors */}
        {activeVisitors.length > 0 && (
          <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/20">
            <h3 className="font-semibold text-on-surface mb-4">Visiteurs actuellement dans l'établissement</h3>
            <div className="space-y-2">
              {activeVisitors.slice(0, 5).map((v: any) => (
                <div key={v.id} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                  <div>
                    <p className="font-medium text-on-surface">{v.visitorName}</p>
                    <p className="text-xs text-on-surface-variant">
                      {v.purpose} — {v.personToVisit}
                    </p>
                  </div>
                  <span className="text-xs text-on-surface-variant">
                    {new Date(v.entryTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </RoleLayout>
  );
}

function StatCard({ icon, label, value, total, color }: {
  icon: React.ReactNode; label: string; value: number; total?: number; color: string;
}) {
  return (
    <div className="bg-surface-container rounded-xl p-4 border border-outline-variant/20">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}>{icon}</div>
      <p className="text-2xl font-bold text-on-surface">{value}{total !== undefined ? `/${total}` : ''}</p>
      <p className="text-xs text-on-surface-variant mt-1">{label}</p>
    </div>
  );
}

function QuickAction({ icon, label, href, color }: {
  icon: React.ReactNode; label: string; href: string; color: string;
}) {
  return (
    <a href={href}
      className="bg-surface-container rounded-xl p-6 border border-outline-variant/20 hover:shadow-lg transition-all cursor-pointer group">
      <div className={`w-12 h-12 rounded-xl ${color} text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <p className="font-medium text-on-surface">{label}</p>
    </a>
  );
}
