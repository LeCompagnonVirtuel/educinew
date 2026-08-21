'use client';

import { useRegistration } from '@/components/registration/RegistrationContext';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Plus, X } from 'lucide-react';
import { useState } from 'react';

const defaultCycles = ['Maternelle', 'Primaire', 'Collège', 'Lycée'];
const defaultLevels = ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Tle'];
const defaultSubjects = [
  { name: 'Mathématiques', coefficient: 4 },
  { name: 'Français', coefficient: 4 },
  { name: 'Anglais', coefficient: 2 },
  { name: 'Physique-Chimie', coefficient: 3 },
  { name: 'SVT', coefficient: 2 },
  { name: 'Histoire-Géographie', coefficient: 2 },
  { name: 'EPS', coefficient: 1 },
];

export default function StepAcademic() {
  const { data, updateAcademic, nextStep, prevStep } = useRegistration();
  const a = data.academic;
  const [newSubject, setNewSubject] = useState('');

  const toggleCycle = (cycle: string) => {
    const cycles = a.cycles.includes(cycle) ? a.cycles.filter(c => c !== cycle) : [...a.cycles, cycle];
    updateAcademic({ cycles });
  };

  const toggleLevel = (level: string) => {
    const levels = a.levels.includes(level) ? a.levels.filter(l => l !== level) : [...a.levels, level];
    updateAcademic({ levels });
  };

  const addSubject = () => {
    if (newSubject.trim()) {
      const currentSubjects = a.subjects.length > 0 ? a.subjects : defaultSubjects;
      updateAcademic({ subjects: [...currentSubjects, { name: newSubject.trim(), coefficient: 1 }] });
      setNewSubject('');
    }
  };

  const removeSubject = (i: number) => {
    updateAcademic({ subjects: a.subjects.filter((_, idx) => idx !== i) });
  };

  const updateCoefficient = (i: number, coef: number) => {
    const subjects = [...a.subjects];
    subjects[i] = { ...subjects[i], coefficient: coef };
    updateAcademic({ subjects });
  };

  const inputClass = 'w-full px-4 py-3.5 bg-white rounded-xl border-2 border-slate-200 focus:border-[#4F46E5] hover:border-slate-300 transition-all duration-200 outline-none text-slate-900 text-sm';

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Configuration académique</h2>
        <p className="text-sm text-slate-500">Configurez la structure pédagogique.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Année scolaire</label>
          <input value={a.academicYear} onChange={e => updateAcademic({ academicYear: e.target.value })} className={inputClass} placeholder="2025-2026" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Système de notation</label>
          <select value={a.gradingSystem} onChange={e => updateAcademic({ gradingSystem: e.target.value })} className={inputClass}>
            <option value="20">Sur 20</option>
            <option value="100">Sur 100</option>
            <option value="letter">Lettres (A-F)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Périodes</label>
        <select value={a.periodType} onChange={e => updateAcademic({ periodType: e.target.value })} className={inputClass}>
          <option value="TRIMESTRE">Trimestres</option>
          <option value="SEMESTRE">Semestres</option>
          <option value="QUARTER">Quadrimestres</option>
        </select>
      </div>

      {/* Cycles */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Cycles</label>
        <div className="flex flex-wrap gap-2">
          {defaultCycles.map(cycle => (
            <button key={cycle} onClick={() => toggleCycle(cycle)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${a.cycles.includes(cycle) ? 'bg-[#4F46E5] text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {cycle}
            </button>
          ))}
        </div>
      </div>

      {/* Levels */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Niveaux</label>
        <div className="flex flex-wrap gap-2">
          {defaultLevels.map(level => (
            <button key={level} onClick={() => toggleLevel(level)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${a.levels.includes(level) ? 'bg-[#4F46E5] text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Subjects */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Matières</label>
        <div className="space-y-2 mb-3">
          {(a.subjects.length > 0 ? a.subjects : defaultSubjects).map((subj, i) => {
            const subjectList = a.subjects.length > 0 ? a.subjects : defaultSubjects;
            return (
              <div key={i} className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-100">
                <span className="flex-1 text-sm text-slate-700">{subj.name}</span>
                <input type="number" min={1} max={10} value={subj.coefficient} onChange={e => {
                  const list = [...subjectList];
                  list[i] = { ...list[i], coefficient: parseInt(e.target.value) || 1 };
                  updateAcademic({ subjects: list });
                }}
                  className="w-16 px-2 py-1.5 text-center text-sm rounded-lg border border-slate-200 focus:border-[#4F46E5] outline-none" />
                <button onClick={() => {
                  const list = subjectList.filter((_, idx) => idx !== i);
                  updateAcademic({ subjects: list });
                }} className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          <input value={newSubject} onChange={e => setNewSubject(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSubject()}
            className={inputClass + ' flex-1'} placeholder="Ajouter une matière..." />
          <button onClick={addSubject} className="px-4 py-3.5 bg-[#4F46E5]/10 text-[#4F46E5] rounded-xl hover:bg-[#4F46E5]/20 transition-all">
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button onClick={prevStep} className="flex-1 py-3.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all text-sm flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Retour
        </button>
        <button onClick={nextStep} className="flex-[2] py-3.5 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-xl flex items-center justify-center gap-2 text-sm font-semibold shadow-lg hover:shadow-xl transition-all group">
          Continuer <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
