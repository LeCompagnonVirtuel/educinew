import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPermissionService } from '../../src/features/documents/services/permission.service';

const mockRepository = {
  getDocumentPermissions: vi.fn(),
  grantPermission: vi.fn(),
  revokePermission: vi.fn(),
  updatePermission: vi.fn(),
  checkPermission: vi.fn(),
  getDocument: vi.fn(),
};

describe('PermissionService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create PermissionService with all methods', () => {
    const service = createPermissionService(mockRepository as any);
    expect(typeof service.getDocumentPermissions).toBe('function');
    expect(typeof service.grantPermission).toBe('function');
    expect(typeof service.revokePermission).toBe('function');
    expect(typeof service.updatePermission).toBe('function');
    expect(typeof service.checkPermission).toBe('function');
  });

  it('should fetch document permissions', async () => {
    const service = createPermissionService(mockRepository as any);
    mockRepository.getDocumentPermissions.mockResolvedValue([{ userId: 'u1', level: 'read' }]);
    const result = await service.getDocumentPermissions('doc1', 'user1');
    expect(result).toEqual([{ userId: 'u1', level: 'read' }]);
  });

  it('should throw if documentId missing for getDocumentPermissions', async () => {
    const service = createPermissionService(mockRepository as any);
    await expect(service.getDocumentPermissions('', 'user1')).rejects.toThrow('documentId is required');
  });

  it('should throw if userId missing for getDocumentPermissions', async () => {
    const service = createPermissionService(mockRepository as any);
    await expect(service.getDocumentPermissions('doc1', '')).rejects.toThrow('userId is required');
  });

  it('should grant a permission', async () => {
    const service = createPermissionService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue({ id: 'doc1' });
    mockRepository.grantPermission.mockResolvedValue({ documentId: 'doc1', userId: 'u2', level: 'write' });
    const result = await service.grantPermission('doc1', 'user1', 'u2', 'write');
    expect(result).toEqual({ documentId: 'doc1', userId: 'u2', level: 'write' });
  });

  it('should throw if documentId missing for grantPermission', async () => {
    const service = createPermissionService(mockRepository as any);
    await expect(service.grantPermission('', 'user1', 'u2', 'write')).rejects.toThrow('documentId is required');
  });

  it('should throw if userId missing for grantPermission', async () => {
    const service = createPermissionService(mockRepository as any);
    await expect(service.grantPermission('doc1', '', 'u2', 'write')).rejects.toThrow('userId is required');
  });

  it('should throw if grantToUserId missing for grantPermission', async () => {
    const service = createPermissionService(mockRepository as any);
    await expect(service.grantPermission('doc1', 'user1', '', 'write')).rejects.toThrow('grantToUserId is required');
  });

  it('should throw if permissionLevel missing for grantPermission', async () => {
    const service = createPermissionService(mockRepository as any);
    await expect(service.grantPermission('doc1', 'user1', 'u2', '')).rejects.toThrow('permissionLevel is required');
  });

  it('should throw if document not found for grantPermission', async () => {
    const service = createPermissionService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue(null);
    await expect(service.grantPermission('doc1', 'user1', 'u2', 'write')).rejects.toThrow();
  });

  it('should revoke a permission', async () => {
    const service = createPermissionService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue({ id: 'doc1' });
    mockRepository.revokePermission.mockResolvedValue(undefined);
    await service.revokePermission('doc1', 'user1', 'u2');
    expect(mockRepository.revokePermission).toHaveBeenCalledWith('doc1', 'u2');
  });

  it('should throw if documentId missing for revokePermission', async () => {
    const service = createPermissionService(mockRepository as any);
    await expect(service.revokePermission('', 'user1', 'u2')).rejects.toThrow('documentId is required');
  });

  it('should throw if userId missing for revokePermission', async () => {
    const service = createPermissionService(mockRepository as any);
    await expect(service.revokePermission('doc1', '', 'u2')).rejects.toThrow('userId is required');
  });

  it('should throw if revokeUserId missing for revokePermission', async () => {
    const service = createPermissionService(mockRepository as any);
    await expect(service.revokePermission('doc1', 'user1', '')).rejects.toThrow('revokeUserId is required');
  });

  it('should throw if document not found for revokePermission', async () => {
    const service = createPermissionService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue(null);
    await expect(service.revokePermission('doc1', 'user1', 'u2')).rejects.toThrow();
  });

  it('should update a permission', async () => {
    const service = createPermissionService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue({ id: 'doc1' });
    mockRepository.updatePermission.mockResolvedValue(undefined);
    await service.updatePermission('doc1', 'user1', 'u2', 'admin');
    expect(mockRepository.updatePermission).toHaveBeenCalledWith('doc1', 'u2', 'admin');
  });

  it('should throw if documentId missing for updatePermission', async () => {
    const service = createPermissionService(mockRepository as any);
    await expect(service.updatePermission('', 'user1', 'u2', 'admin')).rejects.toThrow('documentId is required');
  });

  it('should throw if userId missing for updatePermission', async () => {
    const service = createPermissionService(mockRepository as any);
    await expect(service.updatePermission('doc1', '', 'u2', 'admin')).rejects.toThrow('userId is required');
  });

  it('should throw if targetUserId missing for updatePermission', async () => {
    const service = createPermissionService(mockRepository as any);
    await expect(service.updatePermission('doc1', 'user1', '', 'admin')).rejects.toThrow('targetUserId is required');
  });

  it('should throw if permissionLevel missing for updatePermission', async () => {
    const service = createPermissionService(mockRepository as any);
    await expect(service.updatePermission('doc1', 'user1', 'u2', '')).rejects.toThrow('permissionLevel is required');
  });

  it('should throw if document not found for updatePermission', async () => {
    const service = createPermissionService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue(null);
    await expect(service.updatePermission('doc1', 'user1', 'u2', 'admin')).rejects.toThrow();
  });

  it('should check a permission', async () => {
    const service = createPermissionService(mockRepository as any);
    mockRepository.checkPermission.mockResolvedValue(true);
    const result = await service.checkPermission('doc1', 'user1', 'read');
    expect(result).toEqual({ hasPermission: true, currentLevel: 'read' });
  });

  it('should check a permission and return false', async () => {
    const service = createPermissionService(mockRepository as any);
    mockRepository.checkPermission.mockResolvedValue(false);
    const result = await service.checkPermission('doc1', 'user1', 'admin');
    expect(result).toEqual({ hasPermission: false, currentLevel: 'none' });
  });

  it('should throw if documentId missing for checkPermission', async () => {
    const service = createPermissionService(mockRepository as any);
    await expect(service.checkPermission('', 'user1', 'read')).rejects.toThrow('documentId is required');
  });

  it('should throw if userId missing for checkPermission', async () => {
    const service = createPermissionService(mockRepository as any);
    await expect(service.checkPermission('doc1', '', 'read')).rejects.toThrow('userId is required');
  });

  it('should throw if requiredLevel missing for checkPermission', async () => {
    const service = createPermissionService(mockRepository as any);
    await expect(service.checkPermission('doc1', 'user1', '')).rejects.toThrow('requiredLevel is required');
  });

  it('should handle repository errors for getDocumentPermissions', async () => {
    const service = createPermissionService(mockRepository as any);
    mockRepository.getDocumentPermissions.mockRejectedValue(new Error('DB error'));
    await expect(service.getDocumentPermissions('doc1', 'user1')).rejects.toThrow('DB error');
  });

  it('should handle repository errors for grantPermission', async () => {
    const service = createPermissionService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue({ id: 'doc1' });
    mockRepository.grantPermission.mockRejectedValue(new Error('Grant failed'));
    await expect(service.grantPermission('doc1', 'user1', 'u2', 'write')).rejects.toThrow('Grant failed');
  });

  it('should handle repository errors for revokePermission', async () => {
    const service = createPermissionService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue({ id: 'doc1' });
    mockRepository.revokePermission.mockRejectedValue(new Error('Revoke failed'));
    await expect(service.revokePermission('doc1', 'user1', 'u2')).rejects.toThrow('Revoke failed');
  });

  it('should handle repository errors for updatePermission', async () => {
    const service = createPermissionService(mockRepository as any);
    mockRepository.getDocument.mockResolvedValue({ id: 'doc1' });
    mockRepository.updatePermission.mockRejectedValue(new Error('Update failed'));
    await expect(service.updatePermission('doc1', 'user1', 'u2', 'admin')).rejects.toThrow('Update failed');
  });

  it('should handle repository errors for checkPermission', async () => {
    const service = createPermissionService(mockRepository as any);
    mockRepository.checkPermission.mockRejectedValue(new Error('Check failed'));
    await expect(service.checkPermission('doc1', 'user1', 'read')).rejects.toThrow('Check failed');
  });
});
