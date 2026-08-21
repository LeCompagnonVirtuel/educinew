import type { SupabaseClient } from '@supabase/supabase-js';
import type { ErrorAnalysis, ErrorAnalysisCreate } from '@educi/types';
import { AdaptiveErrorAnalysisNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveErrorAnalysisService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getErrorAnalysis(schoolId: string, id: string): Promise<ErrorAnalysis> {
    const item = await this.repo.getErrorAnalysis(schoolId, id);
    if (!item) throw new AdaptiveErrorAnalysisNotFoundError(id);
    return item;
  }
  async listErrorAnalyses(schoolId: string, filters?: Record<string, unknown>): Promise<ErrorAnalysis[]> {
    return this.repo.listErrorAnalyses(schoolId, filters);
  }
  async createErrorAnalysis(schoolId: string, data: ErrorAnalysisCreate): Promise<ErrorAnalysis> {
    return this.repo.createErrorAnalysis(schoolId, { ...data } as any);
  }
  async updateErrorAnalysis(schoolId: string, id: string, data: Partial<ErrorAnalysisCreate>): Promise<ErrorAnalysis> {
    const existing = await this.repo.getErrorAnalysis(schoolId, id);
    if (!existing) throw new AdaptiveErrorAnalysisNotFoundError(id);
    return this.repo.updateErrorAnalysis(schoolId, id, data);
  }
  async deleteErrorAnalysis(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getErrorAnalysis(schoolId, id);
    if (!existing) throw new AdaptiveErrorAnalysisNotFoundError(id);
    return this.repo.deleteErrorAnalysis(schoolId, id);
  }
}
