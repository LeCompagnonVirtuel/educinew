'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbClasses } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { getInitials } from '@/lib/utils';
import {
  Search, Filter, Plus, Clock, Users, CheckCircle, AlertTriangle,
  Calendar, FileText, TrendingUp,
} from 'lucide-react';

export default function AssignmentsPage() {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const [classes, setClasses] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const asgn = t.assignments;

  useEffect(() => {
  }, [user]);

  const assignments = [
    {
      id: '1',
      subject: 'Mathematics',
      title: lang === 'fr' ? 'Quiz Géométrie Vectorielle #4' : 'Vector Geometry Quiz #4',
      description: lang === 'fr'
        ? 'Résoudre les problèmes d\'intersection avec la méthode paramétrique.'
        : 'Students solve intersection problems using the parametric method.',
      dueIn: lang === 'fr' ? '2h' : '2h',
      dueDate: '2024-05-24',
      submitted: 18,
      total: 24,
      status: 'active' as const,
      gradeStatus: lang === 'fr' ? 'Notes en attente' : 'Grade Pending',
      subjectColor: 'bg-[#d4e3ff] text-[#003c70]',
    },
    {
      id: '2',
      subject: 'Literature',
      title: lang === 'fr' ? 'Analyse littéraire : "Aya de Yopougon"' : 'Literary Analysis: "Aya de Yopougon"',
      description: lang === 'fr'
        ? 'Analyser les dynamiques sociales de la Côte d\'Ivoire des années 1970.'
        : 'Analyze the social dynamics of 1970s Côte d\'Ivoire as depicted in the graphic novel.',
      dueIn: lang === 'fr' ? '3 jours' : '3 days',
      dueDate: '2024-05-27',
      submitted: 5,
      total: 28,
      status: 'open' as const,
      gradeStatus: lang === 'fr' ? 'Ouvert' : 'Open',
      subjectColor: 'bg-[#ffdbcc] text-[#7b2f00]',
    },
    {
      id: '3',
      subject: 'Physics',
      title: lang === 'fr' ? 'Rapport de Labo : Induction Électromagnétique' : 'Electromagnetic Induction Lab Report',
      description: lang === 'fr'
        ? 'Rapport complet sur les expériences d\'induction.'
        : 'Complete report on electromagnetic induction experiments.',
      dueIn: '',
      dueDate: '2024-05-15',
      submitted: 30,
      total: 30,
      status: 'completed' as const,
      gradeStatus: lang === 'fr' ? 'Terminé' : 'Completed',
      subjectColor: 'bg-[#d4e3ff] text-[#003c70]',
      classAverage: '16.5/20',
      gradingProgress: 100,
    },
    {
      id: '4',
      subject: 'Science',
      title: lang === 'fr' ? 'Schéma de la Photosynthèse' : 'Photosynthesis Diagram Sketch',
      description: lang === 'fr'
        ? 'Dessin annoté des réactions photosynthétiques.'
        : 'Hand-drawn diagram showing light-dependent and light-independent reactions.',
      dueIn: '',
      dueDate: '2024-05-15',
      submitted: 24,
      total: 24,
      status: 'pastDue' as const,
      gradeStatus: lang === 'fr' ? '12 notes manquantes' : '12 Missing Grades',
      subjectColor: 'bg-indigo-50 text-[#3525cd]',
    },
  ];

  const filteredAssignments = assignments.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusConfig = {
    active: { icon: Clock, color: 'text-red-600', label: lang === 'fr' ? 'Échéance dans' : 'Due in' },
    open: { icon: Calendar, color: 'text-[#464555]', label: lang === 'fr' ? 'Dans' : 'In' },
    completed: { icon: CheckCircle, color: 'text-emerald-600', label: asgn.completed },
    pastDue: { icon: AlertTriangle, color: 'text-amber-600', label: asgn.pastDue },
  };

  return (
    <RoleLayout role="teacher" breadcrumbs={[{ label: lang === 'fr' ? 'Enseignant' : 'Teacher' }, { label: asgn.title }]}>
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-[#464555] font-medium text-sm uppercase tracking-wider block mb-2">
            {asgn.subtitle}
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-[#191c1d]">{asgn.title}</h2>
        </div>
        <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:shadow-xl active:scale-95 transition-all w-full md:w-auto">
          <Plus size={20} />
          <span>{asgn.createNew}</span>
        </button>
      </section>

      {/* Search & Filter */}
      <div className="bg-[#edeeef] rounded-xl p-4 mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#464555]" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-none rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-[#3525cd]/40 text-[#191c1d] placeholder:text-[#777587]"
            placeholder={asgn.search}
          />
        </div>
        <button className="px-4 py-3 bg-white rounded-lg text-[#464555] font-medium flex items-center gap-2 border border-[#c7c4d8]/15">
          <Filter size={18} />
          <span>{asgn.filter}</span>
        </button>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAssignments.map((assignment) => {
          const config = statusConfig[assignment.status];
          const StatusIcon = config.icon;
          const progress = (assignment.submitted / assignment.total) * 100;

          return (
            <div
              key={assignment.id}
              className={`bg-white rounded-xl p-6 shadow-card border border-[#c7c4d8]/15 flex flex-col justify-between group hover:shadow-md transition-shadow cursor-pointer ${
                assignment.status === 'completed' ? 'md:col-span-2' : ''
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`${assignment.subjectColor} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider`}>
                    {assignment.subject}
                  </span>
                  <div className={`flex items-center ${config.color} font-semibold text-sm gap-1`}>
                    <StatusIcon size={14} />
                    <span>
                      {assignment.dueIn ? `${config.label} ${assignment.dueIn}` : config.label}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#191c1d] mb-2 group-hover:text-[#3525cd] transition-colors">
                  {assignment.title}
                </h3>
                <p className="text-[#464555] text-sm mb-6 leading-relaxed">{assignment.description}</p>
              </div>

              <div className="space-y-4">
                <div className="bg-[#f3f4f5] rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-[#464555]">{asgn.submissionStatus}</span>
                    <span className="text-sm font-bold text-[#191c1d]">
                      {assignment.submitted}/{assignment.total} {asgn.students}
                    </span>
                  </div>
                  <div className="w-full bg-[#e1e3e4] h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${progress === 100 ? 'bg-emerald-500' : 'bg-[#3525cd]'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {assignment.status === 'completed' && assignment.classAverage && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#f3f4f5] rounded-lg p-3 text-center">
                      <span className="block text-[10px] text-[#464555] uppercase font-bold">{asgn.totalSubmissions}</span>
                      <span className="text-lg font-bold text-[#191c1d]">{assignment.total}/{assignment.total}</span>
                    </div>
                    <div className="bg-[#f3f4f5] rounded-lg p-3 text-center">
                      <span className="block text-[10px] text-[#464555] uppercase font-bold">{asgn.classAverage}</span>
                      <span className="text-lg font-bold text-[#191c1d]">{assignment.classAverage}</span>
                    </div>
                    <div className="bg-[#f3f4f5] rounded-lg p-3 text-center">
                      <span className="block text-[10px] text-[#464555] uppercase font-bold">{asgn.gradingProgress}</span>
                      <span className="text-lg font-bold text-[#3525cd]">{assignment.gradingProgress}%</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-[#464555]">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{assignment.dueDate}</span>
                  </div>
                  <span className={`px-2 py-1 rounded font-medium ${
                    assignment.status === 'pastDue' ? 'bg-red-50 text-red-600' :
                    assignment.gradeStatus.includes('Pending') || assignment.gradeStatus.includes('attente')
                      ? 'bg-indigo-50 text-[#3525cd]'
                      : 'bg-[#e1e3e4] text-[#464555]'
                  }`}>
                    {assignment.gradeStatus}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </RoleLayout>
  );
}
