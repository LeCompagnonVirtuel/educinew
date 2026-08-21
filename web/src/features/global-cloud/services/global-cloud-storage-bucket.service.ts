import type { SupabaseClient } from '@supabase/supabase-js';
import type { StorageBucket } from '@educi/types';
import { EduCloudStorageBucketError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudStorageBucket {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getStorageBucket(schoolId: string, id: string): Promise<StorageBucket> {
    const item = await this.repo.getStorageBucket(schoolId, id);
    if (!item) throw new EduCloudStorageBucketError(id);
    return item;
  }
  async listStorageBuckets(schoolId: string, filters?: Record<string, unknown>): Promise<StorageBucket[]> {
    return this.repo.listStorageBucket(schoolId, filters);
  }
  async createStorageBucket(schoolId: string, data: Partial<StorageBucket>): Promise<StorageBucket> {
    return this.repo.createStorageBucket(schoolId, data as any);
  }
  async updateStorageBucket(schoolId: string, id: string, data: Partial<StorageBucket>): Promise<StorageBucket> {
    const existing = await this.repo.getStorageBucket(schoolId, id);
    if (!existing) throw new EduCloudStorageBucketError(id);
    return this.repo.updateStorageBucket(schoolId, id, data as any);
  }
  async deleteStorageBucket(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getStorageBucket(schoolId, id);
    if (!existing) throw new EduCloudStorageBucketError(id);
    return this.repo.deleteStorageBucket(schoolId, id);
  }
}
