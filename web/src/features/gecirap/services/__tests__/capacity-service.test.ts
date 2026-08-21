import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CapacityService } from '../capacity-service';
import { GecirapNotFoundError } from '@educi/errors';

const mockForecastRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findLatest: vi.fn(),
};

const mockPlanRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findActive: vi.fn(),
};

const mockUtilizationRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findLatest: vi.fn(),
};

const mockAlertRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findUnresolved: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const RESOURCE_ID = '660e8400-e29b-41d4-a716-446655440001';
const FORECAST_ID = '770e8400-e29b-41d4-a716-446655440002';
const PLAN_ID = '880e8400-e29b-41d4-a716-446655440003';
const ALERT_ID = '990e8400-e29b-41d4-a716-446655440004';

const mockForecast = {
  id: FORECAST_ID,
  school_id: SCHOOL_ID,
  resource_type: 'VM',
  resource_id: RESOURCE_ID,
  forecast_period_days: 30,
  predicted_usage_percent: 85,
  recommended_replicas: 8,
  confidence_score: 0.92,
  forecasted_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockPlan = {
  id: PLAN_ID,
  school_id: SCHOOL_ID,
  name: 'production-capacity',
  resource_type: 'VM',
  target_utilization_percent: 70,
  headroom_percent: 20,
  planning_horizon_days: 90,
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockAlert = {
  id: ALERT_ID,
  school_id: SCHOOL_ID,
  resource_type: 'VM',
  resource_id: RESOURCE_ID,
  alert_type: 'HIGH_UTILIZATION',
  severity: 'WARNING',
  message: 'CPU usage above 90%',
  threshold_percent: 90,
  current_percent: 95,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: CapacityService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new CapacityService(
    mockForecastRepo as never,
    mockPlanRepo as never,
    mockUtilizationRepo as never,
    mockAlertRepo as never,
  );
});

describe('CapacityService', () => {
  describe('listForecasts', () => {
    it('should list capacity forecasts for a school', async () => {
      mockForecastRepo.findAll.mockResolvedValue({ data: [mockForecast], total: 1 });

      const result = await service.listForecasts(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listForecasts('')).rejects.toThrow();
    });
  });

  describe('getForecast', () => {
    it('should retrieve a forecast by id', async () => {
      mockForecastRepo.exists.mockResolvedValue(true);
      mockForecastRepo.findById.mockResolvedValue(mockForecast);

      const result = await service.getForecast(SCHOOL_ID, FORECAST_ID);

      expect(result).toEqual(mockForecast);
    });

    it('should throw if forecast not found', async () => {
      mockForecastRepo.exists.mockResolvedValue(false);

      await expect(service.getForecast(SCHOOL_ID, 'nonexistent')).rejects.toThrow(GecirapNotFoundError);
    });
  });

  describe('createForecast', () => {
    it('should create a forecast successfully', async () => {
      mockForecastRepo.create.mockResolvedValue(mockForecast);

      const result = await service.createForecast(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        resource_type: 'VM',
        resourceType: 'VM',
        resource_id: RESOURCE_ID,
        resourceId: RESOURCE_ID,
        forecast_period_days: 30,
        metric: 'cpu_usage',
        forecast: [{ date: new Date(), value: 85 }],
        model: 'LINEAR',
        confidence: 0.92,
        period: 30,
      });

      expect(result).toEqual(mockForecast);
    });
  });

  describe('createPlan', () => {
    it('should create a capacity plan successfully', async () => {
      mockPlanRepo.create.mockResolvedValue(mockPlan);

      const result = await service.createPlan(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'production-capacity',
        resource_type: 'VM',
        resources: [RESOURCE_ID],
        target_utilization_percent: 70,
        headroom_percent: 20,
        planning_horizon_days: 90,
      });

      expect(result).toEqual(mockPlan);
    });
  });

  describe('createAlert', () => {
    it('should create a capacity alert', async () => {
      mockAlertRepo.create.mockResolvedValue(mockAlert);

      const result = await service.createAlert(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        resource_type: 'VM',
        resourceType: 'VM',
        resource_id: RESOURCE_ID,
        alert_type: 'HIGH_UTILIZATION',
        level: 'WARNING',
        severity: 'WARNING',
        message: 'CPU usage above 90%',
        threshold_percent: 90,
        threshold: 90,
        current_percent: 95,
        utilization: 95,
      });

      expect(result).toEqual(mockAlert);
    });
  });

  describe('resolveAlert', () => {
    it('should resolve a capacity alert', async () => {
      mockAlertRepo.exists.mockResolvedValue(true);
      mockAlertRepo.findById.mockResolvedValue(mockAlert);
      mockAlertRepo.update.mockResolvedValue({ ...mockAlert, resolved_at: new Date().toISOString() });

      const result = await service.resolveAlert(SCHOOL_ID, ALERT_ID);

      expect(result.resolved_at).toBeDefined();
    });
  });

  describe('getCapacityOverview', () => {
    it('should return capacity overview stats', async () => {
      mockForecastRepo.findAll.mockResolvedValue({ data: [mockForecast], total: 1 });
      mockPlanRepo.findAll.mockResolvedValue({ data: [mockPlan], total: 1 });
      mockAlertRepo.findUnresolved.mockResolvedValue([mockAlert]);

      const result = await service.getCapacityOverview(SCHOOL_ID);

      expect(result.totalForecasts).toBe(1);
      expect(result.totalPlans).toBe(1);
      expect(result.unresolvedAlerts).toBe(1);
    });
  });
});
