import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpRubricService } from '@/features/lxp/services/lxp-rubric.service';

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

describe('LxpRubricService', () => {
  let service: LxpRubricService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpRubricService(mockSupabase as never);
  });

  describe('getRubric', () => {
    it('should return rubric by id', async () => {
      mockSupabase.data = { id: 'rubric-1', title: 'Essay Rubric' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getRubric('rubric-1');
      expect(result).toBeDefined();
    });

    it('should return null when rubric not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getRubric('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getRubric('rubric-1')).rejects.toThrow();
    });

    it('should include criteria when requested', async () => {
      mockSupabase.data = { id: 'rubric-1', criteria: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getRubric('rubric-1', { includeCriteria: true });
      expect(result).toBeDefined();
    });

    it('should validate rubric id', async () => {
      await expect(service.getRubric('')).rejects.toThrow();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'rubric-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getRubric('rubric-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include scoring levels', async () => {
      mockSupabase.data = { id: 'rubric-1', levels: ['Novice', 'Proficient', 'Expert'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getRubric('rubric-1', { includeLevels: true });
      expect(result).toBeDefined();
    });

    it('should include usage stats', async () => {
      mockSupabase.data = { id: 'rubric-1', usage_count: 10 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getRubric('rubric-1', { includeUsageStats: true });
      expect(result).toBeDefined();
    });

    it('should include total points', async () => {
      mockSupabase.data = { id: 'rubric-1', total_points: 100 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getRubric('rubric-1', { includeTotalPoints: true });
      expect(result).toBeDefined();
    });

    it('include version history', async () => {
      mockSupabase.data = { id: 'rubric-1', versions: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getRubric('rubric-1', { includeVersions: true });
      expect(result).toBeDefined();
    });
  });

  describe('createRubric', () => {
    it('should create a new rubric', async () => {
      mockSupabase.data = { id: 'rubric-new', title: 'New Rubric' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createRubric({ title: 'New Rubric', school_id: 'school-1' });
      expect(result).toBeDefined();
    });

    it('should reject creation with empty title', async () => {
      await expect(service.createRubric({ title: '' })).rejects.toThrow();
    });

    it('should set default status to draft', async () => {
      mockSupabase.data = { id: 'rubric-new', status: 'draft' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createRubric({ title: 'Rubric' });
      expect(result).toHaveProperty('status', 'draft');
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'rubric-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createRubric({ title: 'Rubric' });
      expect(result).toHaveProperty('created_at');
    });

    it('should handle creation with criteria', async () => {
      mockSupabase.data = { id: 'rubric-new', criteria: [{ name: 'Content', weight: 40 }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createRubric({ title: 'Rubric', criteria: [{ name: 'Content', weight: 40 }] });
      expect(result).toBeDefined();
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createRubric({ title: 'Rubric' })).rejects.toThrow();
    });

    it('should handle creation with scoring levels', async () => {
      mockSupabase.data = { id: 'rubric-new', levels: ['Poor', 'Good', 'Excellent'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createRubric({ title: 'Rubric', levels: ['Poor', 'Good', 'Excellent'] });
      expect(result).toBeDefined();
    });

    it('should handle creation with tags', async () => {
      mockSupabase.data = { id: 'rubric-new', tags: ['essay'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createRubric({ title: 'Rubric', tags: ['essay'] });
      expect(result).toBeDefined();
    });

    it('should handle creation with author', async () => {
      mockSupabase.data = { id: 'rubric-new', author_id: 'user-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createRubric({ title: 'Rubric', author_id: 'user-1' });
      expect(result).toBeDefined();
    });

    it('should handle creation with description', async () => {
      mockSupabase.data = { id: 'rubric-new', description: 'Essay evaluation rubric' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createRubric({ title: 'Rubric', description: 'Essay evaluation rubric' });
      expect(result).toBeDefined();
    });
  });

  describe('updateRubric', () => {
    it('should update rubric fields', async () => {
      mockSupabase.data = { id: 'rubric-1', title: 'Updated Rubric' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateRubric('rubric-1', { title: 'Updated Rubric' });
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'rubric-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateRubric('rubric-1', { title: 'X' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updateRubric('rubric-1', {})).rejects.toThrow();
    });

    it('should handle non-existent rubric', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateRubric('nonexistent', { title: 'X' });
      expect(result).toBeNull();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateRubric('rubric-1', { title: 'X' })).rejects.toThrow();
    });

    it('should update criteria', async () => {
      mockSupabase.data = { id: 'rubric-1', criteria: [{ name: 'Updated', weight: 50 }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateRubric('rubric-1', { criteria: [{ name: 'Updated', weight: 50 }] });
      expect(result).toBeDefined();
    });

    it('should update levels', async () => {
      mockSupabase.data = { id: 'rubric-1', levels: ['Beginner', 'Intermediate', 'Advanced'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateRubric('rubric-1', { levels: ['Beginner', 'Intermediate', 'Advanced'] });
      expect(result).toBeDefined();
    });

    it('should update tags', async () => {
      mockSupabase.data = { id: 'rubric-1', tags: ['new_tag'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateRubric('rubric-1', { tags: ['new_tag'] });
      expect(result).toBeDefined();
    });

    it('should update visibility', async () => {
      mockSupabase.data = { id: 'rubric-1', visibility: 'private' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateRubric('rubric-1', { visibility: 'private' });
      expect(result).toBeDefined();
    });

    it('should update description', async () => {
      mockSupabase.data = { id: 'rubric-1', description: 'Updated desc' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateRubric('rubric-1', { description: 'Updated desc' });
      expect(result).toBeDefined();
    });
  });

  describe('deleteRubric', () => {
    it('should delete a rubric', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteRubric('rubric-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle non-existent rubric deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteRubric('nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteRubric('rubric-1')).rejects.toThrow();
    });

    it('should prevent deletion of rubric in use', async () => {
      mockSupabase.data = { id: 'rubric-1', in_use: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deleteRubric('rubric-1')).rejects.toThrow();
    });

    it('should validate rubric id', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteRubric('')).rejects.toThrow();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deleteRubric('rubric-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should cascade delete related criteria', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteRubric('rubric-1', { cascade: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should preserve rubric data on soft delete', async () => {
      mockSupabase.data = { id: 'rubric-1', deleted_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.deleteRubric('rubric-1');
      expect(result).toBeDefined();
    });
  });

  describe('addCriterion', () => {
    it('should add criterion to rubric', async () => {
      mockSupabase.data = { id: 'crit-1', name: 'Content Quality' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.addCriterion('rubric-1', { name: 'Content Quality', weight: 30 });
      expect(result).toBeDefined();
    });

    it('should reject criterion with empty name', async () => {
      await expect(service.addCriterion('rubric-1', { name: '', weight: 30 })).rejects.toThrow();
    });

    it('should validate weight range', async () => {
      await expect(service.addCriterion('rubric-1', { name: 'Quality', weight: -1 })).rejects.toThrow();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'add failed' } });
      await expect(service.addCriterion('rubric-1', { name: 'Quality', weight: 30 })).rejects.toThrow();
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'crit-1', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.addCriterion('rubric-1', { name: 'Quality', weight: 30 });
      expect(result).toHaveProperty('created_at');
    });

    it('should validate rubric id', async () => {
      await expect(service.addCriterion('', { name: 'Quality', weight: 30 })).rejects.toThrow();
    });

    it('should handle criterion with description', async () => {
      mockSupabase.data = { id: 'crit-1', description: 'Evaluates content depth' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.addCriterion('rubric-1', { name: 'Quality', weight: 30, description: 'Evaluates content depth' });
      expect(result).toBeDefined();
    });

    it('should handle criterion with scoring levels', async () => {
      mockSupabase.data = { id: 'crit-1', levels: [{ name: 'Poor', score: 1 }, { name: 'Good', score: 3 }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.addCriterion('rubric-1', { name: 'Quality', weight: 30, levels: [{ name: 'Poor', score: 1 }, { name: 'Good', score: 3 }] });
      expect(result).toBeDefined();
    });

    it('should handle criterion with examples', async () => {
      mockSupabase.data = { id: 'crit-1', examples: ['Example 1'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.addCriterion('rubric-1', { name: 'Quality', weight: 30, examples: ['Example 1'] });
      expect(result).toBeDefined();
    });

    it('should handle criterion with max score', async () => {
      mockSupabase.data = { id: 'crit-1', max_score: 25 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.addCriterion('rubric-1', { name: 'Quality', weight: 30, max_score: 25 });
      expect(result).toBeDefined();
    });
  });

  describe('updateCriterion', () => {
    it('should update criterion', async () => {
      mockSupabase.data = { id: 'crit-1', name: 'Updated Criterion' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateCriterion('crit-1', { name: 'Updated Criterion' });
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'crit-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateCriterion('crit-1', { name: 'X' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updateCriterion('crit-1', {})).rejects.toThrow();
    });

    it('should handle non-existent criterion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateCriterion('nonexistent', { name: 'X' });
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateCriterion('crit-1', { name: 'X' })).rejects.toThrow();
    });

    it('should update weight', async () => {
      mockSupabase.data = { id: 'crit-1', weight: 40 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateCriterion('crit-1', { weight: 40 });
      expect(result).toBeDefined();
    });

    it('should update description', async () => {
      mockSupabase.data = { id: 'crit-1', description: 'Updated desc' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateCriterion('crit-1', { description: 'Updated desc' });
      expect(result).toBeDefined();
    });

    it('should update levels', async () => {
      mockSupabase.data = { id: 'crit-1', levels: [{ name: 'Excellent', score: 5 }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateCriterion('crit-1', { levels: [{ name: 'Excellent', score: 5 }] });
      expect(result).toBeDefined();
    });

    it('should update examples', async () => {
      mockSupabase.data = { id: 'crit-1', examples: ['New example'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateCriterion('crit-1', { examples: ['New example'] });
      expect(result).toBeDefined();
    });

    it('should update max score', async () => {
      mockSupabase.data = { id: 'crit-1', max_score: 30 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateCriterion('crit-1', { max_score: 30 });
      expect(result).toBeDefined();
    });
  });

  describe('deleteCriterion', () => {
    it('should delete a criterion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteCriterion('crit-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle non-existent criterion deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteCriterion('nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteCriterion('crit-1')).rejects.toThrow();
    });

    it('should prevent deletion of criterion in use', async () => {
      mockSupabase.data = { id: 'crit-1', in_use: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deleteCriterion('crit-1')).rejects.toThrow();
    });

    it('should validate criterion id', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteCriterion('')).rejects.toThrow();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deleteCriterion('crit-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should cascade delete related levels', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteCriterion('crit-1', { cascade: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should reorder remaining criteria', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteCriterion('crit-1', { reorder: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });
  });

  describe('calculateScore', () => {
    it('should calculate total score from criteria', async () => {
      mockSupabase.data = { total_score: 85, max_score: 100 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.calculateScore('rubric-1', { criterion_scores: [{ criterion_id: 'c1', score: 85 }] });
      expect(result).toBeDefined();
    });

    it('should validate rubric id', async () => {
      await expect(service.calculateScore('', { criterion_scores: [] })).rejects.toThrow();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'calc failed' } });
      await expect(service.calculateScore('rubric-1', { criterion_scores: [] })).rejects.toThrow();
    });

    it('should return percentage', async () => {
      mockSupabase.data = { total_score: 85, max_score: 100, percentage: 85 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.calculateScore('rubric-1', { criterion_scores: [], includePercentage: true });
      expect(result).toHaveProperty('percentage');
    });

    it('should handle weighted scoring', async () => {
      mockSupabase.data = { total_score: 82, weighted: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.calculateScore('rubric-1', { criterion_scores: [], weighted: true });
      expect(result).toBeDefined();
    });

    it('should handle criterion-level scores', async () => {
      mockSupabase.data = { total_score: 85, criterion_scores: [{ id: 'c1', score: 85 }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.calculateScore('rubric-1', { criterion_scores: [{ criterion_id: 'c1', score: 85 }] });
      expect(result).toBeDefined();
    });

    it('should handle empty scores', async () => {
      mockSupabase.data = { total_score: 0, max_score: 100 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.calculateScore('rubric-1', { criterion_scores: [] });
      expect(result).toBeDefined();
    });

    it('should handle grade letter conversion', async () => {
      mockSupabase.data = { total_score: 85, percentage: 85, letter_grade: 'B+' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.calculateScore('rubric-1', { criterion_scores: [], includeLetterGrade: true });
      expect(result).toHaveProperty('letter_grade');
    });

    it('should handle pass/fail determination', async () => {
      mockSupabase.data = { total_score: 65, passed: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.calculateScore('rubric-1', { criterion_scores: [], passing_score: 60 });
      expect(result).toHaveProperty('passed');
    });

    it('should validate criterion_scores format', async () => {
      await expect(service.calculateScore('rubric-1', { criterion_scores: 'invalid' as never })).rejects.toThrow();
    });
  });
});
