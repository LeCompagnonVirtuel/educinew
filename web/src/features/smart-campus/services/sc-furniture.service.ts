import type { SupabaseClient } from '@supabase/supabase-js';
import type { Furniture, FurnitureCreate } from '@educi/types';
import { ScFurnitureNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScFurnitureService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getFurniture(schoolId: string, id: string): Promise<Furniture> {
    const furniture = await this.repo.findFurnitureById(schoolId, id);
    if (!furniture) throw new ScFurnitureNotFoundError(id);
    return furniture;
  }

  async listFurniture(schoolId: string, filters?: Record<string, unknown>): Promise<Furniture[]> {
    return this.repo.findAllFurniture(schoolId, filters);
  }

  async createFurniture(schoolId: string, data: FurnitureCreate): Promise<Furniture> {
    return this.repo.createFurniture(schoolId, data);
  }

  async updateFurniture(schoolId: string, id: string, data: Partial<FurnitureCreate>): Promise<Furniture> {
    const existing = await this.repo.findFurnitureById(schoolId, id);
    if (!existing) throw new ScFurnitureNotFoundError(id);
    return this.repo.updateFurniture(schoolId, id, data);
  }

  async deleteFurniture(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFurnitureById(schoolId, id);
    if (!existing) throw new ScFurnitureNotFoundError(id);
    return this.repo.deleteFurniture(schoolId, id);
  }

  async countFurniture(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFurniture(schoolId, filters);
  }
}
