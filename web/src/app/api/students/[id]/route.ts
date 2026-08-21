import { withSupabase } from '@supabase/server';
import { UpdateStudentSchema } from '@/features/students/validators';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).pop();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: student, error } = await supabase
    .from('students')
    .select('*, user:users(id, name, email, photo_url), class:classes(id, name, level), parent:users!parent_id(id, name)')
    .eq('id', id)
    .single();

  if (error || !student) return Response.json({ error: 'Élève introuvable' }, { status: 404 });

  return Response.json(student);
});

export const PATCH = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).pop();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
  if (!['SUPER_ADMIN', 'ADMIN', 'SECRETAIRE'].includes(profile?.role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const body = await req.json();
  const validation = UpdateStudentSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const updateData: Record<string, unknown> = {};
  const data = validation.data;
  if (data.firstName !== undefined) updateData.first_name = data.firstName;
  if (data.lastName !== undefined) updateData.last_name = data.lastName;
  if (data.email !== undefined) updateData.email = data.email || null;
  if (data.phone !== undefined) updateData.phone = data.phone || null;
  if (data.dateOfBirth !== undefined) updateData.date_of_birth = data.dateOfBirth || null;
  if (data.gender !== undefined) updateData.gender = data.gender;
  if (data.classId !== undefined) updateData.class_id = data.classId;
  if (data.status !== undefined) updateData.status = data.status;

  if (Object.keys(updateData).length === 0) {
    return Response.json({ error: 'Aucun champ à modifier' }, { status: 400 });
  }

  updateData.updated_at = new Date().toISOString();

  const { data: student, error } = await supabase
    .from('students')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json(student);
});

export const DELETE = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).pop();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
  if (!['SUPER_ADMIN', 'ADMIN'].includes(profile?.role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const { error } = await supabase.from('students').delete().eq('id', id);

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json({ success: true });
});
