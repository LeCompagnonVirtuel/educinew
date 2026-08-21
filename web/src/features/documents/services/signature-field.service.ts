import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocSignatureFieldNotFoundError,
  DocSignatureFieldCreateError,
  DocSignatureFieldUpdateError,
  DocSignatureFieldDeleteError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createSignatureFieldService(repository: DocumentRepositoryEnterprise) {
  return {
    async getSignatureFields(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching signature fields', { documentId, userId }, 'SignatureFieldService');

        const fields = await repository.getSignatureFields(documentId);

        logger.info('Signature fields fetched successfully', { documentId, count: fields.length }, 'SignatureFieldService');

        return fields;
      } catch (error) {
        logger.error('Failed to fetch signature fields', { documentId, error }, 'SignatureFieldService');
        throw error;
      }
    },

    async createSignatureField(documentId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('signature field data is required');

        logger.info('Creating signature field', { documentId, userId }, 'SignatureFieldService');

        const field = await repository.createSignatureField(documentId, userId, data);

        logger.info('Signature field created successfully', { documentId }, 'SignatureFieldService');

        return field;
      } catch (error) {
        logger.error('Failed to create signature field', { documentId, error }, 'SignatureFieldService');
        throw error;
      }
    },

    async updateSignatureField(documentId: string, fieldId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!fieldId) throw new DocValidationError('fieldId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('signature field data is required');

        logger.info('Updating signature field', { documentId, fieldId, userId }, 'SignatureFieldService');

        const fields = await repository.getSignatureFields(documentId);
        const existing = fields.find((f: { id: string }) => f.id === fieldId);
        if (!existing) throw new DocSignatureFieldNotFoundError(fieldId);

        const updated = await repository.updateSignatureField(fieldId, userId, data);

        logger.info('Signature field updated successfully', { fieldId }, 'SignatureFieldService');

        return updated;
      } catch (error) {
        logger.error('Failed to update signature field', { documentId, fieldId, error }, 'SignatureFieldService');
        throw error;
      }
    },

    async deleteSignatureField(documentId: string, fieldId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!fieldId) throw new DocValidationError('fieldId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Deleting signature field', { documentId, fieldId, userId }, 'SignatureFieldService');

        const fields = await repository.getSignatureFields(documentId);
        const existing = fields.find((f: { id: string }) => f.id === fieldId);
        if (!existing) throw new DocSignatureFieldNotFoundError(fieldId);

        await repository.deleteSignatureField(fieldId, userId);

        logger.info('Signature field deleted successfully', { fieldId }, 'SignatureFieldService');
      } catch (error) {
        logger.error('Failed to delete signature field', { documentId, fieldId, error }, 'SignatureFieldService');
        throw error;
      }
    },

    async getSignatureFieldStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching signature field stats', { schoolId, userId }, 'SignatureFieldService');

        const stats = await repository.getSignatureFieldStats(schoolId);

        logger.info('Signature field stats fetched', { schoolId }, 'SignatureFieldService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch signature field stats', { schoolId, error }, 'SignatureFieldService');
        throw error;
      }
    },
  };
}
