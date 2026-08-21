import type { SupabaseClient } from '@supabase/supabase-js';
import type { AdaptiveExam, AdaptiveExamCreate } from '@educi/types';
import { AssessmentAdaptiveExamNotFoundError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentAdaptiveExamService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getAdaptiveExam(schoolId: string, id: string): Promise<AdaptiveExam> {
    const item = await this.repo.getAdaptiveExam(id, schoolId);
    if (!item) throw new AssessmentAdaptiveExamNotFoundError(id);
    return item;
  }
  async listAdaptiveExams(schoolId: string, filters?: Record<string, unknown>): Promise<AdaptiveExam[]> {
    return this.repo.listAdaptiveExams(schoolId, filters);
  }
  async createAdaptiveExam(schoolId: string, data: AdaptiveExamCreate): Promise<AdaptiveExam> {
    return this.repo.createAdaptiveExam({ ...data, school_id: schoolId } as any);
  }
  async updateAdaptiveExam(schoolId: string, id: string, data: Partial<AdaptiveExamCreate>): Promise<AdaptiveExam> {
    const existing = await this.repo.getAdaptiveExam(id, schoolId);
    if (!existing) throw new AssessmentAdaptiveExamNotFoundError(id);
    return this.repo.updateAdaptiveExam(id, schoolId, data as any);
  }
  async deleteAdaptiveExam(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAdaptiveExam(id, schoolId);
    if (!existing) throw new AssessmentAdaptiveExamNotFoundError(id);
    return this.repo.deleteAdaptiveExam(id, schoolId);
  }
}
