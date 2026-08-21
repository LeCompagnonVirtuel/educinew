import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocTemplateNotFoundError,
  DocTemplateCreateError,
  DocTemplateUpdateError,
  DocTemplateDeleteError,
  DocTemplateRenderError,
  DocTemplateVariableError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createDocTemplateService(repository: DocumentRepositoryEnterprise) {
  return {
    async createTemplate(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || !data.name) throw new DocValidationError('template name is required');

        logger.info('Creating template', { schoolId, userId, name: data.name }, 'DocTemplateService');

        const template = await repository.createTemplate(
          { ...data, createdBy: userId } as any,
          schoolId
        );

        logger.info('Template created successfully', { templateId: template.id }, 'DocTemplateService');

        return template;
      } catch (error) {
        logger.error('Failed to create template', { schoolId, error }, 'DocTemplateService');
        throw error;
      }
    },

    async updateTemplate(templateId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!templateId) throw new DocValidationError('templateId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('update data is required');

        logger.info('Updating template', { templateId, userId }, 'DocTemplateService');

        const existing = await repository.getTemplate(templateId);
        if (!existing) throw new DocTemplateNotFoundError(templateId);

        const updated = await repository.updateTemplate(templateId, data as any);

        logger.info('Template updated successfully', { templateId }, 'DocTemplateService');

        return updated;
      } catch (error) {
        logger.error('Failed to update template', { templateId, error }, 'DocTemplateService');
        throw error;
      }
    },

    async deleteTemplate(templateId: string, userId: string) {
      try {
        if (!templateId) throw new DocValidationError('templateId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Deleting template', { templateId, userId }, 'DocTemplateService');

        const existing = await repository.getTemplate(templateId);
        if (!existing) throw new DocTemplateNotFoundError(templateId);

        await repository.deleteTemplate(templateId);

        logger.info('Template deleted successfully', { templateId }, 'DocTemplateService');
      } catch (error) {
        logger.error('Failed to delete template', { templateId, error }, 'DocTemplateService');
        throw error;
      }
    },

    async renderTemplate(templateId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!templateId) throw new DocValidationError('templateId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('template data is required');

        logger.info('Rendering template', { templateId, userId }, 'DocTemplateService');

        const existing = await repository.getTemplate(templateId);
        if (!existing) throw new DocTemplateNotFoundError(templateId);

        const document = await repository.generateDocumentFromTemplate(templateId, data, (existing as any).schoolId);

        logger.info('Template rendered successfully', { templateId, documentId: document.id }, 'DocTemplateService');

        return document;
      } catch (error) {
        logger.error('Failed to render template', { templateId, error }, 'DocTemplateService');
        throw error;
      }
    },

    async getTemplateVariables(templateId: string, userId: string) {
      try {
        if (!templateId) throw new DocValidationError('templateId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching template variables', { templateId, userId }, 'DocTemplateService');

        const existing = await repository.getTemplate(templateId);
        if (!existing) throw new DocTemplateNotFoundError(templateId);

        const variables = (existing as any).variables || [];

        logger.info('Template variables fetched', { templateId, count: variables.length }, 'DocTemplateService');

        return variables;
      } catch (error) {
        logger.error('Failed to fetch template variables', { templateId, error }, 'DocTemplateService');
        throw error;
      }
    },

    async getTemplatePreview(templateId: string, userId: string) {
      try {
        if (!templateId) throw new DocValidationError('templateId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching template preview', { templateId, userId }, 'DocTemplateService');

        const existing = await repository.getTemplate(templateId);
        if (!existing) throw new DocTemplateNotFoundError(templateId);

        const preview = {
          templateId,
          name: (existing as any).name,
          content: (existing as any).content,
          variables: (existing as any).variables || [],
        };

        logger.info('Template preview fetched', { templateId }, 'DocTemplateService');

        return preview;
      } catch (error) {
        logger.error('Failed to fetch template preview', { templateId, error }, 'DocTemplateService');
        throw error;
      }
    },

    async getTemplateDocuments(templateId: string, userId: string) {
      try {
        if (!templateId) throw new DocValidationError('templateId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching template documents', { templateId, userId }, 'DocTemplateService');

        const usage = await repository.getTemplateUsage(templateId);

        logger.info('Template documents fetched', { templateId, count: usage.count }, 'DocTemplateService');

        return usage;
      } catch (error) {
        logger.error('Failed to fetch template documents', { templateId, error }, 'DocTemplateService');
        throw error;
      }
    },

    async cloneTemplate(templateId: string, userId: string, schoolId: string) {
      try {
        if (!templateId) throw new DocValidationError('templateId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');

        logger.info('Cloning template', { templateId, userId, schoolId }, 'DocTemplateService');

        const existing = await repository.getTemplate(templateId);
        if (!existing) throw new DocTemplateNotFoundError(templateId);

        const cloned = await repository.duplicateTemplate(templateId, schoolId);

        logger.info('Template cloned successfully', { templateId, clonedId: cloned.id }, 'DocTemplateService');

        return cloned;
      } catch (error) {
        logger.error('Failed to clone template', { templateId, error }, 'DocTemplateService');
        throw error;
      }
    },

    async getTemplateUsage(templateId: string, userId: string) {
      try {
        if (!templateId) throw new DocValidationError('templateId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching template usage', { templateId, userId }, 'DocTemplateService');

        const usage = await repository.getTemplateUsage(templateId);

        logger.info('Template usage fetched', { templateId, count: usage.count }, 'DocTemplateService');

        return usage;
      } catch (error) {
        logger.error('Failed to fetch template usage', { templateId, error }, 'DocTemplateService');
        throw error;
      }
    },

    async getTemplateStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching template stats', { schoolId, userId }, 'DocTemplateService');

        const templates = await repository.getTemplates(schoolId);
        const stats = {
          totalTemplates: templates.length,
          templatesWithUsage: 0,
          averageVariablesPerTemplate: 0,
        };

        logger.info('Template stats fetched', { schoolId }, 'DocTemplateService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch template stats', { schoolId, error }, 'DocTemplateService');
        throw error;
      }
    },

    async getTemplates(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching templates', { schoolId, userId }, 'DocTemplateService');

        const templates = await repository.getTemplates(schoolId);

        logger.info('Templates fetched successfully', { schoolId, count: templates.length }, 'DocTemplateService');

        return templates;
      } catch (error) {
        logger.error('Failed to fetch templates', { schoolId, error }, 'DocTemplateService');
        throw error;
      }
    },

    async getTemplate(templateId: string, userId: string) {
      try {
        if (!templateId) throw new DocValidationError('templateId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching template', { templateId, userId }, 'DocTemplateService');

        const template = await repository.getTemplate(templateId);
        if (!template) throw new DocTemplateNotFoundError(templateId);

        return template;
      } catch (error) {
        logger.error('Failed to fetch template', { templateId, error }, 'DocTemplateService');
        throw error;
      }
    },
  };
}
