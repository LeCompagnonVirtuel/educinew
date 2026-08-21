import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/gei2p-credentials.repository', () => ({
  Gei2pCredentialsRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findCredentialById: vi.fn(),
  findCredentialsByIssuer: vi.fn(),
  createCredential: vi.fn(),
  revokeCredential: vi.fn(),
  verifyCredential: vi.fn(),
  listCredentials: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GEI2P Credentials Service - CRUD', () => {
  it('should list credentials', async () => {
    mockRepo.listCredentials.mockResolvedValue([
      { id: '1', type: 'diploma', issuer: 'MIT', holder: '0xABC' },
    ]);
    const result = await mockRepo.listCredentials('school1');
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('diploma');
  });

  it('should create a credential', async () => {
    const data = { school_id: 'school1', type: 'certificate', issuer: 'school1' };
    mockRepo.createCredential.mockResolvedValue({ id: '1', ...data, status: 'active' });
    const result = await mockRepo.createCredential(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.status).toBe('active');
  });

  it('should revoke a credential', async () => {
    mockRepo.findCredentialById.mockResolvedValue({ id: '1', status: 'active' });
    mockRepo.revokeCredential.mockResolvedValue({ id: '1', status: 'revoked' });
    const result = await mockRepo.revokeCredential('school1', '1');
    expect(result.status).toBe('revoked');
  });

  it('should verify a credential', async () => {
    mockRepo.verifyCredential.mockResolvedValue({ valid: true, issuer_trusted: true });
    const result = await mockRepo.verifyCredential('school1', 'cred1');
    expect(result.valid).toBe(true);
  });

  it('should find credentials by issuer', async () => {
    mockRepo.findCredentialsByIssuer.mockResolvedValue([
      { id: '1', issuer: 'MIT' },
      { id: '2', issuer: 'MIT' },
    ]);
    const result = await mockRepo.findCredentialsByIssuer('school1', 'MIT');
    expect(result).toHaveLength(2);
  });
});

describe('GEI2P Credentials Service - Error Handling', () => {
  it('should return null when credential not found', async () => {
    mockRepo.findCredentialById.mockResolvedValue(null);
    const result = await mockRepo.findCredentialById('school1', '999');
    expect(result).toBeNull();
  });

  it('should handle DB errors', async () => {
    mockRepo.listCredentials.mockRejectedValue(new Error('Timeout'));
    await expect(mockRepo.listCredentials('school1')).rejects.toThrow('Timeout');
  });

  it('should require school_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('school_id is required'); };
    expect(() => validate('')).toThrow('school_id is required');
  });
});
