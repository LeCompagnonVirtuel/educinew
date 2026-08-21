import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocStorageError,
  DocStorageQuotaExceededError,
  DocStorageConnectionError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createStorageService(repository: DocumentRepositoryEnterprise) {
  return {
    async getStorageUsage(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching storage usage', { schoolId, userId }, 'StorageService');

        const usage = await repository.getStorageUsage(schoolId);

        logger.info('Storage usage fetched', { schoolId }, 'StorageService');

        return usage;
      } catch (error) {
        logger.error('Failed to fetch storage usage', { schoolId, error }, 'StorageService');
        throw error;
      }
    },

    async getStorageQuota(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching storage quota', { schoolId, userId }, 'StorageService');

        const quota = await repository.getStorageQuota(schoolId);

        logger.info('Storage quota fetched', { schoolId }, 'StorageService');

        return quota;
      } catch (error) {
        logger.error('Failed to fetch storage quota', { schoolId, error }, 'StorageService');
        throw error;
      }
    },

    async updateStorageQuota(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || data.maxStorage === undefined) throw new DocValidationError('maxStorage is required');

        logger.info('Updating storage quota', { schoolId, userId }, 'StorageService');

        const quota = await repository.updateStorageQuota(schoolId, data as any);

        logger.info('Storage quota updated successfully', { schoolId }, 'StorageService');

        return quota;
      } catch (error) {
        logger.error('Failed to update storage quota', { schoolId, error }, 'StorageService');
        throw error;
      }
    },

    async getFileMetadata(fileId: string, userId: string) {
      try {
        if (!fileId) throw new DocValidationError('fileId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching file metadata', { fileId, userId }, 'StorageService');

        const metadata = await repository.getFileMetadata(fileId);

        logger.info('File metadata fetched', { fileId }, 'StorageService');

        return metadata;
      } catch (error) {
        logger.error('Failed to fetch file metadata', { fileId, error }, 'StorageService');
        throw error;
      }
    },

    async getFileChecksum(fileId: string, userId: string) {
      try {
        if (!fileId) throw new DocValidationError('fileId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching file checksum', { fileId, userId }, 'StorageService');

        const checksum = await repository.getFileChecksum(fileId);

        logger.info('File checksum fetched', { fileId }, 'StorageService');

        return checksum;
      } catch (error) {
        logger.error('Failed to fetch file checksum', { fileId, error }, 'StorageService');
        throw error;
      }
    },

    async getStorageBreakdown(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching storage breakdown', { schoolId, userId }, 'StorageService');

        const breakdown = await repository.getStorageBreakdown(schoolId);

        logger.info('Storage breakdown fetched', { schoolId }, 'StorageService');

        return breakdown;
      } catch (error) {
        logger.error('Failed to fetch storage breakdown', { schoolId, error }, 'StorageService');
        throw error;
      }
    },

    async getStorageStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching storage stats', { schoolId, userId }, 'StorageService');

        const stats = await repository.getStorageStats(schoolId);

        logger.info('Storage stats fetched', { schoolId }, 'StorageService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch storage stats', { schoolId, error }, 'StorageService');
        throw error;
      }
    },

    async getExternalStorageConfigs(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching external storage configs', { schoolId, userId }, 'StorageService');

        const configs = await repository.getExternalStorageConfigs(schoolId);

        logger.info('External storage configs fetched', { schoolId, count: configs.length }, 'StorageService');

        return configs;
      } catch (error) {
        logger.error('Failed to fetch external storage configs', { schoolId, error }, 'StorageService');
        throw error;
      }
    },
  };
}
