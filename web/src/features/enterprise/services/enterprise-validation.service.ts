import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseValidationService(repo: EnterpriseRepositoryExtended) {
  return {
    async validateData(enterpriseId: string, type: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!type) throw new AppError('Le type de validation est requis');
      if (!data) throw new AppError('Les données à valider sont requises');
      return repo.validateData(enterpriseId, type, data);
    },
  };
}
