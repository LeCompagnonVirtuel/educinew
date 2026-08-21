import type { SupabaseClient } from '@supabase/supabase-js';
import type { EmergencyAlert, EmergencyAlertCreate } from '@educi/types';
import { ScBusNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScEmergencyAlertService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getAlert(schoolId: string, id: string): Promise<EmergencyAlert> {
    const alert = await this.repo.findEmergencyAlertById(schoolId, id);
    if (!alert) throw new ScBusNotFoundError(id);
    return alert;
  }

  async listAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<EmergencyAlert[]> {
    return this.repo.findAllEmergencyAlerts(schoolId, filters);
  }

  async createAlert(schoolId: string, data: EmergencyAlertCreate): Promise<EmergencyAlert> {
    return this.repo.createEmergencyAlert(schoolId, data);
  }

  async updateAlert(schoolId: string, id: string, data: Partial<EmergencyAlertCreate>): Promise<EmergencyAlert> {
    const existing = await this.repo.findEmergencyAlertById(schoolId, id);
    if (!existing) throw new ScBusNotFoundError(id);
    return this.repo.updateEmergencyAlert(schoolId, id, data);
  }

  async deleteAlert(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEmergencyAlertById(schoolId, id);
    if (!existing) throw new ScBusNotFoundError(id);
    return this.repo.deleteEmergencyAlert(schoolId, id);
  }

  async countAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEmergencyAlerts(schoolId, filters);
  }
}
