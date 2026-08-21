import type { SupabaseClient } from '@supabase/supabase-js';
import type { PracticalAssessment, PracticalAssessmentCreate } from '@educi/types';
import { AssessmentPracticalAssessmentError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentPracticalAssessmentService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getPracticalAssessment(schoolId: string, id: string): Promise<PracticalAssessment> {
    const item = await this.repo.getPracticalAssessment(id, schoolId);
    if (!item) throw new AssessmentPracticalAssessmentError(id);
    return item;
  }
  async listPracticalAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<PracticalAssessment[]> {
    return this.repo.listPracticalAssessments(schoolId, filters);
  }
  async createPracticalAssessment(schoolId: string, data: PracticalAssessmentCreate): Promise<PracticalAssessment> {
    return this.repo.createPracticalAssessment({ ...data, school_id: schoolId } as any);
  }
  async updatePracticalAssessment(schoolId: string, id: string, data: Partial<PracticalAssessmentCreate>): Promise<PracticalAssessment> {
    const existing = await this.repo.getPracticalAssessment(id, schoolId);
    if (!existing) throw new AssessmentPracticalAssessmentError(id);
    return this.repo.updatePracticalAssessment(id, schoolId, data as any);
  }
  async deletePracticalAssessment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPracticalAssessment(id, schoolId);
    if (!existing) throw new AssessmentPracticalAssessmentError(id);
    return this.repo.deletePracticalAssessment(id, schoolId);
  }
}
