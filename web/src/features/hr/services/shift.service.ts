import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createShiftService(repo: HRRepositoryExtended) {
  return {
    async findShifts(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.findShifts(schoolId);
    },

    async findShiftById(schoolId: string, shiftId: string) {
      if (!schoolId || !shiftId) throw new AppError('Identifiants requis');
      const shift = await repo.findShiftById(schoolId, shiftId);
      if (!shift) throw new AppError('Équipe non trouvée');
      return shift;
    },

    async createShift(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.name) throw new AppError('Le nom de l\'équipe est requis');
      return repo.createSchedule({ ...data, school_id: schoolId });
    },

    async updateShift(schoolId: string, shiftId: string, data: any) {
      if (!schoolId || !shiftId) throw new AppError('Identifiants requis');
      const existing = await repo.findShiftById(schoolId, shiftId);
      if (!existing) throw new AppError('Équipe non trouvée');
      return repo.updateSchedule(schoolId, shiftId, data);
    },

    async deleteShift(schoolId: string, shiftId: string) {
      if (!schoolId || !shiftId) throw new AppError('Identifiants requis');
      const existing = await repo.findShiftById(schoolId, shiftId);
      if (!existing) throw new AppError('Équipe non trouvée');
      return repo.deleteSchedule(schoolId, shiftId);
    },
  };
}
