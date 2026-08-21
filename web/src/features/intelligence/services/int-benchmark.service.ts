// Intelligence Platform Service - Benchmark
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Benchmark, BenchmarkCreate } from '@educi/types';
import { IntBenchmarkNotFoundError } from '@educi/errors';
import { createIntelligenceRepository, IntelligenceRepository } from '../repositories/intelligence.repository';

export class IntBenchmarkService {
  private repo: IntelligenceRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getBenchmark(schoolId: string, id: string): Promise<Benchmark> {
    const item = await this.repo.getBenchmark(id, schoolId);
    if (!item) throw new IntBenchmarkNotFoundError(id);
    return item;
  }
  async listBenchmarks(schoolId: string, filters?: Record<string, unknown>): Promise<Benchmark[]> {
    return this.repo.listBenchmarks(schoolId, filters);
  }
  async createBenchmark(schoolId: string, data: BenchmarkCreate): Promise<Benchmark> {
    return this.repo.createBenchmark({ ...data, school_id: schoolId });
  }
  async updateBenchmark(schoolId: string, id: string, data: Partial<BenchmarkCreate>): Promise<Benchmark> {
    const existing = await this.repo.getBenchmark(id, schoolId);
    if (!existing) throw new IntBenchmarkNotFoundError(id);
    return this.repo.updateBenchmark(id, schoolId, data);
  }
  async deleteBenchmark(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBenchmark(id, schoolId);
    if (!existing) throw new IntBenchmarkNotFoundError(id);
    return this.repo.deleteBenchmark(id, schoolId);
  }
}
