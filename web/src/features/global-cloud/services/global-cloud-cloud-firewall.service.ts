import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudFirewall } from '@educi/types';
import { EduCloudCloudFirewallError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudFirewall {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudFirewall(schoolId: string, id: string): Promise<CloudFirewall> {
    const item = await this.repo.getCloudFirewall(schoolId, id);
    if (!item) throw new EduCloudCloudFirewallError(id);
    return item;
  }
  async listCloudFirewalls(schoolId: string, filters?: Record<string, unknown>): Promise<CloudFirewall[]> {
    return this.repo.listCloudFirewall(schoolId, filters);
  }
  async createCloudFirewall(schoolId: string, data: Partial<CloudFirewall>): Promise<CloudFirewall> {
    return this.repo.createCloudFirewall(schoolId, data as any);
  }
  async updateCloudFirewall(schoolId: string, id: string, data: Partial<CloudFirewall>): Promise<CloudFirewall> {
    const existing = await this.repo.getCloudFirewall(schoolId, id);
    if (!existing) throw new EduCloudCloudFirewallError(id);
    return this.repo.updateCloudFirewall(schoolId, id, data as any);
  }
  async deleteCloudFirewall(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudFirewall(schoolId, id);
    if (!existing) throw new EduCloudCloudFirewallError(id);
    return this.repo.deleteCloudFirewall(schoolId, id);
  }
}
