import { ValidationError, NotFoundError } from '@educi/errors';
import type {
  GeaesipIntelligenceCore,
  GeaesipKnowledgeFusion,
  GeaesipCrossDomainSignal,
  GeaesipCausalRelationship,
  GeaesipSystemHealthScore,
} from '@educi/types';
import {
  GeaesipIntelligenceCoreRepository,
  GeaesipKnowledgeFusionRepository,
  GeaesipCrossDomainSignalRepository,
  GeaesipCausalRelationshipRepository,
  GeaesipSystemHealthScoreRepository,
} from '../repositories/intelligence-core.repository';

// ============================================================================
// Intelligence Core Service
// ============================================================================

export class GeaesipIntelligenceCoreService {
  constructor(
    private readonly coreRepo = new GeaesipIntelligenceCoreRepository(),
    private readonly fusionRepo = new GeaesipKnowledgeFusionRepository(),
    private readonly signalRepo = new GeaesipCrossDomainSignalRepository(),
    private readonly causalRepo = new GeaesipCausalRelationshipRepository(),
    private readonly healthRepo = new GeaesipSystemHealthScoreRepository(),
  ) {}

  private validateSchoolId(schoolId: string): void {
    if (!schoolId || typeof schoolId !== 'string' || schoolId.trim().length === 0) {
      throw new ValidationError('school_id est requis');
    }
  }

