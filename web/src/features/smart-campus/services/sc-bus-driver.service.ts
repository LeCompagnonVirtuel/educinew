import type { SupabaseClient } from '@supabase/supabase-js';
import type { BusDriver, BusDriverCreate } from '@educi/types';
import { ScDriverNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBusDriverService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getDriver(schoolId: string, id: string): Promise<BusDriver> {
    const driver = await this.repo.findBusDriverById(schoolId, id);
    if (!driver) throw new ScDriverNotFoundError(id);
    return driver;
  }

  async listDrivers(schoolId: string, filters?: Record<string, unknown>): Promise<BusDriver[]> {
    return this.repo.findAllBusDrivers(schoolId, filters);
  }

  async createDriver(schoolId: string, data: BusDriverCreate): Promise<BusDriver> {
    return this.repo.createBusDriver(schoolId, data);
  }

  async updateDriver(schoolId: string, id: string, data: Partial<BusDriverCreate>): Promise<BusDriver> {
    const existing = await this.repo.findBusDriverById(schoolId, id);
    if (!existing) throw new ScDriverNotFoundError(id);
    return this.repo.updateBusDriver(schoolId, id, data);
  }

  async deleteDriver(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBusDriverById(schoolId, id);
    if (!existing) throw new ScDriverNotFoundError(id);
    return this.repo.deleteBusDriver(schoolId, id);
  }

  async countDrivers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBusDrivers(schoolId, filters);
  }
}
