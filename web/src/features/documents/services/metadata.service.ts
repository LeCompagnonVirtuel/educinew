import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocNotFoundError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createMetadataService(repository: DocumentRepositoryEnterprise) {
  return {
    async getFileMetadata(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching file metadata', { documentId, schoolId, userId }, 'MetadataService');

        const metadata = await repository.getFileMetadata(documentId);
        if (!metadata) throw new DocNotFoundError(documentId);

        logger.info('File metadata fetched', { documentId }, 'MetadataService');

        return metadata;
      } catch (error) {
        logger.error('Failed to fetch file metadata', { documentId, error }, 'MetadataService');
        throw error;
      }
    },

    async getFileChecksum(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching file checksum', { documentId, schoolId, userId }, 'MetadataService');

        const checksum = await repository.getFileChecksum(documentId);

        logger.info('File checksum fetched', { documentId }, 'MetadataService');

        return checksum;
      } catch (error) {
        logger.error('Failed to fetch file checksum', { documentId, error }, 'MetadataService');
        throw error;
      }
    },

    async getStorageBreakdown(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching storage breakdown', { schoolId, userId }, 'MetadataService');

        const breakdown = await repository.getStorageBreakdown(schoolId);

        logger.info('Storage breakdown fetched', { schoolId }, 'MetadataService');

        return breakdown;
      } catch (error) {
        logger.error('Failed to fetch storage breakdown', { schoolId, error }, 'MetadataService');
        throw error;
      }
    },
  };
}
