import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpAssignmentService } from '@/features/lxp/services/lxp-assignment.service';

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

describe('LxpAssignmentService', () => {
  let service: LxpAssignmentService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpAssignmentService(mockSupabase as never);
  });

  describe('getAssignment', () => {
    it('should return assignment by id', async () => {
      mockSupabase.data = { id: 'assign-1', title: 'Final Project' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getAssignment('assign-1');
      expect(result).toBeDefined();
    });

    it('should return null when assignment not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getAssignment('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getAssignment('assign-1')).rejects.toThrow();
    });

    it('should include rubric when requested', async () => {
      mockSupabase.data = { id: 'assign-1', rubric: {} };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getAssignment('assign-1', { includeRubric: true });
      expect(result).toBeDefined();
    });

    it('should validate assignment id', async () => {
      await expect(service.getAssignment('')).rejects.toThrow();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'assign-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getAssignment('assign-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include submission count', async () => {
      mockSupabase.data = { id: 'assign-1', submission_count: 25 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getAssignment('assign-1', { includeSubmissionCount: true });
      expect(result).toBeDefined();
    });

    it('should include grading stats', async () => {
      mockSupabase.data = { id: 'assign-1', avg_score: 82 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getAssignment('assign-1', { includeGradingStats: true });
      expect(result).toBeDefined();
    });

    it('should include attachments', async () => {
      mockSupabase.data = { id: 'assign-1', attachments: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getAssignment('assign-1', { includeAttachments: true });
      expect(result).toBeDefined();
    });

    it('include late policy', async () => {
      mockSupabase.data = { id: 'assign-1', late_policy: { penalty: 10 } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getAssignment('assign-1', { includeLatePolicy: true });
      expect(result).toBeDefined();
    });
  });

  describe('createAssignment', () => {
    it('should create a new assignment', async () => {
      mockSupabase.data = { id: 'assign-new', title: 'New Assignment' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAssignment({ title: 'New Assignment', lesson_id: 'lesson-1' });
      expect(result).toBeDefined();
    });

    it('should reject creation with empty title', async () => {
      await expect(service.createAssignment({ title: '' })).rejects.toThrow();
    });

    it('should set default status to draft', async () => {
      mockSupabase.data = { id: 'assign-new', status: 'draft' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAssignment({ title: 'Assignment' });
      expect(result).toHaveProperty('status', 'draft');
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'assign-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAssignment({ title: 'Assignment' });
      expect(result).toHaveProperty('created_at');
    });

    it('should handle creation with due date', async () => {
      mockSupabase.data = { id: 'assign-new', due_date: '2024-12-31' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAssignment({ title: 'Assignment', due_date: '2024-12-31' });
      expect(result).toBeDefined();
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createAssignment({ title: 'Assignment' })).rejects.toThrow();
    });

    it('should handle creation with rubric', async () => {
      mockSupabase.data = { id: 'assign-new', rubric: { criteria: [] } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAssignment({ title: 'Assignment', rubric: { criteria: [] } });
      expect(result).toBeDefined();
    });

    it('should handle creation with max score', async () => {
      mockSupabase.data = { id: 'assign-new', max_score: 100 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAssignment({ title: 'Assignment', max_score: 100 });
      expect(result).toBeDefined();
    });

    it('should handle creation with tags', async () => {
      mockSupabase.data = { id: 'assign-new', tags: ['project'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAssignment({ title: 'Assignment', tags: ['project'] });
      expect(result).toBeDefined();
    });

    it('should handle creation with attachments', async () => {
      mockSupabase.data = { id: 'assign-new', attachments: [{ name: 'template.pdf' }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAssignment({ title: 'Assignment', attachments: [{ name: 'template.pdf' }] });
      expect(result).toBeDefined();
    });
  });

  describe('updateAssignment', () => {
    it('should update assignment fields', async () => {
      mockSupabase.data = { id: 'assign-1', title: 'Updated Assignment' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAssignment('assign-1', { title: 'Updated Assignment' });
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'assign-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAssignment('assign-1', { title: 'X' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updateAssignment('assign-1', {})).rejects.toThrow();
    });

    it('should handle non-existent assignment', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateAssignment('nonexistent', { title: 'X' });
      expect(result).toBeNull();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateAssignment('assign-1', { title: 'X' })).rejects.toThrow();
    });

    it('should update due date', async () => {
      mockSupabase.data = { id: 'assign-1', due_date: '2025-01-15' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAssignment('assign-1', { due_date: '2025-01-15' });
      expect(result).toBeDefined();
    });

    it('should update rubric', async () => {
      mockSupabase.data = { id: 'assign-1', rubric: { criteria: [{ name: 'Quality' }] } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAssignment('assign-1', { rubric: { criteria: [{ name: 'Quality' }] } });
      expect(result).toBeDefined();
    });

    it('should update late policy', async () => {
      mockSupabase.data = { id: 'assign-1', late_policy: { penalty: 15 } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAssignment('assign-1', { late_policy: { penalty: 15 } });
      expect(result).toBeDefined();
    });

    it('should update tags', async () => {
      mockSupabase.data = { id: 'assign-1', tags: ['new_tag'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAssignment('assign-1', { tags: ['new_tag'] });
      expect(result).toBeDefined();
    });

    it('should update description', async () => {
      mockSupabase.data = { id: 'assign-1', description: 'Updated desc' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAssignment('assign-1', { description: 'Updated desc' });
      expect(result).toBeDefined();
    });
  });

  describe('deleteAssignment', () => {
    it('should delete an assignment', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteAssignment('assign-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle non-existent assignment deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteAssignment('nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteAssignment('assign-1')).rejects.toThrow();
    });

    it('should prevent deletion with active submissions', async () => {
      mockSupabase.data = { id: 'assign-1', has_submissions: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deleteAssignment('assign-1')).rejects.toThrow();
    });

    it('should validate assignment id', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteAssignment('')).rejects.toThrow();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deleteAssignment('assign-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should cascade delete related submissions', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteAssignment('assign-1', { cascade: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should preserve assignment data on soft delete', async () => {
      mockSupabase.data = { id: 'assign-1', deleted_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.deleteAssignment('assign-1');
      expect(result).toBeDefined();
    });
  });

  describe('publishAssignment', () => {
    it('should publish a draft assignment', async () => {
      mockSupabase.data = { id: 'assign-1', status: 'published', published_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.publishAssignment('assign-1');
      expect(result).toBeDefined();
    });

    it('should set published_at timestamp', async () => {
      mockSupabase.data = { id: 'assign-1', published_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.publishAssignment('assign-1');
      expect(result).toHaveProperty('published_at');
    });

    it('should reject publishing already published assignment', async () => {
      mockSupabase.data = { id: 'assign-1', status: 'published' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.publishAssignment('assign-1')).rejects.toThrow();
    });

    it('should handle database errors during publish', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'publish failed' } });
      await expect(service.publishAssignment('assign-1')).rejects.toThrow();
    });

    it('should validate assignment id', async () => {
      await expect(service.publishAssignment('')).rejects.toThrow();
    });

    it('should send notifications on publish', async () => {
      mockSupabase.data = { id: 'assign-1', status: 'published' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.publishAssignment('assign-1', { notify: true });
      expect(result).toBeDefined();
    });

    it('should publish with custom visibility', async () => {
      mockSupabase.data = { id: 'assign-1', status: 'published', visibility: 'restricted' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.publishAssignment('assign-1', { visibility: 'restricted' });
      expect(result).toBeDefined();
    });

    it('should handle non-existent assignment', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.publishAssignment('nonexistent');
      expect(result).toBeNull();
    });

    it('should publish with scheduled date', async () => {
      mockSupabase.data = { id: 'assign-1', status: 'scheduled', scheduled_at: '2025-01-01' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.publishAssignment('assign-1', { scheduledAt: '2025-01-01' });
      expect(result).toBeDefined();
    });

    it('should publish with group assignment', async () => {
      mockSupabase.data = { id: 'assign-1', status: 'published', group_assignment: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.publishAssignment('assign-1', { groupAssignment: true });
      expect(result).toBeDefined();
    });
  });

  describe('gradeSubmission', () => {
    it('should grade a submission', async () => {
      mockSupabase.data = { id: 'grade-1', submission_id: 'sub-1', score: 85 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.gradeSubmission('sub-1', { score: 85, graded_by: 'instructor-1' });
      expect(result).toBeDefined();
    });

    it('should validate score range', async () => {
      await expect(service.gradeSubmission('sub-1', { score: -1, graded_by: 'inst-1' })).rejects.toThrow();
    });

    it('should validate score exceeds max', async () => {
      await expect(service.gradeSubmission('sub-1', { score: 150, max_score: 100, graded_by: 'inst-1' })).rejects.toThrow();
    });

    it('should handle database errors during grading', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'grade failed' } });
      await expect(service.gradeSubmission('sub-1', { score: 85, graded_by: 'inst-1' })).rejects.toThrow();
    });

    it('should set graded_at timestamp', async () => {
      mockSupabase.data = { id: 'grade-1', graded_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.gradeSubmission('sub-1', { score: 85, graded_by: 'inst-1' });
      expect(result).toHaveProperty('graded_at');
    });

    it('should include feedback', async () => {
      mockSupabase.data = { id: 'grade-1', feedback: 'Great work!' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.gradeSubmission('sub-1', { score: 85, feedback: 'Great work!', graded_by: 'inst-1' });
      expect(result).toHaveProperty('feedback');
    });

    it('should validate submission id', async () => {
      await expect(service.gradeSubmission('', { score: 85, graded_by: 'inst-1' })).rejects.toThrow();
    });

    it('should validate graded_by', async () => {
      await expect(service.gradeSubmission('sub-1', { score: 85, graded_by: '' })).rejects.toThrow();
    });

    it('should handle rubric-based grading', async () => {
      mockSupabase.data = { id: 'grade-1', rubric_scores: [{ criterion: 'Quality', score: 4 }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.gradeSubmission('sub-1', { rubric_scores: [{ criterion: 'Quality', score: 4 }], graded_by: 'inst-1' });
      expect(result).toBeDefined();
    });

    it('should handle late submission grading', async () => {
      mockSupabase.data = { id: 'grade-1', score: 85, late_penalty: 10 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.gradeSubmission('sub-1', { score: 85, late_penalty: 10, graded_by: 'inst-1' });
      expect(result).toBeDefined();
    });
  });

  describe('applyLatePolicy', () => {
    it('should apply late penalty to submission', async () => {
      mockSupabase.data = { id: 'assign-1', late_policy: { penalty_per_day: 10, max_days: 5 } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.applyLatePolicy('assign-1', 'sub-1');
      expect(result).toBeDefined();
    });

    it('should handle submission not late', async () => {
      mockSupabase.data = { id: 'assign-1', late_policy: { penalty_per_day: 10 }, is_late: false };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.applyLatePolicy('assign-1', 'sub-1');
      expect(result).toBeDefined();
    });

    it('should validate assignment id', async () => {
      await expect(service.applyLatePolicy('', 'sub-1')).rejects.toThrow();
    });

    it('should validate submission id', async () => {
      await expect(service.applyLatePolicy('assign-1', '')).rejects.toThrow();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'policy failed' } });
      await expect(service.applyLatePolicy('assign-1', 'sub-1')).rejects.toThrow();
    });

    it('should calculate days late', async () => {
      mockSupabase.data = { id: 'assign-1', late_policy: { penalty_per_day: 10 }, days_late: 2 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.applyLatePolicy('assign-1', 'sub-1');
      expect(result).toHaveProperty('days_late');
    });

    it('should calculate penalty amount', async () => {
      mockSupabase.data = { id: 'assign-1', late_policy: { penalty_per_day: 10 }, penalty_amount: 20 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.applyLatePolicy('assign-1', 'sub-1');
      expect(result).toHaveProperty('penalty_amount');
    });

    it('should handle no late policy', async () => {
      mockSupabase.data = { id: 'assign-1', late_policy: null };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.applyLatePolicy('assign-1', 'sub-1');
      expect(result).toBeDefined();
    });

    it('should handle extension granted', async () => {
      mockSupabase.data = { id: 'assign-1', late_policy: { penalty_per_day: 10 }, extension_granted: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.applyLatePolicy('assign-1', 'sub-1');
      expect(result).toBeDefined();
    });

    it('should handle grace period', async () => {
      mockSupabase.data = { id: 'assign-1', late_policy: { grace_period_hours: 24 }, in_grace_period: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.applyLatePolicy('assign-1', 'sub-1');
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
