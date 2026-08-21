import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createPromotionService(repo: HRRepositoryExtended) {
  return {
    async findPromotions(schoolId: string, employeeId?: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.findPromotions(schoolId, employeeId);
    },

    async findPromotionById(schoolId: string, promotionId: string) {
      if (!schoolId || !promotionId) throw new AppError('Identifiants requis');
      const promotion = await repo.findPromotionById(schoolId, promotionId);
      if (!promotion) throw new AppError('Promotion non trouvée');
      return promotion;
    },

    async createPromotion(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.employee_id) throw new AppError('L\'identifiant de l\'employé est requis');
      if (!data?.new_position) throw new AppError('Le nouveau poste est requis');

      const employee = await repo.findEmployeeById(schoolId, data.employee_id);
      if (!employee) throw new AppError('Employé non trouvé');

      return repo.createPromotion({ ...data, school_id: schoolId });
    },

    async updatePromotion(schoolId: string, promotionId: string, data: any) {
      if (!schoolId || !promotionId) throw new AppError('Identifiants requis');
      const existing = await repo.findPromotionById(schoolId, promotionId);
      if (!existing) throw new AppError('Promotion non trouvée');
      return repo.updatePromotion(schoolId, promotionId, data);
    },

    async findPromotionsByEmployee(schoolId: string, employeeId: string) {
      if (!schoolId || !employeeId) throw new AppError('Identifiants requis');
      return repo.findPromotions(schoolId, employeeId);
    },
  };
}
