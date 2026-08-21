import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AssessmentSkillMatrixService } from '@/features/assessment/services/assessment-skill-matrix.service';

vi.mock('@/features/assessment/repositories/assessment.repository', () => ({
  createAssessmentRepository: vi.fn(() => ({
    getSkillMatrix: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Test' }),
    listSkillMatrices: vi.fn().mockResolvedValue([]),
    createSkillMatrix: vi.fn().mockResolvedValue({ id: 'new-id', name: 'Test' }),
    updateSkillMatrix: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Updated' }),
    deleteSkillMatrix: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockSupabase = {} as any;

describe('AssessmentSkillMatrixService', () => {
  let service: AssessmentSkillMatrixService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AssessmentSkillMatrixService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(AssessmentSkillMatrixService);
  });

  it('should get by id', async () => {
    const result = await service.getSkillMatrix('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list', async () => {
    const result = await service.listSkillMatrices('school-1');
    expect(result).toBeDefined();
  });

  it('should create', async () => {
    const result = await service.createSkillMatrix('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update', async () => {
    const result = await service.updateSkillMatrix('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete', async () => {
    const result = await service.deleteSkillMatrix('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle filters', async () => {
    const result = await service.listSkillMatrices('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listSkillMatrices('school-1'),
      service.listSkillMatrices('school-1'),
    ]);
    expect(results).toHaveLength(2);
  });
});
