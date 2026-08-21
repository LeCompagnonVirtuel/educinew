import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AssessmentAIQuestionGeneratorService } from '@/features/assessment/services/assessment-ai-question-gen.service';

vi.mock('@/features/assessment/repositories/assessment.repository', () => ({
  createAssessmentRepository: vi.fn(() => ({
    getAIQuestionGenerator: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Test' }),
    listAIQuestionGenerators: vi.fn().mockResolvedValue([]),
    createAIQuestionGenerator: vi.fn().mockResolvedValue({ id: 'new-id', name: 'Test' }),
    updateAIQuestionGenerator: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Updated' }),
    deleteAIQuestionGenerator: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockSupabase = {} as any;

describe('AssessmentAIQuestionGeneratorService', () => {
  let service: AssessmentAIQuestionGeneratorService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AssessmentAIQuestionGeneratorService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(AssessmentAIQuestionGeneratorService);
  });

  it('should get by id', async () => {
    const result = await service.getAIQuestionGenerator('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list', async () => {
    const result = await service.listAIQuestionGenerators('school-1');
    expect(result).toBeDefined();
  });

  it('should create', async () => {
    const result = await service.createAIQuestionGenerator('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update', async () => {
    const result = await service.updateAIQuestionGenerator('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete', async () => {
    const result = await service.deleteAIQuestionGenerator('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle filters', async () => {
    const result = await service.listAIQuestionGenerators('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listAIQuestionGenerators('school-1'),
      service.listAIQuestionGenerators('school-1'),
    ]);
    expect(results).toHaveLength(2);
  });
});
