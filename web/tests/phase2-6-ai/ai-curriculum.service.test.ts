import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiCurriculumService } from '@/features/ai/services/ai-curriculum.service';
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

describe('AiCurriculumService', () => {
  let service: AiCurriculumService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiCurriculumService(null as any);
  });

  describe('getCurriculum', () => {
    it('should return a curriculum when found', async () => {
      const mockCurriculum = { id: '1', name: 'Math Curriculum', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockCurriculum as any);
      const result = await service.getCurriculum('school-1', '1');
      expect(result).toEqual(mockCurriculum);
    });

    it('should throw error when curriculum not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getCurriculum('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listCurricula', () => {
    it('should return a list of curricula', async () => {
      const mockCurricula = [{ id: '1', name: 'Math' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockCurricula as any);
      const result = await service.listCurricula('school-1', {});
      expect(result).toEqual(mockCurricula);
    });

    it('should return empty array when no curricula found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listCurricula('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createCurriculum', () => {
    it('should create a curriculum and return it', async () => {
      const mockCurriculum = { id: '1', name: 'New Curriculum' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockCurriculum as any);
      const result = await service.createCurriculum('school-1', { name: 'New Curriculum' } as any);
      expect(result).toEqual(mockCurriculum);
    });
  });

  describe('updateCurriculum', () => {
    it('should update an existing curriculum', async () => {
      const mockCurriculum = { id: '1', name: 'Old Name' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockCurriculum as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockCurriculum, name: 'Updated' } as any);
      const result = await service.updateCurriculum('school-1', '1', { name: 'Updated' } as any);
      expect(result.name).toBe('Updated');
    });

    it('should throw error when updating non-existent curriculum', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateCurriculum('school-1', 'nonexistent', { name: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteCurriculum', () => {
    it('should delete an existing curriculum', async () => {
      const mockCurriculum = { id: '1', name: 'Curriculum' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockCurriculum as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteCurriculum('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent curriculum', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteCurriculum('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getLearningObjectives', () => {
    it('should return learning objectives for a curriculum', async () => {
      const mockCurriculum = { id: '1', name: 'Math' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockCurriculum as any);
      const mockObjectives = [{ id: '1', curriculumId: '1' }];
      vi.mocked(aiRepository.findObjectivesByCurriculumId).mockResolvedValue(mockObjectives as any);
      const result = await service.getLearningObjectives('school-1', '1');
      expect(result).toEqual(mockObjectives);
    });

    it('should throw error when curriculum not found for objectives', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getLearningObjectives('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getAssessments', () => {
    it('should return assessments for a curriculum', async () => {
      const mockCurriculum = { id: '1', name: 'Math' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockCurriculum as any);
      const mockAssessments = [{ id: '1', curriculumId: '1' }];
      vi.mocked(aiRepository.findAssessmentsByCurriculumId).mockResolvedValue(mockAssessments as any);
      const result = await service.getAssessments('school-1', '1');
      expect(result).toEqual(mockAssessments);
    });

    it('should throw error when curriculum not found for assessments', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getAssessments('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getCompetencyMap', () => {
    it('should return a competency map for a curriculum', async () => {
      const mockCurriculum = { id: '1', name: 'Math' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockCurriculum as any);
      const mockMap = { id: '1', competencies: [] };
      vi.mocked(aiRepository.findCompetencyMapByCurriculumId).mockResolvedValue(mockMap as any);
      const result = await service.getCompetencyMap('school-1', '1');
      expect(result).toEqual(mockMap);
    });

    it('should throw error when curriculum not found for competency map', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getCompetencyMap('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
