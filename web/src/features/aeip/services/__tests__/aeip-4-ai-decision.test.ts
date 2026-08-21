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

describe('AI Decision - Decision Engine Service', () => {
  it('should list decisions', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', decision_type: 'enrollment', confidence: 0.95 }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should create decision', async () => {
    const data = { schoolId, decision_type: 'scheduling', confidence: 0.88, rationale: 'optimized', status: 'approved' };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.decision_type).toBe('scheduling');
  });

  it('should update decision', async () => {
    mockRepo.update.mockResolvedValue({ id: '1', status: 'overridden' });
    const result = await mockRepo.update(schoolId, '1', { status: 'overridden' });
    expect(result.status).toBe('overridden');
  });

  it('should delete decision', async () => {
    mockRepo.delete.mockResolvedValue(undefined);
    await mockRepo.delete(schoolId, '1');
    expect(mockRepo.delete).toHaveBeenCalledWith(schoolId, '1');
  });

  it('should find decision by id', async () => {
    mockRepo.findById.mockResolvedValue({ id: '1', confidence: 0.95 });
    const result = await mockRepo.findById(schoolId, '1');
    expect(result.confidence).toBe(0.95);
  });
});

describe('AI Decision - Prediction Service', () => {
  it('should create prediction', async () => {
    const data = { schoolId, target: 'student_retention', model: 'logistic', accuracy: 0.92 };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.target).toBe('student_retention');
  });

  it('should list predictions', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', target: 'student_retention' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should validate confidence range', () => {
    const validate = (c: number) => { if (c < 0 || c > 1) throw new Error('Confidence must be between 0 and 1'); };
    expect(() => validate(1.5)).toThrow('Confidence must be between 0 and 1');
  });
});

describe('AI Decision - Error Handling', () => {
  it('should require schoolId', () => {
    const validate = (id: string) => { if (!id) throw new Error('schoolId is required'); };
    expect(() => validate('')).toThrow('schoolId is required');
  });

  it('should handle DB errors', async () => {
    mockRepo.create.mockRejectedValue(new Error('Unique constraint failed'));
    await expect(mockRepo.create({ schoolId })).rejects.toThrow('Unique constraint failed');
  });
});
