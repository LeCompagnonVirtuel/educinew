import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocAnnotationNotFoundError,
  DocAnnotationCreateError,
  DocAnnotationUpdateError,
  DocAnnotationDeleteError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createAnnotationService(repository: DocumentRepositoryEnterprise) {
  return {
    async getAnnotations(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching annotations', { documentId, userId }, 'AnnotationService');

        const annotations = await repository.getAnnotations(documentId);

        logger.info('Annotations fetched successfully', { documentId, count: annotations.length }, 'AnnotationService');

        return annotations;
      } catch (error) {
        logger.error('Failed to fetch annotations', { documentId, error }, 'AnnotationService');
        throw error;
      }
    },

    async createAnnotation(documentId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('annotation data is required');

        logger.info('Creating annotation', { documentId, userId }, 'AnnotationService');

        const annotation = await repository.createAnnotation(documentId, userId, data);

        logger.info('Annotation created successfully', { documentId }, 'AnnotationService');

        return annotation;
      } catch (error) {
        logger.error('Failed to create annotation', { documentId, error }, 'AnnotationService');
        throw error;
      }
    },

    async updateAnnotation(documentId: string, annotationId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!annotationId) throw new DocValidationError('annotationId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('annotation data is required');

        logger.info('Updating annotation', { documentId, annotationId, userId }, 'AnnotationService');

        const annotations = await repository.getAnnotations(documentId);
        const existing = annotations.find((a: { id: string }) => a.id === annotationId);
        if (!existing) throw new DocAnnotationNotFoundError(annotationId);

        const updated = await repository.updateAnnotation(annotationId, userId, data);

        logger.info('Annotation updated successfully', { annotationId }, 'AnnotationService');

        return updated;
      } catch (error) {
        logger.error('Failed to update annotation', { documentId, annotationId, error }, 'AnnotationService');
        throw error;
      }
    },

    async deleteAnnotation(documentId: string, annotationId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!annotationId) throw new DocValidationError('annotationId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Deleting annotation', { documentId, annotationId, userId }, 'AnnotationService');

        const annotations = await repository.getAnnotations(documentId);
        const existing = annotations.find((a: { id: string }) => a.id === annotationId);
        if (!existing) throw new DocAnnotationNotFoundError(annotationId);

        await repository.deleteAnnotation(annotationId, userId);

        logger.info('Annotation deleted successfully', { annotationId }, 'AnnotationService');
      } catch (error) {
        logger.error('Failed to delete annotation', { documentId, annotationId, error }, 'AnnotationService');
        throw error;
      }
    },

    async getAnnotationStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching annotation stats', { schoolId, userId }, 'AnnotationService');

        const stats = await repository.getAnnotationStats(schoolId);

        logger.info('Annotation stats fetched', { schoolId }, 'AnnotationService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch annotation stats', { schoolId, error }, 'AnnotationService');
        throw error;
      }
    },
  };
}
