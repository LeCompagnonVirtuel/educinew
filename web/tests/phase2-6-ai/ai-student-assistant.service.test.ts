import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiStudentAssistantService } from '@/features/ai/services/ai-student-assistant.service';
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

describe('AiStudentAssistantService', () => {
  let service: AiStudentAssistantService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiStudentAssistantService(null as any);
  });

  describe('getAssistant', () => {
    it('should return an assistant when found', async () => {
      const mockAssistant = { id: '1', name: 'Math Tutor', schoolId: 'school-1' };
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
      const mockAssistants = [{ id: '1', name: 'Math Tutor' }];
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
      const mockAssistant = { id: '1', name: 'New Tutor' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockAssistant as any);
      const result = await service.createAssistant('school-1', { name: 'New Tutor' } as any);
      expect(result).toEqual(mockAssistant);
    });
  });

  describe('updateAssistant', () => {
    it('should update an existing assistant', async () => {
      const mockAssistant = { id: '1', name: 'Old Tutor' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockAssistant, name: 'Updated Tutor' } as any);
      const result = await service.updateAssistant('school-1', '1', { name: 'Updated Tutor' } as any);
      expect(result.name).toBe('Updated Tutor');
    });

    it('should throw error when updating non-existent assistant', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateAssistant('school-1', 'nonexistent', { name: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteAssistant', () => {
    it('should delete an existing assistant', async () => {
      const mockAssistant = { id: '1', name: 'Tutor' };
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

  describe('getStudentSessions', () => {
    it('should return sessions for an assistant', async () => {
      const mockAssistant = { id: '1', name: 'Tutor' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      const mockSessions = [{ id: '1', assistantId: '1' }];
      vi.mocked(aiRepository.findSessionsByAssistantId).mockResolvedValue(mockSessions as any);
      const result = await service.getStudentSessions('school-1', '1');
      expect(result).toEqual(mockSessions);
    });

    it('should throw error when assistant not found for sessions', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getStudentSessions('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getStudentProgress', () => {
    it('should return progress for an assistant', async () => {
      const mockAssistant = { id: '1', name: 'Tutor' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      const mockProgress = { completionRate: 0.8, totalSessions: 10 };
      vi.mocked(aiRepository.findProgressByAssistantId).mockResolvedValue(mockProgress as any);
      const result = await service.getStudentProgress('school-1', '1');
      expect(result).toEqual(mockProgress);
    });

    it('should throw error when assistant not found for progress', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getStudentProgress('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getStudentRecommendations', () => {
    it('should return recommendations for an assistant', async () => {
      const mockAssistant = { id: '1', name: 'Tutor' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      const mockRecommendations = [{ id: '1', type: 'study_plan' }];
      vi.mocked(aiRepository.findRecommendationsByAssistantId).mockResolvedValue(mockRecommendations as any);
      const result = await service.getStudentRecommendations('school-1', '1');
      expect(result).toEqual(mockRecommendations);
    });

    it('should throw error when assistant not found for recommendations', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getStudentRecommendations('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getStudentAssessments', () => {
    it('should return assessments for an assistant', async () => {
      const mockAssistant = { id: '1', name: 'Tutor' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      const mockAssessments = [{ id: '1', score: 85 }];
      vi.mocked(aiRepository.findAssessmentsByAssistantId).mockResolvedValue(mockAssessments as any);
      const result = await service.getStudentAssessments('school-1', '1');
      expect(result).toEqual(mockAssessments);
    });

    it('should throw error when assistant not found for assessments', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getStudentAssessments('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getStudentFeedback', () => {
    it('should return feedback for an assistant', async () => {
      const mockAssistant = { id: '1', name: 'Tutor' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      const mockFeedback = [{ id: '1', rating: 5 }];
      vi.mocked(aiRepository.findFeedbackByAssistantId).mockResolvedValue(mockFeedback as any);
      const result = await service.getStudentFeedback('school-1', '1');
      expect(result).toEqual(mockFeedback);
    });

    it('should throw error when assistant not found for feedback', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getStudentFeedback('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
