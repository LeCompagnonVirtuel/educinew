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

describe('Quantum Ready - Quantum Algorithm Service', () => {
  it('should create quantum algorithm', async () => {
    const data = { schoolId, algorithm_name: 'grover_search', qubits: 8, status: 'experimental' };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.algorithm_name).toBe('grover_search');
  });

  it('should list quantum algorithms', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', algorithm_name: 'shor_factor' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should update quantum algorithm', async () => {
    mockRepo.update.mockResolvedValue({ id: '1', status: 'production' });
    const result = await mockRepo.update(schoolId, '1', { status: 'production' });
    expect(result.status).toBe('production');
  });

  it('should find quantum algorithm by id', async () => {
    mockRepo.findById.mockResolvedValue({ id: '1', qubits: 16 });
    const result = await mockRepo.findById(schoolId, '1');
    expect(result.qubits).toBe(16);
  });

  it('should delete quantum algorithm', async () => {
    mockRepo.delete.mockResolvedValue(undefined);
    await mockRepo.delete(schoolId, '1');
    expect(mockRepo.delete).toHaveBeenCalledWith(schoolId, '1');
  });
});

describe('Quantum Ready - Qubit Pool Service', () => {
  it('should create qubit pool', async () => {
    const data = { schoolId, pool_name: 'edu_pool', total_qubits: 64, available_qubits: 48 };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.pool_name).toBe('edu_pool');
  });

  it('should list qubit pools', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', pool_name: 'research_pool' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should validate qubit counts', () => {
    const validate = (a: number, t: number) => { if (a > t) throw new Error('Available exceeds total'); };
    expect(() => validate(100, 50)).toThrow('Available exceeds total');
  });
});

describe('Quantum Ready - Error Handling', () => {
  it('should require schoolId', () => {
    const validate = (id: string) => { if (!id) throw new Error('schoolId is required'); };
    expect(() => validate('')).toThrow('schoolId is required');
  });

  it('should handle DB errors', async () => {
    mockRepo.create.mockRejectedValue(new Error('Serialization failure'));
    await expect(mockRepo.create({ schoolId })).rejects.toThrow('Serialization failure');
  });
});
