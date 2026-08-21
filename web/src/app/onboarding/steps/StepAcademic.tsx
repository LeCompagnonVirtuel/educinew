'use client';

import { useState } from 'react';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import StepCard from '@/components/onboarding/StepCard';
import { Plus, X, BookOpen } from 'lucide-react';

const inputClass = (field: string, focused: string) =>
  `w-full px-4 py-3.5 bg-white rounded-xl border-2 transition-all duration-300 outline-none text-slate-900 text-[15px]
   ${focused === field ? 'border-[#4F46E5] bg-white shadow-sm shadow-[#4F46E5]/5' : 'border-slate-200 hover:border-slate-300'}`;

const labelClass = 'block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2';

const defaultSubjects = [
  { name: 'Mathématiques', coefficient: 5 },
  { name: 'Français', coefficient: 5 },
  { name: 'Anglais', coefficient: 3 },
  { name: 'Physique-Chimie', coefficient: 4 },
  { name: 'SVT', coefficient: 3 },
  { name: 'Histoire-Géographie', coefficient: 3 },
  { name: 'Informatique', coefficient: 2 },
  { name: 'EPS', coefficient: 2 },
  { name: 'Philosophie', coefficient: 4 },
  { name: 'Littérature', coefficient: 3 },
];

export default function StepAcademic() {
  const { data, updateAcademic, nextStep } = useOnboarding();
  const [focused, setFocused] = useState('');
  const [newClass, setNewClass] = useState('');
  const [newLevel, setNewLevel] = useState('');

  const year = new Date().getFullYear();
  const academicYear = `${year}-${year + 1}`;

  const toggleSubject = (name: string, coeff: number) => {
    const exists = data.academic.subjects.find(s => s.name === name);
    if (exists) {
      updateAcademic({ subjects: data.academic.subjects.filter(s => s.name !== name) });
    } else {
      updateAcademic({ subjects: [...data.academic.subjects, { name, coefficient: coeff }] });
    }
  };

  const addClass = () => {
    if (newClass.trim()) {
      updateAcademic({ classes: [...data.academic.classes, newClass.trim()] });
      setNewClass('');
    }
  };

  const removeClass = (idx: number) => {
    updateAcademic({ classes: data.academic.classes.filter((_, i) => i !== idx) });
  };

  return (
    <StepCard
      title="Configuration académique"
      subtitle="Définissez l'organisation pédagogique de votre établissement."
      icon="📚"
      onNext={nextStep}
      canProceed={!!(data.academic.periodType)}
    >
      <div className="space-y-5">
        {/* Academic Year + Period Type */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Année scolaire</label>
            <input
              value={academicYear}
              readOnly
              className={inputClass('year', focused) + ' bg-slate-50 text-slate-600'}
            />
          </div>
          <div>
            <label className={labelClass}>Période</label>
            <div className="flex gap-2">
              {['TRIMESTRE', 'SEMESTRE'].map((p) => (
                <button
                  key={p}
                  onClick={() => updateAcademic({ periodType: p })}
                  className={`flex-1 py-3.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                    data.academic.periodType === p
                      ? 'border-[#4F46E5] bg-[#4F46E5]/5 text-[#4F46E5]'
                      : 'border-slate-200 text-slate-500'
                  }`}
                >
                  {p === 'TRIMESTRE' ? 'Trimestres' : 'Semestres'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grading System */}
        <div>
          <label className={labelClass}>Système de notation (sur)</label>
          <div className="flex gap-2">
            {['20', '100'].map((g) => (
              <button
                key={g}
                onClick={() => updateAcademic({ gradingSystem: g })}
                className={`px-8 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                  data.academic.gradingSystem === g
                    ? 'border-[#4F46E5] bg-[#4F46E5]/5 text-[#4F46E5]'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                /{g}
              </button>
            ))}
          </div>
        </div>

        {/* Classes */}
        <div>
          <label className={labelClass}>Classes</label>
          <div className="flex gap-2 mb-3">
            <input
              value={newClass}
              onChange={(e) => setNewClass(e.target.value)}
              onFocus={() => setFocused('cls')} onBlur={() => setFocused('')}
              className={inputClass('cls', focused) + ' flex-1'}
              placeholder="ex: 6ème A, Terminale D"
              onKeyDown={(e) => e.key === 'Enter' && addClass()}
            />
            <button
              onClick={addClass}
              className="px-4 py-3 bg-[#4F46E5] text-white rounded-xl hover:bg-[#4338CA] transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.academic.classes.map((cls, i) => (
              <span key={i} className="px-3 py-1.5 bg-[#4F46E5]/10 text-[#4F46E5] rounded-lg text-sm font-medium flex items-center gap-1.5">
                {cls}
                <button onClick={() => removeClass(i)} className="hover:text-red-500"><X size={14} /></button>
              </span>
            ))}
          </div>
        </div>

        {/* Subjects */}
        <div>
          <label className={labelClass}>Matières</label>
          <div className="grid grid-cols-2 gap-2">
            {defaultSubjects.map((subject) => {
              const selected = data.academic.subjects.some(s => s.name === subject.name);
              return (
                <button
                  key={subject.name}
                  onClick={() => toggleSubject(subject.name, subject.coefficient)}
                  className={`p-3 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                    selected
                      ? 'border-[#4F46E5] bg-[#4F46E5]/5'
                      : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} className={selected ? 'text-[#4F46E5]' : 'text-slate-400'} />
                    <span className="text-sm font-medium text-slate-700">{subject.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Coeff. {subject.coefficient}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </StepCard>
  );
}
