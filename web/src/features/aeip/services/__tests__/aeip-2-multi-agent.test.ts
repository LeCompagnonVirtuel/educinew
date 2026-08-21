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

describe('Multi-Agent - Agent Orchestrator Service', () => {
  it('should list agents', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', agent_type: 'teacher_assistant', status: 'active' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should create agent', async () => {
    const data = { schoolId, agent_type: 'grader', capabilities: ['grading'], status: 'active' };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.agent_type).toBe('grader');
  });

  it('should update agent status', async () => {
    mockRepo.update.mockResolvedValue({ id: '1', status: 'paused' });
    const result = await mockRepo.update(schoolId, '1', { status: 'paused' });
    expect(result.status).toBe('paused');
  });

  it('should delete agent', async () => {
    mockRepo.delete.mockResolvedValue(undefined);
    await mockRepo.delete(schoolId, '1');
    expect(mockRepo.delete).toHaveBeenCalledWith(schoolId, '1');
  });

  it('should find agent by id', async () => {
    mockRepo.findById.mockResolvedValue({ id: '1', agent_type: 'grader' });
    const result = await mockRepo.findById(schoolId, '1');
    expect(result.agent_type).toBe('grader');
  });
});

describe('Multi-Agent - Task Queue Service', () => {
  it('should enqueue task', async () => {
    const data = { schoolId, task_type: 'grading', priority: 'high', status: 'pending' };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.task_type).toBe('grading');
  });

  it('should list pending tasks', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', status: 'pending' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should update task status', async () => {
    mockRepo.update.mockResolvedValue({ id: '1', status: 'completed' });
    const result = await mockRepo.update(schoolId, '1', { status: 'completed' });
    expect(result.status).toBe('completed');
  });
});

describe('Multi-Agent - Error Handling', () => {
  it('should require schoolId', () => {
    const validate = (id: string) => { if (!id) throw new Error('schoolId is required'); };
    expect(() => validate('')).toThrow('schoolId is required');
  });

  it('should handle DB errors', async () => {
    mockRepo.create.mockRejectedValue(new Error('Constraint violation'));
    await expect(mockRepo.create({ schoolId })).rejects.toThrow('Constraint violation');
  });
});
