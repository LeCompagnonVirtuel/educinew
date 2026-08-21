import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocCommentNotFoundError,
  DocCommentCreateError,
  DocCommentUpdateError,
  DocCommentDeleteError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createCommentService(repository: DocumentRepositoryEnterprise) {
  return {
    async createComment(documentId: string, userId: string, content: string, parentId?: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!content || content.trim().length === 0) throw new DocValidationError('comment content is required');

        logger.info('Creating comment', { documentId, userId }, 'CommentService');

        const comment = await repository.addComment(documentId, userId, content, parentId);

        logger.info('Comment created successfully', { commentId: comment.id }, 'CommentService');

        return comment;
      } catch (error) {
        logger.error('Failed to create comment', { documentId, userId, error }, 'CommentService');
        throw error;
      }
    },

    async updateComment(commentId: string, userId: string, content: string) {
      try {
        if (!commentId) throw new DocValidationError('commentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!content || content.trim().length === 0) throw new DocValidationError('comment content is required');

        logger.info('Updating comment', { commentId, userId }, 'CommentService');

        const existing = await repository.getComment(commentId);
        if (!existing) throw new DocCommentNotFoundError(commentId);

        const updated = await repository.updateComment(commentId, userId, content);

        logger.info('Comment updated successfully', { commentId }, 'CommentService');

        return updated;
      } catch (error) {
        logger.error('Failed to update comment', { commentId, error }, 'CommentService');
        throw error;
      }
    },

    async deleteComment(commentId: string, userId: string) {
      try {
        if (!commentId) throw new DocValidationError('commentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Deleting comment', { commentId, userId }, 'CommentService');

        const existing = await repository.getComment(commentId);
        if (!existing) throw new DocCommentNotFoundError(commentId);

        await repository.deleteComment(commentId, userId);

        logger.info('Comment deleted successfully', { commentId }, 'CommentService');
      } catch (error) {
        logger.error('Failed to delete comment', { commentId, error }, 'CommentService');
        throw error;
      }
    },

    async getCommentsByDocument(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching comments by document', { documentId, userId }, 'CommentService');

        const comments = await repository.getComments(documentId);

        logger.info('Comments by document fetched', { documentId, count: comments.length }, 'CommentService');

        return comments;
      } catch (error) {
        logger.error('Failed to fetch comments by document', { documentId, error }, 'CommentService');
        throw error;
      }
    },

    async getCommentsByUser(schoolId: string, userId: string, targetUserId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!targetUserId) throw new DocValidationError('targetUserId is required');

        logger.info('Fetching comments by user', { schoolId, userId, targetUserId }, 'CommentService');

        const comments = await repository.getCommentsByUser(schoolId, targetUserId);

        logger.info('Comments by user fetched', { schoolId, count: comments.length }, 'CommentService');

        return comments;
      } catch (error) {
        logger.error('Failed to fetch comments by user', { schoolId, error }, 'CommentService');
        throw error;
      }
    },

    async getCommentThread(commentId: string, userId: string) {
      try {
        if (!commentId) throw new DocValidationError('commentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching comment thread', { commentId, userId }, 'CommentService');

        const comment = await repository.getComment(commentId);
        if (!comment) throw new DocCommentNotFoundError(commentId);

        const replies = await repository.getCommentReplies(commentId);

        const thread = {
          parent: comment,
          replies,
          totalReplies: replies.length,
        };

        logger.info('Comment thread fetched', { commentId, replyCount: replies.length }, 'CommentService');

        return thread;
      } catch (error) {
        logger.error('Failed to fetch comment thread', { commentId, error }, 'CommentService');
        throw error;
      }
    },

    async resolveComment(commentId: string, userId: string) {
      try {
        if (!commentId) throw new DocValidationError('commentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Resolving comment', { commentId, userId }, 'CommentService');

        const existing = await repository.getComment(commentId);
        if (!existing) throw new DocCommentNotFoundError(commentId);

        const resolved = await repository.updateComment(commentId, userId, (existing as any).content);

        logger.info('Comment resolved successfully', { commentId }, 'CommentService');

        return resolved;
      } catch (error) {
        logger.error('Failed to resolve comment', { commentId, error }, 'CommentService');
        throw error;
      }
    },

    async getCommentStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching comment stats', { schoolId, userId }, 'CommentService');

        const recentComments = await repository.getRecentComments(schoolId);
        const stats = {
          totalComments: recentComments.length,
          commentsLast24h: recentComments.filter((c: any) => {
            const createdAt = new Date(c.createdAt);
            const now = new Date();
            return now.getTime() - createdAt.getTime() < 24 * 60 * 60 * 1000;
          }).length,
          commentsLast7d: recentComments.filter((c: any) => {
            const createdAt = new Date(c.createdAt);
            const now = new Date();
            return now.getTime() - createdAt.getTime() < 7 * 24 * 60 * 60 * 1000;
          }).length,
          uniqueCommenters: new Set(recentComments.map((c: any) => c.userId)).size,
        };

        logger.info('Comment stats fetched', { schoolId }, 'CommentService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch comment stats', { schoolId, error }, 'CommentService');
        throw error;
      }
    },

    async getComments(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching comments', { documentId, userId }, 'CommentService');

        const comments = await repository.getComments(documentId);

        logger.info('Comments fetched successfully', { documentId, count: comments.length }, 'CommentService');

        return comments;
      } catch (error) {
        logger.error('Failed to fetch comments', { documentId, error }, 'CommentService');
        throw error;
      }
    },

    async getComment(commentId: string, userId: string) {
      try {
        if (!commentId) throw new DocValidationError('commentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching comment', { commentId, userId }, 'CommentService');

        const comment = await repository.getComment(commentId);
        if (!comment) throw new DocCommentNotFoundError(commentId);

        return comment;
      } catch (error) {
        logger.error('Failed to fetch comment', { commentId, error }, 'CommentService');
        throw error;
      }
    },
  };
}
