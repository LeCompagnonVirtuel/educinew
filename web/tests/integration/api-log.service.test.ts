import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createApiLogService } from '../../src/features/integration/services/api-log.service';

describe('ApiLogService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getApiLogs: vi.fn(),
      getApiLogById: vi.fn(),
      createApiLog: vi.fn(),
      deleteApiLogs: vi.fn(),
      getApiLogStats: vi.fn(),
      exportApiLogs: vi.fn(),
      searchApiLogs: vi.fn(),
      getApiLogByRequestId: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createApiLogService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getApiLogs).toBeInstanceOf(Function);
    expect(service.getApiLogById).toBeInstanceOf(Function);
    expect(service.createApiLog).toBeInstanceOf(Function);
    expect(service.deleteApiLogs).toBeInstanceOf(Function);
    expect(service.getApiLogStats).toBeInstanceOf(Function);
    expect(service.exportApiLogs).toBeInstanceOf(Function);
    expect(service.searchApiLogs).toBeInstanceOf(Function);
    expect(service.getApiLogByRequestId).toBeInstanceOf(Function);
  });

  describe('getApiLogs', () => {
    it('should return api logs list', async () => {
      mockRepository.getApiLogs.mockResolvedValue([{ id: 'log-1', method: 'GET', path: '/api/documents', statusCode: 200 }]);
      const service = createApiLogService(mockRepository);
      const result = await service.getApiLogs('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return api logs with filters', async () => {
      mockRepository.getApiLogs.mockResolvedValue([{ id: 'log-1' }]);
      const service = createApiLogService(mockRepository);
      await service.getApiLogs('school-1', { method: 'POST', statusCode: 201 });
      expect(mockRepository.getApiLogs).toHaveBeenCalledWith('school-1', { method: 'POST', statusCode: 201 });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createApiLogService(mockRepository);
      await expect(service.getApiLogs('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getApiLogs.mockResolvedValue([]);
      const service = createApiLogService(mockRepository);
      const result = await service.getApiLogs('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated api logs', async () => {
      mockRepository.getApiLogs.mockResolvedValue({ data: [{ id: 'log-1' }], total: 1000 });
      const service = createApiLogService(mockRepository);
      const result = await service.getApiLogs('school-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by date range', async () => {
      mockRepository.getApiLogs.mockResolvedValue([{ id: 'log-1' }]);
      const service = createApiLogService(mockRepository);
      await service.getApiLogs('school-1', { since: '2024-01-01', until: '2024-01-31' });
      expect(mockRepository.getApiLogs).toHaveBeenCalledWith('school-1', { since: '2024-01-01', until: '2024-01-31' });
    });

    it('should filter by user', async () => {
      mockRepository.getApiLogs.mockResolvedValue([{ id: 'log-1', userId: 'user-1' }]);
      const service = createApiLogService(mockRepository);
      const result = await service.getApiLogs('school-1', { userId: 'user-1' });
      expect(result).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getApiLogs.mockRejectedValue(new Error('DB error'));
      const service = createApiLogService(mockRepository);
      await expect(service.getApiLogs('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getApiLogById', () => {
    it('should return a single api log', async () => {
      mockRepository.getApiLogById.mockResolvedValue({ id: 'log-1', method: 'GET', path: '/api/documents', statusCode: 200 });
      const service = createApiLogService(mockRepository);
      const result = await service.getApiLogById('log-1');
      expect(result.id).toBe('log-1');
    });

    it('should throw if api log not found', async () => {
      mockRepository.getApiLogById.mockResolvedValue(null);
      const service = createApiLogService(mockRepository);
      await expect(service.getApiLogById('nonexistent')).rejects.toThrow('API log not found');
    });

    it('should throw if id is missing', async () => {
      const service = createApiLogService(mockRepository);
      await expect(service.getApiLogById('')).rejects.toThrow('Log ID is required');
    });

    it('should return api log with request details', async () => {
      mockRepository.getApiLogById.mockResolvedValue({ id: 'log-1', method: 'POST', path: '/api/documents', headers: { 'content-type': 'application/json' }, body: { title: 'Test' } });
      const service = createApiLogService(mockRepository);
      const result = await service.getApiLogById('log-1');
      expect(result.headers).toBeDefined();
      expect(result.body).toBeDefined();
    });

    it('should return api log with response details', async () => {
      mockRepository.getApiLogById.mockResolvedValue({ id: 'log-1', statusCode: 200, responseBody: { id: 'doc-1' }, responseTime: 150 });
      const service = createApiLogService(mockRepository);
      const result = await service.getApiLogById('log-1');
      expect(result.responseTime).toBe(150);
    });

    it('should handle repository errors', async () => {
      mockRepository.getApiLogById.mockRejectedValue(new Error('Query timeout'));
      const service = createApiLogService(mockRepository);
      await expect(service.getApiLogById('log-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createApiLog', () => {
    it('should create an api log', async () => {
      mockRepository.createApiLog.mockResolvedValue({ id: 'log-1', method: 'GET', path: '/api/documents', statusCode: 200 });
      const service = createApiLogService(mockRepository);
      const result = await service.createApiLog({ method: 'GET', path: '/api/documents', statusCode: 200, schoolId: 'school-1' });
      expect(result.id).toBe('log-1');
      expect(mockRepository.createApiLog).toHaveBeenCalled();
    });

    it('should throw if method is missing', async () => {
      const service = createApiLogService(mockRepository);
      await expect(service.createApiLog({ path: '/api/test' })).rejects.toThrow('HTTP method is required');
    });

    it('should throw if path is missing', async () => {
      const service = createApiLogService(mockRepository);
      await expect(service.createApiLog({ method: 'GET' })).rejects.toThrow('Request path is required');
    });

    it('should create log with response time', async () => {
      mockRepository.createApiLog.mockResolvedValue({ id: 'log-1', responseTime: 150 });
      const service = createApiLogService(mockRepository);
      const result = await service.createApiLog({ method: 'GET', path: '/api/test', responseTime: 150 });
      expect(result.responseTime).toBe(150);
    });

    it('should handle creation failure', async () => {
      mockRepository.createApiLog.mockRejectedValue(new Error('Log storage full'));
      const service = createApiLogService(mockRepository);
      await expect(service.createApiLog({ method: 'GET', path: '/api/test' })).rejects.toThrow('Log storage full');
    });
  });

  describe('deleteApiLogs', () => {
    it('should delete api logs', async () => {
      mockRepository.deleteApiLogs.mockResolvedValue({ deletedCount: 100 });
      const service = createApiLogService(mockRepository);
      const result = await service.deleteApiLogs('school-1', { olderThanDays: 90 });
      expect(result.deletedCount).toBe(100);
    });

    it('should throw if schoolId is missing', async () => {
      const service = createApiLogService(mockRepository);
      await expect(service.deleteApiLogs('', {})).rejects.toThrow('schoolId is required');
    });

    it('should delete logs by criteria', async () => {
      mockRepository.deleteApiLogs.mockResolvedValue({ deletedCount: 50 });
      const service = createApiLogService(mockRepository);
      const result = await service.deleteApiLogs('school-1', { method: 'GET', olderThanDays: 30 });
      expect(result.deletedCount).toBe(50);
    });

    it('should handle deletion failure', async () => {
      mockRepository.deleteApiLogs.mockRejectedValue(new Error('Cannot delete'));
      const service = createApiLogService(mockRepository);
      await expect(service.deleteApiLogs('school-1', { olderThanDays: 90 })).rejects.toThrow('Cannot delete');
    });
  });

  describe('getApiLogStats', () => {
    it('should return api log stats', async () => {
      mockRepository.getApiLogStats.mockResolvedValue({ totalRequests: 10000, averageResponseTime: 200, errorRate: 0.05 });
      const service = createApiLogService(mockRepository);
      const result = await service.getApiLogStats('school-1');
      expect(result.totalRequests).toBe(10000);
    });

    it('should return stats with filters', async () => {
      mockRepository.getApiLogStats.mockResolvedValue({ stats: {} });
      const service = createApiLogService(mockRepository);
      await service.getApiLogStats('school-1', { since: '2024-01-01' });
      expect(mockRepository.getApiLogStats).toHaveBeenCalledWith('school-1', { since: '2024-01-01' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createApiLogService(mockRepository);
      await expect(service.getApiLogStats('')).rejects.toThrow('schoolId is required');
    });

    it('should return zero stats', async () => {
      mockRepository.getApiLogStats.mockResolvedValue({ totalRequests: 0 });
      const service = createApiLogService(mockRepository);
      const result = await service.getApiLogStats('school-1');
      expect(result.totalRequests).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getApiLogStats.mockRejectedValue(new Error('DB error'));
      const service = createApiLogService(mockRepository);
      await expect(service.getApiLogStats('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('exportApiLogs', () => {
    it('should export api logs', async () => {
      mockRepository.exportApiLogs.mockResolvedValue({ format: 'csv', downloadUrl: 'https://example.com/logs.csv', expiresAt: '2024-01-02' });
      const service = createApiLogService(mockRepository);
      const result = await service.exportApiLogs('school-1', 'user-1', { format: 'csv', since: '2024-01-01' });
      expect(result.downloadUrl).toBeDefined();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createApiLogService(mockRepository);
      await expect(service.exportApiLogs('', 'user-1', { format: 'csv' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createApiLogService(mockRepository);
      await expect(service.exportApiLogs('school-1', '', { format: 'csv' })).rejects.toThrow('userId is required');
    });

    it('should throw if format is missing', async () => {
      const service = createApiLogService(mockRepository);
      await expect(service.exportApiLogs('school-1', 'user-1', {})).rejects.toThrow('Export format is required');
    });

    it('should handle export failure', async () => {
      mockRepository.exportApiLogs.mockRejectedValue(new Error('Export failed'));
      const service = createApiLogService(mockRepository);
      await expect(service.exportApiLogs('school-1', 'user-1', { format: 'csv' })).rejects.toThrow('Export failed');
    });
  });

  describe('searchApiLogs', () => {
    it('should search api logs', async () => {
      mockRepository.searchApiLogs.mockResolvedValue([{ id: 'log-1', method: 'GET', path: '/api/documents' }]);
      const service = createApiLogService(mockRepository);
      const result = await service.searchApiLogs('school-1', { query: 'documents' });
      expect(result).toHaveLength(1);
    });

    it('should throw if schoolId is missing', async () => {
      const service = createApiLogService(mockRepository);
      await expect(service.searchApiLogs('', { query: 'test' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if query is missing', async () => {
      const service = createApiLogService(mockRepository);
      await expect(service.searchApiLogs('school-1', { query: '' })).rejects.toThrow('Search query is required');
    });

    it('should return empty results', async () => {
      mockRepository.searchApiLogs.mockResolvedValue([]);
      const service = createApiLogService(mockRepository);
      const result = await service.searchApiLogs('school-1', { query: 'nonexistent' });
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.searchApiLogs.mockRejectedValue(new Error('DB error'));
      const service = createApiLogService(mockRepository);
      await expect(service.searchApiLogs('school-1', { query: 'test' })).rejects.toThrow('DB error');
    });
  });

  describe('getApiLogByRequestId', () => {
    it('should return api log by request ID', async () => {
      mockRepository.getApiLogByRequestId.mockResolvedValue({ id: 'log-1', requestId: 'req-1', method: 'GET' });
      const service = createApiLogService(mockRepository);
      const result = await service.getApiLogByRequestId('req-1');
      expect(result.requestId).toBe('req-1');
    });

    it('should throw if requestId is missing', async () => {
      const service = createApiLogService(mockRepository);
      await expect(service.getApiLogByRequestId('')).rejects.toThrow('Request ID is required');
    });

    it('should throw if not found', async () => {
      mockRepository.getApiLogByRequestId.mockResolvedValue(null);
      const service = createApiLogService(mockRepository);
      await expect(service.getApiLogByRequestId('nonexistent')).rejects.toThrow('API log not found');
    });

    it('should handle repository errors', async () => {
      mockRepository.getApiLogByRequestId.mockRejectedValue(new Error('DB error'));
      const service = createApiLogService(mockRepository);
      await expect(service.getApiLogByRequestId('req-1')).rejects.toThrow('DB error');
    });
  });
});
