import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createPolicySchema,
  updatePolicySchema,
  createPolicySimulationSchema,
  updatePolicySimulationSchema,
} from '../validators/gedkin';
import type {
  GedkinPolicy,
  GedkinPolicySimulation,
} from '@educi/types';
import type {
  GedkinPolicyRepository,
  GedkinPolicySimulationRepository,
} from '../repositories/policy-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Policy Service
// ============================================================================

export class PolicyService extends BaseGedkinService {
  constructor(
    private readonly policyRepo: GedkinPolicyRepository,
    private readonly simulationRepo: GedkinPolicySimulationRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  // ─── Policies ────────────────────────────────────────────────────────────

  async listPolicies(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinPolicy>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.policyRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getPolicy(schoolId: string, id: string): Promise<GedkinPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique');
    return this.ensureExists(this.policyRepo, id, schoolId, 'Politique');
  }

  async createPolicy(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinPolicy> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'description', 'status', 'category', 'effectiveDate', 'expiryDate', 'content'], 'Politique');

    const validated = this.validateSchema(createPolicySchema, data, 'Politique');

    return this.policyRepo.create(
      {
        name: validated.name,
        description: validated.description,
        status: validated.status,
        category: validated.category,
        effectiveDate: validated.effectiveDate,
        expiryDate: validated.expiryDate,
        content: validated.content,
      },
      schoolId,
    );
  }

  async updatePolicy(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique');

    const existing = await this.ensureExists(this.policyRepo, id, schoolId, 'Politique');
    this.validateOwnership(existing, schoolId, 'Politique');

    const validated = this.validateSchema(updatePolicySchema, data, 'Politique');
    return this.policyRepo.update(id, schoolId, validated);
  }

  async deletePolicy(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique');

    const existing = await this.ensureExists(this.policyRepo, id, schoolId, 'Politique');
    this.validateOwnership(existing, schoolId, 'Politique');

    await this.policyRepo.softDelete(id, schoolId);
  }

  async listByStatus(
    schoolId: string,
    status: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinPolicy>> {
    this.validateSchoolId(schoolId);
    return this.policyRepo.findByStatus(status, schoolId, this.validatePagination(params));
  }

  async listByCategory(
    schoolId: string,
    category: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinPolicy>> {
    this.validateSchoolId(schoolId);
    return this.policyRepo.findByCategory(category, schoolId, this.validatePagination(params));
  }

  // ─── Policy Simulations ──────────────────────────────────────────────────

  async listSimulations(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinPolicySimulation>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.simulationRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getSimulation(schoolId: string, id: string): Promise<GedkinPolicySimulation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Simulation politique');
    return this.ensureExists(this.simulationRepo, id, schoolId, 'Simulation politique');
  }

  async createSimulation(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinPolicySimulation> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['policyId', 'parameters', 'results', 'confidence'], 'Simulation politique');

    const validated = this.validateSchema(createPolicySimulationSchema, data, 'Simulation politique');
    this.validateRange(validated.confidence, 0, 1, 'confidence', 'Simulation politique');

    return this.simulationRepo.create(
      {
        policyId: validated.policyId,
        parameters: validated.parameters,
        results: validated.results,
        confidence: validated.confidence,
      },
      schoolId,
    );
  }

  async updateSimulation(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinPolicySimulation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Simulation politique');

    const existing = await this.ensureExists(this.simulationRepo, id, schoolId, 'Simulation politique');
    this.validateOwnership(existing, schoolId, 'Simulation politique');

    const validated = this.validateSchema(updatePolicySimulationSchema, data, 'Simulation politique');
    return this.simulationRepo.update(id, schoolId, validated);
  }

  async deleteSimulation(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Simulation politique');

    const existing = await this.ensureExists(this.simulationRepo, id, schoolId, 'Simulation politique');
    this.validateOwnership(existing, schoolId, 'Simulation politique');

    await this.simulationRepo.softDelete(id, schoolId);
  }

  async listByPolicy(
    schoolId: string,
    policyId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinPolicySimulation>> {
    this.validateSchoolId(schoolId);
    return this.simulationRepo.findByPolicyId(policyId, schoolId, this.validatePagination(params));
  }

  async getPolicyStats(
    schoolId: string,
  ): Promise<{
    totalPolicies: number;
    totalSimulations: number;
    byStatus: Record<string, number>;
    byCategory: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);

    const policies = await this.policyRepo.findAll(schoolId, { limit: 1000 });
    const simulations = await this.simulationRepo.findAll(schoolId, { limit: 1000 });

    const byStatus: Record<string, number> = {};
    for (const policy of policies.data) {
      byStatus[policy.status] = (byStatus[policy.status] ?? 0) + 1;
    }

    const byCategory: Record<string, number> = {};
    for (const policy of policies.data) {
      byCategory[policy.category] = (byCategory[policy.category] ?? 0) + 1;
    }

    return {
      totalPolicies: policies.total,
      totalSimulations: simulations.total,
      byStatus,
      byCategory,
    };
  }
}