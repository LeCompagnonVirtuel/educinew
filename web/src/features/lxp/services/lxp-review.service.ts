import type { SupabaseClient } from '@supabase/supabase-js';
import type { Review } from '@educi/types';
import { LxpReviewNotFoundError, LxpReviewCreateError, LxpLicenseNotFoundError, LxpLicenseCreateError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpReviewService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getReview(schoolId: string, id: string): Promise<Review> {
    const review = await this.repo.findReviewById(schoolId, id);
    if (!review) throw new LxpReviewNotFoundError(id);
    return review;
  }

  async listReviews(courseId: string): Promise<readonly Review[]> {
    return this.repo.findReviews(courseId);
  }

  async createReview(data: Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'helpfulCount' | 'reportCount'>): Promise<Review> {
    const created = await this.repo.createReview(data);
    if (!created) throw new LxpReviewCreateError();
    return created;
  }

  async updateReview(schoolId: string, id: string, data: Partial<Review>): Promise<Review> {
    const existing = await this.repo.findReviewById(schoolId, id);
    if (!existing) throw new LxpReviewNotFoundError(id);
    const updated = await this.repo.updateReview(id, data);
    if (!updated) throw new LxpReviewNotFoundError();
    return updated;
  }

  async deleteReview(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findReviewById(schoolId, id);
    if (!existing) throw new LxpReviewNotFoundError(id);
    await this.repo.deleteReview(id);
  }
}
