// Enterprise Platform Service - SecurityIncident
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SecurityIncident, SecurityIncidentCreate } from '@educi/types';
import { EntSecurityIncidentNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSecurityIncidentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSecurityIncident(schoolId: string, id: string): Promise<SecurityIncident> {
    const item = await this.repo.findSecurityIncidentById(schoolId, id);
    if (!item) throw new EntSecurityIncidentNotFoundError(id);
    return item;
  }
  async listSecurityIncidents(schoolId: string, filters?: Record<string, unknown>): Promise<SecurityIncident[]> {
    return this.repo.findAllSecurityIncidents(schoolId, filters);
  }
  async createSecurityIncident(schoolId: string, data: SecurityIncidentCreate): Promise<SecurityIncident> {
    return this.repo.createSecurityIncident(schoolId, data);
  }
  async updateSecurityIncident(schoolId: string, id: string, data: Partial<SecurityIncidentCreate>): Promise<SecurityIncident> {
    const existing = await this.repo.findSecurityIncidentById(schoolId, id);
    if (!existing) throw new EntSecurityIncidentNotFoundError(id);
    return this.repo.updateSecurityIncident(schoolId, id, data);
  }
  async deleteSecurityIncident(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSecurityIncidentById(schoolId, id);
    if (!existing) throw new EntSecurityIncidentNotFoundError(id);
    return this.repo.deleteSecurityIncident(schoolId, id);
  }
  async countSecurityIncidents(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSecurityIncidents(schoolId, filters);
  }
}
