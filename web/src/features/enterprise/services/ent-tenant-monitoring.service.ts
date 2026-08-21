// Enterprise Platform Service - TenantMonitoring
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantMonitoring, TenantMonitoringCreate } from '@educi/types';
import { EntTenantMonitoringNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantMonitoringService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenantMonitoring(schoolId: string, id: string): Promise<TenantMonitoring> {
    const item = await this.repo.findTenantMonitoringById(schoolId, id);
    if (!item) throw new EntTenantMonitoringNotFoundError(id);
    return item;
  }
  async listTenantMonitorings(schoolId: string, filters?: Record<string, unknown>): Promise<TenantMonitoring[]> {
    return this.repo.findAllTenantMonitorings(schoolId, filters);
  }
  async createTenantMonitoring(schoolId: string, data: TenantMonitoringCreate): Promise<TenantMonitoring> {
    return this.repo.createTenantMonitoring(schoolId, data);
  }
  async updateTenantMonitoring(schoolId: string, id: string, data: Partial<TenantMonitoringCreate>): Promise<TenantMonitoring> {
    const existing = await this.repo.findTenantMonitoringById(schoolId, id);
    if (!existing) throw new EntTenantMonitoringNotFoundError(id);
    return this.repo.updateTenantMonitoring(schoolId, id, data);
  }
  async deleteTenantMonitoring(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantMonitoringById(schoolId, id);
    if (!existing) throw new EntTenantMonitoringNotFoundError(id);
    return this.repo.deleteTenantMonitoring(schoolId, id);
  }
  async countTenantMonitorings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenantMonitorings(schoolId, filters);
  }
}
