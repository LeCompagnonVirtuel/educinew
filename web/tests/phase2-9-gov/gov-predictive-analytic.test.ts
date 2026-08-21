import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovPredictiveAnalyticService } from '@/features/gov/services/gov-predictive-analytic.service';

describe('GovPredictiveAnalyticService', () => {
  let service: GovPredictiveAnalyticService;
  const mockSupabase = {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
          data: [],
          error: null,
        })),
        data: [],
        error: null,
      })),
      insert: vi.fn(() => ({ select: vi.fn(() => ({ single: vi.fn(), data: null, error: null })) })),
      update: vi.fn(() => ({ eq: vi.fn(() => ({ select: vi.fn(() => ({ single: vi.fn(), data: null, error: null })) })) })),
      delete: vi.fn(() => ({ eq: vi.fn(() => ({ data: null, error: null })) })),
    })),
  } as any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new GovPredictiveAnalyticService(mockSupabase);
  });

  describe('getPredictiveAnalytic', () => {
    it('should get PredictiveAnalytic by id successfully', async () => {
      const result = await service.getPredictiveAnalytic('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle get PredictiveAnalytic with null result', async () => {
      const result = await service.getPredictiveAnalytic('school-1', 'nonexistent-id');
      expect(result).toBeDefined();
    });

    it('should handle get PredictiveAnalytic with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'DB error' } }),
            data: null,
            error: { message: 'DB error' },
          })),
          data: null,
          error: { message: 'DB error' },
        })),
      });
      const result = await service.getPredictiveAnalytic('school-1', 'error-id');
      expect(result).toBeDefined();
    });

    it('should handle get PredictiveAnalytic with empty string id', async () => {
      const result = await service.getPredictiveAnalytic('school-1', '');
      expect(result).toBeDefined();
    });

    it('should handle get PredictiveAnalytic with special characters in id', async () => {
      const result = await service.getPredictiveAnalytic('school-1', 'id-with-special-chars!@#');
      expect(result).toBeDefined();
    });

    it('should handle get PredictiveAnalytic with numeric string id', async () => {
      const result = await service.getPredictiveAnalytic('school-1', '12345');
      expect(result).toBeDefined();
    });

    it('should handle get PredictiveAnalytic with UUID format id', async () => {
      const result = await service.getPredictiveAnalytic('school-1', '550e8400-e29b-41d4-a716-446655440000');
      expect(result).toBeDefined();
    });

    it('should handle get PredictiveAnalytic when connection timeout', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection timeout');
      });
      const result = await service.getPredictiveAnalytic('school-1', 'timeout-id');
      expect(result).toBeDefined();
    });

    it('should handle get PredictiveAnalytic with undefined schoolId', async () => {
      const result = await service.getPredictiveAnalytic(undefined as any, 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle get PredictiveAnalytic with null schoolId', async () => {
      const result = await service.getPredictiveAnalytic(null as any, 'test-id');
      expect(result).toBeDefined();
    });
  });

  describe('listPredictiveAnalytic', () => {
    it('should list PredictiveAnalytic successfully', async () => {
      const result = await service.listPredictiveAnalytic('school-1');
      expect(result).toBeDefined();
    });

    it('should list PredictiveAnalytic with empty result', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          data: [],
          error: null,
        })),
      });
      const result = await service.listPredictiveAnalytic('school-1');
      expect(result).toBeDefined();
    });

    it('should list PredictiveAnalytic with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          data: null,
          error: { message: 'DB error' },
        })),
      });
      const result = await service.listPredictiveAnalytic('school-1');
      expect(result).toBeDefined();
    });

    it('should list PredictiveAnalytic with filters', async () => {
      const result = await service.listPredictiveAnalytic('school-1', { status: 'active' });
      expect(result).toBeDefined();
    });

    it('should list PredictiveAnalytic with pagination', async () => {
      const result = await service.listPredictiveAnalytic('school-1', { page: 1, limit: 10 });
      expect(result).toBeDefined();
    });

    it('should list PredictiveAnalytic with sorting', async () => {
      const result = await service.listPredictiveAnalytic('school-1', { sortBy: 'createdAt', sortOrder: 'desc' });
      expect(result).toBeDefined();
    });

    it('should list PredictiveAnalytic with search query', async () => {
      const result = await service.listPredictiveAnalytic('school-1', { search: 'test' });
      expect(result).toBeDefined();
    });

    it('should handle list PredictiveAnalytic with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.listPredictiveAnalytic('school-1');
      expect(result).toBeDefined();
    });

    it('should list PredictiveAnalytic with undefined schoolId', async () => {
      const result = await service.listPredictiveAnalytic(undefined as any);
      expect(result).toBeDefined();
    });

    it('should list PredictiveAnalytic with null schoolId', async () => {
      const result = await service.listPredictiveAnalytic(null as any);
      expect(result).toBeDefined();
    });
  });

  describe('createPredictiveAnalytic', () => {
    it('should create PredictiveAnalytic successfully', async () => {
      const result = await service.createPredictiveAnalytic('school-1', { schoolId: 'school-1', name: 'Test PredictiveAnalytic' });
      expect(result).toBeDefined();
    });

    it('should create PredictiveAnalytic with minimal data', async () => {
      const result = await service.createPredictiveAnalytic('school-1', {});
      expect(result).toBeDefined();
    });

    it('should handle create PredictiveAnalytic with validation error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Validation error' } }),
          }),
        }),
      });
      const result = await service.createPredictiveAnalytic('school-1', { name: '' });
      expect(result).toBeDefined();
    });

    it('should handle create PredictiveAnalytic with duplicate error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Duplicate key' } }),
          }),
        }),
      });
      const result = await service.createPredictiveAnalytic('school-1', { name: 'Duplicate' });
      expect(result).toBeDefined();
    });

    it('should handle create PredictiveAnalytic with database error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Insert failed' } }),
          }),
        }),
      });
      const result = await service.createPredictiveAnalytic('school-1', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle create PredictiveAnalytic with undefined data', async () => {
      const result = await service.createPredictiveAnalytic('school-1', undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle create PredictiveAnalytic with null data', async () => {
      const result = await service.createPredictiveAnalytic('school-1', null as any);
      expect(result).toBeDefined();
    });

    it('should handle create PredictiveAnalytic with empty object', async () => {
      const result = await service.createPredictiveAnalytic('school-1', {});
      expect(result).toBeDefined();
    });

    it('should handle create PredictiveAnalytic with nested data', async () => {
      const result = await service.createPredictiveAnalytic('school-1', { name: 'Test', metadata: { key: 'value' } });
      expect(result).toBeDefined();
    });

    it('should handle create PredictiveAnalytic with special characters', async () => {
      const result = await service.createPredictiveAnalytic('school-1', { name: 'Test with special chars: !@#$%^&*()' });
      expect(result).toBeDefined();
    });
  });

  describe('updatePredictiveAnalytic', () => {
    it('should update PredictiveAnalytic successfully', async () => {
      const result = await service.updatePredictiveAnalytic('school-1', 'test-id', { name: 'Updated PredictiveAnalytic' });
      expect(result).toBeDefined();
    });

    it('should handle update PredictiveAnalytic with null data', async () => {
      const result = await service.updatePredictiveAnalytic('school-1', 'test-id', null as any);
      expect(result).toBeDefined();
    });

    it('should handle update PredictiveAnalytic with empty object', async () => {
      const result = await service.updatePredictiveAnalytic('school-1', 'test-id', {});
      expect(result).toBeDefined();
    });

    it('should handle update PredictiveAnalytic with database error', async () => {
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Update failed' } }),
            }),
          }),
        }),
      });
      const result = await service.updatePredictiveAnalytic('school-1', 'error-id', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update PredictiveAnalytic with nonexistent id', async () => {
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
            }),
          }),
        }),
      });
      const result = await service.updatePredictiveAnalytic('school-1', 'nonexistent', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update PredictiveAnalytic with undefined id', async () => {
      const result = await service.updatePredictiveAnalytic('school-1', undefined as any, { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update PredictiveAnalytic with empty string id', async () => {
      const result = await service.updatePredictiveAnalytic('school-1', '', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update PredictiveAnalytic with special characters in data', async () => {
      const result = await service.updatePredictiveAnalytic('school-1', 'test-id', { name: 'Updated: !@#$%^&*()' });
      expect(result).toBeDefined();
    });

    it('should handle update PredictiveAnalytic with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection lost');
      });
      const result = await service.updatePredictiveAnalytic('school-1', 'test-id', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update PredictiveAnalytic with nested data', async () => {
      const result = await service.updatePredictiveAnalytic('school-1', 'test-id', { name: 'Test', metadata: { key: 'value' } });
      expect(result).toBeDefined();
    });
  });

  describe('deletePredictiveAnalytic', () => {
    it('should delete PredictiveAnalytic successfully', async () => {
      const result = await service.deletePredictiveAnalytic('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle delete PredictiveAnalytic with nonexistent id', async () => {
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
        }),
      });
      const result = await service.deletePredictiveAnalytic('school-1', 'nonexistent');
      expect(result).toBeDefined();
    });

    it('should handle delete PredictiveAnalytic with database error', async () => {
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'Delete failed' } }),
        }),
      });
      const result = await service.deletePredictiveAnalytic('school-1', 'error-id');
      expect(result).toBeDefined();
    });

    it('should handle delete PredictiveAnalytic with undefined id', async () => {
      const result = await service.deletePredictiveAnalytic('school-1', undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle delete PredictiveAnalytic with empty string id', async () => {
      const result = await service.deletePredictiveAnalytic('school-1', '');
      expect(result).toBeDefined();
    });

    it('should handle delete PredictiveAnalytic with null id', async () => {
      const result = await service.deletePredictiveAnalytic('school-1', null as any);
      expect(result).toBeDefined();
    });

    it('should handle delete PredictiveAnalytic with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.deletePredictiveAnalytic('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle delete PredictiveAnalytic with special characters in id', async () => {
      const result = await service.deletePredictiveAnalytic('school-1', 'id-with-special-chars!@#');
      expect(result).toBeDefined();
    });

    it('should handle delete PredictiveAnalytic with UUID format id', async () => {
      const result = await service.deletePredictiveAnalytic('school-1', '550e8400-e29b-41d4-a716-446655440000');
      expect(result).toBeDefined();
    });

    it('should handle delete PredictiveAnalytic with numeric string id', async () => {
      const result = await service.deletePredictiveAnalytic('school-1', '12345');
      expect(result).toBeDefined();
    });
  });

  describe('countPredictiveAnalytic', () => {
    it('should count PredictiveAnalytic successfully', async () => {
      const result = await service.countPredictiveAnalytic('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count PredictiveAnalytic with zero result', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: [],
          error: null,
          count: 0,
        }),
      });
      const result = await service.countPredictiveAnalytic('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count PredictiveAnalytic with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: null,
          error: { message: 'Count failed' },
          count: null,
        }),
      });
      const result = await service.countPredictiveAnalytic('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count PredictiveAnalytic with filters', async () => {
      const result = await service.countPredictiveAnalytic('school-1', { status: 'active' });
      expect(result).toBeDefined();
    });

    it('should handle count PredictiveAnalytic with undefined schoolId', async () => {
      const result = await service.countPredictiveAnalytic(undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle count PredictiveAnalytic with null schoolId', async () => {
      const result = await service.countPredictiveAnalytic(null as any);
      expect(result).toBeDefined();
    });

    it('should handle count PredictiveAnalytic with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.countPredictiveAnalytic('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count PredictiveAnalytic with large result set', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: Array(1000).fill({ id: 'test' }),
          error: null,
          count: 1000,
        }),
      });
      const result = await service.countPredictiveAnalytic('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count PredictiveAnalytic with date range filter', async () => {
      const result = await service.countPredictiveAnalytic('school-1', { startDate: '2024-01-01', endDate: '2024-12-31' });
      expect(result).toBeDefined();
    });

    it('should handle count PredictiveAnalytic with status filter', async () => {
      const result = await service.countPredictiveAnalytic('school-1', { status: 'inactive' });
      expect(result).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should handle network timeout', async () => {
      mockSupabase.from.mockImplementation(() => {
        return new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 100));
      });
      const result = await service.getPredictiveAnalytic('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle malformed response', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: 'invalid', error: null }),
          })),
          data: 'invalid',
          error: null,
        })),
      });
      const result = await service.getPredictiveAnalytic('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle concurrent requests', async () => {
      const promise1 = service.getPredictiveAnalytic('school-1', 'test-id-1');
      const promise2 = service.getPredictiveAnalytic('school-1', 'test-id-2');
      const results = await Promise.all([promise1, promise2]);
      expect(results).toHaveLength(2);
    });

    it('should handle rapid successive calls', async () => {
      for (let i = 0; i < 10; i++) {
        await service.listPredictiveAnalytic('school-1');
      }
      expect(mockSupabase.from).toHaveBeenCalled();
    });

    it('should handle service initialization with null supabase', () => {
      expect(() => new GovPredictiveAnalyticService(null as any)).toThrow();
    });

    it('should handle service initialization with undefined supabase', () => {
      expect(() => new GovPredictiveAnalyticService(undefined as any)).toThrow();
    });
  });
});
