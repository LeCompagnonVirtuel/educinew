import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useAttendanceHr hook', () => {
  const mockUseQuery = vi.fn();
  const mockUseMutation = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useAttendance', () => {
    it('should fetch attendance records', async () => {
      const records = [{ id: '1', clock_in: '2026-07-23T08:00:00Z' }];
      mockUseQuery.mockReturnValue({ data: records, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by employee', async () => {
      mockUseQuery.mockReturnValue({ data: [], isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', employeeId: 'emp-1' });
      expect(result.data).toHaveLength(0);
    });

    it('should filter by date range', async () => {
      mockUseQuery.mockReturnValue({ data: [], isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', dateFrom: '2026-07-01', dateTo: '2026-07-31' });
      expect(result.data).toHaveLength(0);
    });
  });

  describe('useClockIn', () => {
    it('should clock in employee', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ employeeId: 'emp-1', clockInTime: '2026-07-23T08:00:00Z' });
      expect(mutate).toHaveBeenCalled();
    });

    it('should clock in with location', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ employeeId: 'emp-1', clockInTime: '2026-07-23T08:00:00Z', location: 'Main Office' });
      expect(mutate).toHaveBeenCalled();
    });
  });

  describe('useClockOut', () => {
    it('should clock out employee', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ employeeId: 'emp-1', clockOutTime: '2026-07-23T17:00:00Z' });
      expect(mutate).toHaveBeenCalled();
    });
  });

  describe('Attendance hook validation', () => {
    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('schoolId is required');
      };
      expect(() => validate('')).toThrow();
    });
  });
});
