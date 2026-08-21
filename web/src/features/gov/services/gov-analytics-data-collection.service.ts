import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataCollection, DataCollectionCreate } from '@educi/types';
import { GovDataCollectionNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAnalyticsDataCollectionService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<DataCollection> {
    const item = await this.repo.findDataCollectionById(schoolId, id);
    if (!item) throw new GovDataCollectionNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<DataCollection[]> {
    return this.repo.findAllDataCollections(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<DataCollectionCreate>): Promise<DataCollection> {
    return this.repo.createDataCollection(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<DataCollectionCreate>): Promise<DataCollection> {
    const existing = await this.repo.findDataCollectionById(schoolId, id);
    if (!existing) throw new GovDataCollectionNotFoundError(id);
    return this.repo.updateDataCollection(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataCollectionById(schoolId, id);
    if (!existing) throw new GovDataCollectionNotFoundError(id);
    return this.repo.deleteDataCollection(schoolId, id);
  }
}
