'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbClasses } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Clock, MapPin, Coffee, Plus, ChevronRight,
} from 'lucide-react';

export default function SchedulePage() {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const [view, setView] = useState<'day' | 'week'>('day');
  const [classes, setClasses] = useState<any[]>([]);

  const sc = t.schedule;

  useEffect(() => {
  }, [user]);

  const todaySchedule = [
    {
      time: '08:00',
      end: '',
      label: '',
      type: 'empty' as const,
    },
    {
      time: '09:00',
      end: '10:30',
      label: lang === 'fr' ? 'Mathématiques Avancées' : 'Advanced Mathematics',
      grade: 'Terminale A',
      room: 'Room 402',
      type: 'class' as const,
      color: 'bg-[#3525cd]/5 border-[#3525cd] text-[#3525cd]',
      active: true,
      remaining: '42m',
    },
    {
      time: '10:30',
      end: '11:00',
      label: sc.recess,
      type: 'break' as const,
    },
    {
      time: '11:00',
      end: '12:30',
      label: lang === 'fr' ? 'Littérature Moderne' : 'Modern Literature',
      grade: '3ème C',
      room: 'Room 105',
      type: 'class' as const,
      color: 'bg-[#0060ac]/5 border-[#0060ac] text-[#0060ac]',
      active: false,
    },
    {
      time: '12:30',
      end: '13:30',
      label: sc.lunchBreak,
      room: lang === 'fr' ? 'Salle des profs' : 'Faculty Lounge',
      type: 'lunch' as const,
    },
    {
      time: '13:30',
      end: '15:00',
      label: lang === 'fr' ? 'Histoire du Monde' : 'World History',
      grade: '1ère B',
      room: 'Room 202',
      type: 'class' as const,
      color: 'bg-[#7e3000]/5 border-[#7e3000] text-[#7e3000]',
      active: false,
    },
  ];

  const weekDays = [
    lang === 'fr' ? 'Lun' : 'Mon',
    lang === 'fr' ? 'Mar' : 'Tue',
    lang === 'fr' ? 'Mer' : 'Wed',
    lang === 'fr' ? 'Jeu' : 'Thu',
    lang === 'fr' ? 'Ven' : 'Fri',
  ];

  return (
    <RoleLayout role="teacher" breadcrumbs={[{ label: lang === 'fr' ? 'Enseignant' : 'Teacher' }, { label: sc.title }]}>
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#191c1d] tracking-tight">
            {view === 'day' ? sc.dailySchedule : sc.weeklySchedule}
          </h2>
          <p className="text-[#464555] font-medium">
            {new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        {/* Toggle */}
        <div className="bg-[#f3f4f5] p-1.5 rounded-xl inline-flex self-start">
          <button
            onClick={() => setView('day')}
            className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${
              view === 'day' ? 'bg-white text-[#3525cd] shadow-sm' : 'text-[#464555]'
            }`}
          >
            {sc.day}
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${
              view === 'week' ? 'bg-white text-[#3525cd] shadow-sm' : 'text-[#464555]'
            }`}
          >
            {sc.week}
          </button>
        </div>
      </section>

      {view === 'day' ? (
        <>
          {/* Live Now Callout */}
          <div className="mb-10 relative overflow-hidden bg-gradient-to-br from-[#3525cd] to-[#4f46e5] p-6 rounded-xl text-white shadow-lg">
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3">
                  {sc.liveNow}
                </span>
                <h3 className="text-2xl font-bold mb-1">
                  {lang === 'fr' ? 'Mathématiques Avancées' : 'Advanced Mathematics'}
                </h3>
                <p className="opacity-90 flex items-center gap-2 text-sm">
                  <MapPin size={14} /> Room 402 • 09:00 - 10:30
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">42m</p>
                <p className="text-[10px] uppercase opacity-70">{sc.remaining}</p>
              </div>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          </div>

          {/* Timeline */}
          <div className="space-y-0.5">
            {todaySchedule.map((slot, i) => {
              if (slot.type === 'empty') {
                return (
                  <div key={i} className="grid grid-cols-[80px_1fr] group">
                    <div className="py-6 pr-4 text-right border-r border-[#c7c4d8]/30">
                      <span className="text-xs font-bold text-[#464555]">{slot.time} AM</span>
                    </div>
                    <div className="py-4 pl-6">
                      <div className="h-full border-b border-[#c7c4d8]/10" />
                    </div>
                  </div>
                );
              }

              if (slot.type === 'break') {
                return (
                  <div key={i} className="grid grid-cols-[80px_1fr]">
                    <div className="py-6 pr-4 text-right border-r border-[#c7c4d8]/30">
                      <span className="text-xs font-bold text-[#464555]">{slot.time} AM</span>
                    </div>
                    <div className="py-4 pl-6">
                      <div className="bg-[#f3f4f5]/50 border border-dashed border-[#c7c4d8]/50 p-3 rounded-xl flex items-center gap-3">
                        <Coffee size={16} className="text-[#464555]" />
                        <span className="text-xs font-semibold text-[#464555] uppercase tracking-widest">{slot.label}</span>
                      </div>
                    </div>
                  </div>
                );
              }

              if (slot.type === 'lunch') {
                return (
                  <div key={i} className="grid grid-cols-[80px_1fr]">
                    <div className="py-6 pr-4 text-right border-r border-[#c7c4d8]/30">
                      <span className="text-xs font-bold text-[#464555]">{slot.time} PM</span>
                    </div>
                    <div className="py-4 pl-6">
                      <div className="bg-[#ffdbcc]/30 border-l-4 border-[#7e3000] p-5 rounded-r-xl">
                        <div className="flex items-center gap-3">
                          <Coffee size={16} className="text-[#7e3000]" />
                          <div>
                            <h4 className="font-bold text-[#7e3000] text-sm">{slot.label}</h4>
                            <p className="text-[10px] text-[#7b2f00]">{slot.room}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={i} className="grid grid-cols-[80px_1fr]">
                  <div className="py-6 pr-4 text-right border-r border-[#c7c4d8]/30 relative">
                    <span className="text-xs font-bold text-[#464555]">{slot.time} {parseInt(slot.time) >= 12 ? 'PM' : 'AM'}</span>
                    {slot.active && (
                      <div className="absolute top-0 right-[-5px] w-2 h-2 rounded-full bg-[#3525cd] border-2 border-white" />
                    )}
                  </div>
                  <div className="pb-6 pl-6 relative">
                    <div className={`${slot.color} border-l-4 p-5 rounded-r-xl transition-all hover:opacity-80 cursor-pointer`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold mb-1">{slot.label}</h4>
                          <p className="text-xs opacity-70 flex items-center gap-1">
                            <span className="text-[14px]">📚</span> {slot.grade}
                          </p>
                        </div>
                        <span className="text-[11px] font-bold bg-white px-2 py-1 rounded-md shadow-sm">
                          {slot.room}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Week View */
        <div className="grid grid-cols-5 gap-3">
          {weekDays.map((day, dayIndex) => (
            <div key={day} className="space-y-2">
              <div className="text-center font-semibold text-sm text-[#191c1d] bg-[#f3f4f5] rounded-xl py-2">
                {day}
              </div>
              {[
                { subject: lang === 'fr' ? 'Maths' : 'Math', time: '09:00', room: 'R204' },
                { subject: lang === 'fr' ? 'Physique' : 'Physics', time: '11:00', room: 'Lab A' },
                { subject: lang === 'fr' ? 'Histoire' : 'History', time: '14:00', room: 'R105' },
              ].slice(0, dayIndex === 2 ? 2 : 3).map((slot, i) => {
                const colors = ['bg-indigo-50 text-indigo-700', 'bg-blue-50 text-blue-700', 'bg-orange-50 text-orange-700'];
                return (
                  <div key={i} className={`rounded-xl p-3 text-xs ${colors[i % 3]}`}>
                    <p className="font-semibold">{slot.subject}</p>
                    <div className="flex items-center gap-1 mt-1 opacity-70">
                      <Clock size={10} />
                      <span>{slot.time}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5 opacity-70">
                      <MapPin size={10} />
                      <span>{slot.room}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-[#3525cd] to-[#4f46e5] text-white rounded-2xl shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
        <Plus size={24} />
      </button>
    </RoleLayout>
  );
}
