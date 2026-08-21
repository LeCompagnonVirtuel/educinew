import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudDns } from '@educi/types';
import { EduCloudCloudDnsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudDns {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudDns(schoolId: string, id: string): Promise<CloudDns> {
    const item = await this.repo.getCloudDns(schoolId, id);
    if (!item) throw new EduCloudCloudDnsError(id);
    return item;
  }
  async listCloudDnss(schoolId: string, filters?: Record<string, unknown>): Promise<CloudDns[]> {
    return this.repo.listCloudDns(schoolId, filters);
  }
  async createCloudDns(schoolId: string, data: Partial<CloudDns>): Promise<CloudDns> {
    return this.repo.createCloudDns(schoolId, data as any);
  }
  async updateCloudDns(schoolId: string, id: string, data: Partial<CloudDns>): Promise<CloudDns> {
    const existing = await this.repo.getCloudDns(schoolId, id);
    if (!existing) throw new EduCloudCloudDnsError(id);
    return this.repo.updateCloudDns(schoolId, id, data as any);
  }
  async deleteCloudDns(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudDns(schoolId, id);
    if (!existing) throw new EduCloudCloudDnsError(id);
    return this.repo.deleteCloudDns(schoolId, id);
  }
}
