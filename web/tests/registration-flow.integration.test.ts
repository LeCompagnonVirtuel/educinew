// @vitest-environment node
// Integration test: Full registration → OTP → activation → school creation flow

import { describe, it, expect, afterAll } from 'vitest';
import { createClient } from '@supabase/supabase-js';
import { createHash } from 'crypto';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_KEY) {
  throw new Error('Missing required env vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const TEST_EMAIL = `test.flow.${Date.now()}@educi-test.ci`;
const TEST_PASSWORD = 'TestFlow2026!';
const TEST_NAME = 'Test Flow Admin';
const TEST_SCHOOL = `École Test ${Date.now()}`;

let testUserId: string | null = null;
let testSchoolId: string | null = null;

function hashOTP(otp: string): string {
  return createHash('sha256').update(otp).digest('hex');
}

describe('Registration Flow: Inscription → OTP → Activation → School', () => {
  // ─── STEP 1: Sign up ───────────────────────────────────────
  it('1. signUp creates auth user with pending confirmation', async () => {
    const { data, error } = await supabase.auth.signUp({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      options: {
        data: { name: TEST_NAME, role: 'ADMIN', school_name: TEST_SCHOOL },
      },
    });

    expect(error).toBeNull();
    expect(data.user).toBeTruthy();
    expect(data.user!.id).toBeTruthy();
    testUserId = data.user!.id;

    // Verify user was created in auth
    const { data: { user } } = await admin.auth.admin.getUserById(testUserId!);
    expect(user).toBeTruthy();
    expect(user!.email).toBe(TEST_EMAIL);
    console.log('  ✓ Auth user created:', testUserId);
  });

  // ─── STEP 2: handle_new_user trigger creates public.users row ───
  it('2. handle_new_user trigger creates public.users row', async () => {
    // Small delay for trigger to fire
    await new Promise(r => setTimeout(r, 1000));

    const { data: userRow, error } = await admin
      .from('users')
      .select('id, name, email, role, school_id, is_active, status')
      .eq('id', testUserId!)
      .single();

    expect(error).toBeNull();
    expect(userRow).toBeTruthy();
    expect(userRow!.email).toBe(TEST_EMAIL);
    expect(userRow!.role).toBe('STUDENT'); // trigger sets default role
    expect(userRow!.school_id).toBeNull(); // no school yet
    console.log('  ✓ public.users row exists:', userRow!.id);
  });

  // ─── STEP 3: Save onboarding draft ───────────────────────
  it('3. Save onboarding draft (simulates /api/auth/save-draft)', async () => {
    const { data, error } = await admin
      .from('onboarding_drafts')
      .insert({
        user_id: testUserId!,
        email: TEST_EMAIL,
        school_name: TEST_SCHOOL,
        step: 1,
        data: { admin_name: TEST_NAME, school_type: 'SECONDARY', city: 'Abidjan', region: 'ABJ' },
        completed: false,
      })
      .select()
      .single();

    expect(error).toBeNull();
    expect(data).toBeTruthy();
    expect(data!.completed).toBe(false);
    console.log('  ✓ Onboarding draft saved:', data!.id);
  });

  // ─── STEP 4: Generate and store OTP ────────────────────────
  it('4. Generate OTP token (simulates /api/auth/resend-confirmation)', async () => {
    const otpCode = '123456';
    const otpHashed = hashOTP(otpCode);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    const { data, error } = await admin
      .from('email_confirmation_tokens')
      .insert({
        user_id: testUserId!,
        token: `test_token_${Date.now()}`,
        otp_hashed: otpHashed,
        otp_code: otpCode,
        otp_attempts: 0,
        email: TEST_EMAIL,
        expires_at: expiresAt,
      })
      .select()
      .single();

    expect(error).toBeNull();
    expect(data).toBeTruthy();
    console.log('  ✓ OTP token stored (hashed):', data!.id);
  });

  // ─── STEP 5: Verify OTP (correct code) ────────────────────
  it('5. Verify OTP activates user + creates school', async () => {
    const otpCode = '123456';
    const otpHashed = hashOTP(otpCode);

    // Find the token
    const { data: tokenRecord, error: fetchError } = await admin
      .from('email_confirmation_tokens')
      .select('*')
      .eq('email', TEST_EMAIL)
      .is('used_at', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    expect(fetchError).toBeNull();
    expect(tokenRecord).toBeTruthy();
    expect(tokenRecord!.otp_hashed).toBe(otpHashed);

    // ── Simulate what verify-otp route does: ──

    // 5a. Activate user (confirm email)
    const { error: activateError } = await admin.auth.admin.updateUserById(testUserId!, {
      email_confirm: true,
      user_metadata: { name: TEST_NAME, role: 'ADMIN', school_name: TEST_SCHOOL, email_confirmed: true, is_active: true },
    });
    expect(activateError).toBeNull();
    console.log('  ✓ User email confirmed');

    // 5b. Mark token as used
    await admin
      .from('email_confirmation_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('id', tokenRecord!.id);

    // 5c. Create school via register_school_via_activation
    const { data: newSchool, error: schoolError } = await admin
      .rpc('register_school_via_activation', {
        p_admin_id: testUserId!,
        p_admin_name: TEST_NAME,
        p_admin_email: TEST_EMAIL,
        p_school_name: TEST_SCHOOL,
        p_school_type: 'SECONDARY',
        p_region: 'ABJ',
        p_city: 'Abidjan',
        p_address: '',
        p_phone: '',
        p_school_email: TEST_EMAIL,
      });

    expect(schoolError).toBeNull();
    expect(newSchool).toBeTruthy();

    testSchoolId = typeof newSchool === 'object' ? newSchool.id : newSchool;
    expect(testSchoolId).toBeTruthy();
    console.log('  ✓ School created:', testSchoolId);

    // 5d. Update user metadata with school_id
    await admin.auth.admin.updateUserById(testUserId!, {
      user_metadata: { name: TEST_NAME, role: 'ADMIN', school_id: testSchoolId, school_name: TEST_SCHOOL },
    });

    // 5e. Update draft
    await admin
      .from('onboarding_drafts')
      .update({ completed: true, school_id: testSchoolId })
      .eq('user_id', testUserId!)
      .eq('completed', false);

    console.log('  ✓ Draft marked completed');
  });

  // ─── STEP 6: Verify school was created correctly ───────────
  it('6. School exists with correct data', async () => {
    const { data: school, error } = await admin
      .from('schools')
      .select('*')
      .eq('id', testSchoolId!)
      .single();

    expect(error).toBeNull();
    expect(school).toBeTruthy();
    expect(school!.name).toBe(TEST_SCHOOL);
    expect(school!.code).toBeTruthy();
    expect(school!.city).toBe('Abidjan');
    console.log('  ✓ School data correct. Code:', school!.code);
  });

  // ─── STEP 7: Verify user is now ADMIN with school_id ───────
  it('7. User is ADMIN with school_id in public.users', async () => {
    const { data: user, error } = await admin
      .from('users')
      .select('*')
      .eq('id', testUserId!)
      .single();

    expect(error).toBeNull();
    expect(user).toBeTruthy();
    expect(user!.role).toBe('ADMIN');
    expect(user!.school_id).toBe(testSchoolId);
    expect(user!.is_active).toBe(true);
    console.log('  ✓ User role=ADMIN, school_id set, is_active=true');
  });

  // ─── STEP 8: Verify subscription was created ──────────────
  it('8. Free trial subscription exists', async () => {
    const { data: sub, error } = await admin
      .from('subscriptions')
      .select('*')
      .eq('school_id', testSchoolId!)
      .single();

    expect(error).toBeNull();
    expect(sub).toBeTruthy();
    expect(sub!.plan).toBe('FREE_TRIAL');
    expect(sub!.status).toBe('ACTIVE');
    expect(sub!.monthly_amount).toBe(0);
    console.log('  ✓ Subscription: FREE_TRIAL, ACTIVE');
  });

  // ─── STEP 9: Verify academic year was created ─────────────
  it('9. Academic year exists', async () => {
    const { data: year, error } = await admin
      .from('academic_years')
      .select('*')
      .eq('school_id', testSchoolId!)
      .eq('is_active', true)
      .single();

    expect(error).toBeNull();
    expect(year).toBeTruthy();
    expect(year!.name).toBeTruthy();
    console.log('  ✓ Academic year:', year!.name);
  });

  // ─── STEP 10: User can login ──────────────────────────────
  it('10. User can login with credentials', async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });

    expect(error).toBeNull();
    expect(data.session).toBeTruthy();
    expect(data.user).toBeTruthy();
    expect(data.user!.user_metadata?.role).toBe('ADMIN');
    expect(data.user!.user_metadata?.school_id).toBe(testSchoolId);
    console.log('  ✓ Login successful, token received');
  });

  // ─── STEP 11: RLS allows user to see their own school ─────
  it('11. Authenticated user can read their school via RLS', async () => {
    // Login as the test user
    const { data: loginData } = await supabase.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });

    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${loginData.session!.access_token}` } },
    });

    const { data: school, error } = await userClient
      .from('schools')
      .select('id, name, code')
      .eq('id', testSchoolId!)
      .single();

    expect(error).toBeNull();
    expect(school).toBeTruthy();
    expect(school!.name).toBe(TEST_SCHOOL);
    console.log('  ✓ RLS: user can read their school');
  });

  // ─── CLEANUP ──────────────────────────────────────────────
  afterAll(async () => {
    if (testUserId) {
      // Delete in correct order (FK constraints)
      if (testSchoolId) {
        await admin.from('subscriptions').delete().eq('school_id', testSchoolId);
        await admin.from('academic_years').delete().eq('school_id', testSchoolId);
        await admin.from('school_branding').delete().eq('school_id', testSchoolId);
        await admin.from('users').delete().eq('school_id', testSchoolId);
        await admin.from('schools').delete().eq('id', testSchoolId);
      }
      await admin.from('onboarding_drafts').delete().eq('user_id', testUserId);
      await admin.from('email_confirmation_tokens').delete().eq('user_id', testUserId);
      await admin.from('users').delete().eq('id', testUserId);
      await admin.auth.admin.deleteUser(testUserId);
      console.log('  🧹 Test data cleaned up');
    }
  });
});
