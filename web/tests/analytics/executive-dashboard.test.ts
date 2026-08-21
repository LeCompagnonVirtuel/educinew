import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createExecutiveDashboardService } from '../../src/features/analytics/services/executive-dashboard.service';

const mockRepository = {
  getExecutiveDashboard: vi.fn(),
  getRevenueKPIs: vi.fn(),
  getFinancialKPIs: vi.fn(),
  getAcademicKPIs: vi.fn(),
  getHrKPIs: vi.fn(),
  getStudentKPIs: vi.fn(),
  getTeacherKPIs: vi.fn(),
  getParentKPIs: vi.fn(),
  getSystemKPIs: vi.fn(),
};

describe('ExecutiveDashboardService', () => {
  let service: ReturnType<typeof createExecutiveDashboardService>;

  beforeEach(() => {
    vi.clearAllMocks();
    service = createExecutiveDashboardService(mockRepository as any);
  });

  it('should call repository.getExecutiveDashboard with filters', async () => {
    const filters = { dateFrom: '2025-01-01', dateTo: '2025-12-31' };
    mockRepository.getExecutiveDashboard.mockResolvedValue({ revenue: {}, financial: {} });
    const result = await service.getExecutiveDashboard(filters);
    expect(mockRepository.getExecutiveDashboard).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ revenue: {}, financial: {} });
  });

  it('should call repository.getExecutiveDashboard without filters', async () => {
    mockRepository.getExecutiveDashboard.mockResolvedValue({});
    await service.getExecutiveDashboard();
    expect(mockRepository.getExecutiveDashboard).toHaveBeenCalledWith(undefined);
  });

  it('should propagate errors from getExecutiveDashboard', async () => {
    mockRepository.getExecutiveDashboard.mockRejectedValue(new Error('DB error'));
    await expect(service.getExecutiveDashboard()).rejects.toThrow('DB error');
  });

  it('should call getRevenueKPIs with filters', async () => {
    const filters = { dateFrom: '2025-06-01' };
    mockRepository.getRevenueKPIs.mockResolvedValue({ totalRevenue: 50000 });
    const result = await service.getRevenueKPIs(filters);
    expect(mockRepository.getRevenueKPIs).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ totalRevenue: 50000 });
  });

  it('should call getRevenueKPIs without filters', async () => {
    mockRepository.getRevenueKPIs.mockResolvedValue({ totalRevenue: 0 });
    await service.getRevenueKPIs();
    expect(mockRepository.getRevenueKPIs).toHaveBeenCalledWith(undefined);
  });

  it('should propagate errors from getRevenueKPIs', async () => {
    mockRepository.getRevenueKPIs.mockRejectedValue(new Error('Revenue error'));
    await expect(service.getRevenueKPIs()).rejects.toThrow('Revenue error');
  });

  it('should call getFinancialKPIs with filters', async () => {
    const filters = { period: 'monthly' };
    mockRepository.getFinancialKPIs.mockResolvedValue({ totalExpenses: 30000 });
    const result = await service.getFinancialKPIs(filters);
    expect(mockRepository.getFinancialKPIs).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ totalExpenses: 30000 });
  });

  it('should propagate errors from getFinancialKPIs', async () => {
    mockRepository.getFinancialKPIs.mockRejectedValue(new Error('Financial error'));
    await expect(service.getFinancialKPIs()).rejects.toThrow('Financial error');
  });

  it('should call getAcademicKPIs with filters', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.getAcademicKPIs.mockResolvedValue({ avgSuccessRate: 85.5 });
    const result = await service.getAcademicKPIs(filters);
    expect(mockRepository.getAcademicKPIs).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ avgSuccessRate: 85.5 });
  });

  it('should propagate errors from getAcademicKPIs', async () => {
    mockRepository.getAcademicKPIs.mockRejectedValue(new Error('Academic error'));
    await expect(service.getAcademicKPIs()).rejects.toThrow('Academic error');
  });

  it('should call getHrKPIs with filters', async () => {
    const filters = { dateFrom: '2025-01-01' };
    mockRepository.getHrKPIs.mockResolvedValue({ totalEmployees: 120 });
    const result = await service.getHrKPIs(filters);
    expect(mockRepository.getHrKPIs).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ totalEmployees: 120 });
  });

  it('should propagate errors from getHrKPIs', async () => {
    mockRepository.getHrKPIs.mockRejectedValue(new Error('HR error'));
    await expect(service.getHrKPIs()).rejects.toThrow('HR error');
  });

  it('should call getStudentKPIs with filters', async () => {
    const filters = { schoolId: 'sch-2' };
    mockRepository.getStudentKPIs.mockResolvedValue({ totalEnrollments: 500 });
    const result = await service.getStudentKPIs(filters);
    expect(mockRepository.getStudentKPIs).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ totalEnrollments: 500 });
  });

  it('should propagate errors from getStudentKPIs', async () => {
    mockRepository.getStudentKPIs.mockRejectedValue(new Error('Student error'));
    await expect(service.getStudentKPIs()).rejects.toThrow('Student error');
  });

  it('should call getTeacherKPIs with filters', async () => {
    const filters = { dateTo: '2025-12-31' };
    mockRepository.getTeacherKPIs.mockResolvedValue({ totalTeachers: 45 });
    const result = await service.getTeacherKPIs(filters);
    expect(mockRepository.getTeacherKPIs).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ totalTeachers: 45 });
  });

  it('should propagate errors from getTeacherKPIs', async () => {
    mockRepository.getTeacherKPIs.mockRejectedValue(new Error('Teacher error'));
    await expect(service.getTeacherKPIs()).rejects.toThrow('Teacher error');
  });

  it('should call getParentKPIs with filters', async () => {
    const filters = { dateFrom: '2025-01-01', dateTo: '2025-06-30' };
    mockRepository.getParentKPIs.mockResolvedValue({ totalParents: 400 });
    const result = await service.getParentKPIs(filters);
    expect(mockRepository.getParentKPIs).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ totalParents: 400 });
  });

  it('should propagate errors from getParentKPIs', async () => {
    mockRepository.getParentKPIs.mockRejectedValue(new Error('Parent error'));
    await expect(service.getParentKPIs()).rejects.toThrow('Parent error');
  });

  it('should call getSystemKPIs with filters', async () => {
    const filters = { dateFrom: '2025-01-01' };
    mockRepository.getSystemKPIs.mockResolvedValue({ uptimePercent: 99.9 });
    const result = await service.getSystemKPIs(filters);
    expect(mockRepository.getSystemKPIs).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ uptimePercent: 99.9 });
  });

  it('should propagate errors from getSystemKPIs', async () => {
    mockRepository.getSystemKPIs.mockRejectedValue(new Error('System error'));
    await expect(service.getSystemKPIs()).rejects.toThrow('System error');
  });

  it('should call all KPI methods in sequence for full dashboard', async () => {
    mockRepository.getExecutiveDashboard.mockResolvedValue({
      revenue: { totalRevenue: 100000 },
      financial: { totalExpenses: 60000 },
      academic: { avgSuccessRate: 88 },
      hr: { totalEmployees: 150 },
      student: { totalEnrollments: 600 },
      teacher: { totalTeachers: 50 },
      parent: { totalParents: 450 },
      system: { uptimePercent: 99.9 },
    });
    const result = await service.getExecutiveDashboard({ dateFrom: '2025-01-01' });
    expect(result).toHaveProperty('revenue');
    expect(result).toHaveProperty('financial');
    expect(result).toHaveProperty('academic');
    expect(result).toHaveProperty('hr');
    expect(result).toHaveProperty('student');
    expect(result).toHaveProperty('teacher');
    expect(result).toHaveProperty('parent');
    expect(result).toHaveProperty('system');
  });

  it('should handle empty filters object', async () => {
    mockRepository.getExecutiveDashboard.mockResolvedValue({});
    await service.getExecutiveDashboard({});
    expect(mockRepository.getExecutiveDashboard).toHaveBeenCalledWith({});
  });

  it('should return structured KPI data types', async () => {
    mockRepository.getRevenueKPIs.mockResolvedValue({ totalRevenue: 50000, monthlyRevenue: 4500 });
    const result = await service.getRevenueKPIs();
    expect(typeof result.totalRevenue).toBe('number');
    expect(typeof result.monthlyRevenue).toBe('number');
  });

  it('should get executive dashboard with date range', async () => {
    mockRepository.getExecutiveDashboard.mockResolvedValue({ revenue: { totalRevenue: 75000 } });
    const result = await service.getExecutiveDashboard({ dateFrom: '2025-07-01', dateTo: '2025-09-30' });
    expect(result.revenue.totalRevenue).toBe(75000);
  });

  it('should get revenue KPIs with growth rate', async () => {
    mockRepository.getRevenueKPIs.mockResolvedValue({ totalRevenue: 60000, growthRate: 12.5 });
    const result = await service.getRevenueKPIs();
    expect(result.growthRate).toBe(12.5);
  });

  it('should get revenue KPIs with target comparison', async () => {
    mockRepository.getRevenueKPIs.mockResolvedValue({ totalRevenue: 55000, target: 50000, achievement: 110 });
    const result = await service.getRevenueKPIs();
    expect(result.achievement).toBe(110);
  });

  it('should get financial KPIs with budget utilization', async () => {
    mockRepository.getFinancialKPIs.mockResolvedValue({ totalExpenses: 40000, budgetUtilization: 85.5 });
    const result = await service.getFinancialKPIs();
    expect(result.budgetUtilization).toBe(85.5);
  });

  it('should get financial KPIs with cost per student', async () => {
    mockRepository.getFinancialKPIs.mockResolvedValue({ costPerStudent: 2500, totalStudents: 500 });
    const result = await service.getFinancialKPIs();
    expect(result.costPerStudent).toBe(2500);
  });

  it('should get academic KPIs with pass rate', async () => {
    mockRepository.getAcademicKPIs.mockResolvedValue({ passRate: 92.3, avgScore: 78.5 });
    const result = await service.getAcademicKPIs();
    expect(result.passRate).toBe(92.3);
  });

  it('should get academic KPIs with graduation rate', async () => {
    mockRepository.getAcademicKPIs.mockResolvedValue({ graduationRate: 88.7, dropoutRate: 5.2 });
    const result = await service.getAcademicKPIs();
    expect(result.graduationRate).toBe(88.7);
  });

  it('should get HR KPIs with employee satisfaction', async () => {
    mockRepository.getHrKPIs.mockResolvedValue({ totalEmployees: 130, satisfaction: 4.2 });
    const result = await service.getHrKPIs();
    expect(result.satisfaction).toBe(4.2);
  });

  it('should get HR KPIs with diversity index', async () => {
    mockRepository.getHrKPIs.mockResolvedValue({ diversityIndex: 0.72, inclusionScore: 85 });
    const result = await service.getHrKPIs();
    expect(result.diversityIndex).toBe(0.72);
  });

  it('should get student KPIs with enrollment growth', async () => {
    mockRepository.getStudentKPIs.mockResolvedValue({ totalEnrollments: 550, growthRate: 8.3 });
    const result = await service.getStudentKPIs();
    expect(result.growthRate).toBe(8.3);
  });

  it('should get student KPIs with retention rate', async () => {
    mockRepository.getStudentKPIs.mockResolvedValue({ retentionRate: 94.5, newEnrollments: 120 });
    const result = await service.getStudentKPIs();
    expect(result.retentionRate).toBe(94.5);
  });

  it('should get teacher KPIs with student-teacher ratio', async () => {
    mockRepository.getTeacherKPIs.mockResolvedValue({ totalTeachers: 48, studentTeacherRatio: 12.5 });
    const result = await service.getTeacherKPIs();
    expect(result.studentTeacherRatio).toBe(12.5);
  });

  it('should get teacher KPIs with certification rate', async () => {
    mockRepository.getTeacherKPIs.mockResolvedValue({ certificationRate: 95.2, avgExperience: 8.5 });
    const result = await service.getTeacherKPIs();
    expect(result.certificationRate).toBe(95.2);
  });

  it('should get parent KPIs with engagement rate', async () => {
    mockRepository.getParentKPIs.mockResolvedValue({ totalParents: 420, engagementRate: 68.5 });
    const result = await service.getParentKPIs();
    expect(result.engagementRate).toBe(68.5);
  });

  it('should get parent KPIs with communication frequency', async () => {
    mockRepository.getParentKPIs.mockResolvedValue({ avgCommunicationFreq: 4.2, responseRate: 82 });
    const result = await service.getParentKPIs();
    expect(result.avgCommunicationFreq).toBe(4.2);
  });

  it('should get system KPIs with response time', async () => {
    mockRepository.getSystemKPIs.mockResolvedValue({ uptimePercent: 99.95, avgResponseTime: 120 });
    const result = await service.getSystemKPIs();
    expect(result.avgResponseTime).toBe(120);
  });

  it('should get system KPIs with error rate', async () => {
    mockRepository.getSystemKPIs.mockResolvedValue({ errorRate: 0.02, requestCount: 15000 });
    const result = await service.getSystemKPIs();
    expect(result.errorRate).toBe(0.02);
  });

  it('should handle concurrent KPI fetches', async () => {
    mockRepository.getRevenueKPIs.mockResolvedValue({ totalRevenue: 50000 });
    mockRepository.getFinancialKPIs.mockResolvedValue({ totalExpenses: 30000 });
    mockRepository.getAcademicKPIs.mockResolvedValue({ avgSuccessRate: 85 });
    const [revenue, financial, academic] = await Promise.all([
      service.getRevenueKPIs(),
      service.getFinancialKPIs(),
      service.getAcademicKPIs()
    ]);
    expect(revenue.totalRevenue).toBe(50000);
    expect(financial.totalExpenses).toBe(30000);
    expect(academic.avgSuccessRate).toBe(85);
  });

  it('should get dashboard with quarterly breakdown', async () => {
    mockRepository.getExecutiveDashboard.mockResolvedValue({ quarterly: { Q1: {}, Q2: {}, Q3: {}, Q4: {} } });
    const result = await service.getExecutiveDashboard({ granularity: 'quarterly' });
    expect(result.quarterly).toHaveProperty('Q1');
  });

  it('should get dashboard with year-over-year comparison', async () => {
    mockRepository.getExecutiveDashboard.mockResolvedValue({ yoyComparison: { revenue: 12.5, enrollment: 8.3 } });
    const result = await service.getExecutiveDashboard({ compareWith: 'previousYear' });
    expect(result.yoyComparison.revenue).toBe(12.5);
  });

  it('should get dashboard with alerts', async () => {
    mockRepository.getExecutiveDashboard.mockResolvedValue({ alerts: [{ type: 'warning', message: 'Budget exceeded' }] });
    const result = await service.getExecutiveDashboard();
    expect(result.alerts).toHaveLength(1);
  });

  it('should get dashboard with custom widgets', async () => {
    mockRepository.getExecutiveDashboard.mockResolvedValue({ customWidgets: [{ id: 'w1', type: 'kpi' }] });
    const result = await service.getExecutiveDashboard();
    expect(result.customWidgets).toHaveLength(1);
  });

  it('should handle null filters gracefully', async () => {
    mockRepository.getExecutiveDashboard.mockResolvedValue({ revenue: {} });
    const result = await service.getExecutiveDashboard(null as any);
    expect(result).toHaveProperty('revenue');
  });

  it('should get revenue KPIs with monthly trend', async () => {
    mockRepository.getRevenueKPIs.mockResolvedValue({ monthlyTrend: [{ month: 'Jan', value: 45000 }, { month: 'Feb', value: 48000 }] });
    const result = await service.getRevenueKPIs();
    expect(result.monthlyTrend).toHaveLength(2);
  });

  it('should get financial KPIs with expense categories', async () => {
    mockRepository.getFinancialKPIs.mockResolvedValue({ byCategory: [{ category: 'Salaries', amount: 25000 }, { category: 'Utilities', amount: 5000 }] });
    const result = await service.getFinancialKPIs();
    expect(result.byCategory).toHaveLength(2);
  });

  it('should get academic KPIs by department', async () => {
    mockRepository.getAcademicKPIs.mockResolvedValue({ byDepartment: [{ dept: 'Science', avgScore: 82 }, { dept: 'Arts', avgScore: 88 }] });
    const result = await service.getAcademicKPIs();
    expect(result.byDepartment).toHaveLength(2);
  });

  it('should get HR KPIs with headcount changes', async () => {
    mockRepository.getHrKPIs.mockResolvedValue({ headcount: { hires: 15, terminations: 8, net: 7 } });
    const result = await service.getHrKPIs();
    expect(result.headcount.net).toBe(7);
  });

  it('should get student KPIs by grade level', async () => {
    mockRepository.getStudentKPIs.mockResolvedValue({ byGrade: [{ grade: '9th', count: 150 }, { grade: '10th', count: 145 }] });
    const result = await service.getStudentKPIs();
    expect(result.byGrade).toHaveLength(2);
  });

  it('should get teacher KPIs with performance distribution', async () => {
    mockRepository.getTeacherKPIs.mockResolvedValue({ performanceDist: [{ range: '4.5-5.0', count: 10 }, { range: '4.0-4.4', count: 20 }] });
    const result = await service.getTeacherKPIs();
    expect(result.performanceDist).toHaveLength(2);
  });

  it('should get parent KPIs by engagement level', async () => {
    mockRepository.getParentKPIs.mockResolvedValue({ byEngagement: [{ level: 'High', count: 200 }, { level: 'Low', count: 50 }] });
    const result = await service.getParentKPIs();
    expect(result.byEngagement).toHaveLength(2);
  });

  it('should get system KPIs with uptime history', async () => {
    mockRepository.getSystemKPIs.mockResolvedValue({ uptimeHistory: [{ month: 'Jan', uptime: 99.9 }, { month: 'Feb', uptime: 99.8 }] });
    const result = await service.getSystemKPIs();
    expect(result.uptimeHistory).toHaveLength(2);
  });
});
