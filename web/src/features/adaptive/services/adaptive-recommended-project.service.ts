import type { SupabaseClient } from '@supabase/supabase-js';
import type { RecommendedProject, RecommendedProjectCreate } from '@educi/types';
import { AdaptiveRecommendedProjectError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveRecommendedProjectService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getProject(schoolId: string, id: string): Promise<RecommendedProject> {
    const item = await this.repo.getRecommendedProject(schoolId, id);
    if (!item) throw new AdaptiveRecommendedProjectError(id);
    return item;
  }
  async listProjects(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedProject[]> {
    return this.repo.listRecommendedProjects(schoolId, filters);
  }
  async createProject(schoolId: string, data: RecommendedProjectCreate): Promise<RecommendedProject> {
    return this.repo.createRecommendedProject(schoolId, data);
  }
  async updateProject(schoolId: string, id: string, data: Partial<RecommendedProjectCreate>): Promise<RecommendedProject> {
    const existing = await this.repo.getRecommendedProject(schoolId, id);
    if (!existing) throw new AdaptiveRecommendedProjectError(id);
    return this.repo.updateRecommendedProject(schoolId, id, data);
  }
  async deleteProject(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRecommendedProject(schoolId, id);
    if (!existing) throw new AdaptiveRecommendedProjectError(id);
    return this.repo.deleteRecommendedProject(schoolId, id);
  }
}
