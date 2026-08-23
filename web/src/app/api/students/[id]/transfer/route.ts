import { withSupabase } from '@/lib/supabase/server';
import { TransferStudentSchema } from '@/features/students/validators';

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  if (!['SUPER_ADMIN', 'ADMIN'].includes(profile?.role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).at(-2);

  const body = await req.json();
  const validation = TransferStudentSchema.safeParse({ ...body, studentId: id });
  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const { data: student } = await supabase.from('students').select('id, school_id').eq('id', id).eq('school_id', ctx.schoolId).single();
  if (!student) return Response.json({ error: 'Élève introuvable' }, { status: 404 });
  if (student.school_id !== profile?.school_id) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const { toSchoolId, reason, transferDate, notes } = validation.data;

  const { error } = await supabase
    .from('students')
    .update({
      status: 'TRANSFERRED',
      is_active: false,
      transfer_school_id: toSchoolId,
      transfer_date: transferDate,
      transfer_reason: reason,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) return Response.json({ error: error.message }, { status: 400 });

  await supabase.from('student_timeline').insert({
    student_id: id,
    school_id: profile?.school_id,
    type: 'TRANSFER',
    description: 'Élève transféré',
    details: { toSchoolId, reason, transferDate, notes },
    created_by: user.id,
  });

  return Response.json({ success: true });
});
