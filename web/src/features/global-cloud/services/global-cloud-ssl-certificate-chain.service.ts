import type { SupabaseClient } from '@supabase/supabase-js';
import type { SslCertificateChain } from '@educi/types';
import { EduCloudSslCertificateChainError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudSslCertificateChain {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getSslCertificateChain(schoolId: string, id: string): Promise<SslCertificateChain> {
    const item = await this.repo.getSslCertificateChain(schoolId, id);
    if (!item) throw new EduCloudSslCertificateChainError(id);
    return item;
  }
  async listSslCertificateChains(schoolId: string, filters?: Record<string, unknown>): Promise<SslCertificateChain[]> {
    return this.repo.listSslCertificateChain(schoolId, filters);
  }
  async createSslCertificateChain(schoolId: string, data: Partial<SslCertificateChain>): Promise<SslCertificateChain> {
    return this.repo.createSslCertificateChain(schoolId, data as any);
  }
  async updateSslCertificateChain(schoolId: string, id: string, data: Partial<SslCertificateChain>): Promise<SslCertificateChain> {
    const existing = await this.repo.getSslCertificateChain(schoolId, id);
    if (!existing) throw new EduCloudSslCertificateChainError(id);
    return this.repo.updateSslCertificateChain(schoolId, id, data as any);
  }
  async deleteSslCertificateChain(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSslCertificateChain(schoolId, id);
    if (!existing) throw new EduCloudSslCertificateChainError(id);
    return this.repo.deleteSslCertificateChain(schoolId, id);
  }
}
