import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createAttendanceHrService(repo: HRRepositoryExtended) {
  return {
    async clockIn(schoolId: string, employeeId: string, clockInTime?: string, location?: string) {
      if (!schoolId || !employeeId) throw new AppError('Identifiants requis');

      const employee = await repo.findEmployeeById(schoolId, employeeId);
      if (!employee) throw new AppError('Employé non trouvé');

      return repo.clockIn(schoolId, employeeId, clockInTime, location);
    },

    async clockOut(schoolId: string, employeeId: string, clockOutTime?: string) {
      if (!schoolId || !employeeId) throw new AppError('Identifiants requis');
      return repo.clockOut(schoolId, employeeId, clockOutTime);
    },

    async findAttendance(schoolId: string, employeeId?: string, dateFrom?: string, dateTo?: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.findAttendance(schoolId, employeeId, dateFrom, dateTo);
    },

    async findAttendanceByEmployee(schoolId: string, employeeId: string) {
      if (!schoolId || !employeeId) throw new AppError('Identifiants requis');
      return repo.findAttendance(schoolId, employeeId);
    },

    async findAttendanceByDateRange(schoolId: string, dateFrom: string, dateTo: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!dateFrom || !dateTo) throw new AppError('Les dates sont requises');
      return repo.findAttendance(schoolId, undefined, dateFrom, dateTo);
    },
  };
}
