import {
  GestcrpSOCIncidentError,
  GestcrpSOCIndicatorError,
  GestcrpSOCAPTTActionError,
} from '@educi/errors';
import { createSOCIncidentSchema, updateSOCIncidentSchema } from '../validators';
import type {
  GestcrpSOCIncident,
  GestcrpSOCIndicator,
  GestcrpAPTAction,
  SOCRepository,
} from '../repositories/soc-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';
import { BaseGestcrpService, type GestcrpServiceConfig } from './base-gestcrp-service';

// ============================================================================
// SOC Service
// ============================================================================

export class SOCService extends BaseGestcrpService {
  constructor(
    private readonly socRepo: SOCRepository,
    config?: GestcrpServiceConfig,
  ) {
    super(config);
  }

  // ─── Incidents ───────────────────────────────────────────────────────────

  async listIncidents(
    schoolId: string,
    params: PaginationParams = {},
    filters: Record<string, unknown> = {},
  ): Promise<PaginatedResult<GestcrpSOCIncident>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.socRepo.incidents.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getIncident(schoolId: string, id: string): Promise<GestcrpSOCIncident> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Incident SOC');
    return this.ensureExists(this.socRepo.incidents, id, schoolId, 'Incident SOC');
  }

  async getOpenIncidents(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpSOCIncident>> {
    this.validateSchoolId(schoolId);
    return this.socRepo.findOpenIncidents(schoolId, params);
  }

  async getIncidentsBySeverity(
    schoolId: string,
    severity: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpSOCIncident>> {
    this.validateSchoolId(schoolId);

    const VALID_SEVERITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'EMERGENCY'] as const;
    this.validateEnum(severity, VALID_SEVERITIES, 'severity', 'Incident SOC');

    return this.socRepo.findBySeverity(severity, schoolId, params);
  }

  async createIncident(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpSOCIncident> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['title', 'description', 'severity', 'category', 'source'],
      'Incident SOC',
    );

    const VALID_SEVERITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'EMERGENCY'] as const;
    this.validateEnum(data.severity as string, VALID_SEVERITIES, 'severity', 'Incident SOC');

    const validated = this.validateSchema(createSOCIncidentSchema, data, 'Incident SOC');

    return this.socRepo.incidents.create(
      {
        title: validated.title,
        description: validated.description,
        severity: validated.severity,
        status: 'NEW',
        category: validated.category,
        source: validated.source,
        affected_systems: validated.affected_systems ?? [],
        affected_users: validated.affected_users ?? [],
        indicators: validated.indicators ?? [],
        timeline: [
          {
            event: 'Incident créé',
            timestamp: new Date().toISOString(),
            actor: data.created_by as string ?? 'system',
          },
        ],
        apt_actions: [],
        risk_score: validated.risk_score ?? 0,
        estimated_impact: validated.estimated_impact ?? 0,
      },
      schoolId,
    );
  }

  async updateIncident(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpSOCIncident> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Incident SOC');

    const existing = await this.ensureExists(
      this.socRepo.incidents,
      id,
      schoolId,
      'Incident SOC',
    );
    this.validateOwnership(existing, schoolId, 'Incident SOC');

    const VALID_STATUSES = ['NEW', 'TRIAGED', 'INVESTIGATING', 'CONTAINED', 'ERADICATED', 'RECOVERED', 'CLOSED', 'FALSE_POSITIVE'] as const;
    if (data.status !== undefined) {
      this.validateEnum(data.status as string, VALID_STATUSES, 'status', 'Incident SOC');
    }

    const validated = this.validateSchema(updateSOCIncidentSchema, data, 'Incident SOC');

    const timelineEntry = {
      event: `Statut mis à jour: ${existing.status} → ${data.status ?? existing.status}`,
      timestamp: new Date().toISOString(),
      actor: data.updated_by as string ?? 'system',
    };

    const updatedTimeline = [...(existing.timeline as Array<Record<string, unknown>>), timelineEntry];

    return this.socRepo.incidents.update(id, schoolId, {
      ...validated,
      timeline: updatedTimeline,
    });
  }

  async closeIncident(
    schoolId: string,
    id: string,
    data: {
      root_cause?: string;
      remediation?: string;
      lessons_learned?: string;
      closed_by?: string;
    },
  ): Promise<GestcrpSOCIncident> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Incident SOC');

    const existing = await this.ensureExists(
      this.socRepo.incidents,
      id,
      schoolId,
      'Incident SOC',
    );
    this.validateOwnership(existing, schoolId, 'Incident SOC');

    const VALID_TERMINAL_STATES = ['CONTAINED', 'ERADICATED', 'RECOVERED', 'INVESTIGATING'] as const;
    if (!VALID_TERMINAL_STATES.includes(existing.status as typeof VALID_TERMINAL_STATES[number])) {
      throw new GestcrpSOCIncidentError(
        `L'incident ne peut pas être fermé depuis le statut "${existing.status}"`,
      );
    }

    const timelineEntry = {
      event: 'Incident fermé',
      timestamp: new Date().toISOString(),
      actor: data.closed_by ?? 'system',
      root_cause: data.root_cause,
      remediation: data.remediation,
    };

    const updatedTimeline = [...(existing.timeline as Array<Record<string, unknown>>), timelineEntry];

    return this.socRepo.incidents.update(id, schoolId, {
      status: 'CLOSED',
      resolved_at: new Date().toISOString(),
      root_cause: data.root_cause,
      remediation: data.remediation,
      lessons_learned: data.lessons_learned,
      timeline: updatedTimeline,
    });
  }

  async assignIncident(
    schoolId: string,
    id: string,
    assigneeId: string,
  ): Promise<GestcrpSOCIncident> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Incident SOC');
    this.validateId(assigneeId, 'Assigné');

    const existing = await this.ensureExists(
      this.socRepo.incidents,
      id,
      schoolId,
      'Incident SOC',
    );
    this.validateOwnership(existing, schoolId, 'Incident SOC');

    const timelineEntry = {
      event: `Incident assigné à ${assigneeId}`,
      timestamp: new Date().toISOString(),
      actor: assigneeId,
    };

    const updatedTimeline = [...(existing.timeline as Array<Record<string, unknown>>), timelineEntry];

    const newStatus = existing.status === 'NEW' ? 'TRIAGED' : existing.status;

    return this.socRepo.incidents.update(id, schoolId, {
      assigned_to: assigneeId,
      status: newStatus,
      timeline: updatedTimeline,
    });
  }

  // ─── Indicators ──────────────────────────────────────────────────────────

  async listIndicators(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpSOCIndicator>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.socRepo.indicators.findAll(schoolId, pagination);
  }

  async getIndicator(schoolId: string, id: string): Promise<GestcrpSOCIndicator> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Indicateur SOC');
    return this.ensureExists(this.socRepo.indicators, id, schoolId, 'Indicateur SOC');
  }

  async getIndicatorsByIncident(
    schoolId: string,
    incidentId: string,
  ): Promise<PaginatedResult<GestcrpSOCIndicator>> {
    this.validateSchoolId(schoolId);
    this.validateId(incidentId, 'Incident');
    return this.socRepo.findByIncidentId(incidentId, schoolId);
  }

  async createIndicator(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpSOCIndicator> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['incident_id', 'type', 'value', 'confidence', 'severity', 'source'],
      'Indicateur SOC',
    );

    const VALID_TYPES = ['IP', 'DOMAIN', 'HASH', 'URL', 'EMAIL', 'FILE', 'BEHAVIOR'] as const;
    this.validateEnum(data.type as string, VALID_TYPES, 'type', 'Indicateur SOC');
    this.validateRange(data.confidence as number, 0, 100, 'confidence', 'Indicateur SOC');

    const incidentExists = await this.socRepo.incidents.exists(
      data.incident_id as string,
      schoolId,
    );
    if (!incidentExists) {
      throw new GestcrpSOCIncidentError(
        `Incident SOC (${data.incident_id}) introuvable`,
      );
    }

    const now = new Date().toISOString();

    return this.socRepo.indicators.create(
      {
        incident_id: data.incident_id as string,
        type: data.type as GestcrpSOCIndicator['type'],
        value: data.value as string,
        confidence: data.confidence as number,
        severity: data.severity as string,
        source: data.source as string,
        tags: (data.tags as string[]) ?? [],
        first_seen: now,
        last_seen: now,
        expiry: data.expiry as string,
      },
      schoolId,
    );
  }

  async deleteIndicator(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Indicateur SOC');

    const existing = await this.ensureExists(
      this.socRepo.indicators,
      id,
      schoolId,
      'Indicateur SOC',
    );
    this.validateOwnership(existing, schoolId, 'Indicateur SOC');

    await this.socRepo.indicators.softDelete(id, schoolId);
  }

  // ─── APT Actions ─────────────────────────────────────────────────────────

  async listAPTActions(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpAPTAction>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.socRepo.aptActions.findAll(schoolId, pagination);
  }

  async getAPTAction(schoolId: string, id: string): Promise<GestcrpAPTAction> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Action APT');
    return this.ensureExists(this.socRepo.aptActions, id, schoolId, 'Action APT');
  }

  async createAPTAction(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpAPTAction> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['incident_id', 'action', 'executed_by'],
      'Action APT',
    );

    const incidentExists = await this.socRepo.incidents.exists(
      data.incident_id as string,
      schoolId,
    );
    if (!incidentExists) {
      throw new GestcrpSOCIncidentError(
        `Incident SOC (${data.incident_id}) introuvable`,
      );
    }

    return this.socRepo.aptActions.create(
      {
        incident_id: data.incident_id as string,
        action: data.action as string,
        parameters: (data.parameters as Record<string, unknown>) ?? {},
        executed_by: data.executed_by as string,
        executed_at: new Date().toISOString(),
        result: 'PENDING',
        rollback_available: data.rollback_available as boolean ?? false,
      },
      schoolId,
    );
  }

  async updateAPTActionResult(
    schoolId: string,
    id: string,
    result: 'SUCCESS' | 'FAILURE' | 'PARTIAL',
    error?: string,
  ): Promise<GestcrpAPTAction> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Action APT');

    const existing = await this.ensureExists(
      this.socRepo.aptActions,
      id,
      schoolId,
      'Action APT',
    );
    this.validateOwnership(existing, schoolId, 'Action APT');

    if (existing.result !== 'PENDING') {
      throw new GestcrpSOCAPTTActionError(
        `L'action APT a déjà été exécutée avec le résultat "${existing.result}"`,
      );
    }

    return this.socRepo.aptActions.update(id, schoolId, {
      result,
      error_message: error,
    });
  }

  // ─── Statistics ──────────────────────────────────────────────────────────

  async getIncidentStats(schoolId: string): Promise<{
    total: number;
    open: number;
    closed: number;
    bySeverity: Record<string, number>;
    byStatus: Record<string, number>;
    averageRiskScore: number;
  }> {
    this.validateSchoolId(schoolId);

    const all = await this.socRepo.incidents.findAll(schoolId, { limit: 1000 });

    const openStatuses = ['NEW', 'TRIAGED', 'INVESTIGATING', 'CONTAINED'];
    const open = all.data.filter((i) => openStatuses.includes(i.status)).length;

    const bySeverity: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    let totalRiskScore = 0;

    for (const incident of all.data) {
      bySeverity[incident.severity] = (bySeverity[incident.severity] ?? 0) + 1;
      byStatus[incident.status] = (byStatus[incident.status] ?? 0) + 1;
      totalRiskScore += incident.risk_score;
    }

    return {
      total: all.total,
      open,
      closed: all.total - open,
      bySeverity,
      byStatus,
      averageRiskScore: all.total > 0 ? totalRiskScore / all.total : 0,
    };
  }
}
