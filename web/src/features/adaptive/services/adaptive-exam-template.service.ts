import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamTemplate } from '@educi/types';
import { AdaptiveExamTemplateError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveExamTemplateService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getExamTemplate(schoolId: string, id: string): Promise<ExamTemplate> {
    const item = await this.repo.getExamTemplate(schoolId, id);
    if (!item) throw new AdaptiveExamTemplateError(id);
    return item;
  }
  async listExamTemplates(schoolId: string, filters?: Record<string, unknown>): Promise<ExamTemplate[]> {
    return this.repo.listExamTemplates(schoolId, filters);
  }
  async createExamTemplate(schoolId: string, data: Omit<ExamTemplate, 'id' | 'created_at'>): Promise<ExamTemplate> {
    return this.repo.createExamTemplate(schoolId, data);
  }
  async updateExamTemplate(schoolId: string, id: string, data: Partial<Omit<ExamTemplate, 'id' | 'created_at'>>): Promise<ExamTemplate> {
    const existing = await this.repo.getExamTemplate(schoolId, id);
    if (!existing) throw new AdaptiveExamTemplateError(id);
    return this.repo.updateExamTemplate(schoolId, id, data);
  }
  async deleteExamTemplate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getExamTemplate(schoolId, id);
    if (!existing) throw new AdaptiveExamTemplateError(id);
    return this.repo.deleteExamTemplate(schoolId, id);
  }
}
