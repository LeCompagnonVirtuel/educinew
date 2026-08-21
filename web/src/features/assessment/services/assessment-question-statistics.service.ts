import type { SupabaseClient } from '@supabase/supabase-js';
import type { QuestionStatistics, QuestionStatisticsCreate } from '@educi/types';
import { AssessmentQuestionStatisticsError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentQuestionStatisticsService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getQuestionStatistics(schoolId: string, id: string): Promise<QuestionStatistics> {
    const item = await this.repo.getQuestionStatistics(id, schoolId);
    if (!item) throw new AssessmentQuestionStatisticsError(id);
    return item;
  }
  async listQuestionStatistics(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionStatistics[]> {
    return this.repo.listQuestionStatistics(schoolId, filters);
  }
  async createQuestionStatistics(schoolId: string, data: QuestionStatisticsCreate): Promise<QuestionStatistics> {
    return this.repo.createQuestionStatistics({ ...data, school_id: schoolId } as any);
  }
  async updateQuestionStatistics(schoolId: string, id: string, data: Partial<QuestionStatisticsCreate>): Promise<QuestionStatistics> {
    const existing = await this.repo.getQuestionStatistics(id, schoolId);
    if (!existing) throw new AssessmentQuestionStatisticsError(id);
    return this.repo.updateQuestionStatistics(id, schoolId, data as any);
  }
  async deleteQuestionStatistics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getQuestionStatistics(id, schoolId);
    if (!existing) throw new AssessmentQuestionStatisticsError(id);
    return this.repo.deleteQuestionStatistics(id, schoolId);
  }
}
