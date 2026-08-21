import type { SupabaseClient } from '@supabase/supabase-js';
import type { Building, BuildingCreate, BuildingUpdate } from '@educi/types';
import { ScBuildingNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBuildingService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getBuilding(schoolId: string, id: string): Promise<Building> {
    const building = await this.repo.findBuildingById(schoolId, id);
    if (!building) throw new ScBuildingNotFoundError(id);
    return building;
  }

  async listBuildings(schoolId: string, filters?: Record<string, unknown>): Promise<Building[]> {
    return this.repo.findAllBuildings(schoolId, filters);
  }

  async createBuilding(schoolId: string, data: BuildingCreate): Promise<Building> {
    return this.repo.createBuilding(schoolId, data);
  }

  async updateBuilding(schoolId: string, id: string, data: BuildingUpdate): Promise<Building> {
    const existing = await this.repo.findBuildingById(schoolId, id);
    if (!existing) throw new ScBuildingNotFoundError(id);
    return this.repo.updateBuilding(schoolId, id, data);
  }

  async deleteBuilding(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBuildingById(schoolId, id);
    if (!existing) throw new ScBuildingNotFoundError(id);
    return this.repo.deleteBuilding(schoolId, id);
  }

  async findByType(schoolId: string, type: string): Promise<Building[]> {
    return this.repo.findBuildingsByType(schoolId, type);
  }

  async countBuildings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBuildings(schoolId, filters);
  }
}
