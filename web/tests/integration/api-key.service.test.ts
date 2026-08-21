import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createApiKeyService } from '../../src/features/integration/services/api-key.service';

describe('ApiKeyService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getApiKeys: vi.fn(),
      getApiKeyById: vi.fn(),
      createApiKey: vi.fn(),
      updateApiKey: vi.fn(),
      deleteApiKey: vi.fn(),
      validateApiKey: vi.fn(),
      getApiKeyUsage: vi.fn(),
      rotateApiKey: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createApiKeyService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getApiKeys).toBeInstanceOf(Function);
    expect(service.getApiKeyById).toBeInstanceOf(Function);
    expect(service.createApiKey).toBeInstanceOf(Function);
    expect(service.updateApiKey).toBeInstanceOf(Function);
    expect(service.deleteApiKey).toBeInstanceOf(Function);
    expect(service.validateApiKey).toBeInstanceOf(Function);
    expect(service.getApiKeyUsage).toBeInstanceOf(Function);
    expect(service.rotateApiKey).toBeInstanceOf(Function);
  });

  describe('getApiKeys', () => {
    it('should return api keys list', async () => {
      mockRepository.getApiKeys.mockResolvedValue([{ id: 'ak-1', name: 'Production Key', status: 'active' }]);
      const service = createApiKeyService(mockRepository);
      const result = await service.getApiKeys('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return api keys with filters', async () => {
      mockRepository.getApiKeys.mockResolvedValue([{ id: 'ak-1' }]);
      const service = createApiKeyService(mockRepository);
      await service.getApiKeys('school-1', { status: 'active' });
      expect(mockRepository.getApiKeys).toHaveBeenCalledWith('school-1', { status: 'active' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createApiKeyService(mockRepository);
      await expect(service.getApiKeys('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getApiKeys.mockResolvedValue([]);
      const service = createApiKeyService(mockRepository);
      const result = await service.getApiKeys('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated api keys', async () => {
      mockRepository.getApiKeys.mockResolvedValue({ data: [{ id: 'ak-1' }], total: 10 });
      const service = createApiKeyService(mockRepository);
      const result = await service.getApiKeys('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by app', async () => {
      mockRepository.getApiKeys.mockResolvedValue([{ id: 'ak-1', appId: 'app-1' }]);
      const service = createApiKeyService(mockRepository);
      const result = await service.getApiKeys('school-1', { appId: 'app-1' });
      expect(result).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getApiKeys.mockRejectedValue(new Error('DB error'));
      const service = createApiKeyService(mockRepository);
      await expect(service.getApiKeys('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getApiKeyById', () => {
    it('should return a single api key', async () => {
      mockRepository.getApiKeyById.mockResolvedValue({ id: 'ak-1', name: 'Production Key', status: 'active' });
      const service = createApiKeyService(mockRepository);
      const result = await service.getApiKeyById('ak-1');
      expect(result.id).toBe('ak-1');
    });

    it('should throw if api key not found', async () => {
      mockRepository.getApiKeyById.mockResolvedValue(null);
      const service = createApiKeyService(mockRepository);
      await expect(service.getApiKeyById('nonexistent')).rejects.toThrow('API key not found');
    });

    it('should throw if id is missing', async () => {
      const service = createApiKeyService(mockRepository);
      await expect(service.getApiKeyById('')).rejects.toThrow('API key ID is required');
    });

    it('should return api key with permissions', async () => {
      mockRepository.getApiKeyById.mockResolvedValue({ id: 'ak-1', permissions: ['read:documents', 'write:documents'] });
      const service = createApiKeyService(mockRepository);
      const result = await service.getApiKeyById('ak-1');
      expect(result.permissions).toHaveLength(2);
    });

    it('should return api key with rate limits', async () => {
      mockRepository.getApiKeyById.mockResolvedValue({ id: 'ak-1', rateLimit: { requests: 1000, windowMs: 60000 } });
      const service = createApiKeyService(mockRepository);
      const result = await service.getApiKeyById('ak-1');
      expect(result.rateLimit.requests).toBe(1000);
    });

    it('should handle repository errors', async () => {
      mockRepository.getApiKeyById.mockRejectedValue(new Error('Query timeout'));
      const service = createApiKeyService(mockRepository);
      await expect(service.getApiKeyById('ak-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createApiKey', () => {
    it('should create an api key', async () => {
      mockRepository.createApiKey.mockResolvedValue({ id: 'ak-1', name: 'Production Key', key: 'sk-***', status: 'active' });
      const service = createApiKeyService(mockRepository);
      const result = await service.createApiKey('school-1', 'user-1', { name: 'Production Key', permissions: ['read:documents'] });
      expect(result.id).toBe('ak-1');
      expect(result.key).toBeDefined();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createApiKeyService(mockRepository);
      await expect(service.createApiKey('', 'user-1', { name: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createApiKeyService(mockRepository);
      await expect(service.createApiKey('school-1', '', { name: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if name is missing', async () => {
      const service = createApiKeyService(mockRepository);
      await expect(service.createApiKey('school-1', 'user-1', { name: '' })).rejects.toThrow('API key name is required');
    });

    it('should create api key with expiry', async () => {
      mockRepository.createApiKey.mockResolvedValue({ id: 'ak-1', expiresAt: '2025-01-01' });
      const service = createApiKeyService(mockRepository);
      const result = await service.createApiKey('school-1', 'user-1', { name: 'T', expiresInDays: 365 });
      expect(result.expiresAt).toBeDefined();
    });

    it('should handle creation failure', async () => {
      mockRepository.createApiKey.mockRejectedValue(new Error('Too many keys'));
      const service = createApiKeyService(mockRepository);
      await expect(service.createApiKey('school-1', 'user-1', { name: 'T' })).rejects.toThrow('Too many keys');
    });
  });

  describe('updateApiKey', () => {
    it('should update an api key', async () => {
      mockRepository.getApiKeyById.mockResolvedValue({ id: 'ak-1', name: 'Old' });
      mockRepository.updateApiKey.mockResolvedValue({ id: 'ak-1', name: 'Updated' });
      const service = createApiKeyService(mockRepository);
      const result = await service.updateApiKey('ak-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if api key not found', async () => {
      mockRepository.getApiKeyById.mockResolvedValue(null);
      const service = createApiKeyService(mockRepository);
      await expect(service.updateApiKey('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createApiKeyService(mockRepository);
      await expect(service.updateApiKey('', 'user-1', { name: 'New' })).rejects.toThrow('API key ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createApiKeyService(mockRepository);
      await expect(service.updateApiKey('ak-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update api key permissions', async () => {
      mockRepository.getApiKeyById.mockResolvedValue({ id: 'ak-1' });
      mockRepository.updateApiKey.mockResolvedValue({ id: 'ak-1', permissions: ['read:documents', 'write:documents'] });
      const service = createApiKeyService(mockRepository);
      const result = await service.updateApiKey('ak-1', 'user-1', { permissions: ['read:documents', 'write:documents'] });
      expect(result.permissions).toHaveLength(2);
    });

    it('should handle update failure', async () => {
      mockRepository.getApiKeyById.mockResolvedValue({ id: 'ak-1' });
      mockRepository.updateApiKey.mockRejectedValue(new Error('Cannot update'));
      const service = createApiKeyService(mockRepository);
      await expect(service.updateApiKey('ak-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deleteApiKey', () => {
    it('should delete an api key', async () => {
      mockRepository.getApiKeyById.mockResolvedValue({ id: 'ak-1' });
      mockRepository.deleteApiKey.mockResolvedValue({ success: true });
      const service = createApiKeyService(mockRepository);
      await service.deleteApiKey('ak-1', 'user-1');
      expect(mockRepository.deleteApiKey).toHaveBeenCalledWith('ak-1');
    });

    it('should throw if api key not found', async () => {
      mockRepository.getApiKeyById.mockResolvedValue(null);
      const service = createApiKeyService(mockRepository);
      await expect(service.deleteApiKey('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createApiKeyService(mockRepository);
      await expect(service.deleteApiKey('', 'user-1')).rejects.toThrow('API key ID is required');
    });

    it('should handle deletion failure', async () => {
      mockRepository.getApiKeyById.mockResolvedValue({ id: 'ak-1' });
      mockRepository.deleteApiKey.mockRejectedValue(new Error('Cannot delete'));
      const service = createApiKeyService(mockRepository);
      await expect(service.deleteApiKey('ak-1', 'user-1')).rejects.toThrow('Cannot delete');
    });
  });

  describe('validateApiKey', () => {
    it('should validate an api key', async () => {
      mockRepository.validateApiKey.mockResolvedValue({ valid: true, keyId: 'ak-1', permissions: ['read:documents'] });
      const service = createApiKeyService(mockRepository);
      const result = await service.validateApiKey('sk-***');
      expect(result.valid).toBe(true);
    });

    it('should throw if key is missing', async () => {
      const service = createApiKeyService(mockRepository);
      await expect(service.validateApiKey('')).rejects.toThrow('API key is required');
    });

    it('should return invalid for expired key', async () => {
      mockRepository.validateApiKey.mockResolvedValue({ valid: false, error: 'Key expired' });
      const service = createApiKeyService(mockRepository);
      const result = await service.validateApiKey('sk-***');
      expect(result.valid).toBe(false);
    });

    it('should return invalid for revoked key', async () => {
      mockRepository.validateApiKey.mockResolvedValue({ valid: false, error: 'Key revoked' });
      const service = createApiKeyService(mockRepository);
      const result = await service.validateApiKey('sk-***');
      expect(result.valid).toBe(false);
    });

    it('should handle validation error', async () => {
      mockRepository.validateApiKey.mockRejectedValue(new Error('Invalid key format'));
      const service = createApiKeyService(mockRepository);
      await expect(service.validateApiKey('invalid')).rejects.toThrow('Invalid key format');
    });
  });

  describe('getApiKeyUsage', () => {
    it('should return api key usage', async () => {
      mockRepository.getApiKeyUsage.mockResolvedValue({ keyId: 'ak-1', totalRequests: 1000, averagePerDay: 10 });
      const service = createApiKeyService(mockRepository);
      const result = await service.getApiKeyUsage('ak-1');
      expect(result.totalRequests).toBe(1000);
    });

    it('should return usage with filters', async () => {
      mockRepository.getApiKeyUsage.mockResolvedValue({ keyId: 'ak-1', requests: [] });
      const service = createApiKeyService(mockRepository);
      await service.getApiKeyUsage('ak-1', { since: '2024-01-01' });
      expect(mockRepository.getApiKeyUsage).toHaveBeenCalledWith('ak-1', { since: '2024-01-01' });
    });

    it('should throw if keyId is missing', async () => {
      const service = createApiKeyService(mockRepository);
      await expect(service.getApiKeyUsage('')).rejects.toThrow('API key ID is required');
    });

    it('should return zero usage', async () => {
      mockRepository.getApiKeyUsage.mockResolvedValue({ keyId: 'ak-1', totalRequests: 0 });
      const service = createApiKeyService(mockRepository);
      const result = await service.getApiKeyUsage('ak-1');
      expect(result.totalRequests).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getApiKeyUsage.mockRejectedValue(new Error('DB error'));
      const service = createApiKeyService(mockRepository);
      await expect(service.getApiKeyUsage('ak-1')).rejects.toThrow('DB error');
    });
  });

  describe('rotateApiKey', () => {
    it('should rotate an api key', async () => {
      mockRepository.rotateApiKey.mockResolvedValue({ oldKey: { id: 'ak-1', status: 'revoked' }, newKey: { id: 'ak-2', key: 'sk-new-***', status: 'active' } });
      const service = createApiKeyService(mockRepository);
      const result = await service.rotateApiKey('ak-1', 'user-1');
      expect(result.oldKey.status).toBe('revoked');
      expect(result.newKey.key).toBeDefined();
    });

    it('should throw if keyId is missing', async () => {
      const service = createApiKeyService(mockRepository);
      await expect(service.rotateApiKey('', 'user-1')).rejects.toThrow('API key ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createApiKeyService(mockRepository);
      await expect(service.rotateApiKey('ak-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle rotation failure', async () => {
      mockRepository.rotateApiKey.mockRejectedValue(new Error('Key not found'));
      const service = createApiKeyService(mockRepository);
      await expect(service.rotateApiKey('nonexistent', 'user-1')).rejects.toThrow('Key not found');
    });

    it('should return rotation details', async () => {
      mockRepository.rotateApiKey.mockResolvedValue({ oldKey: { id: 'ak-1', revokedAt: '2024-01-01' }, newKey: { id: 'ak-2', key: 'sk-new-***', expiresAt: '2025-01-01' } });
      const service = createApiKeyService(mockRepository);
      const result = await service.rotateApiKey('ak-1', 'user-1');
      expect(result.oldKey.revokedAt).toBeDefined();
      expect(result.newKey.expiresAt).toBeDefined();
    });
  });
});
