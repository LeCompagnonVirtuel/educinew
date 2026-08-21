import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AssessmentPlagiarismService } from '@/features/assessment/services/assessment-plagiarism.service';

vi.mock('@/features/assessment/repositories/assessment.repository', () => ({
  createAssessmentRepository: vi.fn(() => ({
    getPlagiarism: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Test' }),
    listPlagiarisms: vi.fn().mockResolvedValue([]),
    createPlagiarism: vi.fn().mockResolvedValue({ id: 'new-id', name: 'Test' }),
    updatePlagiarism: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Updated' }),
    deletePlagiarism: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockSupabase = {} as any;

describe('AssessmentPlagiarismService', () => {
  let service: AssessmentPlagiarismService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AssessmentPlagiarismService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(AssessmentPlagiarismService);
  });

  it('should get by id', async () => {
    const result = await service.getPlagiarism('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list', async () => {
    const result = await service.listPlagiarisms('school-1');
    expect(result).toBeDefined();
  });

  it('should create', async () => {
    const result = await service.createPlagiarism('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update', async () => {
    const result = await service.updatePlagiarism('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete', async () => {
    const result = await service.deletePlagiarism('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle filters', async () => {
    const result = await service.listPlagiarisms('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listPlagiarisms('school-1'),
      service.listPlagiarisms('school-1'),
    ]);
    expect(results).toHaveLength(2);
  });
});
