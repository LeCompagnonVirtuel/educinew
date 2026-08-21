import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgSubscriptionError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createSubscriptionService(repository: EnterpriseIntegrationRepository) {
  return {
    async getSubscription(schoolId: string, userId: string, subscriptionId: string) {
      try {
        logger.info('Getting subscription', { schoolId, userId, subscriptionId }, 'SubscriptionService');
        const result = await repository.getSubscription(schoolId, subscriptionId);
        return result;
      } catch (error) {
        logger.error('Failed to get subscription', { schoolId, subscriptionId, error }, 'SubscriptionService');
        throw error;
      }
    },

    async listSubscriptions(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing subscriptions', { schoolId, userId }, 'SubscriptionService');
        const result = await repository.listSubscriptions(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list subscriptions', { schoolId, error }, 'SubscriptionService');
        throw error;
      }
    },

    async createSubscription(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating subscription', { schoolId, userId }, 'SubscriptionService');
        const result = await repository.createSubscription(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create subscription', { schoolId, error }, 'SubscriptionService');
        throw error;
      }
    },

    async updateSubscription(schoolId: string, userId: string, subscriptionId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating subscription', { schoolId, userId, subscriptionId }, 'SubscriptionService');
        const result = await repository.updateSubscription(schoolId, subscriptionId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update subscription', { schoolId, subscriptionId, error }, 'SubscriptionService');
        throw error;
      }
    },

    async deleteSubscription(schoolId: string, userId: string, subscriptionId: string) {
      try {
        logger.info('Deleting subscription', { schoolId, userId, subscriptionId }, 'SubscriptionService');
        await repository.deleteSubscription(schoolId, subscriptionId);
      } catch (error) {
        logger.error('Failed to delete subscription', { schoolId, subscriptionId, error }, 'SubscriptionService');
        throw error;
      }
    },

    async pauseSubscription(schoolId: string, userId: string, subscriptionId: string) {
      try {
        logger.info('Pausing subscription', { schoolId, userId, subscriptionId }, 'SubscriptionService');
        const result = await repository.pauseSubscription(schoolId, subscriptionId);
        return result;
      } catch (error) {
        logger.error('Failed to pause subscription', { schoolId, subscriptionId, error }, 'SubscriptionService');
        throw error;
      }
    },

    async resumeSubscription(schoolId: string, userId: string, subscriptionId: string) {
      try {
        logger.info('Resuming subscription', { schoolId, userId, subscriptionId }, 'SubscriptionService');
        const result = await repository.resumeSubscription(schoolId, subscriptionId);
        return result;
      } catch (error) {
        logger.error('Failed to resume subscription', { schoolId, subscriptionId, error }, 'SubscriptionService');
        throw error;
      }
    },
  };
}