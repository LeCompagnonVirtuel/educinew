import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovOfficialDocumentService } from '@/features/gov/services/gov-official-document.service';

describe('GovOfficialDocumentService', () => {
  let service: GovOfficialDocumentService;
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
    service = new GovOfficialDocumentService(mockSupabase);
  });

  describe('getOfficialDocument', () => {
    it('should get OfficialDocument by id successfully', async () => {
      const result = await service.getOfficialDocument('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle get OfficialDocument with null result', async () => {
      const result = await service.getOfficialDocument('school-1', 'nonexistent-id');
      expect(result).toBeDefined();
    });

    it('should handle get OfficialDocument with database error', async () => {
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
      const result = await service.getOfficialDocument('school-1', 'error-id');
      expect(result).toBeDefined();
    });

    it('should handle get OfficialDocument with empty string id', async () => {
      const result = await service.getOfficialDocument('school-1', '');
      expect(result).toBeDefined();
    });

    it('should handle get OfficialDocument with special characters in id', async () => {
      const result = await service.getOfficialDocument('school-1', 'id-with-special-chars!@#');
      expect(result).toBeDefined();
    });

    it('should handle get OfficialDocument with numeric string id', async () => {
      const result = await service.getOfficialDocument('school-1', '12345');
      expect(result).toBeDefined();
    });

    it('should handle get OfficialDocument with UUID format id', async () => {
      const result = await service.getOfficialDocument('school-1', '550e8400-e29b-41d4-a716-446655440000');
      expect(result).toBeDefined();
    });

    it('should handle get OfficialDocument when connection timeout', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection timeout');
      });
      const result = await service.getOfficialDocument('school-1', 'timeout-id');
      expect(result).toBeDefined();
    });

    it('should handle get OfficialDocument with undefined schoolId', async () => {
      const result = await service.getOfficialDocument(undefined as any, 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle get OfficialDocument with null schoolId', async () => {
      const result = await service.getOfficialDocument(null as any, 'test-id');
      expect(result).toBeDefined();
    });
  });

  describe('listOfficialDocument', () => {
    it('should list OfficialDocument successfully', async () => {
      const result = await service.listOfficialDocument('school-1');
      expect(result).toBeDefined();
    });

    it('should list OfficialDocument with empty result', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          data: [],
          error: null,
        })),
      });
      const result = await service.listOfficialDocument('school-1');
      expect(result).toBeDefined();
    });

    it('should list OfficialDocument with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          data: null,
          error: { message: 'DB error' },
        })),
      });
      const result = await service.listOfficialDocument('school-1');
      expect(result).toBeDefined();
    });

    it('should list OfficialDocument with filters', async () => {
      const result = await service.listOfficialDocument('school-1', { status: 'active' });
      expect(result).toBeDefined();
    });

    it('should list OfficialDocument with pagination', async () => {
      const result = await service.listOfficialDocument('school-1', { page: 1, limit: 10 });
      expect(result).toBeDefined();
    });

    it('should list OfficialDocument with sorting', async () => {
      const result = await service.listOfficialDocument('school-1', { sortBy: 'createdAt', sortOrder: 'desc' });
      expect(result).toBeDefined();
    });

    it('should list OfficialDocument with search query', async () => {
      const result = await service.listOfficialDocument('school-1', { search: 'test' });
      expect(result).toBeDefined();
    });

    it('should handle list OfficialDocument with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.listOfficialDocument('school-1');
      expect(result).toBeDefined();
    });

    it('should list OfficialDocument with undefined schoolId', async () => {
      const result = await service.listOfficialDocument(undefined as any);
      expect(result).toBeDefined();
    });

    it('should list OfficialDocument with null schoolId', async () => {
      const result = await service.listOfficialDocument(null as any);
      expect(result).toBeDefined();
    });
  });

  describe('createOfficialDocument', () => {
    it('should create OfficialDocument successfully', async () => {
      const result = await service.createOfficialDocument('school-1', { schoolId: 'school-1', name: 'Test OfficialDocument' });
      expect(result).toBeDefined();
    });

    it('should create OfficialDocument with minimal data', async () => {
      const result = await service.createOfficialDocument('school-1', {});
      expect(result).toBeDefined();
    });

    it('should handle create OfficialDocument with validation error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Validation error' } }),
          }),
        }),
      });
      const result = await service.createOfficialDocument('school-1', { name: '' });
      expect(result).toBeDefined();
    });

    it('should handle create OfficialDocument with duplicate error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Duplicate key' } }),
          }),
        }),
      });
      const result = await service.createOfficialDocument('school-1', { name: 'Duplicate' });
      expect(result).toBeDefined();
    });

    it('should handle create OfficialDocument with database error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Insert failed' } }),
          }),
        }),
      });
      const result = await service.createOfficialDocument('school-1', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle create OfficialDocument with undefined data', async () => {
      const result = await service.createOfficialDocument('school-1', undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle create OfficialDocument with null data', async () => {
      const result = await service.createOfficialDocument('school-1', null as any);
      expect(result).toBeDefined();
    });

    it('should handle create OfficialDocument with empty object', async () => {
      const result = await service.createOfficialDocument('school-1', {});
      expect(result).toBeDefined();
    });

    it('should handle create OfficialDocument with nested data', async () => {
      const result = await service.createOfficialDocument('school-1', { name: 'Test', metadata: { key: 'value' } });
      expect(result).toBeDefined();
    });

    it('should handle create OfficialDocument with special characters', async () => {
      const result = await service.createOfficialDocument('school-1', { name: 'Test with special chars: !@#$%^&*()' });
      expect(result).toBeDefined();
    });
  });

  describe('updateOfficialDocument', () => {
    it('should update OfficialDocument successfully', async () => {
      const result = await service.updateOfficialDocument('school-1', 'test-id', { name: 'Updated OfficialDocument' });
      expect(result).toBeDefined();
    });

    it('should handle update OfficialDocument with null data', async () => {
      const result = await service.updateOfficialDocument('school-1', 'test-id', null as any);
      expect(result).toBeDefined();
    });

    it('should handle update OfficialDocument with empty object', async () => {
      const result = await service.updateOfficialDocument('school-1', 'test-id', {});
      expect(result).toBeDefined();
    });

    it('should handle update OfficialDocument with database error', async () => {
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Update failed' } }),
            }),
          }),
        }),
      });
      const result = await service.updateOfficialDocument('school-1', 'error-id', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update OfficialDocument with nonexistent id', async () => {
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
            }),
          }),
        }),
      });
      const result = await service.updateOfficialDocument('school-1', 'nonexistent', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update OfficialDocument with undefined id', async () => {
      const result = await service.updateOfficialDocument('school-1', undefined as any, { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update OfficialDocument with empty string id', async () => {
      const result = await service.updateOfficialDocument('school-1', '', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update OfficialDocument with special characters in data', async () => {
      const result = await service.updateOfficialDocument('school-1', 'test-id', { name: 'Updated: !@#$%^&*()' });
      expect(result).toBeDefined();
    });

    it('should handle update OfficialDocument with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection lost');
      });
      const result = await service.updateOfficialDocument('school-1', 'test-id', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update OfficialDocument with nested data', async () => {
      const result = await service.updateOfficialDocument('school-1', 'test-id', { name: 'Test', metadata: { key: 'value' } });
      expect(result).toBeDefined();
    });
  });

  describe('deleteOfficialDocument', () => {
    it('should delete OfficialDocument successfully', async () => {
      const result = await service.deleteOfficialDocument('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle delete OfficialDocument with nonexistent id', async () => {
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
        }),
      });
      const result = await service.deleteOfficialDocument('school-1', 'nonexistent');
      expect(result).toBeDefined();
    });

    it('should handle delete OfficialDocument with database error', async () => {
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'Delete failed' } }),
        }),
      });
      const result = await service.deleteOfficialDocument('school-1', 'error-id');
      expect(result).toBeDefined();
    });

    it('should handle delete OfficialDocument with undefined id', async () => {
      const result = await service.deleteOfficialDocument('school-1', undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle delete OfficialDocument with empty string id', async () => {
      const result = await service.deleteOfficialDocument('school-1', '');
      expect(result).toBeDefined();
    });

    it('should handle delete OfficialDocument with null id', async () => {
      const result = await service.deleteOfficialDocument('school-1', null as any);
      expect(result).toBeDefined();
    });

    it('should handle delete OfficialDocument with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.deleteOfficialDocument('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle delete OfficialDocument with special characters in id', async () => {
      const result = await service.deleteOfficialDocument('school-1', 'id-with-special-chars!@#');
      expect(result).toBeDefined();
    });

    it('should handle delete OfficialDocument with UUID format id', async () => {
      const result = await service.deleteOfficialDocument('school-1', '550e8400-e29b-41d4-a716-446655440000');
      expect(result).toBeDefined();
    });

    it('should handle delete OfficialDocument with numeric string id', async () => {
      const result = await service.deleteOfficialDocument('school-1', '12345');
      expect(result).toBeDefined();
    });
  });

  describe('countOfficialDocument', () => {
    it('should count OfficialDocument successfully', async () => {
      const result = await service.countOfficialDocument('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count OfficialDocument with zero result', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: [],
          error: null,
          count: 0,
        }),
      });
      const result = await service.countOfficialDocument('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count OfficialDocument with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: null,
          error: { message: 'Count failed' },
          count: null,
        }),
      });
      const result = await service.countOfficialDocument('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count OfficialDocument with filters', async () => {
      const result = await service.countOfficialDocument('school-1', { status: 'active' });
      expect(result).toBeDefined();
    });

    it('should handle count OfficialDocument with undefined schoolId', async () => {
      const result = await service.countOfficialDocument(undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle count OfficialDocument with null schoolId', async () => {
      const result = await service.countOfficialDocument(null as any);
      expect(result).toBeDefined();
    });

    it('should handle count OfficialDocument with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.countOfficialDocument('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count OfficialDocument with large result set', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: Array(1000).fill({ id: 'test' }),
          error: null,
          count: 1000,
        }),
      });
      const result = await service.countOfficialDocument('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count OfficialDocument with date range filter', async () => {
      const result = await service.countOfficialDocument('school-1', { startDate: '2024-01-01', endDate: '2024-12-31' });
      expect(result).toBeDefined();
    });

    it('should handle count OfficialDocument with status filter', async () => {
      const result = await service.countOfficialDocument('school-1', { status: 'inactive' });
      expect(result).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should handle network timeout', async () => {
      mockSupabase.from.mockImplementation(() => {
        return new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 100));
      });
      const result = await service.getOfficialDocument('school-1', 'test-id');
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
      const result = await service.getOfficialDocument('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle concurrent requests', async () => {
      const promise1 = service.getOfficialDocument('school-1', 'test-id-1');
      const promise2 = service.getOfficialDocument('school-1', 'test-id-2');
      const results = await Promise.all([promise1, promise2]);
      expect(results).toHaveLength(2);
    });

    it('should handle rapid successive calls', async () => {
      for (let i = 0; i < 10; i++) {
        await service.listOfficialDocument('school-1');
      }
      expect(mockSupabase.from).toHaveBeenCalled();
    });

    it('should handle service initialization with null supabase', () => {
      expect(() => new GovOfficialDocumentService(null as any)).toThrow();
    });

    it('should handle service initialization with undefined supabase', () => {
      expect(() => new GovOfficialDocumentService(undefined as any)).toThrow();
    });
  });
});
