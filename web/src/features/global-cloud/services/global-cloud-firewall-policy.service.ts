import type { SupabaseClient } from '@supabase/supabase-js';
import type { FirewallPolicy } from '@educi/types';
import { EduCloudFirewallPolicyError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudFirewallPolicy {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getFirewallPolicy(schoolId: string, id: string): Promise<FirewallPolicy> {
    const item = await this.repo.getFirewallPolicy(schoolId, id);
    if (!item) throw new EduCloudFirewallPolicyError(id);
    return item;
  }
  async listFirewallPolicys(schoolId: string, filters?: Record<string, unknown>): Promise<FirewallPolicy[]> {
    return this.repo.listFirewallPolicy(schoolId, filters);
  }
  async createFirewallPolicy(schoolId: string, data: Partial<FirewallPolicy>): Promise<FirewallPolicy> {
    return this.repo.createFirewallPolicy(schoolId, data as any);
  }
  async updateFirewallPolicy(schoolId: string, id: string, data: Partial<FirewallPolicy>): Promise<FirewallPolicy> {
    const existing = await this.repo.getFirewallPolicy(schoolId, id);
    if (!existing) throw new EduCloudFirewallPolicyError(id);
    return this.repo.updateFirewallPolicy(schoolId, id, data as any);
  }
  async deleteFirewallPolicy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getFirewallPolicy(schoolId, id);
    if (!existing) throw new EduCloudFirewallPolicyError(id);
    return this.repo.deleteFirewallPolicy(schoolId, id);
  }
}
