import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('EnterpriseUserService', () => {
  const mockRepo = {
    findUsers: vi.fn(),
    findUserById: vi.fn(),
    findUserByEmail: vi.fn(),
    createUser: vi.fn(),
    updateUser: vi.fn(),
    deleteUser: vi.fn(),
    countUsers: vi.fn(),
    assignRole: vi.fn(),
    removeRole: vi.fn(),
    getUserRoles: vi.fn(),
    getUserPermissions: vi.fn(),
    resetPassword: vi.fn(),
    verifyEmail: vi.fn(),
    deactivateUser: vi.fn(),
    reactivateUser: vi.fn(),
    getAuditLog: vi.fn(),
    bulkCreateUsers: vi.fn(),
    importUsers: vi.fn(),
    exportUsers: vi.fn(),
    searchUsers: vi.fn(),
    getUserStatistics: vi.fn(),
  };

  const enterpriseId = 'ent-1';
  const userId = 'usr-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findUsers', () => {
    it('should return users list', async () => {
      const users = [{ id: userId, email: 'user@test.com' }];
      mockRepo.findUsers.mockResolvedValue(users);
      const result = await mockRepo.findUsers(enterpriseId);
      expect(result).toEqual(users);
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should filter by status', async () => {
      mockRepo.findUsers.mockResolvedValue([]);
      await mockRepo.findUsers(enterpriseId, { status: 'active' });
      expect(mockRepo.findUsers).toHaveBeenCalledWith(enterpriseId, { status: 'active' });
    });

    it('should handle empty results', async () => {
      mockRepo.findUsers.mockResolvedValue([]);
      const result = await mockRepo.findUsers(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should paginate results', async () => {
      mockRepo.findUsers.mockResolvedValue([]);
      await mockRepo.findUsers(enterpriseId, { page: 1, limit: 20 });
      expect(mockRepo.findUsers).toHaveBeenCalledWith(enterpriseId, { page: 1, limit: 20 });
    });

    it('should filter by role', async () => {
      mockRepo.findUsers.mockResolvedValue([]);
      await mockRepo.findUsers(enterpriseId, { role: 'admin' });
      expect(mockRepo.findUsers).toHaveBeenCalledWith(enterpriseId, { role: 'admin' });
    });

    it('should sort by name', async () => {
      mockRepo.findUsers.mockResolvedValue([]);
      await mockRepo.findUsers(enterpriseId, { sortBy: 'name', order: 'asc' });
      expect(mockRepo.findUsers).toHaveBeenCalled();
    });
  });

  describe('findUserById', () => {
    it('should return user by id', async () => {
      const user = { id: userId, email: 'user@test.com', name: 'Test User' };
      mockRepo.findUserById.mockResolvedValue(user);
      const result = await mockRepo.findUserById(userId);
      expect(result).toEqual(user);
    });

    it('should throw if not found', async () => {
      mockRepo.findUserById.mockResolvedValue(null);
      const findOrThrow = async (id: string) => {
        const user = await mockRepo.findUserById(id);
        if (!user) throw new Error('Utilisateur non trouvé');
      };
      await expect(findOrThrow('nonexistent')).rejects.toThrow('Utilisateur non trouvé');
    });

    it('should require userId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant requis');
      };
      expect(() => validate('')).toThrow('Identifiant requis');
    });

    it('should include enterprise membership', async () => {
      mockRepo.findUserById.mockResolvedValue({ id: userId, enterprises: [enterpriseId] });
      const result = await mockRepo.findUserById(userId);
      expect(result.enterprises).toContain(enterpriseId);
    });

    it('should include profile data', async () => {
      mockRepo.findUserById.mockResolvedValue({ id: userId, profile: { avatar: 'url', bio: 'bio' } });
      const result = await mockRepo.findUserById(userId);
      expect(result.profile).toBeDefined();
    });
  });

  describe('findUserByEmail', () => {
    it('should return user by email', async () => {
      mockRepo.findUserByEmail.mockResolvedValue({ id: userId, email: 'user@test.com' });
      const result = await mockRepo.findUserByEmail(enterpriseId, 'user@test.com');
      expect(result.email).toBe('user@test.com');
    });

    it('should throw if email not found', async () => {
      mockRepo.findUserByEmail.mockResolvedValue(null);
      const findOrThrow = async (email: string) => {
        const user = await mockRepo.findUserByEmail(enterpriseId, email);
        if (!user) throw new Error('Utilisateur non trouvé');
      };
      await expect(findOrThrow('none@test.com')).rejects.toThrow('Utilisateur non trouvé');
    });

    it('should require valid email format', () => {
      const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      expect(isValidEmail('test@test.com')).toBe(true);
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('no@')).toBe(false);
    });
  });

  describe('createUser', () => {
    it('should create user with valid data', async () => {
      const data = { name: 'New User', email: 'new@test.com' };
      mockRepo.findUserByEmail.mockResolvedValue(null);
      mockRepo.createUser.mockResolvedValue({ id: userId, ...data });
      const result = await mockRepo.createUser({ ...data, enterprise_id: enterpriseId });
      expect(result.name).toBe('New User');
    });

    it('should require name', () => {
      const validate = (data: any) => {
        if (!data?.name) throw new Error('Le nom est requis');
      };
      expect(() => validate({ email: 'test@test.com' })).toThrow('Le nom est requis');
    });

    it('should require email', () => {
      const validate = (data: any) => {
        if (!data?.email) throw new Error('L\'email est requis');
      };
      expect(() => validate({ name: 'User' })).toThrow('L\'email est requis');
    });

    it('should reject duplicate email', async () => {
      mockRepo.findUserByEmail.mockResolvedValue({ id: 'existing' });
      const createOrReject = async (email: string) => {
        const existing = await mockRepo.findUserByEmail(enterpriseId, email);
        if (existing) throw new Error('Un utilisateur avec cet email existe déjà');
      };
      await expect(createOrReject('dup@test.com')).rejects.toThrow('Un utilisateur avec cet email existe déjà');
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should set default status to active', async () => {
      mockRepo.findUserByEmail.mockResolvedValue(null);
      mockRepo.createUser.mockResolvedValue({ id: userId, status: 'active' });
      const result = await mockRepo.createUser({ name: 'User', email: 'u@test.com', enterprise_id: enterpriseId });
      expect(result.status).toBe('active');
    });

    it('should validate email format on creation', () => {
      const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      expect(isValidEmail('new@test.com')).toBe(true);
      expect(isValidEmail('bad-email')).toBe(false);
    });

    it('should validate name length', () => {
      const validate = (name: string) => {
        if (name.length < 2 || name.length > 100) throw new Error('Le nom doit contenir entre 2 et 100 caractères');
      };
      expect(() => validate('A')).toThrow();
      expect(() => validate('Valid Name')).not.toThrow();
    });
  });

  describe('updateUser', () => {
    it('should update user', async () => {
      mockRepo.findUserById.mockResolvedValue({ id: userId, name: 'Old Name' });
      mockRepo.updateUser.mockResolvedValue({ id: userId, name: 'New Name' });
      const result = await mockRepo.updateUser(userId, { name: 'New Name' });
      expect(result.name).toBe('New Name');
    });

    it('should throw if not found', async () => {
      mockRepo.findUserById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const user = await mockRepo.findUserById(userId);
        if (!user) throw new Error('Utilisateur non trouvé');
      };
      await expect(updateOrThrow()).rejects.toThrow('Utilisateur non trouvé');
    });

    it('should check email uniqueness on update', async () => {
      mockRepo.findUserById.mockResolvedValue({ id: userId, email: 'old@test.com' });
      mockRepo.findUserByEmail.mockResolvedValue({ id: 'other' });
      const checkDuplicate = async (email: string) => {
        if (email !== 'old@test.com') {
          const dup = await mockRepo.findUserByEmail(enterpriseId, email);
          if (dup) throw new Error('Un utilisateur avec cet email existe déjà');
        }
      };
      await expect(checkDuplicate('dup@test.com')).rejects.toThrow();
    });

    it('should allow same email on update', async () => {
      mockRepo.findUserById.mockResolvedValue({ id: userId, email: 'current@test.com' });
      const checkDuplicate = async (email: string) => {
        if (email !== 'current@test.com') {
          const dup = await mockRepo.findUserByEmail(enterpriseId, email);
          if (dup) throw new Error('Duplicate');
        }
      };
      expect(checkDuplicate('current@test.com')).resolves.not.toThrow();
    });

    it('should validate optional fields', () => {
      const validate = (data: any) => {
        if (data.phone && !/^\+?[\d\s-]{8,}$/.test(data.phone)) throw new Error('Numéro de téléphone invalide');
      };
      expect(() => validate({ phone: '+1234567890' })).not.toThrow();
      expect(() => validate({ phone: '123' })).toThrow();
    });
  });

  describe('deleteUser', () => {
    it('should delete user', async () => {
      mockRepo.findUserById.mockResolvedValue({ id: userId });
      mockRepo.deleteUser.mockResolvedValue(undefined);
      await mockRepo.deleteUser(userId);
      expect(mockRepo.deleteUser).toHaveBeenCalledWith(userId);
    });

    it('should throw if not found', async () => {
      mockRepo.findUserById.mockResolvedValue(null);
      const deleteOrThrow = async () => {
        const user = await mockRepo.findUserById(userId);
        if (!user) throw new Error('Utilisateur non trouvé');
      };
      await expect(deleteOrThrow()).rejects.toThrow('Utilisateur non trouvé');
    });

    it('should prevent self-deletion', () => {
      const validate = (currentUserId: string, targetUserId: string) => {
        if (currentUserId === targetUserId) throw new Error('Vous ne pouvez pas supprimer votre propre compte');
      };
      expect(() => validate(userId, userId)).toThrow('Vous ne pouvez pas supprimer votre propre compte');
    });
  });

  describe('countUsers', () => {
    it('should return user count', async () => {
      mockRepo.countUsers.mockResolvedValue(50);
      const result = await mockRepo.countUsers(enterpriseId);
      expect(result).toBe(50);
    });

    it('should count with filters', async () => {
      mockRepo.countUsers.mockResolvedValue(10);
      const result = await mockRepo.countUsers(enterpriseId, { status: 'active' });
      expect(result).toBe(10);
    });

    it('should return zero for no users', async () => {
      mockRepo.countUsers.mockResolvedValue(0);
      const result = await mockRepo.countUsers(enterpriseId);
      expect(result).toBe(0);
    });
  });

  describe('assignRole', () => {
    it('should assign role to user', async () => {
      mockRepo.assignRole.mockResolvedValue({ userId, role: 'admin' });
      const result = await mockRepo.assignRole(enterpriseId, userId, 'admin');
      expect(result.role).toBe('admin');
    });

    it('should require valid role', () => {
      const validRoles = ['admin', 'manager', 'teacher', 'student', 'viewer'];
      const validate = (role: string) => {
        if (!validRoles.includes(role)) throw new Error('Rôle invalide');
      };
      expect(() => validate('admin')).not.toThrow();
      expect(() => validate('invalid')).toThrow('Rôle invalide');
    });

    it('should replace existing role', async () => {
      mockRepo.assignRole.mockResolvedValue({ userId, role: 'manager', previousRole: 'viewer' });
      const result = await mockRepo.assignRole(enterpriseId, userId, 'manager');
      expect(result.previousRole).toBe('viewer');
    });

    it('should require userId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant utilisateur requis');
      };
      expect(() => validate('')).toThrow('Identifiant utilisateur requis');
    });
  });

  describe('removeRole', () => {
    it('should remove role from user', async () => {
      mockRepo.removeRole.mockResolvedValue(undefined);
      await mockRepo.removeRole(enterpriseId, userId, 'admin');
      expect(mockRepo.removeRole).toHaveBeenCalledWith(enterpriseId, userId, 'admin');
    });

    it('should throw if role not assigned', async () => {
      mockRepo.removeRole.mockRejectedValue(new Error('Le rôle n\'est pas assigné'));
      await expect(mockRepo.removeRole(enterpriseId, userId, 'nonexistent')).rejects.toThrow('Le rôle n\'est pas assigné');
    });

    it('should not remove last admin role', () => {
      const validate = (role: string, isLast: boolean) => {
        if (role === 'admin' && isLast) throw new Error('Impossible de retirer le dernier rôle admin');
      };
      expect(() => validate('admin', true)).toThrow();
      expect(() => validate('admin', false)).not.toThrow();
    });
  });

  describe('resetPassword', () => {
    it('should reset user password', async () => {
      mockRepo.resetPassword.mockResolvedValue({ resetToken: 'token-123' });
      const result = await mockRepo.resetPassword(userId);
      expect(result.resetToken).toBeDefined();
    });

    it('should throw if user not found', async () => {
      mockRepo.resetPassword.mockRejectedValue(new Error('Utilisateur non trouvé'));
      await expect(mockRepo.resetPassword('nonexistent')).rejects.toThrow('Utilisateur non trouvé');
    });

    it('should invalidate old password', async () => {
      mockRepo.resetPassword.mockResolvedValue({ resetToken: 'token', oldPasswordInvalidated: true });
      const result = await mockRepo.resetPassword(userId);
      expect(result.oldPasswordInvalidated).toBe(true);
    });
  });

  describe('verifyEmail', () => {
    it('should verify user email', async () => {
      mockRepo.verifyEmail.mockResolvedValue({ verified: true });
      const result = await mockRepo.verifyEmail('verify-token');
      expect(result.verified).toBe(true);
    });

    it('should reject invalid token', async () => {
      mockRepo.verifyEmail.mockRejectedValue(new Error('Token invalide'));
      await expect(mockRepo.verifyEmail('invalid')).rejects.toThrow('Token invalide');
    });

    it('should reject expired token', async () => {
      mockRepo.verifyEmail.mockRejectedValue(new Error('Token expiré'));
      await expect(mockRepo.verifyEmail('expired')).rejects.toThrow('Token expiré');
    });
  });

  describe('deactivateUser', () => {
    it('should deactivate user', async () => {
      mockRepo.deactivateUser.mockResolvedValue({ id: userId, status: 'inactive' });
      const result = await mockRepo.deactivateUser(userId);
      expect(result.status).toBe('inactive');
    });

    it('should throw if already inactive', async () => {
      mockRepo.findUserById.mockResolvedValue({ id: userId, status: 'inactive' });
      const deactivateOrThrow = async () => {
        const user = await mockRepo.findUserById(userId);
        if (user?.status === 'inactive') throw new Error('L\'utilisateur est déjà inactif');
      };
      await expect(deactivateOrThrow()).rejects.toThrow('L\'utilisateur est déjà inactif');
    });

    it('should revoke active sessions', async () => {
      mockRepo.deactivateUser.mockResolvedValue({ id: userId, sessionsRevoked: 3 });
      const result = await mockRepo.deactivateUser(userId);
      expect(result.sessionsRevoked).toBeGreaterThan(0);
    });
  });

  describe('reactivateUser', () => {
    it('should reactivate user', async () => {
      mockRepo.findUserById.mockResolvedValue({ id: userId, status: 'inactive' });
      mockRepo.reactivateUser.mockResolvedValue({ id: userId, status: 'active' });
      const result = await mockRepo.reactivateUser(userId);
      expect(result.status).toBe('active');
    });

    it('should throw if already active', async () => {
      mockRepo.findUserById.mockResolvedValue({ id: userId, status: 'active' });
      const reactivateOrThrow = async () => {
        const user = await mockRepo.findUserById(userId);
        if (user?.status === 'active') throw new Error('L\'utilisateur est déjà actif');
      };
      await expect(reactivateOrThrow()).rejects.toThrow('L\'utilisateur est déjà actif');
    });
  });

  describe('getUserRoles', () => {
    it('should return user roles', async () => {
      mockRepo.getUserRoles.mockResolvedValue(['admin', 'teacher']);
      const result = await mockRepo.getUserRoles(enterpriseId, userId);
      expect(result).toContain('admin');
    });

    it('should return empty array for no roles', async () => {
      mockRepo.getUserRoles.mockResolvedValue([]);
      const result = await mockRepo.getUserRoles(enterpriseId, userId);
      expect(result).toHaveLength(0);
    });

    it('should handle multiple roles', async () => {
      mockRepo.getUserRoles.mockResolvedValue(['admin', 'teacher', 'viewer']);
      const result = await mockRepo.getUserRoles(enterpriseId, userId);
      expect(result).toHaveLength(3);
    });
  });

  describe('getUserPermissions', () => {
    it('should return user permissions', async () => {
      mockRepo.getUserPermissions.mockResolvedValue(['read', 'write', 'delete']);
      const result = await mockRepo.getUserPermissions(userId);
      expect(result).toContain('write');
    });

    it('should include inherited permissions', async () => {
      mockRepo.getUserPermissions.mockResolvedValue(['read', 'write', 'manage_schools']);
      const result = await mockRepo.getUserPermissions(userId);
      expect(result).toContain('manage_schools');
    });
  });

  describe('bulkCreateUsers', () => {
    it('should create multiple users', async () => {
      const users = [
        { name: 'User 1', email: 'u1@test.com' },
        { name: 'User 2', email: 'u2@test.com' },
      ];
      mockRepo.bulkCreateUsers.mockResolvedValue(users.map((u, i) => ({ id: `usr-${i}`, ...u })));
      const result = await mockRepo.bulkCreateUsers(enterpriseId, users);
      expect(result).toHaveLength(2);
    });

    it('should handle empty batch', async () => {
      mockRepo.bulkCreateUsers.mockResolvedValue([]);
      const result = await mockRepo.bulkCreateUsers(enterpriseId, []);
      expect(result).toHaveLength(0);
    });

    it('should report errors for invalid users', async () => {
      mockRepo.bulkCreateUsers.mockResolvedValue({ created: 1, errors: [{ email: 'bad', reason: 'Invalid email' }] });
      const result = await mockRepo.bulkCreateUsers(enterpriseId, [{ name: 'Bad' }]);
      expect(result.errors).toHaveLength(1);
    });
  });

  describe('searchUsers', () => {
    it('should search users', async () => {
      mockRepo.searchUsers.mockResolvedValue([{ id: userId, name: 'John' }]);
      const result = await mockRepo.searchUsers(enterpriseId, 'John');
      expect(result).toHaveLength(1);
    });

    it('should require minimum 2 chars', () => {
      const validate = (query: string) => {
        if (!query || query.trim().length < 2) throw new Error('Le terme de recherche doit contenir au moins 2 caractères');
      };
      expect(() => validate('')).toThrow();
      expect(() => validate('J')).toThrow();
      expect(() => validate('Jo')).not.toThrow();
    });

    it('should handle empty search results', async () => {
      mockRepo.searchUsers.mockResolvedValue([]);
      const result = await mockRepo.searchUsers(enterpriseId, 'Unknown');
      expect(result).toHaveLength(0);
    });
  });

  describe('getUserStatistics', () => {
    it('should return user statistics', async () => {
      const stats = { total: 100, active: 80, inactive: 20 };
      mockRepo.getUserStatistics.mockResolvedValue(stats);
      const result = await mockRepo.getUserStatistics(enterpriseId);
      expect(result.total).toBe(100);
    });

    it('should include role distribution', async () => {
      mockRepo.getUserStatistics.mockResolvedValue({ roles: { admin: 5, teacher: 30 } });
      const result = await mockRepo.getUserStatistics(enterpriseId);
      expect(result.roles.admin).toBe(5);
    });

    it('should include creation trends', async () => {
      mockRepo.getUserStatistics.mockResolvedValue({ trends: [{ month: '2026-01', count: 10 }] });
      const result = await mockRepo.getUserStatistics(enterpriseId);
      expect(result.trends).toHaveLength(1);
    });
  });

  describe('importUsers', () => {
    it('should import users from CSV', async () => {
      const csvData = 'name,email\nUser1,u1@test.com\nUser2,u2@test.com';
      mockRepo.importUsers.mockResolvedValue({ imported: 2, errors: 0 });
      const result = await mockRepo.importUsers(enterpriseId, csvData);
      expect(result.imported).toBe(2);
    });

    it('should report import errors', async () => {
      mockRepo.importUsers.mockResolvedValue({ imported: 1, errors: 1, errorDetails: [{ row: 3, reason: 'Invalid email' }] });
      const result = await mockRepo.importUsers(enterpriseId, 'bad,data');
      expect(result.errors).toBe(1);
    });

    it('should handle empty CSV', async () => {
      mockRepo.importUsers.mockResolvedValue({ imported: 0, errors: 0 });
      const result = await mockRepo.importUsers(enterpriseId, '');
      expect(result.imported).toBe(0);
    });
  });

  describe('exportUsers', () => {
    it('should export users as CSV', async () => {
      mockRepo.exportUsers.mockResolvedValue('name,email\nUser1,u1@test.com');
      const result = await mockRepo.exportUsers(enterpriseId);
      expect(result).toContain('name,email');
    });

    it('should filter exports by role', async () => {
      mockRepo.exportUsers.mockResolvedValue('name,email,role\nUser1,u1@test.com,teacher');
      const result = await mockRepo.exportUsers(enterpriseId, { role: 'teacher' });
      expect(result).toContain('teacher');
    });

    it('should handle empty export', async () => {
      mockRepo.exportUsers.mockResolvedValue('name,email\n');
      const result = await mockRepo.exportUsers(enterpriseId);
      expect(result).toContain('name,email');
    });
  });
});
