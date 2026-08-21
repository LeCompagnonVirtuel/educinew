import type { SupabaseClient } from '@supabase/supabase-js';
import type { RecommendedBook, RecommendedBookCreate } from '@educi/types';
import { AdaptiveRecommendedBookError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveRecommendedBookService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getBook(schoolId: string, id: string): Promise<RecommendedBook> {
    const item = await this.repo.getRecommendedBook(schoolId, id);
    if (!item) throw new AdaptiveRecommendedBookError(id);
    return item;
  }
  async listBooks(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedBook[]> {
    return this.repo.listRecommendedBooks(schoolId, filters);
  }
  async createBook(schoolId: string, data: RecommendedBookCreate): Promise<RecommendedBook> {
    return this.repo.createRecommendedBook(schoolId, data);
  }
  async updateBook(schoolId: string, id: string, data: Partial<RecommendedBookCreate>): Promise<RecommendedBook> {
    const existing = await this.repo.getRecommendedBook(schoolId, id);
    if (!existing) throw new AdaptiveRecommendedBookError(id);
    return this.repo.updateRecommendedBook(schoolId, id, data);
  }
  async deleteBook(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRecommendedBook(schoolId, id);
    if (!existing) throw new AdaptiveRecommendedBookError(id);
    return this.repo.deleteRecommendedBook(schoolId, id);
  }
}
