import type { SupabaseClient } from '@supabase/supabase-js';
import type { Asset, AssetCreate, AssetUpdate, AssetWarranty, AssetDepreciation, AssetTransfer, AssetTransferCreate } from '@educi/types';
import { ScAssetNotFoundError, ScAssetWarrantyNotFoundError, ScAssetDepreciationNotFoundError, ScAssetTransferNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScAssetLifecycleService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getAsset(schoolId: string, id: string): Promise<Asset> {
    const asset = await this.repo.findAssetById(schoolId, id);
    if (!asset) throw new ScAssetNotFoundError(id);
    return asset;
  }

  async createAsset(schoolId: string, data: AssetCreate): Promise<Asset> {
    return this.repo.createAsset(schoolId, data);
  }

  async updateAsset(schoolId: string, id: string, data: AssetUpdate): Promise<Asset> {
    const existing = await this.repo.findAssetById(schoolId, id);
    if (!existing) throw new ScAssetNotFoundError(id);
    return this.repo.updateAsset(schoolId, id, data);
  }

  async getWarranty(schoolId: string, assetId: string): Promise<AssetWarranty | null> {
    return this.repo.findAssetWarrantyByAssetId(schoolId, assetId);
  }

  async getDepreciation(schoolId: string, assetId: string): Promise<AssetDepreciation | null> {
    return this.repo.findAssetDepreciationByAssetId(schoolId, assetId);
  }

  async createTransfer(schoolId: string, data: AssetTransferCreate): Promise<AssetTransfer> {
    return this.repo.createAssetTransfer(schoolId, data);
  }

  async approveTransfer(schoolId: string, id: string, approvedBy: string): Promise<AssetTransfer> {
    const existing = await this.repo.findAssetTransferById(schoolId, id);
    if (!existing) throw new ScAssetTransferNotFoundError(id);
    return this.repo.approveAssetTransfer(schoolId, id, approvedBy);
  }

  async getDepreciatingAssets(schoolId: string): Promise<Asset[]> {
    return this.repo.getDepreciatingAssets(schoolId);
  }
}
