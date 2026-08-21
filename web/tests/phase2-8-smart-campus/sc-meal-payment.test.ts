import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScMealPaymentService } from '@/features/smart-campus/services/sc-meal-payment.service';

describe('ScMealPaymentService', () => {
  let service: ScMealPaymentService;
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
    service = new ScMealPaymentService(mockSupabase);
  });

  it('should get payment by id', async () => {
    const result = await service.getPayment('school-1', 'payment-1');
    expect(result).toBeDefined();
  });

  it('should return payment with correct data', async () => {
    const mockPayment = { id: 'payment-1', student_id: 'student-1', amount: 5000, status: 'completed' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockPayment, error: null });
    const result = await service.getPayment('school-1', 'payment-1');
    expect(result).toEqual(mockPayment);
  });

  it('should handle error when getting payment', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getPayment('school-1', 'payment-1');
    expect(result).toBeNull();
  });

  it('should get all payments for a school', async () => {
    const mockPayments = [{ id: 'payment-1' }, { id: 'payment-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockPayments, error: null });
    const result = await service.getPayments('school-1');
    expect(result).toEqual(mockPayments);
  });

  it('should create a new payment', async () => {
    const newPayment = { student_id: 'student-1', amount: 5000, method: 'cash' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'payment-3', ...newPayment }, error: null });
    const result = await service.createPayment('school-1', newPayment);
    expect(result).toBeDefined();
  });

  it('should update a payment', async () => {
    const updates = { status: 'refunded' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'payment-1', ...updates }, error: null });
    const result = await service.updatePayment('school-1', 'payment-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a payment', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deletePayment('school-1', 'payment-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deletePayment('school-1', 'payment-1');
    expect(result).toBe(false);
  });

  it('should get payments by student', async () => {
    const mockPayments = [{ id: 'payment-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockPayments, error: null });
    const result = await service.getPaymentsByStudent('school-1', 'student-1');
    expect(result).toEqual(mockPayments);
  });

  it('should process payment', async () => {
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'payment-1', status: 'completed' }, error: null });
    const result = await service.processPayment('school-1', { student_id: 'student-1', amount: 5000, method: 'cash' });
    expect(result).toBeDefined();
  });

  it('should refund payment', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'payment-1', status: 'refunded' }, error: null });
    const result = await service.refundPayment('school-1', 'payment-1');
    expect(result).toBeDefined();
  });

  it('should get total revenue', async () => {
    const mockPayments = [{ amount: 5000 }, { amount: 3000 }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockPayments, error: null });
    const result = await service.getTotalRevenue('school-1');
    expect(result).toBe(8000);
  });

  it('should get payments by date range', async () => {
    const mockPayments = [{ id: 'payment-1', date: '2026-08-01' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockPayments, error: null });
    const result = await service.getPaymentsByDateRange('school-1', '2026-08-01', '2026-08-03');
    expect(result).toEqual(mockPayments);
  });

  it('should validate payment data', () => {
    const result = service.validatePaymentData({ student_id: 'student-1', amount: 5000, method: 'cash' });
    expect(result).toBe(true);
  });

  it('should reject invalid payment data', () => {
    const result = service.validatePaymentData({ student_id: '', amount: -1, method: '' });
    expect(result).toBe(false);
  });

  it('should get payment statistics', async () => {
    const mockStats = { total: 100, completed: 90, refunded: 10 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getPaymentStatistics('school-1');
    expect(result).toBeDefined();
  });
});
