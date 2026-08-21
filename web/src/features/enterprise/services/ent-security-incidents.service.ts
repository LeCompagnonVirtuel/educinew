// Enterprise Platform Service - SecurityIncidents
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSecurityIncidentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSecurityIncident(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSecurityIncidentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSecurityIncidents(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSecurityIncidents(schoolId, filters);
  }
  async createSecurityIncident(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSecurityIncident(schoolId, data);
  }
  async updateSecurityIncident(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSecurityIncidentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSecurityIncident(schoolId, id, data);
  }
  async deleteSecurityIncident(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSecurityIncidentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSecurityIncident(schoolId, id);
  }
  async countSecurityIncidents(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSecurityIncidents(schoolId, filters);
  }
}
