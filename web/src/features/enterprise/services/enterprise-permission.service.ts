import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterprisePermissionService(repo: EnterpriseRepositoryExtended) {
  return {
    async checkPermission(enterpriseId: string, userId: string, permission: string) {
      if (!enterpriseId || !userId) throw new AppError('Identifiants requis');
      if (!permission) throw new AppError('La permission est requise');
      return repo.checkPermission(enterpriseId, userId, permission);
    },
  };
}
