'use client';

import RoleLayout from '@/components/layout/RoleLayout';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

export default function SchoolCalendarPage() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Calendar' }]}>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#191c1d]">School Calendar</h2>
          <p className="text-[#464555] mt-1">Academic events, exams, and holidays.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-[#e7e8e9] text-[#464555] font-semibold rounded-full text-sm flex items-center gap-2">
            <ChevronLeft size={16} /> Previous
          </button>
          <button className="px-5 py-2.5 bg-[#3525cd] text-white font-semibold rounded-full text-sm">October 2024</button>
          <button className="px-5 py-2.5 bg-[#e7e8e9] text-[#464555] font-semibold rounded-full text-sm flex items-center gap-2">
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-2xl shadow-card p-6">
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <div key={day} className="text-center text-xs font-bold text-[#464555] uppercase tracking-wider pb-3">
              {day}
            </div>
          ))}
          {calendarDays.map((day) => {
            const hasEvent = [5, 12, 15, 22, 28].includes(day);
            const isToday = day === 22;
            return (
              <button
                key={day}
                className={`p-3 rounded-xl text-center transition-all ${
                  isToday ? 'bg-[#3525cd] text-white font-bold' :
                  hasEvent ? 'bg-[#e2dfff] text-[#3525cd] font-semibold' :
                  'hover:bg-[#f3f4f5]'
                }`}
              >
                <span className="text-sm">{day}</span>
                {hasEvent && !isToday && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3525cd] mx-auto mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Events */}
      <div className="mt-6 space-y-3">
        {[
          { name: 'Parent-Teacher Meeting', date: 'Oct 15', type: 'Event', color: 'bg-[#e2dfff]' },
          { name: 'Math Exam', date: 'Oct 22', type: 'Exam', color: 'bg-amber-50' },
          { name: 'Science Fair', date: 'Oct 28', type: 'Activity', color: 'bg-emerald-50' },
        ].map((event) => (
          <div key={event.name} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-card">
            <div className={`w-10 h-10 rounded-lg ${event.color} flex items-center justify-center`}>
              <Calendar size={18} className="text-[#191c1d]" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-[#191c1d]">{event.name}</p>
              <p className="text-xs text-[#464555]">{event.date} • {event.type}</p>
            </div>
          </div>
        ))}
      </div>
    </RoleLayout>
  );
}
