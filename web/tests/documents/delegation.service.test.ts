import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createDelegationService } from '../../src/features/documents/services/delegation.service';

describe('DelegationService', () => {
  let mockRepository: {
    getPermissionsByUser: ReturnType<typeof vi.fn>;
    getDefaultPermissions: ReturnType<typeof vi.fn>;
    grantPermission: ReturnType<typeof vi.fn>;
    updatePermission: ReturnType<typeof vi.fn>;
    revokePermission: ReturnType<typeof vi.fn>;
    getPermissionStats: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getPermissionsByUser: vi.fn(),
      getDefaultPermissions: vi.fn(),
      grantPermission: vi.fn(),
      updatePermission: vi.fn(),
      revokePermission: vi.fn(),
      getPermissionStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createDelegationService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getDelegations).toBeInstanceOf(Function);
    expect(service.getDelegation).toBeInstanceOf(Function);
    expect(service.createDelegation).toBeInstanceOf(Function);
    expect(service.updateDelegation).toBeInstanceOf(Function);
    expect(service.cancelDelegation).toBeInstanceOf(Function);
    expect(service.getActiveDelegations).toBeInstanceOf(Function);
    expect(service.getDelegationStats).toBeInstanceOf(Function);
  });

  describe('getDelegations', () => {
    it('should return delegations for a user', async () => {
      const permissions = [{ id: 'p-1', permission: 'read' }];
      mockRepository.getPermissionsByUser.mockResolvedValue(permissions);
      const service = createDelegationService(mockRepository);
      const result = await service.getDelegations('school-1', 'user-1');
      expect(result).toEqual(permissions);
      expect(mockRepository.getPermissionsByUser).toHaveBeenCalledWith('school-1', 'user-1');
    });

    it('should throw when schoolId is missing', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.getDelegations('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.getDelegations('school-1', '')).rejects.toThrow();
    });

    it('should return empty array when no delegations exist', async () => {
      mockRepository.getPermissionsByUser.mockResolvedValue([]);
      const service = createDelegationService(mockRepository);
      const result = await service.getDelegations('school-1', 'user-1');
      expect(result).toEqual([]);
    });

    it('should return multiple delegations', async () => {
      const permissions = [{ id: 'p-1' }, { id: 'p-2' }, { id: 'p-3' }];
      mockRepository.getPermissionsByUser.mockResolvedValue(permissions);
      const service = createDelegationService(mockRepository);
      const result = await service.getDelegations('school-1', 'user-1');
      expect(result).toHaveLength(3);
    });

    it('should propagate repository errors', async () => {
      mockRepository.getPermissionsByUser.mockRejectedValue(new Error('DB error'));
      const service = createDelegationService(mockRepository);
      await expect(service.getDelegations('school-1', 'user-1')).rejects.toThrow('DB error');
    });
  });

  describe('getDelegation', () => {
    it('should fetch a delegation', async () => {
      const permissions = { defaultPermission: 'read' };
      mockRepository.getDefaultPermissions.mockResolvedValue(permissions);
      const service = createDelegationService(mockRepository);
      const result = await service.getDelegation('del-1', 'school-1');
      expect(result).toEqual(permissions);
      expect(mockRepository.getDefaultPermissions).toHaveBeenCalledWith('school-1');
    });

    it('should throw when delegationId is missing', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.getDelegation('', 'school-1')).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.getDelegation('del-1', '')).rejects.toThrow();
    });

    it('should pass correct schoolId to repository', async () => {
      mockRepository.getDefaultPermissions.mockResolvedValue({ permission: 'write' });
      const service = createDelegationService(mockRepository);
      await service.getDelegation('del-1', 'school-42');
      expect(mockRepository.getDefaultPermissions).toHaveBeenCalledWith('school-42');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDefaultPermissions.mockRejectedValue(new Error('Not found'));
      const service = createDelegationService(mockRepository);
      await expect(service.getDelegation('del-1', 'school-1')).rejects.toThrow('Not found');
    });
  });

  describe('createDelegation', () => {
    it('should create a delegation successfully', async () => {
      const delegation = { documentId: 'doc-1', userId: 'user-2', permission: 'write' };
      mockRepository.grantPermission.mockResolvedValue(delegation);
      const service = createDelegationService(mockRepository);
      const result = await service.createDelegation('doc-1', 'school-1', 'user-1', 'user-2', 'write');
      expect(result).toEqual(delegation);
      expect(mockRepository.grantPermission).toHaveBeenCalledWith('doc-1', 'user-2', 'write', 'user-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.createDelegation('', 'school-1', 'user-1', 'user-2', 'write')).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.createDelegation('doc-1', '', 'user-1', 'user-2', 'write')).rejects.toThrow();
    });

    it('should throw when fromUserId is missing', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.createDelegation('doc-1', 'school-1', '', 'user-2', 'write')).rejects.toThrow();
    });

    it('should throw when toUserId is missing', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.createDelegation('doc-1', 'school-1', 'user-1', '', 'write')).rejects.toThrow();
    });

    it('should throw when permission is missing', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.createDelegation('doc-1', 'school-1', 'user-1', 'user-2', '')).rejects.toThrow();
    });

    it('should pass all parameters to grantPermission', async () => {
      mockRepository.grantPermission.mockResolvedValue({ success: true });
      const service = createDelegationService(mockRepository);
      await service.createDelegation('doc-1', 'school-1', 'from-user', 'to-user', 'admin');
      expect(mockRepository.grantPermission).toHaveBeenCalledWith('doc-1', 'to-user', 'admin', 'from-user');
    });

    it('should propagate repository errors', async () => {
      mockRepository.grantPermission.mockRejectedValue(new Error('Grant failed'));
      const service = createDelegationService(mockRepository);
      await expect(service.createDelegation('doc-1', 'school-1', 'user-1', 'user-2', 'write')).rejects.toThrow('Grant failed');
    });
  });

  describe('updateDelegation', () => {
    it('should update a delegation successfully', async () => {
      const delegation = { documentId: 'doc-1', userId: 'user-2', permission: 'admin' };
      mockRepository.updatePermission.mockResolvedValue(delegation);
      const service = createDelegationService(mockRepository);
      const result = await service.updateDelegation('doc-1', 'user-2', 'admin');
      expect(result).toEqual(delegation);
      expect(mockRepository.updatePermission).toHaveBeenCalledWith('doc-1', 'user-2', 'admin');
    });

    it('should throw when documentId is missing', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.updateDelegation('', 'user-2', 'admin')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.updateDelegation('doc-1', '', 'admin')).rejects.toThrow();
    });

    it('should throw when permission is missing', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.updateDelegation('doc-1', 'user-2', '')).rejects.toThrow();
    });

    it('should pass correct parameters to repository', async () => {
      mockRepository.updatePermission.mockResolvedValue({ success: true });
      const service = createDelegationService(mockRepository);
      await service.updateDelegation('doc-99', 'user-5', 'read');
      expect(mockRepository.updatePermission).toHaveBeenCalledWith('doc-99', 'user-5', 'read');
    });

    it('should propagate repository errors', async () => {
      mockRepository.updatePermission.mockRejectedValue(new Error('Update failed'));
      const service = createDelegationService(mockRepository);
      await expect(service.updateDelegation('doc-1', 'user-2', 'admin')).rejects.toThrow('Update failed');
    });
  });

  describe('cancelDelegation', () => {
    it('should cancel a delegation successfully', async () => {
      mockRepository.revokePermission.mockResolvedValue(undefined);
      const service = createDelegationService(mockRepository);
      await service.cancelDelegation('doc-1', 'user-2');
      expect(mockRepository.revokePermission).toHaveBeenCalledWith('doc-1', 'user-2');
    });

    it('should throw when documentId is missing', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.cancelDelegation('', 'user-2')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.cancelDelegation('doc-1', '')).rejects.toThrow();
    });

    it('should pass correct parameters to revokePermission', async () => {
      mockRepository.revokePermission.mockResolvedValue(undefined);
      const service = createDelegationService(mockRepository);
      await service.cancelDelegation('doc-42', 'user-5');
      expect(mockRepository.revokePermission).toHaveBeenCalledWith('doc-42', 'user-5');
    });

    it('should propagate repository errors', async () => {
      mockRepository.revokePermission.mockRejectedValue(new Error('Revoke failed'));
      const service = createDelegationService(mockRepository);
      await expect(service.cancelDelegation('doc-1', 'user-2')).rejects.toThrow('Revoke failed');
    });
  });

  describe('getActiveDelegations', () => {
    it('should return active delegations', async () => {
      const permissions = [{ id: 'p-1', active: true }];
      mockRepository.getPermissionsByUser.mockResolvedValue(permissions);
      const service = createDelegationService(mockRepository);
      const result = await service.getActiveDelegations('school-1', 'user-1');
      expect(result).toEqual(permissions);
      expect(mockRepository.getPermissionsByUser).toHaveBeenCalledWith('school-1', 'user-1');
    });

    it('should throw when schoolId is missing', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.getActiveDelegations('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.getActiveDelegations('school-1', '')).rejects.toThrow();
    });

    it('should return empty array when no active delegations', async () => {
      mockRepository.getPermissionsByUser.mockResolvedValue([]);
      const service = createDelegationService(mockRepository);
      const result = await service.getActiveDelegations('school-1', 'user-1');
      expect(result).toEqual([]);
    });

    it('should pass correct parameters to repository', async () => {
      mockRepository.getPermissionsByUser.mockResolvedValue([]);
      const service = createDelegationService(mockRepository);
      await service.getActiveDelegations('school-99', 'user-99');
      expect(mockRepository.getPermissionsByUser).toHaveBeenCalledWith('school-99', 'user-99');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getPermissionsByUser.mockRejectedValue(new Error('Fetch failed'));
      const service = createDelegationService(mockRepository);
      await expect(service.getActiveDelegations('school-1', 'user-1')).rejects.toThrow('Fetch failed');
    });
  });

  describe('getDelegationStats', () => {
    it('should fetch delegation stats', async () => {
      const stats = { totalDelegations: 5, activeDelegations: 3 };
      mockRepository.getPermissionStats.mockResolvedValue(stats);
      const service = createDelegationService(mockRepository);
      const result = await service.getDelegationStats('school-1', 'user-1');
      expect(result).toEqual(stats);
      expect(mockRepository.getPermissionStats).toHaveBeenCalledWith('school-1');
    });

    it('should throw when schoolId is missing', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.getDelegationStats('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.getDelegationStats('school-1', '')).rejects.toThrow();
    });

    it('should pass correct schoolId to repository', async () => {
      mockRepository.getPermissionStats.mockResolvedValue({ totalDelegations: 0 });
      const service = createDelegationService(mockRepository);
      await service.getDelegationStats('school-42', 'user-1');
      expect(mockRepository.getPermissionStats).toHaveBeenCalledWith('school-42');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getPermissionStats.mockRejectedValue(new Error('Stats failed'));
      const service = createDelegationService(mockRepository);
      await expect(service.getDelegationStats('school-1', 'user-1')).rejects.toThrow('Stats failed');
    });
  });

  describe('missing required parameters', () => {
    it('should throw when getDelegations receives all empty strings', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.getDelegations('', '')).rejects.toThrow();
    });

    it('should throw when getDelegation receives undefined delegationId', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.getDelegation(undefined as any, 'school-1')).rejects.toThrow();
    });

    it('should throw when createDelegation receives all empty strings', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.createDelegation('', '', '', '', '')).rejects.toThrow();
    });

    it('should throw when updateDelegation receives undefined parameters', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.updateDelegation(undefined as any, undefined as any, undefined as any)).rejects.toThrow();
    });

    it('should throw when cancelDelegation receives null documentId', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.cancelDelegation(null as any, 'user-1')).rejects.toThrow();
    });

    it('should throw when getActiveDelegations receives undefined schoolId', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.getActiveDelegations(undefined as any, 'user-1')).rejects.toThrow();
    });

    it('should throw when getDelegationStats receives undefined userId', async () => {
      const service = createDelegationService(mockRepository);
      await expect(service.getDelegationStats('school-1', undefined as any)).rejects.toThrow();
    });
  });

  describe('repository error handling', () => {
    it('should handle grantPermission failure in createDelegation', async () => {
      mockRepository.grantPermission.mockRejectedValue(new Error('Permission denied'));
      const service = createDelegationService(mockRepository);
      await expect(service.createDelegation('doc-1', 'school-1', 'user-1', 'user-2', 'write')).rejects.toThrow('Permission denied');
    });

    it('should handle updatePermission failure', async () => {
      mockRepository.updatePermission.mockRejectedValue(new Error('Update denied'));
      const service = createDelegationService(mockRepository);
      await expect(service.updateDelegation('doc-1', 'user-2', 'admin')).rejects.toThrow('Update denied');
    });

    it('should handle revokePermission failure in cancelDelegation', async () => {
      mockRepository.revokePermission.mockRejectedValue(new Error('Revoke denied'));
      const service = createDelegationService(mockRepository);
      await expect(service.cancelDelegation('doc-1', 'user-2')).rejects.toThrow('Revoke denied');
    });
  });
});
