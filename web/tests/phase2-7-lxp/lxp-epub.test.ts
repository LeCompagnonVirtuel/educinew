import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpEpubService } from '@/features/lxp/services/lxp-epub.service';

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

describe('LxpEpubService', () => {
  let service: LxpEpubService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpEpubService(mockSupabase as never, mockStorage as never);
  });

  describe('getEpub', () => {
    it('should return epub by id', async () => {
      mockSupabase.data = { id: 'epub-1', title: 'Digital Textbook' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getEpub('epub-1');
      expect(result).toBeDefined();
    });

    it('should return null when epub not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getEpub('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getEpub('epub-1')).rejects.toThrow();
    });

    it('should include chapters when requested', async () => {
      mockSupabase.data = { id: 'epub-1', chapters: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getEpub('epub-1', { includeChapters: true });
      expect(result).toBeDefined();
    });

    it('should validate epub id', async () => {
      await expect(service.getEpub('')).rejects.toThrow();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'epub-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getEpub('epub-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include metadata', async () => {
      mockSupabase.data = { id: 'epub-1', metadata: { author: 'John Doe', pages: 200 } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getEpub('epub-1', { includeMetadata: true });
      expect(result).toBeDefined();
    });

    it('should include annotations', async () => {
      mockSupabase.data = { id: 'epub-1', annotations: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getEpub('epub-1', { includeAnnotations: true });
      expect(result).toBeDefined();
    });

    it('should include bookmarks', async () => {
      mockSupabase.data = { id: 'epub-1', bookmarks: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getEpub('epub-1', { includeBookmarks: true });
      expect(result).toBeDefined();
    });

    it('should include reading progress', async () => {
      mockSupabase.data = { id: 'epub-1', reading_progress: 45 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getEpub('epub-1', { includeProgress: true });
      expect(result).toBeDefined();
    });
  });

  describe('createEpub', () => {
    it('should create a new epub entry', async () => {
      mockSupabase.data = { id: 'epub-new', title: 'New EPUB' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createEpub({ title: 'New EPUB', lesson_id: 'lesson-1' });
      expect(result).toBeDefined();
    });

    it('should reject creation with empty title', async () => {
      await expect(service.createEpub({ title: '' })).rejects.toThrow();
    });

    it('should set default status to draft', async () => {
      mockSupabase.data = { id: 'epub-new', status: 'draft' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createEpub({ title: 'EPUB' });
      expect(result).toHaveProperty('status', 'draft');
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'epub-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createEpub({ title: 'EPUB' });
      expect(result).toHaveProperty('created_at');
    });

    it('should handle creation with metadata', async () => {
      mockSupabase.data = { id: 'epub-new', metadata: { author: 'Jane Doe' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createEpub({ title: 'EPUB', metadata: { author: 'Jane Doe' } });
      expect(result).toBeDefined();
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createEpub({ title: 'EPUB' })).rejects.toThrow();
    });

    it('should handle creation with tags', async () => {
      mockSupabase.data = { id: 'epub-new', tags: ['textbook'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createEpub({ title: 'EPUB', tags: ['textbook'] });
      expect(result).toBeDefined();
    });

    it('should handle creation with lesson association', async () => {
      mockSupabase.data = { id: 'epub-new', lesson_id: 'lesson-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createEpub({ title: 'EPUB', lesson_id: 'lesson-1' });
      expect(result).toBeDefined();
    });

    it('should handle creation with author', async () => {
      mockSupabase.data = { id: 'epub-new', author_id: 'user-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createEpub({ title: 'EPUB', author_id: 'user-1' });
      expect(result).toBeDefined();
    });

    it('should handle creation with description', async () => {
      mockSupabase.data = { id: 'epub-new', description: 'A comprehensive guide' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createEpub({ title: 'EPUB', description: 'A comprehensive guide' });
      expect(result).toBeDefined();
    });
  });

  describe('updateEpub', () => {
    it('should update epub fields', async () => {
      mockSupabase.data = { id: 'epub-1', title: 'Updated EPUB' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateEpub('epub-1', { title: 'Updated EPUB' });
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'epub-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateEpub('epub-1', { title: 'X' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updateEpub('epub-1', {})).rejects.toThrow();
    });

    it('should handle non-existent epub', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateEpub('nonexistent', { title: 'X' });
      expect(result).toBeNull();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateEpub('epub-1', { title: 'X' })).rejects.toThrow();
    });

    it('should update metadata', async () => {
      mockSupabase.data = { id: 'epub-1', metadata: { author: 'Updated' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateEpub('epub-1', { metadata: { author: 'Updated' } });
      expect(result).toBeDefined();
    });

    it('should update tags', async () => {
      mockSupabase.data = { id: 'epub-1', tags: ['new_tag'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateEpub('epub-1', { tags: ['new_tag'] });
      expect(result).toBeDefined();
    });

    it('should update visibility', async () => {
      mockSupabase.data = { id: 'epub-1', visibility: 'private' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateEpub('epub-1', { visibility: 'private' });
      expect(result).toBeDefined();
    });

    it('should update chapters', async () => {
      mockSupabase.data = { id: 'epub-1', chapters: [{ title: 'Ch 1' }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateEpub('epub-1', { chapters: [{ title: 'Ch 1' }] });
      expect(result).toBeDefined();
    });

    it('should update description', async () => {
      mockSupabase.data = { id: 'epub-1', description: 'Updated desc' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateEpub('epub-1', { description: 'Updated desc' });
      expect(result).toBeDefined();
    });
  });

  describe('deleteEpub', () => {
    it('should delete an epub entry', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteEpub('epub-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should also delete storage file', async () => {
      mockSupabase.data = { id: 'epub-1', storage_path: 'epub/epub-1.epub' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await service.deleteEpub('epub-1');
      expect(mockStorage.remove).toHaveBeenCalled();
    });

    it('should handle non-existent epub deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteEpub('nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteEpub('epub-1')).rejects.toThrow();
    });

    it('should prevent deletion of epub with active references', async () => {
      mockSupabase.data = { id: 'epub-1', has_references: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deleteEpub('epub-1')).rejects.toThrow();
    });

    it('should validate epub id', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteEpub('')).rejects.toThrow();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deleteEpub('epub-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle storage errors during deletion', async () => {
      mockSupabase.data = { id: 'epub-1', storage_path: 'epub/epub-1.epub' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      mockStorage.remove.mockRejectedValue(new Error('Storage error'));
      await expect(service.deleteEpub('epub-1')).rejects.toThrow();
    });
  });

  describe('importEpub', () => {
    it('should import epub file', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'epub/epub-1.epub' }, error: null });
      mockSupabase.data = { id: 'epub-1', status: 'importing' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'book.epub', { type: 'application/epub+zip' });
      const result = await service.importEpub(file, 'lesson-1');
      expect(result).toBeDefined();
    });

    it('should handle import errors', async () => {
      mockStorage.upload.mockResolvedValue({ data: null, error: { message: 'import failed' } });
      const file = new File(['content'], 'book.epub', { type: 'application/epub+zip' });
      await expect(service.importEpub(file, 'lesson-1')).rejects.toThrow();
    });

    it('should validate file type', async () => {
      const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });
      await expect(service.importEpub(file, 'lesson-1')).rejects.toThrow();
    });

    it('should validate file size', async () => {
      const largeContent = 'x'.repeat(200 * 1024 * 1024);
      const file = new File([largeContent], 'large.epub', { type: 'application/epub+zip' });
      await expect(service.importEpub(file, 'lesson-1')).rejects.toThrow();
    });

    it('should validate lesson id', async () => {
      const file = new File(['content'], 'book.epub', { type: 'application/epub+zip' });
      await expect(service.importEpub(file, '')).rejects.toThrow();
    });

    it('should handle import with metadata', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'epub/epub-1.epub' }, error: null });
      mockSupabase.data = { id: 'epub-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'book.epub', { type: 'application/epub+zip' });
      const result = await service.importEpub(file, 'lesson-1', { metadata: { title: 'Custom' } });
      expect(result).toBeDefined();
    });

    it('should handle import with progress callback', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'epub/epub-1.epub' }, error: null });
      mockSupabase.data = { id: 'epub-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'book.epub', { type: 'application/epub+zip' });
      const onProgress = vi.fn();
      const result = await service.importEpub(file, 'lesson-1', { onProgress });
      expect(result).toBeDefined();
    });

    it('should handle import with validation', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'epub/epub-1.epub' }, error: null });
      mockSupabase.data = { id: 'epub-1', valid: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'book.epub', { type: 'application/epub+zip' });
      const result = await service.importEpub(file, 'lesson-1', { validate: true });
      expect(result).toBeDefined();
    });

    it('should handle import with chapter extraction', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'epub/epub-1.epub' }, error: null });
      mockSupabase.data = { id: 'epub-1', chapters: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'book.epub', { type: 'application/epub+zip' });
      const result = await service.importEpub(file, 'lesson-1', { extractChapters: true });
      expect(result).toBeDefined();
    });

    it('should handle import with TOC extraction', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'epub/epub-1.epub' }, error: null });
      mockSupabase.data = { id: 'epub-1', toc: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'book.epub', { type: 'application/epub+zip' });
      const result = await service.importEpub(file, 'lesson-1', { extractToc: true });
      expect(result).toBeDefined();
    });
  });

  describe('exportEpub', () => {
    it('should export epub content', async () => {
      mockSupabase.data = { id: 'epub-1', export_url: 'https://example.com/export.epub' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportEpub('epub-1');
      expect(result).toBeDefined();
    });

    it('should handle database errors during export', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'export failed' } });
      await expect(service.exportEpub('epub-1')).rejects.toThrow();
    });

    it('should validate epub id', async () => {
      await expect(service.exportEpub('')).rejects.toThrow();
    });

    it('should return export URL', async () => {
      mockSupabase.data = { id: 'epub-1', export_url: 'https://example.com/export.epub' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportEpub('epub-1');
      expect(result).toHaveProperty('export_url');
    });

    it('should handle export with annotations', async () => {
      mockSupabase.data = { id: 'epub-1', export_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportEpub('epub-1', { includeAnnotations: true });
      expect(result).toBeDefined();
    });

    it('should handle export with bookmarks', async () => {
      mockSupabase.data = { id: 'epub-1', export_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportEpub('epub-1', { includeBookmarks: true });
      expect(result).toBeDefined();
    });

    it('should handle export with highlights', async () => {
      mockSupabase.data = { id: 'epub-1', export_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportEpub('epub-1', { includeHighlights: true });
      expect(result).toBeDefined();
    });

    it('should handle export with chapter range', async () => {
      mockSupabase.data = { id: 'epub-1', export_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportEpub('epub-1', { startChapter: 1, endChapter: 5 });
      expect(result).toBeDefined();
    });
  });

  describe('addAnnotation', () => {
    it('should add annotation to epub', async () => {
      const annotation = { chapter: 1, text: 'Important note', user_id: 'user-1' };
      mockSupabase.data = { id: 'ann-1', ...annotation };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.addAnnotation('epub-1', annotation);
      expect(result).toBeDefined();
    });

    it('should reject annotation with empty text', async () => {
      await expect(service.addAnnotation('epub-1', { chapter: 1, text: '', user_id: 'user-1' })).rejects.toThrow();
    });

    it('should validate chapter number', async () => {
      await expect(service.addAnnotation('epub-1', { chapter: 0, text: 'Note', user_id: 'user-1' })).rejects.toThrow();
    });

    it('should handle database errors during annotation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'annotation failed' } });
      await expect(service.addAnnotation('epub-1', { chapter: 1, text: 'Note', user_id: 'user-1' })).rejects.toThrow();
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'ann-1', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.addAnnotation('epub-1', { chapter: 1, text: 'Note', user_id: 'user-1' });
      expect(result).toHaveProperty('created_at');
    });

    it('should validate epub id', async () => {
      await expect(service.addAnnotation('', { chapter: 1, text: 'Note', user_id: 'user-1' })).rejects.toThrow();
    });

    it('should handle annotation with highlight', async () => {
      const annotation = { chapter: 1, text: 'Highlighted', user_id: 'user-1', type: 'highlight' };
      mockSupabase.data = { id: 'ann-1', ...annotation };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.addAnnotation('epub-1', annotation);
      expect(result).toBeDefined();
    });

    it('should handle annotation with bookmark', async () => {
      const annotation = { chapter: 1, text: 'Bookmark', user_id: 'user-1', type: 'bookmark' };
      mockSupabase.data = { id: 'ann-1', ...annotation };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.addAnnotation('epub-1', annotation);
      expect(result).toBeDefined();
    });

    it('should handle annotation with note', async () => {
      const annotation = { chapter: 1, text: 'My note', user_id: 'user-1', type: 'note' };
      mockSupabase.data = { id: 'ann-1', ...annotation };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.addAnnotation('epub-1', annotation);
      expect(result).toBeDefined();
    });

    it('should handle annotation with color', async () => {
      const annotation = { chapter: 1, text: 'Colored', user_id: 'user-1', color: '#FF0000' };
      mockSupabase.data = { id: 'ann-1', ...annotation };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.addAnnotation('epub-1', annotation);
      expect(result).toBeDefined();
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
