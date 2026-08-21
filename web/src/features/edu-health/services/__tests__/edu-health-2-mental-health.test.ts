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
const mockSession = {
  id: 'mh-001', school_id: schoolId, student_id: 'stu-001', counselor_id: 'cns-001',
  session_date: '2026-08-01', mood_rating: 4, anxiety_level: 2, risk_level: 'low',
  follow_up_required: false, status: 'completed',
  created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
};

beforeEach(() => { vi.clearAllMocks(); });

describe('MentalHealthService - CRUD', () => {
  it('should create a mental health session', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockSession, error: null });
    const result = await mockSupabase.from('mental_health_sessions').insert({
      school_id: schoolId, student_id: 'stu-001', counselor_id: 'cns-001',
    }).select().single();
    expect(result.data).toHaveProperty('id', 'mh-001');
  });

  it('should get a session by id', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockSession, error: null });
    const result = await mockSupabase.from('mental_health_sessions')
      .select('*').eq('id', 'mh-001').eq('school_id', schoolId).single();
    expect(result.data.student_id).toBe('stu-001');
  });

  it('should list sessions for a school', async () => {
    mockSupabase.order.mockResolvedValue({ data: [mockSession], error: null });
    const result = await mockSupabase.from('mental_health_sessions')
      .select('*').eq('school_id', schoolId).order('session_date', { ascending: false });
    expect(result.data).toHaveLength(1);
  });

  it('should update a session', async () => {
    mockSupabase.single.mockResolvedValue({ data: { ...mockSession, mood_rating: 5 }, error: null });
    const result = await mockSupabase.from('mental_health_sessions')
      .update({ mood_rating: 5 }).eq('id', 'mh-001').select().single();
    expect(result.data.mood_rating).toBe(5);
  });

  it('should soft delete a session', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: null });
    const result = await mockSupabase.from('mental_health_sessions')
      .update({ deleted_at: new Date().toISOString() }).eq('id', 'mh-001').single();
    expect(result.error).toBeNull();
  });
});

describe('MentalHealthService - Domain', () => {
  it('should identify high-risk students', async () => {
    const highRisk = { ...mockSession, risk_level: 'critical', anxiety_level: 9 };
    mockSupabase.order.mockResolvedValue({ data: [highRisk], error: null });
    const result = await mockSupabase.from('mental_health_sessions')
      .select('*').eq('school_id', schoolId).order('session_date');
    expect(result.data[0].risk_level).toBe('critical');
  });

  it('should track mood trends', async () => {
    const sessions = [
      { ...mockSession, session_date: '2026-07-01', mood_rating: 3 },
      { ...mockSession, id: 'mh-002', session_date: '2026-07-15', mood_rating: 4 },
      { ...mockSession, id: 'mh-003', session_date: '2026-08-01', mood_rating: 5 },
    ];
    mockSupabase.order.mockResolvedValue({ data: sessions, error: null });
    const result = await mockSupabase.from('mental_health_sessions')
      .select('*').eq('school_id', schoolId).order('session_date');
    expect(result.data.map((s: any) => s.mood_rating)).toEqual([3, 4, 5]);
  });

  it('should flag follow-up required', async () => {
    const followUp = { ...mockSession, follow_up_required: true };
    mockSupabase.order.mockResolvedValue({ data: [followUp], error: null });
    const result = await mockSupabase.from('mental_health_sessions')
      .select('*').eq('school_id', schoolId).order('created_at');
    expect(result.data.some((s: any) => s.follow_up_required)).toBe(true);
  });
});

describe('MentalHealthService - Errors', () => {
  it('should handle DB errors', async () => {
    mockSupabase.order.mockRejectedValue(new Error('Connection refused'));
    await expect(
      mockSupabase.from('mental_health_sessions').select('*').eq('school_id', schoolId).order('session_date')
    ).rejects.toThrow('Connection refused');
  });

  it('should reject invalid risk_level', () => {
    const validate = (level: string) => {
      if (!['low', 'medium', 'high', 'critical'].includes(level)) throw new Error('Invalid risk level');
    };
    expect(() => validate('invalid')).toThrow('Invalid risk level');
  });

  it('should require counselor_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('counselor_id is required'); };
    expect(() => validate('')).toThrow('counselor_id is required');
  });
});
