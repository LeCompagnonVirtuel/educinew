import type { SupabaseClient } from '@supabase/supabase-js';
import type { GovernmentFunding, GovernmentFundingCreate } from '@educi/types';
import { GovGovernmentFundingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovFinanceGovernmentFundingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<GovernmentFunding> {
    const item = await this.repo.findGovernmentFundingById(schoolId, id);
    if (!item) throw new GovGovernmentFundingNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<GovernmentFunding[]> {
    return this.repo.findAllGovernmentFundings(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<GovernmentFundingCreate>): Promise<GovernmentFunding> {
    return this.repo.createGovernmentFunding(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<GovernmentFundingCreate>): Promise<GovernmentFunding> {
    const existing = await this.repo.findGovernmentFundingById(schoolId, id);
    if (!existing) throw new GovGovernmentFundingNotFoundError(id);
    return this.repo.updateGovernmentFunding(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findGovernmentFundingById(schoolId, id);
    if (!existing) throw new GovGovernmentFundingNotFoundError(id);
    return this.repo.deleteGovernmentFunding(schoolId, id);
  }
}
