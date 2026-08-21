import type { SupabaseClient } from '@supabase/supabase-js';
import type { Academy, AcademyCreate } from '@educi/types';
import { GovAcademyNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovRegistryAcademyService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<Academy> {
    const item = await this.repo.findAcademyById(schoolId, id);
    if (!item) throw new GovAcademyNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<Academy[]> {
    return this.repo.findAllAcademies(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<AcademyCreate>): Promise<Academy> {
    return this.repo.createAcademy(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<AcademyCreate>): Promise<Academy> {
    const existing = await this.repo.findAcademyById(schoolId, id);
    if (!existing) throw new GovAcademyNotFoundError(id);
    return this.repo.updateAcademy(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAcademyById(schoolId, id);
    if (!existing) throw new GovAcademyNotFoundError(id);
    return this.repo.deleteAcademy(schoolId, id);
  }
}
