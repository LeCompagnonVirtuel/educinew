import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createKnowledgeEntitySchema,
  updateKnowledgeEntitySchema,
  createKnowledgeRelationSchema,
  updateKnowledgeRelationSchema,
  createGraphSnapshotSchema,
  updateGraphSnapshotSchema,
} from '../validators/gedkin';
import type {
  GedkinKnowledgeEntity,
  GedkinKnowledgeRelation,
  GedkinGraphSnapshot,
} from '@educi/types';
import type {
  GedkinKnowledgeEntityRepository,
  GedkinKnowledgeRelationRepository,
  GedkinGraphSnapshotRepository,
} from '../repositories/knowledge-graph-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Knowledge Graph Service
// ============================================================================

export class KnowledgeGraphService extends BaseGedkinService {
  constructor(
    private readonly entityRepo: GedkinKnowledgeEntityRepository,
    private readonly relationRepo: GedkinKnowledgeRelationRepository,
    private readonly snapshotRepo: GedkinGraphSnapshotRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  // ─── Entities ────────────────────────────────────────────────────────────

  async listEntities(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinKnowledgeEntity>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.entityRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getEntity(schoolId: string, id: string): Promise<GedkinKnowledgeEntity> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Entité de connaissance');
    return this.ensureExists(this.entityRepo, id, schoolId, 'Entité de connaissance');
  }

  async createEntity(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinKnowledgeEntity> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['entityType', 'name', 'description', 'properties', 'embeddings'], 'Entité de connaissance');

    const validated = this.validateSchema(createKnowledgeEntitySchema, data, 'Entité de connaissance');

    return this.entityRepo.create(
      {
        entityType: validated.entityType,
        name: validated.name,
        description: validated.description,
        properties: validated.properties,
        embeddings: validated.embeddings,
      },
      schoolId,
    );
  }

  async updateEntity(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinKnowledgeEntity> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Entité de connaissance');

    const existing = await this.ensureExists(this.entityRepo, id, schoolId, 'Entité de connaissance');
    this.validateOwnership(existing, schoolId, 'Entité de connaissance');

    const validated = this.validateSchema(updateKnowledgeEntitySchema, data, 'Entité de connaissance');
    return this.entityRepo.update(id, schoolId, validated);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Entité de connaissance');

    const existing = await this.ensureExists(this.entityRepo, id, schoolId, 'Entité de connaissance');
    this.validateOwnership(existing, schoolId, 'Entité de connaissance');

    await this.entityRepo.softDelete(id, schoolId);
  }

  async listByEntityType(
    schoolId: string,
    entityType: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinKnowledgeEntity>> {
    this.validateSchoolId(schoolId);
    return this.entityRepo.findByEntityType(entityType, schoolId, this.validatePagination(params));
  }

  // ─── Relations ───────────────────────────────────────────────────────────

  async listRelations(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinKnowledgeRelation>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.relationRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getRelation(schoolId: string, id: string): Promise<GedkinKnowledgeRelation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Relation de connaissance');
    return this.ensureExists(this.relationRepo, id, schoolId, 'Relation de connaissance');
  }

  async createRelation(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinKnowledgeRelation> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['sourceEntityId', 'targetEntityId', 'relationType', 'weight', 'properties'], 'Relation de connaissance');

    const validated = this.validateSchema(createKnowledgeRelationSchema, data, 'Relation de connaissance');
    this.validateRange(validated.weight, 0, 1, 'weight', 'Relation de connaissance');

    return this.relationRepo.create(
      {
        sourceEntityId: validated.sourceEntityId,
        targetEntityId: validated.targetEntityId,
        relationType: validated.relationType,
        weight: validated.weight,
        properties: validated.properties,
      },
      schoolId,
    );
  }

  async updateRelation(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinKnowledgeRelation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Relation de connaissance');

    const existing = await this.ensureExists(this.relationRepo, id, schoolId, 'Relation de connaissance');
    this.validateOwnership(existing, schoolId, 'Relation de connaissance');

    const validated = this.validateSchema(updateKnowledgeRelationSchema, data, 'Relation de connaissance');
    return this.relationRepo.update(id, schoolId, validated);
  }

