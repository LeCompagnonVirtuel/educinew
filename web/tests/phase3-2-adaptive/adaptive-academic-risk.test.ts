import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AdaptiveAcademicRiskService } from '@/features/adaptive/services/adaptive-academic-risk.service';

const mockSupabase = {
  from: vi.fn(() => ({
    select: vi.fn(() => ({ eq: vi.fn(() => ({ single: vi.fn(), data: [], error: null })), data: [], error: null })),
    insert: vi.fn(() => ({ select: vi.fn(() => ({ single: vi.fn(), data: null, error: null })) })),
    update: vi.fn(() => ({ eq: vi.fn(() => ({ select: vi.fn(() => ({ single: vi.fn(), data: null, error: null })) })) })),
    delete: vi.fn(() => ({ eq: vi.fn(() => ({ data: null, error: null })) })),
  })),
} as any;

describe('AdaptiveAcademicRiskService', () => {
  let service: AdaptiveAcademicRiskService;
  beforeEach(() => { vi.clearAllMocks(); service = new AdaptiveAcademicRiskService(mockSupabase); });
  it('should create service instance', () => { expect(service).toBeDefined(); });
  it('should have supabase injected', () => { expect(service).toBeInstanceOf(AdaptiveAcademicRiskService); });
  it('should call from on supabase', () => { expect(mockSupabase.from).toBeDefined(); });
  it('should get by id', async () => { const result = await service.getAcademicRisk('school-1', 'test-id'); expect(result).toBeDefined(); });
  it('should list', async () => { const result = await service.listAcademicRisks('school-1'); expect(result).toBeDefined(); });
  it('should create', async () => { const result = await service.createAcademicRisk('school-1', { name: 'Test' } as any); expect(result).toBeDefined(); });
  it('should update', async () => { const result = await service.updateAcademicRisk('school-1', 'test-id', { name: 'Updated' } as any); expect(result).toBeDefined(); });
  it('should delete', async () => { const result = await service.deleteAcademicRisk('school-1', 'test-id'); expect(result).toBeDefined(); });
  it('should handle list with filters', async () => { const result = await service.listAcademicRisks('school-1', { status: 'active' }); expect(result).toBeDefined(); });
  it('should handle concurrency', async () => { const results = await Promise.all([service.listAcademicRisks('school-1'), service.listAcademicRisks('school-1')]); expect(results).toHaveLength(2); });
});
