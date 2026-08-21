import type { SupabaseClient } from '@supabase/supabase-js';
import type { FirewallLog } from '@educi/types';
import { EduCloudFirewallLogError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudFirewallLog {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getFirewallLog(schoolId: string, id: string): Promise<FirewallLog> {
    const item = await this.repo.getFirewallLog(schoolId, id);
    if (!item) throw new EduCloudFirewallLogError(id);
    return item;
  }
  async listFirewallLogs(schoolId: string, filters?: Record<string, unknown>): Promise<FirewallLog[]> {
    return this.repo.listFirewallLog(schoolId, filters);
  }
  async createFirewallLog(schoolId: string, data: Partial<FirewallLog>): Promise<FirewallLog> {
    return this.repo.createFirewallLog(schoolId, data as any);
  }
  async updateFirewallLog(schoolId: string, id: string, data: Partial<FirewallLog>): Promise<FirewallLog> {
    const existing = await this.repo.getFirewallLog(schoolId, id);
    if (!existing) throw new EduCloudFirewallLogError(id);
    return this.repo.updateFirewallLog(schoolId, id, data as any);
  }
  async deleteFirewallLog(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getFirewallLog(schoolId, id);
    if (!existing) throw new EduCloudFirewallLogError(id);
    return this.repo.deleteFirewallLog(schoolId, id);
  }
}
