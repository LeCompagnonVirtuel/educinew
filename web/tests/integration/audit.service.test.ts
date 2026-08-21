import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAuditService } from '../../src/features/integration/services/audit.service';

describe('AuditService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getAuditLogs: vi.fn(),
      getAuditLogById: vi.fn(),
      createAuditLog: vi.fn(),
      getAuditLogStats: vi.fn(),
      exportAuditLogs: vi.fn(),
      searchAuditLogs: vi.fn(),
      getAuditLogsByUser: vi.fn(),
      getAuditLogsByResource: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createAuditService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getAuditLogs).toBeInstanceOf(Function);
    expect(service.getAuditLogById).toBeInstanceOf(Function);
    expect(service.createAuditLog).toBeInstanceOf(Function);
    expect(service.getAuditLogStats).toBeInstanceOf(Function);
    expect(service.exportAuditLogs).toBeInstanceOf(Function);
    expect(service.searchAuditLogs).toBeInstanceOf(Function);
    expect(service.getAuditLogsByUser).toBeInstanceOf(Function);
    expect(service.getAuditLogsByResource).toBeInstanceOf(Function);
  });

  describe('getAuditLogs', () => {
    it('should return audit logs list', async () => {
      mockRepository.getAuditLogs.mockResolvedValue([{ id: 'aud-1', action: 'document.created', userId: 'user-1' }]);
      const service = createAuditService(mockRepository);
      const result = await service.getAuditLogs('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return audit logs with filters', async () => {
      mockRepository.getAuditLogs.mockResolvedValue([{ id: 'aud-1' }]);
      const service = createAuditService(mockRepository);
      await service.getAuditLogs('school-1', { action: 'document.created' });
      expect(mockRepository.getAuditLogs).toHaveBeenCalledWith('school-1', { action: 'document.created' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAuditService(mockRepository);
      await expect(service.getAuditLogs('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getAuditLogs.mockResolvedValue([]);
      const service = createAuditService(mockRepository);
      const result = await service.getAuditLogs('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated audit logs', async () => {
      mockRepository.getAuditLogs.mockResolvedValue({ data: [{ id: 'aud-1' }], total: 1000 });
      const service = createAuditService(mockRepository);
      const result = await service.getAuditLogs('school-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by date range', async () => {
      mockRepository.getAuditLogs.mockResolvedValue([{ id: 'aud-1' }]);
      const service = createAuditService(mockRepository);
      await service.getAuditLogs('school-1', { since: '2024-01-01', until: '2024-01-31' });
      expect(mockRepository.getAuditLogs).toHaveBeenCalledWith('school-1', { since: '2024-01-01', until: '2024-01-31' });
    });

    it('should filter by user', async () => {
      mockRepository.getAuditLogs.mockResolvedValue([{ id: 'aud-1', userId: 'user-1' }]);
      const service = createAuditService(mockRepository);
      const result = await service.getAuditLogs('school-1', { userId: 'user-1' });
      expect(result).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getAuditLogs.mockRejectedValue(new Error('DB error'));
      const service = createAuditService(mockRepository);
      await expect(service.getAuditLogs('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getAuditLogById', () => {
    it('should return a single audit log', async () => {
      mockRepository.getAuditLogById.mockResolvedValue({ id: 'aud-1', action: 'document.created', userId: 'user-1' });
      const service = createAuditService(mockRepository);
      const result = await service.getAuditLogById('aud-1');
      expect(result.id).toBe('aud-1');
    });

    it('should throw if audit log not found', async () => {
      mockRepository.getAuditLogById.mockResolvedValue(null);
      const service = createAuditService(mockRepository);
      await expect(service.getAuditLogById('nonexistent')).rejects.toThrow('Audit log not found');
    });

    it('should throw if id is missing', async () => {
      const service = createAuditService(mockRepository);
      await expect(service.getAuditLogById('')).rejects.toThrow('Audit log ID is required');
    });

    it('should return audit log with details', async () => {
      mockRepository.getAuditLogById.mockResolvedValue({ id: 'aud-1', action: 'document.created', resourceType: 'document', resourceId: 'doc-1', details: { title: 'Test' } });
      const service = createAuditService(mockRepository);
      const result = await service.getAuditLogById('aud-1');
      expect(result.resourceType).toBe('document');
      expect(result.resourceId).toBe('doc-1');
    });

    it('should handle repository errors', async () => {
      mockRepository.getAuditLogById.mockRejectedValue(new Error('Query timeout'));
      const service = createAuditService(mockRepository);
      await expect(service.getAuditLogById('aud-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createAuditLog', () => {
    it('should create an audit log', async () => {
      mockRepository.createAuditLog.mockResolvedValue({ id: 'aud-1', action: 'document.created', userId: 'user-1' });
      const service = createAuditService(mockRepository);
      const result = await service.createAuditLog({ schoolId: 'school-1', action: 'document.created', userId: 'user-1', resourceType: 'document', resourceId: 'doc-1' });
      expect(result.id).toBe('aud-1');
      expect(mockRepository.createAuditLog).toHaveBeenCalled();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAuditService(mockRepository);
      await expect(service.createAuditLog({ action: 'test', userId: 'user-1' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if action is missing', async () => {
      const service = createAuditService(mockRepository);
      await expect(service.createAuditLog({ schoolId: 'school-1', userId: 'user-1', action: '' })).rejects.toThrow('Action is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAuditService(mockRepository);
      await expect(service.createAuditLog({ schoolId: 'school-1', action: 'test', userId: '' })).rejects.toThrow('userId is required');
    });

    it('should create log with details', async () => {
      mockRepository.createAuditLog.mockResolvedValue({ id: 'aud-1', details: { old: { status: 'draft' }, new: { status: 'published' } } });
      const service = createAuditService(mockRepository);
      const result = await service.createAuditLog({ schoolId: 'school-1', action: 'document.updated', userId: 'user-1', details: { old: { status: 'draft' }, new: { status: 'published' } } });
      expect(result.details).toBeDefined();
    });

    it('should handle creation failure', async () => {
      mockRepository.createAuditLog.mockRejectedValue(new Error('Log storage full'));
      const service = createAuditService(mockRepository);
      await expect(service.createAuditLog({ schoolId: 'school-1', action: 'test', userId: 'user-1' })).rejects.toThrow('Log storage full');
    });
  });

  describe('getAuditLogStats', () => {
    it('should return audit log stats', async () => {
      mockRepository.getAuditLogStats.mockResolvedValue({ totalLogs: 10000, actionsByType: { 'document.created': 5000, 'document.updated': 3000 } });
      const service = createAuditService(mockRepository);
      const result = await service.getAuditLogStats('school-1');
      expect(result.totalLogs).toBe(10000);
    });

    it('should return stats with filters', async () => {
      mockRepository.getAuditLogStats.mockResolvedValue({ stats: {} });
      const service = createAuditService(mockRepository);
      await service.getAuditLogStats('school-1', { since: '2024-01-01' });
      expect(mockRepository.getAuditLogStats).toHaveBeenCalledWith('school-1', { since: '2024-01-01' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAuditService(mockRepository);
      await expect(service.getAuditLogStats('')).rejects.toThrow('schoolId is required');
    });

    it('should return zero stats', async () => {
      mockRepository.getAuditLogStats.mockResolvedValue({ totalLogs: 0 });
      const service = createAuditService(mockRepository);
      const result = await service.getAuditLogStats('school-1');
      expect(result.totalLogs).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getAuditLogStats.mockRejectedValue(new Error('DB error'));
      const service = createAuditService(mockRepository);
      await expect(service.getAuditLogStats('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('exportAuditLogs', () => {
    it('should export audit logs', async () => {
      mockRepository.exportAuditLogs.mockResolvedValue({ format: 'csv', downloadUrl: 'https://example.com/audit.csv', expiresAt: '2024-01-02' });
      const service = createAuditService(mockRepository);
      const result = await service.exportAuditLogs('school-1', 'user-1', { format: 'csv', since: '2024-01-01' });
      expect(result.downloadUrl).toBeDefined();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAuditService(mockRepository);
      await expect(service.exportAuditLogs('', 'user-1', { format: 'csv' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAuditService(mockRepository);
      await expect(service.exportAuditLogs('school-1', '', { format: 'csv' })).rejects.toThrow('userId is required');
    });

    it('should throw if format is missing', async () => {
      const service = createAuditService(mockRepository);
      await expect(service.exportAuditLogs('school-1', 'user-1', {})).rejects.toThrow('Export format is required');
    });

    it('should handle export failure', async () => {
      mockRepository.exportAuditLogs.mockRejectedValue(new Error('Export failed'));
      const service = createAuditService(mockRepository);
      await expect(service.exportAuditLogs('school-1', 'user-1', { format: 'csv' })).rejects.toThrow('Export failed');
    });
  });

  describe('searchAuditLogs', () => {
    it('should search audit logs', async () => {
      mockRepository.searchAuditLogs.mockResolvedValue([{ id: 'aud-1', action: 'document.created' }]);
      const service = createAuditService(mockRepository);
      const result = await service.searchAuditLogs('school-1', { query: 'document' });
      expect(result).toHaveLength(1);
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAuditService(mockRepository);
      await expect(service.searchAuditLogs('', { query: 'test' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if query is missing', async () => {
      const service = createAuditService(mockRepository);
      await expect(service.searchAuditLogs('school-1', { query: '' })).rejects.toThrow('Search query is required');
    });

    it('should return empty results', async () => {
      mockRepository.searchAuditLogs.mockResolvedValue([]);
      const service = createAuditService(mockRepository);
      const result = await service.searchAuditLogs('school-1', { query: 'nonexistent' });
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.searchAuditLogs.mockRejectedValue(new Error('DB error'));
      const service = createAuditService(mockRepository);
      await expect(service.searchAuditLogs('school-1', { query: 'test' })).rejects.toThrow('DB error');
    });
  });

  describe('getAuditLogsByUser', () => {
    it('should return audit logs by user', async () => {
      mockRepository.getAuditLogsByUser.mockResolvedValue([{ id: 'aud-1', action: 'document.created', userId: 'user-1' }]);
      const service = createAuditService(mockRepository);
      const result = await service.getAuditLogsByUser('school-1', 'user-1');
      expect(result).toHaveLength(1);
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAuditService(mockRepository);
      await expect(service.getAuditLogsByUser('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAuditService(mockRepository);
      await expect(service.getAuditLogsByUser('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should return paginated logs', async () => {
      mockRepository.getAuditLogsByUser.mockResolvedValue({ data: [{ id: 'aud-1' }], total: 50 });
      const service = createAuditService(mockRepository);
      const result = await service.getAuditLogsByUser('school-1', 'user-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getAuditLogsByUser.mockRejectedValue(new Error('DB error'));
      const service = createAuditService(mockRepository);
      await expect(service.getAuditLogsByUser('school-1', 'user-1')).rejects.toThrow('DB error');
    });
  });

  describe('getAuditLogsByResource', () => {
    it('should return audit logs by resource', async () => {
      mockRepository.getAuditLogsByResource.mockResolvedValue([{ id: 'aud-1', action: 'document.updated', resourceType: 'document', resourceId: 'doc-1' }]);
      const service = createAuditService(mockRepository);
      const result = await service.getAuditLogsByResource('school-1', 'document', 'doc-1');
      expect(result).toHaveLength(1);
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAuditService(mockRepository);
      await expect(service.getAuditLogsByResource('', 'document', 'doc-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if resourceType is missing', async () => {
      const service = createAuditService(mockRepository);
      await expect(service.getAuditLogsByResource('school-1', '', 'doc-1')).rejects.toThrow('Resource type is required');
    });

    it('should throw if resourceId is missing', async () => {
      const service = createAuditService(mockRepository);
      await expect(service.getAuditLogsByResource('school-1', 'document', '')).rejects.toThrow('Resource ID is required');
    });

    it('should return paginated logs', async () => {
      mockRepository.getAuditLogsByResource.mockResolvedValue({ data: [{ id: 'aud-1' }], total: 20 });
      const service = createAuditService(mockRepository);
      const result = await service.getAuditLogsByResource('school-1', 'document', 'doc-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getAuditLogsByResource.mockRejectedValue(new Error('DB error'));
      const service = createAuditService(mockRepository);
      await expect(service.getAuditLogsByResource('school-1', 'document', 'doc-1')).rejects.toThrow('DB error');
    });
  });
});
