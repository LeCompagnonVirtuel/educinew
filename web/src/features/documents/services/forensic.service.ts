import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocNotFoundError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createForensicService(repository: DocumentRepositoryEnterprise) {
  return {
    async getForensicAudit(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching forensic audit', { documentId, schoolId, userId }, 'ForensicService');

        const audit = await repository.getAuditTrail(schoolId, documentId);

        logger.info('Forensic audit fetched', { documentId, count: audit.length }, 'ForensicService');

        return audit;
      } catch (error) {
        logger.error('Failed to fetch forensic audit', { documentId, error }, 'ForensicService');
        throw error;
      }
    },

    async createForensicAudit(documentId: string, schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('audit data is required');

        logger.info('Creating forensic audit', { documentId, schoolId, userId }, 'ForensicService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);

        const audit = {
          documentId,
          userId,
          schoolId,
          ...data,
          createdAt: new Date().toISOString(),
        };

        logger.info('Forensic audit created successfully', { documentId }, 'ForensicService');

        return audit;
      } catch (error) {
        logger.error('Failed to create forensic audit', { documentId, error }, 'ForensicService');
        throw error;
      }
    },

    async getForensicTimeline(documentId: string, schoolId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');

        logger.info('Fetching forensic timeline', { documentId, schoolId }, 'ForensicService');

        const timeline = await repository.getDocumentTimeline(documentId);

        logger.info('Forensic timeline fetched', { documentId, count: timeline.length }, 'ForensicService');

        return timeline;
      } catch (error) {
        logger.error('Failed to fetch forensic timeline', { documentId, error }, 'ForensicService');
        throw error;
      }
    },

    async getForensicStats(schoolId: string, userId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching forensic stats', { schoolId, userId }, 'ForensicService');

        const stats = await repository.getDocumentStats(schoolId, dateFrom, dateTo);

        logger.info('Forensic stats fetched', { schoolId }, 'ForensicService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch forensic stats', { schoolId, error }, 'ForensicService');
        throw error;
      }
    },

    async validateForensicAudit(documentId: string, schoolId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');

        logger.info('Validating forensic audit', { documentId, schoolId }, 'ForensicService');

        const audit = await repository.getAuditTrail(schoolId, documentId);

        const isValid = audit.length > 0;

        logger.info('Forensic audit validated', { documentId, isValid }, 'ForensicService');

        return { isValid, auditCount: audit.length };
      } catch (error) {
        logger.error('Failed to validate forensic audit', { documentId, error }, 'ForensicService');
        throw error;
      }
    },

    async getForensicReport(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching forensic report', { documentId, schoolId, userId }, 'ForensicService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);

        const audit = await repository.getAuditTrail(schoolId, documentId);
        const timeline = await repository.getDocumentTimeline(documentId);
        const compliance = await repository.getComplianceChecks(schoolId);

        const report = {
          document,
          audit,
          timeline,
          compliance,
          generatedAt: new Date().toISOString(),
        };

        logger.info('Forensic report fetched', { documentId }, 'ForensicService');

        return report;
      } catch (error) {
        logger.error('Failed to fetch forensic report', { documentId, error }, 'ForensicService');
        throw error;
      }
    },
  };
}
