import type { SupabaseClient } from '@supabase/supabase-js';
import type { CertificateRenewal } from '@educi/types';
import { EduCloudCertificateRenewalError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCertificateRenewal {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCertificateRenewal(schoolId: string, id: string): Promise<CertificateRenewal> {
    const item = await this.repo.getCertificateRenewal(schoolId, id);
    if (!item) throw new EduCloudCertificateRenewalError(id);
    return item;
  }
  async listCertificateRenewals(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateRenewal[]> {
    return this.repo.listCertificateRenewal(schoolId, filters);
  }
  async createCertificateRenewal(schoolId: string, data: Partial<CertificateRenewal>): Promise<CertificateRenewal> {
    return this.repo.createCertificateRenewal(schoolId, data as any);
  }
  async updateCertificateRenewal(schoolId: string, id: string, data: Partial<CertificateRenewal>): Promise<CertificateRenewal> {
    const existing = await this.repo.getCertificateRenewal(schoolId, id);
    if (!existing) throw new EduCloudCertificateRenewalError(id);
    return this.repo.updateCertificateRenewal(schoolId, id, data as any);
  }
  async deleteCertificateRenewal(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCertificateRenewal(schoolId, id);
    if (!existing) throw new EduCloudCertificateRenewalError(id);
    return this.repo.deleteCertificateRenewal(schoolId, id);
  }
}
