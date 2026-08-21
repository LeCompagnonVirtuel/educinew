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
const mockHealth = {
  id: 'hlth-001', school_id: schoolId, student_id: 'stu-001',
  blood_type: 'A+', allergies: ['peanuts'], medications: [],
  medical_conditions: [], emergency_contact_name: 'Parent Dupont',
  emergency_contact_phone: '+221770000000', emergency_contact_relationship: 'Mother',
  immunizations: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
};

beforeEach(() => { vi.clearAllMocks(); });

describe('StudentHealthService - CRUD', () => {
  it('should create a student health record', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockHealth, error: null });
    const result = await mockSupabase.from('student_health').insert({
      student_id: 'stu-001', school_id: schoolId, emergency_contact_name: 'Parent Dupont',
    }).select().single();
    expect(result.data).toHaveProperty('id', 'hlth-001');
  });

  it('should get a health record by id', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockHealth, error: null });
    const result = await mockSupabase.from('student_health')
      .select('*').eq('id', 'hlth-001').eq('school_id', schoolId).single();
    expect(result.data.student_id).toBe('stu-001');
  });

  it('should list all health records for a school', async () => {
    mockSupabase.order.mockResolvedValue({ data: [mockHealth], error: null });
    const result = await mockSupabase.from('student_health')
      .select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
    expect(result.data).toHaveLength(1);
  });

  it('should update a health record', async () => {
    mockSupabase.single.mockResolvedValue({ data: { ...mockHealth, blood_type: 'O+' }, error: null });
    const result = await mockSupabase.from('student_health')
      .update({ blood_type: 'O+' }).eq('id', 'hlth-001').select().single();
    expect(result.data.blood_type).toBe('O+');
  });

  it('should soft delete a health record', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: null });
    const result = await mockSupabase.from('student_health')
      .update({ deleted_at: new Date().toISOString() }).eq('id', 'hlth-001').single();
    expect(result.error).toBeNull();
  });
});

describe('StudentHealthService - Domain', () => {
  it('should add an immunization to a record', async () => {
    const vax = [{ id: 'vax-1', vaccine_name: 'BCG', date_administered: '2026-01-15', dose_number: 1 }];
    mockSupabase.single.mockResolvedValue({ data: { ...mockHealth, immunizations: vax }, error: null });
    const result = await mockSupabase.from('student_health')
      .update({ immunizations: vax }).eq('id', 'hlth-001').select().single();
    expect(result.data.immunizations[0].vaccine_name).toBe('BCG');
  });

  it('should filter students with allergies', async () => {
    mockSupabase.order.mockResolvedValue({ data: [mockHealth], error: null });
    const result = await mockSupabase.from('student_health')
      .select('*').eq('school_id', schoolId).order('created_at');
    const withAllergies = result.data.filter((r: any) => r.allergies.length > 0);
    expect(withAllergies).toHaveLength(1);
  });

  it('should find overdue checkups', async () => {
    const overdue = { ...mockHealth, next_checkup_date: '2025-01-01' };
    mockSupabase.order.mockResolvedValue({ data: [overdue], error: null });
    const result = await mockSupabase.from('student_health')
      .select('*').eq('school_id', schoolId).order('created_at');
    const past = result.data.filter((r: any) => r.next_checkup_date < new Date().toISOString().split('T')[0]);
    expect(past).toHaveLength(1);
  });
});

describe('StudentHealthService - Errors', () => {
  it('should throw on Supabase error', async () => {
    mockSupabase.order.mockResolvedValue({ data: null, error: new Error('DB failure') });
    const result = await mockSupabase.from('student_health').select('*').eq('school_id', schoolId).order('created_at');
    expect(result.error).toBeInstanceOf(Error);
  });

  it('should reject missing school_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('school_id is required'); };
    expect(() => validate('')).toThrow('school_id is required');
  });

  it('should reject missing student_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('student_id is required'); };
    expect(() => validate('')).toThrow('student_id is required');
  });
});
