import type { SupabaseClient } from '@supabase/supabase-js';
import type { BusTrip, BusTripCreate } from '@educi/types';
import { ScTripNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBusTripService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getTrip(schoolId: string, id: string): Promise<BusTrip> {
    const trip = await this.repo.findBusTripById(schoolId, id);
    if (!trip) throw new ScTripNotFoundError(id);
    return trip;
  }

  async listTrips(schoolId: string, filters?: Record<string, unknown>): Promise<BusTrip[]> {
    return this.repo.findAllBusTrips(schoolId, filters);
  }

  async createTrip(schoolId: string, data: BusTripCreate): Promise<BusTrip> {
    return this.repo.createBusTrip(schoolId, data);
  }

  async updateTrip(schoolId: string, id: string, data: Partial<BusTripCreate>): Promise<BusTrip> {
    const existing = await this.repo.findBusTripById(schoolId, id);
    if (!existing) throw new ScTripNotFoundError(id);
    return this.repo.updateBusTrip(schoolId, id, data);
  }

  async deleteTrip(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBusTripById(schoolId, id);
    if (!existing) throw new ScTripNotFoundError(id);
    return this.repo.deleteBusTrip(schoolId, id);
  }

  async findActiveTrips(schoolId: string): Promise<BusTrip[]> {
    return this.repo.findActiveBusTrips(schoolId);
  }

  async findByDateRange(schoolId: string, start: string, end: string): Promise<BusTrip[]> {
    return this.repo.findBusTripsByDateRange(schoolId, start, end);
  }

  async countTrips(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBusTrips(schoolId, filters);
  }
}
