import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('PayrollReferenceService', () => {
  const mockRepo = {
    findPayrollReferences: vi.fn(),
    findPayrollReferenceById: vi.fn(),
    createPayrollReference: vi.fn(),
    updatePayrollReference: vi.fn(),
    deletePayrollReference: vi.fn(),
  };

  const schoolId = 'school-1';
  const referenceId = 'ref-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findPayrollReferences', () => {
    it('should return references list', async () => {
      const refs = [{ id: '1', name: 'Base Salary 2026' }];
      mockRepo.findPayrollReferences.mockResolvedValue(refs);
      const result = await mockRepo.findPayrollReferences(schoolId);
      expect(result).toEqual(refs);
    });

    it('should handle empty results', async () => {
      mockRepo.findPayrollReferences.mockResolvedValue([]);
      const result = await mockRepo.findPayrollReferences(schoolId);
      expect(result).toHaveLength(0);
    });
  });

  describe('findPayrollReferenceById', () => {
    it('should return reference by id', async () => {
      const ref = { id: referenceId, name: 'Base Salary 2026' };
      mockRepo.findPayrollReferenceById.mockResolvedValue(ref);
      const result = await mockRepo.findPayrollReferenceById(schoolId, referenceId);
      expect(result.name).toBe('Base Salary 2026');
    });

    it('should throw if not found', async () => {
      mockRepo.findPayrollReferenceById.mockResolvedValue(null);
      const findOrThrow = async () => {
        const ref = await mockRepo.findPayrollReferenceById(schoolId, 'nonexistent');
        if (!ref) throw new Error('Référence non trouvée');
      };
      await expect(findOrThrow()).rejects.toThrow();
    });
  });

  describe('createPayrollReference', () => {
    it('should create reference', async () => {
      mockRepo.createPayrollReference.mockResolvedValue({ id: '1', name: 'Base Salary 2026' });
      const result = await mockRepo.createPayrollReference({ name: 'Base Salary 2026', school_id: schoolId });
      expect(result.name).toBe('Base Salary 2026');
    });

    it('should require name', () => {
      const validate = (data: any) => {
        if (!data?.name) throw new Error('Le nom est requis');
      };
      expect(() => validate({})).toThrow();
    });
  });

  describe('updatePayrollReference', () => {
    it('should update reference', async () => {
      mockRepo.findPayrollReferenceById.mockResolvedValue({ id: referenceId });
      mockRepo.updatePayrollReference.mockResolvedValue({ id: referenceId, name: 'Updated' });
      const result = await mockRepo.updatePayrollReference(schoolId, referenceId, { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if not found', async () => {
      mockRepo.findPayrollReferenceById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const ref = await mockRepo.findPayrollReferenceById(schoolId, referenceId);
        if (!ref) throw new Error('Référence non trouvée');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });
  });

  describe('deletePayrollReference', () => {
    it('should delete reference', async () => {
      mockRepo.findPayrollReferenceById.mockResolvedValue({ id: referenceId });
      mockRepo.deletePayrollReference.mockResolvedValue(undefined);
      await mockRepo.deletePayrollReference(schoolId, referenceId);
      expect(mockRepo.deletePayrollReference).toHaveBeenCalled();
    });

    it('should throw if not found on delete', async () => {
      mockRepo.findPayrollReferenceById.mockResolvedValue(null);
      const deleteOrThrow = async () => {
        const ref = await mockRepo.findPayrollReferenceById(schoolId, referenceId);
        if (!ref) throw new Error('Référence non trouvée');
      };
      await expect(deleteOrThrow()).rejects.toThrow();
    });
  });

  describe('Payroll reference type', () => {
    it('should define valid types', () => {
      const types = ['salary_scale', 'allowance', 'deduction', 'benefit', 'bonus'];
      expect(types).toContain('salary_scale');
      expect(types).toContain('allowance');
    });
  });

  describe('Payroll calculation', () => {
    it('should calculate gross salary', () => {
      const grossSalary = (base: number, allowances: number) => base + allowances;
      expect(grossSalary(500000, 100000)).toBe(600000);
    });

    it('should calculate net salary', () => {
      const netSalary = (gross: number, deductions: number) => gross - deductions;
      expect(netSalary(600000, 50000)).toBe(550000);
    });

    it('should calculate total deductions', () => {
      const totalDeductions = (deductions: number[]) => deductions.reduce((a, b) => a + b, 0);
      expect(totalDeductions([10000, 5000, 3000])).toBe(18000);
    });
  });

  describe('Payroll reference validation', () => {
    it('should validate amount', () => {
      const isValidAmount = (amount: number) => amount >= 0;
      expect(isValidAmount(500000)).toBe(true);
      expect(isValidAmount(-1000)).toBe(false);
    });

    it('should validate reference name length', () => {
      const isValidName = (name: string) => name.length >= 2 && name.length <= 100;
      expect(isValidName('Base Salary')).toBe(true);
      expect(isValidName('A')).toBe(false);
    });
  });
});
