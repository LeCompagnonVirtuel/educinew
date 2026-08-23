import { withSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

const FaceAttendanceSchema = z.object({
  student_id: z.string().uuid(),
  face_data: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  session_id: z.string().uuid().nullable().optional(),
  confidence: z.number().min(0).max(1).nullable().optional(),
  device_info: z.string().max(200).nullable().optional(),
});

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const body = await req.json();
  const validation = FaceAttendanceSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const data = validation.data;

  const { data: faceRecord, error: faceError } = await supabase
    .from('face_templates')
    .select('*')
    .eq('student_id', data.student_id)
    .eq('school_id', schoolId)
    .eq('is_active', true)
    .single();

  if (faceError || !faceRecord) {
    return Response.json({ error: 'Modèle facial non trouvé' }, { status: 400 });
  }

  const { data: record, error } = await supabase
    .from('attendance')
    .insert({
      student_id: data.student_id,
      date: data.date,
      status: 'PRESENT',
      method: 'FACE',
      session_id: data.session_id || null,
      face_template_id: faceRecord.id,
      confidence: data.confidence || null,
      device_info: data.device_info || null,
      school_id: schoolId,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json(record, { status: 201 });
});
