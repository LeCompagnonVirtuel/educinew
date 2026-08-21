import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocNotFoundError,
  DocCreateError,
  DocUpdateError,
  DocDeleteError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createReviewService(repository: DocumentRepositoryEnterprise) {
  return {
    async getReviews(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching reviews', { documentId, schoolId, userId }, 'ReviewService');

        const comments = await repository.getComments(documentId);

        logger.info('Reviews fetched', { documentId, count: comments.length }, 'ReviewService');

        return comments;
      } catch (error) {
        logger.error('Failed to fetch reviews', { documentId, error }, 'ReviewService');
        throw error;
      }
    },

    async getReview(reviewId: string, documentId: string) {
      try {
        if (!reviewId) throw new DocValidationError('reviewId is required');
        if (!documentId) throw new DocValidationError('documentId is required');

        logger.info('Fetching review', { reviewId, documentId }, 'ReviewService');

        const review = await repository.getComment(reviewId);
        if (!review) throw new DocNotFoundError(reviewId);

        logger.info('Review fetched', { reviewId }, 'ReviewService');

        return review;
      } catch (error) {
        logger.error('Failed to fetch review', { reviewId, error }, 'ReviewService');
        throw error;
      }
    },

    async createReview(documentId: string, schoolId: string, userId: string, content: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!content) throw new DocValidationError('content is required');

        logger.info('Creating review', { documentId, schoolId, userId }, 'ReviewService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);

        const review = await repository.addComment(documentId, userId, content);

        logger.info('Review created successfully', { reviewId: review.id }, 'ReviewService');

        return review;
      } catch (error) {
        logger.error('Failed to create review', { documentId, error }, 'ReviewService');
        throw error;
      }
    },

    async updateReview(reviewId: string, documentId: string, userId: string, content: string) {
      try {
        if (!reviewId) throw new DocValidationError('reviewId is required');
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!content) throw new DocValidationError('content is required');

        logger.info('Updating review', { reviewId, documentId, userId }, 'ReviewService');

        const review = await repository.getComment(reviewId);
        if (!review) throw new DocNotFoundError(reviewId);

        const updated = await repository.updateComment(reviewId, userId, content);

        logger.info('Review updated successfully', { reviewId }, 'ReviewService');

        return updated;
      } catch (error) {
        logger.error('Failed to update review', { reviewId, error }, 'ReviewService');
        throw error;
      }
    },

    async deleteReview(reviewId: string, documentId: string, userId: string) {
      try {
        if (!reviewId) throw new DocValidationError('reviewId is required');
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Deleting review', { reviewId, documentId, userId }, 'ReviewService');

        const review = await repository.getComment(reviewId);
        if (!review) throw new DocNotFoundError(reviewId);

        await repository.deleteComment(reviewId, userId);

        logger.info('Review deleted successfully', { reviewId }, 'ReviewService');
      } catch (error) {
        logger.error('Failed to delete review', { reviewId, error }, 'ReviewService');
        throw error;
      }
    },

    async addReviewComment(reviewId: string, documentId: string, userId: string, content: string) {
      try {
        if (!reviewId) throw new DocValidationError('reviewId is required');
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!content) throw new DocValidationError('content is required');

        logger.info('Adding review comment', { reviewId, documentId, userId }, 'ReviewService');

        const review = await repository.getComment(reviewId);
        if (!review) throw new DocNotFoundError(reviewId);

        const reply = await repository.replyToComment(reviewId, userId, content);

        logger.info('Review comment added successfully', { reviewId, replyId: reply.id }, 'ReviewService');

        return reply;
      } catch (error) {
        logger.error('Failed to add review comment', { reviewId, error }, 'ReviewService');
        throw error;
      }
    },

    async getReviewStats(schoolId: string, userId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching review stats', { schoolId, userId }, 'ReviewService');

        const stats = await repository.getDocumentStats(schoolId, dateFrom, dateTo);

        logger.info('Review stats fetched', { schoolId }, 'ReviewService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch review stats', { schoolId, error }, 'ReviewService');
        throw error;
      }
    },
  };
}
