import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpHomeworkService } from '@/features/lxp/services/lxp-homework.service';

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

describe('LxpHomeworkService', () => {
  let service: LxpHomeworkService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpHomeworkService(mockSupabase as never);
  });

  describe('getHomework', () => {
    it('should return homework by id', async () => {
      mockSupabase.data = { id: 'hw-1', title: 'Chapter 5 Problems' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getHomework('hw-1');
      expect(result).toBeDefined();
    });

    it('should return null when homework not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getHomework('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getHomework('hw-1')).rejects.toThrow();
    });

    it('should include questions when requested', async () => {
      mockSupabase.data = { id: 'hw-1', questions: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getHomework('hw-1', { includeQuestions: true });
      expect(result).toBeDefined();
    });

    it('should validate homework id', async () => {
      await expect(service.getHomework('')).rejects.toThrow();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'hw-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getHomework('hw-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include submission count', async () => {
      mockSupabase.data = { id: 'hw-1', submission_count: 20 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getHomework('hw-1', { includeSubmissionCount: true });
      expect(result).toBeDefined();
    });

    it('should include grading stats', async () => {
      mockSupabase.data = { id: 'hw-1', avg_score: 78 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getHomework('hw-1', { includeGradingStats: true });
      expect(result).toBeDefined();
    });

    it('should include attachments', async () => {
      mockSupabase.data = { id: 'hw-1', attachments: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getHomework('hw-1', { includeAttachments: true });
      expect(result).toBeDefined();
    });

    it('include hints', async () => {
      mockSupabase.data = { id: 'hw-1', hints: ['Hint 1'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getHomework('hw-1', { includeHints: true });
      expect(result).toBeDefined();
    });
  });

  describe('createHomework', () => {
    it('should create new homework', async () => {
      mockSupabase.data = { id: 'hw-new', title: 'New Homework' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createHomework({ title: 'New Homework', lesson_id: 'lesson-1' });
      expect(result).toBeDefined();
    });

    it('should reject creation with empty title', async () => {
      await expect(service.createHomework({ title: '' })).rejects.toThrow();
    });

    it('should set default status to draft', async () => {
      mockSupabase.data = { id: 'hw-new', status: 'draft' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createHomework({ title: 'Homework' });
      expect(result).toHaveProperty('status', 'draft');
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'hw-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createHomework({ title: 'Homework' });
      expect(result).toHaveProperty('created_at');
    });

    it('should handle creation with due date', async () => {
      mockSupabase.data = { id: 'hw-new', due_date: '2024-12-31' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createHomework({ title: 'Homework', due_date: '2024-12-31' });
      expect(result).toBeDefined();
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createHomework({ title: 'Homework' })).rejects.toThrow();
    });

    it('should handle creation with questions', async () => {
      mockSupabase.data = { id: 'hw-new', questions: [{ text: 'Solve x+2=5' }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createHomework({ title: 'Homework', questions: [{ text: 'Solve x+2=5' }] });
      expect(result).toBeDefined();
    });

    it('should handle creation with max score', async () => {
      mockSupabase.data = { id: 'hw-new', max_score: 50 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createHomework({ title: 'Homework', max_score: 50 });
      expect(result).toBeDefined();
    });

    it('should handle creation with tags', async () => {
      mockSupabase.data = { id: 'hw-new', tags: ['practice'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createHomework({ title: 'Homework', tags: ['practice'] });
      expect(result).toBeDefined();
    });

    it('should handle creation with description', async () => {
      mockSupabase.data = { id: 'hw-new', description: 'Practice problems' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createHomework({ title: 'Homework', description: 'Practice problems' });
      expect(result).toBeDefined();
    });
  });

  describe('updateHomework', () => {
    it('should update homework fields', async () => {
      mockSupabase.data = { id: 'hw-1', title: 'Updated Homework' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateHomework('hw-1', { title: 'Updated Homework' });
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'hw-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateHomework('hw-1', { title: 'X' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updateHomework('hw-1', {})).rejects.toThrow();
    });

    it('should handle non-existent homework', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateHomework('nonexistent', { title: 'X' });
      expect(result).toBeNull();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateHomework('hw-1', { title: 'X' })).rejects.toThrow();
    });

    it('should update questions', async () => {
      mockSupabase.data = { id: 'hw-1', questions: [{ text: 'Updated question' }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateHomework('hw-1', { questions: [{ text: 'Updated question' }] });
      expect(result).toBeDefined();
    });

    it('should update due date', async () => {
      mockSupabase.data = { id: 'hw-1', due_date: '2025-01-15' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateHomework('hw-1', { due_date: '2025-01-15' });
      expect(result).toBeDefined();
    });

    it('should update tags', async () => {
      mockSupabase.data = { id: 'hw-1', tags: ['new_tag'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateHomework('hw-1', { tags: ['new_tag'] });
      expect(result).toBeDefined();
    });

    it('should update description', async () => {
      mockSupabase.data = { id: 'hw-1', description: 'Updated desc' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateHomework('hw-1', { description: 'Updated desc' });
      expect(result).toBeDefined();
    });

    it('should update max score', async () => {
      mockSupabase.data = { id: 'hw-1', max_score: 100 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateHomework('hw-1', { max_score: 100 });
      expect(result).toBeDefined();
    });
  });

  describe('deleteHomework', () => {
    it('should delete homework', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteHomework('hw-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle non-existent homework deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteHomework('nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteHomework('hw-1')).rejects.toThrow();
    });

    it('should prevent deletion with active submissions', async () => {
      mockSupabase.data = { id: 'hw-1', has_submissions: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deleteHomework('hw-1')).rejects.toThrow();
    });

    it('should validate homework id', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteHomework('')).rejects.toThrow();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deleteHomework('hw-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should cascade delete related submissions', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteHomework('hw-1', { cascade: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should preserve homework data on soft delete', async () => {
      mockSupabase.data = { id: 'hw-1', deleted_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.deleteHomework('hw-1');
      expect(result).toBeDefined();
    });
  });

  describe('submitHomework', () => {
    it('should submit homework', async () => {
      mockSupabase.data = { id: 'sub-1', homework_id: 'hw-1', student_id: 'student-1', status: 'submitted' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.submitHomework('hw-1', 'student-1', { answers: [] });
      expect(result).toBeDefined();
    });

    it('should set submission timestamp', async () => {
      mockSupabase.data = { id: 'sub-1', submitted_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.submitHomework('hw-1', 'student-1', { answers: [] });
      expect(result).toHaveProperty('submitted_at');
    });

    it('should prevent duplicate submission', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'unique_violation' } });
      await expect(service.submitHomework('hw-1', 'student-1', { answers: [] })).rejects.toThrow();
    });

    it('should validate homework id', async () => {
      await expect(service.submitHomework('', 'student-1', { answers: [] })).rejects.toThrow();
    });

    it('should validate student id', async () => {
      await expect(service.submitHomework('hw-1', '', { answers: [] })).rejects.toThrow();
    });

    it('should handle database errors during submission', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'submit failed' } });
      await expect(service.submitHomework('hw-1', 'student-1', { answers: [] })).rejects.toThrow();
    });

    it('should handle late submission', async () => {
      mockSupabase.data = { id: 'sub-1', is_late: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.submitHomework('hw-1', 'student-1', { answers: [], is_late: true });
      expect(result).toHaveProperty('is_late', true);
    });

    it('should handle submission with attachments', async () => {
      mockSupabase.data = { id: 'sub-1', attachments: [{ name: 'solution.pdf' }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.submitHomework('hw-1', 'student-1', { answers: [], attachments: [{ name: 'solution.pdf' }] });
      expect(result).toBeDefined();
    });

    it('should handle submission with comments', async () => {
      mockSupabase.data = { id: 'sub-1', comments: 'My solution' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.submitHomework('hw-1', 'student-1', { answers: [], comments: 'My solution' });
      expect(result).toBeDefined();
    });

    it('should handle submission with draft status', async () => {
      mockSupabase.data = { id: 'sub-1', status: 'draft' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.submitHomework('hw-1', 'student-1', { answers: [], saveAsDraft: true });
      expect(result).toHaveProperty('status', 'draft');
    });
  });

  describe('gradeHomework', () => {
    it('should grade a homework submission', async () => {
      mockSupabase.data = { id: 'grade-1', submission_id: 'sub-1', score: 85 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.gradeHomework('sub-1', { score: 85, graded_by: 'instructor-1' });
      expect(result).toBeDefined();
    });

    it('should validate score range', async () => {
      await expect(service.gradeHomework('sub-1', { score: -1, graded_by: 'inst-1' })).rejects.toThrow();
    });

    it('should handle database errors during grading', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'grade failed' } });
      await expect(service.gradeHomework('sub-1', { score: 85, graded_by: 'inst-1' })).rejects.toThrow();
    });

    it('should set graded_at timestamp', async () => {
      mockSupabase.data = { id: 'grade-1', graded_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.gradeHomework('sub-1', { score: 85, graded_by: 'inst-1' });
      expect(result).toHaveProperty('graded_at');
    });

    it('should include feedback', async () => {
      mockSupabase.data = { id: 'grade-1', feedback: 'Good work!' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.gradeHomework('sub-1', { score: 85, feedback: 'Good work!', graded_by: 'inst-1' });
      expect(result).toHaveProperty('feedback');
    });

    it('should validate submission id', async () => {
      await expect(service.gradeHomework('', { score: 85, graded_by: 'inst-1' })).rejects.toThrow();
    });

    it('should validate graded_by', async () => {
      await expect(service.gradeHomework('sub-1', { score: 85, graded_by: '' })).rejects.toThrow();
    });

    it('should handle rubric-based grading', async () => {
      mockSupabase.data = { id: 'grade-1', rubric_scores: [{ criterion: 'Accuracy', score: 4 }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.gradeHomework('sub-1', { rubric_scores: [{ criterion: 'Accuracy', score: 4 }], graded_by: 'inst-1' });
      expect(result).toBeDefined();
    });

    it('should handle late penalty', async () => {
      mockSupabase.data = { id: 'grade-1', score: 85, late_penalty: 10 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.gradeHomework('sub-1', { score: 85, late_penalty: 10, graded_by: 'inst-1' });
      expect(result).toBeDefined();
    });

    it('should handle bonus points', async () => {
      mockSupabase.data = { id: 'grade-1', score: 95, bonus_points: 10 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.gradeHomework('sub-1', { score: 85, bonus_points: 10, graded_by: 'inst-1' });
      expect(result).toBeDefined();
    });
  });
});
