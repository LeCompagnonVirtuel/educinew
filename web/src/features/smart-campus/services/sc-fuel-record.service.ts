import type { SupabaseClient } from '@supabase/supabase-js';
import type { FuelRecord, FuelRecordCreate } from '@educi/types';
import { ScFuelNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScFuelRecordService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getFuelRecord(schoolId: string, id: string): Promise<FuelRecord> {
    const record = await this.repo.findFuelRecordById(schoolId, id);
    if (!record) throw new ScFuelNotFoundError(id);
    return record;
  }

  async listFuelRecords(schoolId: string, filters?: Record<string, unknown>): Promise<FuelRecord[]> {
    return this.repo.findAllFuelRecords(schoolId, filters);
  }

  async createFuelRecord(schoolId: string, data: FuelRecordCreate): Promise<FuelRecord> {
    return this.repo.createFuelRecord(schoolId, data);
  }

  async updateFuelRecord(schoolId: string, id: string, data: Partial<FuelRecordCreate>): Promise<FuelRecord> {
    const existing = await this.repo.findFuelRecordById(schoolId, id);
    if (!existing) throw new ScFuelNotFoundError(id);
    return this.repo.updateFuelRecord(schoolId, id, data);
  }

  async deleteFuelRecord(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFuelRecordById(schoolId, id);
    if (!existing) throw new ScFuelNotFoundError(id);
    return this.repo.deleteFuelRecord(schoolId, id);
  }

  async countFuelRecords(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFuelRecords(schoolId, filters);
  }
}
