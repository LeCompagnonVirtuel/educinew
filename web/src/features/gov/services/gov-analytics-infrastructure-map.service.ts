import type { SupabaseClient } from '@supabase/supabase-js';
import type { InfrastructureMap, InfrastructureMapCreate } from '@educi/types';
import { GovInfrastructureMapNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAnalyticsInfrastructureMapService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<InfrastructureMap> {
    const item = await this.repo.findInfrastructureMapById(schoolId, id);
    if (!item) throw new GovInfrastructureMapNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<InfrastructureMap[]> {
    return this.repo.findAllInfrastructureMaps(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<InfrastructureMapCreate>): Promise<InfrastructureMap> {
    return this.repo.createInfrastructureMap(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<InfrastructureMapCreate>): Promise<InfrastructureMap> {
    const existing = await this.repo.findInfrastructureMapById(schoolId, id);
    if (!existing) throw new GovInfrastructureMapNotFoundError(id);
    return this.repo.updateInfrastructureMap(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInfrastructureMapById(schoolId, id);
    if (!existing) throw new GovInfrastructureMapNotFoundError(id);
    return this.repo.deleteInfrastructureMap(schoolId, id);
  }
}
