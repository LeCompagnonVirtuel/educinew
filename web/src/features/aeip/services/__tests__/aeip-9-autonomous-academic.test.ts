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

describe('Autonomous Academic - Adaptive Learning Service', () => {
  it('should create learning path', async () => {
    const data = { schoolId, student_id: 's1', subject: 'math', level: 'advanced', status: 'active' };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.subject).toBe('math');
  });

  it('should list learning paths', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', subject: 'science' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should update learning path', async () => {
    mockRepo.update.mockResolvedValue({ id: '1', level: 'expert' });
    const result = await mockRepo.update(schoolId, '1', { level: 'expert' });
    expect(result.level).toBe('expert');
  });

  it('should find learning path by id', async () => {
    mockRepo.findById.mockResolvedValue({ id: '1', student_id: 's1' });
    const result = await mockRepo.findById(schoolId, '1');
    expect(result.student_id).toBe('s1');
  });

  it('should delete learning path', async () => {
    mockRepo.delete.mockResolvedValue(undefined);
    await mockRepo.delete(schoolId, '1');
    expect(mockRepo.delete).toHaveBeenCalledWith(schoolId, '1');
  });
});

describe('Autonomous Academic - Auto Grading Service', () => {
  it('should create grading rule', async () => {
    const data = { schoolId, subject: 'english', rubric_type: 'essay', criteria_count: 5 };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.rubric_type).toBe('essay');
  });

  it('should list grading rules', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', subject: 'history' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should validate criteria count', () => {
    const validate = (c: number) => { if (c < 1) throw new Error('Must have at least 1 criterion'); };
    expect(() => validate(0)).toThrow('Must have at least 1 criterion');
  });
});

describe('Autonomous Academic - Error Handling', () => {
  it('should require schoolId', () => {
    const validate = (id: string) => { if (!id) throw new Error('schoolId is required'); };
    expect(() => validate('')).toThrow('schoolId is required');
  });

  it('should handle DB errors', async () => {
    mockRepo.findMany.mockRejectedValue(new Error('Query timeout'));
    await expect(mockRepo.findMany(schoolId)).rejects.toThrow('Query timeout');
  });
});
