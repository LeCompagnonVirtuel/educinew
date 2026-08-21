// Enterprise Platform Service - BenchmarkRunner
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { BenchmarkRunner, BenchmarkRunnerCreate } from '@educi/types';
import { EntBenchmarkRunnerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntBenchmarkRunnerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getBenchmarkRunner(schoolId: string, id: string): Promise<BenchmarkRunner> {
    const item = await this.repo.findBenchmarkRunnerById(schoolId, id);
    if (!item) throw new EntBenchmarkRunnerNotFoundError(id);
    return item;
  }
  async listBenchmarkRunners(schoolId: string, filters?: Record<string, unknown>): Promise<BenchmarkRunner[]> {
    return this.repo.findAllBenchmarkRunners(schoolId, filters);
  }
  async createBenchmarkRunner(schoolId: string, data: BenchmarkRunnerCreate): Promise<BenchmarkRunner> {
    return this.repo.createBenchmarkRunner(schoolId, data);
  }
  async updateBenchmarkRunner(schoolId: string, id: string, data: Partial<BenchmarkRunnerCreate>): Promise<BenchmarkRunner> {
    const existing = await this.repo.findBenchmarkRunnerById(schoolId, id);
    if (!existing) throw new EntBenchmarkRunnerNotFoundError(id);
    return this.repo.updateBenchmarkRunner(schoolId, id, data);
  }
  async deleteBenchmarkRunner(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBenchmarkRunnerById(schoolId, id);
    if (!existing) throw new EntBenchmarkRunnerNotFoundError(id);
    return this.repo.deleteBenchmarkRunner(schoolId, id);
  }
  async countBenchmarkRunners(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBenchmarkRunners(schoolId, filters);
  }
}
