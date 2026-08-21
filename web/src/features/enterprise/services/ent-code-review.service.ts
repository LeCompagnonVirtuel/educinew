// Enterprise Platform Service - CodeReview
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CodeReview, CodeReviewCreate } from '@educi/types';
import { EntCodeReviewNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCodeReviewService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCodeReview(schoolId: string, id: string): Promise<CodeReview> {
    const item = await this.repo.findCodeReviewById(schoolId, id);
    if (!item) throw new EntCodeReviewNotFoundError(id);
    return item;
  }
  async listCodeReviews(schoolId: string, filters?: Record<string, unknown>): Promise<CodeReview[]> {
    return this.repo.findAllCodeReviews(schoolId, filters);
  }
  async createCodeReview(schoolId: string, data: CodeReviewCreate): Promise<CodeReview> {
    return this.repo.createCodeReview(schoolId, data);
  }
  async updateCodeReview(schoolId: string, id: string, data: Partial<CodeReviewCreate>): Promise<CodeReview> {
    const existing = await this.repo.findCodeReviewById(schoolId, id);
    if (!existing) throw new EntCodeReviewNotFoundError(id);
    return this.repo.updateCodeReview(schoolId, id, data);
  }
  async deleteCodeReview(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCodeReviewById(schoolId, id);
    if (!existing) throw new EntCodeReviewNotFoundError(id);
    return this.repo.deleteCodeReview(schoolId, id);
  }
  async countCodeReviews(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCodeReviews(schoolId, filters);
  }
}
