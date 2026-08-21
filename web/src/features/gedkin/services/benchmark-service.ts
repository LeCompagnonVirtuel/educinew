import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createBenchmarkSchema,
  updateBenchmarkSchema,
  createSDGAlignmentSchema,
  updateSDGAlignmentSchema,
} from '../validators/gedkin';
import type {
  GedkinBenchmark,
  GedkinSDGAlignment,
} from '@educi/types';
import type {
  GedkinBenchmarkRepository,
  GedkinSDGAlignmentRepository,
} from '../repositories/benchmark-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Benchmark Service
// ============================================================================

export class BenchmarkService extends BaseGedkinService {
  constructor(
    private readonly benchmarkRepo: GedkinBenchmarkRepository,
    private readonly sdgRepo: GedkinSDGAlignmentRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  // ─── Benchmarks ──────────────────────────────────────────────────────────

  async listBenchmarks(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinBenchmark>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.benchmarkRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getBenchmark(schoolId: string, id: string): Promise<GedkinBenchmark> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Benchmark');
    return this.ensureExists(this.benchmarkRepo, id, schoolId, 'Benchmark');
  }

  async createBenchmark(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinBenchmark> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'description', 'indicators', 'benchmarks', 'period'], 'Benchmark');

    const validated = this.validateSchema(createBenchmarkSchema, data, 'Benchmark');

    return this.benchmarkRepo.create(
      {
        name: validated.name,
        description: validated.description,
        indicators: validated.indicators,
        benchmarks: validated.benchmarks,
        period: validated.period,
      },
      schoolId,
    );
  }

  async updateBenchmark(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinBenchmark> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Benchmark');

    const existing = await this.ensureExists(this.benchmarkRepo, id, schoolId, 'Benchmark');
    this.validateOwnership(existing, schoolId, 'Benchmark');

    const validated = this.validateSchema(updateBenchmarkSchema, data, 'Benchmark');
    return this.benchmarkRepo.update(id, schoolId, validated);
  }

  async deleteBenchmark(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Benchmark');

    const existing = await this.ensureExists(this.benchmarkRepo, id, schoolId, 'Benchmark');
    this.validateOwnership(existing, schoolId, 'Benchmark');

    await this.benchmarkRepo.softDelete(id, schoolId);
  }

  async listByPeriod(
    schoolId: string,
    period: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinBenchmark>> {
    this.validateSchoolId(schoolId);
    return this.benchmarkRepo.findByPeriod(period, schoolId, this.validatePagination(params));
  }

  // ─── SDG Alignment ───────────────────────────────────────────────────────

  async listSDGAlignments(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinSDGAlignment>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.sdgRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getSDGAlignment(schoolId: string, id: string): Promise<GedkinSDGAlignment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Alignement SDG');
    return this.ensureExists(this.sdgRepo, id, schoolId, 'Alignement SDG');
  }

  async createSDGAlignment(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinSDGAlignment> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['sdgNumber', 'sdgName', 'indicators', 'alignmentScore', 'period'], 'Alignement SDG');

    const validated = this.validateSchema(createSDGAlignmentSchema, data, 'Alignement SDG');
    this.validateRange(validated.sdgNumber, 1, 17, 'sdgNumber', 'Alignement SDG');
    this.validateRange(validated.alignmentScore, 0, 1, 'alignmentScore', 'Alignement SDG');

    return this.sdgRepo.create(
      {
        sdgNumber: validated.sdgNumber,
        sdgName: validated.sdgName,
        indicators: validated.indicators,
        alignmentScore: validated.alignmentScore,
        period: validated.period,
      },
      schoolId,
    );
  }

  async updateSDGAlignment(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinSDGAlignment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Alignement SDG');

    const existing = await this.ensureExists(this.sdgRepo, id, schoolId, 'Alignement SDG');
    this.validateOwnership(existing, schoolId, 'Alignement SDG');

    const validated = this.validateSchema(updateSDGAlignmentSchema, data, 'Alignement SDG');
    return this.sdgRepo.update(id, schoolId, validated);
  }

  async deleteSDGAlignment(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Alignement SDG');

    const existing = await this.ensureExists(this.sdgRepo, id, schoolId, 'Alignement SDG');
    this.validateOwnership(existing, schoolId, 'Alignement SDG');

    await this.sdgRepo.softDelete(id, schoolId);
  }

  async listBySDGNumber(
    schoolId: string,
    sdgNumber: number,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinSDGAlignment>> {
    this.validateSchoolId(schoolId);
    this.validateRange(sdgNumber, 1, 17, 'sdgNumber', 'Alignement SDG');
    return this.sdgRepo.findBySDGNumber(sdgNumber, schoolId, this.validatePagination(params));
  }

  async getBenchmarkStats(
    schoolId: string,
  ): Promise<{
    totalBenchmarks: number;
    totalSDGAlignments: number;
    averageAlignmentScore: number;
    bySDG: Record<number, number>;
  }> {
    this.validateSchoolId(schoolId);

    const benchmarks = await this.benchmarkRepo.findAll(schoolId, { limit: 1000 });
    const sdgAlignments = await this.sdgRepo.findAll(schoolId, { limit: 1000 });

    const totalAlignmentScore = sdgAlignments.data.reduce((sum, alignment) => sum + alignment.alignmentScore, 0);
    
    const bySDG: Record<number, number> = {};
    for (const alignment of sdgAlignments.data) {
      bySDG[alignment.sdgNumber] = (bySDG[alignment.sdgNumber] ?? 0) + 1;
    }

    return {
      totalBenchmarks: benchmarks.total,
      totalSDGAlignments: sdgAlignments.total,
      averageAlignmentScore: sdgAlignments.total > 0 ? totalAlignmentScore / sdgAlignments.total : 0,
      bySDG,
    };
  }
}