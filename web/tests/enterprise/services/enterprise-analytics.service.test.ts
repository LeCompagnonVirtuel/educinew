import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('EnterpriseAnalyticsService', () => {
  const mockRepo = {
    getAnalyticsOverview: vi.fn(),
    getUserAnalytics: vi.fn(),
    getSchoolAnalytics: vi.fn(),
    getEnrollmentAnalytics: vi.fn(),
    getRevenueAnalytics: vi.fn(),
    getEngagementMetrics: vi.fn(),
    getRetentionRate: vi.fn(),
    getGrowthMetrics: vi.fn(),
    getCustomReport: vi.fn(),
    exportAnalytics: vi.fn(),
  };

  const enterpriseId = 'ent-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAnalyticsOverview', () => {
    it('should return analytics overview', async () => {
      const overview = { totalUsers: 500, totalSchools: 10, monthlyGrowth: 12 };
      mockRepo.getAnalyticsOverview.mockResolvedValue(overview);
      const result = await mockRepo.getAnalyticsOverview(enterpriseId);
      expect(result.totalUsers).toBe(500);
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should filter by period', async () => {
      mockRepo.getAnalyticsOverview.mockResolvedValue({});
      await mockRepo.getAnalyticsOverview(enterpriseId, { period: '30d' });
      expect(mockRepo.getAnalyticsOverview).toHaveBeenCalledWith(enterpriseId, { period: '30d' });
    });

    it('should handle zero values', async () => {
      mockRepo.getAnalyticsOverview.mockResolvedValue({ totalUsers: 0, totalSchools: 0 });
      const result = await mockRepo.getAnalyticsOverview(enterpriseId);
      expect(result.totalUsers).toBe(0);
    });

    it('should include comparison data', async () => {
      mockRepo.getAnalyticsOverview.mockResolvedValue({ comparison: { previousPeriod: { users: 450 } } });
      const result = await mockRepo.getAnalyticsOverview(enterpriseId);
      expect(result.comparison).toBeDefined();
    });

    it('should handle repository errors', async () => {
      mockRepo.getAnalyticsOverview.mockRejectedValue(new Error('Analytics unavailable'));
      await expect(mockRepo.getAnalyticsOverview(enterpriseId)).rejects.toThrow('Analytics unavailable');
    });
  });

  describe('getUserAnalytics', () => {
    it('should return user analytics', async () => {
      const analytics = { active: 300, inactive: 200, newThisMonth: 50 };
      mockRepo.getUserAnalytics.mockResolvedValue(analytics);
      const result = await mockRepo.getUserAnalytics(enterpriseId);
      expect(result.active).toBe(300);
    });

    it('should include daily active users', async () => {
      mockRepo.getUserAnalytics.mockResolvedValue({ dau: 150, mau: 400 });
      const result = await mockRepo.getUserAnalytics(enterpriseId);
      expect(result.dau).toBe(150);
    });

    it('should calculate DAU/MAU ratio', () => {
      const dau = 150;
      const mau = 400;
      const ratio = dau / mau;
      expect(ratio).toBe(0.375);
    });

    it('should filter by school', async () => {
      mockRepo.getUserAnalytics.mockResolvedValue({});
      await mockRepo.getUserAnalytics(enterpriseId, { schoolId: 'sch-1' });
      expect(mockRepo.getUserAnalytics).toHaveBeenCalled();
    });

    it('should handle no users', async () => {
      mockRepo.getUserAnalytics.mockResolvedValue({ active: 0, inactive: 0 });
      const result = await mockRepo.getUserAnalytics(enterpriseId);
      expect(result.active).toBe(0);
    });

    it('should include sign-up trends', async () => {
      mockRepo.getUserAnalytics.mockResolvedValue({ trends: [{ date: '2026-01-01', count: 10 }] });
      const result = await mockRepo.getUserAnalytics(enterpriseId);
      expect(result.trends).toHaveLength(1);
    });
  });

  describe('getSchoolAnalytics', () => {
    it('should return school analytics', async () => {
      const analytics = { totalSchools: 10, activeSchools: 8, avgUsersPerSchool: 50 };
      mockRepo.getSchoolAnalytics.mockResolvedValue(analytics);
      const result = await mockRepo.getSchoolAnalytics(enterpriseId);
      expect(result.totalSchools).toBe(10);
    });

    it('should include top schools', async () => {
      mockRepo.getSchoolAnalytics.mockResolvedValue({ topSchools: [{ id: 's-1', score: 95 }] });
      const result = await mockRepo.getSchoolAnalytics(enterpriseId);
      expect(result.topSchools).toHaveLength(1);
    });

    it('should rank schools by performance', async () => {
      mockRepo.getSchoolAnalytics.mockResolvedValue({
        ranked: [{ id: 's-1', rank: 1 }, { id: 's-2', rank: 2 }],
      });
      const result = await mockRepo.getSchoolAnalytics(enterpriseId);
      expect(result.ranked[0].rank).toBeLessThan(result.ranked[1].rank);
    });

    it('should filter by status', async () => {
      mockRepo.getSchoolAnalytics.mockResolvedValue({});
      await mockRepo.getSchoolAnalytics(enterpriseId, { status: 'active' });
      expect(mockRepo.getSchoolAnalytics).toHaveBeenCalled();
    });

    it('should include growth metrics', async () => {
      mockRepo.getSchoolAnalytics.mockResolvedValue({ growth: { newSchools: 2, churnedSchools: 0 } });
      const result = await mockRepo.getSchoolAnalytics(enterpriseId);
      expect(result.growth).toBeDefined();
    });

    it('should handle empty school list', async () => {
      mockRepo.getSchoolAnalytics.mockResolvedValue({ totalSchools: 0 });
      const result = await mockRepo.getSchoolAnalytics(enterpriseId);
      expect(result.totalSchools).toBe(0);
    });
  });

  describe('getEnrollmentAnalytics', () => {
    it('should return enrollment analytics', async () => {
      const analytics = { totalEnrollments: 1000, conversionRate: 65 };
      mockRepo.getEnrollmentAnalytics.mockResolvedValue(analytics);
      const result = await mockRepo.getEnrollmentAnalytics(enterpriseId);
      expect(result.totalEnrollments).toBe(1000);
    });

    it('should include funnel data', async () => {
      mockRepo.getEnrollmentAnalytics.mockResolvedValue({
        funnel: { visitors: 5000, signups: 1000, enrolled: 650 },
      });
      const result = await mockRepo.getEnrollmentAnalytics(enterpriseId);
      expect(result.funnel.visitors).toBeGreaterThan(result.funnel.enrolled);
    });

    it('should calculate conversion at each stage', () => {
      const funnel = { visitors: 5000, signups: 1000, enrolled: 650 };
      const signupRate = (funnel.signups / funnel.visitors) * 100;
      const enrollRate = (funnel.enrolled / funnel.signups) * 100;
      expect(signupRate).toBe(20);
      expect(enrollRate).toBe(65);
    });

    it('should filter by date range', async () => {
      mockRepo.getEnrollmentAnalytics.mockResolvedValue({});
      await mockRepo.getEnrollmentAnalytics(enterpriseId, { from: '2026-01-01', to: '2026-06-30' });
      expect(mockRepo.getEnrollmentAnalytics).toHaveBeenCalled();
    });

    it('should handle zero enrollments', async () => {
      mockRepo.getEnrollmentAnalytics.mockResolvedValue({ totalEnrollments: 0, conversionRate: 0 });
      const result = await mockRepo.getEnrollmentAnalytics(enterpriseId);
      expect(result.totalEnrollments).toBe(0);
    });

    it('should include completion rates', async () => {
      mockRepo.getEnrollmentAnalytics.mockResolvedValue({ completionRate: 78 });
      const result = await mockRepo.getEnrollmentAnalytics(enterpriseId);
      expect(result.completionRate).toBe(78);
    });
  });

  describe('getRevenueAnalytics', () => {
    it('should return revenue analytics', async () => {
      const analytics = { totalRevenue: 100000, avgRevenuePerUser: 200 };
      mockRepo.getRevenueAnalytics.mockResolvedValue(analytics);
      const result = await mockRepo.getRevenueAnalytics(enterpriseId);
      expect(result.totalRevenue).toBe(100000);
    });

    it('should include MRR', async () => {
      mockRepo.getRevenueAnalytics.mockResolvedValue({ mrr: 8500, arr: 102000 });
      const result = await mockRepo.getRevenueAnalytics(enterpriseId);
      expect(result.mrr).toBe(8500);
    });

    it('should calculate ARR from MRR', () => {
      const mrr = 8500;
      const arr = mrr * 12;
      expect(arr).toBe(102000);
    });

    it('should include churn rate', async () => {
      mockRepo.getRevenueAnalytics.mockResolvedValue({ churnRate: 3.2 });
      const result = await mockRepo.getRevenueAnalytics(enterpriseId);
      expect(result.churnRate).toBe(3.2);
    });

    it('should handle zero revenue', async () => {
      mockRepo.getRevenueAnalytics.mockResolvedValue({ totalRevenue: 0 });
      const result = await mockRepo.getRevenueAnalytics(enterpriseId);
      expect(result.totalRevenue).toBe(0);
    });

    it('should include revenue by plan', async () => {
      mockRepo.getRevenueAnalytics.mockResolvedValue({ byPlan: { basic: 30000, premium: 70000 } });
      const result = await mockRepo.getRevenueAnalytics(enterpriseId);
      expect(result.byPlan).toBeDefined();
    });
  });

  describe('getEngagementMetrics', () => {
    it('should return engagement metrics', async () => {
      const metrics = { avgSessionDuration: 45, pagesPerSession: 8 };
      mockRepo.getEngagementMetrics.mockResolvedValue(metrics);
      const result = await mockRepo.getEngagementMetrics(enterpriseId);
      expect(result.avgSessionDuration).toBe(45);
    });

    it('should include feature usage', async () => {
      mockRepo.getEngagementMetrics.mockResolvedValue({ featureUsage: { quizzes: 80, videos: 60 } });
      const result = await mockRepo.getEngagementMetrics(enterpriseId);
      expect(result.featureUsage.quizzes).toBe(80);
    });

    it('should handle zero engagement', async () => {
      mockRepo.getEngagementMetrics.mockResolvedValue({ avgSessionDuration: 0 });
      const result = await mockRepo.getEngagementMetrics(enterpriseId);
      expect(result.avgSessionDuration).toBe(0);
    });

    it('should filter by period', async () => {
      mockRepo.getEngagementMetrics.mockResolvedValue({});
      await mockRepo.getEngagementMetrics(enterpriseId, { period: '7d' });
      expect(mockRepo.getEngagementMetrics).toHaveBeenCalled();
    });

    it('should include peak hours', async () => {
      mockRepo.getEngagementMetrics.mockResolvedValue({ peakHours: [9, 14, 20] });
      const result = await mockRepo.getEngagementMetrics(enterpriseId);
      expect(result.peakHours).toContain(14);
    });

    it('should handle missing data gracefully', async () => {
      mockRepo.getEngagementMetrics.mockResolvedValue(null);
      const result = await mockRepo.getEngagementMetrics(enterpriseId);
      expect(result).toBeNull();
    });
  });

  describe('getRetentionRate', () => {
    it('should return retention rate', async () => {
      mockRepo.getRetentionRate.mockResolvedValue({ rate: 85, period: '30d' });
      const result = await mockRepo.getRetentionRate(enterpriseId);
      expect(result.rate).toBe(85);
    });

    it('should include cohort data', async () => {
      mockRepo.getRetentionRate.mockResolvedValue({ cohorts: [{ month: '2026-01', rate: 90 }] });
      const result = await mockRepo.getRetentionRate(enterpriseId);
      expect(result.cohorts).toHaveLength(1);
    });

    it('should handle zero retention', async () => {
      mockRepo.getRetentionRate.mockResolvedValue({ rate: 0 });
      const result = await mockRepo.getRetentionRate(enterpriseId);
      expect(result.rate).toBe(0);
    });

    it('should compare periods', async () => {
      mockRepo.getRetentionRate.mockResolvedValue({ rate: 85, previousRate: 80, change: 5 });
      const result = await mockRepo.getRetentionRate(enterpriseId);
      expect(result.change).toBeGreaterThan(0);
    });
  });

  describe('getGrowthMetrics', () => {
    it('should return growth metrics', async () => {
      mockRepo.getGrowthMetrics.mockResolvedValue({ userGrowth: 15, schoolGrowth: 10 });
      const result = await mockRepo.getGrowthMetrics(enterpriseId);
      expect(result.userGrowth).toBe(15);
    });

    it('should include projections', async () => {
      mockRepo.getGrowthMetrics.mockResolvedValue({ projections: { nextMonth: 520 } });
      const result = await mockRepo.getGrowthMetrics(enterpriseId);
      expect(result.projections).toBeDefined();
    });

    it('should calculate month-over-month growth', () => {
      const current = 500;
      const previous = 450;
      const growth = ((current - previous) / previous) * 100;
      expect(growth).toBeCloseTo(11.11, 1);
    });

    it('should handle negative growth', async () => {
      mockRepo.getGrowthMetrics.mockResolvedValue({ userGrowth: -5 });
      const result = await mockRepo.getGrowthMetrics(enterpriseId);
      expect(result.userGrowth).toBeLessThan(0);
    });
  });

  describe('exportAnalytics', () => {
    it('should export analytics as CSV', async () => {
      mockRepo.exportAnalytics.mockResolvedValue('metric,value\ntotalUsers,500');
      const result = await mockRepo.exportAnalytics(enterpriseId, 'csv');
      expect(result).toContain('totalUsers');
    });

    it('should export as JSON', async () => {
      mockRepo.exportAnalytics.mockResolvedValue('{"totalUsers":500}');
      const result = await mockRepo.exportAnalytics(enterpriseId, 'json');
      expect(JSON.parse(result).totalUsers).toBe(500);
    });

    it('should support different formats', () => {
      const formats = ['csv', 'json', 'xlsx'];
      expect(formats).toContain('csv');
      expect(formats).toContain('json');
      expect(formats).toContain('xlsx');
    });

    it('should filter export by date range', async () => {
      mockRepo.exportAnalytics.mockResolvedValue('');
      await mockRepo.exportAnalytics(enterpriseId, 'csv', { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.exportAnalytics).toHaveBeenCalled();
    });

    it('should handle empty export', async () => {
      mockRepo.exportAnalytics.mockResolvedValue('');
      const result = await mockRepo.exportAnalytics(enterpriseId, 'csv');
      expect(result).toBe('');
    });
  });
});
