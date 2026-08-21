import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createCandidateService(repo: HRRepositoryExtended) {
  return {
    async findCandidates(schoolId: string, recruitmentId?: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.findCandidates(schoolId, recruitmentId);
    },

    async findCandidateById(schoolId: string, candidateId: string) {
      if (!schoolId || !candidateId) throw new AppError('Identifiants requis');
      const candidate = await repo.findCandidateById(schoolId, candidateId);
      if (!candidate) throw new AppError('Candidat non trouvé');
      return candidate;
    },

    async findCandidateByEmail(schoolId: string, email: string) {
      if (!schoolId || !email) throw new AppError('Identifiants requis');
      const candidate = await repo.findCandidateByEmail(schoolId, email);
      if (!candidate) throw new AppError('Candidat non trouvé');
      return candidate;
    },

    async createCandidate(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.first_name) throw new AppError('Le prénom est requis');
      if (!data?.last_name) throw new AppError('Le nom est requis');
      if (!data?.email) throw new AppError('L\'email est requis');

      const existing = await repo.findCandidateByEmail(schoolId, data.email);
      if (existing) throw new AppError('Un candidat avec cet email existe déjà');

      return repo.createCandidate({ ...data, school_id: schoolId });
    },

    async updateCandidate(schoolId: string, candidateId: string, data: any) {
      if (!schoolId || !candidateId) throw new AppError('Identifiants requis');
      const existing = await repo.findCandidateById(schoolId, candidateId);
      if (!existing) throw new AppError('Candidat non trouvé');

      if (data.email && data.email !== existing.email) {
        const duplicate = await repo.findCandidateByEmail(schoolId, data.email);
        if (duplicate) throw new AppError('Un candidat avec cet email existe déjà');
      }

      return repo.updateCandidate(schoolId, candidateId, data);
    },
  };
}
