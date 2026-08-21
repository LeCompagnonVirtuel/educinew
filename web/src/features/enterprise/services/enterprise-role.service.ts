import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseRoleService(repo: EnterpriseRepositoryExtended) {
  return {
    async findRoles(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findRoles(enterpriseId, filters);
    },

    async findRoleById(enterpriseId: string, roleId: string) {
      if (!enterpriseId || !roleId) throw new AppError('Identifiants requis');
      const role = await repo.findRoleById(enterpriseId, roleId);
      if (!role) throw new AppError('Rôle non trouvé');
      return role;
    },

    async createRole(enterpriseId: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!data?.name) throw new AppError('Le nom du rôle est requis');
      return repo.createRole({ ...data, enterprise_id: enterpriseId });
    },

    async updateRole(enterpriseId: string, roleId: string, data: any) {
      if (!enterpriseId || !roleId) throw new AppError('Identifiants requis');
      const existing = await repo.findRoleById(enterpriseId, roleId);
      if (!existing) throw new AppError('Rôle non trouvé');
      return repo.updateRole(enterpriseId, roleId, data);
    },

    async deleteRole(enterpriseId: string, roleId: string) {
      if (!enterpriseId || !roleId) throw new AppError('Identifiants requis');
      const existing = await repo.findRoleById(enterpriseId, roleId);
      if (!existing) throw new AppError('Rôle non trouvé');
      return repo.deleteRole(enterpriseId, roleId);
    },

    async assignRole(enterpriseId: string, userId: string, roleId: string) {
      if (!enterpriseId || !userId || !roleId) throw new AppError('Identifiants requis');
      const role = await repo.findRoleById(enterpriseId, roleId);
      if (!role) throw new AppError('Rôle non trouvé');
      return repo.assignRole(enterpriseId, userId, roleId);
    },
  };
}
