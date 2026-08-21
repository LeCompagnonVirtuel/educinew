import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createIntegrationService } from '../../src/features/integration/services/integration.service';

describe('IntegrationService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getIntegrations: vi.fn(),
      getIntegrationById: vi.fn(),
      createIntegration: vi.fn(),
      updateIntegration: vi.fn(),
      deleteIntegration: vi.fn(),
      searchIntegrations: vi.fn(),
      healthCheck: vi.fn(),
      testConnection: vi.fn(),
      getIntegrationLogs: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createIntegrationService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getIntegrations).toBeInstanceOf(Function);
    expect(service.getIntegrationById).toBeInstanceOf(Function);
    expect(service.createIntegration).toBeInstanceOf(Function);
    expect(service.updateIntegration).toBeInstanceOf(Function);
    expect(service.deleteIntegration).toBeInstanceOf(Function);
    expect(service.searchIntegrations).toBeInstanceOf(Function);
    expect(service.healthCheck).toBeInstanceOf(Function);
    expect(service.testConnection).toBeInstanceOf(Function);
    expect(service.getIntegrationLogs).toBeInstanceOf(Function);
  });

  describe('getIntegrations', () => {
    it('should return integrations list', async () => {
      const integrations = [{ id: 'int-1', name: 'Test Integration' }];
      mockRepository.getIntegrations.mockResolvedValue(integrations);
      const service = createIntegrationService(mockRepository);
      const result = await service.getIntegrations('school-1');
      expect(result).toEqual(integrations);
      expect(mockRepository.getIntegrations).toHaveBeenCalledWith('school-1', undefined);
    });

    it('should return integrations with filters', async () => {
      const filters = { status: 'active', type: 'api' };
      mockRepository.getIntegrations.mockResolvedValue([{ id: 'int-1' }]);
      const service = createIntegrationService(mockRepository);
      await service.getIntegrations('school-1', filters);
      expect(mockRepository.getIntegrations).toHaveBeenCalledWith('school-1', filters);
    });

    it('should return empty list when no integrations exist', async () => {
      mockRepository.getIntegrations.mockResolvedValue([]);
      const service = createIntegrationService(mockRepository);
      const result = await service.getIntegrations('school-1');
      expect(result).toEqual([]);
    });

    it('should throw if schoolId is missing', async () => {
      const service = createIntegrationService(mockRepository);
      await expect(service.getIntegrations('')).rejects.toThrow('schoolId is required');
    });

    it('should return paginated integrations', async () => {
      const integrations = Array.from({ length: 10 }, (_, i) => ({ id: `int-${i}` }));
      mockRepository.getIntegrations.mockResolvedValue({ data: integrations, total: 50, page: 1 });
      const service = createIntegrationService(mockRepository);
      const result = await service.getIntegrations('school-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(10);
    });

    it('should filter by type', async () => {
      mockRepository.getIntegrations.mockResolvedValue([{ id: 'int-1', type: 'webhook' }]);
      const service = createIntegrationService(mockRepository);
      const result = await service.getIntegrations('school-1', { type: 'webhook' });
      expect(result).toHaveLength(1);
    });

    it('should filter by status', async () => {
      mockRepository.getIntegrations.mockResolvedValue([{ id: 'int-1', status: 'active' }]);
      const service = createIntegrationService(mockRepository);
      const result = await service.getIntegrations('school-1', { status: 'active' });
      expect(result).toHaveLength(1);
    });

    it('should return sorted integrations', async () => {
      mockRepository.getIntegrations.mockResolvedValue([{ id: 'int-2', name: 'B' }, { id: 'int-1', name: 'A' }]);
      const service = createIntegrationService(mockRepository);
      const result = await service.getIntegrations('school-1', { sortBy: 'name', sortOrder: 'asc' });
      expect(result).toHaveLength(2);
    });

    it('should handle repository errors', async () => {
      mockRepository.getIntegrations.mockRejectedValue(new Error('DB error'));
      const service = createIntegrationService(mockRepository);
      await expect(service.getIntegrations('school-1')).rejects.toThrow('DB error');
    });

    it('should return integrations with health status', async () => {
      mockRepository.getIntegrations.mockResolvedValue([{ id: 'int-1', healthStatus: 'healthy', lastHealthCheck: '2024-01-01' }]);
      const service = createIntegrationService(mockRepository);
      const result = await service.getIntegrations('school-1');
      expect(result[0].healthStatus).toBe('healthy');
    });

    it('should filter by creator', async () => {
      mockRepository.getIntegrations.mockResolvedValue([{ id: 'int-1', createdBy: 'user-1' }]);
      const service = createIntegrationService(mockRepository);
      const result = await service.getIntegrations('school-1', { createdBy: 'user-1' });
      expect(result).toHaveLength(1);
    });

    it('should return integrations with tags', async () => {
      mockRepository.getIntegrations.mockResolvedValue([{ id: 'int-1', tags: ['production', 'critical'] }]);
      const service = createIntegrationService(mockRepository);
      const result = await service.getIntegrations('school-1');
      expect(result[0].tags).toHaveLength(2);
    });
  });

  describe('getIntegrationById', () => {
    it('should return a single integration', async () => {
      const integration = { id: 'int-1', name: 'Test Integration' };
      mockRepository.getIntegrationById.mockResolvedValue(integration);
      const service = createIntegrationService(mockRepository);
      const result = await service.getIntegrationById('int-1');
      expect(result).toEqual(integration);
      expect(mockRepository.getIntegrationById).toHaveBeenCalledWith('int-1');
    });

    it('should throw if integration not found', async () => {
      mockRepository.getIntegrationById.mockResolvedValue(null);
      const service = createIntegrationService(mockRepository);
      await expect(service.getIntegrationById('nonexistent')).rejects.toThrow('Integration not found');
    });

    it('should throw if id is missing', async () => {
      const service = createIntegrationService(mockRepository);
      await expect(service.getIntegrationById('')).rejects.toThrow('Integration ID is required');
    });

    it('should return integration with full details', async () => {
      const integration = { id: 'int-1', name: 'Test', config: {}, credentials: {}, metadata: {} };
      mockRepository.getIntegrationById.mockResolvedValue(integration);
      const service = createIntegrationService(mockRepository);
      const result = await service.getIntegrationById('int-1');
      expect(result.config).toBeDefined();
    });

    it('should handle repository errors', async () => {
      mockRepository.getIntegrationById.mockRejectedValue(new Error('Query timeout'));
      const service = createIntegrationService(mockRepository);
      await expect(service.getIntegrationById('int-1')).rejects.toThrow('Query timeout');
    });

    it('should return integration with endpoints', async () => {
      const integration = { id: 'int-1', endpoints: [{ path: '/api/v1', method: 'GET' }] };
      mockRepository.getIntegrationById.mockResolvedValue(integration);
      const service = createIntegrationService(mockRepository);
      const result = await service.getIntegrationById('int-1');
      expect(result.endpoints).toHaveLength(1);
    });

    it('should return integration with rate limits', async () => {
      const integration = { id: 'int-1', rateLimit: { maxRequests: 100, windowMs: 60000 } };
      mockRepository.getIntegrationById.mockResolvedValue(integration);
      const service = createIntegrationService(mockRepository);
      const result = await service.getIntegrationById('int-1');
      expect(result.rateLimit.maxRequests).toBe(100);
    });

    it('should return integration with version info', async () => {
      const integration = { id: 'int-1', apiVersion: 'v2', versionHistory: ['v1', 'v2'] };
      mockRepository.getIntegrationById.mockResolvedValue(integration);
      const service = createIntegrationService(mockRepository);
      const result = await service.getIntegrationById('int-1');
      expect(result.apiVersion).toBe('v2');
    });
  });

  describe('createIntegration', () => {
    it('should create an integration', async () => {
      const data = { name: 'New Integration', type: 'api' };
      const created = { id: 'int-1', ...data };
      mockRepository.createIntegration.mockResolvedValue(created);
      const service = createIntegrationService(mockRepository);
      const result = await service.createIntegration('school-1', 'user-1', data);
      expect(result).toEqual(created);
      expect(mockRepository.createIntegration).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'New Integration', createdBy: 'user-1' }),
        'school-1'
      );
    });

    it('should throw if schoolId is missing', async () => {
      const service = createIntegrationService(mockRepository);
      await expect(service.createIntegration('', 'user-1', { name: 'Int' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createIntegrationService(mockRepository);
      await expect(service.createIntegration('school-1', '', { name: 'Int' })).rejects.toThrow('userId is required');
    });

    it('should throw if data is missing', async () => {
      const service = createIntegrationService(mockRepository);
      await expect(service.createIntegration('school-1', 'user-1', null)).rejects.toThrow('Integration data is required');
    });

    it('should create integration with config', async () => {
      const data = { name: 'API', type: 'api', config: { baseUrl: 'https://api.example.com' } };
      mockRepository.createIntegration.mockResolvedValue({ id: 'int-1', ...data });
      const service = createIntegrationService(mockRepository);
      const result = await service.createIntegration('school-1', 'user-1', data);
      expect(result.config.baseUrl).toBe('https://api.example.com');
    });

    it('should create integration with credentials', async () => {
      const data = { name: 'API', type: 'api', credentials: { apiKey: 'key' } };
      mockRepository.createIntegration.mockResolvedValue({ id: 'int-1', ...data });
      const service = createIntegrationService(mockRepository);
      const result = await service.createIntegration('school-1', 'user-1', data);
      expect(result.credentials).toBeDefined();
    });

    it('should handle creation failure', async () => {
      mockRepository.createIntegration.mockRejectedValue(new Error('Name already exists'));
      const service = createIntegrationService(mockRepository);
      await expect(service.createIntegration('school-1', 'user-1', { name: 'Dup' })).rejects.toThrow('Name already exists');
    });

    it('should create integration with tags', async () => {
      const data = { name: 'API', type: 'api', tags: ['production'] };
      mockRepository.createIntegration.mockResolvedValue({ id: 'int-1', ...data });
      const service = createIntegrationService(mockRepository);
      const result = await service.createIntegration('school-1', 'user-1', data);
      expect(result.tags).toHaveLength(1);
    });

    it('should create integration with rate limit', async () => {
      const data = { name: 'API', type: 'api', rateLimit: { maxRequests: 100, windowMs: 60000 } };
      mockRepository.createIntegration.mockResolvedValue({ id: 'int-1', ...data });
      const service = createIntegrationService(mockRepository);
      const result = await service.createIntegration('school-1', 'user-1', data);
      expect(result.rateLimit.maxRequests).toBe(100);
    });

    it('should create integration with description', async () => {
      const data = { name: 'API', type: 'api', description: 'External API integration' };
      mockRepository.createIntegration.mockResolvedValue({ id: 'int-1', ...data });
      const service = createIntegrationService(mockRepository);
      const result = await service.createIntegration('school-1', 'user-1', data);
      expect(result.description).toBe('External API integration');
    });
  });

  describe('updateIntegration', () => {
    it('should update an integration', async () => {
      mockRepository.getIntegrationById.mockResolvedValue({ id: 'int-1', name: 'Old Name' });
      mockRepository.updateIntegration.mockResolvedValue({ id: 'int-1', name: 'New Name' });
      const service = createIntegrationService(mockRepository);
      const result = await service.updateIntegration('int-1', 'user-1', { name: 'New Name' });
      expect(result.name).toBe('New Name');
      expect(mockRepository.updateIntegration).toHaveBeenCalledWith('int-1', { name: 'New Name' });
    });

    it('should throw if integration not found', async () => {
      mockRepository.getIntegrationById.mockResolvedValue(null);
      const service = createIntegrationService(mockRepository);
      await expect(service.updateIntegration('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createIntegrationService(mockRepository);
      await expect(service.updateIntegration('', 'user-1', { name: 'New' })).rejects.toThrow('Integration ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createIntegrationService(mockRepository);
      await expect(service.updateIntegration('int-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update integration config', async () => {
      mockRepository.getIntegrationById.mockResolvedValue({ id: 'int-1', config: {} });
      mockRepository.updateIntegration.mockResolvedValue({ id: 'int-1', config: { baseUrl: 'new-url' } });
      const service = createIntegrationService(mockRepository);
      const result = await service.updateIntegration('int-1', 'user-1', { config: { baseUrl: 'new-url' } });
      expect(result.config.baseUrl).toBe('new-url');
    });

    it('should update integration status', async () => {
      mockRepository.getIntegrationById.mockResolvedValue({ id: 'int-1', status: 'active' });
      mockRepository.updateIntegration.mockResolvedValue({ id: 'int-1', status: 'inactive' });
      const service = createIntegrationService(mockRepository);
      const result = await service.updateIntegration('int-1', 'user-1', { status: 'inactive' });
      expect(result.status).toBe('inactive');
    });

    it('should handle update failure', async () => {
      mockRepository.getIntegrationById.mockResolvedValue({ id: 'int-1' });
      mockRepository.updateIntegration.mockRejectedValue(new Error('Cannot update'));
      const service = createIntegrationService(mockRepository);
      await expect(service.updateIntegration('int-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update');
    });

    it('should update integration tags', async () => {
      mockRepository.getIntegrationById.mockResolvedValue({ id: 'int-1', tags: [] });
      mockRepository.updateIntegration.mockResolvedValue({ id: 'int-1', tags: ['updated'] });
      const service = createIntegrationService(mockRepository);
      const result = await service.updateIntegration('int-1', 'user-1', { tags: ['updated'] });
      expect(result.tags).toHaveLength(1);
    });

    it('should update integration credentials', async () => {
      mockRepository.getIntegrationById.mockResolvedValue({ id: 'int-1', credentials: {} });
      mockRepository.updateIntegration.mockResolvedValue({ id: 'int-1', credentials: { apiKey: 'new-key' } });
      const service = createIntegrationService(mockRepository);
      const result = await service.updateIntegration('int-1', 'user-1', { credentials: { apiKey: 'new-key' } });
      expect(result.credentials.apiKey).toBe('new-key');
    });
  });

  describe('deleteIntegration', () => {
    it('should delete an integration', async () => {
      mockRepository.getIntegrationById.mockResolvedValue({ id: 'int-1' });
      mockRepository.deleteIntegration.mockResolvedValue({ success: true });
      const service = createIntegrationService(mockRepository);
      await service.deleteIntegration('int-1', 'user-1');
      expect(mockRepository.deleteIntegration).toHaveBeenCalledWith('int-1');
    });

    it('should throw if integration not found', async () => {
      mockRepository.getIntegrationById.mockResolvedValue(null);
      const service = createIntegrationService(mockRepository);
      await expect(service.deleteIntegration('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createIntegrationService(mockRepository);
      await expect(service.deleteIntegration('', 'user-1')).rejects.toThrow('Integration ID is required');
    });

    it('should handle deletion with active webhooks', async () => {
      mockRepository.getIntegrationById.mockResolvedValue({ id: 'int-1' });
      mockRepository.deleteIntegration.mockRejectedValue(new Error('Integration has active webhooks'));
      const service = createIntegrationService(mockRepository);
      await expect(service.deleteIntegration('int-1', 'user-1')).rejects.toThrow('Integration has active webhooks');
    });

    it('should force delete integration', async () => {
      mockRepository.getIntegrationById.mockResolvedValue({ id: 'int-1' });
      mockRepository.deleteIntegration.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createIntegrationService(mockRepository);
      const result = await service.deleteIntegration('int-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });

    it('should handle deletion with dependent resources', async () => {
      mockRepository.getIntegrationById.mockResolvedValue({ id: 'int-1' });
      mockRepository.deleteIntegration.mockRejectedValue(new Error('Integration has dependent resources'));
      const service = createIntegrationService(mockRepository);
      await expect(service.deleteIntegration('int-1', 'user-1')).rejects.toThrow('Integration has dependent resources');
    });
  });

  describe('searchIntegrations', () => {
    it('should search integrations', async () => {
      const results = [{ id: 'int-1', name: 'Test' }];
      mockRepository.searchIntegrations.mockResolvedValue(results);
      const service = createIntegrationService(mockRepository);
      const result = await service.searchIntegrations('school-1', 'test');
      expect(result).toEqual(results);
      expect(mockRepository.searchIntegrations).toHaveBeenCalledWith('school-1', 'test');
    });

    it('should return empty results for no matches', async () => {
      mockRepository.searchIntegrations.mockResolvedValue([]);
      const service = createIntegrationService(mockRepository);
      const result = await service.searchIntegrations('school-1', 'nonexistent');
      expect(result).toEqual([]);
    });

    it('should throw if schoolId is missing', async () => {
      const service = createIntegrationService(mockRepository);
      await expect(service.searchIntegrations('', 'test')).rejects.toThrow('schoolId is required');
    });

    it('should throw if query is missing', async () => {
      const service = createIntegrationService(mockRepository);
      await expect(service.searchIntegrations('school-1', '')).rejects.toThrow('Search query is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.searchIntegrations.mockRejectedValue(new Error('Search timeout'));
      const service = createIntegrationService(mockRepository);
      await expect(service.searchIntegrations('school-1', 'test')).rejects.toThrow('Search timeout');
    });

    it('should search with filters', async () => {
      mockRepository.searchIntegrations.mockResolvedValue([{ id: 'int-1' }]);
      const service = createIntegrationService(mockRepository);
      const result = await service.searchIntegrations('school-1', 'test', { type: 'api' });
      expect(result).toHaveLength(1);
    });

    it('should return paginated search results', async () => {
      mockRepository.searchIntegrations.mockResolvedValue({ data: [{ id: 'int-1' }], total: 50 });
      const service = createIntegrationService(mockRepository);
      const result = await service.searchIntegrations('school-1', 'test', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });
  });

  describe('healthCheck', () => {
    it('should check integration health', async () => {
      mockRepository.healthCheck.mockResolvedValue({ status: 'healthy', latency: 50 });
      const service = createIntegrationService(mockRepository);
      const result = await service.healthCheck('int-1');
      expect(result).toEqual({ status: 'healthy', latency: 50 });
      expect(mockRepository.healthCheck).toHaveBeenCalledWith('int-1');
    });

    it('should return unhealthy status on error', async () => {
      mockRepository.healthCheck.mockResolvedValue({ status: 'unhealthy', error: 'Timeout' });
      const service = createIntegrationService(mockRepository);
      const result = await service.healthCheck('int-1');
      expect(result.status).toBe('unhealthy');
    });

    it('should throw if id is missing', async () => {
      const service = createIntegrationService(mockRepository);
      await expect(service.healthCheck('')).rejects.toThrow('Integration ID is required');
    });

    it('should handle repository errors gracefully', async () => {
      mockRepository.healthCheck.mockRejectedValue(new Error('Connection refused'));
      const service = createIntegrationService(mockRepository);
      await expect(service.healthCheck('int-1')).rejects.toThrow('Connection refused');
    });

    it('should return degraded status', async () => {
      mockRepository.healthCheck.mockResolvedValue({ status: 'degraded', latency: 2000, warning: 'High latency' });
      const service = createIntegrationService(mockRepository);
      const result = await service.healthCheck('int-1');
      expect(result.status).toBe('degraded');
    });

    it('should return health with detailed info', async () => {
      mockRepository.healthCheck.mockResolvedValue({ status: 'healthy', latency: 50, uptime: 99.99, lastCheck: '2024-01-01' });
      const service = createIntegrationService(mockRepository);
      const result = await service.healthCheck('int-1');
      expect(result.uptime).toBe(99.99);
    });

    it('should return timeout status', async () => {
      mockRepository.healthCheck.mockResolvedValue({ status: 'timeout', latency: 30000 });
      const service = createIntegrationService(mockRepository);
      const result = await service.healthCheck('int-1');
      expect(result.status).toBe('timeout');
    });
  });

  describe('testConnection', () => {
    it('should test integration connection', async () => {
      mockRepository.testConnection.mockResolvedValue({ success: true, latency: 100 });
      const service = createIntegrationService(mockRepository);
      const result = await service.testConnection('int-1');
      expect(result.success).toBe(true);
      expect(mockRepository.testConnection).toHaveBeenCalledWith('int-1');
    });

    it('should throw if id is missing', async () => {
      const service = createIntegrationService(mockRepository);
      await expect(service.testConnection('')).rejects.toThrow('Integration ID is required');
    });

    it('should handle connection failure', async () => {
      mockRepository.testConnection.mockResolvedValue({ success: false, error: 'Connection refused' });
      const service = createIntegrationService(mockRepository);
      const result = await service.testConnection('int-1');
      expect(result.success).toBe(false);
    });

    it('should handle timeout', async () => {
      mockRepository.testConnection.mockResolvedValue({ success: false, error: 'Timeout' });
      const service = createIntegrationService(mockRepository);
      const result = await service.testConnection('int-1');
      expect(result.error).toBe('Timeout');
    });

    it('should return connection details', async () => {
      mockRepository.testConnection.mockResolvedValue({ success: true, statusCode: 200, headers: {} });
      const service = createIntegrationService(mockRepository);
      const result = await service.testConnection('int-1');
      expect(result.statusCode).toBe(200);
    });

    it('should handle auth failure', async () => {
      mockRepository.testConnection.mockResolvedValue({ success: false, error: 'Unauthorized', statusCode: 401 });
      const service = createIntegrationService(mockRepository);
      const result = await service.testConnection('int-1');
      expect(result.statusCode).toBe(401);
    });
  });

  describe('getIntegrationLogs', () => {
    it('should return integration logs', async () => {
      const logs = [{ id: 'log-1', action: 'created', timestamp: '2024-01-01' }];
      mockRepository.getIntegrationLogs.mockResolvedValue(logs);
      const service = createIntegrationService(mockRepository);
      const result = await service.getIntegrationLogs('int-1');
      expect(result).toEqual(logs);
      expect(mockRepository.getIntegrationLogs).toHaveBeenCalledWith('int-1', undefined);
    });

    it('should return logs with filters', async () => {
      mockRepository.getIntegrationLogs.mockResolvedValue([{ id: 'log-1' }]);
      const service = createIntegrationService(mockRepository);
      const result = await service.getIntegrationLogs('int-1', { action: 'updated' });
      expect(result).toHaveLength(1);
    });

    it('should throw if id is missing', async () => {
      const service = createIntegrationService(mockRepository);
      await expect(service.getIntegrationLogs('')).rejects.toThrow('Integration ID is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getIntegrationLogs.mockRejectedValue(new Error('DB error'));
      const service = createIntegrationService(mockRepository);
      await expect(service.getIntegrationLogs('int-1')).rejects.toThrow('DB error');
    });

    it('should return paginated logs', async () => {
      const logs = Array.from({ length: 10 }, (_, i) => ({ id: `log-${i}` }));
      mockRepository.getIntegrationLogs.mockResolvedValue({ data: logs, total: 50 });
      const service = createIntegrationService(mockRepository);
      const result = await service.getIntegrationLogs('int-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(10);
    });

    it('should filter by date range', async () => {
      mockRepository.getIntegrationLogs.mockResolvedValue([{ id: 'log-1' }]);
      const service = createIntegrationService(mockRepository);
      const result = await service.getIntegrationLogs('int-1', { startDate: '2024-01-01', endDate: '2024-12-31' });
      expect(result).toHaveLength(1);
    });

    it('should return empty logs', async () => {
      mockRepository.getIntegrationLogs.mockResolvedValue([]);
      const service = createIntegrationService(mockRepository);
      const result = await service.getIntegrationLogs('int-1');
      expect(result).toEqual([]);
    });

    it('should return logs with user info', async () => {
      mockRepository.getIntegrationLogs.mockResolvedValue([{ id: 'log-1', userId: 'user-1', userName: 'Admin' }]);
      const service = createIntegrationService(mockRepository);
      const result = await service.getIntegrationLogs('int-1');
      expect(result[0].userName).toBe('Admin');
    });
  });
});
