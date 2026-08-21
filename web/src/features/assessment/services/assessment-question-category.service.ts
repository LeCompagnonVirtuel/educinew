import type { SupabaseClient } from '@supabase/supabase-js';
import type { QuestionCategoryEntity, QuestionCategoryEntityCreate } from '@educi/types';
import { AssessmentQuestionCategoryError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentQuestionCategoryService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getQuestionCategory(schoolId: string, id: string): Promise<QuestionCategoryEntity> {
    const item = await this.repo.getQuestionCategory(id, schoolId);
    if (!item) throw new AssessmentQuestionCategoryError(id);
    return item;
  }
  async listQuestionCategories(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionCategoryEntity[]> {
    return this.repo.listQuestionCategories(schoolId, filters);
  }
  async createQuestionCategory(schoolId: string, data: QuestionCategoryEntityCreate): Promise<QuestionCategoryEntity> {
    return this.repo.createQuestionCategory({ ...data, school_id: schoolId } as any);
  }
  async updateQuestionCategory(schoolId: string, id: string, data: Partial<QuestionCategoryEntityCreate>): Promise<QuestionCategoryEntity> {
    const existing = await this.repo.getQuestionCategory(id, schoolId);
    if (!existing) throw new AssessmentQuestionCategoryError(id);
    return this.repo.updateQuestionCategory(id, schoolId, data as any);
  }
  async deleteQuestionCategory(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getQuestionCategory(id, schoolId);
    if (!existing) throw new AssessmentQuestionCategoryError(id);
    return this.repo.deleteQuestionCategory(id, schoolId);
  }
}
