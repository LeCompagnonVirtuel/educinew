import type { SupabaseClient } from '@supabase/supabase-js';
import type { ServiceHealth } from '@educi/types';
import { EduCloudServiceHealthError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudServiceHealth {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getServiceHealth(schoolId: string, id: string): Promise<ServiceHealth> {
    const item = await this.repo.getServiceHealth(schoolId, id);
    if (!item) throw new EduCloudServiceHealthError(id);
    return item;
  }
  async listServiceHealths(schoolId: string, filters?: Record<string, unknown>): Promise<ServiceHealth[]> {
    return this.repo.listServiceHealth(schoolId, filters);
  }
  async createServiceHealth(schoolId: string, data: Partial<ServiceHealth>): Promise<ServiceHealth> {
    return this.repo.createServiceHealth(schoolId, data as any);
  }
  async updateServiceHealth(schoolId: string, id: string, data: Partial<ServiceHealth>): Promise<ServiceHealth> {
    const existing = await this.repo.getServiceHealth(schoolId, id);
    if (!existing) throw new EduCloudServiceHealthError(id);
    return this.repo.updateServiceHealth(schoolId, id, data as any);
  }
  async deleteServiceHealth(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getServiceHealth(schoolId, id);
    if (!existing) throw new EduCloudServiceHealthError(id);
    return this.repo.deleteServiceHealth(schoolId, id);
  }
}
