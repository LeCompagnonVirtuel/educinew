import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const UpdateSubjectSchema = z.object({
  name: z.string().min(1).optional(),
  code: z.string().optional(),
  coefficient: z.number().positive().optional(),
  departmentId: z.string().uuid().optional(),
  levelId: z.string().uuid().optional(),
  academicYearId: z.string().uuid().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
});

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).pop();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: subject, error } = await supabase
    .from('subjects')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !subject) return Response.json({ error: 'Matière introuvable' }, { status: 404 });

  return Response.json(subject);
});

export const PATCH = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).pop();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  if (!['SUPER_ADMIN', 'ADMIN'].includes(profile?.role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const body = await req.json();
  const validation = UpdateSubjectSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const updateData: Record<string, unknown> = {};
  const data = validation.data;
  if (data.name !== undefined) updateData.name = data.name;
  if (data.code !== undefined) updateData.code = data.code || null;
  if (data.coefficient !== undefined) updateData.coefficient = data.coefficient || null;
  if (data.departmentId !== undefined) updateData.department_id = data.departmentId || null;
  if (data.levelId !== undefined) updateData.level_id = data.levelId || null;
  if (data.academicYearId !== undefined) updateData.academic_year_id = data.academicYearId || null;
  if (data.description !== undefined) updateData.description = data.description || null;
  if (data.status !== undefined) updateData.status = data.status;

  if (Object.keys(updateData).length === 0) {
    return Response.json({ error: 'Aucun champ à modifier' }, { status: 400 });
  }

  updateData.updated_at = new Date().toISOString();

  const { data: subject, error } = await supabase
    .from('subjects')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json(subject);
});

export const DELETE = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).pop();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  if (!['SUPER_ADMIN', 'ADMIN'].includes(profile?.role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const { data: subject } = await supabase.from('subjects').select('id, school_id').eq('id', id).single();
  if (!subject) return Response.json({ error: 'Matière introuvable' }, { status: 404 });
  if (subject.school_id !== profile?.school_id) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const { error } = await supabase.from('subjects').delete().eq('id', id);

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json({ success: true });
});
