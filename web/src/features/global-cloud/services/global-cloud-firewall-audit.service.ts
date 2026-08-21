import type { SupabaseClient } from '@supabase/supabase-js';
import type { FirewallAudit } from '@educi/types';
import { EduCloudFirewallAuditError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudFirewallAudit {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getFirewallAudit(schoolId: string, id: string): Promise<FirewallAudit> {
    const item = await this.repo.getFirewallAudit(schoolId, id);
    if (!item) throw new EduCloudFirewallAuditError(id);
    return item;
  }
  async listFirewallAudits(schoolId: string, filters?: Record<string, unknown>): Promise<FirewallAudit[]> {
    return this.repo.listFirewallAudit(schoolId, filters);
  }
  async createFirewallAudit(schoolId: string, data: Partial<FirewallAudit>): Promise<FirewallAudit> {
    return this.repo.createFirewallAudit(schoolId, data as any);
  }
  async updateFirewallAudit(schoolId: string, id: string, data: Partial<FirewallAudit>): Promise<FirewallAudit> {
    const existing = await this.repo.getFirewallAudit(schoolId, id);
    if (!existing) throw new EduCloudFirewallAuditError(id);
    return this.repo.updateFirewallAudit(schoolId, id, data as any);
  }
  async deleteFirewallAudit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getFirewallAudit(schoolId, id);
    if (!existing) throw new EduCloudFirewallAuditError(id);
    return this.repo.deleteFirewallAudit(schoolId, id);
  }
}
