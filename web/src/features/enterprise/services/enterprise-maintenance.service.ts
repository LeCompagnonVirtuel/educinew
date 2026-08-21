import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseMaintenanceService(repo: EnterpriseRepositoryExtended) {
  return {
    async findWindows(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findMaintenanceWindows(enterpriseId, filters);
    },

    async findWindowById(enterpriseId: string, windowId: string) {
      if (!enterpriseId || !windowId) throw new AppError('Identifiants requis');
      const window = await repo.findMaintenanceWindowById(enterpriseId, windowId);
      if (!window) throw new AppError('Fenêtre de maintenance non trouvée');
      return window;
    },

    async createWindow(enterpriseId: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!data?.title) throw new AppError('Le titre est requis');
      if (!data?.start_time) throw new AppError('L\'heure de début est requise');
      if (!data?.end_time) throw new AppError('L\'heure de fin est requise');
      return repo.createMaintenanceWindow({ ...data, enterprise_id: enterpriseId });
    },

    async updateWindow(enterpriseId: string, windowId: string, data: any) {
      if (!enterpriseId || !windowId) throw new AppError('Identifiants requis');
      const existing = await repo.findMaintenanceWindowById(enterpriseId, windowId);
      if (!existing) throw new AppError('Fenêtre de maintenance non trouvée');
      return repo.updateMaintenanceWindow(enterpriseId, windowId, data);
    },

    async deleteWindow(enterpriseId: string, windowId: string) {
      if (!enterpriseId || !windowId) throw new AppError('Identifiants requis');
      const existing = await repo.findMaintenanceWindowById(enterpriseId, windowId);
      if (!existing) throw new AppError('Fenêtre de maintenance non trouvée');
      return repo.deleteMaintenanceWindow(enterpriseId, windowId);
    },
  };
}
