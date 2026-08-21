import type { SupabaseClient } from '@supabase/supabase-js';
import type { SecurityAudit } from '@educi/types';
import { EduCloudSecurityAuditError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudSecurityAudit {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getSecurityAudit(schoolId: string, id: string): Promise<SecurityAudit> {
    const item = await this.repo.getSecurityAudit(schoolId, id);
    if (!item) throw new EduCloudSecurityAuditError(id);
    return item;
  }
  async listSecurityAudits(schoolId: string, filters?: Record<string, unknown>): Promise<SecurityAudit[]> {
    return this.repo.listSecurityAudit(schoolId, filters);
  }
  async createSecurityAudit(schoolId: string, data: Partial<SecurityAudit>): Promise<SecurityAudit> {
    return this.repo.createSecurityAudit(schoolId, data as any);
  }
  async updateSecurityAudit(schoolId: string, id: string, data: Partial<SecurityAudit>): Promise<SecurityAudit> {
    const existing = await this.repo.getSecurityAudit(schoolId, id);
    if (!existing) throw new EduCloudSecurityAuditError(id);
    return this.repo.updateSecurityAudit(schoolId, id, data as any);
  }
  async deleteSecurityAudit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSecurityAudit(schoolId, id);
    if (!existing) throw new EduCloudSecurityAuditError(id);
    return this.repo.deleteSecurityAudit(schoolId, id);
  }
}
