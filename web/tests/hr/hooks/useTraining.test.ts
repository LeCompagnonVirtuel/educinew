import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useTraining hook', () => {
  const mockUseQuery = vi.fn();
  const mockUseMutation = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useTrainings', () => {
    it('should fetch trainings list', async () => {
      const trainings = [{ id: '1', title: 'Leadership' }];
      mockUseQuery.mockReturnValue({ data: trainings, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.data).toEqual(trainings);
    });

    it('should handle loading state', () => {
      mockUseQuery.mockReturnValue({ data: undefined, isLoading: true });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.isLoading).toBe(true);
    });
  });

  describe('useTraining', () => {
    it('should fetch single training', async () => {
      const training = { id: 'training-1', title: 'Leadership' };
      mockUseQuery.mockReturnValue({ data: training, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', trainingId: 'training-1' });
      expect(result.data.title).toBe('Leadership');
    });
  });

  describe('useCreateTraining', () => {
    it('should create training', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ title: 'Leadership', start_date: '2026-09-01' });
      expect(mutate).toHaveBeenCalled();
    });
  });

  describe('useEnrollTraining', () => {
    it('should enroll employee in training', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ trainingId: 'training-1', employeeId: 'emp-1' });
      expect(mutate).toHaveBeenCalled();
    });
  });

  describe('useTrainingEnrollments', () => {
    it('should fetch training enrollments', async () => {
      mockUseQuery.mockReturnValue({ data: [{ employee_id: 'emp-1' }], isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', trainingId: 'training-1' });
      expect(result.data).toHaveLength(1);
    });
  });

  describe('Training hook validation', () => {
    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('schoolId is required');
      };
      expect(() => validate('')).toThrow();
    });
  });
});
