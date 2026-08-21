import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScCirculationService } from '@/features/smart-campus/services/sc-circulation.service';

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  single: vi.fn().mockResolvedValue({ data: {}, error: null }),
};

describe('ScCirculationService', () => {
  let service: ScCirculationService;
  beforeEach(() => { vi.clearAllMocks(); service = new ScCirculationService(mockSupabase as never); });

  it('should get circulation record by id', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'circ-1', book_id: 'book-1', borrower_id: 'student-1' }, error: null });
    const result = await service.getRecord('school-1', 'circ-1');
    expect(result).toBeDefined();
  });

  it('should return null when not found', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: null });
    const result = await service.getRecord('school-1', 'circ-nonexistent');
    expect(result).toBeNull();
  });

  it('should call sc_circulation table', async () => {
    await service.getRecord('school-1', 'circ-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('sc_circulation');
  });

  it('should filter by school_id', async () => {
    await service.getRecord('school-1', 'circ-1');
    expect(mockSupabase.eq).toHaveBeenCalledWith('school_id', 'school-1');
  });

  it('should filter by id', async () => {
    await service.getRecord('school-1', 'circ-1');
    expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'circ-1');
  });

  it('should handle db error', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'DB error' } });
    const result = await service.getRecord('school-1', 'circ-1');
    expect(result).toBeNull();
  });

  it('should return record with checkout_date', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'circ-1', checkout_date: '2026-01-20' }, error: null });
    const result = await service.getRecord('school-1', 'circ-1');
    expect(result).toHaveProperty('checkout_date');
  });

  it('should return record with due_date', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'circ-1', due_date: '2026-02-03' }, error: null });
    const result = await service.getRecord('school-1', 'circ-1');
    expect(result).toHaveProperty('due_date');
  });

  it('should get all records', async () => {
    mockSupabase.single.mockResolvedValue({ data: [{ id: 'circ-1' }], error: null });
    const result = await service.getAllRecords('school-1');
    expect(result).toBeDefined();
  });

  it('should return empty array when no records', async () => {
    mockSupabase.single.mockResolvedValue({ data: [], error: null });
    const result = await service.getAllRecords('school-1');
    expect(Array.isArray(result)).toBe(true);
  });

  it('should filter by borrower_id', async () => {
    await service.getAllRecords('school-1', { borrowerId: 'student-1' });
    expect(mockSupabase.eq).toHaveBeenCalled();
  });

  it('should handle error', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } });
    const result = await service.getAllRecords('school-1');
    expect(result).toEqual([]);
  });

  it('should create checkout record', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'circ-1', status: 'checked_out' }, error: null });
    const result = await service.createCheckout('school-1', { book_id: 'book-1', borrower_id: 'student-1', checkout_date: '2026-01-20', due_date: '2026-02-03' });
    expect(result).toHaveProperty('id');
  });

  it('should call insert', async () => {
    await service.createCheckout('school-1', { book_id: 'book-1', borrower_id: 'student-1' });
    expect(mockSupabase.insert).toHaveBeenCalled();
  });

  it('should handle insert error', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Insert failed' } });
    const result = await service.createCheckout('school-1', { book_id: 'book-1', borrower_id: 'student-1' });
    expect(result).toBeNull();
  });

  it('should set default status to checked_out', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'circ-1', status: 'checked_out' }, error: null });
    const result = await service.createCheckout('school-1', { book_id: 'book-1', borrower_id: 'student-1' });
    expect(result).toHaveProperty('status', 'checked_out');
  });

  it('should process return', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'circ-1', status: 'returned', return_date: '2026-01-25' }, error: null });
    const result = await service.processReturn('school-1', 'circ-1', { return_date: '2026-01-25', condition: 'good' });
    expect(result).toHaveProperty('status', 'returned');
  });

  it('should handle return error', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } });
    const result = await service.processReturn('school-1', 'circ-1', { return_date: '2026-01-25' });
    expect(result).toBeNull();
  });

  it('should renew checkout', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'circ-1', due_date: '2026-02-17' }, error: null });
    const result = await service.renewCheckout('school-1', 'circ-1', { new_due_date: '2026-02-17' });
    expect(result).toBeDefined();
  });

  it('should handle renew error', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } });
    const result = await service.renewCheckout('school-1', 'circ-1', { new_due_date: '2026-02-17' });
    expect(result).toBeNull();
  });

  it('should update record', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'circ-1', status: 'overdue' }, error: null });
    const result = await service.updateRecord('school-1', 'circ-1', { status: 'overdue' });
    expect(result).toBeDefined();
  });

  it('should call update', async () => {
    await service.updateRecord('school-1', 'circ-1', { status: 'overdue' });
    expect(mockSupabase.update).toHaveBeenCalled();
  });

  it('should delete record', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'circ-1' }, error: null });
    const result = await service.deleteRecord('school-1', 'circ-1');
    expect(result).toBeDefined();
  });

  it('should call delete', async () => {
    await service.deleteRecord('school-1', 'circ-1');
    expect(mockSupabase.delete).toHaveBeenCalled();
  });

  it('should handle delete error', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Delete failed' } });
    const result = await service.deleteRecord('school-1', 'circ-1');
    expect(result).toBeNull();
  });

  it('should get borrower history', async () => {
    mockSupabase.single.mockResolvedValue({ data: [{ id: 'circ-1' }], error: null });
    const result = await service.getBorrowerHistory('school-1', 'student-1');
    expect(result).toBeDefined();
  });

  it('should filter by borrower_id', async () => {
    await service.getBorrowerHistory('school-1', 'student-1');
    expect(mockSupabase.eq).toHaveBeenCalledWith('borrower_id', 'student-1');
  });

  it('should return empty for no history', async () => {
    mockSupabase.single.mockResolvedValue({ data: [], error: null });
    const result = await service.getBorrowerHistory('school-1', 'student-1');
    expect(Array.isArray(result)).toBe(true);
  });

  it('should handle history error', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } });
    const result = await service.getBorrowerHistory('school-1', 'student-1');
    expect(result).toEqual([]);
  });

  it('should get overdue records', async () => {
    mockSupabase.single.mockResolvedValue({ data: [{ id: 'circ-1', status: 'overdue' }], error: null });
    const result = await service.getOverdueRecords('school-1');
    expect(result).toBeDefined();
  });

  it('should filter by status overdue', async () => {
    await service.getOverdueRecords('school-1');
    expect(mockSupabase.eq).toHaveBeenCalled();
  });

  it('should return empty for no overdue', async () => {
    mockSupabase.single.mockResolvedValue({ data: [], error: null });
    const result = await service.getOverdueRecords('school-1');
    expect(Array.isArray(result)).toBe(true);
  });

  it('should handle overdue error', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } });
    const result = await service.getOverdueRecords('school-1');
    expect(result).toEqual([]);
  });

  it('should get circulation stats', async () => {
    mockSupabase.single.mockResolvedValue({ data: { total: 500, checked_out: 200, overdue: 15 }, error: null });
    const result = await service.getCirculationStats('school-1');
    expect(result).toBeDefined();
  });

  it('should handle no circulation', async () => {
    mockSupabase.single.mockResolvedValue({ data: { total: 0, checked_out: 0, overdue: 0 }, error: null });
    const result = await service.getCirculationStats('school-1');
    expect(result).toHaveProperty('total', 0);
  });

  it('should handle stats error', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } });
    const result = await service.getCirculationStats('school-1');
    expect(result).toBeNull();
  });
});
