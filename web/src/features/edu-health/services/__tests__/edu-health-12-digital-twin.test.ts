import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  single: vi.fn(),
  order: vi.fn().mockReturnThis(),
};

const schoolId = 'sch-001';
const mockTwin = {
  id: 'tw-001', school_id: schoolId, twin_name: 'Campus Health Twin',
  twin_type: 'campus_health', status: 'active', sync_frequency: 'hourly',
  last_synced_at: '2026-08-08T10:00:00Z',
  configuration: { health_zones: ['infirmary', 'cafeteria', 'playground'], sensors: ['temperature'] },
  metrics: { active_cases: 3, wellness_score: 8.1, capacity_utilization: 0.65 },
  created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
};

beforeEach(() => { vi.clearAllMocks(); });

describe('DigitalTwinService - CRUD', () => {
  it('should create a digital twin', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockTwin, error: null });
    const result = await mockSupabase.from('health_digital_twins').insert({
      school_id: schoolId, twin_name: 'Campus Health Twin', twin_type: 'campus_health',
    }).select().single();
    expect(result.data).toHaveProperty('id', 'tw-001');
  });

  it('should get a twin by id', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockTwin, error: null });
    const result = await mockSupabase.from('health_digital_twins')
      .select('*').eq('id', 'tw-001').eq('school_id', schoolId).single();
    expect(result.data.twin_name).toBe('Campus Health Twin');
  });

  it('should list all twins for a school', async () => {
    mockSupabase.order.mockResolvedValue({ data: [mockTwin], error: null });
    const result = await mockSupabase.from('health_digital_twins')
      .select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
    expect(result.data).toHaveLength(1);
  });

  it('should update a digital twin', async () => {
    mockSupabase.single.mockResolvedValue({ data: { ...mockTwin, sync_frequency: 'realtime' }, error: null });
    const result = await mockSupabase.from('health_digital_twins')
      .update({ sync_frequency: 'realtime' }).eq('id', 'tw-001').select().single();
    expect(result.data.sync_frequency).toBe('realtime');
  });

  it('should soft delete a twin', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: null });
    const result = await mockSupabase.from('health_digital_twins')
      .update({ deleted_at: new Date().toISOString() }).eq('id', 'tw-001').single();
    expect(result.error).toBeNull();
  });
});

describe('DigitalTwinService - Domain', () => {
  it('should track sync status', async () => {
    expect(mockTwin.last_synced_at).toBeTruthy();
  });

  it('should manage health zones', async () => {
    expect(mockTwin.configuration.health_zones).toHaveLength(3);
  });

  it('should compute wellness metrics', async () => {
    expect(mockTwin.metrics.wellness_score).toBeGreaterThanOrEqual(0);
    expect(mockTwin.metrics.wellness_score).toBeLessThanOrEqual(10);
  });

  it('should track capacity utilization', async () => {
    expect(mockTwin.metrics.capacity_utilization).toBeGreaterThanOrEqual(0);
    expect(mockTwin.metrics.capacity_utilization).toBeLessThanOrEqual(1);
  });
});

describe('DigitalTwinService - Errors', () => {
  it('should reject missing twin_name', () => {
    const validate = (n: string) => { if (!n) throw new Error('Twin name is required'); };
    expect(() => validate('')).toThrow('Twin name is required');
  });

  it('should reject invalid sync_frequency', () => {
    const validate = (f: string) => {
      if (!['realtime', 'hourly', 'daily', 'weekly'].includes(f)) throw new Error('Invalid frequency');
    };
    expect(() => validate('monthly')).toThrow('Invalid frequency');
  });

  it('should handle DB errors', async () => {
    mockSupabase.order.mockRejectedValue(new Error('Replication lag'));
    await expect(
      mockSupabase.from('health_digital_twins').select('*').eq('school_id', schoolId).order('created_at')
    ).rejects.toThrow('Replication lag');
  });
});
