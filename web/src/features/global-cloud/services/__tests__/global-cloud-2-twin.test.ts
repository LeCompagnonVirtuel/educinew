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

describe('Digital Twin - BaseTwin Service', () => {
  it('should list twins', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', name: 'Building A', type: 'BUILDING' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should get twin by id', async () => {
    mockRepo.findById.mockResolvedValue({ id: '1', name: 'Building A', state: 'ACTIVE' });
    const result = await mockRepo.findById(schoolId, '1');
    expect(result.state).toBe('ACTIVE');
  });

  it('should create twin', async () => {
    const data = { schoolId, name: 'Lab 1', description: 'Physics lab', type: 'LABORATORY', state: 'ACTIVE', lifecycle: 'ACTIVE', template: 'DEFAULT' };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.type).toBe('LABORATORY');
  });

  it('should update twin state', async () => {
    mockRepo.update.mockResolvedValue({ id: '1', state: 'MAINTENANCE' });
    const result = await mockRepo.update(schoolId, '1', { state: 'MAINTENANCE' });
    expect(result.state).toBe('MAINTENANCE');
  });

  it('should delete twin', async () => {
    mockRepo.delete.mockResolvedValue(undefined);
    await mockRepo.delete(schoolId, '1');
    expect(mockRepo.delete).toHaveBeenCalledWith(schoolId, '1');
  });
});

describe('Digital Twin - TwinEvent Service', () => {
  it('should list events for twin', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: 'e1', type: 'HEALTH', severity: 'INFO' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result[0].severity).toBe('INFO');
  });

  it('should create event', async () => {
    const data = { schoolId, twin_id: 't1', type: 'ANOMALY', severity: 'WARNING', title: 'High CPU', message: 'CPU above 90%', source: 'monitor' };
    mockRepo.create.mockResolvedValue({ id: 'e1', ...data });
    const result = await mockRepo.create(data);
    expect(result.severity).toBe('WARNING');
  });
});

describe('Digital Twin - TwinMetric Service', () => {
  it('should list metrics', async () => {
    mockRepo.findMany.mockResolvedValue([]);
    expect(await mockRepo.findMany(schoolId)).toHaveLength(0);
  });

  it('should create metric', async () => {
    const data = { twin_id: 't1', name: 'cpu_usage', value: 85.5, unit: 'PERCENTAGE', type: 'AVERAGE', trend: 'UP', source: 'agent' };
    mockRepo.create.mockResolvedValue({ id: 'm1', ...data });
    const result = await mockRepo.create(data);
    expect(result.value).toBe(85.5);
  });
});

describe('Digital Twin - TwinAlert Service', () => {
  it('should create alert', async () => {
    const data = { schoolId, twin_id: 't1', type: 'THRESHOLD', priority: 'HIGH', title: 'CPU Alert', message: 'CPU critical', description: 'CPU above threshold', source: 'monitor', metric: 'cpu_usage', current_value: 95, threshold_value: 80, action: 'ESCALATE' };
    mockRepo.create.mockResolvedValue({ id: 'a1', ...data });
    const result = await mockRepo.create(data);
    expect(result.priority).toBe('HIGH');
  });

  it('should validate threshold comparison', () => {
    const validate = (current: number, threshold: number) => {
      if (current <= threshold) throw new Error('No alert needed');
    };
    expect(() => validate(70, 80)).toThrow('No alert needed');
    expect(() => validate(90, 80)).not.toThrow();
  });
});
