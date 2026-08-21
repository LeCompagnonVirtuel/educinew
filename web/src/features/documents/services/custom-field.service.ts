import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocCustomFieldNotFoundError,
  DocCustomFieldCreateError,
  DocCustomFieldUpdateError,
  DocCustomFieldDeleteError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createCustomFieldService(repository: DocumentRepositoryEnterprise) {
  return {
    async getCustomFields(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching custom fields', { documentId, userId }, 'CustomFieldService');

        const fields = await repository.getCustomFields(documentId);

        logger.info('Custom fields fetched successfully', { documentId, count: fields.length }, 'CustomFieldService');

        return fields;
      } catch (error) {
        logger.error('Failed to fetch custom fields', { documentId, error }, 'CustomFieldService');
        throw error;
      }
    },

    async createCustomField(documentId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('custom field data is required');

        logger.info('Creating custom field', { documentId, userId }, 'CustomFieldService');

        const field = await repository.createCustomField(documentId, userId, data);

        logger.info('Custom field created successfully', { documentId }, 'CustomFieldService');

        return field;
      } catch (error) {
        logger.error('Failed to create custom field', { documentId, error }, 'CustomFieldService');
        throw error;
      }
    },

    async updateCustomField(documentId: string, fieldId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!fieldId) throw new DocValidationError('fieldId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('custom field data is required');

        logger.info('Updating custom field', { documentId, fieldId, userId }, 'CustomFieldService');

        const fields = await repository.getCustomFields(documentId);
        const existing = fields.find((f: { id: string }) => f.id === fieldId);
        if (!existing) throw new DocCustomFieldNotFoundError(fieldId);

        const updated = await repository.updateCustomField(fieldId, userId, data);

        logger.info('Custom field updated successfully', { fieldId }, 'CustomFieldService');

        return updated;
      } catch (error) {
        logger.error('Failed to update custom field', { documentId, fieldId, error }, 'CustomFieldService');
        throw error;
      }
    },

    async deleteCustomField(documentId: string, fieldId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!fieldId) throw new DocValidationError('fieldId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Deleting custom field', { documentId, fieldId, userId }, 'CustomFieldService');

        const fields = await repository.getCustomFields(documentId);
        const existing = fields.find((f: { id: string }) => f.id === fieldId);
        if (!existing) throw new DocCustomFieldNotFoundError(fieldId);

        await repository.deleteCustomField(fieldId, userId);

        logger.info('Custom field deleted successfully', { fieldId }, 'CustomFieldService');
      } catch (error) {
        logger.error('Failed to delete custom field', { documentId, fieldId, error }, 'CustomFieldService');
        throw error;
      }
    },

    async getCustomFieldStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching custom field stats', { schoolId, userId }, 'CustomFieldService');

        const stats = await repository.getCustomFieldStats(schoolId);

        logger.info('Custom field stats fetched', { schoolId }, 'CustomFieldService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch custom field stats', { schoolId, error }, 'CustomFieldService');
        throw error;
      }
    },
  };
}
