import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AssessmentCertificateTemplateService } from '@/features/assessment/services/assessment-certificate-template.service';

vi.mock('@/features/assessment/repositories/assessment.repository', () => ({
  createAssessmentRepository: vi.fn(() => ({
    getCertificateTemplate: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Test' }),
    listCertificateTemplates: vi.fn().mockResolvedValue([]),
    createCertificateTemplate: vi.fn().mockResolvedValue({ id: 'new-id', name: 'Test' }),
    updateCertificateTemplate: vi.fn().mockResolvedValue({ id: 'test-id', name: 'Updated' }),
    deleteCertificateTemplate: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockSupabase = {} as any;

describe('AssessmentCertificateTemplateService', () => {
  let service: AssessmentCertificateTemplateService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AssessmentCertificateTemplateService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should have supabase injected', () => {
    expect(service).toBeInstanceOf(AssessmentCertificateTemplateService);
  });

  it('should get by id', async () => {
    const result = await service.getCertificateTemplate('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list', async () => {
    const result = await service.listCertificateTemplates('school-1');
    expect(result).toBeDefined();
  });

  it('should create', async () => {
    const result = await service.createCertificateTemplate('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should update', async () => {
    const result = await service.updateCertificateTemplate('school-1', 'test-id', { name: 'Updated' } as any);
    expect(result).toBeDefined();
  });

  it('should delete', async () => {
    const result = await service.deleteCertificateTemplate('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should handle filters', async () => {
    const result = await service.listCertificateTemplates('school-1', { status: 'active' });
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listCertificateTemplates('school-1'),
      service.listCertificateTemplates('school-1'),
    ]);
    expect(results).toHaveLength(2);
  });
});
