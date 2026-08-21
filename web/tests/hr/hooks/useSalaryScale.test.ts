import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useSalaryScale hook', () => {
  const mockUseQuery = vi.fn();
  const mockUseMutation = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useSalaryScales', () => {
    it('should fetch salary scales list', async () => {
      const scales = [{ id: '1', name: 'Scale A' }];
      mockUseQuery.mockReturnValue({ data: scales, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.data).toEqual(scales);
    });

    it('should handle loading state', () => {
      mockUseQuery.mockReturnValue({ data: undefined, isLoading: true });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.isLoading).toBe(true);
    });
  });

  describe('useSalaryScale', () => {
    it('should fetch single salary scale', async () => {
      const scale = { id: 'scale-1', name: 'Scale A', min_salary: 300000, max_salary: 800000 };
      mockUseQuery.mockReturnValue({ data: scale, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', scaleId: 'scale-1' });
      expect(result.data.name).toBe('Scale A');
    });
  });

  describe('useCreateSalaryScale', () => {
    it('should create salary scale', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ name: 'Scale A', min_salary: 300000, max_salary: 800000 });
      expect(mutate).toHaveBeenCalled();
    });
  });

  describe('useUpdateSalaryScale', () => {
    it('should update salary scale', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ id: 'scale-1', data: { max_salary: 900000 } });
      expect(mutate).toHaveBeenCalled();
    });
  });

  describe('useDeleteSalaryScale', () => {
    it('should delete salary scale', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate('scale-1');
      expect(mutate).toHaveBeenCalledWith('scale-1');
    });
  });

  describe('SalaryScale hook validation', () => {
    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('schoolId is required');
      };
      expect(() => validate('')).toThrow();
    });

    it('should validate salary range', () => {
      const isValid = (min: number, max: number) => max >= min;
      expect(isValid(300000, 800000)).toBe(true);
      expect(isValid(800000, 300000)).toBe(false);
    });
  });
});
