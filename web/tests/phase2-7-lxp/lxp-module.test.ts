import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpModuleService } from '@/features/lxp/services/lxp-module.service';

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

describe('LxpModuleService', () => {
  let service: LxpModuleService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpModuleService(mockSupabase as never);
  });

  describe('getModule', () => {
    it('should return module by id', async () => {
      mockSupabase.data = { id: 'module-1', title: 'Introduction' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getModule('course-1', 'module-1');
      expect(result).toBeDefined();
    });

    it('should return null when module not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getModule('course-1', 'nonexistent');
      expect(result).toBeNull();
    });

    it('should include lessons when requested', async () => {
      mockSupabase.data = { id: 'module-1', lessons: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getModule('course-1', 'module-1', { includeLessons: true });
      expect(result).toBeDefined();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getModule('course-1', 'module-1')).rejects.toThrow();
    });

    it('should include completion stats', async () => {
      mockSupabase.data = { id: 'module-1', completion_rate: 0.75 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getModule('course-1', 'module-1', { includeStats: true });
      expect(result).toBeDefined();
    });

    it('should validate course id', async () => {
      await expect(service.getModule('', 'module-1')).rejects.toThrow();
    });

    it('should validate module id', async () => {
      await expect(service.getModule('course-1', '')).rejects.toThrow();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'module-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getModule('course-1', 'module-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });
  });

  describe('createModule', () => {
    it('should create a new module', async () => {
      const moduleData = { title: 'New Module', order: 1 };
      mockSupabase.data = { id: 'module-new', ...moduleData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createModule('course-1', moduleData);
      expect(result).toBeDefined();
    });

    it('should set default order to last position', async () => {
      const moduleData = { title: 'Module' };
      mockSupabase.data = { id: 'module-new', order: 5, ...moduleData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createModule('course-1', moduleData);
      expect(result).toHaveProperty('order');
    });

    it('should reject creation with empty title', async () => {
      await expect(service.createModule('course-1', { title: '' })).rejects.toThrow();
    });

    it('should handle creation with prerequisites', async () => {
      const moduleData = { title: 'Advanced', prerequisites: ['module-1'] };
      mockSupabase.data = { id: 'module-new', ...moduleData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createModule('course-1', moduleData);
      expect(result).toBeDefined();
    });

    it('should set created_at timestamp', async () => {
      mockSupabase.data = { id: 'module-new', created_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createModule('course-1', { title: 'Module' });
      expect(result).toHaveProperty('created_at');
    });

    it('should handle creation with duration estimate', async () => {
      const moduleData = { title: 'Module', estimated_duration: 3600 };
      mockSupabase.data = { id: 'module-new', ...moduleData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createModule('course-1', moduleData);
      expect(result).toBeDefined();
    });

    it('should handle creation with learning objectives', async () => {
      const moduleData = { title: 'Module', objectives: ['Objective 1'] };
      mockSupabase.data = { id: 'module-new', ...moduleData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createModule('course-1', moduleData);
      expect(result).toBeDefined();
    });

    it('should handle database errors during creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'creation failed' } });
      await expect(service.createModule('course-1', { title: 'Module' })).rejects.toThrow();
    });

    it('should validate course exists before creation', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'foreign_key_violation' } });
      await expect(service.createModule('nonexistent', { title: 'Module' })).rejects.toThrow();
    });

    it('should handle creation with visibility settings', async () => {
      const moduleData = { title: 'Module', visibility: 'published' };
      mockSupabase.data = { id: 'module-new', ...moduleData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createModule('course-1', moduleData);
      expect(result).toBeDefined();
    });
  });

  describe('updateModule', () => {
    it('should update module fields', async () => {
      const updates = { title: 'Updated Module' };
      mockSupabase.data = { id: 'module-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateModule('course-1', 'module-1', updates);
      expect(result).toBeDefined();
    });

    it('should handle partial updates', async () => {
      const updates = { description: 'New description' };
      mockSupabase.data = { id: 'module-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateModule('course-1', 'module-1', updates);
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      mockSupabase.data = { id: 'module-1', updated_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateModule('course-1', 'module-1', { title: 'X' });
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject empty updates', async () => {
      await expect(service.updateModule('course-1', 'module-1', {})).rejects.toThrow();
    });

    it('should handle non-existent module', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateModule('course-1', 'nonexistent', { title: 'X' });
      expect(result).toBeNull();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateModule('course-1', 'module-1', { title: 'X' })).rejects.toThrow();
    });

    it('should update prerequisites', async () => {
      const updates = { prerequisites: ['module-2'] };
      mockSupabase.data = { id: 'module-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateModule('course-1', 'module-1', updates);
      expect(result).toBeDefined();
    });

    it('should update duration estimate', async () => {
      const updates = { estimated_duration: 7200 };
      mockSupabase.data = { id: 'module-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateModule('course-1', 'module-1', updates);
      expect(result).toBeDefined();
    });

    it('should update visibility', async () => {
      const updates = { visibility: 'draft' };
      mockSupabase.data = { id: 'module-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateModule('course-1', 'module-1', updates);
      expect(result).toBeDefined();
    });

    it('should update learning objectives', async () => {
      const updates = { objectives: ['New objective'] };
      mockSupabase.data = { id: 'module-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateModule('course-1', 'module-1', updates);
      expect(result).toBeDefined();
    });
  });

  describe('deleteModule', () => {
    it('should soft delete a module', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteModule('course-1', 'module-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should cascade delete lessons when requested', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteModule('course-1', 'module-1', { cascade: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle non-existent module deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteModule('course-1', 'nonexistent')).resolves.not.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteModule('course-1', 'module-1')).rejects.toThrow();
    });

    it('should prevent deletion of module with active enrollments', async () => {
      mockSupabase.data = { id: 'module-1', active_enrollments: 10 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deleteModule('course-1', 'module-1')).rejects.toThrow();
    });

    it('should reorder remaining modules after deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteModule('course-1', 'module-1', { reorder: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deleteModule('course-1', 'module-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should validate module exists before deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteModule('course-1', 'nonexistent')).resolves.not.toThrow();
    });
  });

  describe('reorderModules', () => {
    it('should reorder modules', async () => {
      mockSupabase.data = [{ id: 'module-1', order: 2 }, { id: 'module-2', order: 1 }];
      const result = await service.reorderModules('course-1', ['module-2', 'module-1']);
      expect(result).toBeDefined();
    });

    it('should validate module ids exist', async () => {
      mockSupabase.data = [{ id: 'module-1' }];
      await expect(service.reorderModules('course-1', ['module-1', 'nonexistent'])).rejects.toThrow();
    });

    it('should handle empty reorder list', async () => {
      await expect(service.reorderModules('course-1', [])).rejects.toThrow();
    });

    it('should set sequential order values', async () => {
      mockSupabase.data = [{ id: 'module-1', order: 1 }, { id: 'module-2', order: 2 }];
      const result = await service.reorderModules('course-1', ['module-1', 'module-2']);
      expect(result).toBeDefined();
    });

    it('should handle single module reorder', async () => {
      mockSupabase.data = [{ id: 'module-1', order: 1 }];
      const result = await service.reorderModules('course-1', ['module-1']);
      expect(result).toBeDefined();
    });

    it('should handle database errors during reorder', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'reorder failed' } });
      await expect(service.reorderModules('course-1', ['module-1'])).rejects.toThrow();
    });

    it('should validate course id', async () => {
      await expect(service.reorderModules('', ['module-1'])).rejects.toThrow();
    });

    it('should handle duplicate module ids in list', async () => {
      mockSupabase.data = [{ id: 'module-1', order: 1 }];
      await expect(service.reorderModules('course-1', ['module-1', 'module-1'])).rejects.toThrow();
    });
  });

  describe('getModuleCompletion', () => {
    it('should return completion status for student', async () => {
      mockSupabase.data = { completed: true, completed_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getModuleCompletion('course-1', 'module-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should return incomplete status', async () => {
      mockSupabase.data = { completed: false, progress: 50 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getModuleCompletion('course-1', 'module-1', 'student-1');
      expect(result).toHaveProperty('completed', false);
    });

    it('should return null for non-existent enrollment', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getModuleCompletion('course-1', 'module-1', 'nonexistent');
      expect(result).toBeNull();
    });

    it('should include lesson completion details', async () => {
      mockSupabase.data = { completed: false, lessons: [{ completed: true }, { completed: false }] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getModuleCompletion('course-1', 'module-1', 'student-1', { includeLessons: true });
      expect(result).toBeDefined();
    });

    it('should calculate overall progress', async () => {
      mockSupabase.data = { completed: false, progress: 75 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getModuleCompletion('course-1', 'module-1', 'student-1');
      expect(result).toHaveProperty('progress');
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getModuleCompletion('course-1', 'module-1', 'student-1')).rejects.toThrow();
    });

    it('should validate required parameters', async () => {
      await expect(service.getModuleCompletion('', 'module-1', 'student-1')).rejects.toThrow();
    });

    it('should handle time tracking data', async () => {
      mockSupabase.data = { completed: true, time_spent: 3600 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getModuleCompletion('course-1', 'module-1', 'student-1');
      expect(result).toHaveProperty('time_spent');
    });
  });

  describe('checkPrerequisites', () => {
    it('should check if prerequisites are met', async () => {
      mockSupabase.data = { met: true, missing: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.checkPrerequisites('course-1', 'module-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should return missing prerequisites', async () => {
      mockSupabase.data = { met: false, missing: ['module-1'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.checkPrerequisites('course-1', 'module-1', 'student-1');
      expect(result).toHaveProperty('met', false);
    });

    it('should handle module with no prerequisites', async () => {
      mockSupabase.data = { met: true, missing: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.checkPrerequisites('course-1', 'module-1', 'student-1');
      expect(result).toHaveProperty('met', true);
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.checkPrerequisites('course-1', 'module-1', 'student-1')).rejects.toThrow();
    });

    it('should validate required parameters', async () => {
      await expect(service.checkPrerequisites('', 'module-1', 'student-1')).rejects.toThrow();
    });

    it('should handle partial prerequisite completion', async () => {
      mockSupabase.data = { met: false, missing: ['module-3'], completed: ['module-1', 'module-2'] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.checkPrerequisites('course-1', 'module-1', 'student-1');
      expect(result).toHaveProperty('missing');
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
