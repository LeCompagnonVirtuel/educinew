import type { SupabaseClient } from '@supabase/supabase-js';
import type { SecurityIncident, SecurityIncidentCreate } from '@educi/types';
import { ScSecurityIncidentNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScSecurityIncidentService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getIncident(schoolId: string, id: string): Promise<SecurityIncident> {
    const incident = await this.repo.findSecurityIncidentById(schoolId, id);
    if (!incident) throw new ScSecurityIncidentNotFoundError(id);
    return incident;
  }

  async listIncidents(schoolId: string, filters?: Record<string, unknown>): Promise<SecurityIncident[]> {
    return this.repo.findAllSecurityIncidents(schoolId, filters);
  }

  async createIncident(schoolId: string, data: SecurityIncidentCreate): Promise<SecurityIncident> {
    return this.repo.createSecurityIncident(schoolId, data);
  }

  async updateIncident(schoolId: string, id: string, data: Partial<SecurityIncidentCreate>): Promise<SecurityIncident> {
    const existing = await this.repo.findSecurityIncidentById(schoolId, id);
    if (!existing) throw new ScSecurityIncidentNotFoundError(id);
    return this.repo.updateSecurityIncident(schoolId, id, data);
  }

  async deleteIncident(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSecurityIncidentById(schoolId, id);
    if (!existing) throw new ScSecurityIncidentNotFoundError(id);
    return this.repo.deleteSecurityIncident(schoolId, id);
  }

  async countIncidents(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSecurityIncidents(schoolId, filters);
  }
}
