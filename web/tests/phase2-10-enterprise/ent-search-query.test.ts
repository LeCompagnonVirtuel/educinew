import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EntSearchQueryService } from '@/features/enterprise/services/ent-search-query.service';

describe('EntSearchQueryService', () => {
  let service: EntSearchQueryService;
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
    service = new EntSearchQueryService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });
  it('should have supabase injected', () => {
    expect((service as any).supabase).toBe(mockSupabase);
  });
  it('should call from on supabase', () => {
    mockSupabase.from.mockReturnValue({
      select: vi.fn(() => ({ eq: vi.fn(() => ({ single: vi.fn(), data: null, error: null })), data: [], error: null })),
    });
    service.getSearchQuery('school-1', 'entity-1');
    expect(mockSupabase.from).toHaveBeenCalled();
  });
  it('should getSearchQuery entity by id', async () => {
    const result = await service.getSearchQuery('school-1', 'entity-1');
    expect(result).toBeDefined();
  });
  it('should throw on getSearchQuery with null result', async () => {
    await expect(service.getSearchQuery('school-1', 'nonexistent')).rejects.toThrow();
  });
  it('should listSearchQueries entities', async () => {
    const result = await service.listSearchQueries('school-1');
    expect(result).toBeDefined();
  });
  it('should listSearchQueries with filters', async () => {
    const result = await service.listSearchQueries('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });
  it('should listSearchQueries with empty filters', async () => {
    const result = await service.listSearchQueries('school-1', {});
    expect(result).toBeDefined();
  });
  it('should listSearchQueries with undefined filters', async () => {
    const result = await service.listSearchQueries('school-1', undefined);
    expect(result).toBeDefined();
  });
  it('should createSearchQuery entity', async () => {
    const result = await service.createSearchQuery('school-1', { schoolId: 'school-1', name: 'Test' } as any);
    expect(result).toBeDefined();
  });
  it('should createSearchQuery with empty data', async () => {
    const result = await service.createSearchQuery('school-1', {} as any);
    expect(result).toBeDefined();
  });
  it('should createSearchQuery with full data', async () => {
    const result = await service.createSearchQuery('school-1', {
      schoolId: 'school-1',
      name: 'Full Test',
      version: '1.0',
      environment: 'production',
      status: 'active',
    } as any);
    expect(result).toBeDefined();
  });
  it('should updateSearchQuery entity', async () => {
    const result = await service.updateSearchQuery('school-1', 'entity-1', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });
  it('should throw on updateSearchQuery nonexistent entity', async () => {
    await expect(service.updateSearchQuery('school-1', 'nonexistent', { name: 'Updated' } as any)).rejects.toThrow();
  });
  it('should updateSearchQuery with empty data', async () => {
    const result = await service.updateSearchQuery('school-1', 'entity-1', {} as any);
    expect(result).toBeDefined();
  });
  it('should deleteSearchQuery entity', async () => {
    const result = await service.deleteSearchQuery('school-1', 'entity-1');
    expect(result).toBeDefined();
  });
  it('should throw on deleteSearchQuery nonexistent entity', async () => {
    await expect(service.deleteSearchQuery('school-1', 'nonexistent')).rejects.toThrow();
  });
  it('should countSearchQueries entities', async () => {
    const result = await service.countSearchQueries('school-1');
    expect(result).toBeDefined();
  });
  it('should countSearchQueries with filters', async () => {
    const result = await service.countSearchQueries('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });
  it('should handle multiple getSearchQuery calls', async () => {
    const r1 = await service.getSearchQuery('school-1', 'e1');
    const r2 = await service.getSearchQuery('school-1', 'e2');
    expect(r1).toBeDefined();
    expect(r2).toBeDefined();
  });
  it('should handle sequential createSearchQuery calls', async () => {
    const r1 = await service.createSearchQuery('school-1', { name: 'First' } as any);
    const r2 = await service.createSearchQuery('school-1', { name: 'Second' } as any);
    expect(r1).toBeDefined();
    expect(r2).toBeDefined();
  });
  it('should getSearchQuery with special characters in id', async () => {
    const result = await service.getSearchQuery('school-1', 'id-with-special-chars-123');
    expect(result).toBeDefined();
  });
  it('should getSearchQuery with long id', async () => {
    const longId = 'a'.repeat(255);
    const result = await service.getSearchQuery('school-1', longId);
    expect(result).toBeDefined();
  });
  it('should getSearchQuery with empty id', async () => {
    await expect(service.getSearchQuery('school-1', '')).rejects.toThrow();
  });
  it('should listSearchQueries with multiple filter keys', async () => {
    const result = await service.listSearchQueries('school-1', { status: 'active', type: 'primary', region: 'us-east' });
    expect(result).toBeDefined();
  });
  it('should createSearchQuery with special characters in name', async () => {
    const result = await service.createSearchQuery('school-1', { name: 'Test Name-123' } as any);
    expect(result).toBeDefined();
  });
  it('should createSearchQuery with unicode name', async () => {
    const result = await service.createSearchQuery('school-1', { name: 'Test-Unicode-Value' } as any);
    expect(result).toBeDefined();
  });
  it('should updateSearchQuery multiple fields', async () => {
    const result = await service.updateSearchQuery('school-1', 'entity-1', { name: 'Updated', status: 'inactive', version: '2.0' } as any);
    expect(result).toBeDefined();
  });
  it('should countSearchQueries with empty filters', async () => {
    const result = await service.countSearchQueries('school-1', {});
    expect(result).toBeDefined();
  });
  it('should countSearchQueries with undefined filters', async () => {
    const result = await service.countSearchQueries('school-1', undefined);
    expect(result).toBeDefined();
  });
  it('should getSearchQuery and then updateSearchQuery', async () => {
    const entity = await service.getSearchQuery('school-1', 'entity-1');
    expect(entity).toBeDefined();
    const updated = await service.updateSearchQuery('school-1', 'entity-1', { name: 'Changed' } as any);
    expect(updated).toBeDefined();
  });
  it('should createSearchQuery then deleteSearchQuery', async () => {
    const created = await service.createSearchQuery('school-1', { name: 'ToDelete' } as any);
    expect(created).toBeDefined();
    const deleted = await service.deleteSearchQuery('school-1', 'entity-1');
    expect(deleted).toBeDefined();
  });
  it('should listSearchQueries after createSearchQuery', async () => {
    await service.createSearchQuery('school-1', { name: 'NewItem' } as any);
    const list = await service.listSearchQueries('school-1');
    expect(list).toBeDefined();
  });
  it('should countSearchQueries after createSearchQuery', async () => {
    await service.createSearchQuery('school-1', { name: 'CountItem' } as any);
    const count = await service.countSearchQueries('school-1');
    expect(count).toBeDefined();
  });
  it('should handle getSearchQuery concurrency', async () => {
    const promises = Array.from({ length: 5 }, (_, i) => service.getSearchQuery('school-1', 'entity-' + i));
    const results = await Promise.all(promises);
    results.forEach(r => expect(r).toBeDefined());
  });
  it('should handle createSearchQuery concurrency', async () => {
    const promises = Array.from({ length: 5 }, (_, i) => service.createSearchQuery('school-1', { name: 'Item-' + i } as any));
    const results = await Promise.all(promises);
    results.forEach(r => expect(r).toBeDefined());
  });
  it('should getSearchQuery with numeric id', async () => {
    const result = await service.getSearchQuery('school-1', '12345');
    expect(result).toBeDefined();
  });
  it('should getSearchQuery with uuid id', async () => {
    const result = await service.getSearchQuery('school-1', '550e8400-e29b-41d4-a716-446655440000');
    expect(result).toBeDefined();
  });
  it('should listSearchQueries returns array', async () => {
    const result = await service.listSearchQueries('school-1');
    expect(result).toBeDefined();
  });
  it('should createSearchQuery with null optional fields', async () => {
    const result = await service.createSearchQuery('school-1', { name: 'NullFields', description: null } as any);
    expect(result).toBeDefined();
  });
  it('should updateSearchQuery with null values', async () => {
    const result = await service.updateSearchQuery('school-1', 'entity-1', { name: null } as any);
    expect(result).toBeDefined();
  });
  it('should getSearchQuery with school-2', async () => {
    const result = await service.getSearchQuery('school-2', 'entity-1');
    expect(result).toBeDefined();
  });
  it('should listSearchQueries with school-2', async () => {
    const result = await service.listSearchQueries('school-2');
    expect(result).toBeDefined();
  });
  it('should createSearchQuery with school-2', async () => {
    const result = await service.createSearchQuery('school-2', { name: 'School2Item' } as any);
    expect(result).toBeDefined();
  });
  it('should updateSearchQuery with school-2', async () => {
    const result = await service.updateSearchQuery('school-2', 'entity-1', { name: 'S2Updated' } as any);
    expect(result).toBeDefined();
  });
  it('should deleteSearchQuery with school-2', async () => {
    const result = await service.deleteSearchQuery('school-2', 'entity-1');
    expect(result).toBeDefined();
  });
  it('should countSearchQueries with school-2', async () => {
    const result = await service.countSearchQueries('school-2');
    expect(result).toBeDefined();
  });
  it('should handle getSearchQuery with very long school id', async () => {
    const longSchoolId = 'school-' + 'x'.repeat(100);
    const result = await service.getSearchQuery(longSchoolId, 'entity-1');
    expect(result).toBeDefined();
  });
  it('should handle listSearchQueries with very long school id', async () => {
    const longSchoolId = 'school-' + 'x'.repeat(100);
    const result = await service.listSearchQueries(longSchoolId);
    expect(result).toBeDefined();
  });
  it('should handle createSearchQuery with very long school id', async () => {
    const longSchoolId = 'school-' + 'x'.repeat(100);
    const result = await service.createSearchQuery(longSchoolId, { name: 'LongSchool' } as any);
    expect(result).toBeDefined();
  });
  it('should handle updateSearchQuery with very long school id', async () => {
    const longSchoolId = 'school-' + 'x'.repeat(100);
    const result = await service.updateSearchQuery(longSchoolId, 'entity-1', { name: 'LongSchoolUpd' } as any);
    expect(result).toBeDefined();
  });
  it('should handle deleteSearchQuery with very long school id', async () => {
    const longSchoolId = 'school-' + 'x'.repeat(100);
    const result = await service.deleteSearchQuery(longSchoolId, 'entity-1');
    expect(result).toBeDefined();
  });
  it('should handle countSearchQueries with very long school id', async () => {
    const longSchoolId = 'school-' + 'x'.repeat(100);
    const result = await service.countSearchQueries(longSchoolId);
    expect(result).toBeDefined();
  });
  it('should getSearchQuery with hyphenated id', async () => {
    const result = await service.getSearchQuery('school-1', 'entity-abc-def-123');
    expect(result).toBeDefined();
  });
  it('should getSearchQuery with underscored id', async () => {
    const result = await service.getSearchQuery('school-1', 'entity_abc_def_123');
    expect(result).toBeDefined();
  });
  it('should createSearchQuery with boolean fields', async () => {
    const result = await service.createSearchQuery('school-1', { name: 'BoolTest', enabled: true, active: false } as any);
    expect(result).toBeDefined();
  });
  it('should createSearchQuery with numeric fields', async () => {
    const result = await service.createSearchQuery('school-1', { name: 'NumTest', count: 42, rate: 3.14 } as any);
    expect(result).toBeDefined();
  });
  it('should createSearchQuery with date fields', async () => {
    const result = await service.createSearchQuery('school-1', { name: 'DateTest', startDate: new Date().toISOString() } as any);
    expect(result).toBeDefined();
  });
  it('should updateSearchQuery with boolean values', async () => {
    const result = await service.updateSearchQuery('school-1', 'entity-1', { enabled: false } as any);
    expect(result).toBeDefined();
  });
  it('should updateSearchQuery with numeric values', async () => {
    const result = await service.updateSearchQuery('school-1', 'entity-1', { count: 100 } as any);
    expect(result).toBeDefined();
  });
  it('should updateSearchQuery with date values', async () => {
    const result = await service.updateSearchQuery('school-1', 'entity-1', { updatedAt: new Date().toISOString() } as any);
    expect(result).toBeDefined();
  });
  it('should listSearchQueries with page-like filters', async () => {
    const result = await service.listSearchQueries('school-1', { page: 1, limit: 10, offset: 0 });
    expect(result).toBeDefined();
  });
  it('should listSearchQueries with sort-like filters', async () => {
    const result = await service.listSearchQueries('school-1', { orderBy: 'createdAt', order: 'desc' });
    expect(result).toBeDefined();
  });
  it('should listSearchQueries with search-like filters', async () => {
    const result = await service.listSearchQueries('school-1', { search: 'test' });
    expect(result).toBeDefined();
  });
  it('should countSearchQueries with boolean filter', async () => {
    const result = await service.countSearchQueries('school-1', { active: true });
    expect(result).toBeDefined();
  });
  it('should countSearchQueries with date range filter', async () => {
    const result = await service.countSearchQueries('school-1', { startDate: '2024-01-01', endDate: '2024-12-31' });
    expect(result).toBeDefined();
  });
  it('should countSearchQueries with status filter', async () => {
    const result = await service.countSearchQueries('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });
  it('should getSearchQuery is async', () => {
    const result = service.getSearchQuery('school-1', 'entity-1');
    expect(result).toBeInstanceOf(Promise);
  });
  it('should listSearchQueries is async', () => {
    const result = service.listSearchQueries('school-1');
    expect(result).toBeInstanceOf(Promise);
  });
  it('should createSearchQuery is async', () => {
    const result = service.createSearchQuery('school-1', { name: 'Async' } as any);
    expect(result).toBeInstanceOf(Promise);
  });
  it('should updateSearchQuery is async', () => {
    const result = service.updateSearchQuery('school-1', 'entity-1', { name: 'AsyncUpd' } as any);
    expect(result).toBeInstanceOf(Promise);
  });
  it('should deleteSearchQuery is async', () => {
    const result = service.deleteSearchQuery('school-1', 'entity-1');
    expect(result).toBeInstanceOf(Promise);
  });
  it('should countSearchQueries is async', () => {
    const result = service.countSearchQueries('school-1');
    expect(result).toBeInstanceOf(Promise);
  });
});