import type { SupabaseClient } from '@supabase/supabase-js';
import type { NationalExam, NationalExamCreate } from '@educi/types';
import { AssessmentNationalExamError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentNationalExamService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getNationalExam(schoolId: string, id: string): Promise<NationalExam> {
    const item = await this.repo.getNationalExam(id, schoolId);
    if (!item) throw new AssessmentNationalExamError(id);
    return item;
  }
  async listNationalExams(schoolId: string, filters?: Record<string, unknown>): Promise<NationalExam[]> {
    return this.repo.listNationalExams(schoolId, filters);
  }
  async createNationalExam(schoolId: string, data: NationalExamCreate): Promise<NationalExam> {
    return this.repo.createNationalExam({ ...data, school_id: schoolId } as any);
  }
  async updateNationalExam(schoolId: string, id: string, data: Partial<NationalExamCreate>): Promise<NationalExam> {
    const existing = await this.repo.getNationalExam(id, schoolId);
    if (!existing) throw new AssessmentNationalExamError(id);
    return this.repo.updateNationalExam(id, schoolId, data as any);
  }
  async deleteNationalExam(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getNationalExam(id, schoolId);
    if (!existing) throw new AssessmentNationalExamError(id);
    return this.repo.deleteNationalExam(id, schoolId);
  }
}
