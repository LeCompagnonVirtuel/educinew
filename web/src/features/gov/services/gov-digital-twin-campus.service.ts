import type { SupabaseClient } from '@supabase/supabase-js';
import type { Campus, CampusCreate } from '@educi/types';
import { GovCampusNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovDigitalTwinCampusService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<Campus> {
    const item = await this.repo.findCampusById(schoolId, id);
    if (!item) throw new GovCampusNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<Campus[]> {
    return this.repo.findAllCampuses(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<CampusCreate>): Promise<Campus> {
    return this.repo.createCampus(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<CampusCreate>): Promise<Campus> {
    const existing = await this.repo.findCampusById(schoolId, id);
    if (!existing) throw new GovCampusNotFoundError(id);
    return this.repo.updateCampus(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCampusById(schoolId, id);
    if (!existing) throw new GovCampusNotFoundError(id);
    return this.repo.deleteCampus(schoolId, id);
  }
}
