import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgApiVersionError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createApiVersionService(repository: EnterpriseIntegrationRepository) {
  return {
    async getApiVersion(schoolId: string, userId: string, versionId: string) {
      try {
        logger.info('Getting API version', { schoolId, userId, versionId }, 'ApiVersionService');
        const result = await repository.getApiVersion(schoolId, versionId);
        return result;
      } catch (error) {
        logger.error('Failed to get API version', { schoolId, versionId, error }, 'ApiVersionService');
        throw error;
      }
    },

    async listApiVersions(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing API versions', { schoolId, userId }, 'ApiVersionService');
        const result = await repository.listApiVersions(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list API versions', { schoolId, error }, 'ApiVersionService');
        throw error;
      }
    },

    async createApiVersion(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating API version', { schoolId, userId }, 'ApiVersionService');
        const result = await repository.createApiVersion(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create API version', { schoolId, error }, 'ApiVersionService');
        throw error;
      }
    },

    async updateApiVersion(schoolId: string, userId: string, versionId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating API version', { schoolId, userId, versionId }, 'ApiVersionService');
        const result = await repository.updateApiVersion(schoolId, versionId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update API version', { schoolId, versionId, error }, 'ApiVersionService');
        throw error;
      }
    },

    async deleteApiVersion(schoolId: string, userId: string, versionId: string) {
      try {
        logger.info('Deleting API version', { schoolId, userId, versionId }, 'ApiVersionService');
        await repository.deleteApiVersion(schoolId, versionId);
      } catch (error) {
        logger.error('Failed to delete API version', { schoolId, versionId, error }, 'ApiVersionService');
        throw error;
      }
    },

    async deprecateApiVersion(schoolId: string, userId: string, versionId: string) {
      try {
        logger.info('Deprecating API version', { schoolId, userId, versionId }, 'ApiVersionService');
        const result = await repository.deprecateApiVersion(schoolId, versionId);
        return result;
      } catch (error) {
        logger.error('Failed to deprecate API version', { schoolId, versionId, error }, 'ApiVersionService');
        throw error;
      }
    },
  };
}