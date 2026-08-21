import type { SupabaseClient } from '@supabase/supabase-js';
import type { EmergencyPlan, EmergencyPlanCreate, EmergencyPlanUpdate, SecurityIncident, SecurityIncidentCreate } from '@educi/types';
import { ScEmergencyPlanNotFoundError, ScSecurityIncidentNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScEmergencyManagementService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getPlan(schoolId: string, id: string): Promise<EmergencyPlan> {
    const plan = await this.repo.findEmergencyPlanById(schoolId, id);
    if (!plan) throw new ScEmergencyPlanNotFoundError(id);
    return plan;
  }

  async createPlan(schoolId: string, data: EmergencyPlanCreate): Promise<EmergencyPlan> {
    return this.repo.createEmergencyPlan(schoolId, data);
  }

  async updatePlan(schoolId: string, id: string, data: EmergencyPlanUpdate): Promise<EmergencyPlan> {
    const existing = await this.repo.findEmergencyPlanById(schoolId, id);
    if (!existing) throw new ScEmergencyPlanNotFoundError(id);
    return this.repo.updateEmergencyPlan(schoolId, id, data);
  }

  async publishPlan(schoolId: string, id: string): Promise<EmergencyPlan> {
    const existing = await this.repo.findEmergencyPlanById(schoolId, id);
    if (!existing) throw new ScEmergencyPlanNotFoundError(id);
    return this.repo.publishEmergencyPlan(schoolId, id);
  }

  async getActivePlans(schoolId: string): Promise<EmergencyPlan[]> {
    return this.repo.findActiveEmergencyPlans(schoolId);
  }

  async getLatestVersion(schoolId: string, planType: string): Promise<EmergencyPlan | null> {
    return this.repo.getLatestEmergencyPlanVersion(schoolId, planType);
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
}
