import type { SupabaseClient } from '@supabase/supabase-js';
import type { SslRenewal } from '@educi/types';
import { EduCloudSslRenewalError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudSslRenewal {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getSslRenewal(schoolId: string, id: string): Promise<SslRenewal> {
    const item = await this.repo.getSslRenewal(schoolId, id);
    if (!item) throw new EduCloudSslRenewalError(id);
    return item;
  }
  async listSslRenewals(schoolId: string, filters?: Record<string, unknown>): Promise<SslRenewal[]> {
    return this.repo.listSslRenewal(schoolId, filters);
  }
  async createSslRenewal(schoolId: string, data: Partial<SslRenewal>): Promise<SslRenewal> {
    return this.repo.createSslRenewal(schoolId, data as any);
  }
  async updateSslRenewal(schoolId: string, id: string, data: Partial<SslRenewal>): Promise<SslRenewal> {
    const existing = await this.repo.getSslRenewal(schoolId, id);
    if (!existing) throw new EduCloudSslRenewalError(id);
    return this.repo.updateSslRenewal(schoolId, id, data as any);
  }
  async deleteSslRenewal(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSslRenewal(schoolId, id);
    if (!existing) throw new EduCloudSslRenewalError(id);
    return this.repo.deleteSslRenewal(schoolId, id);
  }
}
