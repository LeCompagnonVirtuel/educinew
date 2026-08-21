// Enterprise Platform Service - DataCatalog
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataCatalogService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataCatalog(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataCatalogById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataCatalog(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataCatalog(schoolId, filters);
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
  async countDataCatalog(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataCatalog(schoolId, filters);
  }
}
