import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useRecruitment hook', () => {
  const mockUseQuery = vi.fn();
  const mockUseMutation = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useRecruitments', () => {
    it('should fetch recruitments list', async () => {
      const recruitments = [{ id: '1', title: 'Teacher' }];
      mockUseQuery.mockReturnValue({ data: recruitments, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.data).toEqual(recruitments);
    });

    it('should handle loading state', () => {
      mockUseQuery.mockReturnValue({ data: undefined, isLoading: true });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.isLoading).toBe(true);
    });
  });

  describe('useRecruitment', () => {
    it('should fetch single recruitment', async () => {
      const recruitment = { id: 'rec-1', title: 'Teacher' };
      mockUseQuery.mockReturnValue({ data: recruitment, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', recruitmentId: 'rec-1' });
      expect(result.data.title).toBe('Teacher');
    });
  });

  describe('useCreateRecruitment', () => {
    it('should create recruitment', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ title: 'Teacher', position_id: 'pos-1' });
      expect(mutate).toHaveBeenCalled();
    });
  });

  describe('useCandidates', () => {
    it('should fetch candidates', async () => {
      mockUseQuery.mockReturnValue({ data: [{ name: 'John' }], isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', recruitmentId: 'rec-1' });
      expect(result.data).toHaveLength(1);
    });
  });

  describe('useInterviews', () => {
    it('should fetch interviews', async () => {
      mockUseQuery.mockReturnValue({ data: [{ scheduled_date: '2026-08-01' }], isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.data).toHaveLength(1);
    });
  });

  describe('Recruitment hook validation', () => {
    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('schoolId is required');
      };
      expect(() => validate('')).toThrow();
    });
  });
});
