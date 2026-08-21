import type { SupabaseClient } from '@supabase/supabase-js';
import type { ITAsset, ITAssetCreate } from '@educi/types';
import { ScITAssetNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScITAssetService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getITAsset(schoolId: string, id: string): Promise<ITAsset> {
    const itAsset = await this.repo.findITAssetById(schoolId, id);
    if (!itAsset) throw new ScITAssetNotFoundError(id);
    return itAsset;
  }

  async listITAssets(schoolId: string, filters?: Record<string, unknown>): Promise<ITAsset[]> {
    return this.repo.findAllITAssets(schoolId, filters);
  }

  async createITAsset(schoolId: string, data: ITAssetCreate): Promise<ITAsset> {
    return this.repo.createITAsset(schoolId, data);
  }

  async updateITAsset(schoolId: string, id: string, data: Partial<ITAssetCreate>): Promise<ITAsset> {
    const existing = await this.repo.findITAssetById(schoolId, id);
    if (!existing) throw new ScITAssetNotFoundError(id);
    return this.repo.updateITAsset(schoolId, id, data);
  }

  async deleteITAsset(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findITAssetById(schoolId, id);
    if (!existing) throw new ScITAssetNotFoundError(id);
    return this.repo.deleteITAsset(schoolId, id);
  }

  async countITAssets(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countITAssets(schoolId, filters);
  }
}
