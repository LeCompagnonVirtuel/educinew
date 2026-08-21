import type { SupabaseClient } from '@supabase/supabase-js';
import type { SchoolNetwork, SchoolNetworkCreate } from '@educi/types';
import { GovSchoolNetworkNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovPortalSchoolNetworkService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<SchoolNetwork> {
    const item = await this.repo.findSchoolNetworkById(schoolId, id);
    if (!item) throw new GovSchoolNetworkNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolNetwork[]> {
    return this.repo.findAllSchoolNetworks(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<SchoolNetworkCreate>): Promise<SchoolNetwork> {
    return this.repo.createSchoolNetwork(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<SchoolNetworkCreate>): Promise<SchoolNetwork> {
    const existing = await this.repo.findSchoolNetworkById(schoolId, id);
    if (!existing) throw new GovSchoolNetworkNotFoundError(id);
    return this.repo.updateSchoolNetwork(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchoolNetworkById(schoolId, id);
    if (!existing) throw new GovSchoolNetworkNotFoundError(id);
    return this.repo.deleteSchoolNetwork(schoolId, id);
  }
}
