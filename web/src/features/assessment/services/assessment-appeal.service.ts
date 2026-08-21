import type { SupabaseClient } from '@supabase/supabase-js';
import type { Appeal, AppealCreate } from '@educi/types';
import { AssessmentAppealError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentAppealService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getAppeal(schoolId: string, id: string): Promise<Appeal> {
    const item = await this.repo.getAppeal(id, schoolId);
    if (!item) throw new AssessmentAppealError(id);
    return item;
  }
  async listAppeals(schoolId: string, filters?: Record<string, unknown>): Promise<Appeal[]> {
    return this.repo.listAppeals(schoolId, filters);
  }
  async createAppeal(schoolId: string, data: AppealCreate): Promise<Appeal> {
    return this.repo.createAppeal({ ...data, school_id: schoolId } as any);
  }
  async updateAppeal(schoolId: string, id: string, data: Partial<AppealCreate>): Promise<Appeal> {
    const existing = await this.repo.getAppeal(id, schoolId);
    if (!existing) throw new AssessmentAppealError(id);
    return this.repo.updateAppeal(id, schoolId, data as any);
  }
  async deleteAppeal(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAppeal(id, schoolId);
    if (!existing) throw new AssessmentAppealError(id);
    return this.repo.deleteAppeal(id, schoolId);
  }
}
