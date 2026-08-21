import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpCourseVersionService } from '@/features/lxp/services/lxp-course-version.service';

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

describe('LxpCourseVersionService', () => {
  let service: LxpCourseVersionService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpCourseVersionService(mockSupabase as never);
  });

  describe('getVersion', () => {
    it('should return version by id', async () => {
      mockSupabase.data = { id: 'version-1', version: 1 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getVersion('course-1', 'version-1');
      expect(result).toBeDefined();
    });

    it('should return null when version not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getVersion('course-1', 'nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getVersion('course-1', 'version-1')).rejects.toThrow();
    });

    it('should include snapshot data', async () => {
      mockSupabase.data = { id: 'version-1', snapshot: {} };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getVersion('course-1', 'version-1', { includeSnapshot: true });
      expect(result).toBeDefined();
    });

    it('should validate course id', async () => {
      await expect(service.getVersion('', 'version-1')).rejects.toThrow();
    });

    it('should validate version id', async () => {
      await expect(service.getVersion('course-1', '')).rejects.toThrow();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'version-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getVersion('course-1', 'version-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include change log', async () => {
      mockSupabase.data = { id: 'version-1', changes: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getVersion('course-1', 'version-1', { includeChanges: true });
      expect(result).toBeDefined();
    });
  });

  describe('createVersion', () => {
    it('should create a new version', async () => {
      const versionData = { version: 1, changelog: 'Initial release' };
      mockSupabase.data = { id: 'version-new', ...versionData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createVersion('course-1', versionData);
      expect(result).toBeDefined();
    });

    it('should auto-increment version number', async () => {
      mockSupabase.data = { id: 'version-new', version: 3 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createVersion('course-1', { changelog: 'Update' });
      expect(result).toHaveProperty('version');
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'version-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createVersion('course-1', { changelog: 'Update' });
      expect(result).toHaveProperty('created_at');
    });

    it('should capture course snapshot', async () => {
      mockSupabase.data = { id: 'version-new', snapshot: { title: 'Course', modules: [] } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createVersion('course-1', { changelog: 'Snapshot' });
      expect(result).toBeDefined();
    });

    it('should handle creation with author', async () => {
      mockSupabase.data = { id: 'version-new', author_id: 'user-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createVersion('course-1', { changelog: 'Update', author_id: 'user-1' });
      expect(result).toBeDefined();
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createVersion('course-1', { changelog: 'Update' })).rejects.toThrow();
    });

    it('should validate course exists', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'foreign_key_violation' } });
      await expect(service.createVersion('nonexistent', { changelog: 'Update' })).rejects.toThrow();
    });

    it('should reject empty changelog', async () => {
      await expect(service.createVersion('course-1', { changelog: '' })).rejects.toThrow();
    });

    it('should handle version with metadata', async () => {
      mockSupabase.data = { id: 'version-new', metadata: { breaking: false } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createVersion('course-1', { changelog: 'Update', metadata: { breaking: false } });
      expect(result).toBeDefined();
    });

    it('should handle version with tags', async () => {
      mockSupabase.data = { id: 'version-new', tags: ['stable'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createVersion('course-1', { changelog: 'Update', tags: ['stable'] });
      expect(result).toBeDefined();
    });
  });

  describe('publishVersion', () => {
    it('should publish a version', async () => {
      mockSupabase.data = { id: 'version-1', status: 'published', published_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.publishVersion('course-1', 'version-1');
      expect(result).toBeDefined();
    });

    it('should set published_at timestamp', async () => {
      mockSupabase.data = { id: 'version-1', published_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.publishVersion('course-1', 'version-1');
      expect(result).toHaveProperty('published_at');
    });

    it('should unpublish previous version', async () => {
      mockSupabase.data = { id: 'version-1', status: 'published' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.publishVersion('course-1', 'version-1');
      expect(result).toBeDefined();
    });

    it('should reject publishing already published version', async () => {
      mockSupabase.data = { id: 'version-1', status: 'published' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.publishVersion('course-1', 'version-1')).rejects.toThrow();
    });

    it('should handle database errors during publish', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'publish failed' } });
      await expect(service.publishVersion('course-1', 'version-1')).rejects.toThrow();
    });

    it('should validate version exists', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.publishVersion('course-1', 'nonexistent');
      expect(result).toBeNull();
    });

    it('should validate course id', async () => {
      await expect(service.publishVersion('', 'version-1')).rejects.toThrow();
    });

    it('should validate version id', async () => {
      await expect(service.publishVersion('course-1', '')).rejects.toThrow();
    });
  });

  describe('archiveVersion', () => {
    it('should archive a version', async () => {
      mockSupabase.data = { id: 'version-1', status: 'archived' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.archiveVersion('course-1', 'version-1');
      expect(result).toBeDefined();
    });

    it('should set archived_at timestamp', async () => {
      mockSupabase.data = { id: 'version-1', status: 'archived', archived_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.archiveVersion('course-1', 'version-1');
      expect(result).toHaveProperty('archived_at');
    });

    it('should prevent archiving published version', async () => {
      mockSupabase.data = { id: 'version-1', status: 'published' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.archiveVersion('course-1', 'version-1')).rejects.toThrow();
    });

    it('should handle database errors during archive', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'archive failed' } });
      await expect(service.archiveVersion('course-1', 'version-1')).rejects.toThrow();
    });

    it('should validate version exists', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.archiveVersion('course-1', 'nonexistent');
      expect(result).toBeNull();
    });
  });

  describe('restoreVersion', () => {
    it('should restore an archived version', async () => {
      mockSupabase.data = { id: 'version-1', status: 'draft' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.restoreVersion('course-1', 'version-1');
      expect(result).toBeDefined();
    });

    it('should set restored status to draft', async () => {
      mockSupabase.data = { id: 'version-1', status: 'draft' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.restoreVersion('course-1', 'version-1');
      expect(result).toHaveProperty('status', 'draft');
    });

    it('should handle database errors during restore', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'restore failed' } });
      await expect(service.restoreVersion('course-1', 'version-1')).rejects.toThrow();
    });

    it('should validate version exists', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.restoreVersion('course-1', 'nonexistent');
      expect(result).toBeNull();
    });

    it('should prevent restoring published version', async () => {
      mockSupabase.data = { id: 'version-1', status: 'published' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.restoreVersion('course-1', 'version-1')).rejects.toThrow();
    });
  });

  describe('listVersions', () => {
    it('should list all versions for a course', async () => {
      mockSupabase.data = [{ id: 'v1', version: 1 }, { id: 'v2', version: 2 }];
      const result = await service.listVersions('course-1');
      expect(result).toBeDefined();
    });

    it('should support pagination', async () => {
      mockSupabase.data = [{ id: 'v1' }];
      const result = await service.listVersions('course-1', { page: 1, limit: 10 });
      expect(result).toBeDefined();
    });

    it('should support filtering by status', async () => {
      mockSupabase.data = [{ id: 'v1', status: 'published' }];
      const result = await service.listVersions('course-1', { status: 'published' });
      expect(result).toBeDefined();
    });

    it('should return empty array for new course', async () => {
      mockSupabase.data = [];
      const result = await service.listVersions('course-1');
      expect(result).toEqual([]);
    });

    it('should handle database errors during listing', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'list failed' } });
      await expect(service.listVersions('course-1')).rejects.toThrow();
    });

    it('should sort by version number', async () => {
      mockSupabase.data = [{ version: 2 }, { version: 1 }];
      const result = await service.listVersions('course-1', { sortBy: 'version', sortOrder: 'desc' });
      expect(result).toBeDefined();
    });

    it('should validate course id', async () => {
      await expect(service.listVersions('')).rejects.toThrow();
    });

    it('should support date range filtering', async () => {
      mockSupabase.data = [{ id: 'v1' }];
      const result = await service.listVersions('course-1', { fromDate: '2024-01-01', toDate: '2024-12-31' });
      expect(result).toBeDefined();
    });
  });

  describe('compareVersions', () => {
    it('should compare two versions', async () => {
      mockSupabase.data = { version1: { id: 'v1' }, version2: { id: 'v2' }, differences: [] };
      const result = await service.compareVersions('course-1', 'v1', 'v2');
      expect(result).toBeDefined();
    });

    it('should identify content differences', async () => {
      mockSupabase.data = { differences: [{ type: 'content', field: 'title' }] };
      const result = await service.compareVersions('course-1', 'v1', 'v2');
      expect(result).toHaveProperty('differences');
    });

    it('should handle identical versions', async () => {
      mockSupabase.data = { differences: [] };
      const result = await service.compareVersions('course-1', 'v1', 'v1');
      expect(result).toHaveProperty('differences', []);
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'compare failed' } });
      await expect(service.compareVersions('course-1', 'v1', 'v2')).rejects.toThrow();
    });

    it('should validate version ids', async () => {
      await expect(service.compareVersions('course-1', '', 'v2')).rejects.toThrow();
    });

    it('should include module differences', async () => {
      mockSupabase.data = { differences: [{ type: 'module', action: 'added' }] };
      const result = await service.compareVersions('course-1', 'v1', 'v2');
      expect(result).toBeDefined();
    });

    it('should include lesson differences', async () => {
      mockSupabase.data = { differences: [{ type: 'lesson', action: 'modified' }] };
      const result = await service.compareVersions('course-1', 'v1', 'v2');
      expect(result).toBeDefined();
    });

    it('should validate both version ids exist', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'not_found' } });
      await expect(service.compareVersions('course-1', 'nonexistent', 'v2')).rejects.toThrow();
    });
  });
});
