import type { SupabaseClient } from '@supabase/supabase-js';
import type { IdentityAudit } from '@educi/types';
import { EduCloudIdentityAuditError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudIdentityAudit {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getIdentityAudit(schoolId: string, id: string): Promise<IdentityAudit> {
    const item = await this.repo.getIdentityAudit(schoolId, id);
    if (!item) throw new EduCloudIdentityAuditError(id);
    return item;
  }
  async listIdentityAudits(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityAudit[]> {
    return this.repo.listIdentityAudit(schoolId, filters);
  }
  async createIdentityAudit(schoolId: string, data: Partial<IdentityAudit>): Promise<IdentityAudit> {
    return this.repo.createIdentityAudit(schoolId, data as any);
  }
  async updateIdentityAudit(schoolId: string, id: string, data: Partial<IdentityAudit>): Promise<IdentityAudit> {
    const existing = await this.repo.getIdentityAudit(schoolId, id);
    if (!existing) throw new EduCloudIdentityAuditError(id);
    return this.repo.updateIdentityAudit(schoolId, id, data as any);
  }
  async deleteIdentityAudit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getIdentityAudit(schoolId, id);
    if (!existing) throw new EduCloudIdentityAuditError(id);
    return this.repo.deleteIdentityAudit(schoolId, id);
  }
}
