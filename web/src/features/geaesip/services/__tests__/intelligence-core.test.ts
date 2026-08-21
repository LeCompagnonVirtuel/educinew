import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeaesipIntelligenceCoreService } from '../intelligence-core.service';

const mockCoreRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockFusionRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockSignalRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockCausalRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockHealthRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const ENTITY_ID = '660e8400-e29b-41d4-a716-446655440001';

const mockIntelligence = {
  id: ENTITY_ID,
  school_id: SCHOOL_ID,
  name: 'Core Intelligence Engine',
  type: 'ANALYTICS',
  status: 'active',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockFusion = {
  id: '770e8400-e29b-41d4-a716-446655440002',
  school_id: SCHOOL_ID,
  sources: ['attendance', 'grades'],
  method: 'WEIGHTED_AVERAGE',
  confidence: 0.91,
  timestamp: new Date().toISOString(),
};

const mockSignal = {
  id: '880e8400-e29b-41d4-a716-446655440003',
  school_id: SCHOOL_ID,
  domain: 'ACADEMIC',
  signalType: 'PERFORMANCE_DROP',
  severity: 'HIGH',
  timestamp: new Date().toISOString(),
};

const mockCausal = {
  id: '990e8400-e29b-41d4-a716-446655440004',
  school_id: SCHOOL_ID,
  cause: 'Teacher absence',
  effect: 'Grade decline',
  strength: 0.78,
  discoveredAt: new Date().toISOString(),
};

const mockHealth = {
  id: 'aa0e8400-e29b-41d4-a716-446655440005',
  school_id: SCHOOL_ID,
  score: 87.5,
  category: 'INFRASTRUCTURE',
  computedAt: new Date().toISOString(),
};

let service: GeaesipIntelligenceCoreService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new GeaesipIntelligenceCoreService(
    mockCoreRepo as never,
    mockFusionRepo as never,
    mockSignalRepo as never,
    mockCausalRepo as never,
    mockHealthRepo as never,
  );
});

describe('GeaesipIntelligenceCoreService', () => {
  describe('listIntelligences', () => {
    it('should list intelligences for a school', async () => {
      mockCoreRepo.findAllBySchool.mockResolvedValue([mockIntelligence]);

      const result = await service.listIntelligences(SCHOOL_ID);

      expect(result).toHaveLength(1);
      expect(mockCoreRepo.findAllBySchool).toHaveBeenCalledWith(SCHOOL_ID);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listIntelligences('')).rejects.toThrow();
    });
  });

  describe('getIntelligence', () => {
    it('should retrieve an intelligence by id', async () => {
      mockCoreRepo.findById.mockResolvedValue(mockIntelligence);

      const result = await service.getIntelligence(SCHOOL_ID, ENTITY_ID);

      expect(result).toEqual(mockIntelligence);
    });

    it('should throw if intelligence not found', async () => {
      mockCoreRepo.findById.mockImplementation(() => { throw new Error('Not found'); });

      await expect(service.getIntelligence(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });

    it('should throw for empty id', async () => {
      await expect(service.getIntelligence(SCHOOL_ID, '')).rejects.toThrow();
    });
  });

  describe('createIntelligence', () => {
    it('should create an intelligence successfully', async () => {
      mockCoreRepo.create.mockResolvedValue(mockIntelligence);

      const result = await service.createIntelligence(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        name: 'Core Intelligence Engine',
        type: 'ANALYTICS',
        status: 'active',
      } as never);

      expect(result).toEqual(mockIntelligence);
    });
  });

  describe('updateIntelligence', () => {
    it('should update an intelligence', async () => {
      mockCoreRepo.findById.mockResolvedValue(mockIntelligence);
      mockCoreRepo.update.mockResolvedValue({ ...mockIntelligence, name: 'Updated' });

      const result = await service.updateIntelligence(SCHOOL_ID, ENTITY_ID, { name: 'Updated' });

      expect(result.name).toBe('Updated');
    });
  });

  describe('deleteIntelligence', () => {
    it('should delete an intelligence', async () => {
      mockCoreRepo.findById.mockResolvedValue(mockIntelligence);
      mockCoreRepo.delete.mockResolvedValue(undefined);

      await service.deleteIntelligence(SCHOOL_ID, ENTITY_ID);

      expect(mockCoreRepo.delete).toHaveBeenCalledWith(ENTITY_ID);
    });
  });

  describe('listFusions', () => {
    it('should list fusions for a school', async () => {
      mockFusionRepo.findAllBySchool.mockResolvedValue([mockFusion]);

      const result = await service.listFusions(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getFusion', () => {
    it('should retrieve a fusion by id', async () => {
      mockFusionRepo.findById.mockResolvedValue(mockFusion);

      const result = await service.getFusion(SCHOOL_ID, mockFusion.id);

      expect(result).toEqual(mockFusion);
    });

    it('should throw if fusion school_id mismatch', async () => {
      mockFusionRepo.findById.mockResolvedValue({ ...mockFusion, school_id: 'other' });

      await expect(service.getFusion(SCHOOL_ID, mockFusion.id)).rejects.toThrow();
    });
  });

  describe('createFusion', () => {
    it('should create a fusion successfully', async () => {
      mockFusionRepo.create.mockResolvedValue(mockFusion);

      const result = await service.createFusion(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        sources: ['attendance', 'grades'],
        method: 'WEIGHTED_AVERAGE',
        confidence: 0.91,
      } as never);

      expect(result).toEqual(mockFusion);
    });
  });

  describe('listSignals', () => {
    it('should list signals for a school', async () => {
      mockSignalRepo.findAllBySchool.mockResolvedValue([mockSignal]);

      const result = await service.listSignals(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getSignal', () => {
    it('should retrieve a signal by id', async () => {
      mockSignalRepo.findById.mockResolvedValue(mockSignal);

      const result = await service.getSignal(SCHOOL_ID, mockSignal.id);

      expect(result).toEqual(mockSignal);
    });
  });

  describe('listCausalRelationships', () => {
    it('should list causal relationships', async () => {
      mockCausalRepo.findAllBySchool.mockResolvedValue([mockCausal]);

      const result = await service.listCausalRelationships(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('listHealthScores', () => {
    it('should list health scores', async () => {
      mockHealthRepo.findAllBySchool.mockResolvedValue([mockHealth]);

      const result = await service.listHealthScores(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getIntelligenceCoreStats', () => {
    it('should return stats', async () => {
      mockCoreRepo.findAllBySchool.mockResolvedValue([mockIntelligence]);
      mockFusionRepo.findAllBySchool.mockResolvedValue([mockFusion]);
      mockSignalRepo.findAllBySchool.mockResolvedValue([]);
      mockCausalRepo.findAllBySchool.mockResolvedValue([]);
      mockHealthRepo.findAllBySchool.mockResolvedValue([mockHealth]);

      const result = await service.getIntelligenceCoreStats(SCHOOL_ID);

      expect(result.totalIntelligences).toBe(1);
      expect(result.totalFusions).toBe(1);
      expect(result.totalSignals).toBe(0);
      expect(result.totalCausalRelationships).toBe(0);
      expect(result.totalHealthScores).toBe(1);
    });
  });
});
