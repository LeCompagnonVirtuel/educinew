// Enterprise Platform Service - StatusPagesIncidents
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntStatusPageIncidentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getStatusPagesIncident(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findStatusPagesIncidentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listStatusPagesIncidents(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllStatusPagesIncidents(schoolId, filters);
  }
  async createStatusPagesIncident(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createStatusPagesIncident(schoolId, data);
  }
  async updateStatusPagesIncident(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findStatusPagesIncidentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateStatusPagesIncident(schoolId, id, data);
  }
  async deleteStatusPagesIncident(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findStatusPagesIncidentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteStatusPagesIncident(schoolId, id);
  }
  async countStatusPagesIncidents(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countStatusPagesIncidents(schoolId, filters);
  }
}
