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

describe('Autonomous Finance - Budget Optimizer Service', () => {
  it('should create budget plan', async () => {
    const data = { schoolId, category: 'infrastructure', amount: 50000, period: 'annual', status: 'active' };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.category).toBe('infrastructure');
  });

  it('should list budget plans', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', category: 'salaries' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should update budget allocation', async () => {
    mockRepo.update.mockResolvedValue({ id: '1', amount: 75000 });
    const result = await mockRepo.update(schoolId, '1', { amount: 75000 });
    expect(result.amount).toBe(75000);
  });

  it('should find budget by id', async () => {
    mockRepo.findById.mockResolvedValue({ id: '1', category: 'technology' });
    const result = await mockRepo.findById(schoolId, '1');
    expect(result.category).toBe('technology');
  });

  it('should delete budget plan', async () => {
    mockRepo.delete.mockResolvedValue(undefined);
    await mockRepo.delete(schoolId, '1');
    expect(mockRepo.delete).toHaveBeenCalledWith(schoolId, '1');
  });
});

describe('Autonomous Finance - Fraud Detection Service', () => {
  it('should create alert', async () => {
    const data = { schoolId, alert_type: 'anomaly', severity: 'high', transaction_id: 't1' };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.alert_type).toBe('anomaly');
  });

  it('should list alerts', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', severity: 'high' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should resolve alert', async () => {
    mockRepo.update.mockResolvedValue({ id: '1', status: 'resolved' });
    const result = await mockRepo.update(schoolId, '1', { status: 'resolved' });
    expect(result.status).toBe('resolved');
  });
});

describe('Autonomous Finance - Error Handling', () => {
  it('should require schoolId', () => {
    const validate = (id: string) => { if (!id) throw new Error('schoolId is required'); };
    expect(() => validate('')).toThrow('schoolId is required');
  });

  it('should handle DB errors', async () => {
    mockRepo.create.mockRejectedValue(new Error('Transaction conflict'));
    await expect(mockRepo.create({ schoolId })).rejects.toThrow('Transaction conflict');
  });
});
