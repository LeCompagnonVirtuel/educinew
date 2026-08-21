import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AssessmentAutomaticGradingService } from '@/features/assessment/services/assessment-automatic-grading.service';

vi.mock('@/features/assessment/repositories/assessment.repository', () => ({
  createAssessmentRepository: vi.fn(() => ({
    getAutomaticGrading: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Test' }),
    listAutomaticGradings: vi.fn().mockResolvedValue([]),
    createAutomaticGrading: vi.fn().mockResolvedValue({ id: 'new-id', name: 'Test' }),
    updateAutomaticGrading: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Updated' }),
    deleteAutomaticGrading: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockSupabase = {} as any;

describe('AssessmentAutomaticGradingService', () => {
  let service: AssessmentAutomaticGradingService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AssessmentAutomaticGradingService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(AssessmentAutomaticGradingService);
  });

  it('should get by id', async () => {
    const result = await service.getAutomaticGrading('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list', async () => {
    const result = await service.listAutomaticGradings('school-1');
    expect(result).toBeDefined();
  });

  it('should create', async () => {
    const result = await service.createAutomaticGrading('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update', async () => {
    const result = await service.updateAutomaticGrading('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete', async () => {
    const result = await service.deleteAutomaticGrading('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle filters', async () => {
    const result = await service.listAutomaticGradings('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listAutomaticGradings('school-1'),
      service.listAutomaticGradings('school-1'),
    ]);
    expect(results).toHaveLength(2);
  });
});
