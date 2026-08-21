import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgWebhookDeliveryError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createWebhookDeliveryService(repository: EnterpriseIntegrationRepository) {
  return {
    async listWebhookDeliveries(schoolId: string, userId: string, webhookId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing webhook deliveries', { schoolId, userId, webhookId }, 'WebhookDeliveryService');
        const result = await repository.listWebhookDeliveries(schoolId, webhookId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list webhook deliveries', { schoolId, webhookId, error }, 'WebhookDeliveryService');
        throw error;
      }
    },

    async getWebhookDelivery(schoolId: string, userId: string, deliveryId: string) {
      try {
        logger.info('Getting webhook delivery', { schoolId, userId, deliveryId }, 'WebhookDeliveryService');
        const result = await repository.getWebhookDelivery(schoolId, deliveryId);
        return result;
      } catch (error) {
        logger.error('Failed to get webhook delivery', { schoolId, deliveryId, error }, 'WebhookDeliveryService');
        throw error;
      }
    },

    async getWebhookDeliveryStats(schoolId: string, userId: string, webhookId: string, timeRange: Record<string, unknown>) {
      try {
        logger.info('Getting webhook delivery stats', { schoolId, userId, webhookId }, 'WebhookDeliveryService');
        const result = await repository.getWebhookDeliveryStats(schoolId, webhookId, timeRange);
        return result;
      } catch (error) {
        logger.error('Failed to get webhook delivery stats', { schoolId, webhookId, error }, 'WebhookDeliveryService');
        throw error;
      }
    },

    async retryWebhookDelivery(schoolId: string, userId: string, deliveryId: string) {
      try {
        logger.info('Retrying webhook delivery', { schoolId, userId, deliveryId }, 'WebhookDeliveryService');
        const result = await repository.retryWebhookDelivery(schoolId, deliveryId);
        return result;
      } catch (error) {
        logger.error('Failed to retry webhook delivery', { schoolId, deliveryId, error }, 'WebhookDeliveryService');
        throw error;
      }
    },

    async getFailedDeliveries(schoolId: string, userId: string, webhookId: string) {
      try {
        logger.info('Getting failed deliveries', { schoolId, userId, webhookId }, 'WebhookDeliveryService');
        const result = await repository.getFailedDeliveries(schoolId, webhookId);
        return result;
      } catch (error) {
        logger.error('Failed to get failed deliveries', { schoolId, webhookId, error }, 'WebhookDeliveryService');
        throw error;
      }
    },
  };
}