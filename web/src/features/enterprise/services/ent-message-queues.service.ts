// Enterprise Platform Service - MessageQueues
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntMessageQueueService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getMessageQueue(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findMessageQueueById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listMessageQueues(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllMessageQueues(schoolId, filters);
  }
  async createMessageQueue(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createMessageQueue(schoolId, data);
  }
  async updateMessageQueue(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findMessageQueueById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateMessageQueue(schoolId, id, data);
  }
  async deleteMessageQueue(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMessageQueueById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteMessageQueue(schoolId, id);
  }
  async countMessageQueues(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMessageQueues(schoolId, filters);
  }
}
