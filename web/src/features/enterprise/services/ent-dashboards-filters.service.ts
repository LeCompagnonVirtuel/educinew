// Enterprise Platform Service - DashboardsFilters
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDashboardFilterService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDashboardsFilter(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDashboardsFilterById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDashboardsFilters(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDashboardsFilters(schoolId, filters);
  }
  async createDashboardsFilter(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDashboardsFilter(schoolId, data);
  }
  async updateDashboardsFilter(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDashboardsFilterById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDashboardsFilter(schoolId, id, data);
  }
  async deleteDashboardsFilter(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDashboardsFilterById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDashboardsFilter(schoolId, id);
  }
  async countDashboardsFilters(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDashboardsFilters(schoolId, filters);
  }
}
