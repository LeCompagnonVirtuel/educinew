import type { SupabaseClient } from '@supabase/supabase-js';
import type { BusStop, BusStopCreate } from '@educi/types';
import { ScBusNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBusStopService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getStop(schoolId: string, id: string): Promise<BusStop> {
    const stop = await this.repo.findBusStopById(schoolId, id);
    if (!stop) throw new ScBusNotFoundError(id);
    return stop;
  }

  async listStops(schoolId: string, filters?: Record<string, unknown>): Promise<BusStop[]> {
    return this.repo.findAllBusStops(schoolId, filters);
  }

  async createStop(schoolId: string, data: BusStopCreate): Promise<BusStop> {
    return this.repo.createBusStop(schoolId, data);
  }

  async updateStop(schoolId: string, id: string, data: Partial<BusStopCreate>): Promise<BusStop> {
    const existing = await this.repo.findBusStopById(schoolId, id);
    if (!existing) throw new ScBusNotFoundError(id);
    return this.repo.updateBusStop(schoolId, id, data);
  }

  async deleteStop(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBusStopById(schoolId, id);
    if (!existing) throw new ScBusNotFoundError(id);
    return this.repo.deleteBusStop(schoolId, id);
  }

  async findByRouteId(schoolId: string, routeId: string): Promise<BusStop[]> {
    return this.repo.findBusStopsByRouteId(schoolId, routeId);
  }
}
