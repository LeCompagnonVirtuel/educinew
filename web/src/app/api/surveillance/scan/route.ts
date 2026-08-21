import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const surveillanceScanSchema = z.object({
  qrCode: z.string().max(2000).nullable().optional(),
  type: z.string().max(50).nullable().optional(),
  studentId: z.string().uuid().nullable().optional(),
  staffId: z.string().uuid().nullable().optional(),
  action: z.enum(['ARRIVAL', 'DEPARTURE', 'BREAK_START', 'BREAK_END']).default('ARRIVAL'),
}).refine(
  (data) => data.qrCode || data.staffId || data.studentId,
  { message: 'qrCode, staffId ou studentId requis' }
);

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });
  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const userRole = profile?.role;
  const schoolId = profile?.school_id;

  if (!['SURVEILLANT', 'ADMIN', 'SUPER_ADMIN'].includes(userRole)) {
    return Response.json({ error: 'Non autorisé. Seuls les surveillants et admins peuvent effectuer cette opération.' }, { status: 403 });
  }
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const body = await req.json();
  const validation = surveillanceScanSchema.safeParse(body);
  if (!validation.success) {
    return Response.json({ error: validation.error.issues.map(i => i.message).join(', ') }, { status: 400 });
  }
  const { qrCode, type, studentId, staffId, action } = validation.data;

  try {
    if (qrCode) {
      // QR Code scan
      const isStaffQR = qrCode.startsWith('EDUCI:P:') || qrCode.startsWith('EDUCIP');

      if (isStaffQR) {
        // Staff QR scan
        const { data: qrRecord, error: qrError } = await supabase
          .from('qr_codes')
          .select('*')
          .eq('qr_data', qrCode)
          .eq('school_id', schoolId)
          .eq('is_active', true)
          .single();

        if (qrError || !qrRecord) {
          return Response.json({ error: 'QR Code invalide ou inactif' }, { status: 400 });
        }

        const { data: staff } = await supabase
          .from('staff')
          .select('id')
          .eq('user_id', qrRecord.user_id)
          .eq('school_id', schoolId)
          .single();

        if (!staff) {
          return Response.json({ error: 'Membre du personnel non trouvé' }, { status: 404 });
        }

        const { data, error } = await supabase.rpc('record_staff_attendance_by_surveillant', {
          p_staff_id: staff.id,
          p_action: action || 'ARRIVAL',
          p_operator_id: user?.id,
        });

        if (error) throw error;

        // Log the surveillance action
        await supabase.from('audit_logs').insert({
          school_id: schoolId,
          user_id: user?.id,
          action: 'SURVEILLANCE_STAFF_SCAN',
          entity: 'staff',
          entity_id: staff.id,
          details: JSON.stringify({ qrCode, action: action || 'ARRIVAL' }),
        });

        return Response.json(data);
      } else {
        // Student QR scan
        const { data: qrRecord, error: qrError } = await supabase
          .from('qr_codes')
          .select('*')
          .eq('qr_data', qrCode)
          .eq('school_id', schoolId)
          .eq('user_type', 'student')
          .eq('is_active', true)
          .single();

        if (qrError || !qrRecord) {
          return Response.json({ error: 'QR Code élève invalide ou inactif' }, { status: 400 });
        }

        const today = new Date().toISOString().split('T')[0];

        const { data: existing } = await supabase
          .from('attendance')
          .select('id')
          .eq('student_id', qrRecord.user_id)
          .eq('date', today)
          .single();

        if (existing) {
          return Response.json({ error: 'Pointage déjà effectué pour cet élève aujourd\'hui' }, { status: 409 });
        }

        const { data, error } = await supabase
          .from('attendance')
          .insert({
            student_id: qrRecord.user_id,
            school_id: schoolId,
            date: today,
            status: 'PRESENT',
            method: 'QR',
            operator: user?.id,
          })
          .select()
          .single();

        if (error) throw error;

        await supabase.from('attendance_events').insert({
          school_id: schoolId,
          student_id: qrRecord.user_id,
          user_id: qrRecord.user_id,
          event_type: 'ARRIVAL',
          scanned_by: user?.id,
          qr_code_id: qrRecord.id,
        });

        await supabase.from('audit_logs').insert({
          school_id: schoolId,
          user_id: user?.id,
          action: 'SURVEILLANCE_STUDENT_SCAN',
          entity: 'student',
          entity_id: qrRecord.user_id,
          details: JSON.stringify({ qrCode }),
        });

        return Response.json(data);
      }
    } else if (staffId) {
      // Manual staff pointage
      const { data, error } = await supabase.rpc('record_staff_attendance_by_surveillant', {
        p_staff_id: staffId,
        p_action: action || 'ARRIVAL',
        p_operator_id: user?.id,
      });

      if (error) throw error;

      await supabase.from('audit_logs').insert({
        school_id: schoolId,
        user_id: user?.id,
        action: 'SURVEILLANCE_STAFF_MANUAL',
        entity: 'staff',
        entity_id: staffId,
        details: JSON.stringify({ action: action || 'ARRIVAL' }),
      });

      return Response.json(data);
    } else if (studentId) {
      // Manual student pointage
      const today = new Date().toISOString().split('T')[0];

      const { data: existing } = await supabase
        .from('attendance')
        .select('id')
        .eq('student_id', studentId)
        .eq('date', today)
        .single();

      if (existing) {
        return Response.json({ error: 'Pointage déjà effectué pour cet élève aujourd\'hui' }, { status: 409 });
      }

      const { data, error } = await supabase
        .from('attendance')
        .insert({
          student_id: studentId,
          school_id: schoolId,
          date: today,
          status: 'PRESENT',
          method: 'MANUAL',
          operator: user?.id,
        })
        .select()
        .single();

      if (error) throw error;

      await supabase.from('audit_logs').insert({
        school_id: schoolId,
        user_id: user?.id,
        action: 'SURVEILLANCE_STUDENT_MANUAL',
        entity: 'student',
        entity_id: studentId,
        details: JSON.stringify({ action: 'ARRIVAL' }),
      });

      return Response.json(data);
    } else {
      return Response.json({ error: 'qrCode, staffId ou studentId requis' }, { status: 400 });
    }
  } catch (err: any) {
    return Response.json({ error: err.message || 'Erreur interne' }, { status: 500 });
  }
});
