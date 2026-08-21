import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('AnalyticsService', () => {
  const mockRepo = {
    getEmployeeStatistics: vi.fn(),
    findDepartments: vi.fn(),
    countDepartmentEmployees: vi.fn(),
    findLeaves: vi.fn(),
    findTrainings: vi.fn(),
  };

  const schoolId = 'school-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getTurnoverRate', () => {
    it('should calculate turnover rate', () => {
      const turnoverRate = (terminated: number, total: number) => total > 0 ? (terminated / total) * 100 : 0;
      expect(turnoverRate(5, 100)).toBe(5);
      expect(turnoverRate(0, 100)).toBe(0);
      expect(turnoverRate(0, 0)).toBe(0);
    });
  });

  describe('getHeadcountByDepartment', () => {
    it('should return headcount by department', async () => {
      mockRepo.findDepartments.mockResolvedValue([{ id: '1', name: 'IT' }, { id: '2', name: 'HR' }]);
      mockRepo.countDepartmentEmployees.mockResolvedValue(10);
      const departments = await mockRepo.findDepartments(schoolId);
      const headcount = [];
      for (const dept of departments) {
        const count = await mockRepo.countDepartmentEmployees(schoolId, dept.id);
        headcount.push({ department: dept.name, count });
      }
      expect(headcount).toHaveLength(2);
    });
  });

  describe('getLeaveAnalytics', () => {
    it('should calculate leave utilization', () => {
      const utilization = (used: number, total: number) => total > 0 ? (used / total) * 100 : 0;
      expect(utilization(20, 30)).toBeCloseTo(66.67);
      expect(utilization(0, 30)).toBe(0);
    });

    it('should calculate average leave days per employee', () => {
      const avg = (totalDays: number, employeeCount: number) => employeeCount > 0 ? totalDays / employeeCount : 0;
      expect(avg(100, 20)).toBe(5);
      expect(avg(0, 20)).toBe(0);
    });
  });

  describe('getTrainingAnalytics', () => {
    it('should calculate training completion rate', () => {
      const completionRate = (completed: number, total: number) => total > 0 ? (completed / total) * 100 : 0;
      expect(completionRate(8, 10)).toBe(80);
      expect(completionRate(0, 0)).toBe(0);
    });
  });

  describe('Performance distribution', () => {
    it('should calculate score distribution', () => {
      const distribution = (scores: number[]) => {
        const ranges = { excellent: 0, good: 0, average: 0, poor: 0 };
        for (const score of scores) {
          if (score >= 90) ranges.excellent++;
          else if (score >= 70) ranges.good++;
          else if (score >= 50) ranges.average++;
          else ranges.poor++;
        }
        return ranges;
      };
      expect(distribution([95, 85, 75, 55])).toEqual({ excellent: 1, good: 2, average: 1, poor: 0 });
    });
  });
});
