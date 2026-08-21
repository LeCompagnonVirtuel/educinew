import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AssessmentCertificateService } from '@/features/assessment/services/assessment-certificate.service';

vi.mock('@/features/assessment/repositories/assessment.repository', () => ({
  createAssessmentRepository: vi.fn(() => ({
    getCertificate: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Test' }),
    listCertificates: vi.fn().mockResolvedValue([]),
    createCertificate: vi.fn().mockResolvedValue({ id: 'new-id', name: 'Test' }),
    updateCertificate: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Updated' }),
    deleteCertificate: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockSupabase = {} as any;

describe('AssessmentCertificateService', () => {
  let service: AssessmentCertificateService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AssessmentCertificateService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(AssessmentCertificateService);
  });

  it('should get by id', async () => {
    const result = await service.getCertificate('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list', async () => {
    const result = await service.listCertificates('school-1');
    expect(result).toBeDefined();
  });

  it('should create', async () => {
    const result = await service.createCertificate('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update', async () => {
    const result = await service.updateCertificate('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete', async () => {
    const result = await service.deleteCertificate('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle filters', async () => {
    const result = await service.listCertificates('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listCertificates('school-1'),
      service.listCertificates('school-1'),
    ]);
    expect(results).toHaveLength(2);
  });
});
