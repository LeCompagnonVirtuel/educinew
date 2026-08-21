// Enterprise Platform Service - ScalabilityBenchmark
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ScalabilityBenchmark, ScalabilityBenchmarkCreate } from '@educi/types';
import { EntScalabilityBenchmarkNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntScalabilityBenchmarkService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getScalabilityBenchmark(schoolId: string, id: string): Promise<ScalabilityBenchmark> {
    const item = await this.repo.findScalabilityBenchmarkById(schoolId, id);
    if (!item) throw new EntScalabilityBenchmarkNotFoundError(id);
    return item;
  }
  async listScalabilityBenchmarks(schoolId: string, filters?: Record<string, unknown>): Promise<ScalabilityBenchmark[]> {
    return this.repo.findAllScalabilityBenchmarks(schoolId, filters);
  }
  async createScalabilityBenchmark(schoolId: string, data: ScalabilityBenchmarkCreate): Promise<ScalabilityBenchmark> {
    return this.repo.createScalabilityBenchmark(schoolId, data);
  }
  async updateScalabilityBenchmark(schoolId: string, id: string, data: Partial<ScalabilityBenchmarkCreate>): Promise<ScalabilityBenchmark> {
    const existing = await this.repo.findScalabilityBenchmarkById(schoolId, id);
    if (!existing) throw new EntScalabilityBenchmarkNotFoundError(id);
    return this.repo.updateScalabilityBenchmark(schoolId, id, data);
  }
  async deleteScalabilityBenchmark(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findScalabilityBenchmarkById(schoolId, id);
    if (!existing) throw new EntScalabilityBenchmarkNotFoundError(id);
    return this.repo.deleteScalabilityBenchmark(schoolId, id);
  }
  async countScalabilityBenchmarks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countScalabilityBenchmarks(schoolId, filters);
  }
}
