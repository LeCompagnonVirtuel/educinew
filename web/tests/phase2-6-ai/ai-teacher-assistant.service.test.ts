import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiTeacherAssistantService } from '@/features/ai/services/ai-teacher-assistant.service';
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

describe('AiTeacherAssistantService', () => {
  let service: AiTeacherAssistantService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiTeacherAssistantService(null as any);
  });

  describe('getAssistant', () => {
    it('should return an assistant when found', async () => {
      const mockAssistant = { id: '1', name: 'Teaching Assistant', schoolId: 'school-1' };
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
      const mockAssistants = [{ id: '1', name: 'Teaching Assistant' }];
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
      const mockAssistant = { id: '1', name: 'New Assistant' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockAssistant as any);
      const result = await service.createAssistant('school-1', { name: 'New Assistant' } as any);
      expect(result).toEqual(mockAssistant);
    });
  });

  describe('updateAssistant', () => {
    it('should update an existing assistant', async () => {
      const mockAssistant = { id: '1', name: 'Old Assistant' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockAssistant, name: 'Updated Assistant' } as any);
      const result = await service.updateAssistant('school-1', '1', { name: 'Updated Assistant' } as any);
      expect(result.name).toBe('Updated Assistant');
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

  describe('getTeachingSessions', () => {
    it('should return sessions for an assistant', async () => {
      const mockAssistant = { id: '1', name: 'Teaching Assistant' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      const mockSessions = [{ id: '1', assistantId: '1' }];
      vi.mocked(aiRepository.findSessionsByAssistantId).mockResolvedValue(mockSessions as any);
      const result = await service.getTeachingSessions('school-1', '1');
      expect(result).toEqual(mockSessions);
    });

    it('should throw error when assistant not found for sessions', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getTeachingSessions('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getContentImprovements', () => {
    it('should return content improvements for an assistant', async () => {
      const mockAssistant = { id: '1', name: 'Teaching Assistant' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      const mockImprovements = [{ id: '1', type: 'clarity' }];
      vi.mocked(aiRepository.findImprovementsByAssistantId).mockResolvedValue(mockImprovements as any);
      const result = await service.getContentImprovements('school-1', '1');
      expect(result).toEqual(mockImprovements);
    });

    it('should throw error when assistant not found for improvements', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getContentImprovements('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getExerciseSets', () => {
    it('should return exercise sets for an assistant', async () => {
      const mockAssistant = { id: '1', name: 'Teaching Assistant' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      const mockExercises = [{ id: '1', title: 'Practice Set' }];
      vi.mocked(aiRepository.findExerciseSetsByAssistantId).mockResolvedValue(mockExercises as any);
      const result = await service.getExerciseSets('school-1', '1');
      expect(result).toEqual(mockExercises);
    });

    it('should throw error when assistant not found for exercises', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getExerciseSets('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getClassInsights', () => {
    it('should return class insights for an assistant', async () => {
      const mockAssistant = { id: '1', name: 'Teaching Assistant' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      const mockInsights = [{ id: '1', classId: 'class-1' }];
      vi.mocked(aiRepository.findInsightsByAssistantId).mockResolvedValue(mockInsights as any);
      const result = await service.getClassInsights('school-1', '1');
      expect(result).toEqual(mockInsights);
    });

    it('should throw error when assistant not found for insights', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getClassInsights('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getLessonSummaries', () => {
    it('should return lesson summaries for an assistant', async () => {
      const mockAssistant = { id: '1', name: 'Teaching Assistant' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      const mockSummaries = [{ id: '1', lessonId: 'lesson-1' }];
      vi.mocked(aiRepository.findSummariesByAssistantId).mockResolvedValue(mockSummaries as any);
      const result = await service.getLessonSummaries('school-1', '1');
      expect(result).toEqual(mockSummaries);
    });

    it('should throw error when assistant not found for summaries', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getLessonSummaries('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getAutoFeedback', () => {
    it('should return auto feedback for an assistant', async () => {
      const mockAssistant = { id: '1', name: 'Teaching Assistant' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      const mockFeedback = [{ id: '1', feedbackType: 'positive' }];
      vi.mocked(aiRepository.findFeedbackByAssistantId).mockResolvedValue(mockFeedback as any);
      const result = await service.getAutoFeedback('school-1', '1');
      expect(result).toEqual(mockFeedback);
    });

    it('should throw error when assistant not found for feedback', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getAutoFeedback('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
