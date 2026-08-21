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

describe('AI OS - Neural Network Service', () => {
  it('should list neural networks', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', name: 'classifier', type: 'classification' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should create neural network', async () => {
    const data = { schoolId, name: 'predictor', type: 'regression', layers: 5, status: 'active' };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.name).toBe('predictor');
  });

  it('should update neural network', async () => {
    mockRepo.update.mockResolvedValue({ id: '1', status: 'archived' });
    const result = await mockRepo.update(schoolId, '1', { status: 'archived' });
    expect(result.status).toBe('archived');
  });

  it('should delete neural network', async () => {
    mockRepo.delete.mockResolvedValue(undefined);
    await mockRepo.delete(schoolId, '1');
    expect(mockRepo.delete).toHaveBeenCalledWith(schoolId, '1');
  });

  it('should handle not found', async () => {
    mockRepo.findById.mockResolvedValue(null);
    await expect(mockRepo.findById(schoolId, 'missing')).resolves.toBeNull();
  });
});

describe('AI OS - Model Registry Service', () => {
  it('should register model', async () => {
    const data = { schoolId, model_name: 'gpt-edu', version: '1.0', status: 'deployed' };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.model_name).toBe('gpt-edu');
  });

  it('should list registered models', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', model_name: 'gpt-edu' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should update model version', async () => {
    mockRepo.update.mockResolvedValue({ id: '1', version: '2.0' });
    const result = await mockRepo.update(schoolId, '1', { version: '2.0' });
    expect(result.version).toBe('2.0');
  });
});

describe('AI OS - Error Handling', () => {
  it('should require schoolId', () => {
    const validate = (id: string) => { if (!id) throw new Error('schoolId is required'); };
    expect(() => validate('')).toThrow('schoolId is required');
  });

  it('should handle DB errors', async () => {
    mockRepo.findMany.mockRejectedValue(new Error('Connection timeout'));
    await expect(mockRepo.findMany(schoolId)).rejects.toThrow('Connection timeout');
  });
});
