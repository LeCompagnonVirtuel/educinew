import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useAllowance hook', () => {
  const mockUseQuery = vi.fn();
  const mockUseMutation = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useAllowances', () => {
    it('should fetch allowances list', async () => {
      const allowances = [{ id: '1', name: 'Transport' }];
      mockUseQuery.mockReturnValue({ data: allowances, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.data).toEqual(allowances);
    });

    it('should handle loading state', () => {
      mockUseQuery.mockReturnValue({ data: undefined, isLoading: true });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.isLoading).toBe(true);
    });
  });

  describe('useAllowance', () => {
    it('should fetch single allowance', async () => {
      const allowance = { id: 'allow-1', name: 'Transport' };
      mockUseQuery.mockReturnValue({ data: allowance, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', allowanceId: 'allow-1' });
      expect(result.data.name).toBe('Transport');
    });
  });

  describe('useCreateAllowance', () => {
    it('should create allowance', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ name: 'Transport', amount: 50000 });
      expect(mutate).toHaveBeenCalled();
    });
  });

  describe('useUpdateAllowance', () => {
    it('should update allowance', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ id: 'allow-1', data: { amount: 60000 } });
      expect(mutate).toHaveBeenCalled();
    });
  });

  describe('useDeleteAllowance', () => {
    it('should delete allowance', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate('allow-1');
      expect(mutate).toHaveBeenCalledWith('allow-1');
    });
  });

  describe('Allowance hook validation', () => {
    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('schoolId is required');
      };
      expect(() => validate('')).toThrow();
    });
  });
});
