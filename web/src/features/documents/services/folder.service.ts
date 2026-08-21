import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocFolderNotFoundError,
  DocFolderCreateError,
  DocFolderUpdateError,
  DocFolderDeleteError,
  DocFolderNotEmptyError,
  DocFolderDepthExceededError,
  DocFolderCircularReferenceError,
  DocFolderPermissionError,
  DocFolderRenameError,
  DocFolderMoveError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createFolderService(repository: DocumentRepositoryEnterprise) {
  return {
    async getFolders(schoolId: string, userId: string, filters?: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching folders', { schoolId, userId }, 'FolderService');

        const folders = await repository.getFolders(schoolId, filters);

        logger.info('Folders fetched successfully', { schoolId, count: folders.length }, 'FolderService');

        return folders;
      } catch (error) {
        logger.error('Failed to fetch folders', { schoolId, error }, 'FolderService');
        throw error;
      }
    },

    async getFolder(folderId: string, userId: string) {
      try {
        if (!folderId) throw new DocValidationError('folderId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching folder', { folderId, userId }, 'FolderService');

        const folder = await repository.getFolder(folderId);
        if (!folder) throw new DocFolderNotFoundError(folderId);

        return folder;
      } catch (error) {
        logger.error('Failed to fetch folder', { folderId, error }, 'FolderService');
        throw error;
      }
    },

    async createFolder(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || !data.name) throw new DocValidationError('folder name is required');

        logger.info('Creating folder', { schoolId, userId, name: data.name }, 'FolderService');

        const folder = await repository.createFolder(
          { ...data, createdBy: userId } as any,
          schoolId
        );

        logger.info('Folder created successfully', { folderId: folder.id }, 'FolderService');

        return folder;
      } catch (error) {
        logger.error('Failed to create folder', { schoolId, error }, 'FolderService');
        throw error;
      }
    },

    async updateFolder(folderId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!folderId) throw new DocValidationError('folderId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('update data is required');

        logger.info('Updating folder', { folderId, userId }, 'FolderService');

        const existing = await repository.getFolder(folderId);
        if (!existing) throw new DocFolderNotFoundError(folderId);

        const updated = await repository.updateFolder(folderId, data as any);

        logger.info('Folder updated successfully', { folderId }, 'FolderService');

        return updated;
      } catch (error) {
        logger.error('Failed to update folder', { folderId, error }, 'FolderService');
        throw error;
      }
    },

    async deleteFolder(folderId: string, userId: string) {
      try {
        if (!folderId) throw new DocValidationError('folderId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Deleting folder', { folderId, userId }, 'FolderService');

        const existing = await repository.getFolder(folderId);
        if (!existing) throw new DocFolderNotFoundError(folderId);

        await repository.deleteFolder(folderId);

        logger.info('Folder deleted successfully', { folderId }, 'FolderService');
      } catch (error) {
        logger.error('Failed to delete folder', { folderId, error }, 'FolderService');
        throw error;
      }
    },

    async moveFolder(folderId: string, targetParentId: string, userId: string) {
      try {
        if (!folderId) throw new DocValidationError('folderId is required');
        if (!targetParentId) throw new DocValidationError('targetParentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (folderId === targetParentId) throw new DocFolderCircularReferenceError();

        logger.info('Moving folder', { folderId, targetParentId, userId }, 'FolderService');

        const existing = await repository.getFolder(folderId);
        if (!existing) throw new DocFolderNotFoundError(folderId);

        const updated = await repository.moveFolder(folderId, targetParentId);

        logger.info('Folder moved successfully', { folderId, targetParentId }, 'FolderService');

        return updated;
      } catch (error) {
        logger.error('Failed to move folder', { folderId, error }, 'FolderService');
        throw error;
      }
    },

    async renameFolder(folderId: string, newName: string, userId: string) {
      try {
        if (!folderId) throw new DocValidationError('folderId is required');
        if (!newName) throw new DocValidationError('newName is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Renaming folder', { folderId, newName, userId }, 'FolderService');

        const existing = await repository.getFolder(folderId);
        if (!existing) throw new DocFolderNotFoundError(folderId);

        const updated = await repository.renameFolder(folderId, newName);

        logger.info('Folder renamed successfully', { folderId, newName }, 'FolderService');

        return updated;
      } catch (error) {
        logger.error('Failed to rename folder', { folderId, error }, 'FolderService');
        throw error;
      }
    },

    async getFolderTree(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching folder tree', { schoolId, userId }, 'FolderService');

        const tree = await repository.getFolderTree(schoolId);

        logger.info('Folder tree fetched', { schoolId, count: tree.length }, 'FolderService');

        return tree;
      } catch (error) {
        logger.error('Failed to fetch folder tree', { schoolId, error }, 'FolderService');
        throw error;
      }
    },

    async getFolderChildren(folderId: string, userId: string) {
      try {
        if (!folderId) throw new DocValidationError('folderId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching folder children', { folderId, userId }, 'FolderService');

        const children = await repository.getFolderChildren(folderId);

        logger.info('Folder children fetched', { folderId, count: children.length }, 'FolderService');

        return children;
      } catch (error) {
        logger.error('Failed to fetch folder children', { folderId, error }, 'FolderService');
        throw error;
      }
    },

    async getFolderPath(folderId: string, userId: string) {
      try {
        if (!folderId) throw new DocValidationError('folderId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching folder path', { folderId, userId }, 'FolderService');

        const path = await repository.getFolderPath(folderId);

        logger.info('Folder path fetched', { folderId, depth: path.length }, 'FolderService');

        return path;
      } catch (error) {
        logger.error('Failed to fetch folder path', { folderId, error }, 'FolderService');
        throw error;
      }
    },

    async getFolderSize(folderId: string, userId: string) {
      try {
        if (!folderId) throw new DocValidationError('folderId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching folder size', { folderId, userId }, 'FolderService');

        const size = await repository.getFolderSize(folderId);

        logger.info('Folder size fetched', { folderId, size }, 'FolderService');

        return size;
      } catch (error) {
        logger.error('Failed to fetch folder size', { folderId, error }, 'FolderService');
        throw error;
      }
    },

    async getFolderDocumentCount(folderId: string, userId: string) {
      try {
        if (!folderId) throw new DocValidationError('folderId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching folder document count', { folderId, userId }, 'FolderService');

        const count = await repository.getFolderDocumentCount(folderId);

        logger.info('Folder document count fetched', { folderId, count }, 'FolderService');

        return count;
      } catch (error) {
        logger.error('Failed to fetch folder document count', { folderId, error }, 'FolderService');
        throw error;
      }
    },

    async getRootFolders(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching root folders', { schoolId, userId }, 'FolderService');

        const folders = await repository.getRootFolders(schoolId);

        logger.info('Root folders fetched', { schoolId, count: folders.length }, 'FolderService');

        return folders;
      } catch (error) {
        logger.error('Failed to fetch root folders', { schoolId, error }, 'FolderService');
        throw error;
      }
    },

    async getSharedFolders(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching shared folders', { schoolId, userId }, 'FolderService');

        const folders = await repository.getSharedFolders(schoolId, userId);

        logger.info('Shared folders fetched', { schoolId, count: folders.length }, 'FolderService');

        return folders;
      } catch (error) {
        logger.error('Failed to fetch shared folders', { schoolId, error }, 'FolderService');
        throw error;
      }
    },

    async getFavoriteFolders(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching favorite folders', { schoolId, userId }, 'FolderService');

        const folders = await repository.getFavoriteFolders(schoolId);

        logger.info('Favorite folders fetched', { schoolId, count: folders.length }, 'FolderService');

        return folders;
      } catch (error) {
        logger.error('Failed to fetch favorite folders', { schoolId, error }, 'FolderService');
        throw error;
      }
    },

    async getRecentFolders(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching recent folders', { schoolId, userId }, 'FolderService');

        const folders = await repository.getRecentFolders(schoolId);

        logger.info('Recent folders fetched', { schoolId, count: folders.length }, 'FolderService');

        return folders;
      } catch (error) {
        logger.error('Failed to fetch recent folders', { schoolId, error }, 'FolderService');
        throw error;
      }
    },

    async getFolderByPath(schoolId: string, path: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!path) throw new DocValidationError('path is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching folder by path', { schoolId, path, userId }, 'FolderService');

        const folder = await repository.getFolderByPath(schoolId, path);

        logger.info('Folder by path fetched', { folderId: folder.id }, 'FolderService');

        return folder;
      } catch (error) {
        logger.error('Failed to fetch folder by path', { schoolId, path, error }, 'FolderService');
        throw error;
      }
    },

    async getFolderStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching folder stats', { schoolId, userId }, 'FolderService');

        const stats = await repository.getFolderStats(schoolId);

        logger.info('Folder stats fetched', { schoolId }, 'FolderService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch folder stats', { schoolId, error }, 'FolderService');
        throw error;
      }
    },
  };
}
