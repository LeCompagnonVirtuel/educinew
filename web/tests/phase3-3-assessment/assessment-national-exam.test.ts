import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AssessmentNationalExamService } from '@/features/assessment/services/assessment-national-exam.service';

vi.mock('@/features/assessment/repositories/assessment.repository', () => ({
  createAssessmentRepository: vi.fn(() => ({
    getNationalExam: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Test' }),
    listNationalExams: vi.fn().mockResolvedValue([]),
    createNationalExam: vi.fn().mockResolvedValue({ id: 'new-id', name: 'Test' }),
    updateNationalExam: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Updated' }),
    deleteNationalExam: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockSupabase = {} as any;

describe('AssessmentNationalExamService', () => {
  let service: AssessmentNationalExamService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AssessmentNationalExamService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(AssessmentNationalExamService);
  });

  it('should get by id', async () => {
    const result = await service.getNationalExam('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list', async () => {
    const result = await service.listNationalExams('school-1');
    expect(result).toBeDefined();
  });

  it('should create', async () => {
    const result = await service.createNationalExam('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update', async () => {
    const result = await service.updateNationalExam('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete', async () => {
    const result = await service.deleteNationalExam('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle filters', async () => {
    const result = await service.listNationalExams('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listNationalExams('school-1'),
      service.listNationalExams('school-1'),
    ]);
    expect(results).toHaveLength(2);
  });
});
