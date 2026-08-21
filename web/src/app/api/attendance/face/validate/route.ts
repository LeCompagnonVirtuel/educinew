import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const ValidateFaceSchema = z.object({
  student_id: z.string().uuid(),
  face_data: z.string().min(1),
});

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const body = await req.json();
  const validation = ValidateFaceSchema.safeParse(body);

  if (!validation.success) {
    return Response.json({ error: 'Données invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const data = validation.data;

  const { data: faceRecord, error } = await supabase
    .from('face_templates')
    .select('*, students(id, first_name, last_name, matricule)')
    .eq('student_id', data.student_id)
    .eq('school_id', schoolId)
    .eq('is_active', true)
    .single();

  if (error || !faceRecord) {
    return Response.json({ valid: false, error: 'Modèle facial non trouvé' }, { status: 400 });
  }

  return Response.json({ valid: true, data: faceRecord });
});
