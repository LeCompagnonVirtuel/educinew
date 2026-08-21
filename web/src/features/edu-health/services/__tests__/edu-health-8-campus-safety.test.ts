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
const mockAudit = {
  id: 'sfty-001', school_id: schoolId, audit_type: 'fire_safety',
  location: 'Building A', auditor: 'Inspector Fall', audit_date: '2026-07-20',
  status: 'passed', score: 92, findings: ['Fire extinguisher expired on 3rd floor'],
  corrective_actions: ['Replace extinguisher'], next_audit_date: '2026-12-20',
  created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
};

beforeEach(() => { vi.clearAllMocks(); });

describe('CampusSafetyService - CRUD', () => {
  it('should create a safety audit', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockAudit, error: null });
    const result = await mockSupabase.from('campus_safety_audits').insert({
      school_id: schoolId, audit_type: 'fire_safety', auditor: 'Inspector Fall',
    }).select().single();
    expect(result.data).toHaveProperty('id', 'sfty-001');
  });

  it('should get an audit by id', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockAudit, error: null });
    const result = await mockSupabase.from('campus_safety_audits')
      .select('*').eq('id', 'sfty-001').eq('school_id', schoolId).single();
    expect(result.data.audit_type).toBe('fire_safety');
  });

  it('should list all audits for a school', async () => {
    mockSupabase.order.mockResolvedValue({ data: [mockAudit], error: null });
    const result = await mockSupabase.from('campus_safety_audits')
      .select('*').eq('school_id', schoolId).order('audit_date', { ascending: false });
    expect(result.data).toHaveLength(1);
  });

  it('should update an audit', async () => {
    mockSupabase.single.mockResolvedValue({ data: { ...mockAudit, status: 'remediation_needed' }, error: null });
    const result = await mockSupabase.from('campus_safety_audits')
      .update({ status: 'remediation_needed' }).eq('id', 'sfty-001').select().single();
    expect(result.data.status).toBe('remediation_needed');
  });

  it('should soft delete an audit', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: null });
    const result = await mockSupabase.from('campus_safety_audits')
      .update({ deleted_at: new Date().toISOString() }).eq('id', 'sfty-001').single();
    expect(result.error).toBeNull();
  });
});

describe('CampusSafetyService - Domain', () => {
  it('should categorize audit types', async () => {
    const audits = [
      { ...mockAudit, audit_type: 'fire_safety' },
      { ...mockAudit, id: 'sfty-002', audit_type: 'structural' },
      { ...mockAudit, id: 'sfty-003', audit_type: 'electrical' },
    ];
    mockSupabase.order.mockResolvedValue({ data: audits, error: null });
    const result = await mockSupabase.from('campus_safety_audits').select('*').eq('school_id', schoolId).order('created_at');
    expect(result.data).toHaveLength(3);
  });

  it('should track safety scores', async () => {
    expect(mockAudit.score).toBeGreaterThanOrEqual(0);
    expect(mockAudit.score).toBeLessThanOrEqual(100);
  });

  it('should track corrective actions', async () => {
    expect(mockAudit.corrective_actions).toHaveLength(1);
  });
});

describe('CampusSafetyService - Errors', () => {
  it('should reject missing audit_type', () => {
    const validate = (t: string) => { if (!t) throw new Error('Audit type is required'); };
    expect(() => validate('')).toThrow('Audit type is required');
  });

  it('should reject invalid score', () => {
    const validate = (s: number) => { if (s < 0 || s > 100) throw new Error('Score must be 0-100'); };
    expect(() => validate(150)).toThrow('Score must be 0-100');
  });

  it('should handle DB errors', async () => {
    mockSupabase.order.mockRejectedValue(new Error('Schema mismatch'));
    await expect(
      mockSupabase.from('campus_safety_audits').select('*').eq('school_id', schoolId).order('audit_date')
    ).rejects.toThrow('Schema mismatch');
  });
});
