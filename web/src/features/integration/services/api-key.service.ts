import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgApiKeyError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createApiKeyService(repository: EnterpriseIntegrationRepository) {
  return {
    async getApiKey(schoolId: string, userId: string, keyId: string) {
      try {
        logger.info('Getting API key', { schoolId, userId, keyId }, 'ApiKeyService');
        const result = await repository.getApiKey(schoolId, keyId);
        return result;
      } catch (error) {
        logger.error('Failed to get API key', { schoolId, keyId, error }, 'ApiKeyService');
        throw error;
      }
    },

    async listApiKeys(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing API keys', { schoolId, userId }, 'ApiKeyService');
        const result = await repository.listApiKeys(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list API keys', { schoolId, error }, 'ApiKeyService');
        throw error;
      }
    },

    async createApiKey(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating API key', { schoolId, userId }, 'ApiKeyService');
        const result = await repository.createApiKey(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create API key', { schoolId, error }, 'ApiKeyService');
        throw error;
      }
    },

    async updateApiKey(schoolId: string, userId: string, keyId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating API key', { schoolId, userId, keyId }, 'ApiKeyService');
        const result = await repository.updateApiKey(schoolId, keyId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update API key', { schoolId, keyId, error }, 'ApiKeyService');
        throw error;
      }
    },

    async deleteApiKey(schoolId: string, userId: string, keyId: string) {
      try {
        logger.info('Deleting API key', { schoolId, userId, keyId }, 'ApiKeyService');
        await repository.deleteApiKey(schoolId, keyId);
      } catch (error) {
        logger.error('Failed to delete API key', { schoolId, keyId, error }, 'ApiKeyService');
        throw error;
      }
    },

    async revokeApiKey(schoolId: string, userId: string, keyId: string, reason: string) {
      try {
        logger.info('Revoking API key', { schoolId, userId, keyId, reason }, 'ApiKeyService');
        const result = await repository.revokeApiKey(schoolId, keyId, reason);
        return result;
      } catch (error) {
        logger.error('Failed to revoke API key', { schoolId, keyId, error }, 'ApiKeyService');
        throw error;
      }
    },

    async validateApiKey(schoolId: string, apiKey: string) {
      try {
        logger.info('Validating API key', { schoolId }, 'ApiKeyService');
        const result = await repository.validateApiKey(schoolId, apiKey);
        return result;
      } catch (error) {
        logger.error('Failed to validate API key', { schoolId, error }, 'ApiKeyService');
        throw error;
      }
    },

    async rotateApiKey(schoolId: string, userId: string, keyId: string) {
      try {
        logger.info('Rotating API key', { schoolId, userId, keyId }, 'ApiKeyService');
        const result = await repository.rotateApiKey(schoolId, keyId);
        return result;
      } catch (error) {
        logger.error('Failed to rotate API key', { schoolId, keyId, error }, 'ApiKeyService');
        throw error;
      }
    },
  };
}