import type { SupabaseClient } from '@supabase/supabase-js';
import type { NetworkSubnet } from '@educi/types';
import { EduCloudNetworkSubnetError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudNetworkSubnet {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getNetworkSubnet(schoolId: string, id: string): Promise<NetworkSubnet> {
    const item = await this.repo.getNetworkSubnet(schoolId, id);
    if (!item) throw new EduCloudNetworkSubnetError(id);
    return item;
  }
  async listNetworkSubnets(schoolId: string, filters?: Record<string, unknown>): Promise<NetworkSubnet[]> {
    return this.repo.listNetworkSubnet(schoolId, filters);
  }
  async createNetworkSubnet(schoolId: string, data: Partial<NetworkSubnet>): Promise<NetworkSubnet> {
    return this.repo.createNetworkSubnet(schoolId, data as any);
  }
  async updateNetworkSubnet(schoolId: string, id: string, data: Partial<NetworkSubnet>): Promise<NetworkSubnet> {
    const existing = await this.repo.getNetworkSubnet(schoolId, id);
    if (!existing) throw new EduCloudNetworkSubnetError(id);
    return this.repo.updateNetworkSubnet(schoolId, id, data as any);
  }
  async deleteNetworkSubnet(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getNetworkSubnet(schoolId, id);
    if (!existing) throw new EduCloudNetworkSubnetError(id);
    return this.repo.deleteNetworkSubnet(schoolId, id);
  }
}
