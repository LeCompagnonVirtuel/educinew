import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocShareLinkError,
  DocShareExpiredError,
  DocSharePasswordError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createShareService(repository: DocumentRepositoryEnterprise) {
  return {
    async getShareLinks(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching share links', { documentId, userId }, 'ShareService');

        const links = await repository.getShareLinks(documentId);

        logger.info('Share links fetched', { documentId, count: links.length }, 'ShareService');

        return links;
      } catch (error) {
        logger.error('Failed to fetch share links', { documentId, error }, 'ShareService');
        throw error;
      }
    },

    async createShareLink(documentId: string, userId: string, options: { expiresAt?: string; maxDownloads?: number; password?: string; isPublic?: boolean }) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Creating share link', { documentId, userId }, 'ShareService');

        const link = await repository.createShareLink(documentId, options);

        logger.info('Share link created successfully', { linkId: link.id }, 'ShareService');

        return link;
      } catch (error) {
        logger.error('Failed to create share link', { documentId, error }, 'ShareService');
        throw error;
      }
    },

    async updateShareLink(linkId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!linkId) throw new DocValidationError('linkId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('update data is required');

        logger.info('Updating share link', { linkId, userId }, 'ShareService');

        const updated = await repository.updateShareLink(linkId, data as any);

        logger.info('Share link updated successfully', { linkId }, 'ShareService');

        return updated;
      } catch (error) {
        logger.error('Failed to update share link', { linkId, error }, 'ShareService');
        throw error;
      }
    },

    async revokeShareLink(linkId: string, userId: string) {
      try {
        if (!linkId) throw new DocValidationError('linkId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Revoking share link', { linkId, userId }, 'ShareService');

        await repository.revokeShareLink(linkId);

        logger.info('Share link revoked successfully', { linkId }, 'ShareService');
      } catch (error) {
        logger.error('Failed to revoke share link', { linkId, error }, 'ShareService');
        throw error;
      }
    },

    async getShareStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching share stats', { schoolId, userId }, 'ShareService');

        const stats = await repository.getShareStats(schoolId);

        logger.info('Share stats fetched', { schoolId }, 'ShareService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch share stats', { schoolId, error }, 'ShareService');
        throw error;
      }
    },

    async getSharedWithMe(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching shared with me', { schoolId, userId }, 'ShareService');

        const documents = await repository.getSharedWithMe(schoolId, userId);

        logger.info('Shared documents fetched', { schoolId, count: documents.length }, 'ShareService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch shared documents', { schoolId, error }, 'ShareService');
        throw error;
      }
    },

    async getSharedByMe(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching shared by me', { schoolId, userId }, 'ShareService');

        const documents = await repository.getSharedByMe(schoolId, userId);

        logger.info('Shared by me fetched', { schoolId, count: documents.length }, 'ShareService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch shared by me', { schoolId, error }, 'ShareService');
        throw error;
      }
    },

    async getPublicDocuments(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching public documents', { schoolId, userId }, 'ShareService');

        const documents = await repository.getPublicDocuments(schoolId);

        logger.info('Public documents fetched', { schoolId, count: documents.length }, 'ShareService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch public documents', { schoolId, error }, 'ShareService');
        throw error;
      }
    },

    async getExternalShares(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching external shares', { schoolId, userId }, 'ShareService');

        const shares = await repository.getExternalShares(schoolId);

        logger.info('External shares fetched', { schoolId, count: shares.length }, 'ShareService');

        return shares;
      } catch (error) {
        logger.error('Failed to fetch external shares', { schoolId, error }, 'ShareService');
        throw error;
      }
    },

    async getShareActivity(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching share activity', { schoolId, userId }, 'ShareService');

        const activity = await repository.getShareActivity(schoolId);

        logger.info('Share activity fetched', { schoolId, count: activity.length }, 'ShareService');

        return activity;
      } catch (error) {
        logger.error('Failed to fetch share activity', { schoolId, error }, 'ShareService');
        throw error;
      }
    },
  };
}
