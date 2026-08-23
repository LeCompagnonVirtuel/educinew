import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import crypto from 'crypto';
import { z } from 'zod';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const qrGenerateSchema = z.object({
  type: z.enum(['student', 'teacher', 'staff', 'class']),
  user_id: z.string().uuid().nullable().optional(),
  student_id: z.string().uuid().nullable().optional(),
  teacher_id: z.string().uuid().nullable().optional(),
  staff_id: z.string().uuid().nullable().optional(),
  class_id: z.string().uuid().nullable().optional(),
  expires_hours: z.number().min(1).max(72).default(8),
});

const qrDeactivateSchema = z.object({
  action: z.enum(['deactivate', 'regenerate']),
  qr_ids: z.array(z.string().uuid()).nullable().optional(),
  type: z.string().max(50).nullable().optional(),
  all: z.boolean().default(false),
});

function generateSignedToken(payload: Record<string, any>, secret: string, expiresInMs: number = 8 * 60 * 60 * 1000): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'QR' })).toString('base64url');
  const fullPayload = { ...payload, iat: Date.now(), exp: Date.now() + expiresInMs };
  const payloadB64 = Buffer.from(JSON.stringify(fullPayload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${header}.${payloadB64}`)
    .digest('hex');
  return `${header}.${payloadB64}.${signature}`;
}

// POST /api/pointage/qr — generate QR code for a student, teacher, or class
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
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const body = await req.json();
    const bodyValidation = qrGenerateSchema.safeParse(body);
    if (!bodyValidation.success) {
      return NextResponse.json({ error: bodyValidation.error.issues[0]?.message || 'Paramètres invalides' }, { status: 400 });
    }
    const { type, user_id, student_id, teacher_id, staff_id, class_id, expires_hours } = bodyValidation.data;
    const secret = process.env.QR_SIGNING_SECRET;
    if (!secret) {
      return NextResponse.json({ error: 'Configuration serveur manquante (QR_SIGNING_SECRET)' }, { status: 500 });
    }
    const expiresInMs = (expires_hours || 8) * 60 * 60 * 1000;

    // Generate QR for a specific student
    if (type === 'student' && (user_id || student_id)) {
      let studentData: any = null;
      if (student_id) {
        const { data } = await supabase
          .from('students')
          .select('*, user:users!students_user_id_fkey(*)')
          .eq('id', student_id)
          .eq('school_id', schoolId)
          .single();
        studentData = data;
      } else if (user_id) {
        const { data } = await supabase
          .from('students')
          .select('*, user:users!students_user_id_fkey(*)')
          .eq('user_id', user_id)
          .eq('school_id', schoolId)
          .single();
        studentData = data;
      }

      if (!studentData) {
        return NextResponse.json({ error: 'Élève non trouvé' }, { status: 404 });
      }

      const qrToken = generateSignedToken({
        user_id: studentData.user_id,
        matricule: studentData.matricule,
        type: 'student',
        school_id: schoolId,
        name: studentData.user?.name || `${studentData.first_name} ${studentData.last_name}`,
      }, secret, expiresInMs);

      // Store QR record
      await supabase.from('qr_codes').upsert({
        user_id: studentData.user_id,
        school_id: schoolId,
        qr_data: qrToken,
        barcode_data: studentData.matricule,
        is_active: true,
        expires_at: new Date(Date.now() + expiresInMs).toISOString(),
      }, { onConflict: 'user_id' });

      return NextResponse.json({
        success: true,
        qr_token: qrToken,
        person: {
          name: studentData.user?.name || `${studentData.first_name} ${studentData.last_name}`,
          matricule: studentData.matricule,
          type: 'student',
        },
        expires_at: new Date(Date.now() + expiresInMs).toISOString(),
      });
    }

    // Generate QR for a specific teacher
    if (type === 'teacher' && (user_id || teacher_id)) {
      let teacherData: any = null;
      if (teacher_id) {
        const { data } = await supabase
          .from('teachers')
          .select('*, user:users!teachers_user_id_fkey(*)')
          .eq('id', teacher_id)
          .eq('school_id', schoolId)
          .single();
        teacherData = data;
      } else if (user_id) {
        const { data } = await supabase
          .from('teachers')
          .select('*, user:users!teachers_user_id_fkey(*)')
          .eq('user_id', user_id)
          .eq('school_id', schoolId)
          .single();
        teacherData = data;
      }

      if (!teacherData) {
        return NextResponse.json({ error: 'Enseignant non trouvé' }, { status: 404 });
      }

      const qrToken = generateSignedToken({
        user_id: teacherData.user_id,
        matricule: teacherData.employee_id,
        type: 'teacher',
        school_id: schoolId,
        name: teacherData.user?.name || `${teacherData.first_name} ${teacherData.last_name}`,
      }, secret, expiresInMs);

      await supabase.from('qr_codes').upsert({
        user_id: teacherData.user_id,
        school_id: schoolId,
        qr_data: qrToken,
        barcode_data: teacherData.employee_id,
        is_active: true,
        expires_at: new Date(Date.now() + expiresInMs).toISOString(),
      }, { onConflict: 'user_id' });

      return NextResponse.json({
        success: true,
        qr_token: qrToken,
        person: {
          name: teacherData.user?.name || `${teacherData.first_name} ${teacherData.last_name}`,
          employee_id: teacherData.employee_id,
          type: 'teacher',
        },
        expires_at: new Date(Date.now() + expiresInMs).toISOString(),
      });
    }

    // Generate QR for a specific staff member
    if (type === 'staff' && (user_id || staff_id)) {
      let staffData: any = null;
      if (staff_id) {
        const { data } = await supabase
          .from('staff')
          .select('*, user:users(*)')
          .eq('id', staff_id)
          .eq('school_id', schoolId)
          .single();
        staffData = data;
      } else if (user_id) {
        const { data } = await supabase
          .from('staff')
          .select('*, user:users(*)')
          .eq('user_id', user_id)
          .eq('school_id', schoolId)
          .single();
        staffData = data;
      }

      if (!staffData) {
        return NextResponse.json({ error: 'Membre du personnel non trouvé' }, { status: 404 });
      }

      const qrToken = generateSignedToken({
        user_id: staffData.user_id,
        matricule: staffData.employee_code,
        type: 'staff',
        school_id: schoolId,
        name: staffData.user?.name || `${staffData.first_name || ''} ${staffData.last_name || ''}`.trim(),
      }, secret, expiresInMs);

      await supabase.from('qr_codes').upsert({
        user_id: staffData.user_id,
        school_id: schoolId,
        qr_data: qrToken,
        barcode_data: staffData.employee_code,
        is_active: true,
        expires_at: new Date(Date.now() + expiresInMs).toISOString(),
      }, { onConflict: 'user_id' });

      return NextResponse.json({
        success: true,
        qr_token: qrToken,
        person: {
          name: staffData.user?.name || 'Personnel',
          employee_code: staffData.employee_code,
          position: staffData.position,
          type: 'staff',
        },
        expires_at: new Date(Date.now() + expiresInMs).toISOString(),
      });
    }

    // Generate daily class QR (for class-level attendance)
    if (type === 'class' && class_id) {
      const { data: classData } = await supabase
        .from('classes')
        .select('*')
        .eq('id', class_id)
        .eq('school_id', schoolId)
        .single();

      if (!classData) {
        return NextResponse.json({ error: 'Classe non trouvée' }, { status: 404 });
      }

      // Deactivate old class QRs for this class
      await supabase
        .from('class_qr_codes')
        .update({ is_active: false })
        .eq('class_id', class_id)
        .eq('school_id', schoolId)
        .eq('is_active', true);

      const qrToken = generateSignedToken({
        class_id,
        class_name: classData.name,
        type: 'class',
        school_id: schoolId,
        date: new Date().toISOString().split('T')[0],
      }, secret, expiresInMs);

      const { data: qrRecord } = await supabase
        .from('class_qr_codes')
        .insert({
          school_id: schoolId,
          class_id,
          qr_token: qrToken,
          qr_data: qrToken,
          is_active: true,
          expires_at: new Date(Date.now() + expiresInMs).toISOString(),
        })
        .select()
        .single();

      return NextResponse.json({
        success: true,
        qr_token: qrToken,
        class: {
          id: classData.id,
          name: classData.name,
          level: classData.level,
        },
        qr_id: qrRecord?.id,
        expires_at: new Date(Date.now() + expiresInMs).toISOString(),
      });
    }

    return NextResponse.json({ error: 'Paramètres invalides' }, { status: 400 });
  } catch (error: any) {
    console.error('QR generation error:', error);
    return NextResponse.json({ error: error.message || 'Erreur serveur' }, { status: 500 });
  }
}

// GET /api/pointage/qr — list active QR codes for the school
export async function GET(req: NextRequest) {
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
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    if (type === 'class') {
      const { data } = await supabase
        .from('class_qr_codes')
        .select('*, class:classes(name, level)')
        .eq('school_id', schoolId)
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      return NextResponse.json({ qr_codes: data || [] });
    }

    const { data } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    return NextResponse.json({ qr_codes: data || [] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH /api/pointage/qr — deactivate/revoke QR codes
export async function PATCH(req: NextRequest) {
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
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const body = await req.json();
    const bodyValidation = qrDeactivateSchema.safeParse(body);
    if (!bodyValidation.success) {
      return NextResponse.json({ error: bodyValidation.error.issues[0]?.message || 'Paramètres invalides' }, { status: 400 });
    }
    const { action, qr_ids, type, all } = bodyValidation.data;

    if (action === 'deactivate') {
      if (all) {
        // Deactivate all QR codes for the school
        if (type === 'class') {
          await supabase.from('class_qr_codes').update({ is_active: false }).eq('school_id', schoolId).eq('is_active', true);
        } else {
          await supabase.from('qr_codes').update({ is_active: false }).eq('school_id', schoolId).eq('is_active', true);
        }
        return NextResponse.json({ success: true, message: 'Tous les QR codes ont été désactivés' });
      }

      if (!qr_ids || !Array.isArray(qr_ids) || qr_ids.length === 0) {
        return NextResponse.json({ error: 'qr_ids requis' }, { status: 400 });
      }

      const table = type === 'class' ? 'class_qr_codes' : 'qr_codes';
      await supabase.from(table).update({ is_active: false }).in('id', qr_ids).eq('school_id', schoolId);

      return NextResponse.json({ success: true, message: `${qr_ids.length} QR code(s) désactivé(s)` });
    }

    if (action === 'regenerate') {
      if (!qr_ids || !Array.isArray(qr_ids) || qr_ids.length === 0) {
        return NextResponse.json({ error: 'qr_ids requis' }, { status: 400 });
      }

      const secret = process.env.QR_SIGNING_SECRET;
      if (!secret) {
        return NextResponse.json({ error: 'Configuration serveur manquante (QR_SIGNING_SECRET)' }, { status: 500 });
      }

      const table = type === 'class' ? 'class_qr_codes' : 'qr_codes';

      // Fetch old records to get user info for regeneration
      const { data: oldRecords } = await supabase
        .from(table)
        .select('id, user_id, user_type, barcode_data, school_id')
        .in('id', qr_ids)
        .eq('school_id', schoolId);

      // Deactivate old ones
      await supabase.from(table).update({ is_active: false }).in('id', qr_ids).eq('school_id', schoolId);

      // Regenerate new signed QR codes for each deactivated record
      if (oldRecords && type !== 'class') {
        const expiresInMs = 8 * 60 * 60 * 1000;
        for (const rec of oldRecords) {
          if (!rec.user_id) continue;
          const { data: userData } = await supabase
            .from('users')
            .select('name, role')
            .eq('id', rec.user_id)
            .single();

          const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'QR' })).toString('base64url');
          const payload = Buffer.from(JSON.stringify({
            user_id: rec.user_id,
            matricule: rec.barcode_data,
            type: rec.user_type?.toLowerCase() || 'student',
            school_id: rec.school_id,
            iat: Date.now(),
            exp: Date.now() + expiresInMs,
          })).toString('base64url');
          const signature = crypto.createHmac('sha256', secret).update(`${header}.${payload}`).digest('hex');
          const newToken = `${header}.${payload}.${signature}`;

          await supabase.from('qr_codes').upsert({
            user_id: rec.user_id,
            school_id: rec.school_id,
            qr_data: newToken,
            barcode_data: rec.barcode_data,
            is_active: true,
            expires_at: new Date(Date.now() + expiresInMs).toISOString(),
          }, { onConflict: 'user_id' });
        }
      }

      return NextResponse.json({ success: true, message: `${qr_ids.length} QR code(s) régénéré(s)` });
    }

    return NextResponse.json({ error: 'Action invalide' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/pointage/qr — permanently delete QR codes
export async function DELETE(req: NextRequest) {
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
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type');

    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 });
    }
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const table = type === 'class' ? 'class_qr_codes' : 'qr_codes';
    const { error } = await supabase.from(table).delete().eq('id', id).eq('school_id', schoolId);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'QR code supprimé' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
