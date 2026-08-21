import type { SupabaseClient } from '@supabase/supabase-js';
import type { QueueMessage } from '@educi/types';
import { EduCloudQueueMessageError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudQueueMessage {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getQueueMessage(schoolId: string, id: string): Promise<QueueMessage> {
    const item = await this.repo.getQueueMessage(schoolId, id);
    if (!item) throw new EduCloudQueueMessageError(id);
    return item;
  }
  async listQueueMessages(schoolId: string, filters?: Record<string, unknown>): Promise<QueueMessage[]> {
    return this.repo.listQueueMessage(schoolId, filters);
  }
  async createQueueMessage(schoolId: string, data: Partial<QueueMessage>): Promise<QueueMessage> {
    return this.repo.createQueueMessage(schoolId, data as any);
  }
  async updateQueueMessage(schoolId: string, id: string, data: Partial<QueueMessage>): Promise<QueueMessage> {
    const existing = await this.repo.getQueueMessage(schoolId, id);
    if (!existing) throw new EduCloudQueueMessageError(id);
    return this.repo.updateQueueMessage(schoolId, id, data as any);
  }
  async deleteQueueMessage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getQueueMessage(schoolId, id);
    if (!existing) throw new EduCloudQueueMessageError(id);
    return this.repo.deleteQueueMessage(schoolId, id);
  }
}
