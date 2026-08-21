import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
export const runtime = 'nodejs';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { token, userId } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Token requis' }, { status: 400 });
    }

    // Step 1: Validate token via RPC (read-only, does NOT consume)
    const { data: tokenData, error: tokenError } = await supabaseAdmin
      .rpc('validate_confirmation_token_readonly', { p_token: token });

    if (tokenError || !tokenData?.[0]?.valid) {
      const reason = tokenData?.[0]?.already_used ? 'already_used'
        : tokenData?.[0]?.expired ? 'expired' : 'invalid';
      // Include email in response so user can request resend
      const email = tokenData?.[0]?.email || null;
      return NextResponse.json({ error: `Token ${reason}`, reason, email }, { status: 400 });
    }

    // Derive userId from token if not provided in body
    const tokenUserId = tokenData[0].user_id;
    const tokenEmail = tokenData[0].email;
    const resolvedUserId = userId || tokenUserId;

    // Step 2: If userId was provided, verify it matches the token
    if (userId && userId !== tokenUserId) {
      return NextResponse.json({ error: 'Token user mismatch' }, { status: 403 });
    }

    // Step 3: Activate user account (confirm email) - PRESERVE existing metadata
    const { data: existingAuthUser } = await supabaseAdmin.auth.admin.getUserById(resolvedUserId);
    const { error: activateError } = await supabaseAdmin.auth.admin.updateUserById(resolvedUserId, {
      email_confirm: true,
      user_metadata: { ...existingAuthUser?.user?.user_metadata, email_confirmed: true, is_active: true }
    });

    if (activateError) {
      console.error('[Activation] Failed to activate user:', activateError);
      return NextResponse.json({ error: 'Failed to activate account' }, { status: 500 });
    }

    // Step 4: Check if school exists for this user
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id, school_id, role')
      .eq('id', resolvedUserId)
      .single();

    let schoolId = existingUser?.school_id;
    let schoolCreated = false;
    let onboardingCompleted = false;

    // Step 5: If no school, check for pending onboarding draft
    if (!schoolId) {
      const { data: draft } = await supabaseAdmin
        .from('onboarding_drafts')
        .select('*')
        .eq('user_id', resolvedUserId)
        .eq('completed', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (draft) {
        const draftData = draft.data || {};
        const { data: newSchool, error: schoolError } = await supabaseAdmin
          .rpc('register_school_via_activation', {
            p_admin_id: resolvedUserId,
            p_admin_name: draftData.admin_name || draft.email,
            p_admin_email: draft.email,
            p_school_name: draft.school_name,
            p_school_type: draftData.school_type || 'SECONDARY',
            p_region: draftData.region || '',
            p_city: draftData.city || '',
            p_address: draftData.address || '',
            p_phone: draftData.phone || '',
            p_school_email: draft.email,
          });

        if (!schoolError && newSchool) {
          schoolId = typeof newSchool === 'object' ? newSchool.id : newSchool;
          schoolCreated = true;

          await supabaseAdmin
            .from('onboarding_drafts')
            .update({ completed: true, school_id: schoolId })
            .eq('id', draft.id);

          // PRESERVE existing metadata when updating
          const { data: authUserData } = await supabaseAdmin.auth.admin.getUserById(resolvedUserId);
          await supabaseAdmin.auth.admin.updateUserById(resolvedUserId, {
            user_metadata: { ...authUserData?.user?.user_metadata, school_id: schoolId, role: 'ADMIN' }
          });

          await supabaseAdmin
            .from('users')
            .update({ school_id: schoolId, role: 'ADMIN' })
            .eq('id', resolvedUserId);
        } else if (schoolError) {
          console.error('[Activation] School creation failed:', schoolError);
          return NextResponse.json({ error: 'Failed to create school', reason: schoolError.message }, { status: 500 });
        }
      }
    }

    // Step 6: If school exists, create infrastructure
    if (schoolId) {
      await createInfrastructure(supabaseAdmin, schoolId, resolvedUserId);
    }

    // Step 7: Check onboarding completion status
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

    // Step 8: Consume token ONLY after successful activation
    await supabaseAdmin
      .from('email_confirmation_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('token', token);

    // Step 9: Generate a magic link for automatic session creation
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: tokenEmail,
    });

    let sessionCreated = false;
    if (!linkError && linkData?.properties?.action_link) {
      sessionCreated = true;
    }

    // Step 10: Get user profile for response
    const { data: profile } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', resolvedUserId)
      .single();

    return NextResponse.json({
      success: true,
      schoolCreated,
      schoolId,
      hasSchool: !!schoolId,
      onboardingCompleted,
      sessionCreated,
      userId: resolvedUserId,
      email: tokenEmail,
      profile: {
        name: profile?.name || profile?.first_name,
        email: profile?.email || tokenEmail,
        role: profile?.role || 'ADMIN',
        schoolId,
      }
    });

  } catch (error) {
    console.error('[Activation] Error:', error);
    return NextResponse.json({ error: 'Activation failed' }, { status: 500 });
  }
}

async function createInfrastructure(supabase: any, schoolId: string, _userId: string) {
  const steps = [
    // 1. Academic year (correct columns: name, is_active)
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
    // 2. Subscription (free trial)
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
    // 3. Branding defaults
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
      await step();
    } catch (err) {
      console.error('[Activation] Infrastructure step failed:', err);
    }
  }
}
