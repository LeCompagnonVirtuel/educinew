import type { SupabaseClient } from '@supabase/supabase-js';
import type { AutomaticGrading, AutomaticGradingCreate } from '@educi/types';
import { AssessmentAutomaticGradingNotFoundError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentAutomaticGradingService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getAutomaticGrading(schoolId: string, id: string): Promise<AutomaticGrading> {
    const item = await this.repo.getAutomaticGrading(id, schoolId);
    if (!item) throw new AssessmentAutomaticGradingNotFoundError(id);
    return item;
  }
  async listAutomaticGradings(schoolId: string, filters?: Record<string, unknown>): Promise<AutomaticGrading[]> {
    return this.repo.listAutomaticGradings(schoolId, filters);
  }
  async createAutomaticGrading(schoolId: string, data: AutomaticGradingCreate): Promise<AutomaticGrading> {
    return this.repo.createAutomaticGrading({ ...data, school_id: schoolId } as any);
  }
  async updateAutomaticGrading(schoolId: string, id: string, data: Partial<AutomaticGradingCreate>): Promise<AutomaticGrading> {
    const existing = await this.repo.getAutomaticGrading(id, schoolId);
    if (!existing) throw new AssessmentAutomaticGradingNotFoundError(id);
    return this.repo.updateAutomaticGrading(id, schoolId, data as any);
  }
  async deleteAutomaticGrading(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAutomaticGrading(id, schoolId);
    if (!existing) throw new AssessmentAutomaticGradingNotFoundError(id);
    return this.repo.deleteAutomaticGrading(id, schoolId);
  }
}
