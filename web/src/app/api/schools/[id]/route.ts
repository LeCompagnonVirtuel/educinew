import { withSupabase } from '@/lib/supabase/server';
import { UpdateSchoolSchema } from '@/features/schools/validators';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).pop();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: school, error } = await supabase.from('schools').select('*').eq('id', id).eq('school_id', ctx.schoolId).single();

  if (error || !school) {
    return Response.json({ error: 'Établissement introuvable' }, { status: 404 });
  }

  return Response.json(school);
});

export const PATCH = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).pop();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  if (!profile || !['SUPER_ADMIN', 'ADMIN'].includes(profile.role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const isSuperAdmin = profile.role === 'SUPER_ADMIN';

  if (!isSuperAdmin && profile.school_id !== id) {
    return Response.json({ error: 'Non autorisé — vous ne pouvez modifier que votre propre établissement' }, { status: 403 });
  }

  const body = await req.json();
  const validation = UpdateSchoolSchema.safeParse(body);

  if (!validation.success) {
    return Response.json({ error: 'Données invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const updateData: Record<string, unknown> = {};
  const data = validation.data;
  if (data.name !== undefined) updateData.name = data.name;
  if (data.email !== undefined) updateData.email = data.email;
  if (data.phone !== undefined) updateData.phone = data.phone || null;
  if (data.address !== undefined) updateData.address = data.address || null;
  if (data.city !== undefined) updateData.city = data.city || null;
  if (data.region !== undefined) updateData.region = data.region || null;
  if (data.country !== undefined) updateData.country = data.country;
  if (data.website !== undefined) updateData.website = data.website || null;
  if (data.sigle !== undefined) updateData.sigle = data.sigle || null;
  if (data.slogan !== undefined) updateData.slogan = data.slogan || null;
  if (data.description !== undefined) updateData.description = data.description || null;
  if (data.latitude !== undefined) updateData.latitude = data.latitude;
  if (data.longitude !== undefined) updateData.longitude = data.longitude;
  if (data.checkinRadius !== undefined) updateData.checkin_radius = data.checkinRadius;
  if (data.primaryColor !== undefined) updateData.primary_color = data.primaryColor || null;
  if (data.secondaryColor !== undefined) updateData.secondary_color = data.secondaryColor || null;
  if (data.accentColor !== undefined) updateData.accent_color = data.accentColor || null;

  if (Object.keys(updateData).length === 0) {
    return Response.json({ error: 'Aucun champ à modifier' }, { status: 400 });
  }

  updateData.updated_at = new Date().toISOString();

  const { data: school, error } = await supabase
    .from('schools')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json(school);
});

export const DELETE = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).pop();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
  if (!['SUPER_ADMIN'].includes(profile?.role)) {
    return Response.json({ error: 'Seul un SUPER_ADMIN peut supprimer un établissement' }, { status: 403 });
  }

  const { error } = await supabase.from('schools').delete().eq('id', id);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ success: true });
});
