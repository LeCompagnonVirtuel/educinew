import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createSyncService(repo: HRRepositoryExtended) {
  return {
    async syncEmployees(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const employees = await repo.findEmployees(schoolId);
      const departments = await repo.findDepartments(schoolId);
      const positions = await repo.findPositions(schoolId);

      return {
        employees: employees.length,
        departments: departments.length,
        positions: positions.length,
        syncedAt: new Date().toISOString(),
      };
    },

    async syncDepartments(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const departments = await repo.findDepartments(schoolId);
      return {
        departments: departments.map((d: any) => ({
          id: d.id,
          name: d.name,
          employeeCount: 0,
        })),
        syncedAt: new Date().toISOString(),
      };
    },

    async syncLeaveBalances(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const employees = await repo.findEmployees(schoolId, { status: 'active' });
      return {
        employeesProcessed: employees.length,
        syncedAt: new Date().toISOString(),
      };
    },

    async getSyncStatus(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return {
        lastSync: new Date().toISOString(),
        status: 'synchronized',
      };
    },
  };
}
