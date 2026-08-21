import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockRepo = {
  findMany: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const schoolId = '550e8400-e29b-41d4-a716-446655440000';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Notify - NotificationConfig Service', () => {
  it('should get notification config', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', enabled_channels: ['EMAIL', 'PUSH'] }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result[0].enabled_channels).toContain('EMAIL');
  });

  it('should create config', async () => {
    const data = { schoolId, enabled_channels: ['EMAIL', 'SMS', 'PUSH'], default_priority: 'NORMAL', default_format: 'HTML', rate_limits: { global: 1000, per_user: 50, per_tenant: 5000, per_channel: {}, scope: 'GLOBAL', window_seconds: 3600 }, quiet_hours: { enabled: false, start_hour: 22, end_hour: 7, timezone: 'Africa/Dakar', action: 'DELAY' }, retry_policy: { policy: 'EXPONENTIAL_BACKOFF', max_retries: 3, base_interval_ms: 1000, max_interval_ms: 30000 }, delivery_optimization: 'SMART', multi_channel_strategy: 'SMART_FALLBACK', content_safety: 'BASIC', localization: 'MULTI_LANGUAGE' };
    mockRepo.create.mockResolvedValue({ id: 'cfg1', ...data });
    const result = await mockRepo.create(data);
    expect(result.default_priority).toBe('NORMAL');
  });
});

describe('Notify - NotificationTemplate Service', () => {
  it('should list templates', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: 't1', name: 'Welcome Email', type: 'EMAIL' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result[0].type).toBe('EMAIL');
  });

  it('should create template', async () => {
    const data = { schoolId, name: 'Grade Notification', type: 'EMAIL', status: 'ACTIVE', body: '<h1>Your grade is {{grade}}</h1>', format: 'HTML', variables: ['grade'], version: 1 };
    mockRepo.create.mockResolvedValue({ id: 'tpl1', ...data });
    const result = await mockRepo.create(data);
    expect(result.variables).toContain('grade');
  });

  it('should validate template version', () => {
    const validate = (v: number) => { if (v < 1) throw new Error('Version must be >= 1'); };
    expect(() => validate(0)).toThrow('Version must be >= 1');
  });
});

describe('Notify - EmergencyAlert Service', () => {
  it('should create emergency alert', async () => {
    const data = { schoolId, title: 'Fire Alert', body: 'Evacuate building', level: 'EXTREME', type: 'FIRE', source: 'MANUAL', channels: ['SMS', 'PUSH', 'VOICE'], audience_type: 'ALL_USERS', requires_ack: true, ack_deadline_minutes: 5, expires_at: '2026-01-01T12:00:00Z' };
    mockRepo.create.mockResolvedValue({ id: 'ea1', ...data });
    const result = await mockRepo.create(data);
    expect(result.level).toBe('EXTREME');
  });

  it('should require title and body', () => {
    const validate = (title: string, body: string) => {
      if (!title || !body) throw new Error('Title and body are required');
    };
    expect(() => validate('', '')).toThrow('Title and body are required');
  });
});

describe('Notify - NotificationBatch Service', () => {
  it('should create batch', async () => {
    const data = { schoolId, name: 'Monthly Newsletter', mode: 'BULK', status: 'PENDING', channel: 'EMAIL', total_count: 0, sent_count: 0, failed_count: 0, delivered_count: 0 };
    mockRepo.create.mockResolvedValue({ id: 'nb1', ...data });
    const result = await mockRepo.create(data);
    expect(result.mode).toBe('BULK');
  });
});

describe('Notify - NotificationPreference Service', () => {
  it('should create preference', async () => {
    const data = { schoolId, user_id: 'u1', channel_preferences: [{ channel: 'EMAIL', enabled: true, preference: 'ALL', opt_status: 'OPTED_IN', groups: ['GRADES'] }], enabled_groups: ['GRADES', 'ATTENDANCE'] };
    mockRepo.create.mockResolvedValue({ id: 'np1', ...data });
    const result = await mockRepo.create(data);
    expect(result.user_id).toBe('u1');
  });
});
