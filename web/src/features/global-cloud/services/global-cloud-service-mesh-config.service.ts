import type { SupabaseClient } from '@supabase/supabase-js';
import type { ServiceMeshConfig } from '@educi/types';
import { EduCloudServiceMeshConfigError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudServiceMeshConfig {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getServiceMeshConfig(schoolId: string, id: string): Promise<ServiceMeshConfig> {
    const item = await this.repo.getServiceMeshConfig(schoolId, id);
    if (!item) throw new EduCloudServiceMeshConfigError(id);
    return item;
  }
  async listServiceMeshConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<ServiceMeshConfig[]> {
    return this.repo.listServiceMeshConfig(schoolId, filters);
  }
  async createServiceMeshConfig(schoolId: string, data: Partial<ServiceMeshConfig>): Promise<ServiceMeshConfig> {
    return this.repo.createServiceMeshConfig(schoolId, data as any);
  }
  async updateServiceMeshConfig(schoolId: string, id: string, data: Partial<ServiceMeshConfig>): Promise<ServiceMeshConfig> {
    const existing = await this.repo.getServiceMeshConfig(schoolId, id);
    if (!existing) throw new EduCloudServiceMeshConfigError(id);
    return this.repo.updateServiceMeshConfig(schoolId, id, data as any);
  }
  async deleteServiceMeshConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getServiceMeshConfig(schoolId, id);
    if (!existing) throw new EduCloudServiceMeshConfigError(id);
    return this.repo.deleteServiceMeshConfig(schoolId, id);
  }
}
