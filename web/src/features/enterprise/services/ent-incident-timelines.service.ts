// Enterprise Platform Service - IncidentTimelines
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntIncidentTimelineService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getIncidentTimeline(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findIncidentTimelineById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listIncidentTimelines(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllIncidentTimelines(schoolId, filters);
  }
  async createIncidentTimeline(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createIncidentTimeline(schoolId, data);
  }
  async updateIncidentTimeline(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findIncidentTimelineById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateIncidentTimeline(schoolId, id, data);
  }
  async deleteIncidentTimeline(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIncidentTimelineById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteIncidentTimeline(schoolId, id);
  }
  async countIncidentTimelines(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIncidentTimelines(schoolId, filters);
  }
}
