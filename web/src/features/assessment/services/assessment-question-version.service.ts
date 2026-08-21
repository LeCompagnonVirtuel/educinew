import type { SupabaseClient } from '@supabase/supabase-js';
import type { QuestionVersion, QuestionVersionCreate } from '@educi/types';
import { AssessmentQuestionVersionError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentQuestionVersionService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getQuestionVersion(schoolId: string, id: string): Promise<QuestionVersion> {
    const item = await this.repo.getQuestionVersion(id, schoolId);
    if (!item) throw new AssessmentQuestionVersionError(id);
    return item;
  }
  async listQuestionVersions(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionVersion[]> {
    return this.repo.listQuestionVersions(schoolId, filters);
  }
  async createQuestionVersion(schoolId: string, data: QuestionVersionCreate): Promise<QuestionVersion> {
    return this.repo.createQuestionVersion({ ...data, school_id: schoolId } as any);
  }
  async updateQuestionVersion(schoolId: string, id: string, data: Partial<QuestionVersionCreate>): Promise<QuestionVersion> {
    const existing = await this.repo.getQuestionVersion(id, schoolId);
    if (!existing) throw new AssessmentQuestionVersionError(id);
    return this.repo.updateQuestionVersion(id, schoolId, data as any);
  }
  async deleteQuestionVersion(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getQuestionVersion(id, schoolId);
    if (!existing) throw new AssessmentQuestionVersionError(id);
    return this.repo.deleteQuestionVersion(id, schoolId);
  }
}
