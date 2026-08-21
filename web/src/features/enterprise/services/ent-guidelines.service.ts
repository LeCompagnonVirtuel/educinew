// Enterprise Platform Service - Guidelines
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntGuidelineService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getGuideline(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findGuidelineById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listGuidelines(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllGuidelines(schoolId, filters);
  }
  async createGuideline(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createGuideline(schoolId, data);
  }
  async updateGuideline(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findGuidelineById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateGuideline(schoolId, id, data);
  }
  async deleteGuideline(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findGuidelineById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteGuideline(schoolId, id);
  }
  async countGuidelines(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countGuidelines(schoolId, filters);
  }
}
