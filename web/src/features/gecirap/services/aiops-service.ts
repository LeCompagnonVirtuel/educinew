import {
  GecirapAIOpsAgentError,
  GecirapAIOpsAgentNotFoundError,
  GecirapIncidentCorrelationError,
} from '@educi/errors';
import {
  createAIOpsAgentSchema,
  updateAIOpsAgentSchema,
  createInfrastructureEventSchema,
  updateInfrastructureEventSchema,
  createIncidentCorrelationSchema,
  updateIncidentCorrelationSchema,
} from '../validators/aiops';
import type {
  GecirapAIOpsAgent,
  GecirapInfrastructureEvent,
  GecirapIncidentCorrelation,
  AIOpsAgentRepository,
  InfrastructureEventRepository,
  IncidentCorrelationRepository,
} from '../repositories/aiops-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// AIOps Service
// ============================================================================

export class AIOpsService extends BaseGecirapService {
  constructor(
    private readonly agentRepo: AIOpsAgentRepository,
    private readonly eventRepo: InfrastructureEventRepository,
    private readonly correlationRepo: IncidentCorrelationRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── Agents ──────────────────────────────────────────────────────────────

  async listAgents(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapAIOpsAgent>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.agentRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getAgent(schoolId: string, id: string): Promise<GecirapAIOpsAgent> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Agent AIOps');
    return this.ensureExists(this.agentRepo, id, schoolId, 'Agent AIOps');
  }

  async createAgent(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapAIOpsAgent> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'agent_type', 'capabilities'], 'Agent AIOps');

    const validated = this.validateSchema(createAIOpsAgentSchema, data, 'Agent AIOps');

