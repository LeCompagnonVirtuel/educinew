import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const ValidateQrSchema = z.object({
  qr_code: z.string().min(1).max(2000),
});

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const body = await req.json();
  const validation = ValidateQrSchema.safeParse(body);

  if (!validation.success) {
    return Response.json({ error: 'Données invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const { qr_code } = validation.data;

  const { data: qrRecord, error } = await supabase
    .from('qr_codes')
    .select('*, students(id, first_name, last_name, matricule)')
    .eq('code', qr_code)
    .eq('school_id', schoolId)
    .eq('is_active', true)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error || !qrRecord) {
    return Response.json({ valid: false, error: 'QR code invalide ou expiré' }, { status: 400 });
  }

  return Response.json({ valid: true, data: qrRecord });
});
