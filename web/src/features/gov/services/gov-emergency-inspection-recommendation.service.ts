import type { SupabaseClient } from '@supabase/supabase-js';
import type { InspectionRecommendation, InspectionRecommendationCreate } from '@educi/types';
import { GovInspectionRecommendationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovEmergencyInspectionRecommendationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<InspectionRecommendation> {
    const item = await this.repo.findInspectionRecommendationById(schoolId, id);
    if (!item) throw new GovInspectionRecommendationNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionRecommendation[]> {
    return this.repo.findAllInspectionRecommendations(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<InspectionRecommendationCreate>): Promise<InspectionRecommendation> {
    return this.repo.createInspectionRecommendation(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<InspectionRecommendationCreate>): Promise<InspectionRecommendation> {
    const existing = await this.repo.findInspectionRecommendationById(schoolId, id);
    if (!existing) throw new GovInspectionRecommendationNotFoundError(id);
    return this.repo.updateInspectionRecommendation(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInspectionRecommendationById(schoolId, id);
    if (!existing) throw new GovInspectionRecommendationNotFoundError(id);
    return this.repo.deleteInspectionRecommendation(schoolId, id);
  }
}
