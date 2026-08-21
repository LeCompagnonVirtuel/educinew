// Enterprise Platform Service - AppStoreReviews
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAppReviewService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAppStoreReview(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findAppStoreReviewById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listAppStoreReviews(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllAppStoreReviews(schoolId, filters);
  }
  async createAppStoreReview(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createAppStoreReview(schoolId, data);
  }
  async updateAppStoreReview(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findAppStoreReviewById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateAppStoreReview(schoolId, id, data);
  }
  async deleteAppStoreReview(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAppStoreReviewById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteAppStoreReview(schoolId, id);
  }
  async countAppStoreReviews(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAppStoreReviews(schoolId, filters);
  }
}
