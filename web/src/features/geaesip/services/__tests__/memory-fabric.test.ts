import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeaesipMemoryFabricService } from '../memory-fabric.service';

const mockMemoryRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockRetrievalRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
};

const mockPolicyRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const MEMORY_ID = '660e8400-e29b-41d4-a716-446655440001';
const RETRIEVAL_ID = '770e8400-e29b-41d4-a716-446655440002';
const POLICY_ID = '880e8400-e29b-41d4-a716-446655440003';

const mockMemory = {
  id: MEMORY_ID,
  school_id: SCHOOL_ID,
  key: 'enrollment_trend_2025',
  value: { trend: 'increasing', rate: 0.12 },
  type: 'STRUCTURED',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockRetrieval = {
  id: RETRIEVAL_ID,
  school_id: SCHOOL_ID,
  memoryId: MEMORY_ID,
  query: 'enrollment trends',
  relevanceScore: 0.95,
  timestamp: new Date().toISOString(),
};

const mockPolicy = {
  id: POLICY_ID,
  school_id: SCHOOL_ID,
  name: 'Memory retention policy',
  retentionDays: 365,
  type: 'STRUCTURED',
  created_at: new Date().toISOString(),
};

let service: GeaesipMemoryFabricService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new GeaesipMemoryFabricService(
    mockMemoryRepo as never,
    mockRetrievalRepo as never,
    mockPolicyRepo as never,
  );
});

describe('GeaesipMemoryFabricService', () => {
  describe('listMemories', () => {
    it('should list memories for a school', async () => {
      mockMemoryRepo.findAllBySchool.mockResolvedValue([mockMemory]);

      const result = await service.listMemories(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listMemories('')).rejects.toThrow();
    });
  });

  describe('getMemory', () => {
    it('should retrieve a memory by id', async () => {
      mockMemoryRepo.findById.mockResolvedValue(mockMemory);

      const result = await service.getMemory(SCHOOL_ID, MEMORY_ID);

      expect(result).toEqual(mockMemory);
    });

    it('should throw if memory not found', async () => {
      mockMemoryRepo.findById.mockImplementation(() => { throw new Error('Not found'); });

      await expect(service.getMemory(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createMemory', () => {
    it('should create a memory successfully', async () => {
      mockMemoryRepo.create.mockResolvedValue(mockMemory);

      const result = await service.createMemory(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        key: 'enrollment_trend_2025',
        value: { trend: 'increasing', rate: 0.12 },
        type: 'STRUCTURED',
      } as never);

      expect(result).toEqual(mockMemory);
    });
  });

  describe('updateMemory', () => {
    it('should update a memory', async () => {
      mockMemoryRepo.findById.mockResolvedValue(mockMemory);
      mockMemoryRepo.update.mockResolvedValue({ ...mockMemory, key: 'updated_key' });

      const result = await service.updateMemory(SCHOOL_ID, MEMORY_ID, { key: 'updated_key' });

      expect(result.key).toBe('updated_key');
    });
  });

  describe('deleteMemory', () => {
    it('should delete a memory', async () => {
      mockMemoryRepo.findById.mockResolvedValue(mockMemory);
      mockMemoryRepo.delete.mockResolvedValue(undefined);

      await service.deleteMemory(SCHOOL_ID, MEMORY_ID);

      expect(mockMemoryRepo.delete).toHaveBeenCalledWith(MEMORY_ID);
    });
  });

  describe('listRetrievals', () => {
    it('should list memory retrievals', async () => {
      mockRetrievalRepo.findAllBySchool.mockResolvedValue([mockRetrieval]);

      const result = await service.listRetrievals(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getRetrieval', () => {
    it('should retrieve a retrieval by id', async () => {
      mockRetrievalRepo.findById.mockResolvedValue(mockRetrieval);

      const result = await service.getRetrieval(SCHOOL_ID, RETRIEVAL_ID);

      expect(result).toEqual(mockRetrieval);
    });
  });

  describe('createRetrieval', () => {
    it('should create a retrieval', async () => {
      mockRetrievalRepo.create.mockResolvedValue(mockRetrieval);

      const result = await service.createRetrieval(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        memoryId: MEMORY_ID,
        query: 'enrollment trends',
        relevanceScore: 0.95,
      } as never);

      expect(result.relevanceScore).toBe(0.95);
    });
  });

  describe('listPolicies', () => {
    it('should list memory policies', async () => {
      mockPolicyRepo.findAllBySchool.mockResolvedValue([mockPolicy]);

      const result = await service.listPolicies(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('createPolicy', () => {
    it('should create a memory policy', async () => {
      mockPolicyRepo.create.mockResolvedValue(mockPolicy);

      const result = await service.createPolicy(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        name: 'Memory retention policy',
        retentionDays: 365,
        type: 'STRUCTURED',
      } as never);

      expect(result.name).toBe('Memory retention policy');
    });
  });

  describe('getMemoryFabricStats', () => {
    it('should return stats', async () => {
      mockMemoryRepo.findAllBySchool.mockResolvedValue([mockMemory]);
      mockRetrievalRepo.findAllBySchool.mockResolvedValue([mockRetrieval]);
      mockPolicyRepo.findAllBySchool.mockResolvedValue([mockPolicy]);

      const result = await service.getMemoryFabricStats(SCHOOL_ID);

      expect(result.totalMemories).toBe(1);
      expect(result.totalRetrievals).toBe(1);
      expect(result.totalPolicies).toBe(1);
    });
  });
});
