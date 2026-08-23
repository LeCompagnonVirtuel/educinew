import { withSupabase } from '@/lib/supabase/server';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const { data, error } = await supabase
    .from('attendance_policies')
    .select('*')
    .eq('school_id', schoolId)
    .eq('is_active', true)
    .single();

  if (error) {
    return Response.json({
      max_absences_allowed: 3,
      late_threshold_minutes: 15,
      auto_notify_parents: true,
      require_justification_after: 3,
      justification_deadline_days: 7,
      allowed_methods: ['MANUAL'],
    });
  }

  return Response.json(data);
});
