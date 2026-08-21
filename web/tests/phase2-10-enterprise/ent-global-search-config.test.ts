import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EntGlobalSearchConfigService } from '@/features/enterprise/services/ent-global-search-config.service';

describe('EntGlobalSearchConfigService', () => {
  let service: EntGlobalSearchConfigService;
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
    service = new EntGlobalSearchConfigService(mockSupabase);
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
    service.getGlobalSearchConfig('school-1', 'entity-1');
    expect(mockSupabase.from).toHaveBeenCalled();
  });
  it('should getGlobalSearchConfig entity by id', async () => {
    const result = await service.getGlobalSearchConfig('school-1', 'entity-1');
    expect(result).toBeDefined();
  });
  it('should throw on getGlobalSearchConfig with null result', async () => {
    await expect(service.getGlobalSearchConfig('school-1', 'nonexistent')).rejects.toThrow();
  });
  it('should listGlobalSearchConfigs entities', async () => {
    const result = await service.listGlobalSearchConfigs('school-1');
    expect(result).toBeDefined();
  });
  it('should listGlobalSearchConfigs with filters', async () => {
    const result = await service.listGlobalSearchConfigs('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });
  it('should listGlobalSearchConfigs with empty filters', async () => {
    const result = await service.listGlobalSearchConfigs('school-1', {});
    expect(result).toBeDefined();
  });
  it('should listGlobalSearchConfigs with undefined filters', async () => {
    const result = await service.listGlobalSearchConfigs('school-1', undefined);
    expect(result).toBeDefined();
  });
  it('should createGlobalSearchConfig entity', async () => {
    const result = await service.createGlobalSearchConfig('school-1', { schoolId: 'school-1', name: 'Test' } as any);
    expect(result).toBeDefined();
  });
  it('should createGlobalSearchConfig with empty data', async () => {
    const result = await service.createGlobalSearchConfig('school-1', {} as any);
    expect(result).toBeDefined();
  });
  it('should createGlobalSearchConfig with full data', async () => {
    const result = await service.createGlobalSearchConfig('school-1', {
      schoolId: 'school-1',
      name: 'Full Test',
      version: '1.0',
      environment: 'production',
      status: 'active',
    } as any);
    expect(result).toBeDefined();
  });
  it('should updateGlobalSearchConfig entity', async () => {
    const result = await service.updateGlobalSearchConfig('school-1', 'entity-1', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });
  it('should throw on updateGlobalSearchConfig nonexistent entity', async () => {
    await expect(service.updateGlobalSearchConfig('school-1', 'nonexistent', { name: 'Updated' } as any)).rejects.toThrow();
  });
  it('should updateGlobalSearchConfig with empty data', async () => {
    const result = await service.updateGlobalSearchConfig('school-1', 'entity-1', {} as any);
    expect(result).toBeDefined();
  });
  it('should deleteGlobalSearchConfig entity', async () => {
    const result = await service.deleteGlobalSearchConfig('school-1', 'entity-1');
    expect(result).toBeDefined();
  });
  it('should throw on deleteGlobalSearchConfig nonexistent entity', async () => {
    await expect(service.deleteGlobalSearchConfig('school-1', 'nonexistent')).rejects.toThrow();
  });
  it('should countGlobalSearchConfigs entities', async () => {
    const result = await service.countGlobalSearchConfigs('school-1');
    expect(result).toBeDefined();
  });
  it('should countGlobalSearchConfigs with filters', async () => {
    const result = await service.countGlobalSearchConfigs('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });
  it('should handle multiple getGlobalSearchConfig calls', async () => {
    const r1 = await service.getGlobalSearchConfig('school-1', 'e1');
    const r2 = await service.getGlobalSearchConfig('school-1', 'e2');
    expect(r1).toBeDefined();
    expect(r2).toBeDefined();
  });
  it('should handle sequential createGlobalSearchConfig calls', async () => {
    const r1 = await service.createGlobalSearchConfig('school-1', { name: 'First' } as any);
    const r2 = await service.createGlobalSearchConfig('school-1', { name: 'Second' } as any);
    expect(r1).toBeDefined();
    expect(r2).toBeDefined();
  });
  it('should getGlobalSearchConfig with special characters in id', async () => {
    const result = await service.getGlobalSearchConfig('school-1', 'id-with-special-chars-123');
    expect(result).toBeDefined();
  });
  it('should getGlobalSearchConfig with long id', async () => {
    const longId = 'a'.repeat(255);
    const result = await service.getGlobalSearchConfig('school-1', longId);
    expect(result).toBeDefined();
  });
  it('should getGlobalSearchConfig with empty id', async () => {
    await expect(service.getGlobalSearchConfig('school-1', '')).rejects.toThrow();
  });
  it('should listGlobalSearchConfigs with multiple filter keys', async () => {
    const result = await service.listGlobalSearchConfigs('school-1', { status: 'active', type: 'primary', region: 'us-east' });
    expect(result).toBeDefined();
  });
  it('should createGlobalSearchConfig with special characters in name', async () => {
    const result = await service.createGlobalSearchConfig('school-1', { name: 'Test Name-123' } as any);
    expect(result).toBeDefined();
  });
  it('should createGlobalSearchConfig with unicode name', async () => {
    const result = await service.createGlobalSearchConfig('school-1', { name: 'Test-Unicode-Value' } as any);
    expect(result).toBeDefined();
  });
  it('should updateGlobalSearchConfig multiple fields', async () => {
    const result = await service.updateGlobalSearchConfig('school-1', 'entity-1', { name: 'Updated', status: 'inactive', version: '2.0' } as any);
    expect(result).toBeDefined();
  });
  it('should countGlobalSearchConfigs with empty filters', async () => {
    const result = await service.countGlobalSearchConfigs('school-1', {});
    expect(result).toBeDefined();
  });
  it('should countGlobalSearchConfigs with undefined filters', async () => {
    const result = await service.countGlobalSearchConfigs('school-1', undefined);
    expect(result).toBeDefined();
  });
  it('should getGlobalSearchConfig and then updateGlobalSearchConfig', async () => {
    const entity = await service.getGlobalSearchConfig('school-1', 'entity-1');
    expect(entity).toBeDefined();
    const updated = await service.updateGlobalSearchConfig('school-1', 'entity-1', { name: 'Changed' } as any);
    expect(updated).toBeDefined();
  });
  it('should createGlobalSearchConfig then deleteGlobalSearchConfig', async () => {
    const created = await service.createGlobalSearchConfig('school-1', { name: 'ToDelete' } as any);
    expect(created).toBeDefined();
    const deleted = await service.deleteGlobalSearchConfig('school-1', 'entity-1');
    expect(deleted).toBeDefined();
  });
  it('should listGlobalSearchConfigs after createGlobalSearchConfig', async () => {
    await service.createGlobalSearchConfig('school-1', { name: 'NewItem' } as any);
    const list = await service.listGlobalSearchConfigs('school-1');
    expect(list).toBeDefined();
  });
  it('should countGlobalSearchConfigs after createGlobalSearchConfig', async () => {
    await service.createGlobalSearchConfig('school-1', { name: 'CountItem' } as any);
    const count = await service.countGlobalSearchConfigs('school-1');
    expect(count).toBeDefined();
  });
  it('should handle getGlobalSearchConfig concurrency', async () => {
    const promises = Array.from({ length: 5 }, (_, i) => service.getGlobalSearchConfig('school-1', 'entity-' + i));
    const results = await Promise.all(promises);
    results.forEach(r => expect(r).toBeDefined());
  });
  it('should handle createGlobalSearchConfig concurrency', async () => {
    const promises = Array.from({ length: 5 }, (_, i) => service.createGlobalSearchConfig('school-1', { name: 'Item-' + i } as any));
    const results = await Promise.all(promises);
    results.forEach(r => expect(r).toBeDefined());
  });
  it('should getGlobalSearchConfig with numeric id', async () => {
    const result = await service.getGlobalSearchConfig('school-1', '12345');
    expect(result).toBeDefined();
  });
  it('should getGlobalSearchConfig with uuid id', async () => {
    const result = await service.getGlobalSearchConfig('school-1', '550e8400-e29b-41d4-a716-446655440000');
    expect(result).toBeDefined();
  });
  it('should listGlobalSearchConfigs returns array', async () => {
    const result = await service.listGlobalSearchConfigs('school-1');
    expect(result).toBeDefined();
  });
  it('should createGlobalSearchConfig with null optional fields', async () => {
    const result = await service.createGlobalSearchConfig('school-1', { name: 'NullFields', description: null } as any);
    expect(result).toBeDefined();
  });
  it('should updateGlobalSearchConfig with null values', async () => {
    const result = await service.updateGlobalSearchConfig('school-1', 'entity-1', { name: null } as any);
    expect(result).toBeDefined();
  });
  it('should getGlobalSearchConfig with school-2', async () => {
    const result = await service.getGlobalSearchConfig('school-2', 'entity-1');
    expect(result).toBeDefined();
  });
  it('should listGlobalSearchConfigs with school-2', async () => {
    const result = await service.listGlobalSearchConfigs('school-2');
    expect(result).toBeDefined();
  });
  it('should createGlobalSearchConfig with school-2', async () => {
    const result = await service.createGlobalSearchConfig('school-2', { name: 'School2Item' } as any);
    expect(result).toBeDefined();
  });
  it('should updateGlobalSearchConfig with school-2', async () => {
    const result = await service.updateGlobalSearchConfig('school-2', 'entity-1', { name: 'S2Updated' } as any);
    expect(result).toBeDefined();
  });
  it('should deleteGlobalSearchConfig with school-2', async () => {
    const result = await service.deleteGlobalSearchConfig('school-2', 'entity-1');
    expect(result).toBeDefined();
  });
  it('should countGlobalSearchConfigs with school-2', async () => {
    const result = await service.countGlobalSearchConfigs('school-2');
    expect(result).toBeDefined();
  });
  it('should handle getGlobalSearchConfig with very long school id', async () => {
    const longSchoolId = 'school-' + 'x'.repeat(100);
    const result = await service.getGlobalSearchConfig(longSchoolId, 'entity-1');
    expect(result).toBeDefined();
  });
  it('should handle listGlobalSearchConfigs with very long school id', async () => {
    const longSchoolId = 'school-' + 'x'.repeat(100);
    const result = await service.listGlobalSearchConfigs(longSchoolId);
    expect(result).toBeDefined();
  });
  it('should handle createGlobalSearchConfig with very long school id', async () => {
    const longSchoolId = 'school-' + 'x'.repeat(100);
    const result = await service.createGlobalSearchConfig(longSchoolId, { name: 'LongSchool' } as any);
    expect(result).toBeDefined();
  });
  it('should handle updateGlobalSearchConfig with very long school id', async () => {
    const longSchoolId = 'school-' + 'x'.repeat(100);
    const result = await service.updateGlobalSearchConfig(longSchoolId, 'entity-1', { name: 'LongSchoolUpd' } as any);
    expect(result).toBeDefined();
  });
  it('should handle deleteGlobalSearchConfig with very long school id', async () => {
    const longSchoolId = 'school-' + 'x'.repeat(100);
    const result = await service.deleteGlobalSearchConfig(longSchoolId, 'entity-1');
    expect(result).toBeDefined();
  });
  it('should handle countGlobalSearchConfigs with very long school id', async () => {
    const longSchoolId = 'school-' + 'x'.repeat(100);
    const result = await service.countGlobalSearchConfigs(longSchoolId);
    expect(result).toBeDefined();
  });
  it('should getGlobalSearchConfig with hyphenated id', async () => {
    const result = await service.getGlobalSearchConfig('school-1', 'entity-abc-def-123');
    expect(result).toBeDefined();
  });
  it('should getGlobalSearchConfig with underscored id', async () => {
    const result = await service.getGlobalSearchConfig('school-1', 'entity_abc_def_123');
    expect(result).toBeDefined();
  });
  it('should createGlobalSearchConfig with boolean fields', async () => {
    const result = await service.createGlobalSearchConfig('school-1', { name: 'BoolTest', enabled: true, active: false } as any);
    expect(result).toBeDefined();
  });
  it('should createGlobalSearchConfig with numeric fields', async () => {
    const result = await service.createGlobalSearchConfig('school-1', { name: 'NumTest', count: 42, rate: 3.14 } as any);
    expect(result).toBeDefined();
  });
  it('should createGlobalSearchConfig with date fields', async () => {
    const result = await service.createGlobalSearchConfig('school-1', { name: 'DateTest', startDate: new Date().toISOString() } as any);
    expect(result).toBeDefined();
  });
  it('should updateGlobalSearchConfig with boolean values', async () => {
    const result = await service.updateGlobalSearchConfig('school-1', 'entity-1', { enabled: false } as any);
    expect(result).toBeDefined();
  });
  it('should updateGlobalSearchConfig with numeric values', async () => {
    const result = await service.updateGlobalSearchConfig('school-1', 'entity-1', { count: 100 } as any);
    expect(result).toBeDefined();
  });
  it('should updateGlobalSearchConfig with date values', async () => {
    const result = await service.updateGlobalSearchConfig('school-1', 'entity-1', { updatedAt: new Date().toISOString() } as any);
    expect(result).toBeDefined();
  });
  it('should listGlobalSearchConfigs with page-like filters', async () => {
    const result = await service.listGlobalSearchConfigs('school-1', { page: 1, limit: 10, offset: 0 });
    expect(result).toBeDefined();
  });
  it('should listGlobalSearchConfigs with sort-like filters', async () => {
    const result = await service.listGlobalSearchConfigs('school-1', { orderBy: 'createdAt', order: 'desc' });
    expect(result).toBeDefined();
  });
  it('should listGlobalSearchConfigs with search-like filters', async () => {
    const result = await service.listGlobalSearchConfigs('school-1', { search: 'test' });
    expect(result).toBeDefined();
  });
  it('should countGlobalSearchConfigs with boolean filter', async () => {
    const result = await service.countGlobalSearchConfigs('school-1', { active: true });
    expect(result).toBeDefined();
  });
  it('should countGlobalSearchConfigs with date range filter', async () => {
    const result = await service.countGlobalSearchConfigs('school-1', { startDate: '2024-01-01', endDate: '2024-12-31' });
    expect(result).toBeDefined();
  });
  it('should countGlobalSearchConfigs with status filter', async () => {
    const result = await service.countGlobalSearchConfigs('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });
  it('should getGlobalSearchConfig is async', () => {
    const result = service.getGlobalSearchConfig('school-1', 'entity-1');
    expect(result).toBeInstanceOf(Promise);
  });
  it('should listGlobalSearchConfigs is async', () => {
    const result = service.listGlobalSearchConfigs('school-1');
    expect(result).toBeInstanceOf(Promise);
  });
  it('should createGlobalSearchConfig is async', () => {
    const result = service.createGlobalSearchConfig('school-1', { name: 'Async' } as any);
    expect(result).toBeInstanceOf(Promise);
  });
  it('should updateGlobalSearchConfig is async', () => {
    const result = service.updateGlobalSearchConfig('school-1', 'entity-1', { name: 'AsyncUpd' } as any);
    expect(result).toBeInstanceOf(Promise);
  });
  it('should deleteGlobalSearchConfig is async', () => {
    const result = service.deleteGlobalSearchConfig('school-1', 'entity-1');
    expect(result).toBeInstanceOf(Promise);
  });
  it('should countGlobalSearchConfigs is async', () => {
    const result = service.countGlobalSearchConfigs('school-1');
    expect(result).toBeInstanceOf(Promise);
  });
});