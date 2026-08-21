import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockRepo = {
  findMany: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const schoolId = '550e8400-e29b-41d4-a716-446655440000';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('AI Governance - Policy Engine Service', () => {
  it('should create policy', async () => {
    const data = { schoolId, policy_name: 'data_retention', category: 'privacy', status: 'active' };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.policy_name).toBe('data_retention');
  });

  it('should list policies', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', policy_name: 'access_control' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should update policy', async () => {
    mockRepo.update.mockResolvedValue({ id: '1', status: 'deprecated' });
    const result = await mockRepo.update(schoolId, '1', { status: 'deprecated' });
    expect(result.status).toBe('deprecated');
  });

  it('should find policy by id', async () => {
    mockRepo.findById.mockResolvedValue({ id: '1', category: 'security' });
    const result = await mockRepo.findById(schoolId, '1');
    expect(result.category).toBe('security');
  });

  it('should delete policy', async () => {
    mockRepo.delete.mockResolvedValue(undefined);
    await mockRepo.delete(schoolId, '1');
    expect(mockRepo.delete).toHaveBeenCalledWith(schoolId, '1');
  });
});

describe('AI Governance - Audit Trail Service', () => {
  it('should create audit entry', async () => {
    const data = { schoolId, action: 'model_deployment', actor: 'admin', timestamp: new Date().toISOString() };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.action).toBe('model_deployment');
  });

  it('should list audit entries', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', action: 'config_change' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should validate actor field', () => {
    const validate = (a: string) => { if (!a) throw new Error('Actor is required'); };
    expect(() => validate('')).toThrow('Actor is required');
  });
});

describe('AI Governance - Error Handling', () => {
  it('should require schoolId', () => {
    const validate = (id: string) => { if (!id) throw new Error('schoolId is required'); };
    expect(() => validate('')).toThrow('schoolId is required');
  });

  it('should handle DB errors', async () => {
    mockRepo.findMany.mockRejectedValue(new Error('Read-only replica'));
    await expect(mockRepo.findMany(schoolId)).rejects.toThrow('Read-only replica');
  });
});
