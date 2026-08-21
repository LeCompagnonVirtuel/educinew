import type { SupabaseClient } from '@supabase/supabase-js';
import type { InternationalExam, InternationalExamCreate } from '@educi/types';
import { AssessmentInternationalExamError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentInternationalExamService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getInternationalExam(schoolId: string, id: string): Promise<InternationalExam> {
    const item = await this.repo.getInternationalExam(id, schoolId);
    if (!item) throw new AssessmentInternationalExamError(id);
    return item;
  }
  async listInternationalExams(schoolId: string, filters?: Record<string, unknown>): Promise<InternationalExam[]> {
    return this.repo.listInternationalExams(schoolId, filters);
  }
  async createInternationalExam(schoolId: string, data: InternationalExamCreate): Promise<InternationalExam> {
    return this.repo.createInternationalExam({ ...data, school_id: schoolId } as any);
  }
  async updateInternationalExam(schoolId: string, id: string, data: Partial<InternationalExamCreate>): Promise<InternationalExam> {
    const existing = await this.repo.getInternationalExam(id, schoolId);
    if (!existing) throw new AssessmentInternationalExamError(id);
    return this.repo.updateInternationalExam(id, schoolId, data as any);
  }
  async deleteInternationalExam(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getInternationalExam(id, schoolId);
    if (!existing) throw new AssessmentInternationalExamError(id);
    return this.repo.deleteInternationalExam(id, schoolId);
  }
}
