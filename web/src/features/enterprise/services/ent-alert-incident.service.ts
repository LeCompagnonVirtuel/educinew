// Enterprise Platform Service - AlertIncident
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AlertIncident, AlertIncidentCreate } from '@educi/types';
import { EntAlertIncidentNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAlertIncidentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAlertIncident(schoolId: string, id: string): Promise<AlertIncident> {
    const item = await this.repo.findAlertIncidentById(schoolId, id);
    if (!item) throw new EntAlertIncidentNotFoundError(id);
    return item;
  }
  async listAlertIncidents(schoolId: string, filters?: Record<string, unknown>): Promise<AlertIncident[]> {
    return this.repo.findAllAlertIncidents(schoolId, filters);
  }
  async createAlertIncident(schoolId: string, data: AlertIncidentCreate): Promise<AlertIncident> {
    return this.repo.createAlertIncident(schoolId, data);
  }
  async updateAlertIncident(schoolId: string, id: string, data: Partial<AlertIncidentCreate>): Promise<AlertIncident> {
    const existing = await this.repo.findAlertIncidentById(schoolId, id);
    if (!existing) throw new EntAlertIncidentNotFoundError(id);
    return this.repo.updateAlertIncident(schoolId, id, data);
  }
  async deleteAlertIncident(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAlertIncidentById(schoolId, id);
    if (!existing) throw new EntAlertIncidentNotFoundError(id);
    return this.repo.deleteAlertIncident(schoolId, id);
  }
  async countAlertIncidents(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAlertIncidents(schoolId, filters);
  }
}
