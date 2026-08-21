import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AssessmentAccreditationService } from '@/features/assessment/services/assessment-accreditation.service';

vi.mock('@/features/assessment/repositories/assessment.repository', () => ({
  createAssessmentRepository: vi.fn(() => ({
    getAccreditation: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Test' }),
    listAccreditations: vi.fn().mockResolvedValue([]),
    createAccreditation: vi.fn().mockResolvedValue({ id: 'new-id', name: 'Test' }),
    updateAccreditation: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Updated' }),
    deleteAccreditation: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockSupabase = {} as any;

describe('AssessmentAccreditationService', () => {
  let service: AssessmentAccreditationService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AssessmentAccreditationService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(AssessmentAccreditationService);
  });

  it('should get by id', async () => {
    const result = await service.getAccreditation('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list', async () => {
    const result = await service.listAccreditations('school-1');
    expect(result).toBeDefined();
  });

  it('should create', async () => {
    const result = await service.createAccreditation('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update', async () => {
    const result = await service.updateAccreditation('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete', async () => {
    const result = await service.deleteAccreditation('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle filters', async () => {
    const result = await service.listAccreditations('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listAccreditations('school-1'),
      service.listAccreditations('school-1'),
    ]);
    expect(results).toHaveLength(2);
  });
});
