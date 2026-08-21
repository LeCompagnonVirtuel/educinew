import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocAIClassificationError,
  DocAIRecommendationError,
  DocAIDuplicateError,
  DocAISummaryError,
  DocAIExtractionError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createAiService(repository: DocumentRepositoryEnterprise) {
  return {
    async classifyDocument(documentId: string, userId: string, schoolId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');

        logger.info('Classifying document', { documentId, userId, schoolId }, 'AIService');

        const classification = await repository.classifyDocument(documentId, schoolId);

        logger.info('Document classified successfully', { documentId }, 'AIService');

        return classification;
      } catch (error) {
        logger.error('Failed to classify document', { documentId, error }, 'AIService');
        throw error;
      }
    },

    async getDocumentClassification(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching document classification', { documentId, userId }, 'AIService');

        const classification = await repository.getDocumentClassification(documentId);

        logger.info('Document classification fetched', { documentId }, 'AIService');

        return classification;
      } catch (error) {
        logger.error('Failed to fetch document classification', { documentId, error }, 'AIService');
        throw error;
      }
    },

    async getRecommendations(documentId: string, userId: string, schoolId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');

        logger.info('Fetching recommendations', { documentId, userId, schoolId }, 'AIService');

        const recommendations = await repository.getRecommendations(schoolId, userId);

        logger.info('Recommendations fetched', { documentId, count: recommendations.length }, 'AIService');

        return recommendations;
      } catch (error) {
        logger.error('Failed to fetch recommendations', { documentId, error }, 'AIService');
        throw error;
      }
    },

    async getDocumentInsights(documentId: string, userId: string, schoolId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');

        logger.info('Fetching document insights', { documentId, userId, schoolId }, 'AIService');

        const insights = await repository.getDocumentInsights(schoolId);

        logger.info('Document insights fetched', { documentId }, 'AIService');

        return insights;
      } catch (error) {
        logger.error('Failed to fetch document insights', { documentId, error }, 'AIService');
        throw error;
      }
    },

    async detectDuplicates(documentId: string, userId: string, schoolId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');

        logger.info('Detecting duplicates', { documentId, userId, schoolId }, 'AIService');

        const duplicates = await repository.detectDuplicates(schoolId);

        logger.info('Duplicates detected', { documentId, count: duplicates.length }, 'AIService');

        return duplicates;
      } catch (error) {
        logger.error('Failed to detect duplicates', { documentId, error }, 'AIService');
        throw error;
      }
    },

    async getDuplicateDocuments(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching duplicate documents', { schoolId, userId }, 'AIService');

        const duplicates = await repository.getDuplicateDocuments(schoolId);

        logger.info('Duplicate documents fetched', { schoolId, count: duplicates.length }, 'AIService');

        return duplicates;
      } catch (error) {
        logger.error('Failed to fetch duplicate documents', { schoolId, error }, 'AIService');
        throw error;
      }
    },

    async generateDocumentSummary(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Generating document summary', { documentId, userId }, 'AIService');

        const summary = await repository.generateDocumentSummary(documentId);

        logger.info('Document summary generated', { documentId }, 'AIService');

        return summary;
      } catch (error) {
        logger.error('Failed to generate document summary', { documentId, error }, 'AIService');
        throw error;
      }
    },

    async extractKeyPhrases(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Extracting key phrases', { documentId, userId }, 'AIService');

        const keyPhrases = await repository.extractKeyPhrases(documentId);

        logger.info('Key phrases extracted', { documentId, count: keyPhrases.length }, 'AIService');

        return keyPhrases;
      } catch (error) {
        logger.error('Failed to extract key phrases', { documentId, error }, 'AIService');
        throw error;
      }
    },

    async detectLanguage(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Detecting language', { documentId, userId }, 'AIService');

        const language = await repository.detectLanguage(documentId);

        logger.info('Language detected', { documentId, language }, 'AIService');

        return language;
      } catch (error) {
        logger.error('Failed to detect language', { documentId, error }, 'AIService');
        throw error;
      }
    },
  };
}
