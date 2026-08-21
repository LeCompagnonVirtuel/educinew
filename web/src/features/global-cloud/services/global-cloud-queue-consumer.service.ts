import type { SupabaseClient } from '@supabase/supabase-js';
import type { QueueConsumer } from '@educi/types';
import { EduCloudQueueConsumerError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudQueueConsumer {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getQueueConsumer(schoolId: string, id: string): Promise<QueueConsumer> {
    const item = await this.repo.getQueueConsumer(schoolId, id);
    if (!item) throw new EduCloudQueueConsumerError(id);
    return item;
  }
  async listQueueConsumers(schoolId: string, filters?: Record<string, unknown>): Promise<QueueConsumer[]> {
    return this.repo.listQueueConsumer(schoolId, filters);
  }
  async createQueueConsumer(schoolId: string, data: Partial<QueueConsumer>): Promise<QueueConsumer> {
    return this.repo.createQueueConsumer(schoolId, data as any);
  }
  async updateQueueConsumer(schoolId: string, id: string, data: Partial<QueueConsumer>): Promise<QueueConsumer> {
    const existing = await this.repo.getQueueConsumer(schoolId, id);
    if (!existing) throw new EduCloudQueueConsumerError(id);
    return this.repo.updateQueueConsumer(schoolId, id, data as any);
  }
  async deleteQueueConsumer(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getQueueConsumer(schoolId, id);
    if (!existing) throw new EduCloudQueueConsumerError(id);
    return this.repo.deleteQueueConsumer(schoolId, id);
  }
}
