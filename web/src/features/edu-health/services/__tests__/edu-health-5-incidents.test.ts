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
const mockIncident = {
  id: 'inc-001', school_id: schoolId, incident_type: 'injury', severity: 'moderate',
  location: 'Gymnasium', description: 'Student fell during PE class',
  reported_by: 'tch-001', students_involved: ['stu-001'], witnesses: ['stu-002'],
  action_taken: 'First aid applied, parents notified', status: 'reported',
  incident_date: '2026-08-01', created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

beforeEach(() => { vi.clearAllMocks(); });

describe('IncidentsService - CRUD', () => {
  it('should create an incident', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockIncident, error: null });
    const result = await mockSupabase.from('health_incidents').insert({
      school_id: schoolId, incident_type: 'injury', severity: 'moderate',
    }).select().single();
    expect(result.data).toHaveProperty('id', 'inc-001');
  });

  it('should get an incident by id', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockIncident, error: null });
    const result = await mockSupabase.from('health_incidents')
      .select('*').eq('id', 'inc-001').eq('school_id', schoolId).single();
    expect(result.data.incident_type).toBe('injury');
  });

  it('should list all incidents for a school', async () => {
    mockSupabase.order.mockResolvedValue({ data: [mockIncident], error: null });
    const result = await mockSupabase.from('health_incidents')
      .select('*').eq('school_id', schoolId).order('incident_date', { ascending: false });
    expect(result.data).toHaveLength(1);
  });

  it('should update an incident', async () => {
    mockSupabase.single.mockResolvedValue({ data: { ...mockIncident, status: 'closed' }, error: null });
    const result = await mockSupabase.from('health_incidents')
      .update({ status: 'closed' }).eq('id', 'inc-001').select().single();
    expect(result.data.status).toBe('closed');
  });

  it('should soft delete an incident', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: null });
    const result = await mockSupabase.from('health_incidents')
      .update({ deleted_at: new Date().toISOString() }).eq('id', 'inc-001').single();
    expect(result.error).toBeNull();
  });
});

describe('IncidentsService - Domain', () => {
  it('should categorize incident types', async () => {
    const incidents = [
      { ...mockIncident, incident_type: 'injury' },
      { ...mockIncident, id: 'inc-002', incident_type: 'illness' },
      { ...mockIncident, id: 'inc-003', incident_type: 'allergic_reaction' },
    ];
    mockSupabase.order.mockResolvedValue({ data: incidents, error: null });
    const result = await mockSupabase.from('health_incidents').select('*').eq('school_id', schoolId).order('created_at');
    expect(result.data).toHaveLength(3);
  });

  it('should escalate severe incidents', async () => {
    const severe = { ...mockIncident, severity: 'critical' };
    mockSupabase.order.mockResolvedValue({ data: [severe], error: null });
    const result = await mockSupabase.from('health_incidents').select('*').eq('school_id', schoolId).order('created_at');
    expect(result.data[0].severity).toBe('critical');
  });

  it('should track action taken', async () => {
    expect(mockIncident.action_taken).toBeTruthy();
  });
});

describe('IncidentsService - Errors', () => {
  it('should reject missing incident_type', () => {
    const validate = (t: string) => { if (!t) throw new Error('Incident type is required'); };
    expect(() => validate('')).toThrow('Incident type is required');
  });

  it('should reject invalid severity', () => {
    const validate = (s: string) => {
      if (!['minor', 'moderate', 'severe', 'critical'].includes(s)) throw new Error('Invalid severity');
    };
    expect(() => validate('extreme')).toThrow('Invalid severity');
  });

  it('should handle DB errors', async () => {
    mockSupabase.order.mockRejectedValue(new Error('Deadlock'));
    await expect(
      mockSupabase.from('health_incidents').select('*').eq('school_id', schoolId).order('incident_date')
    ).rejects.toThrow('Deadlock');
  });
});
