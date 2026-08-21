// Government & National Governance Service - GrantMonitoring
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { GrantMonitoring, GrantMonitoringCreate } from '@educi/types';
import { GovGrantMonitoringNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovGrantMonitoringService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getGrantMonitoring(schoolId: string, id: string): Promise<GrantMonitoring> {
    const item = await this.repo.findGrantMonitoringById(schoolId, id);
    if (!item) throw new GovGrantMonitoringNotFoundError(id);
    return item;
  }

  async listGrantMonitorings(schoolId: string, filters?: Record<string, unknown>): Promise<GrantMonitoring[]> {
    return this.repo.findAllGrantMonitorings(schoolId, filters);
  }

  async createGrantMonitoring(schoolId: string, data: GrantMonitoringCreate): Promise<GrantMonitoring> {
    return this.repo.createGrantMonitoring(schoolId, data);
  }

  async updateGrantMonitoring(schoolId: string, id: string, data: Partial<GrantMonitoringCreate>): Promise<GrantMonitoring> {
    const existing = await this.repo.findGrantMonitoringById(schoolId, id);
    if (!existing) throw new GovGrantMonitoringNotFoundError(id);
    return this.repo.updateGrantMonitoring(schoolId, id, data);
  }

  async deleteGrantMonitoring(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findGrantMonitoringById(schoolId, id);
    if (!existing) throw new GovGrantMonitoringNotFoundError(id);
    return this.repo.deleteGrantMonitoring(schoolId, id);
  }

  async countGrantMonitorings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countGrantMonitorings(schoolId, filters);
  }
}
