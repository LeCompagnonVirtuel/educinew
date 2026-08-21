import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiPromptVersionService } from '@/features/ai/services/ai-prompt-version.service';
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

describe('AiPromptVersionService', () => {
  let service: AiPromptVersionService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiPromptVersionService(null as any);
  });

  describe('getVersion', () => {
    it('should return a version when found', async () => {
      const mockVersion = { id: '1', version: 2, templateId: 'tpl-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockVersion as any);
      const result = await service.getVersion('school-1', '1');
      expect(result).toEqual(mockVersion);
    });

    it('should throw error when version not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getVersion('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listVersions', () => {
    it('should return a list of versions', async () => {
      const mockVersions = [{ id: '1', version: 1 }, { id: '2', version: 2 }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockVersions as any);
      const result = await service.listVersions('school-1', {});
      expect(result).toEqual(mockVersions);
    });

    it('should return empty array when no versions found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listVersions('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createVersion', () => {
    it('should create a version and return it', async () => {
      const mockVersion = { id: '1', version: 1 };
      vi.mocked(aiRepository.create).mockResolvedValue(mockVersion as any);
      const result = await service.createVersion('school-1', { version: 1 } as any);
      expect(result).toEqual(mockVersion);
    });
  });

  describe('updateVersion', () => {
    it('should update an existing version', async () => {
      const mockVersion = { id: '1', version: 1 };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockVersion as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockVersion, version: 2 } as any);
      const result = await service.updateVersion('school-1', '1', { version: 2 } as any);
      expect(result.version).toBe(2);
    });

    it('should throw error when updating non-existent version', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateVersion('school-1', 'nonexistent', { version: 2 } as any)).rejects.toThrow();
    });
  });

  describe('deleteVersion', () => {
    it('should delete an existing version', async () => {
      const mockVersion = { id: '1', version: 1 };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockVersion as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteVersion('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent version', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteVersion('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
