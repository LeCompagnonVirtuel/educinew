// Enterprise Platform Service - PlaybooksTriggers
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlaybookTriggerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlaybooksTrigger(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPlaybooksTriggerById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPlaybooksTriggers(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPlaybooksTriggers(schoolId, filters);
  }
  async createPlaybooksTrigger(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPlaybooksTrigger(schoolId, data);
  }
  async updatePlaybooksTrigger(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPlaybooksTriggerById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePlaybooksTrigger(schoolId, id, data);
  }
  async deletePlaybooksTrigger(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlaybooksTriggerById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePlaybooksTrigger(schoolId, id);
  }
  async countPlaybooksTriggers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlaybooksTriggers(schoolId, filters);
  }
}
