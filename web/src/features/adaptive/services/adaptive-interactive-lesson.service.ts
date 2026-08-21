import type { SupabaseClient } from '@supabase/supabase-js';
import type { InteractiveLesson } from '@educi/types';
import { AdaptiveInteractiveLessonNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveInteractiveLessonService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getInteractiveLesson(schoolId: string, id: string): Promise<InteractiveLesson> {
    const item = await this.repo.getInteractiveLesson(schoolId, id);
    if (!item) throw new AdaptiveInteractiveLessonNotFoundError(id);
    return item;
  }
  async listInteractiveLessons(schoolId: string, filters?: Record<string, unknown>): Promise<InteractiveLesson[]> {
    return this.repo.listInteractiveLessons(schoolId, filters);
  }
  async createInteractiveLesson(schoolId: string, data: Omit<InteractiveLesson, 'id' | 'created_at'>): Promise<InteractiveLesson> {
    return this.repo.createInteractiveLesson(schoolId, data);
  }
  async updateInteractiveLesson(schoolId: string, id: string, data: Partial<Omit<InteractiveLesson, 'id' | 'created_at'>>): Promise<InteractiveLesson> {
    const existing = await this.repo.getInteractiveLesson(schoolId, id);
    if (!existing) throw new AdaptiveInteractiveLessonNotFoundError(id);
    return this.repo.updateInteractiveLesson(schoolId, id, data);
  }
  async deleteInteractiveLesson(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getInteractiveLesson(schoolId, id);
    if (!existing) throw new AdaptiveInteractiveLessonNotFoundError(id);
    return this.repo.deleteInteractiveLesson(schoolId, id);
  }
}
