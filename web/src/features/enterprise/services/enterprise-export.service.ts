import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseExportService(repo: EnterpriseRepositoryExtended) {
  return {
    async exportData(enterpriseId: string, type: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!type) throw new AppError('Le type d\'export est requis');
      return repo.exportData(enterpriseId, type, filters);
    },
  };
}
