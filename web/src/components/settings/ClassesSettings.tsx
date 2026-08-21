'use client';

import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/api/shared';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { sbClasses, sbSubjects } from '@/lib/api';
import {
  BookOpen, Plus, Trash2, CheckCircle, AlertTriangle, Loader2,
  Users, Layers, GraduationCap, ChevronDown, X, Save, GripVertical,
  Edit3, Copy,
} from 'lucide-react';

interface ClassRow {
  id: string;
  name: string;
  level: string;
  stream: string | null;
  capacity: number;
  academic_year_id: string | null;
  studentCount?: number;
}

interface SubjectRow {
  id: string;
  name: string;
  coefficient: number;
  school_id: string | null;
}

interface LevelRow {
  id: string;
  name: string;
  cycle_id: string | null;
  order_index: number;
}

interface CycleRow {
  id: string;
  name: string;
  description: string | null;
  order_index: number;
}

type SettingsTab = 'classes' | 'subjects' | 'levels';

export default function ClassesSettings() {
  const { user } = useAuth();
  const { school } = useSchool();
  const [activeTab, setActiveTab] = useState<SettingsTab>('classes');
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [subjects, setSubjects] = useState<SubjectRow[]>([]);
  const [levels, setLevels] = useState<LevelRow[]>([]);
  const [cycles, setCycles] = useState<CycleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [classForm, setClassForm] = useState({ name: '', level: '', stream: '', capacity: 50 });
  const [subjectForm, setSubjectForm] = useState({ name: '', coefficient: 1 });
  const [levelForm, setLevelForm] = useState({ name: '', cycle_id: '' });
  const [cycleForm, setCycleForm] = useState({ name: '', description: '' });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Record<string, any>>({});

  useEffect(() => { loadAll(); }, [user?.schoolId]);

  const loadAll = async () => {
    if (!user?.schoolId) return;
    try {
      const [c, s] = await Promise.all([
        sbClasses.listWithPagination(undefined, undefined, 1, 500),
        sbSubjects.list(user.schoolId),
      ]);
      setClasses(c?.data || []);
      setSubjects(s || []);

      const supabase = getSupabase();
      const [levelsRes, cyclesRes] = await Promise.all([
        supabase.from('levels').select('*').eq('school_id', user.schoolId).order('order_index'),
        supabase.from('cycles').select('*').eq('school_id', user.schoolId).order('order_index'),
      ]);
      setLevels(levelsRes.data || []);
      setCycles(cyclesRes.data || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateClass = async () => {
    if (!classForm.name) { showToast('error', 'Le nom est requis'); return; }
    setSaving(true);
    try {
      await sbClasses.create({ ...classForm, schoolId: user!.schoolId });
      showToast('success', 'Classe créée');
      setShowForm(false);
      setClassForm({ name: '', level: '', stream: '', capacity: 50 });
      loadAll();
    } catch (e: any) {
      showToast('error', e.message || 'Erreur');
    }
    setSaving(false);
  };

  const handleCreateSubject = async () => {
    if (!subjectForm.name) { showToast('error', 'Le nom est requis'); return; }
    setSaving(true);
    try {
      await sbSubjects.create({ ...subjectForm, schoolId: user!.schoolId });
      showToast('success', 'Matière créée');
      setShowForm(false);
      setSubjectForm({ name: '', coefficient: 1 });
      loadAll();
    } catch (e: any) {
      showToast('error', e.message || 'Erreur');
    }
    setSaving(false);
  };

  const handleCreateCycle = async () => {
    if (!cycleForm.name) { showToast('error', 'Le nom est requis'); return; }
    setSaving(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from('cycles').insert({
        name: cycleForm.name,
        description: cycleForm.description || null,
        school_id: user!.schoolId,
        order_index: cycles.length,
      });
      if (error) throw error;
      showToast('success', 'Cycle créé');
      setShowForm(false);
      setCycleForm({ name: '', description: '' });
      loadAll();
    } catch (e: any) {
      showToast('error', e.message || 'Erreur');
    }
    setSaving(false);
  };

  const handleCreateLevel = async () => {
    if (!levelForm.name) { showToast('error', 'Le nom est requis'); return; }
    setSaving(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from('levels').insert({
        name: levelForm.name,
        cycle_id: levelForm.cycle_id || null,
        school_id: user!.schoolId,
        order_index: levels.length,
      });
      if (error) throw error;
      showToast('success', 'Niveau créé');
      setShowForm(false);
      setLevelForm({ name: '', cycle_id: '' });
      loadAll();
    } catch (e: any) {
      showToast('error', e.message || 'Erreur');
    }
    setSaving(false);
  };

  const handleDelete = async (table: string, id: string) => {
    if (!confirm('Confirmer la suppression ?')) return;
    setSaving(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      showToast('success', 'Supprimé');
      loadAll();
    } catch (e: any) {
      showToast('error', e.message || 'Erreur de suppression');
    }
    setSaving(false);
  };

  const handleEdit = async (table: string, id: string) => {
    setSaving(true);
    try {
      const supabase = getSupabase();
      const { id: _id, school_id: _sid, created_at: _ca, updated_at: _ua, ...updatePayload } = editForm;
      const { error } = await supabase.from(table).update(updatePayload).eq('id', id);
      if (error) throw error;
      showToast('success', 'Modifié');
      setEditingId(null);
      loadAll();
    } catch (e: any) {
      showToast('error', e.message || 'Erreur');
    }
    setSaving(false);
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={28} className="animate-spin text-[#4F46E5]" />
      </div>
    );
  }

  const tabs = [
    { id: 'classes' as const, label: 'Classes', icon: Users, count: classes.length },
    { id: 'subjects' as const, label: 'Matières', icon: BookOpen, count: subjects.length },
    { id: 'levels' as const, label: 'Niveaux & Cycles', icon: Layers, count: levels.length + cycles.length },
  ];

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
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setShowForm(false); setEditingId(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-50 text-[#4F46E5] border border-indigo-200'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
            <span className={`px-1.5 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-indigo-100' : 'bg-slate-100'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* CLASSES TAB */}
      {activeTab === 'classes' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#111827]">Classes de l&apos;établissement</h3>
            <button
              onClick={() => { setShowForm(!showForm); setEditingId(null); }}
              className="flex items-center gap-1 px-3 py-2 bg-[#4F46E5] text-white text-sm font-medium rounded-lg hover:bg-[#4338ca]"
            >
              <Plus size={14} /> Nouvelle classe
            </button>
          </div>

          {showForm && activeTab === 'classes' && (
            <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Nom (ex: 6ème A)"
                  value={classForm.name}
                  onChange={e => setClassForm(p => ({ ...p, name: e.target.value }))}
                  className="px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                />
                <input
                  type="text"
                  placeholder="Niveau (ex: 6ème)"
                  value={classForm.level}
                  onChange={e => setClassForm(p => ({ ...p, level: e.target.value }))}
                  className="px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                />
                <input
                  type="text"
                  placeholder="Filière (optionnel)"
                  value={classForm.stream}
                  onChange={e => setClassForm(p => ({ ...p, stream: e.target.value }))}
                  className="px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Capacité"
                    value={classForm.capacity}
                    onChange={e => setClassForm(p => ({ ...p, capacity: Number(e.target.value) }))}
                    className="flex-1 px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                  />
                  <button
                    onClick={handleCreateClass}
                    disabled={saving}
                    className="px-4 py-2.5 bg-[#4F46E5] text-white rounded-lg text-sm font-medium hover:bg-[#4338ca] disabled:opacity-50"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {classes.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-8">Aucune classe. Créez votre première classe.</p>
            )}
            {classes.map(cls => (
              <div key={cls.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 hover:border-slate-200 transition-colors group">
                {editingId === cls.id ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      value={editForm.name || ''}
                      onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                      className="flex-1 px-3 py-2 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                    />
                    <input
                      type="text"
                      value={editForm.level || ''}
                      onChange={e => setEditForm(p => ({ ...p, level: e.target.value }))}
                      className="w-28 px-3 py-2 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                    />
                    <input
                      type="number"
                      value={editForm.capacity || 50}
                      onChange={e => setEditForm(p => ({ ...p, capacity: Number(e.target.value) }))}
                      className="w-20 px-3 py-2 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                    />
                    <button onClick={() => handleEdit('classes', cls.id)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                      <Save size={14} />
                    </button>
                    <button onClick={() => setEditingId(null)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                        <GraduationCap size={18} className="text-[#4F46E5]" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-[#111827]">{cls.name}</p>
                        <p className="text-xs text-slate-500">
                          {cls.level || 'Sans niveau'} {cls.stream ? `• ${cls.stream}` : ''} • {cls.studentCount || 0}/{cls.capacity} élèves
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEdit(cls)} className="p-2 text-slate-400 hover:text-[#4F46E5] hover:bg-indigo-50 rounded-lg">
                        <Edit3 size={14} />
                      </button>
                      <button onClick={() => handleDelete('classes', cls.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBJECTS TAB */}
      {activeTab === 'subjects' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#111827]">Matières enseignées</h3>
            <button
              onClick={() => { setShowForm(!showForm); setEditingId(null); }}
              className="flex items-center gap-1 px-3 py-2 bg-[#4F46E5] text-white text-sm font-medium rounded-lg hover:bg-[#4338ca]"
            >
              <Plus size={14} /> Nouvelle matière
            </button>
          </div>

          {showForm && activeTab === 'subjects' && (
            <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Nom de la matière"
                  value={subjectForm.name}
                  onChange={e => setSubjectForm(p => ({ ...p, name: e.target.value }))}
                  className="px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                />
                <input
                  type="number"
                  placeholder="Coefficient"
                  min={0.5}
                  step={0.5}
                  value={subjectForm.coefficient}
                  onChange={e => setSubjectForm(p => ({ ...p, coefficient: Number(e.target.value) }))}
                  className="px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                />
                <button
                  onClick={handleCreateSubject}
                  disabled={saving}
                  className="px-4 py-2.5 bg-[#4F46E5] text-white rounded-lg text-sm font-medium hover:bg-[#4338ca] disabled:opacity-50"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : 'Créer'}
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {subjects.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-8">Aucune matière. Ajoutez vos premières matières.</p>
            )}
            {subjects.map(subj => (
              <div key={subj.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 hover:border-slate-200 transition-colors group">
                {editingId === subj.id ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      value={editForm.name || ''}
                      onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                      className="flex-1 px-3 py-2 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                    />
                    <input
                      type="number"
                      value={editForm.coefficient || 1}
                      onChange={e => setEditForm(p => ({ ...p, coefficient: Number(e.target.value) }))}
                      className="w-20 px-3 py-2 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                    />
                    <button onClick={() => handleEdit('subjects', subj.id)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                      <Save size={14} />
                    </button>
                    <button onClick={() => setEditingId(null)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                        <BookOpen size={18} className="text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-[#111827]">{subj.name}</p>
                        <p className="text-xs text-slate-500">Coefficient {subj.coefficient}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEdit(subj)} className="p-2 text-slate-400 hover:text-[#4F46E5] hover:bg-indigo-50 rounded-lg">
                        <Edit3 size={14} />
                      </button>
                      <button onClick={() => handleDelete('subjects', subj.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LEVELS & CYCLES TAB */}
      {activeTab === 'levels' && (
        <div className="space-y-6">
          {/* Cycles */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#111827]">Cycles</h3>
              <button
                onClick={() => { setShowForm(!showForm); setEditingId(null); }}
                className="flex items-center gap-1 px-3 py-2 bg-[#4F46E5] text-white text-sm font-medium rounded-lg hover:bg-[#4338ca]"
              >
                <Plus size={14} /> Nouveau cycle
              </button>
            </div>

            {showForm && activeTab === 'levels' && (
              <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Nom du cycle (ex: Collège)"
                    value={cycleForm.name}
                    onChange={e => setCycleForm(p => ({ ...p, name: e.target.value }))}
                    className="px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Description (optionnel)"
                    value={cycleForm.description}
                    onChange={e => setCycleForm(p => ({ ...p, description: e.target.value }))}
                    className="px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                  />
                  <button
                    onClick={handleCreateCycle}
                    disabled={saving}
                    className="px-4 py-2.5 bg-[#4F46E5] text-white rounded-lg text-sm font-medium hover:bg-[#4338ca] disabled:opacity-50"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : 'Créer'}
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {cycles.map(cycle => (
                <div key={cycle.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 group">
                  {editingId === cycle.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                        className="flex-1 px-3 py-2 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                      />
                      <button onClick={() => handleEdit('cycles', cycle.id)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                        <Save size={14} />
                      </button>
                      <button onClick={() => setEditingId(null)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                          <Layers size={18} className="text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-[#111827]">{cycle.name}</p>
                          {cycle.description && <p className="text-xs text-slate-500">{cycle.description}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => startEdit(cycle)} className="p-2 text-slate-400 hover:text-[#4F46E5] hover:bg-indigo-50 rounded-lg">
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => handleDelete('cycles', cycle.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {cycles.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4">Aucun cycle configuré.</p>
              )}
            </div>
          </div>

          {/* Levels */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#111827]">Niveaux</h3>
              <button
                onClick={() => { setShowForm(true); setEditingId(null); }}
                className="flex items-center gap-1 px-3 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700"
              >
                <Plus size={14} /> Nouveau niveau
              </button>
            </div>

            {showForm && activeTab === 'levels' && (
              <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Nom du niveau (ex: 6ème)"
                    value={levelForm.name}
                    onChange={e => setLevelForm(p => ({ ...p, name: e.target.value }))}
                    className="px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                  />
                  <select
                    value={levelForm.cycle_id}
                    onChange={e => setLevelForm(p => ({ ...p, cycle_id: e.target.value }))}
                    className="px-3 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                  >
                    <option value="">Sans cycle</option>
                    {cycles.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={handleCreateLevel}
                    disabled={saving}
                    className="px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-50"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : 'Créer'}
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {levels.map(level => {
                const cycle = cycles.find(c => c.id === level.cycle_id);
                return (
                  <div key={level.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 group">
                    {editingId === level.id ? (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={editForm.name || ''}
                          onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                          className="flex-1 px-3 py-2 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                        />
                        <select
                          value={editForm.cycle_id || ''}
                          onChange={e => setEditForm(p => ({ ...p, cycle_id: e.target.value }))}
                          className="px-3 py-2 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm"
                        >
                          <option value="">Sans cycle</option>
                          {cycles.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                        <button onClick={() => handleEdit('levels', level.id)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                          <Save size={14} />
                        </button>
                        <button onClick={() => setEditingId(null)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                            <GraduationCap size={18} className="text-amber-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-[#111827]">{level.name}</p>
                            {cycle && <p className="text-xs text-slate-500">Cycle: {cycle.name}</p>}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => startEdit(level)} className="p-2 text-slate-400 hover:text-[#4F46E5] hover:bg-indigo-50 rounded-lg">
                            <Edit3 size={14} />
                          </button>
                          <button onClick={() => handleDelete('levels', level.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
              {levels.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4">Aucun niveau configuré.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
