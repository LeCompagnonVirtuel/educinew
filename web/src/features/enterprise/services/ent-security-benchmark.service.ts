// Enterprise Platform Service - SecurityBenchmark
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SecurityBenchmark, SecurityBenchmarkCreate } from '@educi/types';
import { EntSecurityBenchmarkNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSecurityBenchmarkService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSecurityBenchmark(schoolId: string, id: string): Promise<SecurityBenchmark> {
    const item = await this.repo.findSecurityBenchmarkById(schoolId, id);
    if (!item) throw new EntSecurityBenchmarkNotFoundError(id);
    return item;
  }
  async listSecurityBenchmarks(schoolId: string, filters?: Record<string, unknown>): Promise<SecurityBenchmark[]> {
    return this.repo.findAllSecurityBenchmarks(schoolId, filters);
  }
  async createSecurityBenchmark(schoolId: string, data: SecurityBenchmarkCreate): Promise<SecurityBenchmark> {
    return this.repo.createSecurityBenchmark(schoolId, data);
  }
  async updateSecurityBenchmark(schoolId: string, id: string, data: Partial<SecurityBenchmarkCreate>): Promise<SecurityBenchmark> {
    const existing = await this.repo.findSecurityBenchmarkById(schoolId, id);
    if (!existing) throw new EntSecurityBenchmarkNotFoundError(id);
    return this.repo.updateSecurityBenchmark(schoolId, id, data);
  }
  async deleteSecurityBenchmark(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSecurityBenchmarkById(schoolId, id);
    if (!existing) throw new EntSecurityBenchmarkNotFoundError(id);
    return this.repo.deleteSecurityBenchmark(schoolId, id);
  }
  async countSecurityBenchmarks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSecurityBenchmarks(schoolId, filters);
  }
}
