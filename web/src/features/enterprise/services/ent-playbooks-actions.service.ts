// Enterprise Platform Service - PlaybooksActions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlaybookActionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlaybooksAction(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPlaybooksActionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPlaybooksActions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPlaybooksActions(schoolId, filters);
  }
  async createPlaybooksAction(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPlaybooksAction(schoolId, data);
  }
  async updatePlaybooksAction(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPlaybooksActionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePlaybooksAction(schoolId, id, data);
  }
  async deletePlaybooksAction(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlaybooksActionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePlaybooksAction(schoolId, id);
  }
  async countPlaybooksActions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlaybooksActions(schoolId, filters);
  }
}
