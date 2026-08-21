import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudSsl } from '@educi/types';
import { EduCloudCloudSslError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudSsl {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudSsl(schoolId: string, id: string): Promise<CloudSsl> {
    const item = await this.repo.getCloudSsl(schoolId, id);
    if (!item) throw new EduCloudCloudSslError(id);
    return item;
  }
  async listCloudSsls(schoolId: string, filters?: Record<string, unknown>): Promise<CloudSsl[]> {
    return this.repo.listCloudSsl(schoolId, filters);
  }
  async createCloudSsl(schoolId: string, data: Partial<CloudSsl>): Promise<CloudSsl> {
    return this.repo.createCloudSsl(schoolId, data as any);
  }
  async updateCloudSsl(schoolId: string, id: string, data: Partial<CloudSsl>): Promise<CloudSsl> {
    const existing = await this.repo.getCloudSsl(schoolId, id);
    if (!existing) throw new EduCloudCloudSslError(id);
    return this.repo.updateCloudSsl(schoolId, id, data as any);
  }
  async deleteCloudSsl(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudSsl(schoolId, id);
    if (!existing) throw new EduCloudCloudSslError(id);
    return this.repo.deleteCloudSsl(schoolId, id);
  }
}
