import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScMealSubscriptionService } from '@/features/smart-campus/services/sc-meal-subscription.service';

describe('ScMealSubscriptionService', () => {
  let service: ScMealSubscriptionService;
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
    service = new ScMealSubscriptionService(mockSupabase);
  });

  it('should get subscription by id', async () => {
    const result = await service.getSubscription('school-1', 'subscription-1');
    expect(result).toBeDefined();
  });

  it('should return subscription with correct data', async () => {
    const mockSubscription = { id: 'subscription-1', student_id: 'student-1', plan: 'monthly', status: 'active' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockSubscription, error: null });
    const result = await service.getSubscription('school-1', 'subscription-1');
    expect(result).toEqual(mockSubscription);
  });

  it('should handle error when getting subscription', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getSubscription('school-1', 'subscription-1');
    expect(result).toBeNull();
  });

  it('should get all subscriptions for a school', async () => {
    const mockSubscriptions = [{ id: 'subscription-1' }, { id: 'subscription-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockSubscriptions, error: null });
    const result = await service.getSubscriptions('school-1');
    expect(result).toEqual(mockSubscriptions);
  });

  it('should create a new subscription', async () => {
    const newSubscription = { student_id: 'student-1', plan: 'monthly', start_date: '2026-08-01' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'subscription-3', ...newSubscription }, error: null });
    const result = await service.createSubscription('school-1', newSubscription);
    expect(result).toBeDefined();
  });

  it('should update a subscription', async () => {
    const updates = { status: 'cancelled' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'subscription-1', ...updates }, error: null });
    const result = await service.updateSubscription('school-1', 'subscription-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a subscription', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteSubscription('school-1', 'subscription-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteSubscription('school-1', 'subscription-1');
    expect(result).toBe(false);
  });

  it('should get active subscriptions', async () => {
    const mockSubscriptions = [{ id: 'subscription-1', status: 'active' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockSubscriptions, error: null });
    const result = await service.getActiveSubscriptions('school-1');
    expect(result).toEqual(mockSubscriptions);
  });

  it('should get subscriptions by student', async () => {
    const mockSubscriptions = [{ id: 'subscription-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockSubscriptions, error: null });
    const result = await service.getSubscriptionsByStudent('school-1', 'student-1');
    expect(result).toEqual(mockSubscriptions);
  });

  it('should renew subscription', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'subscription-1', end_date: '2026-09-01' }, error: null });
    const result = await service.renewSubscription('school-1', 'subscription-1', '2026-09-01');
    expect(result).toBeDefined();
  });

  it('should cancel subscription', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'subscription-1', status: 'cancelled' }, error: null });
    const result = await service.cancelSubscription('school-1', 'subscription-1');
    expect(result).toBeDefined();
  });

  it('should check if subscription is active', async () => {
    const mockSubscription = { id: 'subscription-1', status: 'active', end_date: '2026-09-01' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockSubscription, error: null });
    const result = await service.isSubscriptionActive('school-1', 'subscription-1');
    expect(result).toBe(true);
  });

  it('should get subscription plans', async () => {
    const mockPlans = [{ id: 'plan-1', name: 'monthly', price: 5000 }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockPlans, error: null });
    const result = await service.getSubscriptionPlans('school-1');
    expect(result).toEqual(mockPlans);
  });

  it('should validate subscription data', () => {
    const result = service.validateSubscriptionData({ student_id: 'student-1', plan: 'monthly', start_date: '2026-08-01' });
    expect(result).toBe(true);
  });

  it('should reject invalid subscription data', () => {
    const result = service.validateSubscriptionData({ student_id: '', plan: '', start_date: '' });
    expect(result).toBe(false);
  });

  it('should get subscription statistics', async () => {
    const mockStats = { total: 100, active: 80, cancelled: 20 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getSubscriptionStatistics('school-1');
    expect(result).toBeDefined();
  });
});
