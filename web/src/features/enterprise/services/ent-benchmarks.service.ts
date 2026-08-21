// Enterprise Platform Service - Benchmarks
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntBenchmarkService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getBenchmark(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findBenchmarkById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listBenchmarks(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllBenchmarks(schoolId, filters);
  }
  async createBenchmark(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createBenchmark(schoolId, data);
  }
  async updateBenchmark(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findBenchmarkById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateBenchmark(schoolId, id, data);
  }
  async deleteBenchmark(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBenchmarkById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteBenchmark(schoolId, id);
  }
  async countBenchmarks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBenchmarks(schoolId, filters);
  }
}
