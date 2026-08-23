import { withSupabase } from '@/lib/supabase/server';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).at(-2);

  const { data: student, error } = await supabase
    .from('students')
    .select('id, matricule, first_name, last_name, date_of_birth, gender, photo_url, class:classes(name, level), school:schools(name, logo_url, address, phone)')
    .eq('id', id)
    .single();

  if (error || !student) return Response.json({ error: 'Élève introuvable' }, { status: 404 });

  return Response.json({
    studentId: student.id,
    matricule: student.matricule,
    firstName: student.first_name,
    lastName: student.last_name,
    dateOfBirth: student.date_of_birth,
    gender: student.gender,
    photoUrl: student.photo_url,
    className: (student.class as any)?.name,
    level: (student.class as any)?.level,
    schoolName: (student.school as any)?.name,
    schoolLogo: (student.school as any)?.logo_url,
    schoolAddress: (student.school as any)?.address,
    schoolPhone: (student.school as any)?.phone,
  });
});
