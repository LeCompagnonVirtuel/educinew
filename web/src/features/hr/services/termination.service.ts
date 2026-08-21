import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createTerminationService(repo: HRRepositoryExtended) {
  return {
    async findTerminations(schoolId: string, employeeId?: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.findTerminations(schoolId, employeeId);
    },

    async findTerminationById(schoolId: string, terminationId: string) {
      if (!schoolId || !terminationId) throw new AppError('Identifiants requis');
      const termination = await repo.findTerminationById(schoolId, terminationId);
      if (!termination) throw new AppError('Rupture non trouvée');
      return termination;
    },

    async createTermination(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.employee_id) throw new AppError('L\'identifiant de l\'employé est requis');
      if (!data?.termination_type) throw new AppError('Le type de rupture est requis');
      if (!data?.termination_date) throw new AppError('La date de rupture est requise');

      const employee = await repo.findEmployeeById(schoolId, data.employee_id);
      if (!employee) throw new AppError('Employé non trouvé');

      return repo.createTermination({ ...data, school_id: schoolId });
    },

    async updateTermination(schoolId: string, terminationId: string, data: any) {
      if (!schoolId || !terminationId) throw new AppError('Identifiants requis');
      const existing = await repo.findTerminationById(schoolId, terminationId);
      if (!existing) throw new AppError('Rupture non trouvée');
      return repo.updateTermination(schoolId, terminationId, data);
    },

    async findTerminationsByEmployee(schoolId: string, employeeId: string) {
      if (!schoolId || !employeeId) throw new AppError('Identifiants requis');
      return repo.findTerminations(schoolId, employeeId);
    },
  };
}
