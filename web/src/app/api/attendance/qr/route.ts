import { withSupabase } from '@/lib/supabase/server';
import { qrScanSchema } from '@/lib/api/validation';

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const body = await req.json();
  const validation = qrScanSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const data = validation.data;

  const { data: qrRecord, error: qrError } = await supabase
    .from('qr_codes')
    .select('*')
    .eq('code', data.qr_code)
    .eq('school_id', schoolId)
    .eq('is_active', true)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (qrError || !qrRecord) {
    return Response.json({ error: 'QR code invalide ou expiré' }, { status: 400 });
  }

  const { data: record, error } = await supabase
    .from('attendance')
    .insert({
      student_id: qrRecord.student_id,
      date: new Date().toISOString().split('T')[0],
      status: data.scan_type === 'LATE' ? 'LATE' : 'PRESENT',
      method: 'QR',
      session_id: qrRecord.session_id || null,
      qr_code_id: qrRecord.id,
      latitude: data.latitude || null,
      longitude: data.longitude || null,
      device_info: data.device_info || null,
      operator_name: data.operator_name || null,
      school_id: schoolId,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json(record, { status: 201 });
});
