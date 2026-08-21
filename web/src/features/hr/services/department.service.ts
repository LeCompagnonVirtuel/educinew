import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createDepartmentService(repo: HRRepositoryExtended) {
  return {
    async findDepartments(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.findDepartments(schoolId);
    },

    async findDepartmentById(schoolId: string, departmentId: string) {
      if (!schoolId || !departmentId) throw new AppError('Identifiants requis');
      const department = await repo.findDepartmentById(schoolId, departmentId);
      if (!department) throw new AppError('Département non trouvé');
      return department;
    },

    async createDepartment(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.name) throw new AppError('Le nom du département est requis');

      const existing = await repo.findDepartmentByName(schoolId, data.name);
      if (existing) throw new AppError('Un département avec ce nom existe déjà');

      return repo.createDepartment({ ...data, school_id: schoolId });
    },

    async updateDepartment(schoolId: string, departmentId: string, data: any) {
      if (!schoolId || !departmentId) throw new AppError('Identifiants requis');
      const existing = await repo.findDepartmentById(schoolId, departmentId);
      if (!existing) throw new AppError('Département non trouvé');

      if (data.name && data.name !== existing.name) {
        const duplicate = await repo.findDepartmentByName(schoolId, data.name);
        if (duplicate) throw new AppError('Un département avec ce nom existe déjà');
      }

      return repo.updateDepartment(schoolId, departmentId, data);
    },

    async deleteDepartment(schoolId: string, departmentId: string) {
      if (!schoolId || !departmentId) throw new AppError('Identifiants requis');
      const existing = await repo.findDepartmentById(schoolId, departmentId);
      if (!existing) throw new AppError('Département non trouvé');

      const employeeCount = await repo.countDepartmentEmployees(schoolId, departmentId);
      if (employeeCount > 0) {
        throw new AppError(`Impossible de supprimer le département: ${employeeCount} employé(s) y sont affecté(s)`);
      }

      return repo.deleteDepartment(schoolId, departmentId);
    },

    async countDepartmentEmployees(schoolId: string, departmentId: string) {
      if (!schoolId || !departmentId) throw new AppError('Identifiants requis');
      return repo.countDepartmentEmployees(schoolId, departmentId);
    },
  };
}
