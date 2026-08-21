import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProductReview } from '@educi/types';
import { EduOSProductReviewError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSProductReviewService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getProductReview(schoolId: string, id: string): Promise<ProductReview> {
    const item = await this.repo.getProductReview(schoolId, id);
    if (!item) throw new EduOSProductReviewError(id);
    return item;
  }
  async listProductReviews(schoolId: string, filters?: Record<string, unknown>): Promise<ProductReview[]> {
    return this.repo.listProductReviews(schoolId, filters);
  }
  async createProductReview(schoolId: string, data: Partial<ProductReview>): Promise<ProductReview> {
    return this.repo.createProductReview(schoolId, data as any);
  }
  async updateProductReview(schoolId: string, id: string, data: Partial<ProductReview>): Promise<ProductReview> {
    const existing = await this.repo.getProductReview(schoolId, id);
    if (!existing) throw new EduOSProductReviewError(id);
    return this.repo.updateProductReview(schoolId, id, data as any);
  }
  async deleteProductReview(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getProductReview(schoolId, id);
    if (!existing) throw new EduOSProductReviewError(id);
    return this.repo.deleteProductReview(schoolId, id);
  }
}

