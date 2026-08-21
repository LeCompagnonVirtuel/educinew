import { withSupabase } from '@supabase/server';
import { z } from 'zod';
import { validateRequest } from '@/lib/api/validation';

const updateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).nullable().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']).optional(),
});

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).pop();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return Response.json({ error: 'ID invalide' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('skill_taxonomies')
    .select('*')
    .eq('id', id)
    .eq('school_id', schoolId)
    .is('deleted_at', null)
    .single();

  if (error || !data) return Response.json({ error: 'Taxonomie de compétences introuvable' }, { status: 404 });
  return Response.json(data);
});

export const PUT = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).pop();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const role = profile?.role;
  const schoolId = profile?.school_id;

  if (!['ADMIN', 'SUPER_ADMIN', 'DIRECTEUR'].includes(role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return Response.json({ error: 'ID invalide' }, { status: 400 });
  }

  const body = await req.json();
  const validation = validateRequest(updateSchema, body);
  if (!validation.success) {
    return Response.json({ error: validation.error }, { status: 400 });
  }

  const updateData: Record<string, unknown> = { ...validation.data, updated_at: new Date().toISOString() };

  if (Object.keys(validation.data).length === 0) {
    return Response.json({ error: 'Aucun champ à modifier' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('skill_taxonomies')
    .update(updateData)
    .eq('id', id)
    .eq('school_id', schoolId)
    .is('deleted_at', null)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
});

export const DELETE = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).pop();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const role = profile?.role;
  const schoolId = profile?.school_id;

  if (!['ADMIN', 'SUPER_ADMIN'].includes(role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return Response.json({ error: 'ID invalide' }, { status: 400 });
  }

  const { error } = await supabase
    .from('skill_taxonomies')
    .update({ deleted_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('school_id', schoolId)
    .is('deleted_at', null);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true, message: 'Taxonomie de compétences supprimé' });
});