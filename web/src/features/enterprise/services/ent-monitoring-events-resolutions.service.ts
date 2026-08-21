// Enterprise Platform Service - MonitoringEventsResolutions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntMonitoringResolutionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getMonitoringEventsResolution(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findMonitoringEventsResolutionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listMonitoringEventsResolutions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllMonitoringEventsResolutions(schoolId, filters);
  }
  async createMonitoringEventsResolution(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createMonitoringEventsResolution(schoolId, data);
  }
  async updateMonitoringEventsResolution(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findMonitoringEventsResolutionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateMonitoringEventsResolution(schoolId, id, data);
  }
  async deleteMonitoringEventsResolution(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMonitoringEventsResolutionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteMonitoringEventsResolution(schoolId, id);
  }
  async countMonitoringEventsResolutions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMonitoringEventsResolutions(schoolId, filters);
  }
}
