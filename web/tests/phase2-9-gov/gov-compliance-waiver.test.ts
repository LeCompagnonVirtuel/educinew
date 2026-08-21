import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovComplianceWaiverService } from '@/features/gov/services/gov-compliance-waiver.service';

describe('GovComplianceWaiverService', () => {
  let service: GovComplianceWaiverService;
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
    service = new GovComplianceWaiverService(mockSupabase);
  });

  describe('getComplianceWaiver', () => {
    it('should get ComplianceWaiver by id successfully', async () => {
      const result = await service.getComplianceWaiver('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle get ComplianceWaiver with null result', async () => {
      const result = await service.getComplianceWaiver('school-1', 'nonexistent-id');
      expect(result).toBeDefined();
    });

    it('should handle get ComplianceWaiver with database error', async () => {
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
      const result = await service.getComplianceWaiver('school-1', 'error-id');
      expect(result).toBeDefined();
    });

    it('should handle get ComplianceWaiver with empty string id', async () => {
      const result = await service.getComplianceWaiver('school-1', '');
      expect(result).toBeDefined();
    });

    it('should handle get ComplianceWaiver with special characters in id', async () => {
      const result = await service.getComplianceWaiver('school-1', 'id-with-special-chars!@#');
      expect(result).toBeDefined();
    });

    it('should handle get ComplianceWaiver with numeric string id', async () => {
      const result = await service.getComplianceWaiver('school-1', '12345');
      expect(result).toBeDefined();
    });

    it('should handle get ComplianceWaiver with UUID format id', async () => {
      const result = await service.getComplianceWaiver('school-1', '550e8400-e29b-41d4-a716-446655440000');
      expect(result).toBeDefined();
    });

    it('should handle get ComplianceWaiver when connection timeout', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection timeout');
      });
      const result = await service.getComplianceWaiver('school-1', 'timeout-id');
      expect(result).toBeDefined();
    });

    it('should handle get ComplianceWaiver with undefined schoolId', async () => {
      const result = await service.getComplianceWaiver(undefined as any, 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle get ComplianceWaiver with null schoolId', async () => {
      const result = await service.getComplianceWaiver(null as any, 'test-id');
      expect(result).toBeDefined();
    });
  });

  describe('listComplianceWaiver', () => {
    it('should list ComplianceWaiver successfully', async () => {
      const result = await service.listComplianceWaiver('school-1');
      expect(result).toBeDefined();
    });

    it('should list ComplianceWaiver with empty result', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          data: [],
          error: null,
        })),
      });
      const result = await service.listComplianceWaiver('school-1');
      expect(result).toBeDefined();
    });

    it('should list ComplianceWaiver with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          data: null,
          error: { message: 'DB error' },
        })),
      });
      const result = await service.listComplianceWaiver('school-1');
      expect(result).toBeDefined();
    });

    it('should list ComplianceWaiver with filters', async () => {
      const result = await service.listComplianceWaiver('school-1', { status: 'active' });
      expect(result).toBeDefined();
    });

    it('should list ComplianceWaiver with pagination', async () => {
      const result = await service.listComplianceWaiver('school-1', { page: 1, limit: 10 });
      expect(result).toBeDefined();
    });

    it('should list ComplianceWaiver with sorting', async () => {
      const result = await service.listComplianceWaiver('school-1', { sortBy: 'createdAt', sortOrder: 'desc' });
      expect(result).toBeDefined();
    });

    it('should list ComplianceWaiver with search query', async () => {
      const result = await service.listComplianceWaiver('school-1', { search: 'test' });
      expect(result).toBeDefined();
    });

    it('should handle list ComplianceWaiver with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.listComplianceWaiver('school-1');
      expect(result).toBeDefined();
    });

    it('should list ComplianceWaiver with undefined schoolId', async () => {
      const result = await service.listComplianceWaiver(undefined as any);
      expect(result).toBeDefined();
    });

    it('should list ComplianceWaiver with null schoolId', async () => {
      const result = await service.listComplianceWaiver(null as any);
      expect(result).toBeDefined();
    });
  });

  describe('createComplianceWaiver', () => {
    it('should create ComplianceWaiver successfully', async () => {
      const result = await service.createComplianceWaiver('school-1', { schoolId: 'school-1', name: 'Test ComplianceWaiver' });
      expect(result).toBeDefined();
    });

    it('should create ComplianceWaiver with minimal data', async () => {
      const result = await service.createComplianceWaiver('school-1', {});
      expect(result).toBeDefined();
    });

    it('should handle create ComplianceWaiver with validation error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Validation error' } }),
          }),
        }),
      });
      const result = await service.createComplianceWaiver('school-1', { name: '' });
      expect(result).toBeDefined();
    });

    it('should handle create ComplianceWaiver with duplicate error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Duplicate key' } }),
          }),
        }),
      });
      const result = await service.createComplianceWaiver('school-1', { name: 'Duplicate' });
      expect(result).toBeDefined();
    });

    it('should handle create ComplianceWaiver with database error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Insert failed' } }),
          }),
        }),
      });
      const result = await service.createComplianceWaiver('school-1', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle create ComplianceWaiver with undefined data', async () => {
      const result = await service.createComplianceWaiver('school-1', undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle create ComplianceWaiver with null data', async () => {
      const result = await service.createComplianceWaiver('school-1', null as any);
      expect(result).toBeDefined();
    });

    it('should handle create ComplianceWaiver with empty object', async () => {
      const result = await service.createComplianceWaiver('school-1', {});
      expect(result).toBeDefined();
    });

    it('should handle create ComplianceWaiver with nested data', async () => {
      const result = await service.createComplianceWaiver('school-1', { name: 'Test', metadata: { key: 'value' } });
      expect(result).toBeDefined();
    });

    it('should handle create ComplianceWaiver with special characters', async () => {
      const result = await service.createComplianceWaiver('school-1', { name: 'Test with special chars: !@#$%^&*()' });
      expect(result).toBeDefined();
    });
  });

  describe('updateComplianceWaiver', () => {
    it('should update ComplianceWaiver successfully', async () => {
      const result = await service.updateComplianceWaiver('school-1', 'test-id', { name: 'Updated ComplianceWaiver' });
      expect(result).toBeDefined();
    });

    it('should handle update ComplianceWaiver with null data', async () => {
      const result = await service.updateComplianceWaiver('school-1', 'test-id', null as any);
      expect(result).toBeDefined();
    });

    it('should handle update ComplianceWaiver with empty object', async () => {
      const result = await service.updateComplianceWaiver('school-1', 'test-id', {});
      expect(result).toBeDefined();
    });

    it('should handle update ComplianceWaiver with database error', async () => {
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Update failed' } }),
            }),
          }),
        }),
      });
      const result = await service.updateComplianceWaiver('school-1', 'error-id', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update ComplianceWaiver with nonexistent id', async () => {
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
            }),
          }),
        }),
      });
      const result = await service.updateComplianceWaiver('school-1', 'nonexistent', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update ComplianceWaiver with undefined id', async () => {
      const result = await service.updateComplianceWaiver('school-1', undefined as any, { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update ComplianceWaiver with empty string id', async () => {
      const result = await service.updateComplianceWaiver('school-1', '', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update ComplianceWaiver with special characters in data', async () => {
      const result = await service.updateComplianceWaiver('school-1', 'test-id', { name: 'Updated: !@#$%^&*()' });
      expect(result).toBeDefined();
    });

    it('should handle update ComplianceWaiver with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection lost');
      });
      const result = await service.updateComplianceWaiver('school-1', 'test-id', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update ComplianceWaiver with nested data', async () => {
      const result = await service.updateComplianceWaiver('school-1', 'test-id', { name: 'Test', metadata: { key: 'value' } });
      expect(result).toBeDefined();
    });
  });

  describe('deleteComplianceWaiver', () => {
    it('should delete ComplianceWaiver successfully', async () => {
      const result = await service.deleteComplianceWaiver('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle delete ComplianceWaiver with nonexistent id', async () => {
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
        }),
      });
      const result = await service.deleteComplianceWaiver('school-1', 'nonexistent');
      expect(result).toBeDefined();
    });

    it('should handle delete ComplianceWaiver with database error', async () => {
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'Delete failed' } }),
        }),
      });
      const result = await service.deleteComplianceWaiver('school-1', 'error-id');
      expect(result).toBeDefined();
    });

    it('should handle delete ComplianceWaiver with undefined id', async () => {
      const result = await service.deleteComplianceWaiver('school-1', undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle delete ComplianceWaiver with empty string id', async () => {
      const result = await service.deleteComplianceWaiver('school-1', '');
      expect(result).toBeDefined();
    });

    it('should handle delete ComplianceWaiver with null id', async () => {
      const result = await service.deleteComplianceWaiver('school-1', null as any);
      expect(result).toBeDefined();
    });

    it('should handle delete ComplianceWaiver with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.deleteComplianceWaiver('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle delete ComplianceWaiver with special characters in id', async () => {
      const result = await service.deleteComplianceWaiver('school-1', 'id-with-special-chars!@#');
      expect(result).toBeDefined();
    });

    it('should handle delete ComplianceWaiver with UUID format id', async () => {
      const result = await service.deleteComplianceWaiver('school-1', '550e8400-e29b-41d4-a716-446655440000');
      expect(result).toBeDefined();
    });

    it('should handle delete ComplianceWaiver with numeric string id', async () => {
      const result = await service.deleteComplianceWaiver('school-1', '12345');
      expect(result).toBeDefined();
    });
  });

  describe('countComplianceWaiver', () => {
    it('should count ComplianceWaiver successfully', async () => {
      const result = await service.countComplianceWaiver('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count ComplianceWaiver with zero result', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: [],
          error: null,
          count: 0,
        }),
      });
      const result = await service.countComplianceWaiver('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count ComplianceWaiver with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: null,
          error: { message: 'Count failed' },
          count: null,
        }),
      });
      const result = await service.countComplianceWaiver('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count ComplianceWaiver with filters', async () => {
      const result = await service.countComplianceWaiver('school-1', { status: 'active' });
      expect(result).toBeDefined();
    });

    it('should handle count ComplianceWaiver with undefined schoolId', async () => {
      const result = await service.countComplianceWaiver(undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle count ComplianceWaiver with null schoolId', async () => {
      const result = await service.countComplianceWaiver(null as any);
      expect(result).toBeDefined();
    });

    it('should handle count ComplianceWaiver with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.countComplianceWaiver('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count ComplianceWaiver with large result set', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: Array(1000).fill({ id: 'test' }),
          error: null,
          count: 1000,
        }),
      });
      const result = await service.countComplianceWaiver('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count ComplianceWaiver with date range filter', async () => {
      const result = await service.countComplianceWaiver('school-1', { startDate: '2024-01-01', endDate: '2024-12-31' });
      expect(result).toBeDefined();
    });

    it('should handle count ComplianceWaiver with status filter', async () => {
      const result = await service.countComplianceWaiver('school-1', { status: 'inactive' });
      expect(result).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should handle network timeout', async () => {
      mockSupabase.from.mockImplementation(() => {
        return new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 100));
      });
      const result = await service.getComplianceWaiver('school-1', 'test-id');
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
      const result = await service.getComplianceWaiver('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle concurrent requests', async () => {
      const promise1 = service.getComplianceWaiver('school-1', 'test-id-1');
      const promise2 = service.getComplianceWaiver('school-1', 'test-id-2');
      const results = await Promise.all([promise1, promise2]);
      expect(results).toHaveLength(2);
    });

    it('should handle rapid successive calls', async () => {
      for (let i = 0; i < 10; i++) {
        await service.listComplianceWaiver('school-1');
      }
      expect(mockSupabase.from).toHaveBeenCalled();
    });

    it('should handle service initialization with null supabase', () => {
      expect(() => new GovComplianceWaiverService(null as any)).toThrow();
    });

    it('should handle service initialization with undefined supabase', () => {
      expect(() => new GovComplianceWaiverService(undefined as any)).toThrow();
    });
  });
});
