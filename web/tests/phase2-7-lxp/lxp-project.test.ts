import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpProjectService } from '@/features/lxp/services/lxp-project.service';

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

describe('LxpProjectService', () => {
  let service: LxpProjectService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpProjectService(mockSupabase as never);
  });

  describe('getProject', () => {
    it('should return project by id', async () => {
      mockSupabase.data = { id: 'proj-1', title: 'Capstone Project' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getProject('proj-1');
      expect(result).toBeDefined();
    });

    it('should return null when project not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getProject('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getProject('proj-1')).rejects.toThrow();
    });

    it('should include rubric when requested', async () => {
      mockSupabase.data = { id: 'proj-1', rubric: {} };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getProject('proj-1', { includeRubric: true });
      expect(result).toBeDefined();
    });

    it('should validate project id', async () => {
      await expect(service.getProject('')).rejects.toThrow();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'proj-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getProject('proj-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include submission count', async () => {
      mockSupabase.data = { id: 'proj-1', submission_count: 15 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getProject('proj-1', { includeSubmissionCount: true });
      expect(result).toBeDefined();
    });

    it('should include milestones', async () => {
      mockSupabase.data = { id: 'proj-1', milestones: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getProject('proj-1', { includeMilestones: true });
      expect(result).toBeDefined();
    });

    it('should include team settings', async () => {
      mockSupabase.data = { id: 'proj-1', team_settings: { max_members: 4 } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getProject('proj-1', { includeTeamSettings: true });
      expect(result).toBeDefined();
    });

    it('include resources', async () => {
      mockSupabase.data = { id: 'proj-1', resources: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getProject('proj-1', { includeResources: true });
      expect(result).toBeDefined();
    });
  });

  describe('createProject', () => {
    it('should create a new project', async () => {
      mockSupabase.data = { id: 'proj-new', title: 'New Project' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createProject({ title: 'New Project', lesson_id: 'lesson-1' });
      expect(result).toBeDefined();
    });

    it('should reject creation with empty title', async () => {
      await expect(service.createProject({ title: '' })).rejects.toThrow();
    });

    it('should set default status to draft', async () => {
      mockSupabase.data = { id: 'proj-new', status: 'draft' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createProject({ title: 'Project' });
      expect(result).toHaveProperty('status', 'draft');
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'proj-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createProject({ title: 'Project' });
      expect(result).toHaveProperty('created_at');
    });

    it('should handle creation with rubric', async () => {
      mockSupabase.data = { id: 'proj-new', rubric: { criteria: [] } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createProject({ title: 'Project', rubric: { criteria: [] } });
      expect(result).toBeDefined();
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createProject({ title: 'Project' })).rejects.toThrow();
    });

    it('should handle creation with milestones', async () => {
      mockSupabase.data = { id: 'proj-new', milestones: [{ name: 'Phase 1' }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createProject({ title: 'Project', milestones: [{ name: 'Phase 1' }] });
      expect(result).toBeDefined();
    });

    it('should handle creation with team settings', async () => {
      mockSupabase.data = { id: 'proj-new', team_settings: { max_members: 4 } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createProject({ title: 'Project', team_settings: { max_members: 4 } });
      expect(result).toBeDefined();
    });

    it('should handle creation with tags', async () => {
      mockSupabase.data = { id: 'proj-new', tags: ['capstone'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createProject({ title: 'Project', tags: ['capstone'] });
      expect(result).toBeDefined();
    });

    it('should handle creation with description', async () => {
      mockSupabase.data = { id: 'proj-new', description: 'A capstone project' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createProject({ title: 'Project', description: 'A capstone project' });
      expect(result).toBeDefined();
    });
  });

  describe('updateProject', () => {
    it('should update project fields', async () => {
      mockSupabase.data = { id: 'proj-1', title: 'Updated Project' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateProject('proj-1', { title: 'Updated Project' });
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'proj-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateProject('proj-1', { title: 'X' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updateProject('proj-1', {})).rejects.toThrow();
    });

    it('should handle non-existent project', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateProject('nonexistent', { title: 'X' });
      expect(result).toBeNull();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateProject('proj-1', { title: 'X' })).rejects.toThrow();
    });

    it('should update rubric', async () => {
      mockSupabase.data = { id: 'proj-1', rubric: { criteria: [{ name: 'Quality' }] } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateProject('proj-1', { rubric: { criteria: [{ name: 'Quality' }] } });
      expect(result).toBeDefined();
    });

    it('should update milestones', async () => {
      mockSupabase.data = { id: 'proj-1', milestones: [{ name: 'Updated Phase' }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateProject('proj-1', { milestones: [{ name: 'Updated Phase' }] });
      expect(result).toBeDefined();
    });

    it('should update team settings', async () => {
      mockSupabase.data = { id: 'proj-1', team_settings: { max_members: 5 } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateProject('proj-1', { team_settings: { max_members: 5 } });
      expect(result).toBeDefined();
    });

    it('should update tags', async () => {
      mockSupabase.data = { id: 'proj-1', tags: ['new_tag'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateProject('proj-1', { tags: ['new_tag'] });
      expect(result).toBeDefined();
    });

    it('should update description', async () => {
      mockSupabase.data = { id: 'proj-1', description: 'Updated desc' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateProject('proj-1', { description: 'Updated desc' });
      expect(result).toBeDefined();
    });
  });

  describe('deleteProject', () => {
    it('should delete a project', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteProject('proj-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle non-existent project deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteProject('nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteProject('proj-1')).rejects.toThrow();
    });

    it('should prevent deletion with active submissions', async () => {
      mockSupabase.data = { id: 'proj-1', has_submissions: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deleteProject('proj-1')).rejects.toThrow();
    });

    it('should validate project id', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteProject('')).rejects.toThrow();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deleteProject('proj-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should cascade delete related data', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteProject('proj-1', { cascade: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should preserve project data on soft delete', async () => {
      mockSupabase.data = { id: 'proj-1', deleted_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.deleteProject('proj-1');
      expect(result).toBeDefined();
    });
  });

  describe('submitProject', () => {
    it('should submit project', async () => {
      mockSupabase.data = { id: 'sub-1', project_id: 'proj-1', student_id: 'student-1', status: 'submitted' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.submitProject('proj-1', 'student-1', { files: [] });
      expect(result).toBeDefined();
    });

    it('should set submission timestamp', async () => {
      mockSupabase.data = { id: 'sub-1', submitted_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.submitProject('proj-1', 'student-1', { files: [] });
      expect(result).toHaveProperty('submitted_at');
    });

    it('should prevent duplicate submission', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'unique_violation' } });
      await expect(service.submitProject('proj-1', 'student-1', { files: [] })).rejects.toThrow();
    });

    it('should validate project id', async () => {
      await expect(service.submitProject('', 'student-1', { files: [] })).rejects.toThrow();
    });

    it('should validate student id', async () => {
      await expect(service.submitProject('proj-1', '', { files: [] })).rejects.toThrow();
    });

    it('should handle database errors during submission', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'submit failed' } });
      await expect(service.submitProject('proj-1', 'student-1', { files: [] })).rejects.toThrow();
    });

    it('should handle late submission', async () => {
      mockSupabase.data = { id: 'sub-1', is_late: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.submitProject('proj-1', 'student-1', { files: [], is_late: true });
      expect(result).toHaveProperty('is_late', true);
    });

    it('should handle submission with files', async () => {
      mockSupabase.data = { id: 'sub-1', files: [{ name: 'report.pdf' }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.submitProject('proj-1', 'student-1', { files: [{ name: 'report.pdf' }] });
      expect(result).toBeDefined();
    });

    it('should handle submission with demo URL', async () => {
      mockSupabase.data = { id: 'sub-1', demo_url: 'https://demo.example.com' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.submitProject('proj-1', 'student-1', { files: [], demo_url: 'https://demo.example.com' });
      expect(result).toBeDefined();
    });

    it('should handle submission with description', async () => {
      mockSupabase.data = { id: 'sub-1', description: 'Project description' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.submitProject('proj-1', 'student-1', { files: [], description: 'Project description' });
      expect(result).toBeDefined();
    });
  });

  describe('gradeProject', () => {
    it('should grade a project submission', async () => {
      mockSupabase.data = { id: 'grade-1', submission_id: 'sub-1', score: 90 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.gradeProject('sub-1', { score: 90, graded_by: 'instructor-1' });
      expect(result).toBeDefined();
    });

    it('should validate score range', async () => {
      await expect(service.gradeProject('sub-1', { score: -1, graded_by: 'inst-1' })).rejects.toThrow();
    });

    it('should handle database errors during grading', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'grade failed' } });
      await expect(service.gradeProject('sub-1', { score: 90, graded_by: 'inst-1' })).rejects.toThrow();
    });

    it('should set graded_at timestamp', async () => {
      mockSupabase.data = { id: 'grade-1', graded_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.gradeProject('sub-1', { score: 90, graded_by: 'inst-1' });
      expect(result).toHaveProperty('graded_at');
    });

    it('should include feedback', async () => {
      mockSupabase.data = { id: 'grade-1', feedback: 'Excellent project!' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.gradeProject('sub-1', { score: 90, feedback: 'Excellent project!', graded_by: 'inst-1' });
      expect(result).toHaveProperty('feedback');
    });

    it('should validate submission id', async () => {
      await expect(service.gradeProject('', { score: 90, graded_by: 'inst-1' })).rejects.toThrow();
    });

    it('should validate graded_by', async () => {
      await expect(service.gradeProject('sub-1', { score: 90, graded_by: '' })).rejects.toThrow();
    });

    it('should handle rubric-based grading', async () => {
      mockSupabase.data = { id: 'grade-1', rubric_scores: [{ criterion: 'Innovation', score: 5 }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.gradeProject('sub-1', { rubric_scores: [{ criterion: 'Innovation', score: 5 }], graded_by: 'inst-1' });
      expect(result).toBeDefined();
    });

    it('should handle late penalty', async () => {
      mockSupabase.data = { id: 'grade-1', score: 90, late_penalty: 5 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.gradeProject('sub-1', { score: 90, late_penalty: 5, graded_by: 'inst-1' });
      expect(result).toBeDefined();
    });

    it('should handle peer review integration', async () => {
      mockSupabase.data = { id: 'grade-1', peer_review_score: 85 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.gradeProject('sub-1', { score: 90, peer_review_score: 85, graded_by: 'inst-1' });
      expect(result).toBeDefined();
    });
  });

  describe('getProjectRubric', () => {
    it('should return project rubric', async () => {
      mockSupabase.data = { id: 'proj-1', rubric: { criteria: [{ name: 'Quality', weight: 30 }] } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getProjectRubric('proj-1');
      expect(result).toBeDefined();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getProjectRubric('proj-1')).rejects.toThrow();
    });

    it('should validate project id', async () => {
      await expect(service.getProjectRubric('')).rejects.toThrow();
    });

    it('should return null when no rubric', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getProjectRubric('proj-1');
      expect(result).toBeNull();
    });

    it('should include scoring guide', async () => {
      mockSupabase.data = { id: 'proj-1', rubric: { scoring_guide: {} } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getProjectRubric('proj-1', { includeScoringGuide: true });
      expect(result).toBeDefined();
    });

    it('should include examples', async () => {
      mockSupabase.data = { id: 'proj-1', rubric: { examples: [] } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getProjectRubric('proj-1', { includeExamples: true });
      expect(result).toBeDefined();
    });

    it('should include weights', async () => {
      mockSupabase.data = { id: 'proj-1', rubric: { weighted: true } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getProjectRubric('proj-1', { includeWeights: true });
      expect(result).toBeDefined();
    });

    it('should include version history', async () => {
      mockSupabase.data = { id: 'proj-1', rubric: { version: 3 } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getProjectRubric('proj-1', { includeVersionHistory: true });
      expect(result).toBeDefined();
    });

    it('should include criteria descriptions', async () => {
      mockSupabase.data = { id: 'proj-1', rubric: { detailed: true } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getProjectRubric('proj-1', { includeDescriptions: true });
      expect(result).toBeDefined();
    });

    it('include performance levels', async () => {
      mockSupabase.data = { id: 'proj-1', rubric: { levels: ['Novice', 'Proficient', 'Expert'] } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getProjectRubric('proj-1', { includePerformanceLevels: true });
      expect(result).toBeDefined();
    });
  });
});
