// Enterprise Platform Service - UptimeMonitors
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntUptimeMonitorService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getUptimeMonitor(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findUptimeMonitorById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listUptimeMonitors(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllUptimeMonitors(schoolId, filters);
  }
  async createUptimeMonitor(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createUptimeMonitor(schoolId, data);
  }
  async updateUptimeMonitor(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findUptimeMonitorById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateUptimeMonitor(schoolId, id, data);
  }
  async deleteUptimeMonitor(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findUptimeMonitorById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteUptimeMonitor(schoolId, id);
  }
  async countUptimeMonitors(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countUptimeMonitors(schoolId, filters);
  }
}
