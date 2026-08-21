import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createObjectiveService(repo: HRRepositoryExtended) {
  return {
    async findObjectives(schoolId: string, employeeId?: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.findObjectives(schoolId, employeeId);
    },

    async findObjectiveById(schoolId: string, objectiveId: string) {
      if (!schoolId || !objectiveId) throw new AppError('Identifiants requis');
      const objective = await repo.findObjectiveById(schoolId, objectiveId);
      if (!objective) throw new AppError('Objectif non trouvé');
      return objective;
    },

    async createObjective(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.employee_id) throw new AppError('L\'identifiant de l\'employé est requis');
      if (!data?.title) throw new AppError('Le titre de l\'objectif est requis');

      const employee = await repo.findEmployeeById(schoolId, data.employee_id);
      if (!employee) throw new AppError('Employé non trouvé');

      return repo.createObjective({ ...data, school_id: schoolId });
    },

    async updateObjective(schoolId: string, objectiveId: string, data: any) {
      if (!schoolId || !objectiveId) throw new AppError('Identifiants requis');
      const existing = await repo.findObjectiveById(schoolId, objectiveId);
      if (!existing) throw new AppError('Objectif non trouvé');
      return repo.updateObjective(schoolId, objectiveId, data);
    },

    async deleteObjective(schoolId: string, objectiveId: string) {
      if (!schoolId || !objectiveId) throw new AppError('Identifiants requis');
      const existing = await repo.findObjectiveById(schoolId, objectiveId);
      if (!existing) throw new AppError('Objectif non trouvé');
      return repo.deleteObjective(schoolId, objectiveId);
    },

    async findObjectivesByEmployee(schoolId: string, employeeId: string) {
      if (!schoolId || !employeeId) throw new AppError('Identifiants requis');
      return repo.findObjectives(schoolId, employeeId);
    },
  };
}
