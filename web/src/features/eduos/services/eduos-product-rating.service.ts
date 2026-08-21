import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProductRating } from '@educi/types';
import { EduOSProductRatingError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSProductRatingService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getProductRating(schoolId: string, id: string): Promise<ProductRating> {
    const item = await this.repo.getProductRating(schoolId, id);
    if (!item) throw new EduOSProductRatingError(id);
    return item;
  }
  async listProductRatings(schoolId: string, filters?: Record<string, unknown>): Promise<ProductRating[]> {
    return this.repo.listProductRatings(schoolId, filters);
  }
  async createProductRating(schoolId: string, data: Partial<ProductRating>): Promise<ProductRating> {
    return this.repo.createProductRating(schoolId, data as any);
  }
  async updateProductRating(schoolId: string, id: string, data: Partial<ProductRating>): Promise<ProductRating> {
    const existing = await this.repo.getProductRating(schoolId, id);
    if (!existing) throw new EduOSProductRatingError(id);
    return this.repo.updateProductRating(schoolId, id, data as any);
  }
  async deleteProductRating(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getProductRating(schoolId, id);
    if (!existing) throw new EduOSProductRatingError(id);
    return this.repo.deleteProductRating(schoolId, id);
  }
}

