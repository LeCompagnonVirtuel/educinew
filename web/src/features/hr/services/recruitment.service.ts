import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createRecruitmentService(repo: HRRepositoryExtended) {
  return {
    async findRecruitments(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.findRecruitments(schoolId);
    },

    async findRecruitmentById(schoolId: string, recruitmentId: string) {
      if (!schoolId || !recruitmentId) throw new AppError('Identifiants requis');
      const recruitment = await repo.findRecruitmentById(schoolId, recruitmentId);
      if (!recruitment) throw new AppError('Recrutement non trouvé');
      return recruitment;
    },

    async createRecruitment(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.title) throw new AppError('Le titre du recrutement est requis');
      if (!data?.position_id) throw new AppError('L\'identifiant du poste est requis');
      return repo.createRecruitment({ ...data, school_id: schoolId });
    },

    async updateRecruitment(schoolId: string, recruitmentId: string, data: any) {
      if (!schoolId || !recruitmentId) throw new AppError('Identifiants requis');
      const existing = await repo.findRecruitmentById(schoolId, recruitmentId);
      if (!existing) throw new AppError('Recrutement non trouvé');
      return repo.updateRecruitment(schoolId, recruitmentId, data);
    },

    async deleteRecruitment(schoolId: string, recruitmentId: string) {
      if (!schoolId || !recruitmentId) throw new AppError('Identifiants requis');
      const existing = await repo.findRecruitmentById(schoolId, recruitmentId);
      if (!existing) throw new AppError('Recrutement non trouvé');
      return repo.deleteRecruitment(schoolId, recruitmentId);
    },
  };
}
