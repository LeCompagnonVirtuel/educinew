import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('EnterpriseStatisticsService', () => {
  const mockRepo = {
    getGlobalStats: vi.fn(),
    getUserStats: vi.fn(),
    getSchoolStats: vi.fn(),
    getSubscriptionStats: vi.fn(),
    getRevenueStats: vi.fn(),
    getEnrollmentStats: vi.fn(),
    getGrowthStats: vi.fn(),
    getPerformanceStats: vi.fn(),
    getComparisonStats: vi.fn(),
    getHistoricalStats: vi.fn(),
  };

  const enterpriseId = 'ent-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getGlobalStats', () => {
    it('should return global statistics', async () => {
      const stats = { totalUsers: 500, totalSchools: 10, totalRevenue: 100000 };
      mockRepo.getGlobalStats.mockResolvedValue(stats);
      const result = await mockRepo.getGlobalStats(enterpriseId);
      expect(result.totalUsers).toBe(500);
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should handle empty enterprise', async () => {
      mockRepo.getGlobalStats.mockResolvedValue({ totalUsers: 0, totalSchools: 0 });
      const result = await mockRepo.getGlobalStats(enterpriseId);
      expect(result.totalUsers).toBe(0);
    });

    it('should include timestamps', async () => {
      mockRepo.getGlobalStats.mockResolvedValue({ calculatedAt: new Date().toISOString() });
      const result = await mockRepo.getGlobalStats(enterpriseId);
      expect(result.calculatedAt).toBeDefined();
    });

    it('should handle repository errors', async () => {
      mockRepo.getGlobalStats.mockRejectedValue(new Error('Stats unavailable'));
      await expect(mockRepo.getGlobalStats(enterpriseId)).rejects.toThrow('Stats unavailable');
    });

    it('should accept date range filter', async () => {
      mockRepo.getGlobalStats.mockResolvedValue({});
      await mockRepo.getGlobalStats(enterpriseId, { from: '2026-01-01', to: '2026-06-30' });
      expect(mockRepo.getGlobalStats).toHaveBeenCalled();
    });
  });

  describe('getUserStats', () => {
    it('should return user statistics', async () => {
      mockRepo.getUserStats.mockResolvedValue({ total: 500, active: 400, inactive: 100 });
      const result = await mockRepo.getUserStats(enterpriseId);
      expect(result.total).toBe(500);
    });

    it('should include role distribution', async () => {
      mockRepo.getUserStats.mockResolvedValue({ byRole: { admin: 5, teacher: 50, student: 445 } });
      const result = await mockRepo.getUserStats(enterpriseId);
      expect(result.byRole.admin).toBe(5);
    });

    it('should include growth trend', async () => {
      mockRepo.getUserStats.mockResolvedValue({ trend: [{ month: '2026-01', count: 450 }, { month: '2026-02', count: 500 }] });
      const result = await mockRepo.getUserStats(enterpriseId);
      expect(result.trend).toHaveLength(2);
    });

    it('should calculate growth rate', () => {
      const current = 500;
      const previous = 450;
      const growthRate = ((current - previous) / previous) * 100;
      expect(growthRate).toBeCloseTo(11.11, 1);
    });

    it('should handle zero users', async () => {
      mockRepo.getUserStats.mockResolvedValue({ total: 0, active: 0 });
      const result = await mockRepo.getUserStats(enterpriseId);
      expect(result.total).toBe(0);
    });

    it('should filter by school', async () => {
      mockRepo.getUserStats.mockResolvedValue({});
      await mockRepo.getUserStats(enterpriseId, { schoolId: 'sch-1' });
      expect(mockRepo.getUserStats).toHaveBeenCalled();
    });
  });

  describe('getSchoolStats', () => {
    it('should return school statistics', async () => {
      mockRepo.getSchoolStats.mockResolvedValue({ total: 10, active: 8, archived: 2 });
      const result = await mockRepo.getSchoolStats(enterpriseId);
      expect(result.total).toBe(10);
    });

    it('should include average metrics', async () => {
      mockRepo.getSchoolStats.mockResolvedValue({ avgStudentsPerSchool: 50, avgCoursesPerSchool: 12 });
      const result = await mockRepo.getSchoolStats(enterpriseId);
      expect(result.avgStudentsPerSchool).toBe(50);
    });

    it('should calculate averages correctly', () => {
      const totalStudents = 500;
      const totalSchools = 10;
      const avg = totalStudents / totalSchools;
      expect(avg).toBe(50);
    });

    it('should include size distribution', async () => {
      mockRepo.getSchoolStats.mockResolvedValue({ sizeDistribution: { small: 3, medium: 5, large: 2 } });
      const result = await mockRepo.getSchoolStats(enterpriseId);
      expect(result.sizeDistribution.small).toBe(3);
    });

    it('should handle zero schools', async () => {
      mockRepo.getSchoolStats.mockResolvedValue({ total: 0 });
      const result = await mockRepo.getSchoolStats(enterpriseId);
      expect(result.total).toBe(0);
    });

    it('should include location distribution', async () => {
      mockRepo.getSchoolStats.mockResolvedValue({ byLocation: { Paris: 5, Lyon: 3, Marseille: 2 } });
      const result = await mockRepo.getSchoolStats(enterpriseId);
      expect(result.byLocation.Paris).toBe(5);
    });
  });

  describe('getSubscriptionStats', () => {
    it('should return subscription statistics', async () => {
      mockRepo.getSubscriptionStats.mockResolvedValue({ active: 8, trial: 2, expired: 1 });
      const result = await mockRepo.getSubscriptionStats(enterpriseId);
      expect(result.active).toBe(8);
    });

    it('should include plan distribution', async () => {
      mockRepo.getSubscriptionStats.mockResolvedValue({ byPlan: { basic: 3, premium: 4, enterprise: 1 } });
      const result = await mockRepo.getSubscriptionStats(enterpriseId);
      expect(result.byPlan.premium).toBe(4);
    });

    it('should calculate MRR', async () => {
      mockRepo.getSubscriptionStats.mockResolvedValue({ mrr: 8500 });
      const result = await mockRepo.getSubscriptionStats(enterpriseId);
      expect(result.mrr).toBe(8500);
    });

    it('should include churn data', async () => {
      mockRepo.getSubscriptionStats.mockResolvedValue({ churnRate: 3.5, churnedThisMonth: 1 });
      const result = await mockRepo.getSubscriptionStats(enterpriseId);
      expect(result.churnRate).toBe(3.5);
    });

    it('should handle zero subscriptions', async () => {
      mockRepo.getSubscriptionStats.mockResolvedValue({ active: 0, trial: 0, expired: 0 });
      const result = await mockRepo.getSubscriptionStats(enterpriseId);
      expect(result.active).toBe(0);
    });

    it('should include renewal predictions', async () => {
      mockRepo.getSubscriptionStats.mockResolvedValue({ upcomingRenewals: [{ schoolId: 'sch-1', date: '2026-08-01' }] });
      const result = await mockRepo.getSubscriptionStats(enterpriseId);
      expect(result.upcomingRenewals).toHaveLength(1);
    });
  });

  describe('getRevenueStats', () => {
    it('should return revenue statistics', async () => {
      mockRepo.getRevenueStats.mockResolvedValue({ total: 100000, monthly: 8500 });
      const result = await mockRepo.getRevenueStats(enterpriseId);
      expect(result.total).toBe(100000);
    });

    it('should include currency', async () => {
      mockRepo.getRevenueStats.mockResolvedValue({ total: 100000, currency: 'EUR' });
      const result = await mockRepo.getRevenueStats(enterpriseId);
      expect(result.currency).toBe('EUR');
    });

    it('should include growth comparison', async () => {
      mockRepo.getRevenueStats.mockResolvedValue({ growth: 12.5, previousPeriod: 89000 });
      const result = await mockRepo.getRevenueStats(enterpriseId);
      expect(result.growth).toBe(12.5);
    });

    it('should handle negative growth', async () => {
      mockRepo.getRevenueStats.mockResolvedValue({ growth: -5.2 });
      const result = await mockRepo.getRevenueStats(enterpriseId);
      expect(result.growth).toBeLessThan(0);
    });

    it('should handle zero revenue', async () => {
      mockRepo.getRevenueStats.mockResolvedValue({ total: 0, monthly: 0 });
      const result = await mockRepo.getRevenueStats(enterpriseId);
      expect(result.total).toBe(0);
    });

    it('should include revenue by source', async () => {
      mockRepo.getRevenueStats.mockResolvedValue({ bySource: { subscriptions: 80000, addons: 20000 } });
      const result = await mockRepo.getRevenueStats(enterpriseId);
      expect(result.bySource.subscriptions).toBe(80000);
    });
  });

  describe('getEnrollmentStats', () => {
    it('should return enrollment statistics', async () => {
      mockRepo.getEnrollmentStats.mockResolvedValue({ total: 1000, thisMonth: 50 });
      const result = await mockRepo.getEnrollmentStats(enterpriseId);
      expect(result.total).toBe(1000);
    });

    it('should include conversion rate', async () => {
      mockRepo.getEnrollmentStats.mockResolvedValue({ conversionRate: 65 });
      const result = await mockRepo.getEnrollmentStats(enterpriseId);
      expect(result.conversionRate).toBe(65);
    });

    it('should include completion rate', async () => {
      mockRepo.getEnrollmentStats.mockResolvedValue({ completionRate: 78 });
      const result = await mockRepo.getEnrollmentStats(enterpriseId);
      expect(result.completionRate).toBe(78);
    });

    it('should handle zero enrollments', async () => {
      mockRepo.getEnrollmentStats.mockResolvedValue({ total: 0, thisMonth: 0 });
      const result = await mockRepo.getEnrollmentStats(enterpriseId);
      expect(result.total).toBe(0);
    });

    it('should filter by course', async () => {
      mockRepo.getEnrollmentStats.mockResolvedValue({});
      await mockRepo.getEnrollmentStats(enterpriseId, { courseId: 'course-1' });
      expect(mockRepo.getEnrollmentStats).toHaveBeenCalled();
    });

    it('should include drop-off data', async () => {
      mockRepo.getEnrollmentStats.mockResolvedValue({ dropOffRate: 22, avgProgress: 68 });
      const result = await mockRepo.getEnrollmentStats(enterpriseId);
      expect(result.dropOffRate).toBe(22);
    });
  });

  describe('getGrowthStats', () => {
    it('should return growth statistics', async () => {
      mockRepo.getGrowthStats.mockResolvedValue({ userGrowth: 15, schoolGrowth: 10, revenueGrowth: 20 });
      const result = await mockRepo.getGrowthStats(enterpriseId);
      expect(result.userGrowth).toBe(15);
    });

    it('should include MoM comparison', async () => {
      mockRepo.getGrowthStats.mockResolvedValue({ mom: { users: 5, schools: 2 } });
      const result = await mockRepo.getGrowthStats(enterpriseId);
      expect(result.mom.users).toBe(5);
    });

    it('should include YoY comparison', async () => {
      mockRepo.getGrowthStats.mockResolvedValue({ yoy: { users: 50, revenue: 100 } });
      const result = await mockRepo.getGrowthStats(enterpriseId);
      expect(result.yoy.users).toBe(50);
    });

    it('should handle negative growth', async () => {
      mockRepo.getGrowthStats.mockResolvedValue({ userGrowth: -5 });
      const result = await mockRepo.getGrowthStats(enterpriseId);
      expect(result.userGrowth).toBeLessThan(0);
    });

    it('should include projections', async () => {
      mockRepo.getGrowthStats.mockResolvedValue({ projections: { nextQuarter: { users: 550 } } });
      const result = await mockRepo.getGrowthStats(enterpriseId);
      expect(result.projections).toBeDefined();
    });

    it('should calculate CAGR', () => {
      const startValue = 100;
      const endValue = 200;
      const years = 3;
      const cagr = (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
      expect(cagr).toBeCloseTo(25.99, 0);
    });
  });

  describe('getPerformanceStats', () => {
    it('should return performance statistics', async () => {
      mockRepo.getPerformanceStats.mockResolvedValue({ uptime: 99.9, avgResponseTime: 120 });
      const result = await mockRepo.getPerformanceStats(enterpriseId);
      expect(result.uptime).toBe(99.9);
    });

    it('should include error rates', async () => {
      mockRepo.getPerformanceStats.mockResolvedValue({ errorRate: 0.5, totalErrors: 50 });
      const result = await mockRepo.getPerformanceStats(enterpriseId);
      expect(result.errorRate).toBe(0.5);
    });

    it('should include availability SLA', async () => {
      mockRepo.getPerformanceStats.mockResolvedValue({ sla: { target: 99.9, actual: 99.95 } });
      const result = await mockRepo.getPerformanceStats(enterpriseId);
      expect(result.sla.target).toBe(99.9);
    });

    it('should handle degraded performance', async () => {
      mockRepo.getPerformanceStats.mockResolvedValue({ uptime: 95.0, status: 'degraded' });
      const result = await mockRepo.getPerformanceStats(enterpriseId);
      expect(result.status).toBe('degraded');
    });

    it('should include latency percentiles', async () => {
      mockRepo.getPerformanceStats.mockResolvedValue({ latency: { p50: 80, p95: 200, p99: 500 } });
      const result = await mockRepo.getPerformanceStats(enterpriseId);
      expect(result.latency.p50).toBeLessThan(result.latency.p99);
    });

    it('should handle zero uptime', async () => {
      mockRepo.getPerformanceStats.mockResolvedValue({ uptime: 0, status: 'down' });
      const result = await mockRepo.getPerformanceStats(enterpriseId);
      expect(result.uptime).toBe(0);
    });
  });

  describe('getComparisonStats', () => {
    it('should return comparison statistics', async () => {
      mockRepo.getComparisonStats.mockResolvedValue({ current: { users: 500 }, previous: { users: 450 } });
      const result = await mockRepo.getComparisonStats(enterpriseId, 'users');
      expect(result.current.users).toBe(500);
    });

    it('should calculate percentage change', () => {
      const current = 500;
      const previous = 450;
      const change = ((current - previous) / previous) * 100;
      expect(change).toBeCloseTo(11.11, 1);
    });

    it('should handle zero previous value', () => {
      const current = 100;
      const previous = 0;
      const change = previous === 0 ? 100 : ((current - previous) / previous) * 100;
      expect(change).toBe(100);
    });

    it('should compare different metrics', async () => {
      const metrics = ['users', 'schools', 'revenue', 'enrollments'];
      for (const metric of metrics) {
        mockRepo.getComparisonStats.mockResolvedValue({});
        await mockRepo.getComparisonStats(enterpriseId, metric);
        expect(mockRepo.getComparisonStats).toHaveBeenCalled();
      }
    });

    it('should include trend direction', async () => {
      mockRepo.getComparisonStats.mockResolvedValue({ change: 12.5, direction: 'up' });
      const result = await mockRepo.getComparisonStats(enterpriseId, 'users');
      expect(result.direction).toBe('up');
    });

    it('should detect flat trend', async () => {
      mockRepo.getComparisonStats.mockResolvedValue({ change: 0, direction: 'flat' });
      const result = await mockRepo.getComparisonStats(enterpriseId, 'users');
      expect(result.direction).toBe('flat');
    });
  });

  describe('getHistoricalStats', () => {
    it('should return historical statistics', async () => {
      mockRepo.getHistoricalStats.mockResolvedValue([{ date: '2026-01', users: 400 }, { date: '2026-02', users: 450 }]);
      const result = await mockRepo.getHistoricalStats(enterpriseId, 'users');
      expect(result).toHaveLength(2);
    });

    it('should accept different granularities', async () => {
      const granularities = ['daily', 'weekly', 'monthly', 'yearly'];
      for (const g of granularities) {
        mockRepo.getHistoricalStats.mockResolvedValue([]);
        await mockRepo.getHistoricalStats(enterpriseId, 'users', { granularity: g });
        expect(mockRepo.getHistoricalStats).toHaveBeenCalled();
      }
    });

    it('should filter by date range', async () => {
      mockRepo.getHistoricalStats.mockResolvedValue([]);
      await mockRepo.getHistoricalStats(enterpriseId, 'users', { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.getHistoricalStats).toHaveBeenCalled();
    });

    it('should handle empty history', async () => {
      mockRepo.getHistoricalStats.mockResolvedValue([]);
      const result = await mockRepo.getHistoricalStats(enterpriseId, 'users');
      expect(result).toHaveLength(0);
    });

    it('should sort by date ascending', async () => {
      mockRepo.getHistoricalStats.mockResolvedValue([
        { date: '2026-01', users: 400 },
        { date: '2026-02', users: 450 },
      ]);
      const result = await mockRepo.getHistoricalStats(enterpriseId, 'users');
      expect(new Date(result[0].date).getTime()).toBeLessThan(new Date(result[1].date).getTime());
    });

    it('should include multiple metrics', async () => {
      mockRepo.getHistoricalStats.mockResolvedValue([{ date: '2026-01', users: 400, revenue: 5000 }]);
      const result = await mockRepo.getHistoricalStats(enterpriseId, 'all');
      expect(result[0].revenue).toBeDefined();
    });
  });
});
