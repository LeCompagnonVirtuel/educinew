// Enterprise Platform Service - TemplatesVersions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTemplateVersionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTemplatesVersion(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findTemplatesVersionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listTemplatesVersions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllTemplatesVersions(schoolId, filters);
  }
  async createTemplatesVersion(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createTemplatesVersion(schoolId, data);
  }
  async updateTemplatesVersion(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findTemplatesVersionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateTemplatesVersion(schoolId, id, data);
  }
  async deleteTemplatesVersion(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTemplatesVersionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteTemplatesVersion(schoolId, id);
  }
  async countTemplatesVersions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTemplatesVersions(schoolId, filters);
  }
}
