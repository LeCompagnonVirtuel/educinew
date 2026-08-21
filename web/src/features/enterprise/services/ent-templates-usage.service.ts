// Enterprise Platform Service - TemplatesUsage
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTemplateUsageService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTemplatesUsage(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findTemplatesUsageById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listTemplatesUsage(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllTemplatesUsage(schoolId, filters);
  }
  async createTemplatesUsage(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createTemplatesUsage(schoolId, data);
  }
  async updateTemplatesUsage(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findTemplatesUsageById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateTemplatesUsage(schoolId, id, data);
  }
  async deleteTemplatesUsage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTemplatesUsageById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteTemplatesUsage(schoolId, id);
  }
  async countTemplatesUsage(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTemplatesUsage(schoolId, filters);
  }
}
