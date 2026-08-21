import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createHrAnalyticsService } from '../../src/features/analytics/services/hr-analytics.service';

const mockRepository = {
  getHrAnalytics: vi.fn(),
  getWorkforceAnalytics: vi.fn(),
  getTurnoverAnalytics: vi.fn(),
  getHrAttendanceAnalytics: vi.fn(),
  getTrainingAnalytics: vi.fn(),
  getHrPerformanceAnalytics: vi.fn(),
  getCompensationAnalytics: vi.fn(),
};

describe('HrAnalyticsService', () => {
  let service: ReturnType<typeof createHrAnalyticsService>;

  beforeEach(() => {
    vi.clearAllMocks();
    service = createHrAnalyticsService(mockRepository as any);
  });

  it('should call getHrAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1', period: 'monthly' };
    mockRepository.getHrAnalytics.mockResolvedValue({ workforce: { total: 120 } });
    const result = await service.getHrAnalytics(filters);
    expect(mockRepository.getHrAnalytics).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ workforce: { total: 120 } });
  });

  it('should call getHrAnalytics without filters', async () => {
    mockRepository.getHrAnalytics.mockResolvedValue({});
    await service.getHrAnalytics();
    expect(mockRepository.getHrAnalytics).toHaveBeenCalledWith(undefined);
  });

  it('should propagate errors from getHrAnalytics', async () => {
    mockRepository.getHrAnalytics.mockRejectedValue(new Error('HR error'));
    await expect(service.getHrAnalytics()).rejects.toThrow('HR error');
  });

  it('should call getWorkforceAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.getWorkforceAnalytics.mockResolvedValue({ total: 150, byDepartment: [] });
    const result = await service.getWorkforceAnalytics(filters);
    expect(mockRepository.getWorkforceAnalytics).toHaveBeenCalledWith(filters);
    expect(result.total).toBe(150);
  });

  it('should propagate errors from getWorkforceAnalytics', async () => {
    mockRepository.getWorkforceAnalytics.mockRejectedValue(new Error('Workforce error'));
    await expect(service.getWorkforceAnalytics()).rejects.toThrow('Workforce error');
  });

  it('should call getTurnoverAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1', period: 'quarterly' };
    mockRepository.getTurnoverAnalytics.mockResolvedValue({ rate: 12.5 });
    const result = await service.getTurnoverAnalytics(filters);
    expect(mockRepository.getTurnoverAnalytics).toHaveBeenCalledWith(filters);
    expect(result.rate).toBe(12.5);
  });

  it('should propagate errors from getTurnoverAnalytics', async () => {
    mockRepository.getTurnoverAnalytics.mockRejectedValue(new Error('Turnover error'));
    await expect(service.getTurnoverAnalytics()).rejects.toThrow('Turnover error');
  });

  it('should call getHrAttendanceAnalytics with filters', async () => {
    const filters = { dateFrom: '2025-01-01' };
    mockRepository.getHrAttendanceAnalytics.mockResolvedValue({ avgRate: 94.5 });
    const result = await service.getHrAttendanceAnalytics(filters);
    expect(mockRepository.getHrAttendanceAnalytics).toHaveBeenCalledWith(filters);
    expect(result.avgRate).toBe(94.5);
  });

  it('should propagate errors from getHrAttendanceAnalytics', async () => {
    mockRepository.getHrAttendanceAnalytics.mockRejectedValue(new Error('HrAttendance error'));
    await expect(service.getHrAttendanceAnalytics()).rejects.toThrow('HrAttendance error');
  });

  it('should call getTrainingAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1', dateTo: '2025-12-31' };
    mockRepository.getTrainingAnalytics.mockResolvedValue({ completionRate: 78.3 });
    const result = await service.getTrainingAnalytics(filters);
    expect(mockRepository.getTrainingAnalytics).toHaveBeenCalledWith(filters);
    expect(result.completionRate).toBe(78.3);
  });

  it('should propagate errors from getTrainingAnalytics', async () => {
    mockRepository.getTrainingAnalytics.mockRejectedValue(new Error('Training error'));
    await expect(service.getTrainingAnalytics()).rejects.toThrow('Training error');
  });

  it('should call getHrPerformanceAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.getHrPerformanceAnalytics.mockResolvedValue({ avgScore: 4.2 });
    const result = await service.getHrPerformanceAnalytics(filters);
    expect(mockRepository.getHrPerformanceAnalytics).toHaveBeenCalledWith(filters);
    expect(result.avgScore).toBe(4.2);
  });

  it('should propagate errors from getHrPerformanceAnalytics', async () => {
    mockRepository.getHrPerformanceAnalytics.mockRejectedValue(new Error('HrPerformance error'));
    await expect(service.getHrPerformanceAnalytics()).rejects.toThrow('HrPerformance error');
  });

  it('should call getCompensationAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1', dateFrom: '2025-01-01' };
    mockRepository.getCompensationAnalytics.mockResolvedValue({ avgSalary: 3500 });
    const result = await service.getCompensationAnalytics(filters);
    expect(mockRepository.getCompensationAnalytics).toHaveBeenCalledWith(filters);
    expect(result.avgSalary).toBe(3500);
  });

  it('should propagate errors from getCompensationAnalytics', async () => {
    mockRepository.getCompensationAnalytics.mockRejectedValue(new Error('Compensation error'));
    await expect(service.getCompensationAnalytics()).rejects.toThrow('Compensation error');
  });

  it('should return workforce analytics with department breakdown', async () => {
    mockRepository.getWorkforceAnalytics.mockResolvedValue({ total: 100, byDepartment: [{ dept: 'Teaching', count: 60 }, { dept: 'Admin', count: 40 }] });
    const result = await service.getWorkforceAnalytics();
    expect(result.byDepartment).toHaveLength(2);
  });

  it('should return turnover with monthly data', async () => {
    mockRepository.getTurnoverAnalytics.mockResolvedValue({ rate: 10, monthly: [{ month: 'Jan', rate: 8 }, { month: 'Feb', rate: 10 }] });
    const result = await service.getTurnoverAnalytics();
    expect(result.monthly).toHaveLength(2);
  });

  it('should return training data with program count', async () => {
    mockRepository.getTrainingAnalytics.mockResolvedValue({ totalPrograms: 15, completionRate: 82 });
    const result = await service.getTrainingAnalytics();
    expect(result.totalPrograms).toBe(15);
  });

  it('should return compensation data with salary range', async () => {
    mockRepository.getCompensationAnalytics.mockResolvedValue({ avgSalary: 3500, medianSalary: 3200, salaryRange: { min: 1500, max: 8000 } });
    const result = await service.getCompensationAnalytics();
    expect(result.salaryRange.min).toBeLessThan(result.salaryRange.max);
  });

  it('should handle empty workforce analytics', async () => {
    mockRepository.getWorkforceAnalytics.mockResolvedValue({ total: 0, byDepartment: [] });
    const result = await service.getWorkforceAnalytics();
    expect(result.total).toBe(0);
    expect(result.byDepartment).toEqual([]);
  });

  it('should return performance with improvement metric', async () => {
    mockRepository.getHrPerformanceAnalytics.mockResolvedValue({ avgScore: 3.8, improvement: 5.2, distribution: [] });
    const result = await service.getHrPerformanceAnalytics();
    expect(result.improvement).toBe(5.2);
  });

  it('should return attendance with punctuality data', async () => {
    mockRepository.getHrAttendanceAnalytics.mockResolvedValue({ avgRate: 95, absenteeism: 3.5, punctuality: 92 });
    const result = await service.getHrAttendanceAnalytics();
    expect(result.punctuality).toBe(92);
  });

  it('should handle compensation with total payroll', async () => {
    mockRepository.getCompensationAnalytics.mockResolvedValue({ totalPayroll: 500000, avgSalary: 3500 });
    const result = await service.getCompensationAnalytics();
    expect(result.totalPayroll).toBe(500000);
  });

  it('should get workforce analytics with hire date breakdown', async () => {
    mockRepository.getWorkforceAnalytics.mockResolvedValue({ byHireDate: [{ year: '2024', count: 25 }, { year: '2023', count: 18 }] });
    const result = await service.getWorkforceAnalytics();
    expect(result.byHireDate).toHaveLength(2);
  });

  it('should get workforce analytics with age distribution', async () => {
    mockRepository.getWorkforceAnalytics.mockResolvedValue({ ageDistribution: [{ range: '25-34', count: 45 }, { range: '35-44', count: 55 }] });
    const result = await service.getWorkforceAnalytics();
    expect(result.ageDistribution).toHaveLength(2);
  });

  it('should get turnover analytics with reasons', async () => {
    mockRepository.getTurnoverAnalytics.mockResolvedValue({ rate: 12, reasons: [{ reason: 'Better Opportunity', percentage: 40 }, { reason: 'Retirement', percentage: 25 }] });
    const result = await service.getTurnoverAnalytics();
    expect(result.reasons).toHaveLength(2);
  });

  it('should get turnover analytics by department', async () => {
    mockRepository.getTurnoverAnalytics.mockResolvedValue({ byDepartment: [{ dept: 'Teaching', rate: 8 }, { dept: 'Admin', rate: 15 }] });
    const result = await service.getTurnoverAnalytics();
    expect(result.byDepartment).toHaveLength(2);
  });

  it('should get attendance analytics with tardiness rate', async () => {
    mockRepository.getHrAttendanceAnalytics.mockResolvedValue({ avgRate: 94, tardinessRate: 6.5, earlyDepartureRate: 2.3 });
    const result = await service.getHrAttendanceAnalytics();
    expect(result.tardinessRate).toBe(6.5);
  });

  it('should get attendance analytics with leave data', async () => {
    mockRepository.getHrAttendanceAnalytics.mockResolvedValue({ avgRate: 94, leaveDays: { sick: 5, personal: 3, vacation: 12 } });
    const result = await service.getHrAttendanceAnalytics();
    expect(result.leaveDays.sick).toBe(5);
  });

  it('should get training analytics with completion by type', async () => {
    mockRepository.getTrainingAnalytics.mockResolvedValue({ completionRate: 78, byType: [{ type: 'Compliance', rate: 92 }, { type: 'Professional Dev', rate: 65 }] });
    const result = await service.getTrainingAnalytics();
    expect(result.byType).toHaveLength(2);
  });

  it('should get training analytics with hours invested', async () => {
    mockRepository.getTrainingAnalytics.mockResolvedValue({ totalHours: 1500, avgHoursPerEmployee: 12.5 });
    const result = await service.getTrainingAnalytics();
    expect(result.totalHours).toBe(1500);
  });

  it('should get performance analytics with improvement tracking', async () => {
    mockRepository.getHrPerformanceAnalytics.mockResolvedValue({ avgScore: 4.1, improvement: 6.8, previousScore: 3.85 });
    const result = await service.getHrPerformanceAnalytics();
    expect(result.previousScore).toBe(3.85);
  });

  it('should get performance analytics by department', async () => {
    mockRepository.getHrPerformanceAnalytics.mockResolvedValue({ byDepartment: [{ dept: 'Science', score: 4.3 }, { dept: 'Arts', score: 4.0 }] });
    const result = await service.getHrPerformanceAnalytics();
    expect(result.byDepartment).toHaveLength(2);
  });

  it('should get compensation analytics with benefits cost', async () => {
    mockRepository.getCompensationAnalytics.mockResolvedValue({ avgSalary: 3500, benefitsCost: 1200, totalCompensation: 4700 });
    const result = await service.getCompensationAnalytics();
    expect(result.benefitsCost).toBe(1200);
  });

  it('should get compensation analytics by role', async () => {
    mockRepository.getCompensationAnalytics.mockResolvedValue({ byRole: [{ role: 'Teacher', avg: 3200 }, { role: 'Administrator', avg: 4500 }] });
    const result = await service.getCompensationAnalytics();
    expect(result.byRole).toHaveLength(2);
  });

  it('should get HR analytics with headcount trend', async () => {
    mockRepository.getHrAnalytics.mockResolvedValue({ headcountTrend: [{ month: 'Jan', count: 118 }, { month: 'Feb', count: 120 }] });
    const result = await service.getHrAnalytics();
    expect(result.headcountTrend).toHaveLength(2);
  });

  it('should get HR analytics with diversity metrics', async () => {
    mockRepository.getHrAnalytics.mockResolvedValue({ diversity: { gender: 0.55, ethnicity: 0.62, age: 0.71 } });
    const result = await service.getHrAnalytics();
    expect(result.diversity.gender).toBe(0.55);
  });

  it('should handle workforce with zero employees', async () => {
    mockRepository.getWorkforceAnalytics.mockResolvedValue({ total: 0, byDepartment: [] });
    const result = await service.getWorkforceAnalytics();
    expect(result.total).toBe(0);
  });

  it('should handle turnover with zero rate', async () => {
    mockRepository.getTurnoverAnalytics.mockResolvedValue({ rate: 0, reasons: [] });
    const result = await service.getTurnoverAnalytics();
    expect(result.rate).toBe(0);
  });

  it('should handle training with zero programs', async () => {
    mockRepository.getTrainingAnalytics.mockResolvedValue({ totalPrograms: 0, completionRate: 0 });
    const result = await service.getTrainingAnalytics();
    expect(result.totalPrograms).toBe(0);
  });

  it('should get workforce with tenure distribution', async () => {
    mockRepository.getWorkforceAnalytics.mockResolvedValue({ tenure: [{ range: '0-2 years', count: 30 }, { range: '3-5 years', count: 45 }, { range: '6+ years', count: 25 }] });
    const result = await service.getWorkforceAnalytics();
    expect(result.tenure).toHaveLength(3);
  });

  it('should get turnover with seasonal patterns', async () => {
    mockRepository.getTurnoverAnalytics.mockResolvedValue({ rate: 12, seasonal: { peak: 'June', low: 'September' } });
    const result = await service.getTurnoverAnalytics();
    expect(result.seasonal.peak).toBe('June');
  });

  it('should get attendance with overtime data', async () => {
    mockRepository.getHrAttendanceAnalytics.mockResolvedValue({ avgRate: 94, overtimeHours: 250, overtimeCost: 15000 });
    const result = await service.getHrAttendanceAnalytics();
    expect(result.overtimeHours).toBe(250);
  });

  it('should get training with ROI metrics', async () => {
    mockRepository.getTrainingAnalytics.mockResolvedValue({ completionRate: 78, roi: 3.2, costPerHour: 75 });
    const result = await service.getTrainingAnalytics();
    expect(result.roi).toBe(3.2);
  });

  it('should get performance with correlation data', async () => {
    mockRepository.getHrPerformanceAnalytics.mockResolvedValue({ avgScore: 4.1, correlation: { experience: 0.65, training: 0.42 } });
    const result = await service.getHrPerformanceAnalytics();
    expect(result.correlation.experience).toBe(0.65);
  });

  it('should get compensation with equity analysis', async () => {
    mockRepository.getCompensationAnalytics.mockResolvedValue({ avgSalary: 3500, equityRatio: 0.92, payGap: 5.2 });
    const result = await service.getCompensationAnalytics();
    expect(result.equityRatio).toBe(0.92);
  });

  it('should get HR analytics with turnover prediction', async () => {
    mockRepository.getHrAnalytics.mockResolvedValue({ predictedTurnover: 0.15, riskEmployees: 8 });
    const result = await service.getHrAnalytics();
    expect(result.predictedTurnover).toBe(0.15);
  });

  it('should get workforce with recruitment metrics', async () => {
    mockRepository.getWorkforceAnalytics.mockResolvedValue({ recruitment: { openPositions: 5, avgTimeToHire: 32, applicationsPerPosition: 45 } });
    const result = await service.getWorkforceAnalytics();
    expect(result.recruitment.openPositions).toBe(5);
  });

  it('should get turnover with retention strategies', async () => {
    mockRepository.getTurnoverAnalytics.mockResolvedValue({ rate: 12, strategies: [{ strategy: 'Mentorship', impact: 0.15 }, { strategy: 'Flexible Hours', impact: 0.12 }] });
    const result = await service.getTurnoverAnalytics();
    expect(result.strategies).toHaveLength(2);
  });

  it('should get attendance with remote work data', async () => {
    mockRepository.getHrAttendanceAnalytics.mockResolvedValue({ avgRate: 94, remoteWorkDays: 2.5, hybridAdoption: 0.65 });
    const result = await service.getHrAttendanceAnalytics();
    expect(result.remoteWorkDays).toBe(2.5);
  });

  it('should get training with skill gaps', async () => {
    mockRepository.getTrainingAnalytics.mockResolvedValue({ completionRate: 78, skillGaps: [{ skill: 'Technology', gap: 0.25 }, { skill: 'Leadership', gap: 0.18 }] });
    const result = await service.getTrainingAnalytics();
    expect(result.skillGaps).toHaveLength(2);
  });

  it('should get performance with goal completion', async () => {
    mockRepository.getHrPerformanceAnalytics.mockResolvedValue({ avgScore: 4.1, goalCompletion: 0.78, pendingGoals: 15 });
    const result = await service.getHrPerformanceAnalytics();
    expect(result.goalCompletion).toBe(0.78);
  });

  it('should get compensation with market comparison', async () => {
    mockRepository.getCompensationAnalytics.mockResolvedValue({ avgSalary: 3500, marketAverage: 3800, competitivenessRatio: 0.92 });
    const result = await service.getCompensationAnalytics();
    expect(result.competitivenessRatio).toBe(0.92);
  });

  it('should get workforce with succession planning', async () => {
    mockRepository.getWorkforceAnalytics.mockResolvedValue({ successionPlan: { readyNow: 5, readyIn1Year: 12, readyIn3Years: 20 } });
    const result = await service.getWorkforceAnalytics();
    expect(result.successionPlan.readyNow).toBe(5);
  });

  it('should handle HR analytics with full structure', async () => {
    mockRepository.getHrAnalytics.mockResolvedValue({ workforce: {}, turnover: {}, attendance: {}, training: {}, performance: {}, compensation: {} });
    const result = await service.getHrAnalytics();
    expect(result).toHaveProperty('workforce');
    expect(result).toHaveProperty('turnover');
    expect(result).toHaveProperty('attendance');
    expect(result).toHaveProperty('training');
    expect(result).toHaveProperty('performance');
    expect(result).toHaveProperty('compensation');
  });
});
