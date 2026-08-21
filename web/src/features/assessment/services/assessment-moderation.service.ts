import type { SupabaseClient } from '@supabase/supabase-js';
import type { Moderation, ModerationCreate } from '@educi/types';
import { AssessmentModerationError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentModerationService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getModeration(schoolId: string, id: string): Promise<Moderation> {
    const item = await this.repo.getModeration(id, schoolId);
    if (!item) throw new AssessmentModerationError(id);
    return item;
  }
  async listModerations(schoolId: string, filters?: Record<string, unknown>): Promise<Moderation[]> {
    return this.repo.listModerations(schoolId, filters);
  }
  async createModeration(schoolId: string, data: ModerationCreate): Promise<Moderation> {
    return this.repo.createModeration({ ...data, school_id: schoolId } as any);
  }
  async updateModeration(schoolId: string, id: string, data: Partial<ModerationCreate>): Promise<Moderation> {
    const existing = await this.repo.getModeration(id, schoolId);
    if (!existing) throw new AssessmentModerationError(id);
    return this.repo.updateModeration(id, schoolId, data as any);
  }
  async deleteModeration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getModeration(id, schoolId);
    if (!existing) throw new AssessmentModerationError(id);
    return this.repo.deleteModeration(id, schoolId);
  }
}
