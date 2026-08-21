import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const UpdateAttendanceSchema = z.object({
  status: z.enum(['PRESENT', 'ABSENT', 'LATE']).optional(),
  remark: z.string().max(200).nullable().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

export const GET = withSupabase({ auth: 'user' }, async (req, { params }) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const { id } = await params;

  const { data, error } = await supabase
    .from('attendance')
    .select('*, students(id, first_name, last_name, matricule)')
    .eq('id', id)
    .eq('school_id', schoolId)
    .single();

  if (error) return Response.json({ error: 'Présence non trouvée' }, { status: 404 });
  return Response.json(data);
});

export const PATCH = withSupabase({ auth: 'user' }, async (req, { params }) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const role = profile?.role;
  const schoolId = profile?.school_id;

  if (!['ADMIN', 'SUPER_ADMIN', 'TEACHER'].includes(role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const { id } = await params;
  const body = await req.json();
  const validation = UpdateAttendanceSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const updateData = validation.data;
  const { data, error } = await supabase
    .from('attendance')
    .update({ ...updateData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('school_id', schoolId)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json(data);
});

export const DELETE = withSupabase({ auth: 'user' }, async (req, { params }) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const role = profile?.role;
  const schoolId = profile?.school_id;

  if (!['ADMIN', 'SUPER_ADMIN'].includes(role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const { id } = await params;

  const { error } = await supabase
    .from('attendance')
    .delete()
    .eq('id', id)
    .eq('school_id', schoolId);

  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json({ success: true });
});
