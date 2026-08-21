import type { SupabaseClient } from '@supabase/supabase-js';
import type { QuestionPool, QuestionPoolCreate } from '@educi/types';
import { AssessmentQuestionPoolError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentQuestionPoolService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getQuestionPool(schoolId: string, id: string): Promise<QuestionPool> {
    const item = await this.repo.getQuestionPool(id, schoolId);
    if (!item) throw new AssessmentQuestionPoolError(id);
    return item;
  }
  async listQuestionPools(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionPool[]> {
    return this.repo.listQuestionPools(schoolId, filters);
  }
  async createQuestionPool(schoolId: string, data: QuestionPoolCreate): Promise<QuestionPool> {
    return this.repo.createQuestionPool({ ...data, school_id: schoolId } as any);
  }
  async updateQuestionPool(schoolId: string, id: string, data: Partial<QuestionPoolCreate>): Promise<QuestionPool> {
    const existing = await this.repo.getQuestionPool(id, schoolId);
    if (!existing) throw new AssessmentQuestionPoolError(id);
    return this.repo.updateQuestionPool(id, schoolId, data as any);
  }
  async deleteQuestionPool(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getQuestionPool(id, schoolId);
    if (!existing) throw new AssessmentQuestionPoolError(id);
    return this.repo.deleteQuestionPool(id, schoolId);
  }
}
