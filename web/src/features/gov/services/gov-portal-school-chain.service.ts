import type { SupabaseClient } from '@supabase/supabase-js';
import type { SchoolChain, SchoolChainCreate } from '@educi/types';
import { GovSchoolChainNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovPortalSchoolChainService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<SchoolChain> {
    const item = await this.repo.findSchoolChainById(schoolId, id);
    if (!item) throw new GovSchoolChainNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolChain[]> {
    return this.repo.findAllSchoolChains(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<SchoolChainCreate>): Promise<SchoolChain> {
    return this.repo.createSchoolChain(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<SchoolChainCreate>): Promise<SchoolChain> {
    const existing = await this.repo.findSchoolChainById(schoolId, id);
    if (!existing) throw new GovSchoolChainNotFoundError(id);
    return this.repo.updateSchoolChain(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchoolChainById(schoolId, id);
    if (!existing) throw new GovSchoolChainNotFoundError(id);
    return this.repo.deleteSchoolChain(schoolId, id);
  }
}
