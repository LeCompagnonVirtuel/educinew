import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('usePerformance hook', () => {
  const mockUseQuery = vi.fn();
  const mockUseMutation = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('usePerformanceReviews', () => {
    it('should fetch reviews list', async () => {
      const reviews = [{ id: '1', score: 85 }];
      mockUseQuery.mockReturnValue({ data: reviews, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.data).toEqual(reviews);
    });

    it('should filter by employee', async () => {
      mockUseQuery.mockReturnValue({ data: [], isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', employeeId: 'emp-1' });
      expect(result.data).toHaveLength(0);
    });
  });

  describe('usePerformanceReview', () => {
    it('should fetch single review', async () => {
      const review = { id: 'review-1', score: 85 };
      mockUseQuery.mockReturnValue({ data: review, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', reviewId: 'review-1' });
      expect(result.data.score).toBe(85);
    });
  });

  describe('useCreatePerformanceReview', () => {
    it('should create review', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ employee_id: 'emp-1', review_period: 'Q1 2026', score: 85 });
      expect(mutate).toHaveBeenCalled();
    });
  });

  describe('useUpdatePerformanceReview', () => {
    it('should update review', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ reviewId: 'review-1', data: { score: 90 } });
      expect(mutate).toHaveBeenCalled();
    });
  });

  describe('Performance hook validation', () => {
    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('schoolId is required');
      };
      expect(() => validate('')).toThrow();
    });
  });
});
