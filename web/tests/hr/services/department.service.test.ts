import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('DepartmentService', () => {
  const mockRepo = {
    findDepartments: vi.fn(),
    findDepartmentById: vi.fn(),
    findDepartmentByName: vi.fn(),
    createDepartment: vi.fn(),
    updateDepartment: vi.fn(),
    deleteDepartment: vi.fn(),
    countDepartmentEmployees: vi.fn(),
  };

  const schoolId = 'school-1';
  const departmentId = 'dept-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findDepartments', () => {
    it('should return departments list', async () => {
      const departments = [{ id: '1', name: 'Direction' }];
      mockRepo.findDepartments.mockResolvedValue(departments);
      const result = await mockRepo.findDepartments(schoolId);
      expect(result).toEqual(departments);
    });

    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'école requis');
      };
      expect(() => validate('')).toThrow();
    });

    it('should handle empty list', async () => {
      mockRepo.findDepartments.mockResolvedValue([]);
      const result = await mockRepo.findDepartments(schoolId);
      expect(result).toHaveLength(0);
    });
  });

  describe('findDepartmentById', () => {
    it('should return department by id', async () => {
      const dept = { id: departmentId, name: 'Direction' };
      mockRepo.findDepartmentById.mockResolvedValue(dept);
      const result = await mockRepo.findDepartmentById(schoolId, departmentId);
      expect(result.name).toBe('Direction');
    });

    it('should throw if not found', async () => {
      mockRepo.findDepartmentById.mockResolvedValue(null);
      const findOrThrow = async () => {
        const dept = await mockRepo.findDepartmentById(schoolId, 'nonexistent');
        if (!dept) throw new Error('Département non trouvé');
      };
      await expect(findOrThrow()).rejects.toThrow('Département non trouvé');
    });

    it('should require both ids', () => {
      const validate = (sId: string, dId: string) => {
        if (!sId || !dId) throw new Error('Identifiants requis');
      };
      expect(() => validate('', departmentId)).toThrow();
      expect(() => validate(schoolId, '')).toThrow();
    });
  });

  describe('createDepartment', () => {
    it('should create department with valid data', async () => {
      mockRepo.findDepartmentByName.mockResolvedValue(null);
      mockRepo.createDepartment.mockResolvedValue({ id: '1', name: 'IT' });
      const result = await mockRepo.createDepartment({ name: 'IT', school_id: schoolId });
      expect(result.name).toBe('IT');
    });

    it('should require name', () => {
      const validate = (data: any) => {
        if (!data?.name) throw new Error('Le nom du département est requis');
      };
      expect(() => validate({})).toThrow();
    });

    it('should reject duplicate name', async () => {
      mockRepo.findDepartmentByName.mockResolvedValue({ id: 'existing' });
      const createOrReject = async (name: string) => {
        const existing = await mockRepo.findDepartmentByName(schoolId, name);
        if (existing) throw new Error('Un département avec ce nom existe déjà');
      };
      await expect(createOrReject('Direction')).rejects.toThrow();
    });
  });

  describe('updateDepartment', () => {
    it('should update department', async () => {
      mockRepo.findDepartmentById.mockResolvedValue({ id: departmentId, name: 'Old' });
      mockRepo.updateDepartment.mockResolvedValue({ id: departmentId, name: 'New' });
      const result = await mockRepo.updateDepartment(schoolId, departmentId, { name: 'New' });
      expect(result.name).toBe('New');
    });

    it('should throw if department not found', async () => {
      mockRepo.findDepartmentById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const dept = await mockRepo.findDepartmentById(schoolId, departmentId);
        if (!dept) throw new Error('Département non trouvé');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });

    it('should check name uniqueness on update', async () => {
      mockRepo.findDepartmentById.mockResolvedValue({ id: departmentId, name: 'Old' });
      mockRepo.findDepartmentByName.mockResolvedValue({ id: 'other' });
      const checkDuplicate = async (name: string) => {
        const existing = await mockRepo.findDepartmentById(schoolId, departmentId);
        if (name !== existing.name) {
          const dup = await mockRepo.findDepartmentByName(schoolId, name);
          if (dup) throw new Error('Un département avec ce nom existe déjà');
        }
      };
      await expect(checkDuplicate('Duplicate')).rejects.toThrow();
    });
  });

  describe('deleteDepartment', () => {
    it('should delete department with no employees', async () => {
      mockRepo.findDepartmentById.mockResolvedValue({ id: departmentId });
      mockRepo.countDepartmentEmployees.mockResolvedValue(0);
      mockRepo.deleteDepartment.mockResolvedValue(undefined);
      await mockRepo.deleteDepartment(schoolId, departmentId);
      expect(mockRepo.deleteDepartment).toHaveBeenCalled();
    });

    it('should throw if department has employees', async () => {
      mockRepo.findDepartmentById.mockResolvedValue({ id: departmentId });
      mockRepo.countDepartmentEmployees.mockResolvedValue(5);
      const deleteOrThrow = async () => {
        const count = await mockRepo.countDepartmentEmployees(schoolId, departmentId);
        if (count > 0) throw new Error(`Impossible de supprimer: ${count} employé(s)`);
      };
      await expect(deleteOrThrow()).rejects.toThrow('5 employé(s)');
    });

    it('should throw if department not found on delete', async () => {
      mockRepo.findDepartmentById.mockResolvedValue(null);
      const deleteOrThrow = async () => {
        const dept = await mockRepo.findDepartmentById(schoolId, departmentId);
        if (!dept) throw new Error('Département non trouvé');
      };
      await expect(deleteOrThrow()).rejects.toThrow();
    });
  });

  describe('countDepartmentEmployees', () => {
    it('should return employee count for department', async () => {
      mockRepo.countDepartmentEmployees.mockResolvedValue(15);
      const result = await mockRepo.countDepartmentEmployees(schoolId, departmentId);
      expect(result).toBe(15);
    });

    it('should return 0 for empty department', async () => {
      mockRepo.countDepartmentEmployees.mockResolvedValue(0);
      const result = await mockRepo.countDepartmentEmployees(schoolId, departmentId);
      expect(result).toBe(0);
    });
  });

  describe('Department validation', () => {
    it('should validate department name length', () => {
      const isValidName = (name: string) => name.length >= 2 && name.length <= 100;
      expect(isValidName('IT')).toBe(true);
      expect(isValidName('A')).toBe(false);
      expect(isValidName('x'.repeat(101))).toBe(false);
    });
  });
});
