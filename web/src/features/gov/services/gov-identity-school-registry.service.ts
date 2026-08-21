import type { SupabaseClient } from '@supabase/supabase-js';
import type { SchoolRegistry, SchoolRegistryCreate } from '@educi/types';
import { GovSchoolRegistryNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovIdentitySchoolRegistryService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<SchoolRegistry> {
    const item = await this.repo.findSchoolRegistryById(schoolId, id);
    if (!item) throw new GovSchoolRegistryNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolRegistry[]> {
    return this.repo.findAllSchoolRegistries(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<SchoolRegistryCreate>): Promise<SchoolRegistry> {
    return this.repo.createSchoolRegistry(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<SchoolRegistryCreate>): Promise<SchoolRegistry> {
    const existing = await this.repo.findSchoolRegistryById(schoolId, id);
    if (!existing) throw new GovSchoolRegistryNotFoundError(id);
    return this.repo.updateSchoolRegistry(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchoolRegistryById(schoolId, id);
    if (!existing) throw new GovSchoolRegistryNotFoundError(id);
    return this.repo.deleteSchoolRegistry(schoolId, id);
  }
}
