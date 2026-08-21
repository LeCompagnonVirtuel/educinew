import {
  GestcrpSIEMEventError,
  GestcrpSIEMRuleError,
  GestcrpSIEMCorrelationError,
} from '@educi/errors';
import { createSIEMRuleSchema, updateSIEMRuleSchema } from '../validators';
import type {
  GestcrpSIEMEvent,
  GestcrpSIEMRule,
  GestcrpSIEMCorrelation,
  SIEMRepository,
} from '../repositories/siem-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';
import { BaseGestcrpService, type GestcrpServiceConfig } from './base-gestcrp-service';

// ============================================================================
// SIEM Service
// ============================================================================

export class SIEMService extends BaseGestcrpService {
  constructor(
    private readonly siemRepo: SIEMRepository,
    config?: GestcrpServiceConfig,
  ) {
    super(config);
  }

  // ─── Events ──────────────────────────────────────────────────────────────

  async listEvents(
    schoolId: string,
    params: PaginationParams = {},
    filters: Record<string, unknown> = {},
  ): Promise<PaginatedResult<GestcrpSIEMEvent>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.siemRepo.events.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getEvent(schoolId: string, id: string): Promise<GestcrpSIEMEvent> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Événement SIEM');
    return this.ensureExists(this.siemRepo.events, id, schoolId, 'Événement SIEM');
  }

  async getRecentEvents(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpSIEMEvent>> {
    this.validateSchoolId(schoolId);
    return this.siemRepo.findRecentEvents(schoolId, params);
  }

  async getEventsBySource(
    schoolId: string,
    source: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpSIEMEvent>> {
    this.validateSchoolId(schoolId);
    if (!source || source.trim().length === 0) {
      throw new GestcrpSIEMEventError('La source est requise');
    }
    return this.siemRepo.findBySourceType(source, schoolId, params);
  }

  async ingestEvent(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpSIEMEvent> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['source', 'event_type', 'severity', 'message', 'raw_log'],
      'Événement SIEM',
    );

    const VALID_SEVERITIES = ['INFO', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const;
    this.validateEnum(data.severity as string, VALID_SEVERITIES, 'severity', 'Événement SIEM');

    const now = new Date().toISOString();

    return this.siemRepo.events.create(
      {
        source: data.source as string,
        event_type: data.event_type as string,
        severity: data.severity as GestcrpSIEMEvent['severity'],
        message: data.message as string,
        raw_log: data.raw_log as string,
        parsed_fields: (data.parsed_fields as Record<string, unknown>) ?? {},
        user: data.user as string,
        ip_address: data.ip_address as string,
        device: data.device as string,
        application: data.application as string,
        tags: (data.tags as string[]) ?? [],
        ioc_matches: (data.ioc_matches as string[]) ?? [],
        correlated_events: (data.correlated_events as string[]) ?? [],
        normalized: data.normalized as boolean ?? false,
        timestamp: data.timestamp as string ?? now,
        ingested_at: now,
      },
      schoolId,
    );
  }

  async bulkIngestEvents(
    schoolId: string,
    events: Array<Record<string, unknown>>,
  ): Promise<{ ingested: number; errors: Array<{ index: number; message: string }> }> {
    this.validateSchoolId(schoolId);

    const results = { ingested: 0, errors: [] as Array<{ index: number; message: string }> };

    for (let i = 0; i < events.length; i++) {
      try {
        await this.ingestEvent(schoolId, events[i]);
        results.ingested++;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erreur inconnue';
        results.errors.push({ index: i, message });
      }
    }

    return results;
  }

  async searchEvents(
    schoolId: string,
    query: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpSIEMEvent>> {
    this.validateSchoolId(schoolId);
    if (!query || query.trim().length < 2) {
      throw new GestcrpSIEMEventError('La requête de recherche doit contenir au moins 2 caractères');
    }

    return this.siemRepo.events.findAll(schoolId, {
      ...this.validatePagination(params),
      search: query,
    });
  }

  // ─── Rules ───────────────────────────────────────────────────────────────

  async listRules(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpSIEMRule>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.siemRepo.rules.findAll(schoolId, pagination);
  }

  async getRule(schoolId: string, id: string): Promise<GestcrpSIEMRule> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Règle SIEM');
    return this.ensureExists(this.siemRepo.rules, id, schoolId, 'Règle SIEM');
  }

  async getActiveRules(schoolId: string): Promise<PaginatedResult<GestcrpSIEMRule>> {
    this.validateSchoolId(schoolId);
    return this.siemRepo.findActiveRules(schoolId);
  }

  async createRule(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpSIEMRule> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['name', 'description', 'event_type', 'conditions', 'actions'],
      'Règle SIEM',
    );

    const validated = this.validateSchema(createSIEMRuleSchema, data, 'Règle SIEM');

    const existing = await this.siemRepo.rules.findAll(schoolId, {
      name: validated.name,
      limit: 1,
    });
    if (existing.total > 0) {
      throw new GestcrpSIEMRuleError(
        `Une règle SIEM "${validated.name}" existe déjà`,
      );
    }

    return this.siemRepo.rules.create(
      {
        name: validated.name,
        description: validated.description,
        enabled: validated.enabled ?? true,
        severity: validated.severity,
        event_type: validated.event_type,
        conditions: validated.conditions,
        actions: validated.actions,
        suppression_window: validated.suppression_window ?? 300,
        match_count: 0,
      },
      schoolId,
    );
  }

  async updateRule(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpSIEMRule> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Règle SIEM');

    const existing = await this.ensureExists(
      this.siemRepo.rules,
      id,
      schoolId,
      'Règle SIEM',
    );
    this.validateOwnership(existing, schoolId, 'Règle SIEM');

    const validated = this.validateSchema(updateSIEMRuleSchema, data, 'Règle SIEM');

    return this.siemRepo.rules.update(id, schoolId, validated);
  }

  async deleteRule(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Règle SIEM');

    const existing = await this.ensureExists(
      this.siemRepo.rules,
      id,
      schoolId,
      'Règle SIEM',
    );
    this.validateOwnership(existing, schoolId, 'Règle SIEM');

    await this.siemRepo.rules.softDelete(id, schoolId);
  }

  async toggleRule(schoolId: string, id: string, enabled: boolean): Promise<GestcrpSIEMRule> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Règle SIEM');

    const existing = await this.ensureExists(
      this.siemRepo.rules,
      id,
      schoolId,
      'Règle SIEM',
    );
    this.validateOwnership(existing, schoolId, 'Règle SIEM');

    return this.siemRepo.rules.update(id, schoolId, { enabled });
  }

  // ─── Correlations ────────────────────────────────────────────────────────

  async listCorrelations(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpSIEMCorrelation>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.siemRepo.correlations.findAll(schoolId, pagination);
  }

  async getCorrelation(schoolId: string, id: string): Promise<GestcrpSIEMCorrelation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Corrélation SIEM');
    return this.ensureExists(
      this.siemRepo.correlations,
      id,
      schoolId,
      'Corrélation SIEM',
    );
  }

  async createCorrelation(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpSIEMCorrelation> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['name', 'description', 'events', 'time_window', 'threshold', 'severity', 'actions'],
      'Corrélation SIEM',
    );
    this.validateRange(data.threshold as number, 1, 100, 'threshold', 'Corrélation SIEM');
    this.validateRange(data.time_window as number, 1, 86400, 'time_window', 'Corrélation SIEM');

    const existing = await this.siemRepo.correlations.findAll(schoolId, {
      name: data.name as string,
      limit: 1,
    });
    if (existing.total > 0) {
      throw new GestcrpSIEMCorrelationError(
        `Une corrélation SIEM "${data.name}" existe déjà`,
      );
    }

    return this.siemRepo.correlations.create(
      {
        name: data.name as string,
        description: data.description as string,
        enabled: data.enabled ?? true,
        events: data.events as Record<string, unknown>[],
        time_window: data.time_window as number,
        threshold: data.threshold as number,
        severity: data.severity as string,
        actions: data.actions as Record<string, unknown>[],
      },
      schoolId,
    );
  }

  async updateCorrelation(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpSIEMCorrelation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Corrélation SIEM');

    const existing = await this.ensureExists(
      this.siemRepo.correlations,
      id,
      schoolId,
      'Corrélation SIEM',
    );
    this.validateOwnership(existing, schoolId, 'Corrélation SIEM');

    return this.siemRepo.correlations.update(id, schoolId, data);
  }

  async deleteCorrelation(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Corrélation SIEM');

    const existing = await this.ensureExists(
      this.siemRepo.correlations,
      id,
      schoolId,
      'Corrélation SIEM',
    );
    this.validateOwnership(existing, schoolId, 'Corrélation SIEM');

    await this.siemRepo.correlations.softDelete(id, schoolId);
  }

  // ─── Statistics ──────────────────────────────────────────────────────────

  async getEventStats(schoolId: string): Promise<{
    total: number;
    bySeverity: Record<string, number>;
    bySource: Record<string, number>;
    normalizedCount: number;
    iocMatchCount: number;
  }> {
    this.validateSchoolId(schoolId);

    const all = await this.siemRepo.events.findAll(schoolId, { limit: 1000 });

    const bySeverity: Record<string, number> = {};
    const bySource: Record<string, number> = {};
    let normalizedCount = 0;
    let iocMatchCount = 0;

    for (const event of all.data) {
      bySeverity[event.severity] = (bySeverity[event.severity] ?? 0) + 1;
      bySource[event.source] = (bySource[event.source] ?? 0) + 1;
      if (event.normalized) normalizedCount++;
      iocMatchCount += event.ioc_matches.length;
    }

    return {
      total: all.total,
      bySeverity,
      bySource,
      normalizedCount,
      iocMatchCount,
    };
  }

  async getRuleStats(schoolId: string): Promise<{
    total: number;
    active: number;
    topMatchedRules: Array<{ id: string; name: string; matchCount: number }>;
  }> {
    this.validateSchoolId(schoolId);

    const all = await this.siemRepo.rules.findAll(schoolId, { limit: 1000 });

    const active = all.data.filter((r) => r.enabled);
    const topMatchedRules = all.data
      .sort((a, b) => b.match_count - a.match_count)
      .slice(0, 10)
      .map((r) => ({ id: r.id, name: r.name, matchCount: r.match_count }));

    return {
      total: all.total,
      active: active.length,
      topMatchedRules,
    };
  }
}
