import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseUserService(repo: EnterpriseRepositoryExtended) {
  return {
    async findUsers(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findUsers(enterpriseId, filters);
    },

    async findUserById(enterpriseId: string, userId: string) {
      if (!enterpriseId || !userId) throw new AppError('Identifiants requis');
      const user = await repo.findUserById(enterpriseId, userId);
      if (!user) throw new AppError('Utilisateur non trouvé');
      return user;
    },

    async findUserByEmail(enterpriseId: string, email: string) {
      if (!enterpriseId || !email) throw new AppError('Identifiants requis');
      const user = await repo.findUserByEmail(enterpriseId, email);
      if (!user) throw new AppError('Utilisateur non trouvé');
      return user;
    },

    async createUser(enterpriseId: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!data?.email) throw new AppError('L\'email est requis');
      if (!data?.name) throw new AppError('Le nom est requis');

      const existing = await repo.findUserByEmail(enterpriseId, data.email);
      if (existing) throw new AppError('Un utilisateur avec cet email existe déjà');

      return repo.createUser({ ...data, enterprise_id: enterpriseId });
    },

    async updateUser(enterpriseId: string, userId: string, data: any) {
      if (!enterpriseId || !userId) throw new AppError('Identifiants requis');
      const existing = await repo.findUserById(enterpriseId, userId);
      if (!existing) throw new AppError('Utilisateur non trouvé');

      if (data.email && data.email !== existing.email) {
        const duplicate = await repo.findUserByEmail(enterpriseId, data.email);
        if (duplicate) throw new AppError('Un utilisateur avec cet email existe déjà');
      }

      return repo.updateUser(enterpriseId, userId, data);
    },

    async deleteUser(enterpriseId: string, userId: string) {
      if (!enterpriseId || !userId) throw new AppError('Identifiants requis');
      const existing = await repo.findUserById(enterpriseId, userId);
      if (!existing) throw new AppError('Utilisateur non trouvé');
      return repo.deleteUser(enterpriseId, userId);
    },

    async lockUser(enterpriseId: string, userId: string, reason?: string) {
      if (!enterpriseId || !userId) throw new AppError('Identifiants requis');
      const existing = await repo.findUserById(enterpriseId, userId);
      if (!existing) throw new AppError('Utilisateur non trouvé');
      return repo.lockUser(enterpriseId, userId, reason);
    },

    async unlockUser(enterpriseId: string, userId: string) {
      if (!enterpriseId || !userId) throw new AppError('Identifiants requis');
      const existing = await repo.findUserById(enterpriseId, userId);
      if (!existing) throw new AppError('Utilisateur non trouvé');
      return repo.unlockUser(enterpriseId, userId);
    },

    async resetMfa(enterpriseId: string, userId: string) {
      if (!enterpriseId || !userId) throw new AppError('Identifiants requis');
      const existing = await repo.findUserById(enterpriseId, userId);
      if (!existing) throw new AppError('Utilisateur non trouvé');
      return repo.resetMfa(enterpriseId, userId);
    },
  };
}
