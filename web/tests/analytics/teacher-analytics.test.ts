import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTeacherAnalyticsService } from '../../src/features/analytics/services/teacher-analytics.service';

const mockRepository = {
  getTeacherAnalytics: vi.fn(),
  getTeacherPerformanceAnalytics: vi.fn(),
  getTeacherAttendanceAnalytics: vi.fn(),
  getTeacherWorkloadAnalytics: vi.fn(),
  getTeacherSatisfactionAnalytics: vi.fn(),
  getTeacherKPIsData: vi.fn(),
};

describe('TeacherAnalyticsService', () => {
  let service: ReturnType<typeof createTeacherAnalyticsService>;

  beforeEach(() => {
    vi.clearAllMocks();
    service = createTeacherAnalyticsService(mockRepository as any);
  });

  it('should call getTeacherAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1', period: 'monthly' };
    mockRepository.getTeacherAnalytics.mockResolvedValue({ performance: { avgRating: 4.2 } });
    const result = await service.getTeacherAnalytics(filters);
    expect(mockRepository.getTeacherAnalytics).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ performance: { avgRating: 4.2 } });
  });

  it('should call getTeacherAnalytics without filters', async () => {
    mockRepository.getTeacherAnalytics.mockResolvedValue({});
    await service.getTeacherAnalytics();
    expect(mockRepository.getTeacherAnalytics).toHaveBeenCalledWith(undefined);
  });

  it('should propagate errors from getTeacherAnalytics', async () => {
    mockRepository.getTeacherAnalytics.mockRejectedValue(new Error('Teacher error'));
    await expect(service.getTeacherAnalytics()).rejects.toThrow('Teacher error');
  });

  it('should call getTeacherPerformanceAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.getTeacherPerformanceAnalytics.mockResolvedValue({ avgRating: 4.3 });
    const result = await service.getTeacherPerformanceAnalytics(filters);
    expect(mockRepository.getTeacherPerformanceAnalytics).toHaveBeenCalledWith(filters);
    expect(result.avgRating).toBe(4.3);
  });

  it('should propagate errors from getTeacherPerformanceAnalytics', async () => {
    mockRepository.getTeacherPerformanceAnalytics.mockRejectedValue(new Error('Performance error'));
    await expect(service.getTeacherPerformanceAnalytics()).rejects.toThrow('Performance error');
  });

  it('should call getTeacherAttendanceAnalytics with filters', async () => {
    const filters = { dateFrom: '2025-01-01' };
    mockRepository.getTeacherAttendanceAnalytics.mockResolvedValue({ avgRate: 96.5 });
    const result = await service.getTeacherAttendanceAnalytics(filters);
    expect(mockRepository.getTeacherAttendanceAnalytics).toHaveBeenCalledWith(filters);
    expect(result.avgRate).toBe(96.5);
  });

  it('should propagate errors from getTeacherAttendanceAnalytics', async () => {
    mockRepository.getTeacherAttendanceAnalytics.mockRejectedValue(new Error('Attendance error'));
    await expect(service.getTeacherAttendanceAnalytics()).rejects.toThrow('Attendance error');
  });

  it('should call getTeacherWorkloadAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1', dateTo: '2025-12-31' };
    mockRepository.getTeacherWorkloadAnalytics.mockResolvedValue({ avgClassesPerTeacher: 5.2 });
    const result = await service.getTeacherWorkloadAnalytics(filters);
    expect(mockRepository.getTeacherWorkloadAnalytics).toHaveBeenCalledWith(filters);
    expect(result.avgClassesPerTeacher).toBe(5.2);
  });

  it('should propagate errors from getTeacherWorkloadAnalytics', async () => {
    mockRepository.getTeacherWorkloadAnalytics.mockRejectedValue(new Error('Workload error'));
    await expect(service.getTeacherWorkloadAnalytics()).rejects.toThrow('Workload error');
  });

  it('should call getTeacherSatisfactionAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.getTeacherSatisfactionAnalytics.mockResolvedValue({ avgScore: 4.1 });
    const result = await service.getTeacherSatisfactionAnalytics(filters);
    expect(mockRepository.getTeacherSatisfactionAnalytics).toHaveBeenCalledWith(filters);
    expect(result.avgScore).toBe(4.1);
  });

  it('should propagate errors from getTeacherSatisfactionAnalytics', async () => {
    mockRepository.getTeacherSatisfactionAnalytics.mockRejectedValue(new Error('Satisfaction error'));
    await expect(service.getTeacherSatisfactionAnalytics()).rejects.toThrow('Satisfaction error');
  });

  it('should call getTeacherKPIsData with filters', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.getTeacherKPIsData.mockResolvedValue({ avgPerformance: 4.0 });
    const result = await service.getTeacherKPIsData(filters);
    expect(mockRepository.getTeacherKPIsData).toHaveBeenCalledWith(filters);
    expect(result.avgPerformance).toBe(4.0);
  });

  it('should propagate errors from getTeacherKPIsData', async () => {
    mockRepository.getTeacherKPIsData.mockRejectedValue(new Error('KPI error'));
    await expect(service.getTeacherKPIsData()).rejects.toThrow('KPI error');
  });

  it('should return performance with top performers', async () => {
    mockRepository.getTeacherPerformanceAnalytics.mockResolvedValue({ avgRating: 4.0, topPerformers: [{ name: 'Mr. Smith', rating: 4.9 }], distribution: [] });
    const result = await service.getTeacherPerformanceAnalytics();
    expect(result.topPerformers).toHaveLength(1);
  });

  it('should return attendance with byTeacher breakdown', async () => {
    mockRepository.getTeacherAttendanceAnalytics.mockResolvedValue({ avgRate: 95, byTeacher: [{ name: 'Ms. Jones', rate: 98 }], byMonth: [] });
    const result = await service.getTeacherAttendanceAnalytics();
    expect(result.byTeacher).toHaveLength(1);
  });

  it('should return workload with overloaded count', async () => {
    mockRepository.getTeacherWorkloadAnalytics.mockResolvedValue({ avgClassesPerTeacher: 6, overloaded: 5, byDepartment: [] });
    const result = await service.getTeacherWorkloadAnalytics();
    expect(result.overloaded).toBe(5);
  });

  it('should return satisfaction with category breakdown', async () => {
    mockRepository.getTeacherSatisfactionAnalytics.mockResolvedValue({ avgScore: 4.2, byCategory: [{ category: 'Work Environment', score: 4.5 }], distribution: [], trend: [] });
    const result = await service.getTeacherSatisfactionAnalytics();
    expect(result.byCategory).toHaveLength(1);
  });

  it('should return KPIs with certification rate', async () => {
    mockRepository.getTeacherKPIsData.mockResolvedValue({ avgPerformance: 4.0, certificationRate: 88.5, trainingCompletion: 75.2 });
    const result = await service.getTeacherKPIsData();
    expect(result.certificationRate).toBe(88.5);
    expect(result.trainingCompletion).toBe(75.2);
  });

  it('should return performance with improvement metric', async () => {
    mockRepository.getTeacherPerformanceAnalytics.mockResolvedValue({ avgRating: 4.1, improvement: 3.5 });
    const result = await service.getTeacherPerformanceAnalytics();
    expect(result.improvement).toBe(3.5);
  });

  it('should return workload with avg students per teacher', async () => {
    mockRepository.getTeacherWorkloadAnalytics.mockResolvedValue({ avgStudentsPerTeacher: 28, avgHoursPerWeek: 35 });
    const result = await service.getTeacherWorkloadAnalytics();
    expect(result.avgStudentsPerTeacher).toBe(28);
  });

  it('should return satisfaction with trend data', async () => {
    mockRepository.getTeacherSatisfactionAnalytics.mockResolvedValue({ avgScore: 4.0, trend: [{ month: 'Jan', score: 3.8 }, { month: 'Feb', score: 4.0 }] });
    const result = await service.getTeacherSatisfactionAnalytics();
    expect(result.trend).toHaveLength(2);
  });

  it('should handle empty analytics results', async () => {
    mockRepository.getTeacherAnalytics.mockResolvedValue({ performance: null, attendance: null, workload: null, satisfaction: null, kpis: null });
    const result = await service.getTeacherAnalytics();
    expect(result.performance).toBeNull();
  });

  it('should return performance with subject breakdown', async () => {
    mockRepository.getTeacherPerformanceAnalytics.mockResolvedValue({ avgRating: 4.0, bySubject: [{ subject: 'Math', rating: 4.5 }], distribution: [] });
    const result = await service.getTeacherPerformanceAnalytics();
    expect(result.bySubject).toHaveLength(1);
  });

  it('should get teacher analytics with department filter', async () => {
    mockRepository.getTeacherAnalytics.mockResolvedValue({ department: 'Science', teacherCount: 12 });
    const result = await service.getTeacherAnalytics({ department: 'science' });
    expect(result.department).toBe('Science');
  });

  it('should get performance with certification tracking', async () => {
    mockRepository.getTeacherPerformanceAnalytics.mockResolvedValue({ avgRating: 4.2, certified: 45, pendingCertification: 3 });
    const result = await service.getTeacherPerformanceAnalytics();
    expect(result.certified).toBe(45);
    expect(result.pendingCertification).toBe(3);
  });

  it('should get performance with observation data', async () => {
    mockRepository.getTeacherPerformanceAnalytics.mockResolvedValue({ avgRating: 4.1, observations: { total: 120, avgPerTeacher: 2.8 } });
    const result = await service.getTeacherPerformanceAnalytics();
    expect(result.observations.total).toBe(120);
  });

  it('should get attendance with leave patterns', async () => {
    mockRepository.getTeacherAttendanceAnalytics.mockResolvedValue({ avgRate: 96, leavePatterns: { monday: 0.08, friday: 0.12 } });
    const result = await service.getTeacherAttendanceAnalytics();
    expect(result.leavePatterns.monday).toBe(0.08);
  });

  it('should get attendance with substitute coverage', async () => {
    mockRepository.getTeacherAttendanceAnalytics.mockResolvedValue({ avgRate: 96, substituteDays: 85, coverageRate: 0.94 });
    const result = await service.getTeacherAttendanceAnalytics();
    expect(result.substituteDays).toBe(85);
  });

  it('should get workload with class size distribution', async () => {
    mockRepository.getTeacherWorkloadAnalytics.mockResolvedValue({ avgClassesPerTeacher: 5.2, classSizes: [{ range: '15-20', count: 8 }, { range: '21-25', count: 12 }] });
    const result = await service.getTeacherWorkloadAnalytics();
    expect(result.classSizes).toHaveLength(2);
  });

  it('should get workload with prep time analysis', async () => {
    mockRepository.getTeacherWorkloadAnalytics.mockResolvedValue({ avgClassesPerTeacher: 5, prepHoursPerWeek: 8.5, gradingHoursPerWeek: 6.2 });
    const result = await service.getTeacherWorkloadAnalytics();
    expect(result.prepHoursPerWeek).toBe(8.5);
  });

  it('should get satisfaction with benefits feedback', async () => {
    mockRepository.getTeacherSatisfactionAnalytics.mockResolvedValue({ avgScore: 4.0, benefits: { healthcare: 4.3, retirement: 4.1, pto: 3.8 } });
    const result = await service.getTeacherSatisfactionAnalytics();
    expect(result.benefits.healthcare).toBe(4.3);
  });

  it('should get satisfaction with leadership feedback', async () => {
    mockRepository.getTeacherSatisfactionAnalytics.mockResolvedValue({ avgScore: 4.1, leadership: { principal: 4.2, deptHead: 4.0 } });
    const result = await service.getTeacherSatisfactionAnalytics();
    expect(result.leadership.principal).toBe(4.2);
  });

  it('should get KPIs with professional development', async () => {
    mockRepository.getTeacherKPIsData.mockResolvedValue({ avgPerformance: 4.0, pdHours: 45, pdCompletion: 0.82 });
    const result = await service.getTeacherKPIsData();
    expect(result.pdHours).toBe(45);
  });

  it('should get KPIs with student outcomes', async () => {
    mockRepository.getTeacherKPIsData.mockResolvedValue({ avgPerformance: 4.0, studentOutcome: { passRate: 88, avgGrowth: 15.2 } });
    const result = await service.getTeacherKPIsData();
    expect(result.studentOutcome.passRate).toBe(88);
  });

  it('should get performance by experience level', async () => {
    mockRepository.getTeacherPerformanceAnalytics.mockResolvedValue({ byExperience: [{ level: '0-2 years', rating: 3.8 }, { level: '3-5 years', rating: 4.1 }, { level: '6+ years', rating: 4.3 }] });
    const result = await service.getTeacherPerformanceAnalytics();
    expect(result.byExperience).toHaveLength(3);
  });

  it('should get attendance with attendance awards', async () => {
    mockRepository.getTeacherAttendanceAnalytics.mockResolvedValue({ avgRate: 96, perfectAttendance: 15, attendanceAwards: 8 });
    const result = await service.getTeacherAttendanceAnalytics();
    expect(result.perfectAttendance).toBe(15);
  });

  it('should get workload with extracurricular duties', async () => {
    mockRepository.getTeacherWorkloadAnalytics.mockResolvedValue({ avgClassesPerTeacher: 5, extracurricular: { coaches: 8, clubAdvisors: 12, mentors: 15 } });
    const result = await service.getTeacherWorkloadAnalytics();
    expect(result.extracurricular.coaches).toBe(8);
  });

  it('should get satisfaction with work-life balance', async () => {
    mockRepository.getTeacherSatisfactionAnalytics.mockResolvedValue({ avgScore: 4.0, workLifeBalance: 3.7, stressLevel: 3.2 });
    const result = await service.getTeacherSatisfactionAnalytics();
    expect(result.workLifeBalance).toBe(3.7);
  });

  it('should get KPIs with innovation metrics', async () => {
    mockRepository.getTeacherKPIsData.mockResolvedValue({ avgPerformance: 4.0, innovationProjects: 8, techAdoption: 0.72 });
    const result = await service.getTeacherKPIsData();
    expect(result.innovationProjects).toBe(8);
  });

  it('should get performance with peer reviews', async () => {
    mockRepository.getTeacherPerformanceAnalytics.mockResolvedValue({ avgRating: 4.1, peerReviews: { given: 45, received: 42, avgScore: 4.0 } });
    const result = await service.getTeacherPerformanceAnalytics();
    expect(result.peerReviews.received).toBe(42);
  });

  it('should get attendance with late arrivals tracking', async () => {
    mockRepository.getTeacherAttendanceAnalytics.mockResolvedValue({ avgRate: 96, lateArrivals: 25, earlyDepartures: 12 });
    const result = await service.getTeacherAttendanceAnalytics();
    expect(result.lateArrivals).toBe(25);
  });

  it('should get workload with meeting hours', async () => {
    mockRepository.getTeacherWorkloadAnalytics.mockResolvedValue({ avgClassesPerTeacher: 5, meetingHours: { staff: 4, parent: 2, committee: 1.5 } });
    const result = await service.getTeacherWorkloadAnalytics();
    expect(result.meetingHours.staff).toBe(4);
  });

  it('should get satisfaction with compensation feedback', async () => {
    mockRepository.getTeacherSatisfactionAnalytics.mockResolvedValue({ avgScore: 4.0, compensation: { salary: 3.5, benefits: 4.0, raises: 3.2 } });
    const result = await service.getTeacherSatisfactionAnalytics();
    expect(result.compensation.salary).toBe(3.5);
  });

  it('should get KPIs with classroom metrics', async () => {
    mockRepository.getTeacherKPIsData.mockResolvedValue({ avgPerformance: 4.0, classroomMetrics: { avgClassSize: 22, studentEngagement: 0.78, parentContactRate: 0.65 } });
    const result = await service.getTeacherKPIsData();
    expect(result.classroomMetrics.avgClassSize).toBe(22);
  });

  it('should get performance with student feedback correlation', async () => {
    mockRepository.getTeacherPerformanceAnalytics.mockResolvedValue({ avgRating: 4.1, studentFeedbackCorrelation: 0.72, parentFeedbackCorrelation: 0.58 });
    const result = await service.getTeacherPerformanceAnalytics();
    expect(result.studentFeedbackCorrelation).toBe(0.72);
  });

  it('should get attendance with remote teaching days', async () => {
    mockRepository.getTeacherAttendanceAnalytics.mockResolvedValue({ avgRate: 96, remoteDays: 15, hybridDays: 25 });
    const result = await service.getTeacherAttendanceAnalytics();
    expect(result.remoteDays).toBe(15);
  });

  it('should get workload with planning periods', async () => {
    mockRepository.getTeacherWorkloadAnalytics.mockResolvedValue({ avgClassesPerTeacher: 5, planningPeriods: 2, conferencePeriods: 1 });
    const result = await service.getTeacherWorkloadAnalytics();
    expect(result.planningPeriods).toBe(2);
  });

  it('should get satisfaction with professional growth', async () => {
    mockRepository.getTeacherSatisfactionAnalytics.mockResolvedValue({ avgScore: 4.1, professionalGrowth: 4.3, mentorshipProgram: 3.9 });
    const result = await service.getTeacherSatisfactionAnalytics();
    expect(result.professionalGrowth).toBe(4.3);
  });

  it('should get KPIs with retention data', async () => {
    mockRepository.getTeacherKPIsData.mockResolvedValue({ avgPerformance: 4.0, retentionRate: 0.88, avgTenure: 5.2 });
    const result = await service.getTeacherKPIsData();
    expect(result.retentionRate).toBe(0.88);
  });

  it('should get performance with student growth impact', async () => {
    mockRepository.getTeacherPerformanceAnalytics.mockResolvedValue({ avgRating: 4.1, studentGrowth: { avgGrowth: 12.5, topPerformers: 18 } });
    const result = await service.getTeacherPerformanceAnalytics();
    expect(result.studentGrowth.avgGrowth).toBe(12.5);
  });

  it('should get attendance with attendance policy compliance', async () => {
    mockRepository.getTeacherAttendanceAnalytics.mockResolvedValue({ avgRate: 96, policyCompliance: 0.94, warnings: 5 });
    const result = await service.getTeacherAttendanceAnalytics();
    expect(result.policyCompliance).toBe(0.94);
  });

  it('should get workload with committee assignments', async () => {
    mockRepository.getTeacherWorkloadAnalytics.mockResolvedValue({ avgClassesPerTeacher: 5, committees: [{ name: 'Curriculum', members: 8 }, { name: 'Budget', members: 5 }] });
    const result = await service.getTeacherWorkloadAnalytics();
    expect(result.committees).toHaveLength(2);
  });

  it('should get satisfaction with school culture feedback', async () => {
    mockRepository.getTeacherSatisfactionAnalytics.mockResolvedValue({ avgScore: 4.1, schoolCulture: 4.2, collaboration: 4.0, resources: 3.6 });
    const result = await service.getTeacherSatisfactionAnalytics();
    expect(result.schoolCulture).toBe(4.2);
  });

  it('should get KPIs with student retention impact', async () => {
    mockRepository.getTeacherKPIsData.mockResolvedValue({ avgPerformance: 4.0, studentRetentionImpact: 0.15, parentSatisfactionImpact: 0.12 });
    const result = await service.getTeacherKPIsData();
    expect(result.studentRetentionImpact).toBe(0.15);
  });

  it('should get full teacher analytics structure', async () => {
    mockRepository.getTeacherAnalytics.mockResolvedValue({ performance: {}, attendance: {}, workload: {}, satisfaction: {}, kpis: {}, department: 'Science' });
    const result = await service.getTeacherAnalytics();
    expect(result).toHaveProperty('performance');
    expect(result).toHaveProperty('attendance');
    expect(result).toHaveProperty('workload');
    expect(result).toHaveProperty('satisfaction');
    expect(result).toHaveProperty('kpis');
    expect(result).toHaveProperty('department');
  });
});
