import {
  GestcrpThreatIndicatorError,
  GestcrpThreatFeedError,
  GestcrpThreatAnalysisError,
} from '@educi/errors';
import { createThreatIndicatorSchema, updateThreatIndicatorSchema } from '../validators';
import type {
  GestcrpThreatIndicator,
  GestcrpThreatFeed,
  GestcrpThreatAnalysis,
  GestcrpThreatFeedMatch,
  ThreatRepository,
} from '../repositories/threat-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';
import { BaseGestcrpService, type GestcrpServiceConfig } from './base-gestcrp-service';

// ============================================================================
// Threat Detection Service
// ============================================================================

export class ThreatDetectionService extends BaseGestcrpService {
  constructor(
    private readonly threatRepo: ThreatRepository,
    config?: GestcrpServiceConfig,
  ) {
    super(config);
  }

  // ─── Indicators ──────────────────────────────────────────────────────────

  async listIndicators(
    schoolId: string,
    params: PaginationParams = {},
    filters: Record<string, unknown> = {},
  ): Promise<PaginatedResult<GestcrpThreatIndicator>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.threatRepo.indicators.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getIndicator(schoolId: string, id: string): Promise<GestcrpThreatIndicator> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Indicateur de menace');
    return this.ensureExists(this.threatRepo.indicators, id, schoolId, 'Indicateur de menace');
  }

  async getIndicatorsByCategory(
    schoolId: string,
    category: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpThreatIndicator>> {
    this.validateSchoolId(schoolId);
    if (!category || category.trim().length === 0) {
      throw new GestcrpThreatIndicatorError('La catégorie est requise');
    }
    return this.threatRepo.findByCategory(category, schoolId, params);
  }

  async createIndicator(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpThreatIndicator> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['type', 'value', 'confidence', 'severity', 'category', 'source'],
      'Indicateur de menace',
    );

    const VALID_TYPES = ['IP', 'DOMAIN', 'URL', 'FILE_HASH', 'EMAIL', 'CVE', 'YARA', 'Sigma', 'BEHAVIOR', 'TTP'] as const;
    this.validateEnum(data.type as string, VALID_TYPES, 'type', 'Indicateur de menace');
    this.validateRange(data.confidence as number, 0, 100, 'confidence', 'Indicateur de menace');

    const validated = this.validateSchema(createThreatIndicatorSchema, data, 'Indicateur de menace');

    const existing = await this.threatRepo.indicators.findAll(schoolId, {
      type: validated.type,
      value: validated.value,
      limit: 1,
    });
    if (existing.total > 0) {
      throw new GestcrpThreatIndicatorError(
        `Un indicateur de type "${validated.type}" avec la valeur "${validated.value}" existe déjà`,
      );
    }

    const now = new Date().toISOString();

    return this.threatRepo.indicators.create(
      {
        type: validated.type,
        value: validated.value,
        confidence: validated.confidence,
        severity: validated.severity,
        category: validated.category,
        source: validated.source,
        tags: validated.tags ?? [],
        description: validated.description,
        first_seen: now,
        last_seen: now,
        expiry: validated.expiry,
        mitre_attack_ids: validated.mitre_attack_ids ?? [],
        associated_threats: validated.associated_threats ?? [],
      },
      schoolId,
    );
  }

  async updateIndicator(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpThreatIndicator> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Indicateur de menace');

    const existing = await this.ensureExists(
      this.threatRepo.indicators,
      id,
      schoolId,
      'Indicateur de menace',
    );
    this.validateOwnership(existing, schoolId, 'Indicateur de menace');

    const validated = this.validateSchema(updateThreatIndicatorSchema, data, 'Indicateur de menace');

    return this.threatRepo.indicators.update(id, schoolId, {
      ...validated,
      last_seen: new Date().toISOString(),
    });
  }

  async deleteIndicator(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Indicateur de menace');

    const existing = await this.ensureExists(
      this.threatRepo.indicators,
      id,
      schoolId,
      'Indicateur de menace',
    );
    this.validateOwnership(existing, schoolId, 'Indicateur de menace');

    await this.threatRepo.indicators.softDelete(id, schoolId);
  }

  async expireIndicator(schoolId: string, id: string): Promise<GestcrpThreatIndicator> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Indicateur de menace');

    const existing = await this.ensureExists(
      this.threatRepo.indicators,
      id,
      schoolId,
      'Indicateur de menace',
    );
    this.validateOwnership(existing, schoolId, 'Indicateur de menace');

    return this.threatRepo.indicators.update(id, schoolId, {
      expiry: new Date().toISOString(),
    });
  }

  // ─── Feeds ───────────────────────────────────────────────────────────────

  async listFeeds(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpThreatFeed>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.threatRepo.feeds.findAll(schoolId, pagination);
  }

  async getFeed(schoolId: string, id: string): Promise<GestcrpThreatFeed> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Flux de menace');
    return this.ensureExists(this.threatRepo.feeds, id, schoolId, 'Flux de menace');
  }

  async getActiveFeeds(schoolId: string): Promise<PaginatedResult<GestcrpThreatFeed>> {
    this.validateSchoolId(schoolId);
    return this.threatRepo.findActiveFeeds(schoolId);
  }

  async createFeed(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpThreatFeed> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['name', 'url', 'feed_type', 'format', 'refresh_interval_minutes'],
      'Flux de menace',
    );

    const VALID_FEED_TYPES = ['STIX', 'TAXII', 'CSV', 'JSON', 'MISP', 'CUSTOM'] as const;
    this.validateEnum(data.feed_type as string, VALID_FEED_TYPES, 'feed_type', 'Flux de menace');
    this.validateRange(data.refresh_interval_minutes as number, 1, 1440, 'refresh_interval_minutes', 'Flux de menace');

    const existing = await this.threatRepo.feeds.findAll(schoolId, {
      name: data.name as string,
      limit: 1,
    });
    if (existing.total > 0) {
      throw new GestcrpThreatFeedError(
        `Un flux de menace "${data.name}" existe déjà`,
      );
    }

    return this.threatRepo.feeds.create(
      {
        name: data.name as string,
        url: data.url as string,
        feed_type: data.feed_type as GestcrpThreatFeed['feed_type'],
        format: data.format as string,
        refresh_interval_minutes: data.refresh_interval_minutes as number,
        enabled: data.enabled ?? true,
        indicators_count: 0,
        reliability: data.reliability as number ?? 50,
      },
      schoolId,
    );
  }

  async updateFeed(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpThreatFeed> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Flux de menace');

    const existing = await this.ensureExists(
      this.threatRepo.feeds,
      id,
      schoolId,
      'Flux de menace',
    );
    this.validateOwnership(existing, schoolId, 'Flux de menace');

    return this.threatRepo.feeds.update(id, schoolId, data);
  }

  async toggleFeed(schoolId: string, id: string, enabled: boolean): Promise<GestcrpThreatFeed> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Flux de menace');

    const existing = await this.ensureExists(
      this.threatRepo.feeds,
      id,
      schoolId,
      'Flux de menace',
    );
    this.validateOwnership(existing, schoolId, 'Flux de menace');

    return this.threatRepo.feeds.update(id, schoolId, { enabled });
  }

  async deleteFeed(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Flux de menace');

    const existing = await this.ensureExists(
      this.threatRepo.feeds,
      id,
      schoolId,
      'Flux de menace',
    );
    this.validateOwnership(existing, schoolId, 'Flux de menace');

    await this.threatRepo.feeds.softDelete(id, schoolId);
  }

  // ─── Analyses ────────────────────────────────────────────────────────────

  async listAnalyses(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpThreatAnalysis>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.threatRepo.analyses.findAll(schoolId, pagination);
  }

  async getAnalysis(schoolId: string, id: string): Promise<GestcrpThreatAnalysis> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Analyse de menace');
    return this.ensureExists(this.threatRepo.analyses, id, schoolId, 'Analyse de menace');
  }

  async createAnalysis(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpThreatAnalysis> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['threat_id', 'analyst', 'methodology', 'findings'],
      'Analyse de menace',
    );

    const threatExists = await this.threatRepo.indicators.exists(
      data.threat_id as string,
      schoolId,
    );
    if (!threatExists) {
      throw new GestcrpThreatIndicatorError(
        `Indicateur de menace (${data.threat_id}) introuvable`,
      );
    }

    return this.threatRepo.analyses.create(
      {
        threat_id: data.threat_id as string,
        analyst: data.analyst as string,
        methodology: data.methodology as string,
        findings: (data.findings as Record<string, unknown>[]) ?? [],
        risk_assessment: (data.risk_assessment as Record<string, unknown>) ?? {},
        recommendations: (data.recommendations as string[]) ?? [],
        evidence: (data.evidence as string[]) ?? [],
      },
      schoolId,
    );
  }

  // ─── Feed Matches ────────────────────────────────────────────────────────

  async listFeedMatches(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpThreatFeedMatch>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.threatRepo.feedMatches.findAll(schoolId, pagination);
  }

  async getFeedMatch(schoolId: string, id: string): Promise<GestcrpThreatFeedMatch> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Correspondance de flux');
    return this.ensureExists(
      this.threatRepo.feedMatches,
      id,
      schoolId,
      'Correspondance de flux',
    );
  }

  async createFeedMatch(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpThreatFeedMatch> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['feed_id', 'indicator_id', 'matched_event', 'confidence'],
      'Correspondance de flux',
    );
    this.validateRange(data.confidence as number, 0, 100, 'confidence', 'Correspondance de flux');

    const feedExists = await this.threatRepo.feeds.exists(
      data.feed_id as string,
      schoolId,
    );
    if (!feedExists) {
      throw new GestcrpThreatFeedError(
        `Flux de menace (${data.feed_id}) introuvable`,
      );
    }

    const indicatorExists = await this.threatRepo.indicators.exists(
      data.indicator_id as string,
      schoolId,
    );
    if (!indicatorExists) {
      throw new GestcrpThreatIndicatorError(
        `Indicateur de menace (${data.indicator_id}) introuvable`,
      );
    }

    return this.threatRepo.feedMatches.create(
      {
        feed_id: data.feed_id as string,
        indicator_id: data.indicator_id as string,
        matched_event: data.matched_event as string,
        confidence: data.confidence as number,
        acknowledged: false,
      },
      schoolId,
    );
  }

  async acknowledgeFeedMatch(
    schoolId: string,
    id: string,
    acknowledgedBy: string,
  ): Promise<GestcrpThreatFeedMatch> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Correspondance de flux');
    this.validateId(acknowledgedBy, 'Utilisateur');

    const existing = await this.ensureExists(
      this.threatRepo.feedMatches,
      id,
      schoolId,
      'Correspondance de flux',
    );
    this.validateOwnership(existing, schoolId, 'Correspondance de flux');

    if (existing.acknowledged) {
      throw new GestcrpThreatIndicatorError(
        'Cette correspondance de flux est déjà acquittée',
      );
    }

    return this.threatRepo.feedMatches.update(id, schoolId, {
      acknowledged: true,
      acknowledged_by: acknowledgedBy,
    });
  }

  // ─── Statistics ──────────────────────────────────────────────────────────

  async getIndicatorStats(schoolId: string): Promise<{
    total: number;
    byType: Record<string, number>;
    bySeverity: Record<string, number>;
    byCategory: Record<string, number>;
    averageConfidence: number;
    expiredCount: number;
  }> {
    this.validateSchoolId(schoolId);

    const all = await this.threatRepo.indicators.findAll(schoolId, { limit: 1000 });
    const now = new Date();

    const byType: Record<string, number> = {};
    const bySeverity: Record<string, number> = {};
    const byCategory: Record<string, number> = {};
    let totalConfidence = 0;
    let expiredCount = 0;

    for (const indicator of all.data) {
      byType[indicator.type] = (byType[indicator.type] ?? 0) + 1;
      bySeverity[indicator.severity] = (bySeverity[indicator.severity] ?? 0) + 1;
      byCategory[indicator.category] = (byCategory[indicator.category] ?? 0) + 1;
      totalConfidence += indicator.confidence;
      if (indicator.expiry && new Date(indicator.expiry) < now) {
        expiredCount++;
      }
    }

    return {
      total: all.total,
      byType,
      bySeverity,
      byCategory,
      averageConfidence: all.total > 0 ? totalConfidence / all.total : 0,
      expiredCount,
    };
  }

  async getFeedStats(schoolId: string): Promise<{
    total: number;
    active: number;
    totalIndicators: number;
    averageReliability: number;
  }> {
    this.validateSchoolId(schoolId);

    const all = await this.threatRepo.feeds.findAll(schoolId, { limit: 1000 });

    const active = all.data.filter((f) => f.enabled);
    const totalIndicators = all.data.reduce((sum, f) => sum + f.indicators_count, 0);
    const averageReliability = all.total > 0
      ? all.data.reduce((sum, f) => sum + f.reliability, 0) / all.total
      : 0;

    return {
      total: all.total,
      active: active.length,
      totalIndicators,
      averageReliability,
    };
  }
}
