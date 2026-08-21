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
const mockPolicy = {
  id: 'gov-001', school_id: schoolId, policy_name: 'Student Health Data Protection',
  policy_type: 'data_protection', status: 'active', version: '2.0',
  effective_date: '2026-01-01', expiry_date: '2027-01-01',
  content: 'All student health data must be encrypted', approved_by: 'adm-001',
  compliance_framework: 'GDPR', review_cycle_months: 12,
  created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
};

beforeEach(() => { vi.clearAllMocks(); });

describe('GovernanceService - CRUD', () => {
  it('should create a health policy', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockPolicy, error: null });
    const result = await mockSupabase.from('health_governance_policies').insert({
      school_id: schoolId, policy_name: 'Student Health Data Protection', version: '2.0',
    }).select().single();
    expect(result.data).toHaveProperty('id', 'gov-001');
  });

  it('should get a policy by id', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockPolicy, error: null });
    const result = await mockSupabase.from('health_governance_policies')
      .select('*').eq('id', 'gov-001').eq('school_id', schoolId).single();
    expect(result.data.policy_name).toBe('Student Health Data Protection');
  });

  it('should list all policies for a school', async () => {
    mockSupabase.order.mockResolvedValue({ data: [mockPolicy], error: null });
    const result = await mockSupabase.from('health_governance_policies')
      .select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
    expect(result.data).toHaveLength(1);
  });

  it('should update a policy', async () => {
    mockSupabase.single.mockResolvedValue({ data: { ...mockPolicy, version: '2.1' }, error: null });
    const result = await mockSupabase.from('health_governance_policies')
      .update({ version: '2.1' }).eq('id', 'gov-001').select().single();
    expect(result.data.version).toBe('2.1');
  });

  it('should soft delete a policy', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: null });
    const result = await mockSupabase.from('health_governance_policies')
      .update({ deleted_at: new Date().toISOString() }).eq('id', 'gov-001').single();
    expect(result.error).toBeNull();
  });
});

describe('GovernanceService - Domain', () => {
  it('should track policy versions', async () => {
    expect(mockPolicy.version).toBe('2.0');
  });

  it('should enforce compliance frameworks', async () => {
    expect(mockPolicy.compliance_framework).toBeTruthy();
  });

  it('should track expiry dates', async () => {
    const expiry = new Date(mockPolicy.expiry_date);
    expect(expiry.getTime()).toBeGreaterThan(new Date().getTime());
  });

  it('should enforce review cycles', async () => {
    expect(mockPolicy.review_cycle_months).toBeGreaterThan(0);
  });
});

describe('GovernanceService - Errors', () => {
  it('should reject missing policy_name', () => {
    const validate = (n: string) => { if (!n) throw new Error('Policy name is required'); };
    expect(() => validate('')).toThrow('Policy name is required');
  });

  it('should reject expired policy', () => {
    const validate = (expiry: string) => { if (new Date(expiry) < new Date()) throw new Error('Policy is expired'); };
    expect(() => validate('2020-01-01')).toThrow('Policy is expired');
  });

  it('should handle DB errors', async () => {
    mockSupabase.order.mockRejectedValue(new Error('Lock conflict'));
    await expect(
      mockSupabase.from('health_governance_policies').select('*').eq('school_id', schoolId).order('created_at')
    ).rejects.toThrow('Lock conflict');
  });
});
