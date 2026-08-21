// Enterprise Platform Service - TimelineEvents
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTimelineEventService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTimelineEvent(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findTimelineEventById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listTimelineEvents(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllTimelineEvents(schoolId, filters);
  }
  async createTimelineEvent(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createTimelineEvent(schoolId, data);
  }
  async updateTimelineEvent(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findTimelineEventById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateTimelineEvent(schoolId, id, data);
  }
  async deleteTimelineEvent(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTimelineEventById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteTimelineEvent(schoolId, id);
  }
  async countTimelineEvents(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTimelineEvents(schoolId, filters);
  }
}
