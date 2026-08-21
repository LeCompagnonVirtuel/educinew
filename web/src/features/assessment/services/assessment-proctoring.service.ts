import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProctoringAI, ProctoringAICreate } from '@educi/types';
import { AssessmentProctoringAIError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentProctoringService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getProctoring(schoolId: string, id: string): Promise<ProctoringAI> {
    const item = await this.repo.getProctoring(id, schoolId);
    if (!item) throw new AssessmentProctoringAIError(id);
    return item;
  }
  async listProctorings(schoolId: string, filters?: Record<string, unknown>): Promise<ProctoringAI[]> {
    return this.repo.listProctorings(schoolId, filters);
  }
  async createProctoring(schoolId: string, data: ProctoringAICreate): Promise<ProctoringAI> {
    return this.repo.createProctoring({ ...data, school_id: schoolId } as any);
  }
  async updateProctoring(schoolId: string, id: string, data: Partial<ProctoringAICreate>): Promise<ProctoringAI> {
    const existing = await this.repo.getProctoring(id, schoolId);
    if (!existing) throw new AssessmentProctoringAIError(id);
    return this.repo.updateProctoring(id, schoolId, data as any);
  }
  async deleteProctoring(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getProctoring(id, schoolId);
    if (!existing) throw new AssessmentProctoringAIError(id);
    return this.repo.deleteProctoring(id, schoolId);
  }
}
