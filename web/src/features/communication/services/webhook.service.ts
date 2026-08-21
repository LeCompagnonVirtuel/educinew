import type { CommunicationRepositoryExtended, Webhook } from '@/features/communication/types';
import { logger } from '@educi/logger';

export function createWebhookService(repository: CommunicationRepositoryExtended) {
  return {
    async getWebhooks(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching webhooks', { schoolId, userId }, 'WebhookService');

        const webhooks = await repository.getWebhooks(schoolId, userId, filters);

        logger.info('Webhooks fetched', { schoolId, count: webhooks.length }, 'WebhookService');

        return webhooks;
      } catch (error) {
        logger.error('Failed to fetch webhooks', { schoolId }, 'WebhookService');
        throw error;
      }
    },

    async createWebhook(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.url) throw new Error('webhook URL is required');
        if (!data.events || data.events.length === 0) throw new Error('at least one event is required');

        logger.info('Creating webhook', { schoolId, userId, url: data.url }, 'WebhookService');

        const webhook = await repository.createWebhook({
          ...data,
          schoolId,
          createdBy: userId,
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'webhook.created', { webhookId: webhook.id, userId });

        logger.info('Webhook created', { webhookId: webhook.id }, 'WebhookService');

        return webhook;
      } catch (error) {
        logger.error('Failed to create webhook', { schoolId }, 'WebhookService');
        throw error;
      }
    },

    async updateWebhook(webhookId: string, userId: string, data: any) {
      try {
        if (!webhookId) throw new Error('webhookId is required');
        if (!userId) throw new Error('userId is required');
        if (!data) throw new Error('update data is required');

        logger.info('Updating webhook', { webhookId, userId }, 'WebhookService');

        const updated = await repository.updateWebhook(webhookId, {
          ...data,
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(data.schoolId || '', 'webhook.updated', { webhookId, userId });

        logger.info('Webhook updated', { webhookId }, 'WebhookService');

        return updated;
      } catch (error) {
        logger.error('Failed to update webhook', { webhookId }, 'WebhookService');
        throw error;
      }
    },

    async deleteWebhook(webhookId: string, userId: string) {
      try {
        if (!webhookId) throw new Error('webhookId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Deleting webhook', { webhookId, userId }, 'WebhookService');

        await repository.deleteWebhook(webhookId);

        await repository.logCommunicationEvent('', 'webhook.deleted', { webhookId, userId });

        logger.info('Webhook deleted', { webhookId }, 'WebhookService');
      } catch (error) {
        logger.error('Failed to delete webhook', { webhookId }, 'WebhookService');
        throw error;
      }
    },
  };
}
