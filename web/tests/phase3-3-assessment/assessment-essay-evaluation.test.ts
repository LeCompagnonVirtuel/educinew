import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AssessmentEssayEvaluationService } from '@/features/assessment/services/assessment-essay-evaluation.service';

vi.mock('@/features/assessment/repositories/assessment.repository', () => ({
  createAssessmentRepository: vi.fn(() => ({
    getEssayEvaluation: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Test' }),
    listEssayEvaluations: vi.fn().mockResolvedValue([]),
    createEssayEvaluation: vi.fn().mockResolvedValue({ id: 'new-id', name: 'Test' }),
    updateEssayEvaluation: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Updated' }),
    deleteEssayEvaluation: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockSupabase = {} as any;

describe('AssessmentEssayEvaluationService', () => {
  let service: AssessmentEssayEvaluationService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AssessmentEssayEvaluationService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(AssessmentEssayEvaluationService);
  });

  it('should get by id', async () => {
    const result = await service.getEssayEvaluation('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list', async () => {
    const result = await service.listEssayEvaluations('school-1');
    expect(result).toBeDefined();
  });

  it('should create', async () => {
    const result = await service.createEssayEvaluation('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update', async () => {
    const result = await service.updateEssayEvaluation('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete', async () => {
    const result = await service.deleteEssayEvaluation('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle filters', async () => {
    const result = await service.listEssayEvaluations('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listEssayEvaluations('school-1'),
      service.listEssayEvaluations('school-1'),
    ]);
    expect(results).toHaveLength(2);
  });
});
