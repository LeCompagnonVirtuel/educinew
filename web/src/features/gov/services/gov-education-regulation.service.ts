// Government & National Governance Service - EducationRegulation
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { EducationRegulation, EducationRegulationCreate } from '@educi/types';
import { GovEducationRegulationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovEducationRegulationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEducationRegulation(schoolId: string, id: string): Promise<EducationRegulation> {
    const item = await this.repo.findEducationRegulationById(schoolId, id);
    if (!item) throw new GovEducationRegulationNotFoundError(id);
    return item;
  }

  async listEducationRegulations(schoolId: string, filters?: Record<string, unknown>): Promise<EducationRegulation[]> {
    return this.repo.findAllEducationRegulations(schoolId, filters);
  }

  async createEducationRegulation(schoolId: string, data: EducationRegulationCreate): Promise<EducationRegulation> {
    return this.repo.createEducationRegulation(schoolId, data);
  }

  async updateEducationRegulation(schoolId: string, id: string, data: Partial<EducationRegulationCreate>): Promise<EducationRegulation> {
    const existing = await this.repo.findEducationRegulationById(schoolId, id);
    if (!existing) throw new GovEducationRegulationNotFoundError(id);
    return this.repo.updateEducationRegulation(schoolId, id, data);
  }

  async deleteEducationRegulation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEducationRegulationById(schoolId, id);
    if (!existing) throw new GovEducationRegulationNotFoundError(id);
    return this.repo.deleteEducationRegulation(schoolId, id);
  }

  async countEducationRegulations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEducationRegulations(schoolId, filters);
  }
}
