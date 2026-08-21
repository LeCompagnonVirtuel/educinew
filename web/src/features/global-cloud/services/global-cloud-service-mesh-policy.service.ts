import type { SupabaseClient } from '@supabase/supabase-js';
import type { ServiceMeshPolicy } from '@educi/types';
import { EduCloudServiceMeshPolicyError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudServiceMeshPolicy {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getServiceMeshPolicy(schoolId: string, id: string): Promise<ServiceMeshPolicy> {
    const item = await this.repo.getServiceMeshPolicy(schoolId, id);
    if (!item) throw new EduCloudServiceMeshPolicyError(id);
    return item;
  }
  async listServiceMeshPolicys(schoolId: string, filters?: Record<string, unknown>): Promise<ServiceMeshPolicy[]> {
    return this.repo.listServiceMeshPolicy(schoolId, filters);
  }
  async createServiceMeshPolicy(schoolId: string, data: Partial<ServiceMeshPolicy>): Promise<ServiceMeshPolicy> {
    return this.repo.createServiceMeshPolicy(schoolId, data as any);
  }
  async updateServiceMeshPolicy(schoolId: string, id: string, data: Partial<ServiceMeshPolicy>): Promise<ServiceMeshPolicy> {
    const existing = await this.repo.getServiceMeshPolicy(schoolId, id);
    if (!existing) throw new EduCloudServiceMeshPolicyError(id);
    return this.repo.updateServiceMeshPolicy(schoolId, id, data as any);
  }
  async deleteServiceMeshPolicy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getServiceMeshPolicy(schoolId, id);
    if (!existing) throw new EduCloudServiceMeshPolicyError(id);
    return this.repo.deleteServiceMeshPolicy(schoolId, id);
  }
}
