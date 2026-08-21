// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Chainable mock builder
function createChainableMock(finalResult?: any) {
  const chain: any = {};
  const methods = ['select', 'insert', 'update', 'upsert', 'delete', 'eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'like', 'ilike', 'in', 'or', 'order', 'limit', 'range', 'single', 'maybeSingle', 'csv'];
  methods.forEach(m => {
    chain[m] = vi.fn(() => {
      if (m === 'single' || m === 'maybeSingle') return Promise.resolve(finalResult || { data: null, error: null });
      if (m === 'select' || m === 'insert' || m === 'update' || m === 'upsert' || m === 'delete') {
        return {
          ...chain,
          select: chain.select,
          insert: chain.insert,
          update: chain.update,
          upsert: chain.upsert,
          delete: chain.delete,
          eq: chain.eq,
          single: chain.single,
          maybeSingle: chain.maybeSingle,
          order: chain.order,
          limit: chain.limit,
          then: (resolve: any) => Promise.resolve(finalResult || { data: [], error: null }).then(resolve),
        };
      }
      return chain;
    });
  });
  chain.then = (resolve: any) => Promise.resolve(finalResult || { data: [], error: null }).then(resolve);
  return chain;
}

const mockSupabase: any = {
  auth: {
    signInWithPassword: vi.fn(),
    signUp: vi.fn(),
    updateUser: vi.fn(),
    signOut: vi.fn(),
    getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'u1', user_metadata: { role: 'ADMIN', school_id: 'sch1' } } }, error: null }),
    getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
  },
  from: vi.fn(() => createChainableMock({ data: [], error: null })),
  rpc: vi.fn().mockResolvedValue({ data: { id: 'sch1' }, error: null }),
};

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => mockSupabase,
}));

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

describe('sbAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'u1', user_metadata: { role: 'ADMIN', school_id: 'sch1' } } }, error: null });
  });

  it('login returns user and token', async () => {
    const { sbAuth } = await import('@/lib/api/supabase-client');
    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: {
        user: { id: '1', email: 'test@test.com', user_metadata: { name: 'Test', role: 'ADMIN', school_id: 'sch1' } },
        session: { access_token: 'tok123', refresh_token: 'ref123' },
      },
      error: null,
    });

    const result = await sbAuth.login('test@test.com', 'password');
    expect(result.user.email).toBe('test@test.com');
    expect(result.token).toBe('tok123');
    expect(result.user.role).toBe('ADMIN');
  });

  it('login throws on error', async () => {
    const { sbAuth } = await import('@/lib/api/supabase-client');
    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: null,
      error: { message: 'Invalid credentials' },
    });

    await expect(sbAuth.login('test@test.com', 'wrong')).rejects.toThrow('Invalid credentials');
  });

  it('registerSchool creates school + auth user', async () => {
    const { sbAuth } = await import('@/lib/api/supabase-client');
    mockSupabase.auth.signUp.mockResolvedValue({
      data: {
        user: { id: '1', email: 'admin@test.com', user_metadata: { name: 'Admin' } },
        session: null, // No session = requires email confirmation
      },
      error: null,
    });
    mockSupabase.from.mockReturnValue(createChainableMock({ data: { id: 'sch1' }, error: null }));

    // Mock fetch for API calls
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    const result = await sbAuth.registerSchool({
      adminName: 'Admin',
      adminEmail: 'admin@test.com',
      adminPassword: 'pass123',
      schoolName: 'École Test',
      region: 'Dakar',
      city: 'Dakar',
    });

    expect(result.pending).toBe(true);
    expect(result.requiresConfirmation).toBe(true);
    expect(result.userId).toBe('1');
  });
});

describe('sbStudents', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.setItem('user', JSON.stringify({ schoolId: 'sch1' }));
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'u1', user_metadata: { role: 'ADMIN', school_id: 'sch1' } } }, error: null });
  });

  it('list returns students', async () => {
    const { sbStudents } = await import('@/lib/api/supabase-client');
    const mockResult = { data: [{ id: '1', first_name: 'John', last_name: 'Doe', school_id: 'sch1' }], error: null };
    mockSupabase.from.mockReturnValue(createChainableMock(mockResult));

    const result = await sbStudents.list();
    expect(result).toHaveLength(1);
    expect(result[0].firstName).toBe('John');
  });
});

describe('sbGrades', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.setItem('user', JSON.stringify({ schoolId: 'sch1' }));
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'u1', user_metadata: { role: 'ADMIN', school_id: 'sch1' } } }, error: null });
  });

  it('create inserts grade', async () => {
    const { sbGrades } = await import('@/lib/api/supabase-client');
    const mockResult = { data: { id: 'g1' }, error: null };
    mockSupabase.from.mockReturnValue(createChainableMock(mockResult));

    const result = await sbGrades.create({
      studentId: 's1',
      subjectId: 'sub1',
      score: 15,
      coefficient: 2,
    });
    expect(result.id).toBe('g1');
  });
});

