import type { SupabaseClient } from '@supabase/supabase-js';
import type { SparePart, SparePartCreate } from '@educi/types';
import { ScSparePartNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScSparePartService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getSparePart(schoolId: string, id: string): Promise<SparePart> {
    const sparePart = await this.repo.findSparePartById(schoolId, id);
    if (!sparePart) throw new ScSparePartNotFoundError(id);
    return sparePart;
  }

  async listSpareParts(schoolId: string, filters?: Record<string, unknown>): Promise<SparePart[]> {
    return this.repo.findAllSpareParts(schoolId, filters);
  }

  async createSparePart(schoolId: string, data: SparePartCreate): Promise<SparePart> {
    return this.repo.createSparePart(schoolId, data);
  }

  async updateSparePart(schoolId: string, id: string, data: Partial<SparePartCreate>): Promise<SparePart> {
    const existing = await this.repo.findSparePartById(schoolId, id);
    if (!existing) throw new ScSparePartNotFoundError(id);
    return this.repo.updateSparePart(schoolId, id, data);
  }

  async deleteSparePart(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSparePartById(schoolId, id);
    if (!existing) throw new ScSparePartNotFoundError(id);
    return this.repo.deleteSparePart(schoolId, id);
  }

  async countSpareParts(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSpareParts(schoolId, filters);
  }
}
