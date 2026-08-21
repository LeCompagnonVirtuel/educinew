import type { SupabaseClient } from '@supabase/supabase-js';
import type { StoragePolicy } from '@educi/types';
import { EduCloudStoragePolicyError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudStoragePolicy {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getStoragePolicy(schoolId: string, id: string): Promise<StoragePolicy> {
    const item = await this.repo.getStoragePolicy(schoolId, id);
    if (!item) throw new EduCloudStoragePolicyError(id);
    return item;
  }
  async listStoragePolicys(schoolId: string, filters?: Record<string, unknown>): Promise<StoragePolicy[]> {
    return this.repo.listStoragePolicy(schoolId, filters);
  }
  async createStoragePolicy(schoolId: string, data: Partial<StoragePolicy>): Promise<StoragePolicy> {
    return this.repo.createStoragePolicy(schoolId, data as any);
  }
  async updateStoragePolicy(schoolId: string, id: string, data: Partial<StoragePolicy>): Promise<StoragePolicy> {
    const existing = await this.repo.getStoragePolicy(schoolId, id);
    if (!existing) throw new EduCloudStoragePolicyError(id);
    return this.repo.updateStoragePolicy(schoolId, id, data as any);
  }
  async deleteStoragePolicy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getStoragePolicy(schoolId, id);
    if (!existing) throw new EduCloudStoragePolicyError(id);
    return this.repo.deleteStoragePolicy(schoolId, id);
  }
}
