import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createIntegrationDashboardService } from '../../src/features/integration/services/integration-dashboard.service';

describe('IntegrationDashboardService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getDashboardStats: vi.fn(),
      getIntegrationOverview: vi.fn(),
      getRecentActivity: vi.fn(),
      getTopIntegrations: vi.fn(),
      getErrorTrends: vi.fn(),
      getPerformanceMetrics: vi.fn(),
      getUsageReport: vi.fn(),
      exportDashboardData: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createIntegrationDashboardService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getDashboardStats).toBeInstanceOf(Function);
    expect(service.getIntegrationOverview).toBeInstanceOf(Function);
    expect(service.getRecentActivity).toBeInstanceOf(Function);
    expect(service.getTopIntegrations).toBeInstanceOf(Function);
    expect(service.getErrorTrends).toBeInstanceOf(Function);
    expect(service.getPerformanceMetrics).toBeInstanceOf(Function);
    expect(service.getUsageReport).toBeInstanceOf(Function);
    expect(service.exportDashboardData).toBeInstanceOf(Function);
  });

  describe('getDashboardStats', () => {
    it('should return dashboard stats', async () => {
      mockRepository.getDashboardStats.mockResolvedValue({ totalIntegrations: 10, activeIntegrations: 8, totalRequests: 10000, errorRate: 0.05 });
      const service = createIntegrationDashboardService(mockRepository);
      const result = await service.getDashboardStats('school-1');
      expect(result.totalIntegrations).toBe(10);
    });

    it('should return stats with filters', async () => {
      mockRepository.getDashboardStats.mockResolvedValue({ stats: {} });
      const service = createIntegrationDashboardService(mockRepository);
      await service.getDashboardStats('school-1', { since: '2024-01-01' });
      expect(mockRepository.getDashboardStats).toHaveBeenCalledWith('school-1', { since: '2024-01-01' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createIntegrationDashboardService(mockRepository);
      await expect(service.getDashboardStats('')).rejects.toThrow('schoolId is required');
    });

    it('should return zero stats', async () => {
      mockRepository.getDashboardStats.mockResolvedValue({ totalIntegrations: 0, totalRequests: 0 });
      const service = createIntegrationDashboardService(mockRepository);
      const result = await service.getDashboardStats('school-1');
      expect(result.totalIntegrations).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getDashboardStats.mockRejectedValue(new Error('DB error'));
      const service = createIntegrationDashboardService(mockRepository);
      await expect(service.getDashboardStats('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getIntegrationOverview', () => {
    it('should return integration overview', async () => {
      mockRepository.getIntegrationOverview.mockResolvedValue([{ id: 'int-1', name: 'Google Drive', status: 'active', health: 'healthy', lastSync: '2024-01-01' }]);
      const service = createIntegrationDashboardService(mockRepository);
      const result = await service.getIntegrationOverview('school-1');
      expect(result).toHaveLength(1);
    });

    it('should throw if schoolId is missing', async () => {
      const service = createIntegrationDashboardService(mockRepository);
      await expect(service.getIntegrationOverview('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty overview', async () => {
      mockRepository.getIntegrationOverview.mockResolvedValue([]);
      const service = createIntegrationDashboardService(mockRepository);
      const result = await service.getIntegrationOverview('school-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getIntegrationOverview.mockRejectedValue(new Error('DB error'));
      const service = createIntegrationDashboardService(mockRepository);
      await expect(service.getIntegrationOverview('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getRecentActivity', () => {
    it('should return recent activity', async () => {
      mockRepository.getRecentActivity.mockResolvedValue([{ id: 'act-1', type: 'integration.created', description: 'Google Drive connected', timestamp: '2024-01-01' }]);
      const service = createIntegrationDashboardService(mockRepository);
      const result = await service.getRecentActivity('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return activity with limit', async () => {
      mockRepository.getRecentActivity.mockResolvedValue(Array.from({ length: 25 }, (_, i) => ({ id: `act-${i}` })));
      const service = createIntegrationDashboardService(mockRepository);
      const result = await service.getRecentActivity('school-1', { limit: 25 });
      expect(result).toHaveLength(25);
    });

    it('should throw if schoolId is missing', async () => {
      const service = createIntegrationDashboardService(mockRepository);
      await expect(service.getRecentActivity('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty activity', async () => {
      mockRepository.getRecentActivity.mockResolvedValue([]);
      const service = createIntegrationDashboardService(mockRepository);
      const result = await service.getRecentActivity('school-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getRecentActivity.mockRejectedValue(new Error('DB error'));
      const service = createIntegrationDashboardService(mockRepository);
      await expect(service.getRecentActivity('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getTopIntegrations', () => {
    it('should return top integrations', async () => {
      mockRepository.getTopIntegrations.mockResolvedValue([{ id: 'int-1', name: 'Google Drive', requestCount: 5000, errorRate: 0.02 }]);
      const service = createIntegrationDashboardService(mockRepository);
      const result = await service.getTopIntegrations('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return top with limit', async () => {
      mockRepository.getTopIntegrations.mockResolvedValue(Array.from({ length: 5 }, (_, i) => ({ id: `int-${i}` })));
      const service = createIntegrationDashboardService(mockRepository);
      const result = await service.getTopIntegrations('school-1', { limit: 5 });
      expect(result).toHaveLength(5);
    });

    it('should throw if schoolId is missing', async () => {
      const service = createIntegrationDashboardService(mockRepository);
      await expect(service.getTopIntegrations('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty top', async () => {
      mockRepository.getTopIntegrations.mockResolvedValue([]);
      const service = createIntegrationDashboardService(mockRepository);
      const result = await service.getTopIntegrations('school-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getTopIntegrations.mockRejectedValue(new Error('DB error'));
      const service = createIntegrationDashboardService(mockRepository);
      await expect(service.getTopIntegrations('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getErrorTrends', () => {
    it('should return error trends', async () => {
      mockRepository.getErrorTrends.mockResolvedValue([{ date: '2024-01-01', errorCount: 5, totalRequests: 1000 }]);
      const service = createIntegrationDashboardService(mockRepository);
      const result = await service.getErrorTrends('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return trends with filters', async () => {
      mockRepository.getErrorTrends.mockResolvedValue([{ date: '2024-01-01', errorCount: 5 }]);
      const service = createIntegrationDashboardService(mockRepository);
      await service.getErrorTrends('school-1', { since: '2024-01-01', until: '2024-01-31' });
      expect(mockRepository.getErrorTrends).toHaveBeenCalledWith('school-1', { since: '2024-01-01', until: '2024-01-31' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createIntegrationDashboardService(mockRepository);
      await expect(service.getErrorTrends('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty trends', async () => {
      mockRepository.getErrorTrends.mockResolvedValue([]);
      const service = createIntegrationDashboardService(mockRepository);
      const result = await service.getErrorTrends('school-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getErrorTrends.mockRejectedValue(new Error('DB error'));
      const service = createIntegrationDashboardService(mockRepository);
      await expect(service.getErrorTrends('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getPerformanceMetrics', () => {
    it('should return performance metrics', async () => {
      mockRepository.getPerformanceMetrics.mockResolvedValue({ averageResponseTime: 200, p95ResponseTime: 500, p99ResponseTime: 1000, uptime: 99.9 });
      const service = createIntegrationDashboardService(mockRepository);
      const result = await service.getPerformanceMetrics('school-1');
      expect(result.averageResponseTime).toBe(200);
    });

    it('should return metrics with filters', async () => {
      mockRepository.getPerformanceMetrics.mockResolvedValue({ metrics: {} });
      const service = createIntegrationDashboardService(mockRepository);
      await service.getPerformanceMetrics('school-1', { integrationId: 'int-1' });
      expect(mockRepository.getPerformanceMetrics).toHaveBeenCalledWith('school-1', { integrationId: 'int-1' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createIntegrationDashboardService(mockRepository);
      await expect(service.getPerformanceMetrics('')).rejects.toThrow('schoolId is required');
    });

    it('should return zero metrics', async () => {
      mockRepository.getPerformanceMetrics.mockResolvedValue({ averageResponseTime: 0, uptime: 0 });
      const service = createIntegrationDashboardService(mockRepository);
      const result = await service.getPerformanceMetrics('school-1');
      expect(result.averageResponseTime).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getPerformanceMetrics.mockRejectedValue(new Error('DB error'));
      const service = createIntegrationDashboardService(mockRepository);
      await expect(service.getPerformanceMetrics('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getUsageReport', () => {
    it('should return usage report', async () => {
      mockRepository.getUsageReport.mockResolvedValue({ totalRequests: 10000, requestsByDay: [{ date: '2024-01-01', count: 500 }], topEndpoints: [{ path: '/api/documents', count: 3000 }] });
      const service = createIntegrationDashboardService(mockRepository);
      const result = await service.getUsageReport('school-1');
      expect(result.totalRequests).toBe(10000);
    });

    it('should return report with filters', async () => {
      mockRepository.getUsageReport.mockResolvedValue({ report: {} });
      const service = createIntegrationDashboardService(mockRepository);
      await service.getUsageReport('school-1', { since: '2024-01-01', until: '2024-01-31' });
      expect(mockRepository.getUsageReport).toHaveBeenCalledWith('school-1', { since: '2024-01-01', until: '2024-01-31' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createIntegrationDashboardService(mockRepository);
      await expect(service.getUsageReport('')).rejects.toThrow('schoolId is required');
    });

    it('should return zero usage', async () => {
      mockRepository.getUsageReport.mockResolvedValue({ totalRequests: 0 });
      const service = createIntegrationDashboardService(mockRepository);
      const result = await service.getUsageReport('school-1');
      expect(result.totalRequests).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getUsageReport.mockRejectedValue(new Error('DB error'));
      const service = createIntegrationDashboardService(mockRepository);
      await expect(service.getUsageReport('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('exportDashboardData', () => {
    it('should export dashboard data', async () => {
      mockRepository.exportDashboardData.mockResolvedValue({ format: 'csv', downloadUrl: 'https://example.com/dashboard.csv', expiresAt: '2024-01-02' });
      const service = createIntegrationDashboardService(mockRepository);
      const result = await service.exportDashboardData('school-1', 'user-1', { format: 'csv' });
      expect(result.downloadUrl).toBeDefined();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createIntegrationDashboardService(mockRepository);
      await expect(service.exportDashboardData('', 'user-1', { format: 'csv' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createIntegrationDashboardService(mockRepository);
      await expect(service.exportDashboardData('school-1', '', { format: 'csv' })).rejects.toThrow('userId is required');
    });

    it('should throw if format is missing', async () => {
      const service = createIntegrationDashboardService(mockRepository);
      await expect(service.exportDashboardData('school-1', 'user-1', {})).rejects.toThrow('Export format is required');
    });

    it('should handle export failure', async () => {
      mockRepository.exportDashboardData.mockRejectedValue(new Error('Export failed'));
      const service = createIntegrationDashboardService(mockRepository);
      await expect(service.exportDashboardData('school-1', 'user-1', { format: 'csv' })).rejects.toThrow('Export failed');
    });
  });
});
