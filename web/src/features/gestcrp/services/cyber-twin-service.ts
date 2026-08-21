import {
  GestcrpDigitalTwinError,
  GestcrpTwinResultError,
  GestcrpAttackScenarioError,
} from '@educi/errors';
import { createCyberDigitalTwinSchema, updateCyberDigitalTwinSchema } from '../validators';
import type {
  GestcrpCyberDigitalTwin,
  GestcrpTwinResult,
  GestcrpAttackScenario,
  CyberTwinRepository,
} from '../repositories/cyber-twin-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';
import { BaseGestcrpService, type GestcrpServiceConfig } from './base-gestcrp-service';

// ============================================================================
// Cyber Digital Twin Service
// ============================================================================

export class CyberTwinService extends BaseGestcrpService {
  constructor(
    private readonly cyberTwinRepo: CyberTwinRepository,
    config?: GestcrpServiceConfig,
  ) {
    super(config);
  }

  // ─── Digital Twins ───────────────────────────────────────────────────────

  async listTwins(
    schoolId: string,
    params: PaginationParams = {},
    filters: Record<string, unknown> = {},
  ): Promise<PaginatedResult<GestcrpCyberDigitalTwin>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.cyberTwinRepo.twins.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getTwin(schoolId: string, id: string): Promise<GestcrpCyberDigitalTwin> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Jumeau numérique');
    return this.ensureExists(this.cyberTwinRepo.twins, id, schoolId, 'Jumeau numérique');
  }

  async getCompletedTwins(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpCyberDigitalTwin>> {
    this.validateSchoolId(schoolId);
    return this.cyberTwinRepo.findCompletedTwins(schoolId, params);
  }

  async createTwin(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpCyberDigitalTwin> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['name', 'description', 'simulation_type', 'scope', 'created_by'],
      'Jumeau numérique',
    );

    const VALID_SIM_TYPES = [
      'ATTACK_SIMULATION', 'PENETRATION_TEST', 'RED_TEAM', 'BLUE_TEAM',
      'PURPLE_TEAM', 'CHAOS_ENGINEERING', 'DISASTER_RECOVERY', 'INCIDENT_RESPONSE',
    ] as const;
    this.validateEnum(data.simulation_type as string, VALID_SIM_TYPES, 'simulation_type', 'Jumeau numérique');

    const validated = this.validateSchema(createCyberDigitalTwinSchema, data, 'Jumeau numérique');

    const existing = await this.cyberTwinRepo.twins.findAll(schoolId, {
      name: validated.name,
      limit: 1,
    });
    if (existing.total > 0) {
      throw new GestcrpDigitalTwinError(
        `Un jumeau numérique "${validated.name}" existe déjà`,
      );
    }

    return this.cyberTwinRepo.twins.create(
      {
        name: validated.name,
        description: validated.description,
        status: 'DRAFT',
        simulation_type: validated.simulation_type,
        scope: validated.scope,
        environment: validated.environment ?? {},
        attack_scenarios: validated.attack_scenarios ?? [],
        defenses: validated.defenses ?? [],
        created_by: validated.created_by,
      },
      schoolId,
    );
  }

  async updateTwin(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpCyberDigitalTwin> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Jumeau numérique');

    const existing = await this.ensureExists(
      this.cyberTwinRepo.twins,
      id,
      schoolId,
      'Jumeau numérique',
    );
    this.validateOwnership(existing, schoolId, 'Jumeau numérique');

    const validated = this.validateSchema(updateCyberDigitalTwinSchema, data, 'Jumeau numérique');

    return this.cyberTwinRepo.twins.update(id, schoolId, validated);
  }

  async startTwin(schoolId: string, id: string): Promise<GestcrpCyberDigitalTwin> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Jumeau numérique');

    const existing = await this.ensureExists(
      this.cyberTwinRepo.twins,
      id,
      schoolId,
      'Jumeau numérique',
    );
    this.validateOwnership(existing, schoolId, 'Jumeau numérique');

    if (!['DRAFT', 'READY', 'PAUSED'].includes(existing.status)) {
      throw new GestcrpDigitalTwinError(
        `Le jumeau ne peut pas être démarré depuis le statut "${existing.status}"`,
      );
    }

    if (existing.attack_scenarios.length === 0) {
      throw new GestcrpDigitalTwinError(
        'Le jumeau doit avoir au moins un scénario d\'attaque',
      );
    }

    return this.cyberTwinRepo.twins.update(id, schoolId, {
      status: 'RUNNING',
      started_at: new Date().toISOString(),
    });
  }

  async completeTwin(
    schoolId: string,
    id: string,
    duration: number,
  ): Promise<GestcrpCyberDigitalTwin> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Jumeau numérique');

    const existing = await this.ensureExists(
      this.cyberTwinRepo.twins,
      id,
      schoolId,
      'Jumeau numérique',
    );
    this.validateOwnership(existing, schoolId, 'Jumeau numérique');

    if (existing.status !== 'RUNNING') {
      throw new GestcrpDigitalTwinError(
        `Le jumeau ne peut pas être terminé depuis le statut "${existing.status}"`,
      );
    }

    return this.cyberTwinRepo.twins.update(id, schoolId, {
      status: 'COMPLETED',
      completed_at: new Date().toISOString(),
      duration,
    });
  }

  async failTwin(
    schoolId: string,
    id: string,
    error: string,
  ): Promise<GestcrpCyberDigitalTwin> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Jumeau numérique');

    const existing = await this.ensureExists(
      this.cyberTwinRepo.twins,
      id,
      schoolId,
      'Jumeau numérique',
    );
    this.validateOwnership(existing, schoolId, 'Jumeau numérique');

    return this.cyberTwinRepo.twins.update(id, schoolId, {
      status: 'FAILED',
      completed_at: new Date().toISOString(),
      attack_scenarios: [
        ...(existing.attack_scenarios as Array<Record<string, unknown>>),
        { error, failed_at: new Date().toISOString() },
      ],
    });
  }

  async pauseTwin(schoolId: string, id: string): Promise<GestcrpCyberDigitalTwin> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Jumeau numérique');

    const existing = await this.ensureExists(
      this.cyberTwinRepo.twins,
      id,
      schoolId,
      'Jumeau numérique',
    );
    this.validateOwnership(existing, schoolId, 'Jumeau numérique');

    if (existing.status !== 'RUNNING') {
      throw new GestcrpDigitalTwinError(
        `Le jumeau ne peut pas être mis en pause depuis le statut "${existing.status}"`,
      );
    }

    return this.cyberTwinRepo.twins.update(id, schoolId, {
      status: 'PAUSED',
    });
  }

  async deleteTwin(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Jumeau numérique');

    const existing = await this.ensureExists(
      this.cyberTwinRepo.twins,
      id,
      schoolId,
      'Jumeau numérique',
    );
    this.validateOwnership(existing, schoolId, 'Jumeau numérique');

    if (['RUNNING', 'PAUSED'].includes(existing.status)) {
      throw new GestcrpDigitalTwinError(
        'Impossible de supprimer un jumeau en cours d\'exécution',
      );
    }

    await this.cyberTwinRepo.twins.softDelete(id, schoolId);
  }

  // ─── Twin Results ────────────────────────────────────────────────────────

  async listResults(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpTwinResult>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.cyberTwinRepo.results.findAll(schoolId, pagination);
  }

  async getResult(schoolId: string, id: string): Promise<GestcrpTwinResult> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Résultat twin');
    return this.ensureExists(this.cyberTwinRepo.results, id, schoolId, 'Résultat twin');
  }

  async getResultsByTwinId(
    schoolId: string,
    twinId: string,
  ): Promise<PaginatedResult<GestcrpTwinResult>> {
    this.validateSchoolId(schoolId);
    this.validateId(twinId, 'Jumeau');
    return this.cyberTwinRepo.findResultsByTwinId(twinId, schoolId);
  }

  async createResult(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpTwinResult> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['twin_id', 'scenario_id', 'success', 'detection_time', 'response_time', 'mitigation_time'],
      'Résultat twin',
    );

    const twinExists = await this.cyberTwinRepo.twins.exists(
      data.twin_id as string,
      schoolId,
    );
    if (!twinExists) {
      throw new GestcrpDigitalTwinError(
        `Jumeau numérique (${data.twin_id}) introuvable`,
      );
    }

    const existing = await this.cyberTwinRepo.results.findAll(schoolId, {
      twin_id: data.twin_id as string,
      scenario_id: data.scenario_id as string,
      limit: 1,
    });
    if (existing.total > 0) {
      throw new GestcrpTwinResultError(
        `Un résultat existe déjà pour le scénario "${data.scenario_id}" dans ce jumeau`,
      );
    }

    return this.cyberTwinRepo.results.create(
      {
        twin_id: data.twin_id as string,
        scenario_id: data.scenario_id as string,
        success: data.success as boolean,
        detection_time: data.detection_time as number,
        response_time: data.response_time as number,
        mitigation_time: data.mitigation_time as number,
        findings: (data.findings as Record<string, unknown>[]) ?? [],
        recommendations: (data.recommendations as string[]) ?? [],
        score: data.score as number ?? 0,
      },
      schoolId,
    );
  }

  // ─── Attack Scenarios ────────────────────────────────────────────────────

  async listScenarios(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpAttackScenario>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.cyberTwinRepo.attackScenarios.findAll(schoolId, pagination);
  }

  async getScenario(schoolId: string, id: string): Promise<GestcrpAttackScenario> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Scénario d\'attaque');
    return this.ensureExists(
      this.cyberTwinRepo.attackScenarios,
      id,
      schoolId,
      'Scénario d\'attaque',
    );
  }

  async getScenariosByTwinId(
    schoolId: string,
    twinId: string,
  ): Promise<PaginatedResult<GestcrpAttackScenario>> {
    this.validateSchoolId(schoolId);
    this.validateId(twinId, 'Jumeau');
    return this.cyberTwinRepo.findScenariosByTwinId(twinId, schoolId);
  }

  async createScenario(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpAttackScenario> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['twin_id', 'name', 'description', 'technique', 'severity', 'target', 'expected_duration', 'steps', 'success_criteria', 'rollback_plan'],
      'Scénario d\'attaque',
    );

    const twinExists = await this.cyberTwinRepo.twins.exists(
      data.twin_id as string,
      schoolId,
    );
    if (!twinExists) {
      throw new GestcrpDigitalTwinError(
        `Jumeau numérique (${data.twin_id}) introuvable`,
      );
    }

    const twin = await this.cyberTwinRepo.twins.findById(
      data.twin_id as string,
      schoolId,
    );
    if (twin.status === 'RUNNING' || twin.status === 'COMPLETED') {
      throw new GestcrpAttackScenarioError(
        'Impossible d\'ajouter un scénario à un jumeau en cours ou terminé',
      );
    }

    this.validateRange(data.expected_duration as number, 1, 86400, 'expected_duration', 'Scénario d\'attaque');

    return this.cyberTwinRepo.attackScenarios.create(
      {
        twin_id: data.twin_id as string,
        name: data.name as string,
        description: data.description as string,
        technique: data.technique as string,
        mitre_attack_id: data.mitre_attack_id as string,
        severity: data.severity as string,
        target: data.target as string,
        expected_duration: data.expected_duration as number,
        steps: data.steps as Record<string, unknown>[],
        success_criteria: data.success_criteria as string[],
        rollback_plan: data.rollback_plan as string,
      },
      schoolId,
    );
  }

  async updateScenario(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpAttackScenario> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Scénario d\'attaque');

    const existing = await this.ensureExists(
      this.cyberTwinRepo.attackScenarios,
      id,
      schoolId,
      'Scénario d\'attaque',
    );
    this.validateOwnership(existing, schoolId, 'Scénario d\'attaque');

    const twin = await this.cyberTwinRepo.twins.findById(
      existing.twin_id,
      schoolId,
    );
    if (twin.status === 'RUNNING' || twin.status === 'COMPLETED') {
      throw new GestcrpAttackScenarioError(
        'Impossible de modifier un scénario d\'un jumeau en cours ou terminé',
      );
    }

    return this.cyberTwinRepo.attackScenarios.update(id, schoolId, data);
  }

  async deleteScenario(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Scénario d\'attaque');

    const existing = await this.ensureExists(
      this.cyberTwinRepo.attackScenarios,
      id,
      schoolId,
      'Scénario d\'attaque',
    );
    this.validateOwnership(existing, schoolId, 'Scénario d\'attaque');

    const twin = await this.cyberTwinRepo.twins.findById(
      existing.twin_id,
      schoolId,
    );
    if (twin.status === 'RUNNING' || twin.status === 'COMPLETED') {
      throw new GestcrpAttackScenarioError(
        'Impossible de supprimer un scénario d\'un jumeau en cours ou terminé',
      );
    }

    await this.cyberTwinRepo.attackScenarios.softDelete(id, schoolId);
  }

  // ─── Statistics ──────────────────────────────────────────────────────────

  async getTwinStats(schoolId: string): Promise<{
    total: number;
    byStatus: Record<string, number>;
    bySimulationType: Record<string, number>;
    completedCount: number;
    averageScore: number;
  }> {
    this.validateSchoolId(schoolId);

    const all = await this.cyberTwinRepo.twins.findAll(schoolId, { limit: 1000 });
    const results = await this.cyberTwinRepo.results.findAll(schoolId, { limit: 1000 });

    const byStatus: Record<string, number> = {};
    const bySimulationType: Record<string, number> = {};

    for (const twin of all.data) {
      byStatus[twin.status] = (byStatus[twin.status] ?? 0) + 1;
      bySimulationType[twin.simulation_type] = (bySimulationType[twin.simulation_type] ?? 0) + 1;
    }

    const averageScore = results.total > 0
      ? results.data.reduce((sum, r) => sum + r.score, 0) / results.total
      : 0;

    return {
      total: all.total,
      byStatus,
      bySimulationType,
      completedCount: byStatus['COMPLETED'] ?? 0,
      averageScore,
    };
  }

  async getResultStats(schoolId: string): Promise<{
    total: number;
    successes: number;
    failures: number;
    averageDetectionTime: number;
    averageResponseTime: number;
    averageMitigationTime: number;
  }> {
    this.validateSchoolId(schoolId);

    const all = await this.cyberTwinRepo.results.findAll(schoolId, { limit: 1000 });

    const successes = all.data.filter((r) => r.success).length;

    let totalDetection = 0;
    let totalResponse = 0;
    let totalMitigation = 0;

    for (const result of all.data) {
      totalDetection += result.detection_time;
      totalResponse += result.response_time;
      totalMitigation += result.mitigation_time;
    }

    return {
      total: all.total,
      successes,
      failures: all.total - successes,
      averageDetectionTime: all.total > 0 ? totalDetection / all.total : 0,
      averageResponseTime: all.total > 0 ? totalResponse / all.total : 0,
      averageMitigationTime: all.total > 0 ? totalMitigation / all.total : 0,
    };
  }
}
