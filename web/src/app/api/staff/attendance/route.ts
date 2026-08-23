import { withSupabase } from '@/lib/supabase/server';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const staffId = url.searchParams.get('staffId');
  const date = url.searchParams.get('date');
  const startDate = url.searchParams.get('startDate');
  const endDate = url.searchParams.get('endDate');
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase
    .from('users')
    .select('role, school_id')
    .eq('id', user.id)
    .single();

  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const userRole = profile?.role;
  if (!['ADMIN', 'SUPER_ADMIN', 'SURVEILLANT', 'CENSEUR'].includes(userRole)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  let query = supabase
    .from('staff_attendance')
    .select('*, staff:staff(id, position, department, user:users(id, name, email, photo_url))');

  query = query.eq('school_id', schoolId);
  if (staffId) query = query.eq('staff_id', staffId);
  if (date) query = query.eq('date', date);
  if (startDate) query = query.gte('date', startDate);
  if (endDate) query = query.lte('date', endDate);

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
});

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase
    .from('users')
    .select('role, school_id')
    .eq('id', user.id)
    .single();

  const userRole = profile?.role;
  const schoolId = profile?.school_id;

  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });
  if (!['ADMIN', 'SUPER_ADMIN', 'SURVEILLANT', 'CENSEUR'].includes(userRole)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const body = await req.json();
  const { staffId, action, method, latitude, longitude } = body;

  if (!staffId || !action) {
    return Response.json({ error: 'staffId et action sont requis' }, { status: 400 });
  }

  const validActions = ['CHECK_IN', 'CHECK_OUT', 'BREAK_START', 'BREAK_END', 'SERVICE_START', 'REPRISE'];
  if (!validActions.includes(action)) {
    return Response.json({ error: `Action invalide. Utilisez: ${validActions.join(', ')}` }, { status: 400 });
  }

  const today = new Date().toISOString().split('T')[0];

  // Check for conflicts
  const { data: conflictCheck } = await supabase.rpc('check_staff_attendance_conflicts', {
    p_staff_id: staffId,
    p_action: action,
    p_timestamp: new Date().toISOString(),
  });

  if (conflictCheck?.has_conflict) {
    return Response.json({ error: conflictCheck.message }, { status: 409 });
  }

  let updateData: Record<string, any> = {};

  switch (action) {
    case 'CHECK_IN':
      updateData = {
        check_in_time: new Date().toISOString(),
        status: 'PRESENT',
        method: method || 'MANUAL',
        latitude: latitude || null,
        longitude: longitude || null,
        recorded_by_type: 'SELF',
      };
      break;
    case 'CHECK_OUT':
      updateData = { check_out_time: new Date().toISOString() };
      break;
    case 'BREAK_START':
      updateData = { break_start: new Date().toISOString() };
      break;
    case 'BREAK_END':
      updateData = { break_end: new Date().toISOString() };
      break;
    case 'SERVICE_START':
      updateData = { service_start: new Date().toISOString() };
      break;
    case 'REPRISE':
      updateData = { reprise_time: new Date().toISOString() };
      break;
  }

  const { data, error } = await supabase
    .from('staff_attendance')
    .upsert({
      staff_id: staffId,
      user_id: user?.id,
      school_id: schoolId,
      date: today,
      ...updateData,
    }, { onConflict: 'staff_id,date' })
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
});
