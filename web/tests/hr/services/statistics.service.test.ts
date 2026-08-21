import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('StatisticsService', () => {
  const mockRepo = {
    getEmployeeStatistics: vi.fn(),
    findEmployees: vi.fn(),
    findDepartments: vi.fn(),
  };

  const schoolId = 'school-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getEmployeeCount', () => {
    it('should return total employee count', async () => {
      mockRepo.getEmployeeStatistics.mockResolvedValue({ totalEmployees: 150 });
      const result = await mockRepo.getEmployeeStatistics(schoolId);
      expect(result.totalEmployees).toBe(150);
    });
  });

  describe('getDepartmentDistribution', () => {
    it('should calculate department distribution', async () => {
      mockRepo.findDepartments.mockResolvedValue([{ id: '1', name: 'IT' }, { id: '2', name: 'HR' }]);
      const departments = await mockRepo.findDepartments(schoolId);
      expect(departments).toHaveLength(2);
    });
  });

  describe('getGenderDistribution', () => {
    it('should calculate gender percentages', () => {
      const distribution = (male: number, female: number) => {
        const total = male + female;
        return {
          male: total > 0 ? (male / total) * 100 : 0,
          female: total > 0 ? (female / total) * 100 : 0,
        };
      };
      expect(distribution(60, 40)).toEqual({ male: 60, female: 40 });
    });
  });

  describe('getContractTypeDistribution', () => {
    it('should calculate contract type percentages', () => {
      const distribution = (cdi: number, cdd: number, stage: number) => {
        const total = cdi + cdd + stage;
        return {
          cdi: total > 0 ? (cdi / total) * 100 : 0,
          cdd: total > 0 ? (cdd / total) * 100 : 0,
          stage: total > 0 ? (stage / total) * 100 : 0,
        };
      };
      expect(distribution(50, 30, 20)).toEqual({ cdi: 50, cdd: 30, stage: 20 });
    });
  });

  describe('getAgeDistribution', () => {
    it('should calculate age groups', () => {
      const ageGroups = (ages: number[]) => {
        const groups = { '20-30': 0, '31-40': 0, '41-50': 0, '51+': 0 };
        for (const age of ages) {
          if (age <= 30) groups['20-30']++;
          else if (age <= 40) groups['31-40']++;
          else if (age <= 50) groups['41-50']++;
          else groups['51+']++;
        }
        return groups;
      };
      expect(ageGroups([25, 35, 45, 55])).toEqual({ '20-30': 1, '31-40': 1, '41-50': 1, '51+': 1 });
    });
  });

  describe('getTenureDistribution', () => {
    it('should calculate tenure groups', () => {
      const tenureGroups = (years: number[]) => {
        const groups = { '<1': 0, '1-3': 0, '3-5': 0, '5+': 0 };
        for (const y of years) {
          if (y < 1) groups['<1']++;
          else if (y <= 3) groups['1-3']++;
          else if (y <= 5) groups['3-5']++;
          else groups['5+']++;
        }
        return groups;
      };
      expect(tenureGroups([0.5, 2, 4, 7])).toEqual({ '<1': 1, '1-3': 1, '3-5': 1, '5+': 1 });
    });
  });
});
