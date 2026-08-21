import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createStudentAnalyticsService } from '../../src/features/analytics/services/student-analytics.service';

const mockRepository = {
  getStudentAnalytics: vi.fn(),
  getEnrollmentAnalytics: vi.fn(),
  getStudentAcademicAnalytics: vi.fn(),
  getDisciplineAnalytics: vi.fn(),
  getHealthAnalytics: vi.fn(),
  getStudentPaymentAnalytics: vi.fn(),
  getEngagementAnalytics: vi.fn(),
  getStudentRiskAnalytics: vi.fn(),
  getDropoutPrediction: vi.fn(),
};

describe('StudentAnalyticsService', () => {
  let service: ReturnType<typeof createStudentAnalyticsService>;

  beforeEach(() => {
    vi.clearAllMocks();
    service = createStudentAnalyticsService(mockRepository as any);
  });

  it('should call getStudentAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1', period: 'monthly' };
    mockRepository.getStudentAnalytics.mockResolvedValue({ enrollment: { total: 500 } });
    const result = await service.getStudentAnalytics(filters);
    expect(mockRepository.getStudentAnalytics).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ enrollment: { total: 500 } });
  });

  it('should call getStudentAnalytics without filters', async () => {
    mockRepository.getStudentAnalytics.mockResolvedValue({});
    await service.getStudentAnalytics();
    expect(mockRepository.getStudentAnalytics).toHaveBeenCalledWith(undefined);
  });

  it('should propagate errors from getStudentAnalytics', async () => {
    mockRepository.getStudentAnalytics.mockRejectedValue(new Error('Student error'));
    await expect(service.getStudentAnalytics()).rejects.toThrow('Student error');
  });

  it('should call getEnrollmentAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.getEnrollmentAnalytics.mockResolvedValue({ total: 520, new: 45 });
    const result = await service.getEnrollmentAnalytics(filters);
    expect(mockRepository.getEnrollmentAnalytics).toHaveBeenCalledWith(filters);
    expect(result.total).toBe(520);
    expect(result.new).toBe(45);
  });

  it('should propagate errors from getEnrollmentAnalytics', async () => {
    mockRepository.getEnrollmentAnalytics.mockRejectedValue(new Error('Enrollment error'));
    await expect(service.getEnrollmentAnalytics()).rejects.toThrow('Enrollment error');
  });

  it('should call getStudentAcademicAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1', dateFrom: '2025-01-01' };
    mockRepository.getStudentAcademicAnalytics.mockResolvedValue({ avgGPA: 3.2 });
    const result = await service.getStudentAcademicAnalytics(filters);
    expect(mockRepository.getStudentAcademicAnalytics).toHaveBeenCalledWith(filters);
    expect(result.avgGPA).toBe(3.2);
  });

  it('should propagate errors from getStudentAcademicAnalytics', async () => {
    mockRepository.getStudentAcademicAnalytics.mockRejectedValue(new Error('Academic error'));
    await expect(service.getStudentAcademicAnalytics()).rejects.toThrow('Academic error');
  });

  it('should call getDisciplineAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.getDisciplineAnalytics.mockResolvedValue({ totalIncidents: 25 });
    const result = await service.getDisciplineAnalytics(filters);
    expect(mockRepository.getDisciplineAnalytics).toHaveBeenCalledWith(filters);
    expect(result.totalIncidents).toBe(25);
  });

  it('should propagate errors from getDisciplineAnalytics', async () => {
    mockRepository.getDisciplineAnalytics.mockRejectedValue(new Error('Discipline error'));
    await expect(service.getDisciplineAnalytics()).rejects.toThrow('Discipline error');
  });

  it('should call getHealthAnalytics with filters', async () => {
    const filters = { dateTo: '2025-12-31' };
    mockRepository.getHealthAnalytics.mockResolvedValue({ vaccinationRate: 95.5 });
    const result = await service.getHealthAnalytics(filters);
    expect(mockRepository.getHealthAnalytics).toHaveBeenCalledWith(filters);
    expect(result.vaccinationRate).toBe(95.5);
  });

  it('should propagate errors from getHealthAnalytics', async () => {
    mockRepository.getHealthAnalytics.mockRejectedValue(new Error('Health error'));
    await expect(service.getHealthAnalytics()).rejects.toThrow('Health error');
  });

  it('should call getStudentPaymentAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.getStudentPaymentAnalytics.mockResolvedValue({ collectionRate: 88.2 });
    const result = await service.getStudentPaymentAnalytics(filters);
    expect(mockRepository.getStudentPaymentAnalytics).toHaveBeenCalledWith(filters);
    expect(result.collectionRate).toBe(88.2);
  });

  it('should propagate errors from getStudentPaymentAnalytics', async () => {
    mockRepository.getStudentPaymentAnalytics.mockRejectedValue(new Error('Payment error'));
    await expect(service.getStudentPaymentAnalytics()).rejects.toThrow('Payment error');
  });

  it('should call getEngagementAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.getEngagementAnalytics.mockResolvedValue({ activeUsers: 380 });
    const result = await service.getEngagementAnalytics(filters);
    expect(mockRepository.getEngagementAnalytics).toHaveBeenCalledWith(filters);
    expect(result.activeUsers).toBe(380);
  });

  it('should propagate errors from getEngagementAnalytics', async () => {
    mockRepository.getEngagementAnalytics.mockRejectedValue(new Error('Engagement error'));
    await expect(service.getEngagementAnalytics()).rejects.toThrow('Engagement error');
  });

  it('should call getStudentRiskAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.getStudentRiskAnalytics.mockResolvedValue({ atRiskCount: 15 });
    const result = await service.getStudentRiskAnalytics(filters);
    expect(mockRepository.getStudentRiskAnalytics).toHaveBeenCalledWith(filters);
    expect(result.atRiskCount).toBe(15);
  });

  it('should propagate errors from getStudentRiskAnalytics', async () => {
    mockRepository.getStudentRiskAnalytics.mockRejectedValue(new Error('Risk error'));
    await expect(service.getStudentRiskAnalytics()).rejects.toThrow('Risk error');
  });

  it('should call getDropoutPrediction with filters', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.getDropoutPrediction.mockResolvedValue({ predictedDropouts: 8 });
    const result = await service.getDropoutPrediction(filters);
    expect(mockRepository.getDropoutPrediction).toHaveBeenCalledWith(filters);
    expect(result.predictedDropouts).toBe(8);
  });

  it('should propagate errors from getDropoutPrediction', async () => {
    mockRepository.getDropoutPrediction.mockRejectedValue(new Error('Dropout error'));
    await expect(service.getDropoutPrediction()).rejects.toThrow('Dropout error');
  });

  it('should return enrollment with retention rate', async () => {
    mockRepository.getEnrollmentAnalytics.mockResolvedValue({ total: 500, retentionRate: 92.5 });
    const result = await service.getEnrollmentAnalytics();
    expect(result.retentionRate).toBe(92.5);
  });

  it('should return discipline with incident breakdown', async () => {
    mockRepository.getDisciplineAnalytics.mockResolvedValue({ totalIncidents: 30, resolvedIncidents: 25, byType: [{ type: 'Tardiness', count: 15 }] });
    const result = await service.getDisciplineAnalytics();
    expect(result.resolvedIncidents).toBe(25);
    expect(result.byType).toHaveLength(1);
  });

  it('should return health analytics with health issues count', async () => {
    mockRepository.getHealthAnalytics.mockResolvedValue({ totalRecords: 500, healthIssues: 12, vaccinationRate: 97 });
    const result = await service.getHealthAnalytics();
    expect(result.healthIssues).toBe(12);
  });

  it('should return dropout prediction with factors', async () => {
    mockRepository.getDropoutPrediction.mockResolvedValue({ predictedDropouts: 5, confidence: 0.78, factors: [{ name: 'Attendance', weight: 0.4 }] });
    const result = await service.getDropoutPrediction();
    expect(result.factors).toHaveLength(1);
    expect(result.confidence).toBe(0.78);
  });

  it('should return risk analytics with risk distribution', async () => {
    mockRepository.getStudentRiskAnalytics.mockResolvedValue({ atRiskCount: 20, riskDistribution: [{ level: 'low', count: 10 }, { level: 'high', count: 10 }] });
    const result = await service.getStudentRiskAnalytics();
    expect(result.riskDistribution).toHaveLength(2);
  });

  it('should return engagement with session duration', async () => {
    mockRepository.getEngagementAnalytics.mockResolvedValue({ avgLoginFrequency: 5.2, avgSessionDuration: 25.5, activeUsers: 400 });
    const result = await service.getEngagementAnalytics();
    expect(result.avgSessionDuration).toBe(25.5);
  });

  it('should return payment analytics with outstanding amount', async () => {
    mockRepository.getStudentPaymentAnalytics.mockResolvedValue({ totalDue: 500000, totalPaid: 420000, outstanding: 80000 });
    const result = await service.getStudentPaymentAnalytics();
    expect(result.outstanding).toBe(80000);
  });

  it('should get student analytics with demographic breakdown', async () => {
    mockRepository.getStudentAnalytics.mockResolvedValue({ demographics: { gender: { male: 260, female: 240 }, ethnicity: { majority: 350, minority: 150 } } });
    const result = await service.getStudentAnalytics();
    expect(result.demographics.gender.male).toBe(260);
  });

  it('should get enrollment analytics with grade level breakdown', async () => {
    mockRepository.getEnrollmentAnalytics.mockResolvedValue({ total: 520, byGrade: [{ grade: '9th', count: 150 }, { grade: '10th', count: 145 }, { grade: '11th', count: 130 }, { grade: '12th', count: 95 }] });
    const result = await service.getEnrollmentAnalytics();
    expect(result.byGrade).toHaveLength(4);
  });

  it('should get enrollment analytics with transfer data', async () => {
    mockRepository.getEnrollmentAnalytics.mockResolvedValue({ total: 520, transfers: { in: 15, out: 8, net: 7 } });
    const result = await service.getEnrollmentAnalytics();
    expect(result.transfers.net).toBe(7);
  });

  it('should get academic analytics with GPA distribution', async () => {
    mockRepository.getStudentAcademicAnalytics.mockResolvedValue({ avgGPA: 3.2, distribution: [{ range: '3.5-4.0', count: 120 }, { range: '3.0-3.4', count: 180 }, { range: '2.5-2.9', count: 100 }] });
    const result = await service.getStudentAcademicAnalytics();
    expect(result.distribution).toHaveLength(3);
  });

  it('should get academic analytics with course completion', async () => {
    mockRepository.getStudentAcademicAnalytics.mockResolvedValue({ avgGPA: 3.2, courseCompletion: { total: 1200, completed: 1100, rate: 0.92 } });
    const result = await service.getStudentAcademicAnalytics();
    expect(result.courseCompletion.rate).toBe(0.92);
  });

  it('should get discipline analytics with incident trends', async () => {
    mockRepository.getDisciplineAnalytics.mockResolvedValue({ totalIncidents: 25, monthlyTrend: [{ month: 'Jan', count: 5 }, { month: 'Feb', count: 3 }, { month: 'Mar', count: 8 }] });
    const result = await service.getDisciplineAnalytics();
    expect(result.monthlyTrend).toHaveLength(3);
  });

  it('should get discipline analytics with resolution rate', async () => {
    mockRepository.getDisciplineAnalytics.mockResolvedValue({ totalIncidents: 25, resolved: 22, resolutionRate: 0.88, avgResolutionDays: 3.5 });
    const result = await service.getDisciplineAnalytics();
    expect(result.resolutionRate).toBe(0.88);
  });

  it('should get health analytics with screening data', async () => {
    mockRepository.getHealthAnalytics.mockResolvedValue({ vaccinationRate: 95.5, screenings: { vision: 480, hearing: 475, dental: 460 } });
    const result = await service.getHealthAnalytics();
    expect(result.screenings.vision).toBe(480);
  });

  it('should get health analytics with nurse visits', async () => {
    mockRepository.getHealthAnalytics.mockResolvedValue({ vaccinationRate: 95.5, nurseVisits: { total: 850, avgPerStudent: 1.7, commonReasons: ['Cold', 'Allergy', 'Injury'] } });
    const result = await service.getHealthAnalytics();
    expect(result.nurseVisits.total).toBe(850);
  });

  it('should get payment analytics by grade level', async () => {
    mockRepository.getStudentPaymentAnalytics.mockResolvedValue({ collectionRate: 88.2, byGrade: [{ grade: '9th', rate: 90 }, { grade: '10th', rate: 88 }, { grade: '11th', rate: 87 }, { grade: '12th', rate: 85 }] });
    const result = await service.getStudentPaymentAnalytics();
    expect(result.byGrade).toHaveLength(4);
  });

  it('should get payment analytics with payment methods', async () => {
    mockRepository.getStudentPaymentAnalytics.mockResolvedValue({ collectionRate: 88.2, byMethod: [{ method: 'Online', percentage: 65 }, { method: 'Cash', percentage: 20 }, { method: 'Check', percentage: 15 }] });
    const result = await service.getStudentPaymentAnalytics();
    expect(result.byMethod).toHaveLength(3);
  });

  it('should get engagement analytics with platform usage', async () => {
    mockRepository.getEngagementAnalytics.mockResolvedValue({ activeUsers: 380, platforms: { mobile: 250, desktop: 120, tablet: 10 } });
    const result = await service.getEngagementAnalytics();
    expect(result.platforms.mobile).toBe(250);
  });

  it('should get engagement analytics with feature usage', async () => {
    mockRepository.getEngagementAnalytics.mockResolvedValue({ activeUsers: 380, features: [{ name: 'Grades', usage: 0.92 }, { name: 'Attendance', usage: 0.85 }, { name: 'Messages', usage: 0.65 }] });
    const result = await service.getEngagementAnalytics();
    expect(result.features).toHaveLength(3);
  });

  it('should get risk analytics with risk factors', async () => {
    mockRepository.getStudentRiskAnalytics.mockResolvedValue({ atRiskCount: 15, factors: [{ factor: 'Low Attendance', weight: 0.4 }, { factor: 'Poor Grades', weight: 0.35 }] });
    const result = await service.getStudentRiskAnalytics();
    expect(result.factors).toHaveLength(2);
  });

  it('should get risk analytics with intervention data', async () => {
    mockRepository.getStudentRiskAnalytics.mockResolvedValue({ atRiskCount: 15, interventions: { total: 25, successful: 18, rate: 0.72 } });
    const result = await service.getStudentRiskAnalytics();
    expect(result.interventions.rate).toBe(0.72);
  });

  it('should get dropout prediction with early warning indicators', async () => {
    mockRepository.getDropoutPrediction.mockResolvedValue({ predictedDropouts: 8, indicators: [{ name: 'Attendance Drop', severity: 'high' }, { name: 'Grade Decline', severity: 'medium' }] });
    const result = await service.getDropoutPrediction();
    expect(result.indicators).toHaveLength(2);
  });

  it('should get dropout prediction with historical accuracy', async () => {
    mockRepository.getDropoutPrediction.mockResolvedValue({ predictedDropouts: 8, historicalAccuracy: 0.82, falsePositives: 3, falseNegatives: 2 });
    const result = await service.getDropoutPrediction();
    expect(result.historicalAccuracy).toBe(0.82);
  });

  it('should get student analytics with attendance correlation', async () => {
    mockRepository.getStudentAnalytics.mockResolvedValue({ attendanceGpaCorrelation: 0.72, attendanceGraduationCorrelation: 0.85 });
    const result = await service.getStudentAnalytics();
    expect(result.attendanceGpaCorrelation).toBe(0.72);
  });

  it('should get student analytics with special programs', async () => {
    mockRepository.getStudentAnalytics.mockResolvedValue({ specialPrograms: { gifted: 45, specialEd: 35, esl: 25, total: 105 } });
    const result = await service.getStudentAnalytics();
    expect(result.specialPrograms.gifted).toBe(45);
  });

  it('should get enrollment analytics with waitlist data', async () => {
    mockRepository.getEnrollmentAnalytics.mockResolvedValue({ total: 520, waitlist: { count: 35, avgWaitTime: 15, conversionRate: 0.65 } });
    const result = await service.getEnrollmentAnalytics();
    expect(result.waitlist.count).toBe(35);
  });

  it('should get enrollment analytics with capacity utilization', async () => {
    mockRepository.getEnrollmentAnalytics.mockResolvedValue({ total: 520, capacity: 600, utilization: 0.87, available: 80 });
    const result = await service.getEnrollmentAnalytics();
    expect(result.utilization).toBe(0.87);
  });

  it('should get academic analytics with subject performance', async () => {
    mockRepository.getStudentAcademicAnalytics.mockResolvedValue({ avgGPA: 3.2, bySubject: [{ subject: 'Math', avg: 3.0 }, { subject: 'Science', avg: 3.3 }, { subject: 'English', avg: 3.5 }] });
    const result = await service.getStudentAcademicAnalytics();
    expect(result.bySubject).toHaveLength(3);
  });

  it('should get academic analytics with honor roll data', async () => {
    mockRepository.getStudentAcademicAnalytics.mockResolvedValue({ avgGPA: 3.2, honorRoll: { count: 120, percentage: 0.24, avgGPA: 3.7 } });
    const result = await service.getStudentAcademicAnalytics();
    expect(result.honorRoll.count).toBe(120);
  });

  it('should get discipline analytics with behavior patterns', async () => {
    mockRepository.getDisciplineAnalytics.mockResolvedValue({ totalIncidents: 25, patterns: { peakDay: 'Monday', peakTime: 'After Lunch', repeatOffenders: 8 } });
    const result = await service.getDisciplineAnalytics();
    expect(result.patterns.peakDay).toBe('Monday');
  });

  it('should get discipline analytics with restorative justice data', async () => {
    mockRepository.getDisciplineAnalytics.mockResolvedValue({ totalIncidents: 25, restorativeJustice: { cases: 15, successRate: 0.8, avgSatisfaction: 4.2 } });
    const result = await service.getDisciplineAnalytics();
    expect(result.restorativeJustice.successRate).toBe(0.8);
  });

  it('should get health analytics with BMI data', async () => {
    mockRepository.getHealthAnalytics.mockResolvedValue({ vaccinationRate: 95.5, bmi: { underweight: 0.05, normal: 0.70, overweight: 0.20, obese: 0.05 } });
    const result = await service.getHealthAnalytics();
    expect(result.bmi.normal).toBe(0.70);
  });

  it('should get health analytics with mental health data', async () => {
    mockRepository.getHealthAnalytics.mockResolvedValue({ vaccinationRate: 95.5, mentalHealth: { referrals: 45, counseling: 85, crisis: 5 } });
    const result = await service.getHealthAnalytics();
    expect(result.mentalHealth.referrals).toBe(45);
  });

  it('should get payment analytics with scholarship impact', async () => {
    mockRepository.getStudentPaymentAnalytics.mockResolvedValue({ collectionRate: 88.2, scholarships: { total: 50000, recipients: 45, avgAward: 1111 } });
    const result = await service.getStudentPaymentAnalytics();
    expect(result.scholarships.total).toBe(50000);
  });

  it('should get payment analytics with financial aid', async () => {
    mockRepository.getStudentPaymentAnalytics.mockResolvedValue({ collectionRate: 88.2, financialAid: { total: 120000, recipients: 180, avgGrant: 667 } });
    const result = await service.getStudentPaymentAnalytics();
    expect(result.financialAid.total).toBe(120000);
  });

  it('should get engagement analytics with after-school participation', async () => {
    mockRepository.getEngagementAnalytics.mockResolvedValue({ activeUsers: 380, afterSchool: { clubs: 120, sports: 150, arts: 80, total: 350 } });
    const result = await service.getEngagementAnalytics();
    expect(result.afterSchool.total).toBe(350);
  });

  it('should get engagement analytics with volunteer hours', async () => {
    mockRepository.getEngagementAnalytics.mockResolvedValue({ activeUsers: 380, volunteering: { hours: 2500, students: 120, avgHours: 20.8 } });
    const result = await service.getEngagementAnalytics();
    expect(result.volunteering.hours).toBe(2500);
  });

  it('should get risk analytics with peer comparison', async () => {
    mockRepository.getStudentRiskAnalytics.mockResolvedValue({ atRiskCount: 15, peerComparison: { aboveAverage: 280, average: 150, belowAverage: 70 } });
    const result = await service.getStudentRiskAnalytics();
    expect(result.peerComparison.aboveAverage).toBe(280);
  });

  it('should get risk analytics with attendance risk correlation', async () => {
    mockRepository.getStudentRiskAnalytics.mockResolvedValue({ atRiskCount: 15, attendanceCorrelation: { below80: 25, between80_90: 45, above90: 430 } });
    const result = await service.getStudentRiskAnalytics();
    expect(result.attendanceCorrelation.below80).toBe(25);
  });

  it('should get dropout prediction with protective factors', async () => {
    mockRepository.getDropoutPrediction.mockResolvedValue({ predictedDropouts: 8, protectiveFactors: [{ factor: 'Family Support', impact: 0.3 }, { factor: 'School Belonging', impact: 0.25 }] });
    const result = await service.getDropoutPrediction();
    expect(result.protectiveFactors).toHaveLength(2);
  });

  it('should get dropout prediction with graduation pathway', async () => {
    mockRepository.getDropoutPrediction.mockResolvedValue({ predictedDropouts: 8, pathways: { traditional: 420, alternative: 50, adultEd: 15, dropped: 15 } });
    const result = await service.getDropoutPrediction();
    expect(result.pathways.traditional).toBe(420);
  });

  it('should get student analytics with parent involvement', async () => {
    mockRepository.getStudentAnalytics.mockResolvedValue({ parentInvolvement: { meetingAttendance: 0.65, volunteerHours: 2500, communicationRate: 0.78 } });
    const result = await service.getStudentAnalytics();
    expect(result.parentInvolvement.meetingAttendance).toBe(0.65);
  });

  it('should get student analytics with technology access', async () => {
    mockRepository.getStudentAnalytics.mockResolvedValue({ technologyAccess: { devices: 0.85, internet: 0.92, digitalLiteracy: 0.78 } });
    const result = await service.getStudentAnalytics();
    expect(result.technologyAccess.devices).toBe(0.85);
  });

  it('should get enrollment analytics with demographic trends', async () => {
    mockRepository.getEnrollmentAnalytics.mockResolvedValue({ total: 520, demographics: { gender: { male: 260, female: 260 }, diversity: 0.62 } });
    const result = await service.getEnrollmentAnalytics();
    expect(result.demographics.diversity).toBe(0.62);
  });

  it('should get enrollment analytics with geographic data', async () => {
    mockRepository.getEnrollmentAnalytics.mockResolvedValue({ total: 520, geography: { inDistrict: 400, outOfDistrict: 100, international: 20 } });
    const result = await service.getEnrollmentAnalytics();
    expect(result.geography.inDistrict).toBe(400);
  });

  it('should get academic analytics with class size impact', async () => {
    mockRepository.getStudentAcademicAnalytics.mockResolvedValue({ avgGPA: 3.2, classSizeImpact: { small: 3.5, medium: 3.2, large: 2.9 } });
    const result = await service.getStudentAcademicAnalytics();
    expect(result.classSizeImpact.small).toBe(3.5);
  });

  it('should get academic analytics with teacher effectiveness', async () => {
    mockRepository.getStudentAcademicAnalytics.mockResolvedValue({ avgGPA: 3.2, teacherEffectiveness: { correlation: 0.65, avgScore: 3.3, variance: 0.2 } });
    const result = await service.getStudentAcademicAnalytics();
    expect(result.teacherEffectiveness.correlation).toBe(0.65);
  });

  it('should get discipline analytics with attendance correlation', async () => {
    mockRepository.getDisciplineAnalytics.mockResolvedValue({ totalIncidents: 25, attendanceCorrelation: 0.45, gradeCorrelation: -0.35 });
    const result = await service.getDisciplineAnalytics();
    expect(result.attendanceCorrelation).toBe(0.45);
  });

  it('should get health analytics with immunization compliance', async () => {
    mockRepository.getHealthAnalytics.mockResolvedValue({ vaccinationRate: 95.5, immunization: { compliant: 480, nonCompliant: 15, exemptions: 5 } });
    const result = await service.getHealthAnalytics();
    expect(result.immunization.compliant).toBe(480);
  });

  it('should get payment analytics with collection trends', async () => {
    mockRepository.getStudentPaymentAnalytics.mockResolvedValue({ collectionRate: 88.2, trends: [{ month: 'Jan', rate: 85 }, { month: 'Feb', rate: 87 }, { month: 'Mar', rate: 88 }] });
    const result = await service.getStudentPaymentAnalytics();
    expect(result.trends).toHaveLength(3);
  });

  it('should get engagement analytics with library usage', async () => {
    mockRepository.getEngagementAnalytics.mockResolvedValue({ activeUsers: 380, library: { checkouts: 2500, digitalAccess: 1800, avgPerStudent: 8.6 } });
    const result = await service.getEngagementAnalytics();
    expect(result.library.checkouts).toBe(2500);
  });

  it('should get risk analytics with support services', async () => {
    mockRepository.getStudentRiskAnalytics.mockResolvedValue({ atRiskCount: 15, supportServices: { tutoring: 45, counseling: 35, mentoring: 25 } });
    const result = await service.getStudentRiskAnalytics();
    expect(result.supportServices.tutoring).toBe(45);
  });

  it('should get dropout prediction with community factors', async () => {
    mockRepository.getDropoutPrediction.mockResolvedValue({ predictedDropouts: 8, communityFactors: { poverty: 0.35, singleParent: 0.25, neighborhoodRisk: 0.2 } });
    const result = await service.getDropoutPrediction();
    expect(result.communityFactors.poverty).toBe(0.35);
  });

  it('should handle empty student analytics', async () => {
    mockRepository.getStudentAnalytics.mockResolvedValue({ enrollment: {}, academic: {}, discipline: {} });
    const result = await service.getStudentAnalytics();
    expect(Object.keys(result.enrollment)).toHaveLength(0);
  });

  it('should handle zero enrollment', async () => {
    mockRepository.getEnrollmentAnalytics.mockResolvedValue({ total: 0, new: 0, transfers: { in: 0, out: 0, net: 0 } });
    const result = await service.getEnrollmentAnalytics();
    expect(result.total).toBe(0);
  });

  it('should handle zero GPA', async () => {
    mockRepository.getStudentAcademicAnalytics.mockResolvedValue({ avgGPA: 0, distribution: [] });
    const result = await service.getStudentAcademicAnalytics();
    expect(result.avgGPA).toBe(0);
  });

  it('should handle zero incidents', async () => {
    mockRepository.getDisciplineAnalytics.mockResolvedValue({ totalIncidents: 0, resolved: 0, byType: [] });
    const result = await service.getDisciplineAnalytics();
    expect(result.totalIncidents).toBe(0);
  });

  it('should handle zero at-risk students', async () => {
    mockRepository.getStudentRiskAnalytics.mockResolvedValue({ atRiskCount: 0, factors: [], interventions: { total: 0, successful: 0 } });
    const result = await service.getStudentRiskAnalytics();
    expect(result.atRiskCount).toBe(0);
  });

  it('should handle full student analytics structure', async () => {
    mockRepository.getStudentAnalytics.mockResolvedValue({ enrollment: {}, academic: {}, discipline: {}, health: {}, payments: {}, engagement: {}, risk: {}, dropout: {} });
    const result = await service.getStudentAnalytics();
    expect(result).toHaveProperty('enrollment');
    expect(result).toHaveProperty('academic');
    expect(result).toHaveProperty('discipline');
    expect(result).toHaveProperty('health');
    expect(result).toHaveProperty('payments');
    expect(result).toHaveProperty('engagement');
    expect(result).toHaveProperty('risk');
    expect(result).toHaveProperty('dropout');
  });
});
