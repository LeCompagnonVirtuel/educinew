// Enterprise Platform Service - BenchmarksComparisons
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntBenchmarkComparisonService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getBenchmarksComparison(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findBenchmarksComparisonById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listBenchmarksComparisons(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllBenchmarksComparisons(schoolId, filters);
  }
  async createBenchmarksComparison(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createBenchmarksComparison(schoolId, data);
  }
  async updateBenchmarksComparison(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findBenchmarksComparisonById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateBenchmarksComparison(schoolId, id, data);
  }
  async deleteBenchmarksComparison(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBenchmarksComparisonById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteBenchmarksComparison(schoolId, id);
  }
  async countBenchmarksComparisons(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBenchmarksComparisons(schoolId, filters);
  }
}
