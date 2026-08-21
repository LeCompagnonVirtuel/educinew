import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAnalyticsRepository } from '../../src/features/analytics/repositories/analytics.repository';

const createMockSupabase = () => ({
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  gte: vi.fn().mockReturnThis(),
  lte: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  single: vi.fn(),
  or: vi.fn().mockReturnThis(),
  cs: vi.fn().mockReturnThis(),
});

describe('AnalyticsRepository', () => {
  let supabase: ReturnType<typeof createMockSupabase>;
  let repository: ReturnType<typeof createAnalyticsRepository>;

  beforeEach(() => {
    vi.clearAllMocks();
    supabase = createMockSupabase();
    repository = createAnalyticsRepository(supabase as any);
  });

  describe('getExecutiveDashboard', () => {
    it('should return executive dashboard data', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      const result = await repository.getExecutiveDashboard();
      expect(result).toHaveProperty('revenue');
      expect(result).toHaveProperty('financial');
      expect(result).toHaveProperty('academic');
    });

    it('should accept date range parameters', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      const result = await repository.getExecutiveDashboard('2025-01-01', '2025-12-31');
      expect(result).toHaveProperty('generatedAt');
    });
  });

  describe('getRevenueKPIs', () => {
    it('should return revenue KPIs', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      const result = await repository.getRevenueKPIs();
      expect(result).toHaveProperty('totalRevenue');
      expect(result).toHaveProperty('monthlyRevenue');
    });
  });

  describe('getFinancialKPIs', () => {
    it('should return financial KPIs', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      const result = await repository.getFinancialKPIs();
      expect(result).toHaveProperty('totalExpenses');
      expect(result).toHaveProperty('profit');
    });
  });

  describe('getAcademicKPIs', () => {
    it('should return academic KPIs', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      const result = await repository.getAcademicKPIs();
      expect(result).toHaveProperty('totalSchools');
      expect(result).toHaveProperty('totalStudents');
    });
  });

  describe('getHrKPIs', () => {
    it('should return HR KPIs', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      const result = await repository.getHrKPIs();
      expect(result).toHaveProperty('totalEmployees');
      expect(result).toHaveProperty('activeEmployees');
    });
  });

  describe('getStudentKPIs', () => {
    it('should return student KPIs', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      const result = await repository.getStudentKPIs();
      expect(result).toHaveProperty('totalEnrollments');
      expect(result).toHaveProperty('newEnrollments');
    });
  });

  describe('getTeacherKPIs', () => {
    it('should return teacher KPIs', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      const result = await repository.getTeacherKPIs();
      expect(result).toHaveProperty('totalTeachers');
      expect(result).toHaveProperty('activeTeachers');
    });
  });

  describe('getParentKPIs', () => {
    it('should return parent KPIs', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      const result = await repository.getParentKPIs();
      expect(result).toHaveProperty('totalParents');
    });
  });

  describe('getSystemKPIs', () => {
    it('should return system KPIs', async () => {
      const result = await repository.getSystemKPIs();
      expect(result).toHaveProperty('uptimePercent');
      expect(result).toHaveProperty('storageUsedMb');
    });
  });

  describe('getAcademicAnalytics', () => {
    it('should return academic analytics', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      const result = await repository.getAcademicAnalytics('sch-1', 'monthly');
      expect(result).toHaveProperty('successRate');
      expect(result).toHaveProperty('gradeEvolution');
    });
  });

  describe('getSuccessRate', () => {
    it('should return success rate data', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      const result = await repository.getSuccessRate('sch-1', 'monthly');
      expect(result).toHaveProperty('overall');
    });
  });

  describe('getFinancialAnalytics', () => {
    it('should return financial analytics', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      const result = await repository.getFinancialAnalytics('sch-1', 'monthly');
      expect(result).toHaveProperty('revenue');
      expect(result).toHaveProperty('expenses');
    });
  });

  describe('getRevenueAnalytics', () => {
    it('should return revenue analytics', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      const result = await repository.getRevenueAnalytics('sch-1', 'monthly');
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('growth');
    });
  });

  describe('getHrAnalytics', () => {
    it('should return HR analytics', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      const result = await repository.getHrAnalytics('sch-1', 'monthly');
      expect(result).toHaveProperty('workforce');
      expect(result).toHaveProperty('turnover');
    });
  });

  describe('getStudentAnalytics', () => {
    it('should return student analytics', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      const result = await repository.getStudentAnalytics('sch-1', 'monthly');
      expect(result).toHaveProperty('enrollment');
      expect(result).toHaveProperty('academic');
    });
  });

  describe('getTeacherAnalytics', () => {
    it('should return teacher analytics', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      const result = await repository.getTeacherAnalytics('sch-1', 'monthly');
      expect(result).toHaveProperty('performance');
      expect(result).toHaveProperty('attendance');
    });
  });

  describe('getParentAnalytics', () => {
    it('should return parent analytics', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      const result = await repository.getParentAnalytics('sch-1', 'monthly');
      expect(result).toHaveProperty('payments');
      expect(result).toHaveProperty('engagement');
    });
  });

  describe('runPredictiveModel', () => {
    it('should run predictive model', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      const result = await repository.runPredictiveModel('dropout', 'sch-1');
      expect(result).toHaveProperty('model');
      expect(result).toHaveProperty('predictions');
    });
  });

  describe('createReport', () => {
    it('should create a report', async () => {
      supabase.single.mockResolvedValue({ data: { id: 'rpt-1', name: 'Test' }, error: null });
      const result = await repository.createReport({ name: 'Test' });
      expect(result).toHaveProperty('id');
    });

    it('should throw error on failure', async () => {
      supabase.single.mockResolvedValue({ data: null, error: new Error('Insert failed') });
      await expect(repository.createReport({})).rejects.toThrow('Insert failed');
    });
  });

  describe('updateReport', () => {
    it('should update a report', async () => {
      supabase.single.mockResolvedValue({ data: { id: 'rpt-1', name: 'Updated' }, error: null });
      const result = await repository.updateReport('rpt-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });
  });

  describe('deleteReport', () => {
    it('should delete a report', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      await expect(repository.deleteReport('rpt-1')).resolves.toBeUndefined();
    });
  });

  describe('getReport', () => {
    it('should return a report', async () => {
      supabase.single.mockResolvedValue({ data: { id: 'rpt-1' }, error: null });
      const result = await repository.getReport('rpt-1');
      expect(result).toHaveProperty('id');
    });

    it('should return null for non-existent report', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      const result = await repository.getReport('non-existent');
      expect(result).toBeNull();
    });
  });

  describe('listReports', () => {
    it('should list reports', async () => {
      supabase.single.mockResolvedValue({ data: [{ id: 'rpt-1' }], error: null });
      const result = await repository.listReports();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('createDashboard', () => {
    it('should create a dashboard', async () => {
      supabase.single.mockResolvedValue({ data: { id: 'dash-1', name: 'Test' }, error: null });
      const result = await repository.createDashboard({ name: 'Test' });
      expect(result).toHaveProperty('id');
    });
  });

  describe('getDashboard', () => {
    it('should return a dashboard', async () => {
      supabase.single.mockResolvedValue({ data: { id: 'dash-1' }, error: null });
      const result = await repository.getDashboard('dash-1');
      expect(result).toHaveProperty('id');
    });
  });

  describe('shareDashboard', () => {
    it('should share a dashboard', async () => {
      supabase.single
        .mockResolvedValueOnce({ data: { shared_with: [] }, error: null })
        .mockResolvedValueOnce({ data: { id: 'dash-1', is_shared: true }, error: null });
      const result = await repository.shareDashboard('dash-1', ['user-2']);
      expect(result).toHaveProperty('id');
    });
  });

  describe('addWidget', () => {
    it('should add a widget', async () => {
      supabase.single
        .mockResolvedValueOnce({ data: { widgets: [] }, error: null })
        .mockResolvedValueOnce({ data: null, error: null });
      const result = await repository.addWidget('dash-1', { type: 'kpi', title: 'Test' });
      expect(result).toHaveProperty('id');
    });
  });

  describe('getChartData', () => {
    it('should return chart data', async () => {
      const result = await repository.getChartData('students', 'bar');
      expect(result).toHaveProperty('labels');
      expect(result).toHaveProperty('datasets');
    });
  });

  describe('exportData', () => {
    it('should export data', async () => {
      const result = await repository.exportData('pdf', 'students');
      expect(result).toHaveProperty('format');
      expect(result).toHaveProperty('exportedAt');
    });
  });

  describe('importData', () => {
    it('should import data', async () => {
      const result = await repository.importData('csv', 'students', {});
      expect(result).toHaveProperty('imported');
      expect(result).toHaveProperty('errors');
    });
  });

  describe('getFactTable', () => {
    it('should return fact table data', async () => {
      supabase.single.mockResolvedValue({ data: [], error: null });
      const result = await repository.getFactTable();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getDimension', () => {
    it('should return dimension data', async () => {
      supabase.single.mockResolvedValue({ data: [], error: null });
      const result = await repository.getDimension('schools');
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('logAnalyticsEvent', () => {
    it('should log an event', async () => {
      supabase.single.mockResolvedValue({ data: null, error: null });
      await expect(repository.logAnalyticsEvent('sch-1', 'page_view', { page: '/test' })).resolves.toBeUndefined();
    });
  });

  describe('getAnalyticsEvents', () => {
    it('should return analytics events', async () => {
      supabase.single.mockResolvedValue({ data: [], error: null });
      const result = await repository.getAnalyticsEvents('sch-1');
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
