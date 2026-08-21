import type { SupabaseClient } from '@supabase/supabase-js';
import type { Grant, GrantCreate } from '@educi/types';
import { GovGrantNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovFinanceGrantService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<Grant> {
    const item = await this.repo.findGrantById(schoolId, id);
    if (!item) throw new GovGrantNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<Grant[]> {
    return this.repo.findAllGrants(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<GrantCreate>): Promise<Grant> {
    return this.repo.createGrant(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<GrantCreate>): Promise<Grant> {
    const existing = await this.repo.findGrantById(schoolId, id);
    if (!existing) throw new GovGrantNotFoundError(id);
    return this.repo.updateGrant(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findGrantById(schoolId, id);
    if (!existing) throw new GovGrantNotFoundError(id);
    return this.repo.deleteGrant(schoolId, id);
  }
}