describe('sbAttendance', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.setItem('user', JSON.stringify({ schoolId: 'sch1' }));
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'u1', user_metadata: { role: 'ADMIN', school_id: 'sch1' } } }, error: null });
  });

  it('listByClassAndDate returns attendance records', async () => {
    const { sbAttendance } = await import('@/lib/api/supabase-client');
    const mockResult = {
      data: [{ id: 'a1', student_id: 's1', date: '2026-01-01', status: 'PRESENT', school_id: 'sch1' }],
      error: null,
    };
    mockSupabase.from.mockReturnValue(createChainableMock(mockResult));

    const result = await sbAttendance.listByClassAndDate('c1', '2026-01-01');
    expect(result).toHaveLength(1);
  });
});

describe('sbNotifications', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.setItem('user', JSON.stringify({ schoolId: 'sch1', id: 'u1' }));
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'u1', user_metadata: { role: 'ADMIN', school_id: 'sch1' } } }, error: null });
  });

  it('markRead marks notification as read', async () => {
    const { sbNotifications } = await import('@/lib/api/supabase-client');
    const mockResult = { data: null, error: null };
    mockSupabase.from.mockReturnValue(createChainableMock(mockResult));

    await expect(sbNotifications.markRead('n1')).resolves.not.toThrow();
  });
});

describe('sbPayments', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.setItem('user', JSON.stringify({ schoolId: 'sch1' }));
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'u1', user_metadata: { role: 'ADMIN', school_id: 'sch1' } } }, error: null });
  });

  it('create inserts payment', async () => {
    const { sbPayments } = await import('@/lib/api/supabase-client');
    const mockResult = { data: { id: 'pay1' }, error: null };
    mockSupabase.from.mockReturnValue(createChainableMock(mockResult));

    const result = await sbPayments.create({
      studentId: 's1',
      amount: 50000,
      method: 'CASH',
      schoolId: 'sch1',
    });
    expect(result.id).toBe('pay1');
  });
});

describe('sbTeachers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.setItem('user', JSON.stringify({ schoolId: 'sch1' }));
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'u1', user_metadata: { role: 'ADMIN', school_id: 'sch1' } } }, error: null });
  });

  it('list returns teachers', async () => {
    const { sbTeachers } = await import('@/lib/api/supabase-client');
    const mockResult = { data: [{ id: 't1', first_name: 'Jane', last_name: 'Smith' }], error: null };
    mockSupabase.from.mockReturnValue(createChainableMock(mockResult));

    const result = await sbTeachers.list();
    expect(result).toHaveLength(1);
  });
});

describe('sbClasses', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.setItem('user', JSON.stringify({ schoolId: 'sch1' }));
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'u1', user_metadata: { role: 'ADMIN', school_id: 'sch1' } } }, error: null });
  });

  it('list returns classes', async () => {
    const { sbClasses } = await import('@/lib/api/supabase-client');
    const mockResult = { data: [{ id: 'c1', name: 'CM1', level: 'CE2' }], error: null };
    mockSupabase.from.mockReturnValue(createChainableMock(mockResult));

    const result = await sbClasses.list();
    expect(result).toHaveLength(1);
  });
});

describe('sbTransport', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.setItem('user', JSON.stringify({ schoolId: 'sch1' }));
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'u1', user_metadata: { role: 'ADMIN', school_id: 'sch1' } } }, error: null });
  });

  it('list returns buses', async () => {
    const { sbTransport } = await import('@/lib/api/supabase-client');
    const mockResult = { data: [{ id: 'b1', name: 'Bus 1' }], error: null };
    mockSupabase.from.mockReturnValue(createChainableMock(mockResult));

    const result = await sbTransport.list();
    expect(result).toHaveLength(1);
  });
});

describe('sbMessaging', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.setItem('user', JSON.stringify({ schoolId: 'sch1', id: 'u1' }));
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'u1', user_metadata: { role: 'ADMIN', school_id: 'sch1' } } }, error: null });
  });

  it('getInbox returns messages', async () => {
    const { sbMessaging } = await import('@/lib/api/supabase-client');
    const mockResult = { data: [{ id: 'm1', content: 'Hello' }], error: null };
    mockSupabase.from.mockReturnValue(createChainableMock(mockResult));

    const result = await sbMessaging.getInbox();
    expect(result).toHaveLength(1);
  });
});

describe('sbDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.setItem('user', JSON.stringify({ schoolId: 'sch1' }));
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'u1', user_metadata: { role: 'ADMIN', school_id: 'sch1' } } }, error: null });
  });

  it('getStats returns dashboard stats', async () => {
    const { sbDashboard } = await import('@/lib/api/supabase-client');
    // getStats takes a userId and does complex queries - mock all from() calls
    mockSupabase.from.mockReturnValue(createChainableMock({ data: [], error: null }));

    const result = await sbDashboard.getStats('u1');
    expect(result).toBeDefined();
  });
});

describe('sbAudit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.setItem('user', JSON.stringify({ schoolId: 'sch1' }));
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'u1', user_metadata: { role: 'ADMIN', school_id: 'sch1' } } }, error: null });
  });

  it('list returns audit logs', async () => {
    const { sbAudit } = await import('@/lib/api/supabase-client');
    const mockResult = { data: [{ id: 'a1', action: 'CREATE', entity: 'student' }], error: null };
    mockSupabase.from.mockReturnValue(createChainableMock(mockResult));

    const result = await sbAudit.list({ action: 'CREATE' });
    expect(result).toHaveLength(1);
  });
});
