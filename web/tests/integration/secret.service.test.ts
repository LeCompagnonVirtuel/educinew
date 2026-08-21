import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createSecretService } from '../../src/features/integration/services/secret.service';

describe('SecretService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getSecrets: vi.fn(),
      getSecretById: vi.fn(),
      createSecret: vi.fn(),
      updateSecret: vi.fn(),
      deleteSecret: vi.fn(),
      getSecretValue: vi.fn(),
      rotateSecret: vi.fn(),
      getSecretAuditLog: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createSecretService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getSecrets).toBeInstanceOf(Function);
    expect(service.getSecretById).toBeInstanceOf(Function);
    expect(service.createSecret).toBeInstanceOf(Function);
    expect(service.updateSecret).toBeInstanceOf(Function);
    expect(service.deleteSecret).toBeInstanceOf(Function);
    expect(service.getSecretValue).toBeInstanceOf(Function);
    expect(service.rotateSecret).toBeInstanceOf(Function);
    expect(service.getSecretAuditLog).toBeInstanceOf(Function);
  });

  describe('getSecrets', () => {
    it('should return secrets list', async () => {
      mockRepository.getSecrets.mockResolvedValue([{ id: 'sc-1', name: 'API Key', type: 'api_key' }]);
      const service = createSecretService(mockRepository);
      const result = await service.getSecrets('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return secrets with filters', async () => {
      mockRepository.getSecrets.mockResolvedValue([{ id: 'sc-1' }]);
      const service = createSecretService(mockRepository);
      await service.getSecrets('school-1', { type: 'api_key' });
      expect(mockRepository.getSecrets).toHaveBeenCalledWith('school-1', { type: 'api_key' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createSecretService(mockRepository);
      await expect(service.getSecrets('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getSecrets.mockResolvedValue([]);
      const service = createSecretService(mockRepository);
      const result = await service.getSecrets('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated secrets', async () => {
      mockRepository.getSecrets.mockResolvedValue({ data: [{ id: 'sc-1' }], total: 10 });
      const service = createSecretService(mockRepository);
      const result = await service.getSecrets('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should return secrets without sensitive values', async () => {
      mockRepository.getSecrets.mockResolvedValue([{ id: 'sc-1', name: 'API Key', hasValue: true }]);
      const service = createSecretService(mockRepository);
      const result = await service.getSecrets('school-1');
      expect(result[0].hasValue).toBe(true);
    });

    it('should handle repository errors', async () => {
      mockRepository.getSecrets.mockRejectedValue(new Error('DB error'));
      const service = createSecretService(mockRepository);
      await expect(service.getSecrets('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getSecretById', () => {
    it('should return a single secret', async () => {
      mockRepository.getSecretById.mockResolvedValue({ id: 'sc-1', name: 'API Key', type: 'api_key' });
      const service = createSecretService(mockRepository);
      const result = await service.getSecretById('sc-1');
      expect(result.id).toBe('sc-1');
    });

    it('should throw if secret not found', async () => {
      mockRepository.getSecretById.mockResolvedValue(null);
      const service = createSecretService(mockRepository);
      await expect(service.getSecretById('nonexistent')).rejects.toThrow('Secret not found');
    });

    it('should throw if id is missing', async () => {
      const service = createSecretService(mockRepository);
      await expect(service.getSecretById('')).rejects.toThrow('Secret ID is required');
    });

    it('should return secret with metadata', async () => {
      mockRepository.getSecretById.mockResolvedValue({ id: 'sc-1', metadata: { createdBy: 'user-1', createdAt: '2024-01-01' } });
      const service = createSecretService(mockRepository);
      const result = await service.getSecretById('sc-1');
      expect(result.metadata.createdBy).toBe('user-1');
    });

    it('should return secret with rotation info', async () => {
      mockRepository.getSecretById.mockResolvedValue({ id: 'sc-1', lastRotatedAt: '2024-01-01', nextRotationAt: '2024-02-01' });
      const service = createSecretService(mockRepository);
      const result = await service.getSecretById('sc-1');
      expect(result.lastRotatedAt).toBeDefined();
    });

    it('should handle repository errors', async () => {
      mockRepository.getSecretById.mockRejectedValue(new Error('Query timeout'));
      const service = createSecretService(mockRepository);
      await expect(service.getSecretById('sc-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createSecret', () => {
    it('should create a secret', async () => {
      mockRepository.createSecret.mockResolvedValue({ id: 'sc-1', name: 'API Key', type: 'api_key' });
      const service = createSecretService(mockRepository);
      const result = await service.createSecret('school-1', 'user-1', { name: 'API Key', type: 'api_key', value: '***' });
      expect(result.id).toBe('sc-1');
      expect(mockRepository.createSecret).toHaveBeenCalled();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createSecretService(mockRepository);
      await expect(service.createSecret('', 'user-1', { name: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createSecretService(mockRepository);
      await expect(service.createSecret('school-1', '', { name: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if name is missing', async () => {
      const service = createSecretService(mockRepository);
      await expect(service.createSecret('school-1', 'user-1', { name: '' })).rejects.toThrow('Secret name is required');
    });

    it('should throw if value is missing', async () => {
      const service = createSecretService(mockRepository);
      await expect(service.createSecret('school-1', 'user-1', { name: 'T', value: '' })).rejects.toThrow('Secret value is required');
    });

    it('should create secret with description', async () => {
      mockRepository.createSecret.mockResolvedValue({ id: 'sc-1', description: 'API key for Google Drive' });
      const service = createSecretService(mockRepository);
      const result = await service.createSecret('school-1', 'user-1', { name: 'T', value: '***', description: 'API key for Google Drive' });
      expect(result.description).toBe('API key for Google Drive');
    });

    it('should handle creation failure', async () => {
      mockRepository.createSecret.mockRejectedValue(new Error('Invalid secret'));
      const service = createSecretService(mockRepository);
      await expect(service.createSecret('school-1', 'user-1', { name: 'T', value: '***' })).rejects.toThrow('Invalid secret');
    });
  });

  describe('updateSecret', () => {
    it('should update a secret', async () => {
      mockRepository.getSecretById.mockResolvedValue({ id: 'sc-1', name: 'Old' });
      mockRepository.updateSecret.mockResolvedValue({ id: 'sc-1', name: 'Updated' });
      const service = createSecretService(mockRepository);
      const result = await service.updateSecret('sc-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if secret not found', async () => {
      mockRepository.getSecretById.mockResolvedValue(null);
      const service = createSecretService(mockRepository);
      await expect(service.updateSecret('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createSecretService(mockRepository);
      await expect(service.updateSecret('', 'user-1', { name: 'New' })).rejects.toThrow('Secret ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createSecretService(mockRepository);
      await expect(service.updateSecret('sc-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update secret value', async () => {
      mockRepository.getSecretById.mockResolvedValue({ id: 'sc-1' });
      mockRepository.updateSecret.mockResolvedValue({ id: 'sc-1', value: 'new-value' });
      const service = createSecretService(mockRepository);
      const result = await service.updateSecret('sc-1', 'user-1', { value: 'new-value' });
      expect(result.value).toBe('new-value');
    });

    it('should handle update failure', async () => {
      mockRepository.getSecretById.mockResolvedValue({ id: 'sc-1' });
      mockRepository.updateSecret.mockRejectedValue(new Error('Cannot update'));
      const service = createSecretService(mockRepository);
      await expect(service.updateSecret('sc-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deleteSecret', () => {
    it('should delete a secret', async () => {
      mockRepository.getSecretById.mockResolvedValue({ id: 'sc-1' });
      mockRepository.deleteSecret.mockResolvedValue({ success: true });
      const service = createSecretService(mockRepository);
      await service.deleteSecret('sc-1', 'user-1');
      expect(mockRepository.deleteSecret).toHaveBeenCalledWith('sc-1');
    });

    it('should throw if secret not found', async () => {
      mockRepository.getSecretById.mockResolvedValue(null);
      const service = createSecretService(mockRepository);
      await expect(service.deleteSecret('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createSecretService(mockRepository);
      await expect(service.deleteSecret('', 'user-1')).rejects.toThrow('Secret ID is required');
    });

    it('should handle deletion with active usage', async () => {
      mockRepository.getSecretById.mockResolvedValue({ id: 'sc-1' });
      mockRepository.deleteSecret.mockRejectedValue(new Error('Secret is in use'));
      const service = createSecretService(mockRepository);
      await expect(service.deleteSecret('sc-1', 'user-1')).rejects.toThrow('Secret is in use');
    });

    it('should force delete secret', async () => {
      mockRepository.getSecretById.mockResolvedValue({ id: 'sc-1' });
      mockRepository.deleteSecret.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createSecretService(mockRepository);
      const result = await service.deleteSecret('sc-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('getSecretValue', () => {
    it('should return secret value', async () => {
      mockRepository.getSecretValue.mockResolvedValue({ secretId: 'sc-1', value: 'decoded-value', accessedAt: '2024-01-01' });
      const service = createSecretService(mockRepository);
      const result = await service.getSecretValue('sc-1', 'user-1');
      expect(result.value).toBe('decoded-value');
    });

    it('should throw if secretId is missing', async () => {
      const service = createSecretService(mockRepository);
      await expect(service.getSecretValue('', 'user-1')).rejects.toThrow('Secret ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createSecretService(mockRepository);
      await expect(service.getSecretValue('sc-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle access denied', async () => {
      mockRepository.getSecretValue.mockRejectedValue(new Error('Access denied'));
      const service = createSecretService(mockRepository);
      await expect(service.getSecretValue('sc-1', 'user-1')).rejects.toThrow('Access denied');
    });

    it('should return decoded value', async () => {
      mockRepository.getSecretValue.mockResolvedValue({ secretId: 'sc-1', value: 'actual-secret-value', encoding: 'base64' });
      const service = createSecretService(mockRepository);
      const result = await service.getSecretValue('sc-1', 'user-1');
      expect(result.encoding).toBe('base64');
    });
  });

  describe('rotateSecret', () => {
    it('should rotate a secret', async () => {
      mockRepository.rotateSecret.mockResolvedValue({ secretId: 'sc-1', newValue: 'new-value', rotatedAt: '2024-01-01' });
      const service = createSecretService(mockRepository);
      const result = await service.rotateSecret('sc-1', 'user-1');
      expect(result.newValue).toBe('new-value');
      expect(result.rotatedAt).toBeDefined();
    });

    it('should throw if secretId is missing', async () => {
      const service = createSecretService(mockRepository);
      await expect(service.rotateSecret('', 'user-1')).rejects.toThrow('Secret ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createSecretService(mockRepository);
      await expect(service.rotateSecret('sc-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle rotation failure', async () => {
      mockRepository.rotateSecret.mockRejectedValue(new Error('Cannot rotate'));
      const service = createSecretService(mockRepository);
      await expect(service.rotateSecret('sc-1', 'user-1')).rejects.toThrow('Cannot rotate');
    });

    it('should return rotation details', async () => {
      mockRepository.rotateSecret.mockResolvedValue({ secretId: 'sc-1', newValue: 'new', previousValue: 'old', rotatedAt: '2024-01-01' });
      const service = createSecretService(mockRepository);
      const result = await service.rotateSecret('sc-1', 'user-1');
      expect(result.previousValue).toBe('old');
    });
  });

  describe('getSecretAuditLog', () => {
    it('should return secret audit log', async () => {
      mockRepository.getSecretAuditLog.mockResolvedValue([{ action: 'created', userId: 'user-1', timestamp: '2024-01-01' }]);
      const service = createSecretService(mockRepository);
      const result = await service.getSecretAuditLog('sc-1');
      expect(result).toHaveLength(1);
    });

    it('should return audit log with filters', async () => {
      mockRepository.getSecretAuditLog.mockResolvedValue([{ action: 'accessed' }]);
      const service = createSecretService(mockRepository);
      await service.getSecretAuditLog('sc-1', { action: 'accessed' });
      expect(mockRepository.getSecretAuditLog).toHaveBeenCalledWith('sc-1', { action: 'accessed' });
    });

    it('should throw if secretId is missing', async () => {
      const service = createSecretService(mockRepository);
      await expect(service.getSecretAuditLog('')).rejects.toThrow('Secret ID is required');
    });

    it('should return paginated audit log', async () => {
      mockRepository.getSecretAuditLog.mockResolvedValue({ data: [{ action: 'created' }], total: 20 });
      const service = createSecretService(mockRepository);
      const result = await service.getSecretAuditLog('sc-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should return empty audit log', async () => {
      mockRepository.getSecretAuditLog.mockResolvedValue([]);
      const service = createSecretService(mockRepository);
      const result = await service.getSecretAuditLog('sc-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getSecretAuditLog.mockRejectedValue(new Error('DB error'));
      const service = createSecretService(mockRepository);
      await expect(service.getSecretAuditLog('sc-1')).rejects.toThrow('DB error');
    });
  });
});
