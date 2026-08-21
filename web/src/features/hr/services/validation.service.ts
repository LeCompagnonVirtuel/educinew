import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createValidationService(repo: HRRepositoryExtended) {
  return {
    async validateEmployeeData(data: any) {
      const errors: string[] = [];
      if (!data?.first_name) errors.push('Le prénom est requis');
      if (!data?.last_name) errors.push('Le nom est requis');
      if (!data?.email) errors.push('L\'email est requis');
      if (data?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('L\'email n\'est pas valide');
      if (data?.phone && !/^[\d\s\-+()]+$/.test(data.phone)) errors.push('Le numéro de téléphone n\'est pas valide');
      if (errors.length > 0) throw new AppError(errors.join(', '));
      return true;
    },

    async validateEmailUnique(schoolId: string, email: string, excludeEmployeeId?: string) {
      if (!schoolId || !email) throw new AppError('Identifiants requis');
      const existing = await repo.findEmployeeByEmail(schoolId, email);
      if (existing && existing.id !== excludeEmployeeId) {
        throw new AppError('Un employé avec cet email existe déjà');
      }
      return true;
    },

    async validateDepartmentExists(schoolId: string, departmentId: string) {
      if (!schoolId || !departmentId) throw new AppError('Identifiants requis');
      const department = await repo.findDepartmentById(schoolId, departmentId);
      if (!department) throw new AppError('Le département spécifié n\'existe pas');
      return true;
    },

    async validatePositionExists(schoolId: string, positionId: string) {
      if (!schoolId || !positionId) throw new AppError('Identifiants requis');
      const position = await repo.findPositionById(schoolId, positionId);
      if (!position) throw new AppError('Le poste spécifié n\'existe pas');
      return true;
    },

    async validateContractDates(startDate: string, endDate: string) {
      if (!startDate || !endDate) throw new AppError('Les dates sont requises');
      if (new Date(endDate) < new Date(startDate)) {
        throw new AppError('La date de fin doit être postérieure à la date de début');
      }
      return true;
    },

    async validateLeaveDates(startDate: string, endDate: string) {
      if (!startDate || !endDate) throw new AppError('Les dates sont requises');
      if (new Date(endDate) < new Date(startDate)) {
        throw new AppError('La date de fin doit être postérieure à la date de début');
      }
      return true;
    },

    async validateLeaveBalance(schoolId: string, employeeId: string, leaveType: string, requestedDays: number) {
      if (!schoolId || !employeeId || !leaveType) throw new AppError('Identifiants requis');
      const balance = await repo.findLeaveBalance(schoolId, employeeId, leaveType);
      if (balance) {
        const remainingDays = (balance.total_days || 0) - (balance.days_used || 0);
        if (requestedDays > remainingDays) {
          throw new AppError(`Solde de congé insuffisant. Jours restants: ${remainingDays}`);
        }
      }
      return true;
    },
  };
}
