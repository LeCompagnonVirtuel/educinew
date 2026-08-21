import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createDisciplinaryService(repo: HRRepositoryExtended) {
  return {
    async findDisciplinaryActions(schoolId: string, employeeId?: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.findDisciplinaryActions(schoolId, employeeId);
    },

    async findDisciplinaryActionById(schoolId: string, actionId: string) {
      if (!schoolId || !actionId) throw new AppError('Identifiants requis');
      const action = await repo.findDisciplinaryActionById(schoolId, actionId);
      if (!action) throw new AppError('Action disciplinaire non trouvée');
      return action;
    },

    async createDisciplinaryAction(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.employee_id) throw new AppError('L\'identifiant de l\'employé est requis');
      if (!data?.action_type) throw new AppError('Le type d\'action est requis');
      if (!data?.description) throw new AppError('La description est requise');

      const employee = await repo.findEmployeeById(schoolId, data.employee_id);
      if (!employee) throw new AppError('Employé non trouvé');

      return repo.createDisciplinaryAction({ ...data, school_id: schoolId });
    },

    async updateDisciplinaryAction(schoolId: string, actionId: string, data: any) {
      if (!schoolId || !actionId) throw new AppError('Identifiants requis');
      const existing = await repo.findDisciplinaryActionById(schoolId, actionId);
      if (!existing) throw new AppError('Action disciplinaire non trouvée');
      return repo.updateDisciplinaryAction(schoolId, actionId, data);
    },

    async findActionsByEmployee(schoolId: string, employeeId: string) {
      if (!schoolId || !employeeId) throw new AppError('Identifiants requis');
      return repo.findDisciplinaryActions(schoolId, employeeId);
    },
  };
}
