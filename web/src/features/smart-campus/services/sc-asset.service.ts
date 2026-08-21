import type { SupabaseClient } from '@supabase/supabase-js';
import type { Asset, AssetCreate, AssetUpdate } from '@educi/types';
import { ScAssetNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScAssetService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getAsset(schoolId: string, id: string): Promise<Asset> {
    const asset = await this.repo.findAssetById(schoolId, id);
    if (!asset) throw new ScAssetNotFoundError(id);
    return asset;
  }

  async listAssets(schoolId: string, filters?: Record<string, unknown>): Promise<Asset[]> {
    return this.repo.findAllAssets(schoolId, filters);
  }

  async createAsset(schoolId: string, data: AssetCreate): Promise<Asset> {
    return this.repo.createAsset(schoolId, data);
  }

  async updateAsset(schoolId: string, id: string, data: AssetUpdate): Promise<Asset> {
    const existing = await this.repo.findAssetById(schoolId, id);
    if (!existing) throw new ScAssetNotFoundError(id);
    return this.repo.updateAsset(schoolId, id, data);
  }

  async deleteAsset(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAssetById(schoolId, id);
    if (!existing) throw new ScAssetNotFoundError(id);
    return this.repo.deleteAsset(schoolId, id);
  }

  async findByTag(schoolId: string, tag: string): Promise<Asset | null> {
    return this.repo.findAssetByTag(schoolId, tag);
  }

  async findByCategory(schoolId: string, category: string): Promise<Asset[]> {
    return this.repo.findAssetsByCategory(schoolId, category);
  }

  async countAssets(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAssets(schoolId, filters);
  }
}
