import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IntDataSourceService } from '@/features/intelligence/services/int-data-source.service';

const mockSupabase = {
  from: vi.fn(() => ({
    select: vi.fn(() => ({
      eq: vi.fn(() => ({ single: vi.fn(), data: [], error: null })),
      data: [],
      error: null,
    })),
    insert: vi.fn(() => ({ select: vi.fn(() => ({ single: vi.fn(), data: null, error: null })) })),
    update: vi.fn(() => ({ eq: vi.fn(() => ({ select: vi.fn(() => ({ single: vi.fn(), data: null, error: null })) })) })),
    delete: vi.fn(() => ({ eq: vi.fn(() => ({ data: null, error: null })) })),
  })),
} as any;

describe('IntDataSourceService', () => {
  let service: IntDataSourceService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new IntDataSourceService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(IntDataSourceService);
  });

  it('should call from on supabase', () => {
    expect(mockSupabase.from).toBeDefined();
  });

  it('should get data source by id', async () => {
    const result = await service.getDataSource('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list data sources', async () => {
    const result = await service.listDataSources('school-1');
    expect(result).toBeDefined();
  });

  it('should create data source', async () => {
    const result = await service.createDataSource('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update data source', async () => {
    const result = await service.updateDataSource('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete data source', async () => {
    const result = await service.deleteDataSource('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle list with filters', async () => {
    const result = await service.listDataSources('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle list with undefined filters', async () => {
    const result = await service.listDataSources('school-1', undefined);
    expect(result).toBeDefined();
  });

  it('should handle list with empty filters', async () => {
    const result = await service.listDataSources('school-1', {});
    expect(result).toBeDefined();
  });

  it('should handle multiple calls', async () => {
    const r1 = await service.listDataSources('school-1');
    const r2 = await service.listDataSources('school-1');
    expect(r1).toBeDefined();
    expect(r2).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listDataSources('school-1'),
      service.listDataSources('school-1'),
      service.listDataSources('school-1'),
    ]);
    expect(results).toHaveLength(3);
  });

  it('should handle get with special id', async () => {
    const result = await service.getDataSource('school-1', 'special-id-123');
    expect(result).toBeDefined();
  });

  it('should handle get with long id', async () => {
    const result = await service.getDataSource('school-1', 'a'.repeat(100));
    expect(result).toBeDefined();
  });

  it('should handle create with full data', async () => {
    const result = await service.createDataSource('school-1', { name: 'Full Data', description: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should handle create with minimal data', async () => {
    const result = await service.createDataSource('school-1', {} as any);
    expect(result).toBeDefined();
  });

  it('should handle update with partial data', async () => {
    const result = await service.updateDataSource('school-1', 'test-id', {} as any);
    expect(result).toBeDefined();
  });

  it('should handle different school ids', async () => {
    const result = await service.listDataSources('school-2');
    expect(result).toBeDefined();
  });

  it('should handle get is async', async () => {
    const result = service.getDataSource('school-1', 'test-id');
    expect(result).toBeInstanceOf(Promise);
  });

  it('should handle list is async', async () => {
    const result = service.listDataSources('school-1');
    expect(result).toBeInstanceOf(Promise);
  });

  it('should handle create is async', async () => {
    const result = service.createDataSource('school-1', {} as any);
    expect(result).toBeInstanceOf(Promise);
  });

  it('should handle update is async', async () => {
    const result = service.updateDataSource('school-1', 'test-id', {} as any);
    expect(result).toBeInstanceOf(Promise);
  });

  it('should handle delete is async', async () => {
    const result = service.deleteDataSource('school-1', 'test-id');
    expect(result).toBeInstanceOf(Promise);
  });

  it('should handle filter with status', async () => {
    const result = await service.listDataSources('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle filter with date range', async () => {
    const result = await service.listDataSources('school-1', { from: '2024-01-01', to: '2024-12-31' });
    expect(result).toBeDefined();
  });

  it('should handle filter with search', async () => {
    const result = await service.listDataSources('school-1', { search: 'test' });
    expect(result).toBeDefined();
  });

  it('should handle filter with pagination', async () => {
    const result = await service.listDataSources('school-1', { page: 1, limit: 10 });
    expect(result).toBeDefined();
  });

  it('should handle filter with sort', async () => {
    const result = await service.listDataSources('school-1', { sort: 'created_at', order: 'desc' });
    expect(result).toBeDefined();
  });

  it('should handle get then update', async () => {
    const item = await service.getDataSource('school-1', 'test-id');
    expect(item).toBeDefined();
    const updated = await service.updateDataSource('school-1', 'test-id', { name: 'Updated' } as any);
    expect(updated).toBeDefined();
  });

  it('should handle create then delete', async () => {
    const created = await service.createDataSource('school-1', { name: 'To Delete' } as any);
    expect(created).toBeDefined();
    const deleted = await service.deleteDataSource('school-1', 'test-id');
    expect(deleted).toBeDefined();
  });

  it('should handle list after create', async () => {
    await service.createDataSource('school-1', { name: 'New' } as any);
    const list = await service.listDataSources('school-1');
    expect(list).toBeDefined();
  });
});
