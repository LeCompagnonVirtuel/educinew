import {
  GecirapProvisioningError,
  GecirapProvisioningFailedError,
  GecirapTemplateNotFoundError,
  GecirapStackNotFoundError,
  GecirapPolicyViolationError,
} from '@educi/errors';
import {
  createInfrastructureTemplateSchema,
  updateInfrastructureTemplateSchema,
  createInfrastructureStackSchema,
  updateInfrastructureStackSchema,
  createProvisioningJobSchema,
  updateProvisioningJobSchema,
  createResourceChangeSchema,
  createInfrastructurePolicySchema,
  updateInfrastructurePolicySchema,
} from '../validators/infrastructure-as-code';
import type {
  GecirapInfrastructureTemplate,
  GecirapInfrastructureStack,
  GecirapProvisioningJob,
  GecirapResourceChange,
  GecirapInfrastructurePolicy,
  InfrastructureTemplateRepository,
  InfrastructureStackRepository,
  ProvisioningJobRepository,
  ResourceChangeRepository,
  InfrastructurePolicyRepository,
} from '../repositories/infrastructure-as-code-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Provisioning Service
// ============================================================================

export class ProvisioningService extends BaseGecirapService {
  constructor(
    private readonly templateRepo: InfrastructureTemplateRepository,
    private readonly stackRepo: InfrastructureStackRepository,
    private readonly jobRepo: ProvisioningJobRepository,
    private readonly changeRepo: ResourceChangeRepository,
    private readonly policyRepo: InfrastructurePolicyRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── Templates ───────────────────────────────────────────────────────────

  async listTemplates(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapInfrastructureTemplate>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.templateRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getTemplate(schoolId: string, id: string): Promise<GecirapInfrastructureTemplate> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Modèle IaC');
    return this.ensureExists(this.templateRepo, id, schoolId, 'Modèle IaC');
  }

  async createTemplate(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapInfrastructureTemplate> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'template_type', 'provider', 'content', 'version'], 'Modèle IaC');

    const validated = this.validateSchema(createInfrastructureTemplateSchema, data, 'Modèle IaC');

    const existing = await this.templateRepo.findByName(validated.name, schoolId);
    if (existing) {
      throw new GecirapTemplateNotFoundError(
        `Un modèle "${validated.name}" existe déjà`,
      );
    }

