import { describe, it, expect, vi, beforeEach } from 'vitest';
import { KnowledgeGraphService } from '../knowledge-graph-service';

const mockEntityRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByEntityType: vi.fn(),
};

const mockRelationRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByEntityId: vi.fn(),
};

const mockSnapshotRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const ENTITY_ID = '660e8400-e29b-41d4-a716-446655440001';
const ENTITY_ID_2 = '770e8400-e29b-41d4-a716-446655440002';
const RELATION_ID = '880e8400-e29b-41d4-a716-446655440003';
const SNAPSHOT_ID = '990e8400-e29b-41d4-a716-446655440004';

const mockEntity = {
  id: ENTITY_ID,
  school_id: SCHOOL_ID,
  entityType: 'STUDENT',
  name: 'John Doe',
  description: 'A student entity',
  properties: { grade: 'A' },
  embeddings: [0.1, 0.2, 0.3],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockRelation = {
  id: RELATION_ID,
  school_id: SCHOOL_ID,
  sourceEntityId: ENTITY_ID,
  targetEntityId: ENTITY_ID_2,
  relationType: 'STUDIES',
  weight: 0.8,
  properties: {},
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockSnapshot = {
  id: SNAPSHOT_ID,
  school_id: SCHOOL_ID,
  name: 'Graph Snapshot 1',
  entityCount: 100,
  relationCount: 250,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: KnowledgeGraphService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new KnowledgeGraphService(
    mockEntityRepo as never,
    mockRelationRepo as never,
    mockSnapshotRepo as never,
  );
});

describe('KnowledgeGraphService', () => {
  describe('listEntities', () => {
    it('should list entities for a school', async () => {
      mockEntityRepo.findAll.mockResolvedValue({ data: [mockEntity], total: 1, offset: 0, limit: 50 });

      const result = await service.listEntities(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listEntities('')).rejects.toThrow();
    });
  });

  describe('getEntity', () => {
    it('should retrieve an entity by id', async () => {
      mockEntityRepo.exists.mockResolvedValue(true);
      mockEntityRepo.findById.mockResolvedValue(mockEntity);

      const result = await service.getEntity(SCHOOL_ID, ENTITY_ID);

      expect(result).toEqual(mockEntity);
    });

    it('should throw if entity not found', async () => {
      mockEntityRepo.exists.mockResolvedValue(false);

      await expect(service.getEntity(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createEntity', () => {
    it('should create an entity successfully', async () => {
      mockEntityRepo.create.mockResolvedValue(mockEntity);

      const result = await service.createEntity(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        entityType: 'STUDENT',
        name: 'John Doe',
        description: 'A student entity',
        properties: { grade: 'A' },
        embeddings: [0.1, 0.2, 0.3],
      });

      expect(result).toEqual(mockEntity);
    });
  });

  describe('updateEntity', () => {
    it('should update an entity successfully', async () => {
      mockEntityRepo.exists.mockResolvedValue(true);
      mockEntityRepo.findById.mockResolvedValue(mockEntity);
      mockEntityRepo.update.mockResolvedValue({ ...mockEntity, name: 'Jane Doe' });

      const result = await service.updateEntity(SCHOOL_ID, ENTITY_ID, {
        name: 'Jane Doe',
      });

      expect(result.name).toBe('Jane Doe');
    });

    it('should throw if entity not found on update', async () => {
      mockEntityRepo.exists.mockResolvedValue(false);

      await expect(service.updateEntity(SCHOOL_ID, 'nonexistent', { name: 'X' })).rejects.toThrow();
    });
  });

  describe('deleteEntity', () => {
    it('should soft delete an entity', async () => {
      mockEntityRepo.exists.mockResolvedValue(true);
      mockEntityRepo.findById.mockResolvedValue(mockEntity);
      mockEntityRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteEntity(SCHOOL_ID, ENTITY_ID);

      expect(mockEntityRepo.softDelete).toHaveBeenCalledWith(ENTITY_ID, SCHOOL_ID);
    });
  });

  describe('listByEntityType', () => {
    it('should list entities by type', async () => {
      mockEntityRepo.findByEntityType.mockResolvedValue({ data: [mockEntity], total: 1, offset: 0, limit: 50 });

      const result = await service.listByEntityType(SCHOOL_ID, 'STUDENT');

      expect(result.data).toHaveLength(1);
    });
  });

  describe('createRelation', () => {
    it('should create a relation successfully', async () => {
      mockRelationRepo.create.mockResolvedValue(mockRelation);

      const result = await service.createRelation(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        sourceEntityId: ENTITY_ID,
        targetEntityId: ENTITY_ID_2,
        relationType: 'STUDIES',
        weight: 0.8,
        properties: {},
      });

      expect(result).toEqual(mockRelation);
    });
  });

  describe('listByEntity', () => {
    it('should list relations by entity', async () => {
      mockRelationRepo.findByEntityId.mockResolvedValue({ data: [mockRelation], total: 1, offset: 0, limit: 50 });

      const result = await service.listByEntity(SCHOOL_ID, ENTITY_ID);

      expect(result.data).toHaveLength(1);
    });
  });

  describe('createSnapshot', () => {
    it('should create a snapshot successfully', async () => {
      mockSnapshotRepo.create.mockResolvedValue(mockSnapshot);

      const result = await service.createSnapshot(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'Graph Snapshot 1',
        entityCount: 100,
        relationCount: 250,
      });

      expect(result).toEqual(mockSnapshot);
    });
  });

  describe('getGraphStats', () => {
    it('should return graph statistics', async () => {
      mockEntityRepo.findAll.mockResolvedValue({ data: [mockEntity], total: 1, offset: 0, limit: 1000 });
      mockRelationRepo.findAll.mockResolvedValue({ data: [mockRelation], total: 1, offset: 0, limit: 1000 });

      const result = await service.getGraphStats(SCHOOL_ID);

      expect(result.totalEntities).toBe(1);
      expect(result.totalRelations).toBe(1);
      expect(result.byEntityType['STUDENT']).toBe(1);
      expect(result.byRelationType['STUDIES']).toBe(1);
    });
  });
});
