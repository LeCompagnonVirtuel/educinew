import type { SupabaseClient } from '@supabase/supabase-js';
import type { EducationRegulation, EducationRegulationCreate } from '@educi/types';
import { GovEducationRegulationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovObservatoryEducationRegulationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<EducationRegulation> {
    const item = await this.repo.findEducationRegulationById(schoolId, id);
    if (!item) throw new GovEducationRegulationNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<EducationRegulation[]> {
    return this.repo.findAllEducationRegulations(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<EducationRegulationCreate>): Promise<EducationRegulation> {
    return this.repo.createEducationRegulation(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<EducationRegulationCreate>): Promise<EducationRegulation> {
    const existing = await this.repo.findEducationRegulationById(schoolId, id);
    if (!existing) throw new GovEducationRegulationNotFoundError(id);
    return this.repo.updateEducationRegulation(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEducationRegulationById(schoolId, id);
    if (!existing) throw new GovEducationRegulationNotFoundError(id);
    return this.repo.deleteEducationRegulation(schoolId, id);
  }
}
