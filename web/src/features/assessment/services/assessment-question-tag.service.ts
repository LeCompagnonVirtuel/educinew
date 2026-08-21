import type { SupabaseClient } from '@supabase/supabase-js';
import type { QuestionTag, QuestionTagCreate } from '@educi/types';
import { AssessmentQuestionTagError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentQuestionTagService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getQuestionTag(schoolId: string, id: string): Promise<QuestionTag> {
    const item = await this.repo.getQuestionTag(id, schoolId);
    if (!item) throw new AssessmentQuestionTagError(id);
    return item;
  }
  async listQuestionTags(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionTag[]> {
    return this.repo.listQuestionTags(schoolId, filters);
  }
  async createQuestionTag(schoolId: string, data: QuestionTagCreate): Promise<QuestionTag> {
    return this.repo.createQuestionTag({ ...data, school_id: schoolId } as any);
  }
  async updateQuestionTag(schoolId: string, id: string, data: Partial<QuestionTagCreate>): Promise<QuestionTag> {
    const existing = await this.repo.getQuestionTag(id, schoolId);
    if (!existing) throw new AssessmentQuestionTagError(id);
    return this.repo.updateQuestionTag(id, schoolId, data as any);
  }
  async deleteQuestionTag(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getQuestionTag(id, schoolId);
    if (!existing) throw new AssessmentQuestionTagError(id);
    return this.repo.deleteQuestionTag(id, schoolId);
  }
}
