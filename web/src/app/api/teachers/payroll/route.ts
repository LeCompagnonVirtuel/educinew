import { withSupabase } from '@/lib/supabase/server';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const url = new URL(req.url);
  const teacherId = url.searchParams.get('teacherId');

  let query = supabase
    .from('teachers')
    .select('id, first_name, last_name, matricule, salary, hourly_rate, contract_type, max_weekly_hours')
    .eq('school_id', schoolId)
    .eq('status', 'ACTIVE');

  if (teacherId) {
    query = query.eq('id', teacherId);
  }

  const { data: teachers } = await query;

  const payroll = (teachers || []).map((t: any) => ({
    teacherId: t.id,
    teacherName: `${t.first_name} ${t.last_name}`,
    matricule: t.matricule,
    baseSalary: t.salary || 0,
    overtimePay: 0,
    bonuses: 0,
    deductions: 0,
    netPay: t.salary || 0,
    contractType: t.contract_type,
    hoursWorked: 0,
    overtimeHours: 0,
  }));

  return Response.json(payroll);
});
