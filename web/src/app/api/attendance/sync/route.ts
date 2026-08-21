import { withSupabase } from '@supabase/server';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const { data, error } = await supabase
    .from('attendance_sync')
    .select('*')
    .eq('school_id', schoolId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    return Response.json({ lastSync: null, status: 'never' });
  }

  return Response.json({ lastSync: data, status: data.status });
});

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
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

  const { data: sync, error: syncError } = await supabase
    .from('attendance_sync')
    .insert({
      school_id: schoolId,
      status: 'IN_PROGRESS',
      started_at: new Date().toISOString(),
      initiated_by: user.id,
    })
    .select()
    .single();

  if (syncError) return Response.json({ error: syncError.message }, { status: 400 });

  const { data: pending, error: countError } = await supabase
    .from('attendance')
    .select('id', { count: 'exact', head: true })
    .eq('school_id', schoolId)
    .eq('synced', false);

  if (countError) return Response.json({ error: countError.message }, { status: 500 });

  const { error: updateError } = await supabase
    .from('attendance_sync')
    .update({
      status: 'COMPLETED',
      completed_at: new Date().toISOString(),
      records_synced: pending || 0,
    })
    .eq('id', sync.id);

  if (updateError) return Response.json({ error: updateError.message }, { status: 500 });

  return Response.json({ syncId: sync.id, recordsSynced: pending || 0, status: 'COMPLETED' });
});
