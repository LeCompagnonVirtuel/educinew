import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeaesipObservatoryService } from '../observatory.service';

const mockIndexRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockIndicatorRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockTrendRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const INDEX_ID = '660e8400-e29b-41d4-a716-446655440001';
const INDICATOR_ID = '770e8400-e29b-41d4-a716-446655440002';
const TREND_ID = '880e8400-e29b-41d4-a716-446655440003';

const mockIndex = {
  id: INDEX_ID,
  school_id: SCHOOL_ID,
  name: 'Academic Performance Index',
  value: 82.5,
  components: { grades: 85, attendance: 80 },
  computedAt: new Date().toISOString(),
};

const mockIndicator = {
  id: INDICATOR_ID,
  school_id: SCHOOL_ID,
  name: 'Teacher/student ratio',
  value: 0.05,
  unit: 'ratio',
  category: 'RESOURCES',
  computedAt: new Date().toISOString(),
};

const mockTrend = {
  id: TREND_ID,
  school_id: SCHOOL_ID,
  indicator: 'enrollment',
  direction: 'INCREASING',
  rate: 0.08,
  period: '2024-2026',
  computedAt: new Date().toISOString(),
};

let service: GeaesipObservatoryService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new GeaesipObservatoryService(
    mockIndexRepo as never,
    mockIndicatorRepo as never,
    mockTrendRepo as never,
  );
});

describe('GeaesipObservatoryService', () => {
  describe('listIndices', () => {
    it('should list composite indices for a school', async () => {
      mockIndexRepo.findAllBySchool.mockResolvedValue([mockIndex]);

      const result = await service.listIndices(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listIndices('')).rejects.toThrow();
    });
  });

  describe('getIndex', () => {
    it('should retrieve an index by id', async () => {
      mockIndexRepo.findById.mockResolvedValue(mockIndex);

      const result = await service.getIndex(SCHOOL_ID, INDEX_ID);

      expect(result).toEqual(mockIndex);
    });

    it('should throw if index not found', async () => {
      mockIndexRepo.findById.mockImplementation(() => { throw new Error('Not found'); });

      await expect(service.getIndex(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createIndex', () => {
    it('should create an index successfully', async () => {
      mockIndexRepo.create.mockResolvedValue(mockIndex);

      const result = await service.createIndex(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        name: 'Academic Performance Index',
        value: 82.5,
        components: { grades: 85, attendance: 80 },
      } as never);

      expect(result).toEqual(mockIndex);
    });
  });

  describe('updateIndex', () => {
    it('should update an index', async () => {
      mockIndexRepo.findById.mockResolvedValue(mockIndex);
      mockIndexRepo.update.mockResolvedValue({ ...mockIndex, value: 90 });

      const result = await service.updateIndex(SCHOOL_ID, INDEX_ID, { value: 90 });

      expect(result.value).toBe(90);
    });
  });

  describe('deleteIndex', () => {
    it('should delete an index', async () => {
      mockIndexRepo.findById.mockResolvedValue(mockIndex);
      mockIndexRepo.delete.mockResolvedValue(undefined);

      await service.deleteIndex(SCHOOL_ID, INDEX_ID);

      expect(mockIndexRepo.delete).toHaveBeenCalledWith(INDEX_ID);
    });
  });

  describe('listIndicators', () => {
    it('should list observatory indicators', async () => {
      mockIndicatorRepo.findAllBySchool.mockResolvedValue([mockIndicator]);

      const result = await service.listIndicators(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getIndicator', () => {
    it('should retrieve an indicator by id', async () => {
      mockIndicatorRepo.findById.mockResolvedValue(mockIndicator);

      const result = await service.getIndicator(SCHOOL_ID, INDICATOR_ID);

      expect(result).toEqual(mockIndicator);
    });
  });

  describe('createIndicator', () => {
    it('should create an indicator', async () => {
      mockIndicatorRepo.create.mockResolvedValue(mockIndicator);

      const result = await service.createIndicator(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        name: 'Teacher/student ratio',
        value: 0.05,
        unit: 'ratio',
        category: 'RESOURCES',
      } as never);

      expect(result.name).toBe('Teacher/student ratio');
    });
  });

  describe('listTrends', () => {
    it('should list observatory trends', async () => {
      mockTrendRepo.findAllBySchool.mockResolvedValue([mockTrend]);

      const result = await service.listTrends(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getTrend', () => {
    it('should retrieve a trend by id', async () => {
      mockTrendRepo.findById.mockResolvedValue(mockTrend);

      const result = await service.getTrend(SCHOOL_ID, TREND_ID);

      expect(result).toEqual(mockTrend);
    });
  });

  describe('createTrend', () => {
    it('should create a trend', async () => {
      mockTrendRepo.create.mockResolvedValue(mockTrend);

      const result = await service.createTrend(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        indicator: 'enrollment',
        direction: 'INCREASING',
        rate: 0.08,
        period: '2024-2026',
      } as never);

      expect(result.direction).toBe('INCREASING');
    });
  });

  describe('getObservatoryStats', () => {
    it('should return stats', async () => {
      mockIndexRepo.findAllBySchool.mockResolvedValue([mockIndex]);
      mockIndicatorRepo.findAllBySchool.mockResolvedValue([mockIndicator]);
      mockTrendRepo.findAllBySchool.mockResolvedValue([mockTrend]);

      const result = await service.getObservatoryStats(SCHOOL_ID);

      expect(result.totalIndices).toBe(1);
      expect(result.totalIndicators).toBe(1);
      expect(result.totalTrends).toBe(1);
    });
  });
});
