import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createSubscriptionService } from '../../src/features/integration/services/subscription.service';

describe('SubscriptionService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getSubscriptions: vi.fn(),
      getSubscriptionById: vi.fn(),
      createSubscription: vi.fn(),
      updateSubscription: vi.fn(),
      cancelSubscription: vi.fn(),
      renewSubscription: vi.fn(),
      getSubscriptionUsage: vi.fn(),
      getSubscriptionInvoices: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createSubscriptionService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getSubscriptions).toBeInstanceOf(Function);
    expect(service.getSubscriptionById).toBeInstanceOf(Function);
    expect(service.createSubscription).toBeInstanceOf(Function);
    expect(service.updateSubscription).toBeInstanceOf(Function);
    expect(service.cancelSubscription).toBeInstanceOf(Function);
    expect(service.renewSubscription).toBeInstanceOf(Function);
    expect(service.getSubscriptionUsage).toBeInstanceOf(Function);
    expect(service.getSubscriptionInvoices).toBeInstanceOf(Function);
  });

  describe('getSubscriptions', () => {
    it('should return subscriptions list', async () => {
      mockRepository.getSubscriptions.mockResolvedValue([{ id: 'sub-1', plan: 'Enterprise', status: 'active' }]);
      const service = createSubscriptionService(mockRepository);
      const result = await service.getSubscriptions('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return subscriptions with filters', async () => {
      mockRepository.getSubscriptions.mockResolvedValue([{ id: 'sub-1' }]);
      const service = createSubscriptionService(mockRepository);
      await service.getSubscriptions('school-1', { status: 'active' });
      expect(mockRepository.getSubscriptions).toHaveBeenCalledWith('school-1', { status: 'active' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createSubscriptionService(mockRepository);
      await expect(service.getSubscriptions('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getSubscriptions.mockResolvedValue([]);
      const service = createSubscriptionService(mockRepository);
      const result = await service.getSubscriptions('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated subscriptions', async () => {
      mockRepository.getSubscriptions.mockResolvedValue({ data: [{ id: 'sub-1' }], total: 10 });
      const service = createSubscriptionService(mockRepository);
      const result = await service.getSubscriptions('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by plan', async () => {
      mockRepository.getSubscriptions.mockResolvedValue([{ id: 'sub-1', plan: 'Enterprise' }]);
      const service = createSubscriptionService(mockRepository);
      const result = await service.getSubscriptions('school-1', { plan: 'Enterprise' });
      expect(result).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getSubscriptions.mockRejectedValue(new Error('DB error'));
      const service = createSubscriptionService(mockRepository);
      await expect(service.getSubscriptions('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getSubscriptionById', () => {
    it('should return a single subscription', async () => {
      mockRepository.getSubscriptionById.mockResolvedValue({ id: 'sub-1', plan: 'Enterprise', status: 'active' });
      const service = createSubscriptionService(mockRepository);
      const result = await service.getSubscriptionById('sub-1');
      expect(result.id).toBe('sub-1');
    });

    it('should throw if subscription not found', async () => {
      mockRepository.getSubscriptionById.mockResolvedValue(null);
      const service = createSubscriptionService(mockRepository);
      await expect(service.getSubscriptionById('nonexistent')).rejects.toThrow('Subscription not found');
    });

    it('should throw if id is missing', async () => {
      const service = createSubscriptionService(mockRepository);
      await expect(service.getSubscriptionById('')).rejects.toThrow('Subscription ID is required');
    });

    it('should return subscription with billing', async () => {
      mockRepository.getSubscriptionById.mockResolvedValue({ id: 'sub-1', billing: { interval: 'monthly', amount: 99.99, currency: 'USD' } });
      const service = createSubscriptionService(mockRepository);
      const result = await service.getSubscriptionById('sub-1');
      expect(result.billing.amount).toBe(99.99);
    });

    it('should return subscription with limits', async () => {
      mockRepository.getSubscriptionById.mockResolvedValue({ id: 'sub-1', limits: { users: 100, storage: '50GB', apiCalls: 10000 } });
      const service = createSubscriptionService(mockRepository);
      const result = await service.getSubscriptionById('sub-1');
      expect(result.limits.users).toBe(100);
    });

    it('should handle repository errors', async () => {
      mockRepository.getSubscriptionById.mockRejectedValue(new Error('Query timeout'));
      const service = createSubscriptionService(mockRepository);
      await expect(service.getSubscriptionById('sub-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createSubscription', () => {
    it('should create a subscription', async () => {
      mockRepository.createSubscription.mockResolvedValue({ id: 'sub-1', plan: 'Enterprise', status: 'active' });
      const service = createSubscriptionService(mockRepository);
      const result = await service.createSubscription('school-1', 'user-1', { plan: 'Enterprise', billing: { interval: 'monthly', amount: 99.99 } });
      expect(result.id).toBe('sub-1');
      expect(mockRepository.createSubscription).toHaveBeenCalled();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createSubscriptionService(mockRepository);
      await expect(service.createSubscription('', 'user-1', { plan: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createSubscriptionService(mockRepository);
      await expect(service.createSubscription('school-1', '', { plan: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if plan is missing', async () => {
      const service = createSubscriptionService(mockRepository);
      await expect(service.createSubscription('school-1', 'user-1', { plan: '' })).rejects.toThrow('Plan is required');
    });

    it('should create subscription with trial', async () => {
      mockRepository.createSubscription.mockResolvedValue({ id: 'sub-1', trial: { endsAt: '2024-02-01', daysRemaining: 14 } });
      const service = createSubscriptionService(mockRepository);
      const result = await service.createSubscription('school-1', 'user-1', { plan: 'T', trial: { days: 14 } });
      expect(result.trial.daysRemaining).toBe(14);
    });

    it('should handle creation failure', async () => {
      mockRepository.createSubscription.mockRejectedValue(new Error('Invalid plan'));
      const service = createSubscriptionService(mockRepository);
      await expect(service.createSubscription('school-1', 'user-1', { plan: 'T' })).rejects.toThrow('Invalid plan');
    });
  });

  describe('updateSubscription', () => {
    it('should update a subscription', async () => {
      mockRepository.getSubscriptionById.mockResolvedValue({ id: 'sub-1', plan: 'Basic' });
      mockRepository.updateSubscription.mockResolvedValue({ id: 'sub-1', plan: 'Enterprise' });
      const service = createSubscriptionService(mockRepository);
      const result = await service.updateSubscription('sub-1', 'user-1', { plan: 'Enterprise' });
      expect(result.plan).toBe('Enterprise');
    });

    it('should throw if subscription not found', async () => {
      mockRepository.getSubscriptionById.mockResolvedValue(null);
      const service = createSubscriptionService(mockRepository);
      await expect(service.updateSubscription('nonexistent', 'user-1', { plan: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createSubscriptionService(mockRepository);
      await expect(service.updateSubscription('', 'user-1', { plan: 'New' })).rejects.toThrow('Subscription ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createSubscriptionService(mockRepository);
      await expect(service.updateSubscription('sub-1', '', { plan: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update billing', async () => {
      mockRepository.getSubscriptionById.mockResolvedValue({ id: 'sub-1' });
      mockRepository.updateSubscription.mockResolvedValue({ id: 'sub-1', billing: { interval: 'yearly', amount: 999.99 } });
      const service = createSubscriptionService(mockRepository);
      const result = await service.updateSubscription('sub-1', 'user-1', { billing: { interval: 'yearly', amount: 999.99 } });
      expect(result.billing.interval).toBe('yearly');
    });

    it('should handle update failure', async () => {
      mockRepository.getSubscriptionById.mockResolvedValue({ id: 'sub-1' });
      mockRepository.updateSubscription.mockRejectedValue(new Error('Cannot downgrade'));
      const service = createSubscriptionService(mockRepository);
      await expect(service.updateSubscription('sub-1', 'user-1', { plan: 'Basic' })).rejects.toThrow('Cannot downgrade');
    });
  });

  describe('cancelSubscription', () => {
    it('should cancel a subscription', async () => {
      mockRepository.cancelSubscription.mockResolvedValue({ id: 'sub-1', status: 'cancelled', cancelledAt: '2024-01-01', endsAt: '2024-02-01' });
      const service = createSubscriptionService(mockRepository);
      const result = await service.cancelSubscription('sub-1', 'user-1', { reason: 'Too expensive' });
      expect(result.status).toBe('cancelled');
    });

    it('should throw if subscriptionId is missing', async () => {
      const service = createSubscriptionService(mockRepository);
      await expect(service.cancelSubscription('', 'user-1', {})).rejects.toThrow('Subscription ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createSubscriptionService(mockRepository);
      await expect(service.cancelSubscription('sub-1', '', {})).rejects.toThrow('userId is required');
    });

    it('should handle already cancelled', async () => {
      mockRepository.cancelSubscription.mockResolvedValue({ status: 'already_cancelled' });
      const service = createSubscriptionService(mockRepository);
      const result = await service.cancelSubscription('sub-1', 'user-1', {});
      expect(result.status).toBe('already_cancelled');
    });

    it('should handle cancellation failure', async () => {
      mockRepository.cancelSubscription.mockRejectedValue(new Error('Cannot cancel'));
      const service = createSubscriptionService(mockRepository);
      await expect(service.cancelSubscription('sub-1', 'user-1', {})).rejects.toThrow('Cannot cancel');
    });
  });

  describe('renewSubscription', () => {
    it('should renew a subscription', async () => {
      mockRepository.renewSubscription.mockResolvedValue({ id: 'sub-1', status: 'active', renewedAt: '2024-01-01', expiresAt: '2025-01-01' });
      const service = createSubscriptionService(mockRepository);
      const result = await service.renewSubscription('sub-1', 'user-1');
      expect(result.status).toBe('active');
    });

    it('should throw if subscriptionId is missing', async () => {
      const service = createSubscriptionService(mockRepository);
      await expect(service.renewSubscription('', 'user-1')).rejects.toThrow('Subscription ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createSubscriptionService(mockRepository);
      await expect(service.renewSubscription('sub-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle renewal failure', async () => {
      mockRepository.renewSubscription.mockRejectedValue(new Error('Payment failed'));
      const service = createSubscriptionService(mockRepository);
      await expect(service.renewSubscription('sub-1', 'user-1')).rejects.toThrow('Payment failed');
    });

    it('should return renewal details', async () => {
      mockRepository.renewSubscription.mockResolvedValue({ id: 'sub-1', status: 'active', renewedAt: '2024-01-01', expiresAt: '2025-01-01', amount: 99.99 });
      const service = createSubscriptionService(mockRepository);
      const result = await service.renewSubscription('sub-1', 'user-1');
      expect(result.amount).toBe(99.99);
    });
  });

  describe('getSubscriptionUsage', () => {
    it('should return subscription usage', async () => {
      mockRepository.getSubscriptionUsage.mockResolvedValue({ subscriptionId: 'sub-1', users: { used: 50, limit: 100 }, storage: { used: '25GB', limit: '50GB' } });
      const service = createSubscriptionService(mockRepository);
      const result = await service.getSubscriptionUsage('sub-1');
      expect(result.users.used).toBe(50);
    });

    it('should throw if subscriptionId is missing', async () => {
      const service = createSubscriptionService(mockRepository);
      await expect(service.getSubscriptionUsage('')).rejects.toThrow('Subscription ID is required');
    });

    it('should return zero usage', async () => {
      mockRepository.getSubscriptionUsage.mockResolvedValue({ subscriptionId: 'sub-1', users: { used: 0, limit: 100 } });
      const service = createSubscriptionService(mockRepository);
      const result = await service.getSubscriptionUsage('sub-1');
      expect(result.users.used).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getSubscriptionUsage.mockRejectedValue(new Error('DB error'));
      const service = createSubscriptionService(mockRepository);
      await expect(service.getSubscriptionUsage('sub-1')).rejects.toThrow('DB error');
    });
  });

  describe('getSubscriptionInvoices', () => {
    it('should return subscription invoices', async () => {
      mockRepository.getSubscriptionInvoices.mockResolvedValue([{ id: 'inv-1', amount: 99.99, status: 'paid', date: '2024-01-01' }]);
      const service = createSubscriptionService(mockRepository);
      const result = await service.getSubscriptionInvoices('sub-1');
      expect(result).toHaveLength(1);
    });

    it('should throw if subscriptionId is missing', async () => {
      const service = createSubscriptionService(mockRepository);
      await expect(service.getSubscriptionInvoices('')).rejects.toThrow('Subscription ID is required');
    });

    it('should return paginated invoices', async () => {
      mockRepository.getSubscriptionInvoices.mockResolvedValue({ data: [{ id: 'inv-1' }], total: 12 });
      const service = createSubscriptionService(mockRepository);
      const result = await service.getSubscriptionInvoices('sub-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should return empty invoices', async () => {
      mockRepository.getSubscriptionInvoices.mockResolvedValue([]);
      const service = createSubscriptionService(mockRepository);
      const result = await service.getSubscriptionInvoices('sub-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getSubscriptionInvoices.mockRejectedValue(new Error('DB error'));
      const service = createSubscriptionService(mockRepository);
      await expect(service.getSubscriptionInvoices('sub-1')).rejects.toThrow('DB error');
    });
  });
});
