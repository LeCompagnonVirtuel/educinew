import type { CommunicationRepositoryExtended, Document } from '@/features/communication/types';
import {
  CommDocumentNotFoundError,
  CommDocumentAccessDeniedError,
  CommDocumentAlreadyExistsError,
  CommDocumentStorageError,
  CommDocumentVersionError,
  CommDocumentCommentError,
  CommDocumentShareError,
  CommDocumentMoveError,
  CommDocumentDeleteError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createDocumentService(repository: CommunicationRepositoryExtended) {
  return {
    async getDocuments(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching documents', { schoolId, userId }, 'DocumentService');

        const documents = await repository.getDocuments(schoolId, userId, filters);

        logger.info('Documents fetched', { schoolId, count: documents.length }, 'DocumentService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch documents', { schoolId }, 'DocumentService');
        throw error;
      }
    },

    async getDocument(documentId: string, userId: string) {
      try {
        if (!documentId) throw new Error('documentId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching document', { documentId, userId }, 'DocumentService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new CommDocumentNotFoundError(documentId);

        return document;
      } catch (error) {
        logger.error('Failed to fetch document', { documentId }, 'DocumentService');
        throw error;
      }
    },

    async createDocument(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.name) throw new Error('document name is required');

        logger.info('Creating document', { schoolId, userId, name: data.name }, 'DocumentService');

        const document = await repository.createDocument({
          ...data,
          schoolId,
          createdBy: userId,
          version: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'document.created', { documentId: document.id, userId });

        logger.info('Document created', { documentId: document.id }, 'DocumentService');

        return document;
      } catch (error) {
        logger.error('Failed to create document', { schoolId }, 'DocumentService');
        throw error;
      }
    },

    async updateDocument(documentId: string, userId: string, data: any) {
      try {
        if (!documentId) throw new Error('documentId is required');
        if (!userId) throw new Error('userId is required');
        if (!data) throw new Error('update data is required');

        logger.info('Updating document', { documentId, userId }, 'DocumentService');

        const existing = await repository.getDocument(documentId);
        if (!existing) throw new CommDocumentNotFoundError(documentId);

        const updated = await repository.updateDocument(documentId, {
          ...data,
          version: ((existing as any).version || 1) + 1,
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent((existing as any).schoolId, 'document.updated', {
          documentId,
          userId,
        });

        logger.info('Document updated', { documentId }, 'DocumentService');

        return updated;
      } catch (error) {
        logger.error('Failed to update document', { documentId }, 'DocumentService');
        throw error;
      }
    },

    async deleteDocument(documentId: string, userId: string) {
      try {
        if (!documentId) throw new Error('documentId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Deleting document', { documentId, userId }, 'DocumentService');

        const existing = await repository.getDocument(documentId);
        if (!existing) throw new CommDocumentNotFoundError(documentId);

        await repository.deleteDocument(documentId);

        await repository.logCommunicationEvent((existing as any).schoolId, 'document.deleted', {
          documentId,
          userId,
        });

        logger.info('Document deleted', { documentId }, 'DocumentService');
      } catch (error) {
        logger.error('Failed to delete document', { documentId }, 'DocumentService');
        throw error;
      }
    },

    async moveDocument(documentId: string, userId: string, targetFolderId: string) {
      try {
        if (!documentId) throw new Error('documentId is required');
        if (!userId) throw new Error('userId is required');
        if (!targetFolderId) throw new Error('targetFolderId is required');

        logger.info('Moving document', { documentId, userId, targetFolderId }, 'DocumentService');

        const existing = await repository.getDocument(documentId);
        if (!existing) throw new CommDocumentNotFoundError(documentId);

        const updated = await repository.updateDocument(documentId, {
          folderId: targetFolderId,
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent((existing as any).schoolId, 'document.moved', {
          documentId,
          userId,
          targetFolderId,
        });

        logger.info('Document moved', { documentId, targetFolderId }, 'DocumentService');

        return updated;
      } catch (error) {
        logger.error('Failed to move document', { documentId }, 'DocumentService');
        throw error;
      }
    },

    async shareDocument(documentId: string, userId: string, shareWithUserId: string, permissionLevel: string) {
      try {
        if (!documentId) throw new Error('documentId is required');
        if (!userId) throw new Error('userId is required');
        if (!shareWithUserId) throw new Error('shareWithUserId is required');
        if (!permissionLevel) throw new Error('permissionLevel is required');

        logger.info('Sharing document', { documentId, userId, shareWithUserId, permissionLevel }, 'DocumentService');

        const existing = await repository.getDocument(documentId);
        if (!existing) throw new CommDocumentNotFoundError(documentId);

        const share = await repository.shareDocument(documentId, {
          userId: shareWithUserId,
          permissionLevel,
          sharedBy: userId,
          createdAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent((existing as any).schoolId, 'document.shared', {
          documentId,
          userId,
          shareWithUserId,
        });

        logger.info('Document shared', { documentId, shareWithUserId }, 'DocumentService');

        return share;
      } catch (error) {
        logger.error('Failed to share document', { documentId }, 'DocumentService');
        throw error;
      }
    },

    async getDocumentVersions(documentId: string, userId: string) {
      try {
        if (!documentId) throw new Error('documentId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching document versions', { documentId, userId }, 'DocumentService');

        const existing = await repository.getDocument(documentId);
        if (!existing) throw new CommDocumentNotFoundError(documentId);

        const versions = await repository.getDocumentVersions(documentId);

        logger.info('Document versions fetched', { documentId, count: versions.length }, 'DocumentService');

        return versions;
      } catch (error) {
        logger.error('Failed to fetch document versions', { documentId }, 'DocumentService');
        throw error;
      }
    },

    async addDocumentVersion(documentId: string, userId: string, data: any) {
      try {
        if (!documentId) throw new Error('documentId is required');
        if (!userId) throw new Error('userId is required');
        if (!data) throw new Error('version data is required');

        logger.info('Adding document version', { documentId, userId }, 'DocumentService');

        const existing = await repository.getDocument(documentId);
        if (!existing) throw new CommDocumentNotFoundError(documentId);

        const version = await repository.addDocumentVersion(documentId, {
          ...data,
          createdBy: userId,
          versionNumber: ((existing as any).version || 0) + 1,
          createdAt: new Date().toISOString(),
        });

        await repository.updateDocument(documentId, {
          version: ((existing as any).version || 0) + 1,
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent((existing as any).schoolId, 'document.version_added', {
          documentId,
          userId,
        });

        logger.info('Document version added', { documentId }, 'DocumentService');

        return version;
      } catch (error) {
        logger.error('Failed to add document version', { documentId }, 'DocumentService');
        throw error;
      }
    },

    async addDocumentComment(documentId: string, userId: string, content: string) {
      try {
        if (!documentId) throw new Error('documentId is required');
        if (!userId) throw new Error('userId is required');
        if (!content || content.trim().length === 0) throw new Error('comment content is required');

        logger.info('Adding document comment', { documentId, userId }, 'DocumentService');

        const existing = await repository.getDocument(documentId);
        if (!existing) throw new CommDocumentNotFoundError(documentId);

        const comment = await repository.addDocumentComment(documentId, {
          userId,
          content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent((existing as any).schoolId, 'document.comment_added', {
          documentId,
          userId,
        });

        logger.info('Document comment added', { documentId }, 'DocumentService');

        return comment;
      } catch (error) {
        logger.error('Failed to add document comment', { documentId }, 'DocumentService');
        throw error;
      }
    },

    async getDocumentStats(schoolId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');

        logger.info('Fetching document stats', { schoolId, dateFrom, dateTo }, 'DocumentService');

        const stats = await repository.getDocumentStats(schoolId, dateFrom, dateTo);

        logger.info('Document stats fetched', { schoolId }, 'DocumentService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch document stats', { schoolId }, 'DocumentService');
        throw error;
      }
    },
  };
}
