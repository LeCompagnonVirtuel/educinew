import type { SupabaseClient } from '@supabase/supabase-js';
import type { CrossCampusUser, CrossCampusUserCreate } from '@educi/types';
import { GovCrossCampusUserNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovDigitalTwinCrossCampusUserService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<CrossCampusUser> {
    const item = await this.repo.findCrossCampusUserById(schoolId, id);
    if (!item) throw new GovCrossCampusUserNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<CrossCampusUser[]> {
    return this.repo.findAllCrossCampusUsers(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<CrossCampusUserCreate>): Promise<CrossCampusUser> {
    return this.repo.createCrossCampusUser(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<CrossCampusUserCreate>): Promise<CrossCampusUser> {
    const existing = await this.repo.findCrossCampusUserById(schoolId, id);
    if (!existing) throw new GovCrossCampusUserNotFoundError(id);
    return this.repo.updateCrossCampusUser(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCrossCampusUserById(schoolId, id);
    if (!existing) throw new GovCrossCampusUserNotFoundError(id);
    return this.repo.deleteCrossCampusUser(schoolId, id);
  }
}
