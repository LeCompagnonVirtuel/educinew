import type { SupabaseClient } from '@supabase/supabase-js';
import type { AssetDepreciation, AssetDepreciationCreate } from '@educi/types';
import { ScDepreciationNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScAssetDepreciationService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getDepreciation(schoolId: string, id: string): Promise<AssetDepreciation> {
    const depreciation = await this.repo.findAssetDepreciationById(schoolId, id);
    if (!depreciation) throw new ScDepreciationNotFoundError(id);
    return depreciation;
  }

  async listDepreciations(schoolId: string, filters?: Record<string, unknown>): Promise<AssetDepreciation[]> {
    return this.repo.findAllAssetDepreciations(schoolId, filters);
  }

  async createDepreciation(schoolId: string, data: AssetDepreciationCreate): Promise<AssetDepreciation> {
    return this.repo.createAssetDepreciation(schoolId, data);
  }

  async updateDepreciation(schoolId: string, id: string, data: Partial<AssetDepreciationCreate>): Promise<AssetDepreciation> {
    const existing = await this.repo.findAssetDepreciationById(schoolId, id);
    if (!existing) throw new ScDepreciationNotFoundError(id);
    return this.repo.updateAssetDepreciation(schoolId, id, data);
  }

  async deleteDepreciation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAssetDepreciationById(schoolId, id);
    if (!existing) throw new ScDepreciationNotFoundError(id);
    return this.repo.deleteAssetDepreciation(schoolId, id);
  }

  async countDepreciations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAssetDepreciations(schoolId, filters);
  }
}
