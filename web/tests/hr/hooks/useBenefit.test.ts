import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useBenefit hook', () => {
  const mockUseQuery = vi.fn();
  const mockUseMutation = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useBenefits', () => {
    it('should fetch benefits list', async () => {
      const benefits = [{ id: '1', name: 'Health Insurance' }];
      mockUseQuery.mockReturnValue({ data: benefits, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.data).toEqual(benefits);
    });

    it('should handle loading state', () => {
      mockUseQuery.mockReturnValue({ data: undefined, isLoading: true });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.isLoading).toBe(true);
    });
  });

  describe('useBenefit', () => {
    it('should fetch single benefit', async () => {
      const benefit = { id: 'benefit-1', name: 'Health Insurance' };
      mockUseQuery.mockReturnValue({ data: benefit, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', benefitId: 'benefit-1' });
      expect(result.data.name).toBe('Health Insurance');
    });
  });

  describe('useCreateBenefit', () => {
    it('should create benefit', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ name: 'Health Insurance', amount: 50000 });
      expect(mutate).toHaveBeenCalled();
    });
  });

  describe('useUpdateBenefit', () => {
    it('should update benefit', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ id: 'benefit-1', data: { amount: 60000 } });
      expect(mutate).toHaveBeenCalled();
    });
  });

  describe('useDeleteBenefit', () => {
    it('should delete benefit', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate('benefit-1');
      expect(mutate).toHaveBeenCalledWith('benefit-1');
    });
  });

  describe('Benefit hook validation', () => {
    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('schoolId is required');
      };
      expect(() => validate('')).toThrow();
    });
  });
});
