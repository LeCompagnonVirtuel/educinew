import type { SupabaseClient } from '@supabase/supabase-js';
import type { ComplianceAudit } from '@educi/types';
import { EduCloudComplianceAuditError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudComplianceAudit {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getComplianceAudit(schoolId: string, id: string): Promise<ComplianceAudit> {
    const item = await this.repo.getComplianceAudit(schoolId, id);
    if (!item) throw new EduCloudComplianceAuditError(id);
    return item;
  }
  async listComplianceAudits(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceAudit[]> {
    return this.repo.listComplianceAudit(schoolId, filters);
  }
  async createComplianceAudit(schoolId: string, data: Partial<ComplianceAudit>): Promise<ComplianceAudit> {
    return this.repo.createComplianceAudit(schoolId, data as any);
  }
  async updateComplianceAudit(schoolId: string, id: string, data: Partial<ComplianceAudit>): Promise<ComplianceAudit> {
    const existing = await this.repo.getComplianceAudit(schoolId, id);
    if (!existing) throw new EduCloudComplianceAuditError(id);
    return this.repo.updateComplianceAudit(schoolId, id, data as any);
  }
  async deleteComplianceAudit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getComplianceAudit(schoolId, id);
    if (!existing) throw new EduCloudComplianceAuditError(id);
    return this.repo.deleteComplianceAudit(schoolId, id);
  }
}
