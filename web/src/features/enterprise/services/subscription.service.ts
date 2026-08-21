import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createSubscriptionService(repo: EnterpriseRepositoryExtended) {
  return {
    async findSubscriptions(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findSubscriptions(enterpriseId, filters);
    },

    async findSubscriptionById(enterpriseId: string, subscriptionId: string) {
      if (!enterpriseId || !subscriptionId) throw new AppError('Identifiants requis');
      const subscription = await repo.findSubscriptionById(enterpriseId, subscriptionId);
      if (!subscription) throw new AppError('Abonnement non trouvé');
      return subscription;
    },

    async createSubscription(enterpriseId: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!data?.plan_id) throw new AppError('Le plan est requis');
      return repo.createSubscription({ ...data, enterprise_id: enterpriseId });
    },

    async updateSubscription(enterpriseId: string, subscriptionId: string, data: any) {
      if (!enterpriseId || !subscriptionId) throw new AppError('Identifiants requis');
      const existing = await repo.findSubscriptionById(enterpriseId, subscriptionId);
      if (!existing) throw new AppError('Abonnement non trouvé');
      return repo.updateSubscription(enterpriseId, subscriptionId, data);
    },

    async deleteSubscription(enterpriseId: string, subscriptionId: string) {
      if (!enterpriseId || !subscriptionId) throw new AppError('Identifiants requis');
      const existing = await repo.findSubscriptionById(enterpriseId, subscriptionId);
      if (!existing) throw new AppError('Abonnement non trouvé');
      return repo.deleteSubscription(enterpriseId, subscriptionId);
    },

    async renewSubscription(enterpriseId: string, subscriptionId: string) {
      if (!enterpriseId || !subscriptionId) throw new AppError('Identifiants requis');
      const existing = await repo.findSubscriptionById(enterpriseId, subscriptionId);
      if (!existing) throw new AppError('Abonnement non trouvé');
      return repo.renewSubscription(enterpriseId, subscriptionId);
    },

    async cancelSubscription(enterpriseId: string, subscriptionId: string, reason?: string) {
      if (!enterpriseId || !subscriptionId) throw new AppError('Identifiants requis');
      const existing = await repo.findSubscriptionById(enterpriseId, subscriptionId);
      if (!existing) throw new AppError('Abonnement non trouvé');
      return repo.cancelSubscription(enterpriseId, subscriptionId, reason);
    },

    async changePlan(enterpriseId: string, subscriptionId: string, newPlanId: string) {
      if (!enterpriseId || !subscriptionId) throw new AppError('Identifiants requis');
      if (!newPlanId) throw new AppError('Le nouveau plan est requis');
      const existing = await repo.findSubscriptionById(enterpriseId, subscriptionId);
      if (!existing) throw new AppError('Abonnement non trouvé');
      return repo.changePlan(enterpriseId, subscriptionId, newPlanId);
    },
  };
}
