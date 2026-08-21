import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createAnalyticsService(repo: HRRepositoryExtended) {
  return {
    async getEmployeeAnalytics(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const stats = await repo.getEmployeeStatistics(schoolId);
      const departments = await repo.findDepartments(schoolId);

      const departmentBreakdown = [];
      for (const dept of departments) {
        const count = await repo.countDepartmentEmployees(schoolId, dept.id);
        departmentBreakdown.push({ departmentId: dept.id, departmentName: dept.name, count });
      }

      return { statistics: stats, departmentBreakdown };
    },

    async getTurnoverRate(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const stats = await repo.getEmployeeStatistics(schoolId);
      const total = stats.totalEmployees;
      if (total === 0) return { rate: 0 };
      const rate = ((stats.terminatedEmployees || 0) / total) * 100;
      return { rate: Math.round(rate * 100) / 100 };
    },

    async getLeaveAnalytics(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const pendingLeaves = await repo.findPendingLeaves(schoolId);
      const leaves = await repo.findLeaves(schoolId);

      const approved = leaves.filter((l: any) => l.status === 'approved').length;
      const rejected = leaves.filter((l: any) => l.status === 'rejected').length;
      const pending = pendingLeaves.length;

      return { total: leaves.length, approved, rejected, pending };
    },

    async getHiringTrends(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const employees = await repo.findEmployees(schoolId);
      const monthly: Record<string, number> = {};
      for (const emp of employees) {
        const month = emp.hire_date ? new Date(emp.hire_date).toISOString().slice(0, 7) : 'unknown';
        monthly[month] = (monthly[month] || 0) + 1;
      }
      return monthly;
    },
  };
}
