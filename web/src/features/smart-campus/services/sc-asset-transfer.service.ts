import type { SupabaseClient } from '@supabase/supabase-js';
import type { AssetTransfer, AssetTransferCreate } from '@educi/types';
import { ScAssetTransferNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScAssetTransferService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getTransfer(schoolId: string, id: string): Promise<AssetTransfer> {
    const transfer = await this.repo.findAssetTransferById(schoolId, id);
    if (!transfer) throw new ScAssetTransferNotFoundError(id);
    return transfer;
  }

  async listTransfers(schoolId: string, filters?: Record<string, unknown>): Promise<AssetTransfer[]> {
    return this.repo.findAllAssetTransfers(schoolId, filters);
  }

  async createTransfer(schoolId: string, data: AssetTransferCreate): Promise<AssetTransfer> {
    return this.repo.createAssetTransfer(schoolId, data);
  }

  async updateTransfer(schoolId: string, id: string, data: Partial<AssetTransferCreate>): Promise<AssetTransfer> {
    const existing = await this.repo.findAssetTransferById(schoolId, id);
    if (!existing) throw new ScAssetTransferNotFoundError(id);
    return this.repo.updateAssetTransfer(schoolId, id, data);
  }

  async deleteTransfer(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAssetTransferById(schoolId, id);
    if (!existing) throw new ScAssetTransferNotFoundError(id);
    return this.repo.deleteAssetTransfer(schoolId, id);
  }

  async countTransfers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAssetTransfers(schoolId, filters);
  }
}
