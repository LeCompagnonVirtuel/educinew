import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocWebDAVError,
  DocWebDAVConnectionError,
  DocWebDAVAuthError,
  DocWebDAVSyncError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createWebdavService(repository: DocumentRepositoryEnterprise) {
  return {
    async getWebDAVConfigs(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching WebDAV configs', { schoolId, userId }, 'WebDAVService');

        const configs = await repository.getWebDAVConfigs(schoolId);

        logger.info('WebDAV configs fetched', { schoolId, count: configs.length }, 'WebDAVService');

        return configs;
      } catch (error) {
        logger.error('Failed to fetch WebDAV configs', { schoolId, error }, 'WebDAVService');
        throw error;
      }
    },

    async createWebDAVConfig(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || !data.url) throw new DocValidationError('WebDAV url is required');

        logger.info('Creating WebDAV config', { schoolId, userId, url: data.url }, 'WebDAVService');

        const config = await repository.createWebDAVConfig(
          { ...data, createdBy: userId } as any,
          schoolId
        );

        logger.info('WebDAV config created successfully', { configId: config.id }, 'WebDAVService');

        return config;
      } catch (error) {
        logger.error('Failed to create WebDAV config', { schoolId, error }, 'WebDAVService');
        throw error;
      }
    },

    async updateWebDAVConfig(schoolId: string, configId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!configId) throw new DocValidationError('configId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('update data is required');

        logger.info('Updating WebDAV config', { schoolId, configId, userId }, 'WebDAVService');

        const configs = await repository.getWebDAVConfigs(schoolId);
        const existing = configs.find((c) => c.id === configId);
        if (!existing) throw new DocWebDAVError('WebDAV config not found');

        const updated = await repository.updateWebDAVConfig(configId, data as any);

        logger.info('WebDAV config updated successfully', { configId }, 'WebDAVService');

        return updated;
      } catch (error) {
        logger.error('Failed to update WebDAV config', { configId, error }, 'WebDAVService');
        throw error;
      }
    },

    async deleteWebDAVConfig(schoolId: string, configId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!configId) throw new DocValidationError('configId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Deleting WebDAV config', { schoolId, configId, userId }, 'WebDAVService');

        const configs = await repository.getWebDAVConfigs(schoolId);
        const existing = configs.find((c) => c.id === configId);
        if (!existing) throw new DocWebDAVError('WebDAV config not found');

        await repository.deleteWebDAVConfig(configId);

        logger.info('WebDAV config deleted successfully', { configId }, 'WebDAVService');
      } catch (error) {
        logger.error('Failed to delete WebDAV config', { configId, error }, 'WebDAVService');
        throw error;
      }
    },

    async testWebDAVConnection(schoolId: string, configId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!configId) throw new DocValidationError('configId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Testing WebDAV connection', { schoolId, configId, userId }, 'WebDAVService');

        const configs = await repository.getWebDAVConfigs(schoolId);
        const existing = configs.find((c) => c.id === configId);
        if (!existing) throw new DocWebDAVError('WebDAV config not found');

        const result = await repository.testWebDAVConnection(configId);

        logger.info('WebDAV connection tested successfully', { configId }, 'WebDAVService');

        return result;
      } catch (error) {
        logger.error('Failed to test WebDAV connection', { configId, error }, 'WebDAVService');
        throw error;
      }
    },
  };
}
