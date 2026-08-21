import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgRateLimitError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createRateLimitService(repository: EnterpriseIntegrationRepository) {
  return {
    async getRateLimit(schoolId: string, userId: string, limitId: string) {
      try {
        logger.info('Getting rate limit', { schoolId, userId, limitId }, 'RateLimitService');
        const result = await repository.getRateLimit(schoolId, limitId);
        return result;
      } catch (error) {
        logger.error('Failed to get rate limit', { schoolId, limitId, error }, 'RateLimitService');
        throw error;
      }
    },

    async listRateLimits(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing rate limits', { schoolId, userId }, 'RateLimitService');
        const result = await repository.listRateLimits(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list rate limits', { schoolId, error }, 'RateLimitService');
        throw error;
      }
    },

    async createRateLimit(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating rate limit', { schoolId, userId }, 'RateLimitService');
        const result = await repository.createRateLimit(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create rate limit', { schoolId, error }, 'RateLimitService');
        throw error;
      }
    },

    async updateRateLimit(schoolId: string, userId: string, limitId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating rate limit', { schoolId, userId, limitId }, 'RateLimitService');
        const result = await repository.updateRateLimit(schoolId, limitId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update rate limit', { schoolId, limitId, error }, 'RateLimitService');
        throw error;
      }
    },

    async deleteRateLimit(schoolId: string, userId: string, limitId: string) {
      try {
        logger.info('Deleting rate limit', { schoolId, userId, limitId }, 'RateLimitService');
        await repository.deleteRateLimit(schoolId, limitId);
      } catch (error) {
        logger.error('Failed to delete rate limit', { schoolId, limitId, error }, 'RateLimitService');
        throw error;
      }
    },

    async checkRateLimit(schoolId: string, userId: string, identifier: string, endpoint: string) {
      try {
        logger.info('Checking rate limit', { schoolId, userId, identifier, endpoint }, 'RateLimitService');
        const result = await repository.checkRateLimit(schoolId, identifier, endpoint);
        return result;
      } catch (error) {
        logger.error('Failed to check rate limit', { schoolId, identifier, endpoint, error }, 'RateLimitService');
        throw error;
      }
    },

    async resetRateLimit(schoolId: string, userId: string, limitId: string) {
      try {
        logger.info('Resetting rate limit', { schoolId, userId, limitId }, 'RateLimitService');
        const result = await repository.resetRateLimit(schoolId, limitId);
        return result;
      } catch (error) {
        logger.error('Failed to reset rate limit', { schoolId, limitId, error }, 'RateLimitService');
        throw error;
      }
    },

    async getRateLimitUsage(schoolId: string, userId: string, limitId: string) {
      try {
        logger.info('Getting rate limit usage', { schoolId, userId, limitId }, 'RateLimitService');
        const result = await repository.getRateLimitUsage(schoolId, limitId);
        return result;
      } catch (error) {
        logger.error('Failed to get rate limit usage', { schoolId, limitId, error }, 'RateLimitService');
        throw error;
      }
    },
  };
}