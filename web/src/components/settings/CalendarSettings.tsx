'use client';

import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/api/shared';
import { useAuth } from '@/hooks/useAuth';
import {
  Calendar, Plus, Trash2, CheckCircle, AlertTriangle, Loader2,
  Clock, MapPin, Tag, X, Save, ChevronLeft, ChevronRight,
  Palette, Bell,
} from 'lucide-react';

interface Holiday {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  holiday_type: string;
  notes: string | null;
}

interface SchoolEvent {
  id: string;
  title: string;
  description: string | null;
  event_type: string;
  start_date: string;
  end_date: string | null;
  all_day: boolean;
  location: string | null;
  color: string;
  recurrence: string | null;
}

const EVENT_COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
const EVENT_TYPES = [
  { value: 'EXAM', label: 'Examen' },
  { value: 'CEREMONY', label: 'Cérémonie' },
  { value: 'PARENT_MEETING', label: 'Réunion parents' },
  { value: 'HOLIDAY', label: 'Congé' },
  { value: 'TRAINING', label: 'Formation' },
  { value: 'OTHER', label: 'Autre' },
];
const HOLIDAY_TYPES = [
  { value: 'PUBLIC', label: 'Public' },
  { value: 'SCHOOL', label: 'Scolaire' },
  { value: 'REGIONAL', label: 'Régional' },
];

type CalendarTab = 'holidays' | 'events' | 'overview';

