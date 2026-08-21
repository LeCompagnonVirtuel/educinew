import type { SupabaseClient } from '@supabase/supabase-js';
import type { ReplicationStatusDetail } from '@educi/types';
import { EduCloudReplicationStatusDetailError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudReplicationStatusDetail {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getReplicationStatusDetail(schoolId: string, id: string): Promise<ReplicationStatusDetail> {
    const item = await this.repo.getReplicationStatusDetail(schoolId, id);
    if (!item) throw new EduCloudReplicationStatusDetailError(id);
    return item;
  }
  async listReplicationStatusDetails(schoolId: string, filters?: Record<string, unknown>): Promise<ReplicationStatusDetail[]> {
    return this.repo.listReplicationStatusDetail(schoolId, filters);
  }
  async createReplicationStatusDetail(schoolId: string, data: Partial<ReplicationStatusDetail>): Promise<ReplicationStatusDetail> {
    return this.repo.createReplicationStatusDetail(schoolId, data as any);
  }
  async updateReplicationStatusDetail(schoolId: string, id: string, data: Partial<ReplicationStatusDetail>): Promise<ReplicationStatusDetail> {
    const existing = await this.repo.getReplicationStatusDetail(schoolId, id);
    if (!existing) throw new EduCloudReplicationStatusDetailError(id);
    return this.repo.updateReplicationStatusDetail(schoolId, id, data as any);
  }
  async deleteReplicationStatusDetail(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getReplicationStatusDetail(schoolId, id);
    if (!existing) throw new EduCloudReplicationStatusDetailError(id);
    return this.repo.deleteReplicationStatusDetail(schoolId, id);
  }
}
