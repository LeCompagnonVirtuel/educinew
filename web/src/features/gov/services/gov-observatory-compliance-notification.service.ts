import type { SupabaseClient } from '@supabase/supabase-js';
import type { ComplianceNotification, ComplianceNotificationCreate } from '@educi/types';
import { GovComplianceNotificationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovObservatoryComplianceNotificationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<ComplianceNotification> {
    const item = await this.repo.findComplianceNotificationById(schoolId, id);
    if (!item) throw new GovComplianceNotificationNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceNotification[]> {
    return this.repo.findAllComplianceNotifications(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<ComplianceNotificationCreate>): Promise<ComplianceNotification> {
    return this.repo.createComplianceNotification(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<ComplianceNotificationCreate>): Promise<ComplianceNotification> {
    const existing = await this.repo.findComplianceNotificationById(schoolId, id);
    if (!existing) throw new GovComplianceNotificationNotFoundError(id);
    return this.repo.updateComplianceNotification(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findComplianceNotificationById(schoolId, id);
    if (!existing) throw new GovComplianceNotificationNotFoundError(id);
    return this.repo.deleteComplianceNotification(schoolId, id);
  }
}
