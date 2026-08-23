import { withSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

const UpdateSchema = z.object({
  title: z.string().min(1, 'Titre requis').max(255, 'Titre trop long').optional(),
  description: z.string().max(2000, 'Description trop longue').optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const id = req.nextUrl.pathname.split('/').filter(Boolean).pop();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: record, error } = await supabase
    .from('referrals')
    .select('*, student:students(id, first_name, last_name, matricule)')
    .eq('id', id).eq('school_id', ctx.schoolId)
    .single();

  if (error || !record) return Response.json({ error: 'Orientation introuvable' }, { status: 404 });

  return Response.json(record);
});

export const PUT = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const id = req.nextUrl.pathname.split('/').filter(Boolean).pop();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
  if (!['INFIRMIER', 'ADMIN', 'SUPER_ADMIN', 'DIRECTEUR'].includes(profile?.role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const body = await req.json();
  const validation = UpdateSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const updateData: Record<string, unknown> = {};
  const data = validation.data;
  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.priority !== undefined) updateData.priority = data.priority;
  if (data.metadata !== undefined) updateData.metadata = data.metadata;

  if (Object.keys(updateData).length === 0) {
    return Response.json({ error: 'Aucun champ à modifier' }, { status: 400 });
  }

  updateData.updated_at = new Date().toISOString();

  const { data: record, error } = await supabase
    .from('referrals')
    .update(updateData)
    .eq('id', id).eq('school_id', ctx.schoolId)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json(record);
});

export const DELETE = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const id = req.nextUrl.pathname.split('/').filter(Boolean).pop();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
  if (!['SUPER_ADMIN', 'ADMIN'].includes(profile?.role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const { error } = await supabase.from('referrals').delete().eq('id', id).eq('school_id', ctx.schoolId);

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json({ success: true });
});
