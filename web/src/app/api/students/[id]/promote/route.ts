import { withSupabase } from '@supabase/server';
import { PromotionStudentSchema } from '@/features/students/validators';

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
  const validation = PromotionStudentSchema.safeParse({ ...body, studentId: id });
  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const { data: student } = await supabase.from('students').select('id, school_id, class_id').eq('id', id).single();
  if (!student) return Response.json({ error: 'Élève introuvable' }, { status: 404 });
  if (student.school_id !== profile?.school_id) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const { type, toClassId, average, notes } = validation.data;
  const description = type === 'PROMOTION' ? 'Élève promu' : 'Élève en répétition';

  await supabase.from('students').update({ class_id: toClassId, updated_at: new Date().toISOString() }).eq('id', id);

  await supabase.from('student_timeline').insert({
    student_id: id,
    school_id: profile?.school_id,
    type: type === 'PROMOTION' ? 'PROMOTION' : 'REPETITION',
    description,
    details: { fromClassId: student.class_id, toClassId, type, average, notes },
    created_by: user.id,
  });

  return Response.json({ success: true, type, toClassId });
});
