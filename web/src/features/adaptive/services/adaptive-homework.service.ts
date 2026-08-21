import type { SupabaseClient } from '@supabase/supabase-js';
import type { AdaptiveHomework, AdaptiveHomeworkCreate } from '@educi/types';
import { AdaptiveHomeworkNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveHomeworkService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getAdaptiveHomework(schoolId: string, id: string): Promise<AdaptiveHomework> {
    const item = await this.repo.getAdaptiveHomework(schoolId, id);
    if (!item) throw new AdaptiveHomeworkNotFoundError(id);
    return item;
  }
  async listAdaptiveHomeworks(schoolId: string, filters?: Record<string, unknown>): Promise<AdaptiveHomework[]> {
    return this.repo.listAdaptiveHomeworks(schoolId, filters);
  }
  async createAdaptiveHomework(schoolId: string, data: AdaptiveHomeworkCreate): Promise<AdaptiveHomework> {
    return this.repo.createAdaptiveHomework(schoolId, { ...data } as any);
  }
  async updateAdaptiveHomework(schoolId: string, id: string, data: Partial<AdaptiveHomeworkCreate>): Promise<AdaptiveHomework> {
    const existing = await this.repo.getAdaptiveHomework(schoolId, id);
    if (!existing) throw new AdaptiveHomeworkNotFoundError(id);
    return this.repo.updateAdaptiveHomework(schoolId, id, data);
  }
  async deleteAdaptiveHomework(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAdaptiveHomework(schoolId, id);
    if (!existing) throw new AdaptiveHomeworkNotFoundError(id);
    return this.repo.deleteAdaptiveHomework(schoolId, id);
  }
}
