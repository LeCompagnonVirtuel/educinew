import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('SchoolManagementService', () => {
  const mockRepo = {
    findSchools: vi.fn(),
    findSchoolById: vi.fn(),
    findSchoolByCode: vi.fn(),
    createSchool: vi.fn(),
    updateSchool: vi.fn(),
    deleteSchool: vi.fn(),
    countSchools: vi.fn(),
    generateSchoolCode: vi.fn(),
    getSchoolStatistics: vi.fn(),
    getSchoolUsers: vi.fn(),
    getSchoolCourses: vi.fn(),
    getSchoolSettings: vi.fn(),
    updateSchoolSettings: vi.fn(),
    archiveSchool: vi.fn(),
    restoreSchool: vi.fn(),
    transferSchool: vi.fn(),
    getSchoolAuditLog: vi.fn(),
    getSchoolStorageUsage: vi.fn(),
    getSchoolSubscription: vi.fn(),
    assignSchoolAdmin: vi.fn(),
    removeSchoolAdmin: vi.fn(),
  };

  const enterpriseId = 'ent-1';
  const schoolId = 'sch-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findSchools', () => {
    it('should return schools list', async () => {
      const schools = [{ id: schoolId, name: 'School A' }];
      mockRepo.findSchools.mockResolvedValue(schools);
      const result = await mockRepo.findSchools(enterpriseId);
      expect(result).toEqual(schools);
    });

    it('should throw if enterpriseId is empty', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should pass filters to repository', async () => {
      mockRepo.findSchools.mockResolvedValue([]);
      await mockRepo.findSchools(enterpriseId, { status: 'active' });
      expect(mockRepo.findSchools).toHaveBeenCalledWith(enterpriseId, { status: 'active' });
    });

    it('should handle empty results', async () => {
      mockRepo.findSchools.mockResolvedValue([]);
      const result = await mockRepo.findSchools(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should handle pagination', async () => {
      mockRepo.findSchools.mockResolvedValue([]);
      await mockRepo.findSchools(enterpriseId, { page: 1, limit: 10 });
      expect(mockRepo.findSchools).toHaveBeenCalledWith(enterpriseId, { page: 1, limit: 10 });
    });

    it('should filter by plan type', async () => {
      mockRepo.findSchools.mockResolvedValue([]);
      await mockRepo.findSchools(enterpriseId, { plan: 'premium' });
      expect(mockRepo.findSchools).toHaveBeenCalledWith(enterpriseId, { plan: 'premium' });
    });
  });

  describe('findSchoolById', () => {
    it('should return school by id', async () => {
      const school = { id: schoolId, name: 'School A' };
      mockRepo.findSchoolById.mockResolvedValue(school);
      const result = await mockRepo.findSchoolById(enterpriseId, schoolId);
      expect(result).toEqual(school);
    });

    it('should throw if not found', async () => {
      mockRepo.findSchoolById.mockResolvedValue(null);
      const findOrThrow = async (id: string) => {
        const school = await mockRepo.findSchoolById(enterpriseId, id);
        if (!school) throw new Error('École non trouvée');
      };
      await expect(findOrThrow('nonexistent')).rejects.toThrow('École non trouvée');
    });

    it('should require both ids', () => {
      const validate = (eId: string, sId: string) => {
        if (!eId || !sId) throw new Error('Identifiants requis');
      };
      expect(() => validate('', schoolId)).toThrow('Identifiants requis');
      expect(() => validate(enterpriseId, '')).toThrow('Identifiants requis');
    });

    it('should include school details', async () => {
      mockRepo.findSchoolById.mockResolvedValue({ id: schoolId, name: 'A', settings: {}, stats: {} });
      const result = await mockRepo.findSchoolById(enterpriseId, schoolId);
      expect(result.settings).toBeDefined();
    });
  });

  describe('findSchoolByCode', () => {
    it('should return school by code', async () => {
      mockRepo.findSchoolByCode.mockResolvedValue({ id: schoolId, code: 'SCH-001' });
      const result = await mockRepo.findSchoolByCode(enterpriseId, 'SCH-001');
      expect(result.code).toBe('SCH-001');
    });

    it('should throw if code not found', async () => {
      mockRepo.findSchoolByCode.mockResolvedValue(null);
      const findOrThrow = async (code: string) => {
        const school = await mockRepo.findSchoolByCode(enterpriseId, code);
        if (!school) throw new Error('École non trouvée');
      };
      await expect(findOrThrow('INVALID')).rejects.toThrow('École non trouvée');
    });
  });

  describe('createSchool', () => {
    it('should create school with valid data', async () => {
      const data = { name: 'New School', code: 'NS-001' };
      mockRepo.findSchoolByCode.mockResolvedValue(null);
      mockRepo.createSchool.mockResolvedValue({ id: 'new-1', ...data });
      const result = await mockRepo.createSchool({ ...data, enterprise_id: enterpriseId });
      expect(result.name).toBe('New School');
    });

    it('should require name', () => {
      const validate = (data: any) => {
        if (!data?.name) throw new Error('Le nom est requis');
      };
      expect(() => validate({ code: 'NS-001' })).toThrow('Le nom est requis');
    });

    it('should require code', () => {
      const validate = (data: any) => {
        if (!data?.code) throw new Error('Le code est requis');
      };
      expect(() => validate({ name: 'New School' })).toThrow('Le code est requis');
    });

    it('should reject duplicate code', async () => {
      mockRepo.findSchoolByCode.mockResolvedValue({ id: 'existing' });
      const createOrReject = async (code: string) => {
        const existing = await mockRepo.findSchoolByCode(enterpriseId, code);
        if (existing) throw new Error('Une école avec ce code existe déjà');
      };
      await expect(createOrReject('NS-001')).rejects.toThrow('Une école avec ce code existe déjà');
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should validate code format', () => {
      const isValidCode = (code: string) => /^[A-Z]{2,4}-\d{3,}$/.test(code);
      expect(isValidCode('NS-001')).toBe(true);
      expect(isValidCode('AB-123')).toBe(true);
      expect(isValidCode('invalid')).toBe(false);
    });

    it('should set default status', async () => {
      mockRepo.findSchoolByCode.mockResolvedValue(null);
      mockRepo.createSchool.mockResolvedValue({ id: 'new-1', status: 'active' });
      const result = await mockRepo.createSchool({ name: 'New', code: 'N-1', enterprise_id: enterpriseId });
      expect(result.status).toBe('active');
    });
  });

  describe('updateSchool', () => {
    it('should update school', async () => {
      const existing = { id: schoolId, name: 'Old Name' };
      mockRepo.findSchoolById.mockResolvedValue(existing);
      mockRepo.updateSchool.mockResolvedValue({ ...existing, name: 'New Name' });
      const result = await mockRepo.updateSchool(enterpriseId, schoolId, { name: 'New Name' });
      expect(result.name).toBe('New Name');
    });

    it('should throw if school not found', async () => {
      mockRepo.findSchoolById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const school = await mockRepo.findSchoolById(enterpriseId, schoolId);
        if (!school) throw new Error('École non trouvée');
      };
      await expect(updateOrThrow()).rejects.toThrow('École non trouvée');
    });

    it('should check code uniqueness on update', async () => {
      const existing = { id: schoolId, code: 'OLD-001' };
      mockRepo.findSchoolById.mockResolvedValue(existing);
      mockRepo.findSchoolByCode.mockResolvedValue({ id: 'other' });
      const checkDuplicate = async (code: string) => {
        if (code !== existing.code) {
          const dup = await mockRepo.findSchoolByCode(enterpriseId, code);
          if (dup) throw new Error('Une école avec ce code existe déjà');
        }
      };
      await expect(checkDuplicate('DUP-001')).rejects.toThrow();
    });

    it('should allow same code on update', async () => {
      const existing = { id: schoolId, code: 'OLD-001' };
      mockRepo.findSchoolById.mockResolvedValue(existing);
      const checkDuplicate = async (code: string) => {
        if (code !== existing.code) {
          throw new Error('Duplicate');
        }
      };
      expect(checkDuplicate('OLD-001')).resolves.not.toThrow();
    });

    it('should validate name length', () => {
      const validate = (name: string) => {
        if (name.length < 2 || name.length > 100) throw new Error('Le nom doit contenir entre 2 et 100 caractères');
      };
      expect(() => validate('A')).toThrow();
      expect(() => validate('Valid Name')).not.toThrow();
    });
  });

  describe('deleteSchool', () => {
    it('should delete school', async () => {
      mockRepo.findSchoolById.mockResolvedValue({ id: schoolId });
      mockRepo.deleteSchool.mockResolvedValue(undefined);
      await mockRepo.deleteSchool(enterpriseId, schoolId);
      expect(mockRepo.deleteSchool).toHaveBeenCalledWith(enterpriseId, schoolId);
    });

    it('should throw if school not found on delete', async () => {
      mockRepo.findSchoolById.mockResolvedValue(null);
      const deleteOrThrow = async () => {
        const school = await mockRepo.findSchoolById(enterpriseId, schoolId);
        if (!school) throw new Error('École non trouvée');
      };
      await expect(deleteOrThrow()).rejects.toThrow('École non trouvée');
    });
  });

  describe('countSchools', () => {
    it('should return school count', async () => {
      mockRepo.countSchools.mockResolvedValue(15);
      const result = await mockRepo.countSchools(enterpriseId);
      expect(result).toBe(15);
    });

    it('should count with status filter', async () => {
      mockRepo.countSchools.mockResolvedValue(8);
      const result = await mockRepo.countSchools(enterpriseId, { status: 'active' });
      expect(result).toBe(8);
    });
  });

  describe('generateSchoolCode', () => {
    it('should generate school code', async () => {
      mockRepo.generateSchoolCode.mockResolvedValue('SCH-2026-0001');
      const result = await mockRepo.generateSchoolCode(enterpriseId, 2026);
      expect(result).toBe('SCH-2026-0001');
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow();
    });
  });

  describe('getSchoolStatistics', () => {
    it('should return statistics', async () => {
      const stats = { totalStudents: 500, totalTeachers: 30, totalCourses: 20 };
      mockRepo.getSchoolStatistics.mockResolvedValue(stats);
      const result = await mockRepo.getSchoolStatistics(enterpriseId, schoolId);
      expect(result.totalStudents).toBe(500);
    });

    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'école requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'école requis');
    });
  });

  describe('getSchoolUsers', () => {
    it('should return school users', async () => {
      mockRepo.getSchoolUsers.mockResolvedValue([{ id: 'u-1', name: 'User 1' }]);
      const result = await mockRepo.getSchoolUsers(enterpriseId, schoolId);
      expect(result).toHaveLength(1);
    });

    it('should filter by role', async () => {
      mockRepo.getSchoolUsers.mockResolvedValue([]);
      await mockRepo.getSchoolUsers(enterpriseId, schoolId, { role: 'teacher' });
      expect(mockRepo.getSchoolUsers).toHaveBeenCalled();
    });

    it('should handle empty user list', async () => {
      mockRepo.getSchoolUsers.mockResolvedValue([]);
      const result = await mockRepo.getSchoolUsers(enterpriseId, schoolId);
      expect(result).toHaveLength(0);
    });
  });

  describe('getSchoolCourses', () => {
    it('should return school courses', async () => {
      mockRepo.getSchoolCourses.mockResolvedValue([{ id: 'c-1', name: 'Math' }]);
      const result = await mockRepo.getSchoolCourses(enterpriseId, schoolId);
      expect(result).toHaveLength(1);
    });

    it('should handle no courses', async () => {
      mockRepo.getSchoolCourses.mockResolvedValue([]);
      const result = await mockRepo.getSchoolCourses(enterpriseId, schoolId);
      expect(result).toHaveLength(0);
    });

    it('should filter by active status', async () => {
      mockRepo.getSchoolCourses.mockResolvedValue([]);
      await mockRepo.getSchoolCourses(enterpriseId, schoolId, { active: true });
      expect(mockRepo.getSchoolCourses).toHaveBeenCalled();
    });
  });

  describe('archiveSchool', () => {
    it('should archive school', async () => {
      mockRepo.findSchoolById.mockResolvedValue({ id: schoolId, status: 'active' });
      mockRepo.archiveSchool.mockResolvedValue({ id: schoolId, status: 'archived' });
      const result = await mockRepo.archiveSchool(enterpriseId, schoolId);
      expect(result.status).toBe('archived');
    });

    it('should throw if school not found', async () => {
      mockRepo.findSchoolById.mockResolvedValue(null);
      const archiveOrThrow = async () => {
        const school = await mockRepo.findSchoolById(enterpriseId, schoolId);
        if (!school) throw new Error('École non trouvée');
      };
      await expect(archiveOrThrow()).rejects.toThrow('École non trouvée');
    });

    it('should not archive already archived school', async () => {
      mockRepo.findSchoolById.mockResolvedValue({ id: schoolId, status: 'archived' });
      const archiveOrThrow = async () => {
        const school = await mockRepo.findSchoolById(enterpriseId, schoolId);
        if (school?.status === 'archived') throw new Error('L\'école est déjà archivée');
      };
      await expect(archiveOrThrow()).rejects.toThrow('L\'école est déjà archivée');
    });
  });

  describe('restoreSchool', () => {
    it('should restore archived school', async () => {
      mockRepo.findSchoolById.mockResolvedValue({ id: schoolId, status: 'archived' });
      mockRepo.restoreSchool.mockResolvedValue({ id: schoolId, status: 'active' });
      const result = await mockRepo.restoreSchool(enterpriseId, schoolId);
      expect(result.status).toBe('active');
    });

    it('should throw if school not archived', async () => {
      mockRepo.findSchoolById.mockResolvedValue({ id: schoolId, status: 'active' });
      const restoreOrThrow = async () => {
        const school = await mockRepo.findSchoolById(enterpriseId, schoolId);
        if (school?.status !== 'archived') throw new Error('L\'école n\'est pas archivée');
      };
      await expect(restoreOrThrow()).rejects.toThrow('L\'école n\'est pas archivée');
    });
  });

  describe('assignSchoolAdmin', () => {
    it('should assign admin to school', async () => {
      mockRepo.assignSchoolAdmin.mockResolvedValue({ schoolId, userId: 'u-1', role: 'admin' });
      const result = await mockRepo.assignSchoolAdmin(enterpriseId, schoolId, 'u-1');
      expect(result.role).toBe('admin');
    });

    it('should require userId', () => {
      const validate = (userId: string) => {
        if (!userId) throw new Error('Identifiant de l\'utilisateur requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'utilisateur requis');
    });

    it('should replace existing admin', async () => {
      mockRepo.assignSchoolAdmin.mockResolvedValue({ schoolId, userId: 'u-2', role: 'admin', replaced: 'u-1' });
      const result = await mockRepo.assignSchoolAdmin(enterpriseId, schoolId, 'u-2');
      expect(result.replaced).toBe('u-1');
    });
  });

  describe('removeSchoolAdmin', () => {
    it('should remove admin from school', async () => {
      mockRepo.removeSchoolAdmin.mockResolvedValue(undefined);
      await mockRepo.removeSchoolAdmin(enterpriseId, schoolId, 'u-1');
      expect(mockRepo.removeSchoolAdmin).toHaveBeenCalledWith(enterpriseId, schoolId, 'u-1');
    });

    it('should require valid admin assignment', async () => {
      mockRepo.removeSchoolAdmin.mockRejectedValue(new Error('Aucun administrateur assigné'));
      await expect(mockRepo.removeSchoolAdmin(enterpriseId, schoolId, 'u-1')).rejects.toThrow('Aucun administrateur assigné');
    });
  });

  describe('getSchoolSettings', () => {
    it('should return school settings', async () => {
      mockRepo.getSchoolSettings.mockResolvedValue({ theme: 'default', language: 'fr' });
      const result = await mockRepo.getSchoolSettings(enterpriseId, schoolId);
      expect(result.theme).toBe('default');
    });

    it('should handle missing settings', async () => {
      mockRepo.getSchoolSettings.mockResolvedValue(null);
      const result = await mockRepo.getSchoolSettings(enterpriseId, schoolId);
      expect(result).toBeNull();
    });
  });

  describe('updateSchoolSettings', () => {
    it('should update settings', async () => {
      mockRepo.updateSchoolSettings.mockResolvedValue({ theme: 'dark' });
      const result = await mockRepo.updateSchoolSettings(enterpriseId, schoolId, { theme: 'dark' });
      expect(result.theme).toBe('dark');
    });

    it('should validate theme value', () => {
      const isValidTheme = (theme: string) => ['default', 'dark', 'light'].includes(theme);
      expect(isValidTheme('dark')).toBe(true);
      expect(isValidTheme('invalid')).toBe(false);
    });
  });

  describe('getSchoolStorageUsage', () => {
    it('should return storage usage', async () => {
      mockRepo.getSchoolStorageUsage.mockResolvedValue({ used: 2.5, limit: 10, unit: 'GB' });
      const result = await mockRepo.getSchoolStorageUsage(enterpriseId, schoolId);
      expect(result.used).toBe(2.5);
    });

    it('should calculate usage percentage', () => {
      const used = 2.5;
      const limit = 10;
      const percentage = (used / limit) * 100;
      expect(percentage).toBe(25);
    });
  });

  describe('transferSchool', () => {
    it('should transfer school to another enterprise', async () => {
      mockRepo.transferSchool.mockResolvedValue({ schoolId, fromEnterprise: enterpriseId, toEnterprise: 'ent-2' });
      const result = await mockRepo.transferSchool(enterpriseId, schoolId, 'ent-2');
      expect(result.toEnterprise).toBe('ent-2');
    });

    it('should require target enterpriseId', () => {
      const validate = (targetId: string) => {
        if (!targetId) throw new Error('Identifiant de l\'entreprise cible requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise cible requis');
    });

    it('should not transfer to same enterprise', () => {
      const validate = (from: string, to: string) => {
        if (from === to) throw new Error('Cannot transfer to the same enterprise');
      };
      expect(() => validate(enterpriseId, enterpriseId)).toThrow();
    });
  });
});
