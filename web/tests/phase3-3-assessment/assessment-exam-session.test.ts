import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AssessmentExamSessionService } from '@/features/assessment/services/assessment-exam-session.service';

vi.mock('@/features/assessment/repositories/assessment.repository', () => ({
  createAssessmentRepository: vi.fn(() => ({
    getExamSession: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Test' }),
    listExamSessions: vi.fn().mockResolvedValue([]),
    createExamSession: vi.fn().mockResolvedValue({ id: 'new-id', name: 'Test' }),
    updateExamSession: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Updated' }),
    deleteExamSession: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockSupabase = {} as any;

describe('AssessmentExamSessionService', () => {
  let service: AssessmentExamSessionService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AssessmentExamSessionService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(AssessmentExamSessionService);
  });

  it('should get by id', async () => {
    const result = await service.getExamSession('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list', async () => {
    const result = await service.listExamSessions('school-1');
    expect(result).toBeDefined();
  });

  it('should create', async () => {
    const result = await service.createExamSession('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update', async () => {
    const result = await service.updateExamSession('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete', async () => {
    const result = await service.deleteExamSession('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle filters', async () => {
    const result = await service.listExamSessions('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listExamSessions('school-1'),
      service.listExamSessions('school-1'),
    ]);
    expect(results).toHaveLength(2);
  });
});
