import type { SupabaseClient } from '@supabase/supabase-js';
import type { AssetWarranty, AssetWarrantyCreate } from '@educi/types';
import { ScWarrantyNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScAssetWarrantyService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getWarranty(schoolId: string, id: string): Promise<AssetWarranty> {
    const warranty = await this.repo.findAssetWarrantyById(schoolId, id);
    if (!warranty) throw new ScWarrantyNotFoundError(id);
    return warranty;
  }

  async listWarranties(schoolId: string, filters?: Record<string, unknown>): Promise<AssetWarranty[]> {
    return this.repo.findAllAssetWarranties(schoolId, filters);
  }

  async createWarranty(schoolId: string, data: AssetWarrantyCreate): Promise<AssetWarranty> {
    return this.repo.createAssetWarranty(schoolId, data);
  }

  async updateWarranty(schoolId: string, id: string, data: Partial<AssetWarrantyCreate>): Promise<AssetWarranty> {
    const existing = await this.repo.findAssetWarrantyById(schoolId, id);
    if (!existing) throw new ScWarrantyNotFoundError(id);
    return this.repo.updateAssetWarranty(schoolId, id, data);
  }

  async deleteWarranty(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAssetWarrantyById(schoolId, id);
    if (!existing) throw new ScWarrantyNotFoundError(id);
    return this.repo.deleteAssetWarranty(schoolId, id);
  }

  async countWarranties(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAssetWarranties(schoolId, filters);
  }
}
