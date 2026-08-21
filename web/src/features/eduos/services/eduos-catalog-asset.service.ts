import type { SupabaseClient } from '@supabase/supabase-js';
import type { CatalogAsset } from '@educi/types';
import { EduOSCatalogAssetError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSCatalogAssetService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getCatalogAsset(schoolId: string, id: string): Promise<CatalogAsset> {
    const item = await this.repo.getCatalogAsset(schoolId, id);
    if (!item) throw new EduOSCatalogAssetError(id);
    return item;
  }
  async listCatalogAssets(schoolId: string, filters?: Record<string, unknown>): Promise<CatalogAsset[]> {
    return this.repo.listCatalogAssets(schoolId, filters);
  }
  async createCatalogAsset(schoolId: string, data: Partial<CatalogAsset>): Promise<CatalogAsset> {
    return this.repo.createCatalogAsset(schoolId, data as any);
  }
  async updateCatalogAsset(schoolId: string, id: string, data: Partial<CatalogAsset>): Promise<CatalogAsset> {
    const existing = await this.repo.getCatalogAsset(schoolId, id);
    if (!existing) throw new EduOSCatalogAssetError(id);
    return this.repo.updateCatalogAsset(schoolId, id, data as any);
  }
  async deleteCatalogAsset(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCatalogAsset(schoolId, id);
    if (!existing) throw new EduOSCatalogAssetError(id);
    return this.repo.deleteCatalogAsset(schoolId, id);
  }
}

