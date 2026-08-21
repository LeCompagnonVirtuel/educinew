import type { SupabaseClient } from '@supabase/supabase-js';
import type { HealthCheck } from '@educi/types';
import { EduOSHealthCheckError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSHealthCheckService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getHealthCheck(schoolId: string, id: string): Promise<HealthCheck> {
    const item = await this.repo.getHealthCheck(schoolId, id);
    if (!item) throw new EduOSHealthCheckError(id);
    return item;
  }
  async listHealthChecks(schoolId: string, filters?: Record<string, unknown>): Promise<HealthCheck[]> {
    return this.repo.listHealthChecks(schoolId, filters);
  }
  async createHealthCheck(schoolId: string, data: Partial<HealthCheck>): Promise<HealthCheck> {
    return this.repo.createHealthCheck(schoolId, data as any);
  }
  async updateHealthCheck(schoolId: string, id: string, data: Partial<HealthCheck>): Promise<HealthCheck> {
    const existing = await this.repo.getHealthCheck(schoolId, id);
    if (!existing) throw new EduOSHealthCheckError(id);
    return this.repo.updateHealthCheck(schoolId, id, data as any);
  }
  async deleteHealthCheck(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getHealthCheck(schoolId, id);
    if (!existing) throw new EduOSHealthCheckError(id);
    return this.repo.deleteHealthCheck(schoolId, id);
  }
}

