import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScMedicalCertificateService } from '@/features/smart-campus/services/sc-medical-certificate.service';

describe('ScMedicalCertificateService', () => {
  let service: ScMedicalCertificateService;
  const mockSupabase = {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
          then: vi.fn()
        })),
        then: vi.fn()
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn()
        }))
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn()
          }))
        }))
      })),
      delete: vi.fn(() => ({
        eq: vi.fn()
      }))
    }))
  } as any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new ScMedicalCertificateService(mockSupabase);
  });

  it('should get medical certificate by id', async () => {
    const result = await service.getMedicalCertificate('school-1', 'certificate-1');
    expect(result).toBeDefined();
  });

  it('should return medical certificate with correct data', async () => {
    const mockCertificate = { id: 'certificate-1', student_id: 'student-1', issue_date: '2026-08-03', valid_until: '2026-08-10', reason: 'Medical leave' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockCertificate, error: null });
    const result = await service.getMedicalCertificate('school-1', 'certificate-1');
    expect(result).toEqual(mockCertificate);
  });

  it('should handle error when getting medical certificate', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getMedicalCertificate('school-1', 'certificate-1');
    expect(result).toBeNull();
  });

  it('should get all medical certificates for a school', async () => {
    const mockCertificates = [{ id: 'certificate-1' }, { id: 'certificate-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockCertificates, error: null });
    const result = await service.getMedicalCertificates('school-1');
    expect(result).toEqual(mockCertificates);
  });

  it('should create a new medical certificate', async () => {
    const newCertificate = { student_id: 'student-1', issue_date: '2026-08-03', valid_until: '2026-08-10', reason: 'Surgery recovery' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'certificate-3', ...newCertificate }, error: null });
    const result = await service.createMedicalCertificate('school-1', newCertificate);
    expect(result).toBeDefined();
  });

  it('should update a medical certificate', async () => {
    const updates = { valid_until: '2026-08-17' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'certificate-1', ...updates }, error: null });
    const result = await service.updateMedicalCertificate('school-1', 'certificate-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a medical certificate', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteMedicalCertificate('school-1', 'certificate-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteMedicalCertificate('school-1', 'certificate-1');
    expect(result).toBe(false);
  });

  it('should get certificates by student', async () => {
    const mockCertificates = [{ id: 'certificate-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockCertificates, error: null });
    const result = await service.getCertificatesByStudent('school-1', 'student-1');
    expect(result).toEqual(mockCertificates);
  });

  it('should get valid certificates', async () => {
    const mockCertificates = [{ id: 'certificate-1', valid_until: '2026-12-31' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockCertificates, error: null });
    const result = await service.getValidCertificates('school-1');
    expect(result).toEqual(mockCertificates);
  });

  it('should get expired certificates', async () => {
    const mockCertificates = [{ id: 'certificate-1', valid_until: '2025-01-01' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockCertificates, error: null });
    const result = await service.getExpiredCertificates('school-1');
    expect(result).toEqual(mockCertificates);
  });

  it('should check if certificate is valid', async () => {
    const mockCertificate = { id: 'certificate-1', valid_until: '2026-12-31' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockCertificate, error: null });
    const result = await service.isCertificateValid('school-1', 'certificate-1');
    expect(result).toBe(true);
  });

  it('should validate certificate data', () => {
    const result = service.validateCertificateData({ student_id: 'student-1', issue_date: '2026-08-03', valid_until: '2026-08-10', reason: 'Medical leave' });
    expect(result).toBe(true);
  });

  it('should reject invalid certificate data', () => {
    const result = service.validateCertificateData({ student_id: '', issue_date: '', valid_until: '', reason: '' });
    expect(result).toBe(false);
  });

  it('should get certificate statistics', async () => {
    const mockStats = { total: 30, valid: 25, expired: 5 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getCertificateStatistics('school-1');
    expect(result).toBeDefined();
  });

  it('should generate certificate number', () => {
    const result = service.generateCertificateNumber('school-1');
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });
});
