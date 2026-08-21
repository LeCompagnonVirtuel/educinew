import type { SupabaseClient } from '@supabase/supabase-js';
import type { Bed, BedCreate, BedUpdate } from '@educi/types';
import { ScBedNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBedService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getBed(schoolId: string, id: string): Promise<Bed> {
    const bed = await this.repo.findBedById(schoolId, id);
    if (!bed) throw new ScBedNotFoundError(id);
    return bed;
  }

  async listBeds(schoolId: string, filters?: Record<string, unknown>): Promise<Bed[]> {
    return this.repo.findAllBeds(schoolId, filters);
  }

  async createBed(schoolId: string, data: BedCreate): Promise<Bed> {
    return this.repo.createBed(schoolId, data);
  }

  async updateBed(schoolId: string, id: string, data: BedUpdate): Promise<Bed> {
    const existing = await this.repo.findBedById(schoolId, id);
    if (!existing) throw new ScBedNotFoundError(id);
    return this.repo.updateBed(schoolId, id, data);
  }

  async deleteBed(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBedById(schoolId, id);
    if (!existing) throw new ScBedNotFoundError(id);
    return this.repo.deleteBed(schoolId, id);
  }

  async countBeds(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBeds(schoolId, filters);
  }
}
