'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbParent, sbAttendance } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useRealtimeAttendance } from '@/hooks/useRealtime';
import {
  ChevronRight, Check, X, AlertTriangle, Clock,
  Calendar, Loader2, Users,
} from 'lucide-react';

export default function ParentAttendancePage() {
  const { user } = useAuth();
  useRealtimeAttendance((event) => {
    if (event.user_id === selectedChildId) {
      setAttendance((prev) => [event, ...prev]);
    }
  });
  const [children, setChildren] = useState<any[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<any | null>(null);

  useEffect(() => {
    async function loadChildren() {
      if (!user?.id) return;
      try {
        const kids = await sbParent.getChildren(user.id);
        const kidsArray = Array.isArray(kids) ? kids : [];
        setChildren(kidsArray);
        if (kidsArray.length > 0) {
          setSelectedChildId(kidsArray[0].id || kidsArray[0].studentId);
        }
      } catch {
        setChildren([]);
      }
    }
    loadChildren();
  }, [user?.id]);

  useEffect(() => {
    async function loadAttendance() {
      if (!selectedChildId) { setLoading(false); return; }
      setLoading(true);
      try {
        const data = await sbAttendance.list({ studentId: selectedChildId });
        setAttendance(Array.isArray(data) ? data : []);
      } catch {
        setAttendance([]);
      } finally {
        setLoading(false);
      }
    }
    loadAttendance();
  }, [selectedChildId]);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const monthName = now.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  const monthAttendance = attendance.filter((a: any) => {
    const d = new Date(a.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const presentDays = monthAttendance.filter((a: any) => a.status === 'PRESENT').length;
  const absentDays = monthAttendance.filter((a: any) => a.status === 'ABSENT').length;
  const lateDays = monthAttendance.filter((a: any) => a.status === 'LATE').length;
  const totalDays = monthAttendance.length;
  const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const offset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  const dayMap: Record<string, any> = {};
  monthAttendance.forEach((a: any) => {
    const d = new Date(a.date).getDate();
    dayMap[d] = a;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PRESENT': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'ABSENT': return 'bg-red-100 text-red-700 border-red-200';
      case 'LATE': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-50 text-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PRESENT': return <Check size={14} />;
      case 'ABSENT': return <X size={14} />;
      case 'LATE': return <AlertTriangle size={14} />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PRESENT': return 'Présent';
      case 'ABSENT': return 'Absent';
      case 'LATE': return 'Retard';
      default: return status;
    }
  };

  const weekdays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < offset; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);
  while (calendarDays.length % 7 !== 0) calendarDays.push(null);

  const selectedChild = children.find(c => (c.id || c.studentId) === selectedChildId);
  const childName = selectedChild?.name || selectedChild?.user?.name || 'Mon enfant';

  return (
    <RoleLayout role="parent">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#191c1d]">Présences</h1>
        <p className="text-[#464555] mt-1">Suivi des présences de {childName}</p>
      </div>

      {/* Child selector */}
      {children.length > 1 && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {children.map((child: any) => {
            const cid = child.id || child.studentId;
            return (
              <button
                key={cid}
                onClick={() => setSelectedChildId(cid)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${cid === selectedChildId ? 'bg-[#3525cd] text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200'}`}
              >
                <Users size={16} /> {child.name || child.user?.name}
              </button>
            );
          })}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12"><Loader2 size={32} className="animate-spin mx-auto text-slate-400" /></div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white">
              <p className="text-xs text-emerald-100 font-medium">Taux de présence</p>
              <p className="text-3xl font-bold mt-1">{attendanceRate}%</p>
              <div className="mt-2 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${attendanceRate}%` }} />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center"><X size={16} className="text-red-600" /></div>
                <p className="text-xs text-[#464555] font-medium">Absences</p>
              </div>
              <p className="text-2xl font-bold text-red-600 mt-2">{absentDays}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center"><Clock size={16} className="text-amber-600" /></div>
                <p className="text-xs text-[#464555] font-medium">Retards</p>
              </div>
              <p className="text-2xl font-bold text-amber-600 mt-2">{lateDays}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-[#3525cd]" />
                  <h3 className="text-lg font-bold text-[#191c1d] capitalize">{monthName}</h3>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-400" />Présent</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400" />Absent</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400" />Retard</span>
                </div>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {weekdays.map(d => <div key={d} className="text-center text-xs font-bold text-[#464555] py-2">{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, i) => {
                    const dayData = day ? dayMap[day] : null;
                    return (
                      <button
                        key={i}
                        onClick={() => day && dayData && setSelectedDay(dayData)}
                        disabled={!day || !dayData}
                        className={`aspect-square rounded-xl flex items-center justify-center text-sm font-semibold transition-all ${
                          !day ? '' :
                          dayData ? `${getStatusColor(dayData.status)} border cursor-pointer hover:scale-105 ${selectedDay?.id === dayData.id ? 'ring-2 ring-[#3525cd] ring-offset-2' : ''}` :
                          'bg-slate-50 text-slate-400'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Day detail */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <h3 className="text-lg font-bold text-[#191c1d] mb-4">Détail du jour</h3>
              {selectedDay ? (
                <div className="space-y-4">
                  <div className="text-center p-4 bg-[#f8f9fa] rounded-xl">
                    <p className="text-3xl font-bold text-[#191c1d]">{new Date(selectedDay.date).getDate()}</p>
                    <p className="text-sm text-[#464555] capitalize">{new Date(selectedDay.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div className={`flex items-center gap-3 p-4 rounded-xl border ${getStatusColor(selectedDay.status)}`}>
                    {getStatusIcon(selectedDay.status)}
                    <div>
                      <p className="font-bold">{getStatusLabel(selectedDay.status)}</p>
                      {selectedDay.remark && <p className="text-xs mt-1 opacity-80">{selectedDay.remark}</p>}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-[#464555]">
                  <Calendar size={40} className="text-slate-300 mb-3" />
                  <p className="text-sm font-medium">Sélectionnez un jour</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </RoleLayout>
  );
}
