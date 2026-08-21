import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiStorageService } from '@/features/ai/services/ai-storage.service';
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

describe('AiStorageService', () => {
  let service: AiStorageService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiStorageService(null as any);
  });

  describe('getStorageConfig', () => {
    it('should return a storage config when found', async () => {
      const mockConfig = { id: '1', provider: 's3', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockConfig as any);
      const result = await service.getStorageConfig('school-1', '1');
      expect(result).toEqual(mockConfig);
    });

    it('should throw error when storage config not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getStorageConfig('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listStorageConfigs', () => {
    it('should return a list of storage configs', async () => {
      const mockConfigs = [{ id: '1', provider: 's3' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockConfigs as any);
      const result = await service.listStorageConfigs('school-1', {});
      expect(result).toEqual(mockConfigs);
    });

    it('should return empty array when no storage configs found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listStorageConfigs('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createStorageConfig', () => {
    it('should create a storage config and return it', async () => {
      const mockConfig = { id: '1', provider: 'gcs' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockConfig as any);
      const result = await service.createStorageConfig('school-1', { provider: 'gcs' } as any);
      expect(result).toEqual(mockConfig);
    });
  });

  describe('updateStorageConfig', () => {
    it('should update an existing storage config', async () => {
      const mockConfig = { id: '1', provider: 's3' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockConfig as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockConfig, provider: 'azure' } as any);
      const result = await service.updateStorageConfig('school-1', '1', { provider: 'azure' } as any);
      expect(result.provider).toBe('azure');
    });

    it('should throw error when updating non-existent config', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateStorageConfig('school-1', 'nonexistent', { provider: 's3' } as any)).rejects.toThrow();
    });
  });

  describe('deleteStorageConfig', () => {
    it('should delete an existing storage config', async () => {
      const mockConfig = { id: '1', provider: 's3' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockConfig as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteStorageConfig('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent config', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteStorageConfig('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getStorageUsage', () => {
    it('should return storage usage stats', async () => {
      const mockUsage = { totalBytes: 1073741824, fileCount: 150 };
      vi.mocked(aiRepository.getStorageUsage).mockResolvedValue(mockUsage as any);
      const result = await service.getStorageUsage('school-1');
      expect(result).toEqual(mockUsage);
    });

    it('should handle storage usage retrieval errors', async () => {
      vi.mocked(aiRepository.getStorageUsage).mockRejectedValue(new Error('Storage unavailable'));
      await expect(service.getStorageUsage('school-1')).rejects.toThrow('Storage unavailable');
    });
  });
});
