import type { SupabaseClient } from '@supabase/supabase-js';
import type { EmotionalIndicator, EmotionalIndicatorCreate } from '@educi/types';
import { AdaptiveEmotionalNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveEmotionalService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getEmotionalIndicator(schoolId: string, id: string): Promise<EmotionalIndicator> {
    const item = await this.repo.getEmotionalIndicator(schoolId, id);
    if (!item) throw new AdaptiveEmotionalNotFoundError(id);
    return item;
  }
  async listEmotionalIndicators(schoolId: string, filters?: Record<string, unknown>): Promise<EmotionalIndicator[]> {
    return this.repo.listEmotionalIndicators(schoolId, filters);
  }
  async createEmotionalIndicator(schoolId: string, data: EmotionalIndicatorCreate): Promise<EmotionalIndicator> {
    return this.repo.createEmotionalIndicator(schoolId, { ...data } as any);
  }
  async updateEmotionalIndicator(schoolId: string, id: string, data: Partial<EmotionalIndicatorCreate>): Promise<EmotionalIndicator> {
    const existing = await this.repo.getEmotionalIndicator(schoolId, id);
    if (!existing) throw new AdaptiveEmotionalNotFoundError(id);
    return this.repo.updateEmotionalIndicator(schoolId, id, data);
  }
  async deleteEmotionalIndicator(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getEmotionalIndicator(schoolId, id);
    if (!existing) throw new AdaptiveEmotionalNotFoundError(id);
    return this.repo.deleteEmotionalIndicator(schoolId, id);
  }
}
