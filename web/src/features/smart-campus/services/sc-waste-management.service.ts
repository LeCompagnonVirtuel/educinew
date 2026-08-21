import type { SupabaseClient } from '@supabase/supabase-js';
import type { WasteManagement, WasteManagementCreate } from '@educi/types';
import { ScWasteManagementNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScWasteManagementService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getWaste(schoolId: string, id: string): Promise<WasteManagement> {
    const waste = await this.repo.findWasteManagementById(schoolId, id);
    if (!waste) throw new ScWasteManagementNotFoundError(id);
    return waste;
  }

  async listWaste(schoolId: string, filters?: Record<string, unknown>): Promise<WasteManagement[]> {
    return this.repo.findAllWasteManagement(schoolId, filters);
  }

  async createWaste(schoolId: string, data: WasteManagementCreate): Promise<WasteManagement> {
    return this.repo.createWasteManagement(schoolId, data);
  }

  async updateWaste(schoolId: string, id: string, data: Partial<WasteManagementCreate>): Promise<WasteManagement> {
    const existing = await this.repo.findWasteManagementById(schoolId, id);
    if (!existing) throw new ScWasteManagementNotFoundError(id);
    return this.repo.updateWasteManagement(schoolId, id, data);
  }

  async deleteWaste(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findWasteManagementById(schoolId, id);
    if (!existing) throw new ScWasteManagementNotFoundError(id);
    return this.repo.deleteWasteManagement(schoolId, id);
  }

  async findByType(schoolId: string, type: string): Promise<WasteManagement[]> {
    return this.repo.findWasteManagementByType(schoolId, type);
  }

  async findByBuildingId(schoolId: string, buildingId: string): Promise<WasteManagement[]> {
    return this.repo.findWasteManagementByBuildingId(schoolId, buildingId);
  }

  async countWaste(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countWasteManagement(schoolId, filters);
  }
}
