// Government & National Governance Service - InternationalEquivalencyCalculation
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InternationalEquivalencyCalculation, InternationalEquivalencyCalculationCreate } from '@educi/types';
import { GovInternationalEquivalencyCalculationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInternationalEquivalencyCalculationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInternationalEquivalencyCalculation(schoolId: string, id: string): Promise<InternationalEquivalencyCalculation> {
    const item = await this.repo.findInternationalEquivalencyCalculationById(schoolId, id);
    if (!item) throw new GovInternationalEquivalencyCalculationNotFoundError(id);
    return item;
  }

  async listInternationalEquivalencyCalculations(schoolId: string, filters?: Record<string, unknown>): Promise<InternationalEquivalencyCalculation[]> {
    return this.repo.findAllInternationalEquivalencyCalculations(schoolId, filters);
  }

  async createInternationalEquivalencyCalculation(schoolId: string, data: InternationalEquivalencyCalculationCreate): Promise<InternationalEquivalencyCalculation> {
    return this.repo.createInternationalEquivalencyCalculation(schoolId, data);
  }

  async updateInternationalEquivalencyCalculation(schoolId: string, id: string, data: Partial<InternationalEquivalencyCalculationCreate>): Promise<InternationalEquivalencyCalculation> {
    const existing = await this.repo.findInternationalEquivalencyCalculationById(schoolId, id);
    if (!existing) throw new GovInternationalEquivalencyCalculationNotFoundError(id);
    return this.repo.updateInternationalEquivalencyCalculation(schoolId, id, data);
  }

  async deleteInternationalEquivalencyCalculation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInternationalEquivalencyCalculationById(schoolId, id);
    if (!existing) throw new GovInternationalEquivalencyCalculationNotFoundError(id);
    return this.repo.deleteInternationalEquivalencyCalculation(schoolId, id);
  }

  async countInternationalEquivalencyCalculations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInternationalEquivalencyCalculations(schoolId, filters);
  }
}
