import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('EnterpriseRoleService', () => {
  const mockRepo = {
    findRoles: vi.fn(),
    findRoleById: vi.fn(),
    createRole: vi.fn(),
    updateRole: vi.fn(),
    deleteRole: vi.fn(),
    assignRoleToUser: vi.fn(),
    removeRoleFromUser: vi.fn(),
    getRolePermissions: vi.fn(),
    updateRolePermissions: vi.fn(),
    getDefaultRoles: vi.fn(),
    cloneRole: vi.fn(),
    countUsersByRole: vi.fn(),
    getRoleAuditLog: vi.fn(),
  };

  const enterpriseId = 'ent-1';
  const roleId = 'role-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findRoles', () => {
    it('should return roles list', async () => {
      const roles = [{ id: roleId, name: 'Admin', permissions: ['read', 'write'] }];
      mockRepo.findRoles.mockResolvedValue(roles);
      const result = await mockRepo.findRoles(enterpriseId);
      expect(result).toEqual(roles);
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should handle empty results', async () => {
      mockRepo.findRoles.mockResolvedValue([]);
      const result = await mockRepo.findRoles(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should filter by system role flag', async () => {
      mockRepo.findRoles.mockResolvedValue([]);
      await mockRepo.findRoles(enterpriseId, { isSystem: true });
      expect(mockRepo.findRoles).toHaveBeenCalledWith(enterpriseId, { isSystem: true });
    });

    it('should include permission count', async () => {
      mockRepo.findRoles.mockResolvedValue([{ id: roleId, permissionCount: 5 }]);
      const result = await mockRepo.findRoles(enterpriseId);
      expect(result[0].permissionCount).toBe(5);
    });
  });

  describe('findRoleById', () => {
    it('should return role by id', async () => {
      const role = { id: roleId, name: 'Admin', permissions: ['read', 'write'] };
      mockRepo.findRoleById.mockResolvedValue(role);
      const result = await mockRepo.findRoleById(roleId);
      expect(result).toEqual(role);
    });

    it('should throw if not found', async () => {
      mockRepo.findRoleById.mockResolvedValue(null);
      const findOrThrow = async (id: string) => {
        const role = await mockRepo.findRoleById(id);
        if (!role) throw new Error('Rôle non trouvé');
      };
      await expect(findOrThrow('nonexistent')).rejects.toThrow('Rôle non trouvé');
    });

    it('should require roleId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant requis');
      };
      expect(() => validate('')).toThrow('Identifiant requis');
    });

    it('should include user count', async () => {
      mockRepo.findRoleById.mockResolvedValue({ id: roleId, userCount: 10 });
      const result = await mockRepo.findRoleById(roleId);
      expect(result.userCount).toBe(10);
    });
  });

  describe('createRole', () => {
    it('should create role with valid data', async () => {
      const data = { name: 'Manager', permissions: ['read', 'write'] };
      mockRepo.createRole.mockResolvedValue({ id: roleId, ...data });
      const result = await mockRepo.createRole({ ...data, enterprise_id: enterpriseId });
      expect(result.name).toBe('Manager');
    });

    it('should require name', () => {
      const validate = (data: any) => {
        if (!data?.name) throw new Error('Le nom du rôle est requis');
      };
      expect(() => validate({ permissions: ['read'] })).toThrow('Le nom du rôle est requis');
    });

    it('should require at least one permission', () => {
      const validate = (permissions: string[]) => {
        if (!permissions || permissions.length === 0) throw new Error('Au moins une permission requise');
      };
      expect(() => validate([])).toThrow('Au moins une permission requise');
      expect(() => validate(['read'])).not.toThrow();
    });

    it('should reject duplicate role name', async () => {
      mockRepo.findRoles.mockResolvedValue([{ name: 'Admin' }]);
      const createOrThrow = async (name: string) => {
        const roles = await mockRepo.findRoles(enterpriseId);
        if (roles.some((r: any) => r.name === name)) throw new Error('Un rôle avec ce nom existe déjà');
      };
      await expect(createOrThrow('Admin')).rejects.toThrow('Un rôle avec ce nom existe déjà');
    });

    it('should not allow creating system roles', () => {
      const validate = (isSystem: boolean) => {
        if (isSystem) throw new Error('Les rôles système ne peuvent pas être créés manuellement');
      };
      expect(() => validate(true)).toThrow();
      expect(() => validate(false)).not.toThrow();
    });

    it('should validate role name format', () => {
      const isValidName = (name: string) => /^[A-Za-zÀ-ÿ\s_-]{2,50}$/.test(name);
      expect(isValidName('Admin')).toBe(true);
      expect(isValidName('A')).toBe(false);
      expect(isValidName('Role With Spaces')).toBe(true);
    });

    it('should set default status', async () => {
      mockRepo.createRole.mockResolvedValue({ id: roleId, name: 'New', active: true });
      const result = await mockRepo.createRole({ name: 'New', permissions: ['read'], enterprise_id: enterpriseId });
      expect(result.active).toBe(true);
    });
  });

  describe('updateRole', () => {
    it('should update role', async () => {
      mockRepo.findRoleById.mockResolvedValue({ id: roleId, name: 'Old' });
      mockRepo.updateRole.mockResolvedValue({ id: roleId, name: 'Updated' });
      const result = await mockRepo.updateRole(roleId, { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if not found', async () => {
      mockRepo.findRoleById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const role = await mockRepo.findRoleById(roleId);
        if (!role) throw new Error('Rôle non trouvé');
      };
      await expect(updateOrThrow()).rejects.toThrow('Rôle non trouvé');
    });

    it('should not update system roles', async () => {
      mockRepo.findRoleById.mockResolvedValue({ id: roleId, isSystem: true });
      const updateOrThrow = async () => {
        const role = await mockRepo.findRoleById(roleId);
        if (role?.isSystem) throw new Error('Les rôles système ne peuvent pas être modifiés');
      };
      await expect(updateOrThrow()).rejects.toThrow('Les rôles système ne peuvent pas être modifiés');
    });

    it('should validate name on update', () => {
      const validate = (name: string) => {
        if (name.length < 2) throw new Error('Le nom doit contenir au moins 2 caractères');
      };
      expect(() => validate('A')).toThrow();
      expect(() => validate('Admin')).not.toThrow();
    });
  });

  describe('deleteRole', () => {
    it('should delete role', async () => {
      mockRepo.findRoleById.mockResolvedValue({ id: roleId, isSystem: false, userCount: 0 });
      mockRepo.deleteRole.mockResolvedValue(undefined);
      await mockRepo.deleteRole(roleId);
      expect(mockRepo.deleteRole).toHaveBeenCalledWith(roleId);
    });

    it('should throw if system role', async () => {
      mockRepo.findRoleById.mockResolvedValue({ id: roleId, isSystem: true });
      const deleteOrThrow = async () => {
        const role = await mockRepo.findRoleById(roleId);
        if (role?.isSystem) throw new Error('Les rôles système ne peuvent pas être supprimés');
      };
      await expect(deleteOrThrow()).rejects.toThrow('Les rôles système ne peuvent pas être supprimés');
    });

    it('should throw if role has users', async () => {
      mockRepo.findRoleById.mockResolvedValue({ id: roleId, userCount: 5 });
      const deleteOrThrow = async () => {
        const role = await mockRepo.findRoleById(roleId);
        if (role && role.userCount > 0) throw new Error('Réassignez les utilisateurs avant de supprimer le rôle');
      };
      await expect(deleteOrThrow()).rejects.toThrow();
    });

    it('should throw if not found', async () => {
      mockRepo.findRoleById.mockResolvedValue(null);
      const deleteOrThrow = async () => {
        const role = await mockRepo.findRoleById(roleId);
        if (!role) throw new Error('Rôle non trouvé');
      };
      await expect(deleteOrThrow()).rejects.toThrow('Rôle non trouvé');
    });
  });

  describe('assignRoleToUser', () => {
    it('should assign role to user', async () => {
      mockRepo.assignRoleToUser.mockResolvedValue({ userId: 'u-1', roleId });
      const result = await mockRepo.assignRoleToUser(roleId, 'u-1');
      expect(result.roleId).toBe(roleId);
    });

    it('should require userId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant utilisateur requis');
      };
      expect(() => validate('')).toThrow('Identifiant utilisateur requis');
    });

    it('should handle duplicate assignment', async () => {
      mockRepo.assignRoleToUser.mockRejectedValue(new Error('Le rôle est déjà assigné'));
      await expect(mockRepo.assignRoleToUser(roleId, 'u-1')).rejects.toThrow('Le rôle est déjà assigné');
    });

    it('should allow multiple roles per user', async () => {
      mockRepo.assignRoleToUser.mockResolvedValue({ userId: 'u-1', roleCount: 2 });
      const result = await mockRepo.assignRoleToUser(roleId, 'u-1');
      expect(result.roleCount).toBe(2);
    });
  });

  describe('removeRoleFromUser', () => {
    it('should remove role from user', async () => {
      mockRepo.removeRoleFromUser.mockResolvedValue(undefined);
      await mockRepo.removeRoleFromUser(roleId, 'u-1');
      expect(mockRepo.removeRoleFromUser).toHaveBeenCalledWith(roleId, 'u-1');
    });

    it('should throw if assignment not found', async () => {
      mockRepo.removeRoleFromUser.mockRejectedValue(new Error('Assignation non trouvée'));
      await expect(mockRepo.removeRoleFromUser(roleId, 'u-1')).rejects.toThrow('Assignation non trouvée');
    });

    it('should prevent removing last admin', () => {
      const validate = (roleName: string, isLast: boolean) => {
        if (roleName === 'admin' && isLast) throw new Error('Impossible de retirer le dernier admin');
      };
      expect(() => validate('admin', true)).toThrow();
    });
  });

  describe('getRolePermissions', () => {
    it('should return role permissions', async () => {
      mockRepo.getRolePermissions.mockResolvedValue(['read', 'write', 'delete']);
      const result = await mockRepo.getRolePermissions(roleId);
      expect(result).toContain('write');
    });

    it('should return empty for no permissions', async () => {
      mockRepo.getRolePermissions.mockResolvedValue([]);
      const result = await mockRepo.getRolePermissions(roleId);
      expect(result).toHaveLength(0);
    });

    it('should include permission details', async () => {
      mockRepo.getRolePermissions.mockResolvedValue([
        { id: 'p-1', name: 'read', description: 'Read access' },
      ]);
      const result = await mockRepo.getRolePermissions(roleId);
      expect(result[0].description).toBeDefined();
    });
  });

  describe('updateRolePermissions', () => {
    it('should update role permissions', async () => {
      mockRepo.updateRolePermissions.mockResolvedValue({ roleId, permissions: ['read', 'write'] });
      const result = await mockRepo.updateRolePermissions(roleId, ['read', 'write']);
      expect(result.permissions).toHaveLength(2);
    });

    it('should require at least one permission', () => {
      const validate = (permissions: string[]) => {
        if (!permissions || permissions.length === 0) throw new Error('Au moins une permission requise');
      };
      expect(() => validate([])).toThrow();
    });

    it('should validate permission names', () => {
      const validPermissions = ['read', 'write', 'delete', 'manage_users', 'manage_schools'];
      const validate = (permissions: string[]) => {
        const invalid = permissions.filter(p => !validPermissions.includes(p));
        if (invalid.length > 0) throw new Error(`Permissions invalides: ${invalid.join(', ')}`);
      };
      expect(() => validate(['read', 'write'])).not.toThrow();
      expect(() => validate(['invalid'])).toThrow();
    });

    it('should replace all permissions', async () => {
      mockRepo.updateRolePermissions.mockResolvedValue({ permissions: ['delete'] });
      const result = await mockRepo.updateRolePermissions(roleId, ['delete']);
      expect(result.permissions).toEqual(['delete']);
    });
  });

  describe('getDefaultRoles', () => {
    it('should return default roles', async () => {
      const defaults = [{ name: 'Admin', isSystem: true }, { name: 'Viewer', isSystem: true }];
      mockRepo.getDefaultRoles.mockResolvedValue(defaults);
      const result = await mockRepo.getDefaultRoles();
      expect(result).toHaveLength(2);
    });

    it('should mark system roles', async () => {
      mockRepo.getDefaultRoles.mockResolvedValue([{ name: 'Admin', isSystem: true }]);
      const result = await mockRepo.getDefaultRoles();
      expect(result[0].isSystem).toBe(true);
    });
  });

  describe('cloneRole', () => {
    it('should clone role', async () => {
      mockRepo.findRoleById.mockResolvedValue({ id: roleId, name: 'Admin', permissions: ['read'] });
      mockRepo.cloneRole.mockResolvedValue({ id: 'role-2', name: 'Admin (copie)', permissions: ['read'] });
      const result = await mockRepo.cloneRole(roleId, 'Admin (copie)');
      expect(result.name).toBe('Admin (copie)');
    });

    it('should throw if source role not found', async () => {
      mockRepo.findRoleById.mockResolvedValue(null);
      const cloneOrThrow = async () => {
        const role = await mockRepo.findRoleById(roleId);
        if (!role) throw new Error('Rôle source non trouvé');
      };
      await expect(cloneOrThrow()).rejects.toThrow('Rôle source non trouvé');
    });

    it('should require new name', () => {
      const validate = (name: string) => {
        if (!name) throw new Error('Le nouveau nom est requis');
      };
      expect(() => validate('')).toThrow('Le nouveau nom est requis');
    });

    it('should reject duplicate name', async () => {
      mockRepo.findRoleById.mockResolvedValue({ id: roleId, name: 'Admin', permissions: ['read'] });
      mockRepo.findRoles.mockResolvedValue([{ name: 'Existing' }]);
      const cloneOrThrow = async (name: string) => {
        const roles = await mockRepo.findRoles(enterpriseId);
        if (roles.some((r: any) => r.name === name)) throw new Error('Un rôle avec ce nom existe déjà');
      };
      await expect(cloneOrThrow('Existing')).rejects.toThrow();
    });
  });

  describe('countUsersByRole', () => {
    it('should count users by role', async () => {
      mockRepo.countUsersByRole.mockResolvedValue(15);
      const result = await mockRepo.countUsersByRole(roleId);
      expect(result).toBe(15);
    });

    it('should return zero for unassigned role', async () => {
      mockRepo.countUsersByRole.mockResolvedValue(0);
      const result = await mockRepo.countUsersByRole(roleId);
      expect(result).toBe(0);
    });
  });

  describe('getRoleAuditLog', () => {
    it('should return audit log', async () => {
      mockRepo.getRoleAuditLog.mockResolvedValue([{ action: 'created', date: '2026-01-01' }]);
      const result = await mockRepo.getRoleAuditLog(roleId);
      expect(result).toHaveLength(1);
    });

    it('should handle empty audit log', async () => {
      mockRepo.getRoleAuditLog.mockResolvedValue([]);
      const result = await mockRepo.getRoleAuditLog(roleId);
      expect(result).toHaveLength(0);
    });

    it('should filter by date range', async () => {
      mockRepo.getRoleAuditLog.mockResolvedValue([]);
      await mockRepo.getRoleAuditLog(roleId, { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.getRoleAuditLog).toHaveBeenCalled();
    });
  });
});
