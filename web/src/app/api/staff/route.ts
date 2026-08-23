import { withSupabase } from '@supabase/server';
import { staffSchema, validateRequest } from '@/lib/api/validation';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });
  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const { data, error } = await supabase
    .from('staff')
    .select('*, user:users(id, name, email, photo_url, role, is_active)')
    .eq('school_id', schoolId)
    .order('created_at', { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
});

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
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
  const validation = validateRequest(staffSchema, { ...body, school_id: schoolId });
  if (!validation.success) {
    return Response.json({ error: validation.error }, { status: 400 });
  }

  const VALID_STAFF_ROLES = ['SECRETAIRE', 'COMPTABLE', 'CENSEUR', 'SURVEILLANT', 'DIRECTEUR'];
  let staffRole = body.role || 'SECRETAIRE';
  if (!VALID_STAFF_ROLES.includes(staffRole)) {
    console.warn(`Invalid staff role "${body.role}" provided, defaulting to SECRETAIRE`);
    staffRole = 'SECRETAIRE';
  }

  const tempPassword = crypto.randomUUID().slice(0, 4) + 'Aa1!' + crypto.randomUUID().slice(0, 4);

  // Use service_role client for auth.admin operations (user-scoped client lacks permissions)
  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
    email: validation.data.email,
    password: tempPassword,
    email_confirm: true,
    user_metadata: {
      name: validation.data.name,
      role: staffRole,
      school_id: schoolId,
      is_first_login: true,
    },
  });

  if (authError) {
    if (authError.message?.includes('already')) {
      return Response.json({ error: 'Cet email est déjà utilisé' }, { status: 409 });
    }
    return Response.json({ error: authError.message }, { status: 500 });
  }

  const newUserId = authData?.user?.id;
  if (!newUserId) return Response.json({ error: 'Erreur création compte' }, { status: 500 });

  const { data: staffRecord, error: staffError } = await adminClient
    .from('staff')
    .insert({
      user_id: newUserId,
      school_id: schoolId,
      position: validation.data.position,
      department: validation.data.department || null,
      phone: validation.data.phone || null,
      contract_type: validation.data.contract_type || 'CDI',
      is_active: true,
    })
    .select()
    .single();

  if (staffError) {
    await adminClient.auth.admin.deleteUser(newUserId);
    return Response.json({ error: staffError.message }, { status: 500 });
  }

  const { error: userError } = await adminClient.from('users').upsert({
    id: newUserId,
    name: validation.data.name,
    email: validation.data.email,
    role: staffRole,
    school_id: schoolId,
    is_active: true,
    status: 'ACTIVE',
  }, { onConflict: 'id' });

  if (userError) {
    await adminClient.from('staff').delete().eq('user_id', newUserId);
    await adminClient.auth.admin.deleteUser(newUserId);
    return Response.json({ error: `Erreur profil: ${userError.message}` }, { status: 500 });
  }

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
    const { sbEmailTrigger } = await import('@/lib/api/domains/email-trigger.service');
    sbEmailTrigger.onTeacherCreated(validation.data.email, validation.data.name, tempPassword);
  } catch (e) {
    console.error('[StaffCreate] Failed to send temp password email:', e);
  }

  return Response.json({
    staff: staffRecord,
    message: 'Compte créé avec succès. Un email avec le mot de passe temporaire a été envoyé.',
  }, { status: 201 });
});
