import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScMealOrderService } from '@/features/smart-campus/services/sc-meal-order.service';

describe('ScMealOrderService', () => {
  let service: ScMealOrderService;
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
    service = new ScMealOrderService(mockSupabase);
  });

  it('should get meal order by id', async () => {
    const result = await service.getMealOrder('school-1', 'order-1');
    expect(result).toBeDefined();
  });

  it('should return meal order with correct data', async () => {
    const mockOrder = { id: 'order-1', student_id: 'student-1', meal_id: 'meal-1', status: 'pending' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockOrder, error: null });
    const result = await service.getMealOrder('school-1', 'order-1');
    expect(result).toEqual(mockOrder);
  });

  it('should handle error when getting meal order', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getMealOrder('school-1', 'order-1');
    expect(result).toBeNull();
  });

  it('should get all meal orders for a school', async () => {
    const mockOrders = [{ id: 'order-1' }, { id: 'order-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockOrders, error: null });
    const result = await service.getMealOrders('school-1');
    expect(result).toEqual(mockOrders);
  });

  it('should create a new meal order', async () => {
    const newOrder = { student_id: 'student-1', meal_id: 'meal-1', quantity: 2 };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'order-3', ...newOrder }, error: null });
    const result = await service.createMealOrder('school-1', newOrder);
    expect(result).toBeDefined();
  });

  it('should update a meal order', async () => {
    const updates = { status: 'confirmed' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'order-1', ...updates }, error: null });
    const result = await service.updateMealOrder('school-1', 'order-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a meal order', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteMealOrder('school-1', 'order-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteMealOrder('school-1', 'order-1');
    expect(result).toBe(false);
  });

  it('should get pending orders', async () => {
    const mockOrders = [{ id: 'order-1', status: 'pending' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockOrders, error: null });
    const result = await service.getPendingOrders('school-1');
    expect(result).toEqual(mockOrders);
  });

  it('should get orders by student', async () => {
    const mockOrders = [{ id: 'order-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockOrders, error: null });
    const result = await service.getOrdersByStudent('school-1', 'student-1');
    expect(result).toEqual(mockOrders);
  });

  it('should confirm order', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'order-1', status: 'confirmed' }, error: null });
    const result = await service.confirmOrder('school-1', 'order-1');
    expect(result).toBeDefined();
  });

  it('should cancel order', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'order-1', status: 'cancelled' }, error: null });
    const result = await service.cancelOrder('school-1', 'order-1');
    expect(result).toBeDefined();
  });

  it('should complete order', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'order-1', status: 'completed' }, error: null });
    const result = await service.completeOrder('school-1', 'order-1');
    expect(result).toBeDefined();
  });

  it('should calculate order total', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: { id: 'meal-1', price: 500 }, error: null });
    const result = await service.calculateOrderTotal('school-1', 'meal-1', 2);
    expect(result).toBe(1000);
  });

  it('should validate order data', () => {
    const result = service.validateOrderData({ student_id: 'student-1', meal_id: 'meal-1', quantity: 2 });
    expect(result).toBe(true);
  });

  it('should reject invalid order data', () => {
    const result = service.validateOrderData({ student_id: '', meal_id: '', quantity: -1 });
    expect(result).toBe(false);
  });

  it('should get order statistics', async () => {
    const mockStats = { total: 100, pending: 10, confirmed: 80, cancelled: 10 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getOrderStatistics('school-1');
    expect(result).toBeDefined();
  });
});
