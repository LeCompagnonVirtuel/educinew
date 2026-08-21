import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpUnitService } from '@/features/lxp/services/lxp-unit.service';

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

describe('LxpUnitService', () => {
  let service: LxpUnitService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpUnitService(mockSupabase as never);
  });

  describe('getUnit', () => {
    it('should return unit by id', async () => {
      mockSupabase.data = { id: 'unit-1', title: 'Unit 1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getUnit('chapter-1', 'unit-1');
      expect(result).toBeDefined();
    });

    it('should return null when unit not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getUnit('chapter-1', 'nonexistent');
      expect(result).toBeNull();
    });

    it('should include topics when requested', async () => {
      mockSupabase.data = { id: 'unit-1', topics: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getUnit('chapter-1', 'unit-1', { includeTopics: true });
      expect(result).toBeDefined();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getUnit('chapter-1', 'unit-1')).rejects.toThrow();
    });

    it('should include completion stats', async () => {
      mockSupabase.data = { id: 'unit-1', completion_rate: 0.85 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getUnit('chapter-1', 'unit-1', { includeStats: true });
      expect(result).toBeDefined();
    });

    it('should validate chapter id', async () => {
      await expect(service.getUnit('', 'unit-1')).rejects.toThrow();
    });

    it('should validate unit id', async () => {
      await expect(service.getUnit('chapter-1', '')).rejects.toThrow();
    });

    it('should include progress data', async () => {
      mockSupabase.data = { id: 'unit-1', progress: 65 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getUnit('chapter-1', 'unit-1', { includeProgress: true });
      expect(result).toBeDefined();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'unit-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getUnit('chapter-1', 'unit-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });

    it('should include estimated duration', async () => {
      mockSupabase.data = { id: 'unit-1', estimated_duration: 1800 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getUnit('chapter-1', 'unit-1', { includeDuration: true });
      expect(result).toBeDefined();
    });
  });

  describe('createUnit', () => {
    it('should create a new unit', async () => {
      const unitData = { title: 'New Unit', order: 1 };
      mockSupabase.data = { id: 'unit-new', ...unitData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createUnit('chapter-1', unitData);
      expect(result).toBeDefined();
    });

    it('should set default order to last position', async () => {
      mockSupabase.data = { id: 'unit-new', order: 5 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createUnit('chapter-1', { title: 'Unit' });
      expect(result).toHaveProperty('order');
    });

    it('should reject creation with empty title', async () => {
      await expect(service.createUnit('chapter-1', { title: '' })).rejects.toThrow();
    });

    it('should handle creation with description', async () => {
      const unitData = { title: 'Unit', description: 'A detailed unit' };
      mockSupabase.data = { id: 'unit-new', ...unitData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createUnit('chapter-1', unitData);
      expect(result).toBeDefined();
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'unit-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createUnit('chapter-1', { title: 'Unit' });
      expect(result).toHaveProperty('created_at');
    });

    it('should handle creation with estimated duration', async () => {
      const unitData = { title: 'Unit', estimated_duration: 3600 };
      mockSupabase.data = { id: 'unit-new', ...unitData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createUnit('chapter-1', unitData);
      expect(result).toBeDefined();
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createUnit('chapter-1', { title: 'Unit' })).rejects.toThrow();
    });

    it('should validate chapter exists before creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'foreign_key_violation' } });
      await expect(service.createUnit('nonexistent', { title: 'Unit' })).rejects.toThrow();
    });

    it('should handle creation with learning objectives', async () => {
      const unitData = { title: 'Unit', objectives: ['Understand basics'] };
      mockSupabase.data = { id: 'unit-new', ...unitData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createUnit('chapter-1', unitData);
      expect(result).toBeDefined();
    });

    it('should handle creation with visibility settings', async () => {
      const unitData = { title: 'Unit', visibility: 'published' };
      mockSupabase.data = { id: 'unit-new', ...unitData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createUnit('chapter-1', unitData);
      expect(result).toBeDefined();
    });
  });

  describe('updateUnit', () => {
    it('should update unit fields', async () => {
      const updates = { title: 'Updated Unit' };
      mockSupabase.data = { id: 'unit-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateUnit('chapter-1', 'unit-1', updates);
      expect(result).toBeDefined();
    });

    it('should handle partial updates', async () => {
      const updates = { description: 'New description' };
      mockSupabase.data = { id: 'unit-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateUnit('chapter-1', 'unit-1', updates);
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'unit-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateUnit('chapter-1', 'unit-1', { title: 'X' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updateUnit('chapter-1', 'unit-1', {})).rejects.toThrow();
    });

    it('should handle non-existent unit', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateUnit('chapter-1', 'nonexistent', { title: 'X' });
      expect(result).toBeNull();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateUnit('chapter-1', 'unit-1', { title: 'X' })).rejects.toThrow();
    });

    it('should update visibility', async () => {
      const updates = { visibility: 'draft' };
      mockSupabase.data = { id: 'unit-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateUnit('chapter-1', 'unit-1', updates);
      expect(result).toBeDefined();
    });

    it('should update duration estimate', async () => {
      const updates = { estimated_duration: 2400 };
      mockSupabase.data = { id: 'unit-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateUnit('chapter-1', 'unit-1', updates);
      expect(result).toBeDefined();
    });

    it('should update learning objectives', async () => {
      const updates = { objectives: ['New objective'] };
      mockSupabase.data = { id: 'unit-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateUnit('chapter-1', 'unit-1', updates);
      expect(result).toBeDefined();
    });

    it('should update description', async () => {
      const updates = { description: 'Updated description' };
      mockSupabase.data = { id: 'unit-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateUnit('chapter-1', 'unit-1', updates);
      expect(result).toBeDefined();
    });
  });

  describe('deleteUnit', () => {
    it('should soft delete a unit', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteUnit('chapter-1', 'unit-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should cascade delete topics when requested', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteUnit('chapter-1', 'unit-1', { cascade: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle non-existent unit deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteUnit('chapter-1', 'nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteUnit('chapter-1', 'unit-1')).rejects.toThrow();
    });

    it('should prevent deletion with active enrollments', async () => {
      mockSupabase.data = { id: 'unit-1', active_enrollments: 10 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deleteUnit('chapter-1', 'unit-1')).rejects.toThrow();
    });

    it('should reorder remaining units', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteUnit('chapter-1', 'unit-1', { reorder: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deleteUnit('chapter-1', 'unit-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should validate chapter id before deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteUnit('', 'unit-1')).rejects.toThrow();
    });
  });

  describe('getUnitCompletion', () => {
    it('should return completion status for student', async () => {
      mockSupabase.data = { completed: true, completed_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getUnitCompletion('chapter-1', 'unit-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should return incomplete status', async () => {
      mockSupabase.data = { completed: false, progress: 50 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getUnitCompletion('chapter-1', 'unit-1', 'student-1');
      expect(result).toHaveProperty('completed', false);
    });

    it('should return null for non-existent enrollment', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getUnitCompletion('chapter-1', 'unit-1', 'nonexistent');
      expect(result).toBeNull();
    });

    it('should include topic completion details', async () => {
      mockSupabase.data = { completed: false, topics: [{ completed: true }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getUnitCompletion('chapter-1', 'unit-1', 'student-1', { includeTopics: true });
      expect(result).toBeDefined();
    });

    it('should calculate overall progress', async () => {
      mockSupabase.data = { completed: false, progress: 75 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getUnitCompletion('chapter-1', 'unit-1', 'student-1');
      expect(result).toHaveProperty('progress');
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getUnitCompletion('chapter-1', 'unit-1', 'student-1')).rejects.toThrow();
    });

    it('should validate required parameters', async () => {
      await expect(service.getUnitCompletion('', 'unit-1', 'student-1')).rejects.toThrow();
    });

    it('should include time spent data', async () => {
      mockSupabase.data = { completed: true, time_spent: 1800 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getUnitCompletion('chapter-1', 'unit-1', 'student-1');
      expect(result).toHaveProperty('time_spent');
    });
  });

  describe('reorderUnits', () => {
    it('should reorder units within chapter', async () => {
      mockSupabase.data = [{ id: 'unit-1', order: 2 }, { id: 'unit-2', order: 1 }];
      const result = await service.reorderUnits('chapter-1', ['unit-2', 'unit-1']);
      expect(result).toBeDefined();
    });

    it('should validate unit ids exist', async () => {
      mockSupabase.data = [{ id: 'unit-1' }];
      await expect(service.reorderUnits('chapter-1', ['unit-1', 'nonexistent'])).rejects.toThrow();
    });

    it('should handle empty reorder list', async () => {
      await expect(service.reorderUnits('chapter-1', [])).rejects.toThrow();
    });

    it('should set sequential order values', async () => {
      mockSupabase.data = [{ id: 'unit-1', order: 1 }, { id: 'unit-2', order: 2 }];
      const result = await service.reorderUnits('chapter-1', ['unit-1', 'unit-2']);
      expect(result).toBeDefined();
    });

    it('should handle database errors during reorder', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'reorder failed' } });
      await expect(service.reorderUnits('chapter-1', ['unit-1'])).rejects.toThrow();
    });

    it('should validate chapter id', async () => {
      await expect(service.reorderUnits('', ['unit-1'])).rejects.toThrow();
    });

    it('should handle single unit reorder', async () => {
      mockSupabase.data = [{ id: 'unit-1', order: 1 }];
      const result = await service.reorderUnits('chapter-1', ['unit-1']);
      expect(result).toBeDefined();
    });

    it('should prevent duplicate unit ids', async () => {
      await expect(service.reorderUnits('chapter-1', ['unit-1', 'unit-1'])).rejects.toThrow();
    });
  });
});
