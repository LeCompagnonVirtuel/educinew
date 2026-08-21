import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createDocumentService(repo: HRRepositoryExtended) {
  return {
    async findEmployeeDocuments(schoolId: string, employeeId: string) {
      if (!schoolId || !employeeId) throw new AppError('Identifiants requis');
      return repo.findEmployeeDocuments(schoolId, employeeId);
    },

    async findEmployeeDocumentById(schoolId: string, documentId: string) {
      if (!schoolId || !documentId) throw new AppError('Identifiants requis');
      const document = await repo.findEmployeeDocumentById(schoolId, documentId);
      if (!document) throw new AppError('Document non trouvé');
      return document;
    },

    async createEmployeeDocument(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.employee_id) throw new AppError('L\'identifiant de l\'employé est requis');
      if (!data?.title) throw new AppError('Le titre du document est requis');

      const employee = await repo.findEmployeeById(schoolId, data.employee_id);
      if (!employee) throw new AppError('Employé non trouvé');

      return repo.createEmployeeDocument({ ...data, school_id: schoolId });
    },

    async updateEmployeeDocument(schoolId: string, documentId: string, data: any) {
      if (!schoolId || !documentId) throw new AppError('Identifiants requis');
      const existing = await repo.findEmployeeDocumentById(schoolId, documentId);
      if (!existing) throw new AppError('Document non trouvé');
      return repo.updateEmployeeDocument(schoolId, documentId, data);
    },

    async deleteEmployeeDocument(schoolId: string, documentId: string) {
      if (!schoolId || !documentId) throw new AppError('Identifiants requis');
      const existing = await repo.findEmployeeDocumentById(schoolId, documentId);
      if (!existing) throw new AppError('Document non trouvé');
      return repo.deleteEmployeeDocument(schoolId, documentId);
    },
  };
}
