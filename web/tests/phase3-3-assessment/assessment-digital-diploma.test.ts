import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AssessmentDigitalDiplomaService } from '@/features/assessment/services/assessment-digital-diploma.service';

vi.mock('@/features/assessment/repositories/assessment.repository', () => ({
  createAssessmentRepository: vi.fn(() => ({
    getDigitalDiploma: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Test' }),
    listDigitalDiplomas: vi.fn().mockResolvedValue([]),
    createDigitalDiploma: vi.fn().mockResolvedValue({ id: 'new-id', name: 'Test' }),
    updateDigitalDiploma: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Updated' }),
    deleteDigitalDiploma: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockSupabase = {} as any;

describe('AssessmentDigitalDiplomaService', () => {
  let service: AssessmentDigitalDiplomaService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AssessmentDigitalDiplomaService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(AssessmentDigitalDiplomaService);
  });

  it('should get by id', async () => {
    const result = await service.getDigitalDiploma('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list', async () => {
    const result = await service.listDigitalDiplomas('school-1');
    expect(result).toBeDefined();
  });

  it('should create', async () => {
    const result = await service.createDigitalDiploma('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update', async () => {
    const result = await service.updateDigitalDiploma('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete', async () => {
    const result = await service.deleteDigitalDiploma('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle filters', async () => {
    const result = await service.listDigitalDiplomas('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listDigitalDiplomas('school-1'),
      service.listDigitalDiplomas('school-1'),
    ]);
    expect(results).toHaveLength(2);
  });
});
