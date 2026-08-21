import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const ResolveSchema = z.object({
  resolution: z.string().max(500).optional(),
});

export const POST = withSupabase({ auth: 'user' }, async (req, { params }) => {
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

  const { data: alert, error: fetchError } = await supabase
    .from('attendance_alerts')
    .select('*')
    .eq('id', id)
    .eq('school_id', schoolId)
    .single();

  if (fetchError || !alert) {
    return Response.json({ error: 'Alerte non trouvée' }, { status: 404 });
  }

  const body = await req.json();
  const validation = ResolveSchema.safeParse(body);
  const resolution = validation.success ? validation.resolution : null;

  const { error: updateError } = await supabase
    .from('attendance_alerts')
    .update({
      status: 'RESOLVED',
      resolved_by: user.id,
      resolved_at: new Date().toISOString(),
      resolution,
    })
    .eq('id', id);

  if (updateError) return Response.json({ error: updateError.message }, { status: 400 });

  return Response.json({ success: true, status: 'RESOLVED' });
});
