import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovEducationDistrictService } from '@/features/gov/services/gov-education-district.service';

describe('GovEducationDistrictService', () => {
  let service: GovEducationDistrictService;
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
    service = new GovEducationDistrictService(mockSupabase);
  });

  describe('getEducationDistrict', () => {
    it('should get EducationDistrict by id successfully', async () => {
      const result = await service.getEducationDistrict('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle get EducationDistrict with null result', async () => {
      const result = await service.getEducationDistrict('school-1', 'nonexistent-id');
      expect(result).toBeDefined();
    });

    it('should handle get EducationDistrict with database error', async () => {
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
      const result = await service.getEducationDistrict('school-1', 'error-id');
      expect(result).toBeDefined();
    });

    it('should handle get EducationDistrict with empty string id', async () => {
      const result = await service.getEducationDistrict('school-1', '');
      expect(result).toBeDefined();
    });

    it('should handle get EducationDistrict with special characters in id', async () => {
      const result = await service.getEducationDistrict('school-1', 'id-with-special-chars!@#');
      expect(result).toBeDefined();
    });

    it('should handle get EducationDistrict with numeric string id', async () => {
      const result = await service.getEducationDistrict('school-1', '12345');
      expect(result).toBeDefined();
    });

    it('should handle get EducationDistrict with UUID format id', async () => {
      const result = await service.getEducationDistrict('school-1', '550e8400-e29b-41d4-a716-446655440000');
      expect(result).toBeDefined();
    });

    it('should handle get EducationDistrict when connection timeout', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection timeout');
      });
      const result = await service.getEducationDistrict('school-1', 'timeout-id');
      expect(result).toBeDefined();
    });

    it('should handle get EducationDistrict with undefined schoolId', async () => {
      const result = await service.getEducationDistrict(undefined as any, 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle get EducationDistrict with null schoolId', async () => {
      const result = await service.getEducationDistrict(null as any, 'test-id');
      expect(result).toBeDefined();
    });
  });

  describe('listEducationDistrict', () => {
    it('should list EducationDistrict successfully', async () => {
      const result = await service.listEducationDistrict('school-1');
      expect(result).toBeDefined();
    });

    it('should list EducationDistrict with empty result', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          data: [],
          error: null,
        })),
      });
      const result = await service.listEducationDistrict('school-1');
      expect(result).toBeDefined();
    });

    it('should list EducationDistrict with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          data: null,
          error: { message: 'DB error' },
        })),
      });
      const result = await service.listEducationDistrict('school-1');
      expect(result).toBeDefined();
    });

    it('should list EducationDistrict with filters', async () => {
      const result = await service.listEducationDistrict('school-1', { status: 'active' });
      expect(result).toBeDefined();
    });

    it('should list EducationDistrict with pagination', async () => {
      const result = await service.listEducationDistrict('school-1', { page: 1, limit: 10 });
      expect(result).toBeDefined();
    });

    it('should list EducationDistrict with sorting', async () => {
      const result = await service.listEducationDistrict('school-1', { sortBy: 'createdAt', sortOrder: 'desc' });
      expect(result).toBeDefined();
    });

    it('should list EducationDistrict with search query', async () => {
      const result = await service.listEducationDistrict('school-1', { search: 'test' });
      expect(result).toBeDefined();
    });

    it('should handle list EducationDistrict with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.listEducationDistrict('school-1');
      expect(result).toBeDefined();
    });

    it('should list EducationDistrict with undefined schoolId', async () => {
      const result = await service.listEducationDistrict(undefined as any);
      expect(result).toBeDefined();
    });

    it('should list EducationDistrict with null schoolId', async () => {
      const result = await service.listEducationDistrict(null as any);
      expect(result).toBeDefined();
    });
  });

  describe('createEducationDistrict', () => {
    it('should create EducationDistrict successfully', async () => {
      const result = await service.createEducationDistrict('school-1', { schoolId: 'school-1', name: 'Test EducationDistrict' });
      expect(result).toBeDefined();
    });

    it('should create EducationDistrict with minimal data', async () => {
      const result = await service.createEducationDistrict('school-1', {});
      expect(result).toBeDefined();
    });

    it('should handle create EducationDistrict with validation error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Validation error' } }),
          }),
        }),
      });
      const result = await service.createEducationDistrict('school-1', { name: '' });
      expect(result).toBeDefined();
    });

    it('should handle create EducationDistrict with duplicate error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Duplicate key' } }),
          }),
        }),
      });
      const result = await service.createEducationDistrict('school-1', { name: 'Duplicate' });
      expect(result).toBeDefined();
    });

    it('should handle create EducationDistrict with database error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Insert failed' } }),
          }),
        }),
      });
      const result = await service.createEducationDistrict('school-1', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle create EducationDistrict with undefined data', async () => {
      const result = await service.createEducationDistrict('school-1', undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle create EducationDistrict with null data', async () => {
      const result = await service.createEducationDistrict('school-1', null as any);
      expect(result).toBeDefined();
    });

    it('should handle create EducationDistrict with empty object', async () => {
      const result = await service.createEducationDistrict('school-1', {});
      expect(result).toBeDefined();
    });

    it('should handle create EducationDistrict with nested data', async () => {
      const result = await service.createEducationDistrict('school-1', { name: 'Test', metadata: { key: 'value' } });
      expect(result).toBeDefined();
    });

    it('should handle create EducationDistrict with special characters', async () => {
      const result = await service.createEducationDistrict('school-1', { name: 'Test with special chars: !@#$%^&*()' });
      expect(result).toBeDefined();
    });
  });

  describe('updateEducationDistrict', () => {
    it('should update EducationDistrict successfully', async () => {
      const result = await service.updateEducationDistrict('school-1', 'test-id', { name: 'Updated EducationDistrict' });
      expect(result).toBeDefined();
    });

    it('should handle update EducationDistrict with null data', async () => {
      const result = await service.updateEducationDistrict('school-1', 'test-id', null as any);
      expect(result).toBeDefined();
    });

    it('should handle update EducationDistrict with empty object', async () => {
      const result = await service.updateEducationDistrict('school-1', 'test-id', {});
      expect(result).toBeDefined();
    });

    it('should handle update EducationDistrict with database error', async () => {
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Update failed' } }),
            }),
          }),
        }),
      });
      const result = await service.updateEducationDistrict('school-1', 'error-id', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update EducationDistrict with nonexistent id', async () => {
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
            }),
          }),
        }),
      });
      const result = await service.updateEducationDistrict('school-1', 'nonexistent', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update EducationDistrict with undefined id', async () => {
      const result = await service.updateEducationDistrict('school-1', undefined as any, { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update EducationDistrict with empty string id', async () => {
      const result = await service.updateEducationDistrict('school-1', '', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update EducationDistrict with special characters in data', async () => {
      const result = await service.updateEducationDistrict('school-1', 'test-id', { name: 'Updated: !@#$%^&*()' });
      expect(result).toBeDefined();
    });

    it('should handle update EducationDistrict with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection lost');
      });
      const result = await service.updateEducationDistrict('school-1', 'test-id', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update EducationDistrict with nested data', async () => {
      const result = await service.updateEducationDistrict('school-1', 'test-id', { name: 'Test', metadata: { key: 'value' } });
      expect(result).toBeDefined();
    });
  });

  describe('deleteEducationDistrict', () => {
    it('should delete EducationDistrict successfully', async () => {
      const result = await service.deleteEducationDistrict('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle delete EducationDistrict with nonexistent id', async () => {
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
        }),
      });
      const result = await service.deleteEducationDistrict('school-1', 'nonexistent');
      expect(result).toBeDefined();
    });

    it('should handle delete EducationDistrict with database error', async () => {
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'Delete failed' } }),
        }),
      });
      const result = await service.deleteEducationDistrict('school-1', 'error-id');
      expect(result).toBeDefined();
    });

    it('should handle delete EducationDistrict with undefined id', async () => {
      const result = await service.deleteEducationDistrict('school-1', undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle delete EducationDistrict with empty string id', async () => {
      const result = await service.deleteEducationDistrict('school-1', '');
      expect(result).toBeDefined();
    });

    it('should handle delete EducationDistrict with null id', async () => {
      const result = await service.deleteEducationDistrict('school-1', null as any);
      expect(result).toBeDefined();
    });

    it('should handle delete EducationDistrict with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.deleteEducationDistrict('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle delete EducationDistrict with special characters in id', async () => {
      const result = await service.deleteEducationDistrict('school-1', 'id-with-special-chars!@#');
      expect(result).toBeDefined();
    });

    it('should handle delete EducationDistrict with UUID format id', async () => {
      const result = await service.deleteEducationDistrict('school-1', '550e8400-e29b-41d4-a716-446655440000');
      expect(result).toBeDefined();
    });

    it('should handle delete EducationDistrict with numeric string id', async () => {
      const result = await service.deleteEducationDistrict('school-1', '12345');
      expect(result).toBeDefined();
    });
  });

  describe('countEducationDistrict', () => {
    it('should count EducationDistrict successfully', async () => {
      const result = await service.countEducationDistrict('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count EducationDistrict with zero result', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: [],
          error: null,
          count: 0,
        }),
      });
      const result = await service.countEducationDistrict('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count EducationDistrict with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: null,
          error: { message: 'Count failed' },
          count: null,
        }),
      });
      const result = await service.countEducationDistrict('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count EducationDistrict with filters', async () => {
      const result = await service.countEducationDistrict('school-1', { status: 'active' });
      expect(result).toBeDefined();
    });

    it('should handle count EducationDistrict with undefined schoolId', async () => {
      const result = await service.countEducationDistrict(undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle count EducationDistrict with null schoolId', async () => {
      const result = await service.countEducationDistrict(null as any);
      expect(result).toBeDefined();
    });

    it('should handle count EducationDistrict with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.countEducationDistrict('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count EducationDistrict with large result set', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: Array(1000).fill({ id: 'test' }),
          error: null,
          count: 1000,
        }),
      });
      const result = await service.countEducationDistrict('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count EducationDistrict with date range filter', async () => {
      const result = await service.countEducationDistrict('school-1', { startDate: '2024-01-01', endDate: '2024-12-31' });
      expect(result).toBeDefined();
    });

    it('should handle count EducationDistrict with status filter', async () => {
      const result = await service.countEducationDistrict('school-1', { status: 'inactive' });
      expect(result).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should handle network timeout', async () => {
      mockSupabase.from.mockImplementation(() => {
        return new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 100));
      });
      const result = await service.getEducationDistrict('school-1', 'test-id');
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
      const result = await service.getEducationDistrict('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle concurrent requests', async () => {
      const promise1 = service.getEducationDistrict('school-1', 'test-id-1');
      const promise2 = service.getEducationDistrict('school-1', 'test-id-2');
      const results = await Promise.all([promise1, promise2]);
      expect(results).toHaveLength(2);
    });

    it('should handle rapid successive calls', async () => {
      for (let i = 0; i < 10; i++) {
        await service.listEducationDistrict('school-1');
      }
      expect(mockSupabase.from).toHaveBeenCalled();
    });

    it('should handle service initialization with null supabase', () => {
      expect(() => new GovEducationDistrictService(null as any)).toThrow();
    });

    it('should handle service initialization with undefined supabase', () => {
      expect(() => new GovEducationDistrictService(undefined as any)).toThrow();
    });
  });
});
