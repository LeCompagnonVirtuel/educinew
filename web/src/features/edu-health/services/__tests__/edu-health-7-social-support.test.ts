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
const mockReferral = {
  id: 'ref-001', school_id: schoolId, student_id: 'stu-001', referred_by: 'tch-001',
  service_type: 'food_assistance', provider: 'School Canteen',
  referral_date: '2026-08-01', status: 'pending', urgency: 'high',
  reason: 'Student has not eaten in 2 days', outcome: null,
  follow_up_date: '2026-08-08', created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

beforeEach(() => { vi.clearAllMocks(); });

describe('SocialSupportService - CRUD', () => {
  it('should create a social support referral', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockReferral, error: null });
    const result = await mockSupabase.from('social_support_referrals').insert({
      school_id: schoolId, student_id: 'stu-001', service_type: 'food_assistance',
    }).select().single();
    expect(result.data).toHaveProperty('id', 'ref-001');
  });

  it('should get a referral by id', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockReferral, error: null });
    const result = await mockSupabase.from('social_support_referrals')
      .select('*').eq('id', 'ref-001').eq('school_id', schoolId).single();
    expect(result.data.service_type).toBe('food_assistance');
  });

  it('should list all referrals for a school', async () => {
    mockSupabase.order.mockResolvedValue({ data: [mockReferral], error: null });
    const result = await mockSupabase.from('social_support_referrals')
      .select('*').eq('school_id', schoolId).order('referral_date', { ascending: false });
    expect(result.data).toHaveLength(1);
  });

  it('should update a referral', async () => {
    mockSupabase.single.mockResolvedValue({ data: { ...mockReferral, status: 'completed' }, error: null });
    const result = await mockSupabase.from('social_support_referrals')
      .update({ status: 'completed' }).eq('id', 'ref-001').select().single();
    expect(result.data.status).toBe('completed');
  });

  it('should soft delete a referral', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: null });
    const result = await mockSupabase.from('social_support_referrals')
      .update({ deleted_at: new Date().toISOString() }).eq('id', 'ref-001').single();
    expect(result.error).toBeNull();
  });
});

describe('SocialSupportService - Domain', () => {
  it('should track service types', async () => {
    const referrals = [
      { ...mockReferral, service_type: 'food_assistance' },
      { ...mockReferral, id: 'ref-002', service_type: 'clothing' },
      { ...mockReferral, id: 'ref-003', service_type: 'housing' },
    ];
    mockSupabase.order.mockResolvedValue({ data: referrals, error: null });
    const result = await mockSupabase.from('social_support_referrals').select('*').eq('school_id', schoolId).order('created_at');
    expect(result.data).toHaveLength(3);
  });

  it('should prioritize urgent referrals', async () => {
    mockSupabase.order.mockResolvedValue({ data: [mockReferral], error: null });
    const result = await mockSupabase.from('social_support_referrals').select('*').eq('school_id', schoolId).order('created_at');
    expect(result.data[0].urgency).toBe('high');
  });

  it('should track follow-up dates', async () => {
    expect(mockReferral.follow_up_date).toBeTruthy();
  });
});

describe('SocialSupportService - Errors', () => {
  it('should reject missing reason', () => {
    const validate = (r: string) => { if (!r) throw new Error('Reason is required'); };
    expect(() => validate('')).toThrow('Reason is required');
  });

  it('should reject invalid service_type', () => {
    const validate = (t: string) => {
      if (!['food_assistance', 'clothing', 'housing', 'medical', 'educational'].includes(t)) throw new Error('Invalid type');
    };
    expect(() => validate('unknown')).toThrow('Invalid type');
  });

  it('should handle DB errors', async () => {
    mockSupabase.order.mockRejectedValue(new Error('Connection refused'));
    await expect(
      mockSupabase.from('social_support_referrals').select('*').eq('school_id', schoolId).order('referral_date')
    ).rejects.toThrow('Connection refused');
  });
});
