// Government & National Governance Service - InspectionRatingCalculation
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InspectionRatingCalculation, InspectionRatingCalculationCreate } from '@educi/types';
import { GovInspectionRatingCalculationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInspectionRatingCalculationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInspectionRatingCalculation(schoolId: string, id: string): Promise<InspectionRatingCalculation> {
    const item = await this.repo.findInspectionRatingCalculationById(schoolId, id);
    if (!item) throw new GovInspectionRatingCalculationNotFoundError(id);
    return item;
  }

  async listInspectionRatingCalculations(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionRatingCalculation[]> {
    return this.repo.findAllInspectionRatingCalculations(schoolId, filters);
  }

  async createInspectionRatingCalculation(schoolId: string, data: InspectionRatingCalculationCreate): Promise<InspectionRatingCalculation> {
    return this.repo.createInspectionRatingCalculation(schoolId, data);
  }

  async updateInspectionRatingCalculation(schoolId: string, id: string, data: Partial<InspectionRatingCalculationCreate>): Promise<InspectionRatingCalculation> {
    const existing = await this.repo.findInspectionRatingCalculationById(schoolId, id);
    if (!existing) throw new GovInspectionRatingCalculationNotFoundError(id);
    return this.repo.updateInspectionRatingCalculation(schoolId, id, data);
  }

  async deleteInspectionRatingCalculation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInspectionRatingCalculationById(schoolId, id);
    if (!existing) throw new GovInspectionRatingCalculationNotFoundError(id);
    return this.repo.deleteInspectionRatingCalculation(schoolId, id);
  }

  async countInspectionRatingCalculations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInspectionRatingCalculations(schoolId, filters);
  }
}
