import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createDeveloperAppService } from '../../src/features/integration/services/developer-app.service';

describe('DeveloperAppService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getDeveloperApps: vi.fn(),
      getDeveloperAppById: vi.fn(),
      createDeveloperApp: vi.fn(),
      updateDeveloperApp: vi.fn(),
      deleteDeveloperApp: vi.fn(),
      generateApiKey: vi.fn(),
      revokeApiKey: vi.fn(),
      getAppUsage: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createDeveloperAppService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getDeveloperApps).toBeInstanceOf(Function);
    expect(service.getDeveloperAppById).toBeInstanceOf(Function);
    expect(service.createDeveloperApp).toBeInstanceOf(Function);
    expect(service.updateDeveloperApp).toBeInstanceOf(Function);
    expect(service.deleteDeveloperApp).toBeInstanceOf(Function);
    expect(service.generateApiKey).toBeInstanceOf(Function);
    expect(service.revokeApiKey).toBeInstanceOf(Function);
    expect(service.getAppUsage).toBeInstanceOf(Function);
  });

  describe('getDeveloperApps', () => {
    it('should return apps list', async () => {
      mockRepository.getDeveloperApps.mockResolvedValue([{ id: 'da-1', name: 'My App', status: 'active' }]);
      const service = createDeveloperAppService(mockRepository);
      const result = await service.getDeveloperApps('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return apps with filters', async () => {
      mockRepository.getDeveloperApps.mockResolvedValue([{ id: 'da-1' }]);
      const service = createDeveloperAppService(mockRepository);
      await service.getDeveloperApps('school-1', { status: 'active' });
      expect(mockRepository.getDeveloperApps).toHaveBeenCalledWith('school-1', { status: 'active' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createDeveloperAppService(mockRepository);
      await expect(service.getDeveloperApps('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getDeveloperApps.mockResolvedValue([]);
      const service = createDeveloperAppService(mockRepository);
      const result = await service.getDeveloperApps('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated apps', async () => {
      mockRepository.getDeveloperApps.mockResolvedValue({ data: [{ id: 'da-1' }], total: 10 });
      const service = createDeveloperAppService(mockRepository);
      const result = await service.getDeveloperApps('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by owner', async () => {
      mockRepository.getDeveloperApps.mockResolvedValue([{ id: 'da-1', ownerId: 'user-1' }]);
      const service = createDeveloperAppService(mockRepository);
      const result = await service.getDeveloperApps('school-1', { ownerId: 'user-1' });
      expect(result).toHaveLength(1);
    });

    it('should return apps with API key count', async () => {
      mockRepository.getDeveloperApps.mockResolvedValue([{ id: 'da-1', apiKeyCount: 3 }]);
      const service = createDeveloperAppService(mockRepository);
      const result = await service.getDeveloperApps('school-1');
      expect(result[0].apiKeyCount).toBe(3);
    });

    it('should handle repository errors', async () => {
      mockRepository.getDeveloperApps.mockRejectedValue(new Error('DB error'));
      const service = createDeveloperAppService(mockRepository);
      await expect(service.getDeveloperApps('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getDeveloperAppById', () => {
    it('should return a single app', async () => {
      mockRepository.getDeveloperAppById.mockResolvedValue({ id: 'da-1', name: 'My App', status: 'active' });
      const service = createDeveloperAppService(mockRepository);
      const result = await service.getDeveloperAppById('da-1');
      expect(result.id).toBe('da-1');
    });

    it('should throw if app not found', async () => {
      mockRepository.getDeveloperAppById.mockResolvedValue(null);
      const service = createDeveloperAppService(mockRepository);
      await expect(service.getDeveloperAppById('nonexistent')).rejects.toThrow('Developer app not found');
    });

    it('should throw if id is missing', async () => {
      const service = createDeveloperAppService(mockRepository);
      await expect(service.getDeveloperAppById('')).rejects.toThrow('App ID is required');
    });

    it('should return app with config', async () => {
      mockRepository.getDeveloperAppById.mockResolvedValue({ id: 'da-1', config: { redirectUris: ['https://example.com/callback'] } });
      const service = createDeveloperAppService(mockRepository);
      const result = await service.getDeveloperAppById('da-1');
      expect(result.config.redirectUris).toHaveLength(1);
    });

    it('should return app with permissions', async () => {
      mockRepository.getDeveloperAppById.mockResolvedValue({ id: 'da-1', permissions: ['read:documents', 'write:documents'] });
      const service = createDeveloperAppService(mockRepository);
      const result = await service.getDeveloperAppById('da-1');
      expect(result.permissions).toHaveLength(2);
    });

    it('should handle repository errors', async () => {
      mockRepository.getDeveloperAppById.mockRejectedValue(new Error('Query timeout'));
      const service = createDeveloperAppService(mockRepository);
      await expect(service.getDeveloperAppById('da-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createDeveloperApp', () => {
    it('should create an app', async () => {
      mockRepository.createDeveloperApp.mockResolvedValue({ id: 'da-1', name: 'My App', status: 'active' });
      const service = createDeveloperAppService(mockRepository);
      const result = await service.createDeveloperApp('school-1', 'user-1', { name: 'My App', description: 'Test app', redirectUris: ['https://example.com'] });
      expect(result.id).toBe('da-1');
      expect(mockRepository.createDeveloperApp).toHaveBeenCalled();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createDeveloperAppService(mockRepository);
      await expect(service.createDeveloperApp('', 'user-1', { name: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createDeveloperAppService(mockRepository);
      await expect(service.createDeveloperApp('school-1', '', { name: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if name is missing', async () => {
      const service = createDeveloperAppService(mockRepository);
      await expect(service.createDeveloperApp('school-1', 'user-1', { name: '' })).rejects.toThrow('App name is required');
    });

    it('should create app with description', async () => {
      mockRepository.createDeveloperApp.mockResolvedValue({ id: 'da-1', description: 'Test app' });
      const service = createDeveloperAppService(mockRepository);
      const result = await service.createDeveloperApp('school-1', 'user-1', { name: 'T', description: 'Test app' });
      expect(result.description).toBe('Test app');
    });

    it('should create app with permissions', async () => {
      mockRepository.createDeveloperApp.mockResolvedValue({ id: 'da-1', permissions: ['read:documents'] });
      const service = createDeveloperAppService(mockRepository);
      const result = await service.createDeveloperApp('school-1', 'user-1', { name: 'T', permissions: ['read:documents'] });
      expect(result.permissions).toHaveLength(1);
    });

    it('should handle creation failure', async () => {
      mockRepository.createDeveloperApp.mockRejectedValue(new Error('Invalid app'));
      const service = createDeveloperAppService(mockRepository);
      await expect(service.createDeveloperApp('school-1', 'user-1', { name: 'T' })).rejects.toThrow('Invalid app');
    });
  });

  describe('updateDeveloperApp', () => {
    it('should update an app', async () => {
      mockRepository.getDeveloperAppById.mockResolvedValue({ id: 'da-1', name: 'Old' });
      mockRepository.updateDeveloperApp.mockResolvedValue({ id: 'da-1', name: 'Updated' });
      const service = createDeveloperAppService(mockRepository);
      const result = await service.updateDeveloperApp('da-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if app not found', async () => {
      mockRepository.getDeveloperAppById.mockResolvedValue(null);
      const service = createDeveloperAppService(mockRepository);
      await expect(service.updateDeveloperApp('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createDeveloperAppService(mockRepository);
      await expect(service.updateDeveloperApp('', 'user-1', { name: 'New' })).rejects.toThrow('App ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createDeveloperAppService(mockRepository);
      await expect(service.updateDeveloperApp('da-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update app config', async () => {
      mockRepository.getDeveloperAppById.mockResolvedValue({ id: 'da-1' });
      mockRepository.updateDeveloperApp.mockResolvedValue({ id: 'da-1', config: { redirectUris: ['https://new.com'] } });
      const service = createDeveloperAppService(mockRepository);
      const result = await service.updateDeveloperApp('da-1', 'user-1', { config: { redirectUris: ['https://new.com'] } });
      expect(result.config.redirectUris).toHaveLength(1);
    });

    it('should handle update failure', async () => {
      mockRepository.getDeveloperAppById.mockResolvedValue({ id: 'da-1' });
      mockRepository.updateDeveloperApp.mockRejectedValue(new Error('Cannot update'));
      const service = createDeveloperAppService(mockRepository);
      await expect(service.updateDeveloperApp('da-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deleteDeveloperApp', () => {
    it('should delete an app', async () => {
      mockRepository.getDeveloperAppById.mockResolvedValue({ id: 'da-1' });
      mockRepository.deleteDeveloperApp.mockResolvedValue({ success: true });
      const service = createDeveloperAppService(mockRepository);
      await service.deleteDeveloperApp('da-1', 'user-1');
      expect(mockRepository.deleteDeveloperApp).toHaveBeenCalledWith('da-1');
    });

    it('should throw if app not found', async () => {
      mockRepository.getDeveloperAppById.mockResolvedValue(null);
      const service = createDeveloperAppService(mockRepository);
      await expect(service.deleteDeveloperApp('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createDeveloperAppService(mockRepository);
      await expect(service.deleteDeveloperApp('', 'user-1')).rejects.toThrow('App ID is required');
    });

    it('should handle deletion with active API keys', async () => {
      mockRepository.getDeveloperAppById.mockResolvedValue({ id: 'da-1' });
      mockRepository.deleteDeveloperApp.mockRejectedValue(new Error('App has active API keys'));
      const service = createDeveloperAppService(mockRepository);
      await expect(service.deleteDeveloperApp('da-1', 'user-1')).rejects.toThrow('App has active API keys');
    });

    it('should force delete app', async () => {
      mockRepository.getDeveloperAppById.mockResolvedValue({ id: 'da-1' });
      mockRepository.deleteDeveloperApp.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createDeveloperAppService(mockRepository);
      const result = await service.deleteDeveloperApp('da-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('generateApiKey', () => {
    it('should generate an API key', async () => {
      mockRepository.generateApiKey.mockResolvedValue({ appId: 'da-1', apiKey: 'ak-***', createdAt: '2024-01-01', expiresAt: '2025-01-01' });
      const service = createDeveloperAppService(mockRepository);
      const result = await service.generateApiKey('da-1', 'user-1', { name: 'Production Key' });
      expect(result.apiKey).toBeDefined();
      expect(result.expiresAt).toBeDefined();
    });

    it('should throw if appId is missing', async () => {
      const service = createDeveloperAppService(mockRepository);
      await expect(service.generateApiKey('', 'user-1', {})).rejects.toThrow('App ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createDeveloperAppService(mockRepository);
      await expect(service.generateApiKey('da-1', '', {})).rejects.toThrow('userId is required');
    });

    it('should generate key with name', async () => {
      mockRepository.generateApiKey.mockResolvedValue({ apiKey: 'ak-***', name: 'Test Key' });
      const service = createDeveloperAppService(mockRepository);
      const result = await service.generateApiKey('da-1', 'user-1', { name: 'Test Key' });
      expect(result.name).toBe('Test Key');
    });

    it('should generate key with expiry', async () => {
      mockRepository.generateApiKey.mockResolvedValue({ apiKey: 'ak-***', expiresAt: '2025-01-01' });
      const service = createDeveloperAppService(mockRepository);
      const result = await service.generateApiKey('da-1', 'user-1', { expiresInDays: 365 });
      expect(result.expiresAt).toBeDefined();
    });

    it('should handle generation failure', async () => {
      mockRepository.generateApiKey.mockRejectedValue(new Error('Too many keys'));
      const service = createDeveloperAppService(mockRepository);
      await expect(service.generateApiKey('da-1', 'user-1', {})).rejects.toThrow('Too many keys');
    });
  });

  describe('revokeApiKey', () => {
    it('should revoke an API key', async () => {
      mockRepository.revokeApiKey.mockResolvedValue({ success: true, revokedAt: '2024-01-01' });
      const service = createDeveloperAppService(mockRepository);
      const result = await service.revokeApiKey('da-1', 'ak-***', 'user-1');
      expect(result.success).toBe(true);
    });

    it('should throw if appId is missing', async () => {
      const service = createDeveloperAppService(mockRepository);
      await expect(service.revokeApiKey('', 'key', 'user-1')).rejects.toThrow('App ID is required');
    });

    it('should throw if apiKey is missing', async () => {
      const service = createDeveloperAppService(mockRepository);
      await expect(service.revokeApiKey('da-1', '', 'user-1')).rejects.toThrow('API key is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createDeveloperAppService(mockRepository);
      await expect(service.revokeApiKey('da-1', 'key', '')).rejects.toThrow('userId is required');
    });

    it('should handle revocation failure', async () => {
      mockRepository.revokeApiKey.mockRejectedValue(new Error('Key already revoked'));
      const service = createDeveloperAppService(mockRepository);
      await expect(service.revokeApiKey('da-1', 'key', 'user-1')).rejects.toThrow('Key already revoked');
    });
  });

  describe('getAppUsage', () => {
    it('should return app usage stats', async () => {
      mockRepository.getAppUsage.mockResolvedValue({ appId: 'da-1', totalRequests: 1000, averagePerDay: 10 });
      const service = createDeveloperAppService(mockRepository);
      const result = await service.getAppUsage('da-1');
      expect(result.totalRequests).toBe(1000);
    });

    it('should return usage with filters', async () => {
      mockRepository.getAppUsage.mockResolvedValue({ appId: 'da-1', requests: [] });
      const service = createDeveloperAppService(mockRepository);
      await service.getAppUsage('da-1', { since: '2024-01-01' });
      expect(mockRepository.getAppUsage).toHaveBeenCalledWith('da-1', { since: '2024-01-01' });
    });

    it('should throw if appId is missing', async () => {
      const service = createDeveloperAppService(mockRepository);
      await expect(service.getAppUsage('')).rejects.toThrow('App ID is required');
    });

    it('should return zero usage', async () => {
      mockRepository.getAppUsage.mockResolvedValue({ appId: 'da-1', totalRequests: 0 });
      const service = createDeveloperAppService(mockRepository);
      const result = await service.getAppUsage('da-1');
      expect(result.totalRequests).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getAppUsage.mockRejectedValue(new Error('DB error'));
      const service = createDeveloperAppService(mockRepository);
      await expect(service.getAppUsage('da-1')).rejects.toThrow('DB error');
    });
  });
});
