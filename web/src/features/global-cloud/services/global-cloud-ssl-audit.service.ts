import type { SupabaseClient } from '@supabase/supabase-js';
import type { SslAudit } from '@educi/types';
import { EduCloudSslAuditError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudSslAudit {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getSslAudit(schoolId: string, id: string): Promise<SslAudit> {
    const item = await this.repo.getSslAudit(schoolId, id);
    if (!item) throw new EduCloudSslAuditError(id);
    return item;
  }
  async listSslAudits(schoolId: string, filters?: Record<string, unknown>): Promise<SslAudit[]> {
    return this.repo.listSslAudit(schoolId, filters);
  }
  async createSslAudit(schoolId: string, data: Partial<SslAudit>): Promise<SslAudit> {
    return this.repo.createSslAudit(schoolId, data as any);
  }
  async updateSslAudit(schoolId: string, id: string, data: Partial<SslAudit>): Promise<SslAudit> {
    const existing = await this.repo.getSslAudit(schoolId, id);
    if (!existing) throw new EduCloudSslAuditError(id);
    return this.repo.updateSslAudit(schoolId, id, data as any);
  }
  async deleteSslAudit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSslAudit(schoolId, id);
    if (!existing) throw new EduCloudSslAuditError(id);
    return this.repo.deleteSslAudit(schoolId, id);
  }
}
