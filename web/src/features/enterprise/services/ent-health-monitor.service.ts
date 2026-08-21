// Enterprise Platform Service - HealthMonitor
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { HealthMonitor, HealthMonitorCreate } from '@educi/types';
import { EntHealthMonitorNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntHealthMonitorService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getHealthMonitor(schoolId: string, id: string): Promise<HealthMonitor> {
    const item = await this.repo.findHealthMonitorById(schoolId, id);
    if (!item) throw new EntHealthMonitorNotFoundError(id);
    return item;
  }
  async listHealthMonitors(schoolId: string, filters?: Record<string, unknown>): Promise<HealthMonitor[]> {
    return this.repo.findAllHealthMonitors(schoolId, filters);
  }
  async createHealthMonitor(schoolId: string, data: HealthMonitorCreate): Promise<HealthMonitor> {
    return this.repo.createHealthMonitor(schoolId, data);
  }
  async updateHealthMonitor(schoolId: string, id: string, data: Partial<HealthMonitorCreate>): Promise<HealthMonitor> {
    const existing = await this.repo.findHealthMonitorById(schoolId, id);
    if (!existing) throw new EntHealthMonitorNotFoundError(id);
    return this.repo.updateHealthMonitor(schoolId, id, data);
  }
  async deleteHealthMonitor(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findHealthMonitorById(schoolId, id);
    if (!existing) throw new EntHealthMonitorNotFoundError(id);
    return this.repo.deleteHealthMonitor(schoolId, id);
  }
  async countHealthMonitors(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countHealthMonitors(schoolId, filters);
  }
}
