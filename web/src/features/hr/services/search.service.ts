import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createSearchService(repo: HRRepositoryExtended) {
  return {
    async searchEmployees(schoolId: string, query: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!query || query.trim().length < 2) throw new AppError('Le terme de recherche doit contenir au moins 2 caractères');
      return repo.findEmployees(schoolId, { query: query.trim() });
    },

    async searchEmployeesByDepartment(schoolId: string, departmentId: string, query: string) {
      if (!schoolId || !departmentId) throw new AppError('Identifiants requis');
      if (!query || query.trim().length < 2) throw new AppError('Le terme de recherche doit contenir au moins 2 caractères');
      return repo.findEmployees(schoolId, { departmentId, query: query.trim() });
    },

    async searchEmployeesByStatus(schoolId: string, status: string, query: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!status) throw new AppError('Le statut est requis');
      if (!query || query.trim().length < 2) throw new AppError('Le terme de recherche doit contenir au moins 2 caractères');
      return repo.findEmployees(schoolId, { status, query: query.trim() });
    },

    async advancedSearch(schoolId: string, filters: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.findEmployees(schoolId, filters);
    },
  };
}
