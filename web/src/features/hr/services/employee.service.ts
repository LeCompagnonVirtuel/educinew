import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEmployeeService(repo: HRRepositoryExtended) {
  return {
    async findEmployees(schoolId: string, filters?: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.findEmployees(schoolId, filters);
    },

    async findEmployeeById(schoolId: string, employeeId: string) {
      if (!schoolId || !employeeId) throw new AppError('Identifiants requis');
      const employee = await repo.findEmployeeById(schoolId, employeeId);
      if (!employee) throw new AppError('Employé non trouvé');
      return employee;
    },

    async findEmployeeByCode(schoolId: string, code: string) {
      if (!schoolId || !code) throw new AppError('Identifiants requis');
      const employee = await repo.findEmployeeByCode(schoolId, code);
      if (!employee) throw new AppError('Employé non trouvé');
      return employee;
    },

    async findEmployeeByEmail(schoolId: string, email: string) {
      if (!schoolId || !email) throw new AppError('Identifiants requis');
      const employee = await repo.findEmployeeByEmail(schoolId, email);
      if (!employee) throw new AppError('Employé non trouvé');
      return employee;
    },

    async createEmployee(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.first_name) throw new AppError('Le prénom est requis');
      if (!data?.last_name) throw new AppError('Le nom est requis');
      if (!data?.email) throw new AppError('L\'email est requis');

      const existing = await repo.findEmployeeByEmail(schoolId, data.email);
      if (existing) throw new AppError('Un employé avec cet email existe déjà');

      return repo.createEmployee({ ...data, school_id: schoolId });
    },

    async updateEmployee(schoolId: string, employeeId: string, data: any) {
      if (!schoolId || !employeeId) throw new AppError('Identifiants requis');
      const existing = await repo.findEmployeeById(schoolId, employeeId);
      if (!existing) throw new AppError('Employé non trouvé');

      if (data.email && data.email !== existing.email) {
        const duplicate = await repo.findEmployeeByEmail(schoolId, data.email);
        if (duplicate) throw new AppError('Un employé avec cet email existe déjà');
      }

      return repo.updateEmployee(schoolId, employeeId, data);
    },

    async deleteEmployee(schoolId: string, employeeId: string) {
      if (!schoolId || !employeeId) throw new AppError('Identifiants requis');
      const existing = await repo.findEmployeeById(schoolId, employeeId);
      if (!existing) throw new AppError('Employé non trouvé');
      return repo.deleteEmployee(schoolId, employeeId);
    },

    async countEmployees(schoolId: string, filters?: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.countEmployees(schoolId, filters);
    },

    async generateEmployeeCode(schoolId: string, departmentCode: string, year?: number) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!departmentCode) throw new AppError('Le code du département est requis');
      return repo.generateEmployeeCode(schoolId, departmentCode, year);
    },

    async getEmployeeStatistics(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.getEmployeeStatistics(schoolId);
    },

    async searchEmployees(schoolId: string, query: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!query || query.trim().length < 2) throw new AppError('Le terme de recherche doit contenir au moins 2 caractères');
      return repo.findEmployees(schoolId, { query: query.trim() });
    },
  };
}
