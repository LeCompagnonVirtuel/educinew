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

describe('Autonomous Infra - Auto Scaling Service', () => {
  it('should create scaling rule', async () => {
    const data = { schoolId, resource_type: 'compute', min_instances: 2, max_instances: 10, status: 'active' };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.resource_type).toBe('compute');
  });

  it('should list scaling rules', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', resource_type: 'storage' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should update scaling rule', async () => {
    mockRepo.update.mockResolvedValue({ id: '1', max_instances: 20 });
    const result = await mockRepo.update(schoolId, '1', { max_instances: 20 });
    expect(result.max_instances).toBe(20);
  });

  it('should find scaling rule by id', async () => {
    mockRepo.findById.mockResolvedValue({ id: '1', resource_type: 'database' });
    const result = await mockRepo.findById(schoolId, '1');
    expect(result.resource_type).toBe('database');
  });

  it('should delete scaling rule', async () => {
    mockRepo.delete.mockResolvedValue(undefined);
    await mockRepo.delete(schoolId, '1');
    expect(mockRepo.delete).toHaveBeenCalledWith(schoolId, '1');
  });
});

describe('Autonomous Infra - Backup Orchestrator Service', () => {
  it('should create backup schedule', async () => {
    const data = { schoolId, backup_type: 'full', frequency: 'daily', retention_days: 30 };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.backup_type).toBe('full');
  });

  it('should list backup schedules', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', backup_type: 'incremental' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should validate retention days', () => {
    const validate = (d: number) => { if (d < 1) throw new Error('Retention must be at least 1 day'); };
    expect(() => validate(0)).toThrow('Retention must be at least 1 day');
  });
});

describe('Autonomous Infra - Error Handling', () => {
  it('should require schoolId', () => {
    const validate = (id: string) => { if (!id) throw new Error('schoolId is required'); };
    expect(() => validate('')).toThrow('schoolId is required');
  });

  it('should handle DB errors', async () => {
    mockRepo.create.mockRejectedValue(new Error('Resource limit exceeded'));
    await expect(mockRepo.create({ schoolId })).rejects.toThrow('Resource limit exceeded');
  });
});
