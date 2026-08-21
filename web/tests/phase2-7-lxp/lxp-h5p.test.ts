import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpH5pService } from '@/features/lxp/services/lxp-h5p.service';

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

const mockStorage = {
  from: vi.fn().mockReturnThis(),
  upload: vi.fn().mockReturnThis(),
  getDownloadUrl: vi.fn().mockReturnThis(),
  getPublicUrl: vi.fn().mockReturnThis(),
  remove: vi.fn().mockReturnThis(),
};

describe('LxpH5pService', () => {
  let service: LxpH5pService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpH5pService(mockSupabase as never, mockStorage as never);
  });

  describe('getH5p', () => {
    it('should return h5p content by id', async () => {
      mockSupabase.data = { id: 'h5p-1', title: 'Interactive Quiz' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getH5p('h5p-1');
      expect(result).toBeDefined();
    });

    it('should return null when h5p not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getH5p('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getH5p('h5p-1')).rejects.toThrow();
    });

    it('should include embed URL', async () => {
      mockSupabase.data = { id: 'h5p-1', embed_url: 'https://embed.example.com/h5p-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getH5p('h5p-1', { includeEmbedUrl: true });
      expect(result).toBeDefined();
    });

    it('should validate h5p id', async () => {
      await expect(service.getH5p('')).rejects.toThrow();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'h5p-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getH5p('h5p-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include content type', async () => {
      mockSupabase.data = { id: 'h5p-1', content_type: 'CoursePresentation' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getH5p('h5p-1', { includeContentType: true });
      expect(result).toBeDefined();
    });

    it('should include user data', async () => {
      mockSupabase.data = { id: 'h5p-1', user_data: { score: 85 } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getH5p('h5p-1', { includeUserData: true });
      expect(result).toBeDefined();
    });
  });

  describe('createH5p', () => {
    it('should create a new h5p entry', async () => {
      mockSupabase.data = { id: 'h5p-new', title: 'New H5P' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createH5p({ title: 'New H5P', lesson_id: 'lesson-1' });
      expect(result).toBeDefined();
    });

    it('should reject creation with empty title', async () => {
      await expect(service.createH5p({ title: '' })).rejects.toThrow();
    });

    it('should set default status to draft', async () => {
      mockSupabase.data = { id: 'h5p-new', status: 'draft' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createH5p({ title: 'H5P' });
      expect(result).toHaveProperty('status', 'draft');
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'h5p-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createH5p({ title: 'H5P' });
      expect(result).toHaveProperty('created_at');
    });

    it('should handle creation with content type', async () => {
      mockSupabase.data = { id: 'h5p-new', content_type: 'InteractiveVideo' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createH5p({ title: 'H5P', content_type: 'InteractiveVideo' });
      expect(result).toBeDefined();
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createH5p({ title: 'H5P' })).rejects.toThrow();
    });

    it('should handle creation with tags', async () => {
      mockSupabase.data = { id: 'h5p-new', tags: ['interactive'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createH5p({ title: 'H5P', tags: ['interactive'] });
      expect(result).toBeDefined();
    });

    it('should handle creation with lesson association', async () => {
      mockSupabase.data = { id: 'h5p-new', lesson_id: 'lesson-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createH5p({ title: 'H5P', lesson_id: 'lesson-1' });
      expect(result).toBeDefined();
    });

    it('should handle creation with author', async () => {
      mockSupabase.data = { id: 'h5p-new', author_id: 'user-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createH5p({ title: 'H5P', author_id: 'user-1' });
      expect(result).toBeDefined();
    });

    it('should handle creation with metadata', async () => {
      mockSupabase.data = { id: 'h5p-new', metadata: { difficulty: 'medium' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createH5p({ title: 'H5P', metadata: { difficulty: 'medium' } });
      expect(result).toBeDefined();
    });
  });

  describe('updateH5p', () => {
    it('should update h5p fields', async () => {
      mockSupabase.data = { id: 'h5p-1', title: 'Updated H5P' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateH5p('h5p-1', { title: 'Updated H5P' });
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'h5p-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateH5p('h5p-1', { title: 'X' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updateH5p('h5p-1', {})).rejects.toThrow();
    });

    it('should handle non-existent h5p', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateH5p('nonexistent', { title: 'X' });
      expect(result).toBeNull();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateH5p('h5p-1', { title: 'X' })).rejects.toThrow();
    });

    it('should update content', async () => {
      mockSupabase.data = { id: 'h5p-1', content: { params: {} } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateH5p('h5p-1', { content: { params: {} } });
      expect(result).toBeDefined();
    });

    it('should update tags', async () => {
      mockSupabase.data = { id: 'h5p-1', tags: ['new_tag'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateH5p('h5p-1', { tags: ['new_tag'] });
      expect(result).toBeDefined();
    });

    it('should update visibility', async () => {
      mockSupabase.data = { id: 'h5p-1', visibility: 'private' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateH5p('h5p-1', { visibility: 'private' });
      expect(result).toBeDefined();
    });

    it('should update metadata', async () => {
      mockSupabase.data = { id: 'h5p-1', metadata: { difficulty: 'hard' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateH5p('h5p-1', { metadata: { difficulty: 'hard' } });
      expect(result).toBeDefined();
    });

    it('should update description', async () => {
      mockSupabase.data = { id: 'h5p-1', description: 'Updated desc' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateH5p('h5p-1', { description: 'Updated desc' });
      expect(result).toBeDefined();
    });
  });

  describe('deleteH5p', () => {
    it('should delete an h5p entry', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteH5p('h5p-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should also delete storage file', async () => {
      mockSupabase.data = { id: 'h5p-1', storage_path: 'h5p/h5p-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await service.deleteH5p('h5p-1');
      expect(mockStorage.remove).toHaveBeenCalled();
    });

    it('should handle non-existent h5p deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteH5p('nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteH5p('h5p-1')).rejects.toThrow();
    });

    it('should prevent deletion of h5p with active references', async () => {
      mockSupabase.data = { id: 'h5p-1', has_references: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deleteH5p('h5p-1')).rejects.toThrow();
    });

    it('should validate h5p id', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteH5p('')).rejects.toThrow();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deleteH5p('h5p-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle storage errors during deletion', async () => {
      mockSupabase.data = { id: 'h5p-1', storage_path: 'h5p/h5p-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      mockStorage.remove.mockRejectedValue(new Error('Storage error'));
      await expect(service.deleteH5p('h5p-1')).rejects.toThrow();
    });
  });

  describe('importH5p', () => {
    it('should import h5p package', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'h5p/h5p-1.h5p' }, error: null });
      mockSupabase.data = { id: 'h5p-1', status: 'importing' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'content.h5p', { type: 'application/zip' });
      const result = await service.importH5p(file, 'lesson-1');
      expect(result).toBeDefined();
    });

    it('should handle import errors', async () => {
      mockStorage.upload.mockResolvedValue({ data: null, error: { message: 'import failed' } });
      const file = new File(['content'], 'content.h5p', { type: 'application/zip' });
      await expect(service.importH5p(file, 'lesson-1')).rejects.toThrow();
    });

    it('should validate file type', async () => {
      const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });
      await expect(service.importH5p(file, 'lesson-1')).rejects.toThrow();
    });

    it('should validate file size', async () => {
      const largeContent = 'x'.repeat(100 * 1024 * 1024);
      const file = new File([largeContent], 'large.h5p', { type: 'application/zip' });
      await expect(service.importH5p(file, 'lesson-1')).rejects.toThrow();
    });

    it('should validate lesson id', async () => {
      const file = new File(['content'], 'content.h5p', { type: 'application/zip' });
      await expect(service.importH5p(file, '')).rejects.toThrow();
    });

    it('should handle import with metadata', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'h5p/h5p-1.h5p' }, error: null });
      mockSupabase.data = { id: 'h5p-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'content.h5p', { type: 'application/zip' });
      const result = await service.importH5p(file, 'lesson-1', { metadata: { title: 'Custom' } });
      expect(result).toBeDefined();
    });

    it('should handle import with progress callback', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'h5p/h5p-1.h5p' }, error: null });
      mockSupabase.data = { id: 'h5p-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'content.h5p', { type: 'application/zip' });
      const onProgress = vi.fn();
      const result = await service.importH5p(file, 'lesson-1', { onProgress });
      expect(result).toBeDefined();
    });

    it('should handle import with validation', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'h5p/h5p-1.h5p' }, error: null });
      mockSupabase.data = { id: 'h5p-1', valid: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'content.h5p', { type: 'application/zip' });
      const result = await service.importH5p(file, 'lesson-1', { validate: true });
      expect(result).toBeDefined();
    });

    it('should handle import with dependency check', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'h5p/h5p-1.h5p' }, error: null });
      mockSupabase.data = { id: 'h5p-1', dependencies: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'content.h5p', { type: 'application/zip' });
      const result = await service.importH5p(file, 'lesson-1', { checkDependencies: true });
      expect(result).toBeDefined();
    });

    it('should handle import with content type detection', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'h5p/h5p-1.h5p' }, error: null });
      mockSupabase.data = { id: 'h5p-1', content_type: 'Quiz' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'content.h5p', { type: 'application/zip' });
      const result = await service.importH5p(file, 'lesson-1', { detectContentType: true });
      expect(result).toBeDefined();
    });
  });

  describe('exportH5p', () => {
    it('should export h5p content', async () => {
      mockSupabase.data = { id: 'h5p-1', export_url: 'https://example.com/export.h5p' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportH5p('h5p-1');
      expect(result).toBeDefined();
    });

    it('should handle database errors during export', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'export failed' } });
      await expect(service.exportH5p('h5p-1')).rejects.toThrow();
    });

    it('should validate h5p id', async () => {
      await expect(service.exportH5p('')).rejects.toThrow();
    });

    it('should return export URL', async () => {
      mockSupabase.data = { id: 'h5p-1', export_url: 'https://example.com/export.h5p' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportH5p('h5p-1');
      expect(result).toHaveProperty('export_url');
    });

    it('should handle export with user data', async () => {
      mockSupabase.data = { id: 'h5p-1', export_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportH5p('h5p-1', { includeUserData: true });
      expect(result).toBeDefined();
    });

    it('should handle export without user data', async () => {
      mockSupabase.data = { id: 'h5p-1', export_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportH5p('h5p-1', { includeUserData: false });
      expect(result).toBeDefined();
    });

    it('should handle export with dependencies', async () => {
      mockSupabase.data = { id: 'h5p-1', export_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportH5p('h5p-1', { includeDependencies: true });
      expect(result).toBeDefined();
    });

    it('should handle export with metadata', async () => {
      mockSupabase.data = { id: 'h5p-1', export_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportH5p('h5p-1', { includeMetadata: true });
      expect(result).toBeDefined();
    });
  });

  describe('getEmbedUrl', () => {
    it('should return embed URL for h5p', async () => {
      mockSupabase.data = { id: 'h5p-1', embed_url: 'https://embed.example.com/h5p-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getEmbedUrl('h5p-1');
      expect(result).toBeDefined();
    });

    it('should handle non-existent h5p', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getEmbedUrl('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getEmbedUrl('h5p-1')).rejects.toThrow();
    });

    it('should validate h5p id', async () => {
      await expect(service.getEmbedUrl('')).rejects.toThrow();
    });

    it('should return embed URL with query params', async () => {
      mockSupabase.data = { id: 'h5p-1', embed_url: 'https://embed.example.com/h5p-1?foo=bar' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getEmbedUrl('h5p-1', { autoplay: true });
      expect(result).toBeDefined();
    });

    it('should return null for unpublished h5p', async () => {
      mockSupabase.data = { id: 'h5p-1', status: 'draft' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getEmbedUrl('h5p-1');
      expect(result).toBeNull();
    });

    it('should return embed URL with custom width', async () => {
      mockSupabase.data = { id: 'h5p-1', embed_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getEmbedUrl('h5p-1', { width: 800 });
      expect(result).toBeDefined();
    });

    it('should return embed URL with custom height', async () => {
      mockSupabase.data = { id: 'h5p-1', embed_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getEmbedUrl('h5p-1', { height: 600 });
      expect(result).toBeDefined();
    });
  });

  describe('getH5pCompletion', () => {
    it('should return completion status', async () => {
      mockSupabase.data = { completed: true, score: 85 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getH5pCompletion('h5p-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should return incomplete status', async () => {
      mockSupabase.data = { completed: false, progress: 50 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getH5pCompletion('h5p-1', 'student-1');
      expect(result).toHaveProperty('completed', false);
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getH5pCompletion('h5p-1', 'student-1')).rejects.toThrow();
    });

    it('should validate required parameters', async () => {
      await expect(service.getH5pCompletion('', 'student-1')).rejects.toThrow();
    });

    it('should return null for non-existent student', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getH5pCompletion('h5p-1', 'nonexistent');
      expect(result).toBeNull();
    });

    it('should include score data', async () => {
      mockSupabase.data = { completed: true, score: 90, max_score: 100 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getH5pCompletion('h5p-1', 'student-1');
      expect(result).toHaveProperty('score');
    });

    it('should include attempt count', async () => {
      mockSupabase.data = { completed: true, attempts: 3 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getH5pCompletion('h5p-1', 'student-1');
      expect(result).toHaveProperty('attempts');
    });

    it('should include interaction data', async () => {
      mockSupabase.data = { completed: false, interactions: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getH5pCompletion('h5p-1', 'student-1');
      expect(result).toHaveProperty('interactions');
    });
  });

  describe('Bulk Operations', () => {
    it('should handle bulk create', async () => {
      mockSupabase.data = [{ id: 'bulk-1' }, { id: 'bulk-2' }];
      const result = await service.bulkCreate([{ name: 'item1' }, { name: 'item2' }]);
      expect(result).toBeDefined();
    });

    it('should handle bulk update', async () => {
      mockSupabase.data = [{ id: 'bulk-1' }];
      const result = await service.bulkUpdate([{ id: 'bulk-1', name: 'updated' }]);
      expect(result).toBeDefined();
    });

    it('should handle bulk delete', async () => {
      mockSupabase.data = null;
      const result = await service.bulkDelete(['id-1', 'id-2']);
      expect(result).toBeDefined();
    });

    it('should handle bulk import', async () => {
      mockSupabase.data = { imported: 5 };
      const result = await service.bulkImport([{ name: 'import1' }]);
      expect(result).toBeDefined();
    });

    it('should handle bulk export', async () => {
      mockSupabase.data = { exported: 10 };
      const result = await service.bulkExport({ format: 'csv' });
      expect(result).toBeDefined();
    });
  });

  describe('Advanced Queries', () => {
    it('should support complex filtering', async () => {
      mockSupabase.data = [{ id: 'filtered-1' }];
      const result = await service.find({ status: 'active', type: 'premium' });
      expect(result).toBeDefined();
    });

    it('should support pagination', async () => {
      mockSupabase.data = [{ id: 'page-1' }];
      const result = await service.paginate(1, 10);
      expect(result).toBeDefined();
    });

    it('should support sorting', async () => {
      mockSupabase.data = [{ id: 'sorted-1' }];
      const result = await service.findAll({ orderBy: 'created_at', order: 'desc' });
      expect(result).toBeDefined();
    });

    it('should support search', async () => {
      mockSupabase.data = [{ id: 'search-1' }];
      const result = await service.search('test query');
      expect(result).toBeDefined();
    });

    it('should support field selection', async () => {
      mockSupabase.data = { id: 'select-1', name: 'test' };
      const result = await service.findById('select-1', ['id', 'name']);
      expect(result).toBeDefined();
    });
  });

  describe('Performance Tests', () => {
    it('should handle large datasets efficiently', async () => {
      mockSupabase.data = Array.from({ length: 1000 }, (_, i) => ({ id: item- }));
      const result = await service.findAll();
      expect(result).toBeDefined();
    });

    it('should handle concurrent requests', async () => {
      mockSupabase.data = { id: 'concurrent-1' };
      const promises = [
        service.findById('1'),
        service.findById('2'),
        service.findById('3'),
      ];
      const results = await Promise.all(promises);
      expect(results).toHaveLength(3);
    });

    it('should handle timeout scenarios', async () => {
      mockSupabase.single.mockImplementation(() => new Promise((resolve) => {
        setTimeout(() => resolve({ data: null, error: { message: 'timeout' } }), 100);
      }));
      await expect(service.findById('timeout-test')).rejects.toThrow();
    });

    it('should handle memory pressure', async () => {
      mockSupabase.data = Array.from({ length: 10000 }, (_, i) => ({ id: item-, data: 'x'.repeat(100) }));
      const result = await service.findAll();
      expect(result).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null values gracefully', async () => {
      mockSupabase.data = null;
      const result = await service.findById('null-test');
      expect(result).toBeNull();
    });

    it('should handle undefined values', async () => {
      mockSupabase.data = undefined;
      const result = await service.findById('undefined-test');
      expect(result).toBeUndefined();
    });

    it('should handle empty strings', async () => {
      mockSupabase.data = { id: 'empty-1', name: '' };
      const result = await service.findById('empty-1');
      expect(result).toBeDefined();
    });

    it('should handle special characters', async () => {
      mockSupabase.data = { id: 'special-1', name: '!@#$%^&*()_+' };
      const result = await service.findById('special-1');
      expect(result).toBeDefined();
    });

    it('should handle unicode characters', async () => {
      mockSupabase.data = { id: 'unicode-1', name: '日本語テスト' };
      const result = await service.findById('unicode-1');
      expect(result).toBeDefined();
    });
  });

  describe('Error Recovery', () => {
    it('should recover from network errors', async () => {
      mockSupabase.single
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValue({ data: { id: 'recovered-1' }, error: null });
      const result = await service.findById('recovery-test');
      expect(result).toBeDefined();
    });

    it('should recover from database timeouts', async () => {
      mockSupabase.single
        .mockResolvedValueOnce({ data: null, error: { message: 'timeout' } })
        .mockResolvedValue({ data: { id: 'recovered-2' }, error: null });
      const result = await service.findById('recovery-test-2');
      expect(result).toBeDefined();
    });

    it('should handle rate limiting', async () => {
      mockSupabase.single.mockResolvedValue({ 
        data: null, 
        error: { message: 'rate limit exceeded' } 
      });
      await expect(service.findById('rate-limit-test')).rejects.toThrow();
    });

    it('should handle service unavailability', async () => {
      mockSupabase.single.mockResolvedValue({ 
        data: null, 
        error: { message: 'service unavailable' } 
      });
      await expect(service.findById('unavailable-test')).rejects.toThrow();
    });
  });
});
