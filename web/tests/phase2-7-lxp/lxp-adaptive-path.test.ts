import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpAdaptivePathService } from '@/features/lxp/services/lxp-adaptive-path.service';

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

describe('LxpAdaptivePathService', () => {
  let service: LxpAdaptivePathService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpAdaptivePathService(mockSupabase as never);
  });

  describe('getAdaptivePath', () => {
    it('should return adaptive path by id', async () => {
      mockSupabase.data = { id: 'apath-1', title: 'Adaptive Math' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getAdaptivePath('apath-1');
      expect(result).toBeDefined();
    });

    it('should return null when path not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getAdaptivePath('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getAdaptivePath('apath-1')).rejects.toThrow();
    });

    it('should include rules when requested', async () => {
      mockSupabase.data = { id: 'apath-1', rules: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getAdaptivePath('apath-1', { includeRules: true });
      expect(result).toBeDefined();
    });

    it('should validate path id', async () => {
      await expect(service.getAdaptivePath('')).rejects.toThrow();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'apath-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getAdaptivePath('apath-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include learner profile', async () => {
      mockSupabase.data = { id: 'apath-1', learner_profile: { level: 'intermediate' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getAdaptivePath('apath-1', { includeLearnerProfile: true });
      expect(result).toBeDefined();
    });

    it('should include adjustment history', async () => {
      mockSupabase.data = { id: 'apath-1', adjustments: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getAdaptivePath('apath-1', { includeAdjustments: true });
      expect(result).toBeDefined();
    });

    it('should include personalization settings', async () => {
      mockSupabase.data = { id: 'apath-1', personalization: { pacing: 'self' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getAdaptivePath('apath-1', { includePersonalization: true });
      expect(result).toBeDefined();
    });

    it('include learning style data', async () => {
      mockSupabase.data = { id: 'apath-1', learning_style: 'visual' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getAdaptivePath('apath-1', { includeLearningStyle: true });
      expect(result).toBeDefined();
    });
  });

  describe('createAdaptivePath', () => {
    it('should create a new adaptive path', async () => {
      mockSupabase.data = { id: 'apath-new', title: 'New Adaptive Path' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAdaptivePath({ title: 'New Adaptive Path', school_id: 'school-1' });
      expect(result).toBeDefined();
    });

    it('should reject creation with empty title', async () => {
      await expect(service.createAdaptivePath({ title: '' })).rejects.toThrow();
    });

    it('should set default status to draft', async () => {
      mockSupabase.data = { id: 'apath-new', status: 'draft' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAdaptivePath({ title: 'Path' });
      expect(result).toHaveProperty('status', 'draft');
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'apath-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAdaptivePath({ title: 'Path' });
      expect(result).toHaveProperty('created_at');
    });

    it('should handle creation with rules', async () => {
      mockSupabase.data = { id: 'apath-new', rules: [{ condition: 'score < 70', action: 'remediate' }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAdaptivePath({ title: 'Path', rules: [{ condition: 'score < 70', action: 'remediate' }] });
      expect(result).toBeDefined();
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createAdaptivePath({ title: 'Path' })).rejects.toThrow();
    });

    it('should handle creation with tags', async () => {
      mockSupabase.data = { id: 'apath-new', tags: ['adaptive'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAdaptivePath({ title: 'Path', tags: ['adaptive'] });
      expect(result).toBeDefined();
    });

    it('should handle creation with personalization', async () => {
      mockSupabase.data = { id: 'apath-new', personalization: { pacing: 'self' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAdaptivePath({ title: 'Path', personalization: { pacing: 'self' } });
      expect(result).toBeDefined();
    });

    it('should handle creation with author', async () => {
      mockSupabase.data = { id: 'apath-new', author_id: 'user-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAdaptivePath({ title: 'Path', author_id: 'user-1' });
      expect(result).toBeDefined();
    });

    it('should handle creation with description', async () => {
      mockSupabase.data = { id: 'apath-new', description: 'An adaptive journey' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createAdaptivePath({ title: 'Path', description: 'An adaptive journey' });
      expect(result).toBeDefined();
    });
  });

  describe('updateAdaptivePath', () => {
    it('should update adaptive path fields', async () => {
      mockSupabase.data = { id: 'apath-1', title: 'Updated Path' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAdaptivePath('apath-1', { title: 'Updated Path' });
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'apath-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAdaptivePath('apath-1', { title: 'X' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updateAdaptivePath('apath-1', {})).rejects.toThrow();
    });

    it('should handle non-existent path', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateAdaptivePath('nonexistent', { title: 'X' });
      expect(result).toBeNull();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateAdaptivePath('apath-1', { title: 'X' })).rejects.toThrow();
    });

    it('should update rules', async () => {
      mockSupabase.data = { id: 'apath-1', rules: [{ condition: 'score < 60', action: 'remediate' }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAdaptivePath('apath-1', { rules: [{ condition: 'score < 60', action: 'remediate' }] });
      expect(result).toBeDefined();
    });

    it('should update personalization', async () => {
      mockSupabase.data = { id: 'apath-1', personalization: { pacing: 'instructor' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAdaptivePath('apath-1', { personalization: { pacing: 'instructor' } });
      expect(result).toBeDefined();
    });

    it('should update tags', async () => {
      mockSupabase.data = { id: 'apath-1', tags: ['new_tag'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAdaptivePath('apath-1', { tags: ['new_tag'] });
      expect(result).toBeDefined();
    });

    it('should update visibility', async () => {
      mockSupabase.data = { id: 'apath-1', visibility: 'private' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAdaptivePath('apath-1', { visibility: 'private' });
      expect(result).toBeDefined();
    });

    it('should update description', async () => {
      mockSupabase.data = { id: 'apath-1', description: 'Updated desc' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateAdaptivePath('apath-1', { description: 'Updated desc' });
      expect(result).toBeDefined();
    });
  });

  describe('deleteAdaptivePath', () => {
    it('should delete an adaptive path', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteAdaptivePath('apath-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle non-existent path deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteAdaptivePath('nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteAdaptivePath('apath-1')).rejects.toThrow();
    });

    it('should prevent deletion with active learners', async () => {
      mockSupabase.data = { id: 'apath-1', active_learners: 15 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deleteAdaptivePath('apath-1')).rejects.toThrow();
    });

    it('should validate path id', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteAdaptivePath('')).rejects.toThrow();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deleteAdaptivePath('apath-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should cascade delete related data', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteAdaptivePath('apath-1', { cascade: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should preserve path data on soft delete', async () => {
      mockSupabase.data = { id: 'apath-1', deleted_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.deleteAdaptivePath('apath-1');
      expect(result).toBeDefined();
    });
  });

  describe('adjustPath', () => {
    it('should adjust path based on learner performance', async () => {
      mockSupabase.data = { id: 'adj-1', path_id: 'apath-1', adjustment_type: 'difficulty' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.adjustPath('apath-1', 'student-1', { type: 'difficulty', value: 'easier' });
      expect(result).toBeDefined();
    });

    it('should validate path id', async () => {
      await expect(service.adjustPath('', 'student-1', { type: 'difficulty', value: 'easier' })).rejects.toThrow();
    });

    it('should validate student id', async () => {
      await expect(service.adjustPath('apath-1', '', { type: 'difficulty', value: 'easier' })).rejects.toThrow();
    });

    it('should handle database errors during adjustment', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'adjust failed' } });
      await expect(service.adjustPath('apath-1', 'student-1', { type: 'difficulty', value: 'easier' })).rejects.toThrow();
    });

    it('should record adjustment timestamp', async () => {
      mockSupabase.data = { id: 'adj-1', adjusted_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.adjustPath('apath-1', 'student-1', { type: 'pace', value: 'slower' });
      expect(result).toHaveProperty('adjusted_at');
    });

    it('should handle pace adjustment', async () => {
      mockSupabase.data = { id: 'adj-1', adjustment_type: 'pace' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.adjustPath('apath-1', 'student-1', { type: 'pace', value: 'slower' });
      expect(result).toBeDefined();
    });

    it('should handle content adjustment', async () => {
      mockSupabase.data = { id: 'adj-1', adjustment_type: 'content' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.adjustPath('apath-1', 'student-1', { type: 'content', value: 'add_examples' });
      expect(result).toBeDefined();
    });

    it('should handle style adjustment', async () => {
      mockSupabase.data = { id: 'adj-1', adjustment_type: 'style' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.adjustPath('apath-1', 'student-1', { type: 'style', value: 'visual' });
      expect(result).toBeDefined();
    });

    it('should handle non-existent path', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.adjustPath('nonexistent', 'student-1', { type: 'difficulty', value: 'easier' });
      expect(result).toBeNull();
    });

    it('should track adjustment reason', async () => {
      mockSupabase.data = { id: 'adj-1', reason: 'Low quiz scores' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.adjustPath('apath-1', 'student-1', { type: 'difficulty', value: 'easier', reason: 'Low quiz scores' });
      expect(result).toBeDefined();
    });
  });

  describe('getPersonalization', () => {
    it('should return personalization settings for learner', async () => {
      mockSupabase.data = { pacing: 'self', style: 'visual', difficulty: 'intermediate' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPersonalization('apath-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should return default settings for new learner', async () => {
      mockSupabase.data = { pacing: 'self', style: 'mixed', difficulty: 'auto' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPersonalization('apath-1', 'student-1');
      expect(result).toHaveProperty('pacing');
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getPersonalization('apath-1', 'student-1')).rejects.toThrow();
    });

    it('should validate required parameters', async () => {
      await expect(service.getPersonalization('', 'student-1')).rejects.toThrow();
    });

    it('should return null for non-existent student', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getPersonalization('apath-1', 'nonexistent');
      expect(result).toBeNull();
    });

    it('should include learning preferences', async () => {
      mockSupabase.data = { preferences: { video: true, text: false } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPersonalization('apath-1', 'student-1');
      expect(result).toHaveProperty('preferences');
    });

    it('should include accessibility settings', async () => {
      mockSupabase.data = { accessibility: { captions: true, highContrast: false } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPersonalization('apath-1', 'student-1');
      expect(result).toHaveProperty('accessibility');
    });

    it('should include notification preferences', async () => {
      mockSupabase.data = { notifications: { email: true, push: false } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getPersonalization('apath-1', 'student-1');
      expect(result).toHaveProperty('notifications');
    });
  });

  describe('updatePersonalization', () => {
    it('should update personalization settings', async () => {
      mockSupabase.data = { id: 'p-1', pacing: 'instructor' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updatePersonalization('apath-1', 'student-1', { pacing: 'instructor' });
      expect(result).toBeDefined();
    });

    it('should reject empty updates', async () => {
      await expect(service.updatePersonalization('apath-1', 'student-1', {})).rejects.toThrow();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'p-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updatePersonalization('apath-1', 'student-1', { pacing: 'self' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updatePersonalization('apath-1', 'student-1', { pacing: 'self' })).rejects.toThrow();
    });

    it('should validate required parameters', async () => {
      await expect(service.updatePersonalization('', 'student-1', { pacing: 'self' })).rejects.toThrow();
    });

    it('should handle non-existent path', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updatePersonalization('nonexistent', 'student-1', { pacing: 'self' });
      expect(result).toBeNull();
    });

    it('should update learning style', async () => {
      mockSupabase.data = { id: 'p-1', style: 'kinesthetic' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updatePersonalization('apath-1', 'student-1', { style: 'kinesthetic' });
      expect(result).toBeDefined();
    });

    it('should update difficulty level', async () => {
      mockSupabase.data = { id: 'p-1', difficulty: 'advanced' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updatePersonalization('apath-1', 'student-1', { difficulty: 'advanced' });
      expect(result).toBeDefined();
    });
  });
});
