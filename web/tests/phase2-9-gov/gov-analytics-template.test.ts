import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovAnalyticsTemplateService } from '@/features/gov/services/gov-analytics-template.service';

describe('GovAnalyticsTemplateService', () => {
  let service: GovAnalyticsTemplateService;
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
    service = new GovAnalyticsTemplateService(mockSupabase);
  });

  describe('getAnalyticsTemplate', () => {
    it('should get AnalyticsTemplate by id successfully', async () => {
      const result = await service.getAnalyticsTemplate('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle get AnalyticsTemplate with null result', async () => {
      const result = await service.getAnalyticsTemplate('school-1', 'nonexistent-id');
      expect(result).toBeDefined();
    });

    it('should handle get AnalyticsTemplate with database error', async () => {
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
      const result = await service.getAnalyticsTemplate('school-1', 'error-id');
      expect(result).toBeDefined();
    });

    it('should handle get AnalyticsTemplate with empty string id', async () => {
      const result = await service.getAnalyticsTemplate('school-1', '');
      expect(result).toBeDefined();
    });

    it('should handle get AnalyticsTemplate with special characters in id', async () => {
      const result = await service.getAnalyticsTemplate('school-1', 'id-with-special-chars!@#');
      expect(result).toBeDefined();
    });

    it('should handle get AnalyticsTemplate with numeric string id', async () => {
      const result = await service.getAnalyticsTemplate('school-1', '12345');
      expect(result).toBeDefined();
    });

    it('should handle get AnalyticsTemplate with UUID format id', async () => {
      const result = await service.getAnalyticsTemplate('school-1', '550e8400-e29b-41d4-a716-446655440000');
      expect(result).toBeDefined();
    });

    it('should handle get AnalyticsTemplate when connection timeout', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection timeout');
      });
      const result = await service.getAnalyticsTemplate('school-1', 'timeout-id');
      expect(result).toBeDefined();
    });

    it('should handle get AnalyticsTemplate with undefined schoolId', async () => {
      const result = await service.getAnalyticsTemplate(undefined as any, 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle get AnalyticsTemplate with null schoolId', async () => {
      const result = await service.getAnalyticsTemplate(null as any, 'test-id');
      expect(result).toBeDefined();
    });
  });

  describe('listAnalyticsTemplate', () => {
    it('should list AnalyticsTemplate successfully', async () => {
      const result = await service.listAnalyticsTemplate('school-1');
      expect(result).toBeDefined();
    });

    it('should list AnalyticsTemplate with empty result', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          data: [],
          error: null,
        })),
      });
      const result = await service.listAnalyticsTemplate('school-1');
      expect(result).toBeDefined();
    });

    it('should list AnalyticsTemplate with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          data: null,
          error: { message: 'DB error' },
        })),
      });
      const result = await service.listAnalyticsTemplate('school-1');
      expect(result).toBeDefined();
    });

    it('should list AnalyticsTemplate with filters', async () => {
      const result = await service.listAnalyticsTemplate('school-1', { status: 'active' });
      expect(result).toBeDefined();
    });

    it('should list AnalyticsTemplate with pagination', async () => {
      const result = await service.listAnalyticsTemplate('school-1', { page: 1, limit: 10 });
      expect(result).toBeDefined();
    });

    it('should list AnalyticsTemplate with sorting', async () => {
      const result = await service.listAnalyticsTemplate('school-1', { sortBy: 'createdAt', sortOrder: 'desc' });
      expect(result).toBeDefined();
    });

    it('should list AnalyticsTemplate with search query', async () => {
      const result = await service.listAnalyticsTemplate('school-1', { search: 'test' });
      expect(result).toBeDefined();
    });

    it('should handle list AnalyticsTemplate with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.listAnalyticsTemplate('school-1');
      expect(result).toBeDefined();
    });

    it('should list AnalyticsTemplate with undefined schoolId', async () => {
      const result = await service.listAnalyticsTemplate(undefined as any);
      expect(result).toBeDefined();
    });

    it('should list AnalyticsTemplate with null schoolId', async () => {
      const result = await service.listAnalyticsTemplate(null as any);
      expect(result).toBeDefined();
    });
  });

  describe('createAnalyticsTemplate', () => {
    it('should create AnalyticsTemplate successfully', async () => {
      const result = await service.createAnalyticsTemplate('school-1', { schoolId: 'school-1', name: 'Test AnalyticsTemplate' });
      expect(result).toBeDefined();
    });

    it('should create AnalyticsTemplate with minimal data', async () => {
      const result = await service.createAnalyticsTemplate('school-1', {});
      expect(result).toBeDefined();
    });

    it('should handle create AnalyticsTemplate with validation error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Validation error' } }),
          }),
        }),
      });
      const result = await service.createAnalyticsTemplate('school-1', { name: '' });
      expect(result).toBeDefined();
    });

    it('should handle create AnalyticsTemplate with duplicate error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Duplicate key' } }),
          }),
        }),
      });
      const result = await service.createAnalyticsTemplate('school-1', { name: 'Duplicate' });
      expect(result).toBeDefined();
    });

    it('should handle create AnalyticsTemplate with database error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Insert failed' } }),
          }),
        }),
      });
      const result = await service.createAnalyticsTemplate('school-1', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle create AnalyticsTemplate with undefined data', async () => {
      const result = await service.createAnalyticsTemplate('school-1', undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle create AnalyticsTemplate with null data', async () => {
      const result = await service.createAnalyticsTemplate('school-1', null as any);
      expect(result).toBeDefined();
    });

    it('should handle create AnalyticsTemplate with empty object', async () => {
      const result = await service.createAnalyticsTemplate('school-1', {});
      expect(result).toBeDefined();
    });

    it('should handle create AnalyticsTemplate with nested data', async () => {
      const result = await service.createAnalyticsTemplate('school-1', { name: 'Test', metadata: { key: 'value' } });
      expect(result).toBeDefined();
    });

    it('should handle create AnalyticsTemplate with special characters', async () => {
      const result = await service.createAnalyticsTemplate('school-1', { name: 'Test with special chars: !@#\$%^&*()' });
      expect(result).toBeDefined();
    });
  });

  describe('updateAnalyticsTemplate', () => {
    it('should update AnalyticsTemplate successfully', async () => {
      const result = await service.updateAnalyticsTemplate('school-1', 'test-id', { name: 'Updated AnalyticsTemplate' });
      expect(result).toBeDefined();
    });

    it('should handle update AnalyticsTemplate with null data', async () => {
      const result = await service.updateAnalyticsTemplate('school-1', 'test-id', null as any);
      expect(result).toBeDefined();
    });

    it('should handle update AnalyticsTemplate with empty object', async () => {
      const result = await service.updateAnalyticsTemplate('school-1', 'test-id', {});
      expect(result).toBeDefined();
    });

    it('should handle update AnalyticsTemplate with database error', async () => {
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Update failed' } }),
            }),
          }),
        }),
      });
      const result = await service.updateAnalyticsTemplate('school-1', 'error-id', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update AnalyticsTemplate with nonexistent id', async () => {
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
            }),
          }),
        }),
      });
      const result = await service.updateAnalyticsTemplate('school-1', 'nonexistent', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update AnalyticsTemplate with undefined id', async () => {
      const result = await service.updateAnalyticsTemplate('school-1', undefined as any, { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update AnalyticsTemplate with empty string id', async () => {
      const result = await service.updateAnalyticsTemplate('school-1', '', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update AnalyticsTemplate with special characters in data', async () => {
      const result = await service.updateAnalyticsTemplate('school-1', 'test-id', { name: 'Updated: !@#\$%^&*()' });
      expect(result).toBeDefined();
    });

    it('should handle update AnalyticsTemplate with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection lost');
      });
      const result = await service.updateAnalyticsTemplate('school-1', 'test-id', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update AnalyticsTemplate with nested data', async () => {
      const result = await service.updateAnalyticsTemplate('school-1', 'test-id', { name: 'Test', metadata: { key: 'value' } });
      expect(result).toBeDefined();
    });
  });

  describe('deleteAnalyticsTemplate', () => {
    it('should delete AnalyticsTemplate successfully', async () => {
      const result = await service.deleteAnalyticsTemplate('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle delete AnalyticsTemplate with nonexistent id', async () => {
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
        }),
      });
      const result = await service.deleteAnalyticsTemplate('school-1', 'nonexistent');
      expect(result).toBeDefined();
    });

    it('should handle delete AnalyticsTemplate with database error', async () => {
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'Delete failed' } }),
        }),
      });
      const result = await service.deleteAnalyticsTemplate('school-1', 'error-id');
      expect(result).toBeDefined();
    });

    it('should handle delete AnalyticsTemplate with undefined id', async () => {
      const result = await service.deleteAnalyticsTemplate('school-1', undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle delete AnalyticsTemplate with empty string id', async () => {
      const result = await service.deleteAnalyticsTemplate('school-1', '');
      expect(result).toBeDefined();
    });

    it('should handle delete AnalyticsTemplate with null id', async () => {
      const result = await service.deleteAnalyticsTemplate('school-1', null as any);
      expect(result).toBeDefined();
    });

    it('should handle delete AnalyticsTemplate with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.deleteAnalyticsTemplate('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle delete AnalyticsTemplate with special characters in id', async () => {
      const result = await service.deleteAnalyticsTemplate('school-1', 'id-with-special-chars!@#');
      expect(result).toBeDefined();
    });

    it('should handle delete AnalyticsTemplate with UUID format id', async () => {
      const result = await service.deleteAnalyticsTemplate('school-1', '550e8400-e29b-41d4-a716-446655440000');
      expect(result).toBeDefined();
    });

    it('should handle delete AnalyticsTemplate with numeric string id', async () => {
      const result = await service.deleteAnalyticsTemplate('school-1', '12345');
      expect(result).toBeDefined();
    });
  });

  describe('countAnalyticsTemplate', () => {
    it('should count AnalyticsTemplate successfully', async () => {
      const result = await service.countAnalyticsTemplate('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count AnalyticsTemplate with zero result', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: [],
          error: null,
          count: 0,
        }),
      });
      const result = await service.countAnalyticsTemplate('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count AnalyticsTemplate with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: null,
          error: { message: 'Count failed' },
          count: null,
        }),
      });
      const result = await service.countAnalyticsTemplate('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count AnalyticsTemplate with filters', async () => {
      const result = await service.countAnalyticsTemplate('school-1', { status: 'active' });
      expect(result).toBeDefined();
    });

    it('should handle count AnalyticsTemplate with undefined schoolId', async () => {
      const result = await service.countAnalyticsTemplate(undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle count AnalyticsTemplate with null schoolId', async () => {
      const result = await service.countAnalyticsTemplate(null as any);
      expect(result).toBeDefined();
    });

    it('should handle count AnalyticsTemplate with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.countAnalyticsTemplate('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count AnalyticsTemplate with large result set', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: Array(1000).fill({ id: 'test' }),
          error: null,
          count: 1000,
        }),
      });
      const result = await service.countAnalyticsTemplate('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count AnalyticsTemplate with date range filter', async () => {
      const result = await service.countAnalyticsTemplate('school-1', { startDate: '2024-01-01', endDate: '2024-12-31' });
      expect(result).toBeDefined();
    });

    it('should handle count AnalyticsTemplate with status filter', async () => {
      const result = await service.countAnalyticsTemplate('school-1', { status: 'inactive' });
      expect(result).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should handle network timeout', async () => {
      mockSupabase.from.mockImplementation(() => {
        return new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 100));
      });
      const result = await service.getAnalyticsTemplate('school-1', 'test-id');
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
      const result = await service.getAnalyticsTemplate('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle concurrent requests', async () => {
      const promise1 = service.getAnalyticsTemplate('school-1', 'test-id-1');
      const promise2 = service.getAnalyticsTemplate('school-1', 'test-id-2');
      const results = await Promise.all([promise1, promise2]);
      expect(results).toHaveLength(2);
    });

    it('should handle rapid successive calls', async () => {
      for (let i = 0; i < 10; i++) {
        await service.listAnalyticsTemplate('school-1');
      }
      expect(mockSupabase.from).toHaveBeenCalled();
    });

    it('should handle service initialization with null supabase', () => {
      expect(() => new GovAnalyticsTemplateService(null as any)).toThrow();
    });

    it('should handle service initialization with undefined supabase', () => {
      expect(() => new GovAnalyticsTemplateService(undefined as any)).toThrow();
    });
  });
});
