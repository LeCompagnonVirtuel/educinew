import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudCertificate } from '@educi/types';
import { EduCloudCloudCertificateError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudCertificate {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudCertificate(schoolId: string, id: string): Promise<CloudCertificate> {
    const item = await this.repo.getCloudCertificate(schoolId, id);
    if (!item) throw new EduCloudCloudCertificateError(id);
    return item;
  }
  async listCloudCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<CloudCertificate[]> {
    return this.repo.listCloudCertificate(schoolId, filters);
  }
  async createCloudCertificate(schoolId: string, data: Partial<CloudCertificate>): Promise<CloudCertificate> {
    return this.repo.createCloudCertificate(schoolId, data as any);
  }
  async updateCloudCertificate(schoolId: string, id: string, data: Partial<CloudCertificate>): Promise<CloudCertificate> {
    const existing = await this.repo.getCloudCertificate(schoolId, id);
    if (!existing) throw new EduCloudCloudCertificateError(id);
    return this.repo.updateCloudCertificate(schoolId, id, data as any);
  }
  async deleteCloudCertificate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudCertificate(schoolId, id);
    if (!existing) throw new EduCloudCloudCertificateError(id);
    return this.repo.deleteCloudCertificate(schoolId, id);
  }
}
