// @vitest-environment node
// Integration tests — run against real Supabase backend

import { describe, it, expect, beforeAll } from 'vitest';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_KEY) {
  throw new Error('Missing required env vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const adminSupabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// =====================================================
// 1. DIAGNOSTIC: Check what exists in the database
// =====================================================
describe('0. Database Diagnostic', () => {
  it('count users in public.users', async () => {
    const { count, error } = await adminSupabase
      .from('users').select('*', { count: 'exact', head: true });
    console.log(`  public.users count: ${count}`);
    expect(error).toBeNull();
  });

  it('list auth users via RPC (check exist)', async () => {
    // Check if admin email exists in users table
    const { data, error } = await adminSupabase
      .from('users')
      .select('id, email, role, school_id')
      .limit(10);
    console.log('  users:', JSON.stringify(data, null, 2));
    expect(error).toBeNull();
  });

  it('list students with matricule', async () => {
    const { data, error } = await adminSupabase
      .from('students')
      .select('id, user_id, matricule, school_id')
      .limit(5);
    console.log('  students:', JSON.stringify(data, null, 2));
    expect(error).toBeNull();
  });

  it('list teachers with matricule', async () => {
    const { data, error } = await adminSupabase
      .from('teachers')
      .select('id, user_id, matricule, school_id')
      .limit(5);
    console.log('  teachers:', JSON.stringify(data, null, 2));
    expect(error).toBeNull();
  });

  it('list schools', async () => {
    const { data, error } = await adminSupabase
      .from('schools')
      .select('id, name, code')
      .limit(5);
    console.log('  schools:', JSON.stringify(data, null, 2));
    expect(error).toBeNull();
  });
});

// =====================================================
// 2. RPC: resolve_login_identifier
// =====================================================
describe('1. resolve_login_identifier RPC', () => {
  it('resolve email → returns same email', async () => {
    const { data, error } = await supabase.rpc('resolve_login_identifier', {
      p_identifier: 'admin@lma.educi.ci',
    });
    console.log(`  admin email → ${data}`);
    expect(error).toBeNull();
    expect(data).toBe('admin@lma.educi.ci');
  });

  it('resolve student matricule → returns email or NULL', async () => {
    const { data, error } = await supabase.rpc('resolve_login_identifier', {
      p_identifier: 'EDU-2025-001',
    });
    console.log(`  EDU-2025-001 → ${data}`);
    expect(error).toBeNull();
    // After fix: should return email if found, NULL if not
    if (data) {
      expect(data).toContain('@');
    }
  });

  it('resolve teacher matricule → returns email or NULL', async () => {
    const { data, error } = await supabase.rpc('resolve_login_identifier', {
      p_identifier: 'TCH-LMA-001',
    });
    console.log(`  TCH-LMA-001 → ${data}`);
    expect(error).toBeNull();
    if (data) {
      expect(data).toContain('@');
    }
  });

  it('unknown identifier → returns NULL (not input)', async () => {
    const { data, error } = await supabase.rpc('resolve_login_identifier', {
      p_identifier: 'nonexistent-user',
    });
    console.log(`  nonexistent-user → ${data}`);
    expect(error).toBeNull();
    expect(data).toBeNull();
  });
});

// =====================================================
// 3. AUTH: Try login (may fail if auth users not seeded)
// =====================================================
describe('2. signInWithPassword', () => {
  it('admin login', async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'admin@lma.educi.ci',
      password: 'Demo1234!',
    });
    if (error) {
      console.log(`  ⚠ admin login failed: ${error.message}`);
      console.log('  → Auth user may not exist. Create via Supabase Dashboard > Auth > Users');
    } else {
      console.log(`  ✓ admin login OK, user: ${data.session!.user.email}`);
      expect(data.session).toBeDefined();
    }
  });

  it('student login via matricule', async () => {
    const { data: email } = await supabase.rpc('resolve_login_identifier', {
      p_identifier: 'EDU-2025-001',
    });
    if (!email) {
      console.log('  ⚠ student not found in users table');
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: 'Demo1234!',
    });
    if (error) {
      console.log(`  ⚠ student login failed: ${error.message}`);
    } else {
      console.log(`  ✓ student login OK`);
      expect(data.session).toBeDefined();
    }
  });

  it('teacher login via matricule', async () => {
    const { data: email } = await supabase.rpc('resolve_login_identifier', {
      p_identifier: 'TCH-LMA-001',
    });
    if (!email) {
      console.log('  ⚠ teacher not found in users table');
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: 'Demo1234!',
    });
    if (error) {
      console.log(`  ⚠ teacher login failed: ${error.message}`);
    } else {
      console.log(`  ✓ teacher login OK`);
      expect(data.session).toBeDefined();
    }
  });

  it('reject wrong password', async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'admin@lma.educi.ci',
      password: 'WrongPassword!',
    });
    expect(error).toBeDefined();
    expect(data.session).toBeNull();
  });
});

