import type { SupabaseClient } from '@supabase/supabase-js';
import type { ReplicationJob } from '@educi/types';
import { EduCloudReplicationJobError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudReplicationJob {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getReplicationJob(schoolId: string, id: string): Promise<ReplicationJob> {
    const item = await this.repo.getReplicationJob(schoolId, id);
    if (!item) throw new EduCloudReplicationJobError(id);
    return item;
  }
  async listReplicationJobs(schoolId: string, filters?: Record<string, unknown>): Promise<ReplicationJob[]> {
    return this.repo.listReplicationJob(schoolId, filters);
  }
  async createReplicationJob(schoolId: string, data: Partial<ReplicationJob>): Promise<ReplicationJob> {
    return this.repo.createReplicationJob(schoolId, data as any);
  }
  async updateReplicationJob(schoolId: string, id: string, data: Partial<ReplicationJob>): Promise<ReplicationJob> {
    const existing = await this.repo.getReplicationJob(schoolId, id);
    if (!existing) throw new EduCloudReplicationJobError(id);
    return this.repo.updateReplicationJob(schoolId, id, data as any);
  }
  async deleteReplicationJob(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getReplicationJob(schoolId, id);
    if (!existing) throw new EduCloudReplicationJobError(id);
    return this.repo.deleteReplicationJob(schoolId, id);
  }
}
