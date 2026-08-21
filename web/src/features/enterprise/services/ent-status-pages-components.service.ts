// Enterprise Platform Service - StatusPagesComponents
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntStatusPageComponentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getStatusPagesComponent(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findStatusPagesComponentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listStatusPagesComponents(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllStatusPagesComponents(schoolId, filters);
  }
  async createStatusPagesComponent(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createStatusPagesComponent(schoolId, data);
  }
  async updateStatusPagesComponent(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findStatusPagesComponentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateStatusPagesComponent(schoolId, id, data);
  }
  async deleteStatusPagesComponent(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findStatusPagesComponentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteStatusPagesComponent(schoolId, id);
  }
  async countStatusPagesComponents(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countStatusPagesComponents(schoolId, filters);
  }
}
