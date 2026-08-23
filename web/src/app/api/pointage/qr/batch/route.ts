import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import crypto from 'crypto';
import { z } from 'zod';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const qrBatchSchema = z.object({
  type: z.enum(['students', 'teachers', 'staff']),
  class_id: z.string().uuid().nullable().optional(),
  expires_hours: z.number().min(1).max(72).default(8),
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

// POST /api/pointage/qr/batch â€” generate QR codes for all students/teachers in a class or school
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
    const bodyValidation = qrBatchSchema.safeParse(body);
    if (!bodyValidation.success) {
      return NextResponse.json({ error: bodyValidation.error.issues[0]?.message || 'Paramètres invalides' }, { status: 400 });
    }
    const { type, class_id, expires_hours } = bodyValidation.data;
    const secret = process.env.QR_SIGNING_SECRET;
    if (!secret) {
      return NextResponse.json({ error: 'Configuration serveur manquante (QR_SIGNING_SECRET)' }, { status: 500 });
    }
    const expiresInMs = (expires_hours || 8) * 60 * 60 * 1000;

    let people: any[] = [];

    if (type === 'students' && class_id) {
      // Get all active students in the class
      const { data: students } = await supabase
        .from('students')
        .select('*, user:users!students_user_id_fkey(*)')
        .eq('class_id', class_id)
        .eq('school_id', schoolId)
        .eq('is_active', true);
      people = students || [];
    } else if (type === 'students') {
      // Get all active students in the school
      const { data: students } = await supabase
        .from('students')
        .select('*, user:users!students_user_id_fkey(*)')
        .eq('school_id', schoolId)
        .eq('is_active', true);
      people = students || [];
    } else if (type === 'teachers') {
      // Get all active teachers in the school
      const { data: teachers } = await supabase
        .from('teachers')
        .select('*, user:users!teachers_user_id_fkey(*)')
        .eq('school_id', schoolId)
        .eq('is_active', true);
      people = teachers || [];
    } else if (type === 'staff') {
      // Get all active staff in the school
      const { data: staffMembers } = await supabase
        .from('staff')
        .select('*, user:users(*)')
        .eq('school_id', schoolId)
        .eq('is_active', true);
      people = staffMembers || [];
    } else {
      return NextResponse.json({ error: 'Type invalide. Utilisez "students" ou "teachers"' }, { status: 400 });
    }

    if (people.length === 0) {
      return NextResponse.json({ error: 'Aucun utilisateur trouvé', qr_codes: [] }, { status: 404 });
    }

    const qrCodes = [];
    const errors = [];

    for (const person of people) {
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
        const personType = type === 'teachers' ? 'teacher' : type === 'staff' ? 'staff' : 'student';
        const name = person.user?.name || `${person.first_name} ${person.last_name}`;
        const matricule = person.matricule || person.employee_id;

        const qrToken = generateSignedToken({
          user_id: person.user_id,
          matricule,
          type: personType,
          school_id: schoolId,
          name,
        }, secret, expiresInMs);

        // Upsert QR record
        const { data: qrRecord } = await supabase.from('qr_codes').upsert({
          user_id: person.user_id,
          school_id: schoolId,
          qr_data: qrToken,
          barcode_data: matricule,
          is_active: true,
          expires_at: new Date(Date.now() + expiresInMs).toISOString(),
        }, { onConflict: 'user_id' }).select().single();

        qrCodes.push({
          user_id: person.user_id,
          name,
          matricule,
          type: personType,
          qr_token: qrToken,
          qr_id: qrRecord?.id,
        });
      } catch (err: any) {
        errors.push({
          user_id: person.user_id,
          name: person.user?.name || `${person.first_name} ${person.last_name}`,
          error: err.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      total: people.length,
      generated: qrCodes.length,
      errors: errors.length,
      qr_codes: qrCodes,
      error_details: errors,
      expires_at: new Date(Date.now() + expiresInMs).toISOString(),
    });
  } catch (error: any) {
    console.error('Batch QR generation error:', error);
    return NextResponse.json({ error: error.message || 'Erreur serveur' }, { status: 500 });
  }
}
