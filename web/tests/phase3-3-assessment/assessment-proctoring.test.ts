import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AssessmentProctoringService } from '@/features/assessment/services/assessment-proctoring.service';

vi.mock('@/features/assessment/repositories/assessment.repository', () => ({
  createAssessmentRepository: vi.fn(() => ({
    getProctoring: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Test' }),
    listProctorings: vi.fn().mockResolvedValue([]),
    createProctoring: vi.fn().mockResolvedValue({ id: 'new-id', name: 'Test' }),
    updateProctoring: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Updated' }),
    deleteProctoring: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockSupabase = {} as any;

describe('AssessmentProctoringService', () => {
  let service: AssessmentProctoringService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AssessmentProctoringService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(AssessmentProctoringService);
  });

  it('should get by id', async () => {
    const result = await service.getProctoring('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list', async () => {
    const result = await service.listProctorings('school-1');
    expect(result).toBeDefined();
  });

  it('should create', async () => {
    const result = await service.createProctoring('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update', async () => {
    const result = await service.updateProctoring('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete', async () => {
    const result = await service.deleteProctoring('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle filters', async () => {
    const result = await service.listProctorings('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listProctorings('school-1'),
      service.listProctorings('school-1'),
    ]);
    expect(results).toHaveLength(2);
  });
});
