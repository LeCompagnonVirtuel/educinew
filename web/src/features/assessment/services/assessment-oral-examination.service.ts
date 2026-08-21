import type { SupabaseClient } from '@supabase/supabase-js';
import type { OralExamination, OralExaminationCreate } from '@educi/types';
import { AssessmentOralExaminationError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentOralExaminationService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getOralExamination(schoolId: string, id: string): Promise<OralExamination> {
    const item = await this.repo.getOralExamination(id, schoolId);
    if (!item) throw new AssessmentOralExaminationError(id);
    return item;
  }
  async listOralExaminations(schoolId: string, filters?: Record<string, unknown>): Promise<OralExamination[]> {
    return this.repo.listOralExaminations(schoolId, filters);
  }
  async createOralExamination(schoolId: string, data: OralExaminationCreate): Promise<OralExamination> {
    return this.repo.createOralExamination({ ...data, school_id: schoolId } as any);
  }
  async updateOralExamination(schoolId: string, id: string, data: Partial<OralExaminationCreate>): Promise<OralExamination> {
    const existing = await this.repo.getOralExamination(id, schoolId);
    if (!existing) throw new AssessmentOralExaminationError(id);
    return this.repo.updateOralExamination(id, schoolId, data as any);
  }
  async deleteOralExamination(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getOralExamination(id, schoolId);
    if (!existing) throw new AssessmentOralExaminationError(id);
    return this.repo.deleteOralExamination(id, schoolId);
  }
}
