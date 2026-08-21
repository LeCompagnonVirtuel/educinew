import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createDocTemplateService } from '../../src/features/documents/services/doc-template.service';

describe('DocTemplateService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getTemplates: vi.fn(),
      getTemplate: vi.fn(),
      createTemplate: vi.fn(),
      updateTemplate: vi.fn(),
      deleteTemplate: vi.fn(),
      generateDocumentFromTemplate: vi.fn(),
      getTemplateUsage: vi.fn(),
      duplicateTemplate: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createDocTemplateService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getTemplates).toBeInstanceOf(Function);
    expect(service.getTemplate).toBeInstanceOf(Function);
    expect(service.createTemplate).toBeInstanceOf(Function);
    expect(service.updateTemplate).toBeInstanceOf(Function);
    expect(service.deleteTemplate).toBeInstanceOf(Function);
  });

  describe('getTemplates', () => {
    it('should return template list', async () => {
      const templates = [{ id: 'tpl-1', name: 'Contract Template' }];
      mockRepository.getTemplates.mockResolvedValue(templates);
      const service = createDocTemplateService(mockRepository);
      const result = await service.getTemplates('school-1', 'user-1');
      expect(result).toEqual(templates);
      expect(mockRepository.getTemplates).toHaveBeenCalledWith('school-1');
    });
  });

  describe('getTemplate', () => {
    it('should return a single template', async () => {
      const template = { id: 'tpl-1', name: 'Contract Template' };
      mockRepository.getTemplate.mockResolvedValue(template);
      const service = createDocTemplateService(mockRepository);
      const result = await service.getTemplate('tpl-1', 'user-1');
      expect(result).toEqual(template);
      expect(mockRepository.getTemplate).toHaveBeenCalledWith('tpl-1');
    });
  });

  describe('createTemplate', () => {
    it('should create a template', async () => {
      const data = { name: 'New Template', content: 'Template content' };
      mockRepository.createTemplate.mockResolvedValue({ id: 'tpl-1', ...data });
      const service = createDocTemplateService(mockRepository);
      const result = await service.createTemplate('school-1', 'user-1', data);
      expect(result).toEqual({ id: 'tpl-1', ...data });
      expect(mockRepository.createTemplate).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'New Template', createdBy: 'user-1' }),
        'school-1'
      );
    });
  });

  describe('updateTemplate', () => {
    it('should update a template', async () => {
      mockRepository.getTemplate.mockResolvedValue({ id: 'tpl-1' });
      mockRepository.updateTemplate.mockResolvedValue({ id: 'tpl-1', name: 'Updated Template' });
      const service = createDocTemplateService(mockRepository);
      const result = await service.updateTemplate('tpl-1', 'user-1', { name: 'Updated Template' });
      expect(result).toEqual({ id: 'tpl-1', name: 'Updated Template' });
      expect(mockRepository.updateTemplate).toHaveBeenCalledWith('tpl-1', { name: 'Updated Template' });
    });
  });

  describe('deleteTemplate', () => {
    it('should delete a template', async () => {
      mockRepository.getTemplate.mockResolvedValue({ id: 'tpl-1' });
      mockRepository.deleteTemplate.mockResolvedValue({ success: true });
      const service = createDocTemplateService(mockRepository);
      await service.deleteTemplate('tpl-1', 'user-1');
      expect(mockRepository.deleteTemplate).toHaveBeenCalledWith('tpl-1');
    });
  });

  describe('getTemplateUsage', () => {
    it('should return template usage stats', async () => {
      const usage = { templateId: 'tpl-1', usageCount: 25 };
      mockRepository.getTemplateUsage.mockResolvedValue(usage);
      const service = createDocTemplateService(mockRepository);
      const result = await service.getTemplateUsage('tpl-1', 'user-1');
      expect(result).toEqual(usage);
      expect(mockRepository.getTemplateUsage).toHaveBeenCalledWith('tpl-1');
    });
  });

  describe('missing required parameters', () => {
    it('should throw on missing templateId for getTemplate', async () => {
      const service = createDocTemplateService(mockRepository);
      await expect(service.getTemplate('', 'user-1')).rejects.toThrow('templateId is required');
    });

    it('should throw on missing schoolId for createTemplate', async () => {
      const service = createDocTemplateService(mockRepository);
      await expect(service.createTemplate('', 'user-1', { name: 'Test' })).rejects.toThrow('schoolId is required');
    });

    it('should throw on missing name for createTemplate', async () => {
      const service = createDocTemplateService(mockRepository);
      await expect(service.createTemplate('school-1', 'user-1', {})).rejects.toThrow('template name is required');
    });

    it('should throw on missing templateId for updateTemplate', async () => {
      const service = createDocTemplateService(mockRepository);
      await expect(service.updateTemplate('', 'user-1', { name: 'Test' })).rejects.toThrow('templateId is required');
    });

    it('should throw on missing templateId for deleteTemplate', async () => {
      const service = createDocTemplateService(mockRepository);
      await expect(service.deleteTemplate('', 'user-1')).rejects.toThrow('templateId is required');
    });

    it('should throw on missing templateId for getTemplateUsage', async () => {
      const service = createDocTemplateService(mockRepository);
      await expect(service.getTemplateUsage('', 'user-1')).rejects.toThrow('templateId is required');
    });
  });

  describe('repository errors', () => {
    it('should handle repository errors in getTemplates', async () => {
      mockRepository.getTemplates.mockRejectedValue(new Error('DB error'));
      const service = createDocTemplateService(mockRepository);
      await expect(service.getTemplates('school-1', 'user-1')).rejects.toThrow('DB error');
    });

    it('should handle repository errors in getTemplate', async () => {
      mockRepository.getTemplate.mockRejectedValue(new Error('Not found'));
      const service = createDocTemplateService(mockRepository);
      await expect(service.getTemplate('tpl-1', 'user-1')).rejects.toThrow('Not found');
    });

    it('should handle repository errors in createTemplate', async () => {
      mockRepository.createTemplate.mockRejectedValue(new Error('Insert failed'));
      const service = createDocTemplateService(mockRepository);
      await expect(service.createTemplate('school-1', 'user-1', { name: 'Template' })).rejects.toThrow('Insert failed');
    });

    it('should handle repository errors in updateTemplate', async () => {
      mockRepository.getTemplate.mockResolvedValue({ id: 'tpl-1' });
      mockRepository.updateTemplate.mockRejectedValue(new Error('Update failed'));
      const service = createDocTemplateService(mockRepository);
      await expect(service.updateTemplate('tpl-1', 'user-1', { name: 'Updated' })).rejects.toThrow('Update failed');
    });

    it('should handle repository errors in deleteTemplate', async () => {
      mockRepository.getTemplate.mockResolvedValue({ id: 'tpl-1' });
      mockRepository.deleteTemplate.mockRejectedValue(new Error('Delete failed'));
      const service = createDocTemplateService(mockRepository);
      await expect(service.deleteTemplate('tpl-1', 'user-1')).rejects.toThrow('Delete failed');
    });

    it('should handle repository errors in getTemplateUsage', async () => {
      mockRepository.getTemplateUsage.mockRejectedValue(new Error('Query failed'));
      const service = createDocTemplateService(mockRepository);
      await expect(service.getTemplateUsage('tpl-1', 'user-1')).rejects.toThrow('Query failed');
    });
  });
});
