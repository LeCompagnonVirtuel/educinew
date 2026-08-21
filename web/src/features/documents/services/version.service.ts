import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocVersionNotFoundError,
  DocVersionCreateError,
  DocVersionCompareError,
  DocVersionRestoreError,
  DocVersionLimitError,
  DocVersionConflictError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createVersionService(repository: DocumentRepositoryEnterprise) {
  return {
    async createVersion(documentId: string, schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Creating version', { documentId, schoolId, userId }, 'VersionService');

        const version = await repository.createVersion(
          documentId,
          { ...data, createdBy: userId } as any,
          schoolId
        );

        logger.info('Version created successfully', { versionId: version.id }, 'VersionService');

        return version;
      } catch (error) {
        logger.error('Failed to create version', { documentId, schoolId, error }, 'VersionService');
        throw error;
      }
    },

    async compareVersions(versionId1: string, versionId2: string, userId: string) {
      try {
        if (!versionId1) throw new DocValidationError('versionId1 is required');
        if (!versionId2) throw new DocValidationError('versionId2 is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Comparing versions', { versionId1, versionId2, userId }, 'VersionService');

        const v1 = await repository.getVersion(versionId1);
        if (!v1) throw new DocVersionNotFoundError(versionId1);

        const v2 = await repository.getVersion(versionId2);
        if (!v2) throw new DocVersionNotFoundError(versionId2);

        const diff = await repository.compareVersions(versionId1, versionId2);

        logger.info('Versions compared successfully', { versionId1, versionId2 }, 'VersionService');

        return diff;
      } catch (error) {
        logger.error('Failed to compare versions', { versionId1, versionId2, error }, 'VersionService');
        throw error;
      }
    },

    async restoreVersion(versionId: string, userId: string) {
      try {
        if (!versionId) throw new DocValidationError('versionId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Restoring version', { versionId, userId }, 'VersionService');

        const version = await repository.getVersion(versionId);
        if (!version) throw new DocVersionNotFoundError(versionId);

        const document = await repository.restoreVersion(versionId);

        logger.info('Version restored successfully', { versionId }, 'VersionService');

        return document;
      } catch (error) {
        logger.error('Failed to restore version', { versionId, error }, 'VersionService');
        throw error;
      }
    },

    async getVersionDiff(versionId1: string, versionId2: string, userId: string) {
      try {
        if (!versionId1) throw new DocValidationError('versionId1 is required');
        if (!versionId2) throw new DocValidationError('versionId2 is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Getting version diff', { versionId1, versionId2, userId }, 'VersionService');

        const v1 = await repository.getVersion(versionId1);
        if (!v1) throw new DocVersionNotFoundError(versionId1);

        const v2 = await repository.getVersion(versionId2);
        if (!v2) throw new DocVersionNotFoundError(versionId2);

        const diff = await repository.compareVersions(versionId1, versionId2);

        logger.info('Version diff fetched', { versionId1, versionId2 }, 'VersionService');

        return diff;
      } catch (error) {
        logger.error('Failed to get version diff', { versionId1, versionId2, error }, 'VersionService');
        throw error;
      }
    },

    async getVersionStats(schoolId: string, userId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching version stats', { schoolId, userId }, 'VersionService');

        const stats = await repository.getVersionStats(schoolId, dateFrom, dateTo);

        logger.info('Version stats fetched', { schoolId }, 'VersionService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch version stats', { schoolId, error }, 'VersionService');
        throw error;
      }
    },

    async getLatestVersion(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching latest version', { documentId, userId }, 'VersionService');

        const versions = await repository.getVersions(documentId);
        const latest = versions.length > 0 ? versions[0] : null;

        if (!latest) throw new DocVersionNotFoundError(documentId);

        logger.info('Latest version fetched', { documentId, versionId: latest.id }, 'VersionService');

        return latest;
      } catch (error) {
        logger.error('Failed to fetch latest version', { documentId, error }, 'VersionService');
        throw error;
      }
    },

    async autoVersion(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Auto-versioning document', { documentId, schoolId, userId }, 'VersionService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocValidationError('Document not found');

        const version = await repository.createVersion(
          documentId,
          {
            createdBy: userId,
            comment: 'Auto-version',
            autoGenerated: true,
          } as any,
          schoolId
        );

        logger.info('Auto-version created', { documentId, versionId: version.id }, 'VersionService');

        return version;
      } catch (error) {
        logger.error('Failed to auto-version document', { documentId, error }, 'VersionService');
        throw error;
      }
    },

    async getVersionComments(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching version comments', { documentId, userId }, 'VersionService');

        const versions = await repository.getVersions(documentId);
        const comments = versions
          .filter((v: any) => v.comment)
          .map((v: any) => ({ versionId: v.id, comment: v.comment, createdAt: v.createdAt }));

        logger.info('Version comments fetched', { documentId, count: comments.length }, 'VersionService');

        return comments;
      } catch (error) {
        logger.error('Failed to fetch version comments', { documentId, error }, 'VersionService');
        throw error;
      }
    },

    async bulkVersion(documentIds: string[], schoolId: string, userId: string) {
      try {
        if (!documentIds || documentIds.length === 0) throw new DocValidationError('documentIds are required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Bulk versioning documents', { count: documentIds.length, schoolId, userId }, 'VersionService');

        let successCount = 0;
        let failureCount = 0;

        for (const documentId of documentIds) {
          try {
            await repository.createVersion(
              documentId,
              { createdBy: userId, comment: 'Bulk version' } as any,
              schoolId
            );
            successCount++;
          } catch {
            failureCount++;
          }
        }

        logger.info('Bulk versioning completed', { successCount, failureCount }, 'VersionService');

        return { totalProcessed: documentIds.length, successCount, failureCount };
      } catch (error) {
        logger.error('Failed to bulk version documents', { error }, 'VersionService');
        throw error;
      }
    },

    async getVersions(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching versions', { documentId, userId }, 'VersionService');

        const versions = await repository.getVersions(documentId);

        logger.info('Versions fetched successfully', { documentId, count: versions.length }, 'VersionService');

        return versions;
      } catch (error) {
        logger.error('Failed to fetch versions', { documentId, error }, 'VersionService');
        throw error;
      }
    },

    async getVersion(versionId: string, userId: string) {
      try {
        if (!versionId) throw new DocValidationError('versionId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching version', { versionId, userId }, 'VersionService');

        const version = await repository.getVersion(versionId);
        if (!version) throw new DocVersionNotFoundError(versionId);

        return version;
      } catch (error) {
        logger.error('Failed to fetch version', { versionId, error }, 'VersionService');
        throw error;
      }
    },
  };
}
