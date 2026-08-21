import type { SupabaseClient } from '@supabase/supabase-js';
import type { NetworkFirewall } from '@educi/types';
import { EduCloudNetworkFirewallError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudNetworkFirewall {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getNetworkFirewall(schoolId: string, id: string): Promise<NetworkFirewall> {
    const item = await this.repo.getNetworkFirewall(schoolId, id);
    if (!item) throw new EduCloudNetworkFirewallError(id);
    return item;
  }
  async listNetworkFirewalls(schoolId: string, filters?: Record<string, unknown>): Promise<NetworkFirewall[]> {
    return this.repo.listNetworkFirewall(schoolId, filters);
  }
  async createNetworkFirewall(schoolId: string, data: Partial<NetworkFirewall>): Promise<NetworkFirewall> {
    return this.repo.createNetworkFirewall(schoolId, data as any);
  }
  async updateNetworkFirewall(schoolId: string, id: string, data: Partial<NetworkFirewall>): Promise<NetworkFirewall> {
    const existing = await this.repo.getNetworkFirewall(schoolId, id);
    if (!existing) throw new EduCloudNetworkFirewallError(id);
    return this.repo.updateNetworkFirewall(schoolId, id, data as any);
  }
  async deleteNetworkFirewall(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getNetworkFirewall(schoolId, id);
    if (!existing) throw new EduCloudNetworkFirewallError(id);
    return this.repo.deleteNetworkFirewall(schoolId, id);
  }
}
