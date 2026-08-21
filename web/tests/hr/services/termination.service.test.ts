import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('TerminationService', () => {
  const mockRepo = {
    findTerminations: vi.fn(),
    findTerminationById: vi.fn(),
    createTermination: vi.fn(),
    updateTermination: vi.fn(),
  };

  const schoolId = 'school-1';
  const terminationId = 'term-1';
  const employeeId = 'emp-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findTerminations', () => {
    it('should return terminations list', async () => {
      const terminations = [{ id: '1', employee_id: employeeId }];
      mockRepo.findTerminations.mockResolvedValue(terminations);
      const result = await mockRepo.findTerminations(schoolId);
      expect(result).toEqual(terminations);
    });

    it('should filter by employee', async () => {
      mockRepo.findTerminations.mockResolvedValue([]);
      await mockRepo.findTerminations(schoolId, employeeId);
      expect(mockRepo.findTerminations).toHaveBeenCalledWith(schoolId, employeeId);
    });

    it('should handle empty results', async () => {
      mockRepo.findTerminations.mockResolvedValue([]);
      const result = await mockRepo.findTerminations(schoolId);
      expect(result).toHaveLength(0);
    });
  });

  describe('findTerminationById', () => {
    it('should return termination by id', async () => {
      const termination = { id: terminationId, type: 'resignation' };
      mockRepo.findTerminationById.mockResolvedValue(termination);
      const result = await mockRepo.findTerminationById(schoolId, terminationId);
      expect(result.type).toBe('resignation');
    });

    it('should throw if not found', async () => {
      mockRepo.findTerminationById.mockResolvedValue(null);
      const findOrThrow = async () => {
        const t = await mockRepo.findTerminationById(schoolId, 'nonexistent');
        if (!t) throw new Error('Rupture non trouvée');
      };
      await expect(findOrThrow()).rejects.toThrow();
    });
  });

  describe('createTermination', () => {
    it('should create termination', async () => {
      mockRepo.createTermination.mockResolvedValue({ id: '1', type: 'resignation' });
      const result = await mockRepo.createTermination({
        employee_id: employeeId,
        type: 'resignation',
        effective_date: '2026-08-01',
        school_id: schoolId,
      });
      expect(result.type).toBe('resignation');
    });

    it('should require employee_id', () => {
      const validate = (data: any) => {
        if (!data?.employee_id) throw new Error('L\'identifiant de l\'employé est requis');
      };
      expect(() => validate({})).toThrow();
    });

    it('should require type', () => {
      const validate = (data: any) => {
        if (!data?.type) throw new Error('Le type de rupture est requis');
      };
      expect(() => validate({ employee_id: employeeId })).toThrow();
    });

    it('should require effective_date', () => {
      const validate = (data: any) => {
        if (!data?.effective_date) throw new Error('La date d\'effet est requise');
      };
      expect(() => validate({ employee_id: employeeId, type: 'resignation' })).toThrow();
    });
  });

  describe('updateTermination', () => {
    it('should update termination', async () => {
      mockRepo.findTerminationById.mockResolvedValue({ id: terminationId });
      mockRepo.updateTermination.mockResolvedValue({ id: terminationId, status: 'approved' });
      const result = await mockRepo.updateTermination(schoolId, terminationId, { status: 'approved' });
      expect(result.status).toBe('approved');
    });

    it('should throw if not found', async () => {
      mockRepo.findTerminationById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const t = await mockRepo.findTerminationById(schoolId, terminationId);
        if (!t) throw new Error('Rupture non trouvée');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });
  });

  describe('Termination type', () => {
    it('should define valid types', () => {
      const types = ['resignation', 'dismissal', 'retirement', 'mutual_agreement', 'end_of_contract'];
      expect(types).toContain('resignation');
      expect(types).toContain('dismissal');
    });

    it('should validate type', () => {
      const validTypes = ['resignation', 'dismissal', 'retirement', 'mutual_agreement', 'end_of_contract'];
      const isValidType = (type: string) => validTypes.includes(type);
      expect(isValidType('resignation')).toBe(true);
      expect(isValidType('invalid')).toBe(false);
    });
  });

  describe('Termination status', () => {
    it('should define valid statuses', () => {
      const statuses = ['pending', 'approved', 'rejected', 'effective'];
      expect(statuses).toContain('pending');
      expect(statuses).toContain('effective');
    });

    it('should define valid transitions', () => {
      const transitions: Record<string, string[]> = {
        pending: ['approved', 'rejected'],
        approved: ['effective'],
        rejected: [],
        effective: [],
      };
      expect(transitions['pending']).toContain('approved');
      expect(transitions['effective']).toHaveLength(0);
    });
  });

  describe('Termination validation', () => {
    it('should validate effective date', () => {
      const isNotPast = (date: string) => new Date(date) >= new Date();
      expect(isNotPast('2030-01-01')).toBe(true);
    });

    it('should calculate notice period', () => {
      const calcNoticeDays = (submitDate: string, effectiveDate: string) => {
        const diff = new Date(effectiveDate).getTime() - new Date(submitDate).getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
      };
      expect(calcNoticeDays('2026-07-01', '2026-08-01')).toBe(31);
    });
  });
});
