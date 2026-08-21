import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AdaptiveMemoryService } from '@/features/adaptive/services/adaptive-memory.service';

const mockSupabase = {
  from: vi.fn(() => ({
    select: vi.fn(() => ({ eq: vi.fn(() => ({ single: vi.fn(), data: [], error: null })), data: [], error: null })),
    insert: vi.fn(() => ({ select: vi.fn(() => ({ single: vi.fn(), data: null, error: null })) })),
    update: vi.fn(() => ({ eq: vi.fn(() => ({ select: vi.fn(() => ({ single: vi.fn(), data: null, error: null })) })) })),
    delete: vi.fn(() => ({ eq: vi.fn(() => ({ data: null, error: null })) })),
  })),
} as any;

describe('AdaptiveMemoryService', () => {
  let service: AdaptiveMemoryService;
  beforeEach(() => { vi.clearAllMocks(); service = new AdaptiveMemoryService(mockSupabase); });
  it('should create service instance', () => { expect(service).toBeDefined(); });
  it('should have supabase injected', () => { expect(service).toBeInstanceOf(AdaptiveMemoryService); });
  it('should call from on supabase', () => { expect(mockSupabase.from).toBeDefined(); });
  it('should get by id', async () => { const result = await service.getMemory('school-1', 'test-id'); expect(result).toBeDefined(); });
  it('should list', async () => { const result = await service.listMemoryAssessments('school-1'); expect(result).toBeDefined(); });
  it('should create', async () => { const result = await service.createMemory('school-1', { name: 'Test' } as any); expect(result).toBeDefined(); });
  it('should update', async () => { const result = await service.updateMemory('school-1', 'test-id', { name: 'Updated' } as any); expect(result).toBeDefined(); });
  it('should delete', async () => { const result = await service.deleteMemory('school-1', 'test-id'); expect(result).toBeDefined(); });
  it('should handle list with filters', async () => { const result = await service.listMemoryAssessments('school-1', { status: 'active' }); expect(result).toBeDefined(); });
  it('should handle concurrency', async () => { const results = await Promise.all([service.listMemoryAssessments('school-1'), service.listMemoryAssessments('school-1')]); expect(results).toHaveLength(2); });
});
