import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createDatasetSchema,
  updateDatasetSchema,
} from '../validators/gedkin';
import type {
  GedkinDataset_,
} from '@educi/types';
import type {
  GedkinDatasetRepository,
} from '../repositories/dataset-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Dataset Service
// ============================================================================

export class DatasetService extends BaseGedkinService {
  constructor(
    private readonly datasetRepo: GedkinDatasetRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  async listDatasets(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinDataset_>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.datasetRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getDataset(schoolId: string, id: string): Promise<GedkinDataset_> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Dataset');
    return this.ensureExists(this.datasetRepo, id, schoolId, 'Dataset');
  }

  async createDataset(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinDataset_> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'description', 'type', 'schema', 'size', 'rows', 'license', 'tags', 'version'], 'Dataset');

    const validated = this.validateSchema(createDatasetSchema, data, 'Dataset');

    return this.datasetRepo.create(
      {
        name: validated.name,
        description: validated.description,
        type: validated.type,
        schema: validated.schema,
        size: validated.size,
        rows: validated.rows,
        license: validated.license,
        tags: validated.tags,
        version: validated.version,
      },
      schoolId,
    );
  }

  async updateDataset(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinDataset_> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Dataset');

    const existing = await this.ensureExists(this.datasetRepo, id, schoolId, 'Dataset');
    this.validateOwnership(existing, schoolId, 'Dataset');

    const validated = this.validateSchema(updateDatasetSchema, data, 'Dataset');
    return this.datasetRepo.update(id, schoolId, validated);
  }

  async deleteDataset(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Dataset');

    const existing = await this.ensureExists(this.datasetRepo, id, schoolId, 'Dataset');
    this.validateOwnership(existing, schoolId, 'Dataset');

    await this.datasetRepo.softDelete(id, schoolId);
  }

  async listByType(
    schoolId: string,
    type: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinDataset_>> {
    this.validateSchoolId(schoolId);
    return this.datasetRepo.findByType(type, schoolId, this.validatePagination(params));
  }

  async listByTags(
    schoolId: string,
    tags: string[],
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinDataset_>> {
    this.validateSchoolId(schoolId);
    return this.datasetRepo.findByTags(tags, schoolId, this.validatePagination(params));
  }

  async getDatasetStats(
    schoolId: string,
  ): Promise<{
    totalDatasets: number;
    totalSize: number;
    totalRows: number;
    byType: Record<string, number>;
    byLicense: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);
    const datasets = await this.datasetRepo.findAll(schoolId, { limit: 1000 });

    const byType: Record<string, number> = {};
    const byLicense: Record<string, number> = {};
    let totalSize = 0;
    let totalRows = 0;

    for (const dataset of datasets.data) {
      byType[dataset.type] = (byType[dataset.type] ?? 0) + 1;
      byLicense[dataset.license] = (byLicense[dataset.license] ?? 0) + 1;
      totalSize += dataset.size;
      totalRows += dataset.rows;
    }

    return {
      totalDatasets: datasets.total,
      totalSize,
      totalRows,
      byType,
      byLicense,
    };
  }
}