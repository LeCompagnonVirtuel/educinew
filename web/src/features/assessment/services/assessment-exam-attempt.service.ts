import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamAttempt, ExamAttemptCreate } from '@educi/types';
import { AssessmentExamAttemptNotFoundError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentExamAttemptService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getExamAttempt(schoolId: string, id: string): Promise<ExamAttempt> {
    const item = await this.repo.getExamAttempt(id, schoolId);
    if (!item) throw new AssessmentExamAttemptNotFoundError(id);
    return item;
  }
  async listExamAttempts(schoolId: string, filters?: Record<string, unknown>): Promise<ExamAttempt[]> {
    return this.repo.listExamAttempts(schoolId, filters);
  }
  async createExamAttempt(schoolId: string, data: ExamAttemptCreate): Promise<ExamAttempt> {
    return this.repo.createExamAttempt({ ...data, school_id: schoolId } as any);
  }
  async updateExamAttempt(schoolId: string, id: string, data: Partial<ExamAttemptCreate>): Promise<ExamAttempt> {
    const existing = await this.repo.getExamAttempt(id, schoolId);
    if (!existing) throw new AssessmentExamAttemptNotFoundError(id);
    return this.repo.updateExamAttempt(id, schoolId, data as any);
  }
  async deleteExamAttempt(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getExamAttempt(id, schoolId);
    if (!existing) throw new AssessmentExamAttemptNotFoundError(id);
    return this.repo.deleteExamAttempt(id, schoolId);
  }
}
