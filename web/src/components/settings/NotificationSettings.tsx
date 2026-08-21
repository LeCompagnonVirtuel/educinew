'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { sbSchools } from '@/lib/api';
import {
  Bell, Mail, Smartphone, MessageSquare, Save, Loader2,
  CheckCircle, AlertTriangle, Volume2, VolumeX, Eye,
} from 'lucide-react';

export default function NotificationSettings() {
  const { user } = useAuth();
  const { school } = useSchool();
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const [channels, setChannels] = useState({
    email: true,
    push: true,
    sms: false,
    whatsapp: false,
  });

  const [types, setTypes] = useState({
    attendance: true,
    grades: true,
    payments: true,
    messages: true,
    announcements: true,
    transport: true,
    behavior: true,
    exams: true,
  });

  const [templates, setTemplates] = useState({
    attendance_subject: 'Notification de présence',
    grades_subject: 'Nouvelles notes disponibles',
    payment_subject: 'Rappel de paiement',
    announcement_subject: 'Nouvelle annonce',
  });

  const [frequency, setFrequency] = useState({
    realtime: true,
    daily_digest: false,
    weekly_summary: false,
  });

  useEffect(() => {
    if (school?.notifications) {
      const n = school.notifications as any;
      if (n.email !== undefined) setChannels(prev => ({ ...prev, email: n.email }));
      if (n.push !== undefined) setChannels(prev => ({ ...prev, push: n.push }));
      if (n.sms !== undefined) setChannels(prev => ({ ...prev, sms: n.sms }));
      if (n.whatsapp !== undefined) setChannels(prev => ({ ...prev, whatsapp: n.whatsapp }));
      if (n.types) setTypes(n.types);
      if (n.templates) setTemplates(prev => ({ ...prev, ...n.templates }));
      if (n.frequency) setFrequency(n.frequency);
    }
  }, [school]);

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await sbSchools.update(user!.schoolId!, {
        notifications: { channels, types, templates, frequency },
      });
      showToast('success', 'Paramètres de notifications sauvegardés');
    } catch (e: any) {
      showToast('error', e.message || 'Erreur');
    }
    setSaving(false);
  };

  const colorMap: Record<string, { border: string; bg: string; bgLight: string; text: string }> = {
    blue: { border: 'border-blue-300', bg: 'bg-blue-50', bgLight: 'bg-blue-100', text: 'text-blue-600' },
    emerald: { border: 'border-emerald-300', bg: 'bg-emerald-50', bgLight: 'bg-emerald-100', text: 'text-emerald-600' },
    amber: { border: 'border-amber-300', bg: 'bg-amber-50', bgLight: 'bg-amber-100', text: 'text-amber-600' },
    green: { border: 'border-green-300', bg: 'bg-green-50', bgLight: 'bg-green-100', text: 'text-green-600' },
  };

  const ChannelToggle = ({ icon: Icon, label, enabled, onChange, color }: { icon: any; label: string; enabled: boolean; onChange: () => void; color: string }) => {
    const c = colorMap[color] || colorMap.blue;
    return (
    <button
      onClick={onChange}
      className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
        enabled ? `${c.border} ${c.bg}` : 'border-slate-200 bg-slate-50'
      }`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${enabled ? c.bgLight : 'bg-slate-100'}`}>
        <Icon size={18} className={enabled ? c.text : 'text-slate-400'} />
      </div>
      <div className="flex-1 text-left">
        <p className={`text-sm font-semibold ${enabled ? 'text-slate-900' : 'text-slate-500'}`}>{label}</p>
      </div>
      <div className={`w-10 h-6 rounded-full transition-colors ${enabled ? 'bg-[var(--color-primary,#4F46E5)]' : 'bg-slate-200'}`}>
        <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform mt-0.5 ${enabled ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
      </div>
    </button>
  );
  };

  const TypeToggle = ({ label, enabled, onChange }: { label: string; enabled: boolean; onChange: () => void }) => (
    <label className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
      <span className="text-sm text-slate-700">{label}</span>
      <button
        type="button"
        onClick={onChange}
        className={`w-10 h-6 rounded-full transition-colors ${enabled ? 'bg-[var(--color-primary,#4F46E5)]' : 'bg-slate-200'}`}
      >
        <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform mt-0.5 ${enabled ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
      </button>
    </label>
  );

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
          toast.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Channels */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Bell size={18} className="text-[var(--color-primary,#4F46E5)]" />
          Canaux de notification
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ChannelToggle icon={Mail} label="Email" enabled={channels.email} onChange={() => setChannels({ ...channels, email: !channels.email })} color="blue" />
          <ChannelToggle icon={Smartphone} label="Push (Mobile)" enabled={channels.push} onChange={() => setChannels({ ...channels, push: !channels.push })} color="emerald" />
          <ChannelToggle icon={MessageSquare} label="SMS" enabled={channels.sms} onChange={() => setChannels({ ...channels, sms: !channels.sms })} color="amber" />
          <ChannelToggle icon={MessageSquare} label="WhatsApp" enabled={channels.whatsapp} onChange={() => setChannels({ ...channels, whatsapp: !channels.whatsapp })} color="green" />
        </div>
      </div>

      {/* Types */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Eye size={18} className="text-[var(--color-primary,#4F46E5)]" />
          Types de notifications
        </h3>
        <div className="space-y-1">
          <TypeToggle label="Présence / Absence" enabled={types.attendance} onChange={() => setTypes({ ...types, attendance: !types.attendance })} />
          <TypeToggle label="Notes et bulletins" enabled={types.grades} onChange={() => setTypes({ ...types, grades: !types.grades })} />
          <TypeToggle label="Paiements" enabled={types.payments} onChange={() => setTypes({ ...types, payments: !types.payments })} />
          <TypeToggle label="Messages" enabled={types.messages} onChange={() => setTypes({ ...types, messages: !types.messages })} />
          <TypeToggle label="Annonces" enabled={types.announcements} onChange={() => setTypes({ ...types, announcements: !types.announcements })} />
          <TypeToggle label="Transport" enabled={types.transport} onChange={() => setTypes({ ...types, transport: !types.transport })} />
          <TypeToggle label="Comportement" enabled={types.behavior} onChange={() => setTypes({ ...types, behavior: !types.behavior })} />
          <TypeToggle label="Examens" enabled={types.exams} onChange={() => setTypes({ ...types, exams: !types.exams })} />
        </div>
      </div>

      {/* Frequency */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Volume2 size={18} className="text-[var(--color-primary,#4F46E5)]" />
          Fréquence
        </h3>
        <div className="space-y-1">
          <TypeToggle label="En temps réel" enabled={frequency.realtime} onChange={() => setFrequency({ ...frequency, realtime: !frequency.realtime })} />
          <TypeToggle label="Résumé quotidien" enabled={frequency.daily_digest} onChange={() => setFrequency({ ...frequency, daily_digest: !frequency.daily_digest })} />
          <TypeToggle label="Résumé hebdomadaire" enabled={frequency.weekly_summary} onChange={() => setFrequency({ ...frequency, weekly_summary: !frequency.weekly_summary })} />
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary,#4F46E5)] text-white rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-all"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Sauvegarder
        </button>
      </div>
    </div>
  );
}
