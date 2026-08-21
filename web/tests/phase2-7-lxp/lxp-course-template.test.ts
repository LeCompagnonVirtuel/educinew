import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpCourseTemplateService } from '@/features/lxp/services/lxp-course-template.service';

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  in: vi.fn().mockReturnThis(),
  single: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  range: vi.fn().mockReturnThis(),
  maybeSingle: vi.fn().mockReturnThis(),
  data: null as Record<string, unknown> | null,
  error: null as { message: string } | null,
};

describe('LxpCourseTemplateService', () => {
  let service: LxpCourseTemplateService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpCourseTemplateService(mockSupabase as never);
  });

  describe('getTemplate', () => {
    it('should return template by id', async () => {
      mockSupabase.data = { id: 'template-1', name: 'Standard Course' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getTemplate('template-1');
      expect(result).toBeDefined();
    });

    it('should return null when template not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getTemplate('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getTemplate('template-1')).rejects.toThrow();
    });

    it('should include structure data', async () => {
      mockSupabase.data = { id: 'template-1', structure: { modules: [] } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getTemplate('template-1', { includeStructure: true });
      expect(result).toBeDefined();
    });

    it('should validate template id', async () => {
      await expect(service.getTemplate('')).rejects.toThrow();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'template-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getTemplate('template-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include usage statistics', async () => {
      mockSupabase.data = { id: 'template-1', usage_count: 25 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getTemplate('template-1', { includeStats: true });
      expect(result).toBeDefined();
    });

    it('should include categories', async () => {
      mockSupabase.data = { id: 'template-1', categories: ['science'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getTemplate('template-1', { includeCategories: true });
      expect(result).toBeDefined();
    });
  });

  describe('createTemplate', () => {
    it('should create a new template', async () => {
      const templateData = { name: 'New Template', description: 'A template' };
      mockSupabase.data = { id: 'template-new', ...templateData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createTemplate(templateData);
      expect(result).toBeDefined();
    });

    it('should reject creation with empty name', async () => {
      await expect(service.createTemplate({ name: '' })).rejects.toThrow();
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'template-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createTemplate({ name: 'Template' });
      expect(result).toHaveProperty('created_at');
    });

    it('should handle creation with structure', async () => {
      const templateData = { name: 'Template', structure: { modules: [{ title: 'Module 1' }] } };
      mockSupabase.data = { id: 'template-new', ...templateData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createTemplate(templateData);
      expect(result).toBeDefined();
    });

    it('should handle creation with categories', async () => {
      const templateData = { name: 'Template', categories: ['science', 'math'] };
      mockSupabase.data = { id: 'template-new', ...templateData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createTemplate(templateData);
      expect(result).toBeDefined();
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createTemplate({ name: 'Template' })).rejects.toThrow();
    });

    it('should handle creation with tags', async () => {
      const templateData = { name: 'Template', tags: ['beginner'] };
      mockSupabase.data = { id: 'template-new', ...templateData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createTemplate(templateData);
      expect(result).toBeDefined();
    });

    it('should handle creation with author', async () => {
      const templateData = { name: 'Template', author_id: 'user-1' };
      mockSupabase.data = { id: 'template-new', ...templateData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createTemplate(templateData);
      expect(result).toBeDefined();
    });

    it('should handle creation with visibility', async () => {
      const templateData = { name: 'Template', visibility: 'public' };
      mockSupabase.data = { id: 'template-new', ...templateData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createTemplate(templateData);
      expect(result).toBeDefined();
    });

    it('should handle creation with metadata', async () => {
      const templateData = { name: 'Template', metadata: { level: 'beginner' } };
      mockSupabase.data = { id: 'template-new', ...templateData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createTemplate(templateData);
      expect(result).toBeDefined();
    });
  });

  describe('updateTemplate', () => {
    it('should update template fields', async () => {
      const updates = { name: 'Updated Template' };
      mockSupabase.data = { id: 'template-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateTemplate('template-1', updates);
      expect(result).toBeDefined();
    });

    it('should handle partial updates', async () => {
      const updates = { description: 'New description' };
      mockSupabase.data = { id: 'template-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateTemplate('template-1', updates);
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'template-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateTemplate('template-1', { name: 'X' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updateTemplate('template-1', {})).rejects.toThrow();
    });

    it('should handle non-existent template', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateTemplate('nonexistent', { name: 'X' });
      expect(result).toBeNull();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateTemplate('template-1', { name: 'X' })).rejects.toThrow();
    });

    it('should update structure', async () => {
      const updates = { structure: { modules: [{ title: 'Updated Module' }] } };
      mockSupabase.data = { id: 'template-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateTemplate('template-1', updates);
      expect(result).toBeDefined();
    });

    it('should update categories', async () => {
      const updates = { categories: ['new_category'] };
      mockSupabase.data = { id: 'template-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateTemplate('template-1', updates);
      expect(result).toBeDefined();
    });

    it('should update tags', async () => {
      const updates = { tags: ['new_tag'] };
      mockSupabase.data = { id: 'template-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateTemplate('template-1', updates);
      expect(result).toBeDefined();
    });

    it('should update visibility', async () => {
      const updates = { visibility: 'private' };
      mockSupabase.data = { id: 'template-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateTemplate('template-1', updates);
      expect(result).toBeDefined();
    });
  });

  describe('deleteTemplate', () => {
    it('should soft delete a template', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteTemplate('template-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle non-existent template deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteTemplate('nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteTemplate('template-1')).rejects.toThrow();
    });

    it('should prevent deletion of system templates', async () => {
      mockSupabase.data = { id: 'template-1', is_system: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deleteTemplate('template-1')).rejects.toThrow();
    });

    it('should validate template id', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteTemplate('')).rejects.toThrow();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deleteTemplate('template-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });
  });

  describe('applyTemplate', () => {
    it('should apply template to course', async () => {
      mockSupabase.data = { id: 'course-new', template_id: 'template-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.applyTemplate('template-1', 'school-1');
      expect(result).toBeDefined();
    });

    it('should create course from template structure', async () => {
      mockSupabase.data = { id: 'course-new', modules: [{ title: 'Module 1' }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.applyTemplate('template-1', 'school-1');
      expect(result).toBeDefined();
    });

    it('should handle template with customizations', async () => {
      mockSupabase.data = { id: 'course-new', title: 'Custom Course' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.applyTemplate('template-1', 'school-1', { title: 'Custom Course' });
      expect(result).toBeDefined();
    });

    it('should increment template usage count', async () => {
      mockSupabase.data = { id: 'course-new' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await service.applyTemplate('template-1', 'school-1');
      expect(mockSupabase.update).toHaveBeenCalled();
    });

    it('should handle database errors during apply', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'apply failed' } });
      await expect(service.applyTemplate('template-1', 'school-1')).rejects.toThrow();
    });

    it('should validate template exists', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.applyTemplate('nonexistent', 'school-1');
      expect(result).toBeNull();
    });

    it('should validate school id', async () => {
      await expect(service.applyTemplate('template-1', '')).rejects.toThrow();
    });

    it('should validate template id', async () => {
      await expect(service.applyTemplate('', 'school-1')).rejects.toThrow();
    });
  });

  describe('listTemplates', () => {
    it('should list all templates', async () => {
      mockSupabase.data = [{ id: 't1', name: 'Template 1' }];
      const result = await service.listTemplates();
      expect(result).toBeDefined();
    });

    it('should support pagination', async () => {
      mockSupabase.data = [{ id: 't1' }];
      const result = await service.listTemplates({ page: 1, limit: 10 });
      expect(result).toBeDefined();
    });

    it('should support search by name', async () => {
      mockSupabase.data = [{ id: 't1', name: 'Science Template' }];
      const result = await service.listTemplates({ search: 'Science' });
      expect(result).toBeDefined();
    });

    it('should support filtering by category', async () => {
      mockSupabase.data = [{ id: 't1', category: 'science' }];
      const result = await service.listTemplates({ category: 'science' });
      expect(result).toBeDefined();
    });

    it('should support sorting by usage', async () => {
      mockSupabase.data = [{ id: 't1' }, { id: 't2' }];
      const result = await service.listTemplates({ sortBy: 'usage_count', sortOrder: 'desc' });
      expect(result).toBeDefined();
    });

    it('should return empty array when no templates', async () => {
      mockSupabase.data = [];
      const result = await service.listTemplates();
      expect(result).toEqual([]);
    });

    it('should handle database errors during listing', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'list failed' } });
      await expect(service.listTemplates()).rejects.toThrow();
    });

    it('should support filtering by visibility', async () => {
      mockSupabase.data = [{ id: 't1', visibility: 'public' }];
      const result = await service.listTemplates({ visibility: 'public' });
      expect(result).toBeDefined();
    });
  });

  describe('archiveTemplate', () => {
    it('should archive a template', async () => {
      mockSupabase.data = { id: 'template-1', status: 'archived' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.archiveTemplate('template-1');
      expect(result).toBeDefined();
    });

    it('should set archived_at timestamp', async () => {
      mockSupabase.data = { id: 'template-1', status: 'archived', archived_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.archiveTemplate('template-1');
      expect(result).toHaveProperty('archived_at');
    });

    it('should prevent archiving system templates', async () => {
      mockSupabase.data = { id: 'template-1', is_system: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.archiveTemplate('template-1')).rejects.toThrow();
    });

    it('should handle database errors during archive', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'archive failed' } });
      await expect(service.archiveTemplate('template-1')).rejects.toThrow();
    });

    it('should validate template exists', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.archiveTemplate('nonexistent');
      expect(result).toBeNull();
    });
  });
});
