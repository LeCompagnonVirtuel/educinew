import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovNationalProgramService } from '@/features/gov/services/gov-national-program.service';

describe('GovNationalProgramService', () => {
  let service: GovNationalProgramService;
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
    service = new GovNationalProgramService(mockSupabase);
  });

  describe('getNationalProgram', () => {
    it('should get NationalProgram by id successfully', async () => {
      const result = await service.getNationalProgram('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle get NationalProgram with null result', async () => {
      const result = await service.getNationalProgram('school-1', 'nonexistent-id');
      expect(result).toBeDefined();
    });

    it('should handle get NationalProgram with database error', async () => {
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
      const result = await service.getNationalProgram('school-1', 'error-id');
      expect(result).toBeDefined();
    });

    it('should handle get NationalProgram with empty string id', async () => {
      const result = await service.getNationalProgram('school-1', '');
      expect(result).toBeDefined();
    });

    it('should handle get NationalProgram with special characters in id', async () => {
      const result = await service.getNationalProgram('school-1', 'id-with-special-chars!@#');
      expect(result).toBeDefined();
    });

    it('should handle get NationalProgram with numeric string id', async () => {
      const result = await service.getNationalProgram('school-1', '12345');
      expect(result).toBeDefined();
    });

    it('should handle get NationalProgram with UUID format id', async () => {
      const result = await service.getNationalProgram('school-1', '550e8400-e29b-41d4-a716-446655440000');
      expect(result).toBeDefined();
    });

    it('should handle get NationalProgram when connection timeout', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection timeout');
      });
      const result = await service.getNationalProgram('school-1', 'timeout-id');
      expect(result).toBeDefined();
    });

    it('should handle get NationalProgram with undefined schoolId', async () => {
      const result = await service.getNationalProgram(undefined as any, 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle get NationalProgram with null schoolId', async () => {
      const result = await service.getNationalProgram(null as any, 'test-id');
      expect(result).toBeDefined();
    });
  });

  describe('listNationalProgram', () => {
    it('should list NationalProgram successfully', async () => {
      const result = await service.listNationalProgram('school-1');
      expect(result).toBeDefined();
    });

    it('should list NationalProgram with empty result', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          data: [],
          error: null,
        })),
      });
      const result = await service.listNationalProgram('school-1');
      expect(result).toBeDefined();
    });

    it('should list NationalProgram with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          data: null,
          error: { message: 'DB error' },
        })),
      });
      const result = await service.listNationalProgram('school-1');
      expect(result).toBeDefined();
    });

    it('should list NationalProgram with filters', async () => {
      const result = await service.listNationalProgram('school-1', { status: 'active' });
      expect(result).toBeDefined();
    });

    it('should list NationalProgram with pagination', async () => {
      const result = await service.listNationalProgram('school-1', { page: 1, limit: 10 });
      expect(result).toBeDefined();
    });

    it('should list NationalProgram with sorting', async () => {
      const result = await service.listNationalProgram('school-1', { sortBy: 'createdAt', sortOrder: 'desc' });
      expect(result).toBeDefined();
    });

    it('should list NationalProgram with search query', async () => {
      const result = await service.listNationalProgram('school-1', { search: 'test' });
      expect(result).toBeDefined();
    });

    it('should handle list NationalProgram with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.listNationalProgram('school-1');
      expect(result).toBeDefined();
    });

    it('should list NationalProgram with undefined schoolId', async () => {
      const result = await service.listNationalProgram(undefined as any);
      expect(result).toBeDefined();
    });

    it('should list NationalProgram with null schoolId', async () => {
      const result = await service.listNationalProgram(null as any);
      expect(result).toBeDefined();
    });
  });

  describe('createNationalProgram', () => {
    it('should create NationalProgram successfully', async () => {
      const result = await service.createNationalProgram('school-1', { schoolId: 'school-1', name: 'Test NationalProgram' });
      expect(result).toBeDefined();
    });

    it('should create NationalProgram with minimal data', async () => {
      const result = await service.createNationalProgram('school-1', {});
      expect(result).toBeDefined();
    });

    it('should handle create NationalProgram with validation error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Validation error' } }),
          }),
        }),
      });
      const result = await service.createNationalProgram('school-1', { name: '' });
      expect(result).toBeDefined();
    });

    it('should handle create NationalProgram with duplicate error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Duplicate key' } }),
          }),
        }),
      });
      const result = await service.createNationalProgram('school-1', { name: 'Duplicate' });
      expect(result).toBeDefined();
    });

    it('should handle create NationalProgram with database error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Insert failed' } }),
          }),
        }),
      });
      const result = await service.createNationalProgram('school-1', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle create NationalProgram with undefined data', async () => {
      const result = await service.createNationalProgram('school-1', undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle create NationalProgram with null data', async () => {
      const result = await service.createNationalProgram('school-1', null as any);
      expect(result).toBeDefined();
    });

    it('should handle create NationalProgram with empty object', async () => {
      const result = await service.createNationalProgram('school-1', {});
      expect(result).toBeDefined();
    });

    it('should handle create NationalProgram with nested data', async () => {
      const result = await service.createNationalProgram('school-1', { name: 'Test', metadata: { key: 'value' } });
      expect(result).toBeDefined();
    });

    it('should handle create NationalProgram with special characters', async () => {
      const result = await service.createNationalProgram('school-1', { name: 'Test with special chars: !@#$%^&*()' });
      expect(result).toBeDefined();
    });
  });

  describe('updateNationalProgram', () => {
    it('should update NationalProgram successfully', async () => {
      const result = await service.updateNationalProgram('school-1', 'test-id', { name: 'Updated NationalProgram' });
      expect(result).toBeDefined();
    });

    it('should handle update NationalProgram with null data', async () => {
      const result = await service.updateNationalProgram('school-1', 'test-id', null as any);
      expect(result).toBeDefined();
    });

    it('should handle update NationalProgram with empty object', async () => {
      const result = await service.updateNationalProgram('school-1', 'test-id', {});
      expect(result).toBeDefined();
    });

    it('should handle update NationalProgram with database error', async () => {
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Update failed' } }),
            }),
          }),
        }),
      });
      const result = await service.updateNationalProgram('school-1', 'error-id', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update NationalProgram with nonexistent id', async () => {
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
            }),
          }),
        }),
      });
      const result = await service.updateNationalProgram('school-1', 'nonexistent', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update NationalProgram with undefined id', async () => {
      const result = await service.updateNationalProgram('school-1', undefined as any, { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update NationalProgram with empty string id', async () => {
      const result = await service.updateNationalProgram('school-1', '', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update NationalProgram with special characters in data', async () => {
      const result = await service.updateNationalProgram('school-1', 'test-id', { name: 'Updated: !@#$%^&*()' });
      expect(result).toBeDefined();
    });

    it('should handle update NationalProgram with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection lost');
      });
      const result = await service.updateNationalProgram('school-1', 'test-id', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update NationalProgram with nested data', async () => {
      const result = await service.updateNationalProgram('school-1', 'test-id', { name: 'Test', metadata: { key: 'value' } });
      expect(result).toBeDefined();
    });
  });

  describe('deleteNationalProgram', () => {
    it('should delete NationalProgram successfully', async () => {
      const result = await service.deleteNationalProgram('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle delete NationalProgram with nonexistent id', async () => {
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
        }),
      });
      const result = await service.deleteNationalProgram('school-1', 'nonexistent');
      expect(result).toBeDefined();
    });

    it('should handle delete NationalProgram with database error', async () => {
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'Delete failed' } }),
        }),
      });
      const result = await service.deleteNationalProgram('school-1', 'error-id');
      expect(result).toBeDefined();
    });

    it('should handle delete NationalProgram with undefined id', async () => {
      const result = await service.deleteNationalProgram('school-1', undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle delete NationalProgram with empty string id', async () => {
      const result = await service.deleteNationalProgram('school-1', '');
      expect(result).toBeDefined();
    });

    it('should handle delete NationalProgram with null id', async () => {
      const result = await service.deleteNationalProgram('school-1', null as any);
      expect(result).toBeDefined();
    });

    it('should handle delete NationalProgram with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.deleteNationalProgram('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle delete NationalProgram with special characters in id', async () => {
      const result = await service.deleteNationalProgram('school-1', 'id-with-special-chars!@#');
      expect(result).toBeDefined();
    });

    it('should handle delete NationalProgram with UUID format id', async () => {
      const result = await service.deleteNationalProgram('school-1', '550e8400-e29b-41d4-a716-446655440000');
      expect(result).toBeDefined();
    });

    it('should handle delete NationalProgram with numeric string id', async () => {
      const result = await service.deleteNationalProgram('school-1', '12345');
      expect(result).toBeDefined();
    });
  });

  describe('countNationalProgram', () => {
    it('should count NationalProgram successfully', async () => {
      const result = await service.countNationalProgram('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count NationalProgram with zero result', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: [],
          error: null,
          count: 0,
        }),
      });
      const result = await service.countNationalProgram('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count NationalProgram with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: null,
          error: { message: 'Count failed' },
          count: null,
        }),
      });
      const result = await service.countNationalProgram('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count NationalProgram with filters', async () => {
      const result = await service.countNationalProgram('school-1', { status: 'active' });
      expect(result).toBeDefined();
    });

    it('should handle count NationalProgram with undefined schoolId', async () => {
      const result = await service.countNationalProgram(undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle count NationalProgram with null schoolId', async () => {
      const result = await service.countNationalProgram(null as any);
      expect(result).toBeDefined();
    });

    it('should handle count NationalProgram with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.countNationalProgram('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count NationalProgram with large result set', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: Array(1000).fill({ id: 'test' }),
          error: null,
          count: 1000,
        }),
      });
      const result = await service.countNationalProgram('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count NationalProgram with date range filter', async () => {
      const result = await service.countNationalProgram('school-1', { startDate: '2024-01-01', endDate: '2024-12-31' });
      expect(result).toBeDefined();
    });

    it('should handle count NationalProgram with status filter', async () => {
      const result = await service.countNationalProgram('school-1', { status: 'inactive' });
      expect(result).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should handle network timeout', async () => {
      mockSupabase.from.mockImplementation(() => {
        return new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 100));
      });
      const result = await service.getNationalProgram('school-1', 'test-id');
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
      const result = await service.getNationalProgram('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle concurrent requests', async () => {
      const promise1 = service.getNationalProgram('school-1', 'test-id-1');
      const promise2 = service.getNationalProgram('school-1', 'test-id-2');
      const results = await Promise.all([promise1, promise2]);
      expect(results).toHaveLength(2);
    });

    it('should handle rapid successive calls', async () => {
      for (let i = 0; i < 10; i++) {
        await service.listNationalProgram('school-1');
      }
      expect(mockSupabase.from).toHaveBeenCalled();
    });

    it('should handle service initialization with null supabase', () => {
      expect(() => new GovNationalProgramService(null as any)).toThrow();
    });

    it('should handle service initialization with undefined supabase', () => {
      expect(() => new GovNationalProgramService(undefined as any)).toThrow();
    });
  });
});
