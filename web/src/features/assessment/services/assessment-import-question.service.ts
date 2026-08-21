import type { SupabaseClient } from '@supabase/supabase-js';
import type { ImportQuestionJob, ImportQuestionJobCreate } from '@educi/types';
import { AssessmentImportQuestionError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentImportQuestionService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getImportQuestion(schoolId: string, id: string): Promise<ImportQuestionJob> {
    const item = await this.repo.getImportQuestion(id, schoolId);
    if (!item) throw new AssessmentImportQuestionError(id);
    return item;
  }
  async listImportQuestions(schoolId: string, filters?: Record<string, unknown>): Promise<ImportQuestionJob[]> {
    return this.repo.listImportQuestions(schoolId, filters);
  }
  async createImportQuestion(schoolId: string, data: ImportQuestionJobCreate): Promise<ImportQuestionJob> {
    return this.repo.createImportQuestion({ ...data, school_id: schoolId } as any);
  }
  async updateImportQuestion(schoolId: string, id: string, data: Partial<ImportQuestionJobCreate>): Promise<ImportQuestionJob> {
    const existing = await this.repo.getImportQuestion(id, schoolId);
    if (!existing) throw new AssessmentImportQuestionError(id);
    return this.repo.updateImportQuestion(id, schoolId, data as any);
  }
  async deleteImportQuestion(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getImportQuestion(id, schoolId);
    if (!existing) throw new AssessmentImportQuestionError(id);
    return this.repo.deleteImportQuestion(id, schoolId);
  }
}
