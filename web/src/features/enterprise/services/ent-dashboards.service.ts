// Enterprise Platform Service - Dashboards
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDashboardService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDashboard(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDashboardById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDashboards(schoolId, filters);
  }
  async createDashboard(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDashboard(schoolId, data);
  }
  async updateDashboard(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDashboardById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDashboard(schoolId, id, data);
  }
  async deleteDashboard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDashboardById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDashboard(schoolId, id);
  }
  async countDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDashboards(schoolId, filters);
  }
}
