import type { SupabaseClient } from '@supabase/supabase-js';
import type { Bus, BusCreate, BusUpdate, BusQuery } from '@educi/types';
import { ScBusNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBusService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getBus(schoolId: string, id: string): Promise<Bus> {
    const bus = await this.repo.findBusById(schoolId, id);
    if (!bus) throw new ScBusNotFoundError(id);
    return bus;
  }

  async listBuses(schoolId: string, query?: BusQuery): Promise<Bus[]> {
    return this.repo.findAllBuses(schoolId, query);
  }

  async createBus(schoolId: string, data: BusCreate): Promise<Bus> {
    return this.repo.createBus(schoolId, data);
  }

  async updateBus(schoolId: string, id: string, data: BusUpdate): Promise<Bus> {
    const existing = await this.repo.findBusById(schoolId, id);
    if (!existing) throw new ScBusNotFoundError(id);
    return this.repo.updateBus(schoolId, id, data);
  }

  async deleteBus(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBusById(schoolId, id);
    if (!existing) throw new ScBusNotFoundError(id);
    return this.repo.deleteBus(schoolId, id);
  }

  async findByPlateNumber(schoolId: string, plateNumber: string): Promise<Bus | null> {
    return this.repo.findBusByPlateNumber(schoolId, plateNumber);
  }

  async findAvailable(schoolId: string, date: string): Promise<Bus[]> {
    return this.repo.findAvailableBuses(schoolId, date);
  }

  async countBuses(schoolId: string, query?: BusQuery): Promise<number> {
    return this.repo.countBuses(schoolId, query);
  }
}
