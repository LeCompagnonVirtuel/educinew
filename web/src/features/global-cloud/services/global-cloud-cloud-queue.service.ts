import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudQueue } from '@educi/types';
import { EduCloudCloudQueueError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudQueue {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudQueue(schoolId: string, id: string): Promise<CloudQueue> {
    const item = await this.repo.getCloudQueue(schoolId, id);
    if (!item) throw new EduCloudCloudQueueError(id);
    return item;
  }
  async listCloudQueues(schoolId: string, filters?: Record<string, unknown>): Promise<CloudQueue[]> {
    return this.repo.listCloudQueue(schoolId, filters);
  }
  async createCloudQueue(schoolId: string, data: Partial<CloudQueue>): Promise<CloudQueue> {
    return this.repo.createCloudQueue(schoolId, data as any);
  }
  async updateCloudQueue(schoolId: string, id: string, data: Partial<CloudQueue>): Promise<CloudQueue> {
    const existing = await this.repo.getCloudQueue(schoolId, id);
    if (!existing) throw new EduCloudCloudQueueError(id);
    return this.repo.updateCloudQueue(schoolId, id, data as any);
  }
  async deleteCloudQueue(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudQueue(schoolId, id);
    if (!existing) throw new EduCloudCloudQueueError(id);
    return this.repo.deleteCloudQueue(schoolId, id);
  }
}
