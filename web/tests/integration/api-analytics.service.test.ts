import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createApiAnalyticsService } from '../../src/features/integration/services/api-analytics.service';

describe('ApiAnalyticsService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getAnalyticsOverview: vi.fn(),
      getRequestStats: vi.fn(),
      getErrorStats: vi.fn(),
      getPerformanceMetrics: vi.fn(),
      getUsageByEndpoint: vi.fn(),
      getUsageByUser: vi.fn(),
      getUsageByApp: vi.fn(),
      exportAnalytics: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createApiAnalyticsService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getAnalyticsOverview).toBeInstanceOf(Function);
    expect(service.getRequestStats).toBeInstanceOf(Function);
    expect(service.getErrorStats).toBeInstanceOf(Function);
    expect(service.getPerformanceMetrics).toBeInstanceOf(Function);
    expect(service.getUsageByEndpoint).toBeInstanceOf(Function);
    expect(service.getUsageByUser).toBeInstanceOf(Function);
    expect(service.getUsageByApp).toBeInstanceOf(Function);
    expect(service.exportAnalytics).toBeInstanceOf(Function);
  });

  describe('getAnalyticsOverview', () => {
    it('should return analytics overview', async () => {
      mockRepository.getAnalyticsOverview.mockResolvedValue({ totalRequests: 10000, totalErrors: 50, averageResponseTime: 200 });
      const service = createApiAnalyticsService(mockRepository);
      const result = await service.getAnalyticsOverview('school-1');
      expect(result.totalRequests).toBe(10000);
    });

    it('should return overview with filters', async () => {
      mockRepository.getAnalyticsOverview.mockResolvedValue({ totalRequests: 100 });
      const service = createApiAnalyticsService(mockRepository);
      await service.getAnalyticsOverview('school-1', { since: '2024-01-01', until: '2024-01-31' });
      expect(mockRepository.getAnalyticsOverview).toHaveBeenCalledWith('school-1', { since: '2024-01-01', until: '2024-01-31' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createApiAnalyticsService(mockRepository);
      await expect(service.getAnalyticsOverview('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty overview', async () => {
      mockRepository.getAnalyticsOverview.mockResolvedValue({ totalRequests: 0, totalErrors: 0 });
      const service = createApiAnalyticsService(mockRepository);
      const result = await service.getAnalyticsOverview('school-1');
      expect(result.totalRequests).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getAnalyticsOverview.mockRejectedValue(new Error('DB error'));
      const service = createApiAnalyticsService(mockRepository);
      await expect(service.getAnalyticsOverview('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getRequestStats', () => {
    it('should return request stats', async () => {
      mockRepository.getRequestStats.mockResolvedValue({ totalRequests: 1000, successfulRequests: 950, failedRequests: 50 });
      const service = createApiAnalyticsService(mockRepository);
      const result = await service.getRequestStats('school-1');
      expect(result.totalRequests).toBe(1000);
    });

    it('should return stats with filters', async () => {
      mockRepository.getRequestStats.mockResolvedValue({ requests: [] });
      const service = createApiAnalyticsService(mockRepository);
      await service.getRequestStats('school-1', { endpoint: '/api/documents' });
      expect(mockRepository.getRequestStats).toHaveBeenCalledWith('school-1', { endpoint: '/api/documents' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createApiAnalyticsService(mockRepository);
      await expect(service.getRequestStats('')).rejects.toThrow('schoolId is required');
    });

    it('should return zero stats', async () => {
      mockRepository.getRequestStats.mockResolvedValue({ totalRequests: 0 });
      const service = createApiAnalyticsService(mockRepository);
      const result = await service.getRequestStats('school-1');
      expect(result.totalRequests).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getRequestStats.mockRejectedValue(new Error('DB error'));
      const service = createApiAnalyticsService(mockRepository);
      await expect(service.getRequestStats('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getErrorStats', () => {
    it('should return error stats', async () => {
      mockRepository.getErrorStats.mockResolvedValue({ totalErrors: 50, errorsByCode: { 400: 10, 401: 20, 500: 20 } });
      const service = createApiAnalyticsService(mockRepository);
      const result = await service.getErrorStats('school-1');
      expect(result.totalErrors).toBe(50);
    });

    it('should return stats with filters', async () => {
      mockRepository.getErrorStats.mockResolvedValue({ errors: [] });
      const service = createApiAnalyticsService(mockRepository);
      await service.getErrorStats('school-1', { statusCode: 500 });
      expect(mockRepository.getErrorStats).toHaveBeenCalledWith('school-1', { statusCode: 500 });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createApiAnalyticsService(mockRepository);
      await expect(service.getErrorStats('')).rejects.toThrow('schoolId is required');
    });

    it('should return zero errors', async () => {
      mockRepository.getErrorStats.mockResolvedValue({ totalErrors: 0, errorsByCode: {} });
      const service = createApiAnalyticsService(mockRepository);
      const result = await service.getErrorStats('school-1');
      expect(result.totalErrors).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getErrorStats.mockRejectedValue(new Error('DB error'));
      const service = createApiAnalyticsService(mockRepository);
      await expect(service.getErrorStats('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getPerformanceMetrics', () => {
    it('should return performance metrics', async () => {
      mockRepository.getPerformanceMetrics.mockResolvedValue({ averageResponseTime: 200, p95ResponseTime: 500, p99ResponseTime: 1000 });
      const service = createApiAnalyticsService(mockRepository);
      const result = await service.getPerformanceMetrics('school-1');
      expect(result.averageResponseTime).toBe(200);
    });

    it('should return metrics with filters', async () => {
      mockRepository.getPerformanceMetrics.mockResolvedValue({ metrics: [] });
      const service = createApiAnalyticsService(mockRepository);
      await service.getPerformanceMetrics('school-1', { endpoint: '/api/documents' });
      expect(mockRepository.getPerformanceMetrics).toHaveBeenCalledWith('school-1', { endpoint: '/api/documents' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createApiAnalyticsService(mockRepository);
      await expect(service.getPerformanceMetrics('')).rejects.toThrow('schoolId is required');
    });

    it('should return zero metrics', async () => {
      mockRepository.getPerformanceMetrics.mockResolvedValue({ averageResponseTime: 0 });
      const service = createApiAnalyticsService(mockRepository);
      const result = await service.getPerformanceMetrics('school-1');
      expect(result.averageResponseTime).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getPerformanceMetrics.mockRejectedValue(new Error('DB error'));
      const service = createApiAnalyticsService(mockRepository);
      await expect(service.getPerformanceMetrics('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getUsageByEndpoint', () => {
    it('should return usage by endpoint', async () => {
      mockRepository.getUsageByEndpoint.mockResolvedValue([{ endpoint: '/api/documents', requests: 5000, errors: 25 }]);
      const service = createApiAnalyticsService(mockRepository);
      const result = await service.getUsageByEndpoint('school-1');
      expect(result).toHaveLength(1);
    });

    it('should throw if schoolId is missing', async () => {
      const service = createApiAnalyticsService(mockRepository);
      await expect(service.getUsageByEndpoint('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty usage', async () => {
      mockRepository.getUsageByEndpoint.mockResolvedValue([]);
      const service = createApiAnalyticsService(mockRepository);
      const result = await service.getUsageByEndpoint('school-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getUsageByEndpoint.mockRejectedValue(new Error('DB error'));
      const service = createApiAnalyticsService(mockRepository);
      await expect(service.getUsageByEndpoint('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getUsageByUser', () => {
    it('should return usage by user', async () => {
      mockRepository.getUsageByUser.mockResolvedValue([{ userId: 'user-1', requests: 500, errors: 2 }]);
      const service = createApiAnalyticsService(mockRepository);
      const result = await service.getUsageByUser('school-1');
      expect(result).toHaveLength(1);
    });

    it('should throw if schoolId is missing', async () => {
      const service = createApiAnalyticsService(mockRepository);
      await expect(service.getUsageByUser('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty usage', async () => {
      mockRepository.getUsageByUser.mockResolvedValue([]);
      const service = createApiAnalyticsService(mockRepository);
      const result = await service.getUsageByUser('school-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getUsageByUser.mockRejectedValue(new Error('DB error'));
      const service = createApiAnalyticsService(mockRepository);
      await expect(service.getUsageByUser('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getUsageByApp', () => {
    it('should return usage by app', async () => {
      mockRepository.getUsageByApp.mockResolvedValue([{ appId: 'app-1', requests: 2000, errors: 10 }]);
      const service = createApiAnalyticsService(mockRepository);
      const result = await service.getUsageByApp('school-1');
      expect(result).toHaveLength(1);
    });

    it('should throw if schoolId is missing', async () => {
      const service = createApiAnalyticsService(mockRepository);
      await expect(service.getUsageByApp('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty usage', async () => {
      mockRepository.getUsageByApp.mockResolvedValue([]);
      const service = createApiAnalyticsService(mockRepository);
      const result = await service.getUsageByApp('school-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getUsageByApp.mockRejectedValue(new Error('DB error'));
      const service = createApiAnalyticsService(mockRepository);
      await expect(service.getUsageByApp('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('exportAnalytics', () => {
    it('should export analytics data', async () => {
      mockRepository.exportAnalytics.mockResolvedValue({ format: 'csv', downloadUrl: 'https://example.com/export.csv', expiresAt: '2024-01-02' });
      const service = createApiAnalyticsService(mockRepository);
      const result = await service.exportAnalytics('school-1', 'user-1', { format: 'csv', since: '2024-01-01' });
      expect(result.downloadUrl).toBeDefined();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createApiAnalyticsService(mockRepository);
      await expect(service.exportAnalytics('', 'user-1', { format: 'csv' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createApiAnalyticsService(mockRepository);
      await expect(service.exportAnalytics('school-1', '', { format: 'csv' })).rejects.toThrow('userId is required');
    });

    it('should throw if format is missing', async () => {
      const service = createApiAnalyticsService(mockRepository);
      await expect(service.exportAnalytics('school-1', 'user-1', {})).rejects.toThrow('Export format is required');
    });

    it('should handle export failure', async () => {
      mockRepository.exportAnalytics.mockRejectedValue(new Error('Export failed'));
      const service = createApiAnalyticsService(mockRepository);
      await expect(service.exportAnalytics('school-1', 'user-1', { format: 'csv' })).rejects.toThrow('Export failed');
    });
  });
});
