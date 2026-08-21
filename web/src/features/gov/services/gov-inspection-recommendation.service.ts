// Government & National Governance Service - InspectionRecommendation
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InspectionRecommendation, InspectionRecommendationCreate } from '@educi/types';
import { GovInspectionRecommendationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInspectionRecommendationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInspectionRecommendation(schoolId: string, id: string): Promise<InspectionRecommendation> {
    const item = await this.repo.findInspectionRecommendationById(schoolId, id);
    if (!item) throw new GovInspectionRecommendationNotFoundError(id);
    return item;
  }

  async listInspectionRecommendations(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionRecommendation[]> {
    return this.repo.findAllInspectionRecommendations(schoolId, filters);
  }

  async createInspectionRecommendation(schoolId: string, data: InspectionRecommendationCreate): Promise<InspectionRecommendation> {
    return this.repo.createInspectionRecommendation(schoolId, data);
  }

  async updateInspectionRecommendation(schoolId: string, id: string, data: Partial<InspectionRecommendationCreate>): Promise<InspectionRecommendation> {
    const existing = await this.repo.findInspectionRecommendationById(schoolId, id);
    if (!existing) throw new GovInspectionRecommendationNotFoundError(id);
    return this.repo.updateInspectionRecommendation(schoolId, id, data);
  }

  async deleteInspectionRecommendation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInspectionRecommendationById(schoolId, id);
    if (!existing) throw new GovInspectionRecommendationNotFoundError(id);
    return this.repo.deleteInspectionRecommendation(schoolId, id);
  }

  async countInspectionRecommendations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInspectionRecommendations(schoolId, filters);
  }
}
