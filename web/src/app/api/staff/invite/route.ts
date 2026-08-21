import { withSupabase } from '@supabase/server';

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
  if (!schoolId) {
    return Response.json({ error: 'Établissement non identifié' }, { status: 403 });
  }

  const body = await req.json();
  const VALID_STAFF_ROLES = ['SECRETAIRE', 'COMPTABLE', 'CENSEUR', 'SURVEILLANT', 'DIRECTEUR'];
  let staffRole = body.staffRole;
  if (staffRole && !VALID_STAFF_ROLES.includes(staffRole)) {
    console.warn(`Invalid staff role "${staffRole}" provided, defaulting to SECRETAIRE`);
    staffRole = 'SECRETAIRE';
  }
  const { email, position, department } = body;

  if (!email || !staffRole || !position) {
    return Response.json({ error: 'email, staffRole et position sont requis' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json({ error: 'Format d\'email invalide' }, { status: 400 });
  }

  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const { error: inviteError } = await supabase
    .from('staff_invitations')
    .insert({
      school_id: schoolId,
      email,
      role: staffRole,
      position,
      department: department || null,
      invitation_token: token,
      status: 'PENDING',
      invited_by: user?.id,
      expires_at: expiresAt,
    });
  if (inviteError) {
    if (inviteError.code === '23505') {
      return Response.json({ error: 'Une invitation est déjà en cours pour cet email' }, { status: 409 });
    }
    return Response.json({ error: inviteError.message }, { status: 500 });
  }

  const { data: school } = await supabase
    .from('schools')
    .select('name')
    .eq('id', schoolId)
    .single();

  const { data: adminUser } = await supabase
    .from('users')
    .select('name')
    .eq('id', user?.id)
    .single();

  let emailResult = null;
  try {
    const { sbEmailTrigger } = await import('@/lib/api/domains/email-trigger.service');
    const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://educi.live';
    const inviteUrl = `${BASE_URL}/register?token=${token}`;
    sbEmailTrigger.onInvitation(
      email,
      adminUser?.name || 'Administration',
      school?.name || 'École',
      staffRole,
      token,
      expiresAt,
    );
    emailResult = 'Invitation envoyée';
  } catch (e) {
    emailResult = 'Invitation enregistrée mais email non envoyé';
  }

  return Response.json({
    invitation: { id: crypto.randomUUID(), email, role: staffRole, position, token, expires_at: expiresAt },
    message: emailResult,
  }, { status: 201 });
});
