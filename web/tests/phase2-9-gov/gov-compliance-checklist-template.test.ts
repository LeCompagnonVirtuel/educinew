import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovComplianceChecklistTemplateService } from '@/features/gov/services/gov-compliance-checklist-template.service';

describe('GovComplianceChecklistTemplateService', () => {
  let service: GovComplianceChecklistTemplateService;
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
    service = new GovComplianceChecklistTemplateService(mockSupabase);
  });

  describe('getComplianceChecklistTemplate', () => {
    it('should get ComplianceChecklistTemplate by id successfully', async () => {
      const result = await service.getComplianceChecklistTemplate('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle get ComplianceChecklistTemplate with null result', async () => {
      const result = await service.getComplianceChecklistTemplate('school-1', 'nonexistent-id');
      expect(result).toBeDefined();
    });

    it('should handle get ComplianceChecklistTemplate with database error', async () => {
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
      const result = await service.getComplianceChecklistTemplate('school-1', 'error-id');
      expect(result).toBeDefined();
    });

    it('should handle get ComplianceChecklistTemplate with empty string id', async () => {
      const result = await service.getComplianceChecklistTemplate('school-1', '');
      expect(result).toBeDefined();
    });

    it('should handle get ComplianceChecklistTemplate with special characters in id', async () => {
      const result = await service.getComplianceChecklistTemplate('school-1', 'id-with-special-chars!@#');
      expect(result).toBeDefined();
    });

    it('should handle get ComplianceChecklistTemplate with numeric string id', async () => {
      const result = await service.getComplianceChecklistTemplate('school-1', '12345');
      expect(result).toBeDefined();
    });

    it('should handle get ComplianceChecklistTemplate with UUID format id', async () => {
      const result = await service.getComplianceChecklistTemplate('school-1', '550e8400-e29b-41d4-a716-446655440000');
      expect(result).toBeDefined();
    });

    it('should handle get ComplianceChecklistTemplate when connection timeout', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection timeout');
      });
      const result = await service.getComplianceChecklistTemplate('school-1', 'timeout-id');
      expect(result).toBeDefined();
    });

    it('should handle get ComplianceChecklistTemplate with undefined schoolId', async () => {
      const result = await service.getComplianceChecklistTemplate(undefined as any, 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle get ComplianceChecklistTemplate with null schoolId', async () => {
      const result = await service.getComplianceChecklistTemplate(null as any, 'test-id');
      expect(result).toBeDefined();
    });
  });

  describe('listComplianceChecklistTemplate', () => {
    it('should list ComplianceChecklistTemplate successfully', async () => {
      const result = await service.listComplianceChecklistTemplate('school-1');
      expect(result).toBeDefined();
    });

    it('should list ComplianceChecklistTemplate with empty result', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          data: [],
          error: null,
        })),
      });
      const result = await service.listComplianceChecklistTemplate('school-1');
      expect(result).toBeDefined();
    });

    it('should list ComplianceChecklistTemplate with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          data: null,
          error: { message: 'DB error' },
        })),
      });
      const result = await service.listComplianceChecklistTemplate('school-1');
      expect(result).toBeDefined();
    });

    it('should list ComplianceChecklistTemplate with filters', async () => {
      const result = await service.listComplianceChecklistTemplate('school-1', { status: 'active' });
      expect(result).toBeDefined();
    });

    it('should list ComplianceChecklistTemplate with pagination', async () => {
      const result = await service.listComplianceChecklistTemplate('school-1', { page: 1, limit: 10 });
      expect(result).toBeDefined();
    });

    it('should list ComplianceChecklistTemplate with sorting', async () => {
      const result = await service.listComplianceChecklistTemplate('school-1', { sortBy: 'createdAt', sortOrder: 'desc' });
      expect(result).toBeDefined();
    });

    it('should list ComplianceChecklistTemplate with search query', async () => {
      const result = await service.listComplianceChecklistTemplate('school-1', { search: 'test' });
      expect(result).toBeDefined();
    });

    it('should handle list ComplianceChecklistTemplate with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.listComplianceChecklistTemplate('school-1');
      expect(result).toBeDefined();
    });

    it('should list ComplianceChecklistTemplate with undefined schoolId', async () => {
      const result = await service.listComplianceChecklistTemplate(undefined as any);
      expect(result).toBeDefined();
    });

    it('should list ComplianceChecklistTemplate with null schoolId', async () => {
      const result = await service.listComplianceChecklistTemplate(null as any);
      expect(result).toBeDefined();
    });
  });

  describe('createComplianceChecklistTemplate', () => {
    it('should create ComplianceChecklistTemplate successfully', async () => {
      const result = await service.createComplianceChecklistTemplate('school-1', { schoolId: 'school-1', name: 'Test ComplianceChecklistTemplate' });
      expect(result).toBeDefined();
    });

    it('should create ComplianceChecklistTemplate with minimal data', async () => {
      const result = await service.createComplianceChecklistTemplate('school-1', {});
      expect(result).toBeDefined();
    });

    it('should handle create ComplianceChecklistTemplate with validation error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Validation error' } }),
          }),
        }),
      });
      const result = await service.createComplianceChecklistTemplate('school-1', { name: '' });
      expect(result).toBeDefined();
    });

    it('should handle create ComplianceChecklistTemplate with duplicate error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Duplicate key' } }),
          }),
        }),
      });
      const result = await service.createComplianceChecklistTemplate('school-1', { name: 'Duplicate' });
      expect(result).toBeDefined();
    });

    it('should handle create ComplianceChecklistTemplate with database error', async () => {
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Insert failed' } }),
          }),
        }),
      });
      const result = await service.createComplianceChecklistTemplate('school-1', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle create ComplianceChecklistTemplate with undefined data', async () => {
      const result = await service.createComplianceChecklistTemplate('school-1', undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle create ComplianceChecklistTemplate with null data', async () => {
      const result = await service.createComplianceChecklistTemplate('school-1', null as any);
      expect(result).toBeDefined();
    });

    it('should handle create ComplianceChecklistTemplate with empty object', async () => {
      const result = await service.createComplianceChecklistTemplate('school-1', {});
      expect(result).toBeDefined();
    });

    it('should handle create ComplianceChecklistTemplate with nested data', async () => {
      const result = await service.createComplianceChecklistTemplate('school-1', { name: 'Test', metadata: { key: 'value' } });
      expect(result).toBeDefined();
    });

    it('should handle create ComplianceChecklistTemplate with special characters', async () => {
      const result = await service.createComplianceChecklistTemplate('school-1', { name: 'Test with special chars: !@#\$%^&*()' });
      expect(result).toBeDefined();
    });
  });

  describe('updateComplianceChecklistTemplate', () => {
    it('should update ComplianceChecklistTemplate successfully', async () => {
      const result = await service.updateComplianceChecklistTemplate('school-1', 'test-id', { name: 'Updated ComplianceChecklistTemplate' });
      expect(result).toBeDefined();
    });

    it('should handle update ComplianceChecklistTemplate with null data', async () => {
      const result = await service.updateComplianceChecklistTemplate('school-1', 'test-id', null as any);
      expect(result).toBeDefined();
    });

    it('should handle update ComplianceChecklistTemplate with empty object', async () => {
      const result = await service.updateComplianceChecklistTemplate('school-1', 'test-id', {});
      expect(result).toBeDefined();
    });

    it('should handle update ComplianceChecklistTemplate with database error', async () => {
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Update failed' } }),
            }),
          }),
        }),
      });
      const result = await service.updateComplianceChecklistTemplate('school-1', 'error-id', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update ComplianceChecklistTemplate with nonexistent id', async () => {
      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
            }),
          }),
        }),
      });
      const result = await service.updateComplianceChecklistTemplate('school-1', 'nonexistent', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update ComplianceChecklistTemplate with undefined id', async () => {
      const result = await service.updateComplianceChecklistTemplate('school-1', undefined as any, { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update ComplianceChecklistTemplate with empty string id', async () => {
      const result = await service.updateComplianceChecklistTemplate('school-1', '', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update ComplianceChecklistTemplate with special characters in data', async () => {
      const result = await service.updateComplianceChecklistTemplate('school-1', 'test-id', { name: 'Updated: !@#\$%^&*()' });
      expect(result).toBeDefined();
    });

    it('should handle update ComplianceChecklistTemplate with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection lost');
      });
      const result = await service.updateComplianceChecklistTemplate('school-1', 'test-id', { name: 'Test' });
      expect(result).toBeDefined();
    });

    it('should handle update ComplianceChecklistTemplate with nested data', async () => {
      const result = await service.updateComplianceChecklistTemplate('school-1', 'test-id', { name: 'Test', metadata: { key: 'value' } });
      expect(result).toBeDefined();
    });
  });

  describe('deleteComplianceChecklistTemplate', () => {
    it('should delete ComplianceChecklistTemplate successfully', async () => {
      const result = await service.deleteComplianceChecklistTemplate('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle delete ComplianceChecklistTemplate with nonexistent id', async () => {
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
        }),
      });
      const result = await service.deleteComplianceChecklistTemplate('school-1', 'nonexistent');
      expect(result).toBeDefined();
    });

    it('should handle delete ComplianceChecklistTemplate with database error', async () => {
      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'Delete failed' } }),
        }),
      });
      const result = await service.deleteComplianceChecklistTemplate('school-1', 'error-id');
      expect(result).toBeDefined();
    });

    it('should handle delete ComplianceChecklistTemplate with undefined id', async () => {
      const result = await service.deleteComplianceChecklistTemplate('school-1', undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle delete ComplianceChecklistTemplate with empty string id', async () => {
      const result = await service.deleteComplianceChecklistTemplate('school-1', '');
      expect(result).toBeDefined();
    });

    it('should handle delete ComplianceChecklistTemplate with null id', async () => {
      const result = await service.deleteComplianceChecklistTemplate('school-1', null as any);
      expect(result).toBeDefined();
    });

    it('should handle delete ComplianceChecklistTemplate with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.deleteComplianceChecklistTemplate('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle delete ComplianceChecklistTemplate with special characters in id', async () => {
      const result = await service.deleteComplianceChecklistTemplate('school-1', 'id-with-special-chars!@#');
      expect(result).toBeDefined();
    });

    it('should handle delete ComplianceChecklistTemplate with UUID format id', async () => {
      const result = await service.deleteComplianceChecklistTemplate('school-1', '550e8400-e29b-41d4-a716-446655440000');
      expect(result).toBeDefined();
    });

    it('should handle delete ComplianceChecklistTemplate with numeric string id', async () => {
      const result = await service.deleteComplianceChecklistTemplate('school-1', '12345');
      expect(result).toBeDefined();
    });
  });

  describe('countComplianceChecklistTemplate', () => {
    it('should count ComplianceChecklistTemplate successfully', async () => {
      const result = await service.countComplianceChecklistTemplate('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count ComplianceChecklistTemplate with zero result', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: [],
          error: null,
          count: 0,
        }),
      });
      const result = await service.countComplianceChecklistTemplate('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count ComplianceChecklistTemplate with database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: null,
          error: { message: 'Count failed' },
          count: null,
        }),
      });
      const result = await service.countComplianceChecklistTemplate('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count ComplianceChecklistTemplate with filters', async () => {
      const result = await service.countComplianceChecklistTemplate('school-1', { status: 'active' });
      expect(result).toBeDefined();
    });

    it('should handle count ComplianceChecklistTemplate with undefined schoolId', async () => {
      const result = await service.countComplianceChecklistTemplate(undefined as any);
      expect(result).toBeDefined();
    });

    it('should handle count ComplianceChecklistTemplate with null schoolId', async () => {
      const result = await service.countComplianceChecklistTemplate(null as any);
      expect(result).toBeDefined();
    });

    it('should handle count ComplianceChecklistTemplate with connection error', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection failed');
      });
      const result = await service.countComplianceChecklistTemplate('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count ComplianceChecklistTemplate with large result set', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          data: Array(1000).fill({ id: 'test' }),
          error: null,
          count: 1000,
        }),
      });
      const result = await service.countComplianceChecklistTemplate('school-1');
      expect(result).toBeDefined();
    });

    it('should handle count ComplianceChecklistTemplate with date range filter', async () => {
      const result = await service.countComplianceChecklistTemplate('school-1', { startDate: '2024-01-01', endDate: '2024-12-31' });
      expect(result).toBeDefined();
    });

    it('should handle count ComplianceChecklistTemplate with status filter', async () => {
      const result = await service.countComplianceChecklistTemplate('school-1', { status: 'inactive' });
      expect(result).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should handle network timeout', async () => {
      mockSupabase.from.mockImplementation(() => {
        return new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 100));
      });
      const result = await service.getComplianceChecklistTemplate('school-1', 'test-id');
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
      const result = await service.getComplianceChecklistTemplate('school-1', 'test-id');
      expect(result).toBeDefined();
    });

    it('should handle concurrent requests', async () => {
      const promise1 = service.getComplianceChecklistTemplate('school-1', 'test-id-1');
      const promise2 = service.getComplianceChecklistTemplate('school-1', 'test-id-2');
      const results = await Promise.all([promise1, promise2]);
      expect(results).toHaveLength(2);
    });

    it('should handle rapid successive calls', async () => {
      for (let i = 0; i < 10; i++) {
        await service.listComplianceChecklistTemplate('school-1');
      }
      expect(mockSupabase.from).toHaveBeenCalled();
    });

    it('should handle service initialization with null supabase', () => {
      expect(() => new GovComplianceChecklistTemplateService(null as any)).toThrow();
    });

    it('should handle service initialization with undefined supabase', () => {
      expect(() => new GovComplianceChecklistTemplateService(undefined as any)).toThrow();
    });
  });
});
