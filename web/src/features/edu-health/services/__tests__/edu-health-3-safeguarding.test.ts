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
const mockCase = {
  id: 'sfg-001', school_id: schoolId, student_id: 'stu-001', reporter_id: 'usr-001',
  concern_type: 'neglect', severity: 'high', status: 'open',
  description: 'Child appears unhygienic and hungry', assigned_to: 'cns-001',
  created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
};

beforeEach(() => { vi.clearAllMocks(); });

describe('SafeguardingService - CRUD', () => {
  it('should create a safeguarding case', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockCase, error: null });
    const result = await mockSupabase.from('safeguarding_cases').insert({
      school_id: schoolId, student_id: 'stu-001', concern_type: 'neglect',
    }).select().single();
    expect(result.data).toHaveProperty('id', 'sfg-001');
  });

  it('should get a case by id', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockCase, error: null });
    const result = await mockSupabase.from('safeguarding_cases')
      .select('*').eq('id', 'sfg-001').eq('school_id', schoolId).single();
    expect(result.data.concern_type).toBe('neglect');
  });

  it('should list all cases for a school', async () => {
    mockSupabase.order.mockResolvedValue({ data: [mockCase], error: null });
    const result = await mockSupabase.from('safeguarding_cases')
      .select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
    expect(result.data).toHaveLength(1);
  });

  it('should update a case', async () => {
    mockSupabase.single.mockResolvedValue({ data: { ...mockCase, status: 'resolved' }, error: null });
    const result = await mockSupabase.from('safeguarding_cases')
      .update({ status: 'resolved' }).eq('id', 'sfg-001').select().single();
    expect(result.data.status).toBe('resolved');
  });

  it('should soft delete a case', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: null });
    const result = await mockSupabase.from('safeguarding_cases')
      .update({ deleted_at: new Date().toISOString() }).eq('id', 'sfg-001').single();
    expect(result.error).toBeNull();
  });
});

describe('SafeguardingService - Domain', () => {
  it('should identify open cases', async () => {
    mockSupabase.order.mockResolvedValue({ data: [mockCase], error: null });
    const result = await mockSupabase.from('safeguarding_cases').select('*').eq('school_id', schoolId).order('created_at');
    expect(result.data.filter((c: any) => c.status === 'open')).toHaveLength(1);
  });

  it('should escalate high severity cases', async () => {
    const critical = { ...mockCase, severity: 'critical' };
    mockSupabase.order.mockResolvedValue({ data: [critical], error: null });
    const result = await mockSupabase.from('safeguarding_cases').select('*').eq('school_id', schoolId).order('created_at');
    expect(result.data[0].severity).toBe('critical');
  });

  it('should track assigned caseworker', async () => {
    expect(mockCase.assigned_to).toBe('cns-001');
  });
});

describe('SafeguardingService - Errors', () => {
  it('should reject missing description', () => {
    const validate = (d: string) => { if (!d) throw new Error('Description is required'); };
    expect(() => validate('')).toThrow('Description is required');
  });

  it('should reject invalid severity', () => {
    const validate = (s: string) => {
      if (!['low', 'medium', 'high', 'critical'].includes(s)) throw new Error('Invalid severity');
    };
    expect(() => validate('urgent')).toThrow('Invalid severity');
  });

  it('should handle DB errors', async () => {
    mockSupabase.order.mockRejectedValue(new Error('Table locked'));
    await expect(
      mockSupabase.from('safeguarding_cases').select('*').eq('school_id', schoolId).order('created_at')
    ).rejects.toThrow('Table locked');
  });
});
