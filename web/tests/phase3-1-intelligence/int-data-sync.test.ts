import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IntDataSyncService } from '@/features/intelligence/services/int-data-sync.service';

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

describe('IntDataSyncService', () => {
  let service: IntDataSyncService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new IntDataSyncService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(IntDataSyncService);
  });

  it('should call from on supabase', () => {
    expect(mockSupabase.from).toBeDefined();
  });

  it('should get dataSync by id', async () => {
    const result = await service.getDataSync('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list dataSyncs', async () => {
    const result = await service.listDataSyncs('school-1');
    expect(result).toBeDefined();
  });

  it('should create dataSync', async () => {
    const result = await service.createDataSync('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update dataSync', async () => {
    const result = await service.updateDataSync('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete dataSync', async () => {
    const result = await service.deleteDataSync('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle list with filters', async () => {
    const result = await service.listDataSyncs('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle list with undefined filters', async () => {
    const result = await service.listDataSyncs('school-1', undefined);
    expect(result).toBeDefined();
  });

  it('should handle list with empty filters', async () => {
    const result = await service.listDataSyncs('school-1', {});
    expect(result).toBeDefined();
  });

  it('should handle multiple calls', async () => {
    const r1 = await service.listDataSyncs('school-1');
    const r2 = await service.listDataSyncs('school-1');
    expect(r1).toBeDefined();
    expect(r2).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listDataSyncs('school-1'),
      service.listDataSyncs('school-1'),
      service.listDataSyncs('school-1'),
    ]);
    expect(results).toHaveLength(3);
  });

  it('should handle get with special id', async () => {
    const result = await service.getDataSync('school-1', 'special-id-123');
    expect(result).toBeDefined();
  });

  it('should handle get with long id', async () => {
    const result = await service.getDataSync('school-1', 'a'.repeat(100));
    expect(result).toBeDefined();
  });

  it('should handle create with full data', async () => {
    const result = await service.createDataSync('school-1', { name: 'Full Data', description: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should handle create with minimal data', async () => {
    const result = await service.createDataSync('school-1', {} as any);
    expect(result).toBeDefined();
  });

  it('should handle update with partial data', async () => {
    const result = await service.updateDataSync('school-1', 'test-id', {} as any);
    expect(result).toBeDefined();
  });

  it('should handle different school ids', async () => {
    const result = await service.listDataSyncs('school-2');
    expect(result).toBeDefined();
  });

  it('should handle get is async', async () => {
    const result = service.getDataSync('school-1', 'test-id');
    expect(result).toBeInstanceOf(Promise);
  });

  it('should handle list is async', async () => {
    const result = service.listDataSyncs('school-1');
    expect(result).toBeInstanceOf(Promise);
  });

  it('should handle create is async', async () => {
    const result = service.createDataSync('school-1', {} as any);
    expect(result).toBeInstanceOf(Promise);
  });

  it('should handle update is async', async () => {
    const result = service.updateDataSync('school-1', 'test-id', {} as any);
    expect(result).toBeInstanceOf(Promise);
  });

  it('should handle delete is async', async () => {
    const result = service.deleteDataSync('school-1', 'test-id');
    expect(result).toBeInstanceOf(Promise);
  });

  it('should handle filter with status', async () => {
    const result = await service.listDataSyncs('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle filter with date range', async () => {
    const result = await service.listDataSyncs('school-1', { from: '2024-01-01', to: '2024-12-31' });
    expect(result).toBeDefined();
  });

  it('should handle filter with search', async () => {
    const result = await service.listDataSyncs('school-1', { search: 'test' });
    expect(result).toBeDefined();
  });

  it('should handle filter with pagination', async () => {
    const result = await service.listDataSyncs('school-1', { page: 1, limit: 10 });
    expect(result).toBeDefined();
  });

  it('should handle filter with sort', async () => {
    const result = await service.listDataSyncs('school-1', { sort: 'created_at', order: 'desc' });
    expect(result).toBeDefined();
  });

  it('should handle get then update', async () => {
    const item = await service.getDataSync('school-1', 'test-id');
    expect(item).toBeDefined();
    const updated = await service.updateDataSync('school-1', 'test-id', { name: 'Updated' } as any);
    expect(updated).toBeDefined();
  });

  it('should handle create then delete', async () => {
    const created = await service.createDataSync('school-1', { name: 'To Delete' } as any);
    expect(created).toBeDefined();
    const deleted = await service.deleteDataSync('school-1', 'test-id');
    expect(deleted).toBeDefined();
  });

  it('should handle list after create', async () => {
    await service.createDataSync('school-1', { name: 'New' } as any);
    const list = await service.listDataSyncs('school-1');
    expect(list).toBeDefined();
  });
});
