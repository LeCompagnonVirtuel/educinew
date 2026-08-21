import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiRecommendationService } from '@/features/ai/services/ai-recommendation.service';
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

describe('AiRecommendationService', () => {
  let service: AiRecommendationService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiRecommendationService(null as any);
  });

  describe('getRecommendation', () => {
    it('should return a recommendation when found', async () => {
      const mockRec = { id: '1', type: 'course', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockRec as any);
      const result = await service.getRecommendation('school-1', '1');
      expect(result).toEqual(mockRec);
    });

    it('should throw error when recommendation not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getRecommendation('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listRecommendations', () => {
    it('should return a list of recommendations', async () => {
      const mockRecs = [{ id: '1', type: 'course' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockRecs as any);
      const result = await service.listRecommendations('school-1', {});
      expect(result).toEqual(mockRecs);
    });

    it('should return empty array when no recommendations found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listRecommendations('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createRecommendation', () => {
    it('should create a recommendation and return it', async () => {
      const mockRec = { id: '1', type: 'tutor' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockRec as any);
      const result = await service.createRecommendation('school-1', { type: 'tutor' } as any);
      expect(result).toEqual(mockRec);
    });
  });

  describe('updateRecommendation', () => {
    it('should update an existing recommendation', async () => {
      const mockRec = { id: '1', type: 'course' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockRec as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockRec, type: 'resource' } as any);
      const result = await service.updateRecommendation('school-1', '1', { type: 'resource' } as any);
      expect(result.type).toBe('resource');
    });

    it('should throw error when updating non-existent recommendation', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateRecommendation('school-1', 'nonexistent', { type: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteRecommendation', () => {
    it('should delete an existing recommendation', async () => {
      const mockRec = { id: '1', type: 'course' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockRec as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteRecommendation('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent recommendation', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteRecommendation('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('generateRecommendations', () => {
    it('should generate recommendations for a user', async () => {
      const mockRecs = [{ type: 'course', title: 'Advanced Math', score: 0.95 }];
      vi.mocked(aiRepository.generateRecommendations).mockResolvedValue(mockRecs as any);
      const result = await service.generateRecommendations('school-1', { userId: 'user-1', context: 'learning' } as any);
      expect(result).toEqual(mockRecs);
    });

    it('should handle recommendation generation errors', async () => {
      vi.mocked(aiRepository.generateRecommendations).mockRejectedValue(new Error('No data available'));
      await expect(service.generateRecommendations('school-1', { userId: 'user-1' } as any)).rejects.toThrow('No data available');
    });
  });
});
