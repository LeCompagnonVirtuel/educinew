import type { SupabaseClient } from '@supabase/supabase-js';
import type { SslCertificate } from '@educi/types';
import { EduCloudSslCertificateError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudSslCertificate {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getSslCertificate(schoolId: string, id: string): Promise<SslCertificate> {
    const item = await this.repo.getSslCertificate(schoolId, id);
    if (!item) throw new EduCloudSslCertificateError(id);
    return item;
  }
  async listSslCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<SslCertificate[]> {
    return this.repo.listSslCertificate(schoolId, filters);
  }
  async createSslCertificate(schoolId: string, data: Partial<SslCertificate>): Promise<SslCertificate> {
    return this.repo.createSslCertificate(schoolId, data as any);
  }
  async updateSslCertificate(schoolId: string, id: string, data: Partial<SslCertificate>): Promise<SslCertificate> {
    const existing = await this.repo.getSslCertificate(schoolId, id);
    if (!existing) throw new EduCloudSslCertificateError(id);
    return this.repo.updateSslCertificate(schoolId, id, data as any);
  }
  async deleteSslCertificate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSslCertificate(schoolId, id);
    if (!existing) throw new EduCloudSslCertificateError(id);
    return this.repo.deleteSslCertificate(schoolId, id);
  }
}
