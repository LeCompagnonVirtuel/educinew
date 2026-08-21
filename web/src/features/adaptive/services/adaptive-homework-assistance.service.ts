import type { SupabaseClient } from '@supabase/supabase-js';
import type { HomeworkAssistance, HomeworkAssistanceCreate } from '@educi/types';
import { AdaptiveHomeworkAssistanceNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveHomeworkAssistanceService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getAssistance(schoolId: string, id: string): Promise<HomeworkAssistance> {
    const item = await this.repo.getHomeworkAssistance(schoolId, id);
    if (!item) throw new AdaptiveHomeworkAssistanceNotFoundError(id);
    return item;
  }
  async listAssistances(schoolId: string, filters?: Record<string, unknown>): Promise<HomeworkAssistance[]> {
    return this.repo.listHomeworkAssistances(schoolId, filters);
  }
  async createAssistance(schoolId: string, data: HomeworkAssistanceCreate): Promise<HomeworkAssistance> {
    return this.repo.createHomeworkAssistance(schoolId, data);
  }
  async updateAssistance(schoolId: string, id: string, data: Partial<HomeworkAssistanceCreate>): Promise<HomeworkAssistance> {
    const existing = await this.repo.getHomeworkAssistance(schoolId, id);
    if (!existing) throw new AdaptiveHomeworkAssistanceNotFoundError(id);
    return this.repo.updateHomeworkAssistance(schoolId, id, data);
  }
  async deleteAssistance(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getHomeworkAssistance(schoolId, id);
    if (!existing) throw new AdaptiveHomeworkAssistanceNotFoundError(id);
    return this.repo.deleteHomeworkAssistance(schoolId, id);
  }
}
