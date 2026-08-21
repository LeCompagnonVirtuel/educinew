import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeaesipForecastingService } from '../forecasting.service';

const mockForecastRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockBacktestRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
};

const mockDriftRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const FORECAST_ID = '660e8400-e29b-41d4-a716-446655440001';
const BACKTEST_ID = '770e8400-e29b-41d4-a716-446655440002';
const DRIFT_ID = '880e8400-e29b-41d4-a716-446655440003';

const mockForecast = {
  id: FORECAST_ID,
  school_id: SCHOOL_ID,
  name: 'Enrollment forecast',
  model: 'ARIMA',
  status: 'completed',
  completedAt: new Date().toISOString(),
  predictions: [90, 92, 95],
  created_at: new Date().toISOString(),
};

const mockBacktest = {
  id: BACKTEST_ID,
  school_id: SCHOOL_ID,
  forecastId: FORECAST_ID,
  accuracy: 0.91,
  mape: 0.05,
  evaluatedAt: new Date().toISOString(),
};

const mockDrift = {
  id: DRIFT_ID,
  school_id: SCHOOL_ID,
  forecastId: FORECAST_ID,
  driftType: 'DATA_DRIFT',
  magnitude: 0.15,
  detectedAt: new Date().toISOString(),
};

let service: GeaesipForecastingService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new GeaesipForecastingService(
    mockForecastRepo as never,
    mockBacktestRepo as never,
    mockDriftRepo as never,
  );
});

describe('GeaesipForecastingService', () => {
  describe('listForecasts', () => {
    it('should list extended forecasts for a school', async () => {
      mockForecastRepo.findAllBySchool.mockResolvedValue([mockForecast]);

      const result = await service.listForecasts(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listForecasts('')).rejects.toThrow();
    });
  });

  describe('getForecast', () => {
    it('should retrieve a forecast by id', async () => {
      mockForecastRepo.findById.mockResolvedValue(mockForecast);

      const result = await service.getForecast(SCHOOL_ID, FORECAST_ID);

      expect(result).toEqual(mockForecast);
    });

    it('should throw if forecast not found', async () => {
      mockForecastRepo.findById.mockImplementation(() => { throw new Error('Not found'); });

      await expect(service.getForecast(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createForecast', () => {
    it('should create a forecast successfully', async () => {
      mockForecastRepo.create.mockResolvedValue(mockForecast);

      const result = await service.createForecast(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        name: 'Enrollment forecast',
        model: 'ARIMA',
        status: 'completed',
      } as never);

      expect(result).toEqual(mockForecast);
    });
  });

  describe('updateForecast', () => {
    it('should update a forecast', async () => {
      mockForecastRepo.findById.mockResolvedValue(mockForecast);
      mockForecastRepo.update.mockResolvedValue({ ...mockForecast, name: 'Updated' });

      const result = await service.updateForecast(SCHOOL_ID, FORECAST_ID, { name: 'Updated' });

      expect(result.name).toBe('Updated');
    });
  });

  describe('deleteForecast', () => {
    it('should delete a forecast', async () => {
      mockForecastRepo.findById.mockResolvedValue(mockForecast);
      mockForecastRepo.delete.mockResolvedValue(undefined);

      await service.deleteForecast(SCHOOL_ID, FORECAST_ID);

      expect(mockForecastRepo.delete).toHaveBeenCalledWith(FORECAST_ID);
    });
  });

  describe('listBacktests', () => {
    it('should list backtests', async () => {
      mockBacktestRepo.findAllBySchool.mockResolvedValue([mockBacktest]);

      const result = await service.listBacktests(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getBacktest', () => {
    it('should retrieve a backtest by id', async () => {
      mockBacktestRepo.findById.mockResolvedValue(mockBacktest);

      const result = await service.getBacktest(SCHOOL_ID, BACKTEST_ID);

      expect(result).toEqual(mockBacktest);
    });
  });

  describe('createBacktest', () => {
    it('should create a backtest', async () => {
      mockBacktestRepo.create.mockResolvedValue(mockBacktest);

      const result = await service.createBacktest(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        forecastId: FORECAST_ID,
        accuracy: 0.91,
        mape: 0.05,
      } as never);

      expect(result.accuracy).toBe(0.91);
    });
  });

  describe('listDrifts', () => {
    it('should list model drifts', async () => {
      mockDriftRepo.findAllBySchool.mockResolvedValue([mockDrift]);

      const result = await service.listDrifts(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getDrift', () => {
    it('should retrieve a drift by id', async () => {
      mockDriftRepo.findById.mockResolvedValue(mockDrift);

      const result = await service.getDrift(SCHOOL_ID, DRIFT_ID);

      expect(result).toEqual(mockDrift);
    });
  });

  describe('createDrift', () => {
    it('should create a drift', async () => {
      mockDriftRepo.create.mockResolvedValue(mockDrift);

      const result = await service.createDrift(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        forecastId: FORECAST_ID,
        driftType: 'DATA_DRIFT',
        magnitude: 0.15,
      } as never);

      expect(result.driftType).toBe('DATA_DRIFT');
    });
  });

  describe('getForecastingStats', () => {
    it('should return stats', async () => {
      mockForecastRepo.findAllBySchool.mockResolvedValue([mockForecast]);
      mockBacktestRepo.findAllBySchool.mockResolvedValue([mockBacktest]);
      mockDriftRepo.findAllBySchool.mockResolvedValue([mockDrift]);

      const result = await service.getForecastingStats(SCHOOL_ID);

      expect(result.totalForecasts).toBe(1);
      expect(result.totalBacktests).toBe(1);
      expect(result.totalDrifts).toBe(1);
    });
  });
});
