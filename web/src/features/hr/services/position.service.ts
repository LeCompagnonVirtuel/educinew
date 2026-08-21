import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createPositionService(repo: HRRepositoryExtended) {
  return {
    async findPositions(schoolId: string, departmentId?: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.findPositions(schoolId, departmentId);
    },

    async findPositionById(schoolId: string, positionId: string) {
      if (!schoolId || !positionId) throw new AppError('Identifiants requis');
      const position = await repo.findPositionById(schoolId, positionId);
      if (!position) throw new AppError('Poste non trouvé');
      return position;
    },

    async createPosition(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.name) throw new AppError('Le nom du poste est requis');
      return repo.createPosition({ ...data, school_id: schoolId });
    },

    async updatePosition(schoolId: string, positionId: string, data: any) {
      if (!schoolId || !positionId) throw new AppError('Identifiants requis');
      const existing = await repo.findPositionById(schoolId, positionId);
      if (!existing) throw new AppError('Poste non trouvé');
      return repo.updatePosition(schoolId, positionId, data);
    },

    async deletePosition(schoolId: string, positionId: string) {
      if (!schoolId || !positionId) throw new AppError('Identifiants requis');
      const existing = await repo.findPositionById(schoolId, positionId);
      if (!existing) throw new AppError('Poste non trouvé');
      return repo.deletePosition(schoolId, positionId);
    },
  };
}
