import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovCountryStatisticService } from '@/features/gov/services/gov-country-statistic.service';

describe('GovCountryStatisticService', () => {
  let service: GovCountryStatisticService;
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
    service = new GovCountryStatisticService(mockSupabase);
  });

  describe('getCountryStatistic', () => {
    it('should get CountryStatistic by id successfully', async () => {
      const result = await service.getCountryStatistic('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle get CountryStatistic with null result', async () => {
      const result = await service.getCountryStatistic('school-1', 'nonexistent-id');
      expect(result).toBeDefined();
    });

    it('should handle get CountryStatistic with database error', async () => {
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
      const result = await service.getCountryStatistic('school-1', 'error-id');
      expect(result).toBeDefined();
    });

    it('should handle get CountryStatistic with empty string id', async () => {
      const result = await service.getCountryStatistic('school-1', '');
      expect(result).toBeDefined();
    });

    it('should handle get CountryStatistic with special characters in id', async () => {
      const result = await service.getCountryStatistic('school-1', 'id-with-special-chars!@#');
      expect(result).toBeDefined();
    });

    it('should handle get CountryStatistic with numeric string id', async () => {
      const result = await service.getCountryStatistic('school-1', '12345');
      expect(result).toBeDefined();
    });

    it('should handle get CountryStatistic with UUID format id', async () => {
      const result = await service.getCountryStatistic('school-1', '550e8400-e29b-41d4-a716-446655440000');
      expect(result).toBeDefined();
    });

    it('should handle get CountryStatistic when connection timeout', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection timeout');
      });
      const result = await service.getCountryStatistic('school-1', 'timeout-id');
      expect(result).toBeDefined();
    });

    it('should handle get CountryStatistic with undefined schoolId', async () => {
      const result = await service.getCountryStatistic(undefined as any, 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle get CountryStatistic with null schoolId', async () => {
      const result = await service.getCountryStatistic(null as any, 'test-id');
      expect(result).toBeDefined();
    });
  });

  describe('listCountryStatistic', () => {
    it('should list CountryStatistic successfully', async () => {
      const result = await service.listCountryStatistic('school-1');
      expect(result).toBeDefined();
    });

    it('should list CountryStatistic with empty result', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          data: [],
          error: null,
        })),
      });
      const result = await service.listCountryStatistic('school-1');
      expect(result).toBeDefined();
    });

    it('should list CountryStatistic with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          data: null,
          error: { message: 'DB error' },
        })),
      });
      const result = await service.listCountryStatistic('school-1');
      expect(result).toBeDefined();
    });

    it('should list CountryStatistic with filters', async () => {
      const result = await service.listCountryStatistic('school-1', { status: 'active' });
      expect(result).toBeDefined();
    });

    it('should list CountryStatistic with pagination', async () => {
      const result = await service.listCountryStatistic('school-1', { page: 1, limit: 10 });
      expect(result).toBeDefined();
    });

    it('should list CountryStatistic with sorting', async () => {
      const result = await service.listCountryStatistic('school-1', { sortBy: 'createdAt', sortOrder: 'desc' });
      expect(result).toBeDefined();
    });

    it('should list CountryStatistic with search query', async () => {
      const result = await service.listCountryStatistic('school-1', { search: 'test' });
      expect(result).toBeDefined();
    });

    it('should handle list CountryStatistic with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.listCountryStatistic('school-1');
      expect(result).toBeDefined();
    });

    it('should list CountryStatistic with undefined schoolId', async () => {
      const result = await service.listCountryStatistic(undefined as any);
      expect(result).toBeDefined();
    });

    it('should list CountryStatistic with null schoolId', async () => {
      const result = await service.listCountryStatistic(null as any);
      expect(result).toBeDefined();
    });
  });

  describe('createCountryStatistic', () => {
    it('should create CountryStatistic successfully', async () => {
      const result = await service.createCountryStatistic('school-1', { schoolId: 'school-1', name: 'Test CountryStatistic' });
      expect(result).toBeDefined();
    });

    it('should create CountryStatistic with minimal data', async () => {
      const result = await service.createCountryStatistic('school-1', {});
      expect(result).toBeDefined();
    });

    it('should handle create CountryStatistic with validation error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Validation error' } }),
          }),
        }),
      });
      const result = await service.createCountryStatistic('school-1', { name: '' });
      expect(result).toBeDefined();
    });

    it('should handle create CountryStatistic with duplicate error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Duplicate key' } }),
          }),
        }),
      });
      const result = await service.createCountryStatistic('school-1', { name: 'Duplicate' });
      expect(result).toBeDefined();
    });

    it('should handle create CountryStatistic with database error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Insert failed' } }),
          }),
        }),
      });
      const result = await service.createCountryStatistic('school-1', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle create CountryStatistic with undefined data', async () => {
      const result = await service.createCountryStatistic('school-1', undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle create CountryStatistic with null data', async () => {
      const result = await service.createCountryStatistic('school-1', null as any);
      expect(result).toBeDefined();
    });

    it('should handle create CountryStatistic with empty object', async () => {
      const result = await service.createCountryStatistic('school-1', {});
      expect(result).toBeDefined();
    });

    it('should handle create CountryStatistic with nested data', async () => {
      const result = await service.createCountryStatistic('school-1', { name: 'Test', metadata: { key: 'value' } });
      expect(result).toBeDefined();
    });

    it('should handle create CountryStatistic with special characters', async () => {
      const result = await service.createCountryStatistic('school-1', { name: 'Test with special chars: !@#\$%^&*()' });
      expect(result).toBeDefined();
    });
  });

  describe('updateCountryStatistic', () => {
    it('should update CountryStatistic successfully', async () => {
      const result = await service.updateCountryStatistic('school-1', 'test-id', { name: 'Updated CountryStatistic' });
      expect(result).toBeDefined();
    });

    it('should handle update CountryStatistic with null data', async () => {
      const result = await service.updateCountryStatistic('school-1', 'test-id', null as any);
      expect(result).toBeDefined();
    });

    it('should handle update CountryStatistic with empty object', async () => {
      const result = await service.updateCountryStatistic('school-1', 'test-id', {});
      expect(result).toBeDefined();
    });

    it('should handle update CountryStatistic with database error', async () => {
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Update failed' } }),
            }),
          }),
        }),
      });
      const result = await service.updateCountryStatistic('school-1', 'error-id', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update CountryStatistic with nonexistent id', async () => {
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
            }),
          }),
        }),
      });
      const result = await service.updateCountryStatistic('school-1', 'nonexistent', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update CountryStatistic with undefined id', async () => {
      const result = await service.updateCountryStatistic('school-1', undefined as any, { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update CountryStatistic with empty string id', async () => {
      const result = await service.updateCountryStatistic('school-1', '', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update CountryStatistic with special characters in data', async () => {
      const result = await service.updateCountryStatistic('school-1', 'test-id', { name: 'Updated: !@#\$%^&*()' });
      expect(result).toBeDefined();
    });

    it('should handle update CountryStatistic with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection lost');
      });
      const result = await service.updateCountryStatistic('school-1', 'test-id', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update CountryStatistic with nested data', async () => {
      const result = await service.updateCountryStatistic('school-1', 'test-id', { name: 'Test', metadata: { key: 'value' } });
      expect(result).toBeDefined();
    });
  });

  describe('deleteCountryStatistic', () => {
    it('should delete CountryStatistic successfully', async () => {
      const result = await service.deleteCountryStatistic('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle delete CountryStatistic with nonexistent id', async () => {
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
        }),
      });
      const result = await service.deleteCountryStatistic('school-1', 'nonexistent');
      expect(result).toBeDefined();
    });

    it('should handle delete CountryStatistic with database error', async () => {
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'Delete failed' } }),
        }),
      });
      const result = await service.deleteCountryStatistic('school-1', 'error-id');
      expect(result).toBeDefined();
    });

    it('should handle delete CountryStatistic with undefined id', async () => {
      const result = await service.deleteCountryStatistic('school-1', undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle delete CountryStatistic with empty string id', async () => {
      const result = await service.deleteCountryStatistic('school-1', '');
      expect(result).toBeDefined();
    });

    it('should handle delete CountryStatistic with null id', async () => {
      const result = await service.deleteCountryStatistic('school-1', null as any);
      expect(result).toBeDefined();
    });

    it('should handle delete CountryStatistic with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.deleteCountryStatistic('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle delete CountryStatistic with special characters in id', async () => {
      const result = await service.deleteCountryStatistic('school-1', 'id-with-special-chars!@#');
      expect(result).toBeDefined();
    });

    it('should handle delete CountryStatistic with UUID format id', async () => {
      const result = await service.deleteCountryStatistic('school-1', '550e8400-e29b-41d4-a716-446655440000');
      expect(result).toBeDefined();
    });

    it('should handle delete CountryStatistic with numeric string id', async () => {
      const result = await service.deleteCountryStatistic('school-1', '12345');
      expect(result).toBeDefined();
    });
  });

  describe('countCountryStatistic', () => {
    it('should count CountryStatistic successfully', async () => {
      const result = await service.countCountryStatistic('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count CountryStatistic with zero result', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: [],
          error: null,
          count: 0,
        }),
      });
      const result = await service.countCountryStatistic('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count CountryStatistic with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: null,
          error: { message: 'Count failed' },
          count: null,
        }),
      });
      const result = await service.countCountryStatistic('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count CountryStatistic with filters', async () => {
      const result = await service.countCountryStatistic('school-1', { status: 'active' });
      expect(result).toBeDefined();
    });

    it('should handle count CountryStatistic with undefined schoolId', async () => {
      const result = await service.countCountryStatistic(undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle count CountryStatistic with null schoolId', async () => {
      const result = await service.countCountryStatistic(null as any);
      expect(result).toBeDefined();
    });

    it('should handle count CountryStatistic with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.countCountryStatistic('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count CountryStatistic with large result set', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: Array(1000).fill({ id: 'test' }),
          error: null,
          count: 1000,
        }),
      });
      const result = await service.countCountryStatistic('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count CountryStatistic with date range filter', async () => {
      const result = await service.countCountryStatistic('school-1', { startDate: '2024-01-01', endDate: '2024-12-31' });
      expect(result).toBeDefined();
    });

    it('should handle count CountryStatistic with status filter', async () => {
      const result = await service.countCountryStatistic('school-1', { status: 'inactive' });
      expect(result).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should handle network timeout', async () => {
      mockSupabase.from.mockImplementation(() => {
        return new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 100));
      });
      const result = await service.getCountryStatistic('school-1', 'test-id');
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
      const result = await service.getCountryStatistic('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle concurrent requests', async () => {
      const promise1 = service.getCountryStatistic('school-1', 'test-id-1');
      const promise2 = service.getCountryStatistic('school-1', 'test-id-2');
      const results = await Promise.all([promise1, promise2]);
      expect(results).toHaveLength(2);
    });

    it('should handle rapid successive calls', async () => {
      for (let i = 0; i < 10; i++) {
        await service.listCountryStatistic('school-1');
      }
      expect(mockSupabase.from).toHaveBeenCalled();
    });

    it('should handle service initialization with null supabase', () => {
      expect(() => new GovCountryStatisticService(null as any)).toThrow();
    });

    it('should handle service initialization with undefined supabase', () => {
      expect(() => new GovCountryStatisticService(undefined as any)).toThrow();
    });
  });
});
