import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiOfflineService } from '@/features/ai/services/ai-offline.service';
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

describe('AiOfflineService', () => {
  let service: AiOfflineService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiOfflineService(null as any);
  });

  describe('getOfflineConfig', () => {
    it('should return an offline config when found', async () => {
      const mockConfig = { id: '1', syncEnabled: true, schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockConfig as any);
      const result = await service.getOfflineConfig('school-1', '1');
      expect(result).toEqual(mockConfig);
    });

    it('should throw error when offline config not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getOfflineConfig('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listOfflineConfigs', () => {
    it('should return a list of offline configs', async () => {
      const mockConfigs = [{ id: '1', syncEnabled: true }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockConfigs as any);
      const result = await service.listOfflineConfigs('school-1', {});
      expect(result).toEqual(mockConfigs);
    });

    it('should return empty array when no offline configs found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listOfflineConfigs('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createOfflineConfig', () => {
    it('should create an offline config and return it', async () => {
      const mockConfig = { id: '1', syncEnabled: false };
      vi.mocked(aiRepository.create).mockResolvedValue(mockConfig as any);
      const result = await service.createOfflineConfig('school-1', { syncEnabled: false } as any);
      expect(result).toEqual(mockConfig);
    });
  });

  describe('deleteOfflineConfig', () => {
    it('should delete an existing offline config', async () => {
      const mockConfig = { id: '1', syncEnabled: true };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockConfig as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteOfflineConfig('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent offline config', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteOfflineConfig('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
