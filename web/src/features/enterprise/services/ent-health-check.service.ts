// Enterprise Platform Service - HealthCheck
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { HealthCheck, HealthCheckCreate } from '@educi/types';
import { EntHealthCheckNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntHealthCheckService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getHealthCheck(schoolId: string, id: string): Promise<HealthCheck> {
    const item = await this.repo.findHealthCheckById(schoolId, id);
    if (!item) throw new EntHealthCheckNotFoundError(id);
    return item;
  }
  async listHealthChecks(schoolId: string, filters?: Record<string, unknown>): Promise<HealthCheck[]> {
    return this.repo.findAllHealthChecks(schoolId, filters);
  }
  async createHealthCheck(schoolId: string, data: HealthCheckCreate): Promise<HealthCheck> {
    return this.repo.createHealthCheck(schoolId, data);
  }
  async updateHealthCheck(schoolId: string, id: string, data: Partial<HealthCheckCreate>): Promise<HealthCheck> {
    const existing = await this.repo.findHealthCheckById(schoolId, id);
    if (!existing) throw new EntHealthCheckNotFoundError(id);
    return this.repo.updateHealthCheck(schoolId, id, data);
  }
  async deleteHealthCheck(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findHealthCheckById(schoolId, id);
    if (!existing) throw new EntHealthCheckNotFoundError(id);
    return this.repo.deleteHealthCheck(schoolId, id);
  }
  async countHealthChecks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countHealthChecks(schoolId, filters);
  }
}
