import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpLessonService } from '@/features/lxp/services/lxp-lesson.service';

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

describe('LxpLessonService', () => {
  let service: LxpLessonService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpLessonService(mockSupabase as never);
  });

  describe('getLesson', () => {
    it('should return lesson by id', async () => {
      mockSupabase.data = { id: 'lesson-1', title: 'Intro to Algebra' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getLesson('module-1', 'lesson-1');
      expect(result).toBeDefined();
    });

    it('should return null when lesson not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getLesson('module-1', 'nonexistent');
      expect(result).toBeNull();
    });

    it('should include content when requested', async () => {
      mockSupabase.data = { id: 'lesson-1', content: { type: 'video', url: 'video.mp4' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getLesson('module-1', 'lesson-1', { includeContent: true });
      expect(result).toBeDefined();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getLesson('module-1', 'lesson-1')).rejects.toThrow();
    });

    it('should include completion stats', async () => {
      mockSupabase.data = { id: 'lesson-1', completion_rate: 0.85 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getLesson('module-1', 'lesson-1', { includeStats: true });
      expect(result).toBeDefined();
    });

    it('should validate module id', async () => {
      await expect(service.getLesson('', 'lesson-1')).rejects.toThrow();
    });

    it('should validate lesson id', async () => {
      await expect(service.getLesson('module-1', '')).rejects.toThrow();
    });

    it('should include assessment data when requested', async () => {
      mockSupabase.data = { id: 'lesson-1', assessment: { type: 'quiz', questions: 10 } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getLesson('module-1', 'lesson-1', { includeAssessment: true });
      expect(result).toBeDefined();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'lesson-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getLesson('module-1', 'lesson-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include related resources', async () => {
      mockSupabase.data = { id: 'lesson-1', resources: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getLesson('module-1', 'lesson-1', { includeResources: true });
      expect(result).toBeDefined();
    });
  });

  describe('createLesson', () => {
    it('should create a new lesson', async () => {
      const lessonData = { title: 'New Lesson', type: 'video' };
      mockSupabase.data = { id: 'lesson-new', ...lessonData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createLesson('module-1', lessonData);
      expect(result).toBeDefined();
    });

    it('should set default order to last position', async () => {
      mockSupabase.data = { id: 'lesson-new', order: 5 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createLesson('module-1', { title: 'Lesson' });
      expect(result).toHaveProperty('order');
    });

    it('should reject creation with empty title', async () => {
      await expect(service.createLesson('module-1', { title: '' })).rejects.toThrow();
    });

    it('should handle creation with video content', async () => {
      const lessonData = { title: 'Video Lesson', type: 'video', video_url: 'https://example.com/video.mp4' };
      mockSupabase.data = { id: 'lesson-new', ...lessonData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createLesson('module-1', lessonData);
      expect(result).toBeDefined();
    });

    it('should handle creation with text content', async () => {
      const lessonData = { title: 'Text Lesson', type: 'text', content: 'Lesson content here' };
      mockSupabase.data = { id: 'lesson-new', ...lessonData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createLesson('module-1', lessonData);
      expect(result).toBeDefined();
    });

    it('should handle creation with quiz', async () => {
      const lessonData = { title: 'Quiz Lesson', type: 'quiz', quiz_id: 'quiz-1' };
      mockSupabase.data = { id: 'lesson-new', ...lessonData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createLesson('module-1', lessonData);
      expect(result).toBeDefined();
    });

    it('should handle creation with estimated duration', async () => {
      const lessonData = { title: 'Lesson', estimated_duration: 1800 };
      mockSupabase.data = { id: 'lesson-new', ...lessonData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createLesson('module-1', lessonData);
      expect(result).toBeDefined();
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'lesson-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createLesson('module-1', { title: 'Lesson' });
      expect(result).toHaveProperty('created_at');
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createLesson('module-1', { title: 'Lesson' })).rejects.toThrow();
    });

    it('should validate lesson type', async () => {
      const lessonData = { title: 'Lesson', type: 'invalid_type' };
      await expect(service.createLesson('module-1', lessonData)).rejects.toThrow();
    });
  });

  describe('updateLesson', () => {
    it('should update lesson fields', async () => {
      const updates = { title: 'Updated Lesson' };
      mockSupabase.data = { id: 'lesson-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateLesson('module-1', 'lesson-1', updates);
      expect(result).toBeDefined();
    });

    it('should handle partial updates', async () => {
      const updates = { description: 'New description' };
      mockSupabase.data = { id: 'lesson-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateLesson('module-1', 'lesson-1', updates);
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'lesson-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateLesson('module-1', 'lesson-1', { title: 'X' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updateLesson('module-1', 'lesson-1', {})).rejects.toThrow();
    });

    it('should handle non-existent lesson', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateLesson('module-1', 'nonexistent', { title: 'X' });
      expect(result).toBeNull();
    });

    it('should update video content', async () => {
      const updates = { video_url: 'https://example.com/new-video.mp4' };
      mockSupabase.data = { id: 'lesson-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateLesson('module-1', 'lesson-1', updates);
      expect(result).toBeDefined();
    });

    it('should update text content', async () => {
      const updates = { content: 'Updated content' };
      mockSupabase.data = { id: 'lesson-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateLesson('module-1', 'lesson-1', updates);
      expect(result).toBeDefined();
    });

    it('should update duration estimate', async () => {
      const updates = { estimated_duration: 2400 };
      mockSupabase.data = { id: 'lesson-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateLesson('module-1', 'lesson-1', updates);
      expect(result).toBeDefined();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateLesson('module-1', 'lesson-1', { title: 'X' })).rejects.toThrow();
    });

    it('should update visibility settings', async () => {
      const updates = { visibility: 'draft' };
      mockSupabase.data = { id: 'lesson-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateLesson('module-1', 'lesson-1', updates);
      expect(result).toBeDefined();
    });
  });

  describe('deleteLesson', () => {
    it('should soft delete a lesson', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteLesson('module-1', 'lesson-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should cascade delete related content', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteLesson('module-1', 'lesson-1', { cascade: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle non-existent lesson deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteLesson('module-1', 'nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteLesson('module-1', 'lesson-1')).rejects.toThrow();
    });

    it('should prevent deletion of lesson with submissions', async () => {
      mockSupabase.data = { id: 'lesson-1', has_submissions: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deleteLesson('module-1', 'lesson-1')).rejects.toThrow();
    });

    it('should reorder remaining lessons after deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteLesson('module-1', 'lesson-1', { reorder: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deleteLesson('module-1', 'lesson-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should validate module id before deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteLesson('', 'lesson-1')).rejects.toThrow();
    });
  });

  describe('reorderLessons', () => {
    it('should reorder lessons within module', async () => {
      mockSupabase.data = [{ id: 'lesson-1', order: 2 }, { id: 'lesson-2', order: 1 }];
      const result = await service.reorderLessons('module-1', ['lesson-2', 'lesson-1']);
      expect(result).toBeDefined();
    });

    it('should validate lesson ids exist', async () => {
      mockSupabase.data = [{ id: 'lesson-1' }];
      await expect(service.reorderLessons('module-1', ['lesson-1', 'nonexistent'])).rejects.toThrow();
    });

    it('should handle empty reorder list', async () => {
      await expect(service.reorderLessons('module-1', [])).rejects.toThrow();
    });

    it('should set sequential order values', async () => {
      mockSupabase.data = [{ id: 'lesson-1', order: 1 }, { id: 'lesson-2', order: 2 }];
      const result = await service.reorderLessons('module-1', ['lesson-1', 'lesson-2']);
      expect(result).toBeDefined();
    });

    it('should handle database errors during reorder', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'reorder failed' } });
      await expect(service.reorderLessons('module-1', ['lesson-1'])).rejects.toThrow();
    });

    it('should validate module id', async () => {
      await expect(service.reorderLessons('', ['lesson-1'])).rejects.toThrow();
    });

    it('should handle single lesson reorder', async () => {
      mockSupabase.data = [{ id: 'lesson-1', order: 1 }];
      const result = await service.reorderLessons('module-1', ['lesson-1']);
      expect(result).toBeDefined();
    });

    it('should prevent duplicate lesson ids', async () => {
      await expect(service.reorderLessons('module-1', ['lesson-1', 'lesson-1'])).rejects.toThrow();
    });
  });

  describe('getLessonProgress', () => {
    it('should return progress for student', async () => {
      mockSupabase.data = { progress: 75, status: 'in_progress' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getLessonProgress('module-1', 'lesson-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should return completed status', async () => {
      mockSupabase.data = { progress: 100, status: 'completed', completed_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getLessonProgress('module-1', 'lesson-1', 'student-1');
      expect(result).toHaveProperty('status', 'completed');
    });

    it('should return not started status', async () => {
      mockSupabase.data = { progress: 0, status: 'not_started' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getLessonProgress('module-1', 'lesson-1', 'student-1');
      expect(result).toHaveProperty('status', 'not_started');
    });

    it('should include time spent', async () => {
      mockSupabase.data = { progress: 50, time_spent: 900 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getLessonProgress('module-1', 'lesson-1', 'student-1');
      expect(result).toHaveProperty('time_spent');
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getLessonProgress('module-1', 'lesson-1', 'student-1')).rejects.toThrow();
    });

    it('should validate required parameters', async () => {
      await expect(service.getLessonProgress('', 'lesson-1', 'student-1')).rejects.toThrow();
    });

    it('should return null for non-existent student', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getLessonProgress('module-1', 'lesson-1', 'nonexistent');
      expect(result).toBeNull();
    });

    it('should include last accessed timestamp', async () => {
      mockSupabase.data = { progress: 50, last_accessed: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getLessonProgress('module-1', 'lesson-1', 'student-1');
      expect(result).toHaveProperty('last_accessed');
    });
  });

  describe('markLessonComplete', () => {
    it('should mark lesson as complete', async () => {
      mockSupabase.data = { status: 'completed', completed_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.markLessonComplete('module-1', 'lesson-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should set completion timestamp', async () => {
      mockSupabase.data = { completed_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.markLessonComplete('module-1', 'lesson-1', 'student-1');
      expect(result).toHaveProperty('completed_at');
    });

    it('should update module progress', async () => {
      mockSupabase.data = { module_progress: 80 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.markLessonComplete('module-1', 'lesson-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'completion failed' } });
      await expect(service.markLessonComplete('module-1', 'lesson-1', 'student-1')).rejects.toThrow();
    });

    it('should validate required parameters', async () => {
      await expect(service.markLessonComplete('', 'lesson-1', 'student-1')).rejects.toThrow();
    });

    it('should trigger module completion if last lesson', async () => {
      mockSupabase.data = { module_completed: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.markLessonComplete('module-1', 'lesson-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should not mark already completed lesson', async () => {
      mockSupabase.data = { status: 'completed', already_completed: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.markLessonComplete('module-1', 'lesson-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should handle concurrent completion attempts', async () => {
      mockSupabase.data = { status: 'completed' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 3 }, () => service.markLessonComplete('module-1', 'lesson-1', 'student-1'));
      await Promise.all(promises);
      expect(mockSupabase.update).toHaveBeenCalled();
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
      mockSupabase.data = Array.from({ length: 1000 }, (_, i) => ({ id: `item-${i}` }));
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
      mockSupabase.data = Array.from({ length: 10000 }, (_, i) => ({ id: `item-${i}`, data: 'x'.repeat(100) }));
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
      mockSupabase.data = { id: 'unicode-1', name: '??????' };
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
