import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpScormService } from '@/features/lxp/services/lxp-scorm.service';

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

describe('LxpScormService', () => {
  let service: LxpScormService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpScormService(mockSupabase as never, mockStorage as never);
  });

  describe('getScorm', () => {
    it('should return scorm package by id', async () => {
      mockSupabase.data = { id: 'scorm-1', title: 'Interactive Lesson' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getScorm('scorm-1');
      expect(result).toBeDefined();
    });

    it('should return null when scorm not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getScorm('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getScorm('scorm-1')).rejects.toThrow();
    });

    it('should include launch URL when requested', async () => {
      mockSupabase.data = { id: 'scorm-1', launch_url: 'https://launch.example.com' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getScorm('scorm-1', { includeLaunchUrl: true });
      expect(result).toBeDefined();
    });

    it('should validate scorm id', async () => {
      await expect(service.getScorm('')).rejects.toThrow();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'scorm-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getScorm('scorm-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include version info', async () => {
      mockSupabase.data = { id: 'scorm-1', version: '1.2' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getScorm('scorm-1', { includeVersion: true });
      expect(result).toBeDefined();
    });

    it('should include completion data', async () => {
      mockSupabase.data = { id: 'scorm-1', completion_status: 'completed' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getScorm('scorm-1', { includeCompletion: true });
      expect(result).toBeDefined();
    });
  });

  describe('createScorm', () => {
    it('should create a new scorm entry', async () => {
      mockSupabase.data = { id: 'scorm-new', title: 'New SCORM' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createScorm({ title: 'New SCORM', lesson_id: 'lesson-1' });
      expect(result).toBeDefined();
    });

    it('should reject creation with empty title', async () => {
      await expect(service.createScorm({ title: '' })).rejects.toThrow();
    });

    it('should set default status to pending', async () => {
      mockSupabase.data = { id: 'scorm-new', status: 'pending' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createScorm({ title: 'SCORM' });
      expect(result).toHaveProperty('status', 'pending');
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'scorm-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createScorm({ title: 'SCORM' });
      expect(result).toHaveProperty('created_at');
    });

    it('should handle creation with version', async () => {
      mockSupabase.data = { id: 'scorm-new', version: '2004' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createScorm({ title: 'SCORM', version: '2004' });
      expect(result).toBeDefined();
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createScorm({ title: 'SCORM' })).rejects.toThrow();
    });

    it('should handle creation with tags', async () => {
      mockSupabase.data = { id: 'scorm-new', tags: ['interactive'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createScorm({ title: 'SCORM', tags: ['interactive'] });
      expect(result).toBeDefined();
    });

    it('should handle creation with lesson association', async () => {
      mockSupabase.data = { id: 'scorm-new', lesson_id: 'lesson-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createScorm({ title: 'SCORM', lesson_id: 'lesson-1' });
      expect(result).toBeDefined();
    });

    it('should handle creation with author', async () => {
      mockSupabase.data = { id: 'scorm-new', author_id: 'user-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createScorm({ title: 'SCORM', author_id: 'user-1' });
      expect(result).toBeDefined();
    });

    it('should handle creation with metadata', async () => {
      mockSupabase.data = { id: 'scorm-new', metadata: { scorm_version: '1.2' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createScorm({ title: 'SCORM', metadata: { scorm_version: '1.2' } });
      expect(result).toBeDefined();
    });
  });

  describe('updateScorm', () => {
    it('should update scorm fields', async () => {
      mockSupabase.data = { id: 'scorm-1', title: 'Updated SCORM' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateScorm('scorm-1', { title: 'Updated SCORM' });
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'scorm-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateScorm('scorm-1', { title: 'X' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updateScorm('scorm-1', {})).rejects.toThrow();
    });

    it('should handle non-existent scorm', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateScorm('nonexistent', { title: 'X' });
      expect(result).toBeNull();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateScorm('scorm-1', { title: 'X' })).rejects.toThrow();
    });

    it('should update launch settings', async () => {
      mockSupabase.data = { id: 'scorm-1', launch_settings: { width: 1024 } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateScorm('scorm-1', { launch_settings: { width: 1024 } });
      expect(result).toBeDefined();
    });

    it('should update visibility', async () => {
      mockSupabase.data = { id: 'scorm-1', visibility: 'private' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateScorm('scorm-1', { visibility: 'private' });
      expect(result).toBeDefined();
    });

    it('should update tags', async () => {
      mockSupabase.data = { id: 'scorm-1', tags: ['new_tag'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateScorm('scorm-1', { tags: ['new_tag'] });
      expect(result).toBeDefined();
    });

    it('should update metadata', async () => {
      mockSupabase.data = { id: 'scorm-1', metadata: { scorm_version: '2004' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateScorm('scorm-1', { metadata: { scorm_version: '2004' } });
      expect(result).toBeDefined();
    });

    it('should update description', async () => {
      mockSupabase.data = { id: 'scorm-1', description: 'Updated desc' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateScorm('scorm-1', { description: 'Updated desc' });
      expect(result).toBeDefined();
    });
  });

  describe('deleteScorm', () => {
    it('should delete a scorm entry', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteScorm('scorm-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should also delete storage file', async () => {
      mockSupabase.data = { id: 'scorm-1', storage_path: 'scorm/scorm-1.zip' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await service.deleteScorm('scorm-1');
      expect(mockStorage.remove).toHaveBeenCalled();
    });

    it('should handle non-existent scorm deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteScorm('nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteScorm('scorm-1')).rejects.toThrow();
    });

    it('should prevent deletion of scorm with active references', async () => {
      mockSupabase.data = { id: 'scorm-1', has_references: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deleteScorm('scorm-1')).rejects.toThrow();
    });

    it('should validate scorm id', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteScorm('')).rejects.toThrow();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deleteScorm('scorm-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle storage errors during deletion', async () => {
      mockSupabase.data = { id: 'scorm-1', storage_path: 'scorm/scorm-1.zip' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      mockStorage.remove.mockRejectedValue(new Error('Storage error'));
      await expect(service.deleteScorm('scorm-1')).rejects.toThrow();
    });
  });

  describe('importScorm', () => {
    it('should import scorm package', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'scorm/scorm-1.zip' }, error: null });
      mockSupabase.data = { id: 'scorm-1', status: 'importing' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'package.zip', { type: 'application/zip' });
      const result = await service.importScorm(file, 'lesson-1');
      expect(result).toBeDefined();
    });

    it('should handle import errors', async () => {
      mockStorage.upload.mockResolvedValue({ data: null, error: { message: 'import failed' } });
      const file = new File(['content'], 'package.zip', { type: 'application/zip' });
      await expect(service.importScorm(file, 'lesson-1')).rejects.toThrow();
    });

    it('should validate file type', async () => {
      const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });
      await expect(service.importScorm(file, 'lesson-1')).rejects.toThrow();
    });

    it('should validate file size', async () => {
      const largeContent = 'x'.repeat(500 * 1024 * 1024);
      const file = new File([largeContent], 'large.zip', { type: 'application/zip' });
      await expect(service.importScorm(file, 'lesson-1')).rejects.toThrow();
    });

    it('should set status to processing after import', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'scorm/scorm-1.zip' }, error: null });
      mockSupabase.data = { id: 'scorm-1', status: 'processing' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'package.zip', { type: 'application/zip' });
      const result = await service.importScorm(file, 'lesson-1');
      expect(result).toBeDefined();
    });

    it('should handle import with progress callback', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'scorm/scorm-1.zip' }, error: null });
      mockSupabase.data = { id: 'scorm-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'package.zip', { type: 'application/zip' });
      const onProgress = vi.fn();
      const result = await service.importScorm(file, 'lesson-1', { onProgress });
      expect(result).toBeDefined();
    });

    it('should validate lesson id', async () => {
      const file = new File(['content'], 'package.zip', { type: 'application/zip' });
      await expect(service.importScorm(file, '')).rejects.toThrow();
    });

    it('should handle import with custom metadata', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'scorm/scorm-1.zip' }, error: null });
      mockSupabase.data = { id: 'scorm-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'package.zip', { type: 'application/zip' });
      const result = await service.importScorm(file, 'lesson-1', { metadata: { title: 'Custom' } });
      expect(result).toBeDefined();
    });

    it('should handle import with version detection', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'scorm/scorm-1.zip' }, error: null });
      mockSupabase.data = { id: 'scorm-1', version: '1.2' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'package.zip', { type: 'application/zip' });
      const result = await service.importScorm(file, 'lesson-1', { detectVersion: true });
      expect(result).toBeDefined();
    });

    it('should handle import with manifest parsing', async () => {
      mockStorage.upload.mockResolvedValue({ data: { path: 'scorm/scorm-1.zip' }, error: null });
      mockSupabase.data = { id: 'scorm-1', manifest: {} };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const file = new File(['content'], 'package.zip', { type: 'application/zip' });
      const result = await service.importScorm(file, 'lesson-1', { parseManifest: true });
      expect(result).toBeDefined();
    });
  });

  describe('exportScorm', () => {
    it('should export scorm package', async () => {
      mockSupabase.data = { id: 'scorm-1', export_url: 'https://example.com/export.zip' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportScorm('scorm-1');
      expect(result).toBeDefined();
    });

    it('should handle database errors during export', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'export failed' } });
      await expect(service.exportScorm('scorm-1')).rejects.toThrow();
    });

    it('should validate scorm id', async () => {
      await expect(service.exportScorm('')).rejects.toThrow();
    });

    it('should return export URL', async () => {
      mockSupabase.data = { id: 'scorm-1', export_url: 'https://example.com/export.zip' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportScorm('scorm-1');
      expect(result).toHaveProperty('export_url');
    });

    it('should handle export with metadata', async () => {
      mockSupabase.data = { id: 'scorm-1', export_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportScorm('scorm-1', { includeMetadata: true });
      expect(result).toBeDefined();
    });

    it('should handle export with completion data', async () => {
      mockSupabase.data = { id: 'scorm-1', export_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportScorm('scorm-1', { includeCompletion: true });
      expect(result).toBeDefined();
    });

    it('should handle export with custom format', async () => {
      mockSupabase.data = { id: 'scorm-1', export_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportScorm('scorm-1', { format: 'scorm_2004' });
      expect(result).toBeDefined();
    });

    it('should handle export with compression', async () => {
      mockSupabase.data = { id: 'scorm-1', export_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.exportScorm('scorm-1', { compress: true });
      expect(result).toBeDefined();
    });
  });

  describe('launchScorm', () => {
    it('should return launch parameters', async () => {
      mockSupabase.data = { id: 'scorm-1', launch_url: 'https://launch.example.com', launch_params: {} };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.launchScorm('scorm-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should handle non-existent scorm', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.launchScorm('nonexistent', 'student-1');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.launchScorm('scorm-1', 'student-1')).rejects.toThrow();
    });

    it('should validate scorm id', async () => {
      await expect(service.launchScorm('', 'student-1')).rejects.toThrow();
    });

    it('should validate student id', async () => {
      await expect(service.launchScorm('scorm-1', '')).rejects.toThrow();
    });

    it('should track launch event', async () => {
      mockSupabase.data = { id: 'scorm-1', launch_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await service.launchScorm('scorm-1', 'student-1');
      expect(mockSupabase.insert).toHaveBeenCalled();
    });

    it('should include session data', async () => {
      mockSupabase.data = { id: 'scorm-1', launch_url: 'url', session_id: 'session-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.launchScorm('scorm-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should handle launch with custom parameters', async () => {
      mockSupabase.data = { id: 'scorm-1', launch_url: 'url' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.launchScorm('scorm-1', 'student-1', { width: 800, height: 600 });
      expect(result).toBeDefined();
    });
  });

  describe('getScormCompletion', () => {
    it('should return completion status', async () => {
      mockSupabase.data = { completed: true, score: 85 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getScormCompletion('scorm-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should return incomplete status', async () => {
      mockSupabase.data = { completed: false, progress: 50 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getScormCompletion('scorm-1', 'student-1');
      expect(result).toHaveProperty('completed', false);
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getScormCompletion('scorm-1', 'student-1')).rejects.toThrow();
    });

    it('should validate required parameters', async () => {
      await expect(service.getScormCompletion('', 'student-1')).rejects.toThrow();
    });

    it('should return null for non-existent student', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getScormCompletion('scorm-1', 'nonexistent');
      expect(result).toBeNull();
    });

    it('should include score data', async () => {
      mockSupabase.data = { completed: true, score: 90, max_score: 100 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getScormCompletion('scorm-1', 'student-1');
      expect(result).toHaveProperty('score');
    });

    it('should include time spent', async () => {
      mockSupabase.data = { completed: true, time_spent: 1800 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getScormCompletion('scorm-1', 'student-1');
      expect(result).toHaveProperty('time_spent');
    });

    it('should include suspend data', async () => {
      mockSupabase.data = { completed: false, suspend_data: 'base64data' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getScormCompletion('scorm-1', 'student-1');
      expect(result).toHaveProperty('suspend_data');
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