  async deleteRelation(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Relation de connaissance');

    const existing = await this.ensureExists(this.relationRepo, id, schoolId, 'Relation de connaissance');
    this.validateOwnership(existing, schoolId, 'Relation de connaissance');

    await this.relationRepo.softDelete(id, schoolId);
  }

  async listByEntity(
    schoolId: string,
    entityId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinKnowledgeRelation>> {
    this.validateSchoolId(schoolId);
    return this.relationRepo.findByEntityId(entityId, schoolId, this.validatePagination(params));
  }

  // ─── Snapshots ───────────────────────────────────────────────────────────

  async listSnapshots(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinGraphSnapshot>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.snapshotRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getSnapshot(schoolId: string, id: string): Promise<GedkinGraphSnapshot> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Snapshot du graphe');
    return this.ensureExists(this.snapshotRepo, id, schoolId, 'Snapshot du graphe');
  }

  async createSnapshot(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinGraphSnapshot> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'entityCount', 'relationCount'], 'Snapshot du graphe');

    const validated = this.validateSchema(createGraphSnapshotSchema, data, 'Snapshot du graphe');

    return this.snapshotRepo.create(
      {
        name: validated.name,
        entityCount: validated.entityCount,
        relationCount: validated.relationCount,
      },
      schoolId,
    );
  }

  async deleteSnapshot(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Snapshot du graphe');

    const existing = await this.ensureExists(this.snapshotRepo, id, schoolId, 'Snapshot du graphe');
    this.validateOwnership(existing, schoolId, 'Snapshot du graphe');

    await this.snapshotRepo.softDelete(id, schoolId);
  }

  // ─── Graph Traversal ────────────────────────────────────────────────────

  async getNeighbors(
    schoolId: string,
    entityId: string,
    depth: number = 1,
  ): Promise<{ entities: GedkinKnowledgeEntity[]; relations: GedkinKnowledgeRelation[] }> {
    this.validateSchoolId(schoolId);
    this.validateId(entityId, 'Entité');
    this.validateRange(depth, 1, 5, 'depth', 'Parcours du graphe');

    const entities = new Map<string, GedkinKnowledgeEntity>();
    const relations = new Map<string, GedkinKnowledgeRelation>();

    const queue = [{ id: entityId, currentDepth: 0 }];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const { id, currentDepth } = queue.shift()!;
      if (visited.has(id) || currentDepth > depth) continue;
      visited.add(id);

      const entity = await this.entityRepo.findById(id, schoolId);
      entities.set(entity.id, entity);

      if (currentDepth < depth) {
        const relatedRelations = await this.relationRepo.findByEntityId(id, schoolId);
        for (const relation of relatedRelations.data) {
          relations.set(relation.id, relation);
          const neighborId = relation.sourceEntityId === id ? relation.targetEntityId : relation.sourceEntityId;
          if (!visited.has(neighborId)) {
            queue.push({ id: neighborId, currentDepth: currentDepth + 1 });
          }
        }
      }
    }

    return {
      entities: Array.from(entities.values()),
      relations: Array.from(relations.values()),
    };
  }

  async getGraphStats(
    schoolId: string,
  ): Promise<{
    totalEntities: number;
    totalRelations: number;
    byEntityType: Record<string, number>;
    byRelationType: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);

    const entities = await this.entityRepo.findAll(schoolId, { limit: 1000 });
    const relations = await this.relationRepo.findAll(schoolId, { limit: 1000 });

    const byEntityType: Record<string, number> = {};
    for (const entity of entities.data) {
      byEntityType[entity.entityType] = (byEntityType[entity.entityType] ?? 0) + 1;
    }

    const byRelationType: Record<string, number> = {};
    for (const relation of relations.data) {
      byRelationType[relation.relationType] = (byRelationType[relation.relationType] ?? 0) + 1;
    }

    return {
      totalEntities: entities.total,
      totalRelations: relations.total,
      byEntityType,
      byRelationType,
    };
  }
}