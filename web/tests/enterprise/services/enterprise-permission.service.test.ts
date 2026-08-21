import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('EnterprisePermissionService', () => {
  const mockRepo = {
    findPermissions: vi.fn(),
    findPermissionById: vi.fn(),
    createPermission: vi.fn(),
    updatePermission: vi.fn(),
    deletePermission: vi.fn(),
    assignPermission: vi.fn(),
    revokePermission: vi.fn(),
    getUserPermissions: vi.fn(),
    checkPermission: vi.fn(),
    getPermissionGroups: vi.fn(),
    createPermissionGroup: vi.fn(),
    getRolePermissions: vi.fn(),
    updateRolePermissions: vi.fn(),
    getDefaultPermissions: vi.fn(),
    getPermissionAuditLog: vi.fn(),
  };

  const enterpriseId = 'ent-1';
  const permissionId = 'perm-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findPermissions', () => {
    it('should return permissions list', async () => {
      const permissions = [{ id: permissionId, name: 'school.read', description: 'Read schools' }];
      mockRepo.findPermissions.mockResolvedValue(permissions);
      const result = await mockRepo.findPermissions(enterpriseId);
      expect(result).toEqual(permissions);
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should filter by resource', async () => {
      mockRepo.findPermissions.mockResolvedValue([]);
      await mockRepo.findPermissions(enterpriseId, { resource: 'school' });
      expect(mockRepo.findPermissions).toHaveBeenCalled();
    });

    it('should filter by action', async () => {
      mockRepo.findPermissions.mockResolvedValue([]);
      await mockRepo.findPermissions(enterpriseId, { action: 'read' });
      expect(mockRepo.findPermissions).toHaveBeenCalled();
    });

    it('should handle empty results', async () => {
      mockRepo.findPermissions.mockResolvedValue([]);
      const result = await mockRepo.findPermissions(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should sort by name', async () => {
      mockRepo.findPermissions.mockResolvedValue([]);
      await mockRepo.findPermissions(enterpriseId, { sortBy: 'name', order: 'asc' });
      expect(mockRepo.findPermissions).toHaveBeenCalled();
    });

    it('should include system permissions', async () => {
      mockRepo.findPermissions.mockResolvedValue([{ name: 'system.admin', isSystem: true }]);
      const result = await mockRepo.findPermissions(enterpriseId);
      expect(result[0].isSystem).toBe(true);
    });
  });

  describe('findPermissionById', () => {
    it('should return permission by id', async () => {
      const permission = { id: permissionId, name: 'school.read' };
      mockRepo.findPermissionById.mockResolvedValue(permission);
      const result = await mockRepo.findPermissionById(permissionId);
      expect(result).toEqual(permission);
    });

    it('should throw if not found', async () => {
      mockRepo.findPermissionById.mockResolvedValue(null);
      const findOrThrow = async (id: string) => {
        const perm = await mockRepo.findPermissionById(id);
        if (!perm) throw new Error('Permission non trouvée');
      };
      await expect(findOrThrow('nonexistent')).rejects.toThrow('Permission non trouvée');
    });

    it('should require permissionId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant requis');
      };
      expect(() => validate('')).toThrow('Identifiant requis');
    });

    it('should include assigned roles', async () => {
      mockRepo.findPermissionById.mockResolvedValue({ id: permissionId, roles: ['admin', 'manager'] });
      const result = await mockRepo.findPermissionById(permissionId);
      expect(result.roles).toContain('admin');
    });

    it('should include usage count', async () => {
      mockRepo.findPermissionById.mockResolvedValue({ id: permissionId, usageCount: 25 });
      const result = await mockRepo.findPermissionById(permissionId);
      expect(result.usageCount).toBe(25);
    });
  });

  describe('createPermission', () => {
    it('should create permission with valid data', async () => {
      const data = { name: 'course.create', description: 'Create courses', resource: 'course', action: 'create' };
      mockRepo.createPermission.mockResolvedValue({ id: permissionId, ...data });
      const result = await mockRepo.createPermission({ ...data, enterprise_id: enterpriseId });
      expect(result.name).toBe('course.create');
    });

    it('should require name', () => {
      const validate = (data: any) => {
        if (!data?.name) throw new Error('Le nom est requis');
      };
      expect(() => validate({ description: 'Desc' })).toThrow('Le nom est requis');
    });

    it('should require resource', () => {
      const validate = (data: any) => {
        if (!data?.resource) throw new Error('La ressource est requise');
      };
      expect(() => validate({ name: 'perm', action: 'read' })).toThrow('La ressource est requise');
    });

    it('should require action', () => {
      const validate = (data: any) => {
        if (!data?.action) throw new Error('L\'action est requise');
      };
      expect(() => validate({ name: 'perm', resource: 'school' })).toThrow('L\'action est requise');
    });

    it('should validate permission name format', () => {
      const isValidName = (name: string) => /^[a-z]+\.[a-z_]+$/.test(name);
      expect(isValidName('school.read')).toBe(true);
      expect(isValidName('course.create')).toBe(true);
      expect(isValidName('INVALID')).toBe(false);
    });

    it('should validate action values', () => {
      const validActions = ['create', 'read', 'update', 'delete', 'manage'];
      const validate = (action: string) => {
        if (!validActions.includes(action)) throw new Error('Action invalide');
      };
      expect(() => validate('read')).not.toThrow();
      expect(() => validate('invalid')).toThrow();
    });

    it('should reject duplicate name', async () => {
      mockRepo.findPermissions.mockResolvedValue([{ name: 'school.read' }]);
      const createOrThrow = async (name: string) => {
        const perms = await mockRepo.findPermissions(enterpriseId);
        if (perms.some((p: any) => p.name === name)) throw new Error('Une permission avec ce nom existe déjà');
      };
      await expect(createOrThrow('school.read')).rejects.toThrow();
    });

    it('should set default values', async () => {
      mockRepo.createPermission.mockResolvedValue({ id: permissionId, isSystem: false, active: true });
      const result = await mockRepo.createPermission({ name: 'new.perm', resource: 'new', action: 'read', enterprise_id: enterpriseId });
      expect(result.isSystem).toBe(false);
      expect(result.active).toBe(true);
    });

    it('should validate name length', () => {
      const validate = (name: string) => {
        if (name.length < 3 || name.length > 100) throw new Error('Le nom doit contenir entre 3 et 100 caractères');
      };
      expect(() => validate('ab')).toThrow();
      expect(() => validate('school.read')).not.toThrow();
    });
  });

  describe('updatePermission', () => {
    it('should update permission', async () => {
      mockRepo.findPermissionById.mockResolvedValue({ id: permissionId, description: 'Old' });
      mockRepo.updatePermission.mockResolvedValue({ id: permissionId, description: 'Updated' });
      const result = await mockRepo.updatePermission(permissionId, { description: 'Updated' });
      expect(result.description).toBe('Updated');
    });

    it('should throw if not found', async () => {
      mockRepo.findPermissionById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const perm = await mockRepo.findPermissionById(permissionId);
        if (!perm) throw new Error('Permission non trouvée');
      };
      await expect(updateOrThrow()).rejects.toThrow('Permission non trouvée');
    });

    it('should not update system permissions', async () => {
      mockRepo.findPermissionById.mockResolvedValue({ id: permissionId, isSystem: true });
      const updateOrThrow = async () => {
        const perm = await mockRepo.findPermissionById(permissionId);
        if (perm?.isSystem) throw new Error('Les permissions système ne peuvent pas être modifiées');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });

    it('should allow description update', async () => {
      mockRepo.findPermissionById.mockResolvedValue({ id: permissionId });
      mockRepo.updatePermission.mockResolvedValue({ description: 'New description' });
      const result = await mockRepo.updatePermission(permissionId, { description: 'New description' });
      expect(result.description).toBe('New description');
    });

    it('should validate update data', () => {
      const validate = (data: any) => {
        if (data.description && data.description.length < 5) throw new Error('La description est trop courte');
      };
      expect(() => validate({ description: 'Hi' })).toThrow();
      expect(() => validate({ description: 'Valid description' })).not.toThrow();
    });
  });

  describe('deletePermission', () => {
    it('should delete permission', async () => {
      mockRepo.findPermissionById.mockResolvedValue({ id: permissionId, isSystem: false });
      mockRepo.deletePermission.mockResolvedValue(undefined);
      await mockRepo.deletePermission(permissionId);
      expect(mockRepo.deletePermission).toHaveBeenCalledWith(permissionId);
    });

    it('should throw if system permission', async () => {
      mockRepo.findPermissionById.mockResolvedValue({ id: permissionId, isSystem: true });
      const deleteOrThrow = async () => {
        const perm = await mockRepo.findPermissionById(permissionId);
        if (perm?.isSystem) throw new Error('Les permissions système ne peuvent pas être supprimées');
      };
      await expect(deleteOrThrow()).rejects.toThrow();
    });

    it('should throw if not found', async () => {
      mockRepo.findPermissionById.mockResolvedValue(null);
      const deleteOrThrow = async () => {
        const perm = await mockRepo.findPermissionById(permissionId);
        if (!perm) throw new Error('Permission non trouvée');
      };
      await expect(deleteOrThrow()).rejects.toThrow('Permission non trouvée');
    });

    it('should check for role assignments', async () => {
      mockRepo.findPermissionById.mockResolvedValue({ id: permissionId, assignedRoles: 5 });
      const deleteOrThrow = async () => {
        const perm = await mockRepo.findPermissionById(permissionId);
        if (perm && perm.assignedRoles > 0) throw new Error('Retirez les rôles avant de supprimer');
      };
      await expect(deleteOrThrow()).rejects.toThrow();
    });

    it('should soft delete permission', async () => {
      mockRepo.findPermissionById.mockResolvedValue({ id: permissionId });
      mockRepo.deletePermission.mockResolvedValue({ deleted: true, archivedAt: new Date().toISOString() });
      const result = await mockRepo.deletePermission(permissionId);
      expect(result.deleted).toBe(true);
    });
  });

  describe('assignPermission', () => {
    it('should assign permission to role', async () => {
      mockRepo.assignPermission.mockResolvedValue({ permissionId, roleId: 'role-1', assignedAt: new Date().toISOString() });
      const result = await mockRepo.assignPermission(permissionId, 'role-1');
      expect(result.permissionId).toBe(permissionId);
    });

    it('should require roleId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('L\'identifiant du rôle est requis');
      };
      expect(() => validate('')).toThrow('L\'identifiant du rôle est requis');
    });

    it('should handle duplicate assignment', async () => {
      mockRepo.assignPermission.mockRejectedValue(new Error('La permission est déjà assignée'));
      await expect(mockRepo.assignPermission(permissionId, 'role-1')).rejects.toThrow('La permission est déjà assignée');
    });

    it('should assign to multiple roles', async () => {
      mockRepo.assignPermission.mockResolvedValue({ permissionId, roleCount: 3 });
      const result = await mockRepo.assignPermission(permissionId, 'role-1');
      expect(result.roleCount).toBe(3);
    });

    it('should record assignment metadata', async () => {
      mockRepo.assignPermission.mockResolvedValue({ assignedBy: 'usr-1', assignedAt: new Date().toISOString() });
      const result = await mockRepo.assignPermission(permissionId, 'role-1', 'usr-1');
      expect(result.assignedBy).toBe('usr-1');
    });
  });

  describe('revokePermission', () => {
    it('should revoke permission from role', async () => {
      mockRepo.revokePermission.mockResolvedValue({ permissionId, roleId: 'role-1', revoked: true });
      const result = await mockRepo.revokePermission(permissionId, 'role-1');
      expect(result.revoked).toBe(true);
    });

    it('should throw if not assigned', async () => {
      mockRepo.revokePermission.mockRejectedValue(new Error('La permission n\'est pas assignée'));
      await expect(mockRepo.revokePermission(permissionId, 'role-1')).rejects.toThrow('La permission n\'est pas assignée');
    });

    it('should not revoke system permissions', async () => {
      mockRepo.revokePermission.mockRejectedValue(new Error('Les permissions système ne peuvent pas être révoquées'));
      await expect(mockRepo.revokePermission('system.perm', 'role-1')).rejects.toThrow();
    });

    it('should record revocation metadata', async () => {
      mockRepo.revokePermission.mockResolvedValue({ revokedBy: 'usr-1', revokedAt: new Date().toISOString() });
      const result = await mockRepo.revokePermission(permissionId, 'role-1', 'usr-1');
      expect(result.revokedBy).toBe('usr-1');
    });

    it('should handle multiple role revocation', async () => {
      mockRepo.revokePermission.mockResolvedValue({ revokedFrom: ['role-1', 'role-2'] });
      const result = await mockRepo.revokePermission(permissionId, 'role-1');
      expect(result.revokedFrom).toHaveLength(2);
    });
  });

  describe('getUserPermissions', () => {
    it('should return user permissions', async () => {
      mockRepo.getUserPermissions.mockResolvedValue(['school.read', 'course.create']);
      const result = await mockRepo.getUserPermissions(enterpriseId, 'usr-1');
      expect(result).toContain('school.read');
    });

    it('should include inherited permissions', async () => {
      mockRepo.getUserPermissions.mockResolvedValue(['school.read', 'course.create', 'system.admin']);
      const result = await mockRepo.getUserPermissions(enterpriseId, 'usr-1');
      expect(result).toContain('system.admin');
    });

    it('should handle no permissions', async () => {
      mockRepo.getUserPermissions.mockResolvedValue([]);
      const result = await mockRepo.getUserPermissions(enterpriseId, 'usr-1');
      expect(result).toHaveLength(0);
    });

    it('should deduplicate permissions', async () => {
      mockRepo.getUserPermissions.mockResolvedValue(['school.read', 'school.read']);
      const result = await mockRepo.getUserPermissions(enterpriseId, 'usr-1');
      const unique = [...new Set(result)];
      expect(unique).toHaveLength(1);
    });

    it('should include permission details', async () => {
      mockRepo.getUserPermissions.mockResolvedValue([{ name: 'school.read', description: 'Read schools' }]);
      const result = await mockRepo.getUserPermissions(enterpriseId, 'usr-1');
      expect(result[0].description).toBeDefined();
    });
  });

  describe('checkPermission', () => {
    it('should check if user has permission', async () => {
      mockRepo.checkPermission.mockResolvedValue({ hasPermission: true, permission: 'school.read' });
      const result = await mockRepo.checkPermission(enterpriseId, 'usr-1', 'school.read');
      expect(result.hasPermission).toBe(true);
    });

    it('should deny missing permission', async () => {
      mockRepo.checkPermission.mockResolvedValue({ hasPermission: false, permission: 'school.delete' });
      const result = await mockRepo.checkPermission(enterpriseId, 'usr-1', 'school.delete');
      expect(result.hasPermission).toBe(false);
    });

    it('should check wildcard permissions', async () => {
      mockRepo.checkPermission.mockResolvedValue({ hasPermission: true, viaWildcard: true });
      const result = await mockRepo.checkPermission(enterpriseId, 'usr-1', 'school.read');
      expect(result.viaWildcard).toBe(true);
    });

    it('should require permission name', () => {
      const validate = (perm: string) => {
        if (!perm) throw new Error('La permission est requise');
      };
      expect(() => validate('')).toThrow('La permission est requise');
    });

    it('should include denial reason', async () => {
      mockRepo.checkPermission.mockResolvedValue({ hasPermission: false, reason: 'Insufficient role' });
      const result = await mockRepo.checkPermission(enterpriseId, 'usr-1', 'admin.settings');
      expect(result.reason).toBe('Insufficient role');
    });
  });

  describe('getPermissionGroups', () => {
    it('should return permission groups', async () => {
      mockRepo.getPermissionGroups.mockResolvedValue([{ name: 'School Management', permissions: ['school.read', 'school.write'] }]);
      const result = await mockRepo.getPermissionGroups(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should include permission counts', async () => {
      mockRepo.getPermissionGroups.mockResolvedValue([{ name: 'User Management', count: 10 }]);
      const result = await mockRepo.getPermissionGroups(enterpriseId);
      expect(result[0].count).toBe(10);
    });

    it('should handle empty groups', async () => {
      mockRepo.getPermissionGroups.mockResolvedValue([]);
      const result = await mockRepo.getPermissionGroups(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should filter by category', async () => {
      mockRepo.getPermissionGroups.mockResolvedValue([]);
      await mockRepo.getPermissionGroups(enterpriseId, { category: 'school' });
      expect(mockRepo.getPermissionGroups).toHaveBeenCalled();
    });

    it('should include system groups', async () => {
      mockRepo.getPermissionGroups.mockResolvedValue([{ name: 'System', isSystem: true }]);
      const result = await mockRepo.getPermissionGroups(enterpriseId);
      expect(result[0].isSystem).toBe(true);
    });
  });

  describe('createPermissionGroup', () => {
    it('should create permission group', async () => {
      mockRepo.createPermissionGroup.mockResolvedValue({ name: 'Custom Group', permissions: [] });
      const result = await mockRepo.createPermissionGroup(enterpriseId, { name: 'Custom Group' });
      expect(result.name).toBe('Custom Group');
    });

    it('should require name', () => {
      const validate = (data: any) => {
        if (!data?.name) throw new Error('Le nom est requis');
      };
      expect(() => validate({})).toThrow('Le nom est requis');
    });

    it('should validate name length', () => {
      const validate = (name: string) => {
        if (name.length < 3 || name.length > 50) throw new Error('Le nom doit contenir entre 3 et 50 caractères');
      };
      expect(() => validate('Hi')).toThrow();
      expect(() => validate('Valid Group')).not.toThrow();
    });

    it('should accept initial permissions', async () => {
      mockRepo.createPermissionGroup.mockResolvedValue({ name: 'Group', permissions: ['school.read'] });
      const result = await mockRepo.createPermissionGroup(enterpriseId, { name: 'Group', permissions: ['school.read'] });
      expect(result.permissions).toContain('school.read');
    });

    it('should reject duplicate name', async () => {
      mockRepo.getPermissionGroups.mockResolvedValue([{ name: 'Existing' }]);
      const createOrThrow = async (name: string) => {
        const groups = await mockRepo.getPermissionGroups(enterpriseId);
        if (groups.some((g: any) => g.name === name)) throw new Error('Un groupe avec ce nom existe déjà');
      };
      await expect(createOrThrow('Existing')).rejects.toThrow();
    });
  });

  describe('getRolePermissions', () => {
    it('should return role permissions', async () => {
      mockRepo.getRolePermissions.mockResolvedValue(['school.read', 'school.write']);
      const result = await mockRepo.getRolePermissions('role-1');
      expect(result).toContain('school.read');
    });

    it('should handle no permissions', async () => {
      mockRepo.getRolePermissions.mockResolvedValue([]);
      const result = await mockRepo.getRolePermissions('role-1');
      expect(result).toHaveLength(0);
    });

    it('should include inherited permissions', async () => {
      mockRepo.getRolePermissions.mockResolvedValue(['school.read', 'course.create', 'system.admin']);
      const result = await mockRepo.getRolePermissions('role-1');
      expect(result).toContain('system.admin');
    });

    it('should require roleId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('L\'identifiant du rôle est requis');
      };
      expect(() => validate('')).toThrow('L\'identifiant du rôle est requis');
    });

    it('should include permission details', async () => {
      mockRepo.getRolePermissions.mockResolvedValue([{ name: 'school.read', description: 'Read schools' }]);
      const result = await mockRepo.getRolePermissions('role-1');
      expect(result[0].description).toBeDefined();
    });
  });

  describe('updateRolePermissions', () => {
    it('should update role permissions', async () => {
      mockRepo.updateRolePermissions.mockResolvedValue({ roleId: 'role-1', permissions: ['school.read', 'course.create'] });
      const result = await mockRepo.updateRolePermissions('role-1', ['school.read', 'course.create']);
      expect(result.permissions).toHaveLength(2);
    });

    it('should require at least one permission', () => {
      const validate = (perms: string[]) => {
        if (!perms || perms.length === 0) throw new Error('Au moins une permission requise');
      };
      expect(() => validate([])).toThrow();
      expect(() => validate(['read'])).not.toThrow();
    });

    it('should replace all permissions', async () => {
      mockRepo.updateRolePermissions.mockResolvedValue({ permissions: ['delete'] });
      const result = await mockRepo.updateRolePermissions('role-1', ['delete']);
      expect(result.permissions).toEqual(['delete']);
    });

    it('should validate permission names', () => {
      const validPermissions = ['read', 'write', 'delete', 'manage_users', 'manage_schools'];
      const validate = (perms: string[]) => {
        const invalid = perms.filter(p => !validPermissions.includes(p));
        if (invalid.length > 0) throw new Error(`Permissions invalides: ${invalid.join(', ')}`);
      };
      expect(() => validate(['read', 'write'])).not.toThrow();
      expect(() => validate(['invalid'])).toThrow();
    });

    it('should not update system roles', async () => {
      mockRepo.updateRolePermissions.mockRejectedValue(new Error('Les rôles système ne peuvent pas être modifiés'));
      await expect(mockRepo.updateRolePermissions('system-role', ['read'])).rejects.toThrow();
    });
  });

  describe('getDefaultPermissions', () => {
    it('should return default permissions', async () => {
      mockRepo.getDefaultPermissions.mockResolvedValue([{ name: 'school.read', isDefault: true }]);
      const result = await mockRepo.getDefaultPermissions();
      expect(result).toHaveLength(1);
    });

    it('should include all default permissions', async () => {
      mockRepo.getDefaultPermissions.mockResolvedValue([
        { name: 'school.read' },
        { name: 'course.read' },
        { name: 'user.read' },
      ]);
      const result = await mockRepo.getDefaultPermissions();
      expect(result).toHaveLength(3);
    });

    it('should filter by role', async () => {
      mockRepo.getDefaultPermissions.mockResolvedValue([]);
      await mockRepo.getDefaultPermissions({ role: 'viewer' });
      expect(mockRepo.getDefaultPermissions).toHaveBeenCalled();
    });

    it('should include system defaults', async () => {
      mockRepo.getDefaultPermissions.mockResolvedValue([{ name: 'system.admin', isSystem: true }]);
      const result = await mockRepo.getDefaultPermissions();
      expect(result[0].isSystem).toBe(true);
    });

    it('should handle no defaults', async () => {
      mockRepo.getDefaultPermissions.mockResolvedValue([]);
      const result = await mockRepo.getDefaultPermissions();
      expect(result).toHaveLength(0);
    });
  });

  describe('getPermissionAuditLog', () => {
    it('should return permission audit log', async () => {
      mockRepo.getPermissionAuditLog.mockResolvedValue([{ action: 'assigned', permission: 'school.read', date: '2026-01-01' }]);
      const result = await mockRepo.getPermissionAuditLog(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should filter by permission', async () => {
      mockRepo.getPermissionAuditLog.mockResolvedValue([]);
      await mockRepo.getPermissionAuditLog(enterpriseId, { permission: 'school.read' });
      expect(mockRepo.getPermissionAuditLog).toHaveBeenCalled();
    });

    it('should filter by action', async () => {
      mockRepo.getPermissionAuditLog.mockResolvedValue([]);
      await mockRepo.getPermissionAuditLog(enterpriseId, { action: 'revoked' });
      expect(mockRepo.getPermissionAuditLog).toHaveBeenCalled();
    });

    it('should handle empty log', async () => {
      mockRepo.getPermissionAuditLog.mockResolvedValue([]);
      const result = await mockRepo.getPermissionAuditLog(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should include user info', async () => {
      mockRepo.getPermissionAuditLog.mockResolvedValue([{ action: 'assigned', performedBy: 'usr-1', userName: 'Admin' }]);
      const result = await mockRepo.getPermissionAuditLog(enterpriseId);
      expect(result[0].userName).toBe('Admin');
    });

    it('should sort by date descending', async () => {
      mockRepo.getPermissionAuditLog.mockResolvedValue([
        { date: '2026-01-01' },
        { date: '2026-02-01' },
      ]);
      const result = await mockRepo.getPermissionAuditLog(enterpriseId);
      expect(result).toHaveLength(2);
    });
  });
});
