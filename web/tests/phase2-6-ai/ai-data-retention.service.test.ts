import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiDataRetentionService } from '@/features/ai/services/ai-data-retention.service';
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

describe('AiDataRetentionService', () => {
  let service: AiDataRetentionService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiDataRetentionService(null as any);
  });

  describe('getRetentionPolicy', () => {
    it('should return a retention policy when found', async () => {
      const mockPolicy = { id: '1', dataType: 'conversations', retentionDays: 365, schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockPolicy as any);
      const result = await service.getRetentionPolicy('school-1', '1');
      expect(result).toEqual(mockPolicy);
    });

    it('should throw error when retention policy not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getRetentionPolicy('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listRetentionPolicies', () => {
    it('should return a list of retention policies', async () => {
      const mockPolicies = [{ id: '1', dataType: 'conversations' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockPolicies as any);
      const result = await service.listRetentionPolicies('school-1', {});
      expect(result).toEqual(mockPolicies);
    });

    it('should return empty array when no policies found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listRetentionPolicies('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createRetentionPolicy', () => {
    it('should create a retention policy and return it', async () => {
      const mockPolicy = { id: '1', dataType: 'logs' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockPolicy as any);
      const result = await service.createRetentionPolicy('school-1', { dataType: 'logs' } as any);
      expect(result).toEqual(mockPolicy);
    });
  });

  describe('deleteRetentionPolicy', () => {
    it('should delete an existing retention policy', async () => {
      const mockPolicy = { id: '1', dataType: 'conversations' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockPolicy as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteRetentionPolicy('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent policy', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteRetentionPolicy('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
