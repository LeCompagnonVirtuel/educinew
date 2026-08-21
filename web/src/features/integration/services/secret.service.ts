import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgSecretError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createSecretService(repository: EnterpriseIntegrationRepository) {
  return {
    async getSecret(schoolId: string, userId: string, secretId: string) {
      try {
        logger.info('Getting secret', { schoolId, userId, secretId }, 'SecretService');
        const result = await repository.getSecret(schoolId, secretId);
        return result;
      } catch (error) {
        logger.error('Failed to get secret', { schoolId, secretId, error }, 'SecretService');
        throw error;
      }
    },

    async listSecrets(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing secrets', { schoolId, userId }, 'SecretService');
        const result = await repository.listSecrets(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list secrets', { schoolId, error }, 'SecretService');
        throw error;
      }
    },

    async createSecret(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating secret', { schoolId, userId }, 'SecretService');
        const result = await repository.createSecret(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create secret', { schoolId, error }, 'SecretService');
        throw error;
      }
    },

    async updateSecret(schoolId: string, userId: string, secretId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating secret', { schoolId, userId, secretId }, 'SecretService');
        const result = await repository.updateSecret(schoolId, secretId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update secret', { schoolId, secretId, error }, 'SecretService');
        throw error;
      }
    },

    async deleteSecret(schoolId: string, userId: string, secretId: string) {
      try {
        logger.info('Deleting secret', { schoolId, userId, secretId }, 'SecretService');
        await repository.deleteSecret(schoolId, secretId);
      } catch (error) {
        logger.error('Failed to delete secret', { schoolId, secretId, error }, 'SecretService');
        throw error;
      }
    },

    async rotateSecret(schoolId: string, userId: string, secretId: string) {
      try {
        logger.info('Rotating secret', { schoolId, userId, secretId }, 'SecretService');
        const result = await repository.rotateSecret(schoolId, secretId);
        return result;
      } catch (error) {
        logger.error('Failed to rotate secret', { schoolId, secretId, error }, 'SecretService');
        throw error;
      }
    },

    async getSecretValue(schoolId: string, userId: string, secretId: string) {
      try {
        logger.info('Getting secret value', { schoolId, userId, secretId }, 'SecretService');
        const result = await repository.getSecretValue(schoolId, secretId);
        return result;
      } catch (error) {
        logger.error('Failed to get secret value', { schoolId, secretId, error }, 'SecretService');
        throw error;
      }
    },

    async getSecretHistory(schoolId: string, userId: string, secretId: string) {
      try {
        logger.info('Getting secret history', { schoolId, userId, secretId }, 'SecretService');
        const result = await repository.getSecretHistory(schoolId, secretId);
        return result;
      } catch (error) {
        logger.error('Failed to get secret history', { schoolId, secretId, error }, 'SecretService');
        throw error;
      }
    },
  };
}