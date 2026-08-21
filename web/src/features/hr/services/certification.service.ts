import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createCertificationService(repo: HRRepositoryExtended) {
  return {
    async findCertifications(schoolId: string, employeeId?: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.findCertifications(schoolId, employeeId);
    },

    async findCertificationById(schoolId: string, certificationId: string) {
      if (!schoolId || !certificationId) throw new AppError('Identifiants requis');
      const certification = await repo.findCertificationById(schoolId, certificationId);
      if (!certification) throw new AppError('Certification non trouvée');
      return certification;
    },

    async createCertification(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.employee_id) throw new AppError('L\'identifiant de l\'employé est requis');
      if (!data?.name) throw new AppError('Le nom de la certification est requis');
      return repo.createCertification({ ...data, school_id: schoolId });
    },

    async updateCertification(schoolId: string, certificationId: string, data: any) {
      if (!schoolId || !certificationId) throw new AppError('Identifiants requis');
      const existing = await repo.findCertificationById(schoolId, certificationId);
      if (!existing) throw new AppError('Certification non trouvée');
      return repo.updateCertification(schoolId, certificationId, data);
    },

    async deleteCertification(schoolId: string, certificationId: string) {
      if (!schoolId || !certificationId) throw new AppError('Identifiants requis');
      const existing = await repo.findCertificationById(schoolId, certificationId);
      if (!existing) throw new AppError('Certification non trouvée');
      return repo.deleteCertification(schoolId, certificationId);
    },

    async findExpiringCertifications(schoolId: string, withinDays: number = 30) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const certifications = await repo.findCertifications(schoolId);
      const threshold = new Date();
      threshold.setDate(threshold.getDate() + withinDays);
      return certifications.filter((c: any) => c.expiry_date && new Date(c.expiry_date) <= threshold);
    },
  };
}
