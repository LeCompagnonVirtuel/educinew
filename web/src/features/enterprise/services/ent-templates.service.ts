// Enterprise Platform Service - Templates
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTemplateService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTemplate(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findTemplateById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listTemplates(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllTemplates(schoolId, filters);
  }
  async createTemplate(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createTemplate(schoolId, data);
  }
  async updateTemplate(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findTemplateById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateTemplate(schoolId, id, data);
  }
  async deleteTemplate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTemplateById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteTemplate(schoolId, id);
  }
  async countTemplates(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTemplates(schoolId, filters);
  }
}
