import type { SupabaseClient } from '@supabase/supabase-js';
import type { PredictiveAnalytic, PredictiveAnalyticCreate } from '@educi/types';
import { GovPredictiveAnalyticNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAnalyticsPredictiveAnalyticService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<PredictiveAnalytic> {
    const item = await this.repo.findPredictiveAnalyticById(schoolId, id);
    if (!item) throw new GovPredictiveAnalyticNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<PredictiveAnalytic[]> {
    return this.repo.findAllPredictiveAnalytics(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<PredictiveAnalyticCreate>): Promise<PredictiveAnalytic> {
    return this.repo.createPredictiveAnalytic(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<PredictiveAnalyticCreate>): Promise<PredictiveAnalytic> {
    const existing = await this.repo.findPredictiveAnalyticById(schoolId, id);
    if (!existing) throw new GovPredictiveAnalyticNotFoundError(id);
    return this.repo.updatePredictiveAnalytic(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPredictiveAnalyticById(schoolId, id);
    if (!existing) throw new GovPredictiveAnalyticNotFoundError(id);
    return this.repo.deletePredictiveAnalytic(schoolId, id);
  }
}
