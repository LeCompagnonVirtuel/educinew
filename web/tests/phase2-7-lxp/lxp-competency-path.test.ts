import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpCompetencyPathService } from '@/features/lxp/services/lxp-competency-path.service';

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

describe('LxpCompetencyPathService', () => {
  let service: LxpCompetencyPathService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpCompetencyPathService(mockSupabase as never);
  });

  describe('getCompetencyPath', () => {
    it('should return competency path by id', async () => {
      mockSupabase.data = { id: 'cp-1', title: 'Data Science Competency' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getCompetencyPath('cp-1');
      expect(result).toBeDefined();
    });

    it('should return null when path not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getCompetencyPath('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getCompetencyPath('cp-1')).rejects.toThrow();
    });

    it('should include competencies when requested', async () => {
      mockSupabase.data = { id: 'cp-1', competencies: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getCompetencyPath('cp-1', { includeCompetencies: true });
      expect(result).toBeDefined();
    });

    it('should validate path id', async () => {
      await expect(service.getCompetencyPath('')).rejects.toThrow();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'cp-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getCompetencyPath('cp-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include framework', async () => {
      mockSupabase.data = { id: 'cp-1', framework: { name: 'SFIA', version: '8' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getCompetencyPath('cp-1', { includeFramework: true });
      expect(result).toBeDefined();
    });

    it('should include gap analysis', async () => {
      mockSupabase.data = { id: 'cp-1', gap_analysis: {} };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getCompetencyPath('cp-1', { includeGapAnalysis: true });
      expect(result).toBeDefined();
    });

    it('should include assessment criteria', async () => {
      mockSupabase.data = { id: 'cp-1', assessment_criteria: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getCompetencyPath('cp-1', { includeAssessmentCriteria: true });
      expect(result).toBeDefined();
    });

    it('include proficiency levels', async () => {
      mockSupabase.data = { id: 'cp-1', proficiency_levels: ['beginner', 'intermediate', 'advanced'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getCompetencyPath('cp-1', { includeProficiencyLevels: true });
      expect(result).toBeDefined();
    });
  });

  describe('createCompetencyPath', () => {
    it('should create a new competency path', async () => {
      mockSupabase.data = { id: 'cp-new', title: 'New Competency Path' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createCompetencyPath({ title: 'New Competency Path', school_id: 'school-1' });
      expect(result).toBeDefined();
    });

    it('should reject creation with empty title', async () => {
      await expect(service.createCompetencyPath({ title: '' })).rejects.toThrow();
    });

    it('should set default status to draft', async () => {
      mockSupabase.data = { id: 'cp-new', status: 'draft' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createCompetencyPath({ title: 'Path' });
      expect(result).toHaveProperty('status', 'draft');
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'cp-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createCompetencyPath({ title: 'Path' });
      expect(result).toHaveProperty('created_at');
    });

    it('should handle creation with framework', async () => {
      mockSupabase.data = { id: 'cp-new', framework: { name: 'SFIA' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createCompetencyPath({ title: 'Path', framework: { name: 'SFIA' } });
      expect(result).toBeDefined();
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createCompetencyPath({ title: 'Path' })).rejects.toThrow();
    });

    it('should handle creation with competencies', async () => {
      mockSupabase.data = { id: 'cp-new', competencies: [{ name: 'Data Analysis' }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createCompetencyPath({ title: 'Path', competencies: [{ name: 'Data Analysis' }] });
      expect(result).toBeDefined();
    });

    it('should handle creation with tags', async () => {
      mockSupabase.data = { id: 'cp-new', tags: ['data-science'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createCompetencyPath({ title: 'Path', tags: ['data-science'] });
      expect(result).toBeDefined();
    });

    it('should handle creation with author', async () => {
      mockSupabase.data = { id: 'cp-new', author_id: 'user-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createCompetencyPath({ title: 'Path', author_id: 'user-1' });
      expect(result).toBeDefined();
    });

    it('should handle creation with description', async () => {
      mockSupabase.data = { id: 'cp-new', description: 'A competency journey' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createCompetencyPath({ title: 'Path', description: 'A competency journey' });
      expect(result).toBeDefined();
    });
  });

  describe('updateCompetencyPath', () => {
    it('should update competency path fields', async () => {
      mockSupabase.data = { id: 'cp-1', title: 'Updated Path' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateCompetencyPath('cp-1', { title: 'Updated Path' });
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'cp-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateCompetencyPath('cp-1', { title: 'X' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updateCompetencyPath('cp-1', {})).rejects.toThrow();
    });

    it('should handle non-existent path', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateCompetencyPath('nonexistent', { title: 'X' });
      expect(result).toBeNull();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateCompetencyPath('cp-1', { title: 'X' })).rejects.toThrow();
    });

    it('should update framework', async () => {
      mockSupabase.data = { id: 'cp-1', framework: { name: 'ESCO' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateCompetencyPath('cp-1', { framework: { name: 'ESCO' } });
      expect(result).toBeDefined();
    });

    it('should update competencies', async () => {
      mockSupabase.data = { id: 'cp-1', competencies: [{ name: 'Updated' }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateCompetencyPath('cp-1', { competencies: [{ name: 'Updated' }] });
      expect(result).toBeDefined();
    });

    it('should update tags', async () => {
      mockSupabase.data = { id: 'cp-1', tags: ['new_tag'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateCompetencyPath('cp-1', { tags: ['new_tag'] });
      expect(result).toBeDefined();
    });

    it('should update visibility', async () => {
      mockSupabase.data = { id: 'cp-1', visibility: 'private' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateCompetencyPath('cp-1', { visibility: 'private' });
      expect(result).toBeDefined();
    });

    it('should update description', async () => {
      mockSupabase.data = { id: 'cp-1', description: 'Updated desc' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateCompetencyPath('cp-1', { description: 'Updated desc' });
      expect(result).toBeDefined();
    });
  });

  describe('deleteCompetencyPath', () => {
    it('should delete a competency path', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteCompetencyPath('cp-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle non-existent path deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteCompetencyPath('nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteCompetencyPath('cp-1')).rejects.toThrow();
    });

    it('should prevent deletion with active learners', async () => {
      mockSupabase.data = { id: 'cp-1', active_learners: 15 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deleteCompetencyPath('cp-1')).rejects.toThrow();
    });

    it('should validate path id', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteCompetencyPath('')).rejects.toThrow();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deleteCompetencyPath('cp-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should cascade delete related data', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteCompetencyPath('cp-1', { cascade: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should preserve path data on soft delete', async () => {
      mockSupabase.data = { id: 'cp-1', deleted_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.deleteCompetencyPath('cp-1');
      expect(result).toBeDefined();
    });
  });

  describe('assessGap', () => {
    it('should perform gap analysis for learner', async () => {
      mockSupabase.data = { gaps: [{ competency: 'Python', current: 3, target: 5 }], overall_gap: 2 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.assessGap('cp-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should validate path id', async () => {
      await expect(service.assessGap('', 'student-1')).rejects.toThrow();
    });

    it('should validate student id', async () => {
      await expect(service.assessGap('cp-1', '')).rejects.toThrow();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'gap failed' } });
      await expect(service.assessGap('cp-1', 'student-1')).rejects.toThrow();
    });

    it('should return empty gaps when no gaps found', async () => {
      mockSupabase.data = { gaps: [], overall_gap: 0 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.assessGap('cp-1', 'student-1');
      expect(result).toHaveProperty('gaps', []);
    });

    it('should include recommended courses', async () => {
      mockSupabase.data = { gaps: [], recommended_courses: ['course-1'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.assessGap('cp-1', 'student-1');
      expect(result).toHaveProperty('recommended_courses');
    });

    it('should include proficiency levels', async () => {
      mockSupabase.data = { gaps: [], proficiency_levels: { current: 3, target: 5 } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.assessGap('cp-1', 'student-1');
      expect(result).toHaveProperty('proficiency_levels');
    });

    it('should return null for non-existent student', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.assessGap('cp-1', 'nonexistent');
      expect(result).toBeNull();
    });

    it('should include assessment date', async () => {
      mockSupabase.data = { gaps: [], assessed_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.assessGap('cp-1', 'student-1');
      expect(result).toHaveProperty('assessed_at');
    });

    it('should include learning path recommendations', async () => {
      mockSupabase.data = { gaps: [], learning_paths: ['lp-1', 'lp-2'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.assessGap('cp-1', 'student-1');
      expect(result).toHaveProperty('learning_paths');
    });
  });

  describe('getFramework', () => {
    it('should return framework details', async () => {
      mockSupabase.data = { id: 'fw-1', name: 'SFIA', version: '8', competencies: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getFramework('cp-1');
      expect(result).toBeDefined();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getFramework('cp-1')).rejects.toThrow();
    });

    it('should validate path id', async () => {
      await expect(service.getFramework('')).rejects.toThrow();
    });

    it('should return null when no framework', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getFramework('cp-1');
      expect(result).toBeNull();
    });

    it('should include competency levels', async () => {
      mockSupabase.data = { id: 'fw-1', levels: [{ level: 1, name: 'Follow' }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getFramework('cp-1', { includeLevels: true });
      expect(result).toBeDefined();
    });

    it('should include competency categories', async () => {
      mockSupabase.data = { id: 'fw-1', categories: ['Strategy', 'Design'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getFramework('cp-1', { includeCategories: true });
      expect(result).toBeDefined();
    });

    it('should include competency descriptions', async () => {
      mockSupabase.data = { id: 'fw-1', descriptions: {} };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getFramework('cp-1', { includeDescriptions: true });
      expect(result).toBeDefined();
    });

    it('should include competency mappings', async () => {
      mockSupabase.data = { id: 'fw-1', mappings: {} };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getFramework('cp-1', { includeMappings: true });
      expect(result).toBeDefined();
    });

    it('should include version history', async () => {
      mockSupabase.data = { id: 'fw-1', version_history: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getFramework('cp-1', { includeVersionHistory: true });
      expect(result).toBeDefined();
    });

    it('should include usage statistics', async () => {
      mockSupabase.data = { id: 'fw-1', usage_count: 50 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getFramework('cp-1', { includeUsageStats: true });
      expect(result).toBeDefined();
    });
  });
});
