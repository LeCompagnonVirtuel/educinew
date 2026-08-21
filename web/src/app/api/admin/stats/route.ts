import { withSupabase } from '@supabase/server';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase
    .from('users')
    .select('role, school_id')
    .eq('id', user.id)
    .single();

  const role = profile?.role;
  const schoolId = profile?.school_id;

  if (!['ADMIN', 'SUPER_ADMIN'].includes(role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  if (role === 'ADMIN' && !schoolId) {
    return Response.json({ error: 'Établissement requis' }, { status: 403 });
  }

  const adminOnly = role === 'SUPER_ADMIN' && !schoolId;

  const [students, teachers, classes, payments] = await Promise.all([
    adminOnly
      ? supabase.from('students').select('id', { count: 'exact', head: true })
      : supabase.from('students').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
    adminOnly
      ? supabase.from('teachers').select('id', { count: 'exact', head: true })
      : supabase.from('teachers').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
    adminOnly
      ? supabase.from('classes').select('id', { count: 'exact', head: true })
      : supabase.from('classes').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
    adminOnly
      ? supabase.from('payments').select('amount, status')
      : supabase.from('payments').select('amount, status').eq('school_id', schoolId),
  ]);

  const totalPayments = (payments.data as any[])?.reduce((s, p) => s + (p.status === 'COMPLETED' ? p.amount : 0), 0) || 0;
  const pendingPayments = (payments.data as any[])?.reduce((s, p) => s + (p.status === 'PENDING' ? p.amount : 0), 0) || 0;

  return Response.json({
    studentsCount: students.count || 0,
    teachersCount: teachers.count || 0,
    classesCount: classes.count || 0,
    totalPayments,
    pendingPayments,
  });
});
