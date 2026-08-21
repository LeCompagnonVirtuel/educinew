// Enterprise Platform Service - IncidentTimelinesActions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntIncidentActionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getIncidentTimelinesAction(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findIncidentTimelinesActionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listIncidentTimelinesActions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllIncidentTimelinesActions(schoolId, filters);
  }
  async createIncidentTimelinesAction(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createIncidentTimelinesAction(schoolId, data);
  }
  async updateIncidentTimelinesAction(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findIncidentTimelinesActionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateIncidentTimelinesAction(schoolId, id, data);
  }
  async deleteIncidentTimelinesAction(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIncidentTimelinesActionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteIncidentTimelinesAction(schoolId, id);
  }
  async countIncidentTimelinesActions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIncidentTimelinesActions(schoolId, filters);
  }
}
