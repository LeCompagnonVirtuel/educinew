import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createReportService(repo: HRRepositoryExtended) {
  return {
    async generateEmployeeReport(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const stats = await repo.getEmployeeStatistics(schoolId);
      const departments = await repo.findDepartments(schoolId);

      const departmentBreakdown = [];
      for (const dept of departments) {
        const count = await repo.countDepartmentEmployees(schoolId, dept.id);
        departmentBreakdown.push({ department: dept.name, count });
      }

      return {
        type: 'employee_report',
        generatedAt: new Date().toISOString(),
        statistics: stats,
        departmentBreakdown,
      };
    },

    async generateLeaveReport(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const leaves = await repo.findLeaves(schoolId);

      return {
        type: 'leave_report',
        generatedAt: new Date().toISOString(),
        total: leaves.length,
        pending: leaves.filter((l: any) => l.status === 'pending').length,
        approved: leaves.filter((l: any) => l.status === 'approved').length,
        rejected: leaves.filter((l: any) => l.status === 'rejected').length,
        leaves,
      };
    },

    async generateContractReport(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const contracts = await repo.findContracts(schoolId);

      return {
        type: 'contract_report',
        generatedAt: new Date().toISOString(),
        total: contracts.length,
        active: contracts.filter((c: any) => c.status === 'active').length,
        expired: contracts.filter((c: any) => c.status === 'expired').length,
        contracts,
      };
    },

    async generateTrainingReport(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const trainings = await repo.findTrainings(schoolId);

      return {
        type: 'training_report',
        generatedAt: new Date().toISOString(),
        total: trainings.length,
        trainings,
      };
    },

    async generateAttendanceReport(schoolId: string, dateFrom?: string, dateTo?: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const attendance = await repo.findAttendance(schoolId, undefined, dateFrom, dateTo);

      return {
        type: 'attendance_report',
        generatedAt: new Date().toISOString(),
        total: attendance.length,
        attendance,
      };
    },
  };
}
