// Enterprise Platform Service - MonitoringEventsAcknowledgments
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntMonitoringAcknowledgmentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getMonitoringEventsAcknowledgment(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findMonitoringEventsAcknowledgmentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listMonitoringEventsAcknowledgments(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllMonitoringEventsAcknowledgments(schoolId, filters);
  }
  async createMonitoringEventsAcknowledgment(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createMonitoringEventsAcknowledgment(schoolId, data);
  }
  async updateMonitoringEventsAcknowledgment(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findMonitoringEventsAcknowledgmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateMonitoringEventsAcknowledgment(schoolId, id, data);
  }
  async deleteMonitoringEventsAcknowledgment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMonitoringEventsAcknowledgmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteMonitoringEventsAcknowledgment(schoolId, id);
  }
  async countMonitoringEventsAcknowledgments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMonitoringEventsAcknowledgments(schoolId, filters);
  }
}
