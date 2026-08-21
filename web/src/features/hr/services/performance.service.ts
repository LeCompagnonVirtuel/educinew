import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createPerformanceService(repo: HRRepositoryExtended) {
  return {
    async findPerformanceReviews(schoolId: string, employeeId?: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.findPerformanceReviews(schoolId, employeeId);
    },

    async findPerformanceReviewById(schoolId: string, reviewId: string) {
      if (!schoolId || !reviewId) throw new AppError('Identifiants requis');
      const review = await repo.findPerformanceReviewById(schoolId, reviewId);
      if (!review) throw new AppError('Évaluation non trouvée');
      return review;
    },

    async createPerformanceReview(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.employee_id) throw new AppError('L\'identifiant de l\'employé est requis');
      if (!data?.review_period) throw new AppError('La période d\'évaluation est requise');

      const employee = await repo.findEmployeeById(schoolId, data.employee_id);
      if (!employee) throw new AppError('Employé non trouvé');

      return repo.createPerformanceReview({ ...data, school_id: schoolId });
    },

    async updatePerformanceReview(schoolId: string, reviewId: string, data: any) {
      if (!schoolId || !reviewId) throw new AppError('Identifiants requis');
      const existing = await repo.findPerformanceReviewById(schoolId, reviewId);
      if (!existing) throw new AppError('Évaluation non trouvée');
      return repo.updatePerformanceReview(schoolId, reviewId, data);
    },

    async findReviewsByEmployee(schoolId: string, employeeId: string) {
      if (!schoolId || !employeeId) throw new AppError('Identifiants requis');
      return repo.findPerformanceReviews(schoolId, employeeId);
    },
  };
}
