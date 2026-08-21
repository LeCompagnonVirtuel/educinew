import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('EnterpriseDashboardService', () => {
  const mockRepo = {
    getDashboardSummary: vi.fn(),
    getSchoolMetrics: vi.fn(),
    getSubscriptionOverview: vi.fn(),
    getUsageMetrics: vi.fn(),
    getRecentActivity: vi.fn(),
    getRevenueMetrics: vi.fn(),
    getUserGrowthMetrics: vi.fn(),
    getStorageMetrics: vi.fn(),
    getApiUsageMetrics: vi.fn(),
    getLicenseMetrics: vi.fn(),
  };

  const enterpriseId = 'ent-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getDashboardSummary', () => {
    it('should return dashboard summary', async () => {
      const summary = { totalSchools: 5, totalUsers: 200, activeSubscriptions: 3 };
      mockRepo.getDashboardSummary.mockResolvedValue(summary);
      const result = await mockRepo.getDashboardSummary(enterpriseId);
      expect(result).toEqual(summary);
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should return zero metrics for new enterprise', async () => {
      mockRepo.getDashboardSummary.mockResolvedValue({ totalSchools: 0, totalUsers: 0 });
      const result = await mockRepo.getDashboardSummary(enterpriseId);
      expect(result.totalSchools).toBe(0);
    });

    it('should include timestamp', async () => {
      mockRepo.getDashboardSummary.mockResolvedValue({ timestamp: new Date().toISOString() });
      const result = await mockRepo.getDashboardSummary(enterpriseId);
      expect(result.timestamp).toBeDefined();
    });

    it('should handle repository errors', async () => {
      mockRepo.getDashboardSummary.mockRejectedValue(new Error('Database error'));
      await expect(mockRepo.getDashboardSummary(enterpriseId)).rejects.toThrow('Database error');
    });

    it('should handle null response', async () => {
      mockRepo.getDashboardSummary.mockResolvedValue(null);
      const result = await mockRepo.getDashboardSummary(enterpriseId);
      expect(result).toBeNull();
    });
  });

  describe('getSchoolMetrics', () => {
    it('should return school metrics', async () => {
      const metrics = [{ schoolId: 's-1', name: 'School A', userCount: 50 }];
      mockRepo.getSchoolMetrics.mockResolvedValue(metrics);
      const result = await mockRepo.getSchoolMetrics(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should filter by school status', async () => {
      mockRepo.getSchoolMetrics.mockResolvedValue([]);
      await mockRepo.getSchoolMetrics(enterpriseId, { status: 'active' });
      expect(mockRepo.getSchoolMetrics).toHaveBeenCalledWith(enterpriseId, { status: 'active' });
    });

    it('should handle empty school list', async () => {
      mockRepo.getSchoolMetrics.mockResolvedValue([]);
      const result = await mockRepo.getSchoolMetrics(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should sort by user count', async () => {
      const metrics = [
        { schoolId: 's-1', userCount: 10 },
        { schoolId: 's-2', userCount: 50 },
      ];
      mockRepo.getSchoolMetrics.mockResolvedValue(metrics);
      const result = await mockRepo.getSchoolMetrics(enterpriseId, { sortBy: 'userCount' });
      expect(result[1].userCount).toBeGreaterThan(result[0].userCount);
    });

    it('should require enterpriseId for school metrics', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant requis');
      };
      expect(() => validate('')).toThrow('Identifiant requis');
    });
  });

  describe('getSubscriptionOverview', () => {
    it('should return subscription overview', async () => {
      const overview = { active: 3, trial: 1, expired: 0 };
      mockRepo.getSubscriptionOverview.mockResolvedValue(overview);
      const result = await mockRepo.getSubscriptionOverview(enterpriseId);
      expect(result.active).toBe(3);
    });

    it('should include plan distribution', async () => {
      mockRepo.getSubscriptionOverview.mockResolvedValue({ plans: { basic: 2, premium: 1 } });
      const result = await mockRepo.getSubscriptionOverview(enterpriseId);
      expect(result.plans).toBeDefined();
    });

    it('should handle no subscriptions', async () => {
      mockRepo.getSubscriptionOverview.mockResolvedValue({ active: 0, trial: 0, expired: 0 });
      const result = await mockRepo.getSubscriptionOverview(enterpriseId);
      expect(result.active).toBe(0);
      expect(result.trial).toBe(0);
    });

    it('should include renewal dates', async () => {
      mockRepo.getSubscriptionOverview.mockResolvedValue({ nextRenewal: '2026-08-01' });
      const result = await mockRepo.getSubscriptionOverview(enterpriseId);
      expect(result.nextRenewal).toBeDefined();
    });

    it('should handle repository failure', async () => {
      mockRepo.getSubscriptionOverview.mockRejectedValue(new Error('Service unavailable'));
      await expect(mockRepo.getSubscriptionOverview(enterpriseId)).rejects.toThrow('Service unavailable');
    });
  });

  describe('getUsageMetrics', () => {
    it('should return usage metrics', async () => {
      mockRepo.getUsageMetrics.mockResolvedValue({ apiCalls: 10000, storageUsed: '5GB' });
      const result = await mockRepo.getUsageMetrics(enterpriseId);
      expect(result.apiCalls).toBe(10000);
    });

    it('should filter by date range', async () => {
      mockRepo.getUsageMetrics.mockResolvedValue({ apiCalls: 500 });
      await mockRepo.getUsageMetrics(enterpriseId, { startDate: '2026-01-01', endDate: '2026-01-31' });
      expect(mockRepo.getUsageMetrics).toHaveBeenCalledWith(enterpriseId, expect.objectContaining({ startDate: '2026-01-01' }));
    });

    it('should handle zero usage', async () => {
      mockRepo.getUsageMetrics.mockResolvedValue({ apiCalls: 0, storageUsed: '0B' });
      const result = await mockRepo.getUsageMetrics(enterpriseId);
      expect(result.apiCalls).toBe(0);
    });

    it('should include per-school breakdown', async () => {
      mockRepo.getUsageMetrics.mockResolvedValue({ perSchool: [{ schoolId: 's-1', apiCalls: 500 }] });
      const result = await mockRepo.getUsageMetrics(enterpriseId);
      expect(result.perSchool).toBeDefined();
    });

    it('should handle invalid date range', () => {
      const validate = (start: string, end: string) => {
        if (new Date(start) > new Date(end)) throw new Error('Date de début doit précéder la date de fin');
      };
      expect(() => validate('2026-02-01', '2026-01-01')).toThrow();
    });
  });

  describe('getRecentActivity', () => {
    it('should return recent activities', async () => {
      const activities = [{ id: 'a-1', type: 'user_created', timestamp: new Date().toISOString() }];
      mockRepo.getRecentActivity.mockResolvedValue(activities);
      const result = await mockRepo.getRecentActivity(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should limit results', async () => {
      mockRepo.getRecentActivity.mockResolvedValue([]);
      await mockRepo.getRecentActivity(enterpriseId, { limit: 5 });
      expect(mockRepo.getRecentActivity).toHaveBeenCalledWith(enterpriseId, { limit: 5 });
    });

    it('should filter by activity type', async () => {
      mockRepo.getRecentActivity.mockResolvedValue([]);
      await mockRepo.getRecentActivity(enterpriseId, { type: 'subscription_change' });
      expect(mockRepo.getRecentActivity).toHaveBeenCalledWith(enterpriseId, { type: 'subscription_change' });
    });

    it('should handle empty activities', async () => {
      mockRepo.getRecentActivity.mockResolvedValue([]);
      const result = await mockRepo.getRecentActivity(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should sort by timestamp descending', async () => {
      const activities = [
        { id: 'a-1', timestamp: '2026-01-01T10:00:00Z' },
        { id: 'a-2', timestamp: '2026-01-02T10:00:00Z' },
      ];
      mockRepo.getRecentActivity.mockResolvedValue(activities);
      const result = await mockRepo.getRecentActivity(enterpriseId);
      const sorted = [...result].sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      expect(sorted[0].id).toBe('a-2');
      expect(sorted[1].id).toBe('a-1');
    });
  });

  describe('getRevenueMetrics', () => {
    it('should return revenue metrics', async () => {
      mockRepo.getRevenueMetrics.mockResolvedValue({ totalRevenue: 50000, mrr: 4200 });
      const result = await mockRepo.getRevenueMetrics(enterpriseId);
      expect(result.totalRevenue).toBe(50000);
    });

    it('should filter by period', async () => {
      mockRepo.getRevenueMetrics.mockResolvedValue({ totalRevenue: 5000 });
      await mockRepo.getRevenueMetrics(enterpriseId, { period: 'monthly' });
      expect(mockRepo.getRevenueMetrics).toHaveBeenCalledWith(enterpriseId, { period: 'monthly' });
    });

    it('should include growth rate', async () => {
      mockRepo.getRevenueMetrics.mockResolvedValue({ growthRate: 12.5 });
      const result = await mockRepo.getRevenueMetrics(enterpriseId);
      expect(result.growthRate).toBe(12.5);
    });

    it('should handle zero revenue', async () => {
      mockRepo.getRevenueMetrics.mockResolvedValue({ totalRevenue: 0, mrr: 0 });
      const result = await mockRepo.getRevenueMetrics(enterpriseId);
      expect(result.totalRevenue).toBe(0);
    });

    it('should handle negative growth', async () => {
      mockRepo.getRevenueMetrics.mockResolvedValue({ growthRate: -5.2 });
      const result = await mockRepo.getRevenueMetrics(enterpriseId);
      expect(result.growthRate).toBeLessThan(0);
    });
  });
});
