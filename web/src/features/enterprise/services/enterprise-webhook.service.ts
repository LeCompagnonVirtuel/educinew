import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseWebhookService(repo: EnterpriseRepositoryExtended) {
  return {
    async findWebhooks(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findWebhooks(enterpriseId, filters);
    },

    async findWebhookById(enterpriseId: string, webhookId: string) {
      if (!enterpriseId || !webhookId) throw new AppError('Identifiants requis');
      const webhook = await repo.findWebhookById(enterpriseId, webhookId);
      if (!webhook) throw new AppError('Webhook non trouvé');
      return webhook;
    },

    async createWebhook(enterpriseId: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!data?.url) throw new AppError('L\'URL du webhook est requise');
      if (!data?.events) throw new AppError('Les événements sont requis');
      return repo.createWebhook({ ...data, enterprise_id: enterpriseId });
    },

    async updateWebhook(enterpriseId: string, webhookId: string, data: any) {
      if (!enterpriseId || !webhookId) throw new AppError('Identifiants requis');
      const existing = await repo.findWebhookById(enterpriseId, webhookId);
      if (!existing) throw new AppError('Webhook non trouvé');
      return repo.updateWebhook(enterpriseId, webhookId, data);
    },

    async deleteWebhook(enterpriseId: string, webhookId: string) {
      if (!enterpriseId || !webhookId) throw new AppError('Identifiants requis');
      const existing = await repo.findWebhookById(enterpriseId, webhookId);
      if (!existing) throw new AppError('Webhook non trouvé');
      return repo.deleteWebhook(enterpriseId, webhookId);
    },
  };
}
