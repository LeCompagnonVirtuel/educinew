import type { SupabaseClient } from '@supabase/supabase-js';
import type { VRLesson } from '@educi/types';
import { AdaptiveVRLessonNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveVRLessonService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getVRLesson(schoolId: string, id: string): Promise<VRLesson> {
    const item = await this.repo.getVRLesson(schoolId, id);
    if (!item) throw new AdaptiveVRLessonNotFoundError(id);
    return item;
  }
  async listVRLessons(schoolId: string, filters?: Record<string, unknown>): Promise<VRLesson[]> {
    return this.repo.listVRLessons(schoolId, filters);
  }
  async createVRLesson(schoolId: string, data: Omit<VRLesson, 'id' | 'created_at'>): Promise<VRLesson> {
    return this.repo.createVRLesson(schoolId, data);
  }
  async updateVRLesson(schoolId: string, id: string, data: Partial<Omit<VRLesson, 'id' | 'created_at'>>): Promise<VRLesson> {
    const existing = await this.repo.getVRLesson(schoolId, id);
    if (!existing) throw new AdaptiveVRLessonNotFoundError(id);
    return this.repo.updateVRLesson(schoolId, id, data);
  }
  async deleteVRLesson(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getVRLesson(schoolId, id);
    if (!existing) throw new AdaptiveVRLessonNotFoundError(id);
    return this.repo.deleteVRLesson(schoolId, id);
  }
}
