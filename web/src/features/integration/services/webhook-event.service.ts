import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgWebhookEventError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createWebhookEventService(repository: EnterpriseIntegrationRepository) {
  return {
    async listWebhookEvents(schoolId: string, userId: string, webhookId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing webhook events', { schoolId, userId, webhookId }, 'WebhookEventService');
        const result = await repository.listWebhookEvents(schoolId, webhookId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list webhook events', { schoolId, webhookId, error }, 'WebhookEventService');
        throw error;
      }
    },

    async getWebhookEvent(schoolId: string, userId: string, eventId: string) {
      try {
        logger.info('Getting webhook event', { schoolId, userId, eventId }, 'WebhookEventService');
        const result = await repository.getWebhookEvent(schoolId, eventId);
        return result;
      } catch (error) {
        logger.error('Failed to get webhook event', { schoolId, eventId, error }, 'WebhookEventService');
        throw error;
      }
    },

    async retryWebhookEvent(schoolId: string, userId: string, eventId: string) {
      try {
        logger.info('Retrying webhook event', { schoolId, userId, eventId }, 'WebhookEventService');
        const result = await repository.retryWebhookEvent(schoolId, eventId);
        return result;
      } catch (error) {
        logger.error('Failed to retry webhook event', { schoolId, eventId, error }, 'WebhookEventService');
        throw error;
      }
    },

    async getWebhookEventStats(schoolId: string, userId: string, webhookId: string) {
      try {
        logger.info('Getting webhook event stats', { schoolId, userId, webhookId }, 'WebhookEventService');
        const result = await repository.getWebhookEventStats(schoolId, webhookId);
        return result;
      } catch (error) {
        logger.error('Failed to get webhook event stats', { schoolId, webhookId, error }, 'WebhookEventService');
        throw error;
      }
    },

    async deleteWebhookEvents(schoolId: string, userId: string, webhookId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Deleting webhook events', { schoolId, userId, webhookId }, 'WebhookEventService');
        await repository.deleteWebhookEvents(schoolId, webhookId, filters);
      } catch (error) {
        logger.error('Failed to delete webhook events', { schoolId, webhookId, error }, 'WebhookEventService');
        throw error;
      }
    },
  };
}