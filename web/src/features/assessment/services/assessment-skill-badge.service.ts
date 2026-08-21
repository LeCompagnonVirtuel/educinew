import type { SupabaseClient } from '@supabase/supabase-js';
import type { SkillBadge, SkillBadgeCreate } from '@educi/types';
import { AssessmentSkillBadgeError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentSkillBadgeService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getSkillBadge(schoolId: string, id: string): Promise<SkillBadge> {
    const item = await this.repo.getSkillBadge(id, schoolId);
    if (!item) throw new AssessmentSkillBadgeError(id);
    return item;
  }
  async listSkillBadges(schoolId: string, filters?: Record<string, unknown>): Promise<SkillBadge[]> {
    return this.repo.listSkillBadges(schoolId, filters);
  }
  async createSkillBadge(schoolId: string, data: SkillBadgeCreate): Promise<SkillBadge> {
    return this.repo.createSkillBadge({ ...data, school_id: schoolId } as any);
  }
  async updateSkillBadge(schoolId: string, id: string, data: Partial<SkillBadgeCreate>): Promise<SkillBadge> {
    const existing = await this.repo.getSkillBadge(id, schoolId);
    if (!existing) throw new AssessmentSkillBadgeError(id);
    return this.repo.updateSkillBadge(id, schoolId, data as any);
  }
  async deleteSkillBadge(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSkillBadge(id, schoolId);
    if (!existing) throw new AssessmentSkillBadgeError(id);
    return this.repo.deleteSkillBadge(id, schoolId);
  }
}
