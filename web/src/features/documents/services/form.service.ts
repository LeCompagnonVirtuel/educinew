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

export function createFormService(repository: DocumentRepositoryEnterprise) {
  return {
    async getFormTemplates(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching form templates', { schoolId, userId }, 'FormService');

        const templates = await repository.getFormTemplates(schoolId);

        logger.info('Form templates fetched', { schoolId, count: templates.length }, 'FormService');

        return templates;
      } catch (error) {
        logger.error('Failed to fetch form templates', { schoolId, error }, 'FormService');
        throw error;
      }
    },

    async createFormTemplate(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || !data.name) throw new DocValidationError('template name is required');

        logger.info('Creating form template', { schoolId, userId, name: data.name }, 'FormService');

        const template = await repository.createFormTemplate(
          { ...data, createdBy: userId } as any,
          schoolId
        );

        logger.info('Form template created successfully', { templateId: template.id }, 'FormService');

        return template;
      } catch (error) {
        logger.error('Failed to create form template', { schoolId, error }, 'FormService');
        throw error;
      }
    },

    async updateFormTemplate(templateId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!templateId) throw new DocValidationError('templateId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('update data is required');

        logger.info('Updating form template', { templateId, userId }, 'FormService');

        const updated = await repository.updateFormTemplate(templateId, data as any);

        logger.info('Form template updated successfully', { templateId }, 'FormService');

        return updated;
      } catch (error) {
        logger.error('Failed to update form template', { templateId, error }, 'FormService');
        throw error;
      }
    },

    async deleteFormTemplate(templateId: string, userId: string) {
      try {
        if (!templateId) throw new DocValidationError('templateId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Deleting form template', { templateId, userId }, 'FormService');

        await repository.deleteFormTemplate(templateId);

        logger.info('Form template deleted successfully', { templateId }, 'FormService');
      } catch (error) {
        logger.error('Failed to delete form template', { templateId, error }, 'FormService');
        throw error;
      }
    },

    async getFormInstances(schoolId: string, userId: string, templateId?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching form instances', { schoolId, userId, templateId }, 'FormService');

        const instances = await repository.getFormInstances(schoolId);

        logger.info('Form instances fetched', { schoolId, count: instances.length }, 'FormService');

        return instances;
      } catch (error) {
        logger.error('Failed to fetch form instances', { schoolId, error }, 'FormService');
        throw error;
      }
    },

    async createFormInstance(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || !data.templateId) throw new DocValidationError('templateId is required');

        logger.info('Creating form instance', { schoolId, userId, templateId: data.templateId }, 'FormService');

        const instance = await repository.createFormInstance(
          data.templateId as string,
          schoolId,
          { ...data, createdBy: userId } as Record<string, unknown>
        );

        logger.info('Form instance created successfully', { instanceId: instance.id }, 'FormService');

        return instance;
      } catch (error) {
        logger.error('Failed to create form instance', { schoolId, error }, 'FormService');
        throw error;
      }
    },

    async submitFormInstance(instanceId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!instanceId) throw new DocValidationError('instanceId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('submission data is required');

        logger.info('Submitting form instance', { instanceId, userId }, 'FormService');

        const result = await repository.submitFormInstance(instanceId);

        logger.info('Form instance submitted successfully', { instanceId }, 'FormService');

        return result;
      } catch (error) {
        logger.error('Failed to submit form instance', { instanceId, error }, 'FormService');
        throw error;
      }
    },

    async getFormFieldOptions(templateId: string, userId: string, fieldId: string) {
      try {
        if (!templateId) throw new DocValidationError('templateId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!fieldId) throw new DocValidationError('fieldId is required');

        logger.info('Fetching form field options', { templateId, userId, fieldId }, 'FormService');

        const options = await repository.getFormFieldOptions(templateId);

        logger.info('Form field options fetched', { templateId, fieldId }, 'FormService');

        return options;
      } catch (error) {
        logger.error('Failed to fetch form field options', { templateId, error }, 'FormService');
        throw error;
      }
    },
  };
}
