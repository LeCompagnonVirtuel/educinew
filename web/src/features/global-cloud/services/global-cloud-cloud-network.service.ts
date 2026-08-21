import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudNetwork } from '@educi/types';
import { EduCloudCloudNetworkError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudNetwork {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudNetwork(schoolId: string, id: string): Promise<CloudNetwork> {
    const item = await this.repo.getCloudNetwork(schoolId, id);
    if (!item) throw new EduCloudCloudNetworkError(id);
    return item;
  }
  async listCloudNetworks(schoolId: string, filters?: Record<string, unknown>): Promise<CloudNetwork[]> {
    return this.repo.listCloudNetwork(schoolId, filters);
  }
  async createCloudNetwork(schoolId: string, data: Partial<CloudNetwork>): Promise<CloudNetwork> {
    return this.repo.createCloudNetwork(schoolId, data as any);
  }
  async updateCloudNetwork(schoolId: string, id: string, data: Partial<CloudNetwork>): Promise<CloudNetwork> {
    const existing = await this.repo.getCloudNetwork(schoolId, id);
    if (!existing) throw new EduCloudCloudNetworkError(id);
    return this.repo.updateCloudNetwork(schoolId, id, data as any);
  }
  async deleteCloudNetwork(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudNetwork(schoolId, id);
    if (!existing) throw new EduCloudCloudNetworkError(id);
    return this.repo.deleteCloudNetwork(schoolId, id);
  }
}
