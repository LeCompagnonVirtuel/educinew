// Enterprise Platform Service - PerformanceBenchmark
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PerformanceBenchmark, PerformanceBenchmarkCreate } from '@educi/types';
import { EntPerformanceBenchmarkNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPerformanceBenchmarkService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPerformanceBenchmark(schoolId: string, id: string): Promise<PerformanceBenchmark> {
    const item = await this.repo.findPerformanceBenchmarkById(schoolId, id);
    if (!item) throw new EntPerformanceBenchmarkNotFoundError(id);
    return item;
  }
  async listPerformanceBenchmarks(schoolId: string, filters?: Record<string, unknown>): Promise<PerformanceBenchmark[]> {
    return this.repo.findAllPerformanceBenchmarks(schoolId, filters);
  }
  async createPerformanceBenchmark(schoolId: string, data: PerformanceBenchmarkCreate): Promise<PerformanceBenchmark> {
    return this.repo.createPerformanceBenchmark(schoolId, data);
  }
  async updatePerformanceBenchmark(schoolId: string, id: string, data: Partial<PerformanceBenchmarkCreate>): Promise<PerformanceBenchmark> {
    const existing = await this.repo.findPerformanceBenchmarkById(schoolId, id);
    if (!existing) throw new EntPerformanceBenchmarkNotFoundError(id);
    return this.repo.updatePerformanceBenchmark(schoolId, id, data);
  }
  async deletePerformanceBenchmark(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPerformanceBenchmarkById(schoolId, id);
    if (!existing) throw new EntPerformanceBenchmarkNotFoundError(id);
    return this.repo.deletePerformanceBenchmark(schoolId, id);
  }
  async countPerformanceBenchmarks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPerformanceBenchmarks(schoolId, filters);
  }
}
