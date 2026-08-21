import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgOAuthError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createOAuthService(repository: EnterpriseIntegrationRepository) {
  return {
    async getOAuthConfig(schoolId: string, userId: string, configId: string) {
      try {
        logger.info('Getting OAuth config', { schoolId, userId, configId }, 'OAuthService');
        const result = await repository.getOAuthConfig(schoolId, configId);
        return result;
      } catch (error) {
        logger.error('Failed to get OAuth config', { schoolId, configId, error }, 'OAuthService');
        throw error;
      }
    },

    async listOAuthConfigs(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing OAuth configs', { schoolId, userId }, 'OAuthService');
        const result = await repository.listOAuthConfigs(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list OAuth configs', { schoolId, error }, 'OAuthService');
        throw error;
      }
    },

    async createOAuthConfig(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating OAuth config', { schoolId, userId }, 'OAuthService');
        const result = await repository.createOAuthConfig(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create OAuth config', { schoolId, error }, 'OAuthService');
        throw error;
      }
    },

    async updateOAuthConfig(schoolId: string, userId: string, configId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating OAuth config', { schoolId, userId, configId }, 'OAuthService');
        const result = await repository.updateOAuthConfig(schoolId, configId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update OAuth config', { schoolId, configId, error }, 'OAuthService');
        throw error;
      }
    },

    async deleteOAuthConfig(schoolId: string, userId: string, configId: string) {
      try {
        logger.info('Deleting OAuth config', { schoolId, userId, configId }, 'OAuthService');
        await repository.deleteOAuthConfig(schoolId, configId);
      } catch (error) {
        logger.error('Failed to delete OAuth config', { schoolId, configId, error }, 'OAuthService');
        throw error;
      }
    },

    async exchangeToken(schoolId: string, userId: string, configId: string, code: string) {
      try {
        logger.info('Exchanging OAuth token', { schoolId, userId, configId }, 'OAuthService');
        const result = await repository.exchangeToken(schoolId, configId, code);
        return result;
      } catch (error) {
        logger.error('Failed to exchange OAuth token', { schoolId, configId, error }, 'OAuthService');
        throw error;
      }
    },

    async refreshToken(schoolId: string, userId: string, configId: string, refreshToken: string) {
      try {
        logger.info('Refreshing OAuth token', { schoolId, userId, configId }, 'OAuthService');
        const result = await repository.refreshToken(schoolId, configId, refreshToken);
        return result;
      } catch (error) {
        logger.error('Failed to refresh OAuth token', { schoolId, configId, error }, 'OAuthService');
        throw error;
      }
    },

    async revokeToken(schoolId: string, userId: string, configId: string, token: string) {
      try {
        logger.info('Revoking OAuth token', { schoolId, userId, configId }, 'OAuthService');
        await repository.revokeToken(schoolId, configId, token);
      } catch (error) {
        logger.error('Failed to revoke OAuth token', { schoolId, configId, error }, 'OAuthService');
        throw error;
      }
    },

    async getAuthorizationUrl(schoolId: string, userId: string, configId: string, redirectUri: string) {
      try {
        logger.info('Getting authorization URL', { schoolId, userId, configId }, 'OAuthService');
        const result = await repository.getAuthorizationUrl(schoolId, configId, redirectUri);
        return result;
      } catch (error) {
        logger.error('Failed to get authorization URL', { schoolId, configId, error }, 'OAuthService');
        throw error;
      }
    },
  };
}