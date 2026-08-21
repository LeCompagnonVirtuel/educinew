import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocOCRNotFoundError,
  DocOCRFailedError,
  DocOCRLanguageError,
  DocOCRTimeoutError,
  DocOCRQualityError,
  DocOCRFormatError,
  DocOCRFieldError,
  DocOCRTemplateError,
  DocOCRProcessingError,
  DocOCRResultError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createOcrService(repository: DocumentRepositoryEnterprise) {
  return {
    async createOCRJob(documentId: string, schoolId: string, userId: string, options?: { language?: string; templateId?: string }) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Creating OCR job', { documentId, schoolId, userId }, 'OCRService');

        const job = await repository.createOCRJob(documentId, schoolId, options);

        logger.info('OCR job created successfully', { ocrId: job.id }, 'OCRService');

        return job;
      } catch (error) {
        logger.error('Failed to create OCR job', { documentId, schoolId, error }, 'OCRService');
        throw error;
      }
    },

    async processOCR(ocrId: string, userId: string) {
      try {
        if (!ocrId) throw new DocValidationError('ocrId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Processing OCR', { ocrId, userId }, 'OCRService');

        const existing = await repository.getOCRResult(ocrId);
        if (!existing) throw new DocOCRNotFoundError(ocrId);

        const result = await repository.getOCRResult(ocrId);

        logger.info('OCR processed successfully', { ocrId }, 'OCRService');

        return result;
      } catch (error) {
        logger.error('Failed to process OCR', { ocrId, error }, 'OCRService');
        throw error;
      }
    },

    async getOCRResult(ocrId: string, userId: string) {
      try {
        if (!ocrId) throw new DocValidationError('ocrId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching OCR result', { ocrId, userId }, 'OCRService');

        const result = await repository.getOCRResult(ocrId);
        if (!result) throw new DocOCRNotFoundError(ocrId);

        return result;
      } catch (error) {
        logger.error('Failed to fetch OCR result', { ocrId, error }, 'OCRService');
        throw error;
      }
    },

    async validateOCRResult(ocrId: string, userId: string) {
      try {
        if (!ocrId) throw new DocValidationError('ocrId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Validating OCR result', { ocrId, userId }, 'OCRService');

        const result = await repository.getOCRResult(ocrId);
        if (!result) throw new DocOCRNotFoundError(ocrId);

        const fields = await repository.getOCRFields(ocrId);

        const isValid = fields.length > 0;

        logger.info('OCR result validated', { ocrId, isValid }, 'OCRService');

        return { isValid, fieldCount: fields.length };
      } catch (error) {
        logger.error('Failed to validate OCR result', { ocrId, error }, 'OCRService');
        throw error;
      }
    },

    async correctOCRResult(ocrId: string, userId: string, corrections: Record<string, unknown>) {
      try {
        if (!ocrId) throw new DocValidationError('ocrId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!corrections) throw new DocValidationError('corrections are required');

        logger.info('Correcting OCR result', { ocrId, userId }, 'OCRService');

        const existing = await repository.getOCRResult(ocrId);
        if (!existing) throw new DocOCRNotFoundError(ocrId);

        const updated = await repository.updateOCRResult(ocrId, corrections as any);

        logger.info('OCR result corrected successfully', { ocrId }, 'OCRService');

        return updated;
      } catch (error) {
        logger.error('Failed to correct OCR result', { ocrId, error }, 'OCRService');
        throw error;
      }
    },

    async getOCRTemplates(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching OCR templates', { schoolId, userId }, 'OCRService');

        const templates = await repository.getOCRTemplates(schoolId);

        logger.info('OCR templates fetched', { schoolId, count: templates.length }, 'OCRService');

        return templates;
      } catch (error) {
        logger.error('Failed to fetch OCR templates', { schoolId, error }, 'OCRService');
        throw error;
      }
    },

    async createOCRTemplate(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || !data.name) throw new DocValidationError('template name is required');

        logger.info('Creating OCR template', { schoolId, userId, name: data.name }, 'OCRService');

        const template = await repository.createOCRTemplate(
          { ...data, createdBy: userId } as any,
          schoolId
        );

        logger.info('OCR template created successfully', { templateId: template.id }, 'OCRService');

        return template;
      } catch (error) {
        logger.error('Failed to create OCR template', { schoolId, error }, 'OCRService');
        throw error;
      }
    },

    async updateOCRTemplate(templateId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!templateId) throw new DocValidationError('templateId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('update data is required');

        logger.info('Updating OCR template', { templateId, userId }, 'OCRService');

        const updated = await repository.updateOCRTemplate(templateId, data as any);

        logger.info('OCR template updated successfully', { templateId }, 'OCRService');

        return updated;
      } catch (error) {
        logger.error('Failed to update OCR template', { templateId, error }, 'OCRService');
        throw error;
      }
    },

    async getOCRFields(ocrId: string, userId: string) {
      try {
        if (!ocrId) throw new DocValidationError('ocrId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching OCR fields', { ocrId, userId }, 'OCRService');

        const result = await repository.getOCRResult(ocrId);
        if (!result) throw new DocOCRNotFoundError(ocrId);

        const fields = await repository.getOCRFields(ocrId);

        logger.info('OCR fields fetched', { ocrId, count: fields.length }, 'OCRService');

        return fields;
      } catch (error) {
        logger.error('Failed to fetch OCR fields', { ocrId, error }, 'OCRService');
        throw error;
      }
    },

    async extractOCRFields(ocrId: string, userId: string, fieldNames?: string[]) {
      try {
        if (!ocrId) throw new DocValidationError('ocrId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Extracting OCR fields', { ocrId, userId }, 'OCRService');

        const result = await repository.getOCRResult(ocrId);
        if (!result) throw new DocOCRNotFoundError(ocrId);

        const fields = await repository.getOCRFields(ocrId);

        const extracted = fieldNames
          ? fields.filter((f: any) => fieldNames.includes(f.name))
          : fields;

        logger.info('OCR fields extracted', { ocrId, count: extracted.length }, 'OCRService');

        return extracted;
      } catch (error) {
        logger.error('Failed to extract OCR fields', { ocrId, error }, 'OCRService');
        throw error;
      }
    },

    async getOCRStats(schoolId: string, userId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching OCR stats', { schoolId, userId }, 'OCRService');

        const stats = await repository.getOCRArchiveStats(schoolId, dateFrom, dateTo);

        logger.info('OCR stats fetched', { schoolId }, 'OCRService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch OCR stats', { schoolId, error }, 'OCRService');
        throw error;
      }
    },

    async getOCRHistory(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching OCR history', { schoolId, userId }, 'OCRService');

        const pending = await repository.getPendingOCRJobs(schoolId);
        const completed = await repository.getCompletedOCRJobs(schoolId);

        const history = [...pending, ...completed];

        logger.info('OCR history fetched', { schoolId, count: history.length }, 'OCRService');

        return history;
      } catch (error) {
        logger.error('Failed to fetch OCR history', { schoolId, error }, 'OCRService');
        throw error;
      }
    },

    async retryOCRJob(ocrId: string, userId: string) {
      try {
        if (!ocrId) throw new DocValidationError('ocrId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Retrying OCR job', { ocrId, userId }, 'OCRService');

        const existing = await repository.getOCRResult(ocrId);
        if (!existing) throw new DocOCRNotFoundError(ocrId);

        const updated = await repository.updateOCRResult(ocrId, { status: 'pending' } as any);

        logger.info('OCR job retry initiated', { ocrId }, 'OCRService');

        return updated;
      } catch (error) {
        logger.error('Failed to retry OCR job', { ocrId, error }, 'OCRService');
        throw error;
      }
    },

    async getOCRJobs(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching OCR jobs', { schoolId, userId }, 'OCRService');

        const pending = await repository.getPendingOCRJobs(schoolId);
        const completed = await repository.getCompletedOCRJobs(schoolId);

        const jobs = [...pending, ...completed];

        logger.info('OCR jobs fetched', { schoolId, count: jobs.length }, 'OCRService');

        return jobs;
      } catch (error) {
        logger.error('Failed to fetch OCR jobs', { schoolId, error }, 'OCRService');
        throw error;
      }
    },

    async getOCRJob(ocrId: string, userId: string) {
      try {
        if (!ocrId) throw new DocValidationError('ocrId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching OCR job', { ocrId, userId }, 'OCRService');

        const job = await repository.getOCRResult(ocrId);
        if (!job) throw new DocOCRNotFoundError(ocrId);

        return job;
      } catch (error) {
        logger.error('Failed to fetch OCR job', { ocrId, error }, 'OCRService');
        throw error;
      }
    },
  };
}
