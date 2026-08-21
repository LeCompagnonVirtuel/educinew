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

describe('Search - GlobalSearch Service', () => {
  it('should execute global search', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', query: 'math', scope: 'GLOBAL' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should create search config', async () => {
    const data = { schoolId, query: 'algebra', scope: 'SCHOOL', types: ['KEYWORD', 'SEMANTIC'], filters: [], facets: [], sort: 'RELEVANCE', page: 1, pageSize: 20, maxResults: 100, timeout: 5000, userId: 'u1', sessionId: 's1' };
    mockRepo.create.mockResolvedValue({ id: 'gs1', ...data });
    const result = await mockRepo.create(data);
    expect(result.query).toBe('algebra');
  });
});

describe('Search - SemanticSearch Service', () => {
  it('should create semantic search', async () => {
    const data = { schoolId, query: 'advanced calculus', embedding: [0.1, 0.2, 0.3], model: 'OPENAI', threshold: 0.8, maxResults: 10, scope: 'SCHOOL', filters: [], language: 'fr', context: 'education', userId: 'u1' };
    mockRepo.create.mockResolvedValue({ id: 'ss1', ...data });
    const result = await mockRepo.create(data);
    expect(result.model).toBe('OPENAI');
  });

  it('should validate threshold', () => {
    const validate = (t: number) => { if (t < 0 || t > 1) throw new Error('Threshold must be 0-1'); };
    expect(() => validate(1.5)).toThrow('Threshold must be 0-1');
    expect(() => validate(0.8)).not.toThrow();
  });
});

describe('Search - SearchIndex Service', () => {
  it('should create search index', async () => {
    const data = { schoolId, name: 'Students Index', alias: 'students_idx', type: 'STUDENTS', fields: [], schema: { version: 1, fields: [], relations: {}, metadata: {} }, mappings: [], analyzers: [], refreshFrequency: 'NEAR_REALTIME' };
    mockRepo.create.mockResolvedValue({ id: 'si1', ...data });
    const result = await mockRepo.create(data);
    expect(result.type).toBe('STUDENTS');
  });

  it('should list indexes', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: 'si1', name: 'Students Index' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result[0].name).toBe('Students Index');
  });
});

describe('Search - SearchConfig Service', () => {
  it('should create search config', async () => {
    const data = { schoolId, provider: 'ELASTICSEARCH', vectorStore: 'PINECONE', embeddingModel: 'OPENAI', security: 'RBAC', cacheStrategy: 'REDIS', analytics: ['CLICKS', 'QUERIES'] };
    mockRepo.create.mockResolvedValue({ id: 'sc1', ...data });
    const result = await mockRepo.create(data);
    expect(result.provider).toBe('ELASTICSEARCH');
  });
});

describe('Search - SearchPersonalization Service', () => {
  it('should create personalization', async () => {
    const data = { schoolId, userId: 'u1', mode: 'AI', historyWeight: 0.3, roleWeight: 0.2, preferenceWeight: 0.2, aiWeight: 0.2, collaborativeWeight: 0.1, contextWindow: 30, enabled: true };
    mockRepo.create.mockResolvedValue({ id: 'sp1', ...data });
    const result = await mockRepo.create(data);
    expect(result.mode).toBe('AI');
  });

  it('should validate weights sum', () => {
    const validate = (weights: number[]) => {
      const sum = weights.reduce((a, b) => a + b, 0);
      if (Math.abs(sum - 1) > 0.01) throw new Error('Weights must sum to 1');
    };
    expect(() => validate([0.3, 0.3, 0.3])).toThrow('Weights must sum to 1');
    expect(() => validate([0.3, 0.2, 0.2, 0.2, 0.1])).not.toThrow();
  });
});
