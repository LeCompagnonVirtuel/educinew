import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamCenter, ExamCenterCreate } from '@educi/types';
import { AssessmentExamCenterError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentExamCenterService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getExamCenter(schoolId: string, id: string): Promise<ExamCenter> {
    const item = await this.repo.getExamCenter(id, schoolId);
    if (!item) throw new AssessmentExamCenterError(id);
    return item;
  }
  async listExamCenters(schoolId: string, filters?: Record<string, unknown>): Promise<ExamCenter[]> {
    return this.repo.listExamCenters(schoolId, filters);
  }
  async createExamCenter(schoolId: string, data: ExamCenterCreate): Promise<ExamCenter> {
    return this.repo.createExamCenter({ ...data, school_id: schoolId } as any);
  }
  async updateExamCenter(schoolId: string, id: string, data: Partial<ExamCenterCreate>): Promise<ExamCenter> {
    const existing = await this.repo.getExamCenter(id, schoolId);
    if (!existing) throw new AssessmentExamCenterError(id);
    return this.repo.updateExamCenter(id, schoolId, data as any);
  }
  async deleteExamCenter(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getExamCenter(id, schoolId);
    if (!existing) throw new AssessmentExamCenterError(id);
    return this.repo.deleteExamCenter(id, schoolId);
  }
}
