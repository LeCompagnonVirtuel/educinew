// Enterprise Platform Service - DashboardsWidgets
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDashboardWidgetService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDashboardsWidget(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDashboardsWidgetById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDashboardsWidgets(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDashboardsWidgets(schoolId, filters);
  }
  async createDashboardsWidget(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDashboardsWidget(schoolId, data);
  }
  async updateDashboardsWidget(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDashboardsWidgetById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDashboardsWidget(schoolId, id, data);
  }
  async deleteDashboardsWidget(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDashboardsWidgetById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDashboardsWidget(schoolId, id);
  }
  async countDashboardsWidgets(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDashboardsWidgets(schoolId, filters);
  }
}
