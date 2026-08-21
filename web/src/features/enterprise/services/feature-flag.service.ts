import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createFeatureFlagService(repo: EnterpriseRepositoryExtended) {
  return {
    async findFlags(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findFeatureFlags(enterpriseId, filters);
    },

    async findFlagById(enterpriseId: string, flagId: string) {
      if (!enterpriseId || !flagId) throw new AppError('Identifiants requis');
      const flag = await repo.findFeatureFlagById(enterpriseId, flagId);
      if (!flag) throw new AppError('Feature flag non trouvé');
      return flag;
    },

    async createFlag(enterpriseId: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!data?.name) throw new AppError('Le nom du flag est requis');
      return repo.createFeatureFlag({ ...data, enterprise_id: enterpriseId });
    },

    async updateFlag(enterpriseId: string, flagId: string, data: any) {
      if (!enterpriseId || !flagId) throw new AppError('Identifiants requis');
      const existing = await repo.findFeatureFlagById(enterpriseId, flagId);
      if (!existing) throw new AppError('Feature flag non trouvé');
      return repo.updateFeatureFlag(enterpriseId, flagId, data);
    },

    async deleteFlag(enterpriseId: string, flagId: string) {
      if (!enterpriseId || !flagId) throw new AppError('Identifiants requis');
      const existing = await repo.findFeatureFlagById(enterpriseId, flagId);
      if (!existing) throw new AppError('Feature flag non trouvé');
      return repo.deleteFeatureFlag(enterpriseId, flagId);
    },

    async toggleFlag(enterpriseId: string, flagId: string) {
      if (!enterpriseId || !flagId) throw new AppError('Identifiants requis');
      const existing = await repo.findFeatureFlagById(enterpriseId, flagId);
      if (!existing) throw new AppError('Feature flag non trouvé');
      return repo.toggleFeatureFlag(enterpriseId, flagId);
    },

    async checkFlag(enterpriseId: string, flagName: string) {
      if (!enterpriseId || !flagName) throw new AppError('Identifiants requis');
      return repo.checkFeatureFlag(enterpriseId, flagName);
    },
  };
}
