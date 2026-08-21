import type { SupabaseClient } from '@supabase/supabase-js';
import type { VideoLesson } from '@educi/types';
import { AdaptiveVideoLessonNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveVideoLessonService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getVideoLesson(schoolId: string, id: string): Promise<VideoLesson> {
    const item = await this.repo.getVideoLesson(schoolId, id);
    if (!item) throw new AdaptiveVideoLessonNotFoundError(id);
    return item;
  }
  async listVideoLessons(schoolId: string, filters?: Record<string, unknown>): Promise<VideoLesson[]> {
    return this.repo.listVideoLessons(schoolId, filters);
  }
  async createVideoLesson(schoolId: string, data: Omit<VideoLesson, 'id' | 'created_at'>): Promise<VideoLesson> {
    return this.repo.createVideoLesson(schoolId, data);
  }
  async updateVideoLesson(schoolId: string, id: string, data: Partial<Omit<VideoLesson, 'id' | 'created_at'>>): Promise<VideoLesson> {
    const existing = await this.repo.getVideoLesson(schoolId, id);
    if (!existing) throw new AdaptiveVideoLessonNotFoundError(id);
    return this.repo.updateVideoLesson(schoolId, id, data);
  }
  async deleteVideoLesson(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getVideoLesson(schoolId, id);
    if (!existing) throw new AdaptiveVideoLessonNotFoundError(id);
    return this.repo.deleteVideoLesson(schoolId, id);
  }
}
