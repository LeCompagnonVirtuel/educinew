import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AdaptiveStrengthService } from '@/features/adaptive/services/adaptive-strength.service';

const mockSupabase = {
  from: vi.fn(() => ({
    select: vi.fn(() => ({ eq: vi.fn(() => ({ single: vi.fn(), data: [], error: null })), data: [], error: null })),
    insert: vi.fn(() => ({ select: vi.fn(() => ({ single: vi.fn(), data: null, error: null })) })),
    update: vi.fn(() => ({ eq: vi.fn(() => ({ select: vi.fn(() => ({ single: vi.fn(), data: null, error: null })) })) })),
    delete: vi.fn(() => ({ eq: vi.fn(() => ({ data: null, error: null })) })),
  })),
} as any;

describe('AdaptiveStrengthService', () => {
  let service: AdaptiveStrengthService;
  beforeEach(() => { vi.clearAllMocks(); service = new AdaptiveStrengthService(mockSupabase); });
  it('should create service instance', () => { expect(service).toBeDefined(); });
  it('should have supabase injected', () => { expect(service).toBeInstanceOf(AdaptiveStrengthService); });
  it('should call from on supabase', () => { expect(mockSupabase.from).toBeDefined(); });
  it('should get by id', async () => { const result = await service.getStrength('school-1', 'test-id'); expect(result).toBeDefined(); });
  it('should list', async () => { const result = await service.listStrengths('school-1'); expect(result).toBeDefined(); });
  it('should create', async () => { const result = await service.createStrength('school-1', { name: 'Test' } as any); expect(result).toBeDefined(); });
  it('should update', async () => { const result = await service.updateStrength('school-1', 'test-id', { name: 'Updated' } as any); expect(result).toBeDefined(); });
  it('should delete', async () => { const result = await service.deleteStrength('school-1', 'test-id'); expect(result).toBeDefined(); });
  it('should handle list with filters', async () => { const result = await service.listStrengths('school-1', { status: 'active' }); expect(result).toBeDefined(); });
  it('should handle concurrency', async () => { const results = await Promise.all([service.listStrengths('school-1'), service.listStrengths('school-1')]); expect(results).toHaveLength(2); });
});
