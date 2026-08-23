import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { createHmac } from 'crypto';
import { checkRateLimit, rateLimitResponse, VERIFY_RATE_LIMIT } from '@/lib/rate-limit';
export const runtime = 'nodejs';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function getVerificationSecret(): string {
  const secret = process.env.VERIFICATION_SECRET;
  if (!secret) throw new Error('VERIFICATION_SECRET is required');
  return secret;
}

function hashToken(token: string): string {
  return createHmac('sha256', getVerificationSecret()).update(token).digest('hex');
}

async function findUserByToken(supabase: ReturnType<typeof createClient>, token: string) {
  const tokenHash = hashToken(token);

  const { data, error } = await supabase
    .from('users')
    .select('id, email, verification_expires_at, email_verified')
    .eq('verification_token', tokenHash)
    .single();
  if (data && !error) return data;

  const { data: legacy, error: legacyErr } = await supabase
    .from('users')
    .select('id, email, verification_expires_at, email_verified')
    .eq('verification_token', token)
    .single();
  if (legacy && !legacyErr) return legacy;

  return null;
}

export async function POST(request: NextRequest) {
  const rl = checkRateLimit(request, VERIFY_RATE_LIMIT);
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

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
    const supabaseAdmin = getSupabaseAdmin();
    const { token } = await request.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Token requis.', reason: 'missing' }, { status: 400 });
    }

    // Find user with this verification token (multi-hash + raw fallback)
    const userRecord = await findUserByToken(supabaseAdmin, token);

    if (!userRecord) {
      return NextResponse.json({ error: 'Lien invalide ou déjà utilisé.', reason: 'invalid' }, { status: 400 });
    }

    // Check if already verified
    if (userRecord.email_verified) {
      return NextResponse.json({ error: 'Compte déjà activé.', reason: 'already_verified' }, { status: 400 });
    }

    // Check expiration
    if (userRecord.verification_expires_at && new Date(userRecord.verification_expires_at) < new Date()) {
      return NextResponse.json({ error: 'Ce lien a expiré. Demandez un nouveau lien.', reason: 'expired' }, { status: 400 });
    }

    const userId = userRecord.id;
    const normalizedEmail = userRecord.email;

    // Get auth user
    const { data: { user: authUser }, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId);
    if (userError || !authUser) {
      return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 400 });
    }

    // Check if already confirmed in auth
    if (authUser.email_confirmed_at) {
      // Just clean up token
      await supabaseAdmin
        .from('users')
        .update({ verification_token: null, email_verified: true, email_verified_at: new Date().toISOString() })
        .eq('id', userId);
      return NextResponse.json({ error: 'Compte déjà activé.', reason: 'already_verified' }, { status: 400 });
    }

    // === ACTIVATE USER ===
    const { error: activateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      email_confirm: true,
      user_metadata: { ...authUser.user_metadata, email_confirmed: true, is_active: true },
    });

    if (activateError) {
      console.error('[verify-email] Failed to activate user:', activateError);
      return NextResponse.json({ error: 'Erreur lors de l\'activation.' }, { status: 500 });
    }

    // Update users table
    await supabaseAdmin
      .from('users')
      .update({
        email_verified: true,
        email_verified_at: new Date().toISOString(),
        verification_token: null,
        verification_expires_at: null,
        is_active: true,
        status: 'ACTIVE',
      })
      .eq('id', userId);

    // === CREATE SCHOOL IF NEEDED ===
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id, school_id, role')
      .eq('id', userId)
      .single();

    let schoolId = existingUser?.school_id;
    let schoolCreated = false;
    let onboardingCompleted = false;

    if (!schoolId) {
      const { data: draft } = await supabaseAdmin
        .from('onboarding_drafts')
        .select('*')
        .eq('user_id', userId)
        .eq('completed', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (draft) {
        const draftData = draft.data || {};
        const { data: newSchool, error: schoolError } = await supabaseAdmin
          .rpc('register_school_via_activation', {
            p_admin_id: userId,
            p_admin_name: draftData.admin_name || draft.email || authUser.user_metadata?.name || normalizedEmail,
            p_admin_email: draft.email || normalizedEmail,
            p_school_name: draft.school_name || 'Mon établissement',
            p_school_type: draftData.school_type || 'SECONDARY',
            p_region: draftData.region || '',
            p_city: draftData.city || '',
            p_address: draftData.address || '',
            p_phone: draftData.phone || '',
            p_school_email: draft.email || normalizedEmail,
          });

        if (!schoolError && newSchool) {
          schoolId = typeof newSchool === 'object' ? newSchool.id : newSchool;
          schoolCreated = true;

          await supabaseAdmin
            .from('onboarding_drafts')
            .update({ completed: true, school_id: schoolId })
            .eq('id', draft.id);

          await supabaseAdmin.auth.admin.updateUserById(userId, {
            user_metadata: { ...authUser.user_metadata, school_id: schoolId, role: 'ADMIN', email_confirmed: true, is_active: true },
          });

          await supabaseAdmin
            .from('users')
            .update({ school_id: schoolId, role: 'ADMIN' })
            .eq('id', userId);
        }
      }
    }

    // === CREATE INFRASTRUCTURE ===
    if (schoolId) {
      await createInfrastructure(supabaseAdmin, schoolId, userId);
    }

    // === CHECK ONBOARDING ===
    if (schoolId) {
      const { data: onboardingDraft } = await supabaseAdmin
        .from('onboarding_drafts')
        .select('step, completed')
        .eq('school_id', schoolId)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
      onboardingCompleted = onboardingDraft?.completed === true;
    }

    // === GENERATE SESSION ===
    const { data: linkData } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: normalizedEmail,
    });

    // Get profile
    const { data: profile } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    return NextResponse.json({
      success: true,
      schoolCreated,
      schoolId,
      hasSchool: !!schoolId,
      onboardingCompleted,
      userId,
      email: normalizedEmail,
      sessionToken: linkData?.properties?.action_link || null,
      profile: {
        name: profile?.name || authUser.user_metadata?.name || '',
        email: profile?.email || normalizedEmail || '',
        role: profile?.role || 'ADMIN',
        schoolId,
      },
    });
  } catch (error) {
    console.error('[verify-email] Error:', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}

async function createInfrastructure(supabase: any, schoolId: string, _userId: string) {
  const steps = [
    async () => {
      const { data: existing } = await supabase
        .from('academic_years')
        .select('id')
        .eq('school_id', schoolId)
        .eq('is_active', true)
        .single();
      if (!existing) {
        const y = new Date().getFullYear();
        await supabase.from('academic_years').insert({
          school_id: schoolId,
          name: `${y}-${y + 1}`,
          start_date: `${y}-09-01`,
          end_date: `${y + 1}-06-30`,
          is_active: true,
        });
      }
    },
    async () => {
      const { data: existing } = await supabase
        .from('subscriptions')
        .select('id')
        .eq('school_id', schoolId)
        .single();
      if (!existing) {
        await supabase.from('subscriptions').insert({
          school_id: schoolId,
          plan: 'FREE_TRIAL',
          status: 'ACTIVE',
          start_date: new Date().toISOString(),
          end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          monthly_amount: 0,
          yearly_amount: 0,
        });
      }
    },
    async () => {
      const { data: existing } = await supabase
        .from('school_branding')
        .select('id')
        .eq('school_id', schoolId)
        .single();
      if (!existing) {
        await supabase.from('school_branding').insert({
          school_id: schoolId,
          primary_color: '#4F46E5',
          secondary_color: '#60A5FA',
        });
      }
    },
  ];

  for (const step of steps) {
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
      await step();
    } catch (err) {
      console.error('[verify-email] Infrastructure step failed:', err);
    }
  }
}
