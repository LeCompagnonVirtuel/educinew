// Enterprise Platform Service - DataCatalogs
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataCatalogEntryService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataCatalog(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataCatalogById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataCatalogs(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataCatalogs(schoolId, filters);
  }
  async createDataCatalog(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataCatalog(schoolId, data);
  }
  async updateDataCatalog(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataCatalogById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataCatalog(schoolId, id, data);
  }
  async deleteDataCatalog(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataCatalogById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataCatalog(schoolId, id);
  }
  async countDataCatalogs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataCatalogs(schoolId, filters);
  }
}
