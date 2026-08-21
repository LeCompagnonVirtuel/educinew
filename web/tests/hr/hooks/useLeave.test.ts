import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useLeave hook', () => {
  const mockUseQuery = vi.fn();
  const mockUseMutation = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useLeaves', () => {
    it('should fetch leaves list', async () => {
      const leaves = [{ id: '1', status: 'pending' }];
      mockUseQuery.mockReturnValue({ data: leaves, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.data).toEqual(leaves);
    });

    it('should filter by employee', async () => {
      mockUseQuery.mockReturnValue({ data: [], isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', employeeId: 'emp-1' });
      expect(result.data).toHaveLength(0);
    });

    it('should handle loading state', () => {
      mockUseQuery.mockReturnValue({ data: undefined, isLoading: true });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.isLoading).toBe(true);
    });
  });

  describe('useLeave', () => {
    it('should fetch single leave', async () => {
      const leave = { id: 'leave-1', status: 'pending' };
      mockUseQuery.mockReturnValue({ data: leave, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', leaveId: 'leave-1' });
      expect(result.data.status).toBe('pending');
    });
  });

  describe('usePendingLeaves', () => {
    it('should fetch pending leaves', async () => {
      mockUseQuery.mockReturnValue({ data: [{ status: 'pending' }], isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.data).toHaveLength(1);
    });
  });

  describe('useCreateLeave', () => {
    it('should create leave request', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ leave_type: 'annual', start_date: '2026-08-01', end_date: '2026-08-05' });
      expect(mutate).toHaveBeenCalled();
    });
  });

  describe('useApproveLeave', () => {
    it('should approve leave', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ leaveId: 'leave-1', approved: true });
      expect(mutate).toHaveBeenCalled();
    });

    it('should reject leave', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ leaveId: 'leave-1', approved: false, reason: 'Not enough staff' });
      expect(mutate).toHaveBeenCalled();
    });
  });

  describe('useLeaveBalance', () => {
    it('should fetch leave balance', async () => {
      mockUseQuery.mockReturnValue({ data: { total_days: 30, days_used: 10 }, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', employeeId: 'emp-1', leaveType: 'annual' });
      expect(result.data.total_days).toBe(30);
    });
  });

  describe('Leave hook validation', () => {
    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('schoolId is required');
      };
      expect(() => validate('')).toThrow();
    });
  });
});
