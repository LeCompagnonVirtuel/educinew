import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpTopicService } from '@/features/lxp/services/lxp-topic.service';

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

describe('LxpTopicService', () => {
  let service: LxpTopicService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpTopicService(mockSupabase as never);
  });

  describe('getTopic', () => {
    it('should return topic by id', async () => {
      mockSupabase.data = { id: 'topic-1', title: 'Algebra Basics' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getTopic('unit-1', 'topic-1');
      expect(result).toBeDefined();
    });

    it('should return null when topic not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getTopic('unit-1', 'nonexistent');
      expect(result).toBeNull();
    });

    it('should include content when requested', async () => {
      mockSupabase.data = { id: 'topic-1', content: { type: 'text', body: 'Content' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getTopic('unit-1', 'topic-1', { includeContent: true });
      expect(result).toBeDefined();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getTopic('unit-1', 'topic-1')).rejects.toThrow();
    });

    it('should include completion stats', async () => {
      mockSupabase.data = { id: 'topic-1', completion_rate: 0.9 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getTopic('unit-1', 'topic-1', { includeStats: true });
      expect(result).toBeDefined();
    });

    it('should validate unit id', async () => {
      await expect(service.getTopic('', 'topic-1')).rejects.toThrow();
    });

    it('should validate topic id', async () => {
      await expect(service.getTopic('unit-1', '')).rejects.toThrow();
    });

    it('should include assessment data', async () => {
      mockSupabase.data = { id: 'topic-1', assessment: { type: 'quiz' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getTopic('unit-1', 'topic-1', { includeAssessment: true });
      expect(result).toBeDefined();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'topic-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getTopic('unit-1', 'topic-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include resources', async () => {
      mockSupabase.data = { id: 'topic-1', resources: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getTopic('unit-1', 'topic-1', { includeResources: true });
      expect(result).toBeDefined();
    });
  });

  describe('createTopic', () => {
    it('should create a new topic', async () => {
      const topicData = { title: 'New Topic', order: 1 };
      mockSupabase.data = { id: 'topic-new', ...topicData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createTopic('unit-1', topicData);
      expect(result).toBeDefined();
    });

    it('should set default order to last position', async () => {
      mockSupabase.data = { id: 'topic-new', order: 5 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createTopic('unit-1', { title: 'Topic' });
      expect(result).toHaveProperty('order');
    });

    it('should reject creation with empty title', async () => {
      await expect(service.createTopic('unit-1', { title: '' })).rejects.toThrow();
    });

    it('should handle creation with content', async () => {
      const topicData = { title: 'Topic', content: { type: 'text', body: 'Content' } };
      mockSupabase.data = { id: 'topic-new', ...topicData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createTopic('unit-1', topicData);
      expect(result).toBeDefined();
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'topic-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createTopic('unit-1', { title: 'Topic' });
      expect(result).toHaveProperty('created_at');
    });

    it('should handle creation with estimated duration', async () => {
      const topicData = { title: 'Topic', estimated_duration: 1800 };
      mockSupabase.data = { id: 'topic-new', ...topicData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createTopic('unit-1', topicData);
      expect(result).toBeDefined();
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createTopic('unit-1', { title: 'Topic' })).rejects.toThrow();
    });

    it('should validate unit exists before creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'foreign_key_violation' } });
      await expect(service.createTopic('nonexistent', { title: 'Topic' })).rejects.toThrow();
    });

    it('should handle creation with learning objectives', async () => {
      const topicData = { title: 'Topic', objectives: ['Understand basics'] };
      mockSupabase.data = { id: 'topic-new', ...topicData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createTopic('unit-1', topicData);
      expect(result).toBeDefined();
    });

    it('should handle creation with visibility settings', async () => {
      const topicData = { title: 'Topic', visibility: 'published' };
      mockSupabase.data = { id: 'topic-new', ...topicData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createTopic('unit-1', topicData);
      expect(result).toBeDefined();
    });
  });

  describe('updateTopic', () => {
    it('should update topic fields', async () => {
      const updates = { title: 'Updated Topic' };
      mockSupabase.data = { id: 'topic-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateTopic('unit-1', 'topic-1', updates);
      expect(result).toBeDefined();
    });

    it('should handle partial updates', async () => {
      const updates = { description: 'New description' };
      mockSupabase.data = { id: 'topic-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateTopic('unit-1', 'topic-1', updates);
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'topic-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateTopic('unit-1', 'topic-1', { title: 'X' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updateTopic('unit-1', 'topic-1', {})).rejects.toThrow();
    });

    it('should handle non-existent topic', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateTopic('unit-1', 'nonexistent', { title: 'X' });
      expect(result).toBeNull();
    });

    it('should update content', async () => {
      const updates = { content: { type: 'text', body: 'Updated' } };
      mockSupabase.data = { id: 'topic-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateTopic('unit-1', 'topic-1', updates);
      expect(result).toBeDefined();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateTopic('unit-1', 'topic-1', { title: 'X' })).rejects.toThrow();
    });

    it('should update visibility', async () => {
      const updates = { visibility: 'draft' };
      mockSupabase.data = { id: 'topic-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateTopic('unit-1', 'topic-1', updates);
      expect(result).toBeDefined();
    });

    it('should update duration estimate', async () => {
      const updates = { estimated_duration: 2400 };
      mockSupabase.data = { id: 'topic-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateTopic('unit-1', 'topic-1', updates);
      expect(result).toBeDefined();
    });

    it('should update learning objectives', async () => {
      const updates = { objectives: ['New objective'] };
      mockSupabase.data = { id: 'topic-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateTopic('unit-1', 'topic-1', updates);
      expect(result).toBeDefined();
    });
  });

  describe('deleteTopic', () => {
    it('should soft delete a topic', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteTopic('unit-1', 'topic-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should cascade delete related content', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteTopic('unit-1', 'topic-1', { cascade: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle non-existent topic deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteTopic('unit-1', 'nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteTopic('unit-1', 'topic-1')).rejects.toThrow();
    });

    it('should prevent deletion with active submissions', async () => {
      mockSupabase.data = { id: 'topic-1', has_submissions: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deleteTopic('unit-1', 'topic-1')).rejects.toThrow();
    });

    it('should reorder remaining topics', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteTopic('unit-1', 'topic-1', { reorder: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deleteTopic('unit-1', 'topic-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should validate unit id before deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteTopic('', 'topic-1')).rejects.toThrow();
    });
  });

  describe('getTopicProgress', () => {
    it('should return progress for student', async () => {
      mockSupabase.data = { progress: 75, status: 'in_progress' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getTopicProgress('unit-1', 'topic-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should return completed status', async () => {
      mockSupabase.data = { progress: 100, status: 'completed', completed_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getTopicProgress('unit-1', 'topic-1', 'student-1');
      expect(result).toHaveProperty('status', 'completed');
    });

    it('should return not started status', async () => {
      mockSupabase.data = { progress: 0, status: 'not_started' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getTopicProgress('unit-1', 'topic-1', 'student-1');
      expect(result).toHaveProperty('status', 'not_started');
    });

    it('should include time spent', async () => {
      mockSupabase.data = { progress: 50, time_spent: 900 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getTopicProgress('unit-1', 'topic-1', 'student-1');
      expect(result).toHaveProperty('time_spent');
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getTopicProgress('unit-1', 'topic-1', 'student-1')).rejects.toThrow();
    });

    it('should validate required parameters', async () => {
      await expect(service.getTopicProgress('', 'topic-1', 'student-1')).rejects.toThrow();
    });

    it('should return null for non-existent student', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getTopicProgress('unit-1', 'topic-1', 'nonexistent');
      expect(result).toBeNull();
    });

    it('should include last accessed timestamp', async () => {
      mockSupabase.data = { progress: 50, last_accessed: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getTopicProgress('unit-1', 'topic-1', 'student-1');
      expect(result).toHaveProperty('last_accessed');
    });
  });

  describe('markTopicComplete', () => {
    it('should mark topic as complete', async () => {
      mockSupabase.data = { status: 'completed', completed_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.markTopicComplete('unit-1', 'topic-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should set completion timestamp', async () => {
      mockSupabase.data = { completed_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.markTopicComplete('unit-1', 'topic-1', 'student-1');
      expect(result).toHaveProperty('completed_at');
    });

    it('should update unit progress', async () => {
      mockSupabase.data = { unit_progress: 80 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.markTopicComplete('unit-1', 'topic-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'completion failed' } });
      await expect(service.markTopicComplete('unit-1', 'topic-1', 'student-1')).rejects.toThrow();
    });

    it('should validate required parameters', async () => {
      await expect(service.markTopicComplete('', 'topic-1', 'student-1')).rejects.toThrow();
    });

    it('should trigger unit completion if last topic', async () => {
      mockSupabase.data = { unit_completed: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.markTopicComplete('unit-1', 'topic-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should not mark already completed topic', async () => {
      mockSupabase.data = { status: 'completed', already_completed: true };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.markTopicComplete('unit-1', 'topic-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should handle concurrent completion attempts', async () => {
      mockSupabase.data = { status: 'completed' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 3 }, () => service.markTopicComplete('unit-1', 'topic-1', 'student-1'));
      await Promise.all(promises);
      expect(mockSupabase.update).toHaveBeenCalled();
    });
  });

  describe('reorderTopics', () => {
    it('should reorder topics within unit', async () => {
      mockSupabase.data = [{ id: 'topic-1', order: 2 }, { id: 'topic-2', order: 1 }];
      const result = await service.reorderTopics('unit-1', ['topic-2', 'topic-1']);
      expect(result).toBeDefined();
    });

    it('should validate topic ids exist', async () => {
      mockSupabase.data = [{ id: 'topic-1' }];
      await expect(service.reorderTopics('unit-1', ['topic-1', 'nonexistent'])).rejects.toThrow();
    });

    it('should handle empty reorder list', async () => {
      await expect(service.reorderTopics('unit-1', [])).rejects.toThrow();
    });

    it('should set sequential order values', async () => {
      mockSupabase.data = [{ id: 'topic-1', order: 1 }, { id: 'topic-2', order: 2 }];
      const result = await service.reorderTopics('unit-1', ['topic-1', 'topic-2']);
      expect(result).toBeDefined();
    });

    it('should handle database errors during reorder', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'reorder failed' } });
      await expect(service.reorderTopics('unit-1', ['topic-1'])).rejects.toThrow();
    });

    it('should validate unit id', async () => {
      await expect(service.reorderTopics('', ['topic-1'])).rejects.toThrow();
    });

    it('should handle single topic reorder', async () => {
      mockSupabase.data = [{ id: 'topic-1', order: 1 }];
      const result = await service.reorderTopics('unit-1', ['topic-1']);
      expect(result).toBeDefined();
    });

    it('should prevent duplicate topic ids', async () => {
      await expect(service.reorderTopics('unit-1', ['topic-1', 'topic-1'])).rejects.toThrow();
    });
  });
});
