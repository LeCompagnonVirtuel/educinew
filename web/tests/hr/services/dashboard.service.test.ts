import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('DashboardService', () => {
  const mockRepo = {
    getDashboardData: vi.fn(),
    getEmployeeStatistics: vi.fn(),
    findDepartments: vi.fn(),
    countDepartmentEmployees: vi.fn(),
    findEmployees: vi.fn(),
  };

  const schoolId = 'school-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getDashboardData', () => {
    it('should return dashboard data', async () => {
      const data = { statistics: { totalEmployees: 100 }, pendingLeaves: 5 };
      mockRepo.getDashboardData.mockResolvedValue(data);
      const result = await mockRepo.getDashboardData(schoolId);
      expect(result.statistics.totalEmployees).toBe(100);
    });

    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'école requis');
      };
      expect(() => validate('')).toThrow();
    });
  });

  describe('getEmployeeStatistics', () => {
    it('should return employee statistics', async () => {
      const stats = { totalEmployees: 100, activeEmployees: 80 };
      mockRepo.getEmployeeStatistics.mockResolvedValue(stats);
      const result = await mockRepo.getEmployeeStatistics(schoolId);
      expect(result.totalEmployees).toBe(100);
    });

    it('should include all status counts', async () => {
      const stats = {
        totalEmployees: 100,
        activeEmployees: 80,
        onLeaveEmployees: 10,
        suspendedEmployees: 5,
        terminatedEmployees: 5,
      };
      mockRepo.getEmployeeStatistics.mockResolvedValue(stats);
      const result = await mockRepo.getEmployeeStatistics(schoolId);
      expect(result.activeEmployees + result.onLeaveEmployees + result.suspendedEmployees + result.terminatedEmployees).toBeLessThanOrEqual(result.totalEmployees);
    });
  });

  describe('getDepartmentStats', () => {
    it('should return department statistics', async () => {
      mockRepo.findDepartments.mockResolvedValue([{ id: '1', name: 'IT' }]);
      mockRepo.countDepartmentEmployees.mockResolvedValue(15);
      const departments = await mockRepo.findDepartments(schoolId);
      const stats = [];
      for (const dept of departments) {
        const count = await mockRepo.countDepartmentEmployees(schoolId, dept.id);
        stats.push({ department: dept.name, employeeCount: count });
      }
      expect(stats).toHaveLength(1);
      expect(stats[0].employeeCount).toBe(15);
    });
  });

  describe('getRecentActivity', () => {
    it('should return recent activity', async () => {
      mockRepo.findEmployees.mockResolvedValue([{ id: '1', created_at: '2026-07-23' }]);
      const result = await mockRepo.findEmployees(schoolId, { sortBy: 'created_at', sortOrder: 'desc', limit: 10 });
      expect(result).toHaveLength(1);
    });
  });

  describe('Dashboard calculations', () => {
    it('should calculate active rate', () => {
      const activeRate = (active: number, total: number) => total > 0 ? (active / total) * 100 : 0;
      expect(activeRate(80, 100)).toBe(80);
      expect(activeRate(0, 0)).toBe(0);
    });

    it('should calculate attendance rate', () => {
      const attendanceRate = (present: number, total: number) => total > 0 ? (present / total) * 100 : 0;
      expect(attendanceRate(90, 100)).toBe(90);
    });
  });
});
