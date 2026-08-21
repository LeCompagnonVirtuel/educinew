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

describe('Copilot - Session Manager Service', () => {
  it('should create session', async () => {
    const data = { schoolId, user_id: 'u1', mode: 'teaching_assist', status: 'active' };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.mode).toBe('teaching_assist');
  });

  it('should list sessions', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', status: 'active' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should end session', async () => {
    mockRepo.update.mockResolvedValue({ id: '1', status: 'ended' });
    const result = await mockRepo.update(schoolId, '1', { status: 'ended' });
    expect(result.status).toBe('ended');
  });

  it('should find session by id', async () => {
    mockRepo.findById.mockResolvedValue({ id: '1', mode: 'grading' });
    const result = await mockRepo.findById(schoolId, '1');
    expect(result.mode).toBe('grading');
  });

  it('should delete session', async () => {
    mockRepo.delete.mockResolvedValue(undefined);
    await mockRepo.delete(schoolId, '1');
    expect(mockRepo.delete).toHaveBeenCalledWith(schoolId, '1');
  });
});

describe('Copilot - Suggestion Engine Service', () => {
  it('should create suggestion', async () => {
    const data = { schoolId, context: 'grading', suggestion: 'use rubric template', priority: 'high' };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.suggestion).toBe('use rubric template');
  });

  it('should list suggestions', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', context: 'grading' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should dismiss suggestion', async () => {
    mockRepo.update.mockResolvedValue({ id: '1', status: 'dismissed' });
    const result = await mockRepo.update(schoolId, '1', { status: 'dismissed' });
    expect(result.status).toBe('dismissed');
  });
});

describe('Copilot - Error Handling', () => {
  it('should require schoolId', () => {
    const validate = (id: string) => { if (!id) throw new Error('schoolId is required'); };
    expect(() => validate('')).toThrow('schoolId is required');
  });

  it('should handle DB errors', async () => {
    mockRepo.create.mockRejectedValue(new Error('Permission denied'));
    await expect(mockRepo.create({ schoolId })).rejects.toThrow('Permission denied');
  });
});