export default function CalendarSettings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<CalendarTab>('overview');
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [holidayForm, setHolidayForm] = useState({
    name: '', start_date: '', end_date: '', holiday_type: 'PUBLIC', notes: '',
  });
  const [eventForm, setEventForm] = useState({
    title: '', description: '', event_type: 'OTHER', start_date: '', end_date: '',
    all_day: true, location: '', color: '#4F46E5', recurrence: 'NONE',
  });

  useEffect(() => { loadData(); }, [user?.schoolId]);

  const loadData = async () => {
    if (!user?.schoolId) return;
    try {
      const supabase = getSupabase();
      const [hRes, eRes] = await Promise.all([
        supabase.from('school_holidays').select('*').eq('school_id', user.schoolId).order('start_date'),
        supabase.from('school_events').select('*').eq('school_id', user.schoolId).order('start_date'),
      ]);
      setHolidays(hRes.data || []);
      setEvents(eRes.data || []);
    } catch {
      setHolidays([]);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateHoliday = async () => {
    if (!holidayForm.name || !holidayForm.start_date || !holidayForm.end_date) {
      showToast('error', 'Veuillez remplir tous les champs obligatoires');
      return;
    }
    setSaving(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from('school_holidays').insert({
        school_id: user!.schoolId,
        name: holidayForm.name,
        start_date: holidayForm.start_date,
        end_date: holidayForm.end_date,
        holiday_type: holidayForm.holiday_type,
        notes: holidayForm.notes || null,
      });
      if (error) throw error;
      showToast('success', 'Congé ajouté');
      setShowForm(false);
      setHolidayForm({ name: '', start_date: '', end_date: '', holiday_type: 'PUBLIC', notes: '' });
      loadData();
    } catch (e: any) {
      showToast('error', e.message || 'Erreur');
    }
    setSaving(false);
  };

  const handleCreateEvent = async () => {
    if (!eventForm.title || !eventForm.start_date) {
      showToast('error', 'Le titre et la date sont requis');
      return;
    }
    setSaving(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from('school_events').insert({
        school_id: user!.schoolId,
        title: eventForm.title,
        description: eventForm.description || null,
        event_type: eventForm.event_type,
        start_date: eventForm.start_date,
        end_date: eventForm.end_date || null,
        all_day: eventForm.all_day,
        location: eventForm.location || null,
        color: eventForm.color,
        recurrence: eventForm.recurrence === 'NONE' ? null : eventForm.recurrence,
      });
      if (error) throw error;
      showToast('success', 'Événement créé');
      setShowForm(false);
      setEventForm({
        title: '', description: '', event_type: 'OTHER', start_date: '', end_date: '',
        all_day: true, location: '', color: '#4F46E5', recurrence: 'NONE',
      });
      loadData();
    } catch (e: any) {
      showToast('error', e.message || 'Erreur');
    }
    setSaving(false);
  };

  const handleDelete = async (table: string, id: string) => {
    if (!confirm('Confirmer la suppression ?')) return;
    const supabase = getSupabase();
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) { showToast('error', error.message); return; }
    showToast('success', 'Supprimé');
    loadData();
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth, year, month };
  };

  const isDateInHoliday = (dateStr: string) => {
    return holidays.some(h => dateStr >= h.start_date && dateStr <= h.end_date);
  };

  const isDateInEvent = (dateStr: string) => {
    return events.some(e => {
      const start = e.start_date.split('T')[0];
      const end = e.end_date ? e.end_date.split('T')[0] : start;
      return dateStr >= start && dateStr <= end;
    });
  };

  const getEventsForDate = (dateStr: string) => {
    return events.filter(e => {
      const start = e.start_date.split('T')[0];
      const end = e.end_date ? e.end_date.split('T')[0] : start;
      return dateStr >= start && dateStr <= end;
    });
  };

  const renderCalendar = () => {
    const { firstDay, daysInMonth, year, month } = getDaysInMonth(currentMonth);
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isToday = dateStr === todayStr;
      const hasHoliday = isDateInHoliday(dateStr);
      const dayEvents = getEventsForDate(dateStr);

      days.push(
        <div
          key={d}
          className={`h-10 rounded-lg flex flex-col items-center justify-center text-xs relative cursor-default transition-colors ${
            isToday ? 'bg-[#4F46E5] text-white font-bold' :
            hasHoliday ? 'bg-amber-100 text-amber-800' :
            dayEvents.length > 0 ? 'bg-indigo-50 text-[#4F46E5]' :
            'text-slate-700 hover:bg-slate-50'
          }`}
          title={[
            hasHoliday ? 'Congé' : '',
            ...dayEvents.map(e => e.title),
          ].filter(Boolean).join(', ') || undefined}
        >
          <span>{d}</span>
          {(hasHoliday || dayEvents.length > 0) && !isToday && (
            <div className="flex gap-0.5">
              {hasHoliday && <div className="w-1 h-1 rounded-full bg-amber-500" />}
              {dayEvents.slice(0, 2).map((e, i) => (
                <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: e.color }} />
              ))}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const monthName = currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={28} className="animate-spin text-[#4F46E5]" />
      </div>
    );
  }

  return (
    <div>
      {toast && (
        <div className={`mb-4 p-3 rounded-xl flex items-center gap-2 text-sm font-medium ${
          toast.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Sub-tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200 pb-2">
        {[
          { id: 'overview' as const, label: 'Vue d\'ensemble', icon: Calendar },
          { id: 'holidays' as const, label: 'Congés', icon: Clock, count: holidays.length },
          { id: 'events' as const, label: 'Événements', icon: Bell, count: events.length },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setShowForm(false); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-50 text-[#4F46E5] border border-indigo-200'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
            {'count' in tab && tab.count !== undefined && (
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-indigo-100' : 'bg-slate-100'}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div>
          {/* Calendar */}
          <div className="bg-slate-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#111827] capitalize">{monthName}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 hover:bg-white rounded-lg border border-slate-200"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date())}
                  className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Aujourd&apos;hui
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 hover:bg-white rounded-lg border border-slate-200"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(d => (
                <div key={d} className="text-center text-xs font-medium text-slate-500 py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {renderCalendar()}
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-400" /> Congé</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#4F46E5]" /> Événement</div>
            </div>
          </div>

          {/* Upcoming */}
          <div>
            <h3 className="font-semibold text-[#111827] mb-3">Prochains événements</h3>
            <div className="space-y-2">
              {events
                .filter(e => new Date(e.start_date) >= new Date())
                .slice(0, 5)
                .map(evt => (
                  <div key={evt.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100">
                    <div className="w-1 h-10 rounded-full" style={{ backgroundColor: evt.color }} />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-[#111827]">{evt.title}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(evt.start_date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                        {evt.location ? ` • ${evt.location}` : ''}
                      </p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                      {EVENT_TYPES.find(t => t.value === evt.event_type)?.label || evt.event_type}
                    </span>
                  </div>
                ))}
              {events.filter(e => new Date(e.start_date) >= new Date()).length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4">Aucun événement à venir.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* HOLIDAYS TAB */}
      {activeTab === 'holidays' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#111827]">Congés et vacances</h3>
            <button
              onClick={() => { setShowForm(!showForm); }}
              className="flex items-center gap-1 px-3 py-2 bg-[#4F46E5] text-white text-sm font-medium rounded-lg hover:bg-[#4338ca]"
            >
              <Plus size={14} /> Nouveau congé
            </button>
          </div>

          {showForm && (
            <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Nom du congé (ex: Vacances de Noël)"
                  value={holidayForm.name}
                  onChange={e => setHolidayForm(p => ({ ...p, name: e.target.value }))}
                  className="px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                />
                <select
                  value={holidayForm.holiday_type}
                  onChange={e => setHolidayForm(p => ({ ...p, holiday_type: e.target.value }))}
                  className="px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                >
                  {HOLIDAY_TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={holidayForm.start_date}
                  onChange={e => setHolidayForm(p => ({ ...p, start_date: e.target.value }))}
                  className="px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                />
                <input
                  type="date"
                  value={holidayForm.end_date}
                  onChange={e => setHolidayForm(p => ({ ...p, end_date: e.target.value }))}
                  className="px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                />
              </div>
              <input
                type="text"
                placeholder="Notes (optionnel)"
                value={holidayForm.notes}
                onChange={e => setHolidayForm(p => ({ ...p, notes: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm mb-3"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreateHoliday}
                  disabled={saving}
                  className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg text-sm font-medium hover:bg-[#4338ca] disabled:opacity-50"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : 'Enregistrer'}
                </button>
                <button onClick={() => setShowForm(false)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg text-sm">
                  Annuler
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {holidays.map(h => (
              <div key={h.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                    <Clock size={18} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-[#111827]">{h.name}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(h.start_date).toLocaleDateString('fr-FR')} → {new Date(h.end_date).toLocaleDateString('fr-FR')}
                      <span className="ml-2 px-1.5 py-0.5 rounded text-xs bg-slate-100">
                        {HOLIDAY_TYPES.find(t => t.value === h.holiday_type)?.label || h.holiday_type}
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete('school_holidays', h.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            {holidays.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-8">Aucun congé configuré.</p>
            )}
          </div>
        </div>
      )}

      {/* EVENTS TAB */}
      {activeTab === 'events' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#111827]">Événements scolaires</h3>
            <button
              onClick={() => { setShowForm(!showForm); }}
              className="flex items-center gap-1 px-3 py-2 bg-[#4F46E5] text-white text-sm font-medium rounded-lg hover:bg-[#4338ca]"
            >
              <Plus size={14} /> Nouvel événement
            </button>
          </div>

          {showForm && (
            <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Titre de l'événement"
                  value={eventForm.title}
                  onChange={e => setEventForm(p => ({ ...p, title: e.target.value }))}
                  className="px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                />
                <select
                  value={eventForm.event_type}
                  onChange={e => setEventForm(p => ({ ...p, event_type: e.target.value }))}
                  className="px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                >
                  {EVENT_TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                <input
                  type="datetime-local"
                  value={eventForm.start_date}
                  onChange={e => setEventForm(p => ({ ...p, start_date: e.target.value }))}
                  className="px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                />
                <input
                  type="datetime-local"
                  value={eventForm.end_date}
                  onChange={e => setEventForm(p => ({ ...p, end_date: e.target.value }))}
                  className="px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                  placeholder="Heure de fin (optionnel)"
                />
                <input
                  type="text"
                  placeholder="Lieu (optionnel)"
                  value={eventForm.location}
                  onChange={e => setEventForm(p => ({ ...p, location: e.target.value }))}
                  className="px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                />
                <select
                  value={eventForm.recurrence}
                  onChange={e => setEventForm(p => ({ ...p, recurrence: e.target.value }))}
                  className="px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                >
                  <option value="NONE">Pas de récurrence</option>
                  <option value="WEEKLY">Hebdomadaire</option>
                  <option value="MONTHLY">Mensuel</option>
                  <option value="YEARLY">Annuel</option>
                </select>
              </div>
              <textarea
                placeholder="Description (optionnel)"
                value={eventForm.description}
                onChange={e => setEventForm(p => ({ ...p, description: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm mb-3 resize-none"
              />
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm text-slate-600">Couleur:</span>
                <div className="flex gap-1">
                  {EVENT_COLORS.map(c => (
                    <button
                      key={c}
                      onClick={() => setEventForm(p => ({ ...p, color: c }))}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${eventForm.color === c ? 'border-slate-800 scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCreateEvent}
                  disabled={saving}
                  className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg text-sm font-medium hover:bg-[#4338ca] disabled:opacity-50"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : 'Créer'}
                </button>
                <button onClick={() => setShowForm(false)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg text-sm">
                  Annuler
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {events.map(evt => (
              <div key={evt.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 group">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-10 rounded-full" style={{ backgroundColor: evt.color }} />
                  <div>
                    <p className="font-medium text-sm text-[#111827]">{evt.title}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(evt.start_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      {evt.all_day ? ' ( toute la journée )' : ''}
                      {evt.location ? ` • ${evt.location}` : ''}
                    </p>
                    {evt.description && <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{evt.description}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                    {EVENT_TYPES.find(t => t.value === evt.event_type)?.label || evt.event_type}
                  </span>
                  <button
                    onClick={() => handleDelete('school_events', evt.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
            {events.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-8">Aucun événement.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
