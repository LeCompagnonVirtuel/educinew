import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudStorage } from '@educi/types';
import { EduCloudCloudStorageError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudStorage {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudStorage(schoolId: string, id: string): Promise<CloudStorage> {
    const item = await this.repo.getCloudStorage(schoolId, id);
    if (!item) throw new EduCloudCloudStorageError(id);
    return item;
  }
  async listCloudStorages(schoolId: string, filters?: Record<string, unknown>): Promise<CloudStorage[]> {
    return this.repo.listCloudStorage(schoolId, filters);
  }
  async createCloudStorage(schoolId: string, data: Partial<CloudStorage>): Promise<CloudStorage> {
    return this.repo.createCloudStorage(schoolId, data as any);
  }
  async updateCloudStorage(schoolId: string, id: string, data: Partial<CloudStorage>): Promise<CloudStorage> {
    const existing = await this.repo.getCloudStorage(schoolId, id);
    if (!existing) throw new EduCloudCloudStorageError(id);
    return this.repo.updateCloudStorage(schoolId, id, data as any);
  }
  async deleteCloudStorage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudStorage(schoolId, id);
    if (!existing) throw new EduCloudCloudStorageError(id);
    return this.repo.deleteCloudStorage(schoolId, id);
  }
}
