import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createInterviewService(repo: HRRepositoryExtended) {
  return {
    async findInterviews(schoolId: string, candidateId?: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.findInterviews(schoolId, candidateId);
    },

    async findInterviewById(schoolId: string, interviewId: string) {
      if (!schoolId || !interviewId) throw new AppError('Identifiants requis');
      const interview = await repo.findInterviewById(schoolId, interviewId);
      if (!interview) throw new AppError('Entretien non trouvé');
      return interview;
    },

    async createInterview(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.candidate_id) throw new AppError('L\'identifiant du candidat est requis');
      if (!data?.scheduled_date) throw new AppError('La date prévue est requise');

      const candidate = await repo.findCandidateById(schoolId, data.candidate_id);
      if (!candidate) throw new AppError('Candidat non trouvé');

      return repo.createInterview({ ...data, school_id: schoolId });
    },

    async updateInterview(schoolId: string, interviewId: string, data: any) {
      if (!schoolId || !interviewId) throw new AppError('Identifiants requis');
      const existing = await repo.findInterviewById(schoolId, interviewId);
      if (!existing) throw new AppError('Entretien non trouvé');
      return repo.updateInterview(schoolId, interviewId, data);
    },

    async findInterviewsByCandidate(schoolId: string, candidateId: string) {
      if (!schoolId || !candidateId) throw new AppError('Identifiants requis');
      return repo.findInterviews(schoolId, candidateId);
    },
  };
}
