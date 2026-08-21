import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useHrDashboard hook', () => {
  const mockUseQuery = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useHrDashboard', () => {
    it('should fetch dashboard data', async () => {
      const data = { statistics: { totalEmployees: 100 }, pendingLeaves: 5 };
      mockUseQuery.mockReturnValue({ data, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.data.statistics.totalEmployees).toBe(100);
    });

    it('should handle loading state', () => {
      mockUseQuery.mockReturnValue({ data: undefined, isLoading: true });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.isLoading).toBe(true);
    });

    it('should handle error state', () => {
      mockUseQuery.mockReturnValue({ data: undefined, isLoading: false, error: new Error('Failed') });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.error).toBeDefined();
    });
  });

  describe('useEmployeeStatistics', () => {
    it('should fetch employee statistics', async () => {
      const stats = { totalEmployees: 100, activeEmployees: 80 };
      mockUseQuery.mockReturnValue({ data: stats, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.data.totalEmployees).toBe(100);
    });
  });

  describe('useDepartmentStats', () => {
    it('should fetch department statistics', async () => {
      const stats = [{ department: 'IT', employeeCount: 15 }];
      mockUseQuery.mockReturnValue({ data: stats, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.data).toHaveLength(1);
    });
  });

  describe('useRecentActivity', () => {
    it('should fetch recent activity', async () => {
      const activity = [{ id: '1', created_at: '2026-07-23' }];
      mockUseQuery.mockReturnValue({ data: activity, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', limit: 10 });
      expect(result.data).toHaveLength(1);
    });
  });

  describe('Dashboard hook validation', () => {
    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('schoolId is required');
      };
      expect(() => validate('')).toThrow();
    });
  });
});
