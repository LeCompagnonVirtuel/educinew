import { withSupabase } from '@supabase/server';
import { UpdateTeacherSchema } from '@/features/teachers/validators';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).pop();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  if (!profile) return Response.json({ error: 'Profil introuvable' }, { status: 404 });

  const isSuperAdmin = profile.role === 'SUPER_ADMIN';
  const query = supabase
    .from('teachers')
    .select('*, user:users(id, name, email, photo_url), department:teacher_departments(id, name)')
    .eq('id', id);

  if (!isSuperAdmin) {
    query.eq('school_id', profile.school_id);
  }

  const { data: teacher, error } = await query.single();

  if (error || !teacher) return Response.json({ error: 'Enseignant introuvable' }, { status: 404 });

  return Response.json(teacher);
});

export const PATCH = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).pop();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  if (!profile || !['SUPER_ADMIN', 'ADMIN', 'SECRETAIRE'].includes(profile.role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const isSuperAdmin = profile.role === 'SUPER_ADMIN';

  if (!isSuperAdmin) {
    const { data: existing } = await supabase.from('teachers').select('school_id').eq('id', id).single();
    if (!existing || existing.school_id !== profile.school_id) {
      return Response.json({ error: 'Non autorisé' }, { status: 403 });
    }
  }

  const body = await req.json();
  const validation = UpdateTeacherSchema.safeParse(body);

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
  if (data.gender !== undefined) updateData.gender = data.gender;
  if (data.employmentType !== undefined) updateData.employment_type = data.employmentType;
  if (data.contractType !== undefined) updateData.contract_type = data.contractType;
  if (data.grade !== undefined) updateData.grade = data.grade;
  if (data.speciality !== undefined) updateData.speciality = data.speciality;
  if (data.departmentId !== undefined) updateData.department_id = data.departmentId;
  if (data.salary !== undefined) updateData.salary = data.salary;
  if (data.status !== undefined) updateData.status = data.status;

  if (Object.keys(updateData).length === 0) {
    return Response.json({ error: 'Aucun champ à modifier' }, { status: 400 });
  }

  updateData.updated_at = new Date().toISOString();

  const { data: teacher, error } = await supabase
    .from('teachers')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json(teacher);
});

export const DELETE = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).pop();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  if (!profile || !['SUPER_ADMIN', 'ADMIN'].includes(profile.role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  if (profile.role !== 'SUPER_ADMIN') {
    const { data: existing } = await supabase.from('teachers').select('school_id').eq('id', id).single();
    if (!existing || existing.school_id !== profile.school_id) {
      return Response.json({ error: 'Non autorisé' }, { status: 403 });
    }
  }

  const { error } = await supabase.from('teachers').delete().eq('id', id);

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json({ success: true });
});
