// Enterprise Platform Service - TenantMonitoring
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantMonitoring, TenantMonitoringCreate } from '@educi/types';
import { EntTenantMonitoringNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantMonitoringServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenantMonitoringService(schoolId: string, id: string): Promise<TenantMonitoring> {
    const item = await this.repo.findTenantMonitoringServiceById(schoolId, id);
    if (!item) throw new EntTenantMonitoringNotFoundError(id);
    return item;
  }
  async listTenantMonitoringServices(schoolId: string, filters?: Record<string, unknown>): Promise<TenantMonitoring[]> {
    return this.repo.findAllTenantMonitoringServices(schoolId, filters);
  }
  async createTenantMonitoringService(schoolId: string, data: TenantMonitoringCreate): Promise<TenantMonitoring> {
    return this.repo.createTenantMonitoringService(schoolId, data);
  }
  async updateTenantMonitoringService(schoolId: string, id: string, data: Partial<TenantMonitoringCreate>): Promise<TenantMonitoring> {
    const existing = await this.repo.findTenantMonitoringServiceById(schoolId, id);
    if (!existing) throw new EntTenantMonitoringNotFoundError(id);
    return this.repo.updateTenantMonitoringService(schoolId, id, data);
  }
  async deleteTenantMonitoringService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantMonitoringServiceById(schoolId, id);
    if (!existing) throw new EntTenantMonitoringNotFoundError(id);
    return this.repo.deleteTenantMonitoringService(schoolId, id);
  }
  async countTenantMonitoringServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenantMonitoringServices(schoolId, filters);
  }
}
