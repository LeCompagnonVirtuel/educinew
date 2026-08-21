import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiAnalyticsService } from '@/features/ai/services/ai-analytics.service';
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

describe('AiAnalyticsService', () => {
  let service: AiAnalyticsService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiAnalyticsService(null as any);
  });

  describe('getAnalytics', () => {
    it('should return analytics data when found', async () => {
      const mockAnalytics = { id: '1', metric: 'usage', value: 1250, schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAnalytics as any);
      const result = await service.getAnalytics('school-1', '1');
      expect(result).toEqual(mockAnalytics);
    });

    it('should throw error when analytics not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getAnalytics('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listAnalytics', () => {
    it('should return a list of analytics', async () => {
      const mockAnalytics = [{ id: '1', metric: 'usage' }, { id: '2', metric: 'cost' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockAnalytics as any);
      const result = await service.listAnalytics('school-1', {});
      expect(result).toEqual(mockAnalytics);
    });

    it('should return empty array when no analytics found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listAnalytics('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createAnalytics', () => {
    it('should create analytics entry and return it', async () => {
      const mockAnalytics = { id: '1', metric: 'new_metric' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockAnalytics as any);
      const result = await service.createAnalytics('school-1', { metric: 'new_metric' } as any);
      expect(result).toEqual(mockAnalytics);
    });
  });

  describe('updateAnalytics', () => {
    it('should update an existing analytics entry', async () => {
      const mockAnalytics = { id: '1', metric: 'usage', value: 100 };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAnalytics as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockAnalytics, value: 200 } as any);
      const result = await service.updateAnalytics('school-1', '1', { value: 200 } as any);
      expect(result.value).toBe(200);
    });

    it('should throw error when updating non-existent analytics', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateAnalytics('school-1', 'nonexistent', { value: 200 } as any)).rejects.toThrow();
    });
  });

  describe('deleteAnalytics', () => {
    it('should delete an existing analytics entry', async () => {
      const mockAnalytics = { id: '1', metric: 'usage' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAnalytics as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteAnalytics('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent analytics', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteAnalytics('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getTokenUsageAnalytics', () => {
    it('should return token usage analytics', async () => {
      const mockResult = { totalTokens: 50000, cost: 12.50, byModel: {} };
      vi.mocked(aiRepository.getTokenUsageAnalytics).mockResolvedValue(mockResult as any);
      const result = await service.getTokenUsageAnalytics('school-1', { startDate: '2025-01-01', endDate: '2025-01-31' } as any);
      expect(result).toEqual(mockResult);
    });

    it('should handle analytics retrieval errors', async () => {
      vi.mocked(aiRepository.getTokenUsageAnalytics).mockRejectedValue(new Error('Query failed'));
      await expect(service.getTokenUsageAnalytics('school-1', { startDate: '2025-01-01', endDate: '2025-01-31' } as any)).rejects.toThrow('Query failed');
    });
  });

  describe('getLatencyAnalytics', () => {
    it('should return latency analytics', async () => {
      const mockResult = { avgLatency: 450, p95Latency: 800, p99Latency: 1200 };
      vi.mocked(aiRepository.getLatencyAnalytics).mockResolvedValue(mockResult as any);
      const result = await service.getLatencyAnalytics('school-1', { startDate: '2025-01-01', endDate: '2025-01-31' } as any);
      expect(result).toEqual(mockResult);
    });

    it('should handle latency analytics errors', async () => {
      vi.mocked(aiRepository.getLatencyAnalytics).mockRejectedValue(new Error('Metrics unavailable'));
      await expect(service.getLatencyAnalytics('school-1', { startDate: '2025-01-01', endDate: '2025-01-31' } as any)).rejects.toThrow('Metrics unavailable');
    });
  });

  describe('getCostAnalytics', () => {
    it('should return cost analytics', async () => {
      const mockResult = { totalCost: 250.75, budget: 500, remaining: 249.25 };
      vi.mocked(aiRepository.getCostAnalytics).mockResolvedValue(mockResult as any);
      const result = await service.getCostAnalytics('school-1', { startDate: '2025-01-01', endDate: '2025-01-31' } as any);
      expect(result).toEqual(mockResult);
    });

    it('should handle cost analytics errors', async () => {
      vi.mocked(aiRepository.getCostAnalytics).mockRejectedValue(new Error('Billing error'));
      await expect(service.getCostAnalytics('school-1', { startDate: '2025-01-01', endDate: '2025-01-31' } as any)).rejects.toThrow('Billing error');
    });
  });

  describe('getUsageReport', () => {
    it('should return a usage report', async () => {
      const mockReport = { period: '2025-01', totalRequests: 1500, uniqueUsers: 45 };
      vi.mocked(aiRepository.getUsageReport).mockResolvedValue(mockReport as any);
      const result = await service.getUsageReport('school-1', { period: '2025-01' } as any);
      expect(result).toEqual(mockReport);
    });

    it('should handle report generation errors', async () => {
      vi.mocked(aiRepository.getUsageReport).mockRejectedValue(new Error('Report generation failed'));
      await expect(service.getUsageReport('school-1', { period: '2025-01' } as any)).rejects.toThrow('Report generation failed');
    });
  });
});
