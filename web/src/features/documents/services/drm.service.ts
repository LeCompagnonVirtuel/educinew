import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocDRMNotFoundError,
  DocDRMApplyError,
  DocDRMRemoveError,
  DocDRMValidateError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createDRMService(repository: DocumentRepositoryEnterprise) {
  return {
    async getDRMConfig(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching DRM config', { documentId, userId }, 'DRMService');

        const config = await repository.getDRMConfig(documentId);

        logger.info('DRM config fetched successfully', { documentId }, 'DRMService');

        return config;
      } catch (error) {
        logger.error('Failed to fetch DRM config', { documentId, error }, 'DRMService');
        throw error;
      }
    },

    async applyDRM(documentId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('DRM data is required');

        logger.info('Applying DRM', { documentId, userId }, 'DRMService');

        const result = await repository.applyDRM(documentId, userId, data);

        logger.info('DRM applied successfully', { documentId }, 'DRMService');

        return result;
      } catch (error) {
        logger.error('Failed to apply DRM', { documentId, error }, 'DRMService');
        throw error;
      }
    },

    async removeDRM(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Removing DRM', { documentId, userId }, 'DRMService');

        await repository.removeDRM(documentId, userId);

        logger.info('DRM removed successfully', { documentId }, 'DRMService');
      } catch (error) {
        logger.error('Failed to remove DRM', { documentId, error }, 'DRMService');
        throw error;
      }
    },

    async validateDRM(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Validating DRM', { documentId, userId }, 'DRMService');

        const config = await repository.getDRMConfig(documentId);
        if (!config) throw new DocDRMNotFoundError(documentId);

        const isValid = await repository.validateDRM(documentId);

        logger.info('DRM validated successfully', { documentId, isValid }, 'DRMService');

        return { valid: isValid };
      } catch (error) {
        logger.error('Failed to validate DRM', { documentId, error }, 'DRMService');
        throw error;
      }
    },

    async getDRMStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching DRM stats', { schoolId, userId }, 'DRMService');

        const stats = await repository.getDRMStats(schoolId);

        logger.info('DRM stats fetched', { schoolId }, 'DRMService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch DRM stats', { schoolId, error }, 'DRMService');
        throw error;
      }
    },
  };
}
