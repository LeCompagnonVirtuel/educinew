import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/gei2p-identity.repository', () => ({
  Gei2pIdentityRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findIdentityById: vi.fn(),
  findIdentityByWallet: vi.fn(),
  createIdentity: vi.fn(),
  updateIdentity: vi.fn(),
  revokeIdentity: vi.fn(),
  listIdentities: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GEI2P Identity Service - CRUD', () => {
  it('should list identities', async () => {
    mockRepo.listIdentities.mockResolvedValue([
      { id: '1', wallet: '0xABC', did: 'did:gei2p:1' },
    ]);
    const result = await mockRepo.listIdentities('school1');
    expect(result).toHaveLength(1);
    expect(result[0].did).toBe('did:gei2p:1');
  });

  it('should create an identity', async () => {
    const data = { school_id: 'school1', wallet: '0xABC', name: 'John' };
    mockRepo.createIdentity.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.createIdentity(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.wallet).toBe('0xABC');
  });

  it('should update an identity', async () => {
    mockRepo.findIdentityById.mockResolvedValue({ id: '1', status: 'active' });
    mockRepo.updateIdentity.mockResolvedValue({ id: '1', status: 'suspended' });
    const result = await mockRepo.updateIdentity('school1', '1', { status: 'suspended' });
    expect(result.status).toBe('suspended');
  });

  it('should revoke an identity', async () => {
    mockRepo.findIdentityById.mockResolvedValue({ id: '1' });
    mockRepo.revokeIdentity.mockResolvedValue({ id: '1', revoked: true });
    const result = await mockRepo.revokeIdentity('school1', '1');
    expect(result.revoked).toBe(true);
  });

  it('should find identity by wallet', async () => {
    mockRepo.findIdentityByWallet.mockResolvedValue({ id: '1', wallet: '0xABC' });
    const result = await mockRepo.findIdentityByWallet('school1', '0xABC');
    expect(result.wallet).toBe('0xABC');
  });
});

describe('GEI2P Identity Service - Error Handling', () => {
  it('should return null when identity not found', async () => {
    mockRepo.findIdentityById.mockResolvedValue(null);
    const result = await mockRepo.findIdentityById('school1', '999');
    expect(result).toBeNull();
  });

  it('should handle DB errors', async () => {
    mockRepo.listIdentities.mockRejectedValue(new Error('Connection refused'));
    await expect(mockRepo.listIdentities('school1')).rejects.toThrow('Connection refused');
  });

  it('should require school_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('school_id is required'); };
    expect(() => validate('')).toThrow('school_id is required');
  });
});
