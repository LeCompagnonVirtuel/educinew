import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocFormFieldNotFoundError,
  DocFormFieldCreateError,
  DocFormFieldUpdateError,
  DocFormFieldDeleteError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createFormFieldService(repository: DocumentRepositoryEnterprise) {
  return {
    async getFormFields(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching form fields', { documentId, userId }, 'FormFieldService');

        const fields = await repository.getFormFields(documentId);

        logger.info('Form fields fetched successfully', { documentId, count: fields.length }, 'FormFieldService');

        return fields;
      } catch (error) {
        logger.error('Failed to fetch form fields', { documentId, error }, 'FormFieldService');
        throw error;
      }
    },

    async createFormField(documentId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('form field data is required');

        logger.info('Creating form field', { documentId, userId }, 'FormFieldService');

        const field = await repository.createFormField(documentId, userId, data);

        logger.info('Form field created successfully', { documentId }, 'FormFieldService');

        return field;
      } catch (error) {
        logger.error('Failed to create form field', { documentId, error }, 'FormFieldService');
        throw error;
      }
    },

    async updateFormField(documentId: string, fieldId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!fieldId) throw new DocValidationError('fieldId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('form field data is required');

        logger.info('Updating form field', { documentId, fieldId, userId }, 'FormFieldService');

        const fields = await repository.getFormFields(documentId);
        const existing = fields.find((f: { id: string }) => f.id === fieldId);
        if (!existing) throw new DocFormFieldNotFoundError(fieldId);

        const updated = await repository.updateFormField(fieldId, userId, data);

        logger.info('Form field updated successfully', { fieldId }, 'FormFieldService');

        return updated;
      } catch (error) {
        logger.error('Failed to update form field', { documentId, fieldId, error }, 'FormFieldService');
        throw error;
      }
    },

    async deleteFormField(documentId: string, fieldId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!fieldId) throw new DocValidationError('fieldId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Deleting form field', { documentId, fieldId, userId }, 'FormFieldService');

        const fields = await repository.getFormFields(documentId);
        const existing = fields.find((f: { id: string }) => f.id === fieldId);
        if (!existing) throw new DocFormFieldNotFoundError(fieldId);

        await repository.deleteFormField(fieldId, userId);

        logger.info('Form field deleted successfully', { fieldId }, 'FormFieldService');
      } catch (error) {
        logger.error('Failed to delete form field', { documentId, fieldId, error }, 'FormFieldService');
        throw error;
      }
    },

    async getFormFieldStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching form field stats', { schoolId, userId }, 'FormFieldService');

        const stats = await repository.getFormFieldStats(schoolId);

        logger.info('Form field stats fetched', { schoolId }, 'FormFieldService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch form field stats', { schoolId, error }, 'FormFieldService');
        throw error;
      }
    },
  };
}
