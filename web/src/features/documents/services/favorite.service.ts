import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocNotFoundError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createFavoriteService(repository: DocumentRepositoryEnterprise) {
  return {
    async getFavoriteDocuments(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching favorite documents', { schoolId, userId }, 'FavoriteService');

        const documents = await repository.getFavoriteDocuments(schoolId, userId);

        logger.info('Favorite documents fetched', { schoolId, count: documents.length }, 'FavoriteService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch favorite documents', { schoolId, error }, 'FavoriteService');
        throw error;
      }
    },

    async getFavoriteFolders(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching favorite folders', { schoolId, userId }, 'FavoriteService');

        const folders = await repository.getFavoriteFolders(schoolId);

        logger.info('Favorite folders fetched', { schoolId, count: folders.length }, 'FavoriteService');

        return folders;
      } catch (error) {
        logger.error('Failed to fetch favorite folders', { schoolId, error }, 'FavoriteService');
        throw error;
      }
    },

    async addFavorite(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Adding favorite', { documentId, schoolId, userId }, 'FavoriteService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);

        logger.info('Favorite added successfully', { documentId }, 'FavoriteService');

        return document;
      } catch (error) {
        logger.error('Failed to add favorite', { documentId, error }, 'FavoriteService');
        throw error;
      }
    },

    async removeFavorite(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Removing favorite', { documentId, schoolId, userId }, 'FavoriteService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);

        logger.info('Favorite removed successfully', { documentId }, 'FavoriteService');
      } catch (error) {
        logger.error('Failed to remove favorite', { documentId, error }, 'FavoriteService');
        throw error;
      }
    },
  };
}
