// Enterprise Platform Service - MonitoringEvents
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntMonitoringEventService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getMonitoringEvent(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findMonitoringEventById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listMonitoringEvents(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllMonitoringEvents(schoolId, filters);
  }
  async createMonitoringEvent(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createMonitoringEvent(schoolId, data);
  }
  async updateMonitoringEvent(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findMonitoringEventById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateMonitoringEvent(schoolId, id, data);
  }
  async deleteMonitoringEvent(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMonitoringEventById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteMonitoringEvent(schoolId, id);
  }
  async countMonitoringEvents(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMonitoringEvents(schoolId, filters);
  }
}
