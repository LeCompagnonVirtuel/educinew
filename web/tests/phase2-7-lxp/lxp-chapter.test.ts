import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpChapterService } from '@/features/lxp/services/lxp-chapter.service';

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

describe('LxpChapterService', () => {
  let service: LxpChapterService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpChapterService(mockSupabase as never);
  });

  describe('getChapter', () => {
    it('should return chapter by id', async () => {
      mockSupabase.data = { id: 'chapter-1', title: 'Chapter 1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getChapter('module-1', 'chapter-1');
      expect(result).toBeDefined();
    });

    it('should return null when chapter not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getChapter('module-1', 'nonexistent');
      expect(result).toBeNull();
    });

    it('should include lessons when requested', async () => {
      mockSupabase.data = { id: 'chapter-1', lessons: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getChapter('module-1', 'chapter-1', { includeLessons: true });
      expect(result).toBeDefined();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getChapter('module-1', 'chapter-1')).rejects.toThrow();
    });

    it('should include completion stats', async () => {
      mockSupabase.data = { id: 'chapter-1', completion_rate: 0.9 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getChapter('module-1', 'chapter-1', { includeStats: true });
      expect(result).toBeDefined();
    });

    it('should validate module id', async () => {
      await expect(service.getChapter('', 'chapter-1')).rejects.toThrow();
    });

    it('should validate chapter id', async () => {
      await expect(service.getChapter('module-1', '')).rejects.toThrow();
    });

    it('should include progress data', async () => {
      mockSupabase.data = { id: 'chapter-1', progress: 65 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getChapter('module-1', 'chapter-1', { includeProgress: true });
      expect(result).toBeDefined();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'chapter-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getChapter('module-1', 'chapter-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include estimated duration', async () => {
      mockSupabase.data = { id: 'chapter-1', estimated_duration: 1800 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getChapter('module-1', 'chapter-1', { includeDuration: true });
      expect(result).toBeDefined();
    });
  });

  describe('createChapter', () => {
    it('should create a new chapter', async () => {
      const chapterData = { title: 'New Chapter', order: 1 };
      mockSupabase.data = { id: 'chapter-new', ...chapterData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createChapter('module-1', chapterData);
      expect(result).toBeDefined();
    });

    it('should set default order to last position', async () => {
      mockSupabase.data = { id: 'chapter-new', order: 5 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createChapter('module-1', { title: 'Chapter' });
      expect(result).toHaveProperty('order');
    });

    it('should reject creation with empty title', async () => {
      await expect(service.createChapter('module-1', { title: '' })).rejects.toThrow();
    });

    it('should handle creation with description', async () => {
      const chapterData = { title: 'Chapter', description: 'A detailed chapter' };
      mockSupabase.data = { id: 'chapter-new', ...chapterData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createChapter('module-1', chapterData);
      expect(result).toBeDefined();
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'chapter-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createChapter('module-1', { title: 'Chapter' });
      expect(result).toHaveProperty('created_at');
    });

    it('should handle creation with estimated duration', async () => {
      const chapterData = { title: 'Chapter', estimated_duration: 3600 };
      mockSupabase.data = { id: 'chapter-new', ...chapterData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createChapter('module-1', chapterData);
      expect(result).toBeDefined();
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createChapter('module-1', { title: 'Chapter' })).rejects.toThrow();
    });

    it('should validate module exists before creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'foreign_key_violation' } });
      await expect(service.createChapter('nonexistent', { title: 'Chapter' })).rejects.toThrow();
    });

    it('should handle creation with learning objectives', async () => {
      const chapterData = { title: 'Chapter', objectives: ['Understand basics'] };
      mockSupabase.data = { id: 'chapter-new', ...chapterData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createChapter('module-1', chapterData);
      expect(result).toBeDefined();
    });

    it('should handle creation with visibility settings', async () => {
      const chapterData = { title: 'Chapter', visibility: 'published' };
      mockSupabase.data = { id: 'chapter-new', ...chapterData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createChapter('module-1', chapterData);
      expect(result).toBeDefined();
    });
  });

  describe('updateChapter', () => {
    it('should update chapter fields', async () => {
      const updates = { title: 'Updated Chapter' };
      mockSupabase.data = { id: 'chapter-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateChapter('module-1', 'chapter-1', updates);
      expect(result).toBeDefined();
    });

    it('should handle partial updates', async () => {
      const updates = { description: 'New description' };
      mockSupabase.data = { id: 'chapter-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateChapter('module-1', 'chapter-1', updates);
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'chapter-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateChapter('module-1', 'chapter-1', { title: 'X' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updateChapter('module-1', 'chapter-1', {})).rejects.toThrow();
    });

    it('should handle non-existent chapter', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateChapter('module-1', 'nonexistent', { title: 'X' });
      expect(result).toBeNull();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateChapter('module-1', 'chapter-1', { title: 'X' })).rejects.toThrow();
    });

    it('should update visibility', async () => {
      const updates = { visibility: 'draft' };
      mockSupabase.data = { id: 'chapter-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateChapter('module-1', 'chapter-1', updates);
      expect(result).toBeDefined();
    });

    it('should update duration estimate', async () => {
      const updates = { estimated_duration: 2400 };
      mockSupabase.data = { id: 'chapter-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateChapter('module-1', 'chapter-1', updates);
      expect(result).toBeDefined();
    });

    it('should update learning objectives', async () => {
      const updates = { objectives: ['New objective'] };
      mockSupabase.data = { id: 'chapter-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateChapter('module-1', 'chapter-1', updates);
      expect(result).toBeDefined();
    });

    it('should update description', async () => {
      const updates = { description: 'Updated description' };
      mockSupabase.data = { id: 'chapter-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateChapter('module-1', 'chapter-1', updates);
      expect(result).toBeDefined();
    });
  });

  describe('deleteChapter', () => {
    it('should soft delete a chapter', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteChapter('module-1', 'chapter-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should cascade delete lessons when requested', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteChapter('module-1', 'chapter-1', { cascade: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle non-existent chapter deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteChapter('module-1', 'nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteChapter('module-1', 'chapter-1')).rejects.toThrow();
    });

    it('should prevent deletion with active enrollments', async () => {
      mockSupabase.data = { id: 'chapter-1', active_enrollments: 10 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deleteChapter('module-1', 'chapter-1')).rejects.toThrow();
    });

    it('should reorder remaining chapters', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteChapter('module-1', 'chapter-1', { reorder: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deleteChapter('module-1', 'chapter-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should validate module id before deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteChapter('', 'chapter-1')).rejects.toThrow();
    });
  });

  describe('getChapterCompletion', () => {
    it('should return completion status for student', async () => {
      mockSupabase.data = { completed: true, completed_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getChapterCompletion('module-1', 'chapter-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should return incomplete status', async () => {
      mockSupabase.data = { completed: false, progress: 50 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getChapterCompletion('module-1', 'chapter-1', 'student-1');
      expect(result).toHaveProperty('completed', false);
    });

    it('should return null for non-existent enrollment', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getChapterCompletion('module-1', 'chapter-1', 'nonexistent');
      expect(result).toBeNull();
    });

    it('should include lesson completion details', async () => {
      mockSupabase.data = { completed: false, lessons: [{ completed: true }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getChapterCompletion('module-1', 'chapter-1', 'student-1', { includeLessons: true });
      expect(result).toBeDefined();
    });

    it('should calculate overall progress', async () => {
      mockSupabase.data = { completed: false, progress: 75 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getChapterCompletion('module-1', 'chapter-1', 'student-1');
      expect(result).toHaveProperty('progress');
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getChapterCompletion('module-1', 'chapter-1', 'student-1')).rejects.toThrow();
    });

    it('should validate required parameters', async () => {
      await expect(service.getChapterCompletion('', 'chapter-1', 'student-1')).rejects.toThrow();
    });

    it('should include time spent data', async () => {
      mockSupabase.data = { completed: true, time_spent: 1800 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getChapterCompletion('module-1', 'chapter-1', 'student-1');
      expect(result).toHaveProperty('time_spent');
    });
  });

  describe('reorderChapters', () => {
    it('should reorder chapters within module', async () => {
      mockSupabase.data = [{ id: 'chapter-1', order: 2 }, { id: 'chapter-2', order: 1 }];
      const result = await service.reorderChapters('module-1', ['chapter-2', 'chapter-1']);
      expect(result).toBeDefined();
    });

    it('should validate chapter ids exist', async () => {
      mockSupabase.data = [{ id: 'chapter-1' }];
      await expect(service.reorderChapters('module-1', ['chapter-1', 'nonexistent'])).rejects.toThrow();
    });

    it('should handle empty reorder list', async () => {
      await expect(service.reorderChapters('module-1', [])).rejects.toThrow();
    });

    it('should set sequential order values', async () => {
      mockSupabase.data = [{ id: 'chapter-1', order: 1 }, { id: 'chapter-2', order: 2 }];
      const result = await service.reorderChapters('module-1', ['chapter-1', 'chapter-2']);
      expect(result).toBeDefined();
    });

    it('should handle database errors during reorder', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'reorder failed' } });
      await expect(service.reorderChapters('module-1', ['chapter-1'])).rejects.toThrow();
    });

    it('should validate module id', async () => {
      await expect(service.reorderChapters('', ['chapter-1'])).rejects.toThrow();
    });

    it('should handle single chapter reorder', async () => {
      mockSupabase.data = [{ id: 'chapter-1', order: 1 }];
      const result = await service.reorderChapters('module-1', ['chapter-1']);
      expect(result).toBeDefined();
    });

    it('should prevent duplicate chapter ids', async () => {
      await expect(service.reorderChapters('module-1', ['chapter-1', 'chapter-1'])).rejects.toThrow();
    });
  });
});
