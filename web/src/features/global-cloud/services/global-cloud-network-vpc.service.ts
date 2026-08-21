import type { SupabaseClient } from '@supabase/supabase-js';
import type { NetworkVpc } from '@educi/types';
import { EduCloudNetworkVpcError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudNetworkVpc {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getNetworkVpc(schoolId: string, id: string): Promise<NetworkVpc> {
    const item = await this.repo.getNetworkVpc(schoolId, id);
    if (!item) throw new EduCloudNetworkVpcError(id);
    return item;
  }
  async listNetworkVpcs(schoolId: string, filters?: Record<string, unknown>): Promise<NetworkVpc[]> {
    return this.repo.listNetworkVpc(schoolId, filters);
  }
  async createNetworkVpc(schoolId: string, data: Partial<NetworkVpc>): Promise<NetworkVpc> {
    return this.repo.createNetworkVpc(schoolId, data as any);
  }
  async updateNetworkVpc(schoolId: string, id: string, data: Partial<NetworkVpc>): Promise<NetworkVpc> {
    const existing = await this.repo.getNetworkVpc(schoolId, id);
    if (!existing) throw new EduCloudNetworkVpcError(id);
    return this.repo.updateNetworkVpc(schoolId, id, data as any);
  }
  async deleteNetworkVpc(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getNetworkVpc(schoolId, id);
    if (!existing) throw new EduCloudNetworkVpcError(id);
    return this.repo.deleteNetworkVpc(schoolId, id);
  }
}
