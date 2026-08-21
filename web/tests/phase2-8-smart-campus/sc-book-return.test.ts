import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScBookReturnService } from '@/features/smart-campus/services/sc-book-return.service';

describe('ScBookReturnService', () => {
  let service: ScBookReturnService;
  const mockSupabase = {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
          then: vi.fn()
        })),
        then: vi.fn()
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn()
        }))
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn()
          }))
        }))
      })),
      delete: vi.fn(() => ({
        eq: vi.fn()
      }))
    }))
  } as any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new ScBookReturnService(mockSupabase);
  });

  it('should get return record by id', async () => {
    const result = await service.getReturnRecord('school-1', 'return-1');
    expect(result).toBeDefined();
  });

  it('should return record with correct data', async () => {
    const mockReturn = { id: 'return-1', loan_id: 'loan-1', return_date: '2026-08-03', condition: 'good' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockReturn, error: null });
    const result = await service.getReturnRecord('school-1', 'return-1');
    expect(result).toEqual(mockReturn);
  });

  it('should handle error when getting return record', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getReturnRecord('school-1', 'return-1');
    expect(result).toBeNull();
  });

  it('should get all return records for a school', async () => {
    const mockReturns = [{ id: 'return-1' }, { id: 'return-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockReturns, error: null });
    const result = await service.getReturnRecords('school-1');
    expect(result).toEqual(mockReturns);
  });

  it('should create a new return record', async () => {
    const newReturn = { loan_id: 'loan-1', return_date: '2026-08-03', condition: 'good' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'return-3', ...newReturn }, error: null });
    const result = await service.createReturnRecord('school-1', newReturn);
    expect(result).toBeDefined();
  });

  it('should update a return record', async () => {
    const updates = { condition: 'damaged' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'return-1', ...updates }, error: null });
    const result = await service.updateReturnRecord('school-1', 'return-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a return record', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteReturnRecord('school-1', 'return-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteReturnRecord('school-1', 'return-1');
    expect(result).toBe(false);
  });

  it('should get returns by loan', async () => {
    const mockReturns = [{ id: 'return-1', loan_id: 'loan-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockReturns, error: null });
    const result = await service.getReturnsByLoan('school-1', 'loan-1');
    expect(result).toEqual(mockReturns);
  });

  it('should get returns by date', async () => {
    const mockReturns = [{ id: 'return-1', return_date: '2026-08-03' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockReturns, error: null });
    const result = await service.getReturnsByDate('school-1', '2026-08-03');
    expect(result).toEqual(mockReturns);
  });

  it('should process book return', async () => {
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'return-1' }, error: null });
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'loan-1', status: 'returned' }, error: null });
    const result = await service.processReturn('school-1', 'loan-1', 'good');
    expect(result).toBeDefined();
  });

  it('should check for late return', async () => {
    const mockLoan = { id: 'loan-1', due_date: '2026-08-01' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockLoan, error: null });
    const result = await service.isLateReturn('school-1', 'loan-1');
    expect(result).toBe(true);
  });

  it('should calculate late fee', async () => {
    const mockLoan = { id: 'loan-1', due_date: '2026-08-01' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockLoan, error: null });
    const result = await service.calculateLateFee('school-1', 'loan-1');
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('should validate return data', () => {
    const result = service.validateReturnData({ loan_id: 'loan-1', return_date: '2026-08-03', condition: 'good' });
    expect(result).toBe(true);
  });

  it('should reject invalid return data', () => {
    const result = service.validateReturnData({ loan_id: '', return_date: '', condition: '' });
    expect(result).toBe(false);
  });

  it('should get return statistics', async () => {
    const mockStats = { total: 50, on_time: 45, late: 5 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getReturnStatistics('school-1');
    expect(result).toBeDefined();
  });
});
