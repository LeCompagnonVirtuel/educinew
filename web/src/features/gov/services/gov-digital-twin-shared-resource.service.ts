import type { SupabaseClient } from '@supabase/supabase-js';
import type { SharedResource, SharedResourceCreate } from '@educi/types';
import { GovSharedResourceNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovDigitalTwinSharedResourceService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<SharedResource> {
    const item = await this.repo.findSharedResourceById(schoolId, id);
    if (!item) throw new GovSharedResourceNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<SharedResource[]> {
    return this.repo.findAllSharedResources(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<SharedResourceCreate>): Promise<SharedResource> {
    return this.repo.createSharedResource(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<SharedResourceCreate>): Promise<SharedResource> {
    const existing = await this.repo.findSharedResourceById(schoolId, id);
    if (!existing) throw new GovSharedResourceNotFoundError(id);
    return this.repo.updateSharedResource(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSharedResourceById(schoolId, id);
    if (!existing) throw new GovSharedResourceNotFoundError(id);
    return this.repo.deleteSharedResource(schoolId, id);
  }
}
