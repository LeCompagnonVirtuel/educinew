import { ValidationError, NotFoundError } from '@educi/errors';
import type {
  GeaesipCrossDomainEvent,
  GeaesipCorrelation,
  GeaesipImpactChain,
  GeaesipSystemicRisk,
  GeaesipDependencyGraph,
} from '@educi/types';
import {
  GeaesipCrossDomainEventRepository,
  GeaesipCorrelationRepository,
  GeaesipImpactChainRepository,
  GeaesipSystemicRiskRepository,
  GeaesipDependencyGraphRepository,
} from '../repositories/cross-domain.repository';

// ============================================================================
// Cross-Domain Service
// ============================================================================

export class GeaesipCrossDomainService {
  constructor(
    private readonly eventRepo = new GeaesipCrossDomainEventRepository(),
    private readonly correlationRepo = new GeaesipCorrelationRepository(),
    private readonly impactChainRepo = new GeaesipImpactChainRepository(),
    private readonly systemicRiskRepo = new GeaesipSystemicRiskRepository(),
    private readonly dependencyRepo = new GeaesipDependencyGraphRepository(),
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

  // ─── Cross-Domain Events ──────────────────────────────────────────────────

  async listEvents(schoolId: string): Promise<GeaesipCrossDomainEvent[]> {
    this.validateSchoolId(schoolId);
    return this.eventRepo.findAllBySchool(schoolId);
  }

  async getEvent(schoolId: string, id: string): Promise<GeaesipCrossDomainEvent> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Événement');
    const entity = await this.eventRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Événement', id);
    }
    return entity;
  }

  async createEvent(
    schoolId: string,
    data: Omit<GeaesipCrossDomainEvent, 'id' | 'timestamp'>,
  ): Promise<GeaesipCrossDomainEvent> {
    this.validateSchoolId(schoolId);
    return this.eventRepo.create({ ...data, school_id: schoolId });
  }

  async updateEvent(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipCrossDomainEvent, 'id' | 'timestamp'>>,
  ): Promise<GeaesipCrossDomainEvent> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Événement');
    await this.getEvent(schoolId, id);
    return this.eventRepo.update(id, data);
  }

  async deleteEvent(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Événement');
    await this.getEvent(schoolId, id);
    await this.eventRepo.delete(id);
  }

  // ─── Correlations ─────────────────────────────────────────────────────────

  async listCorrelations(schoolId: string): Promise<GeaesipCorrelation[]> {
    this.validateSchoolId(schoolId);
    return this.correlationRepo.findAllBySchool(schoolId);
  }

  async getCorrelation(schoolId: string, id: string): Promise<GeaesipCorrelation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Corrélation');
    const entity = await this.correlationRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Corrélation', id);
    }
    return entity;
  }

  async createCorrelation(
    schoolId: string,
    data: Omit<GeaesipCorrelation, 'id' | 'discoveredAt'>,
  ): Promise<GeaesipCorrelation> {
    this.validateSchoolId(schoolId);
    return this.correlationRepo.create({ ...data, school_id: schoolId });
  }

  async updateCorrelation(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipCorrelation, 'id' | 'discoveredAt'>>,
  ): Promise<GeaesipCorrelation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Corrélation');
    await this.getCorrelation(schoolId, id);
    return this.correlationRepo.update(id, data);
  }

  async deleteCorrelation(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Corrélation');
    await this.getCorrelation(schoolId, id);
    await this.correlationRepo.delete(id);
  }

  // ─── Impact Chains ────────────────────────────────────────────────────────

  async listImpactChains(schoolId: string): Promise<GeaesipImpactChain[]> {
    this.validateSchoolId(schoolId);
    return this.impactChainRepo.findAllBySchool(schoolId);
  }

  async getImpactChain(schoolId: string, id: string): Promise<GeaesipImpactChain> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Chaîne d\'impact');
    const entity = await this.impactChainRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Chaîne d\'impact', id);
    }
    return entity;
  }

  async createImpactChain(
    schoolId: string,
    data: Omit<GeaesipImpactChain, 'id' | 'detectedAt'>,
  ): Promise<GeaesipImpactChain> {
    this.validateSchoolId(schoolId);
    return this.impactChainRepo.create({ ...data, school_id: schoolId });
  }

  async updateImpactChain(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipImpactChain, 'id' | 'detectedAt'>>,
  ): Promise<GeaesipImpactChain> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Chaîne d\'impact');
    await this.getImpactChain(schoolId, id);
    return this.impactChainRepo.update(id, data);
  }

  async deleteImpactChain(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Chaîne d\'impact');
    await this.getImpactChain(schoolId, id);
    await this.impactChainRepo.delete(id);
  }

  // ─── Systemic Risks ───────────────────────────────────────────────────────

  async listSystemicRisks(schoolId: string): Promise<GeaesipSystemicRisk[]> {
    this.validateSchoolId(schoolId);
    return this.systemicRiskRepo.findAllBySchool(schoolId);
  }

  async getSystemicRisk(schoolId: string, id: string): Promise<GeaesipSystemicRisk> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Risque systémique');
    const entity = await this.systemicRiskRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Risque systémique', id);
    }
    return entity;
  }

  async createSystemicRisk(
    schoolId: string,
    data: Omit<GeaesipSystemicRisk, 'id' | 'lastAssessedAt'>,
  ): Promise<GeaesipSystemicRisk> {
    this.validateSchoolId(schoolId);
    return this.systemicRiskRepo.create({ ...data, school_id: schoolId });
  }

  async updateSystemicRisk(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipSystemicRisk, 'id' | 'lastAssessedAt'>>,
  ): Promise<GeaesipSystemicRisk> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Risque systémique');
    await this.getSystemicRisk(schoolId, id);
    return this.systemicRiskRepo.update(id, data);
  }

  async deleteSystemicRisk(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Risque systémique');
    await this.getSystemicRisk(schoolId, id);
    await this.systemicRiskRepo.delete(id);
  }

  // ─── Dependency Graphs ────────────────────────────────────────────────────

  async listDependencyGraphs(schoolId: string): Promise<GeaesipDependencyGraph[]> {
    this.validateSchoolId(schoolId);
    return this.dependencyRepo.findAllBySchool(schoolId);
  }

  async getDependencyGraph(schoolId: string, id: string): Promise<GeaesipDependencyGraph> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Graphe de dépendance');
    const entity = await this.dependencyRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Graphe de dépendance', id);
    }
    return entity;
  }

  async createDependencyGraph(
    schoolId: string,
    data: Omit<GeaesipDependencyGraph, 'id' | 'lastComputedAt'>,
  ): Promise<GeaesipDependencyGraph> {
    this.validateSchoolId(schoolId);
    return this.dependencyRepo.create({ ...data, school_id: schoolId });
  }

  async updateDependencyGraph(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipDependencyGraph, 'id' | 'lastComputedAt'>>,
  ): Promise<GeaesipDependencyGraph> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Graphe de dépendance');
    await this.getDependencyGraph(schoolId, id);
    return this.dependencyRepo.update(id, data);
  }

  async deleteDependencyGraph(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Graphe de dépendance');
    await this.getDependencyGraph(schoolId, id);
    await this.dependencyRepo.delete(id);
  }

  // ─── Stats ────────────────────────────────────────────────────────────────

  async getCrossDomainStats(schoolId: string) {
    this.validateSchoolId(schoolId);

    const events = await this.eventRepo.findAllBySchool(schoolId);
    const correlations = await this.correlationRepo.findAllBySchool(schoolId);
    const impactChains = await this.impactChainRepo.findAllBySchool(schoolId);
    const systemicRisks = await this.systemicRiskRepo.findAllBySchool(schoolId);
    const dependencyGraphs = await this.dependencyRepo.findAllBySchool(schoolId);

    return {
      totalEvents: events.length,
      totalCorrelations: correlations.length,
      totalImpactChains: impactChains.length,
      totalSystemicRisks: systemicRisks.length,
      totalDependencyGraphs: dependencyGraphs.length,
    };
  }
}
