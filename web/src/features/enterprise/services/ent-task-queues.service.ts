// Enterprise Platform Service - TaskQueues
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTaskQueueService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTaskQueue(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findTaskQueueById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listTaskQueues(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllTaskQueues(schoolId, filters);
  }
  async createTaskQueue(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createTaskQueue(schoolId, data);
  }
  async updateTaskQueue(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findTaskQueueById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateTaskQueue(schoolId, id, data);
  }
  async deleteTaskQueue(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTaskQueueById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteTaskQueue(schoolId, id);
  }
  async countTaskQueues(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTaskQueues(schoolId, filters);
  }
}
