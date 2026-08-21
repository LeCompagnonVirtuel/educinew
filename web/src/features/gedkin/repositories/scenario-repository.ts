import type {
  GedkinScenario,
  GedkinScenarioRun,
  GedkinSimulationResult,
  GedkinSensitivityAnalysis,
} from '@educi/types';
import type {
  GedkinCrudRepository,
  GedkinBaseEntity,
  PaginatedResult,
  PaginationParams,
} from './base-gedkin-repository';

export interface GedkinScenarioRepository extends GedkinCrudRepository<GedkinScenario & GedkinBaseEntity> {
  findBySimulationId(simulationId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinScenario & GedkinBaseEntity>>;
  findByType(type: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinScenario & GedkinBaseEntity>>;
}

export interface GedkinScenarioRunRepository extends GedkinCrudRepository<GedkinScenarioRun & GedkinBaseEntity> {
  findByScenarioId(scenarioId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinScenarioRun & GedkinBaseEntity>>;
  findByStatus(status: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinScenarioRun & GedkinBaseEntity>>;
}

export interface GedkinSimulationResultRepository extends GedkinCrudRepository<GedkinSimulationResult & GedkinBaseEntity> {
  findByRunId(runId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinSimulationResult & GedkinBaseEntity>>;
}

export interface GedkinSensitivityAnalysisRepository extends GedkinCrudRepository<GedkinSensitivityAnalysis & GedkinBaseEntity> {
  findBySimulationId(simulationId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GedkinSensitivityAnalysis & GedkinBaseEntity>>;
}