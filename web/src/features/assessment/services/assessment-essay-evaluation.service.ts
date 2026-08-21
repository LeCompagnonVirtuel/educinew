import type { SupabaseClient } from '@supabase/supabase-js';
import type { EssayEvaluationAI, EssayEvaluationAICreate } from '@educi/types';
import { AssessmentEssayEvaluationError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentEssayEvaluationService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getEssayEvaluation(schoolId: string, id: string): Promise<EssayEvaluationAI> {
    const item = await this.repo.getEssayEvaluation(id, schoolId);
    if (!item) throw new AssessmentEssayEvaluationError(id);
    return item;
  }
  async listEssayEvaluations(schoolId: string, filters?: Record<string, unknown>): Promise<EssayEvaluationAI[]> {
    return this.repo.listEssayEvaluations(schoolId, filters);
  }
  async createEssayEvaluation(schoolId: string, data: EssayEvaluationAICreate): Promise<EssayEvaluationAI> {
    return this.repo.createEssayEvaluation({ ...data, school_id: schoolId } as any);
  }
  async updateEssayEvaluation(schoolId: string, id: string, data: Partial<EssayEvaluationAICreate>): Promise<EssayEvaluationAI> {
    const existing = await this.repo.getEssayEvaluation(id, schoolId);
    if (!existing) throw new AssessmentEssayEvaluationError(id);
    return this.repo.updateEssayEvaluation(id, schoolId, data as any);
  }
  async deleteEssayEvaluation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getEssayEvaluation(id, schoolId);
    if (!existing) throw new AssessmentEssayEvaluationError(id);
    return this.repo.deleteEssayEvaluation(id, schoolId);
  }
}
