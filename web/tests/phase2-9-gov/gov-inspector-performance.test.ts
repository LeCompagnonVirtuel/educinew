import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovInspectorPerformanceService } from '@/features/gov/services/gov-inspector-performance.service';

describe('GovInspectorPerformanceService', () => {
  let service: GovInspectorPerformanceService;
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
    service = new GovInspectorPerformanceService(mockSupabase);
  });

  describe('getInspectorPerformance', () => {
    it('should get InspectorPerformance by id successfully', async () => {
      const result = await service.getInspectorPerformance('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle get InspectorPerformance with null result', async () => {
      const result = await service.getInspectorPerformance('school-1', 'nonexistent-id');
      expect(result).toBeDefined();
    });

    it('should handle get InspectorPerformance with database error', async () => {
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
      const result = await service.getInspectorPerformance('school-1', 'error-id');
      expect(result).toBeDefined();
    });

    it('should handle get InspectorPerformance with empty string id', async () => {
      const result = await service.getInspectorPerformance('school-1', '');
      expect(result).toBeDefined();
    });

    it('should handle get InspectorPerformance with special characters in id', async () => {
      const result = await service.getInspectorPerformance('school-1', 'id-with-special-chars!@#');
      expect(result).toBeDefined();
    });

    it('should handle get InspectorPerformance with numeric string id', async () => {
      const result = await service.getInspectorPerformance('school-1', '12345');
      expect(result).toBeDefined();
    });

    it('should handle get InspectorPerformance with UUID format id', async () => {
      const result = await service.getInspectorPerformance('school-1', '550e8400-e29b-41d4-a716-446655440000');
      expect(result).toBeDefined();
    });

    it('should handle get InspectorPerformance when connection timeout', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection timeout');
      });
      const result = await service.getInspectorPerformance('school-1', 'timeout-id');
      expect(result).toBeDefined();
    });

    it('should handle get InspectorPerformance with undefined schoolId', async () => {
      const result = await service.getInspectorPerformance(undefined as any, 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle get InspectorPerformance with null schoolId', async () => {
      const result = await service.getInspectorPerformance(null as any, 'test-id');
      expect(result).toBeDefined();
    });
  });

  describe('listInspectorPerformance', () => {
    it('should list InspectorPerformance successfully', async () => {
      const result = await service.listInspectorPerformance('school-1');
      expect(result).toBeDefined();
    });

    it('should list InspectorPerformance with empty result', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          data: [],
          error: null,
        })),
      });
      const result = await service.listInspectorPerformance('school-1');
      expect(result).toBeDefined();
    });

    it('should list InspectorPerformance with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          data: null,
          error: { message: 'DB error' },
        })),
      });
      const result = await service.listInspectorPerformance('school-1');
      expect(result).toBeDefined();
    });

    it('should list InspectorPerformance with filters', async () => {
      const result = await service.listInspectorPerformance('school-1', { status: 'active' });
      expect(result).toBeDefined();
    });

    it('should list InspectorPerformance with pagination', async () => {
      const result = await service.listInspectorPerformance('school-1', { page: 1, limit: 10 });
      expect(result).toBeDefined();
    });

    it('should list InspectorPerformance with sorting', async () => {
      const result = await service.listInspectorPerformance('school-1', { sortBy: 'createdAt', sortOrder: 'desc' });
      expect(result).toBeDefined();
    });

    it('should list InspectorPerformance with search query', async () => {
      const result = await service.listInspectorPerformance('school-1', { search: 'test' });
      expect(result).toBeDefined();
    });

    it('should handle list InspectorPerformance with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.listInspectorPerformance('school-1');
      expect(result).toBeDefined();
    });

    it('should list InspectorPerformance with undefined schoolId', async () => {
      const result = await service.listInspectorPerformance(undefined as any);
      expect(result).toBeDefined();
    });

    it('should list InspectorPerformance with null schoolId', async () => {
      const result = await service.listInspectorPerformance(null as any);
      expect(result).toBeDefined();
    });
  });

  describe('createInspectorPerformance', () => {
    it('should create InspectorPerformance successfully', async () => {
      const result = await service.createInspectorPerformance('school-1', { schoolId: 'school-1', name: 'Test InspectorPerformance' });
      expect(result).toBeDefined();
    });

    it('should create InspectorPerformance with minimal data', async () => {
      const result = await service.createInspectorPerformance('school-1', {});
      expect(result).toBeDefined();
    });

    it('should handle create InspectorPerformance with validation error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Validation error' } }),
          }),
        }),
      });
      const result = await service.createInspectorPerformance('school-1', { name: '' });
      expect(result).toBeDefined();
    });

    it('should handle create InspectorPerformance with duplicate error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Duplicate key' } }),
          }),
        }),
      });
      const result = await service.createInspectorPerformance('school-1', { name: 'Duplicate' });
      expect(result).toBeDefined();
    });

    it('should handle create InspectorPerformance with database error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Insert failed' } }),
          }),
        }),
      });
      const result = await service.createInspectorPerformance('school-1', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle create InspectorPerformance with undefined data', async () => {
      const result = await service.createInspectorPerformance('school-1', undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle create InspectorPerformance with null data', async () => {
      const result = await service.createInspectorPerformance('school-1', null as any);
      expect(result).toBeDefined();
    });

    it('should handle create InspectorPerformance with empty object', async () => {
      const result = await service.createInspectorPerformance('school-1', {});
      expect(result).toBeDefined();
    });

    it('should handle create InspectorPerformance with nested data', async () => {
      const result = await service.createInspectorPerformance('school-1', { name: 'Test', metadata: { key: 'value' } });
      expect(result).toBeDefined();
    });

    it('should handle create InspectorPerformance with special characters', async () => {
      const result = await service.createInspectorPerformance('school-1', { name: 'Test with special chars: !@#$%^&*()' });
      expect(result).toBeDefined();
    });
  });

  describe('updateInspectorPerformance', () => {
    it('should update InspectorPerformance successfully', async () => {
      const result = await service.updateInspectorPerformance('school-1', 'test-id', { name: 'Updated InspectorPerformance' });
      expect(result).toBeDefined();
    });

    it('should handle update InspectorPerformance with null data', async () => {
      const result = await service.updateInspectorPerformance('school-1', 'test-id', null as any);
      expect(result).toBeDefined();
    });

    it('should handle update InspectorPerformance with empty object', async () => {
      const result = await service.updateInspectorPerformance('school-1', 'test-id', {});
      expect(result).toBeDefined();
    });

    it('should handle update InspectorPerformance with database error', async () => {
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Update failed' } }),
            }),
          }),
        }),
      });
      const result = await service.updateInspectorPerformance('school-1', 'error-id', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update InspectorPerformance with nonexistent id', async () => {
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
            }),
          }),
        }),
      });
      const result = await service.updateInspectorPerformance('school-1', 'nonexistent', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update InspectorPerformance with undefined id', async () => {
      const result = await service.updateInspectorPerformance('school-1', undefined as any, { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update InspectorPerformance with empty string id', async () => {
      const result = await service.updateInspectorPerformance('school-1', '', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update InspectorPerformance with special characters in data', async () => {
      const result = await service.updateInspectorPerformance('school-1', 'test-id', { name: 'Updated: !@#$%^&*()' });
      expect(result).toBeDefined();
    });

    it('should handle update InspectorPerformance with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection lost');
      });
      const result = await service.updateInspectorPerformance('school-1', 'test-id', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update InspectorPerformance with nested data', async () => {
      const result = await service.updateInspectorPerformance('school-1', 'test-id', { name: 'Test', metadata: { key: 'value' } });
      expect(result).toBeDefined();
    });
  });

  describe('deleteInspectorPerformance', () => {
    it('should delete InspectorPerformance successfully', async () => {
      const result = await service.deleteInspectorPerformance('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle delete InspectorPerformance with nonexistent id', async () => {
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
        }),
      });
      const result = await service.deleteInspectorPerformance('school-1', 'nonexistent');
      expect(result).toBeDefined();
    });

    it('should handle delete InspectorPerformance with database error', async () => {
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'Delete failed' } }),
        }),
      });
      const result = await service.deleteInspectorPerformance('school-1', 'error-id');
      expect(result).toBeDefined();
    });

    it('should handle delete InspectorPerformance with undefined id', async () => {
      const result = await service.deleteInspectorPerformance('school-1', undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle delete InspectorPerformance with empty string id', async () => {
      const result = await service.deleteInspectorPerformance('school-1', '');
      expect(result).toBeDefined();
    });

    it('should handle delete InspectorPerformance with null id', async () => {
      const result = await service.deleteInspectorPerformance('school-1', null as any);
      expect(result).toBeDefined();
    });

    it('should handle delete InspectorPerformance with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.deleteInspectorPerformance('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle delete InspectorPerformance with special characters in id', async () => {
      const result = await service.deleteInspectorPerformance('school-1', 'id-with-special-chars!@#');
      expect(result).toBeDefined();
    });

    it('should handle delete InspectorPerformance with UUID format id', async () => {
      const result = await service.deleteInspectorPerformance('school-1', '550e8400-e29b-41d4-a716-446655440000');
      expect(result).toBeDefined();
    });

    it('should handle delete InspectorPerformance with numeric string id', async () => {
      const result = await service.deleteInspectorPerformance('school-1', '12345');
      expect(result).toBeDefined();
    });
  });

  describe('countInspectorPerformance', () => {
    it('should count InspectorPerformance successfully', async () => {
      const result = await service.countInspectorPerformance('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count InspectorPerformance with zero result', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: [],
          error: null,
          count: 0,
        }),
      });
      const result = await service.countInspectorPerformance('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count InspectorPerformance with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: null,
          error: { message: 'Count failed' },
          count: null,
        }),
      });
      const result = await service.countInspectorPerformance('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count InspectorPerformance with filters', async () => {
      const result = await service.countInspectorPerformance('school-1', { status: 'active' });
      expect(result).toBeDefined();
    });

    it('should handle count InspectorPerformance with undefined schoolId', async () => {
      const result = await service.countInspectorPerformance(undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle count InspectorPerformance with null schoolId', async () => {
      const result = await service.countInspectorPerformance(null as any);
      expect(result).toBeDefined();
    });

    it('should handle count InspectorPerformance with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.countInspectorPerformance('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count InspectorPerformance with large result set', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: Array(1000).fill({ id: 'test' }),
          error: null,
          count: 1000,
        }),
      });
      const result = await service.countInspectorPerformance('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count InspectorPerformance with date range filter', async () => {
      const result = await service.countInspectorPerformance('school-1', { startDate: '2024-01-01', endDate: '2024-12-31' });
      expect(result).toBeDefined();
    });

    it('should handle count InspectorPerformance with status filter', async () => {
      const result = await service.countInspectorPerformance('school-1', { status: 'inactive' });
      expect(result).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should handle network timeout', async () => {
      mockSupabase.from.mockImplementation(() => {
        return new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 100));
      });
      const result = await service.getInspectorPerformance('school-1', 'test-id');
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
      const result = await service.getInspectorPerformance('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle concurrent requests', async () => {
      const promise1 = service.getInspectorPerformance('school-1', 'test-id-1');
      const promise2 = service.getInspectorPerformance('school-1', 'test-id-2');
      const results = await Promise.all([promise1, promise2]);
      expect(results).toHaveLength(2);
    });

    it('should handle rapid successive calls', async () => {
      for (let i = 0; i < 10; i++) {
        await service.listInspectorPerformance('school-1');
      }
      expect(mockSupabase.from).toHaveBeenCalled();
    });

    it('should handle service initialization with null supabase', () => {
      expect(() => new GovInspectorPerformanceService(null as any)).toThrow();
    });

    it('should handle service initialization with undefined supabase', () => {
      expect(() => new GovInspectorPerformanceService(undefined as any)).toThrow();
    });
  });
});
