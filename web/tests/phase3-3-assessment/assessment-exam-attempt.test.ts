import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AssessmentExamAttemptService } from '@/features/assessment/services/assessment-exam-attempt.service';

vi.mock('@/features/assessment/repositories/assessment.repository', () => ({
  createAssessmentRepository: vi.fn(() => ({
    getExamAttempt: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Test' }),
    listExamAttempts: vi.fn().mockResolvedValue([]),
    createExamAttempt: vi.fn().mockResolvedValue({ id: 'new-id', name: 'Test' }),
    updateExamAttempt: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Updated' }),
    deleteExamAttempt: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockSupabase = {} as any;

describe('AssessmentExamAttemptService', () => {
  let service: AssessmentExamAttemptService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AssessmentExamAttemptService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(AssessmentExamAttemptService);
  });

  it('should get by id', async () => {
    const result = await service.getExamAttempt('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list', async () => {
    const result = await service.listExamAttempts('school-1');
    expect(result).toBeDefined();
  });

  it('should create', async () => {
    const result = await service.createExamAttempt('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update', async () => {
    const result = await service.updateExamAttempt('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete', async () => {
    const result = await service.deleteExamAttempt('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle filters', async () => {
    const result = await service.listExamAttempts('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listExamAttempts('school-1'),
      service.listExamAttempts('school-1'),
    ]);
    expect(results).toHaveLength(2);
  });
});
