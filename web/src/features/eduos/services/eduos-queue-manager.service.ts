import type { SupabaseClient } from '@supabase/supabase-js';
import type { QueueManager } from '@educi/types';
import { EduOSQueueManagerError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSQueueManagerService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getQueueManager(schoolId: string, id: string): Promise<QueueManager> {
    const item = await this.repo.getQueueManager(schoolId, id);
    if (!item) throw new EduOSQueueManagerError(id);
    return item;
  }
  async listQueueManagers(schoolId: string, filters?: Record<string, unknown>): Promise<QueueManager[]> {
    return this.repo.listQueueManagers(schoolId, filters);
  }
  async createQueueManager(schoolId: string, data: Partial<QueueManager>): Promise<QueueManager> {
    return this.repo.createQueueManager(schoolId, data as any);
  }
  async updateQueueManager(schoolId: string, id: string, data: Partial<QueueManager>): Promise<QueueManager> {
    const existing = await this.repo.getQueueManager(schoolId, id);
    if (!existing) throw new EduOSQueueManagerError(id);
    return this.repo.updateQueueManager(schoolId, id, data as any);
  }
  async deleteQueueManager(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getQueueManager(schoolId, id);
    if (!existing) throw new EduOSQueueManagerError(id);
    return this.repo.deleteQueueManager(schoolId, id);
  }
}

