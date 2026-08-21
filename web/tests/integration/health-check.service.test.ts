import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createHealthCheckService } from '../../src/features/integration/services/health-check.service';

describe('HealthCheckService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getHealthChecks: vi.fn(),
      getHealthCheckById: vi.fn(),
      createHealthCheck: vi.fn(),
      updateHealthCheck: vi.fn(),
      deleteHealthCheck: vi.fn(),
      runHealthCheck: vi.fn(),
      getHealthCheckHistory: vi.fn(),
      getHealthCheckStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createHealthCheckService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getHealthChecks).toBeInstanceOf(Function);
    expect(service.getHealthCheckById).toBeInstanceOf(Function);
    expect(service.createHealthCheck).toBeInstanceOf(Function);
    expect(service.updateHealthCheck).toBeInstanceOf(Function);
    expect(service.deleteHealthCheck).toBeInstanceOf(Function);
    expect(service.runHealthCheck).toBeInstanceOf(Function);
    expect(service.getHealthCheckHistory).toBeInstanceOf(Function);
    expect(service.getHealthCheckStats).toBeInstanceOf(Function);
  });

  describe('getHealthChecks', () => {
    it('should return health checks list', async () => {
      mockRepository.getHealthChecks.mockResolvedValue([{ id: 'hc-1', name: 'API Health', status: 'healthy' }]);
      const service = createHealthCheckService(mockRepository);
      const result = await service.getHealthChecks('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return health checks with filters', async () => {
      mockRepository.getHealthChecks.mockResolvedValue([{ id: 'hc-1' }]);
      const service = createHealthCheckService(mockRepository);
      await service.getHealthChecks('school-1', { status: 'unhealthy' });
      expect(mockRepository.getHealthChecks).toHaveBeenCalledWith('school-1', { status: 'unhealthy' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createHealthCheckService(mockRepository);
      await expect(service.getHealthChecks('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getHealthChecks.mockResolvedValue([]);
      const service = createHealthCheckService(mockRepository);
      const result = await service.getHealthChecks('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated health checks', async () => {
      mockRepository.getHealthChecks.mockResolvedValue({ data: [{ id: 'hc-1' }], total: 10 });
      const service = createHealthCheckService(mockRepository);
      const result = await service.getHealthChecks('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by type', async () => {
      mockRepository.getHealthChecks.mockResolvedValue([{ id: 'hc-1', type: 'http' }]);
      const service = createHealthCheckService(mockRepository);
      const result = await service.getHealthChecks('school-1', { type: 'http' });
      expect(result).toHaveLength(1);
    });

    it('should return health checks with last check', async () => {
      mockRepository.getHealthChecks.mockResolvedValue([{ id: 'hc-1', lastCheckedAt: '2024-01-01', lastStatus: 'healthy' }]);
      const service = createHealthCheckService(mockRepository);
      const result = await service.getHealthChecks('school-1');
      expect(result[0].lastStatus).toBe('healthy');
    });

    it('should handle repository errors', async () => {
      mockRepository.getHealthChecks.mockRejectedValue(new Error('DB error'));
      const service = createHealthCheckService(mockRepository);
      await expect(service.getHealthChecks('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getHealthCheckById', () => {
    it('should return a single health check', async () => {
      mockRepository.getHealthCheckById.mockResolvedValue({ id: 'hc-1', name: 'API Health', status: 'healthy' });
      const service = createHealthCheckService(mockRepository);
      const result = await service.getHealthCheckById('hc-1');
      expect(result.id).toBe('hc-1');
    });

    it('should throw if health check not found', async () => {
      mockRepository.getHealthCheckById.mockResolvedValue(null);
      const service = createHealthCheckService(mockRepository);
      await expect(service.getHealthCheckById('nonexistent')).rejects.toThrow('Health check not found');
    });

    it('should throw if id is missing', async () => {
      const service = createHealthCheckService(mockRepository);
      await expect(service.getHealthCheckById('')).rejects.toThrow('Health check ID is required');
    });

    it('should return health check with config', async () => {
      mockRepository.getHealthCheckById.mockResolvedValue({ id: 'hc-1', config: { url: 'https://api.example.com/health', timeout: 5000 } });
      const service = createHealthCheckService(mockRepository);
      const result = await service.getHealthCheckById('hc-1');
      expect(result.config.url).toBeDefined();
    });

    it('should return health check with history', async () => {
      mockRepository.getHealthCheckById.mockResolvedValue({ id: 'hc-1', recentChecks: [{ status: 'healthy', timestamp: '2024-01-01' }] });
      const service = createHealthCheckService(mockRepository);
      const result = await service.getHealthCheckById('hc-1');
      expect(result.recentChecks).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getHealthCheckById.mockRejectedValue(new Error('Query timeout'));
      const service = createHealthCheckService(mockRepository);
      await expect(service.getHealthCheckById('hc-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createHealthCheck', () => {
    it('should create a health check', async () => {
      mockRepository.createHealthCheck.mockResolvedValue({ id: 'hc-1', name: 'API Health', status: 'pending' });
      const service = createHealthCheckService(mockRepository);
      const result = await service.createHealthCheck('school-1', 'user-1', { name: 'API Health', type: 'http', config: { url: 'https://api.example.com/health' } });
      expect(result.id).toBe('hc-1');
      expect(mockRepository.createHealthCheck).toHaveBeenCalled();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createHealthCheckService(mockRepository);
      await expect(service.createHealthCheck('', 'user-1', { name: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createHealthCheckService(mockRepository);
      await expect(service.createHealthCheck('school-1', '', { name: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if name is missing', async () => {
      const service = createHealthCheckService(mockRepository);
      await expect(service.createHealthCheck('school-1', 'user-1', { name: '' })).rejects.toThrow('Health check name is required');
    });

    it('should create health check with interval', async () => {
      mockRepository.createHealthCheck.mockResolvedValue({ id: 'hc-1', interval: 300 });
      const service = createHealthCheckService(mockRepository);
      const result = await service.createHealthCheck('school-1', 'user-1', { name: 'T', type: 'http', interval: 300 });
      expect(result.interval).toBe(300);
    });

    it('should create health check with alert config', async () => {
      mockRepository.createHealthCheck.mockResolvedValue({ id: 'hc-1', alertConfig: { onFailure: true, notify: ['user-1'] } });
      const service = createHealthCheckService(mockRepository);
      const result = await service.createHealthCheck('school-1', 'user-1', { name: 'T', type: 'http', alertConfig: { onFailure: true, notify: ['user-1'] } });
      expect(result.alertConfig.onFailure).toBe(true);
    });

    it('should handle creation failure', async () => {
      mockRepository.createHealthCheck.mockRejectedValue(new Error('Invalid config'));
      const service = createHealthCheckService(mockRepository);
      await expect(service.createHealthCheck('school-1', 'user-1', { name: 'T', type: 'http' })).rejects.toThrow('Invalid config');
    });
  });

  describe('updateHealthCheck', () => {
    it('should update a health check', async () => {
      mockRepository.getHealthCheckById.mockResolvedValue({ id: 'hc-1', name: 'Old' });
      mockRepository.updateHealthCheck.mockResolvedValue({ id: 'hc-1', name: 'Updated' });
      const service = createHealthCheckService(mockRepository);
      const result = await service.updateHealthCheck('hc-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if health check not found', async () => {
      mockRepository.getHealthCheckById.mockResolvedValue(null);
      const service = createHealthCheckService(mockRepository);
      await expect(service.updateHealthCheck('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createHealthCheckService(mockRepository);
      await expect(service.updateHealthCheck('', 'user-1', { name: 'New' })).rejects.toThrow('Health check ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createHealthCheckService(mockRepository);
      await expect(service.updateHealthCheck('hc-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update health check config', async () => {
      mockRepository.getHealthCheckById.mockResolvedValue({ id: 'hc-1' });
      mockRepository.updateHealthCheck.mockResolvedValue({ id: 'hc-1', config: { url: 'https://new-url.com/health' } });
      const service = createHealthCheckService(mockRepository);
      const result = await service.updateHealthCheck('hc-1', 'user-1', { config: { url: 'https://new-url.com/health' } });
      expect(result.config.url).toBe('https://new-url.com/health');
    });

    it('should handle update failure', async () => {
      mockRepository.getHealthCheckById.mockResolvedValue({ id: 'hc-1' });
      mockRepository.updateHealthCheck.mockRejectedValue(new Error('Cannot update'));
      const service = createHealthCheckService(mockRepository);
      await expect(service.updateHealthCheck('hc-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deleteHealthCheck', () => {
    it('should delete a health check', async () => {
      mockRepository.getHealthCheckById.mockResolvedValue({ id: 'hc-1' });
      mockRepository.deleteHealthCheck.mockResolvedValue({ success: true });
      const service = createHealthCheckService(mockRepository);
      await service.deleteHealthCheck('hc-1', 'user-1');
      expect(mockRepository.deleteHealthCheck).toHaveBeenCalledWith('hc-1');
    });

    it('should throw if health check not found', async () => {
      mockRepository.getHealthCheckById.mockResolvedValue(null);
      const service = createHealthCheckService(mockRepository);
      await expect(service.deleteHealthCheck('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createHealthCheckService(mockRepository);
      await expect(service.deleteHealthCheck('', 'user-1')).rejects.toThrow('Health check ID is required');
    });

    it('should handle deletion failure', async () => {
      mockRepository.getHealthCheckById.mockResolvedValue({ id: 'hc-1' });
      mockRepository.deleteHealthCheck.mockRejectedValue(new Error('Cannot delete'));
      const service = createHealthCheckService(mockRepository);
      await expect(service.deleteHealthCheck('hc-1', 'user-1')).rejects.toThrow('Cannot delete');
    });

    it('should force delete health check', async () => {
      mockRepository.getHealthCheckById.mockResolvedValue({ id: 'hc-1' });
      mockRepository.deleteHealthCheck.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createHealthCheckService(mockRepository);
      const result = await service.deleteHealthCheck('hc-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('runHealthCheck', () => {
    it('should run a health check', async () => {
      mockRepository.runHealthCheck.mockResolvedValue({ healthCheckId: 'hc-1', status: 'healthy', responseTime: 150, checkedAt: '2024-01-01' });
      const service = createHealthCheckService(mockRepository);
      const result = await service.runHealthCheck('hc-1', 'user-1');
      expect(result.status).toBe('healthy');
      expect(result.responseTime).toBe(150);
    });

    it('should throw if healthCheckId is missing', async () => {
      const service = createHealthCheckService(mockRepository);
      await expect(service.runHealthCheck('', 'user-1')).rejects.toThrow('Health check ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createHealthCheckService(mockRepository);
      await expect(service.runHealthCheck('hc-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle unhealthy status', async () => {
      mockRepository.runHealthCheck.mockResolvedValue({ healthCheckId: 'hc-1', status: 'unhealthy', error: 'Connection refused', responseTime: 5000 });
      const service = createHealthCheckService(mockRepository);
      const result = await service.runHealthCheck('hc-1', 'user-1');
      expect(result.status).toBe('unhealthy');
      expect(result.error).toBe('Connection refused');
    });

    it('should return check details', async () => {
      mockRepository.runHealthCheck.mockResolvedValue({ healthCheckId: 'hc-1', status: 'healthy', statusCode: 200, responseTime: 150, headers: {} });
      const service = createHealthCheckService(mockRepository);
      const result = await service.runHealthCheck('hc-1', 'user-1');
      expect(result.statusCode).toBe(200);
    });

    it('should handle run failure', async () => {
      mockRepository.runHealthCheck.mockRejectedValue(new Error('Health check not found'));
      const service = createHealthCheckService(mockRepository);
      await expect(service.runHealthCheck('nonexistent', 'user-1')).rejects.toThrow('Health check not found');
    });
  });

  describe('getHealthCheckHistory', () => {
    it('should return health check history', async () => {
      mockRepository.getHealthCheckHistory.mockResolvedValue([{ status: 'healthy', timestamp: '2024-01-01', responseTime: 150 }]);
      const service = createHealthCheckService(mockRepository);
      const result = await service.getHealthCheckHistory('hc-1');
      expect(result).toHaveLength(1);
    });

    it('should return history with filters', async () => {
      mockRepository.getHealthCheckHistory.mockResolvedValue([{ status: 'unhealthy' }]);
      const service = createHealthCheckService(mockRepository);
      await service.getHealthCheckHistory('hc-1', { status: 'unhealthy' });
      expect(mockRepository.getHealthCheckHistory).toHaveBeenCalledWith('hc-1', { status: 'unhealthy' });
    });

    it('should throw if healthCheckId is missing', async () => {
      const service = createHealthCheckService(mockRepository);
      await expect(service.getHealthCheckHistory('')).rejects.toThrow('Health check ID is required');
    });

    it('should return paginated history', async () => {
      mockRepository.getHealthCheckHistory.mockResolvedValue({ data: [{ status: 'healthy' }], total: 100 });
      const service = createHealthCheckService(mockRepository);
      const result = await service.getHealthCheckHistory('hc-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should return empty history', async () => {
      mockRepository.getHealthCheckHistory.mockResolvedValue([]);
      const service = createHealthCheckService(mockRepository);
      const result = await service.getHealthCheckHistory('hc-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getHealthCheckHistory.mockRejectedValue(new Error('DB error'));
      const service = createHealthCheckService(mockRepository);
      await expect(service.getHealthCheckHistory('hc-1')).rejects.toThrow('DB error');
    });
  });

  describe('getHealthCheckStats', () => {
    it('should return health check stats', async () => {
      mockRepository.getHealthCheckStats.mockResolvedValue({ healthCheckId: 'hc-1', totalChecks: 100, healthyChecks: 95, unhealthyChecks: 5, uptime: 95 });
      const service = createHealthCheckService(mockRepository);
      const result = await service.getHealthCheckStats('hc-1');
      expect(result.totalChecks).toBe(100);
      expect(result.uptime).toBe(95);
    });

    it('should return stats with filters', async () => {
      mockRepository.getHealthCheckStats.mockResolvedValue({ healthCheckId: 'hc-1', checks: [] });
      const service = createHealthCheckService(mockRepository);
      await service.getHealthCheckStats('hc-1', { since: '2024-01-01' });
      expect(mockRepository.getHealthCheckStats).toHaveBeenCalledWith('hc-1', { since: '2024-01-01' });
    });

    it('should throw if healthCheckId is missing', async () => {
      const service = createHealthCheckService(mockRepository);
      await expect(service.getHealthCheckStats('')).rejects.toThrow('Health check ID is required');
    });

    it('should return zero stats', async () => {
      mockRepository.getHealthCheckStats.mockResolvedValue({ healthCheckId: 'hc-1', totalChecks: 0, uptime: 0 });
      const service = createHealthCheckService(mockRepository);
      const result = await service.getHealthCheckStats('hc-1');
      expect(result.totalChecks).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getHealthCheckStats.mockRejectedValue(new Error('DB error'));
      const service = createHealthCheckService(mockRepository);
      await expect(service.getHealthCheckStats('hc-1')).rejects.toThrow('DB error');
    });
  });
});
