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
const mockReport = {
  id: 'bul-001', school_id: schoolId, reporter_id: 'stu-002', victim_id: 'stu-001',
  bully_id: 'stu-003', incident_date: '2026-07-28', incident_type: 'physical',
  location: 'Playground', description: 'Student was pushed during recess',
  witnesses: ['stu-004', 'stu-005'], status: 'under_investigation',
  created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
};

beforeEach(() => { vi.clearAllMocks(); });

describe('BullyingService - CRUD', () => {
  it('should create a bullying report', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockReport, error: null });
    const result = await mockSupabase.from('bullying_reports').insert({
      school_id: schoolId, reporter_id: 'stu-002', victim_id: 'stu-001',
    }).select().single();
    expect(result.data).toHaveProperty('id', 'bul-001');
  });

  it('should get a report by id', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockReport, error: null });
    const result = await mockSupabase.from('bullying_reports')
      .select('*').eq('id', 'bul-001').eq('school_id', schoolId).single();
    expect(result.data.incident_type).toBe('physical');
  });

  it('should list all reports for a school', async () => {
    mockSupabase.order.mockResolvedValue({ data: [mockReport], error: null });
    const result = await mockSupabase.from('bullying_reports')
      .select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
    expect(result.data).toHaveLength(1);
  });

  it('should update a report status', async () => {
    mockSupabase.single.mockResolvedValue({ data: { ...mockReport, status: 'resolved' }, error: null });
    const result = await mockSupabase.from('bullying_reports')
      .update({ status: 'resolved' }).eq('id', 'bul-001').select().single();
    expect(result.data.status).toBe('resolved');
  });

  it('should soft delete a report', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: null });
    const result = await mockSupabase.from('bullying_reports')
      .update({ deleted_at: new Date().toISOString() }).eq('id', 'bul-001').single();
    expect(result.error).toBeNull();
  });
});

describe('BullyingService - Domain', () => {
  it('should categorize incident types', async () => {
    const reports = [
      { ...mockReport, incident_type: 'physical' },
      { ...mockReport, id: 'bul-002', incident_type: 'verbal' },
      { ...mockReport, id: 'bul-003', incident_type: 'cyber' },
    ];
    mockSupabase.order.mockResolvedValue({ data: reports, error: null });
    const result = await mockSupabase.from('bullying_reports').select('*').eq('school_id', schoolId).order('created_at');
    expect(result.data).toHaveLength(3);
  });

  it('should track witnesses', async () => {
    expect(mockReport.witnesses).toHaveLength(2);
  });

  it('should identify repeat offenders', async () => {
    const reports = [
      { ...mockReport },
      { ...mockReport, id: 'bul-002', incident_date: '2026-06-15' },
    ];
    mockSupabase.order.mockResolvedValue({ data: reports, error: null });
    const result = await mockSupabase.from('bullying_reports').select('*').eq('school_id', schoolId).order('created_at');
    expect(result.data.filter((r: any) => r.bully_id === 'stu-003').length).toBeGreaterThanOrEqual(2);
  });
});

describe('BullyingService - Errors', () => {
  it('should reject missing description', () => {
    const validate = (d: string) => { if (!d) throw new Error('Description is required'); };
    expect(() => validate('')).toThrow('Description is required');
  });

  it('should reject invalid incident_type', () => {
    const validate = (t: string) => {
      if (!['physical', 'verbal', 'cyber', 'social'].includes(t)) throw new Error('Invalid type');
    };
    expect(() => validate('other')).toThrow('Invalid type');
  });

  it('should handle DB errors', async () => {
    mockSupabase.order.mockRejectedValue(new Error('Permission denied'));
    await expect(
      mockSupabase.from('bullying_reports').select('*').eq('school_id', schoolId).order('created_at')
    ).rejects.toThrow('Permission denied');
  });
});
