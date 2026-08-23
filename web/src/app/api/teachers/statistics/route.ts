import { withSupabase } from '@/lib/supabase/server';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const { data: teachers } = await supabase
    .from('teachers')
    .select('status, gender, employment_type, contract_type, speciality, grade, department_id, hire_date, salary')
    .eq('school_id', schoolId);

  const list = teachers || [];
  const active = list.filter((t: any) => t.status === 'ACTIVE');
  const now = new Date();

  const byGender: Record<string, number> = {};
  const byContractType: Record<string, number> = {};
  const bySpeciality: Record<string, number> = {};
  const byGrade: Record<string, number> = {};
  let totalSalary = 0;
  let totalSeniority = 0;

  for (const t of list) {
    const g = t.gender || 'UNKNOWN';
    byGender[g] = (byGender[g] || 0) + 1;
    const ct = t.contract_type || 'UNKNOWN';
    byContractType[ct] = (byContractType[ct] || 0) + 1;
    const sp = t.speciality || 'NON_DÉFINI';
    bySpeciality[sp] = (bySpeciality[sp] || 0) + 1;
    const gr = t.grade || 'NON_DÉFINI';
    byGrade[gr] = (byGrade[gr] || 0) + 1;
    if (t.salary) totalSalary += t.salary;
    if (t.hire_date) {
      const hireDate = new Date(t.hire_date);
      totalSeniority += (now.getTime() - hireDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
    }
  }

  return Response.json({
    schoolId,
    totalTeachers: list.length,
    activeTeachers: active.length,
    inactiveTeachers: list.length - active.length,
    onLeave: list.filter((t: any) => t.status === 'ON_LEAVE').length,
    byGender,
    byContractType,
    bySpeciality,
    byDepartment: {},
    byGrade,
    averageSeniority: list.length > 0 ? Math.round(totalSeniority / list.length * 10) / 10 : 0,
    averageSalary: active.length > 0 ? Math.round(totalSalary / active.length) : 0,
    totalHoursPerWeek: 0,
    leaveApprovalRate: 0,
    averageEvaluationScore: 0,
  });
});
