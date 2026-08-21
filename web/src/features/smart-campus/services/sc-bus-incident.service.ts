import type { SupabaseClient } from '@supabase/supabase-js';
import type { BusIncident, BusIncidentCreate } from '@educi/types';
import { ScBusNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBusIncidentService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getIncident(schoolId: string, id: string): Promise<BusIncident> {
    const incident = await this.repo.findBusIncidentById(schoolId, id);
    if (!incident) throw new ScBusNotFoundError(id);
    return incident;
  }

  async listIncidents(schoolId: string, filters?: Record<string, unknown>): Promise<BusIncident[]> {
    return this.repo.findAllBusIncidents(schoolId, filters);
  }

  async createIncident(schoolId: string, data: BusIncidentCreate): Promise<BusIncident> {
    return this.repo.createBusIncident(schoolId, data);
  }

  async updateIncident(schoolId: string, id: string, data: Partial<BusIncidentCreate>): Promise<BusIncident> {
    const existing = await this.repo.findBusIncidentById(schoolId, id);
    if (!existing) throw new ScBusNotFoundError(id);
    return this.repo.updateBusIncident(schoolId, id, data);
  }

  async deleteIncident(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBusIncidentById(schoolId, id);
    if (!existing) throw new ScBusNotFoundError(id);
    return this.repo.deleteBusIncident(schoolId, id);
  }

  async countIncidents(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBusIncidents(schoolId, filters);
  }
}
