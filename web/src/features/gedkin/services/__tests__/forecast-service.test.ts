import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ForecastService } from '../forecast-service';

const mockForecastRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByType: vi.fn(),
  findByStatus: vi.fn(),
};

const mockPredictionRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByForecastId: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const FORECAST_ID = '660e8400-e29b-41d4-a716-446655440001';
const PREDICTION_ID = '770e8400-e29b-41d4-a716-446655440002';

const mockForecast = {
  id: FORECAST_ID,
  school_id: SCHOOL_ID,
  name: 'Enrollment Forecast',
  type: 'ENROLLMENT',
  model: 'ARIMA',
  status: 'COMPLETED',
  parameters: { horizon: 12 },
  predictions: [],
  confidence: 0.88,
  period: '2024-2025',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockPrediction = {
  id: PREDICTION_ID,
  school_id: SCHOOL_ID,
  forecastId: FORECAST_ID,
  date: '2024-06-01T00:00:00Z',
  value: 1500,
  lowerBound: 1400,
  upperBound: 1600,
  confidence: 0.9,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: ForecastService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new ForecastService(
    mockForecastRepo as never,
    mockPredictionRepo as never,
  );
});

describe('ForecastService', () => {
  describe('listForecasts', () => {
    it('should list forecasts for a school', async () => {
      mockForecastRepo.findAll.mockResolvedValue({ data: [mockForecast], total: 1, offset: 0, limit: 50 });

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

      await expect(service.getForecast(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createForecast', () => {
    it('should create a forecast successfully', async () => {
      mockForecastRepo.create.mockResolvedValue(mockForecast);

      const result = await service.createForecast(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'Enrollment Forecast',
        type: 'ENROLLMENT',
        model: 'ARIMA',
        status: 'COMPLETED',
        parameters: { horizon: 12 },
        predictions: [],
        confidence: 0.88,
        period: '2024-2025',
      });

      expect(result).toEqual(mockForecast);
    });
  });

  describe('deleteForecast', () => {
    it('should soft delete a forecast', async () => {
      mockForecastRepo.exists.mockResolvedValue(true);
      mockForecastRepo.findById.mockResolvedValue(mockForecast);
      mockForecastRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteForecast(SCHOOL_ID, FORECAST_ID);

      expect(mockForecastRepo.softDelete).toHaveBeenCalledWith(FORECAST_ID, SCHOOL_ID);
    });
  });

  describe('listByType', () => {
    it('should list forecasts by type', async () => {
      mockForecastRepo.findByType.mockResolvedValue({ data: [mockForecast], total: 1, offset: 0, limit: 50 });

      const result = await service.listByType(SCHOOL_ID, 'ENROLLMENT');

      expect(result.data).toHaveLength(1);
    });
  });

  describe('listByStatus', () => {
    it('should list forecasts by status', async () => {
      mockForecastRepo.findByStatus.mockResolvedValue({ data: [mockForecast], total: 1, offset: 0, limit: 50 });

      const result = await service.listByStatus(SCHOOL_ID, 'COMPLETED');

      expect(result.data).toHaveLength(1);
    });
  });

  describe('createPrediction', () => {
    it('should create a prediction successfully', async () => {
      mockPredictionRepo.create.mockResolvedValue(mockPrediction);

      const result = await service.createPrediction(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        forecastId: FORECAST_ID,
        date: '2024-06-01T00:00:00Z',
        value: 1500,
        lowerBound: 1400,
        upperBound: 1600,
        confidence: 0.9,
      });

      expect(result).toEqual(mockPrediction);
    });
  });

  describe('listByForecast', () => {
    it('should list predictions by forecast', async () => {
      mockPredictionRepo.findByForecastId.mockResolvedValue({ data: [mockPrediction], total: 1, offset: 0, limit: 50 });

      const result = await service.listByForecast(SCHOOL_ID, FORECAST_ID);

      expect(result.data).toHaveLength(1);
    });
  });

  describe('getForecastStats', () => {
    it('should return forecast statistics', async () => {
      mockForecastRepo.findAll.mockResolvedValue({ data: [mockForecast], total: 1, offset: 0, limit: 1000 });
      mockPredictionRepo.findAll.mockResolvedValue({ data: [mockPrediction], total: 1, offset: 0, limit: 1000 });

      const result = await service.getForecastStats(SCHOOL_ID);

      expect(result.totalForecasts).toBe(1);
      expect(result.totalPredictions).toBe(1);
      expect(result.byType['ENROLLMENT']).toBe(1);
      expect(result.byStatus['COMPLETED']).toBe(1);
      expect(result.averageConfidence).toBe(0.88);
    });
  });
});
