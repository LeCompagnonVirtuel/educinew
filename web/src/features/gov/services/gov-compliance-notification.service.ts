// Government & National Governance Service - ComplianceNotification
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ComplianceNotification, ComplianceNotificationCreate } from '@educi/types';
import { GovComplianceNotificationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovComplianceNotificationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getComplianceNotification(schoolId: string, id: string): Promise<ComplianceNotification> {
    const item = await this.repo.findComplianceNotificationById(schoolId, id);
    if (!item) throw new GovComplianceNotificationNotFoundError(id);
    return item;
  }

  async listComplianceNotifications(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceNotification[]> {
    return this.repo.findAllComplianceNotifications(schoolId, filters);
  }

  async createComplianceNotification(schoolId: string, data: ComplianceNotificationCreate): Promise<ComplianceNotification> {
    return this.repo.createComplianceNotification(schoolId, data);
  }

  async updateComplianceNotification(schoolId: string, id: string, data: Partial<ComplianceNotificationCreate>): Promise<ComplianceNotification> {
    const existing = await this.repo.findComplianceNotificationById(schoolId, id);
    if (!existing) throw new GovComplianceNotificationNotFoundError(id);
    return this.repo.updateComplianceNotification(schoolId, id, data);
  }

  async deleteComplianceNotification(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findComplianceNotificationById(schoolId, id);
    if (!existing) throw new GovComplianceNotificationNotFoundError(id);
    return this.repo.deleteComplianceNotification(schoolId, id);
  }

  async countComplianceNotifications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countComplianceNotifications(schoolId, filters);
  }
}
