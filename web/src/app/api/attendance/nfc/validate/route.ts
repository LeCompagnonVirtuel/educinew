import { withSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

const ValidateNfcSchema = z.object({
  nfc_tag: z.string().min(1).max(200),
});

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const body = await req.json();
  const validation = ValidateNfcSchema.safeParse(body);

  if (!validation.success) {
    return Response.json({ error: 'Données invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const { nfc_tag } = validation.data;

  const { data: nfcRecord, error } = await supabase
    .from('nfc_tags')
    .select('*, students(id, first_name, last_name, matricule)')
    .eq('tag_id', nfc_tag)
    .eq('school_id', schoolId)
    .eq('is_active', true)
    .single();

  if (error || !nfcRecord) {
    return Response.json({ valid: false, error: 'Tag NFC invalide' }, { status: 400 });
  }

  return Response.json({ valid: true, data: nfcRecord });
});
