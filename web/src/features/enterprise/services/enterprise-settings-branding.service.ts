import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseSettingsBrandingService(repo: EnterpriseRepositoryExtended) {
  return {
    async findBrandingConfig(enterpriseId: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findBrandingConfig(enterpriseId);
    },

    async updateBrandingConfig(enterpriseId: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.updateBrandingConfig(enterpriseId, data);
    },
  };
}
