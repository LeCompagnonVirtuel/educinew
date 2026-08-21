import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AssessmentTranscriptService } from '@/features/assessment/services/assessment-transcript.service';

vi.mock('@/features/assessment/repositories/assessment.repository', () => ({
  createAssessmentRepository: vi.fn(() => ({
    getTranscript: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Test' }),
    listTranscripts: vi.fn().mockResolvedValue([]),
    createTranscript: vi.fn().mockResolvedValue({ id: 'new-id', name: 'Test' }),
    updateTranscript: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Updated' }),
    deleteTranscript: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockSupabase = {} as any;

describe('AssessmentTranscriptService', () => {
  let service: AssessmentTranscriptService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AssessmentTranscriptService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(AssessmentTranscriptService);
  });

  it('should get by id', async () => {
    const result = await service.getTranscript('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list', async () => {
    const result = await service.listTranscripts('school-1');
    expect(result).toBeDefined();
  });

  it('should create', async () => {
    const result = await service.createTranscript('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update', async () => {
    const result = await service.updateTranscript('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete', async () => {
    const result = await service.deleteTranscript('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle filters', async () => {
    const result = await service.listTranscripts('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listTranscripts('school-1'),
      service.listTranscripts('school-1'),
    ]);
    expect(results).toHaveLength(2);
  });
});
