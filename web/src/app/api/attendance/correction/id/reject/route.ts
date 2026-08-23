import { withSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

const RejectSchema = z.object({
  reason: z.string().min(1).max(500).optional(),
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

  const { data: correction, error: fetchError } = await supabase
    .from('attendance_corrections')
    .select('*')
    .eq('id', id)
    .eq('school_id', schoolId)
    .single();

  if (fetchError || !correction) {
    return Response.json({ error: 'Correction non trouvée' }, { status: 404 });
  }

  if (correction.status !== 'PENDING') {
    return Response.json({ error: 'Correction déjà traitée' }, { status: 400 });
  }

  const body = await req.json();
  const validation = RejectSchema.safeParse(body);
  const rejectionReason = validation.success ? validation.data.reason : null;

  const { error: updateError } = await supabase
    .from('attendance_corrections')
    .update({
      status: 'REJECTED',
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
      rejection_reason: rejectionReason,
    })
    .eq('id', id);

  if (updateError) return Response.json({ error: updateError.message }, { status: 400 });

  return Response.json({ success: true, status: 'REJECTED' });
});
