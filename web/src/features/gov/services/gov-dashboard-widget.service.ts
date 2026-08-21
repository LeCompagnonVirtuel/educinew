// Government & National Governance Service - DashboardWidget
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DashboardWidget, DashboardWidgetCreate } from '@educi/types';
import { GovDashboardWidgetNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovDashboardWidgetService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getDashboardWidget(schoolId: string, id: string): Promise<DashboardWidget> {
    const item = await this.repo.findDashboardWidgetById(schoolId, id);
    if (!item) throw new GovDashboardWidgetNotFoundError(id);
    return item;
  }

  async listDashboardWidgets(schoolId: string, filters?: Record<string, unknown>): Promise<DashboardWidget[]> {
    return this.repo.findAllDashboardWidgets(schoolId, filters);
  }

  async createDashboardWidget(schoolId: string, data: DashboardWidgetCreate): Promise<DashboardWidget> {
    return this.repo.createDashboardWidget(schoolId, data);
  }

  async updateDashboardWidget(schoolId: string, id: string, data: Partial<DashboardWidgetCreate>): Promise<DashboardWidget> {
    const existing = await this.repo.findDashboardWidgetById(schoolId, id);
    if (!existing) throw new GovDashboardWidgetNotFoundError(id);
    return this.repo.updateDashboardWidget(schoolId, id, data);
  }

  async deleteDashboardWidget(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDashboardWidgetById(schoolId, id);
    if (!existing) throw new GovDashboardWidgetNotFoundError(id);
    return this.repo.deleteDashboardWidget(schoolId, id);
  }

  async countDashboardWidgets(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDashboardWidgets(schoolId, filters);
  }
}
