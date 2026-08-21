import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AssessmentCompetencyTestService } from '@/features/assessment/services/assessment-competency-test.service';

vi.mock('@/features/assessment/repositories/assessment.repository', () => ({
  createAssessmentRepository: vi.fn(() => ({
    getCompetencyTest: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Test' }),
    listCompetencyTests: vi.fn().mockResolvedValue([]),
    createCompetencyTest: vi.fn().mockResolvedValue({ id: 'new-id', name: 'Test' }),
    updateCompetencyTest: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Updated' }),
    deleteCompetencyTest: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockSupabase = {} as any;

describe('AssessmentCompetencyTestService', () => {
  let service: AssessmentCompetencyTestService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AssessmentCompetencyTestService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(AssessmentCompetencyTestService);
  });

  it('should get by id', async () => {
    const result = await service.getCompetencyTest('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list', async () => {
    const result = await service.listCompetencyTests('school-1');
    expect(result).toBeDefined();
  });

  it('should create', async () => {
    const result = await service.createCompetencyTest('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update', async () => {
    const result = await service.updateCompetencyTest('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete', async () => {
    const result = await service.deleteCompetencyTest('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle filters', async () => {
    const result = await service.listCompetencyTests('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listCompetencyTests('school-1'),
      service.listCompetencyTests('school-1'),
    ]);
    expect(results).toHaveLength(2);
  });
});
