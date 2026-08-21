import { withSupabase } from '@supabase/server';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).at(-2);
  const type = url.searchParams.get('type') || 'GENERAL';

  const { data: student, error } = await supabase
    .from('students')
    .select('id, matricule, first_name, last_name, school_id, schools(name)')
    .eq('id', id)
    .single();

  if (error || !student) return Response.json({ error: 'Élève introuvable' }, { status: 404 });

  const qrData = {
    studentId: student.id,
    matricule: student.matricule,
    firstName: student.first_name,
    lastName: student.last_name,
    schoolId: student.school_id,
    schoolName: (student.schools as any)?.name,
    type,
    generatedAt: new Date().toISOString(),
  };

  return Response.json({
    qrData: JSON.stringify(qrData),
    type,
    studentId: student.id,
  });
});
