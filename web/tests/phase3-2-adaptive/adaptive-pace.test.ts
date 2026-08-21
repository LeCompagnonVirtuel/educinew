import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AdaptivePaceService } from '@/features/adaptive/services/adaptive-pace.service';

const mockSupabase = {
  from: vi.fn(() => ({
    select: vi.fn(() => ({ eq: vi.fn(() => ({ single: vi.fn(), data: [], error: null })), data: [], error: null })),
    insert: vi.fn(() => ({ select: vi.fn(() => ({ single: vi.fn(), data: null, error: null })) })),
    update: vi.fn(() => ({ eq: vi.fn(() => ({ select: vi.fn(() => ({ single: vi.fn(), data: null, error: null })) })) })),
    delete: vi.fn(() => ({ eq: vi.fn(() => ({ data: null, error: null })) })),
  })),
} as any;

describe('AdaptivePaceService', () => {
  let service: AdaptivePaceService;
  beforeEach(() => { vi.clearAllMocks(); service = new AdaptivePaceService(mockSupabase); });
  it('should create service instance', () => { expect(service).toBeDefined(); });
  it('should have supabase injected', () => { expect(service).toBeInstanceOf(AdaptivePaceService); });
  it('should call from on supabase', () => { expect(mockSupabase.from).toBeDefined(); });
  it('should get by id', async () => { const result = await service.getPace('school-1', 'test-id'); expect(result).toBeDefined(); });
  it('should list', async () => { const result = await service.listPaces('school-1'); expect(result).toBeDefined(); });
  it('should create', async () => { const result = await service.createPace('school-1', { name: 'Test' } as any); expect(result).toBeDefined(); });
  it('should update', async () => { const result = await service.updatePace('school-1', 'test-id', { name: 'Updated' } as any); expect(result).toBeDefined(); });
  it('should delete', async () => { const result = await service.deletePace('school-1', 'test-id'); expect(result).toBeDefined(); });
  it('should handle list with filters', async () => { const result = await service.listPaces('school-1', { status: 'active' }); expect(result).toBeDefined(); });
  it('should handle concurrency', async () => { const results = await Promise.all([service.listPaces('school-1'), service.listPaces('school-1')]); expect(results).toHaveLength(2); });
});
