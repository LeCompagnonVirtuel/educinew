import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createDashboardService(repo: HRRepositoryExtended) {
  return {
    async getDashboardData(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.getDashboardData(schoolId);
    },

    async getEmployeeStatistics(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.getEmployeeStatistics(schoolId);
    },

    async getDepartmentStats(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const departments = await repo.findDepartments(schoolId);
      const stats = [];
      for (const dept of departments) {
        const count = await repo.countDepartmentEmployees(schoolId, dept.id);
        stats.push({ department: dept.name, employeeCount: count });
      }
      return stats;
    },

    async getRecentActivity(schoolId: string, limit: number = 10) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const employees = await repo.findEmployees(schoolId, { sortBy: 'created_at', sortOrder: 'desc', limit });
      return employees;
    },
  };
}
