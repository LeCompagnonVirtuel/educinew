import type { SupabaseClient } from '@supabase/supabase-js';
import type { ReplicationPolicy } from '@educi/types';
import { EduCloudReplicationPolicyError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudReplicationPolicy {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getReplicationPolicy(schoolId: string, id: string): Promise<ReplicationPolicy> {
    const item = await this.repo.getReplicationPolicy(schoolId, id);
    if (!item) throw new EduCloudReplicationPolicyError(id);
    return item;
  }
  async listReplicationPolicys(schoolId: string, filters?: Record<string, unknown>): Promise<ReplicationPolicy[]> {
    return this.repo.listReplicationPolicy(schoolId, filters);
  }
  async createReplicationPolicy(schoolId: string, data: Partial<ReplicationPolicy>): Promise<ReplicationPolicy> {
    return this.repo.createReplicationPolicy(schoolId, data as any);
  }
  async updateReplicationPolicy(schoolId: string, id: string, data: Partial<ReplicationPolicy>): Promise<ReplicationPolicy> {
    const existing = await this.repo.getReplicationPolicy(schoolId, id);
    if (!existing) throw new EduCloudReplicationPolicyError(id);
    return this.repo.updateReplicationPolicy(schoolId, id, data as any);
  }
  async deleteReplicationPolicy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getReplicationPolicy(schoolId, id);
    if (!existing) throw new EduCloudReplicationPolicyError(id);
    return this.repo.deleteReplicationPolicy(schoolId, id);
  }
}
