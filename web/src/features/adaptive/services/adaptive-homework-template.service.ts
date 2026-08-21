import type { SupabaseClient } from '@supabase/supabase-js';
import type { HomeworkTemplate } from '@educi/types';
import { AdaptiveHomeworkTemplateError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveHomeworkTemplateService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getHomeworkTemplate(schoolId: string, id: string): Promise<HomeworkTemplate> {
    const item = await this.repo.getHomeworkTemplate(schoolId, id);
    if (!item) throw new AdaptiveHomeworkTemplateError(id);
    return item;
  }
  async listHomeworkTemplates(schoolId: string, filters?: Record<string, unknown>): Promise<HomeworkTemplate[]> {
    return this.repo.listHomeworkTemplates(schoolId, filters);
  }
  async createHomeworkTemplate(schoolId: string, data: Omit<HomeworkTemplate, 'id' | 'created_at'>): Promise<HomeworkTemplate> {
    return this.repo.createHomeworkTemplate(schoolId, data);
  }
  async updateHomeworkTemplate(schoolId: string, id: string, data: Partial<Omit<HomeworkTemplate, 'id' | 'created_at'>>): Promise<HomeworkTemplate> {
    const existing = await this.repo.getHomeworkTemplate(schoolId, id);
    if (!existing) throw new AdaptiveHomeworkTemplateError(id);
    return this.repo.updateHomeworkTemplate(schoolId, id, data);
  }
  async deleteHomeworkTemplate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getHomeworkTemplate(schoolId, id);
    if (!existing) throw new AdaptiveHomeworkTemplateError(id);
    return this.repo.deleteHomeworkTemplate(schoolId, id);
  }
}
