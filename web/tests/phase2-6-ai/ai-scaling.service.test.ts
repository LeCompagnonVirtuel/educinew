import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiScalingService } from '@/features/ai/services/ai-scaling.service';
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

describe('AiScalingService', () => {
  let service: AiScalingService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiScalingService(null as any);
  });

  describe('getScalingConfig', () => {
    it('should return a scaling config when found', async () => {
      const mockConfig = { id: '1', minReplicas: 2, schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockConfig as any);
      const result = await service.getScalingConfig('school-1', '1');
      expect(result).toEqual(mockConfig);
    });

    it('should throw error when scaling config not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getScalingConfig('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listScalingConfigs', () => {
    it('should return a list of scaling configs', async () => {
      const mockConfigs = [{ id: '1', minReplicas: 2 }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockConfigs as any);
      const result = await service.listScalingConfigs('school-1', {});
      expect(result).toEqual(mockConfigs);
    });

    it('should return empty array when no scaling configs found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listScalingConfigs('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createScalingConfig', () => {
    it('should create a scaling config and return it', async () => {
      const mockConfig = { id: '1', minReplicas: 1 };
      vi.mocked(aiRepository.create).mockResolvedValue(mockConfig as any);
      const result = await service.createScalingConfig('school-1', { minReplicas: 1 } as any);
      expect(result).toEqual(mockConfig);
    });
  });

  describe('updateScalingConfig', () => {
    it('should update an existing scaling config', async () => {
      const mockConfig = { id: '1', minReplicas: 2 };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockConfig as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockConfig, minReplicas: 4 } as any);
      const result = await service.updateScalingConfig('school-1', '1', { minReplicas: 4 } as any);
      expect(result.minReplicas).toBe(4);
    });

    it('should throw error when updating non-existent scaling config', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateScalingConfig('school-1', 'nonexistent', { minReplicas: 1 } as any)).rejects.toThrow();
    });
  });

  describe('deleteScalingConfig', () => {
    it('should delete an existing scaling config', async () => {
      const mockConfig = { id: '1', minReplicas: 2 };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockConfig as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteScalingConfig('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent scaling config', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteScalingConfig('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
