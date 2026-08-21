import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovRealTimeAlertsService } from '../gov-real-time-alerts.service';
import { GovPredictiveAnalyticService } from '../gov-predictive-analytic.service';
import { GovAnalyticsForecastingService } from '../gov-analytics-forecasting.service';
import { GovernmentRepositoryEnterprise } from '../../repositories/gov.repository';

vi.mock('../../repositories/gov.repository', () => ({
  GovernmentRepositoryEnterprise: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findRealTimeAlertsById: vi.fn(),
  createRealTimeAlerts: vi.fn(),
  updateRealTimeAlerts: vi.fn(),
  deleteRealTimeAlerts: vi.fn(),
  findPredictiveAnalyticById: vi.fn(),
  findAllPredictiveAnalytics: vi.fn(),
  createPredictiveAnalytic: vi.fn(),
  findAnalyticsForecastingById: vi.fn(),
  updateAnalyticsForecasting: vi.fn(),
  createAnalyticsForecasting: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(GovernmentRepositoryEnterprise).mockReturnValue(mockRepo as any);
});

describe('GovRealTimeAlertsService', () => {
  const service = new GovRealTimeAlertsService(mockSupabase);

  it('should get an alert', async () => {
    mockRepo.findRealTimeAlertsById.mockResolvedValue({ id: '1', severity: 'high' });
    const result = await service.getRealTimeAlerts('school1', '1');
    expect(result).toHaveProperty('severity', 'high');
  });

  it('should throw when not found', async () => {
    mockRepo.findRealTimeAlertsById.mockResolvedValue(null);
    await expect(service.getRealTimeAlerts('school1', '999')).rejects.toThrow();
  });

  it('should create an alert', async () => {
    mockRepo.createRealTimeAlerts.mockResolvedValue({ id: '1' });
    const result = await service.createRealTimeAlerts('school1', { severity: 'critical' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should update an alert', async () => {
    mockRepo.findRealTimeAlertsById.mockResolvedValue({ id: '1' });
    mockRepo.updateRealTimeAlerts.mockResolvedValue({ id: '1', severity: 'low' });
    const result = await service.updateRealTimeAlerts('school1', '1', { severity: 'low' });
    expect(result).toHaveProperty('severity', 'low');
  });

  it('should delete an alert', async () => {
    mockRepo.findRealTimeAlertsById.mockResolvedValue({ id: '1' });
    mockRepo.deleteRealTimeAlerts.mockResolvedValue(undefined);
    await expect(service.deleteRealTimeAlerts('school1', '1')).resolves.toBeUndefined();
  });
});

describe('GovPredictiveAnalyticService', () => {
  const service = new GovPredictiveAnalyticService(mockSupabase);

  it('should create a predictive analytic', async () => {
    mockRepo.createPredictiveAnalytic.mockResolvedValue({ id: '1' });
    const result = await service.createPredictiveAnalytic('school1', { model: 'arima' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when not found', async () => {
    mockRepo.findPredictiveAnalyticById.mockResolvedValue(null);
    await expect(service.getPredictiveAnalytic('school1', '999')).rejects.toThrow();
  });

  it('should list predictive analytics', async () => {
    mockRepo.findAllPredictiveAnalytics.mockResolvedValue([]);
    const result = await service.listPredictiveAnalytics('school1');
    expect(result).toEqual([]);
  });
});

describe('GovAnalyticsForecastingService', () => {
  const service = new GovAnalyticsForecastingService(mockSupabase);

  it('should get a forecast', async () => {
    mockRepo.findAnalyticsForecastingById.mockResolvedValue({ id: '1', horizon: '5y' });
    const result = await service.getAnalyticsForecasting('school1', '1');
    expect(result).toHaveProperty('horizon', '5y');
  });

  it('should throw when not found', async () => {
    mockRepo.findAnalyticsForecastingById.mockResolvedValue(null);
    await expect(service.getAnalyticsForecasting('school1', '999')).rejects.toThrow();
  });

  it('should create a forecast', async () => {
    mockRepo.createAnalyticsForecasting.mockResolvedValue({ id: '1' });
    const result = await service.createAnalyticsForecasting('school1', { model: 'linear' } as any);
    expect(result).toHaveProperty('id');
  });
});
