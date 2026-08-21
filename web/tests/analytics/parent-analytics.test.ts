import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createParentAnalyticsService } from '../../src/features/analytics/services/parent-analytics.service';

const mockRepository = {
  getParentAnalytics: vi.fn(),
  getParentPaymentAnalytics: vi.fn(),
  getParentEngagementAnalytics: vi.fn(),
  getParentCommunicationAnalytics: vi.fn(),
  getParentSatisfactionAnalytics: vi.fn(),
};

describe('ParentAnalyticsService', () => {
  let service: ReturnType<typeof createParentAnalyticsService>;

  beforeEach(() => {
    vi.clearAllMocks();
    service = createParentAnalyticsService(mockRepository as any);
  });

  it('should call getParentAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1', period: 'monthly' };
    mockRepository.getParentAnalytics.mockResolvedValue({ payments: { totalPaid: 100000 } });
    const result = await service.getParentAnalytics(filters);
    expect(mockRepository.getParentAnalytics).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ payments: { totalPaid: 100000 } });
  });

  it('should call getParentAnalytics without filters', async () => {
    mockRepository.getParentAnalytics.mockResolvedValue({});
    await service.getParentAnalytics();
    expect(mockRepository.getParentAnalytics).toHaveBeenCalledWith(undefined);
  });

  it('should propagate errors from getParentAnalytics', async () => {
    mockRepository.getParentAnalytics.mockRejectedValue(new Error('Parent error'));
    await expect(service.getParentAnalytics()).rejects.toThrow('Parent error');
  });

  it('should call getParentPaymentAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1', dateFrom: '2025-01-01' };
    mockRepository.getParentPaymentAnalytics.mockResolvedValue({ totalPaid: 85000 });
    const result = await service.getParentPaymentAnalytics(filters);
    expect(mockRepository.getParentPaymentAnalytics).toHaveBeenCalledWith(filters);
    expect(result.totalPaid).toBe(85000);
  });

  it('should propagate errors from getParentPaymentAnalytics', async () => {
    mockRepository.getParentPaymentAnalytics.mockRejectedValue(new Error('Payment error'));
    await expect(service.getParentPaymentAnalytics()).rejects.toThrow('Payment error');
  });

  it('should call getParentEngagementAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.getParentEngagementAnalytics.mockResolvedValue({ activeRate: 72.5 });
    const result = await service.getParentEngagementAnalytics(filters);
    expect(mockRepository.getParentEngagementAnalytics).toHaveBeenCalledWith(filters);
    expect(result.activeRate).toBe(72.5);
  });

  it('should propagate errors from getParentEngagementAnalytics', async () => {
    mockRepository.getParentEngagementAnalytics.mockRejectedValue(new Error('Engagement error'));
    await expect(service.getParentEngagementAnalytics()).rejects.toThrow('Engagement error');
  });

  it('should call getParentCommunicationAnalytics with filters', async () => {
    const filters = { dateTo: '2025-12-31' };
    mockRepository.getParentCommunicationAnalytics.mockResolvedValue({ readRate: 88.3 });
    const result = await service.getParentCommunicationAnalytics(filters);
    expect(mockRepository.getParentCommunicationAnalytics).toHaveBeenCalledWith(filters);
    expect(result.readRate).toBe(88.3);
  });

  it('should propagate errors from getParentCommunicationAnalytics', async () => {
    mockRepository.getParentCommunicationAnalytics.mockRejectedValue(new Error('Communication error'));
    await expect(service.getParentCommunicationAnalytics()).rejects.toThrow('Communication error');
  });

  it('should call getParentSatisfactionAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.getParentSatisfactionAnalytics.mockResolvedValue({ avgScore: 4.3 });
    const result = await service.getParentSatisfactionAnalytics(filters);
    expect(mockRepository.getParentSatisfactionAnalytics).toHaveBeenCalledWith(filters);
    expect(result.avgScore).toBe(4.3);
  });

  it('should propagate errors from getParentSatisfactionAnalytics', async () => {
    mockRepository.getParentSatisfactionAnalytics.mockRejectedValue(new Error('Satisfaction error'));
    await expect(service.getParentSatisfactionAnalytics()).rejects.toThrow('Satisfaction error');
  });

  it('should return payment analytics with on-time rate', async () => {
    mockRepository.getParentPaymentAnalytics.mockResolvedValue({ totalPaid: 90000, avgPaymentTime: 5.2, onTimeRate: 82.5 });
    const result = await service.getParentPaymentAnalytics();
    expect(result.onTimeRate).toBe(82.5);
  });

  it('should return engagement with feature usage', async () => {
    mockRepository.getParentEngagementAnalytics.mockResolvedValue({ appUsage: 45.2, loginFrequency: 3.5, featureUsage: [{ feature: 'Grades', usage: 80 }], activeRate: 70 });
    const result = await service.getParentEngagementAnalytics();
    expect(result.featureUsage).toHaveLength(1);
  });

  it('should return communication with channel breakdown', async () => {
    mockRepository.getParentCommunicationAnalytics.mockResolvedValue({ messagesSent: 1500, messagesRead: 1200, readRate: 80, byChannel: [{ channel: 'email', count: 800 }], avgResponseTime: 2.5 });
    const result = await service.getParentCommunicationAnalytics();
    expect(result.byChannel).toHaveLength(1);
    expect(result.avgResponseTime).toBe(2.5);
  });

  it('should return satisfaction with NPS score', async () => {
    mockRepository.getParentSatisfactionAnalytics.mockResolvedValue({ avgScore: 4.2, nps: 65, distribution: [], feedback: [] });
    const result = await service.getParentSatisfactionAnalytics();
    expect(result.nps).toBe(65);
  });

  it('should return payment with byParent breakdown', async () => {
    mockRepository.getParentPaymentAnalytics.mockResolvedValue({ totalPaid: 100000, byParent: [{ parent: 'Parent A', paid: 5000 }] });
    const result = await service.getParentPaymentAnalytics();
    expect(result.byParent).toHaveLength(1);
  });

  it('should return satisfaction with feedback data', async () => {
    mockRepository.getParentSatisfactionAnalytics.mockResolvedValue({ avgScore: 4.0, feedback: [{ comment: 'Great school', rating: 5 }], nps: 50, distribution: [] });
    const result = await service.getParentSatisfactionAnalytics();
    expect(result.feedback).toHaveLength(1);
  });

  it('should handle zero paid amount', async () => {
    mockRepository.getParentPaymentAnalytics.mockResolvedValue({ totalPaid: 0, avgPaymentTime: 0, onTimeRate: 0 });
    const result = await service.getParentPaymentAnalytics();
    expect(result.totalPaid).toBe(0);
  });

  it('should handle empty communication data', async () => {
    mockRepository.getParentCommunicationAnalytics.mockResolvedValue({ messagesSent: 0, messagesRead: 0, readRate: 0, avgResponseTime: 0, byChannel: [] });
    const result = await service.getParentCommunicationAnalytics();
    expect(result.messagesSent).toBe(0);
  });

  it('should return full parent analytics structure', async () => {
    mockRepository.getParentAnalytics.mockResolvedValue({
      payments: { totalPaid: 80000 },
      engagement: { activeRate: 70 },
      communication: { readRate: 85 },
      satisfaction: { avgScore: 4.1 },
    });
    const result = await service.getParentAnalytics();
    expect(result).toHaveProperty('payments');
    expect(result).toHaveProperty('engagement');
    expect(result).toHaveProperty('communication');
    expect(result).toHaveProperty('satisfaction');
  });

  it('should handle engagement with zero active rate', async () => {
    mockRepository.getParentEngagementAnalytics.mockResolvedValue({ appUsage: 0, loginFrequency: 0, activeRate: 0 });
    const result = await service.getParentEngagementAnalytics();
    expect(result.activeRate).toBe(0);
  });

  it('should handle satisfaction with distribution data', async () => {
    mockRepository.getParentSatisfactionAnalytics.mockResolvedValue({ avgScore: 3.8, distribution: [{ score: 5, count: 100 }, { score: 4, count: 200 }], nps: 40, feedback: [] });
    const result = await service.getParentSatisfactionAnalytics();
    expect(result.distribution).toHaveLength(2);
  });

  it('should get parent analytics with school selection', async () => {
    mockRepository.getParentAnalytics.mockResolvedValue({ schoolId: 'sch-1', parentCount: 400 });
    const result = await service.getParentAnalytics({ schoolId: 'sch-1' });
    expect(result.schoolId).toBe('sch-1');
  });

  it('should get payment analytics with installment data', async () => {
    mockRepository.getParentPaymentAnalytics.mockResolvedValue({ totalPaid: 85000, installmentPlans: { active: 120, totalValue: 180000 } });
    const result = await service.getParentPaymentAnalytics();
    expect(result.installmentPlans.active).toBe(120);
  });

  it('should get payment analytics with late payment analysis', async () => {
    mockRepository.getParentPaymentAnalytics.mockResolvedValue({ totalPaid: 85000, latePayments: { count: 45, totalFees: 2250, avgDaysLate: 8.5 } });
    const result = await service.getParentPaymentAnalytics();
    expect(result.latePayments.count).toBe(45);
  });

  it('should get engagement analytics with app features', async () => {
    mockRepository.getParentEngagementAnalytics.mockResolvedValue({ activeRate: 72.5, features: { grades: 0.92, messages: 0.85, payments: 0.78, calendar: 0.65 } });
    const result = await service.getParentEngagementAnalytics();
    expect(result.features.grades).toBe(0.92);
  });

  it('should get engagement analytics with device usage', async () => {
    mockRepository.getParentEngagementAnalytics.mockResolvedValue({ activeRate: 72.5, devices: { mobile: 0.65, desktop: 0.30, tablet: 0.05 } });
    const result = await service.getParentEngagementAnalytics();
    expect(result.devices.mobile).toBe(0.65);
  });

  it('should get communication analytics with response time', async () => {
    mockRepository.getParentCommunicationAnalytics.mockResolvedValue({ readRate: 88.3, responseTime: { avg: 4.5, median: 2.5, within24h: 0.85 } });
    const result = await service.getParentCommunicationAnalytics();
    expect(result.responseTime.avg).toBe(4.5);
  });

  it('should get communication analytics with language preferences', async () => {
    mockRepository.getParentCommunicationAnalytics.mockResolvedValue({ readRate: 88.3, languages: { english: 0.75, spanish: 0.15, other: 0.10 } });
    const result = await service.getParentCommunicationAnalytics();
    expect(result.languages.english).toBe(0.75);
  });

  it('should get satisfaction analytics with improvement areas', async () => {
    mockRepository.getParentSatisfactionAnalytics.mockResolvedValue({ avgScore: 4.3, improvements: [{ area: 'Communication', score: 3.8 }, { area: 'Facilities', score: 4.0 }] });
    const result = await service.getParentSatisfactionAnalytics();
    expect(result.improvements).toHaveLength(2);
  });

  it('should get satisfaction analytics with parent demographics', async () => {
    mockRepository.getParentSatisfactionAnalytics.mockResolvedValue({ avgScore: 4.3, demographics: { firstTime: 0.35, multiChild: 0.25 } });
    const result = await service.getParentSatisfactionAnalytics();
    expect(result.demographics.firstTime).toBe(0.35);
  });

  it('should get parent analytics with involvement score', async () => {
    mockRepository.getParentAnalytics.mockResolvedValue({ involvementScore: 72.5, participationRate: 0.68, volunteerHours: 2500 });
    const result = await service.getParentAnalytics();
    expect(result.involvementScore).toBe(72.5);
  });

  it('should get payment analytics with financial aid impact', async () => {
    mockRepository.getParentPaymentAnalytics.mockResolvedValue({ totalPaid: 85000, financialAid: { total: 120000, recipients: 180, avgGrant: 667 } });
    const result = await service.getParentPaymentAnalytics();
    expect(result.financialAid.total).toBe(120000);
  });

  it('should get engagement analytics with event attendance', async () => {
    mockRepository.getParentEngagementAnalytics.mockResolvedValue({ activeRate: 72.5, events: { attended: 850, total: 1200, rate: 0.71 } });
    const result = await service.getParentEngagementAnalytics();
    expect(result.events.rate).toBe(0.71);
  });

  it('should get communication analytics with notification preferences', async () => {
    mockRepository.getParentCommunicationAnalytics.mockResolvedValue({ readRate: 88.3, preferences: { email: 0.85, sms: 0.45, push: 0.65 } });
    const result = await service.getParentCommunicationAnalytics();
    expect(result.preferences.email).toBe(0.85);
  });

  it('should get satisfaction analytics with benchmark comparison', async () => {
    mockRepository.getParentSatisfactionAnalytics.mockResolvedValue({ avgScore: 4.3, benchmark: 4.0, performance: 'above-average' });
    const result = await service.getParentSatisfactionAnalytics();
    expect(result.benchmark).toBe(4.0);
  });

  it('should get parent analytics with volunteer data', async () => {
    mockRepository.getParentAnalytics.mockResolvedValue({ volunteers: { count: 120, hours: 2500, avgHours: 20.8 } });
    const result = await service.getParentAnalytics();
    expect(result.volunteers.count).toBe(120);
  });

  it('should get payment analytics with refund data', async () => {
    mockRepository.getParentPaymentAnalytics.mockResolvedValue({ totalPaid: 85000, refunds: { count: 8, total: 4500, avgAmount: 562.5 } });
    const result = await service.getParentPaymentAnalytics();
    expect(result.refunds.count).toBe(8);
  });

  it('should get engagement analytics with portal usage', async () => {
    mockRepository.getParentEngagementAnalytics.mockResolvedValue({ activeRate: 72.5, portal: { logins: 4500, avgPerParent: 11.25, peakHour: '8PM' } });
    const result = await service.getParentEngagementAnalytics();
    expect(result.portal.logins).toBe(4500);
  });

  it('should get communication analytics with meeting data', async () => {
    mockRepository.getParentCommunicationAnalytics.mockResolvedValue({ readRate: 88.3, meetings: { attended: 850, total: 1200, rate: 0.71, satisfaction: 4.2 } });
    const result = await service.getParentCommunicationAnalytics();
    expect(result.meetings.satisfaction).toBe(4.2);
  });

  it('should get satisfaction analytics with year-over-year comparison', async () => {
    mockRepository.getParentSatisfactionAnalytics.mockResolvedValue({ avgScore: 4.3, previousYear: 4.1, change: 0.2, trend: 'improving' });
    const result = await service.getParentSatisfactionAnalytics();
    expect(result.change).toBe(0.2);
  });

  it('should get parent analytics with family engagement', async () => {
    mockRepository.getParentAnalytics.mockResolvedValue({ familyEngagement: { household: 350, avgChildren: 2.1, siblings: 120 } });
    const result = await service.getParentAnalytics();
    expect(result.familyEngagement.household).toBe(350);
  });

  it('should get payment analytics with payment method breakdown', async () => {
    mockRepository.getParentPaymentAnalytics.mockResolvedValue({ totalPaid: 85000, byMethod: [{ method: 'Online', amount: 55000 }, { method: 'Cash', amount: 18000 }, { method: 'Check', amount: 12000 }] });
    const result = await service.getParentPaymentAnalytics();
    expect(result.byMethod).toHaveLength(3);
  });

  it('should get engagement analytics with communication frequency', async () => {
    mockRepository.getParentEngagementAnalytics.mockResolvedValue({ activeRate: 72.5, communication: { emails: 4500, messages: 2800, calls: 350 } });
    const result = await service.getParentEngagementAnalytics();
    expect(result.communication.emails).toBe(4500);
  });

  it('should get satisfaction analytics with recommendation likelihood', async () => {
    mockRepository.getParentSatisfactionAnalytics.mockResolvedValue({ avgScore: 4.3, recommendationLikelihood: 0.82, promoters: 0.65, detractors: 0.10 });
    const result = await service.getParentSatisfactionAnalytics();
    expect(result.recommendationLikelihood).toBe(0.82);
  });

  it('should handle empty parent analytics gracefully', async () => {
    mockRepository.getParentAnalytics.mockResolvedValue({ payments: {}, engagement: {}, communication: {}, satisfaction: {} });
    const result = await service.getParentAnalytics();
    expect(Object.keys(result.payments)).toHaveLength(0);
  });

  it('should handle zero payment amount', async () => {
    mockRepository.getParentPaymentAnalytics.mockResolvedValue({ totalPaid: 0, installmentPlans: { active: 0 }, latePayments: { count: 0 } });
    const result = await service.getParentPaymentAnalytics();
    expect(result.totalPaid).toBe(0);
  });

  it('should handle zero engagement rate', async () => {
    mockRepository.getParentEngagementAnalytics.mockResolvedValue({ activeRate: 0, features: {}, devices: {} });
    const result = await service.getParentEngagementAnalytics();
    expect(result.activeRate).toBe(0);
  });

  it('should handle zero satisfaction score', async () => {
    mockRepository.getParentSatisfactionAnalytics.mockResolvedValue({ avgScore: 0, nps: 0, distribution: [] });
    const result = await service.getParentSatisfactionAnalytics();
    expect(result.avgScore).toBe(0);
  });

  it('should handle full parent analytics structure', async () => {
    mockRepository.getParentAnalytics.mockResolvedValue({ payments: {}, engagement: {}, communication: {}, satisfaction: {}, involvement: {}, volunteers: {} });
    const result = await service.getParentAnalytics();
    expect(result).toHaveProperty('payments');
    expect(result).toHaveProperty('engagement');
    expect(result).toHaveProperty('communication');
    expect(result).toHaveProperty('satisfaction');
    expect(result).toHaveProperty('involvement');
    expect(result).toHaveProperty('volunteers');
  });
});
