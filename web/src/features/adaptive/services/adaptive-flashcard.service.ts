import type { SupabaseClient } from '@supabase/supabase-js';
import type { Flashcard } from '@educi/types';
import { AdaptiveFlashcardNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveFlashcardService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getFlashcard(schoolId: string, id: string): Promise<Flashcard> {
    const item = await this.repo.getFlashcard(schoolId, id);
    if (!item) throw new AdaptiveFlashcardNotFoundError(id);
    return item;
  }
  async listFlashcards(schoolId: string, filters?: Record<string, unknown>): Promise<Flashcard[]> {
    return this.repo.listFlashcards(schoolId, filters);
  }
  async createFlashcard(schoolId: string, data: Omit<Flashcard, 'id' | 'created_at'>): Promise<Flashcard> {
    return this.repo.createFlashcard(schoolId, data);
  }
  async updateFlashcard(schoolId: string, id: string, data: Partial<Omit<Flashcard, 'id' | 'created_at'>>): Promise<Flashcard> {
    const existing = await this.repo.getFlashcard(schoolId, id);
    if (!existing) throw new AdaptiveFlashcardNotFoundError(id);
    return this.repo.updateFlashcard(schoolId, id, data);
  }
  async deleteFlashcard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getFlashcard(schoolId, id);
    if (!existing) throw new AdaptiveFlashcardNotFoundError(id);
    return this.repo.deleteFlashcard(schoolId, id);
  }
}
