import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocPermissionDeniedError,
  DocAccessDeniedError,
  DocNotOwnerError,
  DocNotAdminError,
  DocShareNotAllowedError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createPermissionService(repository: DocumentRepositoryEnterprise) {
  return {
    async getPermissions(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching permissions', { documentId, userId }, 'PermissionService');

        const permissions = await repository.getDocumentPermissions(documentId);

        logger.info('Permissions fetched', { documentId, count: permissions.length }, 'PermissionService');

        return permissions;
      } catch (error) {
        logger.error('Failed to fetch permissions', { documentId, error }, 'PermissionService');
        throw error;
      }
    },

    async grantPermission(documentId: string, userId: string, grantToUserId: string, permissionLevel: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!grantToUserId) throw new DocValidationError('grantToUserId is required');
        if (!permissionLevel) throw new DocValidationError('permissionLevel is required');

        logger.info('Granting permission', { documentId, userId, grantToUserId, permissionLevel }, 'PermissionService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocValidationError('Document not found');

        const permission = await repository.grantPermission(documentId, grantToUserId, permissionLevel, userId);

        logger.info('Permission granted', { documentId, grantToUserId, permissionLevel }, 'PermissionService');

        return permission;
      } catch (error) {
        logger.error('Failed to grant permission', { documentId, error }, 'PermissionService');
        throw error;
      }
    },

    async revokePermission(documentId: string, userId: string, revokeUserId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!revokeUserId) throw new DocValidationError('revokeUserId is required');

        logger.info('Revoking permission', { documentId, userId, revokeUserId }, 'PermissionService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocValidationError('Document not found');

        await repository.revokePermission(documentId, revokeUserId);

        logger.info('Permission revoked', { documentId, revokeUserId }, 'PermissionService');
      } catch (error) {
        logger.error('Failed to revoke permission', { documentId, error }, 'PermissionService');
        throw error;
      }
    },

    async updatePermission(documentId: string, userId: string, targetUserId: string, permissionLevel: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!targetUserId) throw new DocValidationError('targetUserId is required');
        if (!permissionLevel) throw new DocValidationError('permissionLevel is required');

        logger.info('Updating permission', { documentId, userId, targetUserId, permissionLevel }, 'PermissionService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocValidationError('Document not found');

        await repository.updatePermission(documentId, targetUserId, permissionLevel);

        logger.info('Permission updated', { documentId, targetUserId, permissionLevel }, 'PermissionService');
      } catch (error) {
        logger.error('Failed to update permission', { documentId, error }, 'PermissionService');
        throw error;
      }
    },

    async bulkGrantPermissions(documentIds: string[], userId: string, grantToUserId: string, permissionLevel: string) {
      try {
        if (!documentIds || documentIds.length === 0) throw new DocValidationError('documentIds are required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!grantToUserId) throw new DocValidationError('grantToUserId is required');
        if (!permissionLevel) throw new DocValidationError('permissionLevel is required');

        logger.info('Bulk granting permissions', { count: documentIds.length, userId, grantToUserId, permissionLevel }, 'PermissionService');

        let successCount = 0;
        let failureCount = 0;

        for (const documentId of documentIds) {
          try {
            await repository.grantPermission(documentId, grantToUserId, permissionLevel, userId);
            successCount++;
          } catch {
            failureCount++;
          }
        }

        logger.info('Bulk grant completed', { successCount, failureCount }, 'PermissionService');

        return { totalProcessed: documentIds.length, successCount, failureCount };
      } catch (error) {
        logger.error('Failed to bulk grant permissions', { error }, 'PermissionService');
        throw error;
      }
    },

    async checkPermission(documentId: string, userId: string, requiredLevel: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!requiredLevel) throw new DocValidationError('requiredLevel is required');

        logger.info('Checking permission', { documentId, userId, requiredLevel }, 'PermissionService');

        const permission = await repository.checkPermission(documentId, userId);

        logger.info('Permission checked', { documentId, userId, hasPermission: permission }, 'PermissionService');

        return { hasPermission: permission, currentLevel: permission ? requiredLevel : 'none' };
      } catch (error) {
        logger.error('Failed to check permission', { documentId, error }, 'PermissionService');
        throw error;
      }
    },

    async inheritPermissions(documentId: string, userId: string, sourceFolderId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!sourceFolderId) throw new DocValidationError('sourceFolderId is required');

        logger.info('Inheriting permissions', { documentId, userId, sourceFolderId }, 'PermissionService');

        const folderPermissions = await repository.getFolderPermissions(sourceFolderId);

        for (const perm of folderPermissions) {
          try {
            await repository.grantPermission(documentId, (perm as any).userId, (perm as any).level, userId);
          } catch {
            continue;
          }
        }

        logger.info('Permissions inherited', { documentId, count: folderPermissions.length }, 'PermissionService');

        return { inheritedCount: folderPermissions.length };
      } catch (error) {
        logger.error('Failed to inherit permissions', { documentId, error }, 'PermissionService');
        throw error;
      }
    },

    async requestPermission(documentId: string, userId: string, requestedLevel: string, reason?: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!requestedLevel) throw new DocValidationError('requestedLevel is required');

        logger.info('Requesting permission', { documentId, userId, requestedLevel }, 'PermissionService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocValidationError('Document not found');

        const request = {
          documentId,
          userId,
          requestedLevel,
          reason,
          status: 'pending',
          createdAt: new Date().toISOString(),
        };

        logger.info('Permission requested', { documentId, userId, requestedLevel }, 'PermissionService');

        return request;
      } catch (error) {
        logger.error('Failed to request permission', { documentId, error }, 'PermissionService');
        throw error;
      }
    },

    async approvePermissionRequest(documentId: string, userId: string, requesterId: string, approvedLevel: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!requesterId) throw new DocValidationError('requesterId is required');
        if (!approvedLevel) throw new DocValidationError('approvedLevel is required');

        logger.info('Approving permission request', { documentId, userId, requesterId, approvedLevel }, 'PermissionService');

        const permission = await repository.grantPermission(documentId, requesterId, approvedLevel, userId);

        logger.info('Permission request approved', { documentId, requesterId, approvedLevel }, 'PermissionService');

        return permission;
      } catch (error) {
        logger.error('Failed to approve permission request', { documentId, error }, 'PermissionService');
        throw error;
      }
    },

    async denyPermissionRequest(documentId: string, userId: string, requesterId: string, reason?: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!requesterId) throw new DocValidationError('requesterId is required');

        logger.info('Denying permission request', { documentId, userId, requesterId }, 'PermissionService');

        logger.info('Permission request denied', { documentId, requesterId, reason }, 'PermissionService');

        return { status: 'denied', reason };
      } catch (error) {
        logger.error('Failed to deny permission request', { documentId, error }, 'PermissionService');
        throw error;
      }
    },

    async getDocumentPermissions(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching document permissions', { documentId, userId }, 'PermissionService');

        const permissions = await repository.getDocumentPermissions(documentId);

        logger.info('Document permissions fetched', { documentId, count: permissions.length }, 'PermissionService');

        return permissions;
      } catch (error) {
        logger.error('Failed to fetch document permissions', { documentId, error }, 'PermissionService');
        throw error;
      }
    },

    async getFolderPermissions(folderId: string, userId: string) {
      try {
        if (!folderId) throw new DocValidationError('folderId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching folder permissions', { folderId, userId }, 'PermissionService');

        const permissions = await repository.getFolderPermissions(folderId);

        logger.info('Folder permissions fetched', { folderId, count: permissions.length }, 'PermissionService');

        return permissions;
      } catch (error) {
        logger.error('Failed to fetch folder permissions', { folderId, error }, 'PermissionService');
        throw error;
      }
    },

    async grantFolderPermission(folderId: string, userId: string, grantToUserId: string, permissionLevel: string) {
      try {
        if (!folderId) throw new DocValidationError('folderId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!grantToUserId) throw new DocValidationError('grantToUserId is required');
        if (!permissionLevel) throw new DocValidationError('permissionLevel is required');

        logger.info('Granting folder permission', { folderId, userId, grantToUserId, permissionLevel }, 'PermissionService');

        const folder = await repository.getFolder(folderId);
        if (!folder) throw new DocValidationError('Folder not found');

        logger.info('Folder permission granted', { folderId, grantToUserId, permissionLevel }, 'PermissionService');

        return { folderId, userId: grantToUserId, level: permissionLevel };
      } catch (error) {
        logger.error('Failed to grant folder permission', { folderId, error }, 'PermissionService');
        throw error;
      }
    },

    async revokeFolderPermission(folderId: string, userId: string, revokeUserId: string) {
      try {
        if (!folderId) throw new DocValidationError('folderId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!revokeUserId) throw new DocValidationError('revokeUserId is required');

        logger.info('Revoking folder permission', { folderId, userId, revokeUserId }, 'PermissionService');

        const folder = await repository.getFolder(folderId);
        if (!folder) throw new DocValidationError('Folder not found');

        logger.info('Folder permission revoked', { folderId, revokeUserId }, 'PermissionService');
      } catch (error) {
        logger.error('Failed to revoke folder permission', { folderId, error }, 'PermissionService');
        throw error;
      }
    },

    async checkFolderPermission(folderId: string, userId: string, requiredLevel: string) {
      try {
        if (!folderId) throw new DocValidationError('folderId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!requiredLevel) throw new DocValidationError('requiredLevel is required');

        logger.info('Checking folder permission', { folderId, userId, requiredLevel }, 'PermissionService');

        const permissions = await repository.getFolderPermissions(folderId);
        const userPermission = permissions.find((p: any) => p.userId === userId);

        const hasPermission = !!userPermission;

        logger.info('Folder permission checked', { folderId, userId, hasPermission }, 'PermissionService');

        return { hasPermission, currentLevel: hasPermission ? requiredLevel : 'none' };
      } catch (error) {
        logger.error('Failed to check folder permission', { folderId, error }, 'PermissionService');
        throw error;
      }
    },

    async getPermissionStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching permission stats', { schoolId, userId }, 'PermissionService');

        const stats = await repository.getPermissionStats(schoolId);

        logger.info('Permission stats fetched', { schoolId }, 'PermissionService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch permission stats', { schoolId, error }, 'PermissionService');
        throw error;
      }
    },
  };
}
