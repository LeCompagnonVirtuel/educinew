import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiCacheService } from '@/features/ai/services/ai-cache.service';
import { aiRepository } from '../repositories/ai.repository';

vi.mock('@/features/repositories/ai.repository', () => ({
  aiRepository: {
    findById: vi.fn(),
    findAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('AiCacheService', () => {
  let service: AiCacheService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiCacheService(null as any);
  });

  describe('getCacheEntry', () => {
    it('should return a cache entry when found', async () => {
      const mockEntry = { id: '1', key: 'model-response', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockEntry as any);
      const result = await service.getCacheEntry('school-1', '1');
      expect(result).toEqual(mockEntry);
    });

    it('should throw error when cache entry not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getCacheEntry('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listCacheEntries', () => {
    it('should return a list of cache entries', async () => {
      const mockEntries = [{ id: '1', key: 'response-1' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockEntries as any);
      const result = await service.listCacheEntries('school-1', {});
      expect(result).toEqual(mockEntries);
    });

    it('should return empty array when no cache entries found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listCacheEntries('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createCacheEntry', () => {
    it('should create a cache entry and return it', async () => {
      const mockEntry = { id: '1', key: 'new-key' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockEntry as any);
      const result = await service.createCacheEntry('school-1', { key: 'new-key' } as any);
      expect(result).toEqual(mockEntry);
    });
  });

  describe('deleteCacheEntry', () => {
    it('should delete an existing cache entry', async () => {
      const mockEntry = { id: '1', key: 'cached' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockEntry as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteCacheEntry('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent cache entry', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteCacheEntry('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
