// Enterprise Platform Service - Playbooks
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlaybookService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlaybook(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPlaybookById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPlaybooks(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPlaybooks(schoolId, filters);
  }
  async createPlaybook(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPlaybook(schoolId, data);
  }
  async updatePlaybook(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPlaybookById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePlaybook(schoolId, id, data);
  }
  async deletePlaybook(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlaybookById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePlaybook(schoolId, id);
  }
  async countPlaybooks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlaybooks(schoolId, filters);
  }
}
