import type { SupabaseClient } from '@supabase/supabase-js';
import type { AutoGradingResult } from '@educi/types';
import { AdaptiveAutoGradingError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveAutoGradingService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getAutoGradingResult(schoolId: string, id: string): Promise<AutoGradingResult> {
    const item = await this.repo.getAutoGradingResult(schoolId, id);
    if (!item) throw new AdaptiveAutoGradingError(id);
    return item;
  }
  async listAutoGradingResults(schoolId: string, filters?: Record<string, unknown>): Promise<AutoGradingResult[]> {
    return this.repo.listAutoGradingResults(schoolId, filters);
  }
  async createAutoGradingResult(schoolId: string, data: Omit<AutoGradingResult, 'id' | 'created_at'>): Promise<AutoGradingResult> {
    return this.repo.createAutoGradingResult(schoolId, data);
  }
  async updateAutoGradingResult(schoolId: string, id: string, data: Partial<Omit<AutoGradingResult, 'id' | 'created_at'>>): Promise<AutoGradingResult> {
    const existing = await this.repo.getAutoGradingResult(schoolId, id);
    if (!existing) throw new AdaptiveAutoGradingError(id);
    return this.repo.updateAutoGradingResult(schoolId, id, data);
  }
  async deleteAutoGradingResult(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAutoGradingResult(schoolId, id);
    if (!existing) throw new AdaptiveAutoGradingError(id);
    return this.repo.deleteAutoGradingResult(schoolId, id);
  }
}
