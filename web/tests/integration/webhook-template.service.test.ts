import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createWebhookTemplateService } from '../../src/features/integration/services/webhook-template.service';

describe('WebhookTemplateService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getTemplates: vi.fn(),
      getTemplateById: vi.fn(),
      createTemplate: vi.fn(),
      updateTemplate: vi.fn(),
      deleteTemplate: vi.fn(),
      cloneTemplate: vi.fn(),
      getTemplatePreview: vi.fn(),
      getTemplateUsage: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createWebhookTemplateService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getTemplates).toBeInstanceOf(Function);
    expect(service.getTemplateById).toBeInstanceOf(Function);
    expect(service.createTemplate).toBeInstanceOf(Function);
    expect(service.updateTemplate).toBeInstanceOf(Function);
    expect(service.deleteTemplate).toBeInstanceOf(Function);
    expect(service.cloneTemplate).toBeInstanceOf(Function);
    expect(service.getTemplatePreview).toBeInstanceOf(Function);
    expect(service.getTemplateUsage).toBeInstanceOf(Function);
  });

  describe('getTemplates', () => {
    it('should return templates list', async () => {
      mockRepository.getTemplates.mockResolvedValue([{ id: 'wt-1', name: 'Document Notification', category: 'notification' }]);
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.getTemplates('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return templates with filters', async () => {
      mockRepository.getTemplates.mockResolvedValue([{ id: 'wt-1' }]);
      const service = createWebhookTemplateService(mockRepository);
      await service.getTemplates('school-1', { category: 'notification' });
      expect(mockRepository.getTemplates).toHaveBeenCalledWith('school-1', { category: 'notification' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.getTemplates('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getTemplates.mockResolvedValue([]);
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.getTemplates('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated templates', async () => {
      mockRepository.getTemplates.mockResolvedValue({ data: [{ id: 'wt-1' }], total: 20 });
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.getTemplates('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by visibility', async () => {
      mockRepository.getTemplates.mockResolvedValue([{ id: 'wt-1', visibility: 'public' }]);
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.getTemplates('school-1', { visibility: 'public' });
      expect(result).toHaveLength(1);
    });

    it('should return templates with usage count', async () => {
      mockRepository.getTemplates.mockResolvedValue([{ id: 'wt-1', usageCount: 15 }]);
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.getTemplates('school-1');
      expect(result[0].usageCount).toBe(15);
    });

    it('should handle repository errors', async () => {
      mockRepository.getTemplates.mockRejectedValue(new Error('DB error'));
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.getTemplates('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getTemplateById', () => {
    it('should return a single template', async () => {
      mockRepository.getTemplateById.mockResolvedValue({ id: 'wt-1', name: 'Document Notification', category: 'notification' });
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.getTemplateById('wt-1');
      expect(result.id).toBe('wt-1');
    });

    it('should throw if template not found', async () => {
      mockRepository.getTemplateById.mockResolvedValue(null);
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.getTemplateById('nonexistent')).rejects.toThrow('Template not found');
    });

    it('should throw if id is missing', async () => {
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.getTemplateById('')).rejects.toThrow('Template ID is required');
    });

    it('should return template with schema', async () => {
      mockRepository.getTemplateById.mockResolvedValue({ id: 'wt-1', schema: { properties: { url: { type: 'string' }, method: { type: 'string' } } } });
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.getTemplateById('wt-1');
      expect(result.schema.properties.url).toBeDefined();
    });

    it('should return template with defaults', async () => {
      mockRepository.getTemplateById.mockResolvedValue({ id: 'wt-1', defaults: { method: 'POST', headers: { 'Content-Type': 'application/json' } } });
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.getTemplateById('wt-1');
      expect(result.defaults.method).toBe('POST');
    });

    it('should return template with examples', async () => {
      mockRepository.getTemplateById.mockResolvedValue({ id: 'wt-1', examples: [{ name: 'Slack Notification', config: { url: 'https://hooks.slack.com/...' } }] });
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.getTemplateById('wt-1');
      expect(result.examples).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getTemplateById.mockRejectedValue(new Error('Query timeout'));
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.getTemplateById('wt-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createTemplate', () => {
    it('should create a template', async () => {
      mockRepository.createTemplate.mockResolvedValue({ id: 'wt-1', name: 'Document Notification', status: 'active' });
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.createTemplate('school-1', 'user-1', { name: 'Document Notification', category: 'notification', schema: { properties: {} } });
      expect(result.id).toBe('wt-1');
    });

    it('should throw if schoolId is missing', async () => {
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.createTemplate('', 'user-1', { name: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.createTemplate('school-1', '', { name: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if name is missing', async () => {
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.createTemplate('school-1', 'user-1', { name: '' })).rejects.toThrow('Template name is required');
    });

    it('should create template with description', async () => {
      mockRepository.createTemplate.mockResolvedValue({ id: 'wt-1', description: 'Notification template' });
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.createTemplate('school-1', 'user-1', { name: 'T', category: 'notification', description: 'Notification template' });
      expect(result.description).toBe('Notification template');
    });

    it('should create template with defaults', async () => {
      mockRepository.createTemplate.mockResolvedValue({ id: 'wt-1', defaults: { method: 'POST' } });
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.createTemplate('school-1', 'user-1', { name: 'T', category: 'notification', defaults: { method: 'POST' } });
      expect(result.defaults.method).toBe('POST');
    });

    it('should handle creation failure', async () => {
      mockRepository.createTemplate.mockRejectedValue(new Error('Invalid schema'));
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.createTemplate('school-1', 'user-1', { name: 'T', category: 'notification' })).rejects.toThrow('Invalid schema');
    });
  });

  describe('updateTemplate', () => {
    it('should update a template', async () => {
      mockRepository.getTemplateById.mockResolvedValue({ id: 'wt-1', name: 'Old' });
      mockRepository.updateTemplate.mockResolvedValue({ id: 'wt-1', name: 'Updated' });
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.updateTemplate('wt-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if template not found', async () => {
      mockRepository.getTemplateById.mockResolvedValue(null);
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.updateTemplate('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.updateTemplate('', 'user-1', { name: 'New' })).rejects.toThrow('Template ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.updateTemplate('wt-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update template schema', async () => {
      mockRepository.getTemplateById.mockResolvedValue({ id: 'wt-1' });
      mockRepository.updateTemplate.mockResolvedValue({ id: 'wt-1', schema: { properties: { newField: { type: 'string' } } } });
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.updateTemplate('wt-1', 'user-1', { schema: { properties: { newField: { type: 'string' } } } });
      expect(result.schema.properties.newField).toBeDefined();
    });

    it('should handle update failure', async () => {
      mockRepository.getTemplateById.mockResolvedValue({ id: 'wt-1' });
      mockRepository.updateTemplate.mockRejectedValue(new Error('Cannot update'));
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.updateTemplate('wt-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deleteTemplate', () => {
    it('should delete a template', async () => {
      mockRepository.getTemplateById.mockResolvedValue({ id: 'wt-1' });
      mockRepository.deleteTemplate.mockResolvedValue({ success: true });
      const service = createWebhookTemplateService(mockRepository);
      await service.deleteTemplate('wt-1', 'user-1');
      expect(mockRepository.deleteTemplate).toHaveBeenCalledWith('wt-1');
    });

    it('should throw if template not found', async () => {
      mockRepository.getTemplateById.mockResolvedValue(null);
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.deleteTemplate('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.deleteTemplate('', 'user-1')).rejects.toThrow('Template ID is required');
    });

    it('should handle deletion with active usage', async () => {
      mockRepository.getTemplateById.mockResolvedValue({ id: 'wt-1' });
      mockRepository.deleteTemplate.mockRejectedValue(new Error('Template has active usage'));
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.deleteTemplate('wt-1', 'user-1')).rejects.toThrow('Template has active usage');
    });

    it('should force delete template', async () => {
      mockRepository.getTemplateById.mockResolvedValue({ id: 'wt-1' });
      mockRepository.deleteTemplate.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.deleteTemplate('wt-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('cloneTemplate', () => {
    it('should clone a template', async () => {
      mockRepository.cloneTemplate.mockResolvedValue({ id: 'wt-2', name: 'Cloned Template', originalId: 'wt-1' });
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.cloneTemplate('wt-1', 'school-1', 'user-1', { name: 'Cloned Template' });
      expect(result.id).toBe('wt-2');
      expect(result.originalId).toBe('wt-1');
    });

    it('should throw if templateId is missing', async () => {
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.cloneTemplate('', 'school-1', 'user-1', {})).rejects.toThrow('Template ID is required');
    });

    it('should throw if schoolId is missing', async () => {
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.cloneTemplate('wt-1', '', 'user-1', {})).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.cloneTemplate('wt-1', 'school-1', '', {})).rejects.toThrow('userId is required');
    });

    it('should handle clone failure', async () => {
      mockRepository.cloneTemplate.mockRejectedValue(new Error('Template not found'));
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.cloneTemplate('nonexistent', 'school-1', 'user-1', {})).rejects.toThrow('Template not found');
    });

    it('should clone with modifications', async () => {
      mockRepository.cloneTemplate.mockResolvedValue({ id: 'wt-2', name: 'Modified Clone', schema: { properties: { custom: { type: 'string' } } } });
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.cloneTemplate('wt-1', 'school-1', 'user-1', { name: 'Modified Clone', schema: { properties: { custom: { type: 'string' } } } });
      expect(result.name).toBe('Modified Clone');
    });
  });

  describe('getTemplatePreview', () => {
    it('should return template preview', async () => {
      mockRepository.getTemplatePreview.mockResolvedValue({ templateId: 'wt-1', preview: { url: 'https://example.com/webhook', method: 'POST', body: '{}' } });
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.getTemplatePreview('wt-1', {});
      expect(result.preview).toBeDefined();
    });

    it('should throw if templateId is missing', async () => {
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.getTemplatePreview('', {})).rejects.toThrow('Template ID is required');
    });

    it('should return preview with variables', async () => {
      mockRepository.getTemplatePreview.mockResolvedValue({ templateId: 'wt-1', preview: { url: 'https://example.com/doc/doc-1' } });
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.getTemplatePreview('wt-1', { documentId: 'doc-1' });
      expect(result.preview.url).toContain('doc-1');
    });

    it('should handle preview failure', async () => {
      mockRepository.getTemplatePreview.mockRejectedValue(new Error('Invalid template'));
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.getTemplatePreview('wt-1', {})).rejects.toThrow('Invalid template');
    });
  });

  describe('getTemplateUsage', () => {
    it('should return template usage', async () => {
      mockRepository.getTemplateUsage.mockResolvedValue({ templateId: 'wt-1', usageCount: 25, webhooksUsing: ['wh-1', 'wh-2'] });
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.getTemplateUsage('wt-1');
      expect(result.usageCount).toBe(25);
    });

    it('should throw if templateId is missing', async () => {
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.getTemplateUsage('')).rejects.toThrow('Template ID is required');
    });

    it('should return zero usage', async () => {
      mockRepository.getTemplateUsage.mockResolvedValue({ templateId: 'wt-1', usageCount: 0, webhooksUsing: [] });
      const service = createWebhookTemplateService(mockRepository);
      const result = await service.getTemplateUsage('wt-1');
      expect(result.usageCount).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getTemplateUsage.mockRejectedValue(new Error('DB error'));
      const service = createWebhookTemplateService(mockRepository);
      await expect(service.getTemplateUsage('wt-1')).rejects.toThrow('DB error');
    });
  });
});
