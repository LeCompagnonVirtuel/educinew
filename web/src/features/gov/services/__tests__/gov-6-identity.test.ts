import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovIdentityVerificationService } from '../gov-identity-verification.service';
import { GovIdentityEnrollmentService } from '../gov-identity-enrollment.service';
import { GovIdentityBiometricMatchingService } from '../gov-identity-biometric-matching.service';
import { GovernmentRepositoryEnterprise } from '../../repositories/gov.repository';

vi.mock('../../repositories/gov.repository', () => ({
  GovernmentRepositoryEnterprise: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findIdentityVerificationById: vi.fn(),
  createIdentityVerification: vi.fn(),
  updateIdentityVerification: vi.fn(),
  deleteIdentityVerification: vi.fn(),
  findIdentityEnrollmentById: vi.fn(),
  findAllIdentityEnrollments: vi.fn(),
  createIdentityEnrollment: vi.fn(),
  findIdentityBiometricMatchingById: vi.fn(),
  createIdentityBiometricMatching: vi.fn(),
  deleteIdentityBiometricMatching: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(GovernmentRepositoryEnterprise).mockReturnValue(mockRepo as any);
});

describe('GovIdentityVerificationService', () => {
  const service = new GovIdentityVerificationService(mockSupabase);

  it('should get a verification', async () => {
    mockRepo.findIdentityVerificationById.mockResolvedValue({ id: '1', status: 'verified' });
    const result = await service.getIdentityVerification('school1', '1');
    expect(result).toHaveProperty('status', 'verified');
  });

  it('should throw when not found', async () => {
    mockRepo.findIdentityVerificationById.mockResolvedValue(null);
    await expect(service.getIdentityVerification('school1', '999')).rejects.toThrow();
  });

  it('should create a verification', async () => {
    mockRepo.createIdentityVerification.mockResolvedValue({ id: '1' });
    const result = await service.createIdentityVerification('school1', { studentId: 's1' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should update a verification', async () => {
    mockRepo.findIdentityVerificationById.mockResolvedValue({ id: '1' });
    mockRepo.updateIdentityVerification.mockResolvedValue({ id: '1', status: 'approved' });
    const result = await service.updateIdentityVerification('school1', '1', { status: 'approved' });
    expect(result).toHaveProperty('status', 'approved');
  });

  it('should delete a verification', async () => {
    mockRepo.findIdentityVerificationById.mockResolvedValue({ id: '1' });
    mockRepo.deleteIdentityVerification.mockResolvedValue(undefined);
    await expect(service.deleteIdentityVerification('school1', '1')).resolves.toBeUndefined();
  });
});

describe('GovIdentityEnrollmentService', () => {
  const service = new GovIdentityEnrollmentService(mockSupabase);

  it('should create an enrollment', async () => {
    mockRepo.createIdentityEnrollment.mockResolvedValue({ id: '1' });
    const result = await service.createIdentityEnrollment('school1', { studentId: 's1' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when not found', async () => {
    mockRepo.findIdentityEnrollmentById.mockResolvedValue(null);
    await expect(service.getIdentityEnrollment('school1', '999')).rejects.toThrow();
  });

  it('should list enrollments', async () => {
    mockRepo.findAllIdentityEnrollments.mockResolvedValue([]);
    const result = await service.listIdentityEnrollments('school1');
    expect(result).toEqual([]);
  });
});

describe('GovIdentityBiometricMatchingService', () => {
  const service = new GovIdentityBiometricMatchingService(mockSupabase);

  it('should create a matching', async () => {
    mockRepo.createIdentityBiometricMatching.mockResolvedValue({ id: '1' });
    const result = await service.createIdentityBiometricMatching('school1', { studentId: 's1' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when not found', async () => {
    mockRepo.findIdentityBiometricMatchingById.mockResolvedValue(null);
    await expect(service.getIdentityBiometricMatching('school1', '999')).rejects.toThrow();
  });

  it('should delete a matching', async () => {
    mockRepo.findIdentityBiometricMatchingById.mockResolvedValue({ id: '1' });
    mockRepo.deleteIdentityBiometricMatching.mockResolvedValue(undefined);
    await expect(service.deleteIdentityBiometricMatching('school1', '1')).resolves.toBeUndefined();
  });
});
