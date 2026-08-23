import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import crypto from 'crypto';
import { z } from 'zod';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const DUPLICATE_WINDOW_SECONDS = 30;

const qrScanSchema = z.object({
  qr_code: z.string().min(1, 'QR code requis').max(2000),
  scan_type: z.enum(['ARRIVAL', 'DEPARTURE', 'LATE', 'PERMISSION', 'EXCEPTIONAL']).default('ARRIVAL'),
  device_info: z.string().max(200).nullable().optional(),
  latitude: z.number().min(-90).max(90).nullable().optional(),
  longitude: z.number().min(-180).max(180).nullable().optional(),
  operator_name: z.string().max(100).nullable().optional(),
});

function verifyQRSignature(token: string, secret: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const [header, payload, signature] = parts;
    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(`${header}.${payload}`)
      .digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expectedSig, 'hex'));
  } catch {
    return false;
  }
}

function decodeQRPayload(token: string): Record<string, any> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = Buffer.from(parts[1], 'base64url').toString('utf8');
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });

    const body = await req.json();
    const bodyValidation = qrScanSchema.safeParse(body);
    if (!bodyValidation.success) {
      return NextResponse.json({ error: bodyValidation.error.issues[0]?.message || 'DonnÃ©es invalides' }, { status: 400 });
    }
    const { qr_code, scan_type, device_info, latitude, longitude, operator_name } = bodyValidation.data;

    // Parse the QR code - supports two formats:
    // 1. Legacy: "EDUCI:S:matricule:userId" or "EDUCI:T:employeeId:userId"
    // 2. New: Signed JWT-like token with header.payload.signature
    let userId: string | null = null;
    let personType: string = 'student';
    let matricule: string | null = null;
    let qrCodeId: string | null = null;

    if (qr_code.includes('.') && qr_code.split('.').length === 3) {
      // New signed token format
      const secret = process.env.QR_SIGNING_SECRET;
      if (!secret) {
        return NextResponse.json({ error: 'Configuration serveur manquante (QR_SIGNING_SECRET)' }, { status: 500 });
      }
      if (!verifyQRSignature(qr_code, secret)) {
        return NextResponse.json({
          error: 'Signature QR invalide â€” tentative de falsification dÃ©tectÃ©e',
          code: 'INVALID_SIGNATURE',
        }, { status: 400 });
      }

      const payload = decodeQRPayload(qr_code);
      if (!payload) {
        return NextResponse.json({ error: 'Payload QR invalide', code: 'INVALID_PAYLOAD' }, { status: 400 });
      }

      // Check expiry
      if (payload.exp && Date.now() > payload.exp) {
        return NextResponse.json({ error: 'QR code expirÃ©', code: 'QR_EXPIRED' }, { status: 400 });
      }
      // Check issued-at age (max 24h even if exp not reached)
      if (payload.iat && (Date.now() - payload.iat) > 24 * 60 * 60 * 1000) {
        return NextResponse.json({ error: 'QR code trop ancien', code: 'QR_TOO_OLD' }, { status: 400 });
      }

      // Validate school_id in signed token â€” prevent cross-school QR usage
      if (payload.school_id && payload.school_id !== schoolId) {
        return NextResponse.json({
          error: 'Ce QR Code appartient Ã  un autre Ã©tablissement',
          code: 'WRONG_SCHOOL',
        }, { status: 403 });
      }

      userId = payload.user_id;
      personType = payload.type || 'student';
      matricule = payload.matricule;
      qrCodeId = payload.qr_id;
    } else {
      // Legacy format: "EDUCI:S:matricule:userId" or raw matricule
      // DEPRECATED: Legacy QR codes must now exist in qr_codes table with a valid expires_at.
      // Reject legacy codes that are not registered in the database.
      console.warn('[QR SCAN] Legacy QR format detected â€” deprecated and will be removed in a future release');

      let lookupMatricule: string | null = null;
      if (qr_code.startsWith('EDUCI:')) {
        const parts = qr_code.split(':');
        personType = parts[1] === 'T' ? 'teacher' : 'student';
        lookupMatricule = parts[2] || null;
        userId = parts[3] || null;
      } else {
        lookupMatricule = qr_code;
      }

      if (!lookupMatricule) {
        return NextResponse.json({ error: 'QR code invalide', code: 'INVALID_QR' }, { status: 400 });
      }

      matricule = lookupMatricule;

      const { data: legacyQr } = await supabase
        .from('qr_codes')
        .select('id, is_active, expires_at')
        .eq('matricule', lookupMatricule)
        .single();

      if (!legacyQr) {
        return NextResponse.json({
          error: 'QR code non reconnu â€” veuillez utiliser un QR code valide',
          code: 'LEGACY_QR_REJECTED',
        }, { status: 400 });
      }

      if (!legacyQr.is_active) {
        return NextResponse.json({ error: 'QR code dÃ©sactivÃ©', code: 'QR_INACTIVE' }, { status: 400 });
      }

      if (legacyQr.expires_at && new Date(legacyQr.expires_at) < new Date()) {
        return NextResponse.json({ error: 'QR code expirÃ©', code: 'QR_EXPIRED' }, { status: 400 });
      }

      qrCodeId = legacyQr.id;
    }

    // Look up the person in the database
    let person: any = null;
    let personError: any = null;

    if (userId) {
      if (personType === 'teacher') {
        const result = await supabase
          .from('teachers')
          .select('*, user:users!teachers_user_id_fkey(*), school:schools(*)')
          .eq('user_id', userId)
          .eq('school_id', schoolId)
          .single();
        person = result.data;
        personError = result.error;
      } else if (personType === 'staff') {
        const result = await supabase
          .from('staff')
          .select('*, user:users(*)')
          .eq('user_id', userId)
          .eq('school_id', schoolId)
          .single();
        person = result.data;
        personError = result.error;
      } else {
        const result = await supabase
          .from('students')
          .select('*, user:users!students_user_id_fkey(*), class:classes(name, level)')
          .eq('user_id', userId)
          .eq('school_id', schoolId)
          .single();
        person = result.data;
        personError = result.error;
      }
    } else if (matricule) {
      if (personType === 'teacher') {
        const result = await supabase
          .from('teachers')
          .select('*, user:users!teachers_user_id_fkey(*), school:schools(*)')
          .eq('employee_id', matricule)
          .eq('school_id', schoolId)
          .single();
        person = result.data;
        personError = result.error;
      } else if (personType === 'staff') {
        const result = await supabase
          .from('staff')
          .select('*, user:users(*)')
          .eq('employee_code', matricule)
          .eq('school_id', schoolId)
          .single();
        person = result.data;
        personError = result.error;
      } else {
        const result = await supabase
          .from('students')
          .select('*, user:users!students_user_id_fkey(*), class:classes(name, level)')
          .eq('matricule', matricule)
          .eq('school_id', schoolId)
          .single();
        person = result.data;
        personError = result.error;
      }
    }

    if (personError || !person) {
      return NextResponse.json({
        error: 'Utilisateur non trouvÃ© ou non associÃ© Ã  cet Ã©tablissement',
        code: 'USER_NOT_FOUND',
      }, { status: 404 });
    }

    // Check account status
    if (person.user && person.user.status !== 'ACTIVE') {
      return NextResponse.json({
        error: 'Compte utilisateur dÃ©sactivÃ©',
        code: 'ACCOUNT_DISABLED',
      }, { status: 403 });
    }

    // If QR code ID provided, validate against qr_codes table
    if (qrCodeId) {
      const { data: qrRecord } = await supabase
        .from('qr_codes')
        .select('id, is_active, expires_at, scan_count')
        .eq('id', qrCodeId)
        .single();

      if (qrRecord) {
        if (!qrRecord.is_active) {
          return NextResponse.json({ error: 'QR code dÃ©sactivÃ©', code: 'QR_INACTIVE' }, { status: 400 });
        }
        if (qrRecord.expires_at && new Date(qrRecord.expires_at) < new Date()) {
          return NextResponse.json({ error: 'QR code expirÃ©', code: 'QR_EXPIRED' }, { status: 400 });
        }
        // Increment scan count
        await supabase
          .from('qr_codes')
          .update({ scan_count: (qrRecord.scan_count || 0) + 1, last_scanned_at: new Date().toISOString() })
          .eq('id', qrCodeId);
      }
    }

    // Duplicate prevention
    const today = new Date().toISOString().split('T')[0];
    const cutoffTime = new Date(Date.now() - DUPLICATE_WINDOW_SECONDS * 1000).toISOString();

    if (personType === 'student') {
      const { data: existing } = await supabase
        .from('attendance')
        .select('id, status, remark, created_at')
        .eq('student_id', person.id)
        .eq('date', today)
        .gte('created_at', cutoffTime)
        .order('created_at', { ascending: false })
        .limit(1);

      if (existing && existing.length > 0) {
        return NextResponse.json({
          error: `Doublon dÃ©tectÃ© â€” dernier pointage il y a moins de ${DUPLICATE_WINDOW_SECONDS}s`,
          code: 'DUPLICATE',
          last_scan: existing[0],
        }, { status: 409 });
      }
    } else {
      const { data: existing } = await supabase
        .from('teacher_attendance')
        .select('id, status, check_in_time')
        .eq('teacher_id', person.id)
        .eq('date', today)
        .gte('check_in_time', cutoffTime)
        .order('check_in_time', { ascending: false })
        .limit(1);

      if (existing && existing.length > 0) {
        return NextResponse.json({
          error: `Doublon dÃ©tectÃ© â€” dernier pointage il y a moins de ${DUPLICATE_WINDOW_SECONDS}s`,
          code: 'DUPLICATE',
          last_scan: existing[0],
        }, { status: 409 });
      }
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Record attendance
    if (personType === 'student') {
      const status = scan_type === 'LATE' ? 'LATE' : 'PRESENT';
      const remark = scan_type === 'ARRIVAL' ? `ArrivÃ©e: ${timeStr}`
        : scan_type === 'DEPARTURE' ? `DÃ©part: ${timeStr}`
        : scan_type === 'LATE' ? `Retard: ${timeStr}`
        : scan_type === 'PERMISSION' ? `Permission: ${timeStr}`
        : `PrÃ©sence exceptionnelle: ${timeStr}`;

      const { error: insertErr } = await supabase
        .from('attendance')
        .upsert({
          student_id: person.id,
          school_id: schoolId,
          date: today,
          status,
          remark,
          method: 'QR',
          device: device_info || null,
          operator: operator_name || user?.email || null,
          latitude: latitude || null,
          longitude: longitude || null,
        }, { onConflict: 'student_id,date' });

      if (insertErr) throw insertErr;

      // Also write to attendance_events for parent notifications
      try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
        await supabase.from('attendance_events').insert({
          school_id: schoolId,
          student_id: person.id,
          user_id: person.user?.id || null,
          event_type: scan_type || 'ARRIVAL',
          scan_time: now.toISOString(),
          scanned_by: user?.id || null,
          qr_code_id: qrCodeId || null,
          latitude: latitude || null,
          longitude: longitude || null,
          device_info: device_info || null,
        });
      } catch { /* optional dual-write */ }

      // Send parent notification
      if (person.user?.parent_id) {
        try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
          await supabase.from('notifications').insert({
            user_id: person.user.parent_id,
            title: scan_type === 'ARRIVAL' ? 'ArrivÃ©e de votre enfant' : scan_type === 'DEPARTURE' ? 'DÃ©part de votre enfant' : 'Pointage enfant',
            body: `${person.user?.name || `${person.first_name} ${person.last_name}`} est ${scan_type === 'ARRIVAL' ? 'arrivÃ©(e)' : scan_type === 'DEPARTURE' ? 'parti(e)' : 'pointÃ©(e)'} Ã  ${timeStr}.`,
            type: 'ATTENDANCE',
            data: JSON.stringify({ student_id: person.id, scan_type, time: timeStr }),
          });
        } catch { /* optional notification */ }
      }

      return NextResponse.json({
        success: true,
        person: {
          id: person.id,
          name: person.user?.name || `${person.first_name} ${person.last_name}`,
          photo: person.user?.photo_url || person.photo_url,
          role: 'Ã‰lÃ¨ve',
          class: person.class?.name,
          level: person.class?.level,
          matricule: person.matricule,
          school: person.school_id,
        },
        scan: {
          type: scan_type,
          status,
          time: timeStr,
          date: today,
          method: 'QR',
          device: device_info,
          operator: operator_name || user?.email,
        },
        message: `âœ… PrÃ©sence enregistrÃ©e â€” ${person.user?.name || `${person.first_name} ${person.last_name}`}`,
      });
    } else if (personType === 'staff') {
      // Staff attendance
      const checkIn = !scan_type || scan_type === 'ARRIVAL';
      const status = scan_type === 'LATE' ? 'LATE' : scan_type === 'DEPARTURE' ? 'DEPARTED' : 'PRESENT';

      const { error: insertErr } = await supabase
        .from('staff_attendance')
        .upsert({
          staff_id: person.id,
          user_id: person.user_id,
          school_id: schoolId,
          date: today,
          check_in_time: checkIn ? now.toISOString() : undefined,
          check_out_time: !checkIn ? now.toISOString() : undefined,
          status,
          method: 'QR',
          recorded_by_type: 'QR_SCAN',
          latitude: latitude || null,
          longitude: longitude || null,
        }, { onConflict: 'staff_id,date' });

      if (insertErr) throw insertErr;

      return NextResponse.json({
        success: true,
        person: {
          id: person.id,
          name: person.user?.name || `${person.first_name || ''} ${person.last_name || ''}`.trim(),
          photo: person.user?.photo_url || person.photo_url,
          role: person.position || 'Personnel',
          employee_code: person.employee_code,
          school: person.school_id,
        },
        scan: {
          type: checkIn ? 'ARRIVAL' : 'DEPARTURE',
          status,
          time: timeStr,
          date: today,
          method: 'QR',
          device: device_info,
          operator: operator_name || user?.email,
        },
        message: `âœ… ${checkIn ? 'ArrivÃ©e' : 'DÃ©part'} enregistrÃ© â€” ${person.user?.name || 'Personnel'}`,
      });
    } else {
      // Teacher attendance
      const checkIn = !scan_type || scan_type === 'ARRIVAL';
      const status = scan_type === 'LATE' ? 'LATE' : 'PRESENT';

      const { error: insertErr } = await supabase
        .from('teacher_attendance')
        .upsert({
          teacher_id: person.id,
          school_id: schoolId,
          date: today,
          status,
          method: 'QR',
          check_in_time: checkIn ? now.toISOString() : undefined,
          check_out_time: !checkIn ? now.toISOString() : undefined,
          late_minutes: scan_type === 'LATE' ? Math.floor((now.getHours() - 7) * 60 + now.getMinutes()) : 0,
          qr_verified: true,
          latitude: latitude || null,
          longitude: longitude || null,
        }, { onConflict: 'teacher_id,date' });

      if (insertErr) throw insertErr;

      return NextResponse.json({
        success: true,
        person: {
          id: person.id,
          name: person.user?.name || `${person.first_name} ${person.last_name}`,
          photo: person.user?.photo_url || person.photo_url,
          role: person.user?.role === 'TEACHER' ? 'Enseignant' : 'Personnel',
          employee_id: person.employee_id,
          school: person.school_id,
        },
        scan: {
          type: checkIn ? 'ARRIVAL' : 'DEPARTURE',
          status,
          time: timeStr,
          date: today,
          method: 'QR',
          device: device_info,
          operator: operator_name || user?.email,
        },
        message: `âœ… ${checkIn ? 'ArrivÃ©e' : 'DÃ©part'} enregistrÃ© â€” ${person.user?.name || `${person.first_name} ${person.last_name}`}`,
      });
    }
  } catch (error: any) {
    console.error('Pointage scan error:', error);
    return NextResponse.json({ error: error.message || 'Erreur serveur' }, { status: 500 });
  }
}
