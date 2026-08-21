import { withSupabase } from '@supabase/server';
import { visitorSchema, validateRequest } from '@/lib/api/validation';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const status = url.searchParams.get('status');
  const date = url.searchParams.get('date');
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });
  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  const userRole = profile?.role;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });
  if (!['SURVEILLANT', 'ADMIN', 'SUPER_ADMIN'].includes(userRole)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  let query = supabase
    .from('visitors')
    .select('*')
    .eq('school_id', schoolId);

  if (status) query = query.eq('status', status);
  if (date) {
    query = query.gte('entry_time', `${date}T00:00:00`)
      .lt('entry_time', `${date}T23:59:59`);
  }

  const { data, error } = await query.order('entry_time', { ascending: false });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
});

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });
  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const body = await req.json();
  const validation = validateRequest(visitorSchema, { ...body, school_id: schoolId });
  if (!validation.success) {
    return Response.json({ error: validation.error }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('visitors')
    .insert({
      school_id: schoolId,
      visitor_name: validation.data.visitor_name,
      visitor_phone: validation.data.visitor_phone || null,
      visitor_id_type: validation.data.visitor_id_type || 'CNI',
      visitor_id_number: validation.data.visitor_id_number || null,
      purpose: validation.data.purpose,
      person_to_visit: validation.data.person_to_visit,
      person_role: validation.data.person_role || null,
      status: 'INSIDE',
      created_by: user?.id,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data, { status: 201 });
});

export const PATCH = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const body = await req.json();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });
  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  if (!body.id) {
    return Response.json({ error: 'id est requis' }, { status: 400 });
  }
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(body.id)) {
    return Response.json({ error: 'ID invalide' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('visitors')
    .update({
      exit_time: new Date().toISOString(),
      status: 'EXITED',
    })
    .eq('id', body.id)
    .eq('school_id', schoolId)
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
});