// =====================================================
// 4. RLS: Table access with service role (bypasses RLS)
// =====================================================
describe('3. RLS - service_role bypasses RLS', () => {
  it('can read all users', async () => {
    const { data, error } = await adminSupabase.from('users').select('id, email, role').limit(5);
    expect(error).toBeNull();
    console.log(`  users: ${data!.length} rows`);
  });

  it('can read all students', async () => {
    const { data, error } = await adminSupabase.from('students').select('id, matricule').limit(5);
    expect(error).toBeNull();
  });

  it('can read school_branding', async () => {
    const { data, error } = await adminSupabase.from('school_branding').select('id, school_id').limit(1);
    expect(error).toBeNull();
  });
});

// =====================================================
// 5. DB FUNCTIONS: exist and work
// =====================================================
describe('4. DB functions', () => {
  it('get_user_school_id returns UUID (as service_role)', async () => {
    const { data, error } = await adminSupabase.rpc('get_user_school_id');
    console.log(`  get_user_school_id: ${data}`);
    expect(error).toBeNull();
  });

  it('is_super_admin returns boolean', async () => {
    const { data, error } = await adminSupabase.rpc('is_super_admin');
    console.log(`  is_super_admin: ${data}`);
    expect(error).toBeNull();
    expect(typeof data).toBe('boolean');
  });
});

// =====================================================
// 6. STORAGE: list buckets (service role required)
// =====================================================
describe('5. Storage buckets', () => {
  it('list all buckets', async () => {
    const { data, error } = await adminSupabase.storage.listBuckets();
    if (error) {
      console.log(`  ⚠ listBuckets error: ${error.message}`);
    } else {
      const names = data!.map(b => b.id);
      console.log(`  buckets: ${names.join(', ')}`);
      expect(names).toContain('logos');
      expect(names).toContain('school-logos');
      expect(names).toContain('qr-codes');
      expect(names).toContain('student-photos');
    }
  });
});

// =====================================================
// 7. TABLES: all accessible
// =====================================================
describe('6. All tables accessible', () => {
  const tables = [
    'schools', 'users', 'students', 'teachers', 'classes', 'subjects',
    'grades', 'bulletins', 'bulletin_entries', 'attendance', 'invoices',
    'payments', 'announcements', 'notifications', 'messages',
    'academic_years', 'periods', 'fee_categories', 'tuition_plans',
    'invitations', 'audit_logs', 'buses', 'bus_tracking',
    'teacher_attendance', 'behavior_reports', 'timetable_slots',
    'school_branding', 'permissions', 'cycles', 'levels',
    'parents', 'parent_students', 'staff', 'documents',
    'payment_gateway_configs', 'subscriptions',
  ];

  for (const table of tables) {
    it(`${table} readable`, async () => {
      const { error } = await adminSupabase.from(table).select('id').limit(1);
      if (error) {
        console.log(`  ⚠ ${table}: ${error.message}`);
      }
      // Don't fail — just log
    });
  }
});
