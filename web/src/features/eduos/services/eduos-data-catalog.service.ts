import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataCatalog } from '@educi/types';
import { EduOSDataCatalogError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDataCatalogService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDataCatalog(schoolId: string, id: string): Promise<DataCatalog> {
    const item = await this.repo.getDataCatalog(schoolId, id);
    if (!item) throw new EduOSDataCatalogError(id);
    return item;
  }
  async listDataCatalogs(schoolId: string, filters?: Record<string, unknown>): Promise<DataCatalog[]> {
    return this.repo.listDataCatalogs(schoolId, filters);
  }
  async createDataCatalog(schoolId: string, data: Partial<DataCatalog>): Promise<DataCatalog> {
    return this.repo.createDataCatalog(schoolId, data as any);
  }
  async updateDataCatalog(schoolId: string, id: string, data: Partial<DataCatalog>): Promise<DataCatalog> {
    const existing = await this.repo.getDataCatalog(schoolId, id);
    if (!existing) throw new EduOSDataCatalogError(id);
    return this.repo.updateDataCatalog(schoolId, id, data as any);
  }
  async deleteDataCatalog(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDataCatalog(schoolId, id);
    if (!existing) throw new EduOSDataCatalogError(id);
    return this.repo.deleteDataCatalog(schoolId, id);
  }
}