    return this.templateRepo.create(
      {
        name: validated.name,
        description: validated.description,
        template_type: validated.template_type,
        provider: validated.provider,
        content: validated.content,
        version: validated.version,
        is_active: validated.is_active ?? true,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateTemplate(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapInfrastructureTemplate> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Modèle IaC');

    const existing = await this.ensureExists(this.templateRepo, id, schoolId, 'Modèle IaC');
    this.validateOwnership(existing, schoolId, 'Modèle IaC');

    const validated = this.validateSchema(updateInfrastructureTemplateSchema, data, 'Modèle IaC');
    return this.templateRepo.update(id, schoolId, validated);
  }

  async deleteTemplate(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Modèle IaC');

    const existing = await this.ensureExists(this.templateRepo, id, schoolId, 'Modèle IaC');
    this.validateOwnership(existing, schoolId, 'Modèle IaC');

    const stacks = await this.stackRepo.findByTemplateId(id, schoolId, { limit: 1 });
    if (stacks.total > 0) {
      throw new GecirapTemplateNotFoundError(
        'Impossible de supprimer un modèle avec des stacks associées',
      );
    }

    await this.templateRepo.softDelete(id, schoolId);
  }

  // ─── Stacks ──────────────────────────────────────────────────────────────

  async listStacks(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapInfrastructureStack>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.stackRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getStack(schoolId: string, id: string): Promise<GecirapInfrastructureStack> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Stack IaC');
    return this.ensureExists(this.stackRepo, id, schoolId, 'Stack IaC');
  }

  async createStack(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapInfrastructureStack> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['template_id', 'name'], 'Stack IaC');

    const validated = this.validateSchema(createInfrastructureStackSchema, data, 'Stack IaC');

    await this.ensureExists(this.templateRepo, validated.templateId, schoolId, 'Modèle IaC');

    return this.stackRepo.create(
      {
        template_id: validated.templateId,
        name: validated.name,
        description: validated.description,
        status: validated.status ?? 'pending',
        parameters: validated.parameters,
        outputs: validated.outputs,
        provisioned_at: validated.provisioned_at,
        destroyed_at: validated.destroyed_at,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateStack(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapInfrastructureStack> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Stack IaC');

    const existing = await this.ensureExists(this.stackRepo, id, schoolId, 'Stack IaC');
    this.validateOwnership(existing, schoolId, 'Stack IaC');

    const validated = this.validateSchema(updateInfrastructureStackSchema, data, 'Stack IaC');
    return this.stackRepo.update(id, schoolId, validated);
  }

  async deleteStack(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Stack IaC');

    const existing = await this.ensureExists(this.stackRepo, id, schoolId, 'Stack IaC');
    this.validateOwnership(existing, schoolId, 'Stack IaC');

    await this.stackRepo.softDelete(id, schoolId);
  }

  async listActiveStacks(schoolId: string): Promise<GecirapInfrastructureStack[]> {
    this.validateSchoolId(schoolId);
    return this.stackRepo.findActive(schoolId);
  }

  // ─── Provisioning Jobs ───────────────────────────────────────────────────

  async listJobs(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapProvisioningJob>> {
    this.validateSchoolId(schoolId);
    return this.jobRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getJob(schoolId: string, id: string): Promise<GecirapProvisioningJob> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Job provisionnement');
    return this.ensureExists(this.jobRepo, id, schoolId, 'Job provisionnement');
  }

  async createJob(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapProvisioningJob> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['stack_id', 'job_type'], 'Job provisionnement');

    const validated = this.validateSchema(createProvisioningJobSchema, data, 'Job provisionnement');

    await this.ensureExists(this.stackRepo, validated.stackId, schoolId, 'Stack IaC');

    return this.jobRepo.create(
      {
        stack_id: validated.stackId,
        job_type: validated.job_type,
        status: validated.status ?? 'pending',
        started_at: new Date().toISOString(),
        completed_at: validated.completed_at,
        error_message: validated.error_message,
        logs: validated.logs ?? [],
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateJob(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapProvisioningJob> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Job provisionnement');

    const existing = await this.ensureExists(this.jobRepo, id, schoolId, 'Job provisionnement');
    this.validateOwnership(existing, schoolId, 'Job provisionnement');

    const validated = this.validateSchema(updateProvisioningJobSchema, data, 'Job provisionnement');
    return this.jobRepo.update(id, schoolId, validated);
  }

  async listRunningJobs(schoolId: string): Promise<GecirapProvisioningJob[]> {
    this.validateSchoolId(schoolId);
    return this.jobRepo.findRunning(schoolId);
  }

  async listFailedJobs(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapProvisioningJob>> {
    this.validateSchoolId(schoolId);
    return this.jobRepo.findFailed(schoolId, this.validatePagination(params));
  }

  async listJobsByStack(
    schoolId: string,
    stackId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapProvisioningJob>> {
    this.validateSchoolId(schoolId);
    this.validateId(stackId, 'Stack IaC');
    return this.jobRepo.findByStackId(stackId, schoolId, this.validatePagination(params));
  }

  // ─── Resource Changes ────────────────────────────────────────────────────

  async listResourceChanges(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapResourceChange>> {
    this.validateSchoolId(schoolId);
    return this.changeRepo.findAll(schoolId, this.validatePagination(params));
  }

  async createResourceChange(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapResourceChange> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['stack_id', 'resource_type', 'resource_name', 'change_type'], 'Changement ressource');

    const validated = this.validateSchema(createResourceChangeSchema, data, 'Changement ressource');

    return this.changeRepo.create(
      {
        stack_id: validated.stack_id,
        resource_type: validated.resource_type,
        resource_name: validated.resource_name,
        change_type: validated.change_type,
        before_state: validated.before_state,
        after_state: validated.after_state,
        changed_at: new Date().toISOString(),
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async listChangesByStack(
    schoolId: string,
    stackId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapResourceChange>> {
    this.validateSchoolId(schoolId);
    this.validateId(stackId, 'Stack IaC');
    return this.changeRepo.findByStackId(stackId, schoolId, this.validatePagination(params));
  }

  // ─── Policies ────────────────────────────────────────────────────────────

  async listPolicies(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapInfrastructurePolicy>> {
    this.validateSchoolId(schoolId);
    return this.policyRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getPolicy(schoolId: string, id: string): Promise<GecirapInfrastructurePolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique infrastructure');
    return this.ensureExists(this.policyRepo, id, schoolId, 'Politique infrastructure');
  }

  async createPolicy(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapInfrastructurePolicy> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'policy_type', 'rules', 'enforcement_level'], 'Politique infrastructure');

    const validated = this.validateSchema(createInfrastructurePolicySchema, data, 'Politique infrastructure');

    return this.policyRepo.create(
      {
        name: validated.name,
        description: validated.description,
        policy_type: validated.policy_type,
        rules: validated.rules,
        enforcement_level: validated.enforcement_level,
        is_active: validated.is_active ?? true,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updatePolicy(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapInfrastructurePolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique infrastructure');

    const existing = await this.ensureExists(this.policyRepo, id, schoolId, 'Politique infrastructure');
    this.validateOwnership(existing, schoolId, 'Politique infrastructure');

    const validated = this.validateSchema(updateInfrastructurePolicySchema, data, 'Politique infrastructure');
    return this.policyRepo.update(id, schoolId, validated);
  }

  async deletePolicy(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique infrastructure');

    const existing = await this.ensureExists(this.policyRepo, id, schoolId, 'Politique infrastructure');
    this.validateOwnership(existing, schoolId, 'Politique infrastructure');

    await this.policyRepo.softDelete(id, schoolId);
  }

  async listActivePolicies(schoolId: string): Promise<GecirapInfrastructurePolicy[]> {
    this.validateSchoolId(schoolId);
    return this.policyRepo.findActive(schoolId);
  }

  async validateAgainstPolicies(
    schoolId: string,
    stackId: string,
  ): Promise<{ valid: boolean; violations: string[] }> {
    this.validateSchoolId(schoolId);
    this.validateId(stackId, 'Stack IaC');

    await this.ensureExists(this.stackRepo, stackId, schoolId, 'Stack IaC');
    const activePolicies = await this.policyRepo.findActive(schoolId);

    const violations: string[] = [];
    for (const policy of activePolicies) {
      if (policy.enforcement_level === 'mandatory') {
        violations.push(`Politique "${policy.name}" non vérifiée (mandatory)`);
      }
    }

    return {
      valid: violations.length === 0,
      violations,
    };
  }
}
