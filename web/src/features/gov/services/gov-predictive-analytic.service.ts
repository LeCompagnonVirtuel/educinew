// Government & National Governance Service - PredictiveAnalytic
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PredictiveAnalytic, PredictiveAnalyticCreate } from '@educi/types';
import { GovPredictiveAnalyticNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovPredictiveAnalyticService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getPredictiveAnalytic(schoolId: string, id: string): Promise<PredictiveAnalytic> {
    const item = await this.repo.findPredictiveAnalyticById(schoolId, id);
    if (!item) throw new GovPredictiveAnalyticNotFoundError(id);
    return item;
  }

  async listPredictiveAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<PredictiveAnalytic[]> {
    return this.repo.findAllPredictiveAnalytics(schoolId, filters);
  }

  async createPredictiveAnalytic(schoolId: string, data: PredictiveAnalyticCreate): Promise<PredictiveAnalytic> {
    return this.repo.createPredictiveAnalytic(schoolId, data);
  }

  async updatePredictiveAnalytic(schoolId: string, id: string, data: Partial<PredictiveAnalyticCreate>): Promise<PredictiveAnalytic> {
    const existing = await this.repo.findPredictiveAnalyticById(schoolId, id);
    if (!existing) throw new GovPredictiveAnalyticNotFoundError(id);
    return this.repo.updatePredictiveAnalytic(schoolId, id, data);
  }

  async deletePredictiveAnalytic(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPredictiveAnalyticById(schoolId, id);
    if (!existing) throw new GovPredictiveAnalyticNotFoundError(id);
    return this.repo.deletePredictiveAnalytic(schoolId, id);
  }

  async countPredictiveAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPredictiveAnalytics(schoolId, filters);
  }
}
