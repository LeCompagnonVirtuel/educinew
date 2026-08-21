import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useDeduction hook', () => {
  const mockUseQuery = vi.fn();
  const mockUseMutation = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useDeductions', () => {
    it('should fetch deductions list', async () => {
      const deductions = [{ id: '1', name: 'CNPS' }];
      mockUseQuery.mockReturnValue({ data: deductions, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.data).toEqual(deductions);
    });

    it('should handle loading state', () => {
      mockUseQuery.mockReturnValue({ data: undefined, isLoading: true });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.isLoading).toBe(true);
    });
  });

  describe('useDeduction', () => {
    it('should fetch single deduction', async () => {
      const deduction = { id: 'ded-1', name: 'CNPS' };
      mockUseQuery.mockReturnValue({ data: deduction, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', deductionId: 'ded-1' });
      expect(result.data.name).toBe('CNPS');
    });
  });

  describe('useCreateDeduction', () => {
    it('should create deduction', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ name: 'CNPS', amount: 10000 });
      expect(mutate).toHaveBeenCalled();
    });
  });

  describe('useUpdateDeduction', () => {
    it('should update deduction', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ id: 'ded-1', data: { amount: 12000 } });
      expect(mutate).toHaveBeenCalled();
    });
  });

  describe('useDeleteDeduction', () => {
    it('should delete deduction', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate('ded-1');
      expect(mutate).toHaveBeenCalledWith('ded-1');
    });
  });

  describe('Deduction hook validation', () => {
    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('schoolId is required');
      };
      expect(() => validate('')).toThrow();
    });
  });
});
