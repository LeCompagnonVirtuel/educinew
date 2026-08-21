// Government & National Governance Service - RealTimeAlerts
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { RealTimeAlerts, RealTimeAlertsCreate } from '@educi/types';
import { GovRealTimeAlertsNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovRealTimeAlertsService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getRealTimeAlerts(schoolId: string, id: string): Promise<RealTimeAlerts> {
    const item = await this.repo.findRealTimeAlertsById(schoolId, id);
    if (!item) throw new GovRealTimeAlertsNotFoundError(id);
    return item;
  }

  async listRealTimeAlertss(schoolId: string, filters?: Record<string, unknown>): Promise<RealTimeAlerts[]> {
    return this.repo.findAllRealTimeAlertss(schoolId, filters);
  }

  async createRealTimeAlerts(schoolId: string, data: RealTimeAlertsCreate): Promise<RealTimeAlerts> {
    return this.repo.createRealTimeAlerts(schoolId, data);
  }

  async updateRealTimeAlerts(schoolId: string, id: string, data: Partial<RealTimeAlertsCreate>): Promise<RealTimeAlerts> {
    const existing = await this.repo.findRealTimeAlertsById(schoolId, id);
    if (!existing) throw new GovRealTimeAlertsNotFoundError(id);
    return this.repo.updateRealTimeAlerts(schoolId, id, data);
  }

  async deleteRealTimeAlerts(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRealTimeAlertsById(schoolId, id);
    if (!existing) throw new GovRealTimeAlertsNotFoundError(id);
    return this.repo.deleteRealTimeAlerts(schoolId, id);
  }

  async countRealTimeAlertss(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRealTimeAlertss(schoolId, filters);
  }
}
