import type { SupabaseClient } from '@supabase/supabase-js';
import type { DashboardWidget, DashboardWidgetCreate } from '@educi/types';
import { GovDashboardWidgetNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAnalyticsDashboardWidgetService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<DashboardWidget> {
    const item = await this.repo.findDashboardWidgetById(schoolId, id);
    if (!item) throw new GovDashboardWidgetNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<DashboardWidget[]> {
    return this.repo.findAllDashboardWidgets(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<DashboardWidgetCreate>): Promise<DashboardWidget> {
    return this.repo.createDashboardWidget(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<DashboardWidgetCreate>): Promise<DashboardWidget> {
    const existing = await this.repo.findDashboardWidgetById(schoolId, id);
    if (!existing) throw new GovDashboardWidgetNotFoundError(id);
    return this.repo.updateDashboardWidget(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDashboardWidgetById(schoolId, id);
    if (!existing) throw new GovDashboardWidgetNotFoundError(id);
    return this.repo.deleteDashboardWidget(schoolId, id);
  }
}
