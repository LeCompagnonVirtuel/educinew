'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbTeachers, sbTeacherCheckin } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import {
  CheckCircle, XCircle, Users, Calendar, Download,
  UserCheck, UserX, Clock, Search, Filter, QrCode,
  MapPin, Wifi, WifiOff, AlertTriangle, TrendingUp, TrendingDown,
  Camera, Key, LogIn, LogOut, CalendarDays, FileText,
  X, Save, RefreshCw, Bell, Settings
} from 'lucide-react';

interface CheckinRecord {
  id: string;
  teacherId: string;
  teacherName: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: 'PRESENT' | 'LATE' | 'ABSENT';
  lateMinutes?: number;
  method?: 'GPS' | 'QR' | 'MANUAL';
}

interface TeacherStats {
  total: number;
  present: number;
  absent: number;
  late: number;
  onTime: number;
}

export default function CheckinPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  
  const [records, setRecords] = useState<CheckinRecord[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'today' | 'history' | 'stats'>('today');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [search, setSearch] = useState('');
  const [showManualCheckin, setShowManualCheckin] = useState(false);
  const [manualTeacherId, setManualTeacherId] = useState('');
  
  const [toast, setToast] = useState<{msg: string; type: string} | null>(null);
  const showToast = (msg: string, type: string = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    loadData();
  }, [selectedDate, user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [teachersData, checkinData] = await Promise.all([
        sbTeachers.list(user?.schoolId),
        sbTeacherCheckin.getRecords({ date: selectedDate }),
      ]);
      setTeachers(teachersData || []);
      setRecords(checkinData || []);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const stats: TeacherStats = {
    total: teachers.length,
    present: records.filter(r => r.status === 'PRESENT').length,
    absent: teachers.length - records.filter(r => r.status).length,
    late: records.filter(r => r.status === 'LATE').length,
    onTime: records.filter(r => r.status === 'PRESENT' && !r.lateMinutes).length,
  };

  const getTeacherStatus = (teacherId: string) => {
    return records.find(r => r.teacherId === teacherId);
  };

  const handleManualCheckin = async (teacherId: string, type: 'in' | 'out') => {
    try {
      if (type === 'in') {
        await sbTeacherCheckin.checkinGPS(teacherId, 0, 0);
      } else {
        await sbTeacherCheckin.checkout(teacherId);
      }
      showToast(`${type === 'in' ? 'Arrivée' : 'Départ'} enregistré`);
      loadData();
    } catch (err: any) {
      showToast(err.message || 'Erreur', 'error');
    }
  };

  const filteredTeachers = teachers.filter(t => {
    if (search && !t.user?.name?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const statusConfig = {
    PRESENT: { color: 'text-emerald-600 bg-emerald-50', icon: UserCheck, label: 'Présent' },
    LATE: { color: 'text-amber-600 bg-amber-50', icon: Clock, label: 'Retard' },
    ABSENT: { color: 'text-red-600 bg-red-50', icon: UserX, label: 'Absent' },
  };

  return (
    <RoleLayout role="admin">
      {toast && (
        <div className={cn('fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold', toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white')}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pointage du personnel</h1>
          <p className="text-slate-500 mt-1">Suivi des présences enseignantes</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2.5 bg-white rounded-xl border border-slate-200 text-sm"
          />
          <button
            onClick={loadData}
            className="p-2.5 bg-white rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            <RefreshCw size={18} />
          </button>
          {isAdmin && (
            <button
              onClick={() => setShowManualCheckin(true)}
              className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-indigo-700"
            >
              <Key size={16} />
              Pointer manuellement
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6">
        {[
          { key: 'today', label: "Aujourd'hui", icon: Calendar },
          { key: 'history', label: 'Historique', icon: FileText },
          { key: 'stats', label: 'Statistiques', icon: TrendingUp },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setView(tab.key as any)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2',
              view === tab.key ? 'bg-indigo-100 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'
            )}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      {view === 'today' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-5 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <Users size={16} />
                <span className="text-xs">Total</span>
              </div>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-600 mb-2">
                <UserCheck size={16} />
                <span className="text-xs">Présents</span>
              </div>
              <p className="text-2xl font-bold text-emerald-600">{stats.present}</p>
            </div>
            <div className="bg-amber-50 p-5 rounded-xl border border-amber-100">
              <div className="flex items-center gap-2 text-amber-600 mb-2">
                <Clock size={16} />
                <span className="text-xs">Retards</span>
              </div>
              <p className="text-2xl font-bold text-amber-600">{stats.late}</p>
            </div>
            <div className="bg-red-50 p-5 rounded-xl border border-red-100">
              <div className="flex items-center gap-2 text-red-600 mb-2">
                <UserX size={16} />
                <span className="text-xs">Absents</span>
              </div>
              <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
            </div>
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <CalendarDays size={16} />
                <span className="text-xs">Taux</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0}%
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="mb-4">
            <div className="relative max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un enseignant..."
                className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-slate-200 text-sm"
              />
            </div>
          </div>

          {/* Teachers List */}
          <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">Enseignant</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">Arrivée</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">Départ</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">Méthode</th>
                  {isAdmin && <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan={6} className="text-center py-12 text-slate-400">Chargement...</td></tr>
                ) : filteredTeachers.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-12 text-slate-400">Aucun enseignant</td></tr>
                ) : (
                  filteredTeachers.map(teacher => {
                    const record = getTeacherStatus(teacher.id);
                    const icon = record ? statusConfig[record.status].icon : Clock;
                    const config = record ? statusConfig[record.status] : statusConfig.ABSENT;
                    
                    return (
                      <tr key={teacher.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600">
                              {teacher.user?.name?.charAt(0) || 'N'}
                            </div>
                            <div>
                              <p className="font-medium">{teacher.user?.name}</p>
                              <p className="text-xs text-slate-500">{teacher.subject?.name || 'Enseignant'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {record?.checkInTime ? record.checkInTime : '-'}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {record?.checkOutTime ? record.checkOutTime : '-'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn('px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit', config.color)}>
                            <config.icon size={12} />
                            {config.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {record?.method || '-'}
                        </td>
                        {isAdmin && (
                          <td className="px-6 py-4 text-right">
                            {!record?.checkInTime ? (
                              <button
                                onClick={() => handleManualCheckin(teacher.id, 'in')}
                                className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs rounded-lg hover:bg-emerald-200"
                              >
                                <LogIn size={14} className="inline mr-1" /> Pointer
                              </button>
                            ) : !record?.checkOutTime ? (
                              <button
                                onClick={() => handleManualCheckin(teacher.id, 'out')}
                                className="px-3 py-1.5 bg-red-100 text-red-700 text-xs rounded-lg hover:bg-red-200"
                              >
                                <LogOut size={14} className="inline mr-1" /> Départ
                              </button>
                            ) : null}
                          </td>
                        )}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            </div>
          </div>
        </>
      )}

      {/* History View */}
      {view === 'history' && (
        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <div className="text-center py-12">
            <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">Historique des pointages</p>
            <p className="text-xs text-slate-400 mt-2">Sélectionnez une date pour voir l'historique</p>
          </div>
        </div>
      )}

      {/* Stats View */}
      {view === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-100 p-6">
            <h3 className="font-semibold mb-4">Taux de présence</h3>
            <div className="text-4xl font-bold text-emerald-600 mb-2">
              {stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0}%
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full" style={{ width: `${stats.total > 0 ? (stats.present / stats.total) * 100 : 0}%` }} />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-6">
            <h3 className="font-semibold mb-4">Ponctualité</h3>
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {stats.present > 0 ? Math.round((stats.onTime / stats.present) * 100) : 0}%
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full" style={{ width: `${stats.present > 0 ? (stats.onTime / stats.present) * 100 : 0}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Manual Checkin Modal */}
      {showManualCheckin && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowManualCheckin(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Pointer un enseignant</h3>
              <button onClick={() => setShowManualCheckin(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Enseignant</label>
                <select
                  value={manualTeacherId}
                  onChange={(e) => setManualTeacherId(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm"
                >
                  <option value="">Sélectionner...</option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.user?.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowManualCheckin(false)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">
                Annuler
              </button>
              <button
                onClick={() => {
                  if (manualTeacherId) {
                    handleManualCheckin(manualTeacherId, 'in');
                    setShowManualCheckin(false);
                    setManualTeacherId('');
                  }
                }}
                disabled={!manualTeacherId}
                className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50"
              >
                <LogIn size={16} className="inline mr-2" /> Pointer arrivée
              </button>
            </div>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}