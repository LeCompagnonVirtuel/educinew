import { createClient as createServerSupabase } from '@/lib/supabase/server';
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { generateMatricule, isValidMatricule, normalizeMatricule } from '@/lib/matricule';
export const runtime = 'nodejs';

const VALID_ROLES = ['STUDENT', 'TEACHER', 'PARENT', 'ADMIN', 'COMPTABLE', 'SECRETAIRE', 'CENSEUR', 'SURVEILLANT', 'DIRECTEUR', 'CHAUFFEUR'];

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  if (!['ADMIN', 'SUPER_ADMIN'].includes(profile?.role)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const body = await req.json();
  const { name, email, password: clientPassword, role: targetRole, phone, classId, subjectId, position, department } = body;

  // Role hierarchy validation — prevent privilege escalation
  const ROLE_HIERARCHY: Record<string, number> = {
    'STUDENT': 1, 'PARENT': 1, 'CHAUFFEUR': 2,
    'SURVEILLANT': 3, 'SECRETAIRE': 3, 'CENSEUR': 3, 'COMPTABLE': 3,
    'TEACHER': 4, 'ADMIN': 5, 'SUPER_ADMIN': 10,
  };
  if ((ROLE_HIERARCHY[targetRole] || 0) >= (ROLE_HIERARCHY[profile?.role] || 0)) {
    return NextResponse.json({ error: 'Impossible de créer un utilisateur avec un rôle supérieur ou égal au vôtre' }, { status: 403 });
  }

  if (!name || !targetRole) {
    return NextResponse.json({ error: 'name et role sont requis' }, { status: 400 });
  }
  if (!VALID_ROLES.includes(targetRole)) {
    return NextResponse.json({ error: `Rôle invalide: ${targetRole}` }, { status: 400 });
  }

  const schoolId = profile?.school_id;
  if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

  // Get school code
  const { data: school } = await supabase.from('schools').select('school_code, city').eq('id', schoolId).single();
  const schoolCode = school?.school_code || 'EDUCI-SYS-XXX-00000';

  // Generate enterprise fields via RPC
  const { data: enterpriseData, error: rpcError } = await supabase.rpc('create_enterprise_user', {
    p_school_id: schoolId,
    p_name: name,
    p_email: email || `${targetRole.toLowerCase()}_${Date.now()}@educi.local`,
    p_role: targetRole,
    p_phone: phone || null,
    p_class_id: classId || null,
    p_subject_id: subjectId || null,
    p_position: position || null,
    p_department: department || null,
  });

  if (rpcError) {
    return NextResponse.json({ error: `Erreur génération: ${rpcError.message}` }, { status: 500 });
  }

  const { identifier, invitation_code, temp_password, activation_token, expires_at } = enterpriseData;
  const finalPassword = clientPassword || temp_password;
  const userEmail = email || `${identifier.toLowerCase()}@educi.local`;

  // Create auth user with service_role
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: 'Configuration serveur manquante (SUPABASE_SERVICE_ROLE_KEY)' }, { status: 500 });
  }

  const adminClient = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
    email: userEmail,
    password: finalPassword,
    email_confirm: true,
    user_metadata: {
      name,
      role: targetRole,
      school_id: schoolId,
      identifier,
      invitation_code,
      is_first_login: true,
    },
  });

  if (authError) {
    if (authError.message.includes('already been registered')) {
      return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 409 });
    }
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  if (!authData.user) {
    return NextResponse.json({ error: 'Échec de la création du compte' }, { status: 500 });
  }

  const newUserId = authData.user.id;

  // Upsert user with enterprise fields (use adminClient to bypass RLS — admin auth already verified)
  const { error: userError } = await adminClient.from('users').upsert({
    id: newUserId,
    name,
    email: userEmail,
    role: targetRole,
    school_id: schoolId,
    phone: phone || null,
    identifier,
    invitation_code,
    activation_token,
    activation_expires_at: expires_at,
    is_active: true,
    is_activated: true,
    status: 'ACTIVE',
  }, { onConflict: 'id' });

  if (userError) {
    await adminClient.auth.admin.deleteUser(newUserId);
    return NextResponse.json({ error: `Erreur profil: ${userError.message}` }, { status: 500 });
  }

  // Insert into role-specific table (use adminClient to bypass RLS)
  if (targetRole === 'STUDENT') {
    const rawMatricule = body.matricule || generateMatricule();
    const matricule = normalizeMatricule(rawMatricule);
    if (!isValidMatricule(matricule)) {
      return NextResponse.json({ error: `Matricule invalide: ${rawMatricule}. Format attendu: 16137807D (8 chiffres + 1 lettre majuscule)` }, { status: 400 });
    }
    const studentInsert: Record<string, any> = {
      user_id: newUserId,
      school_id: schoolId,
      class_id: classId || null,
      matricule,
      is_active: true,
    };
    if (body.dateOfBirth) studentInsert.date_of_birth = body.dateOfBirth;
    if (body.gender) studentInsert.gender = body.gender;
    if (body.address) studentInsert.address = body.address;
    const { error: studentError } = await adminClient.from('students').insert(studentInsert);
    if (studentError) {
      await adminClient.from('users').delete().eq('id', newUserId);
      await adminClient.auth.admin.deleteUser(newUserId);
      return NextResponse.json({ error: `Erreur élève: ${studentError.message}` }, { status: 500 });
    }
  } else if (targetRole === 'TEACHER') {
    const { error: teacherError } = await adminClient.from('teachers').insert({
      user_id: newUserId,
      school_id: schoolId,
      subject_id: subjectId || null,
      phone: phone || null,
    });
    if (teacherError) {
      await adminClient.from('users').delete().eq('id', newUserId);
      await adminClient.auth.admin.deleteUser(newUserId);
      return NextResponse.json({ error: `Erreur enseignant: ${teacherError.message}` }, { status: 500 });
    }
  } else if (['SECRETAIRE', 'COMPTABLE', 'CENSEUR', 'SURVEILLANT', 'DIRECTEUR', 'CHAUFFEUR'].includes(targetRole)) {
    const { error: staffError } = await adminClient.from('staff').insert({
      user_id: newUserId,
      school_id: schoolId,
      position: position || targetRole,
      department: department || null,
      phone: phone || null,
      is_active: true,
    });
    if (staffError) {
      await adminClient.from('users').delete().eq('id', newUserId);
      await adminClient.auth.admin.deleteUser(newUserId);
      return NextResponse.json({ error: `Erreur personnel: ${staffError.message}` }, { status: 500 });
    }
  } else if (targetRole === 'PARENT') {
    const { error: parentError } = await adminClient.from('parents').upsert({
      user_id: newUserId,
      school_id: schoolId,
    }, { onConflict: 'user_id' });
    if (parentError) {
      await adminClient.from('users').delete().eq('id', newUserId);
      await adminClient.auth.admin.deleteUser(newUserId);
      return NextResponse.json({ error: `Erreur parent: ${parentError.message}` }, { status: 500 });
    }
  }

  // Audit log (use adminClient to bypass RLS)
  await adminClient.from('audit_logs').insert({
    school_id: schoolId,
    user_id: user.id,
    action: 'CREATE_USER',
    entity: 'users',
    entity_id: newUserId,
    details: JSON.stringify({ role: targetRole, identifier, name }),
  });

  // Generate QR code for the user
  let qrToken = null;
  let qrUrl = null;
  try {
    const crypto = await import('crypto');
    const qrSecret = process.env.QR_SIGNING_SECRET;
    if (!qrSecret) {
      console.error('[create-user] QR_SIGNING_SECRET not configured - skipping QR generation');
    } else {
      const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'QR' })).toString('base64url');
      const payload = Buffer.from(JSON.stringify({
        user_id: newUserId,
        identifier,
        type: targetRole.toLowerCase(),
        school_id: schoolId,
        name,
        jti: crypto.randomBytes(16).toString('hex'),
        iat: Date.now(),
        exp: Date.now() + 8 * 60 * 60 * 1000,
      })).toString('base64url');
      const signature = crypto.createHmac('sha256', qrSecret).update(`${header}.${payload}`).digest('hex');
      qrToken = `${header}.${payload}.${signature}`;

      await adminClient.from('qr_codes').upsert({
        user_id: newUserId,
        school_id: schoolId,
        qr_data: qrToken,
        barcode_data: identifier,
        is_active: true,
        expires_at: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
      }, { onConflict: 'user_id' });

      // Generate QR image via Edge Function (best-effort, non-blocking)
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
          const qrRes = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/generate-qr`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({ userId: newUserId, userType: targetRole, matricule: identifier, name }),
          });
          if (qrRes.ok) {
            qrUrl = qrRes.headers.get('X-QR-Url') || null;
          }
        }
      } catch { /* Image generation is best-effort */ }
    }
  } catch { /* QR generation is best-effort */ }

  // Return access kit (temp_password only shown once — admin must communicate it securely)
  return NextResponse.json({
    user: {
      id: newUserId,
      name,
      email: userEmail,
      role: targetRole,
      identifier,
      invitation_code,
      school_code: schoolCode,
      activation_token,
      activation_expires_at: expires_at,
      qr_token: qrToken,
      qr_url: qrUrl,
    },
    access_kit: {
      identifier,
      invitation_code,
      initial_password: finalPassword,
      school_code: schoolCode,
      qr_token: qrToken,
      qr_url: qrUrl,
      activation_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://educi.live'}/register?token=${activation_token}`,
      expires_at,
      security_notice: 'Ce mot de passe est temporaire et ne sera plus accessible après cette réponse. Transmettez-le de manière sécurisée.',
    },
  }, { status: 201 });
}