    return this.agentRepo.create(
      {
        name: validated.name,
        description: validated.description,
        agent_type: validated.agent_type,
        status: validated.status ?? 'pending',
        capabilities: validated.capabilities,
        configuration: validated.configuration,
        last_active_at: validated.last_active_at,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateAgent(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapAIOpsAgent> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Agent AIOps');

    const existing = await this.ensureExists(this.agentRepo, id, schoolId, 'Agent AIOps');
    this.validateOwnership(existing, schoolId, 'Agent AIOps');

    const validated = this.validateSchema(updateAIOpsAgentSchema, data, 'Agent AIOps');
    return this.agentRepo.update(id, schoolId, validated);
  }

  async deleteAgent(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Agent AIOps');

    const existing = await this.ensureExists(this.agentRepo, id, schoolId, 'Agent AIOps');
    this.validateOwnership(existing, schoolId, 'Agent AIOps');

    await this.agentRepo.softDelete(id, schoolId);
  }

  async listActiveAgents(schoolId: string): Promise<GecirapAIOpsAgent[]> {
    this.validateSchoolId(schoolId);
    return this.agentRepo.findActive(schoolId);
  }

  async listByAgentType(
    schoolId: string,
    agentType: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapAIOpsAgent>> {
    this.validateSchoolId(schoolId);
    return this.agentRepo.findByAgentType(agentType, schoolId, this.validatePagination(params));
  }

  // ─── Infrastructure Events ───────────────────────────────────────────────

  async listEvents(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapInfrastructureEvent>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.eventRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getEvent(schoolId: string, id: string): Promise<GecirapInfrastructureEvent> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Événement infrastructure');
    return this.ensureExists(this.eventRepo, id, schoolId, 'Événement infrastructure');
  }

  async createEvent(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapInfrastructureEvent> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['event_type', 'severity', 'source', 'message'], 'Événement infrastructure');

    const validated = this.validateSchema(createInfrastructureEventSchema, data, 'Événement infrastructure');

    return this.eventRepo.create(
      {
        event_type: validated.event_type,
        severity: validated.severity,
        source: validated.source,
        resource_type: validated.resource_type,
        resource_id: validated.resource_id,
        message: validated.message,
        details: validated.details,
        acknowledged_at: validated.acknowledged_at,
        resolved_at: validated.resolved_at,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateEvent(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapInfrastructureEvent> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Événement infrastructure');

    const existing = await this.ensureExists(this.eventRepo, id, schoolId, 'Événement infrastructure');
    this.validateOwnership(existing, schoolId, 'Événement infrastructure');

    const validated = this.validateSchema(updateInfrastructureEventSchema, data, 'Événement infrastructure');
    return this.eventRepo.update(id, schoolId, validated);
  }

  async deleteEvent(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Événement infrastructure');

    const existing = await this.ensureExists(this.eventRepo, id, schoolId, 'Événement infrastructure');
    this.validateOwnership(existing, schoolId, 'Événement infrastructure');

    await this.eventRepo.softDelete(id, schoolId);
  }

  async listByEventType(
    schoolId: string,
    eventType: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapInfrastructureEvent>> {
    this.validateSchoolId(schoolId);
    return this.eventRepo.findByEventType(eventType, schoolId, this.validatePagination(params));
  }

  async listBySeverity(
    schoolId: string,
    severity: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapInfrastructureEvent>> {
    this.validateSchoolId(schoolId);
    return this.eventRepo.findBySeverity(severity, schoolId, this.validatePagination(params));
  }

  async getUnresolvedEvents(schoolId: string): Promise<GecirapInfrastructureEvent[]> {
    this.validateSchoolId(schoolId);
    return this.eventRepo.findUnresolved(schoolId);
  }

  // ─── Incident Correlations ───────────────────────────────────────────────

  async listCorrelations(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapIncidentCorrelation>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.correlationRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getCorrelation(schoolId: string, id: string): Promise<GecirapIncidentCorrelation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Corrélation incident');
    return this.ensureExists(this.correlationRepo, id, schoolId, 'Corrélation incident');
  }

  async createCorrelation(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapIncidentCorrelation> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['incident_name', 'event_ids', 'correlation_score', 'status'], 'Corrélation incident');

    const validated = this.validateSchema(createIncidentCorrelationSchema, data, 'Corrélation incident');

    this.validateRange(validated.correlation_score, 0, 1, 'correlation_score', 'Corrélation incident');

    return this.correlationRepo.create(
      {
        incident_name: validated.incident_name,
        event_ids: validated.event_ids,
        correlation_score: validated.correlation_score,
        root_cause_suspect: validated.root_cause_suspect,
        status: validated.status,
        detected_at: new Date().toISOString(),
        resolved_at: validated.resolved_at,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateCorrelation(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapIncidentCorrelation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Corrélation incident');

    const existing = await this.ensureExists(this.correlationRepo, id, schoolId, 'Corrélation incident');
    this.validateOwnership(existing, schoolId, 'Corrélation incident');

    const validated = this.validateSchema(updateIncidentCorrelationSchema, data, 'Corrélation incident');
    return this.correlationRepo.update(id, schoolId, validated);
  }

  async deleteCorrelation(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Corrélation incident');

    const existing = await this.ensureExists(this.correlationRepo, id, schoolId, 'Corrélation incident');
    this.validateOwnership(existing, schoolId, 'Corrélation incident');

    await this.correlationRepo.softDelete(id, schoolId);
  }

  async getUnresolvedCorrelations(schoolId: string): Promise<GecirapIncidentCorrelation[]> {
    this.validateSchoolId(schoolId);
    return this.correlationRepo.findUnresolved(schoolId);
  }

  async listByStatus(
    schoolId: string,
    status: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapIncidentCorrelation>> {
    this.validateSchoolId(schoolId);
    return this.correlationRepo.findByStatus(status, schoolId, this.validatePagination(params));
  }

  async getAIOpsOverview(schoolId: string): Promise<{
    totalAgents: number;
    activeAgents: number;
    totalEvents: number;
    unresolvedEvents: number;
    totalCorrelations: number;
    unresolvedCorrelations: number;
    bySeverity: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);

    const agents = await this.agentRepo.findAll(schoolId, { limit: 500 });
    const events = await this.eventRepo.findAll(schoolId, { limit: 500 });
    const unresolved = await this.eventRepo.findUnresolved(schoolId);
    const correlations = await this.correlationRepo.findAll(schoolId, { limit: 500 });
    const unresolvedCorr = await this.correlationRepo.findUnresolved(schoolId);

    const bySeverity: Record<string, number> = {};
    for (const event of unresolved) {
      bySeverity[event.severity] = (bySeverity[event.severity] ?? 0) + 1;
    }

    return {
      totalAgents: agents.total,
      activeAgents: agents.data.filter((a) => a.status === 'active').length,
      totalEvents: events.total,
      unresolvedEvents: unresolved.length,
      totalCorrelations: correlations.total,
      unresolvedCorrelations: unresolvedCorr.length,
      bySeverity,
    };
  }
}
