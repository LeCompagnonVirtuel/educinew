import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamBlueprint, ExamBlueprintCreate } from '@educi/types';
import { AssessmentExamBlueprintError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentExamBlueprintService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getExamBlueprint(schoolId: string, id: string): Promise<ExamBlueprint> {
    const item = await this.repo.getExamBlueprint(id, schoolId);
    if (!item) throw new AssessmentExamBlueprintError(id);
    return item;
  }
  async listExamBlueprints(schoolId: string, filters?: Record<string, unknown>): Promise<ExamBlueprint[]> {
    return this.repo.listExamBlueprints(schoolId, filters);
  }
  async createExamBlueprint(schoolId: string, data: ExamBlueprintCreate): Promise<ExamBlueprint> {
    return this.repo.createExamBlueprint({ ...data, school_id: schoolId } as any);
  }
  async updateExamBlueprint(schoolId: string, id: string, data: Partial<ExamBlueprintCreate>): Promise<ExamBlueprint> {
    const existing = await this.repo.getExamBlueprint(id, schoolId);
    if (!existing) throw new AssessmentExamBlueprintError(id);
    return this.repo.updateExamBlueprint(id, schoolId, data as any);
  }
  async deleteExamBlueprint(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getExamBlueprint(id, schoolId);
    if (!existing) throw new AssessmentExamBlueprintError(id);
    return this.repo.deleteExamBlueprint(id, schoolId);
  }
}
