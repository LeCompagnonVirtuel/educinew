import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createConnectorService } from '../../src/features/integration/services/connector.service';

describe('ConnectorService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getConnectors: vi.fn(),
      getConnectorById: vi.fn(),
      createConnector: vi.fn(),
      updateConnector: vi.fn(),
      deleteConnector: vi.fn(),
      testConnection: vi.fn(),
      getConnectorStatus: vi.fn(),
      getConnectorMetrics: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createConnectorService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getConnectors).toBeInstanceOf(Function);
    expect(service.getConnectorById).toBeInstanceOf(Function);
    expect(service.createConnector).toBeInstanceOf(Function);
    expect(service.updateConnector).toBeInstanceOf(Function);
    expect(service.deleteConnector).toBeInstanceOf(Function);
    expect(service.testConnection).toBeInstanceOf(Function);
    expect(service.getConnectorStatus).toBeInstanceOf(Function);
    expect(service.getConnectorMetrics).toBeInstanceOf(Function);
  });

  describe('getConnectors', () => {
    it('should return connectors list', async () => {
      mockRepository.getConnectors.mockResolvedValue([{ id: 'cn-1', name: 'Google Drive' }]);
      const service = createConnectorService(mockRepository);
      const result = await service.getConnectors('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return connectors with filters', async () => {
      mockRepository.getConnectors.mockResolvedValue([{ id: 'cn-1' }]);
      const service = createConnectorService(mockRepository);
      await service.getConnectors('school-1', { status: 'connected' });
      expect(mockRepository.getConnectors).toHaveBeenCalledWith('school-1', { status: 'connected' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createConnectorService(mockRepository);
      await expect(service.getConnectors('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getConnectors.mockResolvedValue([]);
      const service = createConnectorService(mockRepository);
      const result = await service.getConnectors('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated connectors', async () => {
      mockRepository.getConnectors.mockResolvedValue({ data: [{ id: 'cn-1' }], total: 10 });
      const service = createConnectorService(mockRepository);
      const result = await service.getConnectors('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by type', async () => {
      mockRepository.getConnectors.mockResolvedValue([{ id: 'cn-1', type: 'cloud_storage' }]);
      const service = createConnectorService(mockRepository);
      const result = await service.getConnectors('school-1', { type: 'cloud_storage' });
      expect(result).toHaveLength(1);
    });

    it('should return connectors with last sync', async () => {
      mockRepository.getConnectors.mockResolvedValue([{ id: 'cn-1', lastSyncAt: '2024-01-01', lastSyncStatus: 'success' }]);
      const service = createConnectorService(mockRepository);
      const result = await service.getConnectors('school-1');
      expect(result[0].lastSyncStatus).toBe('success');
    });

    it('should handle repository errors', async () => {
      mockRepository.getConnectors.mockRejectedValue(new Error('DB error'));
      const service = createConnectorService(mockRepository);
      await expect(service.getConnectors('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getConnectorById', () => {
    it('should return a single connector', async () => {
      mockRepository.getConnectorById.mockResolvedValue({ id: 'cn-1', name: 'Google Drive' });
      const service = createConnectorService(mockRepository);
      const result = await service.getConnectorById('cn-1');
      expect(result.id).toBe('cn-1');
    });

    it('should throw if connector not found', async () => {
      mockRepository.getConnectorById.mockResolvedValue(null);
      const service = createConnectorService(mockRepository);
      await expect(service.getConnectorById('nonexistent')).rejects.toThrow('Connector not found');
    });

    it('should throw if id is missing', async () => {
      const service = createConnectorService(mockRepository);
      await expect(service.getConnectorById('')).rejects.toThrow('Connector ID is required');
    });

    it('should return connector with config', async () => {
      mockRepository.getConnectorById.mockResolvedValue({ id: 'cn-1', config: { apiKey: '***', endpoint: 'https://api.example.com' } });
      const service = createConnectorService(mockRepository);
      const result = await service.getConnectorById('cn-1');
      expect(result.config.endpoint).toBeDefined();
    });

    it('should return connector with capabilities', async () => {
      mockRepository.getConnectorById.mockResolvedValue({ id: 'cn-1', capabilities: ['upload', 'download', 'sync'] });
      const service = createConnectorService(mockRepository);
      const result = await service.getConnectorById('cn-1');
      expect(result.capabilities).toHaveLength(3);
    });

    it('should return connector with health', async () => {
      mockRepository.getConnectorById.mockResolvedValue({ id: 'cn-1', health: { status: 'healthy', lastCheck: '2024-01-01' } });
      const service = createConnectorService(mockRepository);
      const result = await service.getConnectorById('cn-1');
      expect(result.health.status).toBe('healthy');
    });

    it('should handle repository errors', async () => {
      mockRepository.getConnectorById.mockRejectedValue(new Error('Query timeout'));
      const service = createConnectorService(mockRepository);
      await expect(service.getConnectorById('cn-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createConnector', () => {
    it('should create a connector', async () => {
      mockRepository.createConnector.mockResolvedValue({ id: 'cn-1', name: 'Google Drive' });
      const service = createConnectorService(mockRepository);
      const result = await service.createConnector('school-1', 'user-1', { name: 'Google Drive', type: 'cloud_storage' });
      expect(result.id).toBe('cn-1');
      expect(mockRepository.createConnector).toHaveBeenCalled();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createConnectorService(mockRepository);
      await expect(service.createConnector('', 'user-1', { name: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createConnectorService(mockRepository);
      await expect(service.createConnector('school-1', '', { name: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if name is missing', async () => {
      const service = createConnectorService(mockRepository);
      await expect(service.createConnector('school-1', 'user-1', { name: '' })).rejects.toThrow('Connector name is required');
    });

    it('should create connector with config', async () => {
      mockRepository.createConnector.mockResolvedValue({ id: 'cn-1', config: { apiKey: '***' } });
      const service = createConnectorService(mockRepository);
      const result = await service.createConnector('school-1', 'user-1', { name: 'T', type: 'cloud_storage', config: { apiKey: '***' } });
      expect(result.config).toBeDefined();
    });

    it('should create connector with description', async () => {
      mockRepository.createConnector.mockResolvedValue({ id: 'cn-1', description: 'Cloud storage connector' });
      const service = createConnectorService(mockRepository);
      const result = await service.createConnector('school-1', 'user-1', { name: 'T', type: 'cloud_storage', description: 'Cloud storage connector' });
      expect(result.description).toBe('Cloud storage connector');
    });

    it('should handle creation failure', async () => {
      mockRepository.createConnector.mockRejectedValue(new Error('Invalid config'));
      const service = createConnectorService(mockRepository);
      await expect(service.createConnector('school-1', 'user-1', { name: 'T', type: 'cloud_storage' })).rejects.toThrow('Invalid config');
    });
  });

  describe('updateConnector', () => {
    it('should update a connector', async () => {
      mockRepository.getConnectorById.mockResolvedValue({ id: 'cn-1', name: 'Old' });
      mockRepository.updateConnector.mockResolvedValue({ id: 'cn-1', name: 'Updated' });
      const service = createConnectorService(mockRepository);
      const result = await service.updateConnector('cn-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if connector not found', async () => {
      mockRepository.getConnectorById.mockResolvedValue(null);
      const service = createConnectorService(mockRepository);
      await expect(service.updateConnector('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createConnectorService(mockRepository);
      await expect(service.updateConnector('', 'user-1', { name: 'New' })).rejects.toThrow('Connector ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createConnectorService(mockRepository);
      await expect(service.updateConnector('cn-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update connector config', async () => {
      mockRepository.getConnectorById.mockResolvedValue({ id: 'cn-1' });
      mockRepository.updateConnector.mockResolvedValue({ id: 'cn-1', config: { apiKey: 'new-key' } });
      const service = createConnectorService(mockRepository);
      const result = await service.updateConnector('cn-1', 'user-1', { config: { apiKey: 'new-key' } });
      expect(result.config.apiKey).toBe('new-key');
    });

    it('should handle update failure', async () => {
      mockRepository.getConnectorById.mockResolvedValue({ id: 'cn-1' });
      mockRepository.updateConnector.mockRejectedValue(new Error('Cannot update'));
      const service = createConnectorService(mockRepository);
      await expect(service.updateConnector('cn-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deleteConnector', () => {
    it('should delete a connector', async () => {
      mockRepository.getConnectorById.mockResolvedValue({ id: 'cn-1' });
      mockRepository.deleteConnector.mockResolvedValue({ success: true });
      const service = createConnectorService(mockRepository);
      await service.deleteConnector('cn-1', 'user-1');
      expect(mockRepository.deleteConnector).toHaveBeenCalledWith('cn-1');
    });

    it('should throw if connector not found', async () => {
      mockRepository.getConnectorById.mockResolvedValue(null);
      const service = createConnectorService(mockRepository);
      await expect(service.deleteConnector('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createConnectorService(mockRepository);
      await expect(service.deleteConnector('', 'user-1')).rejects.toThrow('Connector ID is required');
    });

    it('should handle deletion with active sync', async () => {
      mockRepository.getConnectorById.mockResolvedValue({ id: 'cn-1' });
      mockRepository.deleteConnector.mockRejectedValue(new Error('Connector has active sync'));
      const service = createConnectorService(mockRepository);
      await expect(service.deleteConnector('cn-1', 'user-1')).rejects.toThrow('Connector has active sync');
    });

    it('should force delete connector', async () => {
      mockRepository.getConnectorById.mockResolvedValue({ id: 'cn-1' });
      mockRepository.deleteConnector.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createConnectorService(mockRepository);
      const result = await service.deleteConnector('cn-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('testConnection', () => {
    it('should test connector connection', async () => {
      mockRepository.testConnection.mockResolvedValue({ connectorId: 'cn-1', status: 'success', latency: 150 });
      const service = createConnectorService(mockRepository);
      const result = await service.testConnection('cn-1', 'user-1');
      expect(result.status).toBe('success');
      expect(result.latency).toBe(150);
    });

    it('should throw if connectorId is missing', async () => {
      const service = createConnectorService(mockRepository);
      await expect(service.testConnection('', 'user-1')).rejects.toThrow('Connector ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createConnectorService(mockRepository);
      await expect(service.testConnection('cn-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle connection failure', async () => {
      mockRepository.testConnection.mockResolvedValue({ connectorId: 'cn-1', status: 'failed', error: 'Connection timeout' });
      const service = createConnectorService(mockRepository);
      const result = await service.testConnection('cn-1', 'user-1');
      expect(result.status).toBe('failed');
      expect(result.error).toBe('Connection timeout');
    });

    it('should return connection details', async () => {
      mockRepository.testConnection.mockResolvedValue({ connectorId: 'cn-1', status: 'success', latency: 150, serverVersion: '2.1.0' });
      const service = createConnectorService(mockRepository);
      const result = await service.testConnection('cn-1', 'user-1');
      expect(result.serverVersion).toBe('2.1.0');
    });
  });

  describe('getConnectorStatus', () => {
    it('should return connector status', async () => {
      mockRepository.getConnectorStatus.mockResolvedValue({ connectorId: 'cn-1', status: 'connected', lastSync: '2024-01-01' });
      const service = createConnectorService(mockRepository);
      const result = await service.getConnectorStatus('cn-1');
      expect(result.status).toBe('connected');
    });

    it('should throw if connectorId is missing', async () => {
      const service = createConnectorService(mockRepository);
      await expect(service.getConnectorStatus('')).rejects.toThrow('Connector ID is required');
    });

    it('should return disconnected status', async () => {
      mockRepository.getConnectorStatus.mockResolvedValue({ connectorId: 'cn-1', status: 'disconnected', error: 'Auth expired' });
      const service = createConnectorService(mockRepository);
      const result = await service.getConnectorStatus('cn-1');
      expect(result.status).toBe('disconnected');
    });

    it('should return syncing status', async () => {
      mockRepository.getConnectorStatus.mockResolvedValue({ connectorId: 'cn-1', status: 'syncing', progress: 50 });
      const service = createConnectorService(mockRepository);
      const result = await service.getConnectorStatus('cn-1');
      expect(result.status).toBe('syncing');
      expect(result.progress).toBe(50);
    });

    it('should handle repository errors', async () => {
      mockRepository.getConnectorStatus.mockRejectedValue(new Error('DB error'));
      const service = createConnectorService(mockRepository);
      await expect(service.getConnectorStatus('cn-1')).rejects.toThrow('DB error');
    });
  });

  describe('getConnectorMetrics', () => {
    it('should return connector metrics', async () => {
      mockRepository.getConnectorMetrics.mockResolvedValue({ connectorId: 'cn-1', totalSyncs: 100, successfulSyncs: 95 });
      const service = createConnectorService(mockRepository);
      const result = await service.getConnectorMetrics('cn-1');
      expect(result.totalSyncs).toBe(100);
    });

    it('should return metrics with filters', async () => {
      mockRepository.getConnectorMetrics.mockResolvedValue({ connectorId: 'cn-1', syncs: [] });
      const service = createConnectorService(mockRepository);
      await service.getConnectorMetrics('cn-1', { since: '2024-01-01' });
      expect(mockRepository.getConnectorMetrics).toHaveBeenCalledWith('cn-1', { since: '2024-01-01' });
    });

    it('should throw if connectorId is missing', async () => {
      const service = createConnectorService(mockRepository);
      await expect(service.getConnectorMetrics('')).rejects.toThrow('Connector ID is required');
    });

    it('should return empty metrics', async () => {
      mockRepository.getConnectorMetrics.mockResolvedValue({ connectorId: 'cn-1', totalSyncs: 0 });
      const service = createConnectorService(mockRepository);
      const result = await service.getConnectorMetrics('cn-1');
      expect(result.totalSyncs).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getConnectorMetrics.mockRejectedValue(new Error('DB error'));
      const service = createConnectorService(mockRepository);
      await expect(service.getConnectorMetrics('cn-1')).rejects.toThrow('DB error');
    });
  });
});
