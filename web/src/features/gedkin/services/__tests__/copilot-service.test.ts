import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CopilotService } from '../copilot-service';

const mockQueryRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByUserId: vi.fn(),
  findByQueryType: vi.fn(),
};

const mockResponseRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByQueryId: vi.fn(),
};

const mockConversationRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByUserId: vi.fn(),
};

const mockSourceRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByType: vi.fn(),
};

const mockApprovalRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByQueryId: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const QUERY_ID = '660e8400-e29b-41d4-a716-446655440001';
const RESPONSE_ID = '770e8400-e29b-41d4-a716-446655440002';

const mockQuery = {
  id: QUERY_ID,
  school_id: SCHOOL_ID,
  userId: 'aa0e8400-e29b-41d4-a716-446655440010',
  query: 'What is the enrollment rate?',
  queryType: 'NATURAL_LANGUAGE',
  language: 'FR',
  status: 'COMPLETED',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockResponse = {
  id: RESPONSE_ID,
  school_id: SCHOOL_ID,
  queryId: QUERY_ID,
  answer: 'The enrollment rate is 85.5%.',
  responseTypes: ['TEXT'],
  sources: [],
  citations: [],
  confidence: 0.92,
  provenance: { source: 'database' },
  processingTime: 150,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: CopilotService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new CopilotService(
    mockQueryRepo as never,
    mockResponseRepo as never,
    mockConversationRepo as never,
    mockSourceRepo as never,
    mockApprovalRepo as never,
  );
});

describe('CopilotService', () => {
  describe('listQueries', () => {
    it('should list queries for a school', async () => {
      mockQueryRepo.findAll.mockResolvedValue({ data: [mockQuery], total: 1, offset: 0, limit: 50 });

      const result = await service.listQueries(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listQueries('')).rejects.toThrow();
    });
  });

  describe('getQuery', () => {
    it('should retrieve a query by id', async () => {
      mockQueryRepo.exists.mockResolvedValue(true);
      mockQueryRepo.findById.mockResolvedValue(mockQuery);

      const result = await service.getQuery(SCHOOL_ID, QUERY_ID);

      expect(result).toEqual(mockQuery);
    });

    it('should throw if query not found', async () => {
      mockQueryRepo.exists.mockResolvedValue(false);

      await expect(service.getQuery(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createQuery', () => {
    it('should create a query successfully', async () => {
      mockQueryRepo.create.mockResolvedValue(mockQuery);

      const result = await service.createQuery(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        userId: 'aa0e8400-e29b-41d4-a716-446655440010',
        query: 'What is the enrollment rate?',
        queryType: 'NATURAL_LANGUAGE',
        language: 'FR',
        status: 'COMPLETED',
      });

      expect(result).toEqual(mockQuery);
    });
  });

  describe('deleteQuery', () => {
    it('should soft delete a query', async () => {
      mockQueryRepo.exists.mockResolvedValue(true);
      mockQueryRepo.findById.mockResolvedValue(mockQuery);
      mockQueryRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteQuery(SCHOOL_ID, QUERY_ID);

      expect(mockQueryRepo.softDelete).toHaveBeenCalledWith(QUERY_ID, SCHOOL_ID);
    });
  });

  describe('listByUser', () => {
    it('should list queries by user', async () => {
      mockQueryRepo.findByUserId.mockResolvedValue({ data: [mockQuery], total: 1, offset: 0, limit: 50 });

      const result = await service.listByUser(SCHOOL_ID, 'user-123');

      expect(result.data).toHaveLength(1);
    });
  });

  describe('createResponse', () => {
    it('should create a response successfully', async () => {
      mockResponseRepo.create.mockResolvedValue(mockResponse);

      const result = await service.createResponse(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        queryId: QUERY_ID,
        answer: 'The enrollment rate is 85.5%.',
        responseTypes: ['TEXT'],
        sources: [],
        citations: [],
        confidence: 0.92,
        provenance: { source: 'database' },
        processingTime: 150,
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe('listByQuery', () => {
    it('should list responses by query', async () => {
      mockResponseRepo.findByQueryId.mockResolvedValue({ data: [mockResponse], total: 1, offset: 0, limit: 50 });

      const result = await service.listByQuery(SCHOOL_ID, QUERY_ID);

      expect(result.data).toHaveLength(1);
    });
  });

  describe('createConversation', () => {
    it('should create a conversation successfully', async () => {
      const mockConversation = {
        id: 'conv-id',
        school_id: SCHOOL_ID,
        userId: 'user-123',
        queries: [QUERY_ID],
        title: 'Enrollment Discussion',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      mockConversationRepo.create.mockResolvedValue(mockConversation);

      const result = await service.createConversation(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        userId: 'aa0e8400-e29b-41d4-a716-446655440010',
        queries: [QUERY_ID],
        title: 'Enrollment Discussion',
      });

      expect(result.title).toBe('Enrollment Discussion');
    });
  });

  describe('createSource', () => {
    it('should create a source successfully', async () => {
      const mockSource = {
        id: 'source-id',
        school_id: SCHOOL_ID,
        type: 'DATABASE',
        entityId: 'entity-1',
        entityName: 'Student Table',
        relevance: 0.95,
        excerpt: 'Enrollment data...',
        url: 'https://example.com/data',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      mockSourceRepo.create.mockResolvedValue(mockSource);

      const result = await service.createSource(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        type: 'DATABASE',
        entityId: 'bb0e8400-e29b-41d4-a716-446655440011',
        entityName: 'Student Table',
        relevance: 0.95,
        excerpt: 'Enrollment data...',
        url: 'https://example.com/data',
      });

      expect(result.entityName).toBe('Student Table');
    });
  });

  describe('createApproval', () => {
    it('should create an approval successfully', async () => {
      const mockApproval = {
        id: 'approval-id',
        school_id: SCHOOL_ID,
        queryId: QUERY_ID,
        responseId: RESPONSE_ID,
        approvedBy: 'admin-123',
        status: 'APPROVED',
        reason: 'Accurate data',
        timestamp: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      mockApprovalRepo.create.mockResolvedValue(mockApproval);

      const result = await service.createApproval(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        queryId: QUERY_ID,
        responseId: RESPONSE_ID,
        approvedBy: 'cc0e8400-e29b-41d4-a716-446655440012',
        status: 'APPROVED',
        reason: 'Accurate data',
      });

      expect(result.status).toBe('APPROVED');
    });
  });

  describe('getCopilotStats', () => {
    it('should return copilot statistics', async () => {
      mockQueryRepo.findAll.mockResolvedValue({ data: [mockQuery], total: 1, offset: 0, limit: 1000 });
      mockResponseRepo.findAll.mockResolvedValue({ data: [mockResponse], total: 1, offset: 0, limit: 1000 });
      mockConversationRepo.findAll.mockResolvedValue({ data: [], total: 0, offset: 0, limit: 1000 });
      mockApprovalRepo.findAll.mockResolvedValue({ data: [], total: 0, offset: 0, limit: 1000 });

      const result = await service.getCopilotStats(SCHOOL_ID);

      expect(result.totalQueries).toBe(1);
      expect(result.totalResponses).toBe(1);
      expect(result.byQueryType['NATURAL_LANGUAGE']).toBe(1);
      expect(result.averageConfidence).toBe(0.92);
    });
  });
});
