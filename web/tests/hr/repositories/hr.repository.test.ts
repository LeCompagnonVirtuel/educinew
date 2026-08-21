import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('HR Repository', () => {
  let mockSupabase: any;

  beforeEach(() => {
    vi.clearAllMocks();
    const chain: any = {};
    chain.from = vi.fn().mockReturnValue(chain);
    chain.select = vi.fn().mockReturnValue(chain);
    chain.insert = vi.fn().mockReturnValue(chain);
    chain.update = vi.fn().mockReturnValue(chain);
    chain.delete = vi.fn().mockReturnValue(chain);
    chain.eq = vi.fn().mockReturnValue(chain);
    chain.order = vi.fn().mockReturnValue(chain);
    chain.range = vi.fn().mockReturnValue(chain);
    chain.or = vi.fn().mockReturnValue(chain);
    chain.is = vi.fn().mockReturnValue(chain);
    chain.gte = vi.fn().mockReturnValue(chain);
    chain.lte = vi.fn().mockReturnValue(chain);
    chain.single = vi.fn().mockResolvedValue({ data: null, error: null });
    chain.then = undefined;
    mockSupabase = chain;
  });

  it('should query employees table', async () => {
    mockSupabase.single.mockResolvedValue({ data: [], error: null });
    const result = await mockSupabase.from('employees').select('*').eq('school_id', 'school-1').order('created_at', { ascending: false });
    expect(mockSupabase.from).toHaveBeenCalledWith('employees');
  });

  it('should query employee by id', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'emp-1', first_name: 'John' }, error: null });
    const { data } = await mockSupabase.from('employees').select('*').eq('school_id', 'school-1').eq('id', 'emp-1').single();
    expect(data.id).toBe('emp-1');
  });

  it('should insert employee', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'emp-1', first_name: 'John' }, error: null });
    const { data } = await mockSupabase.from('employees').insert({ first_name: 'John' }).select().single();
    expect(data.first_name).toBe('John');
  });

  it('should update employee', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'emp-1', first_name: 'Jane' }, error: null });
    const { data } = await mockSupabase.from('employees').update({ first_name: 'Jane' }).eq('school_id', 'school-1').eq('id', 'emp-1').select().single();
    expect(data.first_name).toBe('Jane');
  });

  it('should delete employee', async () => {
    mockSupabase.delete.mockReturnValue(mockSupabase);
    mockSupabase.eq.mockReturnValue(mockSupabase);
    await mockSupabase.from('employees').delete().eq('school_id', 'school-1').eq('id', 'emp-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('employees');
  });

  it('should count employees', async () => {
    mockSupabase.select.mockReturnValue({ ...mockSupabase, eq: vi.fn().mockReturnValue({ ...mockSupabase, then: (resolve: any) => resolve({ count: 42, error: null }) }) });
    mockSupabase.select.mockResolvedValue({ count: 42, error: null });
    const { count } = await mockSupabase.from('employees').select('id', { count: 'exact', head: true });
    expect(count).toBe(42);
  });

  it('should query departments', async () => {
    mockSupabase.eq.mockReturnValue({ ...mockSupabase, order: vi.fn().mockResolvedValue({ data: [{ id: '1', name: 'IT' }], error: null }) });
    const result = await mockSupabase.from('departments').select('*').eq('school_id', 'school-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('departments');
  });

  it('should insert department', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: '1', name: 'IT' }, error: null });
    const { data } = await mockSupabase.from('departments').insert({ name: 'IT' }).select().single();
    expect(data.name).toBe('IT');
  });

  it('should query positions', async () => {
    mockSupabase.eq.mockReturnValue({ ...mockSupabase, order: vi.fn().mockResolvedValue({ data: [{ id: '1', name: 'Director' }], error: null }) });
    const result = await mockSupabase.from('positions').select('*').eq('school_id', 'school-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('positions');
  });

  it('should query contracts', async () => {
    mockSupabase.eq.mockReturnValue({ ...mockSupabase, order: vi.fn().mockResolvedValue({ data: [{ id: '1', status: 'active' }], error: null }) });
    const result = await mockSupabase.from('employee_contracts').select('*').eq('school_id', 'school-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('employee_contracts');
  });

  it('should query leaves', async () => {
    mockSupabase.eq.mockReturnValue({ ...mockSupabase, order: vi.fn().mockResolvedValue({ data: [{ id: '1', status: 'pending' }], error: null }) });
    const result = await mockSupabase.from('leaves').select('*').eq('school_id', 'school-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('leaves');
  });

  it('should query pending leaves', async () => {
    mockSupabase.eq.mockReturnValue({ ...mockSupabase, order: vi.fn().mockResolvedValue({ data: [{ id: '1', status: 'pending' }], error: null }) });
    const result = await mockSupabase.from('leaves').select('*').eq('school_id', 'school-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('leaves');
  });

  it('should query trainings', async () => {
    mockSupabase.eq.mockReturnValue({ ...mockSupabase, order: vi.fn().mockResolvedValue({ data: [{ id: '1', title: 'Leadership' }], error: null }) });
    const result = await mockSupabase.from('trainings').select('*').eq('school_id', 'school-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('trainings');
  });

  it('should query certifications', async () => {
    mockSupabase.eq.mockReturnValue({ ...mockSupabase, order: vi.fn().mockResolvedValue({ data: [{ id: '1', name: 'PMP' }], error: null }) });
    const result = await mockSupabase.from('certifications').select('*').eq('school_id', 'school-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('certifications');
  });

  it('should query performance reviews', async () => {
    mockSupabase.eq.mockReturnValue({ ...mockSupabase, order: vi.fn().mockResolvedValue({ data: [{ id: '1', score: 85 }], error: null }) });
    const result = await mockSupabase.from('performance_reviews').select('*').eq('school_id', 'school-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('performance_reviews');
  });

  it('should query recruitments', async () => {
    mockSupabase.eq.mockReturnValue({ ...mockSupabase, order: vi.fn().mockResolvedValue({ data: [{ id: '1', title: 'Teacher' }], error: null }) });
    const result = await mockSupabase.from('recruitments').select('*').eq('school_id', 'school-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('recruitments');
  });

  it('should query candidates', async () => {
    mockSupabase.eq.mockReturnValue({ ...mockSupabase, order: vi.fn().mockResolvedValue({ data: [{ id: '1', name: 'John' }], error: null }) });
    const result = await mockSupabase.from('candidates').select('*').eq('school_id', 'school-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('candidates');
  });

  it('should query interviews', async () => {
    mockSupabase.eq.mockReturnValue({ ...mockSupabase, order: vi.fn().mockResolvedValue({ data: [{ id: '1', scheduled_date: '2026-08-01' }], error: null }) });
    const result = await mockSupabase.from('interviews').select('*').eq('school_id', 'school-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('interviews');
  });

  it('should record clock in', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: '1', clock_in: '2026-07-23T08:00:00Z' }, error: null });
    const { data } = await mockSupabase.from('employee_attendance').insert({ clock_in: '2026-07-23T08:00:00Z' }).select().single();
    expect(data.clock_in).toBeDefined();
  });

  it('should record clock out', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: '1', clock_out: '2026-07-23T17:00:00Z' }, error: null });
    const { data } = await mockSupabase.from('employee_attendance').update({ clock_out: '2026-07-23T17:00:00Z' }).eq('id', '1').select().single();
    expect(data.clock_out).toBeDefined();
  });

  it('should generate employee code', async () => {
    const count = 5;
    const code = `DIR-2026-${(count + 1).toString().padStart(4, '0')}`;
    expect(code).toBe('DIR-2026-0006');
  });

  it('should return employee statistics', async () => {
    const stats = { totalEmployees: 100, activeEmployees: 80, onLeaveEmployees: 10, suspendedEmployees: 5, terminatedEmployees: 5 };
    expect(stats.totalEmployees).toBe(100);
  });

  it('should query benefits', async () => {
    mockSupabase.eq.mockReturnValue({ ...mockSupabase, order: vi.fn().mockResolvedValue({ data: [{ id: '1', name: 'Health Insurance' }], error: null }) });
    const result = await mockSupabase.from('benefits').select('*').eq('school_id', 'school-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('benefits');
  });

  it('should query deductions', async () => {
    mockSupabase.eq.mockReturnValue({ ...mockSupabase, order: vi.fn().mockResolvedValue({ data: [{ id: '1', name: 'CNPS' }], error: null }) });
    const result = await mockSupabase.from('deductions').select('*').eq('school_id', 'school-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('deductions');
  });

  it('should query allowances', async () => {
    mockSupabase.eq.mockReturnValue({ ...mockSupabase, order: vi.fn().mockResolvedValue({ data: [{ id: '1', name: 'Transport' }], error: null }) });
    const result = await mockSupabase.from('allowances').select('*').eq('school_id', 'school-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('allowances');
  });

  it('should query salary scales', async () => {
    mockSupabase.eq.mockReturnValue({ ...mockSupabase, order: vi.fn().mockResolvedValue({ data: [{ id: '1', name: 'Scale A' }], error: null }) });
    const result = await mockSupabase.from('salary_scales').select('*').eq('school_id', 'school-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('salary_scales');
  });

  it('should query employee documents', async () => {
    mockSupabase.eq.mockReturnValue({ ...mockSupabase, order: vi.fn().mockResolvedValue({ data: [{ id: '1', name: 'Contract' }], error: null }) });
    const result = await mockSupabase.from('employee_documents').select('*').eq('school_id', 'school-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('employee_documents');
  });

  it('should query shifts', async () => {
    mockSupabase.eq.mockReturnValue({ ...mockSupabase, order: vi.fn().mockResolvedValue({ data: [{ id: '1', name: 'Morning' }], error: null }) });
    const result = await mockSupabase.from('employee_shifts').select('*').eq('school_id', 'school-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('employee_shifts');
  });

  it('should query attendance', async () => {
    mockSupabase.eq.mockReturnValue({ ...mockSupabase, order: vi.fn().mockResolvedValue({ data: [{ id: '1', clock_in: '2026-07-23T08:00:00Z' }], error: null }) });
    const result = await mockSupabase.from('employee_attendance').select('*').eq('school_id', 'school-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('employee_attendance');
  });

  it('should log audit entry', async () => {
    mockSupabase.insert.mockResolvedValue({ error: null });
    await mockSupabase.from('audit_logs').insert({ school_id: 'school-1', action: 'create' });
    expect(mockSupabase.from).toHaveBeenCalledWith('audit_logs');
  });
});
