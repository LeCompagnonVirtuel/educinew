import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createSchoolManagementService(repo: EnterpriseRepositoryExtended) {
  return {
    async findSchools(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findSchools(enterpriseId, filters);
    },

    async findSchoolById(enterpriseId: string, schoolId: string) {
      if (!enterpriseId || !schoolId) throw new AppError('Identifiants requis');
      const school = await repo.findSchoolById(enterpriseId, schoolId);
      if (!school) throw new AppError('École non trouvée');
      return school;
    },

    async createSchool(enterpriseId: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!data?.name) throw new AppError('Le nom de l\'école est requis');
      if (!data?.code) throw new AppError('Le code de l\'école est requis');
      return repo.createSchool({ ...data, enterprise_id: enterpriseId });
    },

    async updateSchool(enterpriseId: string, schoolId: string, data: any) {
      if (!enterpriseId || !schoolId) throw new AppError('Identifiants requis');
      const existing = await repo.findSchoolById(enterpriseId, schoolId);
      if (!existing) throw new AppError('École non trouvée');
      return repo.updateSchool(enterpriseId, schoolId, data);
    },

    async deleteSchool(enterpriseId: string, schoolId: string) {
      if (!enterpriseId || !schoolId) throw new AppError('Identifiants requis');
      const existing = await repo.findSchoolById(enterpriseId, schoolId);
      if (!existing) throw new AppError('École non trouvée');
      return repo.deleteSchool(enterpriseId, schoolId);
    },

    async suspendSchool(enterpriseId: string, schoolId: string, reason?: string) {
      if (!enterpriseId || !schoolId) throw new AppError('Identifiants requis');
      const existing = await repo.findSchoolById(enterpriseId, schoolId);
      if (!existing) throw new AppError('École non trouvée');
      return repo.suspendSchool(enterpriseId, schoolId, reason);
    },

    async activateSchool(enterpriseId: string, schoolId: string) {
      if (!enterpriseId || !schoolId) throw new AppError('Identifiants requis');
      const existing = await repo.findSchoolById(enterpriseId, schoolId);
      if (!existing) throw new AppError('École non trouvée');
      return repo.activateSchool(enterpriseId, schoolId);
    },

    async blockSchool(enterpriseId: string, schoolId: string, reason?: string) {
      if (!enterpriseId || !schoolId) throw new AppError('Identifiants requis');
      const existing = await repo.findSchoolById(enterpriseId, schoolId);
      if (!existing) throw new AppError('École non trouvée');
      return repo.blockSchool(enterpriseId, schoolId, reason);
    },

    async archiveSchool(enterpriseId: string, schoolId: string) {
      if (!enterpriseId || !schoolId) throw new AppError('Identifiants requis');
      const existing = await repo.findSchoolById(enterpriseId, schoolId);
      if (!existing) throw new AppError('École non trouvée');
      return repo.archiveSchool(enterpriseId, schoolId);
    },

    async cloneSchool(enterpriseId: string, schoolId: string, data: any) {
      if (!enterpriseId || !schoolId) throw new AppError('Identifiants requis');
      if (!data?.name) throw new AppError('Le nom de l\'école clonée est requis');
      const existing = await repo.findSchoolById(enterpriseId, schoolId);
      if (!existing) throw new AppError('École non trouvée');
      return repo.cloneSchool(enterpriseId, schoolId, data);
    },

    async migrateSchool(enterpriseId: string, schoolId: string, targetPlan: string) {
      if (!enterpriseId || !schoolId) throw new AppError('Identifiants requis');
      if (!targetPlan) throw new AppError('Le plan cible est requis');
      const existing = await repo.findSchoolById(enterpriseId, schoolId);
      if (!existing) throw new AppError('École non trouvée');
      return repo.migrateSchool(enterpriseId, schoolId, targetPlan);
    },
  };
}
