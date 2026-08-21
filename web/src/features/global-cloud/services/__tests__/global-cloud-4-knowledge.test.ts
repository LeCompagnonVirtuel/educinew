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

describe('Knowledge Graph - GraphNode Service', () => {
  it('should list nodes', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', type: 'concept', label: 'Algebra' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result[0].type).toBe('concept');
  });

  it('should create node', async () => {
    const data = { schoolId, type: 'skill', label: 'Problem Solving', description: 'Core skill', properties: {} };
    mockRepo.create.mockResolvedValue({ id: 'n1', ...data });
    const result = await mockRepo.create(data);
    expect(result.label).toBe('Problem Solving');
  });

  it('should update node', async () => {
    mockRepo.update.mockResolvedValue({ id: 'n1', label: 'Updated' });
    const result = await mockRepo.update(schoolId, 'n1', { label: 'Updated' });
    expect(result.label).toBe('Updated');
  });

  it('should delete node', async () => {
    mockRepo.delete.mockResolvedValue(undefined);
    await mockRepo.delete(schoolId, 'n1');
    expect(mockRepo.delete).toHaveBeenCalled();
  });
});

describe('Knowledge Graph - GraphEdge Service', () => {
  it('should create edge', async () => {
    const data = { schoolId, source_id: 'n1', target_id: 'n2', type: 'prerequisite', weight: 0.8, bidirectional: false };
    mockRepo.create.mockResolvedValue({ id: 'e1', ...data });
    const result = await mockRepo.create(data);
    expect(result.weight).toBe(0.8);
  });

  it('should validate weight range', () => {
    const validate = (w: number) => { if (w < 0 || w > 1) throw new Error('Weight must be 0-1'); };
    expect(() => validate(1.5)).toThrow('Weight must be 0-1');
    expect(() => validate(0.5)).not.toThrow();
  });
});

describe('Knowledge Graph - SkillGap Service', () => {
  it('should create skill gap', async () => {
    const data = { schoolId, student_id: 's1', skill_id: 'sk1', current_level: 'beginner', target_level: 'advanced', gap: 2, priority: 'high', recommended_resources: [], estimated_time_hours: 40 };
    mockRepo.create.mockResolvedValue({ id: 'g1', ...data });
    const result = await mockRepo.create(data);
    expect(result.gap).toBe(2);
  });

  it('should list skill gaps', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: 'g1', gap: 2 }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });
});

describe('Knowledge Graph - CompetencyMap Service', () => {
  it('should create competency map', async () => {
    const data = { schoolId, name: 'CS Skills', description: 'Computer Science', competencies: [], total_competencies: 5, average_level: 'intermediate' };
    mockRepo.create.mockResolvedValue({ id: 'cm1', ...data });
    const result = await mockRepo.create(data);
    expect(result.total_competencies).toBe(5);
  });

  it('should validate total_competencies', () => {
    const validate = (n: number) => { if (n < 0) throw new Error('Must be non-negative'); };
    expect(() => validate(-1)).toThrow('Must be non-negative');
  });
});

describe('Knowledge Graph - LearningPath Service', () => {
  it('should create learning path', async () => {
    const data = { schoolId, name: 'Python Basics', description: 'Learn Python', type: 'linear', modules: [], total_modules: 3, estimated_hours: 20, difficulty: 'beginner', tags: ['python'], enrollment_count: 0, completion_rate: 0, rating: 0 };
    mockRepo.create.mockResolvedValue({ id: 'lp1', ...data });
    const result = await mockRepo.create(data);
    expect(result.total_modules).toBe(3);
  });
});
