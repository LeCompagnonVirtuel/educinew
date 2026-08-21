import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createStatisticsService(repo: HRRepositoryExtended) {
  return {
    async getEmployeeStatistics(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.getEmployeeStatistics(schoolId);
    },

    async getDepartmentStatistics(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const departments = await repo.findDepartments(schoolId);
      const stats = [];
      for (const dept of departments) {
        const count = await repo.countDepartmentEmployees(schoolId, dept.id);
        stats.push({ departmentId: dept.id, departmentName: dept.name, employeeCount: count });
      }
      return stats;
    },

    async getLeaveStatistics(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const leaves = await repo.findLeaves(schoolId);
      return {
        total: leaves.length,
        pending: leaves.filter((l: any) => l.status === 'pending').length,
        approved: leaves.filter((l: any) => l.status === 'approved').length,
        rejected: leaves.filter((l: any) => l.status === 'rejected').length,
      };
    },

    async getContractStatistics(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const contracts = await repo.findContracts(schoolId);
      return {
        total: contracts.length,
        active: contracts.filter((c: any) => c.status === 'active').length,
        expired: contracts.filter((c: any) => c.status === 'expired').length,
      };
    },
  };
}
