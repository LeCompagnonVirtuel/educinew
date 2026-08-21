// Enterprise Platform Service - UptimeMonitorsIncidents
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntUptimeIncidentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getUptimeMonitorsIncident(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findUptimeMonitorsIncidentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listUptimeMonitorsIncidents(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllUptimeMonitorsIncidents(schoolId, filters);
  }
  async createUptimeMonitorsIncident(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createUptimeMonitorsIncident(schoolId, data);
  }
  async updateUptimeMonitorsIncident(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findUptimeMonitorsIncidentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateUptimeMonitorsIncident(schoolId, id, data);
  }
  async deleteUptimeMonitorsIncident(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findUptimeMonitorsIncidentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteUptimeMonitorsIncident(schoolId, id);
  }
  async countUptimeMonitorsIncidents(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countUptimeMonitorsIncidents(schoolId, filters);
  }
}
