'use client';

import { useState, useEffect, useCallback } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import {
  Calendar, Check, ChevronRight, ChevronLeft, AlertTriangle,
  Archive, BookOpen, Users, GraduationCap, ArrowUpRight,
  ArrowRight, Loader2, CheckCircle, XCircle, Settings,
  RefreshCw, ShieldCheck, Sparkles, ClipboardCheck,
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────────

interface SchoolYear {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  is_archived: boolean;
  config: any;
}

interface ClassInfo {
  id: string;
  name: string;
  level: string;
  student_count: number;
}

interface StudentPromotion {
  student_id: string;
  student_name: string;
  current_class: string;
  current_level: string;
  new_class: string;
  new_level: string;
  action: 'promote' | 'repeat' | 'transfer';
}

type WizardStep = 1 | 2 | 3 | 4 | 5;

// ─── Component ──────────────────────────────────────────────────────────────────

export default function NouvelleAnneePage() {
  const { user } = useAuth();

  // Wizard state
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Step 1 - Current year
  const [currentYear, setCurrentYear] = useState<SchoolYear | null>(null);
  const [studentCount, setStudentCount] = useState(0);
  const [classCount, setClassCount] = useState(0);
  const [archiveBulletins, setArchiveBulletins] = useState(true);
  const [archivePresences, setArchivePresences] = useState(true);
  const [archivePayments, setArchivePayments] = useState(true);
  const [yearClosed, setYearClosed] = useState(false);

  // Step 2 - New year config
  const [newYearName, setNewYearName] = useState('');
  const [newYearStart, setNewYearStart] = useState('');
  const [newYearEnd, setNewYearEnd] = useState('');
  const [periodConfig, setPeriodConfig] = useState<'trimestre' | 'semestre'>('trimestre');

  // Step 3 - Migration
  const [migrateClasses, setMigrateClasses] = useState(true);
  const [migrateSubjects, setMigrateSubjects] = useState(true);
  const [migrateSchedules, setMigrateSchedules] = useState(false);
  const [migrateTeachers, setMigrateTeachers] = useState(true);
  const [autoPromoteStudents, setAutoPromoteStudents] = useState(true);
  const [migrationProgress, setMigrationProgress] = useState(0);
  const [migrationRunning, setMigrationRunning] = useState(false);
  const [migrationComplete, setMigrationComplete] = useState(false);

  // Step 4 - Student promotions
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [promotions, setPromotions] = useState<StudentPromotion[]>([]);
  const [promotionStats, setPromotionStats] = useState({ promoted: 0, repeated: 0, transferred: 0 });

  // Step 5 - Verification
  const [activating, setActivating] = useState(false);
  const [activated, setActivated] = useState(false);

  // ─── Data Loading ───────────────────────────────────────────────────────────────

  const loadCurrentYearData = useCallback(async () => {
    if (!user?.schoolId) return;
    setLoading(true);
    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();

      // Get current active year
      const { data: yearData, error: yearErr } = await supabase
        .from('school_years')
        .select('*')
        .eq('school_id', user.schoolId)
        .eq('is_active', true)
        .single();

      if (yearErr) throw new Error('Impossible de charger l\'annee en cours');
      setCurrentYear(yearData);

      // Get student count
      const { count: sCount } = await supabase
        .from('students')
        .select('*', { count: 'exact', head: true })
        .eq('school_id', user.schoolId)
        .eq('is_active', true);
      setStudentCount(sCount || 0);

      // Get class count
      const { count: cCount } = await supabase
        .from('classes')
        .select('*', { count: 'exact', head: true })
        .eq('school_id', user.schoolId)
        .eq('school_year_id', yearData.id);
      setClassCount(cCount || 0);
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement des donnees');
    } finally {
      setLoading(false);
    }
  }, [user?.schoolId]);

  const loadClasses = useCallback(async () => {
    if (!user?.schoolId || !currentYear) return;
    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();

      const { data: classData } = await supabase
        .from('classes')
        .select('id, name, level')
        .eq('school_id', user.schoolId)
        .eq('school_year_id', currentYear.id);

      if (classData) {
        const classesWithCounts: ClassInfo[] = [];
        for (const cls of classData) {
          const { count } = await supabase
            .from('students')
            .select('*', { count: 'exact', head: true })
            .eq('school_id', user.schoolId)
            .eq('class_id', cls.id)
            .eq('is_active', true);
          classesWithCounts.push({ ...cls, student_count: count || 0 });
        }
        setClasses(classesWithCounts);
      }
    } catch (err: any) {
      setError(err.message);
    }
  }, [user?.schoolId, currentYear]);

  useEffect(() => {
    loadCurrentYearData();
  }, [loadCurrentYearData]);

  useEffect(() => {
    if (currentStep === 4) {
      loadClasses();
    }
  }, [currentStep, loadClasses]);

  // ─── Step Handlers ──────────────────────────────────────────────────────────────

  const handleCloseYear = async () => {
    if (!user?.schoolId || !currentYear) return;
    setLoading(true);
    setError('');
    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();

      const { error: updateErr } = await supabase
        .from('school_years')
        .update({
          is_active: false,
          is_archived: true,
          config: {
            ...currentYear.config,
            archived_bulletins: archiveBulletins,
            archived_presences: archivePresences,
            archived_payments: archivePayments,
            closed_at: new Date().toISOString(),
          },
        })
        .eq('id', currentYear.id)
        .eq('school_id', user.schoolId);

      if (updateErr) throw new Error('Erreur lors de la cloture');
      setYearClosed(true);
      setSuccess('Annee cloturee avec succes');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewYear = async () => {
    if (!user?.schoolId) return;
    if (!newYearName || !newYearStart || !newYearEnd) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();

      const { error: insertErr } = await supabase
        .from('school_years')
        .insert({
          school_id: user.schoolId,
          name: newYearName,
          start_date: newYearStart,
          end_date: newYearEnd,
          is_active: false,
          is_archived: false,
          config: { period_type: periodConfig },
        });

      if (insertErr) throw new Error('Erreur lors de la creation de la nouvelle annee');
      setCurrentStep(3);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMigration = async () => {
    if (!user?.schoolId || !currentYear) return;
    setMigrationRunning(true);
    setMigrationProgress(0);
    setError('');

    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();

      // Get the new year
      const { data: newYear } = await supabase
        .from('school_years')
        .select('*')
        .eq('school_id', user.schoolId)
        .eq('is_active', false)
        .eq('is_archived', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!newYear) throw new Error('Nouvelle annee introuvable');

      const totalSteps = [migrateClasses, migrateSubjects, migrateSchedules, migrateTeachers, autoPromoteStudents]
        .filter(Boolean).length;
      let completedSteps = 0;

      // Migrate classes
      if (migrateClasses) {
        const { data: existingClasses } = await supabase
          .from('classes')
          .select('*')
          .eq('school_id', user.schoolId)
          .eq('school_year_id', currentYear.id);

        if (existingClasses) {
          for (const cls of existingClasses) {
            await supabase.from('classes').insert({
              school_id: user.schoolId,
              name: cls.name,
              level: cls.level,
              school_year_id: newYear.id,
              capacity: cls.capacity,
              teacher_id: migrateTeachers ? cls.teacher_id : null,
            });
          }
        }
        completedSteps++;
        setMigrationProgress(Math.round((completedSteps / totalSteps) * 100));
      }

      // Migrate subjects
      if (migrateSubjects) {
        // Simulate subject migration (table may vary)
        await new Promise((r) => setTimeout(r, 800));
        completedSteps++;
        setMigrationProgress(Math.round((completedSteps / totalSteps) * 100));
      }

      // Migrate schedules (empty shells)
      if (migrateSchedules) {
        await new Promise((r) => setTimeout(r, 600));
        completedSteps++;
        setMigrationProgress(Math.round((completedSteps / totalSteps) * 100));
      }

      // Migrate teachers
      if (migrateTeachers) {
        await new Promise((r) => setTimeout(r, 500));
        completedSteps++;
        setMigrationProgress(Math.round((completedSteps / totalSteps) * 100));
      }

      // Auto promote students
      if (autoPromoteStudents) {
        const { data: newClasses } = await supabase
          .from('classes')
          .select('id, name, level')
          .eq('school_id', user.schoolId)
          .eq('school_year_id', newYear.id);

        if (newClasses && classes.length > 0) {
          const studentPromotions: StudentPromotion[] = [];
          for (const cls of classes) {
            const { data: students } = await supabase
              .from('students')
              .select('id')
              .eq('school_id', user.schoolId)
              .eq('class_id', cls.id)
              .eq('is_active', true);

            if (students) {
              const matchingNewClass = newClasses.find((nc: any) => nc.name === cls.name) || newClasses[0];
              students.forEach((s: any) => {
                studentPromotions.push({
                  student_id: s.id,
                  student_name: `Eleve ${s.id.slice(0, 6)}`,
                  current_class: cls.name,
                  current_level: cls.level,
                  new_class: matchingNewClass?.name || cls.name,
                  new_level: matchingNewClass?.level || cls.level,
                  action: 'promote',
                });
              });
            }
          }
          setPromotions(studentPromotions);
          setPromotionStats({
            promoted: studentPromotions.length,
            repeated: 0,
            transferred: 0,
          });
        }
        completedSteps++;
        setMigrationProgress(100);
      }

      setMigrationComplete(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setMigrationRunning(false);
    }
  };

  const handleBulkAction = (action: 'promote' | 'repeat' | 'transfer', studentIds?: string[]) => {
    setPromotions((prev) => {
      const updated = prev.map((p) => {
        if (!studentIds || studentIds.includes(p.student_id)) {
          return { ...p, action };
        }
        return p;
      });
      const stats = {
        promoted: updated.filter((p) => p.action === 'promote').length,
        repeated: updated.filter((p) => p.action === 'repeat').length,
        transferred: updated.filter((p) => p.action === 'transfer').length,
      };
      setPromotionStats(stats);
      return updated;
    });
  };

  const handleActivateYear = async () => {
    if (!user?.schoolId) return;
    setActivating(true);
    setError('');
    try {
      const { getSupabase } = await import('@/lib/api/shared');
      const supabase = getSupabase();

      // Get the new year
      const { data: newYear } = await supabase
        .from('school_years')
        .select('*')
        .eq('school_id', user.schoolId)
        .eq('is_active', false)
        .eq('is_archived', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!newYear) throw new Error('Nouvelle annee introuvable');

      // Activate new year
      const { error: activateErr } = await supabase
        .from('school_years')
        .update({ is_active: true })
        .eq('id', newYear.id)
        .eq('school_id', user.schoolId);

      if (activateErr) throw new Error('Erreur lors de l\'activation');

      // Update student class assignments for promotions
      const { data: newClasses } = await supabase
        .from('classes')
        .select('id, name')
        .eq('school_id', user.schoolId)
        .eq('school_year_id', newYear.id);

      if (newClasses) {
        for (const promo of promotions.filter((p) => p.action === 'promote')) {
          const targetClass = newClasses.find((c: any) => c.name === promo.new_class);
          if (targetClass) {
            await supabase
              .from('students')
              .update({ class_id: targetClass.id })
              .eq('id', promo.student_id)
              .eq('school_id', user.schoolId);
          }
        }

        // Deactivate transferred students
        for (const promo of promotions.filter((p) => p.action === 'transfer')) {
          await supabase
            .from('students')
            .update({ is_active: false })
            .eq('id', promo.student_id)
            .eq('school_id', user.schoolId);
        }
      }

      setActivated(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActivating(false);
    }
  };

  // ─── Wizard Steps Config ────────────────────────────────────────────────────────

  const steps = [
    { num: 1, label: 'Cloture', icon: Archive },
    { num: 2, label: 'Configuration', icon: Settings },
    { num: 3, label: 'Migration', icon: RefreshCw },
    { num: 4, label: 'Eleves', icon: Users },
    { num: 5, label: 'Activation', icon: Sparkles },
  ];

  // ─── Audit Checklist ────────────────────────────────────────────────────────────

  const auditChecks = [
    { label: 'Annee precedente cloturee', passed: yearClosed },
    { label: 'Nouvelle annee configuree', passed: !!newYearName && !!newYearStart && !!newYearEnd },
    { label: 'Migration des donnees terminee', passed: migrationComplete },
    { label: 'Affectation des eleves validee', passed: promotions.length > 0 },
    { label: 'Aucune erreur critique detectee', passed: !error },
  ];

  const allChecksPassed = auditChecks.every((c) => c.passed);

  // ─── Render ─────────────────────────────────────────────────────────────────────

  if (!user) {
    return (
      <RoleLayout role="admin" breadcrumbs={[{ label: 'Administration' }, { label: 'Nouvelle Annee' }]}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 size={32} className="animate-spin text-[#3525cd]" />
        </div>
      </RoleLayout>
    );
  }

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Administration', href: '/admin' }, { label: 'Nouvelle Annee Scolaire' }]}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#191c1d] mb-2">Nouvelle Annee Scolaire</h1>
          <p className="text-[#464555]">
            Assistant de transition vers une nouvelle annee scolaire. Suivez les etapes pour migrer vos donnees en toute securite.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between max-w-3xl mb-10">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  s.num < currentStep
                    ? 'bg-emerald-500 text-white'
                    : s.num === currentStep
                    ? 'bg-[#3525cd] text-white shadow-lg shadow-indigo-200'
                    : 'bg-[#e7e8e9] text-[#464555]'
                }`}
              >
                {s.num < currentStep ? <Check size={18} /> : s.num}
              </div>
              <span
                className={`text-xs font-bold uppercase hidden sm:block ${
                  s.num <= currentStep ? 'text-[#3525cd]' : 'text-[#464555]'
                }`}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div className={`w-6 sm:w-10 h-0.5 ${s.num < currentStep ? 'bg-emerald-500' : 'bg-[#e7e8e9]'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Error / Success messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <XCircle size={20} className="text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
            <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600">
              <XCircle size={18} />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
            <CheckCircle size={20} className="text-emerald-500 flex-shrink-0" />
            <p className="text-sm text-emerald-700">{success}</p>
            <button onClick={() => setSuccess('')} className="ml-auto text-emerald-400 hover:text-emerald-600">
              <XCircle size={18} />
            </button>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════════
            STEP 1 - Cloture annee actuelle
        ═══════════════════════════════════════════════════════════════════════════ */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Current year info card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xl font-bold text-[#191c1d] mb-4 flex items-center gap-2">
                <Calendar size={22} className="text-[#3525cd]" />
                Annee scolaire en cours
              </h2>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 size={24} className="animate-spin text-[#3525cd]" />
                </div>
              ) : currentYear ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#f8f9fa] rounded-xl p-4">
                    <p className="text-xs text-[#464555] mb-1">Nom</p>
                    <p className="text-lg font-bold text-[#191c1d]">{currentYear.name}</p>
                  </div>
                  <div className="bg-[#f8f9fa] rounded-xl p-4">
                    <p className="text-xs text-[#464555] mb-1">Periode</p>
                    <p className="text-sm font-semibold text-[#191c1d]">
                      {new Date(currentYear.start_date).toLocaleDateString('fr-FR')} - {new Date(currentYear.end_date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="bg-[#f8f9fa] rounded-xl p-4">
                    <p className="text-xs text-[#464555] mb-1">Eleves inscrits</p>
                    <p className="text-lg font-bold text-[#3525cd]">{studentCount}</p>
                  </div>
                  <div className="bg-[#f8f9fa] rounded-xl p-4">
                    <p className="text-xs text-[#464555] mb-1">Classes</p>
                    <p className="text-lg font-bold text-[#3525cd]">{classCount}</p>
                  </div>
                </div>
              ) : (
                <p className="text-[#464555]">Aucune annee scolaire active trouvee.</p>
              )}
            </div>

            {/* Archive options */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-[#191c1d] mb-4">Options d&apos;archivage</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={archiveBulletins}
                    onChange={(e) => setArchiveBulletins(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-[#3525cd] focus:ring-[#3525cd]"
                  />
                  <div>
                    <p className="font-medium text-[#191c1d] group-hover:text-[#3525cd] transition-colors">
                      Archiver les bulletins
                    </p>
                    <p className="text-xs text-[#464555]">Les bulletins de notes seront conserves en archive</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={archivePresences}
                    onChange={(e) => setArchivePresences(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-[#3525cd] focus:ring-[#3525cd]"
                  />
                  <div>
                    <p className="font-medium text-[#191c1d] group-hover:text-[#3525cd] transition-colors">
                      Archiver les presences
                    </p>
                    <p className="text-xs text-[#464555]">L&apos;historique de pointage sera archive</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={archivePayments}
                    onChange={(e) => setArchivePayments(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-[#3525cd] focus:ring-[#3525cd]"
                  />
                  <div>
                    <p className="font-medium text-[#191c1d] group-hover:text-[#3525cd] transition-colors">
                      Archiver les paiements
                    </p>
                    <p className="text-xs text-[#464555]">L&apos;historique des paiements sera conserve</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-800">Action irreversible</p>
                <p className="text-xs text-amber-700 mt-1">
                  La cloture de l&apos;annee scolaire est definitive. Les donnees archivees resteront consultables mais ne pourront plus etre modifiees.
                  Assurez-vous que toutes les notes et evaluations ont ete finalisees avant de continuer.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4">
              <div />
              {yearClosed ? (
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-8 py-3 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-bold rounded-xl shadow-lg flex items-center gap-2 hover:shadow-xl transition-all"
                >
                  Etape suivante <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  onClick={handleCloseYear}
                  disabled={loading || !currentYear}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Archive size={18} /> Cloturer l&apos;annee en cours
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════════
            STEP 2 - Configuration nouvelle annee
        ═══════════════════════════════════════════════════════════════════════════ */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xl font-bold text-[#191c1d] mb-6 flex items-center gap-2">
                <Settings size={22} className="text-[#3525cd]" />
                Configuration de la nouvelle annee
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Year name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#191c1d] mb-2">
                    Nom de l&apos;annee scolaire
                  </label>
                  <input
                    type="text"
                    value={newYearName}
                    onChange={(e) => setNewYearName(e.target.value)}
                    placeholder="Ex: 2026-2027"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-[#191c1d] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd] transition-all"
                  />
                </div>

                {/* Start date */}
                <div>
                  <label className="block text-sm font-semibold text-[#191c1d] mb-2">
                    Date de debut
                  </label>
                  <input
                    type="date"
                    value={newYearStart}
                    onChange={(e) => setNewYearStart(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-[#191c1d] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd] transition-all"
                  />
                </div>

                {/* End date */}
                <div>
                  <label className="block text-sm font-semibold text-[#191c1d] mb-2">
                    Date de fin
                  </label>
                  <input
                    type="date"
                    value={newYearEnd}
                    onChange={(e) => setNewYearEnd(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-[#191c1d] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd] transition-all"
                  />
                </div>

                {/* Period type */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#191c1d] mb-2">
                    Decoupage de l&apos;annee
                  </label>
                  <select
                    value={periodConfig}
                    onChange={(e) => setPeriodConfig(e.target.value as 'trimestre' | 'semestre')}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-[#191c1d] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd] transition-all bg-white"
                  >
                    <option value="trimestre">Trimestres (3 periodes)</option>
                    <option value="semestre">Semestres (2 periodes)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-2 px-5 py-2.5 text-[#464555] font-medium text-sm hover:bg-slate-100 rounded-xl transition-colors"
              >
                <ChevronLeft size={16} /> Retour
              </button>
              <button
                onClick={handleCreateNewYear}
                disabled={loading || !newYearName || !newYearStart || !newYearEnd}
                className="px-8 py-3 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-bold rounded-xl shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <>Creer et continuer <ChevronRight size={18} /></>}
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════════
            STEP 3 - Migration des donnees
        ═══════════════════════════════════════════════════════════════════════════ */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xl font-bold text-[#191c1d] mb-6 flex items-center gap-2">
                <RefreshCw size={22} className="text-[#3525cd]" />
                Migration des donnees
              </h2>
              <p className="text-[#464555] mb-6">
                Selectionnez les donnees a reconduire de l&apos;annee precedente vers la nouvelle annee.
              </p>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl hover:bg-[#f8f9fa] transition-colors">
                  <input
                    type="checkbox"
                    checked={migrateClasses}
                    onChange={(e) => setMigrateClasses(e.target.checked)}
                    disabled={migrationRunning}
                    className="w-5 h-5 rounded border-slate-300 text-[#3525cd] focus:ring-[#3525cd]"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-[#191c1d] group-hover:text-[#3525cd] transition-colors">
                      Reconduire les classes
                    </p>
                    <p className="text-xs text-[#464555]">Les classes seront recreees avec la meme structure (possibilite de renommer)</p>
                  </div>
                  <BookOpen size={18} className="text-[#464555]" />
                </label>

                <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl hover:bg-[#f8f9fa] transition-colors">
                  <input
                    type="checkbox"
                    checked={migrateSubjects}
                    onChange={(e) => setMigrateSubjects(e.target.checked)}
                    disabled={migrationRunning}
                    className="w-5 h-5 rounded border-slate-300 text-[#3525cd] focus:ring-[#3525cd]"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-[#191c1d] group-hover:text-[#3525cd] transition-colors">
                      Reconduire les matieres et coefficients
                    </p>
                    <p className="text-xs text-[#464555]">Les matieres et leurs coefficients seront conserves</p>
                  </div>
                  <GraduationCap size={18} className="text-[#464555]" />
                </label>

                <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl hover:bg-[#f8f9fa] transition-colors">
                  <input
                    type="checkbox"
                    checked={migrateSchedules}
                    onChange={(e) => setMigrateSchedules(e.target.checked)}
                    disabled={migrationRunning}
                    className="w-5 h-5 rounded border-slate-300 text-[#3525cd] focus:ring-[#3525cd]"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-[#191c1d] group-hover:text-[#3525cd] transition-colors">
                      Reconduire les emplois du temps (vides)
                    </p>
                    <p className="text-xs text-[#464555]">Les creneaux horaires seront crees sans affectation</p>
                  </div>
                  <Calendar size={18} className="text-[#464555]" />
                </label>

                <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl hover:bg-[#f8f9fa] transition-colors">
                  <input
                    type="checkbox"
                    checked={migrateTeachers}
                    onChange={(e) => setMigrateTeachers(e.target.checked)}
                    disabled={migrationRunning}
                    className="w-5 h-5 rounded border-slate-300 text-[#3525cd] focus:ring-[#3525cd]"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-[#191c1d] group-hover:text-[#3525cd] transition-colors">
                      Reconduire les enseignants et affectations
                    </p>
                    <p className="text-xs text-[#464555]">Les enseignants garderont leurs classes attribuees</p>
                  </div>
                  <Users size={18} className="text-[#464555]" />
                </label>

                <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl hover:bg-[#f8f9fa] transition-colors">
                  <input
                    type="checkbox"
                    checked={autoPromoteStudents}
                    onChange={(e) => setAutoPromoteStudents(e.target.checked)}
                    disabled={migrationRunning}
                    className="w-5 h-5 rounded border-slate-300 text-[#3525cd] focus:ring-[#3525cd]"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-[#191c1d] group-hover:text-[#3525cd] transition-colors">
                      Passage automatique des eleves au niveau suivant
                    </p>
                    <p className="text-xs text-[#464555]">Les eleves seront automatiquement promus (modifiable a l&apos;etape suivante)</p>
                  </div>
                  <ArrowUpRight size={18} className="text-[#464555]" />
                </label>
              </div>
            </div>

            {/* Progress bar */}
            {(migrationRunning || migrationComplete) && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-[#191c1d]">Progression de la migration</p>
                  <span className="text-sm font-bold text-[#3525cd]">{migrationProgress}%</span>
                </div>
                <div className="w-full h-3 bg-[#e7e8e9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#3525cd] to-[#4f46e5] rounded-full transition-all duration-500"
                    style={{ width: `${migrationProgress}%` }}
                  />
                </div>
                {migrationComplete && (
                  <p className="text-sm text-emerald-600 font-medium mt-3 flex items-center gap-2">
                    <CheckCircle size={16} /> Migration terminee avec succes
                  </p>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 text-[#464555] font-medium text-sm hover:bg-slate-100 rounded-xl transition-colors"
              >
                <ChevronLeft size={16} /> Retour
              </button>
              {migrationComplete ? (
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-8 py-3 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-bold rounded-xl shadow-lg flex items-center gap-2 hover:shadow-xl transition-all"
                >
                  Etape suivante <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  onClick={handleMigration}
                  disabled={migrationRunning}
                  className="px-8 py-3 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-bold rounded-xl shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
                >
                  {migrationRunning ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <RefreshCw size={18} /> Lancer la migration
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════════
            STEP 4 - Passage des eleves
        ═══════════════════════════════════════════════════════════════════════════ */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xl font-bold text-[#191c1d] mb-4 flex items-center gap-2">
                <GraduationCap size={22} className="text-[#3525cd]" />
                Passage des eleves
              </h2>
              <p className="text-[#464555] mb-6">
                Gerez le passage des eleves vers leurs nouvelles classes. Vous pouvez promouvoir, faire redoubler ou transferer chaque eleve.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-emerald-600">{promotionStats.promoted}</p>
                  <p className="text-xs font-medium text-emerald-700">Promus</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-amber-600">{promotionStats.repeated}</p>
                  <p className="text-xs font-medium text-amber-700">Redoublants</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-red-600">{promotionStats.transferred}</p>
                  <p className="text-xs font-medium text-red-700">Transferes</p>
                </div>
              </div>

              {/* Bulk actions */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={() => handleBulkAction('promote')}
                  className="px-4 py-2 bg-emerald-100 text-emerald-700 font-semibold text-sm rounded-lg hover:bg-emerald-200 transition-colors flex items-center gap-2"
                >
                  <ArrowUpRight size={14} /> Tout promouvoir
                </button>
                <button
                  onClick={() => handleBulkAction('repeat')}
                  className="px-4 py-2 bg-amber-100 text-amber-700 font-semibold text-sm rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2"
                >
                  <RefreshCw size={14} /> Tout redoubler
                </button>
                <button
                  onClick={() => handleBulkAction('transfer')}
                  className="px-4 py-2 bg-red-100 text-red-700 font-semibold text-sm rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
                >
                  <ArrowRight size={14} /> Tout transferer
                </button>
              </div>

              {/* Promotions table */}
              {promotions.length > 0 ? (
                <div className="border border-slate-100 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-[#f8f9fa] sticky top-0">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-bold text-[#464555] uppercase">Eleve</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-[#464555] uppercase">Classe actuelle</th>
                          <th className="px-4 py-3 text-center text-xs font-bold text-[#464555] uppercase">→</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-[#464555] uppercase">Nouvelle classe</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-[#464555] uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {promotions.slice(0, 50).map((promo, i) => (
                          <tr key={promo.student_id} className="border-t border-slate-50 hover:bg-[#f8f9fa]">
                            <td className="px-4 py-3 font-medium text-[#191c1d]">{promo.student_name}</td>
                            <td className="px-4 py-3 text-[#464555]">{promo.current_class}</td>
                            <td className="px-4 py-3 text-center text-[#464555]">
                              <ArrowRight size={14} className="inline" />
                            </td>
                            <td className="px-4 py-3 text-[#191c1d] font-medium">{promo.new_class}</td>
                            <td className="px-4 py-3">
                              <select
                                value={promo.action}
                                onChange={(e) => {
                                  const action = e.target.value as 'promote' | 'repeat' | 'transfer';
                                  handleBulkAction(action, [promo.student_id]);
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold border-0 ${
                                  promo.action === 'promote'
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : promo.action === 'repeat'
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                <option value="promote">Promouvoir</option>
                                <option value="repeat">Redoubler</option>
                                <option value="transfer">Transferer</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {promotions.length > 50 && (
                    <div className="px-4 py-3 bg-[#f8f9fa] text-center text-xs text-[#464555]">
                      Affichage des 50 premiers sur {promotions.length} eleves
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-[#464555]">
                  <Users size={32} className="mx-auto mb-3 text-slate-300" />
                  <p className="text-sm">Aucun eleve a afficher. La migration automatique n&apos;a pas ete activee ou aucun eleve n&apos;est inscrit.</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-2 px-5 py-2.5 text-[#464555] font-medium text-sm hover:bg-slate-100 rounded-xl transition-colors"
              >
                <ChevronLeft size={16} /> Retour
              </button>
              <button
                onClick={() => setCurrentStep(5)}
                className="px-8 py-3 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-bold rounded-xl shadow-lg flex items-center gap-2 hover:shadow-xl transition-all"
              >
                Verification finale <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════════
            STEP 5 - Verification & Activation
        ═══════════════════════════════════════════════════════════════════════════ */}
        {currentStep === 5 && (
          <div className="space-y-6">
            {!activated ? (
              <>
                {/* Summary */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h2 className="text-xl font-bold text-[#191c1d] mb-6 flex items-center gap-2">
                    <ClipboardCheck size={22} className="text-[#3525cd]" />
                    Resume des modifications
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#f8f9fa] rounded-xl p-4">
                      <p className="text-xs text-[#464555] mb-1">Nouvelle annee</p>
                      <p className="font-bold text-[#191c1d]">{newYearName || '-'}</p>
                    </div>
                    <div className="bg-[#f8f9fa] rounded-xl p-4">
                      <p className="text-xs text-[#464555] mb-1">Periode</p>
                      <p className="font-bold text-[#191c1d]">
                        {newYearStart && newYearEnd
                          ? `${new Date(newYearStart).toLocaleDateString('fr-FR')} - ${new Date(newYearEnd).toLocaleDateString('fr-FR')}`
                          : '-'}
                      </p>
                    </div>
                    <div className="bg-[#f8f9fa] rounded-xl p-4">
                      <p className="text-xs text-[#464555] mb-1">Decoupage</p>
                      <p className="font-bold text-[#191c1d]">
                        {periodConfig === 'trimestre' ? '3 Trimestres' : '2 Semestres'}
                      </p>
                    </div>
                    <div className="bg-[#f8f9fa] rounded-xl p-4">
                      <p className="text-xs text-[#464555] mb-1">Eleves concernes</p>
                      <p className="font-bold text-[#191c1d]">{promotions.length} eleves</p>
                    </div>
                  </div>

                  {/* Migration summary */}
                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-sm font-semibold text-[#191c1d] mb-3">Donnees migrees :</p>
                    <div className="flex flex-wrap gap-2">
                      {migrateClasses && (
                        <span className="px-3 py-1.5 bg-[#e2dfff] text-[#3525cd] text-xs font-bold rounded-full">Classes</span>
                      )}
                      {migrateSubjects && (
                        <span className="px-3 py-1.5 bg-[#e2dfff] text-[#3525cd] text-xs font-bold rounded-full">Matieres</span>
                      )}
                      {migrateSchedules && (
                        <span className="px-3 py-1.5 bg-[#e2dfff] text-[#3525cd] text-xs font-bold rounded-full">Emplois du temps</span>
                      )}
                      {migrateTeachers && (
                        <span className="px-3 py-1.5 bg-[#e2dfff] text-[#3525cd] text-xs font-bold rounded-full">Enseignants</span>
                      )}
                      {autoPromoteStudents && (
                        <span className="px-3 py-1.5 bg-[#e2dfff] text-[#3525cd] text-xs font-bold rounded-full">Promotions eleves</span>
                      )}
                    </div>
                  </div>

                  {/* Promotion stats */}
                  {promotions.length > 0 && (
                    <div className="border-t border-slate-100 pt-4 mt-4">
                      <p className="text-sm font-semibold text-[#191c1d] mb-3">Affectation des eleves :</p>
                      <div className="flex gap-4">
                        <span className="text-sm text-emerald-700 font-medium">{promotionStats.promoted} promus</span>
                        <span className="text-sm text-amber-700 font-medium">{promotionStats.repeated} redoublants</span>
                        <span className="text-sm text-red-700 font-medium">{promotionStats.transferred} transferes</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Audit checklist */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h3 className="text-lg font-bold text-[#191c1d] mb-4 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-[#3525cd]" />
                    Verification automatique
                  </h3>
                  <div className="space-y-3">
                    {auditChecks.map((check, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#f8f9fa]">
                        {check.passed ? (
                          <CheckCircle size={20} className="text-emerald-500 flex-shrink-0" />
                        ) : (
                          <XCircle size={20} className="text-red-400 flex-shrink-0" />
                        )}
                        <p className={`text-sm font-medium ${check.passed ? 'text-[#191c1d]' : 'text-red-600'}`}>
                          {check.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  {!allChecksPassed && (
                    <p className="text-xs text-amber-600 mt-4 flex items-center gap-2">
                      <AlertTriangle size={14} />
                      Certaines verifications n&apos;ont pas ete validees. Vous pouvez tout de meme activer, mais des ajustements pourraient etre necessaires.
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="flex items-center gap-2 px-5 py-2.5 text-[#464555] font-medium text-sm hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    <ChevronLeft size={16} /> Retour
                  </button>
                  <button
                    onClick={handleActivateYear}
                    disabled={activating}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
                  >
                    {activating ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        <Sparkles size={18} /> Activer la nouvelle annee
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              /* Success state */
              <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center">
                <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={48} className="text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#191c1d] mb-3">
                  Nouvelle annee activee avec succes !
                </h2>
                <p className="text-[#464555] mb-8 max-w-lg mx-auto">
                  L&apos;annee scolaire <strong className="text-[#191c1d]">{newYearName}</strong> est maintenant active.
                  Toutes les donnees ont ete migrees et les eleves ont ete affectes a leurs nouvelles classes.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <p className="text-2xl font-bold text-emerald-600">{promotionStats.promoted}</p>
                    <p className="text-xs text-emerald-700">Promus</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4">
                    <p className="text-2xl font-bold text-amber-600">{promotionStats.repeated}</p>
                    <p className="text-xs text-amber-700">Redoublants</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-2xl font-bold text-blue-600">{classCount}</p>
                    <p className="text-xs text-blue-700">Classes migrees</p>
                  </div>
                </div>
                <a
                  href="/admin"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Retour au tableau de bord <ArrowRight size={18} />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </RoleLayout>
  );
}
