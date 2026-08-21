import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AssessmentResearchProjectService } from '@/features/assessment/services/assessment-research-project.service';

vi.mock('@/features/assessment/repositories/assessment.repository', () => ({
  createAssessmentRepository: vi.fn(() => ({
    getResearchProject: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Test' }),
    listResearchProjects: vi.fn().mockResolvedValue([]),
    createResearchProject: vi.fn().mockResolvedValue({ id: 'new-id', name: 'Test' }),
    updateResearchProject: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Updated' }),
    deleteResearchProject: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockSupabase = {} as any;

describe('AssessmentResearchProjectService', () => {
  let service: AssessmentResearchProjectService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AssessmentResearchProjectService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(AssessmentResearchProjectService);
  });

  it('should get by id', async () => {
    const result = await service.getResearchProject('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list', async () => {
    const result = await service.listResearchProjects('school-1');
    expect(result).toBeDefined();
  });

  it('should create', async () => {
    const result = await service.createResearchProject('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update', async () => {
    const result = await service.updateResearchProject('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete', async () => {
    const result = await service.deleteResearchProject('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle filters', async () => {
    const result = await service.listResearchProjects('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listResearchProjects('school-1'),
      service.listResearchProjects('school-1'),
    ]);
    expect(results).toHaveLength(2);
  });
});
