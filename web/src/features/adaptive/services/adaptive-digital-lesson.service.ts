import type { SupabaseClient } from '@supabase/supabase-js';
import type { DigitalLesson } from '@educi/types';
import { AdaptiveDigitalLessonNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveDigitalLessonService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getDigitalLesson(schoolId: string, id: string): Promise<DigitalLesson> {
    const item = await this.repo.getDigitalLesson(schoolId, id);
    if (!item) throw new AdaptiveDigitalLessonNotFoundError(id);
    return item;
  }
  async listDigitalLessons(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalLesson[]> {
    return this.repo.listDigitalLessons(schoolId, filters);
  }
  async createDigitalLesson(schoolId: string, data: Omit<DigitalLesson, 'id' | 'created_at'>): Promise<DigitalLesson> {
    return this.repo.createDigitalLesson(schoolId, data);
  }
  async updateDigitalLesson(schoolId: string, id: string, data: Partial<Omit<DigitalLesson, 'id' | 'created_at'>>): Promise<DigitalLesson> {
    const existing = await this.repo.getDigitalLesson(schoolId, id);
    if (!existing) throw new AdaptiveDigitalLessonNotFoundError(id);
    return this.repo.updateDigitalLesson(schoolId, id, data);
  }
  async deleteDigitalLesson(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDigitalLesson(schoolId, id);
    if (!existing) throw new AdaptiveDigitalLessonNotFoundError(id);
    return this.repo.deleteDigitalLesson(schoolId, id);
  }
}
