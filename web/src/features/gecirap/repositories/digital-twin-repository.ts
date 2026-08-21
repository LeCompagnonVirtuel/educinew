import { SupabaseClient } from '@supabase/supabase-js';
import {
  GecirapTwinNotFoundError,
  GecirapTwinSimulationError,
  GecirapTwinScenarioError,
  GecirapTwinSyncError,
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

export interface GecirapInfrastructureTwin extends GecirapBaseEntity {
  name: string;
  description?: string;
  twin_type: string;
  resource_type: string;
  resource_id: string;
  state: Record<string, unknown>;
  status: string;
  last_synced_at?: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapTwinSimulation extends GecirapBaseEntity {
  twin_id: string;
  simulation_name: string;
  simulation_type: string;
  parameters: Record<string, unknown>;
  status: string;
  started_at?: string;
  completed_at?: string;
  error_message?: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapTwinScenario extends GecirapBaseEntity {
  twin_id: string;
  scenario_name: string;
  description?: string;
  scenario_type: string;
  variables: Record<string, unknown>;
  is_default: boolean;
  metadata?: Record<string, unknown>;
}

export interface GecirapTwinResult extends GecirapBaseEntity {
  simulation_id: string;
  scenario_id?: string;
  result_data: Record<string, unknown>;
  metrics?: Record<string, unknown>;
  insights?: string[];
  generated_at: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapTwinSync extends GecirapBaseEntity {
  twin_id: string;
  sync_type: string;
  status: string;
  started_at: string;
  completed_at?: string;
  items_synced: number;
  error_message?: string;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// Repository Implementations
// ============================================================================

export class InfrastructureTwinRepository extends GecirapCrudRepositoryImpl<GecirapInfrastructureTwin> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_infrastructure_twins', (msg) => {
      throw new GecirapTwinNotFoundError(msg);
    });
  }

  async findByResource(
    resourceType: string,
    resourceId: string,
    schoolId: string,
  ): Promise<GecirapInfrastructureTwin | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('resource_type', resourceType)
      .eq('resource_id', resourceId)
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .single();

    if (error) return null;
    return data as GecirapInfrastructureTwin;
  }

  async findByTwinType(
    twinType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapInfrastructureTwin>> {
    return this.findAll(schoolId, { ...params, twin_type: twinType });
  }

  async findActive(schoolId: string): Promise<GecirapInfrastructureTwin[]> {
    const result = await this.findAll(schoolId, { status: 'active', limit: 200 });
    return result.data;
  }
}

export class TwinSimulationRepository extends GecirapCrudRepositoryImpl<GecirapTwinSimulation> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_twin_simulations', (msg) => {
      throw new GecirapTwinSimulationError(msg);
    });
  }

  async findByTwinId(
    twinId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapTwinSimulation>> {
    return this.findAll(schoolId, { ...params, twin_id: twinId });
  }

  async findRunning(schoolId: string): Promise<GecirapTwinSimulation[]> {
    const result = await this.findAll(schoolId, { status: 'running', limit: 200 });
    return result.data;
  }

  async findFailed(schoolId: string, params: PaginationParams & FilterParams = {}): Promise<PaginatedResult<GecirapTwinSimulation>> {
    return this.findAll(schoolId, { ...params, status: 'failed' });
  }
}

export class TwinScenarioRepository extends GecirapCrudRepositoryImpl<GecirapTwinScenario> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_twin_scenarios', (msg) => {
      throw new GecirapTwinScenarioError(msg);
    });
  }

  async findByTwinId(
    twinId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapTwinScenario>> {
    return this.findAll(schoolId, { ...params, twin_id: twinId });
  }

  async findByScenarioType(
    scenarioType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapTwinScenario>> {
    return this.findAll(schoolId, { ...params, scenario_type: scenarioType });
  }

  async findDefaults(schoolId: string): Promise<GecirapTwinScenario[]> {
    const result = await this.findAll(schoolId, { is_default: true, limit: 200 });
    return result.data;
  }
}

export class TwinResultRepository extends GecirapCrudRepositoryImpl<GecirapTwinResult> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_twin_results', (msg) => {
      throw new GecirapTwinSimulationError(msg);
    });
  }

  async findBySimulationId(
    simulationId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapTwinResult>> {
    return this.findAll(schoolId, { ...params, simulation_id: simulationId });
  }

  async findByScenarioId(
    scenarioId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapTwinResult>> {
    return this.findAll(schoolId, { ...params, scenario_id: scenarioId });
  }

  async findLatest(simulationId: string, schoolId: string): Promise<GecirapTwinResult | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('simulation_id', simulationId)
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('generated_at', { ascending: false })
      .limit(1)
      .single();

    if (error) return null;
    return data as GecirapTwinResult;
  }
}

export class TwinSyncRepository extends GecirapCrudRepositoryImpl<GecirapTwinSync> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_twin_syncs', (msg) => {
      throw new GecirapTwinSyncError(msg);
    });
  }

  async findByTwinId(
    twinId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapTwinSync>> {
    return this.findAll(schoolId, { ...params, twin_id: twinId });
  }

  async findRunning(schoolId: string): Promise<GecirapTwinSync[]> {
    const result = await this.findAll(schoolId, { status: 'running', limit: 200 });
    return result.data;
  }

  async findFailed(schoolId: string, params: PaginationParams & FilterParams = {}): Promise<PaginatedResult<GecirapTwinSync>> {
    return this.findAll(schoolId, { ...params, status: 'failed' });
  }

  async findLatest(twinId: string, schoolId: string): Promise<GecirapTwinSync | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('twin_id', twinId)
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('started_at', { ascending: false })
      .limit(1)
      .single();

    if (error) return null;
    return data as GecirapTwinSync;
  }
}
