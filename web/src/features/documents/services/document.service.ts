import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocNotFoundError,
  DocCreateError,
  DocUpdateError,
  DocDeleteError,
  DocValidationError,
  DocRestoreError,
  DocDuplicateError,
  DocLockedError,
  DocExpiredError,
  DocForbiddenError,
  DocStorageError,
  DocVersionConflictError,
  DocSearchError,
  DocSearchQueryError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createDocumentService(repository: DocumentRepositoryEnterprise) {
  return {
    async getDocuments(schoolId: string, userId: string, filters?: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching documents', { schoolId, userId }, 'DocumentService');

        const documents = await repository.getDocuments(schoolId, filters);

        logger.info('Documents fetched successfully', { schoolId, count: documents.length }, 'DocumentService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch documents', { schoolId, error }, 'DocumentService');
        throw error;
      }
    },

    async getDocument(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching document', { documentId, userId }, 'DocumentService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);

        return document;
      } catch (error) {
        logger.error('Failed to fetch document', { documentId, error }, 'DocumentService');
        throw error;
      }
    },

    async createDocument(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || !data.name) throw new DocValidationError('document name is required');

        logger.info('Creating document', { schoolId, userId, name: data.name }, 'DocumentService');

        const document = await repository.createDocument(
          { ...data, createdBy: userId } as any,
          schoolId
        );

        logger.info('Document created successfully', { documentId: document.id }, 'DocumentService');

        return document;
      } catch (error) {
        logger.error('Failed to create document', { schoolId, error }, 'DocumentService');
        throw error;
      }
    },

    async updateDocument(documentId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('update data is required');

        logger.info('Updating document', { documentId, userId }, 'DocumentService');

        const existing = await repository.getDocument(documentId);
        if (!existing) throw new DocNotFoundError(documentId);

        const updated = await repository.updateDocument(documentId, data as any);

        logger.info('Document updated successfully', { documentId }, 'DocumentService');

        return updated;
      } catch (error) {
        logger.error('Failed to update document', { documentId, error }, 'DocumentService');
        throw error;
      }
    },

    async deleteDocument(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Deleting document', { documentId, userId }, 'DocumentService');

        const existing = await repository.getDocument(documentId);
        if (!existing) throw new DocNotFoundError(documentId);

        await repository.deleteDocument(documentId);

        logger.info('Document deleted successfully', { documentId }, 'DocumentService');
      } catch (error) {
        logger.error('Failed to delete document', { documentId, error }, 'DocumentService');
        throw error;
      }
    },

    async restoreDocument(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Restoring document', { documentId, userId }, 'DocumentService');

        const document = await repository.restoreDocument(documentId);

        logger.info('Document restored successfully', { documentId }, 'DocumentService');

        return document;
      } catch (error) {
        logger.error('Failed to restore document', { documentId, error }, 'DocumentService');
        throw error;
      }
    },

    async permanentDeleteDocument(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Permanently deleting document', { documentId, userId }, 'DocumentService');

        await repository.permanentDeleteDocument(documentId);

        logger.info('Document permanently deleted', { documentId }, 'DocumentService');
      } catch (error) {
        logger.error('Failed to permanently delete document', { documentId, error }, 'DocumentService');
        throw error;
      }
    },

    async bulkDeleteDocuments(documentIds: string[], userId: string) {
      try {
        if (!documentIds || documentIds.length === 0) throw new DocValidationError('documentIds are required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Bulk deleting documents', { count: documentIds.length, userId }, 'DocumentService');

        const result = await repository.bulkDeleteDocuments(documentIds);

        logger.info('Bulk delete completed', { result }, 'DocumentService');

        return result;
      } catch (error) {
        logger.error('Failed to bulk delete documents', { error }, 'DocumentService');
        throw error;
      }
    },

    async bulkRestoreDocuments(documentIds: string[], userId: string) {
      try {
        if (!documentIds || documentIds.length === 0) throw new DocValidationError('documentIds are required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Bulk restoring documents', { count: documentIds.length, userId }, 'DocumentService');

        const result = await repository.bulkRestoreDocuments(documentIds);

        logger.info('Bulk restore completed', { result }, 'DocumentService');

        return result;
      } catch (error) {
        logger.error('Failed to bulk restore documents', { error }, 'DocumentService');
        throw error;
      }
    },

    async bulkMoveDocuments(documentIds: string[], targetFolderId: string, userId: string) {
      try {
        if (!documentIds || documentIds.length === 0) throw new DocValidationError('documentIds are required');
        if (!targetFolderId) throw new DocValidationError('targetFolderId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Bulk moving documents', { count: documentIds.length, targetFolderId, userId }, 'DocumentService');

        const result = await repository.bulkMoveDocuments(documentIds, targetFolderId);

        logger.info('Bulk move completed', { result }, 'DocumentService');

        return result;
      } catch (error) {
        logger.error('Failed to bulk move documents', { error }, 'DocumentService');
        throw error;
      }
    },

    async bulkTagDocuments(documentIds: string[], tagIds: string[], userId: string) {
      try {
        if (!documentIds || documentIds.length === 0) throw new DocValidationError('documentIds are required');
        if (!tagIds || tagIds.length === 0) throw new DocValidationError('tagIds are required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Bulk tagging documents', { docCount: documentIds.length, tagCount: tagIds.length, userId }, 'DocumentService');

        const result = await repository.bulkTagDocuments(documentIds, tagIds);

        logger.info('Bulk tag completed', { result }, 'DocumentService');

        return result;
      } catch (error) {
        logger.error('Failed to bulk tag documents', { error }, 'DocumentService');
        throw error;
      }
    },

    async searchDocuments(schoolId: string, query: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!query || query.trim().length < 2) throw new DocSearchQueryError('Search query must be at least 2 characters');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Searching documents', { schoolId, query, userId }, 'DocumentService');

        const documents = await repository.searchDocuments(schoolId, query);

        logger.info('Search completed', { schoolId, count: documents.length }, 'DocumentService');

        return documents;
      } catch (error) {
        logger.error('Failed to search documents', { schoolId, query, error }, 'DocumentService');
        throw error;
      }
    },

    async getRecentDocuments(schoolId: string, userId: string, limit?: number) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching recent documents', { schoolId, userId, limit }, 'DocumentService');

        const documents = await repository.getRecentDocuments(schoolId, userId, limit);

        logger.info('Recent documents fetched', { schoolId, count: documents.length }, 'DocumentService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch recent documents', { schoolId, error }, 'DocumentService');
        throw error;
      }
    },

    async getFavoriteDocuments(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching favorite documents', { schoolId, userId }, 'DocumentService');

        const documents = await repository.getFavoriteDocuments(schoolId, userId);

        logger.info('Favorite documents fetched', { schoolId, count: documents.length }, 'DocumentService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch favorite documents', { schoolId, error }, 'DocumentService');
        throw error;
      }
    },

    async getSharedDocuments(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching shared documents', { schoolId, userId }, 'DocumentService');

        const documents = await repository.getSharedDocuments(schoolId, userId);

        logger.info('Shared documents fetched', { schoolId, count: documents.length }, 'DocumentService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch shared documents', { schoolId, error }, 'DocumentService');
        throw error;
      }
    },

    async getLockedDocuments(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching locked documents', { schoolId, userId }, 'DocumentService');

        const documents = await repository.getLockedDocuments(schoolId);

        logger.info('Locked documents fetched', { schoolId, count: documents.length }, 'DocumentService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch locked documents', { schoolId, error }, 'DocumentService');
        throw error;
      }
    },

    async getExpiredDocuments(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching expired documents', { schoolId, userId }, 'DocumentService');

        const documents = await repository.getExpiredDocuments(schoolId);

        logger.info('Expired documents fetched', { schoolId, count: documents.length }, 'DocumentService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch expired documents', { schoolId, error }, 'DocumentService');
        throw error;
      }
    },

    async getDocumentsByFolder(schoolId: string, folderId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!folderId) throw new DocValidationError('folderId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching documents by folder', { schoolId, folderId, userId }, 'DocumentService');

        const documents = await repository.getDocumentsByFolder(schoolId, folderId);

        logger.info('Documents by folder fetched', { schoolId, count: documents.length }, 'DocumentService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch documents by folder', { schoolId, folderId, error }, 'DocumentService');
        throw error;
      }
    },

    async getDocumentsByCategory(schoolId: string, category: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!category) throw new DocValidationError('category is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching documents by category', { schoolId, category, userId }, 'DocumentService');

        const documents = await repository.getDocumentsByCategory(schoolId, category);

        logger.info('Documents by category fetched', { schoolId, count: documents.length }, 'DocumentService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch documents by category', { schoolId, category, error }, 'DocumentService');
        throw error;
      }
    },

    async getDocumentsByTag(schoolId: string, tagId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!tagId) throw new DocValidationError('tagId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching documents by tag', { schoolId, tagId, userId }, 'DocumentService');

        const documents = await repository.getDocumentsByTag(schoolId, tagId);

        logger.info('Documents by tag fetched', { schoolId, count: documents.length }, 'DocumentService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch documents by tag', { schoolId, tagId, error }, 'DocumentService');
        throw error;
      }
    },

    async getDocumentsByAuthor(schoolId: string, authorId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!authorId) throw new DocValidationError('authorId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching documents by author', { schoolId, authorId, userId }, 'DocumentService');

        const documents = await repository.getDocumentsByAuthor(schoolId, authorId);

        logger.info('Documents by author fetched', { schoolId, count: documents.length }, 'DocumentService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch documents by author', { schoolId, authorId, error }, 'DocumentService');
        throw error;
      }
    },

    async getDocumentsByDate(schoolId: string, dateFrom: string, dateTo: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!dateFrom) throw new DocValidationError('dateFrom is required');
        if (!dateTo) throw new DocValidationError('dateTo is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching documents by date', { schoolId, dateFrom, dateTo, userId }, 'DocumentService');

        const documents = await repository.getDocumentsByDate(schoolId, dateFrom, dateTo);

        logger.info('Documents by date fetched', { schoolId, count: documents.length }, 'DocumentService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch documents by date', { schoolId, dateFrom, dateTo, error }, 'DocumentService');
        throw error;
      }
    },

    async getDocumentsByStatus(schoolId: string, status: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!status) throw new DocValidationError('status is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching documents by status', { schoolId, status, userId }, 'DocumentService');

        const documents = await repository.getDocumentsByStatus(schoolId, status);

        logger.info('Documents by status fetched', { schoolId, count: documents.length }, 'DocumentService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch documents by status', { schoolId, status, error }, 'DocumentService');
        throw error;
      }
    },

    async getDocumentsByClassification(schoolId: string, classification: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!classification) throw new DocValidationError('classification is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching documents by classification', { schoolId, classification, userId }, 'DocumentService');

        const documents = await repository.getDocumentsByClassification(schoolId, classification);

        logger.info('Documents by classification fetched', { schoolId, count: documents.length }, 'DocumentService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch documents by classification', { schoolId, classification, error }, 'DocumentService');
        throw error;
      }
    },

    async getDocumentsByType(schoolId: string, mimeType: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!mimeType) throw new DocValidationError('mimeType is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching documents by type', { schoolId, mimeType, userId }, 'DocumentService');

        const documents = await repository.getDocumentsByType(schoolId, mimeType);

        logger.info('Documents by type fetched', { schoolId, count: documents.length }, 'DocumentService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch documents by type', { schoolId, mimeType, error }, 'DocumentService');
        throw error;
      }
    },

    async getDocumentsBySize(schoolId: string, minSize?: number, maxSize?: number) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');

        logger.info('Fetching documents by size', { schoolId, minSize, maxSize }, 'DocumentService');

        const documents = await repository.getDocumentsBySize(schoolId, minSize, maxSize);

        logger.info('Documents by size fetched', { schoolId, count: documents.length }, 'DocumentService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch documents by size', { schoolId, error }, 'DocumentService');
        throw error;
      }
    },

    async getDocumentBySlug(schoolId: string, slug: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!slug) throw new DocValidationError('slug is required');

        logger.info('Fetching document by slug', { schoolId, slug }, 'DocumentService');

        const document = await repository.getDocumentBySlug(schoolId, slug);

        logger.info('Document by slug fetched', { documentId: document.id }, 'DocumentService');

        return document;
      } catch (error) {
        logger.error('Failed to fetch document by slug', { schoolId, slug, error }, 'DocumentService');
        throw error;
      }
    },

    async getDocumentByPath(schoolId: string, path: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!path) throw new DocValidationError('path is required');

        logger.info('Fetching document by path', { schoolId, path }, 'DocumentService');

        const document = await repository.getDocumentByPath(schoolId, path);

        logger.info('Document by path fetched', { documentId: document.id }, 'DocumentService');

        return document;
      } catch (error) {
        logger.error('Failed to fetch document by path', { schoolId, path, error }, 'DocumentService');
        throw error;
      }
    },
  };
}
