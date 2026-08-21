import type { SupabaseClient } from '@supabase/supabase-js';
import type { LibraryInventory, LibraryInventoryCreate } from '@educi/types';
import { ScInventoryNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScLibraryInventoryService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getInventory(schoolId: string, id: string): Promise<LibraryInventory> {
    const inventory = await this.repo.findLibraryInventoryById(schoolId, id);
    if (!inventory) throw new ScInventoryNotFoundError(id);
    return inventory;
  }

  async listInventory(schoolId: string, filters?: Record<string, unknown>): Promise<LibraryInventory[]> {
    return this.repo.findAllLibraryInventory(schoolId, filters);
  }

  async createInventory(schoolId: string, data: LibraryInventoryCreate): Promise<LibraryInventory> {
    return this.repo.createLibraryInventory(schoolId, data);
  }

  async updateInventory(schoolId: string, id: string, data: Partial<LibraryInventoryCreate>): Promise<LibraryInventory> {
    const existing = await this.repo.findLibraryInventoryById(schoolId, id);
    if (!existing) throw new ScInventoryNotFoundError(id);
    return this.repo.updateLibraryInventory(schoolId, id, data);
  }

  async deleteInventory(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLibraryInventoryById(schoolId, id);
    if (!existing) throw new ScInventoryNotFoundError(id);
    return this.repo.deleteLibraryInventory(schoolId, id);
  }

  async countInventory(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLibraryInventory(schoolId, filters);
  }
}
