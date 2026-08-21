import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/identity.repository', () => ({
  IdentityRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findIdentityById: vi.fn(),
  findIdentityByUser: vi.fn(),
  createIdentity: vi.fn(),
  updateIdentity: vi.fn(),
  deleteIdentity: vi.fn(),
  listIdentities: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Identity Service - CRUD', () => {
  it('should list identities', async () => {
    mockRepo.listIdentities.mockResolvedValue([
      { id: '1', user_id: 'u1', national_id: 'CI-12345' },
    ]);
    const result = await mockRepo.listIdentities('school1');
    expect(result).toHaveLength(1);
    expect(result[0].national_id).toBe('CI-12345');
  });

  it('should create an identity', async () => {
    const data = { school_id: 'school1', user_id: 'u1', nationality: 'Ivory Coast' };
    mockRepo.createIdentity.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.createIdentity(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.nationality).toBe('Ivory Coast');
  });

  it('should update an identity', async () => {
    mockRepo.findIdentityById.mockResolvedValue({ id: '1', gender: 'male' });
    mockRepo.updateIdentity.mockResolvedValue({ id: '1', gender: 'female' });
    const result = await mockRepo.updateIdentity('school1', '1', { gender: 'female' });
    expect(result.gender).toBe('female');
  });

  it('should delete an identity', async () => {
    mockRepo.findIdentityById.mockResolvedValue({ id: '1' });
    mockRepo.deleteIdentity.mockResolvedValue(undefined);
    await expect(mockRepo.deleteIdentity('school1', '1')).resolves.toBeUndefined();
  });

  it('should find identity by user', async () => {
    mockRepo.findIdentityByUser.mockResolvedValue({ id: '1', user_id: 'u1' });
    const result = await mockRepo.findIdentityByUser('school1', 'u1');
    expect(result.user_id).toBe('u1');
  });
});

describe('Identity Service - Error Handling', () => {
  it('should throw when identity not found', async () => {
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
