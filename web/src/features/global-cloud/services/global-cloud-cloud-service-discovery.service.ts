import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudServiceDiscovery } from '@educi/types';
import { EduCloudCloudServiceDiscoveryError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudServiceDiscovery {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudServiceDiscovery(schoolId: string, id: string): Promise<CloudServiceDiscovery> {
    const item = await this.repo.getCloudServiceDiscovery(schoolId, id);
    if (!item) throw new EduCloudCloudServiceDiscoveryError(id);
    return item;
  }
  async listCloudServiceDiscoverys(schoolId: string, filters?: Record<string, unknown>): Promise<CloudServiceDiscovery[]> {
    return this.repo.listCloudServiceDiscovery(schoolId, filters);
  }
  async createCloudServiceDiscovery(schoolId: string, data: Partial<CloudServiceDiscovery>): Promise<CloudServiceDiscovery> {
    return this.repo.createCloudServiceDiscovery(schoolId, data as any);
  }
  async updateCloudServiceDiscovery(schoolId: string, id: string, data: Partial<CloudServiceDiscovery>): Promise<CloudServiceDiscovery> {
    const existing = await this.repo.getCloudServiceDiscovery(schoolId, id);
    if (!existing) throw new EduCloudCloudServiceDiscoveryError(id);
    return this.repo.updateCloudServiceDiscovery(schoolId, id, data as any);
  }
  async deleteCloudServiceDiscovery(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudServiceDiscovery(schoolId, id);
    if (!existing) throw new EduCloudCloudServiceDiscoveryError(id);
    return this.repo.deleteCloudServiceDiscovery(schoolId, id);
  }
}
