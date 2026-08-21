import type { SupabaseClient } from '@supabase/supabase-js';
import type { CertificateAudit } from '@educi/types';
import { EduCloudCertificateAuditError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCertificateAudit {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCertificateAudit(schoolId: string, id: string): Promise<CertificateAudit> {
    const item = await this.repo.getCertificateAudit(schoolId, id);
    if (!item) throw new EduCloudCertificateAuditError(id);
    return item;
  }
  async listCertificateAudits(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateAudit[]> {
    return this.repo.listCertificateAudit(schoolId, filters);
  }
  async createCertificateAudit(schoolId: string, data: Partial<CertificateAudit>): Promise<CertificateAudit> {
    return this.repo.createCertificateAudit(schoolId, data as any);
  }
  async updateCertificateAudit(schoolId: string, id: string, data: Partial<CertificateAudit>): Promise<CertificateAudit> {
    const existing = await this.repo.getCertificateAudit(schoolId, id);
    if (!existing) throw new EduCloudCertificateAuditError(id);
    return this.repo.updateCertificateAudit(schoolId, id, data as any);
  }
  async deleteCertificateAudit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCertificateAudit(schoolId, id);
    if (!existing) throw new EduCloudCertificateAuditError(id);
    return this.repo.deleteCertificateAudit(schoolId, id);
  }
}
