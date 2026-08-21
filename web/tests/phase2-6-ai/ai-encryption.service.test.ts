import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiEncryptionService } from '@/features/ai/services/ai-encryption.service';
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

describe('AiEncryptionService', () => {
  let service: AiEncryptionService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiEncryptionService(null as any);
  });

  describe('getEncryptionConfig', () => {
    it('should return an encryption config when found', async () => {
      const mockConfig = { id: '1', algorithm: 'AES-256', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockConfig as any);
      const result = await service.getEncryptionConfig('school-1', '1');
      expect(result).toEqual(mockConfig);
    });

    it('should throw error when encryption config not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getEncryptionConfig('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listEncryptionConfigs', () => {
    it('should return a list of encryption configs', async () => {
      const mockConfigs = [{ id: '1', algorithm: 'AES-256' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockConfigs as any);
      const result = await service.listEncryptionConfigs('school-1', {});
      expect(result).toEqual(mockConfigs);
    });

    it('should return empty array when no configs found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listEncryptionConfigs('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createEncryptionConfig', () => {
    it('should create an encryption config and return it', async () => {
      const mockConfig = { id: '1', algorithm: 'RSA-2048' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockConfig as any);
      const result = await service.createEncryptionConfig('school-1', { algorithm: 'RSA-2048' } as any);
      expect(result).toEqual(mockConfig);
    });
  });

  describe('deleteEncryptionConfig', () => {
    it('should delete an existing encryption config', async () => {
      const mockConfig = { id: '1', algorithm: 'AES-256' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockConfig as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteEncryptionConfig('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent config', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteEncryptionConfig('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
