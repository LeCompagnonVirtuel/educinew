import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiModerationService } from '@/features/ai/services/ai-moderation.service';
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

describe('AiModerationService', () => {
  let service: AiModerationService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiModerationService(null as any);
  });

  describe('getModerationResult', () => {
    it('should return a moderation result when found', async () => {
      const mockResult = { id: '1', status: 'approved', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockResult as any);
      const result = await service.getModerationResult('school-1', '1');
      expect(result).toEqual(mockResult);
    });

    it('should throw error when moderation result not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getModerationResult('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listModerationResults', () => {
    it('should return a list of moderation results', async () => {
      const mockResults = [{ id: '1', status: 'approved' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockResults as any);
      const result = await service.listModerationResults('school-1', {});
      expect(result).toEqual(mockResults);
    });

    it('should return empty array when no results found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listModerationResults('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createModerationResult', () => {
    it('should create a moderation result and return it', async () => {
      const mockResult = { id: '1', status: 'pending' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockResult as any);
      const result = await service.createModerationResult('school-1', { status: 'pending' } as any);
      expect(result).toEqual(mockResult);
    });
  });

  describe('updateModerationResult', () => {
    it('should update an existing moderation result', async () => {
      const mockResult = { id: '1', status: 'pending' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockResult as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockResult, status: 'approved' } as any);
      const result = await service.updateModerationResult('school-1', '1', { status: 'approved' } as any);
      expect(result.status).toBe('approved');
    });

    it('should throw error when updating non-existent result', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateModerationResult('school-1', 'nonexistent', { status: 'approved' } as any)).rejects.toThrow();
    });
  });

  describe('deleteModerationResult', () => {
    it('should delete an existing moderation result', async () => {
      const mockResult = { id: '1', status: 'approved' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockResult as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteModerationResult('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent result', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteModerationResult('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('moderateContent', () => {
    it('should moderate content and return result', async () => {
      const mockResult = { approved: true, flags: [] };
      vi.mocked(aiRepository.moderateContent).mockResolvedValue(mockResult as any);
      const result = await service.moderateContent('school-1', { content: 'Clean content' } as any);
      expect(result.approved).toBe(true);
    });

    it('should flag inappropriate content', async () => {
      const mockResult = { approved: false, flags: ['profanity'] };
      vi.mocked(aiRepository.moderateContent).mockResolvedValue(mockResult as any);
      const result = await service.moderateContent('school-1', { content: 'Bad words' } as any);
      expect(result.approved).toBe(false);
    });

    it('should handle moderation service errors', async () => {
      vi.mocked(aiRepository.moderateContent).mockRejectedValue(new Error('Service down'));
      await expect(service.moderateContent('school-1', { content: 'test' } as any)).rejects.toThrow('Service down');
    });
  });

  describe('getModerationStats', () => {
    it('should return moderation statistics', async () => {
      const mockStats = { total: 100, approved: 90, rejected: 10 };
      vi.mocked(aiRepository.getModerationStats).mockResolvedValue(mockStats as any);
      const result = await service.getModerationStats('school-1');
      expect(result).toEqual(mockStats);
    });

    it('should handle stats retrieval errors', async () => {
      vi.mocked(aiRepository.getModerationStats).mockRejectedValue(new Error('Stats unavailable'));
      await expect(service.getModerationStats('school-1')).rejects.toThrow('Stats unavailable');
    });
  });
});
