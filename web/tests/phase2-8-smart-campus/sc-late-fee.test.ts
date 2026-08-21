import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScLateFeeService } from '@/features/smart-campus/services/sc-late-fee.service';

describe('ScLateFeeService', () => {
  let service: ScLateFeeService;
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
    service = new ScLateFeeService(mockSupabase);
  });

  it('should get late fee by id', async () => {
    const result = await service.getLateFee('school-1', 'fee-1');
    expect(result).toBeDefined();
  });

  it('should return late fee with correct data', async () => {
    const mockFee = { id: 'fee-1', loan_id: 'loan-1', amount: 500, status: 'unpaid' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockFee, error: null });
    const result = await service.getLateFee('school-1', 'fee-1');
    expect(result).toEqual(mockFee);
  });

  it('should handle error when getting late fee', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getLateFee('school-1', 'fee-1');
    expect(result).toBeNull();
  });

  it('should get all late fees for a school', async () => {
    const mockFees = [{ id: 'fee-1' }, { id: 'fee-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockFees, error: null });
    const result = await service.getLateFees('school-1');
    expect(result).toEqual(mockFees);
  });

  it('should create a new late fee', async () => {
    const newFee = { loan_id: 'loan-1', amount: 500, days_overdue: 5 };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'fee-3', ...newFee }, error: null });
    const result = await service.createLateFee('school-1', newFee);
    expect(result).toBeDefined();
  });

  it('should update a late fee', async () => {
    const updates = { status: 'paid' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'fee-1', ...updates }, error: null });
    const result = await service.updateLateFee('school-1', 'fee-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a late fee', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteLateFee('school-1', 'fee-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteLateFee('school-1', 'fee-1');
    expect(result).toBe(false);
  });

  it('should get unpaid fees', async () => {
    const mockFees = [{ id: 'fee-1', status: 'unpaid' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockFees, error: null });
    const result = await service.getUnpaidFees('school-1');
    expect(result).toEqual(mockFees);
  });

  it('should get fees by student', async () => {
    const mockFees = [{ id: 'fee-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockFees, error: null });
    const result = await service.getFeesByStudent('school-1', 'student-1');
    expect(result).toEqual(mockFees);
  });

  it('should mark fee as paid', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'fee-1', status: 'paid' }, error: null });
    const result = await service.markAsPaid('school-1', 'fee-1');
    expect(result).toBeDefined();
  });

  it('should calculate late fee amount', () => {
    const amount = service.calculateLateFeeAmount(5, 100);
    expect(amount).toBe(500);
  });

  it('should calculate total unpaid fees', async () => {
    const mockFees = [{ amount: 500 }, { amount: 300 }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockFees, error: null });
    const result = await service.getTotalUnpaidFees('school-1');
    expect(result).toBe(800);
  });

  it('should validate fee data', () => {
    const result = service.validateFeeData({ loan_id: 'loan-1', amount: 500, days_overdue: 5 });
    expect(result).toBe(true);
  });

  it('should reject invalid fee data', () => {
    const result = service.validateFeeData({ loan_id: '', amount: -1, days_overdue: -1 });
    expect(result).toBe(false);
  });

  it('should get fee statistics', async () => {
    const mockStats = { total: 20, paid: 15, unpaid: 5 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getFeeStatistics('school-1');
    expect(result).toBeDefined();
  });
});
