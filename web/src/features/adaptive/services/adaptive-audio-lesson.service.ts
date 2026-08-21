import type { SupabaseClient } from '@supabase/supabase-js';
import type { AudioLesson } from '@educi/types';
import { AdaptiveAudioLessonNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveAudioLessonService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getAudioLesson(schoolId: string, id: string): Promise<AudioLesson> {
    const item = await this.repo.getAudioLesson(schoolId, id);
    if (!item) throw new AdaptiveAudioLessonNotFoundError(id);
    return item;
  }
  async listAudioLessons(schoolId: string, filters?: Record<string, unknown>): Promise<AudioLesson[]> {
    return this.repo.listAudioLessons(schoolId, filters);
  }
  async createAudioLesson(schoolId: string, data: Omit<AudioLesson, 'id' | 'created_at'>): Promise<AudioLesson> {
    return this.repo.createAudioLesson(schoolId, data);
  }
  async updateAudioLesson(schoolId: string, id: string, data: Partial<Omit<AudioLesson, 'id' | 'created_at'>>): Promise<AudioLesson> {
    const existing = await this.repo.getAudioLesson(schoolId, id);
    if (!existing) throw new AdaptiveAudioLessonNotFoundError(id);
    return this.repo.updateAudioLesson(schoolId, id, data);
  }
  async deleteAudioLesson(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAudioLesson(schoolId, id);
    if (!existing) throw new AdaptiveAudioLessonNotFoundError(id);
    return this.repo.deleteAudioLesson(schoolId, id);
  }
}
