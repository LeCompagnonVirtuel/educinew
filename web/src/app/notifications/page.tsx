'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbNotifications } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { formatDate, cn } from '@/lib/utils';
import {
  Bell, Check, CheckCheck, CreditCard, BookOpen, Bus,
  MessageSquare, Megaphone, Info, AlertTriangle,
  Search, Filter, Settings, Trash2, Mail, Smartphone,
  Clock, Sparkles, X, Save, Volume2, VolumeX
} from 'lucide-react';

interface NotificationSettings {
  payment: boolean;
  grade: boolean;
  attendance: boolean;
  transport: boolean;
  message: boolean;
  announcement: boolean;
  email: boolean;
  push: boolean;
}

export default function NotificationsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'settings'>('list');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [settings, setSettings] = useState<NotificationSettings>({
    payment: true,
    grade: true,
    attendance: true,
    transport: true,
    message: true,
    announcement: true,
    email: true,
    push: true,
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Load notification preferences from localStorage on mount
  useEffect(() => {
    if (!user?.id) return;
    const storageKey = `notification_preferences_${user.id}`;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<NotificationSettings>;
        setSettings(prev => ({ ...prev, ...parsed }));
      }
    } catch {
      // Ignore parse errors, use defaults
    }
  }, [user?.id]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const data = await sbNotifications.list();
      setNotifications(data || []);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const typeConfig: Record<string, { icon: any; color: string; bg: string; label: string }> = {
    PAYMENT: { icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Paiement' },
    GRADE: { icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Note' },
    ATTENDANCE: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', label: 'Absence' },
    TRANSPORT: { icon: Bus, color: 'text-amber-600', bg: 'bg-amber-50', label: 'Transport' },
    MESSAGE: { icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50', label: 'Message' },
    ANNOUNCEMENT: { icon: Megaphone, color: 'text-cyan-600', bg: 'bg-cyan-50', label: 'Annonce' },
    SYSTEM: { icon: Info, color: 'text-slate-600', bg: 'bg-slate-50', label: 'Système' },
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;
  const unreadPayment = notifications.filter(n => !n.is_read && n.type === 'PAYMENT').length;
  const unreadGrades = notifications.filter(n => !n.is_read && n.type === 'GRADE').length;

  const filteredNotifications = notifications.filter(n => {
    if (search && !n.title?.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter && n.type !== typeFilter) return false;
    if (statusFilter === 'READ' && !n.is_read) return false;
    if (statusFilter === 'UNREAD' && n.is_read) return false;
    return true;
  });

  const markAsRead = async (id: string) => {
    try {
      await sbNotifications.markRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (err) {
    }
  };

  const markAllAsRead = async () => {
    try {
      await sbNotifications.markAllRead();
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch (err) {
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();
      await supabase.from('notifications').delete().eq('id', id);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) {
    }
  };

  const saveSettings = () => {
    if (!user?.id) return;
    const storageKey = `notification_preferences_${user.id}`;
    try {
      localStorage.setItem(storageKey, JSON.stringify(settings));
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 2000);
    } catch {
      // localStorage may be unavailable in some contexts
    }
  };

  return (
    <RoleLayout role={(user?.role?.toLowerCase() as any) || 'admin'}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} non lue(s)` : 'Tout lu'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView('settings')}
            className={cn('px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2', view === 'settings' ? 'bg-indigo-100 text-indigo-600' : 'text-slate-600 hover:bg-slate-50')}
          >
            <Settings size={16} />
            Paramètres
          </button>
          {unreadCount > 0 && view === 'list' && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-emerald-700"
            >
              <CheckCheck size={18} />
              Tout marquer lu
            </button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      {view === 'list' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-indigo-600" />
              <span className="text-xs text-slate-500">Total</span>
            </div>
            <p className="text-xl font-bold mt-1">{notifications.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-emerald-600" />
              <span className="text-xs text-slate-500">Non lues</span>
            </div>
            <p className="text-xl font-bold mt-1">{unreadCount}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2">
              <CreditCard size={16} className="text-emerald-600" />
              <span className="text-xs text-slate-500">Paiements</span>
            </div>
            <p className="text-xl font-bold mt-1">{unreadPayment}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-blue-600" />
              <span className="text-xs text-slate-500">Notes</span>
            </div>
            <p className="text-xl font-bold mt-1">{unreadGrades}</p>
          </div>
        </div>
      )}

      {view === 'list' && (
        <>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-slate-200 text-sm"
                />
              </div>
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm"
            >
              <option value="">Tous les types</option>
              {Object.entries(typeConfig).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm"
            >
              <option value="">Tous les statuts</option>
              <option value="READ">Lues</option>
              <option value="UNREAD">Non lues</option>
            </select>
          </div>

          {/* Notifications List */}
          <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-slate-400">Chargement...</div>
            ) : filteredNotifications.length === 0 ? (
              <div className="p-12 text-center">
                <Bell size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500">Aucune notification</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {filteredNotifications.map((notif) => {
                  const config = typeConfig[notif.type] || typeConfig.SYSTEM;
                  const Icon = config.icon;
                  return (
                    <div
                      key={notif.id}
                      className={cn(
                        'px-6 py-4 flex items-start gap-4 hover:bg-slate-50 transition-colors',
                        !notif.is_read && 'bg-emerald-30'
                      )}
                    >
                      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', config.bg, config.color)}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className={cn('font-semibold text-slate-900', !notif.is_read && 'text-emerald-700')}>
                              {notif.title}
                            </h4>
                            <p className="text-sm text-slate-500 mt-1">{notif.body}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className={cn('px-2 py-0.5 rounded text-xs font-medium', config.bg, config.color)}>
                                {config.label}
                              </span>
                              <span className="text-xs text-slate-400">
                                {formatDate(notif.created_at)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {!notif.is_read && (
                              <button
                                onClick={() => markAsRead(notif.id)}
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                                title="Marquer comme lu"
                              >
                                <Check size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notif.id)}
                              className="p-2 text-red-400 hover:bg-red-50 rounded-lg"
                              title="Supprimer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {/* Settings View */}
      {view === 'settings' && (
        <div className="max-w-2xl">
          <div className="bg-white rounded-xl border border-slate-100 p-6">
            <h2 className="text-lg font-bold mb-6">Paramètres de notifications</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Types de notifications</h3>
                <div className="space-y-3">
                  {[
                    { key: 'payment', label: 'Paiements', icon: CreditCard },
                    { key: 'grade', label: 'Notes', icon: BookOpen },
                    { key: 'attendance', label: 'Absences', icon: AlertTriangle },
                    { key: 'transport', label: 'Transport', icon: Bus },
                    { key: 'message', label: 'Messages', icon: MessageSquare },
                    { key: 'announcement', label: 'Annonces', icon: Megaphone },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <item.icon size={18} className="text-slate-500" />
                        <span>{item.label}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings[item.key as keyof NotificationSettings]}
                          onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Canaux de diffusion</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell size={18} className="text-slate-500" />
                      <span>Notifications in-app</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-checked:bg-indigo-600 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-slate-500" />
                      <span>Email</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className={cn('w-11 h-6 bg-slate-200 rounded-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all', settings.email && 'peer-checked:bg-indigo-600 peer-checked:after:translate-x-full')}></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone size={18} className="text-slate-500" />
                      <span>Notifications push</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.push}
                        onChange={(e) => setSettings({ ...settings, push: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className={cn('w-11 h-6 bg-slate-200 rounded-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all', settings.push && 'peer-checked:bg-indigo-600 peer-checked:after:translate-x-full')}></div>
                    </label>
                  </div>
                </div>
              </div>

              <button
                onClick={saveSettings}
                className={cn(
                  'w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors',
                  settingsSaved
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                )}
              >
                {settingsSaved ? (
                  <><Check size={16} /> Sauvegardé</>
                ) : (
                  <><Save size={16} /> Sauvegarder</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}