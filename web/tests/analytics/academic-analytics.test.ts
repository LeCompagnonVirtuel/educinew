import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAcademicAnalyticsService } from '../../src/features/analytics/services/academic-analytics.service';

const mockRepository = {
  getAcademicAnalytics: vi.fn(),
  getSuccessRate: vi.fn(),
  getGradeEvolution: vi.fn(),
  getAttendanceAnalytics: vi.fn(),
  getPerformanceByClass: vi.fn(),
  getPerformanceByLevel: vi.fn(),
  getPerformanceBySchool: vi.fn(),
  getPerformanceByTeacher: vi.fn(),
  getPerformanceByYear: vi.fn(),
  getSubjectDifficulty: vi.fn(),
};

describe('AcademicAnalyticsService', () => {
  let service: ReturnType<typeof createAcademicAnalyticsService>;

  beforeEach(() => {
    vi.clearAllMocks();
    service = createAcademicAnalyticsService(mockRepository as any);
  });

  it('should call repository.getAcademicAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1', period: 'monthly' };
    mockRepository.getAcademicAnalytics.mockResolvedValue({ successRate: 85 });
    const result = await service.getAcademicAnalytics(filters);
    expect(mockRepository.getAcademicAnalytics).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ successRate: 85 });
  });

  it('should call repository.getAcademicAnalytics without filters', async () => {
    mockRepository.getAcademicAnalytics.mockResolvedValue({});
    await service.getAcademicAnalytics();
    expect(mockRepository.getAcademicAnalytics).toHaveBeenCalledWith(undefined);
  });

  it('should propagate errors from getAcademicAnalytics', async () => {
    mockRepository.getAcademicAnalytics.mockRejectedValue(new Error('DB error'));
    await expect(service.getAcademicAnalytics()).rejects.toThrow('DB error');
  });

  it('should call getSuccessRate with filters', async () => {
    const filters = { schoolId: 'sch-1', dateFrom: '2025-01-01' };
    mockRepository.getSuccessRate.mockResolvedValue({ overall: 88.5 });
    const result = await service.getSuccessRate(filters);
    expect(mockRepository.getSuccessRate).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ overall: 88.5 });
  });

  it('should propagate errors from getSuccessRate', async () => {
    mockRepository.getSuccessRate.mockRejectedValue(new Error('SuccessRate error'));
    await expect(service.getSuccessRate()).rejects.toThrow('SuccessRate error');
  });

  it('should call getGradeEvolution with filters', async () => {
    const filters = { schoolId: 'sch-1', period: 'quarterly' };
    mockRepository.getGradeEvolution.mockResolvedValue({ overall: [] });
    const result = await service.getGradeEvolution(filters);
    expect(mockRepository.getGradeEvolution).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ overall: [] });
  });

  it('should propagate errors from getGradeEvolution', async () => {
    mockRepository.getGradeEvolution.mockRejectedValue(new Error('GradeEvolution error'));
    await expect(service.getGradeEvolution()).rejects.toThrow('GradeEvolution error');
  });

  it('should call getAttendanceAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-2', dateTo: '2025-12-31' };
    mockRepository.getAttendanceAnalytics.mockResolvedValue({ overallRate: 92.1 });
    const result = await service.getAttendanceAnalytics(filters);
    expect(mockRepository.getAttendanceAnalytics).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ overallRate: 92.1 });
  });

  it('should propagate errors from getAttendanceAnalytics', async () => {
    mockRepository.getAttendanceAnalytics.mockRejectedValue(new Error('Attendance error'));
    await expect(service.getAttendanceAnalytics()).rejects.toThrow('Attendance error');
  });

  it('should call getPerformanceByClass with filters', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.getPerformanceByClass.mockResolvedValue([{ name: 'Class A', score: 85 }]);
    const result = await service.getPerformanceByClass(filters);
    expect(mockRepository.getPerformanceByClass).toHaveBeenCalledWith(filters);
    expect(result).toHaveLength(1);
  });

  it('should propagate errors from getPerformanceByClass', async () => {
    mockRepository.getPerformanceByClass.mockRejectedValue(new Error('PerformanceByClass error'));
    await expect(service.getPerformanceByClass()).rejects.toThrow('PerformanceByClass error');
  });

  it('should call getPerformanceByLevel with filters', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.getPerformanceByLevel.mockResolvedValue([{ name: 'Primary', score: 80 }]);
    const result = await service.getPerformanceByLevel(filters);
    expect(mockRepository.getPerformanceByLevel).toHaveBeenCalledWith(filters);
    expect(result).toHaveLength(1);
  });

  it('should propagate errors from getPerformanceByLevel', async () => {
    mockRepository.getPerformanceByLevel.mockRejectedValue(new Error('PerformanceByLevel error'));
    await expect(service.getPerformanceByLevel()).rejects.toThrow('PerformanceByLevel error');
  });

  it('should call getPerformanceBySchool with filters', async () => {
    const filters = { dateFrom: '2025-01-01' };
    mockRepository.getPerformanceBySchool.mockResolvedValue([{ name: 'School A', score: 90 }]);
    const result = await service.getPerformanceBySchool(filters);
    expect(mockRepository.getPerformanceBySchool).toHaveBeenCalledWith(filters);
    expect(result).toHaveLength(1);
  });

  it('should propagate errors from getPerformanceBySchool', async () => {
    mockRepository.getPerformanceBySchool.mockRejectedValue(new Error('PerformanceBySchool error'));
    await expect(service.getPerformanceBySchool()).rejects.toThrow('PerformanceBySchool error');
  });

  it('should call getPerformanceByTeacher with filters', async () => {
    const filters = { schoolId: 'sch-1', dateTo: '2025-06-30' };
    mockRepository.getPerformanceByTeacher.mockResolvedValue([{ name: 'Mr. Smith', score: 92 }]);
    const result = await service.getPerformanceByTeacher(filters);
    expect(mockRepository.getPerformanceByTeacher).toHaveBeenCalledWith(filters);
    expect(result).toHaveLength(1);
  });

  it('should propagate errors from getPerformanceByTeacher', async () => {
    mockRepository.getPerformanceByTeacher.mockRejectedValue(new Error('PerformanceByTeacher error'));
    await expect(service.getPerformanceByTeacher()).rejects.toThrow('PerformanceByTeacher error');
  });

  it('should call getPerformanceByYear with filters', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.getPerformanceByYear.mockResolvedValue([{ name: '2025', score: 87 }]);
    const result = await service.getPerformanceByYear(filters);
    expect(mockRepository.getPerformanceByYear).toHaveBeenCalledWith(filters);
    expect(result).toHaveLength(1);
  });

  it('should propagate errors from getPerformanceByYear', async () => {
    mockRepository.getPerformanceByYear.mockRejectedValue(new Error('PerformanceByYear error'));
    await expect(service.getPerformanceByYear()).rejects.toThrow('PerformanceByYear error');
  });

  it('should call getSubjectDifficulty with filters', async () => {
    const filters = { schoolId: 'sch-1', dateFrom: '2025-01-01' };
    mockRepository.getSubjectDifficulty.mockResolvedValue([{ subject: 'Math', difficulty: 7.5 }]);
    const result = await service.getSubjectDifficulty(filters);
    expect(mockRepository.getSubjectDifficulty).toHaveBeenCalledWith(filters);
    expect(result).toHaveLength(1);
  });

  it('should propagate errors from getSubjectDifficulty', async () => {
    mockRepository.getSubjectDifficulty.mockRejectedValue(new Error('SubjectDifficulty error'));
    await expect(service.getSubjectDifficulty()).rejects.toThrow('SubjectDifficulty error');
  });

  it('should return empty array for getPerformanceByClass when no data', async () => {
    mockRepository.getPerformanceByClass.mockResolvedValue([]);
    const result = await service.getPerformanceByClass();
    expect(result).toEqual([]);
  });

  it('should return empty array for getPerformanceBySchool when no data', async () => {
    mockRepository.getPerformanceBySchool.mockResolvedValue([]);
    const result = await service.getPerformanceBySchool();
    expect(result).toEqual([]);
  });

  it('should get academic analytics with grade distribution', async () => {
    mockRepository.getAcademicAnalytics.mockResolvedValue({ gradeDistribution: { A: 25, B: 35, C: 20, D: 10, F: 10 } });
    const result = await service.getAcademicAnalytics();
    expect(result.gradeDistribution.A).toBe(25);
  });

  it('should get success rate by subject', async () => {
    mockRepository.getSuccessRate.mockResolvedValue({ bySubject: [{ subject: 'Math', rate: 82 }, { subject: 'Science', rate: 88 }] });
    const result = await service.getSuccessRate();
    expect(result.bySubject).toHaveLength(2);
  });

  it('should get grade evolution with semester comparison', async () => {
    mockRepository.getGradeEvolution.mockResolvedValue({ semesters: [{ name: 'Fall 2024', avg: 3.2 }, { name: 'Spring 2025', avg: 3.4 }] });
    const result = await service.getGradeEvolution();
    expect(result.semesters).toHaveLength(2);
  });

  it('should get attendance analytics with tardiness data', async () => {
    mockRepository.getAttendanceAnalytics.mockResolvedValue({ overallRate: 92, tardinessRate: 8.5, chronicAbsenteeism: 3.2 });
    const result = await service.getAttendanceAnalytics();
    expect(result.tardinessRate).toBe(8.5);
  });

  it('should get attendance analytics with monthly trend', async () => {
    mockRepository.getAttendanceAnalytics.mockResolvedValue({ overallRate: 92, monthlyTrend: [{ month: 'Jan', rate: 91 }, { month: 'Feb', rate: 93 }] });
    const result = await service.getAttendanceAnalytics();
    expect(result.monthlyTrend).toHaveLength(2);
  });

  it('should get performance by class with class sizes', async () => {
    mockRepository.getPerformanceByClass.mockResolvedValue([{ name: 'Class A', score: 85, size: 30 }, { name: 'Class B', score: 82, size: 28 }]);
    const result = await service.getPerformanceByClass();
    expect(result).toHaveLength(2);
    expect(result[0].size).toBe(30);
  });

  it('should get performance by level with student count', async () => {
    mockRepository.getPerformanceByLevel.mockResolvedValue([{ name: 'Primary', score: 80, count: 200 }, { name: 'Secondary', score: 78, count: 180 }]);
    const result = await service.getPerformanceByLevel();
    expect(result).toHaveLength(2);
  });

  it('should get performance by school with ranking', async () => {
    mockRepository.getPerformanceBySchool.mockResolvedValue([{ name: 'School A', score: 90, rank: 1 }, { name: 'School B', score: 85, rank: 2 }]);
    const result = await service.getPerformanceBySchool();
    expect(result).toHaveLength(2);
    expect(result[0].rank).toBe(1);
  });

  it('should get performance by teacher with student feedback', async () => {
    mockRepository.getPerformanceByTeacher.mockResolvedValue([{ name: 'Mr. Smith', score: 92, feedback: 4.5 }]);
    const result = await service.getPerformanceByTeacher();
    expect(result).toHaveLength(1);
    expect(result[0].feedback).toBe(4.5);
  });

  it('should get performance by year with year-over-year change', async () => {
    mockRepository.getPerformanceByYear.mockResolvedValue([{ name: '2025', score: 87, change: 3.2 }, { name: '2024', score: 84, change: 1.5 }]);
    const result = await service.getPerformanceByYear();
    expect(result).toHaveLength(2);
  });

  it('should get subject difficulty with student performance', async () => {
    mockRepository.getSubjectDifficulty.mockResolvedValue([{ subject: 'Math', difficulty: 7.5, avgScore: 72, passRate: 85 }]);
    const result = await service.getSubjectDifficulty();
    expect(result).toHaveLength(1);
    expect(result[0].passRate).toBe(85);
  });

  it('should get academic analytics with GPA distribution', async () => {
    mockRepository.getAcademicAnalytics.mockResolvedValue({ gpaDistribution: [{ range: '3.5-4.0', count: 120 }, { range: '3.0-3.4', count: 180 }, { range: '2.5-2.9', count: 80 }] });
    const result = await service.getAcademicAnalytics();
    expect(result.gpaDistribution).toHaveLength(3);
  });

  it('should get academic analytics with graduation projection', async () => {
    mockRepository.getAcademicAnalytics.mockResolvedValue({ graduationProjection: { onTrack: 450, atRisk: 50, dropout: 25 } });
    const result = await service.getAcademicAnalytics();
    expect(result.graduationProjection.onTrack).toBe(450);
  });

  it('should get success rate with target comparison', async () => {
    mockRepository.getSuccessRate.mockResolvedValue({ overall: 88, target: 85, achievement: 103.5 });
    const result = await service.getSuccessRate();
    expect(result.achievement).toBe(103.5);
  });

  it('should get grade evolution with improvement rate', async () => {
    mockRepository.getGradeEvolution.mockResolvedValue({ improvementRate: 5.2, trend: 'positive' });
    const result = await service.getGradeEvolution();
    expect(result.improvementRate).toBe(5.2);
  });

  it('should get attendance analytics with absence reasons', async () => {
    mockRepository.getAttendanceAnalytics.mockResolvedValue({ overallRate: 92, absenceReasons: [{ reason: 'Illness', percentage: 45 }, { reason: 'Family', percentage: 25 }] });
    const result = await service.getAttendanceAnalytics();
    expect(result.absenceReasons).toHaveLength(2);
  });

  it('should get performance by class with subject breakdown', async () => {
    mockRepository.getPerformanceByClass.mockResolvedValue([{ name: 'Class A', subjects: [{ name: 'Math', score: 85 }, { name: 'Science', score: 88 }] }]);
    const result = await service.getPerformanceByClass();
    expect(result[0].subjects).toHaveLength(2);
  });

  it('should get performance by level with historical data', async () => {
    mockRepository.getPerformanceByLevel.mockResolvedValue([{ name: 'Primary', score: 80, historical: [78, 79, 80] }]);
    const result = await service.getPerformanceByLevel();
    expect(result[0].historical).toHaveLength(3);
  });

  it('should get performance by school with district ranking', async () => {
    mockRepository.getPerformanceBySchool.mockResolvedValue([{ name: 'School A', score: 90, districtRank: 2 }]);
    const result = await service.getPerformanceBySchool();
    expect(result[0].districtRank).toBe(2);
  });

  it('should get performance by teacher with improvement metrics', async () => {
    mockRepository.getPerformanceByTeacher.mockResolvedValue([{ name: 'Mr. Smith', score: 92, improvement: 8.5, previousScore: 83.5 }]);
    const result = await service.getPerformanceByTeacher();
    expect(result[0].improvement).toBe(8.5);
  });

  it('should get performance by year with trend analysis', async () => {
    mockRepository.getPerformanceByYear.mockResolvedValue([{ name: '2025', score: 87, trend: 'improving', projections: { 2026: 89 } }]);
    const result = await service.getPerformanceByYear();
    expect(result[0].trend).toBe('improving');
  });

  it('should get subject difficulty with teacher feedback', async () => {
    mockRepository.getSubjectDifficulty.mockResolvedValue([{ subject: 'Math', difficulty: 7.5, teacherFeedback: 'Challenging but rewarding' }]);
    const result = await service.getSubjectDifficulty();
    expect(result[0].teacherFeedback).toBe('Challenging but rewarding');
  });

  it('should get academic analytics with retention data', async () => {
    mockRepository.getAcademicAnalytics.mockResolvedValue({ retention: { overall: 94, byGrade: { '9th': 96, '10th': 94, '11th': 92 } } });
    const result = await service.getAcademicAnalytics();
    expect(result.retention.overall).toBe(94);
  });

  it('should get academic analytics with parent engagement', async () => {
    mockRepository.getAcademicAnalytics.mockResolvedValue({ parentEngagement: { meetingAttendance: 0.65, portalUsage: 0.72 } });
    const result = await service.getAcademicAnalytics();
    expect(result.parentEngagement.meetingAttendance).toBe(0.65);
  });

  it('should get success rate with demographic breakdown', async () => {
    mockRepository.getSuccessRate.mockResolvedValue({ overall: 88, byDemographic: [{ group: 'Male', rate: 87 }, { group: 'Female', rate: 89 }] });
    const result = await service.getSuccessRate();
    expect(result.byDemographic).toHaveLength(2);
  });

  it('should get grade evolution with course-level data', async () => {
    mockRepository.getGradeEvolution.mockResolvedValue({ byCourse: [{ course: 'Algebra', avg: 3.2 }, { course: 'Biology', avg: 3.5 }] });
    const result = await service.getGradeEvolution();
    expect(result.byCourse).toHaveLength(2);
  });

  it('should get attendance analytics with intervention impact', async () => {
    mockRepository.getAttendanceAnalytics.mockResolvedValue({ overallRate: 92, interventionImpact: { before: 85, after: 92 } });
    const result = await service.getAttendanceAnalytics();
    expect(result.interventionImpact.before).toBe(85);
  });

  it('should get performance by class with teacher experience correlation', async () => {
    mockRepository.getPerformanceByClass.mockResolvedValue([{ name: 'Class A', score: 85, teacherExperience: 10 }]);
    const result = await service.getPerformanceByClass();
    expect(result[0].teacherExperience).toBe(10);
  });

  it('should get performance by level with resource allocation', async () => {
    mockRepository.getPerformanceByLevel.mockResolvedValue([{ name: 'Primary', score: 80, resources: { budget: 50000, students: 200 } }]);
    const result = await service.getPerformanceByLevel();
    expect(result[0].resources.budget).toBe(50000);
  });

  it('should get performance by school with extracurricular impact', async () => {
    mockRepository.getPerformanceBySchool.mockResolvedValue([{ name: 'School A', score: 90, extracurricular: { participation: 0.75, impact: 5.2 } }]);
    const result = await service.getPerformanceBySchool();
    expect(result[0].extracurricular.participation).toBe(0.75);
  });

  it('should get performance by teacher with professional development', async () => {
    mockRepository.getPerformanceByTeacher.mockResolvedValue([{ name: 'Mr. Smith', score: 92, pdHours: 45, certifications: 3 }]);
    const result = await service.getPerformanceByTeacher();
    expect(result[0].pdHours).toBe(45);
  });

  it('should get performance by year with curriculum changes impact', async () => {
    mockRepository.getPerformanceByYear.mockResolvedValue([{ name: '2025', score: 87, curriculumChange: true, impact: 4.5 }]);
    const result = await service.getPerformanceByYear();
    expect(result[0].curriculumChange).toBe(true);
  });

  it('should get subject difficulty with student engagement', async () => {
    mockRepository.getSubjectDifficulty.mockResolvedValue([{ subject: 'Math', difficulty: 7.5, engagement: 0.72, completionRate: 0.88 }]);
    const result = await service.getSubjectDifficulty();
    expect(result[0].engagement).toBe(0.72);
  });

  it('should get academic analytics with college readiness', async () => {
    mockRepository.getAcademicAnalytics.mockResolvedValue({ collegeReadiness: { satAvg: 1150, actAvg: 24, apEnrollment: 0.35 } });
    const result = await service.getAcademicAnalytics();
    expect(result.collegeReadiness.satAvg).toBe(1150);
  });

  it('should get academic analytics with special education metrics', async () => {
    mockRepository.getAcademicAnalytics.mockResolvedValue({ specialEducation: { totalStudents: 45, iepCompliance: 0.95, progressRate: 0.82 } });
    const result = await service.getAcademicAnalytics();
    expect(result.specialEducation.iepCompliance).toBe(0.95);
  });

  it('should get success rate with at-risk student data', async () => {
    mockRepository.getSuccessRate.mockResolvedValue({ overall: 88, atRisk: { count: 35, interventionRate: 0.72, successAfterIntervention: 0.65 } });
    const result = await service.getSuccessRate();
    expect(result.atRisk.count).toBe(35);
  });

  it('should get grade evolution with AP/IB performance', async () => {
    mockRepository.getGradeEvolution.mockResolvedValue({ advancedCourses: { ap: { enrollment: 120, passRate: 0.78 }, ib: { enrollment: 45, passRate: 0.82 } } });
    const result = await service.getGradeEvolution();
    expect(result.advancedCourses.ap.passRate).toBe(0.78);
  });

  it('should get attendance analytics with virtual learning', async () => {
    mockRepository.getAttendanceAnalytics.mockResolvedValue({ overallRate: 92, virtualLearning: { attendanceRate: 88, engagementRate: 0.75 } });
    const result = await service.getAttendanceAnalytics();
    expect(result.virtualLearning.attendanceRate).toBe(88);
  });

  it('should get performance by class with class size correlation', async () => {
    mockRepository.getPerformanceByClass.mockResolvedValue([{ name: 'Class A', score: 85, size: 30, correlation: -0.35 }]);
    const result = await service.getPerformanceByClass();
    expect(result[0].correlation).toBe(-0.35);
  });

  it('should get performance by level with funding impact', async () => {
    mockRepository.getPerformanceByLevel.mockResolvedValue([{ name: 'Primary', score: 80, fundingPerStudent: 8500 }]);
    const result = await service.getPerformanceByLevel();
    expect(result[0].fundingPerStudent).toBe(8500);
  });

  it('should get performance by school with technology integration', async () => {
    mockRepository.getPerformanceBySchool.mockResolvedValue([{ name: 'School A', score: 90, techIntegration: { devicesPerStudent: 0.8, digitalLiteracy: 78 } }]);
    const result = await service.getPerformanceBySchool();
    expect(result[0].techIntegration.devicesPerStudent).toBe(0.8);
  });

  it('should get performance by teacher with student satisfaction', async () => {
    mockRepository.getPerformanceByTeacher.mockResolvedValue([{ name: 'Mr. Smith', score: 92, studentSatisfaction: 4.3 }]);
    const result = await service.getPerformanceByTeacher();
    expect(result[0].studentSatisfaction).toBe(4.3);
  });

  it('should get performance by year with policy impact', async () => {
    mockRepository.getPerformanceByYear.mockResolvedValue([{ name: '2025', score: 87, policies: [{ name: 'Homework Policy', impact: 2.1 }] }]);
    const result = await service.getPerformanceByYear();
    expect(result[0].policies).toHaveLength(1);
  });

  it('should get subject difficulty with interdisciplinary connections', async () => {
    mockRepository.getSubjectDifficulty.mockResolvedValue([{ subject: 'Physics', difficulty: 8.2, connections: ['Math', 'Engineering'] }]);
    const result = await service.getSubjectDifficulty();
    expect(result[0].connections).toHaveLength(2);
  });

  it('should handle empty academic analytics gracefully', async () => {
    mockRepository.getAcademicAnalytics.mockResolvedValue({ gradeDistribution: {}, gpaDistribution: [] });
    const result = await service.getAcademicAnalytics();
    expect(Object.keys(result.gradeDistribution)).toHaveLength(0);
  });

  it('should handle empty success rate data', async () => {
    mockRepository.getSuccessRate.mockResolvedValue({ overall: 0, bySubject: [] });
    const result = await service.getSuccessRate();
    expect(result.overall).toBe(0);
  });

  it('should handle empty grade evolution data', async () => {
    mockRepository.getGradeEvolution.mockResolvedValue({ overall: [], semesters: [] });
    const result = await service.getGradeEvolution();
    expect(result.overall).toHaveLength(0);
  });

  it('should handle empty attendance analytics data', async () => {
    mockRepository.getAttendanceAnalytics.mockResolvedValue({ overallRate: 0, monthlyTrend: [] });
    const result = await service.getAttendanceAnalytics();
    expect(result.overallRate).toBe(0);
  });

  it('should handle empty subject difficulty data', async () => {
    mockRepository.getSubjectDifficulty.mockResolvedValue([]);
    const result = await service.getSubjectDifficulty();
    expect(result).toHaveLength(0);
  });
});
