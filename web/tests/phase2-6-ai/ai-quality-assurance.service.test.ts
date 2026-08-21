import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiQualityAssuranceService } from '@/features/ai/services/ai-quality-assurance.service';
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

describe('AiQualityAssuranceService', () => {
  let service: AiQualityAssuranceService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiQualityAssuranceService(null as any);
  });

  describe('getQualityCheck', () => {
    it('should return a quality check when found', async () => {
      const mockCheck = { id: '1', status: 'passed', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockCheck as any);
      const result = await service.getQualityCheck('school-1', '1');
      expect(result).toEqual(mockCheck);
    });

    it('should throw error when quality check not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getQualityCheck('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listQualityChecks', () => {
    it('should return a list of quality checks', async () => {
      const mockChecks = [{ id: '1', status: 'passed' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockChecks as any);
      const result = await service.listQualityChecks('school-1', {});
      expect(result).toEqual(mockChecks);
    });

    it('should return empty array when no checks found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listQualityChecks('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createQualityCheck', () => {
    it('should create a quality check and return it', async () => {
      const mockCheck = { id: '1', status: 'pending' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockCheck as any);
      const result = await service.createQualityCheck('school-1', { status: 'pending' } as any);
      expect(result).toEqual(mockCheck);
    });
  });

  describe('updateQualityCheck', () => {
    it('should update an existing quality check', async () => {
      const mockCheck = { id: '1', status: 'pending' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockCheck as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockCheck, status: 'passed' } as any);
      const result = await service.updateQualityCheck('school-1', '1', { status: 'passed' } as any);
      expect(result.status).toBe('passed');
    });

    it('should throw error when updating non-existent quality check', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateQualityCheck('school-1', 'nonexistent', { status: 'passed' } as any)).rejects.toThrow();
    });
  });

  describe('deleteQualityCheck', () => {
    it('should delete an existing quality check', async () => {
      const mockCheck = { id: '1', status: 'passed' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockCheck as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteQualityCheck('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent quality check', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteQualityCheck('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('runQualityAssessment', () => {
    it('should run a quality assessment on output', async () => {
      const mockResult = { score: 0.85, issues: [] };
      vi.mocked(aiRepository.runQualityAssessment).mockResolvedValue(mockResult as any);
      const result = await service.runQualityAssessment('school-1', { output: 'test output', modelId: 'model-1' } as any);
      expect(result).toEqual(mockResult);
    });

    it('should return issues when quality is below threshold', async () => {
      const mockResult = { score: 0.45, issues: ['Low coherence'] };
      vi.mocked(aiRepository.runQualityAssessment).mockResolvedValue(mockResult as any);
      const result = await service.runQualityAssessment('school-1', { output: 'poor output', modelId: 'model-1' } as any);
      expect(result.issues).toHaveLength(1);
    });
  });
});
