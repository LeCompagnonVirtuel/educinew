import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeaesipResourceOptimizationService } from '../resource-optimization.service';

const mockForecastRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockAllocationRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockOptimizationRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const FORECAST_ID = '660e8400-e29b-41d4-a716-446655440001';
const ALLOCATION_ID = '770e8400-e29b-41d4-a716-446655440002';
const OPT_ID = '880e8400-e29b-41d4-a716-446655440003';

const mockForecast = {
  id: FORECAST_ID,
  school_id: SCHOOL_ID,
  resource: 'TEACHERS',
  period: '2026-Q1',
  predicted: 45,
  confidence: 0.88,
  created_at: new Date().toISOString(),
};

const mockAllocation = {
  id: ALLOCATION_ID,
  school_id: SCHOOL_ID,
  resource: 'BUDGET',
  allocated: 50000,
  department: 'ACADEMIC',
  status: 'approved',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockOptimization = {
  id: OPT_ID,
  school_id: SCHOOL_ID,
  type: 'SCHEDULE',
  result: { savings: 15 },
  status: 'completed',
  created_at: new Date().toISOString(),
};

let service: GeaesipResourceOptimizationService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new GeaesipResourceOptimizationService(
    mockForecastRepo as never,
    mockAllocationRepo as never,
    mockOptimizationRepo as never,
  );
});

describe('GeaesipResourceOptimizationService', () => {
  describe('listForecasts', () => {
    it('should list resource forecasts for a school', async () => {
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
        resource: 'TEACHERS',
        period: '2026-Q1',
        predicted: 45,
        confidence: 0.88,
      } as never);

      expect(result).toEqual(mockForecast);
    });
  });

  describe('updateForecast', () => {
    it('should update a forecast', async () => {
      mockForecastRepo.findById.mockResolvedValue(mockForecast);
      mockForecastRepo.update.mockResolvedValue({ ...mockForecast, predicted: 50 });

      const result = await service.updateForecast(SCHOOL_ID, FORECAST_ID, { predicted: 50 });

      expect(result.predicted).toBe(50);
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

  describe('listAllocations', () => {
    it('should list allocation plans', async () => {
      mockAllocationRepo.findAllBySchool.mockResolvedValue([mockAllocation]);

      const result = await service.listAllocations(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getAllocation', () => {
    it('should retrieve an allocation by id', async () => {
      mockAllocationRepo.findById.mockResolvedValue(mockAllocation);

      const result = await service.getAllocation(SCHOOL_ID, ALLOCATION_ID);

      expect(result).toEqual(mockAllocation);
    });
  });

  describe('createAllocation', () => {
    it('should create an allocation plan', async () => {
      mockAllocationRepo.create.mockResolvedValue(mockAllocation);

      const result = await service.createAllocation(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        resource: 'BUDGET',
        allocated: 50000,
        department: 'ACADEMIC',
        status: 'approved',
      } as never);

      expect(result.allocated).toBe(50000);
    });
  });

  describe('listOptimizations', () => {
    it('should list optimization results', async () => {
      mockOptimizationRepo.findAllBySchool.mockResolvedValue([mockOptimization]);

      const result = await service.listOptimizations(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getOptimization', () => {
    it('should retrieve an optimization by id', async () => {
      mockOptimizationRepo.findById.mockResolvedValue(mockOptimization);

      const result = await service.getOptimization(SCHOOL_ID, OPT_ID);

      expect(result).toEqual(mockOptimization);
    });
  });

  describe('getResourceOptimizationStats', () => {
    it('should return stats', async () => {
      mockForecastRepo.findAllBySchool.mockResolvedValue([mockForecast]);
      mockAllocationRepo.findAllBySchool.mockResolvedValue([mockAllocation]);
      mockOptimizationRepo.findAllBySchool.mockResolvedValue([mockOptimization]);

      const result = await service.getResourceOptimizationStats(SCHOOL_ID);

      expect(result.totalForecasts).toBe(1);
      expect(result.totalAllocations).toBe(1);
      expect(result.totalOptimizations).toBe(1);
    });
  });
});
