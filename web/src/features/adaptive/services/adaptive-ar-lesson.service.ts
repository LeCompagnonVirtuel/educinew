import type { SupabaseClient } from '@supabase/supabase-js';
import type { ARLesson } from '@educi/types';
import { AdaptiveARLessonNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveARLessonService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getARLesson(schoolId: string, id: string): Promise<ARLesson> {
    const item = await this.repo.getARLesson(schoolId, id);
    if (!item) throw new AdaptiveARLessonNotFoundError(id);
    return item;
  }
  async listARLessons(schoolId: string, filters?: Record<string, unknown>): Promise<ARLesson[]> {
    return this.repo.listARLessons(schoolId, filters);
  }
  async createARLesson(schoolId: string, data: Omit<ARLesson, 'id' | 'created_at'>): Promise<ARLesson> {
    return this.repo.createARLesson(schoolId, data);
  }
  async updateARLesson(schoolId: string, id: string, data: Partial<Omit<ARLesson, 'id' | 'created_at'>>): Promise<ARLesson> {
    const existing = await this.repo.getARLesson(schoolId, id);
    if (!existing) throw new AdaptiveARLessonNotFoundError(id);
    return this.repo.updateARLesson(schoolId, id, data);
  }
  async deleteARLesson(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getARLesson(schoolId, id);
    if (!existing) throw new AdaptiveARLessonNotFoundError(id);
    return this.repo.deleteARLesson(schoolId, id);
  }
}
