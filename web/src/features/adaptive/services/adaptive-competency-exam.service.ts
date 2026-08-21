import type { SupabaseClient } from '@supabase/supabase-js';
import type { CompetencyExam } from '@educi/types';
import { AdaptiveCompetencyExamNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveCompetencyExamService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getCompetencyExam(schoolId: string, id: string): Promise<CompetencyExam> {
    const item = await this.repo.getCompetencyExam(schoolId, id);
    if (!item) throw new AdaptiveCompetencyExamNotFoundError(id);
    return item;
  }
  async listCompetencyExams(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyExam[]> {
    return this.repo.listCompetencyExams(schoolId, filters);
  }
  async createCompetencyExam(schoolId: string, data: Omit<CompetencyExam, 'id' | 'created_at'>): Promise<CompetencyExam> {
    return this.repo.createCompetencyExam(schoolId, data);
  }
  async updateCompetencyExam(schoolId: string, id: string, data: Partial<Omit<CompetencyExam, 'id' | 'created_at'>>): Promise<CompetencyExam> {
    const existing = await this.repo.getCompetencyExam(schoolId, id);
    if (!existing) throw new AdaptiveCompetencyExamNotFoundError(id);
    return this.repo.updateCompetencyExam(schoolId, id, data);
  }
  async deleteCompetencyExam(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCompetencyExam(schoolId, id);
    if (!existing) throw new AdaptiveCompetencyExamNotFoundError(id);
    return this.repo.deleteCompetencyExam(schoolId, id);
  }
}
