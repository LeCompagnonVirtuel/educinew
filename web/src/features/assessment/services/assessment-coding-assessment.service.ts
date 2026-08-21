import type { SupabaseClient } from '@supabase/supabase-js';
import type { CodingAssessment, CodingAssessmentCreate } from '@educi/types';
import { AssessmentCodingAssessmentError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentCodingAssessmentService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getCodingAssessment(schoolId: string, id: string): Promise<CodingAssessment> {
    const item = await this.repo.getCodingAssessment(id, schoolId);
    if (!item) throw new AssessmentCodingAssessmentError(id);
    return item;
  }
  async listCodingAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<CodingAssessment[]> {
    return this.repo.listCodingAssessments(schoolId, filters);
  }
  async createCodingAssessment(schoolId: string, data: CodingAssessmentCreate): Promise<CodingAssessment> {
    return this.repo.createCodingAssessment({ ...data, school_id: schoolId } as any);
  }
  async updateCodingAssessment(schoolId: string, id: string, data: Partial<CodingAssessmentCreate>): Promise<CodingAssessment> {
    const existing = await this.repo.getCodingAssessment(id, schoolId);
    if (!existing) throw new AssessmentCodingAssessmentError(id);
    return this.repo.updateCodingAssessment(id, schoolId, data as any);
  }
  async deleteCodingAssessment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCodingAssessment(id, schoolId);
    if (!existing) throw new AssessmentCodingAssessmentError(id);
    return this.repo.deleteCodingAssessment(id, schoolId);
  }
}
