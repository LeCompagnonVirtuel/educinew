import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudTraffic } from '@educi/types';
import { EduCloudCloudTrafficError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudTraffic {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudTraffic(schoolId: string, id: string): Promise<CloudTraffic> {
    const item = await this.repo.getCloudTraffic(schoolId, id);
    if (!item) throw new EduCloudCloudTrafficError(id);
    return item;
  }
  async listCloudTraffics(schoolId: string, filters?: Record<string, unknown>): Promise<CloudTraffic[]> {
    return this.repo.listCloudTraffic(schoolId, filters);
  }
  async createCloudTraffic(schoolId: string, data: Partial<CloudTraffic>): Promise<CloudTraffic> {
    return this.repo.createCloudTraffic(schoolId, data as any);
  }
  async updateCloudTraffic(schoolId: string, id: string, data: Partial<CloudTraffic>): Promise<CloudTraffic> {
    const existing = await this.repo.getCloudTraffic(schoolId, id);
    if (!existing) throw new EduCloudCloudTrafficError(id);
    return this.repo.updateCloudTraffic(schoolId, id, data as any);
  }
  async deleteCloudTraffic(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudTraffic(schoolId, id);
    if (!existing) throw new EduCloudCloudTrafficError(id);
    return this.repo.deleteCloudTraffic(schoolId, id);
  }
}
