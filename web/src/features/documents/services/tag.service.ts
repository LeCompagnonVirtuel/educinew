import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocTagNotFoundError,
  DocTagCreateError,
  DocTagDuplicateError,
  DocTagLimitError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createTagService(repository: DocumentRepositoryEnterprise) {
  return {
    async createTag(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || !data.name) throw new DocValidationError('tag name is required');

        logger.info('Creating tag', { schoolId, userId, name: data.name }, 'TagService');

        const existingTags = await repository.getTags(schoolId);
        const duplicate = existingTags.find((t: any) => t.name === data.name);
        if (duplicate) throw new DocTagDuplicateError();

        const tag = await repository.createTag(
          { ...data, createdBy: userId } as any,
          schoolId
        );

        logger.info('Tag created successfully', { tagId: tag.id }, 'TagService');

        return tag;
      } catch (error) {
        logger.error('Failed to create tag', { schoolId, error }, 'TagService');
        throw error;
      }
    },

    async updateTag(tagId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!tagId) throw new DocValidationError('tagId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('update data is required');

        logger.info('Updating tag', { tagId, userId }, 'TagService');

        const existing = await repository.getTag(tagId);
        if (!existing) throw new DocTagNotFoundError(tagId);

        const updated = await repository.updateTag(tagId, data as any);

        logger.info('Tag updated successfully', { tagId }, 'TagService');

        return updated;
      } catch (error) {
        logger.error('Failed to update tag', { tagId, error }, 'TagService');
        throw error;
      }
    },

    async deleteTag(tagId: string, userId: string) {
      try {
        if (!tagId) throw new DocValidationError('tagId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Deleting tag', { tagId, userId }, 'TagService');

        const existing = await repository.getTag(tagId);
        if (!existing) throw new DocTagNotFoundError(tagId);

        await repository.deleteTag(tagId);

        logger.info('Tag deleted successfully', { tagId }, 'TagService');
      } catch (error) {
        logger.error('Failed to delete tag', { tagId, error }, 'TagService');
        throw error;
      }
    },

    async getTagDocuments(tagId: string, schoolId: string, userId: string) {
      try {
        if (!tagId) throw new DocValidationError('tagId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching tag documents', { tagId, schoolId, userId }, 'TagService');

        const documents = await repository.getDocumentsByTag(schoolId, tagId);

        logger.info('Tag documents fetched', { tagId, count: documents.length }, 'TagService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch tag documents', { tagId, error }, 'TagService');
        throw error;
      }
    },

    async getTagStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching tag stats', { schoolId, userId }, 'TagService');

        const tags = await repository.getTags(schoolId);
        const stats = {
          totalTags: tags.length,
          tagsWithDocuments: 0,
          averageDocumentsPerTag: 0,
        };

        logger.info('Tag stats fetched', { schoolId }, 'TagService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch tag stats', { schoolId, error }, 'TagService');
        throw error;
      }
    },

    async bulkTag(documentIds: string[], tagIds: string[], userId: string) {
      try {
        if (!documentIds || documentIds.length === 0) throw new DocValidationError('documentIds are required');
        if (!tagIds || tagIds.length === 0) throw new DocValidationError('tagIds are required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Bulk tagging documents', { docCount: documentIds.length, tagCount: tagIds.length, userId }, 'TagService');

        const result = await repository.bulkTagDocuments(documentIds, tagIds);

        logger.info('Bulk tag completed', { result }, 'TagService');

        return result;
      } catch (error) {
        logger.error('Failed to bulk tag documents', { error }, 'TagService');
        throw error;
      }
    },

    async untagDocuments(documentId: string, tagId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!tagId) throw new DocValidationError('tagId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Untagging document', { documentId, tagId, userId }, 'TagService');

        await repository.removeTagFromDocument(documentId, tagId);

        logger.info('Document untagged successfully', { documentId, tagId }, 'TagService');
      } catch (error) {
        logger.error('Failed to untag document', { documentId, tagId, error }, 'TagService');
        throw error;
      }
    },

    async getTags(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching tags', { schoolId, userId }, 'TagService');

        const tags = await repository.getTags(schoolId);

        logger.info('Tags fetched successfully', { schoolId, count: tags.length }, 'TagService');

        return tags;
      } catch (error) {
        logger.error('Failed to fetch tags', { schoolId, error }, 'TagService');
        throw error;
      }
    },
  };
}
