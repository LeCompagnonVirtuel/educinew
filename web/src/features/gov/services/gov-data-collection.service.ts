// Government & National Governance Service - DataCollection
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataCollection, DataCollectionCreate } from '@educi/types';
import { GovDataCollectionNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovDataCollectionService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getDataCollection(schoolId: string, id: string): Promise<DataCollection> {
    const item = await this.repo.findDataCollectionById(schoolId, id);
    if (!item) throw new GovDataCollectionNotFoundError(id);
    return item;
  }

  async listDataCollections(schoolId: string, filters?: Record<string, unknown>): Promise<DataCollection[]> {
    return this.repo.findAllDataCollections(schoolId, filters);
  }

  async createDataCollection(schoolId: string, data: DataCollectionCreate): Promise<DataCollection> {
    return this.repo.createDataCollection(schoolId, data);
  }

  async updateDataCollection(schoolId: string, id: string, data: Partial<DataCollectionCreate>): Promise<DataCollection> {
    const existing = await this.repo.findDataCollectionById(schoolId, id);
    if (!existing) throw new GovDataCollectionNotFoundError(id);
    return this.repo.updateDataCollection(schoolId, id, data);
  }

  async deleteDataCollection(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataCollectionById(schoolId, id);
    if (!existing) throw new GovDataCollectionNotFoundError(id);
    return this.repo.deleteDataCollection(schoolId, id);
  }

  async countDataCollections(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataCollections(schoolId, filters);
  }
}
