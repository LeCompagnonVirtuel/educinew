import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocMergeError,
  DocMergeFormatError,
  DocMergeSizeError,
  DocSplitError,
  DocSplitPageError,
  DocSplitFormatError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createMergeService(repository: DocumentRepositoryEnterprise) {
  return {
    async mergeDocuments(documentIds: string[], schoolId: string, userId: string, options?: { name?: string }) {
      try {
        if (!documentIds || documentIds.length < 2) throw new DocValidationError('At least 2 documentIds are required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Merging documents', { count: documentIds.length, schoolId, userId }, 'MergeService');

        const result = await repository.mergeDocuments(documentIds, schoolId, options);

        logger.info('Documents merged successfully', { mergeId: result.id }, 'MergeService');

        return result;
      } catch (error) {
        logger.error('Failed to merge documents', { documentIds, schoolId, error }, 'MergeService');
        throw error;
      }
    },

    async splitPDF(documentId: string, schoolId: string, userId: string, options?: { pages?: string; splitAt?: number[] }) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Splitting PDF', { documentId, schoolId, userId }, 'MergeService');

        const result = await repository.splitDocument(documentId, schoolId, options);

        logger.info('PDF split successfully', { splitId: result.id }, 'MergeService');

        return result;
      } catch (error) {
        logger.error('Failed to split PDF', { documentId, schoolId, error }, 'MergeService');
        throw error;
      }
    },

    async getMergeHistory(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching merge history', { schoolId, userId }, 'MergeService');

        const history = await repository.getMergeHistory(schoolId);

        logger.info('Merge history fetched', { schoolId, count: history.length }, 'MergeService');

        return history;
      } catch (error) {
        logger.error('Failed to fetch merge history', { schoolId, error }, 'MergeService');
        throw error;
      }
    },

    async getSplitHistory(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching split history', { schoolId, userId }, 'MergeService');

        const history = await repository.getMergeHistory(schoolId);
        const splits = history.filter((h: any) => h.type === 'split');

        logger.info('Split history fetched', { schoolId, count: splits.length }, 'MergeService');

        return splits;
      } catch (error) {
        logger.error('Failed to fetch split history', { schoolId, error }, 'MergeService');
        throw error;
      }
    },

    async getMergeStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching merge stats', { schoolId, userId }, 'MergeService');

        const history = await repository.getMergeHistory(schoolId);
        const merges = history.filter((h: any) => h.type === 'merge');
        const stats = {
          totalMerges: merges.length,
          completedMerges: merges.filter((m: any) => m.status === 'completed').length,
          failedMerges: merges.filter((m: any) => m.status === 'failed').length,
          averageDocumentsPerMerge: merges.length > 0
            ? merges.reduce((sum: number, m: any) => sum + (m.documentCount || 0), 0) / merges.length
            : 0,
        };

        logger.info('Merge stats fetched', { schoolId }, 'MergeService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch merge stats', { schoolId, error }, 'MergeService');
        throw error;
      }
    },

    async getSplitStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching split stats', { schoolId, userId }, 'MergeService');

        const history = await repository.getMergeHistory(schoolId);
        const splits = history.filter((h: any) => h.type === 'split');
        const stats = {
          totalSplits: splits.length,
          completedSplits: splits.filter((s: any) => s.status === 'completed').length,
          failedSplits: splits.filter((s: any) => s.status === 'failed').length,
          averagePartsPerSplit: splits.length > 0
            ? splits.reduce((sum: number, s: any) => sum + (s.partCount || 0), 0) / splits.length
            : 0,
        };

        logger.info('Split stats fetched', { schoolId }, 'MergeService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch split stats', { schoolId, error }, 'MergeService');
        throw error;
      }
    },

    async previewMerge(documentIds: string[], userId: string) {
      try {
        if (!documentIds || documentIds.length < 2) throw new DocValidationError('At least 2 documentIds are required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Previewing merge', { count: documentIds.length, userId }, 'MergeService');

        const documents = [];
        for (const docId of documentIds) {
          try {
            const doc = await repository.getDocument(docId);
            documents.push(doc);
          } catch {
            continue;
          }
        }

        const preview = {
          documentCount: documents.length,
          documents: documents.map((d: any) => ({ id: d.id, name: d.name, size: d.size })),
          estimatedSize: documents.reduce((sum: number, d: any) => sum + (d.size || 0), 0),
        };

        logger.info('Merge preview generated', { count: documents.length }, 'MergeService');

        return preview;
      } catch (error) {
        logger.error('Failed to preview merge', { documentIds, error }, 'MergeService');
        throw error;
      }
    },

    async previewSplit(documentId: string, userId: string, options?: { pages?: string; splitAt?: number[] }) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Previewing split', { documentId, userId }, 'MergeService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocValidationError('Document not found');

        const preview = {
          documentId,
          documentName: (document as any).name,
          totalPages: (document as any).pageCount || 0,
          splitPoints: options?.splitAt || [],
          estimatedParts: options?.splitAt ? options.splitAt.length + 1 : 1,
        };

        logger.info('Split preview generated', { documentId }, 'MergeService');

        return preview;
      } catch (error) {
        logger.error('Failed to preview split', { documentId, error }, 'MergeService');
        throw error;
      }
    },
  };
}
