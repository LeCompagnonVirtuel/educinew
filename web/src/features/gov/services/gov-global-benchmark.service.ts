// Government & National Governance Service - GlobalBenchmark
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { GlobalBenchmark, GlobalBenchmarkCreate } from '@educi/types';
import { GovGlobalBenchmarkNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovGlobalBenchmarkService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getGlobalBenchmark(schoolId: string, id: string): Promise<GlobalBenchmark> {
    const item = await this.repo.findGlobalBenchmarkById(schoolId, id);
    if (!item) throw new GovGlobalBenchmarkNotFoundError(id);
    return item;
  }

  async listGlobalBenchmarks(schoolId: string, filters?: Record<string, unknown>): Promise<GlobalBenchmark[]> {
    return this.repo.findAllGlobalBenchmarks(schoolId, filters);
  }

  async createGlobalBenchmark(schoolId: string, data: GlobalBenchmarkCreate): Promise<GlobalBenchmark> {
    return this.repo.createGlobalBenchmark(schoolId, data);
  }

  async updateGlobalBenchmark(schoolId: string, id: string, data: Partial<GlobalBenchmarkCreate>): Promise<GlobalBenchmark> {
    const existing = await this.repo.findGlobalBenchmarkById(schoolId, id);
    if (!existing) throw new GovGlobalBenchmarkNotFoundError(id);
    return this.repo.updateGlobalBenchmark(schoolId, id, data);
  }

  async deleteGlobalBenchmark(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findGlobalBenchmarkById(schoolId, id);
    if (!existing) throw new GovGlobalBenchmarkNotFoundError(id);
    return this.repo.deleteGlobalBenchmark(schoolId, id);
  }

  async countGlobalBenchmarks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countGlobalBenchmarks(schoolId, filters);
  }
}
