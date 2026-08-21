import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudGovernanceAudit } from '@educi/types';
import { EduCloudCloudGovernanceAuditError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudGovernanceAudit {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudGovernanceAudit(schoolId: string, id: string): Promise<CloudGovernanceAudit> {
    const item = await this.repo.getCloudGovernanceAudit(schoolId, id);
    if (!item) throw new EduCloudCloudGovernanceAuditError(id);
    return item;
  }
  async listCloudGovernanceAudits(schoolId: string, filters?: Record<string, unknown>): Promise<CloudGovernanceAudit[]> {
    return this.repo.listCloudGovernanceAudit(schoolId, filters);
  }
  async createCloudGovernanceAudit(schoolId: string, data: Partial<CloudGovernanceAudit>): Promise<CloudGovernanceAudit> {
    return this.repo.createCloudGovernanceAudit(schoolId, data as any);
  }
  async updateCloudGovernanceAudit(schoolId: string, id: string, data: Partial<CloudGovernanceAudit>): Promise<CloudGovernanceAudit> {
    const existing = await this.repo.getCloudGovernanceAudit(schoolId, id);
    if (!existing) throw new EduCloudCloudGovernanceAuditError(id);
    return this.repo.updateCloudGovernanceAudit(schoolId, id, data as any);
  }
  async deleteCloudGovernanceAudit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudGovernanceAudit(schoolId, id);
    if (!existing) throw new EduCloudCloudGovernanceAuditError(id);
    return this.repo.deleteCloudGovernanceAudit(schoolId, id);
  }
}
