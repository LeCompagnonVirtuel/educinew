import type { SupabaseClient } from '@supabase/supabase-js';
import type { ServiceInstance } from '@educi/types';
import { EduCloudServiceInstanceError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudServiceInstance {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getServiceInstance(schoolId: string, id: string): Promise<ServiceInstance> {
    const item = await this.repo.getServiceInstance(schoolId, id);
    if (!item) throw new EduCloudServiceInstanceError(id);
    return item;
  }
  async listServiceInstances(schoolId: string, filters?: Record<string, unknown>): Promise<ServiceInstance[]> {
    return this.repo.listServiceInstance(schoolId, filters);
  }
  async createServiceInstance(schoolId: string, data: Partial<ServiceInstance>): Promise<ServiceInstance> {
    return this.repo.createServiceInstance(schoolId, data as any);
  }
  async updateServiceInstance(schoolId: string, id: string, data: Partial<ServiceInstance>): Promise<ServiceInstance> {
    const existing = await this.repo.getServiceInstance(schoolId, id);
    if (!existing) throw new EduCloudServiceInstanceError(id);
    return this.repo.updateServiceInstance(schoolId, id, data as any);
  }
  async deleteServiceInstance(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getServiceInstance(schoolId, id);
    if (!existing) throw new EduCloudServiceInstanceError(id);
    return this.repo.deleteServiceInstance(schoolId, id);
  }
}
