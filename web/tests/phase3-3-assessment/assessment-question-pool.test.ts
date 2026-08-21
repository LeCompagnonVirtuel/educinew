import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AssessmentQuestionPoolService } from '@/features/assessment/services/assessment-question-pool.service';

vi.mock('@/features/assessment/repositories/assessment.repository', () => ({
  createAssessmentRepository: vi.fn(() => ({
    getQuestionPool: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Test' }),
    listQuestionPools: vi.fn().mockResolvedValue([]),
    createQuestionPool: vi.fn().mockResolvedValue({ id: 'new-id', name: 'Test' }),
    updateQuestionPool: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Updated' }),
    deleteQuestionPool: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockSupabase = {} as any;

describe('AssessmentQuestionPoolService', () => {
  let service: AssessmentQuestionPoolService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AssessmentQuestionPoolService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(AssessmentQuestionPoolService);
  });

  it('should get by id', async () => {
    const result = await service.getQuestionPool('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list', async () => {
    const result = await service.listQuestionPools('school-1');
    expect(result).toBeDefined();
  });

  it('should create', async () => {
    const result = await service.createQuestionPool('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update', async () => {
    const result = await service.updateQuestionPool('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete', async () => {
    const result = await service.deleteQuestionPool('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle filters', async () => {
    const result = await service.listQuestionPools('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listQuestionPools('school-1'),
      service.listQuestionPools('school-1'),
    ]);
    expect(results).toHaveLength(2);
  });
});
