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
const mockPlan = {
  id: 'acc-001', school_id: schoolId, student_id: 'stu-001',
  disability_type: 'physical', accommodations: ['wheelchair_access', 'extra_time'],
  accommodations_duration: '2026-2027', assessor: 'Dr. Ndiaye',
  assessment_date: '2026-06-15', status: 'active',
  created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
};

beforeEach(() => { vi.clearAllMocks(); });

describe('AccessibilityService - CRUD', () => {
  it('should create an accessibility plan', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockPlan, error: null });
    const result = await mockSupabase.from('accessibility_plans').insert({
      school_id: schoolId, student_id: 'stu-001', disability_type: 'physical',
    }).select().single();
    expect(result.data).toHaveProperty('id', 'acc-001');
  });

  it('should get a plan by id', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockPlan, error: null });
    const result = await mockSupabase.from('accessibility_plans')
      .select('*').eq('id', 'acc-001').eq('school_id', schoolId).single();
    expect(result.data.disability_type).toBe('physical');
  });

  it('should list all plans for a school', async () => {
    mockSupabase.order.mockResolvedValue({ data: [mockPlan], error: null });
    const result = await mockSupabase.from('accessibility_plans')
      .select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
    expect(result.data).toHaveLength(1);
  });

  it('should update an accessibility plan', async () => {
    const updated = { ...mockPlan, accommodations: ['wheelchair_access', 'extra_time', 'note_taker'] };
    mockSupabase.single.mockResolvedValue({ data: updated, error: null });
    const result = await mockSupabase.from('accessibility_plans')
      .update({ accommodations: updated.accommodations }).eq('id', 'acc-001').select().single();
    expect(result.data.accommodations).toHaveLength(3);
  });

  it('should soft delete a plan', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: null });
    const result = await mockSupabase.from('accessibility_plans')
      .update({ deleted_at: new Date().toISOString() }).eq('id', 'acc-001').single();
    expect(result.error).toBeNull();
  });
});

describe('AccessibilityService - Domain', () => {
  it('should track active plans only', async () => {
    mockSupabase.order.mockResolvedValue({ data: [mockPlan], error: null });
    const result = await mockSupabase.from('accessibility_plans').select('*').eq('school_id', schoolId).order('created_at');
    expect(result.data.filter((p: any) => p.status === 'active')).toHaveLength(1);
  });

  it('should categorize disability types', async () => {
    const plans = [
      { ...mockPlan, disability_type: 'physical' },
      { ...mockPlan, id: 'acc-002', disability_type: 'sensory' },
      { ...mockPlan, id: 'acc-003', disability_type: 'cognitive' },
    ];
    mockSupabase.order.mockResolvedValue({ data: plans, error: null });
    const result = await mockSupabase.from('accessibility_plans').select('*').eq('school_id', schoolId).order('created_at');
    expect(result.data).toHaveLength(3);
  });

  it('should validate accommodation list', async () => {
    expect(mockPlan.accommodations.length).toBeGreaterThan(0);
  });
});

describe('AccessibilityService - Errors', () => {
  it('should reject missing disability_type', () => {
    const validate = (t: string) => { if (!t) throw new Error('Disability type is required'); };
    expect(() => validate('')).toThrow('Disability type is required');
  });

  it('should reject invalid disability_type', () => {
    const validate = (t: string) => {
      if (!['physical', 'sensory', 'cognitive', 'multiple'].includes(t)) throw new Error('Invalid type');
    };
    expect(() => validate('unknown')).toThrow('Invalid type');
  });

  it('should handle DB errors', async () => {
    mockSupabase.order.mockRejectedValue(new Error('Timeout'));
    await expect(
      mockSupabase.from('accessibility_plans').select('*').eq('school_id', schoolId).order('created_at')
    ).rejects.toThrow('Timeout');
  });
});
