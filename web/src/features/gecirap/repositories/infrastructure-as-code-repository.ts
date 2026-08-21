import { SupabaseClient } from '@supabase/supabase-js';
import {
  GecirapTemplateNotFoundError,
  GecirapStackNotFoundError,
  GecirapProvisioningError,
  GecirapDriftDetectedError,
  GecirapPolicyViolationError,
} from '@educi/errors';
import {
  GecirapBaseEntity,
  PaginatedResult,
  PaginationParams,
  FilterParams,
  GecirapCrudRepositoryImpl,
} from './base-gecirap-repository';

// ============================================================================
// Entity Interfaces
// ============================================================================

export interface GecirapInfrastructureTemplate extends GecirapBaseEntity {
  name: string;
  description?: string;
  template_type: string;
  provider: string;
  content: Record<string, unknown>;
  version: string;
  is_active: boolean;
  metadata?: Record<string, unknown>;
}

export interface GecirapInfrastructureStack extends GecirapBaseEntity {
  template_id: string;
  name: string;
  description?: string;
  status: string;
  parameters?: Record<string, unknown>;
  outputs?: Record<string, unknown>;
  provisioned_at?: string;
  destroyed_at?: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapProvisioningJob extends GecirapBaseEntity {
  stack_id: string;
  job_type: string;
  status: string;
  started_at?: string;
  completed_at?: string;
  error_message?: string;
  logs?: Record<string, unknown>[];
  metadata?: Record<string, unknown>;
}

export interface GecirapResourceChange extends GecirapBaseEntity {
  stack_id: string;
  resource_type: string;
  resource_name: string;
  change_type: string;
  before_state?: Record<string, unknown>;
  after_state?: Record<string, unknown>;
  changed_at: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapDriftDetection extends GecirapBaseEntity {
  stack_id: string;
  status: string;
  detected_at: string;
  drift_details?: Record<string, unknown>[];
  remediation_suggested?: string;
  resolved_at?: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapInfrastructurePolicy extends GecirapBaseEntity {
  name: string;
  description?: string;
  policy_type: string;
  rules: Record<string, unknown>;
  enforcement_level: string;
  is_active: boolean;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// Repository Implementations
// ============================================================================

export class InfrastructureTemplateRepository extends GecirapCrudRepositoryImpl<GecirapInfrastructureTemplate> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_infrastructure_templates', (msg) => {
      throw new GecirapTemplateNotFoundError(msg);
    });
  }

  async findByProvider(
    provider: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapInfrastructureTemplate>> {
    return this.findAll(schoolId, { ...params, provider });
  }

  async findByName(name: string, schoolId: string): Promise<GecirapInfrastructureTemplate | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('name', name)
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .single();

    if (error) return null;
    return data as GecirapInfrastructureTemplate;
  }
}

export class InfrastructureStackRepository extends GecirapCrudRepositoryImpl<GecirapInfrastructureStack> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_infrastructure_stacks', (msg) => {
      throw new GecirapStackNotFoundError(msg);
    });
  }

  async findByTemplateId(
    templateId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapInfrastructureStack>> {
    return this.findAll(schoolId, { ...params, template_id: templateId });
  }

  async findActive(schoolId: string): Promise<GecirapInfrastructureStack[]> {
    const result = await this.findAll(schoolId, { status: 'active', limit: 200 });
    return result.data;
  }
}

export class ProvisioningJobRepository extends GecirapCrudRepositoryImpl<GecirapProvisioningJob> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_provisioning_jobs', (msg) => {
      throw new GecirapProvisioningError(msg);
    });
  }

  async findByStackId(
    stackId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapProvisioningJob>> {
    return this.findAll(schoolId, { ...params, stack_id: stackId });
  }

  async findRunning(schoolId: string): Promise<GecirapProvisioningJob[]> {
    const result = await this.findAll(schoolId, { status: 'running', limit: 200 });
    return result.data;
  }

  async findFailed(schoolId: string, params: PaginationParams & FilterParams = {}): Promise<PaginatedResult<GecirapProvisioningJob>> {
    return this.findAll(schoolId, { ...params, status: 'failed' });
  }
}

export class ResourceChangeRepository extends GecirapCrudRepositoryImpl<GecirapResourceChange> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_resource_changes', (msg) => {
      throw new GecirapProvisioningError(msg);
    });
  }

  async findByStackId(
    stackId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapResourceChange>> {
    return this.findAll(schoolId, { ...params, stack_id: stackId });
  }

  async findByChangeType(
    changeType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapResourceChange>> {
    return this.findAll(schoolId, { ...params, change_type: changeType });
  }
}

export class DriftDetectionRepository extends GecirapCrudRepositoryImpl<GecirapDriftDetection> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_drift_detections', (msg) => {
      throw new GecirapDriftDetectedError(msg);
    });
  }

  async findByStackId(
    stackId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapDriftDetection>> {
    return this.findAll(schoolId, { ...params, stack_id: stackId });
  }

  async findUnresolved(schoolId: string): Promise<GecirapDriftDetection[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .is('resolved_at', null);

    if (error) {
      throw new GecirapDriftDetectedError(
        `Erreur lors de la récupération des dérives non résolues: ${error.message}`,
      );
    }

    return (data || []) as GecirapDriftDetection[];
  }
}

export class InfrastructurePolicyRepository extends GecirapCrudRepositoryImpl<GecirapInfrastructurePolicy> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_infrastructure_policies', (msg) => {
      throw new GecirapPolicyViolationError(msg);
    });
  }

  async findByPolicyType(
    policyType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapInfrastructurePolicy>> {
    return this.findAll(schoolId, { ...params, policy_type: policyType });
  }

  async findActive(schoolId: string): Promise<GecirapInfrastructurePolicy[]> {
    const result = await this.findAll(schoolId, { is_active: true, limit: 200 });
    return result.data;
  }
}
