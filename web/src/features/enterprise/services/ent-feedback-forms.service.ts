// Enterprise Platform Service - FeedbackForms
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFeedbackFormService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getFeedbackForm(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findFeedbackFormById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listFeedbackForms(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllFeedbackForms(schoolId, filters);
  }
  async createFeedbackForm(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createFeedbackForm(schoolId, data);
  }
  async updateFeedbackForm(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findFeedbackFormById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateFeedbackForm(schoolId, id, data);
  }
  async deleteFeedbackForm(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFeedbackFormById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteFeedbackForm(schoolId, id);
  }
  async countFeedbackForms(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFeedbackForms(schoolId, filters);
  }
}
