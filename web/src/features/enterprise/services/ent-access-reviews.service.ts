// Enterprise Platform Service - AccessReviews
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAccessReviewService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAccessReview(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findAccessReviewById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listAccessReviews(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllAccessReviews(schoolId, filters);
  }
  async createAccessReview(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createAccessReview(schoolId, data);
  }
  async updateAccessReview(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findAccessReviewById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateAccessReview(schoolId, id, data);
  }
  async deleteAccessReview(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAccessReviewById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteAccessReview(schoolId, id);
  }
  async countAccessReviews(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAccessReviews(schoolId, filters);
  }
}
