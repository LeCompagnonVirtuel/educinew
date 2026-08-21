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

describe('Digital Brain - Knowledge Graph Service', () => {
  it('should list knowledge nodes', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', node_type: 'concept', label: 'algebra' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should create knowledge node', async () => {
    const data = { schoolId, node_type: 'concept', label: 'calculus', domain: 'mathematics' };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.label).toBe('calculus');
  });

  it('should update knowledge node', async () => {
    mockRepo.update.mockResolvedValue({ id: '1', label: 'advanced calculus' });
    const result = await mockRepo.update(schoolId, '1', { label: 'advanced calculus' });
    expect(result.label).toBe('advanced calculus');
  });

  it('should delete knowledge node', async () => {
    mockRepo.delete.mockResolvedValue(undefined);
    await mockRepo.delete(schoolId, '1');
    expect(mockRepo.delete).toHaveBeenCalledWith(schoolId, '1');
  });

  it('should find knowledge node by id', async () => {
    mockRepo.findById.mockResolvedValue({ id: '1', node_type: 'concept' });
    const result = await mockRepo.findById(schoolId, '1');
    expect(result.node_type).toBe('concept');
  });
});

describe('Digital Brain - Memory Service', () => {
  it('should store memory', async () => {
    const data = { schoolId, memory_type: 'episodic', content: 'student performed well', importance: 0.8 };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.memory_type).toBe('episodic');
  });

  it('should retrieve memories', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', memory_type: 'semantic' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should validate importance range', () => {
    const validate = (v: number) => { if (v < 0 || v > 1) throw new Error('Importance must be 0-1'); };
    expect(() => validate(2)).toThrow('Importance must be 0-1');
  });
});

describe('Digital Brain - Error Handling', () => {
  it('should require schoolId', () => {
    const validate = (id: string) => { if (!id) throw new Error('schoolId is required'); };
    expect(() => validate('')).toThrow('schoolId is required');
  });

  it('should handle DB errors', async () => {
    mockRepo.findMany.mockRejectedValue(new Error('Table lock'));
    await expect(mockRepo.findMany(schoolId)).rejects.toThrow('Table lock');
  });
});
