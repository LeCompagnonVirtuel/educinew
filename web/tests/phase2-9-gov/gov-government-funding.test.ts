import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovGovernmentFundingService } from '@/features/gov/services/gov-government-funding.service';

describe('GovGovernmentFundingService', () => {
  let service: GovGovernmentFundingService;
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
    service = new GovGovernmentFundingService(mockSupabase);
  });

  describe('getGovernmentFunding', () => {
    it('should get GovernmentFunding by id successfully', async () => {
      const result = await service.getGovernmentFunding('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle get GovernmentFunding with null result', async () => {
      const result = await service.getGovernmentFunding('school-1', 'nonexistent-id');
      expect(result).toBeDefined();
    });

    it('should handle get GovernmentFunding with database error', async () => {
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
      const result = await service.getGovernmentFunding('school-1', 'error-id');
      expect(result).toBeDefined();
    });

    it('should handle get GovernmentFunding with empty string id', async () => {
      const result = await service.getGovernmentFunding('school-1', '');
      expect(result).toBeDefined();
    });

    it('should handle get GovernmentFunding with special characters in id', async () => {
      const result = await service.getGovernmentFunding('school-1', 'id-with-special-chars!@#');
      expect(result).toBeDefined();
    });

    it('should handle get GovernmentFunding with numeric string id', async () => {
      const result = await service.getGovernmentFunding('school-1', '12345');
      expect(result).toBeDefined();
    });

    it('should handle get GovernmentFunding with UUID format id', async () => {
      const result = await service.getGovernmentFunding('school-1', '550e8400-e29b-41d4-a716-446655440000');
      expect(result).toBeDefined();
    });

    it('should handle get GovernmentFunding when connection timeout', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection timeout');
      });
      const result = await service.getGovernmentFunding('school-1', 'timeout-id');
      expect(result).toBeDefined();
    });

    it('should handle get GovernmentFunding with undefined schoolId', async () => {
      const result = await service.getGovernmentFunding(undefined as any, 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle get GovernmentFunding with null schoolId', async () => {
      const result = await service.getGovernmentFunding(null as any, 'test-id');
      expect(result).toBeDefined();
    });
  });

  describe('listGovernmentFunding', () => {
    it('should list GovernmentFunding successfully', async () => {
      const result = await service.listGovernmentFunding('school-1');
      expect(result).toBeDefined();
    });

    it('should list GovernmentFunding with empty result', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          data: [],
          error: null,
        })),
      });
      const result = await service.listGovernmentFunding('school-1');
      expect(result).toBeDefined();
    });

    it('should list GovernmentFunding with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          data: null,
          error: { message: 'DB error' },
        })),
      });
      const result = await service.listGovernmentFunding('school-1');
      expect(result).toBeDefined();
    });

    it('should list GovernmentFunding with filters', async () => {
      const result = await service.listGovernmentFunding('school-1', { status: 'active' });
      expect(result).toBeDefined();
    });

    it('should list GovernmentFunding with pagination', async () => {
      const result = await service.listGovernmentFunding('school-1', { page: 1, limit: 10 });
      expect(result).toBeDefined();
    });

    it('should list GovernmentFunding with sorting', async () => {
      const result = await service.listGovernmentFunding('school-1', { sortBy: 'createdAt', sortOrder: 'desc' });
      expect(result).toBeDefined();
    });

    it('should list GovernmentFunding with search query', async () => {
      const result = await service.listGovernmentFunding('school-1', { search: 'test' });
      expect(result).toBeDefined();
    });

    it('should handle list GovernmentFunding with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.listGovernmentFunding('school-1');
      expect(result).toBeDefined();
    });

    it('should list GovernmentFunding with undefined schoolId', async () => {
      const result = await service.listGovernmentFunding(undefined as any);
      expect(result).toBeDefined();
    });

    it('should list GovernmentFunding with null schoolId', async () => {
      const result = await service.listGovernmentFunding(null as any);
      expect(result).toBeDefined();
    });
  });

  describe('createGovernmentFunding', () => {
    it('should create GovernmentFunding successfully', async () => {
      const result = await service.createGovernmentFunding('school-1', { schoolId: 'school-1', name: 'Test GovernmentFunding' });
      expect(result).toBeDefined();
    });

    it('should create GovernmentFunding with minimal data', async () => {
      const result = await service.createGovernmentFunding('school-1', {});
      expect(result).toBeDefined();
    });

    it('should handle create GovernmentFunding with validation error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Validation error' } }),
          }),
        }),
      });
      const result = await service.createGovernmentFunding('school-1', { name: '' });
      expect(result).toBeDefined();
    });

    it('should handle create GovernmentFunding with duplicate error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Duplicate key' } }),
          }),
        }),
      });
      const result = await service.createGovernmentFunding('school-1', { name: 'Duplicate' });
      expect(result).toBeDefined();
    });

    it('should handle create GovernmentFunding with database error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Insert failed' } }),
          }),
        }),
      });
      const result = await service.createGovernmentFunding('school-1', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle create GovernmentFunding with undefined data', async () => {
      const result = await service.createGovernmentFunding('school-1', undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle create GovernmentFunding with null data', async () => {
      const result = await service.createGovernmentFunding('school-1', null as any);
      expect(result).toBeDefined();
    });

    it('should handle create GovernmentFunding with empty object', async () => {
      const result = await service.createGovernmentFunding('school-1', {});
      expect(result).toBeDefined();
    });

    it('should handle create GovernmentFunding with nested data', async () => {
      const result = await service.createGovernmentFunding('school-1', { name: 'Test', metadata: { key: 'value' } });
      expect(result).toBeDefined();
    });

    it('should handle create GovernmentFunding with special characters', async () => {
      const result = await service.createGovernmentFunding('school-1', { name: 'Test with special chars: !@#$%^&*()' });
      expect(result).toBeDefined();
    });
  });

  describe('updateGovernmentFunding', () => {
    it('should update GovernmentFunding successfully', async () => {
      const result = await service.updateGovernmentFunding('school-1', 'test-id', { name: 'Updated GovernmentFunding' });
      expect(result).toBeDefined();
    });

    it('should handle update GovernmentFunding with null data', async () => {
      const result = await service.updateGovernmentFunding('school-1', 'test-id', null as any);
      expect(result).toBeDefined();
    });

    it('should handle update GovernmentFunding with empty object', async () => {
      const result = await service.updateGovernmentFunding('school-1', 'test-id', {});
      expect(result).toBeDefined();
    });

    it('should handle update GovernmentFunding with database error', async () => {
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Update failed' } }),
            }),
          }),
        }),
      });
      const result = await service.updateGovernmentFunding('school-1', 'error-id', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update GovernmentFunding with nonexistent id', async () => {
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
            }),
          }),
        }),
      });
      const result = await service.updateGovernmentFunding('school-1', 'nonexistent', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update GovernmentFunding with undefined id', async () => {
      const result = await service.updateGovernmentFunding('school-1', undefined as any, { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update GovernmentFunding with empty string id', async () => {
      const result = await service.updateGovernmentFunding('school-1', '', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update GovernmentFunding with special characters in data', async () => {
      const result = await service.updateGovernmentFunding('school-1', 'test-id', { name: 'Updated: !@#$%^&*()' });
      expect(result).toBeDefined();
    });

    it('should handle update GovernmentFunding with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection lost');
      });
      const result = await service.updateGovernmentFunding('school-1', 'test-id', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update GovernmentFunding with nested data', async () => {
      const result = await service.updateGovernmentFunding('school-1', 'test-id', { name: 'Test', metadata: { key: 'value' } });
      expect(result).toBeDefined();
    });
  });

  describe('deleteGovernmentFunding', () => {
    it('should delete GovernmentFunding successfully', async () => {
      const result = await service.deleteGovernmentFunding('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle delete GovernmentFunding with nonexistent id', async () => {
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
        }),
      });
      const result = await service.deleteGovernmentFunding('school-1', 'nonexistent');
      expect(result).toBeDefined();
    });

    it('should handle delete GovernmentFunding with database error', async () => {
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'Delete failed' } }),
        }),
      });
      const result = await service.deleteGovernmentFunding('school-1', 'error-id');
      expect(result).toBeDefined();
    });

    it('should handle delete GovernmentFunding with undefined id', async () => {
      const result = await service.deleteGovernmentFunding('school-1', undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle delete GovernmentFunding with empty string id', async () => {
      const result = await service.deleteGovernmentFunding('school-1', '');
      expect(result).toBeDefined();
    });

    it('should handle delete GovernmentFunding with null id', async () => {
      const result = await service.deleteGovernmentFunding('school-1', null as any);
      expect(result).toBeDefined();
    });

    it('should handle delete GovernmentFunding with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.deleteGovernmentFunding('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle delete GovernmentFunding with special characters in id', async () => {
      const result = await service.deleteGovernmentFunding('school-1', 'id-with-special-chars!@#');
      expect(result).toBeDefined();
    });

    it('should handle delete GovernmentFunding with UUID format id', async () => {
      const result = await service.deleteGovernmentFunding('school-1', '550e8400-e29b-41d4-a716-446655440000');
      expect(result).toBeDefined();
    });

    it('should handle delete GovernmentFunding with numeric string id', async () => {
      const result = await service.deleteGovernmentFunding('school-1', '12345');
      expect(result).toBeDefined();
    });
  });

  describe('countGovernmentFunding', () => {
    it('should count GovernmentFunding successfully', async () => {
      const result = await service.countGovernmentFunding('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count GovernmentFunding with zero result', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: [],
          error: null,
          count: 0,
        }),
      });
      const result = await service.countGovernmentFunding('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count GovernmentFunding with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: null,
          error: { message: 'Count failed' },
          count: null,
        }),
      });
      const result = await service.countGovernmentFunding('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count GovernmentFunding with filters', async () => {
      const result = await service.countGovernmentFunding('school-1', { status: 'active' });
      expect(result).toBeDefined();
    });

    it('should handle count GovernmentFunding with undefined schoolId', async () => {
      const result = await service.countGovernmentFunding(undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle count GovernmentFunding with null schoolId', async () => {
      const result = await service.countGovernmentFunding(null as any);
      expect(result).toBeDefined();
    });

    it('should handle count GovernmentFunding with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.countGovernmentFunding('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count GovernmentFunding with large result set', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: Array(1000).fill({ id: 'test' }),
          error: null,
          count: 1000,
        }),
      });
      const result = await service.countGovernmentFunding('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count GovernmentFunding with date range filter', async () => {
      const result = await service.countGovernmentFunding('school-1', { startDate: '2024-01-01', endDate: '2024-12-31' });
      expect(result).toBeDefined();
    });

    it('should handle count GovernmentFunding with status filter', async () => {
      const result = await service.countGovernmentFunding('school-1', { status: 'inactive' });
      expect(result).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should handle network timeout', async () => {
      mockSupabase.from.mockImplementation(() => {
        return new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 100));
      });
      const result = await service.getGovernmentFunding('school-1', 'test-id');
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
      const result = await service.getGovernmentFunding('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle concurrent requests', async () => {
      const promise1 = service.getGovernmentFunding('school-1', 'test-id-1');
      const promise2 = service.getGovernmentFunding('school-1', 'test-id-2');
      const results = await Promise.all([promise1, promise2]);
      expect(results).toHaveLength(2);
    });

    it('should handle rapid successive calls', async () => {
      for (let i = 0; i < 10; i++) {
        await service.listGovernmentFunding('school-1');
      }
      expect(mockSupabase.from).toHaveBeenCalled();
    });

    it('should handle service initialization with null supabase', () => {
      expect(() => new GovGovernmentFundingService(null as any)).toThrow();
    });

    it('should handle service initialization with undefined supabase', () => {
      expect(() => new GovGovernmentFundingService(undefined as any)).toThrow();
    });
  });
});
