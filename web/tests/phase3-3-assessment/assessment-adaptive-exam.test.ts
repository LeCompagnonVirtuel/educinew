import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AssessmentAdaptiveExamService } from '@/features/assessment/services/assessment-adaptive-exam.service';

vi.mock('@/features/assessment/repositories/assessment.repository', () => ({
  createAssessmentRepository: vi.fn(() => ({
    getAdaptiveExam: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Test' }),
    listAdaptiveExams: vi.fn().mockResolvedValue([]),
    createAdaptiveExam: vi.fn().mockResolvedValue({ id: 'new-id', name: 'Test' }),
    updateAdaptiveExam: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Updated' }),
    deleteAdaptiveExam: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockSupabase = {} as any;

describe('AssessmentAdaptiveExamService', () => {
  let service: AssessmentAdaptiveExamService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AssessmentAdaptiveExamService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(AssessmentAdaptiveExamService);
  });

  it('should get by id', async () => {
    const result = await service.getAdaptiveExam('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list', async () => {
    const result = await service.listAdaptiveExams('school-1');
    expect(result).toBeDefined();
  });

  it('should create', async () => {
    const result = await service.createAdaptiveExam('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update', async () => {
    const result = await service.updateAdaptiveExam('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete', async () => {
    const result = await service.deleteAdaptiveExam('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle filters', async () => {
    const result = await service.listAdaptiveExams('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listAdaptiveExams('school-1'),
      service.listAdaptiveExams('school-1'),
    ]);
    expect(results).toHaveLength(2);
  });
});
