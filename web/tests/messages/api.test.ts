import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@supabase/ssr', () => ({
  createRouteHandlerClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'user1' } } }),
    },
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: { id: 'user1', role: 'TEACHER', school_id: 's1' }, error: null }),
    order: vi.fn().mockReturnThis(),
    range: vi.fn().mockReturnThis(),
    rpc: vi.fn().mockResolvedValue({ data: null, error: null }),
  })),
}));

vi.mock('@educi/logger', () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
}));

describe('Messages API routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should export GET and POST from /api/messages', async () => {
    const mod = await import('../../src/app/api/messages/route');
    expect(mod.GET).toBeDefined();
    expect(mod.POST).toBeDefined();
  });

  it('should export GET, PUT, DELETE from /api/messages/[id]', async () => {
    const mod = await import('../../src/app/api/messages/[id]/route');
    expect(mod.GET).toBeDefined();
    expect(mod.PUT).toBeDefined();
    expect(mod.DELETE).toBeDefined();
  });

  it('should export GET, POST from /api/messages/reactions', async () => {
    const mod = await import('../../src/app/api/messages/reactions/route');
    expect(mod.GET).toBeDefined();
    expect(mod.POST).toBeDefined();
  });

  it('should export GET, POST from /api/messages/[id]/reactions', async () => {
    const mod = await import('../../src/app/api/messages/[id]/reactions/route');
    expect(mod.GET).toBeDefined();
    expect(mod.POST).toBeDefined();
  });

  it('should export GET, POST from /api/messages/groups', async () => {
    const mod = await import('../../src/app/api/messages/groups/route');
    expect(mod.GET).toBeDefined();
    expect(mod.POST).toBeDefined();
  });

  it('should export GET from /api/messages/search', async () => {
    const mod = await import('../../src/app/api/messages/search/route');
    expect(mod.GET).toBeDefined();
  });

  it('should export GET, POST from /api/messages/announcements', async () => {
    const mod = await import('../../src/app/api/messages/announcements/route');
    expect(mod.GET).toBeDefined();
    expect(mod.POST).toBeDefined();
  });

  it('should export GET, POST from /api/messages/broadcasts', async () => {
    const mod = await import('../../src/app/api/messages/broadcasts/route');
    expect(mod.GET).toBeDefined();
    expect(mod.POST).toBeDefined();
  });

  it('should export GET from /api/messages/notifications', async () => {
    const mod = await import('../../src/app/api/messages/notifications/route');
    expect(mod.GET).toBeDefined();
  });

  it('should export GET from /api/messages/attachments', async () => {
    const mod = await import('../../src/app/api/messages/attachments/route');
    expect(mod.GET).toBeDefined();
  });

  it('should export GET from /api/messages/settings', async () => {
    const mod = await import('../../src/app/api/messages/settings/route');
    expect(mod.GET).toBeDefined();
  });

  it('should export GET from /api/messages/sync', async () => {
    const mod = await import('../../src/app/api/messages/sync/route');
    expect(mod.GET).toBeDefined();
  });

  it('should export GET from /api/messages/timeline', async () => {
    const mod = await import('../../src/app/api/messages/timeline/route');
    expect(mod.GET).toBeDefined();
  });

  it('should export GET from /api/messages/statistics', async () => {
    const mod = await import('../../src/app/api/messages/statistics/route');
    expect(mod.GET).toBeDefined();
  });

  it('should export POST from /api/messages/read', async () => {
    const mod = await import('../../src/app/api/messages/read/route');
    expect(mod.POST).toBeDefined();
  });

  it('should export POST from /api/messages/[id]/read', async () => {
    const mod = await import('../../src/app/api/messages/[id]/read/route');
    expect(mod.POST).toBeDefined();
  });

  it('should export POST from /api/messages/[id]/pin', async () => {
    const mod = await import('../../src/app/api/messages/[id]/pin/route');
    expect(mod.POST).toBeDefined();
  });

  it('should export POST from /api/messages/[id]/forward', async () => {
    const mod = await import('../../src/app/api/messages/[id]/forward/route');
    expect(mod.POST).toBeDefined();
  });

  it('should export POST from /api/messages/[id]/report', async () => {
    const mod = await import('../../src/app/api/messages/[id]/report/route');
    expect(mod.POST).toBeDefined();
  });

  it('should export POST from /api/messages/import', async () => {
    const mod = await import('../../src/app/api/messages/import/route');
    expect(mod.POST).toBeDefined();
  });

  it('should export GET from /api/messages/export', async () => {
    const mod = await import('../../src/app/api/messages/export/route');
    expect(mod.GET).toBeDefined();
  });

  it('should export GET from /api/messages/dashboard', async () => {
    const mod = await import('../../src/app/api/messages/dashboard/route');
    expect(mod.GET).toBeDefined();
  });

  it('should export GET from /api/messages/audit', async () => {
    const mod = await import('../../src/app/api/messages/audit/route');
    expect(mod.GET).toBeDefined();
  });

  it('should export GET from /api/messages/report', async () => {
    const mod = await import('../../src/app/api/messages/report/route');
    expect(mod.GET).toBeDefined();
  });

  it('should export POST from /api/messages/typing', async () => {
    const mod = await import('../../src/app/api/messages/typing/route');
    expect(mod.POST).toBeDefined();
  });

  it('should export POST from /api/messages/upload', async () => {
    const mod = await import('../../src/app/api/messages/upload/route');
    expect(mod.POST).toBeDefined();
  });

  it('should export GET from /api/messages/download', async () => {
    const mod = await import('../../src/app/api/messages/download/route');
    expect(mod.GET).toBeDefined();
  });

  it('should export POST from /api/messages/presence', async () => {
    const mod = await import('../../src/app/api/messages/presence/route');
    expect(mod.POST).toBeDefined();
  });

  it('should export GET from /api/messages/realtime', async () => {
    const mod = await import('../../src/app/api/messages/realtime/route');
    expect(mod.GET).toBeDefined();
  });

  it('should export POST from /api/messages/restore', async () => {
    const mod = await import('../../src/app/api/messages/restore/route');
    expect(mod.POST).toBeDefined();
  });

  it('should export POST from /api/messages/archive', async () => {
    const mod = await import('../../src/app/api/messages/archive/route');
    expect(mod.POST).toBeDefined();
  });
});
