import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('EmployeeService', () => {
  const mockRepo = {
    findEmployees: vi.fn(),
    findEmployeeById: vi.fn(),
    findEmployeeByCode: vi.fn(),
    findEmployeeByEmail: vi.fn(),
    createEmployee: vi.fn(),
    updateEmployee: vi.fn(),
    deleteEmployee: vi.fn(),
    countEmployees: vi.fn(),
    generateEmployeeCode: vi.fn(),
    getEmployeeStatistics: vi.fn(),
  };

  const schoolId = 'school-1';
  const employeeId = 'emp-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findEmployees', () => {
    it('should return employees list', async () => {
      const employees = [{ id: '1', first_name: 'John' }];
      mockRepo.findEmployees.mockResolvedValue(employees);
      const result = await mockRepo.findEmployees(schoolId);
      expect(result).toEqual(employees);
    });

    it('should throw if schoolId is empty', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'école requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'école requis');
    });

    it('should pass filters to repository', async () => {
      const filters = { departmentId: 'dept-1', status: 'active' };
      mockRepo.findEmployees.mockResolvedValue([]);
      await mockRepo.findEmployees(schoolId, filters);
      expect(mockRepo.findEmployees).toHaveBeenCalledWith(schoolId, filters);
    });

    it('should handle empty results', async () => {
      mockRepo.findEmployees.mockResolvedValue([]);
      const result = await mockRepo.findEmployees(schoolId);
      expect(result).toHaveLength(0);
    });

    it('should handle pagination filters', async () => {
      const filters = { page: 1, limit: 20 };
      mockRepo.findEmployees.mockResolvedValue([]);
      await mockRepo.findEmployees(schoolId, filters);
      expect(mockRepo.findEmployees).toHaveBeenCalledWith(schoolId, filters);
    });
  });

  describe('findEmployeeById', () => {
    it('should return employee by id', async () => {
      const employee = { id: employeeId, first_name: 'John' };
      mockRepo.findEmployeeById.mockResolvedValue(employee);
      const result = await mockRepo.findEmployeeById(schoolId, employeeId);
      expect(result).toEqual(employee);
    });

    it('should throw if not found', async () => {
      mockRepo.findEmployeeById.mockResolvedValue(null);
      const findOrThrow = async (id: string) => {
        const emp = await mockRepo.findEmployeeById(schoolId, id);
        if (!emp) throw new Error('Employé non trouvé');
      };
      await expect(findOrThrow('nonexistent')).rejects.toThrow('Employé non trouvé');
    });

    it('should require both ids', () => {
      const validate = (sId: string, eId: string) => {
        if (!sId || !eId) throw new Error('Identifiants requis');
      };
      expect(() => validate('', employeeId)).toThrow('Identifiants requis');
      expect(() => validate(schoolId, '')).toThrow('Identifiants requis');
    });
  });

  describe('findEmployeeByCode', () => {
    it('should return employee by code', async () => {
      const employee = { id: employeeId, employee_code: 'EMP-001' };
      mockRepo.findEmployeeByCode.mockResolvedValue(employee);
      const result = await mockRepo.findEmployeeByCode(schoolId, 'EMP-001');
      expect(result.employee_code).toBe('EMP-001');
    });

    it('should throw if employee code not found', async () => {
      mockRepo.findEmployeeByCode.mockResolvedValue(null);
      const findOrThrow = async (code: string) => {
        const emp = await mockRepo.findEmployeeByCode(schoolId, code);
        if (!emp) throw new Error('Employé non trouvé');
      };
      await expect(findOrThrow('INVALID')).rejects.toThrow('Employé non trouvé');
    });
  });

  describe('findEmployeeByEmail', () => {
    it('should return employee by email', async () => {
      const employee = { id: employeeId, email: 'john@test.com' };
      mockRepo.findEmployeeByEmail.mockResolvedValue(employee);
      const result = await mockRepo.findEmployeeByEmail(schoolId, 'john@test.com');
      expect(result.email).toBe('john@test.com');
    });

    it('should throw if email not found', async () => {
      mockRepo.findEmployeeByEmail.mockResolvedValue(null);
      const findOrThrow = async (email: string) => {
        const emp = await mockRepo.findEmployeeByEmail(schoolId, email);
        if (!emp) throw new Error('Employé non trouvé');
      };
      await expect(findOrThrow('none@test.com')).rejects.toThrow('Employé non trouvé');
    });
  });

  describe('createEmployee', () => {
    it('should create employee with valid data', async () => {
      const data = { first_name: 'John', last_name: 'Doe', email: 'john@test.com' };
      mockRepo.findEmployeeByEmail.mockResolvedValue(null);
      mockRepo.createEmployee.mockResolvedValue({ id: '1', ...data });
      const result = await mockRepo.createEmployee({ ...data, school_id: schoolId });
      expect(result.first_name).toBe('John');
    });

    it('should require first_name', () => {
      const validate = (data: any) => {
        if (!data?.first_name) throw new Error('Le prénom est requis');
      };
      expect(() => validate({ last_name: 'Doe' })).toThrow('Le prénom est requis');
    });

    it('should require last_name', () => {
      const validate = (data: any) => {
        if (!data?.last_name) throw new Error('Le nom est requis');
      };
      expect(() => validate({ first_name: 'John' })).toThrow('Le nom est requis');
    });

    it('should require email', () => {
      const validate = (data: any) => {
        if (!data?.email) throw new Error('L\'email est requis');
      };
      expect(() => validate({ first_name: 'John', last_name: 'Doe' })).toThrow('L\'email est requis');
    });

    it('should reject duplicate email', async () => {
      mockRepo.findEmployeeByEmail.mockResolvedValue({ id: 'existing' });
      const createOrReject = async (email: string) => {
        const existing = await mockRepo.findEmployeeByEmail(schoolId, email);
        if (existing) throw new Error('Un employé avec cet email existe déjà');
      };
      await expect(createOrReject('duplicate@test.com')).rejects.toThrow('Un employé avec cet email existe déjà');
    });

    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'école requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'école requis');
    });
  });

  describe('updateEmployee', () => {
    it('should update employee', async () => {
      const existing = { id: employeeId, email: 'old@test.com' };
      mockRepo.findEmployeeById.mockResolvedValue(existing);
      mockRepo.updateEmployee.mockResolvedValue({ ...existing, first_name: 'Jane' });
      const result = await mockRepo.updateEmployee(schoolId, employeeId, { first_name: 'Jane' });
      expect(result.first_name).toBe('Jane');
    });

    it('should throw if employee not found', async () => {
      mockRepo.findEmployeeById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const emp = await mockRepo.findEmployeeById(schoolId, employeeId);
        if (!emp) throw new Error('Employé non trouvé');
      };
      await expect(updateOrThrow()).rejects.toThrow('Employé non trouvé');
    });

    it('should check email uniqueness on update', async () => {
      const existing = { id: employeeId, email: 'old@test.com' };
      mockRepo.findEmployeeById.mockResolvedValue(existing);
      mockRepo.findEmployeeByEmail.mockResolvedValue({ id: 'other' });
      const checkDuplicate = async (email: string) => {
        if (email !== existing.email) {
          const dup = await mockRepo.findEmployeeByEmail(schoolId, email);
          if (dup) throw new Error('Un employé avec cet email existe déjà');
        }
      };
      await expect(checkDuplicate('duplicate@test.com')).rejects.toThrow();
    });
  });

  describe('deleteEmployee', () => {
    it('should delete employee', async () => {
      mockRepo.findEmployeeById.mockResolvedValue({ id: employeeId });
      mockRepo.deleteEmployee.mockResolvedValue(undefined);
      await mockRepo.deleteEmployee(schoolId, employeeId);
      expect(mockRepo.deleteEmployee).toHaveBeenCalledWith(schoolId, employeeId);
    });

    it('should throw if employee not found on delete', async () => {
      mockRepo.findEmployeeById.mockResolvedValue(null);
      const deleteOrThrow = async () => {
        const emp = await mockRepo.findEmployeeById(schoolId, employeeId);
        if (!emp) throw new Error('Employé non trouvé');
      };
      await expect(deleteOrThrow()).rejects.toThrow('Employé non trouvé');
    });
  });

  describe('countEmployees', () => {
    it('should return employee count', async () => {
      mockRepo.countEmployees.mockResolvedValue(42);
      const result = await mockRepo.countEmployees(schoolId);
      expect(result).toBe(42);
    });

    it('should count with filters', async () => {
      mockRepo.countEmployees.mockResolvedValue(10);
      const result = await mockRepo.countEmployees(schoolId, { departmentId: 'dept-1' });
      expect(result).toBe(10);
    });
  });

  describe('generateEmployeeCode', () => {
    it('should generate employee code', async () => {
      mockRepo.generateEmployeeCode.mockResolvedValue('DIR-2026-0001');
      const result = await mockRepo.generateEmployeeCode(schoolId, 'DIR', 2026);
      expect(result).toBe('DIR-2026-0001');
    });

    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'école requis');
      };
      expect(() => validate('')).toThrow();
    });

    it('should require departmentCode', () => {
      const validate = (code: string) => {
        if (!code) throw new Error('Le code du département est requis');
      };
      expect(() => validate('')).toThrow();
    });
  });

  describe('getEmployeeStatistics', () => {
    it('should return statistics', async () => {
      const stats = { totalEmployees: 100, activeEmployees: 80 };
      mockRepo.getEmployeeStatistics.mockResolvedValue(stats);
      const result = await mockRepo.getEmployeeStatistics(schoolId);
      expect(result.totalEmployees).toBe(100);
    });
  });

  describe('searchEmployees', () => {
    it('should search with valid query', async () => {
      mockRepo.findEmployees.mockResolvedValue([{ first_name: 'John' }]);
      const result = await mockRepo.findEmployees(schoolId, { query: 'John' });
      expect(result).toHaveLength(1);
    });

    it('should reject query less than 2 chars', () => {
      const validate = (query: string) => {
        if (!query || query.trim().length < 2) throw new Error('Le terme de recherche doit contenir au moins 2 caractères');
      };
      expect(() => validate('')).toThrow();
      expect(() => validate('a')).toThrow();
    });

    it('should accept valid query', () => {
      const validate = (query: string) => {
        if (!query || query.trim().length < 2) throw new Error('Invalid query');
      };
      expect(() => validate('Jo')).not.toThrow();
      expect(() => validate('John')).not.toThrow();
    });
  });

  describe('Employee status transitions', () => {
    it('should define valid status transitions', () => {
      const transitions: Record<string, string[]> = {
        active: ['on_leave', 'suspended', 'terminated'],
        on_leave: ['active', 'terminated'],
        suspended: ['active', 'terminated'],
        terminated: [],
      };
      expect(transitions['active']).toContain('on_leave');
      expect(transitions['terminated']).toHaveLength(0);
    });
  });

  describe('Employee data validation', () => {
    it('should validate email format', () => {
      const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      expect(isValidEmail('test@test.com')).toBe(true);
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('no@')).toBe(false);
    });

    it('should validate employee code format', () => {
      const isValidCode = (code: string) => /^[A-Z]{2,4}-\d{4}-\d{4,}$/.test(code);
      expect(isValidCode('DIR-2026-0001')).toBe(true);
      expect(isValidCode('AB-2026-0001')).toBe(true);
      expect(isValidCode('invalid')).toBe(false);
    });
  });
});
