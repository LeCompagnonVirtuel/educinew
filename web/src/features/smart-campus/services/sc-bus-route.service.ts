import type { SupabaseClient } from '@supabase/supabase-js';
import type { BusRoute, BusRouteCreate } from '@educi/types';
import { ScRouteNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBusRouteService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getRoute(schoolId: string, id: string): Promise<BusRoute> {
    const route = await this.repo.findBusRouteById(schoolId, id);
    if (!route) throw new ScRouteNotFoundError(id);
    return route;
  }

  async listRoutes(schoolId: string, filters?: Record<string, unknown>): Promise<BusRoute[]> {
    return this.repo.findAllBusRoutes(schoolId, filters);
  }

  async createRoute(schoolId: string, data: BusRouteCreate): Promise<BusRoute> {
    return this.repo.createBusRoute(schoolId, data);
  }

  async updateRoute(schoolId: string, id: string, data: Partial<BusRouteCreate>): Promise<BusRoute> {
    const existing = await this.repo.findBusRouteById(schoolId, id);
    if (!existing) throw new ScRouteNotFoundError(id);
    return this.repo.updateBusRoute(schoolId, id, data);
  }

  async deleteRoute(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBusRouteById(schoolId, id);
    if (!existing) throw new ScRouteNotFoundError(id);
    return this.repo.deleteBusRoute(schoolId, id);
  }

  async findActiveRoutes(schoolId: string, date: string): Promise<BusRoute[]> {
    return this.repo.findActiveBusRoutes(schoolId, date);
  }

  async findByBusId(schoolId: string, busId: string): Promise<BusRoute[]> {
    return this.repo.findBusRoutesByBusId(schoolId, busId);
  }

  async countRoutes(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBusRoutes(schoolId, filters);
  }
}
