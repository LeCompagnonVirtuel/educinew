import type { SupabaseClient } from '@supabase/supabase-js';
import type { SecurityIncident, SecurityIncidentCreate } from '@educi/types';
import { ScSecurityIncidentNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScSecurityManagementService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getIncident(schoolId: string, id: string): Promise<SecurityIncident> {
    const incident = await this.repo.findSecurityIncidentById(schoolId, id);
    if (!incident) throw new ScSecurityIncidentNotFoundError(id);
    return incident;
  }

  async createIncident(schoolId: string, data: SecurityIncidentCreate): Promise<SecurityIncident> {
    return this.repo.createSecurityIncident(schoolId, data);
  }

  async resolveIncident(schoolId: string, id: string, resolution: string): Promise<SecurityIncident> {
    const existing = await this.repo.findSecurityIncidentById(schoolId, id);
    if (!existing) throw new ScSecurityIncidentNotFoundError(id);
    return this.repo.resolveSecurityIncident(schoolId, id, resolution);
  }

  async getOpenIncidents(schoolId: string): Promise<SecurityIncident[]> {
    return this.repo.findOpenSecurityIncidents(schoolId);
  }

  async getCriticalIncidents(schoolId: string): Promise<SecurityIncident[]> {
    return this.repo.findCriticalSecurityIncidents(schoolId);
  }

  async getIncidentsByType(schoolId: string, type: string): Promise<SecurityIncident[]> {
    return this.repo.findSecurityIncidentsByType(schoolId, type);
  }

  async getIncidentStats(schoolId: string, startDate: string, endDate: string): Promise<Record<string, number>> {
    return this.repo.getSecurityIncidentStats(schoolId, startDate, endDate);
  }

  async deleteIncident(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSecurityIncidentById(schoolId, id);
    if (!existing) throw new ScSecurityIncidentNotFoundError(id);
    return this.repo.deleteSecurityIncident(schoolId, id);
  }
}
