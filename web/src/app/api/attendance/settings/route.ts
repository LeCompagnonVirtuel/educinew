import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const SettingsSchema = z.object({
  auto_mark_late_after_minutes: z.number().int().min(1).max(120).optional(),
  allow_parent_justification: z.boolean().optional(),
  require_photo_evidence: z.boolean().optional(),
  gps_enabled: z.boolean().optional(),
  qr_enabled: z.boolean().optional(),
  nfc_enabled: z.boolean().optional(),
  face_recognition_enabled: z.boolean().optional(),
  notification_enabled: z.boolean().optional(),
  alert_threshold_percent: z.number().min(0).max(100).optional(),
  consecutive_absence_threshold: z.number().int().min(1).max(30).optional(),
});

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const { data, error } = await supabase
    .from('attendance_settings')
    .select('*')
    .eq('school_id', schoolId)
    .single();

  if (error) {
    return Response.json({
      auto_mark_late_after_minutes: 15,
      allow_parent_justification: true,
      require_photo_evidence: false,
      gps_enabled: false,
      qr_enabled: false,
      nfc_enabled: false,
      face_recognition_enabled: false,
      notification_enabled: true,
      alert_threshold_percent: 75,
      consecutive_absence_threshold: 3,
    });
  }

  return Response.json(data);
});

export const PUT = withSupabase({ auth: 'user' }, async (req, ctx) => {
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

  const body = await req.json();
  const validation = SettingsSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const data = validation.data;

  const { data: existing } = await supabase
    .from('attendance_settings')
    .select('id')
    .eq('school_id', schoolId)
    .single();

  let result;
  if (existing) {
    const { data: updated, error } = await supabase
      .from('attendance_settings')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) return Response.json({ error: error.message }, { status: 400 });
    result = updated;
  } else {
    const { data: created, error } = await supabase
      .from('attendance_settings')
      .insert({ ...data, school_id: schoolId })
      .select()
      .single();
    if (error) return Response.json({ error: error.message }, { status: 400 });
    result = created;
  }

  return Response.json(result);
});
