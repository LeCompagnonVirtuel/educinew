import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiPredictionService } from '@/features/ai/services/ai-prediction.service';
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

describe('AiPredictionService', () => {
  let service: AiPredictionService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiPredictionService(null as any);
  });

  describe('getPrediction', () => {
    it('should return a prediction when found', async () => {
      const mockPrediction = { id: '1', metric: 'enrollment', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockPrediction as any);
      const result = await service.getPrediction('school-1', '1');
      expect(result).toEqual(mockPrediction);
    });

    it('should throw error when prediction not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getPrediction('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listPredictions', () => {
    it('should return a list of predictions', async () => {
      const mockPredictions = [{ id: '1', metric: 'enrollment' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockPredictions as any);
      const result = await service.listPredictions('school-1', {});
      expect(result).toEqual(mockPredictions);
    });

    it('should return empty array when no predictions found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listPredictions('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createPrediction', () => {
    it('should create a prediction and return it', async () => {
      const mockPrediction = { id: '1', metric: 'new_metric' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockPrediction as any);
      const result = await service.createPrediction('school-1', { metric: 'new_metric' } as any);
      expect(result).toEqual(mockPrediction);
    });
  });

  describe('updatePrediction', () => {
    it('should update an existing prediction', async () => {
      const mockPrediction = { id: '1', metric: 'old_metric' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockPrediction as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockPrediction, metric: 'updated_metric' } as any);
      const result = await service.updatePrediction('school-1', '1', { metric: 'updated_metric' } as any);
      expect(result.metric).toBe('updated_metric');
    });

    it('should throw error when updating non-existent prediction', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updatePrediction('school-1', 'nonexistent', { metric: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deletePrediction', () => {
    it('should delete an existing prediction', async () => {
      const mockPrediction = { id: '1', metric: 'enrollment' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockPrediction as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deletePrediction('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent prediction', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deletePrediction('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('runPrediction', () => {
    it('should run a prediction and return results', async () => {
      const mockResult = { predicted: 1250, confidence: 0.87, range: [1200, 1300] };
      vi.mocked(aiRepository.runPrediction).mockResolvedValue(mockResult as any);
      const result = await service.runPrediction('school-1', { metric: 'enrollment', horizon: '6m' } as any);
      expect(result).toEqual(mockResult);
    });

    it('should handle prediction execution errors', async () => {
      vi.mocked(aiRepository.runPrediction).mockRejectedValue(new Error('Model not available'));
      await expect(service.runPrediction('school-1', { metric: 'enrollment' } as any)).rejects.toThrow('Model not available');
    });
  });
});
