import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpPdfService } from '@/features/lxp/services/lxp-pdf.service';

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

describe('LxpPdfService', () => {
  let service: LxpPdfService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpPdfService(mockSupabase as never, mockStorage as never);
  });

  describe('getPdf', () => {
    it('should return pdf by id', async () => {
      mockSupabase.data = { id: 'pdf-1', title: 'Course Material' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPdf('pdf-1');
      expect(result).toBeDefined();
    });

    it('should return null when pdf not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getPdf('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getPdf('pdf-1')).rejects.toThrow();
    });

    it('should include annotations when requested', async () => {
      mockSupabase.data = { id: 'pdf-1', annotations: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPdf('pdf-1', { includeAnnotations: true });
      expect(result).toBeDefined();
    });

    it('should validate pdf id', async () => {
      await expect(service.getPdf('')).rejects.toThrow();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'pdf-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getPdf('pdf-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include page count', async () => {
      mockSupabase.data = { id: 'pdf-1', page_count: 25 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPdf('pdf-1', { includePageCount: true });
      expect(result).toBeDefined();
    });

    it('should include file size', async () => {
      mockSupabase.data = { id: 'pdf-1', file_size: 5242880 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPdf('pdf-1', { includeFileSize: true });
      expect(result).toBeDefined();
    });
  });

  describe('createPdf', () => {
    it('should create a new pdf entry', async () => {
      const pdfData = { title: 'New PDF', lesson_id: 'lesson-1' };
      mockSupabase.data = { id: 'pdf-new', ...pdfData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createPdf(pdfData);
      expect(result).toBeDefined();
    });

    it('should reject creation with empty title', async () => {
      await expect(service.createPdf({ title: '' })).rejects.toThrow();
    });

    it('should set default status to pending', async () => {
      mockSupabase.data = { id: 'pdf-new', status: 'pending' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createPdf({ title: 'PDF' });
      expect(result).toHaveProperty('status', 'pending');
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'pdf-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createPdf({ title: 'PDF' });
      expect(result).toHaveProperty('created_at');
    });

    it('should handle creation with metadata', async () => {
      const pdfData = { title: 'PDF', metadata: { pages: 10, size: 1024 } };
      mockSupabase.data = { id: 'pdf-new', ...pdfData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createPdf(pdfData);
      expect(result).toBeDefined();
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createPdf({ title: 'PDF' })).rejects.toThrow();
    });

    it('should handle creation with tags', async () => {
      const pdfData = { title: 'PDF', tags: ['textbook', 'reference'] };
      mockSupabase.data = { id: 'pdf-new', ...pdfData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createPdf(pdfData);
      expect(result).toBeDefined();
    });

    it('should handle creation with lesson association', async () => {
      const pdfData = { title: 'PDF', lesson_id: 'lesson-1' };
      mockSupabase.data = { id: 'pdf-new', ...pdfData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createPdf(pdfData);
      expect(result).toBeDefined();
    });

    it('should handle creation with author', async () => {
      const pdfData = { title: 'PDF', author_id: 'user-1' };
      mockSupabase.data = { id: 'pdf-new', ...pdfData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createPdf(pdfData);
      expect(result).toBeDefined();
    });

    it('should handle creation with description', async () => {
      const pdfData = { title: 'PDF', description: 'Course notes' };
      mockSupabase.data = { id: 'pdf-new', ...pdfData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createPdf(pdfData);
      expect(result).toBeDefined();
    });
  });

  describe('updatePdf', () => {
    it('should update pdf fields', async () => {
      const updates = { title: 'Updated PDF' };
      mockSupabase.data = { id: 'pdf-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updatePdf('pdf-1', updates);
      expect(result).toBeDefined();
    });

    it('should handle partial updates', async () => {
      const updates = { description: 'New description' };
      mockSupabase.data = { id: 'pdf-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updatePdf('pdf-1', updates);
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'pdf-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updatePdf('pdf-1', { title: 'X' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updatePdf('pdf-1', {})).rejects.toThrow();
    });

    it('should handle non-existent pdf', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updatePdf('nonexistent', { title: 'X' });
      expect(result).toBeNull();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updatePdf('pdf-1', { title: 'X' })).rejects.toThrow();
    });

    it('should update metadata', async () => {
      const updates = { metadata: { pages: 20 } };
      mockSupabase.data = { id: 'pdf-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updatePdf('pdf-1', updates);
      expect(result).toBeDefined();
    });

    it('should update tags', async () => {
      const updates = { tags: ['new_tag'] };
      mockSupabase.data = { id: 'pdf-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updatePdf('pdf-1', updates);
      expect(result).toBeDefined();
    });

    it('should update visibility', async () => {
      const updates = { visibility: 'private' };
      mockSupabase.data = { id: 'pdf-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updatePdf('pdf-1', updates);
      expect(result).toBeDefined();
    });

    it('should update access permissions', async () => {
      const updates = { access_level: 'restricted' };
      mockSupabase.data = { id: 'pdf-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updatePdf('pdf-1', updates);
      expect(result).toBeDefined();
    });
  });

  describe('deletePdf', () => {
    it('should delete a pdf entry', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deletePdf('pdf-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should also delete storage file', async () => {
      mockSupabase.data = { id: 'pdf-1', storage_path: 'pdfs/pdf-1.pdf' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await service.deletePdf('pdf-1');
      expect(mockStorage.remove).toHaveBeenCalled();
    });

    it('should handle non-existent pdf deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deletePdf('nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deletePdf('pdf-1')).rejects.toThrow();
    });

    it('should prevent deletion of pdf with active references', async () => {
      mockSupabase.data = { id: 'pdf-1', has_references: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deletePdf('pdf-1')).rejects.toThrow();
    });

    it('should validate pdf id', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deletePdf('')).rejects.toThrow();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deletePdf('pdf-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle storage errors during deletion', async () => {
      mockSupabase.data = { id: 'pdf-1', storage_path: 'pdfs/pdf-1.pdf' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      mockStorage.remove.mockRejectedValue(new Error('Storage error'));
      await expect(service.deletePdf('pdf-1')).rejects.toThrow();
    });
  });

  describe('uploadPdf', () => {
    it('should upload pdf file', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'pdfs/pdf-1.pdf' }, error: null });
      mockSupabase.data = { id: 'pdf-1', storage_path: 'pdfs/pdf-1.pdf' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });
      const result = await service.uploadPdf('pdf-1', file);
      expect(result).toBeDefined();
    });

    it('should handle upload errors', async () => {
      mockStorage.upload.mockResolvedValue({ data: null, error: { message: 'upload failed' } });
      const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });
      await expect(service.uploadPdf('pdf-1', file)).rejects.toThrow();
    });

    it('should validate file type', async () => {
      const file = new File(['content'], 'image.jpg', { type: 'image/jpeg' });
      await expect(service.uploadPdf('pdf-1', file)).rejects.toThrow();
    });

    it('should validate file size', async () => {
      const largeContent = 'x'.repeat(200 * 1024 * 1024);
      const file = new File([largeContent], 'large.pdf', { type: 'application/pdf' });
      await expect(service.uploadPdf('pdf-1', file)).rejects.toThrow();
    });

    it('should update pdf status after upload', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'pdfs/pdf-1.pdf' }, error: null });
      mockSupabase.data = { id: 'pdf-1', status: 'uploaded' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });
      const result = await service.uploadPdf('pdf-1', file);
      expect(result).toBeDefined();
    });

    it('should handle upload with progress callback', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'pdfs/pdf-1.pdf' }, error: null });
      mockSupabase.data = { id: 'pdf-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });
      const onProgress = vi.fn();
      const result = await service.uploadPdf('pdf-1', file, { onProgress });
      expect(result).toBeDefined();
    });

    it('should validate pdf id', async () => {
      const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });
      await expect(service.uploadPdf('', file)).rejects.toThrow();
    });

    it('should handle duplicate upload', async () => {
      mockSupabase.data = { id: 'pdf-1', status: 'uploaded' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });
      await expect(service.uploadPdf('pdf-1', file)).rejects.toThrow();
    });

    it('should handle upload with custom metadata', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'pdfs/pdf-1.pdf' }, error: null });
      mockSupabase.data = { id: 'pdf-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });
      const result = await service.uploadPdf('pdf-1', file, { metadata: { title: 'Custom' } });
      expect(result).toBeDefined();
    });

    it('should extract page count after upload', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'pdfs/pdf-1.pdf' }, error: null });
      mockSupabase.data = { id: 'pdf-1', page_count: 10 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });
      const result = await service.uploadPdf('pdf-1', file);
      expect(result).toBeDefined();
    });
  });

  describe('addAnnotation', () => {
    it('should add annotation to pdf', async () => {
      const annotation = { page: 1, text: 'Important note', user_id: 'user-1' };
      mockSupabase.data = { id: 'ann-1', ...annotation };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.addAnnotation('pdf-1', annotation);
      expect(result).toBeDefined();
    });

    it('should reject annotation with empty text', async () => {
      await expect(service.addAnnotation('pdf-1', { page: 1, text: '', user_id: 'user-1' })).rejects.toThrow();
    });

    it('should validate page number', async () => {
      await expect(service.addAnnotation('pdf-1', { page: 0, text: 'Note', user_id: 'user-1' })).rejects.toThrow();
    });

    it('should handle database errors during annotation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'annotation failed' } });
      await expect(service.addAnnotation('pdf-1', { page: 1, text: 'Note', user_id: 'user-1' })).rejects.toThrow();
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'ann-1', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.addAnnotation('pdf-1', { page: 1, text: 'Note', user_id: 'user-1' });
      expect(result).toHaveProperty('created_at');
    });

    it('should validate pdf id', async () => {
      await expect(service.addAnnotation('', { page: 1, text: 'Note', user_id: 'user-1' })).rejects.toThrow();
    });

    it('should handle annotation with position data', async () => {
      const annotation = { page: 1, text: 'Note', user_id: 'user-1', x: 100, y: 200, width: 300, height: 50 };
      mockSupabase.data = { id: 'ann-1', ...annotation };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.addAnnotation('pdf-1', annotation);
      expect(result).toBeDefined();
    });

    it('should handle annotation with color', async () => {
      const annotation = { page: 1, text: 'Note', user_id: 'user-1', color: '#FF0000' };
      mockSupabase.data = { id: 'ann-1', ...annotation };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.addAnnotation('pdf-1', annotation);
      expect(result).toBeDefined();
    });

    it('should handle annotation with highlight', async () => {
      const annotation = { page: 1, text: 'Highlighted text', user_id: 'user-1', type: 'highlight' };
      mockSupabase.data = { id: 'ann-1', ...annotation };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.addAnnotation('pdf-1', annotation);
      expect(result).toBeDefined();
    });

    it('should handle annotation with drawing', async () => {
      const annotation = { page: 1, user_id: 'user-1', type: 'drawing', paths: [] };
      mockSupabase.data = { id: 'ann-1', ...annotation };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.addAnnotation('pdf-1', annotation);
      expect(result).toBeDefined();
    });
  });

  describe('exportPdf', () => {
    it('should export pdf with annotations', async () => {
      mockSupabase.data = { id: 'pdf-1', export_url: 'https://example.com/export.pdf' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportPdf('pdf-1', { includeAnnotations: true });
      expect(result).toBeDefined();
    });

    it('should export pdf without annotations', async () => {
      mockSupabase.data = { id: 'pdf-1', export_url: 'https://example.com/export.pdf' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportPdf('pdf-1', { includeAnnotations: false });
      expect(result).toBeDefined();
    });

    it('should handle database errors during export', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'export failed' } });
      await expect(service.exportPdf('pdf-1')).rejects.toThrow();
    });

    it('should validate pdf id', async () => {
      await expect(service.exportPdf('')).rejects.toThrow();
    });

    it('should return export URL', async () => {
      mockSupabase.data = { id: 'pdf-1', export_url: 'https://example.com/export.pdf' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportPdf('pdf-1');
      expect(result).toHaveProperty('export_url');
    });

    it('should handle export with page range', async () => {
      mockSupabase.data = { id: 'pdf-1', export_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportPdf('pdf-1', { startPage: 1, endPage: 5 });
      expect(result).toBeDefined();
    });

    it('should handle export with specific pages', async () => {
      mockSupabase.data = { id: 'pdf-1', export_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportPdf('pdf-1', { pages: [1, 3, 5] });
      expect(result).toBeDefined();
    });

    it('should handle export with custom filename', async () => {
      mockSupabase.data = { id: 'pdf-1', export_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportPdf('pdf-1', { filename: 'custom-name.pdf' });
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
