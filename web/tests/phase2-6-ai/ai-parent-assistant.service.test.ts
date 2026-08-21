import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiParentAssistantService } from '@/features/ai/services/ai-parent-assistant.service';
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

describe('AiParentAssistantService', () => {
  let service: AiParentAssistantService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiParentAssistantService(null as any);
  });

  describe('getAssistant', () => {
    it('should return an assistant when found', async () => {
      const mockAssistant = { id: '1', name: 'Parent Assistant', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      const result = await service.getAssistant('school-1', '1');
      expect(result).toEqual(mockAssistant);
    });

    it('should throw error when assistant not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getAssistant('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listAssistants', () => {
    it('should return a list of assistants', async () => {
      const mockAssistants = [{ id: '1', name: 'Parent Assistant' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockAssistants as any);
      const result = await service.listAssistants('school-1', {});
      expect(result).toEqual(mockAssistants);
    });

    it('should return empty array when no assistants found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listAssistants('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createAssistant', () => {
    it('should create an assistant and return it', async () => {
      const mockAssistant = { id: '1', name: 'New Parent Assistant' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockAssistant as any);
      const result = await service.createAssistant('school-1', { name: 'New Parent Assistant' } as any);
      expect(result).toEqual(mockAssistant);
    });
  });

  describe('updateAssistant', () => {
    it('should update an existing assistant', async () => {
      const mockAssistant = { id: '1', name: 'Old Assistant' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockAssistant, name: 'Updated' } as any);
      const result = await service.updateAssistant('school-1', '1', { name: 'Updated' } as any);
      expect(result.name).toBe('Updated');
    });

    it('should throw error when updating non-existent assistant', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateAssistant('school-1', 'nonexistent', { name: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteAssistant', () => {
    it('should delete an existing assistant', async () => {
      const mockAssistant = { id: '1', name: 'Assistant' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteAssistant('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent assistant', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteAssistant('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getChildProgress', () => {
    it('should return child progress data', async () => {
      const mockAssistant = { id: '1', name: 'Parent Assistant' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      const mockProgress = { studentId: 'student-1', completionRate: 0.85 };
      vi.mocked(aiRepository.findChildProgress).mockResolvedValue(mockProgress as any);
      const result = await service.getChildProgress('school-1', '1', 'student-1');
      expect(result).toEqual(mockProgress);
    });

    it('should throw error when assistant not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getChildProgress('school-1', 'nonexistent', 'student-1')).rejects.toThrow();
    });
  });

  describe('getParentInsights', () => {
    it('should return parent insights', async () => {
      const mockAssistant = { id: '1', name: 'Parent Assistant' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      const mockInsights = [{ id: '1', insightType: 'attendance' }];
      vi.mocked(aiRepository.findInsightsByAssistantId).mockResolvedValue(mockInsights as any);
      const result = await service.getParentInsights('school-1', '1');
      expect(result).toEqual(mockInsights);
    });

    it('should throw error when assistant not found for insights', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getParentInsights('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getParentRecommendations', () => {
    it('should return parent recommendations', async () => {
      const mockAssistant = { id: '1', name: 'Parent Assistant' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      const mockRecommendations = [{ id: '1', type: 'tutoring' }];
      vi.mocked(aiRepository.findRecommendationsByAssistantId).mockResolvedValue(mockRecommendations as any);
      const result = await service.getParentRecommendations('school-1', '1');
      expect(result).toEqual(mockRecommendations);
    });

    it('should throw error when assistant not found for recommendations', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getParentRecommendations('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
