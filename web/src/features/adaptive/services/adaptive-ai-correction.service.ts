import type { SupabaseClient } from '@supabase/supabase-js';
import type { AICorrection } from '@educi/types';
import { AdaptiveAICorrectionNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveAICorrectionService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getAICorrection(schoolId: string, id: string): Promise<AICorrection> {
    const item = await this.repo.getAICorrection(schoolId, id);
    if (!item) throw new AdaptiveAICorrectionNotFoundError(id);
    return item;
  }
  async listAICorrections(schoolId: string, filters?: Record<string, unknown>): Promise<AICorrection[]> {
    return this.repo.listAICorrections(schoolId, filters);
  }
  async createAICorrection(schoolId: string, data: Omit<AICorrection, 'id' | 'created_at'>): Promise<AICorrection> {
    return this.repo.createAICorrection(schoolId, data);
  }
  async updateAICorrection(schoolId: string, id: string, data: Partial<Omit<AICorrection, 'id' | 'created_at'>>): Promise<AICorrection> {
    const existing = await this.repo.getAICorrection(schoolId, id);
    if (!existing) throw new AdaptiveAICorrectionNotFoundError(id);
    return this.repo.updateAICorrection(schoolId, id, data);
  }
  async deleteAICorrection(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAICorrection(schoolId, id);
    if (!existing) throw new AdaptiveAICorrectionNotFoundError(id);
    return this.repo.deleteAICorrection(schoolId, id);
  }
}
