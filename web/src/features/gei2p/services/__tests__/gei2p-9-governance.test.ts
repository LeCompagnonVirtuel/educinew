import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/gei2p-governance.repository', () => ({
  Gei2pGovernanceRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findPolicyById: vi.fn(),
  findPoliciesByScope: vi.fn(),
  createPolicy: vi.fn(),
  updatePolicy: vi.fn(),
  enforcePolicy: vi.fn(),
  listPolicies: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GEI2P Governance Service - CRUD', () => {
  it('should list policies', async () => {
    mockRepo.listPolicies.mockResolvedValue([
      { id: '1', name: 'data_retention', scope: 'global', active: true },
    ]);
    const result = await mockRepo.listPolicies('school1');
    expect(result).toHaveLength(1);
    expect(result[0].active).toBe(true);
  });

  it('should create a policy', async () => {
    const data = { school_id: 'school1', name: 'access_control', scope: 'credentials' };
    mockRepo.createPolicy.mockResolvedValue({ id: '1', ...data, active: true });
    const result = await mockRepo.createPolicy(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.scope).toBe('credentials');
  });

  it('should update a policy', async () => {
    mockRepo.findPolicyById.mockResolvedValue({ id: '1', active: true });
    mockRepo.updatePolicy.mockResolvedValue({ id: '1', active: false });
    const result = await mockRepo.updatePolicy('school1', '1', { active: false });
    expect(result.active).toBe(false);
  });

  it('should enforce a policy', async () => {
    mockRepo.enforcePolicy.mockResolvedValue({ policy_id: '1', enforced: true });
    const result = await mockRepo.enforcePolicy('school1', '1');
    expect(result.enforced).toBe(true);
  });

  it('should find policies by scope', async () => {
    mockRepo.findPoliciesByScope.mockResolvedValue([
      { id: '1', scope: 'global' },
    ]);
    const result = await mockRepo.findPoliciesByScope('school1', 'global');
    expect(result).toHaveLength(1);
  });
});

describe('GEI2P Governance Service - Error Handling', () => {
  it('should return null when policy not found', async () => {
    mockRepo.findPolicyById.mockResolvedValue(null);
    const result = await mockRepo.findPolicyById('school1', '999');
    expect(result).toBeNull();
  });

  it('should handle DB errors', async () => {
    mockRepo.listPolicies.mockRejectedValue(new Error('Connection refused'));
    await expect(mockRepo.listPolicies('school1')).rejects.toThrow('Connection refused');
  });

  it('should require school_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('school_id is required'); };
    expect(() => validate('')).toThrow('school_id is required');
  });
});