  private validateId(id: string, entityName: string): void {
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      throw new ValidationError(`${entityName} id est requis`);
    }
  }

  // ─── Intelligence Core ────────────────────────────────────────────────────

  async listIntelligences(schoolId: string): Promise<GeaesipIntelligenceCore[]> {
    this.validateSchoolId(schoolId);
    return this.coreRepo.findAllBySchool(schoolId);
  }

  async getIntelligence(schoolId: string, id: string): Promise<GeaesipIntelligenceCore> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Intelligence');
    const entity = await this.coreRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Intelligence', id);
    }
    return entity;
  }

  async createIntelligence(
    schoolId: string,
    data: Omit<GeaesipIntelligenceCore, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<GeaesipIntelligenceCore> {
    this.validateSchoolId(schoolId);
    return this.coreRepo.create({ ...data, school_id: schoolId });
  }

  async updateIntelligence(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipIntelligenceCore, 'id' | 'createdAt'>>,
  ): Promise<GeaesipIntelligenceCore> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Intelligence');
    const existing = await this.getIntelligence(schoolId, id);
    if (existing.school_id !== schoolId) {
      throw new NotFoundError('Intelligence', id);
    }
    return this.coreRepo.update(id, data);
  }

  async deleteIntelligence(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Intelligence');
    await this.getIntelligence(schoolId, id);
    await this.coreRepo.delete(id);
  }

  // ─── Knowledge Fusion ─────────────────────────────────────────────────────

  async listFusions(schoolId: string): Promise<GeaesipKnowledgeFusion[]> {
    this.validateSchoolId(schoolId);
    return this.fusionRepo.findAllBySchool(schoolId);
  }

  async getFusion(schoolId: string, id: string): Promise<GeaesipKnowledgeFusion> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Fusion');
    const entity = await this.fusionRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Fusion', id);
    }
    return entity;
  }

  async createFusion(
    schoolId: string,
    data: Omit<GeaesipKnowledgeFusion, 'id' | 'timestamp'>,
  ): Promise<GeaesipKnowledgeFusion> {
    this.validateSchoolId(schoolId);
    return this.fusionRepo.create({ ...data, school_id: schoolId });
  }

  async updateFusion(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipKnowledgeFusion, 'id' | 'timestamp'>>,
  ): Promise<GeaesipKnowledgeFusion> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Fusion');
    await this.getFusion(schoolId, id);
    return this.fusionRepo.update(id, data);
  }

  async deleteFusion(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Fusion');
    await this.getFusion(schoolId, id);
    await this.fusionRepo.delete(id);
  }

  // ─── Cross-Domain Signals ─────────────────────────────────────────────────

  async listSignals(schoolId: string): Promise<GeaesipCrossDomainSignal[]> {
    this.validateSchoolId(schoolId);
    return this.signalRepo.findAllBySchool(schoolId);
  }

  async getSignal(schoolId: string, id: string): Promise<GeaesipCrossDomainSignal> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Signal');
    const entity = await this.signalRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Signal', id);
    }
    return entity;
  }

  async createSignal(
    schoolId: string,
    data: Omit<GeaesipCrossDomainSignal, 'id' | 'timestamp'>,
  ): Promise<GeaesipCrossDomainSignal> {
    this.validateSchoolId(schoolId);
    return this.signalRepo.create({ ...data, school_id: schoolId });
  }

  async updateSignal(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipCrossDomainSignal, 'id' | 'timestamp'>>,
  ): Promise<GeaesipCrossDomainSignal> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Signal');
    await this.getSignal(schoolId, id);
    return this.signalRepo.update(id, data);
  }

  async deleteSignal(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Signal');
    await this.getSignal(schoolId, id);
    await this.signalRepo.delete(id);
  }

  // ─── Causal Relationships ─────────────────────────────────────────────────

  async listCausalRelationships(schoolId: string): Promise<GeaesipCausalRelationship[]> {
    this.validateSchoolId(schoolId);
    return this.causalRepo.findAllBySchool(schoolId);
  }

  async getCausalRelationship(schoolId: string, id: string): Promise<GeaesipCausalRelationship> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Relation causale');
    const entity = await this.causalRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Relation causale', id);
    }
    return entity;
  }

  async createCausalRelationship(
    schoolId: string,
    data: Omit<GeaesipCausalRelationship, 'id' | 'discoveredAt'>,
  ): Promise<GeaesipCausalRelationship> {
    this.validateSchoolId(schoolId);
    return this.causalRepo.create({ ...data, school_id: schoolId });
  }

  async updateCausalRelationship(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipCausalRelationship, 'id' | 'discoveredAt'>>,
  ): Promise<GeaesipCausalRelationship> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Relation causale');
    await this.getCausalRelationship(schoolId, id);
    return this.causalRepo.update(id, data);
  }

  async deleteCausalRelationship(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Relation causale');
    await this.getCausalRelationship(schoolId, id);
    await this.causalRepo.delete(id);
  }

  // ─── System Health Scores ─────────────────────────────────────────────────

  async listHealthScores(schoolId: string): Promise<GeaesipSystemHealthScore[]> {
    this.validateSchoolId(schoolId);
    return this.healthRepo.findAllBySchool(schoolId);
  }

  async getHealthScore(schoolId: string, id: string): Promise<GeaesipSystemHealthScore> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Score de santé');
    const entity = await this.healthRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Score de santé', id);
    }
    return entity;
  }

  async createHealthScore(
    schoolId: string,
    data: Omit<GeaesipSystemHealthScore, 'id' | 'computedAt'>,
  ): Promise<GeaesipSystemHealthScore> {
    this.validateSchoolId(schoolId);
    return this.healthRepo.create({ ...data, school_id: schoolId });
  }

  async updateHealthScore(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipSystemHealthScore, 'id' | 'computedAt'>>,
  ): Promise<GeaesipSystemHealthScore> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Score de santé');
    await this.getHealthScore(schoolId, id);
    return this.healthRepo.update(id, data);
  }

  async deleteHealthScore(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Score de santé');
    await this.getHealthScore(schoolId, id);
    await this.healthRepo.delete(id);
  }

  // ─── Stats ────────────────────────────────────────────────────────────────

  async getIntelligenceCoreStats(schoolId: string) {
    this.validateSchoolId(schoolId);

    const intelligences = await this.coreRepo.findAllBySchool(schoolId);
    const fusions = await this.fusionRepo.findAllBySchool(schoolId);
    const signals = await this.signalRepo.findAllBySchool(schoolId);
    const causals = await this.causalRepo.findAllBySchool(schoolId);
    const healthScores = await this.healthRepo.findAllBySchool(schoolId);

    return {
      totalIntelligences: intelligences.length,
      totalFusions: fusions.length,
      totalSignals: signals.length,
      totalCausalRelationships: causals.length,
      totalHealthScores: healthScores.length,
    };
  }
}
