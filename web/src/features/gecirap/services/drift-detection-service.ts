import {
  GecirapDriftDetectedError,
} from '@educi/errors';
import {
  createDriftDetectionSchema,
  updateDriftDetectionSchema,
} from '../validators/infrastructure-as-code';
import type {
  GecirapDriftDetection,
  DriftDetectionRepository,
  InfrastructureStackRepository,
} from '../repositories/infrastructure-as-code-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Drift Detection Service
// ============================================================================

export class DriftDetectionService extends BaseGecirapService {
  constructor(
    private readonly driftRepo: DriftDetectionRepository,
    private readonly stackRepo: InfrastructureStackRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  async listDetections(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapDriftDetection>> {
    this.validateSchoolId(schoolId);
    return this.driftRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getDetection(schoolId: string, id: string): Promise<GecirapDriftDetection> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Détection de dérive');
    return this.ensureExists(this.driftRepo, id, schoolId, 'Détection de dérive');
  }

  async createDetection(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapDriftDetection> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['stack_id', 'status', 'detected_at'], 'Détection de dérive');

    const validated = this.validateSchema(createDriftDetectionSchema, data, 'Détection de dérive');

    await this.ensureExists(this.stackRepo, validated.stack_id, schoolId, 'Stack IaC');

    if (validated.status === 'drifted') {
      throw new GecirapDriftDetectedError(
        `Dérive détectée pour la stack ${validated.stack_id}`,
      );
    }

    return this.driftRepo.create(
      {
        stack_id: validated.stack_id,
        status: validated.status,
        detected_at: new Date().toISOString(),
        drift_details: validated.drift_details ?? [],
        remediation_suggested: validated.remediation_suggested,
        resolved_at: validated.resolved_at,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateDetection(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapDriftDetection> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Détection de dérive');

    const existing = await this.ensureExists(this.driftRepo, id, schoolId, 'Détection de dérive');
    this.validateOwnership(existing, schoolId, 'Détection de dérive');

    const validated = this.validateSchema(updateDriftDetectionSchema, data, 'Détection de dérive');
    return this.driftRepo.update(id, schoolId, validated);
  }

  async deleteDetection(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Détection de dérive');

    const existing = await this.ensureExists(this.driftRepo, id, schoolId, 'Détection de dérive');
    this.validateOwnership(existing, schoolId, 'Détection de dérive');

    await this.driftRepo.softDelete(id, schoolId);
  }

  async listUnresolved(schoolId: string): Promise<GecirapDriftDetection[]> {
    this.validateSchoolId(schoolId);
    return this.driftRepo.findUnresolved(schoolId);
  }

  async listByStack(
    schoolId: string,
    stackId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapDriftDetection>> {
    this.validateSchoolId(schoolId);
    this.validateId(stackId, 'Stack IaC');
    return this.driftRepo.findByStackId(stackId, schoolId, this.validatePagination(params));
  }

  async resolveDrift(
    schoolId: string,
    id: string,
  ): Promise<GecirapDriftDetection> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Détection de dérive');

    const existing = await this.ensureExists(this.driftRepo, id, schoolId, 'Détection de dérive');
    this.validateOwnership(existing, schoolId, 'Détection de dérive');

    if (existing.resolved_at) {
      throw new GecirapDriftDetectedError('Cette dérive est déjà résolue');
    }

    return this.driftRepo.update(id, schoolId, {
      status: 'resolved',
      resolved_at: new Date().toISOString(),
    });
  }

  async getDriftOverview(schoolId: string): Promise<{
    total: number;
    unresolved: number;
    resolved: number;
    byStatus: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);
    const all = await this.driftRepo.findAll(schoolId, { limit: 500 });

    const byStatus: Record<string, number> = {};
    let unresolved = 0;

    for (const detection of all.data) {
      byStatus[detection.status] = (byStatus[detection.status] ?? 0) + 1;
      if (!detection.resolved_at) {
        unresolved++;
      }
    }

    return {
      total: all.total,
      unresolved,
      resolved: all.total - unresolved,
      byStatus,
    };
  }
}
