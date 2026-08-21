import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeaesipImpactIntelligenceService } from '../impact-intelligence.service';

const mockModelRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockResultRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
};

const mockEconomicRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
};

const mockCapitalRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const MODEL_ID = '660e8400-e29b-41d4-a716-446655440001';
const RESULT_ID = '770e8400-e29b-41d4-a716-446655440002';
const ECONOMIC_ID = '880e8400-e29b-41d4-a716-446655440003';
const CAPITAL_ID = '990e8400-e29b-41d4-a716-446655440004';

const mockModel = {
  id: MODEL_ID,
  school_id: SCHOOL_ID,
  name: 'Education ROI Model',
  type: 'REGRESSION',
  version: '1.0',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockResult = {
  id: RESULT_ID,
  school_id: SCHOOL_ID,
  modelId: MODEL_ID,
  roi: 3.5,
  confidence: 0.88,
  calculatedAt: new Date().toISOString(),
};

const mockEconomic = {
  id: ECONOMIC_ID,
  school_id: SCHOOL_ID,
  indicator: 'GDP_per_student',
  value: 1200,
  period: '2025',
  created_at: new Date().toISOString(),
};

const mockCapital = {
  id: CAPITAL_ID,
  school_id: SCHOOL_ID,
  index: 78.5,
  components: { skills: 82, health: 75 },
  computedAt: new Date().toISOString(),
};

let service: GeaesipImpactIntelligenceService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new GeaesipImpactIntelligenceService(
    mockModelRepo as never,
    mockResultRepo as never,
    mockEconomicRepo as never,
    mockCapitalRepo as never,
  );
});

describe('GeaesipImpactIntelligenceService', () => {
  describe('listModels', () => {
    it('should list impact models for a school', async () => {
      mockModelRepo.findAllBySchool.mockResolvedValue([mockModel]);

      const result = await service.listModels(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listModels('')).rejects.toThrow();
    });
  });

  describe('getModel', () => {
    it('should retrieve a model by id', async () => {
      mockModelRepo.findById.mockResolvedValue(mockModel);

      const result = await service.getModel(SCHOOL_ID, MODEL_ID);

      expect(result).toEqual(mockModel);
    });

    it('should throw if model not found', async () => {
      mockModelRepo.findById.mockImplementation(() => { throw new Error('Not found'); });

      await expect(service.getModel(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createModel', () => {
    it('should create a model successfully', async () => {
      mockModelRepo.create.mockResolvedValue(mockModel);

      const result = await service.createModel(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        name: 'Education ROI Model',
        type: 'REGRESSION',
        version: '1.0',
      } as never);

      expect(result).toEqual(mockModel);
    });
  });

  describe('updateModel', () => {
    it('should update a model', async () => {
      mockModelRepo.findById.mockResolvedValue(mockModel);
      mockModelRepo.update.mockResolvedValue({ ...mockModel, name: 'Updated' });

      const result = await service.updateModel(SCHOOL_ID, MODEL_ID, { name: 'Updated' });

      expect(result.name).toBe('Updated');
    });
  });

  describe('deleteModel', () => {
    it('should delete a model', async () => {
      mockModelRepo.findById.mockResolvedValue(mockModel);
      mockModelRepo.delete.mockResolvedValue(undefined);

      await service.deleteModel(SCHOOL_ID, MODEL_ID);

      expect(mockModelRepo.delete).toHaveBeenCalledWith(MODEL_ID);
    });
  });

  describe('listResults', () => {
    it('should list impact results', async () => {
      mockResultRepo.findAllBySchool.mockResolvedValue([mockResult]);

      const result = await service.listResults(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getResult', () => {
    it('should retrieve a result by id', async () => {
      mockResultRepo.findById.mockResolvedValue(mockResult);

      const result = await service.getResult(SCHOOL_ID, RESULT_ID);

      expect(result).toEqual(mockResult);
    });
  });

  describe('listEconomicForecasts', () => {
    it('should list economic forecasts', async () => {
      mockEconomicRepo.findAllBySchool.mockResolvedValue([mockEconomic]);

      const result = await service.listEconomicForecasts(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getEconomicForecast', () => {
    it('should retrieve an economic forecast by id', async () => {
      mockEconomicRepo.findById.mockResolvedValue(mockEconomic);

      const result = await service.getEconomicForecast(SCHOOL_ID, ECONOMIC_ID);

      expect(result).toEqual(mockEconomic);
    });
  });

  describe('listHumanCapitalIndices', () => {
    it('should list human capital indices', async () => {
      mockCapitalRepo.findAllBySchool.mockResolvedValue([mockCapital]);

      const result = await service.listHumanCapitalIndices(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getHumanCapitalIndex', () => {
    it('should retrieve a human capital index by id', async () => {
      mockCapitalRepo.findById.mockResolvedValue(mockCapital);

      const result = await service.getHumanCapitalIndex(SCHOOL_ID, CAPITAL_ID);

      expect(result).toEqual(mockCapital);
    });
  });

  describe('getImpactIntelligenceStats', () => {
    it('should return stats', async () => {
      mockModelRepo.findAllBySchool.mockResolvedValue([mockModel]);
      mockResultRepo.findAllBySchool.mockResolvedValue([mockResult]);
      mockEconomicRepo.findAllBySchool.mockResolvedValue([mockEconomic]);
      mockCapitalRepo.findAllBySchool.mockResolvedValue([mockCapital]);

      const result = await service.getImpactIntelligenceStats(SCHOOL_ID);

      expect(result.totalModels).toBe(1);
      expect(result.totalResults).toBe(1);
      expect(result.totalEconomicForecasts).toBe(1);
      expect(result.totalHumanCapitalIndices).toBe(1);
    });
  });
});
