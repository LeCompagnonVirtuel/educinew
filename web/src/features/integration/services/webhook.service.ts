import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgWebhookError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createWebhookService(repository: EnterpriseIntegrationRepository) {
  return {
    async getWebhook(schoolId: string, userId: string, webhookId: string) {
      try {
        logger.info('Getting webhook', { schoolId, userId, webhookId }, 'WebhookService');
        const result = await repository.getWebhook(schoolId, webhookId);
        return result;
      } catch (error) {
        logger.error('Failed to get webhook', { schoolId, webhookId, error }, 'WebhookService');
        throw error;
      }
    },

    async listWebhooks(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing webhooks', { schoolId, userId }, 'WebhookService');
        const result = await repository.listWebhooks(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list webhooks', { schoolId, error }, 'WebhookService');
        throw error;
      }
    },

    async createWebhook(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating webhook', { schoolId, userId }, 'WebhookService');
        const result = await repository.createWebhook(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create webhook', { schoolId, error }, 'WebhookService');
        throw error;
      }
    },

    async updateWebhook(schoolId: string, userId: string, webhookId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating webhook', { schoolId, userId, webhookId }, 'WebhookService');
        const result = await repository.updateWebhook(schoolId, webhookId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update webhook', { schoolId, webhookId, error }, 'WebhookService');
        throw error;
      }
    },

    async deleteWebhook(schoolId: string, userId: string, webhookId: string) {
      try {
        logger.info('Deleting webhook', { schoolId, userId, webhookId }, 'WebhookService');
        await repository.deleteWebhook(schoolId, webhookId);
      } catch (error) {
        logger.error('Failed to delete webhook', { schoolId, webhookId, error }, 'WebhookService');
        throw error;
      }
    },

    async testWebhook(schoolId: string, userId: string, webhookId: string) {
      try {
        logger.info('Testing webhook', { schoolId, userId, webhookId }, 'WebhookService');
        const result = await repository.testWebhook(schoolId, webhookId);
        return result;
      } catch (error) {
        logger.error('Failed to test webhook', { schoolId, webhookId, error }, 'WebhookService');
        throw error;
      }
    },

    async replayWebhook(schoolId: string, userId: string, webhookId: string, deliveryId: string) {
      try {
        logger.info('Replaying webhook', { schoolId, userId, webhookId, deliveryId }, 'WebhookService');
        const result = await repository.replayWebhook(schoolId, webhookId, deliveryId);
        return result;
      } catch (error) {
        logger.error('Failed to replay webhook', { schoolId, webhookId, deliveryId, error }, 'WebhookService');
        throw error;
      }
    },

    async pauseWebhook(schoolId: string, userId: string, webhookId: string) {
      try {
        logger.info('Pausing webhook', { schoolId, userId, webhookId }, 'WebhookService');
        const result = await repository.pauseWebhook(schoolId, webhookId);
        return result;
      } catch (error) {
        logger.error('Failed to pause webhook', { schoolId, webhookId, error }, 'WebhookService');
        throw error;
      }
    },

    async resumeWebhook(schoolId: string, userId: string, webhookId: string) {
      try {
        logger.info('Resuming webhook', { schoolId, userId, webhookId }, 'WebhookService');
        const result = await repository.resumeWebhook(schoolId, webhookId);
        return result;
      } catch (error) {
        logger.error('Failed to resume webhook', { schoolId, webhookId, error }, 'WebhookService');
        throw error;
      }
    },

    async getWebhookStats(schoolId: string, userId: string, webhookId: string) {
      try {
        logger.info('Getting webhook stats', { schoolId, userId, webhookId }, 'WebhookService');
        const result = await repository.getWebhookStats(schoolId, webhookId);
        return result;
      } catch (error) {
        logger.error('Failed to get webhook stats', { schoolId, webhookId, error }, 'WebhookService');
        throw error;
      }
    },
  };
}