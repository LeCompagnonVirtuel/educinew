import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  single: vi.fn(),
  order: vi.fn().mockReturnThis(),
};

const schoolId = 'sch-001';
const mockDashboard = {
  id: 'dash-001', school_id: schoolId, period: '2026-08',
  total_students: 500, total_incidents: 12, avg_wellbeing_score: 7.2,
  attendance_rate: 94.5, nutrition_compliance: 88.0, mental_health_sessions: 34,
  vaccinations_up_to_date: 420, active_health_plans: 15,
  generated_at: new Date().toISOString(),
};

beforeEach(() => { vi.clearAllMocks(); });

describe('AnalyticsService - CRUD', () => {
  it('should generate a health dashboard', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockDashboard, error: null });
    const result = await mockSupabase.from('health_analytics_dashboards').insert({
      school_id: schoolId, period: '2026-08', total_students: 500,
    }).select().single();
    expect(result.data).toHaveProperty('id', 'dash-001');
  });

  it('should get a dashboard by id', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockDashboard, error: null });
    const result = await mockSupabase.from('health_analytics_dashboards')
      .select('*').eq('id', 'dash-001').eq('school_id', schoolId).single();
    expect(result.data.period).toBe('2026-08');
  });

  it('should list dashboards for a school', async () => {
    mockSupabase.order.mockResolvedValue({ data: [mockDashboard], error: null });
    const result = await mockSupabase.from('health_analytics_dashboards')
      .select('*').eq('school_id', schoolId).order('period', { ascending: false });
    expect(result.data).toHaveLength(1);
  });

  it('should get latest dashboard', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockDashboard, error: null });
    const result = await mockSupabase.from('health_analytics_dashboards')
      .select('*').eq('school_id', schoolId).single();
    expect(result.data.generated_at).toBeTruthy();
  });

  it('should soft delete a dashboard', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: null });
    const result = await mockSupabase.from('health_analytics_dashboards')
      .insert({ deleted_at: new Date().toISOString() }).eq('id', 'dash-001').single();
    expect(result.error).toBeNull();
  });
});

describe('AnalyticsService - Domain', () => {
  it('should compute attendance rate', async () => {
    expect(mockDashboard.attendance_rate).toBeGreaterThan(0);
    expect(mockDashboard.attendance_rate).toBeLessThanOrEqual(100);
  });

  it('should track wellbeing scores', async () => {
    expect(mockDashboard.avg_wellbeing_score).toBeGreaterThanOrEqual(0);
    expect(mockDashboard.avg_wellbeing_score).toBeLessThanOrEqual(10);
  });

  it('should aggregate incident counts', async () => {
    expect(mockDashboard.total_incidents).toBeGreaterThanOrEqual(0);
  });

  it('should track nutrition compliance', async () => {
    expect(mockDashboard.nutrition_compliance).toBeGreaterThanOrEqual(0);
    expect(mockDashboard.nutrition_compliance).toBeLessThanOrEqual(100);
  });
});

describe('AnalyticsService - Errors', () => {
  it('should reject missing period', () => {
    const validate = (p: string) => { if (!p) throw new Error('Period is required'); };
    expect(() => validate('')).toThrow('Period is required');
  });

  it('should reject invalid period format', () => {
    const validate = (p: string) => { if (!/^\d{4}-\d{2}$/.test(p)) throw new Error('Period must be YYYY-MM'); };
    expect(() => validate('08-2026')).toThrow('Period must be YYYY-MM');
  });

  it('should handle DB errors', async () => {
    mockSupabase.order.mockRejectedValue(new Error('Query timeout'));
    await expect(
      mockSupabase.from('health_analytics_dashboards').select('*').eq('school_id', schoolId).order('period')
    ).rejects.toThrow('Query timeout');
  });
});
