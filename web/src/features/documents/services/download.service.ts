import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocNotFoundError,
  DocStorageError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createDownloadService(repository: DocumentRepositoryEnterprise) {
  return {
    async downloadDocument(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Downloading document', { documentId, schoolId, userId }, 'DownloadService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);

        const metadata = await repository.getFileMetadata(documentId);

        logger.info('Document downloaded successfully', { documentId }, 'DownloadService');

        return { document, metadata };
      } catch (error) {
        logger.error('Failed to download document', { documentId, error }, 'DownloadService');
        throw error;
      }
    },

    async getDownloadHistory(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching download history', { schoolId, userId }, 'DownloadService');

        const activities = await repository.getUserActivities(schoolId, userId);

        logger.info('Download history fetched', { schoolId, count: activities.length }, 'DownloadService');

        return activities;
      } catch (error) {
        logger.error('Failed to fetch download history', { schoolId, error }, 'DownloadService');
        throw error;
      }
    },

    async getDownloadStats(schoolId: string, userId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching download stats', { schoolId, userId }, 'DownloadService');

        const stats = await repository.getDocumentStats(schoolId, dateFrom, dateTo);

        logger.info('Download stats fetched', { schoolId }, 'DownloadService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch download stats', { schoolId, error }, 'DownloadService');
        throw error;
      }
    },

    async getDownloadLinks(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching download links', { documentId, userId }, 'DownloadService');

        const links = await repository.getShareLinks(documentId);

        logger.info('Download links fetched', { documentId, count: links.length }, 'DownloadService');

        return links;
      } catch (error) {
        logger.error('Failed to fetch download links', { documentId, error }, 'DownloadService');
        throw error;
      }
    },

    async createDownloadLink(documentId: string, schoolId: string, userId: string, options: { expiresAt?: string; maxDownloads?: number; password?: string; isPublic?: boolean }) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Creating download link', { documentId, schoolId, userId }, 'DownloadService');

        const link = await repository.createShareLink(documentId, options);

        logger.info('Download link created successfully', { documentId, linkId: link.id }, 'DownloadService');

        return link;
      } catch (error) {
        logger.error('Failed to create download link', { documentId, error }, 'DownloadService');
        throw error;
      }
    },

    async revokeDownloadLink(linkId: string, userId: string) {
      try {
        if (!linkId) throw new DocValidationError('linkId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Revoking download link', { linkId, userId }, 'DownloadService');

        await repository.revokeShareLink(linkId);

        logger.info('Download link revoked successfully', { linkId }, 'DownloadService');
      } catch (error) {
        logger.error('Failed to revoke download link', { linkId, error }, 'DownloadService');
        throw error;
      }
    },
  };
}
