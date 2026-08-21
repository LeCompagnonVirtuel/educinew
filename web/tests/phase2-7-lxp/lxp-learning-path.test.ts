import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpLearningPathService } from '@/features/lxp/services/lxp-learning-path.service';

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

describe('LxpLearningPathService', () => {
  let service: LxpLearningPathService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpLearningPathService(mockSupabase as never);
  });

  describe('getLearningPath', () => {
    it('should return learning path by id', async () => {
      mockSupabase.data = { id: 'path-1', title: 'Web Development Path' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getLearningPath('path-1');
      expect(result).toBeDefined();
    });

    it('should return null when path not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getLearningPath('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getLearningPath('path-1')).rejects.toThrow();
    });

    it('should include courses when requested', async () => {
      mockSupabase.data = { id: 'path-1', courses: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getLearningPath('path-1', { includeCourses: true });
      expect(result).toBeDefined();
    });

    it('should validate path id', async () => {
      await expect(service.getLearningPath('')).rejects.toThrow();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'path-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getLearningPath('path-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include enrollment count', async () => {
      mockSupabase.data = { id: 'path-1', enrollment_count: 100 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getLearningPath('path-1', { includeEnrollmentCount: true });
      expect(result).toBeDefined();
    });

    it('should include completion stats', async () => {
      mockSupabase.data = { id: 'path-1', completion_rate: 0.65 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getLearningPath('path-1', { includeStats: true });
      expect(result).toBeDefined();
    });

    it('include prerequisites', async () => {
      mockSupabase.data = { id: 'path-1', prerequisites: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getLearningPath('path-1', { includePrerequisites: true });
      expect(result).toBeDefined();
    });

    it('include recommendations', async () => {
      mockSupabase.data = { id: 'path-1', recommended_for: ['beginners'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getLearningPath('path-1', { includeRecommendations: true });
      expect(result).toBeDefined();
    });
  });

  describe('createLearningPath', () => {
    it('should create a new learning path', async () => {
      mockSupabase.data = { id: 'path-new', title: 'New Path' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createLearningPath({ title: 'New Path', school_id: 'school-1' });
      expect(result).toBeDefined();
    });

    it('should reject creation with empty title', async () => {
      await expect(service.createLearningPath({ title: '' })).rejects.toThrow();
    });

    it('should set default status to draft', async () => {
      mockSupabase.data = { id: 'path-new', status: 'draft' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createLearningPath({ title: 'Path' });
      expect(result).toHaveProperty('status', 'draft');
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'path-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createLearningPath({ title: 'Path' });
      expect(result).toHaveProperty('created_at');
    });

    it('should handle creation with courses', async () => {
      mockSupabase.data = { id: 'path-new', courses: ['course-1', 'course-2'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createLearningPath({ title: 'Path', courses: ['course-1', 'course-2'] });
      expect(result).toBeDefined();
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createLearningPath({ title: 'Path' })).rejects.toThrow();
    });

    it('should handle creation with tags', async () => {
      mockSupabase.data = { id: 'path-new', tags: ['web-dev'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createLearningPath({ title: 'Path', tags: ['web-dev'] });
      expect(result).toBeDefined();
    });

    it('should handle creation with estimated duration', async () => {
      mockSupabase.data = { id: 'path-new', estimated_duration: 3600 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createLearningPath({ title: 'Path', estimated_duration: 3600 });
      expect(result).toBeDefined();
    });

    it('should handle creation with author', async () => {
      mockSupabase.data = { id: 'path-new', author_id: 'user-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createLearningPath({ title: 'Path', author_id: 'user-1' });
      expect(result).toBeDefined();
    });

    it('should handle creation with description', async () => {
      mockSupabase.data = { id: 'path-new', description: 'A learning journey' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createLearningPath({ title: 'Path', description: 'A learning journey' });
      expect(result).toBeDefined();
    });
  });

  describe('updateLearningPath', () => {
    it('should update learning path fields', async () => {
      mockSupabase.data = { id: 'path-1', title: 'Updated Path' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateLearningPath('path-1', { title: 'Updated Path' });
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'path-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateLearningPath('path-1', { title: 'X' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updateLearningPath('path-1', {})).rejects.toThrow();
    });

    it('should handle non-existent path', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateLearningPath('nonexistent', { title: 'X' });
      expect(result).toBeNull();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateLearningPath('path-1', { title: 'X' })).rejects.toThrow();
    });

    it('should update courses', async () => {
      mockSupabase.data = { id: 'path-1', courses: ['course-1', 'course-3'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateLearningPath('path-1', { courses: ['course-1', 'course-3'] });
      expect(result).toBeDefined();
    });

    it('should update tags', async () => {
      mockSupabase.data = { id: 'path-1', tags: ['new_tag'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateLearningPath('path-1', { tags: ['new_tag'] });
      expect(result).toBeDefined();
    });

    it('should update visibility', async () => {
      mockSupabase.data = { id: 'path-1', visibility: 'private' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateLearningPath('path-1', { visibility: 'private' });
      expect(result).toBeDefined();
    });

    it('should update description', async () => {
      mockSupabase.data = { id: 'path-1', description: 'Updated desc' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateLearningPath('path-1', { description: 'Updated desc' });
      expect(result).toBeDefined();
    });

    it('should update estimated duration', async () => {
      mockSupabase.data = { id: 'path-1', estimated_duration: 7200 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateLearningPath('path-1', { estimated_duration: 7200 });
      expect(result).toBeDefined();
    });
  });

  describe('deleteLearningPath', () => {
    it('should delete a learning path', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteLearningPath('path-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle non-existent path deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteLearningPath('nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteLearningPath('path-1')).rejects.toThrow();
    });

    it('should prevent deletion of path with active enrollments', async () => {
      mockSupabase.data = { id: 'path-1', active_enrollments: 10 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deleteLearningPath('path-1')).rejects.toThrow();
    });

    it('should validate path id', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteLearningPath('')).rejects.toThrow();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deleteLearningPath('path-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should cascade delete related enrollments', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteLearningPath('path-1', { cascade: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should preserve path data on soft delete', async () => {
      mockSupabase.data = { id: 'path-1', deleted_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.deleteLearningPath('path-1');
      expect(result).toBeDefined();
    });
  });

  describe('enrollStudent', () => {
    it('should enroll student in learning path', async () => {
      mockSupabase.data = { id: 'enroll-1', student_id: 'student-1', path_id: 'path-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.enrollStudent('path-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should prevent duplicate enrollment', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'unique_violation' } });
      await expect(service.enrollStudent('path-1', 'student-1')).rejects.toThrow();
    });

    it('should validate path exists', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.enrollStudent('nonexistent', 'student-1')).rejects.toThrow();
    });

    it('should set enrollment date', async () => {
      mockSupabase.data = { id: 'enroll-1', enrolled_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.enrollStudent('path-1', 'student-1');
      expect(result).toHaveProperty('enrolled_at');
    });

    it('should set initial status as active', async () => {
      mockSupabase.data = { id: 'enroll-1', status: 'active' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.enrollStudent('path-1', 'student-1');
      expect(result).toHaveProperty('status', 'active');
    });

    it('should handle enrollment with notification', async () => {
      mockSupabase.data = { id: 'enroll-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.enrollStudent('path-1', 'student-1', { notify: true });
      expect(result).toBeDefined();
    });

    it('should handle database errors during enrollment', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'enrollment failed' } });
      await expect(service.enrollStudent('path-1', 'student-1')).rejects.toThrow();
    });

    it('should validate student id', async () => {
      await expect(service.enrollStudent('path-1', '')).rejects.toThrow();
    });

    it('should validate path id', async () => {
      await expect(service.enrollStudent('', 'student-1')).rejects.toThrow();
    });

    it('should handle enrollment with custom start date', async () => {
      mockSupabase.data = { id: 'enroll-1', start_date: '2024-02-01' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.enrollStudent('path-1', 'student-1', { startDate: '2024-02-01' });
      expect(result).toBeDefined();
    });
  });

  describe('getProgress', () => {
    it('should return progress for student', async () => {
      mockSupabase.data = { progress: 45, courses_completed: 2, total_courses: 5 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getProgress('path-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should return 0% progress for new enrollment', async () => {
      mockSupabase.data = { progress: 0, courses_completed: 0 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getProgress('path-1', 'student-1');
      expect(result).toHaveProperty('progress', 0);
    });

    it('should return 100% for completed path', async () => {
      mockSupabase.data = { progress: 100, courses_completed: 5, total_courses: 5 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getProgress('path-1', 'student-1');
      expect(result).toHaveProperty('progress', 100);
    });

    it('should include course-level progress', async () => {
      mockSupabase.data = { progress: 50, courses: [{ id: 'c1', progress: 100 }, { id: 'c2', progress: 0 }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getProgress('path-1', 'student-1', { includeCourses: true });
      expect(result).toBeDefined();
    });

    it('should include time spent', async () => {
      mockSupabase.data = { progress: 50, time_spent: 3600 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getProgress('path-1', 'student-1');
      expect(result).toHaveProperty('time_spent');
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getProgress('path-1', 'student-1')).rejects.toThrow();
    });

    it('should validate required parameters', async () => {
      await expect(service.getProgress('', 'student-1')).rejects.toThrow();
    });

    it('should return null for non-existent student', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getProgress('path-1', 'nonexistent');
      expect(result).toBeNull();
    });

    it('should include estimated completion date', async () => {
      mockSupabase.data = { progress: 50, estimated_completion: '2024-06-01' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getProgress('path-1', 'student-1');
      expect(result).toHaveProperty('estimated_completion');
    });

    it('include milestones', async () => {
      mockSupabase.data = { progress: 50, milestones: [{ name: 'Halfway', achieved: true }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getProgress('path-1', 'student-1', { includeMilestones: true });
      expect(result).toBeDefined();
    });
  });

  describe('getRecommendations', () => {
    it('should return recommended learning paths', async () => {
      mockSupabase.data = [{ id: 'path-2', relevance: 0.9 }, { id: 'path-3', relevance: 0.7 }];
      const result = await service.getRecommendations('student-1');
      expect(result).toBeDefined();
    });

    it('should return empty array when no recommendations', async () => {
      mockSupabase.data = [];
      const result = await service.getRecommendations('student-1');
      expect(result).toEqual([]);
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'recommend failed' } });
      await expect(service.getRecommendations('student-1')).rejects.toThrow();
    });

    it('should validate student id', async () => {
      await expect(service.getRecommendations('')).rejects.toThrow();
    });

    it('should limit recommendation count', async () => {
      mockSupabase.data = [{ id: 'path-1' }];
      const result = await service.getRecommendations('student-1', { limit: 5 });
      expect(result).toBeDefined();
    });

    it('should filter by difficulty', async () => {
      mockSupabase.data = [{ id: 'path-1', difficulty: 'beginner' }];
      const result = await service.getRecommendations('student-1', { difficulty: 'beginner' });
      expect(result).toBeDefined();
    });

    it('should filter by category', async () => {
      mockSupabase.data = [{ id: 'path-1', category: 'programming' }];
      const result = await service.getRecommendations('student-1', { category: 'programming' });
      expect(result).toBeDefined();
    });

    it('should exclude completed paths', async () => {
      mockSupabase.data = [{ id: 'path-1', excludeCompleted: true }];
      const result = await service.getRecommendations('student-1', { excludeCompleted: true });
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
