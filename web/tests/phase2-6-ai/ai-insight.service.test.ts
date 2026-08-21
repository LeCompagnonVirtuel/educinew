import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiInsightService } from '@/features/ai/services/ai-insight.service';
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

describe('AiInsightService', () => {
  let service: AiInsightService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiInsightService(null as any);
  });

  describe('getInsight', () => {
    it('should return an insight when found', async () => {
      const mockInsight = { id: '1', title: 'Usage Spike', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockInsight as any);
      const result = await service.getInsight('school-1', '1');
      expect(result).toEqual(mockInsight);
    });

    it('should throw error when insight not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getInsight('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listInsights', () => {
    it('should return a list of insights', async () => {
      const mockInsights = [{ id: '1', title: 'Insight 1' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockInsights as any);
      const result = await service.listInsights('school-1', {});
      expect(result).toEqual(mockInsights);
    });

    it('should return empty array when no insights found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listInsights('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createInsight', () => {
    it('should create an insight and return it', async () => {
      const mockInsight = { id: '1', title: 'New Insight' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockInsight as any);
      const result = await service.createInsight('school-1', { title: 'New Insight' } as any);
      expect(result).toEqual(mockInsight);
    });
  });

  describe('updateInsight', () => {
    it('should update an existing insight', async () => {
      const mockInsight = { id: '1', title: 'Old Title' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockInsight as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockInsight, title: 'Updated Title' } as any);
      const result = await service.updateInsight('school-1', '1', { title: 'Updated Title' } as any);
      expect(result.title).toBe('Updated Title');
    });

    it('should throw error when updating non-existent insight', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateInsight('school-1', 'nonexistent', { title: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteInsight', () => {
    it('should delete an existing insight', async () => {
      const mockInsight = { id: '1', title: 'Insight' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockInsight as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteInsight('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent insight', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteInsight('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('generateInsights', () => {
    it('should generate insights from data', async () => {
      const mockInsights = [{ title: 'Cost increase detected', severity: 'warning' }];
      vi.mocked(aiRepository.generateInsights).mockResolvedValue(mockInsights as any);
      const result = await service.generateInsights('school-1', { dataType: 'usage', period: '30d' } as any);
      expect(result).toEqual(mockInsights);
    });

    it('should handle insight generation errors', async () => {
      vi.mocked(aiRepository.generateInsights).mockRejectedValue(new Error('Insufficient data'));
      await expect(service.generateInsights('school-1', { dataType: 'usage', period: '1d' } as any)).rejects.toThrow('Insufficient data');
    });
  });
});
