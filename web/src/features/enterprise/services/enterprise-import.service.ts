import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseImportService(repo: EnterpriseRepositoryExtended) {
  return {
    async importData(enterpriseId: string, type: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!type) throw new AppError('Le type d\'import est requis');
      if (!data) throw new AppError('Les données à importer sont requises');
      return repo.importData(enterpriseId, type, data);
    },
  };
}
