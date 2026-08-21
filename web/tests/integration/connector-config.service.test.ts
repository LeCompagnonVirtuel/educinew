import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createConnectorConfigService } from '../../src/features/integration/services/connector-config.service';

describe('ConnectorConfigService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getConnectorConfigs: vi.fn(),
      getConnectorConfigById: vi.fn(),
      createConnectorConfig: vi.fn(),
      updateConnectorConfig: vi.fn(),
      deleteConnectorConfig: vi.fn(),
      getConnectorConfigByConnectorId: vi.fn(),
      validateConfig: vi.fn(),
      testConfig: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createConnectorConfigService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getConnectorConfigs).toBeInstanceOf(Function);
    expect(service.getConnectorConfigById).toBeInstanceOf(Function);
    expect(service.createConnectorConfig).toBeInstanceOf(Function);
    expect(service.updateConnectorConfig).toBeInstanceOf(Function);
    expect(service.deleteConnectorConfig).toBeInstanceOf(Function);
    expect(service.getConnectorConfigByConnectorId).toBeInstanceOf(Function);
    expect(service.validateConfig).toBeInstanceOf(Function);
    expect(service.testConfig).toBeInstanceOf(Function);
  });

  describe('getConnectorConfigs', () => {
    it('should return connector configs list', async () => {
      mockRepository.getConnectorConfigs.mockResolvedValue([{ id: 'cc-1', connectorId: 'cn-1', name: 'Google Drive Config' }]);
      const service = createConnectorConfigService(mockRepository);
      const result = await service.getConnectorConfigs('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return configs with filters', async () => {
      mockRepository.getConnectorConfigs.mockResolvedValue([{ id: 'cc-1' }]);
      const service = createConnectorConfigService(mockRepository);
      await service.getConnectorConfigs('school-1', { status: 'active' });
      expect(mockRepository.getConnectorConfigs).toHaveBeenCalledWith('school-1', { status: 'active' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createConnectorConfigService(mockRepository);
      await expect(service.getConnectorConfigs('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getConnectorConfigs.mockResolvedValue([]);
      const service = createConnectorConfigService(mockRepository);
      const result = await service.getConnectorConfigs('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated configs', async () => {
      mockRepository.getConnectorConfigs.mockResolvedValue({ data: [{ id: 'cc-1' }], total: 10 });
      const service = createConnectorConfigService(mockRepository);
      const result = await service.getConnectorConfigs('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by connector type', async () => {
      mockRepository.getConnectorConfigs.mockResolvedValue([{ id: 'cc-1', connectorType: 'cloud_storage' }]);
      const service = createConnectorConfigService(mockRepository);
      const result = await service.getConnectorConfigs('school-1', { connectorType: 'cloud_storage' });
      expect(result).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getConnectorConfigs.mockRejectedValue(new Error('DB error'));
      const service = createConnectorConfigService(mockRepository);
      await expect(service.getConnectorConfigs('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getConnectorConfigById', () => {
    it('should return a single config', async () => {
      mockRepository.getConnectorConfigById.mockResolvedValue({ id: 'cc-1', connectorId: 'cn-1', name: 'Google Drive Config' });
      const service = createConnectorConfigService(mockRepository);
      const result = await service.getConnectorConfigById('cc-1');
      expect(result.id).toBe('cc-1');
    });

    it('should throw if config not found', async () => {
      mockRepository.getConnectorConfigById.mockResolvedValue(null);
      const service = createConnectorConfigService(mockRepository);
      await expect(service.getConnectorConfigById('nonexistent')).rejects.toThrow('Connector config not found');
    });

    it('should throw if id is missing', async () => {
      const service = createConnectorConfigService(mockRepository);
      await expect(service.getConnectorConfigById('')).rejects.toThrow('Config ID is required');
    });

    it('should return config with encrypted values', async () => {
      mockRepository.getConnectorConfigById.mockResolvedValue({ id: 'cc-1', config: { apiKey: '***', endpoint: 'https://api.example.com' } });
      const service = createConnectorConfigService(mockRepository);
      const result = await service.getConnectorConfigById('cc-1');
      expect(result.config.apiKey).toBe('***');
    });

    it('should return config with schema', async () => {
      mockRepository.getConnectorConfigById.mockResolvedValue({ id: 'cc-1', schema: { required: ['apiKey', 'endpoint'], optional: ['timeout'] } });
      const service = createConnectorConfigService(mockRepository);
      const result = await service.getConnectorConfigById('cc-1');
      expect(result.schema.required).toHaveLength(2);
    });

    it('should handle repository errors', async () => {
      mockRepository.getConnectorConfigById.mockRejectedValue(new Error('Query timeout'));
      const service = createConnectorConfigService(mockRepository);
      await expect(service.getConnectorConfigById('cc-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createConnectorConfig', () => {
    it('should create a config', async () => {
      mockRepository.createConnectorConfig.mockResolvedValue({ id: 'cc-1', connectorId: 'cn-1', name: 'Google Drive Config' });
      const service = createConnectorConfigService(mockRepository);
      const result = await service.createConnectorConfig('school-1', 'user-1', { connectorId: 'cn-1', name: 'Google Drive Config', config: { apiKey: '***' } });
      expect(result.id).toBe('cc-1');
      expect(mockRepository.createConnectorConfig).toHaveBeenCalled();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createConnectorConfigService(mockRepository);
      await expect(service.createConnectorConfig('', 'user-1', { connectorId: 'cn-1', name: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createConnectorConfigService(mockRepository);
      await expect(service.createConnectorConfig('school-1', '', { connectorId: 'cn-1', name: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if connectorId is missing', async () => {
      const service = createConnectorConfigService(mockRepository);
      await expect(service.createConnectorConfig('school-1', 'user-1', { connectorId: '', name: 'T' })).rejects.toThrow('Connector ID is required');
    });

    it('should throw if name is missing', async () => {
      const service = createConnectorConfigService(mockRepository);
      await expect(service.createConnectorConfig('school-1', 'user-1', { connectorId: 'cn-1', name: '' })).rejects.toThrow('Config name is required');
    });

    it('should create config with description', async () => {
      mockRepository.createConnectorConfig.mockResolvedValue({ id: 'cc-1', description: 'Production config' });
      const service = createConnectorConfigService(mockRepository);
      const result = await service.createConnectorConfig('school-1', 'user-1', { connectorId: 'cn-1', name: 'T', description: 'Production config', config: {} });
      expect(result.description).toBe('Production config');
    });

    it('should handle creation failure', async () => {
      mockRepository.createConnectorConfig.mockRejectedValue(new Error('Invalid config'));
      const service = createConnectorConfigService(mockRepository);
      await expect(service.createConnectorConfig('school-1', 'user-1', { connectorId: 'cn-1', name: 'T', config: {} })).rejects.toThrow('Invalid config');
    });
  });

  describe('updateConnectorConfig', () => {
    it('should update a config', async () => {
      mockRepository.getConnectorConfigById.mockResolvedValue({ id: 'cc-1', name: 'Old' });
      mockRepository.updateConnectorConfig.mockResolvedValue({ id: 'cc-1', name: 'Updated' });
      const service = createConnectorConfigService(mockRepository);
      const result = await service.updateConnectorConfig('cc-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if config not found', async () => {
      mockRepository.getConnectorConfigById.mockResolvedValue(null);
      const service = createConnectorConfigService(mockRepository);
      await expect(service.updateConnectorConfig('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createConnectorConfigService(mockRepository);
      await expect(service.updateConnectorConfig('', 'user-1', { name: 'New' })).rejects.toThrow('Config ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createConnectorConfigService(mockRepository);
      await expect(service.updateConnectorConfig('cc-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update config values', async () => {
      mockRepository.getConnectorConfigById.mockResolvedValue({ id: 'cc-1' });
      mockRepository.updateConnectorConfig.mockResolvedValue({ id: 'cc-1', config: { apiKey: 'new-key' } });
      const service = createConnectorConfigService(mockRepository);
      const result = await service.updateConnectorConfig('cc-1', 'user-1', { config: { apiKey: 'new-key' } });
      expect(result.config.apiKey).toBe('new-key');
    });

    it('should handle update failure', async () => {
      mockRepository.getConnectorConfigById.mockResolvedValue({ id: 'cc-1' });
      mockRepository.updateConnectorConfig.mockRejectedValue(new Error('Cannot update'));
      const service = createConnectorConfigService(mockRepository);
      await expect(service.updateConnectorConfig('cc-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deleteConnectorConfig', () => {
    it('should delete a config', async () => {
      mockRepository.getConnectorConfigById.mockResolvedValue({ id: 'cc-1' });
      mockRepository.deleteConnectorConfig.mockResolvedValue({ success: true });
      const service = createConnectorConfigService(mockRepository);
      await service.deleteConnectorConfig('cc-1', 'user-1');
      expect(mockRepository.deleteConnectorConfig).toHaveBeenCalledWith('cc-1');
    });

    it('should throw if config not found', async () => {
      mockRepository.getConnectorConfigById.mockResolvedValue(null);
      const service = createConnectorConfigService(mockRepository);
      await expect(service.deleteConnectorConfig('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createConnectorConfigService(mockRepository);
      await expect(service.deleteConnectorConfig('', 'user-1')).rejects.toThrow('Config ID is required');
    });

    it('should handle deletion with active usage', async () => {
      mockRepository.getConnectorConfigById.mockResolvedValue({ id: 'cc-1' });
      mockRepository.deleteConnectorConfig.mockRejectedValue(new Error('Config is in use'));
      const service = createConnectorConfigService(mockRepository);
      await expect(service.deleteConnectorConfig('cc-1', 'user-1')).rejects.toThrow('Config is in use');
    });

    it('should force delete config', async () => {
      mockRepository.getConnectorConfigById.mockResolvedValue({ id: 'cc-1' });
      mockRepository.deleteConnectorConfig.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createConnectorConfigService(mockRepository);
      const result = await service.deleteConnectorConfig('cc-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('getConnectorConfigByConnectorId', () => {
    it('should return config by connector ID', async () => {
      mockRepository.getConnectorConfigByConnectorId.mockResolvedValue([{ id: 'cc-1', connectorId: 'cn-1' }]);
      const service = createConnectorConfigService(mockRepository);
      const result = await service.getConnectorConfigByConnectorId('cn-1');
      expect(result).toHaveLength(1);
    });

    it('should throw if connectorId is missing', async () => {
      const service = createConnectorConfigService(mockRepository);
      await expect(service.getConnectorConfigByConnectorId('')).rejects.toThrow('Connector ID is required');
    });

    it('should return empty if no configs', async () => {
      mockRepository.getConnectorConfigByConnectorId.mockResolvedValue([]);
      const service = createConnectorConfigService(mockRepository);
      const result = await service.getConnectorConfigByConnectorId('cn-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getConnectorConfigByConnectorId.mockRejectedValue(new Error('DB error'));
      const service = createConnectorConfigService(mockRepository);
      await expect(service.getConnectorConfigByConnectorId('cn-1')).rejects.toThrow('DB error');
    });
  });

  describe('validateConfig', () => {
    it('should validate a config', async () => {
      mockRepository.validateConfig.mockResolvedValue({ valid: true, errors: [] });
      const service = createConnectorConfigService(mockRepository);
      const result = await service.validateConfig('cn-1', { apiKey: '***', endpoint: 'https://api.example.com' });
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should throw if connectorId is missing', async () => {
      const service = createConnectorConfigService(mockRepository);
      await expect(service.validateConfig('', {})).rejects.toThrow('Connector ID is required');
    });

    it('should return invalid with errors', async () => {
      mockRepository.validateConfig.mockResolvedValue({ valid: false, errors: ['apiKey is required'] });
      const service = createConnectorConfigService(mockRepository);
      const result = await service.validateConfig('cn-1', {});
      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(1);
    });

    it('should handle validation failure', async () => {
      mockRepository.validateConfig.mockRejectedValue(new Error('Schema not found'));
      const service = createConnectorConfigService(mockRepository);
      await expect(service.validateConfig('cn-1', {})).rejects.toThrow('Schema not found');
    });
  });

  describe('testConfig', () => {
    it('should test a config', async () => {
      mockRepository.testConfig.mockResolvedValue({ success: true, latency: 150, message: 'Connection successful' });
      const service = createConnectorConfigService(mockRepository);
      const result = await service.testConfig('cc-1', 'user-1');
      expect(result.success).toBe(true);
      expect(result.latency).toBe(150);
    });

    it('should throw if configId is missing', async () => {
      const service = createConnectorConfigService(mockRepository);
      await expect(service.testConfig('', 'user-1')).rejects.toThrow('Config ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createConnectorConfigService(mockRepository);
      await expect(service.testConfig('cc-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle test failure', async () => {
      mockRepository.testConfig.mockResolvedValue({ success: false, error: 'Connection refused', latency: 5000 });
      const service = createConnectorConfigService(mockRepository);
      const result = await service.testConfig('cc-1', 'user-1');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Connection refused');
    });

    it('should return test details', async () => {
      mockRepository.testConfig.mockResolvedValue({ success: true, latency: 150, statusCode: 200, serverVersion: '2.1.0' });
      const service = createConnectorConfigService(mockRepository);
      const result = await service.testConfig('cc-1', 'user-1');
      expect(result.statusCode).toBe(200);
    });
  });
});
